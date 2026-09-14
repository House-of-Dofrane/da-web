"use client";

// Loads the map only when the section scrolls near the viewport, and never on the server. The
// wrapper reserves the map's height so nothing shifts while MapLibre and the tiles arrive; the
// section is below the fold, so the hero's load and the three-second test are untouched.

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ServiceAreaMap = dynamic(() => import("@/components/ServiceAreaMap").then((m) => m.ServiceAreaMap), {
  ssr: false,
  loading: () => <div aria-hidden className="h-[420px] w-full rounded-2xl border border-border bg-[var(--da-ivory-alt)] md:h-[520px]" />,
});

export function ServiceAreaMapLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Fail-safe reveal (lesson from Round 03: an IntersectionObserver never reports in a background
  // tab). Measure directly on mount and whenever the tab becomes visible; the observer only adds
  // the scroll case. If the section is near the viewport, load, whatever the observer says.
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const near = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 400 && r.bottom > -400;
    };
    if (near()) {
      setInView(true);
      return;
    }
    const onVisible = () => {
      if (document.visibilityState === "visible" && near()) setInView(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting || e.intersectionRatio > 0)) setInView(true);
        },
        { rootMargin: "400px 0px" },
      );
      io.observe(el);
    } else {
      const onScroll = () => near() && setInView(true);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisible);
      };
    }
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [inView]);

  return (
    <div ref={ref} className="mx-auto mt-10 max-w-5xl">
      {inView ? (
        <ServiceAreaMap />
      ) : (
        <div aria-hidden className="h-[420px] w-full rounded-2xl border border-border bg-[var(--da-ivory-alt)] md:h-[520px]" />
      )}
    </div>
  );
}
