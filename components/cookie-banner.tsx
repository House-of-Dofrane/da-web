"use client";

import { useEffect, useState } from "react";

// Cookie / analytics consent banner — DRAFT, pending attorney review of the copy.
// The DA site sets only a first-party attribution record (essential) by default and, once wired, uses
// Vercel Analytics (privacy-friendly, no cookies). This banner gates any NON-essential measurement:
// nothing non-essential loads until the visitor accepts. An analytics loader must call hasConsent()
// (or listen for the "da:cookie-consent" event) before initializing.
//
// No external library. Brand tokens only (oxblood / ivory / gold). WCAG AA: oxblood ground with ivory
// text (14.6:1), gold Accept button carries oxblood text (6.96:1), focus-visible outlines throughout.

const CONSENT_KEY = "da_cookie_consent"; // "accepted" | "rejected"
export const CONSENT_EVENT = "da:cookie-consent";

type ConsentValue = "accepted" | "rejected";

function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/**
 * True only when the visitor has explicitly accepted non-essential cookies/analytics.
 * Safe to call on the server (returns false) and when storage is blocked (returns false).
 * An analytics loader should gate initialization on this, and re-check on the CONSENT_EVENT.
 */
export function hasConsent(): boolean {
  return readConsent() === "accepted";
}

function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode, cleared, or disabled): treat as no consent. The banner still
    // dismisses for this page view; it will reappear next load, which is the fail-safe direction.
  }
  try {
    window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
  } catch {
    // CustomEvent unsupported: analytics loaders fall back to polling hasConsent().
  }
}

export function CookieBanner() {
  // Start hidden so SSR and the first client paint agree; reveal only after we read storage.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  function choose(value: ConsentValue) {
    writeConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color-mix(in_srgb,var(--da-ivory)_18%,var(--da-oxblood))] bg-oxblood px-4 py-4 text-ivory"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--da-ivory)_86%,var(--da-oxblood))]">
          We use a small first-party record to prepare your offer and, if you accept, privacy-friendly
          analytics to see how the site is used. No third-party advertising cookies.{" "}
          <a
            href="/privacy"
            className="font-semibold text-gold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-lg border border-ivory/50 px-4 py-2 text-sm font-semibold text-ivory transition-colors hover:border-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-oxblood transition-colors hover:bg-[color-mix(in_srgb,var(--da-gold)_88%,#fff)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
