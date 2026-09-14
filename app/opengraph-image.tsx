import { ImageResponse } from "next/og";

// Entity-branded Open Graph card, generated at build. Brand palette 60/30/10 (2026-09-13):
// oxblood ground, ivory type, gold rule. No photography until licensed Maryland assets exist.
export const alt = "Dofrane Acquisitions: written cash offers on Maryland houses as they stand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#3D0606",
          color: "#FAF4E4",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#C5A059" }}>
          <div style={{ width: 40, height: 3, background: "#C5A059" }} />
          Dofrane Acquisitions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>A cash offer for your Maryland house, as is.</div>
          <div style={{ fontSize: 32, color: "#E9DDCB" }}>No repairs. No agent. No buyer&apos;s loan to fall through.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#C5A059" }}>
          <span>dofraneacquisitions.com</span>
          <span>Maryland only</span>
        </div>
      </div>
    ),
    size,
  );
}
