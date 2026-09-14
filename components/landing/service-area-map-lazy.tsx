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

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
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
