import { FlowButton } from "@/components/ui/flow-button";

// Round 03 holding page. Phase 6 assembles the funnel here after the copy ruling.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-background px-4 py-24">
      <p className="text-sm text-muted-foreground">Round 03 foundation preview</p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="rounded-2xl bg-ivory p-8">
          <FlowButton text="Get Cash Offer" />
        </div>
        <div className="rounded-2xl bg-oxblood p-8">
          <FlowButton text="Get Cash Offer" tone="inverted" />
        </div>
      </div>
    </main>
  );
}
