// Every string the lead form shows. DRAFT: final wording is ruled at the Phase 6 copy gate.
// CONSENT_TEXT is not draft. It is the consent line already approved on the live form, and it is
// also written into the lead record as the text the seller agreed to.

export const CONSENT_TEXT = "I am asking Dofrane Acquisitions to call or email me about this property.";

export const LEAD_COPY = {
  cta: "Get Cash Offer",
  back: "Back",
  progress: (step: number, total: number) => `Step ${step} of ${total}`,
  steps: [
    { title: "Where is the house?", hint: "Start with the address. It takes about a minute in total." },
    { title: "Tell us about the house.", hint: "Rough answers are fine." },
    { title: "Where should we reach you?", hint: "One person reads every submission." },
  ],
  fields: {
    address: { label: "Property address", placeholder: "123 Main St, Rockville" },
    zip: { label: "ZIP code", placeholder: "20850" },
    condition: { label: "Condition" },
    occupancy: { label: "Who lives there now?" },
    timeline: { label: "When do you want to sell?" },
    name: { label: "Your name" },
    phone: { label: "Phone", placeholder: "301 555 0142" },
    email: { label: "Email (optional)" },
  },
  options: {
    condition: {
      move_in_ready: "Move-in ready",
      needs_some_work: "Needs some work",
      needs_major_repairs: "Needs major repairs",
      not_sure: "Not sure",
    },
    occupancy: {
      owner_occupied: "I live there",
      tenant_occupied: "A tenant lives there",
      vacant: "It is empty",
    },
    timeline: {
      asap: "As soon as possible",
      within_30_days: "Within 30 days",
      one_to_three_months: "In 1 to 3 months",
      three_months_plus: "In 3 months or more",
      just_exploring: "Just exploring",
    },
  },
  sending: "Sending...",
  failed: "That did not send. Try once more in a minute. If it still fails, the fault is ours, not yours.",
  // [VERIFY] The follow-up window is a promise. Dofrane confirms the real response time.
  thanks: {
    title: "Got it. Your address is in.",
    body: "One of us reviews the house and calls you within one business day with next steps.",
  },
} as const;
