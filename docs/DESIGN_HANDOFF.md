# DESIGN_HANDOFF.md — Dofrane Acquisitions landing page (R04)

Snapshot 2026-09-14. Stack: Next.js 16 App Router (`app/page.tsx`), Vercel (`hod-web`-style project, env unset on previews),
Supabase Finance Core `fdjnkqrqkmsdibehcbuq`, schema `wholesale`, single RPC `public.inbound_submit`. Ruling K3: no `leads` table.
Sources of truth: `HOD_WHOLESALE-launch/db/SCHEMA_NOTES.md`, `migrations/2026-09-14_da_inbound_consent_attribution.sql`,
`docs/STRUCTURE_MAP.md` (section order), `docs/R04_PALETTE.md` (60 ivory / 30 oxblood `#3D0606` / 10 gold `#C5A059`).

## 1. Core flows

**F1 — Visitor → submit → desk (happy path)**
1. Visitor lands on `/`. Page is static; nothing is queried. `LeadForm` mounts inside `Hero` (`id="offer"`); `captureAttribution()` reads `gclid`/`utm_*`/`document.referrer`/pathname from the URL, stores first touch in `localStorage["da_first_touch"]` only when a gclid, utm_source or referrer exists.
2. Step 1 (address, ZIP; state fixed "MD") → Zod `stepAddress` on the client → Step 2 (condition, occupancy, timeline as radio tap-chips) → `stepProperty` → Step 3 (name, phone, email, consent, optional SMS consent) → `stepContact`. Every CTA on the page (`OfferCta`, sticky bar, header, footer) links to `#offer`; nothing else is interactive.
3. Submit → `POST /api/lead` with `{...values, attribution}`. Route re-validates with `leadSchema` (422 + `issues[]` on failure; the form jumps back to the owning step via `STEP_OF`).
4. Route reads `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (503 `not_configured` if unset), builds the payload with `buildInboundSubmit(lead, {ip, userAgent, page})`, and POSTs `/rest/v1/rpc/inbound_submit` with the publishable key.
5. RPC (security definer) writes, in one transaction: `wholesale.sellers` (1 row, `source='inbound'`, `channel='inbound_form'`, `channel_key='inbound'`, `consent='written'`, `consent_at=now()`), `wholesale.deals` (1 row, `stage='sourced'`, `submarket='inbound_unassigned'`, `seller_id`), `wholesale.consent_records` (1 row `kind='call_email'`, +1 row `kind='text'` when the SMS box was ticked). Returns `{ok:true, deal_id}`.
6. Route calls `notifyNewLead()` (best effort, never fails the lead), returns `{ok:true}`; form shows `LEAD_COPY.thanks` ("calls you within one business day" — [VERIFY], Dofrane confirms the window).
7. Desk: DNC check on `sellers.dnc_status` (trigger blocks `contacted` without it) → assigns `deals.submarket` and `deals.niche` at triage → `call_queue`.

**F2 — Return visitor**
1. Same static page; no session, no cookie, no personalisation. Only `localStorage["da_first_touch"]` persists, so a seller who first arrived via an ad and returns direct keeps the original campaign on `deals.utm`/`gclid`.
2. A second submission creates a second `sellers` + `deals` pair (no dedupe in the RPC; `sellers (lower(email))` index exists for the desk to spot it). Counts toward the hourly rate limit.

**F3 — Rejected submission**
| Case | Where it stops | What the seller sees |
|---|---|---|
| Non-Maryland ZIP (DC 200–205, VA 201/220–246) | client `MARYLAND_ZIP = /^2(0[6-9]\|1\d)\d{2}$/`, then server 422 | "Enter a Maryland ZIP code." on step 1 (ruling D4) |
| Consent unticked | client `z.literal(true)`, server 422; RPC also refuses (`ok:false`) | "Tick the box so we can contact you." |
| Honeypot `website` filled | RPC returns `{ok:true}` and writes nothing; route skips notify | success card (bot sees a normal thank-you) |
| Rate limit: ≥20 `sellers` with `source='inbound'` in the last hour | RPC `{ok:false,'try again later'}` → route 502 `rejected` | `LEAD_COPY.failed` ("Try once more in a minute…") |
| Env unset (`SUPABASE_URL`/`SUPABASE_PUBLISHABLE_KEY`) | route 503 | same failed line |
| RPC business error (missing address/phone/state) | RPC answers HTTP 200 with `ok:false`; route inspects the body, not the status → 502 | same failed line |

**F4 — Notification**
1. Fires only after the RPC returned `ok:true` and `website` was empty. 2. `POST LEAD_NOTIFY_WEBHOOK_URL`, 4 s timeout, JSON `{event:'inbound_lead', source:'landing_r04', at, dealId, zip, condition, occupancy, timeline}`. 3. Unset today → `{sent:false, reason:'not_configured'}`; the lead is already stored. See §5.

## 2. Screens and sections, in page order (`app/page.tsx`)

All render from `lib/page-copy.ts` (draft copy, `[VERIFY]` markers) except the form. Reads: none. Writes: only the form (§1 F1.5).

| # | `data-section` | Component (`components/landing/sections.tsx` unless noted) | Shows |
|---|---|---|---|
| 0 | — | `app/page.tsx` preview banner | `PAGE_COPY.previewBanner` when `VERCEL_ENV !== 'production'` |
| 0b | sticky bar | `sticky-bar.tsx` `StickyBar` | fixed top bar, hidden until `#hero-end` scrolls out; brand + `OfferCta`. No phone (C01) |
| 1 | `nav` | `Header` | brand wordmark, 3 badges (Maryland only · Written cash offer · No commission), inverted `OfferCta` |
| 2 | `hero` | `Hero` (+ `ParallaxSection`, `LeadForm`) | eyebrow, H1 two lines, subhead, 4 check bullets, form card `id="offer"`, under-button + privacy lines |
| 3 | `trust` | `TrustBar` | the one gold band; 4 tiles of terms we offer, not stats (R8: no invented proof) |
| 4 | `proof` | `ProofBand` | oxblood card: one statement + 3 columns (Plain terms · No pressure · Maryland focus). Empty of ratings/testimonials until real |
| 5 | `direct` | `DirectSale` | eyebrow/H2/body, `OfferCta`, "No listing agreement. No obligation to accept." |
| 6 | `situations` | `Situations` | 4 cards (inherited, repairs, tenant, fast/private) |
| 7 | `process` | `Process` | the one tinted section; 4 "Step n" pills |
| 8 | `band` | `AskBand` | photo + 88% scrim, question H2, inverted `OfferCta`, gold note |
| 9 | `why` | `WhyDofrane` | 3 cards |
| 10 | `compare` | `Compare` | honest 3-row table: List with an agent · Sell it yourself · Dofrane cash offer (`ours`, gold-tint) + `OfferCta` |
| 11 | `area` | `ServiceArea` | Maryland locality chips only (D4) |
| 12 | `faq` | `Faq` | native `<details>` items + `OfferCta` |
| 13 | `footer` | `Footer` | brand, one line, inverted `OfferCta`, 6 counsel-owned disclosures `data-disc="L1..L6"` (assignment, not a broker, not an appraisal, call recording, seller disclosures, fair housing), `legal` line |

