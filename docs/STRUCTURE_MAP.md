# STRUCTURE_MAP.md: casaoffers.com reference

Captured 2026-09-13 from https://www.casaoffers.com (base URL) in a live Chrome session at 1512 px
width: rendered screenshots, DOM inspection, and network requests. The form was never submitted.
Structure only. **Copy law:** every text block below is recorded as its persuasion beat
(pain / promise / proof / process / ask / reassurance / urgency), never its sentences. Nothing here
is carried into our page verbatim; all copy is drafted fresh in Phase 6.

---

## 1. Page skeleton

| Metric | Value |
|---|---|
| Page height at 1512 px | 4,939 px |
| Sections | 12 visible blocks + 1 sticky bar + 1 hidden modal |
| Photos | 2 (hero background, testimonial portrait) |
| Form entry points | 9 form CTAs, 7 `tel:` links |
| Section rhythm | Centered eyebrow label flanked by short rules, then H2, then a 1-2 line paragraph, then content |
| Palette logic | White and a pale tint alternate; navy for the testimonial card, the mid-page band and the footer; one green for every primary action |
| Stack observed | WordPress + Gravity Forms (+ Geolocation add-on), GTM, Google Ads, Bing UET, Hotjar, Cloudflare |

---

## 2. Section inventory, in order

| # | Section | Layout | Beats |
|---|---|---|---|
| 0 | **Header** | Logo left; three inline trust badges (review rating + count, homes-bought count, local-team badge) and a phone block right. ~93 px, not sticky | proof, reassurance, alternate ask (call) |
| 0b | **Sticky recovery bar** | `position: fixed` nav, hidden at load, appears once the hero scrolls away: logo left, outline call button + green form button right | ask (always in reach) |
| 1 | **Hero** | Full-bleed house photo with a light wash fading left-to-right. Two columns: copy left (~55%), white form card right (~28%, shadowed). ~550 px tall | see §3 |
| 2 | **Trust bar** | Small centered label, then 4 stat tiles in one row split by dividers: rating + review count, no-obligation %, homes-bought count, years in business | proof |
| 3 | **Testimonial band** | One wide navy rounded card: portrait photo left (~15%), quote + first-names-and-city attribution center, 3 icon mini-columns right (response speed, fairness, local) | proof, reassurance |
| 4 | **Direct-sale option** | Centered: eyebrow, H2 naming the audience by state, 2-line paragraph, primary + outline buttons side by side, bold reassurance line under | promise (clear option minus the listing pains) → ask → reassurance |
| 5 | **Situations** | Tinted. Eyebrow, 2-line H2, paragraph, 4 equal cards in a row (inherited, repairs needed, rental/tenant, fast or private sale), each a title + 3-4 line body | pain (self-identification) |
| 6 | **Process** | Eyebrow, H2, paragraph that explains why the form asks for the address first, 4 step cards in a row, each a green "STEP n" pill + one sentence | process |
| 7 | **Mid-page ask band** | Full-width navy. Centered question headline, one line, primary + outline buttons, micro line steering urgent sellers to the phone | ask, reassurance (channel choice) |
| 8 | **Why sellers choose** | Eyebrow, H2, paragraph, 3 cards (strongest as-is offer, you stay in control / will say if listing is better, bilingual support) | promise, reassurance (control, candor) |
| 9 | **Comparison** | Tinted. Eyebrow, 2-line H2, paragraph that concedes listing suits some sellers, then 3 stacked full-width rows (listing: burdens; FSBO: burdens; brand: benefits, green border + check), one centered CTA | proof by contrast (with concession) → ask |
| 10 | **Service area** | Eyebrow, H2, paragraph ending "outside the list? start anyway", 13 locality chips | reassurance (coverage objection) |
| 11 | **FAQ** | Tinted. Eyebrow, H2, 4 native `<details>` accordions (repairs, fees, speed, not ready yet), primary + outline buttons under | reassurance (objections) → ask |
| 12 | **Footer** | Navy, centered: brand, one-sentence what/where/without description, primary + outline buttons, privacy / terms / Spanish links, copyright + no-obligation line | ask, compliance |
| 13 | **Recovery / exit modal** (hidden) | Single-column overlay: incentive headline (cash advance before closing), 5 fields, submit, "no thanks" dismiss, privacy line | urgency / incentive → ask |

---

## 3. Hero, element by element

| Element | Pattern | Beat |
|---|---|---|
| Eyebrow | Local + trusted + cash buyer identity | proof |
| H1 (3 lines, 8 words) | "Sell [the house] without [pain 1], [pain 2], or [pain 3]": a pain-removal triad | pain → promise |
| Subhead (1 sentence) | Fast + no-obligation offer, from a local team, selling made simple | promise |
| 4 check bullets | Bold 2-4 word label + short gloss: as-is, no fees/commissions, your timeline, no showings | promise stack |
| Form card | Progress row, card headline, time-cost line, address field, example format, button, micro-reassurance, privacy line | see §4 |

---

## 4. Form mechanics

### Step 1: hero card (`gform_7`)

