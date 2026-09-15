// Single source of truth for the entity name, contact channels, and booking link.
// Gated values stay null until the upstream gate clears; the UI hides whatever has no real value
// rather than shipping a placeholder (no fake phone, no fake email, no dead booking link).

/**
 * §0.A — LLC formation is sequenced behind the immigration + cross-border tax attorney rulings and
 * is NOT confirmed in this thread (no intent/da_launch.md gate found in the repo). Do NOT append
 * "LLC" — or any entity suffix — until formation is confirmed complete AND the entity is actually an
 * LLC. When it clears, editing this one constant updates the footer, the copyright line, and (once
 * wired to it) the legal pages + the cookie banner's privacy text together.
 */
export const COMPANY_LEGAL_NAME = "Dofrane Acquisitions";

/**
 * §0.B / ruling C01 — there is no callable DA number and no provisioned monitored inbox yet. These
 * stay null; the footer omits the contact row entirely until they are real. Never ship a
 * placeholder number or email in their place.
 */
export const CONTACT_PHONE: string | null = null;
export const CONTACT_EMAIL: string | null = null;

/**
 * §3 — the Calendly round-robin event link shared by SWX + ALO. Null until the Calendly event is
 * created and both hosts (business emails) are connected. Book-a-Call is disabled while this is
 * null, so it can never open an empty or broken scheduler.
 */
export const CALENDLY_URL: string | null = null;

/** Brand params passed to Calendly's embed so it isn't a bare third-party widget (oxblood/ivory). */
export const CALENDLY_BRAND = {
  primaryColor: "3D0606", // oxblood, no leading #
  textColor: "3D0606",
  backgroundColor: "FAF4E4", // ivory
} as const;
