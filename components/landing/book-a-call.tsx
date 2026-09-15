import { BookACallButton } from "@/components/ui/book-a-call-button";

// Secondary path for non-urgent sellers — a call, not the urgent cash-offer form. Placed low on the
// page, one line of copy, a secondary button. Never beside the primary CTA (one dominant action).
export function BookACall() {
  return (
    <section id="book-a-call" data-section="book-a-call" className="bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-gold-ink">
          <span className="h-px w-5 bg-gold-ink" />
          Not urgent?
          <span className="h-px w-5 bg-gold-ink" />
        </p>
        <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Let&apos;s talk it through.
        </h2>
        <p className="mx-auto mt-4 max-w-[54ch] text-pretty text-muted-foreground">
          Not every sale is a rush. If you would rather explore your options first, book a call and we will
          walk through what a cash sale looks like for your house — no pressure, no obligation.
        </p>
        <div className="mt-8 flex justify-center">
          <BookACallButton />
        </div>
      </div>
    </section>
  );
}
