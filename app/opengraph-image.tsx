import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} social preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #121212 0%, #202020 48%, #8f2b2b 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(224,85,85,0.38), transparent 35%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 28,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 26,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#ffb3b3",
              }}
            >
              {siteConfig.address.locality} | {siteConfig.address.region}
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1,
                maxWidth: 860,
                textTransform: "uppercase",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.35,
                maxWidth: 950,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Sheet metal bending, CNC laser cutting, CNC plasma cutting, rolling,
              punching, and fabrication services.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 18,
                fontSize: 24,
                color: "rgba(255,255,255,0.86)",
                textTransform: "uppercase",
              }}
            >
              <span>Since {siteConfig.foundingDate}</span>
              <span>|</span>
              <span>{siteConfig.phoneDisplay}</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#ffb3b3",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              {new URL(siteConfig.url).hostname}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
