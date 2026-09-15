import { ImageResponse } from "next/og";

// App favicon (PNG), generated at build so it matches the brand exactly: gold "DA" monogram on the
// oxblood ground. Next serves this at /icon and links it from <head>.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "Helvetica, Arial, sans-serif",
          borderRadius: 12,
        }}
      >
        DA
      </div>
    ),
    size,
  );
}
