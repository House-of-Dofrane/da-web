import { ImageResponse } from "next/og";

// Apple touch icon (180×180), the size iOS uses for a home-screen bookmark. Same brand monogram,
// with the safe padding Apple's rounded mask expects.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3D0606",
          color: "#C5A059",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        DA
      </div>
    ),
    size,
  );
}
