import { NextResponse } from "next/server";

import { mapCalendlyPayload, verifyCalendlySignature } from "@/lib/calendly";
import { notifyCallBooking } from "@/lib/notify-call";

// POST /api/calendly-webhook: Calendly -> call_bookings glue. Verifies Calendly's signature, maps
// the invitee payload to a row, writes it through public.record_call_booking (SECURITY DEFINER ->
// wholesale.call_bookings), then fires a best-effort rep notification. Idempotent on the event id,
// so reschedule/cancel webhooks update the same row.
//
// Env required to run (set in Vercel): CALENDLY_WEBHOOK_SIGNING_KEY, SUPABASE_URL,
// SUPABASE_PUBLISHABLE_KEY. Optional: CALL_NOTIFY_WEBHOOK_URL (else LEAD_NOTIFY_WEBHOOK_URL).
export async function POST(request: Request) {
  const raw = await request.text();

  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!signingKey || !supabaseUrl || !publishableKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!verifyCalendlySignature(raw, request.headers.get("calendly-webhook-signature"), signingKey)) {
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
  }

  let body: { event?: string; payload?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const event = body.event ?? "";
  if (!/invitee\.(created|canceled)/.test(event)) {
    // Acknowledge events we don't track so Calendly doesn't retry them.
    return NextResponse.json({ ok: true, ignored: event });
  }

  const row = mapCalendlyPayload(event, body.payload);

  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/record_call_booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({ p: row }),
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "db_write_failed" }, { status: 502 });
  }

  await notifyCallBooking({
    rep: row.assigned_rep,
    reason: row.reason,
    firstName: row.name ? row.name.split(" ")[0] : null,
    scheduledAt: row.scheduled_at,
    eventLink: row.calendly_event_link,
  });

  return NextResponse.json({ ok: true });
}
