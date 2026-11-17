import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Site-wide 1200x630 social image, generated at build time from existing brand
 * assets (wordmark + real tutorial steps shown on the homepage). Copy is taken
 * verbatim from the homepage hero; no ratings or claims.
 */

export const alt =
  "Sketch Steps: a face photo turned into a step-by-step Loomis drawing guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#E43844";
const FOREGROUND = "#111111";
const MUTED = "#666666";

async function asDataUri(relativePath: string, mime: string) {
  const file = await readFile(path.join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${file.toString("base64")}`;
}

const STEPS = [
  { label: "Step 3", src: "images/tutorialexample/IMG_0064.JPG" },
  { label: "Step 5", src: "images/tutorialexample/IMG_0066.JPG" },
  { label: "Step 9", src: "images/tutorialexample/IMG_0070.JPG" },
];

export default async function OpenGraphImage() {
  const [wordmark, ...steps] = await Promise.all([
    asDataUri("images/sketch-steps-wordmark.png", "image/png"),
    ...STEPS.map((step) => asDataUri(step.src, "image/jpeg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(228,56,68,0.08), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 470,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative; image alt is exported above */}
          <img src={wordmark} width={360} height={120} />
          <div
            style={{
              marginTop: 36,
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              color: FOREGROUND,
              letterSpacing: "-0.01em",
            }}
          >
            Step-by-Step Loomis Drawing Guide
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            Upload a face and instantly receive guided drawing steps.
          </div>
          <div
            style={{
              marginTop: 34,
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: ACCENT,
            }}
          >
            sketchsteps.app
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {steps.map((src, index) => (
            <div
              key={STEPS[index].label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
                borderRadius: 24,
                background: "#FFFFFF",
                border: "1px solid #EDEDED",
                boxShadow: "0 18px 40px rgba(17,17,17,0.10)",
                transform: `translateY(${index === 1 ? -18 : 18}px)`,
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative; image alt is exported above */}
              <img
                src={src}
                width={160}
                height={199}
                style={{ borderRadius: 16, objectFit: "cover" }}
              />
              <div
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 600,
                  color: index === 2 ? ACCENT : FOREGROUND,
                }}
              >
                {STEPS[index].label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
