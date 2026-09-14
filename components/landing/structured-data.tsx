import { PAGE_COPY } from "@/lib/page-copy";

const SITE_URL = "https://dofraneacquisitions.com";

// JSON-LD for search and answer engines. Organization + WebSite + FAQPage now.
// LocalBusiness waits on a phone number (ruling C01) and a business address (Alliance, §4 admin):
// a LocalBusiness node without NAP is worse than none.
export function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Dofrane Acquisitions",
    url: SITE_URL,
    description:
      "Maryland real estate cash buyer. Written cash offers on Maryland houses as they stand: no repairs, no agent commission, no showings.",
    areaServed: { "@type": "State", name: "Maryland" },
    knowsAbout: ["cash home buying", "as-is home sales", "Maryland real estate"],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Dofrane Acquisitions",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: PAGE_COPY.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const graph = { "@context": "https://schema.org", "@graph": [organization, website, faq] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
