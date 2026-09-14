import { CONSENT_TEXT } from "@/lib/lead-copy";
import type { Lead } from "@/lib/lead-schema";

// Maps a validated lead onto public.inbound_submit. THE WIRE CONTRACT IS FROZEN: twelve p_*
// parameters, matched by NAME by PostgREST. Adding or renaming one (p_consent in particular)
// returns PGRST202 and loses the submission silently; it has happened once on this site.
//
// Ruling R4: no new table. The step-2 qualifiers and the attribution ride in the existing
// parameters until the wholesale desk's attribution migration adds real columns:
//   p_condition -> wholesale.sellers.notes (500 chars): condition, occupancy, source, [attr] line
//   p_timeline, p_need -> wholesale.sellers.motivation_signals

export type InboundSubmitPayload = {
  p_name: string;
  p_phone: string;
  p_email: string;
  p_address: string;
  p_city: string;
  p_state: string;
  p_zip: string;
  p_condition: string;
  p_timeline: string;
  p_need: string;
  p_consent: boolean;
  p_website: string;
};

const clean = (value: string | undefined, max = 60) => (value ?? "").replace(/[|\n\r]/g, " ").trim().slice(0, max);

export function buildInboundSubmit(lead: Lead, submittedAt: Date = new Date()): InboundSubmitPayload {
  const a = lead.attribution ?? {};
  const attr = Object.entries({
    first_at: a.first_touch_at,
    gclid: a.gclid,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_term: a.utm_term,
    utm_content: a.utm_content,
    ref: a.referrer,
    landing: a.landing_page,
  })
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}=${clean(v)}`);
  attr.push(`submit_at=${submittedAt.toISOString()}`, `consent_shown=${clean(CONSENT_TEXT, 120)}`);

  const facts = [`condition=${lead.condition}`, `occupancy=${lead.occupancy}`, "source=landing_r03"];

  return {
    p_name: lead.name,
    p_phone: lead.phone,
    p_email: lead.email,
    p_address: lead.address,
    p_city: "",
    p_state: "MD",
    p_zip: lead.zip,
    p_condition: `${facts.join(" | ")} | [attr] ${attr.join(" | ")}`.slice(0, 500),
    p_timeline: lead.timeline,
    p_need: lead.occupancy,
    p_consent: lead.consent === true,
    p_website: lead.website ?? "",
  };
}
