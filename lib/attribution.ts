import type { Attribution } from "@/lib/lead-schema";

// Front tracking captured in the browser: no third-party script, no tag manager. First touch is
// kept in localStorage so a seller who returns through another route keeps the campaign that
// actually found them. Same behaviour as the R02 page.
const KEY = "da_first_touch";

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const now: Attribution = {
    gclid: q.get("gclid") ?? undefined,
    utm_source: q.get("utm_source") ?? undefined,
    utm_medium: q.get("utm_medium") ?? undefined,
    utm_campaign: q.get("utm_campaign") ?? undefined,
    utm_term: q.get("utm_term") ?? undefined,
    utm_content: q.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname,
    first_touch_at: new Date().toISOString(),
  };
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored) return JSON.parse(stored) as Attribution;
    if (now.gclid || now.utm_source || now.referrer) window.localStorage.setItem(KEY, JSON.stringify(now));
  } catch {
    // Private mode or blocked storage: fall through on this visit's values.
  }
  return now;
}
