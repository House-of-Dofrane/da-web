import type { Metadata } from "next";
import type { ReactNode } from "react";

// Privacy Policy — DRAFT, pending attorney review.
// Adapted from the DA legal pass (Drive 07_Landing_Page/00_Brief/legal/PRIVACY_POLICY_DRAFT.md,
// TCPA_CONSENT_LANGUAGE.md, COMPLIANCE_FLAGS.md). Voice and disclosures mirror lib/page-copy.ts
// footer.disclosures and lib/lead-copy.ts consent wording — do not diverge from those strings.
//
// Placeholders that MUST be filled before go-live are written as {{TOKENS}} and listed in
// /legal/ATTORNEY_REVIEW.md: {{CONTACT_EMAIL}}, {{CONTACT_PHONE}}, {{MAILING_ADDRESS}},
// {{ENTITY_LEGAL_NAME}} (the Maryland LLC name, once the filing clears). [CONFIRM: ...] markers are
// facts the business has not yet supplied; they are enumerated in ATTORNEY_REVIEW.md.

export const metadata: Metadata = {
  title: "Privacy Policy | Dofrane Acquisitions",
  description:
    "How Dofrane Acquisitions collects, uses, shares, and protects information from Maryland home sellers who request a cash offer.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "September 14, 2026";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-7 text-lg font-bold tracking-tight text-foreground">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-relaxed text-foreground">{children}</p>;
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-4 grid list-disc gap-2 pl-6 text-base leading-relaxed text-foreground">{children}</ul>;
}

