import { z } from "zod";

// Maryland ZIP codes run 20600-21999 (ruling D4: Maryland only). DC (200-205) and Virginia
// (201, 220-246) fail here, on the client and again on the server.
const MARYLAND_ZIP = /^2(0[6-9]|1\d)\d{2}$/;

export const CONDITIONS = ["move_in_ready", "needs_some_work", "needs_major_repairs", "not_sure"] as const;
export const OCCUPANCY = ["owner_occupied", "tenant_occupied", "vacant"] as const;
export const TIMELINES = ["asap", "within_30_days", "one_to_three_months", "three_months_plus", "just_exploring"] as const;

// Step 1: address first, as the reference does.
export const stepAddress = z.object({
  address: z.string().trim().min(5, { error: "Enter the street address." }).max(200),
  zip: z.string().trim().regex(MARYLAND_ZIP, { error: "Enter a Maryland ZIP code." }),
});

// Step 2: property and timeline qualifiers.
export const stepProperty = z.object({
  condition: z.enum(CONDITIONS, { error: "Pick the closest match." }),
  occupancy: z.enum(OCCUPANCY, { error: "Pick who lives there now." }),
  timeline: z.enum(TIMELINES, { error: "Pick a timeline." }),
});

// Step 3: contact capture. inbound_submit needs a phone or an email; the phone is required here
// so the desk can call, and the email is optional.
export const stepContact = z.object({
  name: z.string().trim().min(2, { error: "Enter your name." }).max(120),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().regex(/^1?\d{10}$/, { error: "Enter a 10-digit phone number." })),
  email: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === "" || z.email().safeParse(v).success, { error: "Enter a valid email, or leave it blank." }),
  consent: z.literal(true, { error: "Tick the box so we can contact you." }),
});

export const STEPS = [stepAddress, stepProperty, stepContact] as const;

const tracked = z.string().max(200).optional();

export const attributionSchema = z
  .object({
    gclid: tracked,
    utm_source: tracked,
    utm_medium: tracked,
    utm_campaign: tracked,
    utm_term: tracked,
    utm_content: tracked,
    referrer: z.string().max(500).optional(),
    landing_page: tracked,
    first_touch_at: z.string().max(40).optional(),
  })
  .partial();

export const leadSchema = z.object({
  ...stepAddress.shape,
  ...stepProperty.shape,
  ...stepContact.shape,
  website: z.string().max(200).optional().default(""),
  attribution: attributionSchema.optional().default({}),
});

export type Lead = z.infer<typeof leadSchema>;
export type Attribution = z.infer<typeof attributionSchema>;
