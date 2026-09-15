import type { Metadata } from "next";
import type { ReactNode } from "react";

// Terms of Use — DRAFT, pending attorney review.
// Adapted from the DA legal pass (Drive 07_Landing_Page/00_Brief/legal/TERMS_DRAFT.md,
// COMPLIANCE_FLAGS.md). Positions resolved for this draft: may-assign disclosed (Alt B), matching
// lib/page-copy.ts footer disclosure L1 ("before you sign", Md. Real Prop. § 10-715); Maryland
// governing law and venue (per build directive). Voice mirrors lib/page-copy.ts footer.disclosures —
// do not diverge. {{TOKENS}} and [CONFIRM: ...] are unfinished; see /legal/ATTORNEY_REVIEW.md.

export const metadata: Metadata = {
  title: "Terms of Use | Dofrane Acquisitions",
  description:
    "The terms that govern use of dofraneacquisitions.com and any cash-offer request. Offers are non-binding until a written purchase agreement is signed.",
  alternates: { canonical: "/terms" },
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

export default function TermsOfUse() {
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
            Terms of Use
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Dofrane Acquisitions · dofraneacquisitions.com · Last updated {LAST_UPDATED} · Effective on
            publication
          </p>

          <H2 id="about">1. About these Terms</H2>
          <P>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your use of dofraneacquisitions.com (the
            &ldquo;Site&rdquo;) and any offer request you submit. The Site is operated by Dofrane Acquisitions,
            currently a sole proprietorship pending formation of a Maryland limited liability company
            (&ldquo;Dofrane Acquisitions,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;); once formed, the operator
            will be {"{{ENTITY_LEGAL_NAME}}"}. By using the Site or submitting an offer request, you agree to
            these Terms. If you do not agree, do not use the Site.
          </P>

          <H2 id="what-we-do">2. What we do</H2>
          <P>
            We buy residential property in Maryland for our own account. We currently make offers only on
            properties located in Maryland.
          </P>

          <H2 id="non-binding">3. Our offers are preliminary and non-binding</H2>
          <P>
            Any price, range, or estimate we give you through the Site, by phone, by text, or by email, before
            a written purchase agreement is signed, is a preliminary, non-binding estimate. It is based on the
            information available to us at the time and is subject to, among other things: inspection of the
            property inside and out; review and verification of title, liens, judgments, taxes, and other
            claims; verification of ownership and of each seller&rsquo;s authority to sell; verification of the
            information you provided; and any conditions stated in a written purchase agreement. Our estimate
            may change or be withdrawn after we learn more about the property. An offer made here is not an
            appraisal and is not a valuation of your property.
          </P>

          <H2 id="no-contract">4. No contract until a written agreement is signed</H2>
          <P>
            Nothing on the Site, and no conversation, text, or email, creates a contract to buy or sell
            property. A binding agreement exists only when a written purchase agreement is signed by you and by
            us. That agreement, including its disclosures and addenda, will control over anything on the Site.
            Either of us may decide not to sign one, for any lawful reason.
          </P>

          <H2 id="how-we-buy">5. How we buy, and assignment</H2>
          <P>
            When we sign a purchase agreement, we sign it as the buyer, for our own account. Depending on the
            property, we may either complete the purchase ourselves or assign our rights under the purchase
            agreement to another buyer before closing, and we may receive a fee from that buyer for the
            assignment.
          </P>
          <P>
            <span className="font-bold">
              An offer made through this page may involve the assignment of a contract for the purchase of the
              property. Any such assignment is disclosed to you in writing before you sign.
            </span>{" "}
            Under Maryland Real Property § 10-715, for owner-occupied residential property of four or fewer
            units, we will give you written notice before you enter into the contract that we may assign it; if
            we fail to give that notice and later assign the contract, you may rescind the contract, without
            penalty, at any time before closing. Any assignment does not change the price or terms you agreed
            to in the signed purchase agreement unless you agree in writing.{" "}
            <Confirm>whether the business remains responsible to the seller after assignment</Confirm>
          </P>

          <H2 id="not-your-agent">6. We are not your real estate agent, broker, or advisor</H2>
          <UL>
            <li>
              We are not real estate brokers and do not provide real estate brokerage services. We do not list,
              market, or sell your property for you, and we do not find buyers for you.
            </li>
            <li>
              We do not represent you. We are the buyer, or a prospective buyer, on the other side of the
              transaction. No agency, fiduciary, partnership, or advisory relationship is created between you
              and us by your use of the Site, by any conversation, or by any purchase agreement.
            </li>
            <li>Our interests differ from yours. We want to buy at a price that works for us.</li>
            <li>Our estimates are not appraisals and are not an opinion of market value.</li>
            <li>
              Get your own advice. You should consult your own real estate attorney, a licensed real estate
              agent or broker, a tax advisor, or a housing counselor before signing anything. You may also
              choose to list your property on the open market, which may produce a higher price.
            </li>
          </UL>

          <H2 id="fees">7. Fees and costs</H2>
          <P>
            We do not charge you a commission, a brokerage fee, or a fee for requesting or receiving an offer.
            Closing costs are allocated as stated in the written purchase agreement; Maryland transfer and
            recordation taxes are split as that agreement provides. You remain responsible for paying off your
            own mortgages, liens, judgments, unpaid taxes, and any other amounts owed against the property,
            which are usually paid from the sale proceeds at closing.{" "}
            <Confirm>the exact closing-cost allocation in the standard purchase agreement, so this matches the &ldquo;we pay our own closing costs&rdquo; claim on the landing page</Confirm>
          </P>

          <H2 id="eligibility">8. Who may request an offer</H2>
          <P>You may request an offer only if:</P>
          <UL>
            <li>you are at least 18 years old;</li>
            <li>
              the property is residential property located in Maryland{" "}
              <Confirm>the property types accepted, e.g. single-family, townhouse, condominium, 2–4 units</Confirm>;
            </li>
            <li>
              you are an owner of the property, or you have legal authority to act for the owner (for example
              as personal representative, trustee, attorney-in-fact, or officer of an owning company), and you
              will tell us if other owners must also sign; and
            </li>
            <li>the information you provide is accurate to the best of your knowledge.</li>
          </UL>

          <H2 id="no-guarantee">9. No guarantee of an offer or a price</H2>
          <P>
            We do not guarantee that we will make an offer, that any offer will be at a particular price, that
            we will sign a purchase agreement, or that a purchase will close by any date. Closing timelines
            depend on title, inspections, required notices and waiting periods under law, the seller&rsquo;s
            documents and authority, and other factors outside our control. Statements such as &ldquo;close in
            as little as 14 days&rdquo; describe what is possible in some transactions, not a promise for
            yours.
          </P>

          <H2 id="foreclosure">10. If you are behind on your mortgage or facing foreclosure</H2>
          <P>
            We are not foreclosure consultants. We do not offer to stop, delay, or postpone a foreclosure, to
            negotiate with your lender, to help you refinance or obtain a loan, to repair your credit, or to
            let you stay in your home after a sale. If your mortgage is in default or a foreclosure has been
            filed, Maryland law gives you important protections. Under Real Property § 7-310, the homeowner of
            a residence in default (owner-occupied, four or fewer units, with a mortgage at least 60 days in
            default) may rescind a contract for its sale within 5 days after signing, and a contract clause
            choosing another state&rsquo;s law or courts, or venue outside the county where the property is
            located, is void. You may wish to speak with a housing counselor or an attorney before making any
            decision. <Confirm>whether to list a specific Maryland housing-counseling resource, and verify its name and number first</Confirm>
          </P>

          <H2 id="communications">11. Calls, texts, and email</H2>
          <P>
            If you give us your phone number or email address, we may contact you about your request as
            described in our{" "}
            <a href="/privacy" className="font-semibold text-gold-ink underline underline-offset-2">
              Privacy Policy
            </a>{" "}
            and in any consent you gave on the form. You can stop texts by replying STOP, and you can stop any
            contact by telling us. Calls are recorded only with the consent of all parties to the call.
          </P>

          <H2 id="using-the-site">12. Using the Site</H2>
          <P>You agree not to:</P>
          <UL>
            <li>submit false information, or information about a property you have no right to sell;</li>
            <li>submit someone else&rsquo;s name, phone number, or email address without their permission;</li>
            <li>use the Site for any unlawful, fraudulent, or harassing purpose;</li>
            <li>
              scrape, copy, or collect data from the Site by automated means, or interfere with its security or
              operation;
            </li>
            <li>attempt to access systems or data you are not authorized to access; or</li>
            <li>use the Site to send spam or malicious code.</li>
          </UL>
          <P>We may suspend or refuse service to anyone who violates these Terms.</P>

          <H2 id="ip">13. Intellectual property</H2>
          <P>
            The Site, including its text, graphics, logos, and code, is owned by us or our licensors and is
            protected by intellectual property laws. &ldquo;Dofrane Acquisitions&rdquo; and related names and
            logos are our marks. You may view the Site for your personal use in connection with selling your
            property, and may not copy, modify, or distribute Site content without our written permission.
          </P>

          <H2 id="disclaimers">14. Disclaimers</H2>
          <P>
            To the fullest extent permitted by law, the Site and its content are provided &ldquo;as is&rdquo;
            and &ldquo;as available,&rdquo; without warranties of any kind, express or implied, including
            warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement.
            General information on the Site is not legal, tax, financial, or real estate advice. An offer made
            here does not affect a seller&rsquo;s disclosure obligations. Nothing in this section limits any
            warranty or disclosure obligation contained in a signed purchase agreement or imposed by law.
          </P>

          <H2 id="liability">15. Limitation of liability</H2>
          <P>
            To the fullest extent permitted by law, we are not liable for indirect, incidental, special,
            consequential, or punitive damages arising from your use of the Site, and our total liability
            arising from your use of the Site will not exceed{" "}
            <Confirm>a cap amount, e.g. $100</Confirm>. This section does not apply to, and does not limit: any
            claim under a signed purchase agreement, which is governed by that agreement; liability for fraud,
            intentional misconduct, or gross negligence; any right or remedy under the Maryland Consumer
            Protection Act, the Maryland Protection of Homeowners in Foreclosure Act, the Maryland Stop the Spam
            Calls Act, the Telephone Consumer Protection Act, or any other law that cannot be limited or waived
            by agreement; or statutory damages, punitive damages, declaratory relief, or injunctive relief to
            the extent a law makes a limitation of those remedies void.
          </P>

          <H2 id="indemnity">16. Indemnity</H2>
          <P>
            You agree to indemnify us against third-party claims arising from your submission of false
            information or your violation of Section 12, to the extent permitted by law. This section does not
            apply to claims arising from our own acts or omissions.
          </P>

          <H2 id="governing-law">17. Governing law, venue, and disputes</H2>
          <P>
            <span className="font-bold">Governing law.</span> These Terms are governed by the laws of the State
            of Maryland, without regard to its conflict of laws rules.
          </P>
          <P>
            <span className="font-bold">Venue.</span> Any dispute about Maryland real property, and any dispute
            in which Maryland law requires a Maryland forum, must be brought in the Maryland county where the
            property is located. Any dispute about a purchase agreement is governed by the governing-law and
            venue terms of that agreement. Either party may bring an individual claim in small claims court
            where it qualifies. <Confirm>whether counsel wants to add a binding individual-arbitration clause with a 30-day opt-out; omitted from this draft pending that decision</Confirm>
          </P>

          <H2 id="md-consumers">18. Maryland consumers</H2>
          <P>
            If you are a Maryland resident or your property is in Maryland, nothing in these Terms waives,
            limits, or overrides any right, remedy, protection, notice, or cancellation period you have under
            Maryland law that cannot be waived by agreement, including under the Maryland Consumer Protection
            Act, the Protection of Homeowners in Foreclosure Act, Real Property § 10-715, and the Stop the Spam
            Calls Act. If any part of these Terms conflicts with such a law, that law controls and the rest of
            these Terms remains in effect.
          </P>

          <H2 id="fair-housing">19. Fair housing</H2>
          <P>
            We do business in accordance with federal and Maryland fair housing law and do not discriminate on
            the basis of any characteristic protected by law.
          </P>

          <H2 id="changes">20. Changes to these Terms</H2>
          <P>
            We may update these Terms by posting a new version on the Site with a new effective date. Changes
            apply to use of the Site after they are posted and do not change any signed purchase agreement.
          </P>

          <H2 id="general">21. General</H2>
          <P>
            If any part of these Terms is found unenforceable, the rest remains in effect. Our failure to
            enforce a provision is not a waiver. These Terms, together with our Privacy Policy, are the entire
            agreement between you and us about the Site. A signed purchase agreement is a separate contract and
            controls the purchase.
          </P>

          <H2 id="contact">22. Contact</H2>
          <P>
            Dofrane Acquisitions — Email: {"{{CONTACT_EMAIL}}"} · Phone: {"{{CONTACT_PHONE}}"} · Mailing
            address: {"{{MAILING_ADDRESS}}"}. These must be filled before this page is published.
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
