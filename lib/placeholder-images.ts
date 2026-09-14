// Unsplash placeholders for the R03 preview only. IMAGE_BRIEF.md bans stock houses on the live
// page: these are replaced by licensed Maryland photography before launch. Every URL was checked
// to return an image on 2026-09-13.
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

export const IMAGES = {
  hero: { src: unsplash("1570129477492-45c003edd2be", 2000), alt: "" },
  proof: { src: unsplash("1605276374104-dee2a0ed3cd6", 800), alt: "" },
  band: { src: unsplash("1449844908441-8829872d2607", 2000), alt: "" },
} as const;
