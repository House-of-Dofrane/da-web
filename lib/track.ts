import { track as vercelTrack } from "@vercel/analytics";

import { hasConsent } from "@/lib/consent";

// Client funnel tracker. Every funnel step goes to TWO sinks: Vercel Analytics (the dashboard funnel)
// and /api/track (durable, owned wholesale.funnel_events). Analytics-consent-gated — nothing fires
// until the visitor accepts — and fire-and-forget, so tracking never blocks or breaks the UI.

const SESSION_KEY = "da_sid";

// Anonymous, per-browser id (NOT PII) so steps can be stitched into a funnel for one visitor.
function sessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

type Meta = Record<string, string | number | boolean | null>;

export function trackFunnel(event: string, meta: Meta = {}): void {
  if (typeof window === "undefined") return;
  if (!hasConsent("analytics")) return;

  try {
    vercelTrack(event, meta);
  } catch {
    // analytics not mounted yet; the durable sink below still records it
  }

  try {
    const body = JSON.stringify({ session_id: sessionId(), event, path: window.location.pathname, meta });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // never let tracking throw into the UI
  }
}
