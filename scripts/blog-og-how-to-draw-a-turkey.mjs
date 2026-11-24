// Builds the 1200x630 social image for the article "How to Draw a Turkey"
// from the article's own step images (no new artwork is added).
//
//   node scripts/blog-og-how-to-draw-a-turkey.mjs
//
// Output: public/blog/how-to-draw-a-turkey/how-to-draw-a-turkey-og.png
//
// Rules: the last step is placed at its native size (1:1 pixels); the two
// earlier steps are only scaled down. Nothing is upscaled and the drawings
// are not altered. Layout and style follow scripts/blog-og-how-to-draw-a-face.mjs.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = process.cwd();
const DIR = "public/blog/how-to-draw-a-turkey";
const OUT = path.join(root, DIR, "how-to-draw-a-turkey-og.png");
const EARLY_SCALE = 0.8; // downscale only
const INK = "#27150A";

const dataUri = async (file, mime) =>
  `data:${mime};base64,${(await readFile(path.join(root, file))).toString("base64")}`;
const stepFile = (name) => `${DIR}/how-to-draw-a-turkey-step-${name}.jpg`;

// [file name, native width, native height]
const STEPS = [
  ["3-back-wing-tail", 341, 341],
  ["6-line-drawing", 341, 342],
  ["9-shading", 341, 341],
];

const [wordmark, font, ...steps] = await Promise.all([
  dataUri("public/images/sketch-steps-wordmark.png", "image/png"),
  readFile(path.join(root, "assets/fonts/m-plus-rounded-1c/MPlusRounded1c-Bold.subset.ttf")),
  ...STEPS.map(([name]) => dataUri(stepFile(name), "image/jpeg")),
]);

const card = (src, [, width, height], scale) =>
  h(
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
    h("img", {
      src,
      width: Math.round(width * scale),
      height: Math.round(height * scale),
      style: { borderRadius: 16 },
    }),
  );

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
        "How to Draw a Turkey",
      ),
      h("img", { src: wordmark, width: 216, height: 72 }),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-around" } },
      card(steps[0], STEPS[0], EARLY_SCALE),
      card(steps[1], STEPS[1], EARLY_SCALE),
      card(steps[2], STEPS[2], 1),
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
