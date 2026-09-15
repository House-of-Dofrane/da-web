"use client";

import * as React from "react";

import {
  CookieConsent,
  CookieConsentTitle,
  CookieConsentDescription,
  CookieConsentCategories,
  CookieConsentCategory,
  CookieConsentActions,
  CookieConsentAcceptAll,
  CookieConsentRejectAll,
  CookieConsentSave,
  CookieConsentManage,
  CookieConsentLink,
  type CookiePreferences,
} from "@/components/ui/cookie-consent";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  migrateLegacyConsent,
} from "@/lib/consent";

// DA cookie/consent banner. Wraps the shared CookieConsent primitive with DA's copy and the three
// categories the site actually uses. The banner records the choice and announces it on
// CONSENT_EVENT; loaders (analytics; a marketing pixel if one is added) read the gate from
// lib/consent. Token-driven, so it inherits the DA oxblood/ivory/gold palette automatically.
export function CookieConsentBanner() {
  // Migrate the legacy "accepted"/"rejected" key before the banner decides whether to show, so a
  // returning visitor keeps their choice. Lazy initializer => runs once, client-only, before the
  // primitive reads storage (no first-paint flash). Idempotent.
  React.useState(migrateLegacyConsent);

  function handleChange(prefs: CookiePreferences) {
    try {
      window.dispatchEvent(new CustomEvent<CookiePreferences>(CONSENT_EVENT, { detail: prefs }));
    } catch {
      // CustomEvent unsupported: loaders fall back to reading storage on next navigation.
    }
  }

  return (
    <CookieConsent
      storageKey={CONSENT_STORAGE_KEY}
      defaultPreferences={{ necessary: true, analytics: false, marketing: false }}
      onChange={handleChange}
      // Clear the mobile-only sticky CTA bar (~73px, fixed to bottom, md:hidden). tailwind-merge
      // dedupes the primitive's own bottom-4; on desktop the CTA is hidden so bottom-4 stands.
      className="bottom-[calc(5.25rem+env(safe-area-inset-bottom))] md:bottom-4"
    >
      <div className="flex flex-col gap-1.5">
        <CookieConsentTitle>We use cookies.</CookieConsentTitle>
        <CookieConsentDescription>
          Necessary cookies keep the site working and remember this choice. With your permission we
          also use privacy-friendly analytics to see how the page is used, and campaign attribution.
          No third-party advertising cookies.{" "}
          <CookieConsentLink href="/privacy">Privacy Policy</CookieConsentLink>
        </CookieConsentDescription>
      </div>

      <CookieConsentCategories>
        <CookieConsentCategory
          id="necessary"
          name="Necessary"
          description="Security and remembering your cookie choice."
          required
        />
        <CookieConsentCategory
          id="analytics"
          name="Analytics"
          description="Aggregated page views, so we can improve the page. No cookies."
        />
        <CookieConsentCategory
          id="marketing"
          name="Marketing"
          description="Attribution for the campaign that brought you here."
        />
      </CookieConsentCategories>

      <CookieConsentActions>
        <CookieConsentAcceptAll />
        <CookieConsentRejectAll />
        <CookieConsentSave />
        <CookieConsentManage className="ms-auto" />
      </CookieConsentActions>
    </CookieConsent>
  );
}

export default CookieConsentBanner;
