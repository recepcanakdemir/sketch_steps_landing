// Builds the 1200x630 social image for the draft article "How to Draw a Face"
// from the article's real Sketch Steps step images (no generated artwork).
//
//   node scripts/blog-og-how-to-draw-a-face.mjs
//
// Output: public/blog/how-to-draw-a-face/how-to-draw-a-face-og.png
//
// Rules: the first and last steps are placed at exactly their native size
// (292x394, 1:1 pixels); the two middle steps are only scaled down. Nothing
// is upscaled and the drawings are not altered. Style follows the site's
// default social card (lib/social-image.tsx): white background, soft crimson
// glow, wordmark, white cards with a shadow; title in M PLUS Rounded 1c, the
// site's rounded font (subset in assets/fonts, covers this text).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = process.cwd();
const DIR = "public/blog/how-to-draw-a-face";
const OUT = path.join(root, DIR, "how-to-draw-a-face-og.png");
const NATIVE = { width: 292, height: 394 };
const MIDDLE_SCALE = 0.62; // downscale only
const INK = "#27150A";

const dataUri = async (file, mime) =>
  `data:${mime};base64,${(await readFile(path.join(root, file))).toString("base64")}`;
const stepFile = (name) => `${DIR}/how-to-draw-a-face-step-${name}.jpg`;

const [wordmark, s1, s4, s6, s9, font] = await Promise.all([
  dataUri("public/images/sketch-steps-wordmark.png", "image/png"),
  dataUri(stepFile("1-cranium-circle"), "image/jpeg"),
  dataUri(stepFile("4-placing-features"), "image/jpeg"),
  dataUri(stepFile("6-eyes-details"), "image/jpeg"),
  dataUri(stepFile("9-finished-sketch"), "image/jpeg"),
  readFile(path.join(root, "assets/fonts/m-plus-rounded-1c/MPlusRounded1c-Bold.subset.ttf")),
]);

const card = (src, scale) => {
  const width = Math.round(NATIVE.width * scale);
  const height = Math.round(NATIVE.height * scale);
  return h(
    "div",
    {
      style: {
        display: "flex",
        padding: 6,
        borderRadius: 22,
        background: "#FFFFFF",
        border: "1px solid #EFE3D8",
        boxShadow: "0 18px 40px rgba(39,21,10,0.12)",
      },
    },
    h("img", { src, width, height, style: { borderRadius: 16 } }),
  );
};

const image = new ImageResponse(
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "34px 44px 36px",
        background: "#FFFFFF",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(228,56,68,0.08), transparent 45%)",
        fontFamily: "M PLUS Rounded 1c",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(
        "div",
        { style: { display: "flex", fontSize: 64, fontWeight: 700, color: INK, letterSpacing: "-0.01em" } },
        "How to Draw a Face",
      ),
      h("img", { src: wordmark, width: 216, height: 72 }),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      card(s1, 1),
      card(s4, MIDDLE_SCALE),
      card(s6, MIDDLE_SCALE),
      card(s9, 1),
    ),
  ),
  {
    width: 1200,
    height: 630,
    fonts: [{ name: "M PLUS Rounded 1c", data: font, weight: 700, style: "normal" }],
  },
);

await writeFile(OUT, Buffer.from(await image.arrayBuffer()));
console.log("wrote", path.relative(root, OUT));
