import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import type { Locale } from "@/i18n/config";

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

export type SocialImageFont = {
  family: string;
  /** Folder (from the project root) holding the font files and coverage.txt. */
  dir: string;
  files: Record<400 | 700, string>;
};

/**
 * Locales whose script the image renderer's built-in font cannot draw. The
 * renderer only bundles a Latin font, so Japanese text would come out as
 * empty boxes. Japanese uses subsets of M PLUS Rounded 1c (SIL Open Font
 * License, the same font the site uses) committed to the repo, so the build
 * needs no network. English, Spanish and French use the built-in font.
 * To regenerate the subsets, see scripts/subset-og-font.py.
 */
export const SOCIAL_IMAGE_FONTS: Partial<Record<Locale, SocialImageFont>> = {
  ja: {
    family: "M PLUS Rounded 1c",
    dir: "assets/fonts/m-plus-rounded-1c",
    files: {
      400: "MPlusRounded1c-Regular.subset.ttf",
      700: "MPlusRounded1c-Bold.subset.ttf",
    },
  },
};

/**
 * The renderer can only break lines between characters, not at Japanese
 * phrase boundaries, so copy may mark its line breaks with "\n" (as the
 * Japanese copy does). Copy without "\n" keeps the default wrapping.
 */
function lineBreaks(text: string) {
  return text.includes("\n") ? { whiteSpace: "pre-line" as const } : {};
}

/**
 * Loads a locale's font files from the repo. Fails the build, rather than
 * shipping an image with empty boxes, if the text uses a character that the
 * subset does not contain.
 */
async function loadFonts(font: SocialImageFont, text: string) {
  const dir = path.join(process.cwd(), font.dir);
  const coverage = new Set(await readFile(path.join(dir, "coverage.txt"), "utf8"));
  const missing = [...new Set(text)].filter((char) => char.trim() && !coverage.has(char));
  if (missing.length > 0) {
    throw new Error(
      `Social image: "${missing.join("")}" is not in the ${font.family} subset. ` +
        "Run `npm run build`, then `python3 scripts/subset-og-font.py`.",
    );
  }
  return Promise.all(
    ([400, 700] as const).map(async (weight) => ({
      name: font.family,
      data: await readFile(path.join(dir, font.files[weight])),
      weight,
      style: "normal" as const,
    })),
  );
}

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

export async function renderSocialImage(copy: SocialImageCopy, font?: SocialImageFont) {
  const [wordmark, ...steps] = await Promise.all([
    asDataUri("images/sketch-steps-wordmark.png", "image/png"),
    ...STEPS.map((step) => asDataUri(step.src, "image/jpeg")),
  ]);

  const text = [
    copy.heading,
    copy.body,
    ...STEPS.map(({ step }) => copy.stepLabel(step)),
    "sketchsteps.app",
  ].join("");
  const fonts = font ? await loadFonts(font, text) : undefined;
  const fontFamily = font?.family;

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
          ...(fontFamily ? { fontFamily } : {}),
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
              ...lineBreaks(copy.heading),
            }}
          >
            {copy.heading}
          </div>
          <div
            style={{
              marginTop: 22,
              ...lineBreaks(copy.body),
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
    fonts ? { ...SOCIAL_IMAGE_SIZE, fonts } : SOCIAL_IMAGE_SIZE,
  );
}
