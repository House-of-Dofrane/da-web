import {
  AskBand,
  Compare,
  DirectSale,
  Faq,
  Footer,
  Header,
  Hero,
  Process,
  ProofBand,
  ServiceArea,
  Situations,
  TrustBar,
  WhyDofrane,
} from "@/components/landing/sections";
import { StickyBar } from "@/components/landing/sticky-bar";
import { PAGE_COPY } from "@/lib/page-copy";

// Section order mirrors docs/STRUCTURE_MAP.md. The recovery modal from the reference is omitted:
// it runs on an incentive and SMS consent that Dofrane Acquisitions does not offer.
export default function Home() {
  const isProduction = process.env.VERCEL_ENV === "production";
  return (
    <>
      {!isProduction && (
        <p className="bg-midnight px-4 py-2 text-center text-xs font-semibold text-ivory">{PAGE_COPY.previewBanner}</p>
      )}
      <StickyBar brand={PAGE_COPY.brand} />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ProofBand />
        <DirectSale />
        <Situations />
        <Process />
        <AskBand />
        <WhyDofrane />
        <Compare />
        <ServiceArea />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
