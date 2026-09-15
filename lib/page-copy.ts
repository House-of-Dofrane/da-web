// Page copy: the R04 Maryland cash-buyer draft (Drive 07_Landing_Page/00_Brief/R04_COPY_DRAFT.md)
// wired 2026-09-14 on the nine recommended defaults; ruling L01 confirmed 2026-09-15 (Dofrane: "defaults").
// Defaults applied: K1 may-assign disclosed · we pay our own closing costs, transfer/recordation per
// contract [VERIFY] · fastest close 14 days once title is clear [VERIFY] · one business day response ·
// street-level pricing claim kept [VERIFY] · "best cash number, in writing" (not "strongest") ·
// tax card softened to carrying costs (PHIFA) · six-county coverage kept · consent Option C (form).
// [VERIFY] items are still open verification, not part of the L01 ruling — see docs/LAUNCH_AUDIT.md.
// Footer L1 says "before you sign" (Md. Real Prop. § 10-715 notice before contract), attorney review pending.
// The ruling edits strings here only; no component changes. Section order follows STRUCTURE_MAP.md.

export const PAGE_COPY = {
  brand: "Dofrane Acquisitions",
  previewBanner: "Preview build. Copy confirmed (L01, 2026-09-15).",

  header: {
    badges: ["Maryland cash buyers", "Cash offer in writing", "No commission to you"],
  },

  hero: {
    eyebrow: "Maryland cash home buyers",
    headline: ["A Cash Offer for Your Maryland House, As Is.", "No repairs. No agent. No buyer's loan to fall through."],
    subhead:
      "Local cash buyers from Baltimore to Bethesda. Give us the address, and we provide a written cash offer to you in 24 hours.",
    bullets: [
      { label: "Sold as is.", text: "Leave the repairs and the cleanout to us." },
      { label: "No commission.", text: "No agent fee comes out of your cash, and we pay our own closing costs." },
      { label: "Your closing date.", text: "You choose it, as soon as 14 days once title is clear." },
      { label: "No showings.", text: "One walkthrough, no open houses." },
    ],
    underButton: "See your cash number first. Say no and it costs you nothing.",
    privacy: "We use your details only to prepare your cash offer. We never sell them.",
  },

  trust: {
    label: "Built for Maryland sellers",
    tiles: ["Baltimore City & County", "Prince George's & Montgomery", "Anne Arundel & Howard", "Cash offer in writing"],
  },

  proof: {
    statement:
      "A rowhouse in Hampden and a rancher in Glen Burnie do not sell the same way. We price each Maryland house on what cash buyers actually pay on that street.",
    columns: [
      { title: "Street-level pricing", text: "Recent Maryland sales near your house, not a national formula." },
      { title: "Maryland paperwork", text: "Estates, liens and open permits handled with your attorney or title company." },
      { title: "Straight answers", text: "If a cash sale is the wrong move for you, we say so." },
    ],
  },

  direct: {
    eyebrow: "A direct cash sale",
    title: "A Cash Option Built for Maryland Homeowners",
    body: "Skip the listing, the repairs, the open houses and the months waiting on a buyer's lender. Get a cash offer for the house exactly as it stands.",
    note: "No listing agreement. No obligation to accept our cash offer.",
  },

  situations: {
    eyebrow: "Maryland situations we buy in",
    title: "Maryland Houses That Are Hard to Sell the Usual Way",
    body: "No repairs, no cleanout, no staging. Tell us what is going on and we will tell you if a cash offer fits.",
    cards: [
      {
        title: "You inherited a Maryland house.",
        text: "Estate still open with the county Register of Wills? We can make a cash offer and work the timing out with the estate's attorney.",
      },
      {
        title: "Code violations or open permits.",
        text: "A notice from Baltimore City housing inspectors or your county's code enforcement does not stop a cash offer. We price the house with the violations in it.",
      },
      {
        title: "Carrying costs you do not want to keep paying.",
        text: "Taxes, insurance and upkeep on a house you do not live in add up every month. A cash sale ends the bills.",
      },
      {
        title: "Relocating out of Maryland.",
        text: "A new job, military orders from Fort Meade or Joint Base Andrews, or family out of state. Close on a date that fits the move.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "From Address to Cash Offer in Four Steps",
    body: "We ask for the address first, so we can start reviewing the house before we ask you anything else.",
    steps: [
      "Enter the Maryland address.",
      "Tell us about the house and the best way to reach you.",
      "We underwrite and run comps — we check the numbers and recent sales nearby.",
      "Get a cash offer within 24 hours.",
    ],
  },

  band: {
    title: "What Would an Investor Pay for Your House As-Is?",
    body: "Enter the address. Let's talk shop offline.",
    note: "It takes about a minute.",
  },

  why: {
    eyebrow: "Why Dofrane",
    title: "Why Maryland Sellers Take Our Cash Offer",
    body: "No commission, no repair demands, no cleaning, no showings. We buy the house as is and handle the work after closing.",
    cards: [
      { title: "Our best cash number, in writing.", text: "We review the house and put our best cash number in front of you, in writing." },
      { title: "You stay in control.", text: "No obligation to accept. If listing would net you more, we will tell you." },
      { title: "Maryland-focused.", text: "We only buy Maryland houses, so Maryland's rules are the only ones we work in." },
    ],
  },

  compare: {
    eyebrow: "Compare your options",
    title: "A Cash Offer Is Not a Listing",
    body: "Listing can make sense for a move-in-ready house. A cash sale trades the top listing price for certainty and fewer moving parts.",
    rows: [
      { label: "Traditional listing", text: "Repairs, showings, commission, a buyer's loan approval", ours: false },
      { label: "For sale by owner", text: "Your calls, your showings, your contracts", ours: false },
      { label: "Dofrane cash offer", text: "As is, no commission, cash at closing, your date", ours: true },
    ],
  },

  area: {
    eyebrow: "WHERE WE BUY?",
    title: "Cash Offers Across Central Maryland",
    body: "Baltimore City and the counties around it, down to the DC line. Somewhere else in Maryland? Start anyway and we will confirm.",
    places: [
      "Baltimore City",
      "Baltimore County",
      "Anne Arundel County",
      "Howard County",
      "Prince George's County",
      "Montgomery County",
      "Hampden",
      "Canton",
      "Towson",
      "Dundalk",
      "Catonsville",
      "Annapolis",
      "Glen Burnie",
      "Columbia",
      "Ellicott City",
      "Bowie",
      "Laurel",
      "Hyattsville",
      "Silver Spring",
      "Rockville",
      "Gaithersburg",
      "Germantown",
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "What Sellers Ask First",
    items: [
      { q: "Do I need to fix anything before you make a cash offer?", a: "No. We make a cash offer on the house as it stands, open code violations included." },
      {
        q: "Are there fees or commissions?",
        a: "No agent commission. We pay our own closing costs. Maryland transfer and recordation taxes are split as the contract states.",
      },
      { q: "How fast can you close?", a: "On the date you choose, as soon as 14 days once title is clear." },
      { q: "What if I am not ready to sell yet?", a: "Get the cash number anyway. No obligation and no pressure." },
    ],
  },

  footer: {
    line: "Cash offers on Maryland houses as they stand, from Baltimore City to Montgomery County.",
    legal: "© 2026 Dofrane Acquisitions. No obligation to accept any offer.",
    // Counsel-owned. L1 updated 2026-09-14 from "before settlement" to "before you sign" (Md. Real Prop. § 10-715);
    // each line isolated for a one-edit swap once the attorney review returns.
    disclosures: [
      "An offer made through this page may involve the assignment of a contract for the purchase of the property. Any such assignment is disclosed to you in writing before you sign.",
      "Dofrane Acquisitions is not a real estate broker and does not provide brokerage services. We do not represent you in the sale of your property.",
      "An offer made here is not an appraisal and is not a valuation of your property.",
      "Calls are recorded only with the consent of all parties to the call.",
      "An offer made here does not affect a seller's disclosure obligations.",
      "We do business in accordance with federal fair housing law.",
    ],
  },
} as const;