function Confirm({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-gold-tint px-1.5 py-0.5 text-sm font-semibold text-gold-ink">
      [CONFIRM: {children}]
    </span>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="bg-oxblood px-4">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between">
          <a
            href="/"
            className="text-sm font-bold uppercase tracking-[0.24em] text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Dofrane Acquisitions
          </a>
          <a href="/" className="text-sm font-semibold text-gold underline-offset-4 hover:underline">
            Back to home
          </a>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:py-14">
        <article className="mx-auto max-w-3xl">
          <div
            role="note"
            className="rounded-xl border-2 border-oxblood bg-gold-tint p-4 text-sm font-semibold text-oxblood"
          >
            DRAFT — pending attorney review. This page has not been reviewed by a licensed attorney and
            must not be treated as final or as legal advice until counsel has approved it. Items in{" "}
            <span className="text-gold-ink">[CONFIRM: …]</span> and{" "}
            <span className="text-gold-ink">{"{{TOKENS}}"}</span> are unfinished and must be resolved before
            go-live.
          </div>

          <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Dofrane Acquisitions · dofraneacquisitions.com · Last updated {LAST_UPDATED} · Effective on
            publication
          </p>

          <H2 id="who-we-are">1. Who we are</H2>
          <P>
            This Privacy Policy explains how Dofrane Acquisitions — currently operated as a sole
            proprietorship pending formation of a Maryland limited liability company (&ldquo;Dofrane
            Acquisitions,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) — collects, uses, shares, and protects
            information when you visit dofraneacquisitions.com (the &ldquo;Site&rdquo;) or ask us to make an
            offer on a property. Once our Maryland limited liability company is formed, this policy will be
            issued under its legal name, {"{{ENTITY_LEGAL_NAME}}"}.
          </P>
          <P>
            We are a real estate investor. We buy residential property in Maryland for our own account, and
            our home-buying offer is available for Maryland properties only. We are not a real estate broker
            and do not represent you in the sale of your property.
          </P>

          <H2 id="scope">2. Scope</H2>
          <P>
            This policy covers information we collect through the Site, including the offer request form, and
            information we collect when we follow up with you about your property by phone, text message, or
            email. Where we obtain information about property owners from other sources for direct outreach —
            for example public land and tax records and data or skip-trace vendors — we handle it under the
            same standards described here. <Confirm>whether to add a full &ldquo;Information from other sources&rdquo; section describing outbound sourcing data</Confirm>
          </P>

          <H2 id="what-we-collect">3. Information we collect</H2>
          <H3>3.1 Information you give us on the offer form</H3>
          <P>The offer form collects only what we need to prepare a cash offer:</P>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="py-2 pr-4 font-bold">Category</th>
                  <th className="py-2 pr-4 font-bold">What it is</th>
                  <th className="py-2 font-bold">Required?</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Property</td>
                  <td className="py-2 pr-4">Street address and Maryland ZIP code of the property</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Property details</td>
                  <td className="py-2 pr-4">
                    Condition, who lives there (owner, tenant, or vacant), and your preferred sale timeline
                  </td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Contact</td>
                  <td className="py-2 pr-4">Your name and phone number</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Email</td>
                  <td className="py-2 pr-4">Your email address</td>
                  <td className="py-2">Optional</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Consent record</td>
                  <td className="py-2 pr-4">
                    Whether you checked each consent box, the exact consent wording shown to you, and when you
                    checked it
                  </td>
                  <td className="py-2">See §7</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Please do not include health information, financial account numbers, Social Security numbers, or
            details about other people in any free-text field. We do not need it to make an offer.
          </P>

          <H3>3.2 Marketing attribution stored in your browser</H3>
          <P>
            When you first arrive on the Site, our own code saves a small record in your browser&rsquo;s local
            storage. It records the campaign tags in the web address you arrived from (UTM parameters), a
            Google Ads click identifier (gclid) if you arrived from a Google ad, the referring web page, and
            the first page of the Site you landed on. This record stays in your browser until you clear your
            browser storage. If you submit the offer form, this record is sent to us with your request so we
            can learn which advertising or referral brought you to us. If you never submit the form, that code
            does not send the record to us.
          </P>

          <H3>3.3 Information collected automatically</H3>
          <P>
            Our Site is hosted by Vercel Inc. Like most web hosts, Vercel processes technical information when
            your browser requests a page, which may include your IP address, your browser and device
            information (user agent), the page requested and the referring page, and the date and time of the
            request. When you submit the offer form, we also record your IP address, browser user agent, the
            page address, and a timestamp as part of our record of your consent (see §7).
          </P>

          <H3>3.4 Information from our conversations with you</H3>
          <P>
            If we speak with you, text you, or email you, we keep notes of what you tell us about the property
            and your plans, the dates and methods of contact, and any request you make to stop contact. We
            record phone calls only with the consent of everyone on the call.
          </P>

          <H2 id="how-we-use">4. How we use information</H2>
          <P>We use information to:</P>
          <UL>
            <li>review your property and prepare a preliminary, non-binding cash offer;</li>
            <li>contact you about your property by phone, text message, or email, as you have consented;</li>
            <li>schedule a property visit or inspection, if you want one;</li>
            <li>prepare and carry out a purchase agreement, if we both decide to sign one;</li>
            <li>keep records of your consent and of any request to stop contact, and honor those requests;</li>
            <li>measure which advertising and referral sources bring us inquiries;</li>
            <li>notify our own team that a new request has arrived;</li>
            <li>protect the Site, detect fraud and abuse, and fix technical problems; and</li>
            <li>comply with the law, respond to legal requests, and enforce our Terms.</li>
          </UL>
          <P>
            We do not use your information to make decisions that produce legal or similarly significant
            effects about you through fully automated processing, and we collect only what we reasonably need
            for these purposes.
          </P>

          <H2 id="how-we-share">5. How we share information</H2>
          <p className="mt-4 text-base font-bold leading-relaxed text-foreground">
            We do not sell your personal information. We do not share it with others for their own marketing.
          </p>
          <P>We share information only as follows:</P>
          <H3>Service providers</H3>
          <P>
            Companies that host or run our systems for us, under contract, and only to provide those services:
            Vercel Inc. (hosting and, if enabled, privacy-friendly analytics); Supabase, Inc. (the database
            that stores offer requests, the attribution record, and the consent record, in the United States{" "}
            <Confirm>Supabase project region</Confirm>); our team-alert messaging tool, which receives only a
            request reference, the ZIP code, and the property qualifiers — no name, phone, email, or street
            address <Confirm>messaging tool and exactly what it receives</Confirm>; and, once selected, a
            phone/text provider and an email provider that carry our communications with you{" "}
            <Confirm>phone/text and email providers</Confirm>.
          </P>
          <H3>Title, settlement, and legal professionals</H3>
          <P>
            If we sign a purchase agreement, we share what is needed to close with the title or settlement
            company, attorneys, inspectors, surveyors, and lenders involved in that transaction.
          </P>
          <H3>Data and skip-trace vendors</H3>
          <P>
            To confirm ownership and reach the right person, we may verify property and contact details
            against public records and data or skip-trace vendors. We disclose your information to these
            vendors only to the limited extent needed for verification, not for their own marketing.
          </P>
          <H3>Buyers who take over a contract</H3>
          <P>
            An offer made through this page may involve the assignment of a contract for the purchase of the
            property, which we disclose to you in writing before you sign. If we sign a purchase agreement and
            later assign it to another buyer, we share the purchase agreement and property information with
            that buyer and its closing company, and we share your contact information with that buyer only as
            needed to complete the closing. <Confirm>whether seller contact details are ever given to a prospective assignee before an assignment is signed</Confirm>
          </P>
          <H3>Legal, safety, and business transfers</H3>
          <P>
            We may disclose information when we believe in good faith it is required by law, subpoena, or court
            order, or needed to protect the rights, property, or safety of anyone. If our business is
            reorganized, merged, or sold, information may transfer to the successor, which must honor this
            policy.
          </P>

          <H2 id="cookies">6. Analytics, cookies, and browser storage</H2>
          <P>
            The Site does not use third-party advertising pixels or a tag manager. For usage measurement we
            use Vercel Analytics (privacy-friendly, no cookies){" "}
            <Confirm>that Vercel Analytics is the tool wired, that it is cookieless, and whether Speed Insights is also on</Confirm>
            . The only browser storage we set by default is the first-party attribution record described in
            §3.2. We show a cookie notice and load any non-essential measurement only after you accept; you can
            change your choice at any time, and you can delete the attribution record by clearing your
            browser&rsquo;s site data for dofraneacquisitions.com. We honor browser-based opt-out preference
            signals, such as Global Privacy Control (GPC), as a request to opt out of any targeted advertising
            or sale of personal data.
          </P>

          <H2 id="calls-texts">7. Phone calls and text messages</H2>
          <P>
            The offer form uses two separate, unchecked consent boxes. If you check the first box, you are
            asking Dofrane Acquisitions to call or email you about your property. If you also check the
            optional second box, you agree that we may also text you and may use automated or prerecorded
            calls at the number you provide, about your property. Consent to texts or automated calls is not a
            condition of any offer. Message frequency varies; message and data rates may apply.
          </P>
          <P>
            <span className="font-bold">How to stop.</span> Reply STOP to any text, or tell us on a call, by
            email, or by any other reasonable means that you want us to stop. We will honor your request within
            the time required by law <Confirm>the internal service-level for honoring opt-outs, e.g. within 10 business days</Confirm>
            , and we may send one text confirming your request. We do not share or sell phone numbers or
            text-messaging opt-in information for anyone else&rsquo;s marketing. We do not make telephone
            solicitations to Maryland numbers between 8 p.m. and 8 a.m. in your time zone.
          </P>
          <P>
            <span className="font-bold">Our records of consent.</span> When you submit the form, we keep the
            exact consent wording shown to you, whether each box was checked, the phone number provided, the
            date and time, your IP address, your browser user agent, and the page address, so we can prove
            consent and honor opt-outs.
          </P>

          <H2 id="email">8. Email</H2>
          <P>
            If you give us your email address, we use it to communicate with you about your property. Any
            marketing email we send will identify us, include our valid physical postal address
            ({"{{MAILING_ADDRESS}}"}), and include a working way to unsubscribe, which we honor promptly.
          </P>

          <H2 id="retention">9. How long we keep information</H2>
          <P>
            We keep offer requests that do not lead to a contract, records for signed agreements and closings,
            consent records, and do-not-contact requests only as long as needed for the purposes above and to
            meet legal and recordkeeping requirements, and then we delete or de-identify them.{" "}
            <Confirm>specific retention periods for each record type, and hosting-log retention on the current Vercel plan</Confirm>
          </P>

          <H2 id="security">10. How we protect information</H2>
          <P>
            We use reasonable security measures appropriate to the information we hold, including encryption in
            transit (HTTPS), database access controls, restricted administrator accounts, and least-privilege
            access. We require our service providers to protect information as well. No system is perfectly
            secure. If a security breach affects your personal information, we will notify you and regulators
            as the law requires.
          </P>

          <H2 id="your-rights">11. Your privacy rights</H2>
          <H3>11.1 Maryland residents</H3>
          <P>
            If you live in Maryland, the Maryland Online Data Privacy Act (MODPA) gives consumers the right to
            confirm whether we process your personal data; to access it; to correct inaccurate data; to delete
            data you provided or that we obtained about you, unless the law requires us to keep it; to get a
            copy in a portable format; to get a list of the categories of third parties to which we have
            disclosed your personal data; and to opt out of targeted advertising, the sale of personal data,
            and profiling that produces legal or similarly significant effects. We will respond within 45 days,
            which may be extended by another 45 days when reasonably necessary, and you may appeal a denial.
          </P>
          <H3>11.2 Everyone (including a CCPA-style courtesy)</H3>
          <P>
            Whether or not a state privacy law applies to us, you may ask us to access, correct, or delete the
            information you gave us, or to stop contacting you, and we will honor reasonable requests unless we
            must keep information for legal reasons. As a courtesy to California and other residents, we extend
            the same access, deletion, correction, portability, and opt-out rights, and we will not
            discriminate against you for exercising them.
          </P>
          <H3>11.3 Do Not Sell or Share; how to make a request</H3>
          <P>
            We do not sell or share your personal information for cross-context behavioral advertising. If that
            ever changes, we will post a clear &ldquo;Your Privacy Choices&rdquo; control here. To make any
            privacy request, contact us at {"{{CONTACT_EMAIL}}"} or {"{{CONTACT_PHONE}}"}. We will verify your
            request using information you have already given us, such as your phone number and the property
            address, and you may use an authorized agent where the law permits.
          </P>

          <H2 id="children">12. Children</H2>
          <P>
            The Site is intended for adults who own or have authority to sell property. It is not directed to
            children, and we do not knowingly collect personal information from anyone under 18. If you believe
            a child has given us information, contact us and we will delete it.
          </P>

          <H2 id="fair-housing">13. Fair housing</H2>
          <P>
            We do business in accordance with federal and Maryland fair housing law. We do not make offers or
            treat anyone differently based on race, color, religion, sex, disability, familial status, national
            origin, marital status, sexual orientation, gender identity, source of income, military status, or
            any other characteristic protected by law.
          </P>

          <H2 id="changes">14. Changes to this policy</H2>
          <P>
            We may update this policy and will post the new version here with a new &ldquo;Last updated&rdquo;
            date. If a change materially affects how we use information we already hold, we will give notice as
            required by law.
          </P>

          <H2 id="governing-law">15. Governing law</H2>
          <P>
            This policy is governed by the laws of the State of Maryland, without regard to its conflict of
            laws rules. Nothing in this section limits any right or protection you have under the law of the
            state where you live or where your property is located that cannot be waived by agreement.
          </P>

          <H2 id="contact">16. Contact us</H2>
          <P>
            Dofrane Acquisitions — Email: {"{{CONTACT_EMAIL}}"} · Phone: {"{{CONTACT_PHONE}}"} · Mailing
            address: {"{{MAILING_ADDRESS}}"}. At least one active email address or online mechanism is required
            for privacy requests, and a valid physical postal address is required for commercial email; both
            must be filled before this page is published.
          </P>

          <p className="mt-12 border-t border-border pt-6 text-sm font-semibold text-muted-foreground">
            DRAFT — attorney review required before publication.
          </p>
        </article>
      </main>

      <footer className="bg-oxblood px-4 py-10 text-ivory">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Dofrane Acquisitions</p>
          <nav aria-label="Legal" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="/" className="text-ivory/80 underline-offset-4 hover:text-gold hover:underline">
              Home
            </a>
            <a href="/privacy" className="text-ivory/80 underline-offset-4 hover:text-gold hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-ivory/80 underline-offset-4 hover:text-gold hover:underline">
              Terms of Use
            </a>
          </nav>
          <p className="mt-6 text-xs text-ivory/60">
            © 2026 Dofrane Acquisitions. Maryland cash home buyers. Investor, not a broker.
          </p>
        </div>
      </footer>
    </div>
  );
}
