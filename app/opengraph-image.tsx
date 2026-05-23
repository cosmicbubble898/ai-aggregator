import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

// The social-share card (Open Graph + Twitter) shown when the site is linked on
// X, LinkedIn, Slack, Discord, etc. Living at the app root, it applies to every
// route. Generated at build time with next/og — drawn in the design-system
// palette (clay accent, warm off-white) using the already-shipped hero line, so
// no new copy is introduced. The owner signs off on the rendered result.
export const alt =
  "AI Aggregator — open-source, bring-your-own-key multi-model AI workspace (chat, image, video), built in the open.";
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
          background: "#f8f8f6",
          padding: "72px 80px",
        }}
      >
        {/* Brand row: clay monogram + wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#d97757",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f8f8f6",
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div
            style={{
              marginLeft: 26,
              fontSize: 36,
              fontWeight: 600,
              color: "#121212",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Headline (the shipped hero line) + supporting tag */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#121212",
              maxWidth: 1000,
            }}
          >
            Every AI model, one calm workspace.
          </div>
          <div style={{ marginTop: 30, fontSize: 34, color: "#7b7974" }}>
            Open source · Bring your own keys · Built in the open
          </div>
        </div>

        {/* Bottom accent rule */}
        <div
          style={{
            display: "flex",
            height: 10,
            width: 220,
            background: "#d97757",
            borderRadius: 9999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