Three-second test, as built: H1 line 1 "Sell Your Maryland House As It Stands." = 7 words naming the outcome (≤ 9 rule met; line 2 adds 6 more — copy ruling decides whether the second sentence stays in the H1 or drops to the subhead). Subhead kills repairs/fees/showings via the bullets. One CTA label everywhere: "Get Cash Offer". **No phone number anywhere** (C01). No chat widget, no timers, no exit modal (omitted by design, see `page.tsx` comment).

## 3. The form, field by field (`components/lead-form.tsx`, `lib/lead-schema.ts`, `lib/inbound-submit.ts`)

| Step | Field (`name`) | Type | Validation (`lead-schema.ts`) | RPC parameter | Lands in |
|---|---|---|---|---|---|
| 1 | `address` | text, `autocomplete=street-address` | trim, 5–200 chars | `p_address` | `deals.address` (≤200); `sellers.mailing_address` = `address + ', ' + city + ' ' + state + ' ' + zip` (≤300) |
| 1 | `zip` | text, numeric, maxLength 5 | `/^2(0[6-9]\|1\d)\d{2}$/` (MD only) | `p_zip`; also → `p_market` via `MARKET_BY_ZIP3` (13 county slugs) | `deals.zip`; `deals.market` |
| 1 | state | static "MD" (not an input) | — | `p_state='MD'`, `p_city=''` | `deals.state`; city null |
| 2 | `condition` | radio chips (4) | `z.enum(CONDITIONS)` | folded into `p_condition` as `condition=…\|occupancy=…\|source=landing_r04\|submit_at=…` | `sellers.notes` (≤500) |
| 2 | `occupancy` | radio chips (3) | `z.enum(OCCUPANCY)` | `p_need` (+ in `p_condition`) | `sellers.motivation_signals[]`, `deals.notes` |
| 2 | `timeline` | radio chips (5) | `z.enum(TIMELINES)` | `p_timeline` | `sellers.motivation_signals[]`, `deals.notes` |
| 3 | `name` | text | trim, 2–120 | `p_name` | `sellers.name` (≤120) |
| 3 | `phone` | tel | strip non-digits → `/^1?\d{10}$/` (required) | `p_phone` | `sellers.phone` (RPC keeps `[0-9+]`) |
| 3 | `email` | email | optional; valid email or "" | `p_email` | `sellers.email` (null when blank) |
| 3 | `consent` | checkbox, `CONSENT_TEXT` | `z.literal(true)` | `p_consent`, `p_consent_copy`, `p_consent_version='r04-c1'` | `sellers.consent='written'`, `consent_note`, `consent_at`; `consent_records` row `kind='call_email'` |
| 3 | `consentText` | checkbox, `CONSENT_TEXT_SMS`, optional | boolean, default false | `p_consent_text`, `p_consent_text_copy` | `sellers.consent_text`, `consent_text_note`; `consent_records` row `kind='text'` |
| hidden | `website` | off-screen honeypot | ≤200, default "" | `p_website` | nothing (silent ok) |
| hidden | `attribution` | from `captureAttribution()` | each ≤200, referrer ≤500 | `p_gclid`, `p_utm` (jsonb: utm_* + `first_touch_at`), `p_referrer`, `p_variant='r04'`, `p_page` (landing_page or `referer` header) | `deals.gclid`, `deals.utm`, `deals.referrer`, `deals.variant`; `consent_records.page_url` |
| server | request context | `x-forwarded-for`/`x-real-ip`, `user-agent` | ip ≤45, ua ≤400 | `p_ip`, `p_user_agent` | `consent_records.ip` (inet), `consent_records.user_agent`, `created_at` = timestamp |

