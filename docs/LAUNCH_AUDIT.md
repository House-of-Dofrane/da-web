# DA Landing Page — Launch Audit (Round 04, rerun gate)

**Snapshot 2026-09-14 · branch `round-04-md-cash-buyer` · commit `92c1a0c` · verified at 390px on the live preview.**
Visual: `docs/LAUNCH_AUDIT.html` (HOD Boardroom reporting palette).

## Verdict
**17 of 20 green. One red, two amber. Not launch-ready for a first-time seller until the red clears.**
The page renders clean on a phone, the corrected copy is live, the map loads, and all five NEW legal/analytics items are built. The one thing that breaks a distressed seller's trust fastest is still open: there is no way to reach a human (no phone, no email) — the form is the only channel, held by ruling C01. That is your decision, not an engineering bug.

## Scoreboard
| Green | Amber | Red | Copy swaps live |
|---|---|---|---|
| 17 | 2 | 1 | 4 / 4 |

## The 20 items (rerun)
**A · Visitor sees** — A1 404 ✅ · A2 CTA above fold ✅ · A3 thank-you ✅ · A4 loading ✅ · A5 error ✅
**B · Google/social (re-verified)** — B1 title+desc ✅ · B2 canonical ✅ · B3 OG+Twitter ✅ · B4 JSON-LD (Org+WebSite+FAQ) ✅ · B5 sitemap+robots ✅
**C · Phone** — C1 390px no h-scroll ✅ · C2 mobile-only sticky CTA ✅ · C3 compressed images ✅
**D · Legal/measurement (NEW)** — D1 privacy (draft) ✅ · D2 terms (draft) ✅ · D3 cookie banner ✅ · D4 analytics 🟡 · D5 contact route 🔴
**Cross-check** — X1 map renders ✅ · X2 four copy swaps live ✅

## Findings
- **F01 (RED) · D5 contact route.** No phone/email on the page; form is the only channel. Correctly no fake placeholder (verified: zero phone/email strings). Blocker: **ruling C01** + number/inbox provisioning. Highest trust-damage item for a distressed seller.
- **F02 (AMBER) · D4 analytics verification.** Vercel Analytics wired + consent-gated; gating logic verified (hasConsent reads the banner's key, component mounts conditionally, banner hides + persists). Script serves 200. But on the preview the script also loads via Vercel's preview toolbar independent of the app gate, and no `/view` beacon POST could be isolated. **Fix:** confirm on the production domain (no preview toolbar) after go-live, and enable Web Analytics in the `da-web` Vercel project settings (your click).
- **F03 (AMBER) · copy #2 SLA.** "Get a cash offer within 24 hours" is now a firm 24-hour promise, firmer than the prior "one business day." Confirm you can hold that SLA before launch.

## Copy — requested vs shipped
| # | Requested | Shipped | Why |
|---|---|---|---|
| 1 | "…review the house, recent sales…" → "underwrite and run comps" | "We underwrite and run comps — we check the numbers and recent sales nearby." | You flagged the jargon; applied with a plain-English gloss. |
| 2 | "…written cash offer and decide." → "Get a cash offer within 24 hours." | "Get a cash offer within 24 hours." | Applied, sentence case. Flag: firm 24h SLA (F03). |
| 3 | Dictated "What Would Investor Value…" | "What Would an Investor Pay for Your House As-Is?" | Dictation ungrammatical; applied corrected grammatical version, intent intact. |
| 4 | "Enter the address. Let's talk shop offline." | "Enter the address. Let's talk shop offline." | Verbatim. |

## Background layer (§2)
Section confirmed: the **mid-page "Ask" band** (the oxblood accent block carrying swaps #3 & #4). Image: real Baltimore stone rowhouse, **not AI-generated**, Unsplash License (source in `lib/placeholder-images.ts`). Treatment: next/image + `mix-blend-luminosity` under an 88% oxblood scrim + gold overlay → net texture ~8% (inside 8–15% target); text sits on the scrim so WCAG AA holds. Caveat: Unsplash is a licensed placeholder; IMAGE_BRIEF wants MD-specific photography before final launch (known pre-launch swap, not a blocker).

## Legal (all DRAFT — read before launch)
Three pages, visible DRAFT banner, written from DA's real context. Full list: `legal/ATTORNEY_REVIEW.md` (15 assumptions, 4 placeholders).
**Placeholders still rendering literally:** `{{CONTACT_EMAIL}}` `{{CONTACT_PHONE}}` `{{MAILING_ADDRESS}}` `{{ENTITY_LEGAL_NAME}}` — fill before launch.
**Top 5 for the attorney:** (1) Md. Real Prop. §10-715 wholesaler notice; (2) entity = sole prop pending MD LLC; (3) governing law flipped DC→MD; (4) MODPA applicability; (5) "no fees / we pay closing costs" vs §14-104 transfer/recordation split.

## Honest answer
Ready to **look at** and ready to **submit to** — not yet ready to **trust** for a seller who needs a human. Clearing D5 (a real, monitored contact route) is the last thing between this and launch-ready, and it needs your ruling on C01, not more engineering.
