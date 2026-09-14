"use client";

// Map, MapMarker, MarkerContent and MarkerTooltip primitives on MapLibre GL. Self-contained: no
// provider outside this file. Free CARTO basemap tiles by default (no key, no billing account);
// any replacement style must stay a free, keyless source. Written for this repo on 2026-09-14:
// the reference component named in the directive never arrived, so this is an equivalent, not a copy.
//
// Interaction model: hover and keyboard focus open a marker's tooltip on desktop; on touch, a tap
// toggles it and a tap anywhere else closes it. Scroll wheel over the map does not zoom (the page
// keeps scrolling); pinch and buttons do.

import { createContext, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Map as MapLibreMap, Marker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

export const FREE_BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const MapContext = createContext<MapLibreMap | null>(null);
const MarkerContext = createContext<{ open: boolean; id: string } | null>(null);

export function DefaultLoader() {
  // Never covers the map: a spinner in the corner, pointer-events off, so pins and tiles show as they arrive.
  return (
    <div aria-hidden className="pointer-events-none absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-[var(--da-ivory)]/90 shadow-sm">
      <span className="size-4 animate-spin rounded-full border-2 border-[var(--da-gold-ink)] border-t-transparent motion-reduce:animate-none" />
    </div>
  );
}

type MapProps = {
  center: [number, number];
  zoom: number;
  /** When set, the initial view fits these [[west, south], [east, north]] bounds with padding, overriding center/zoom. */
  bounds?: [[number, number], [number, number]];
  boundsPadding?: number;
  styleUrl?: string;
  className?: string;
  ariaLabel: string;
  children?: ReactNode;
};

export function Map({ center, zoom, bounds, boundsPadding = 48, styleUrl = FREE_BASEMAP_STYLE, className, ariaLabel, children }: MapProps) {
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const instance = new MapLibreMap({
      container: container.current,
      style: styleUrl,
      center,
      zoom,
      ...(bounds ? { bounds, fitBoundsOptions: { padding: boundsPadding, maxZoom: 10 } } : {}),
      attributionControl: { compact: true },
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
    });
    instance.addControl(new NavigationControl({ showCompass: false }), "top-right");
    const done = () => setReady(true);
    instance.once("load", done);
    instance.once("idle", done); // belt and braces: idle fires after the first full render too
    // Diagnostics on the container (read by the verification script), plus a fallback so the
    // spinner never outlives 8 s even if the first frame is late.
    const host = container.current.parentElement;
    const state: Record<string, number | string> = { frames: 0 };
    const mark = (k: string) => (e: unknown) => {
      const err = (e as { error?: { message?: string } } | undefined)?.error;
      state[k] = err?.message ?? Date.now();
      host?.setAttribute("data-map-state", JSON.stringify(state));
    };
    instance.on("styledata", mark("styledata"));
    instance.on("load", mark("load"));
    instance.on("idle", mark("idle"));
    instance.on("error", mark("error"));
    instance.on("render", () => {
      state.frames = (state.frames as number) + 1;
      if ((state.frames as number) % 10 === 1) host?.setAttribute("data-map-state", JSON.stringify(state));
    });
    const fallback = window.setTimeout(done, 8000);
    setMap(instance);
    return () => {
      window.clearTimeout(fallback);
      setMap(null);
      instance.remove();
    };
    // Center and zoom are initial framing only; changing them later would re-create the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleUrl]);

  return (
    <div role="img" aria-label={ariaLabel} className={cn("relative isolate overflow-hidden", className)}>
      {/* Inline size: maplibre-gl.css sets `.maplibregl-map { position: relative }` outside any cascade
          layer, which beats Tailwind's layered `absolute inset-0` and collapsed the container to 0 px high. */}
      <div ref={container} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      {!ready && <DefaultLoader />}
      {/* Markers do not depend on the style; mount them as soon as the map exists so a throttled
          first frame (background tab) delays only the tiles, never the pins. */}
      {map && <MapContext.Provider value={map}>{children}</MapContext.Provider>}
    </div>
  );
}

type MapMarkerProps = {
  lng: number;
  lat: number;
  label: string;
  children: ReactNode;
  className?: string;
};

export function MapMarker({ lng, lat, label, children, className }: MapMarkerProps) {
  const map = useContext(MapContext);
  const id = useId();
  const [open, setOpen] = useState(false);
  const element = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.className = cn("group relative cursor-pointer outline-none", className);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    return el;
  }, [className]);

  useEffect(() => {
    if (!map || !element) return;
    element.setAttribute("aria-label", label);
    element.setAttribute("aria-describedby", id);
    const marker = new Marker({ element, anchor: "center" }).setLngLat([lng, lat]).addTo(map);

    const show = () => setOpen(true);
    const hide = () => setOpen(false);
    const toggle = (e: Event) => {
      e.stopPropagation();
      setOpen((v) => !v);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const outside = () => setOpen(false);

    element.addEventListener("mouseenter", show);
    element.addEventListener("mouseleave", hide);
    element.addEventListener("focus", show);
    element.addEventListener("blur", hide);
    element.addEventListener("touchstart", toggle, { passive: true });
    element.addEventListener("keydown", key);
    document.addEventListener("touchstart", outside, { passive: true });
    return () => {
      element.removeEventListener("mouseenter", show);
      element.removeEventListener("mouseleave", hide);
      element.removeEventListener("focus", show);
      element.removeEventListener("blur", hide);
      element.removeEventListener("touchstart", toggle);
      element.removeEventListener("keydown", key);
      document.removeEventListener("touchstart", outside);
      marker.remove();
    };
  }, [map, element, lng, lat, label, id]);

  if (!element) return null;
  return createPortal(<MarkerContext.Provider value={{ open, id }}>{children}</MarkerContext.Provider>, element);
}

export function MarkerContent({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn("relative", className)}>{children}</div>;
}

export function MarkerTooltip({ className, children }: { className?: string; children: ReactNode }) {
  const ctx = useContext(MarkerContext);
  if (!ctx) return null;
  return (
    <div
      id={ctx.id}
      role="tooltip"
      className={cn(
        "pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[color-mix(in_srgb,var(--da-oxblood)_16%,var(--da-ivory))] bg-[var(--da-ivory)] px-2.5 py-1.5 text-xs font-semibold leading-tight text-[var(--da-oxblood)] shadow-md transition-opacity duration-150 ease-out motion-reduce:transition-none",
        ctx.open ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
