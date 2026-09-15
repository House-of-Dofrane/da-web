import crypto from "crypto";

// Pure helpers for the Calendly webhook: verify the signature, and map an invitee payload to a
// call_bookings row. Kept side-effect-free so they can be unit-tested without a live event.

export type CallBookingRow = {
  name: string | null;
  email: string | null;
  phone: string | null;
  reason: string | null;
  reason_other: string | null;
  agenda_note: string;
  assigned_rep: string | null;
  calendly_event_id: string | null;
  calendly_event_link: string | null;
  scheduled_at: string | null;
  status: string;
  recording_consent_disclosed: boolean;
};

/**
 * Verify Calendly's webhook signature. Header shape: "Calendly-Webhook-Signature: t=<ts>,v1=<sig>",
 * where sig = HMAC-SHA256(signingKey, `${t}.${rawBody}`). Constant-time compare + a replay window.
 */
export function verifyCalendlySignature(
  rawBody: string,
  header: string | null,
  signingKey: string,
  toleranceSec = 300,
): boolean {
  if (!header) return false;
  const parts: Record<string, string> = {};
  for (const kv of header.split(",")) {
    const [k, v] = kv.split("=");
    if (k && v) parts[k.trim()] = v.trim();
  }
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;

  const expected = crypto.createHmac("sha256", signingKey).update(`${t}.${rawBody}`).digest("hex");
  const a = Buffer.from(v1);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const age = Math.abs(Date.now() / 1000 - Number(t));
  return Number.isFinite(age) && age <= toleranceSec;
}

interface QA {
  question?: string;
  answer?: string;
}
interface CalendlyPayload {
  name?: string;
  email?: string;
  uri?: string;
  text_reminder_number?: string;
  questions_and_answers?: QA[];
  scheduled_event?: {
    uri?: string;
    start_time?: string;
    event_memberships?: Array<{ user_email?: string; user_name?: string }>;
  };
}

const answerMatching = (qa: QA[], re: RegExp): string | null => {
  const hit = qa.find((x) => re.test(x.question ?? ""));
  const a = hit?.answer?.trim();
  return a ? a : null;
};

// Map the two real host emails to SWX/ALO once they exist; until then pass the email through so the
// row still records who took the call.
function mapRep(email: string | null): string {
  if (!email) return "round-robin";
  const map: Record<string, string> = {};
  return map[email.toLowerCase()] ?? email;
}

export function mapCalendlyPayload(event: string, payloadRaw: unknown): CallBookingRow {
  const payload = (payloadRaw ?? {}) as CalendlyPayload;
  const qa: QA[] = Array.isArray(payload.questions_and_answers) ? payload.questions_and_answers : [];
  const reason = answerMatching(qa, /reason|why|help|looking|explor/i);
  const agenda = answerMatching(qa, /know before|prepare|like us to know|agenda/i);
  const phone = answerMatching(qa, /phone|number|call you/i) ?? payload.text_reminder_number ?? null;
  const sched = payload.scheduled_event ?? {};
  const memberships = Array.isArray(sched.event_memberships) ? sched.event_memberships : [];
  const hostEmail = memberships[0]?.user_email ?? null;
  const isOther = reason ? /^other/i.test(reason) : false;

  return {
    name: payload.name?.trim() || null,
    email: payload.email?.trim() || null,
    phone,
    reason,
    reason_other: isOther ? (answerMatching(qa, /other|else|specify/i) ?? reason) : null,
    agenda_note: agenda ?? "(none provided)",
    assigned_rep: mapRep(hostEmail),
    calendly_event_id: sched.uri ?? payload.uri ?? null,
    calendly_event_link: sched.uri ?? payload.uri ?? null,
    scheduled_at: sched.start_time ?? null,
    status: /cancel/i.test(event) ? "canceled" : "scheduled",
    recording_consent_disclosed: qa.some((x) => /record|transcri/i.test(x.question ?? "")),
  };
}
