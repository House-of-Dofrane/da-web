// New-lead notification. Best-effort: a failed notification never fails the lead, which is
// already stored by the time this runs.
//
// Deliberately carries no name, phone, email or street address: only the deal id, ZIP and the
// qualifiers. The desk opens the deal in its own system to see the seller. A chat or inbox that
// receives this never holds seller contact details.
//
// Disabled until LEAD_NOTIFY_WEBHOOK_URL is set in the Vercel project environment.

export type LeadNotification = {
  dealId: string | null;
  zip: string;
  condition: string;
  occupancy: string;
  timeline: string;
};

export async function notifyNewLead(lead: LeadNotification): Promise<{ sent: boolean; reason?: string }> {
  const url = process.env.LEAD_NOTIFY_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "not_configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "inbound_lead", source: "landing_r03", at: new Date().toISOString(), ...lead }),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok ? { sent: true } : { sent: false, reason: `http_${res.status}` };
  } catch {
    return { sent: false, reason: "error" };
  }
}
