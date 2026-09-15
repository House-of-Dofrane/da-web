// Unsplash placeholders for the preview only (free Unsplash License; no reference-site assets).
// IMAGE_BRIEF.md bans stock houses on the live page: replace with licensed Maryland photography
// before launch. Each URL was checked to return an image on 2026-09-13.
// Provenance (Unsplash tags, not verified GPS):
//   hero, heroLayer/proof: tagged "baltimore" / "baltimore city" on Unsplash
//   band: same photographer and series, no location tag of its own
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

export const IMAGES = {
  // Rowhouse street, brick and stone fronts (unsplash.com/photos/IRTgks185UA)
  hero: { src: unsplash("1672059928425-9dfb125307b2", 2000), alt: "A street of brick and stone rowhouses in Baltimore" },
  // Red brick rowhouse with a green door (unsplash.com/photos/VjHIQ_kysoA)
  heroLayer: { src: unsplash("1672059928436-9ddeb37b7b99", 1000), alt: "" },
  proof: { src: unsplash("1672059928436-9ddeb37b7b99", 800), alt: "A red brick rowhouse with a green front door" },
  // Stone rowhouse with a stoop and garden (unsplash.com/photos/TJv2A90kzwM).
  // Used as a translucent texture only in the mid-page band. License: Unsplash License (free,
  // commercial use, no attribution required); source recorded here per the background-layer brief.
  band: { src: unsplash("1672059928459-2233cbcafd50", 2000), alt: "A stone rowhouse with a front stoop and small garden" },
} as const;