13 fields (10 visible + state + 2 hidden) → 24 RPC parameters. `p_consent` keeps its name (a rename returned PGRST202 and lost leads silently, 2026-09-09). `deals.acquisition_cost_usd` is never set at submit (CFO reconciliation).

## 4. Auth and access

- Visitors: no auth, no cookies, no third-party scripts, no tag manager. The browser never talks to Supabase.
- `/api/lead`: publishable key only (`apikey` + `Bearer`), against the RPC only. The RPC is `security definer` with `search_path wholesale, public`, so the anon role never needs table grants. Service role: never in the page, never in Vercel env for this project.
- Tables: RLS on every `wholesale` table. `consent_records`: `seat_all` (all) to `hod_wholesale`, `ceo_ro`/`caio_ro` (select) to `hod_ceo`/`hod_caio`; update/delete revoked for all three — append-only evidence.
- MCP: role `da_readonly` (nologin until SWX sets the password in the SQL editor), `select` on all `wholesale` tables + `da_readonly_ro` policy on each. Reads only; writes stay in the RPC.

## 5. Notification (`lib/notify-lead.ts`)

- Env `LEAD_NOTIFY_WEBHOOK_URL` — **unset**. The desk sets it to `HOD_CEO /wcc/notify` (or an equivalent that posts the Telegram card to the Dofrane Acquisitions thread). Until then every lead stores silently and the desk reads `wholesale.deals where source='inbound' order by created_at desc`.
- Payload carries: `event`, `source='landing_r04'`, `at`, `dealId`, `zip`, `condition`, `occupancy`, `timeline`. Deliberately omits name, phone, email, street address: the chat never holds seller PII; the desk opens the deal by id.
- Failure modes are swallowed (`not_configured`, `http_<status>`, `error`); nothing is retried. A dead webhook is invisible today — the weekly report should compare inbound `deals` count to cards sent.

## 6. Scope

**Go-live (MVP):** static page as above · 3-step form · MD-only ZIP gate · consent + SMS-consent evidence · attribution on real columns · honeypot + RPC rate limit · footer disclosures · preview banner off in production · Vercel env placed · webhook set.
**Later (marked):** [LATER] Google Places autocomplete (key, cost, privacy decision, Phase 5 flag) · [LATER] texting (A2P 10DLC registration; `consent_text` is collected now so the record exists) · [LATER] chat widget (excluded by conversion rule, revisit only with a staffed desk) · [LATER] second-step dedupe by phone/email · [LATER] real proof (ratings, closed-deal count, testimonial) once a first deal closes · [LATER] phone CTAs (after C01).

## 7. Open rulings touching the page

| ID | Ruling | Blocker | Effect on the page |
|---|---|---|---|
| Copy | Phase 6 copy ruling, 9 decisions (Drive `07_Landing_Page/00_Brief/R03_COPY_DRAFT.md`, `[VERIFY]` markers) | ruling | every string in `page-copy.ts` and `lead-copy.ts` except `CONSENT_TEXT`; H1 second line; thank-you response window |
| C01 | Published phone number / channel | ruling | no `tel:` anywhere; header, sticky bar, band, FAQ, footer carry form CTAs only |
| K1 | Principal buyer vs may-assign framing | ruling + legal | subhead "We close it, or we bring the buyer who does" (D1) and footer disclosure L1 (assignment) |
| Legal | 6 footer disclosures and `CONSENT_TEXT_SMS` (TCPA_CONSENT_LANGUAGE.md) drafted, attorney review pending | legal | `data-disc L1–L6`, the SMS checkbox copy, `CONSENT_VERSION` bump on any change |
| Env | `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `LEAD_NOTIFY_WEBHOOK_URL` unset on Vercel; `da_readonly` password unset | secret (SWX, `--stdin`) | form returns 503 on previews; no cards; no MCP reads |
| D4 | Maryland only | closed | ZIP regex, "MD" static state, service-area chips |
| K3 | No `leads` table | closed | inbound = `sellers` + `deals` + `consent_records` via the RPC |
