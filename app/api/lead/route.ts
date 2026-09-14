import { NextResponse } from "next/server";
import { buildInboundSubmit } from "@/lib/inbound-submit";
import { leadSchema } from "@/lib/lead-schema";
import { notifyNewLead } from "@/lib/notify-lead";

// POST /api/lead: validates the whole lead again on the server (the client schema can be
// bypassed), writes it through public.inbound_submit, then notifies. The browser never talks to
// Supabase directly, so the notification can only fire on a lead that was actually stored.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
    return NextResponse.json({ ok: false, error: "validation", issues }, { status: 422 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const lead = parsed.data;
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/inbound_submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: publishableKey, Authorization: `Bearer ${publishableKey}` },
    body: JSON.stringify(buildInboundSubmit(lead)),
    cache: "no-store",
  });

  // The RPC answers HTTP 200 with {"ok":false,...} for every business rejection, so the status
  // code alone reads a rejection as a success.
  const text = await res.text();
  let result: { ok?: boolean; deal_id?: string; error?: string } = {};
  try {
    result = JSON.parse(text);
  } catch {
    // fall through with an empty result
  }
  if (!res.ok || result.ok !== true) {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 502 });
  }

  // A filled honeypot gets ok from the RPC with nothing written: never notify on it.
  if (!lead.website) {
    await notifyNewLead({
      dealId: result.deal_id ?? null,
      zip: lead.zip,
      condition: lead.condition,
      occupancy: lead.occupancy,
      timeline: lead.timeline,
    });
  }

  return NextResponse.json({ ok: true });
}
