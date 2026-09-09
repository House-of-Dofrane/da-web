# IMAGE_BRIEF, dofraneacquisitions.com

Written 2026-09-08 with the cinematic rebuild. **The site currently ships zero image files.** Every
dark band is a CSS gradient treatment, and the county map is inline SVG. That is a deliberate stand-in,
not a finished design.

## Why there is no photograph

The format being reproduced is built on one full-bleed photograph behind the hero. No licensed
photograph of a Montgomery or Prince George's County house exists in this repo, and the fences forbid
two of the three shortcuts:

- **AI-generated property imagery presented as real is Class C forbidden** (`hod-fences.md`), and any
  generated house on a page that says "we buy houses in these two counties" reads as a real one.
- **Stock photography of a house that is not in Maryland** is not forbidden, but it is the thing every
  competitor does, and a seller who recognises a stock photo reads the whole page as a template.
- **Hotlinking anything** is out on both licensing and performance.

So the hero ships as a duotone gradient in the house palette until a real frame exists.

## The photograph to shoot or buy

**One image. It is the LCP element, so there is exactly one and it is not negotiable up to two.**

| Spec | Value |
|---|---|
| Aspect ratio | 3:2 landscape, shot with a centred subject so a 1:1 mobile crop still works |
| Delivered size | 2400 x 1600 master, exported at 1920 x 1280 for the page |
| Format | AVIF first, WebP fallback. **Under 150 KB** at the delivered size, quality tuned down until it fits |
| Markup | `width="1920" height="1280"`, `fetchpriority="high"`, no `loading="lazy"`, no `srcset` needed at this size |
| Colour | Warm, low contrast, printable under a `rgba(20,18,20,.62)` overlay without going muddy. The overlay is what the ivory headline sits on |

### The subject

A house in Montgomery or Prince George's County that Dofrane has the right to photograph, shot
**exterior, from the street, late afternoon**. Specifically:

- A modest post-war detached or split-level, the housing stock these two counties actually run on.
  Not a new build, not a mansion, not a rowhouse.
- **Signs of a life stopped rather than a life in crisis**: an uncut lawn, a full carport, curtains
  drawn, a car that has not moved. The page's whole argument is *the contents outrank the condition*,
  so the frame should say "nobody has dealt with this in a while", never "this is a wreck".
- **No people. No faces. No visible house number, street sign, or plate.** Fair housing and privacy
  both sit here: the image must not imply who lives in these houses.
- **No distress signalling.** No foreclosure notice, no lockbox, no auction sign, no boarded windows.
  Maryland's Protection of Homeowners in Foreclosure Act is the reason the copy has no rescue angle;
  the picture cannot reintroduce it.

### The alternative subject, if a house cannot be cleared

The inside of an emptied room, mid-cleanout, shot wide: boxes, a stripped wall, afternoon light. Same
rules on people, addresses, and distress. This is closer to what the copy is actually about and is
easier to shoot with permission.

## Where it goes

`/hero.avif` and `/hero.webp` in the repo root, referenced from `index.html` as the first element of
`.hero` behind the existing overlay. The gradient in `.dark.tex` stays as the background colour behind
it so a failed image load still renders a designed page rather than a black box.

## Second image, later, optional

One lazy-loaded photograph inside the `#situations` band, same rules, `loading="lazy"` with explicit
dimensions. Do not add it until the hero exists, and do not add a third.
