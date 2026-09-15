import { NextResponse } from "next/server";

// POST /api/track: durable funnel sink. Writes the event to wholesale.funnel_events through
// public.record_funnel_event (SECURITY DEFINER), and optionally fans it out to an external funnel
// webhook (FUNNEL_WEBHOOK_URL) — the one seam for piping the whole funnel to any tracking sink.
// Payload is anonymous (a random session id, an event name, the path, small meta) — no PII.

const EVENT_RE = /^[a-z0-9_]{2,40}$/;

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // sendBeacon may deliver as text/plain, so parse the raw body rather than request.json().
  let body: { session_id?: unknown; event?: unknown; path?: unknown; meta?: unknown };
  try {
    body = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.event !== "string" || !EVENT_RE.test(body.event)) {
    return NextResponse.json({ ok: false, error: "bad_event" }, { status: 422 });
  }

  const payload = {
    session_id: typeof body.session_id === "string" ? body.session_id.slice(0, 64) : null,
    event: body.event,
    path: typeof body.path === "string" ? body.path.slice(0, 200) : null,
    meta: body.meta && typeof body.meta === "object" ? body.meta : {},
  };

  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/record_funnel_event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({ p: payload }),
    cache: "no-store",
  });

  const hook = process.env.FUNNEL_WEBHOOK_URL;
  if (hook) {
    void fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "landing_r04", at: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(3000),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: res.ok });
}
