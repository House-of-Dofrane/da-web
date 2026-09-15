"use client";

import { useCallback } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { CALENDLY_BRAND, CALENDLY_URL } from "@/lib/site-config";
import { trackFunnel } from "@/lib/track";

// Loads Calendly's popup widget once, on demand (no library dependency, no cost until clicked).
let calendlyLoad: Promise<void> | null = null;
function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as unknown as { Calendly?: unknown }).Calendly) return Promise.resolve();
  if (calendlyLoad) return calendlyLoad;
  calendlyLoad = new Promise<void>((resolve) => {
    if (!document.querySelector("link[data-calendly]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.setAttribute("data-calendly", "");
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
  return calendlyLoad;
}

function brandedUrl(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("primary_color", CALENDLY_BRAND.primaryColor);
    u.searchParams.set("text_color", CALENDLY_BRAND.textColor);
    u.searchParams.set("background_color", CALENDLY_BRAND.backgroundColor);
    u.searchParams.set("hide_gdpr_banner", "1");
    return u.toString();
  } catch {
    return url;
  }
}

// Secondary CTA (gold-ink outline on a light surface) — deliberately not the oxblood primary, so
// the urgent "Get cash offer" stays the dominant action. Icon swaps calendar -> arrow on hover in
// pure CSS (framer-motion is present in the repo but a one-icon micro-interaction doesn't need JS).
export function BookACallButton({ className }: { className?: string }) {
  const available = Boolean(CALENDLY_URL);

  const open = useCallback(async () => {
    if (!CALENDLY_URL) return;
    trackFunnel("book_a_call_click");
    await loadCalendly();
    (window as unknown as { Calendly?: { initPopupWidget: (o: { url: string }) => void } }).Calendly?.initPopupWidget({
      url: brandedUrl(CALENDLY_URL),
    });
  }, []);

  const base =
    "group inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-semibold";

  if (!available) {
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className={cn(base, "cursor-not-allowed border-gold-ink/40 text-gold-ink opacity-60", className)}
        >
          <CalendarDays aria-hidden className="size-5" />
          Book a Call
        </button>
        <span className="text-xs text-muted-foreground">Call scheduling opens soon</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        base,
        "border-gold-ink text-gold-ink transition-colors hover:bg-gold-ink hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink",
        className,
      )}
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <CalendarDays
          aria-hidden
          className="absolute size-5 transition-all duration-200 group-hover:-translate-y-3 group-hover:opacity-0"
        />
        <ArrowRight
          aria-hidden
          className="absolute size-5 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </span>
      Book a Call
    </button>
  );
}
