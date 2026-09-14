// Page copy. DRAFT awaiting Dofrane's Phase 6 ruling; the reviewable version with [VERIFY]
// markers lives in Drive: 07_Landing_Page/00_Brief/R03_COPY_DRAFT.md. The ruling edits strings
// here only; no component changes. Section order follows STRUCTURE_MAP.md.

export const PAGE_COPY = {
  brand: "Dofrane Acquisitions",
  previewBanner: "Preview. Copy is a draft awaiting ruling.",

  header: {
    badges: ["Maryland only", "Written cash offer", "No commission"],
  },

  hero: {
    eyebrow: "Maryland homeowners",
    headline: ["Sell Your Maryland House As It Stands.", "No Repairs, No Showings, No Commission."],
    subhead: "A written cash offer from one Maryland team. We close it, or we bring the buyer who does.",
    bullets: [
      { label: "Leave it as is.", text: "No repairs, no cleanout." },
      { label: "No commission.", text: "No agent fee comes out of your sale." },
      { label: "Your closing date.", text: "You pick the day." },
      { label: "No showings.", text: "One walkthrough, no open houses." },
    ],
    underButton: "See the number first. You decide after, and saying no costs nothing.",
    privacy: "Your details go to our team only. We never sell them.",
  },

  trust: {
    label: "What you can count on",
    tiles: ["Maryland only", "Written offer", "No commission", "You set the date"],
  },

  proof: {
    statement:
      "Every address is read by a person, not a pricing robot. The person who reviews your house is the person you talk to until closing.",
    columns: [
      { title: "Plain terms", text: "The offer says what you get and what you do not pay." },
      { title: "No pressure", text: "Say no and you will not hear from us again." },
      { title: "Maryland focus", text: "We only look at Maryland houses." },
    ],
  },

  direct: {
    eyebrow: "A direct sale",
    title: "A Straight Path for Maryland Homeowners",
    body: "Skip the listing, the repairs, the open houses and the months of waiting. Get a written number and decide from there.",
    note: "No listing agreement. No obligation to accept.",
  },

  situations: {
    eyebrow: "Who we help",
    title: "Houses That Are Hard to Sell the Usual Way",
    body: "You do not need to fix, clear out or stage anything. Tell us what is going on, and we will tell you if a direct offer fits.",
    cards: [
      { title: "You inherited a house.", text: "Decide what happens to it without months of sorting and repairs." },
      { title: "It needs real work.", text: "Roof, systems, water damage, code issues. We price it as it stands." },
      { title: "You are done renting it out.", text: "Tenant in place or empty, we look at it as is." },
      { title: "You need to move.", text: "Fewer people through the door and a closing date you choose." },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "Four Steps From Address to Offer",
    body: "The form asks for the address first, so we can start looking before we ask you anything else.",
    steps: [
      "Enter the address.",
      "Tell us about the house and how to reach you.",
      "We review the house, recent Maryland sales and your timeline.",
      "You get a written cash offer and decide.",
    ],
  },

  band: {
    title: "What Would Your House Bring As It Stands?",
    body: "Start with the address. We take it from there, privately.",
    note: "It takes about a minute.",
  },

  why: {
    eyebrow: "Why Dofrane",
    title: "Why Sellers Pick Dofrane",
    body: "No commission, no repair list, no cleaning, no showings. The work happens after closing, on our side.",
    cards: [
      { title: "A real number up front.", text: "After we review the house, you get our strongest written offer." },
      { title: "You stay in charge.", text: "No obligation to accept. If listing would net you more, we will say so." },
      { title: "One Maryland team.", text: "The person who reviews your house answers your questions." },
    ],
  },

  compare: {
    eyebrow: "Compare",
    title: "A Cash Offer Is Not a Listing",
    body: "Listing is the right move for some houses. A direct sale trades the top listing price for certainty and fewer moving parts.",
    rows: [
      { label: "List with an agent", text: "Repairs, showings, commission, buyer financing", ours: false },
      { label: "Sell it yourself", text: "Calls, strangers, contracts, paperwork", ours: false },
      { label: "Dofrane cash offer", text: "As is, no commission, your closing date", ours: true },
    ],
  },

  area: {
    eyebrow: "Where we look",
    title: "Making Offers Across Maryland",
    body: "Montgomery and Prince George's counties first. Somewhere else in Maryland? Start anyway, and we will confirm.",
    places: [
      "Montgomery County",
      "Prince George's County",
      "Rockville",
      "Silver Spring",
      "Bethesda",
      "Gaithersburg",
      "Germantown",
      "Bowie",
      "Laurel",
      "College Park",
      "Hyattsville",
      "Upper Marlboro",
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "What Sellers Ask First",
    items: [
      { q: "Do I have to fix anything first?", a: "No. We price the house as it stands today." },
      { q: "Are there fees or commissions?", a: "No agent commission." },
      { q: "How fast can we close?", a: "On the date you pick, once the title is clear." },
      { q: "What if I am not ready to sell yet?", a: "Get the number anyway. There is no obligation and no pressure to decide." },
    ],
  },

  footer: {
    line: "Written cash offers on Maryland houses, as they stand.",
    legal: "© 2026 Dofrane Acquisitions. No obligation to accept an offer.",
    // Counsel-owned. Verbatim from the live page; each line isolated for a one-edit swap.
    disclosures: [
      "An offer made through this page may involve the assignment of a contract for the purchase of the property. Any such assignment is disclosed in writing before settlement.",
      "Dofrane Acquisitions is not a real estate broker and does not provide brokerage services. We do not represent you in the sale of your property.",
      "An offer made here is not an appraisal and is not a valuation of your property.",
      "Calls are recorded only with the consent of all parties to the call.",
      "An offer made here does not affect a seller's disclosure obligations.",
      "We do business in accordance with federal fair housing law.",
    ],
  },
} as const;