| Aspect | Observed |
|---|---|
| Progress indication | "Step 1 of 2" label + two numbered dots joined by a line; dot 1 filled green |
| Visible fields | **One**: property address, single-line text, map-pin icon, "start typing" placeholder |
| Address entry behavior | **Google Places Autocomplete.** On first focus the page lazy-loads the Google Maps JavaScript API with the `places` library (Gravity Forms Geolocation add-on) and attaches Google's suggestion dropdown (`.pac-container`). Picking a suggestion fills hidden street / city / state / ZIP / country subfields and latitude + longitude |
| Helper text | Example address format under the field |
| Time-cost promise | ~30 seconds, stated above the field |
| Button | Full-width green, arrow glyph; label promises *seeing your offer options*, not "submit" |
| Micro-reassurance | Under the button: get the number first, decide later, never costs anything |
| Privacy line | Lock icon + information is secure and not shared |
| Hidden fields | ~26 generic hidden inputs (names are `input_N`, so tracking purpose is inferred, not read), a unique-ID field, a honeypot text input, and a hidden step-destination field |
| Client validation | None in HTML (no `required` or `pattern`); Gravity Forms AJAX submission, so validation is server-returned |
| Submit path | POST to the same page (AJAX); the hidden destination field indicates step 1 hands off to a separate step-2 view |

### Step 2: not observable from outside

The page's own process section implies step 2 asks for the best way to reach the seller plus details
that matter (condition, timeline). Field count, field types, validation and the thank-you state are
only visible after a real submission, which was not made.

### Recovery form (`gform_27`, hidden modal)

| Aspect | Observed |
|---|---|
| Steps | One |
| Fields | Full name (text), phone (tel), email, property address (same autocomplete field), SMS/call consent checkbox (required by label; the consent field also stores its text and description in hidden subfields) |
| Hidden fields | ~20 generic hidden inputs, honeypot, a recovery-context field |
| Trigger | Not determined. The class and field names (`recovery`) suggest exit intent or an abandoned step 1 |
| Offer | A cash advance before closing, framed as paid from sale proceeds |

---

## 5. Conversion elements

**Headline patterns**
- H1: pain-removal triad ("without A, B, or C").
- H2s: an eyebrow naming the section's job, then a benefit statement or a question.
- Mid-page band: a curiosity question about what the house is worth as-is.

**Subhead pattern:** one sentence: benefit + no-obligation qualifier + who delivers it.

**Reassurance devices** (count of placements)
- No obligation: 6+ (hero micro line, trust bar, section 4, why-choose, footer, FAQ)
- Time cost: 1 (30 seconds)
- Privacy: 2 (hero card, modal)
- Numeric proof: rating + review count, homes bought, years in business (header and trust bar)
- Testimonial: 1 named-initial couple with city and photo
- Response speed: 1 (minutes)
- Candor concession: 2 (listing may suit you; we will tell you if listing is better)
- Coverage: 1 (outside the list, start anyway)
- Channel choice: 2 (call if urgent; call with questions)
- Bilingual support: 2 (why-choose card, footer link)

**Urgency devices:** light. Speed is offered as a benefit ("close on your timeline", fast responses);
the only hard incentive is the hidden modal's cash advance.

**CTA placement**

| Location | Primary (form) | Secondary |
|---|---|---|
| Header | none | phone block |
| Hero card | options-framed submit | none |
| Sticky bar | form button | call button |
| Direct-sale option | form | call |
| Mid-page band | form | talk to us |
| Comparison | form | none |
| FAQ | form | call with questions |
| Footer | form | call |
| Modal | submit | dismiss |

Primary label is consistent below the hero; the hero button alone uses different framing. Buttons are
rectangles with a small radius: green fill for the primary, navy outline for the secondary.

---

## 6. What could not be determined from outside

| # | Unknown | Why |
|---|---|---|
| U1 | Step-2 fields, count, order, validation messages | Only rendered after a real step-1 submit |
| U2 | Thank-you state and the follow-up promise it makes | Post-submit only |
| U3 | Whether step 1 alone creates a lead record | Server-side |
| U4 | Where leads go (CRM, email, SMS) | Backend not visible |
| U5 | Recovery modal trigger (exit intent, timer, abandonment) | Trigger logic not inspected; no exit attempted |
| U6 | What the ~46 hidden fields capture | Generic `input_N` names |
| U7 | Mobile layout and sticky behavior below 768 px | Window could not be resized in this session |
| U8 | A/B variants or personalization | Single visit |

---

## 7. Carry-over constraints for our build (Phase 5 and 6 inputs, not copy)

| Reference element | Our position | Rule |
|---|---|---|
| Rating, review count, homes-bought count, years in business, testimonial | We have none of these yet | R8: no invented proof. Replace with terms we actually offer |
| Phone number and call CTAs (7) | No published phone or email yet | C01 open: secondary CTAs wait for a real channel, or drop |
| Bilingual support | Not an offered service today | Do not claim |
| Cash-advance incentive modal | Not offered | Omit |
| SMS consent | No A2P 10DLC registration | Call and email consent only |
| Service-area chips | Maryland only | D4 |
| "We buy" framing | Assignment standard | D1: "we close it, or we bring the buyer who does" |
| Google Places Autocomplete | Optional enhancement | Phase 5 flag: key, cost, privacy decision |
