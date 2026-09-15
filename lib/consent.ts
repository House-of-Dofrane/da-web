import type { CookiePreferences } from "@/components/ui/cookie-consent";

// Consent gate. The cookie-consent banner writes a per-category record under CONSENT_STORAGE_KEY
// and announces changes on CONSENT_EVENT. Loaders (analytics now; a marketing pixel if/when one is
// added) read the relevant category here before initializing, and re-check on the event.

export const CONSENT_STORAGE_KEY = "da_cookie_consent_v2";
export const CONSENT_EVENT = "da:cookie-consent";

// Legacy key from the first legal-pages pass: a bare string "accepted" | "rejected".
const LEGACY_KEY = "da_cookie_consent";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export function readConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/** True only when the visitor has explicitly allowed this category. */
export function hasConsent(category: ConsentCategory): boolean {
  return readConsent()?.[category] === true;
}

/**
 * One-time migration from the legacy string key to the new per-category record.
 * "accepted" -> analytics + marketing on; "rejected" -> necessary only. Runs only when the new key
 * is absent and a legacy value is present, so a returning visitor keeps their prior choice and does
 * not see the banner a second time. Idempotent (re-running is a no-op once the new key exists).
 */
export function migrateLegacyConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== null) return false;
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy !== "accepted" && legacy !== "rejected") return false;
    const on = legacy === "accepted";
    const migrated: CookiePreferences = { necessary: true, analytics: on, marketing: on };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
    return true;
  } catch {
    return false;
  }
}
