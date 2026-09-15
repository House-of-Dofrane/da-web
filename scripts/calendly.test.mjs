import crypto from "crypto";
import { verifyCalendlySignature, mapCalendlyPayload } from "../lib/calendly.ts";

let pass = 0, fail = 0;
const ok = (name, cond) => { (cond ? pass++ : fail++); console.log(`${cond ? "PASS" : "FAIL"}  ${name}`); };

// ---- signature ----
const key = "test_signing_key_123";
const body = JSON.stringify({ event: "invitee.created", payload: { name: "A" } });
const t = Math.floor(Date.now() / 1000);
const sig = crypto.createHmac("sha256", key).update(`${t}.${body}`).digest("hex");
ok("valid signature verifies", verifyCalendlySignature(body, `t=${t},v1=${sig}`, key) === true);
ok("tampered body rejected", verifyCalendlySignature(body + "x", `t=${t},v1=${sig}`, key) === false);
ok("wrong key rejected", verifyCalendlySignature(body, `t=${t},v1=${sig}`, "other_key") === false);
ok("missing header rejected", verifyCalendlySignature(body, null, key) === false);
const oldT = t - 4000;
const oldSig = crypto.createHmac("sha256", key).update(`${oldT}.${body}`).digest("hex");
ok("stale timestamp (replay) rejected", verifyCalendlySignature(body, `t=${oldT},v1=${oldSig}`, key) === false);

// ---- mapping (realistic Calendly invitee.created payload) ----
const payload = {
  name: "Jordan Miller",
  email: "jordan@example.com",
  text_reminder_number: "+14105551212",
  questions_and_answers: [
    { question: "What is the reason for the call?", answer: "Exploring my options", position: 0 },
    { question: "What would you like us to know before the call, so we can prepare?", answer: "Inherited a rowhouse in Hampden, deciding whether to sell.", position: 1 },
  ],
  uri: "https://api.calendly.com/scheduled_events/EV123/invitees/IN456",
  scheduled_event: {
    uri: "https://api.calendly.com/scheduled_events/EV123",
    start_time: "2026-09-25T18:00:00.000000Z",
    event_memberships: [{ user_email: "swx@dofraneacquisitions.com", user_name: "SWX" }],
  },
};
const row = mapCalendlyPayload("invitee.created", payload);
ok("name mapped", row.name === "Jordan Miller");
ok("email mapped", row.email === "jordan@example.com");
ok("phone from reminder number", row.phone === "+14105551212");
ok("reason mapped", row.reason === "Exploring my options");
ok("agenda_note mapped (mandatory)", row.agenda_note.startsWith("Inherited a rowhouse"));
ok("event id = scheduled_event uri", row.calendly_event_id === "https://api.calendly.com/scheduled_events/EV123");
ok("scheduled_at mapped", row.scheduled_at === "2026-09-25T18:00:00.000000Z");
ok("status scheduled", row.status === "scheduled");
ok("host email passthrough (rep)", row.assigned_rep === "swx@dofraneacquisitions.com");

// "Other" reason
const otherRow = mapCalendlyPayload("invitee.created", {
  ...payload,
  questions_and_answers: [
    { question: "What is the reason for the call?", answer: "Other" },
    { question: "If other, please specify", answer: "Zoning question" },
    { question: "What would you like us to know before the call?", answer: "Need zoning help." },
  ],
});
ok('"Other" reason captures free text', otherRow.reason_other === "Zoning question");

// canceled event
const canceledRow = mapCalendlyPayload("invitee.canceled", payload);
ok("canceled status", canceledRow.status === "canceled");

// empty agenda falls back (NOT NULL safety)
const bare = mapCalendlyPayload("invitee.created", { name: "X", scheduled_event: { uri: "u" } });
ok("agenda fallback when missing", bare.agenda_note === "(none provided)");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
