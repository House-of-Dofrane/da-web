// Booked-call notification. Best-effort and privacy-lean, like notify-lead: it carries the rep, the
// reason, a first name and the Calendly link — not the email, phone, or agenda text. The rep opens
// the booking in the desk (wholesale.call_bookings) to see the rest.
//
// Disabled until CALL_NOTIFY_WEBHOOK_URL (or the shared LEAD_NOTIFY_WEBHOOK_URL) is set in the
// Vercel project environment; the relay behind that URL posts the Telegram card to the assigned rep.

export type CallBookingNotice = {
  rep: string | null;
  reason: string | null;
  firstName: string | null;
  scheduledAt: string | null;
  eventLink: string | null;
};

export async function notifyCallBooking(n: CallBookingNotice): Promise<{ sent: boolean; reason?: string }> {
  const url = process.env.CALL_NOTIFY_WEBHOOK_URL ?? process.env.LEAD_NOTIFY_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "not_configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "call_booked", source: "landing_r04", at: new Date().toISOString(), ...n }),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok ? { sent: true } : { sent: false, reason: `http_${res.status}` };
  } catch {
    return { sent: false, reason: "error" };
  }
}
