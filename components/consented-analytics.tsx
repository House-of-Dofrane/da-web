"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { CONSENT_EVENT, hasConsent } from "@/components/cookie-banner";

// Vercel Analytics is cookieless, but the cookie banner still gates it: it mounts only after the
// visitor accepts, and unmounts if they later reject. Consent is read on the client, so this stays
// a client component; the page-view beacon fires on the accept.
export function ConsentedAnalytics() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(hasConsent());
    const onChange = () => setOk(hasConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return ok ? <Analytics /> : null;
}
