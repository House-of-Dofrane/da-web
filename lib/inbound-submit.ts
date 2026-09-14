import { CONSENT_TEXT, CONSENT_TEXT_SMS, CONSENT_VERSION } from "@/lib/lead-copy";
import type { Lead } from "@/lib/lead-schema";

// Maps a validated lead onto public.inbound_submit. Parameters are matched by NAME by PostgREST:
// the original twelve are frozen (renaming p_consent once returned PGRST202 and lost submissions
// silently). The 2026-09-14 migration ADDED optional parameters with defaults; nothing was renamed.
//
// Ruling K3: no new table. Attribution now lands on real columns (deals.market/gclid/utm/referrer/
// variant) and consent evidence on wholesale.consent_records; the qualifiers still ride in
// p_condition (sellers.notes) and p_timeline / p_need (sellers.motivation_signals).

export const LANDING_VARIANT = "r04";

export type InboundSubmitPayload = {
  p_name: string;
  p_phone: string;
  p_email: string;
  p_address: string;
  p_city: string;
  p_state: string;
  p_zip: string;
  p_condition: string;
  p_timeline: string;
  p_need: string;
  p_consent: boolean;
  p_website: string;
  p_consent_text: boolean;
  p_page: string | null;
  p_consent_version: string;
  p_consent_copy: string;
  p_consent_text_copy: string | null;
  p_ip: string | null;
  p_user_agent: string | null;
  p_market: string | null;
  p_gclid: string | null;
  p_utm: Record<string, string>;
  p_referrer: string | null;
  p_variant: string;
};

export type RequestContext = {
  ip?: string | null;
  userAgent?: string | null;
  page?: string | null;
};

// Coarse Maryland market from the first three ZIP digits. The desk assigns the real submarket at
// triage (deals.submarket stays 'inbound_unassigned'); this only has to be honest at the county level.
const MARKET_BY_ZIP3: Record<string, string> = {
  "206": "southern-maryland",
  "207": "prince-georges",
  "208": "montgomery",
  "209": "montgomery",
  "210": "baltimore-metro",
  "211": "baltimore-metro",
  "212": "baltimore-city",
  "214": "anne-arundel",
  "215": "western-maryland",
  "216": "eastern-shore",
  "217": "frederick",
  "218": "eastern-shore",
  "219": "cecil",
};

const clean = (value: string | null | undefined, max = 200) =>
  (value ?? "").replace(/[\n\r]/g, " ").trim().slice(0, max) || null;

export function marketForZip(zip: string): string | null {
  return MARKET_BY_ZIP3[zip.slice(0, 3)] ?? null;
}

export function buildInboundSubmit(lead: Lead, ctx: RequestContext = {}, submittedAt: Date = new Date()): InboundSubmitPayload {
  const a = lead.attribution ?? {};
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const) {
    const v = clean(a[key]);
    if (v) utm[key] = v;
  }
  if (a.first_touch_at) utm.first_touch_at = a.first_touch_at.slice(0, 40);

  const facts = [`condition=${lead.condition}`, `occupancy=${lead.occupancy}`, `source=landing_${LANDING_VARIANT}`, `submit_at=${submittedAt.toISOString()}`];

  return {
    p_name: lead.name,
    p_phone: lead.phone,
    p_email: lead.email,
    p_address: lead.address,
    p_city: "",
    p_state: "MD",
    p_zip: lead.zip,
    p_condition: facts.join(" | ").slice(0, 500),
    p_timeline: lead.timeline,
    p_need: lead.occupancy,
    p_consent: lead.consent === true,
    p_website: lead.website ?? "",
    p_consent_text: lead.consentText === true,
    p_page: clean(ctx.page ?? a.landing_page, 300),
    p_consent_version: CONSENT_VERSION,
    p_consent_copy: CONSENT_TEXT,
    p_consent_text_copy: lead.consentText === true ? CONSENT_TEXT_SMS : null,
    p_ip: clean(ctx.ip, 45),
    p_user_agent: clean(ctx.userAgent, 400),
    p_market: marketForZip(lead.zip),
    p_gclid: clean(a.gclid),
    p_utm: utm,
    p_referrer: clean(a.referrer, 500),
    p_variant: LANDING_VARIANT,
  };
}
