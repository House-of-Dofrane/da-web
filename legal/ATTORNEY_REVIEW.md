# Dofrane Acquisitions — Legal Pages: Attorney Review Packet

**Status: DRAFT. Do not publish `/privacy` or `/terms` until a licensed attorney has reviewed and approved them.**

Scope: `app/privacy/page.tsx`, `app/terms/page.tsx`, `components/cookie-banner.tsx`.
Drafted: 2026-09-14. Author: engineering (not counsel). Not legal advice.

These pages were adapted — reusing wording, not diverging — from the earlier DA legal pass in Drive:
`10_ENTITIES/Dofrane_Acquisitions/07_Landing_Page/00_Brief/legal/` (`PRIVACY_POLICY_DRAFT.md`,
`TERMS_DRAFT.md`, `TCPA_CONSENT_LANGUAGE.md`, `COMPLIANCE_FLAGS.md`), and reconciled with the live
site strings in `lib/page-copy.ts` (`footer.disclosures`) and `lib/lead-copy.ts` (`CONSENT_TEXT`,
`CONSENT_TEXT_SMS`). The consent wording, the four footer disclosures, and the fair-housing line are
carried verbatim from those files and must stay in sync with them.

This packet is the controlling to-do list. It has three parts:
**(A) assumptions/positions taken**, **(B) items counsel must resolve**, **(C) placeholders to fill**.

---

## A. Assumptions and positions taken in this draft (15)

Each was a decision the source drafts left open or that the build directive fixed. Confirm each.

| # | Assumption / position taken | Basis | Risk if wrong |
|---|---|---|---|
| A1 | Entity described as **"a sole proprietorship pending formation of a Maryland LLC"** | Build directive (LegalZoom filing not cleared) | Prior draft said "LLC organized in the District of Columbia." Name/status must match reality, the consent checkbox, and both legal pages. |
| A2 | **Governing law = Maryland** on both pages (venue: MD county where property sits) | Build directive for Terms; applied to Privacy for consistency | Prior privacy/terms drafts chose **District of Columbia** law. This is a deliberate divergence — counsel must ratify. |
| A3 | **May-assign disclosed** (Terms §5) — chose Alternative B, not principal-only Alternative A | Footer L1 already says assignment is disclosed; DA is a wholesaler | Alt A would be false the first time a contract is assigned; Alt B must be paired with §10-715 pre-signing notice. |
| A4 | Footer disclosure L1 wording **"before you sign"** adopted (not "before settlement") | Md. Real Prop. §10-715 requires notice *before the contract is entered into* | "Before settlement" is later than the statute allows for owner-occupied 1–4 units. |
| A5 | Analytics named as **"Vercel Analytics (privacy-friendly, no cookies)"**, flagged `[CONFIRM]` | Directive says it is being wired | If a different/cookie-setting tool ships, the disclosure and the cookie banner logic are both wrong. |
| A6 | The **first-party attribution record** (localStorage UTM/gclid/referrer) is treated as **essential** and loads by default; the cookie banner gates only non-essential analytics | It is first-party, not shared with ad platforms | If counsel deems it non-essential, it must move behind the banner too. |
| A7 | **No concrete retention periods asserted** — stated as "as long as needed + legal/recordkeeping" | Business has not set periods | MODPA/consumer expectations may want stated periods; prior draft used example periods (24 mo / 7 yr / 5 yr). |
| A8 | **Liability cap** left as a `[CONFIRM]` amount (e.g. $100) | Not chosen | An unenforceable/absent cap; also see §14-1328 exposure (B7). |
| A9 | Pages set **indexable** (`robots: index/follow`) | Build directive ("indexable? NO — indexable") | Legal pages are public; fine, but confirm they should also be added to `sitemap.ts`. |
| A10 | **No arbitration clause** included | Source draft marked it optional / counsel's call | If DA wants arbitration + class waiver, counsel must draft it (30-day opt-out, fee terms). |
| A11 | **MODPA + CCPA-style rights offered voluntarily**, without conceding either law applies | Source draft's recommended stance | Offering rights ≠ admitting applicability; keep the non-concession framing. |
| A12 | **Skip-trace / data vendors** disclosed as a sharing category (verification only) | Build directive | If DA shares seller data more broadly, or buys owner lists at scale, the "we do not sell" claim and MODPA "sale" analysis need review. |
| A13 | "Last updated **September 14, 2026**; Effective on publication" | Draft date | Set the real effective date at go-live. |
| A14 | Consent described as **two separate unchecked boxes** (TCPA Option C: call/email; optional text+automated) | `lib/lead-copy.ts` | Must match the live form and A2P 10DLC registration once texting provider is live. |
| A15 | "**We do not sell or share**" + honor **Global Privacy Control** | Source draft | If any pixel/sale is added later, a "Your Privacy Choices" control and GPC handling become mandatory. |

**Guess-list count: 15 (A1–A15).**

---

## B. Items counsel / the business must resolve before go-live

These are the `[CONFIRM: …]` markers rendered on the pages, plus the higher-order legal calls.

