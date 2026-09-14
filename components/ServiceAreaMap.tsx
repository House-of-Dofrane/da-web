"use client";

// The interactive "Where we buy" map. Client-only, loaded lazily on scroll by ServiceAreaMapLazy.
// Brand palette (ruling 2026-09-13): county markers gold #C5A059 with a slow ring, city markers
// oxblood #3D0606. No blue on a DA page. The text list of areas lives in the section, not here.

import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/mapcn-marker-tooltip";
import { SERVICE_AREA_BOUNDS, SERVICE_AREA_CENTER, SERVICE_AREA_ZOOM, serviceAreas } from "@/lib/service-areas";

export function ServiceAreaMap() {
  return (
    <Map
      center={SERVICE_AREA_CENTER}
      zoom={SERVICE_AREA_ZOOM}
      bounds={SERVICE_AREA_BOUNDS}
      boundsPadding={56}
      ariaLabel="Interactive map of Maryland counties and cities where Dofrane Acquisitions buys houses"
      className="h-[420px] w-full rounded-2xl border border-border bg-[var(--da-ivory-alt)] md:h-[520px]"
    >
      {serviceAreas.map((area) =>
        area.tier === "county" ? (
          <MapMarker key={area.name} lng={area.lng} lat={area.lat} label={`${area.name} — service area`}>
            <MarkerContent className="grid size-7 place-items-center">
              <span aria-hidden className="absolute inset-0 rounded-full bg-[var(--da-gold)]/35 motion-safe:animate-ping [animation-duration:2.4s]" />
              <span aria-hidden className="relative size-4 rounded-full border-2 border-[var(--da-ivory)] bg-[var(--da-gold)] shadow-[0_0_0_2px_var(--da-oxblood)]" />
            </MarkerContent>
            <MarkerTooltip>
              {area.name}
              <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--da-gold-ink)]">county</span>
            </MarkerTooltip>
          </MapMarker>
        ) : (
          <MapMarker key={area.name} lng={area.lng} lat={area.lat} label={`${area.name} — service area`}>
            <MarkerContent className="grid size-5 place-items-center">
              <span aria-hidden className="size-2.5 rounded-full border border-[var(--da-ivory)] bg-[var(--da-oxblood)] shadow-sm transition-transform duration-150 ease-out group-hover:scale-125 motion-reduce:transition-none" />
            </MarkerContent>
            <MarkerTooltip>{area.name}</MarkerTooltip>
          </MapMarker>
        ),
      )}
    </Map>
  );
}
