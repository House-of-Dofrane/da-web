"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";

// Vercel Analytics is cookieless, but the cookie banner still gates it: it mounts only after the
// visitor allows the "analytics" category, and unmounts if they later reject. Consent is read on
// the client, so this stays a client component; the page-view beacon fires on the accept.
export function ConsentedAnalytics() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const sync = () => setOk(hasConsent("analytics"));
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return ok ? <Analytics /> : null;
}
