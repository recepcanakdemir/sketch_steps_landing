import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * 1200x630 social image shared by every locale, generated at build time from
 * existing brand assets (wordmark + real tutorial steps shown on the
 * homepage). Each locale passes its own translated copy; no ratings or claims.
 */

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };

export type SocialImageCopy = {
  heading: string;
  body: string;
  stepLabel: (step: number) => string;
};

const ACCENT = "#E43844";
const FOREGROUND = "#111111";
const MUTED = "#666666";

async function asDataUri(relativePath: string, mime: string) {
  const file = await readFile(path.join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${file.toString("base64")}`;
}

const STEPS = [
  { step: 3, src: "images/tutorialexample/IMG_0064.JPG" },
  { step: 5, src: "images/tutorialexample/IMG_0066.JPG" },
  { step: 9, src: "images/tutorialexample/IMG_0070.JPG" },
];

export async function renderSocialImage(copy: SocialImageCopy) {
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
          {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- ImageResponse needs <img>; decorative, the image alt is set in metadata */}
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
            {copy.heading}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {copy.body}
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
              key={STEPS[index].step}
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
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- ImageResponse needs <img>; decorative, the image alt is set in metadata */}
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
                {copy.stepLabel(STEPS[index].step)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
