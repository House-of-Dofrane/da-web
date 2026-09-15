import Link from "next/link";
import type { Metadata } from "next";
import { PAGE_COPY } from "@/lib/page-copy";

export const metadata: Metadata = {
  title: "Page not found | Dofrane Acquisitions",
  robots: { index: false, follow: true },
};

// A mistyped or dead link lands here, not on a blank page: the brand, one plain apology, and the
// ways back — home, the offer form, the map, the questions.
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--da-gold-ink)]">{PAGE_COPY.brand}</p>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-base text-muted-foreground sm:text-lg">
        The link may be old or mistyped. Here is the way back.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-oxblood px-6 py-3 text-sm font-bold text-ivory transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
        >
          Get a cash offer
        </Link>
        <Link href="/#service-area" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-[var(--da-oxblood)]/60">
          Where we buy
        </Link>
        <Link href="/#questions" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-[var(--da-oxblood)]/60">
          Questions
        </Link>
      </div>
    </main>
  );
}