**On-page `[CONFIRM]` markers**
1. B1 — Privacy §2: add a full "Information from other sources" section for outbound sourcing data? (owner lists / public records)
2. B2 — Privacy §5: Supabase project **region** (data stored in the US — confirm exact region).
3. B3 — Privacy §5: the **team-alert messaging tool** and exactly what fields it receives (draft says ref#, ZIP, qualifiers only — no PII).
4. B4 — Privacy §5: **phone/text provider** and **email provider**, once selected.
5. B5 — Privacy §5 / Terms §5: whether a **prospective assignee** ever receives seller contact details **before** an assignment is signed.
6. B6 — Privacy §6: confirm **Vercel Analytics** is the tool, that it is cookieless, and whether **Speed Insights** is also on.
7. B7 — Privacy §7: the **opt-out service-level** (e.g. honor STOP within 10 business days).
8. B8 — Privacy §9: **retention periods** per record type, and Vercel hosting-log retention on the current plan.
9. B9 — Terms §5: whether DA **remains responsible to the seller after assignment**.
10. B10 — Terms §7: the **exact closing-cost allocation** in the standard purchase agreement, so it matches the landing page's "we pay our own closing costs" / "transfer & recordation split per contract."
11. B11 — Terms §8: **property types** accepted (SFR, townhouse, condo, 2–4 units).
12. B12 — Terms §10: whether to list a specific **Maryland housing-counseling resource** (verify name/number first).
13. B13 — Terms §15: the **liability cap** amount.
14. B14 — Terms §17: whether to add a **binding arbitration** clause at all.

**Higher-order legal review (from `COMPLIANCE_FLAGS.md`)**
15. B15 (F3) — **§10-715 wholesaler assignment notice**: confirm the form → purchase-agreement flow actually delivers **written notice before signing** for owner-occupied 1–4-unit property, and that DA's "not a broker / principal-side" posture holds given regular dealing (Bus. Occ. & Prof. §17-101(l)).
16. B16 — **Browsewrap enforceability**: a Terms link in the footer alone may not bind sellers. If DA wants the Terms to bind form submitters, add an assent line above the submit button ("By submitting, you agree to our Terms"), **separate** from the TCPA consent boxes. (Requires a change in the lead form — not in these files.)
17. B17 (F4) — **"No fees" / transfer & recordation tax** substantiation (Md. Real Prop. §14-104 splits 50/50 absent contract terms) — the page copy must not overstate.
18. B18 — **MODPA applicability**: driven by the count of Maryland residents whose data DA controls/processes (owner lead lists reportedly in the tens of thousands). Confirm the distinct-MD-resident count for CY2026 and the "publicly available information" exclusion.
19. B19 (F2) — **§7-310 foreclosure/default** protections and void-clause rules; confirm whether the default section belongs on the public Site or only in the purchase-agreement workflow.
20. B20 (F7/F8) — **Fair-housing ad targeting** and **Maryland two-party call recording** review before adding any pixels, session replay, or chat.
21. B21 — **§14-1328 consumer-contract** waiver-void rule (effective ~Oct 1, 2026): confirm the liability-limitation and venue clauses survive it.
22. B22 — **Governing-law reconciliation (A2)**: Maryland was chosen per directive; confirm no DC nexus requires DC law, and that MD choice is consistent with §7-310 (which voids non-MD law/venue for residences in default anyway).

---

## C. Placeholders (`{{TOKEN}}`) that MUST be filled before publication

Contact and entity facts do not yet exist (rulings C01/admin). Every token below appears on the pages
and must be replaced with a real value before go-live. **None were invented.**

| Token | What it is | Blocker |
|---|---|---|
| `{{CONTACT_EMAIL}}` | Active email for privacy requests, opt-outs, and general contact. MODPA requires an active email or online mechanism. | Business email not provisioned. |
| `{{CONTACT_PHONE}}` | Business phone. | Not provisioned. |
| `{{MAILING_ADDRESS}}` | Valid **physical postal address** — required by CAN-SPAM for any marketing email. | None exists. |
| `{{ENTITY_LEGAL_NAME}}` | The **Maryland LLC legal name**, to reissue both pages under once the filing clears. | LegalZoom filing not cleared. |

Search both `app/privacy/page.tsx` and `app/terms/page.tsx` for `{{` to find every occurrence.
Also remove the `[CONFIRM: …]` inline markers (the `Confirm` component) once each B-item is resolved.

---

## D. Footer wiring — change owned by the main session (NOT changed here)

`components/landing/sections.tsx` `Footer()` currently exposes only in-page anchors and does not link
the legal pages. To wire `/privacy` and `/terms`, add two links to the `<nav aria-label="Page sections">`
list (around lines 361–366), matching the existing anchor styling:

```tsx
<a href="/privacy" className="underline-offset-4 hover:text-gold hover:underline">Privacy</a>
<a href="/terms" className="underline-offset-4 hover:text-gold hover:underline">Terms</a>
```

The four `footer.disclosures` lines (L1–L6) in `lib/page-copy.ts` stay as they are — the legal pages
were written to be consistent with them, not to replace them.

---

## E. Analytics gating — integration note

`components/cookie-banner.tsx` exports `hasConsent()` and a `CONSENT_EVENT` ("da:cookie-consent").
Whatever loads Vercel Analytics (or any future non-essential measurement) must initialize only when
`hasConsent() === true`, and should re-check on the `CONSENT_EVENT`. Render `<CookieBanner />` once in
`app/layout.tsx`. The banner defaults to **no consent** (fail-safe) when storage is blocked.

---

*Prepared for attorney review. Statutory citations were carried from the source drafts and
`COMPLIANCE_FLAGS.md` and were not independently re-verified in this pass.*
