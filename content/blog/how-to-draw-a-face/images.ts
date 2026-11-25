import { demo } from "@/components/home/assets";
import type { BlogImage } from "@/lib/blog/types";

/**
 * The nine stages Sketch Steps generated from a portrait photo (the same set
 * as the homepage demo), byte-identical copies in
 * public/blog/how-to-draw-a-face/. Shared by every language version; only the
 * alt text is translated.
 */
export const DIR = "/blog/how-to-draw-a-face";

export const STEP_FILES = [
  "cranium-circle",
  "center-line",
  "side-planes-jaw",
  "placing-features",
  "hair-ears-neck",
  "eyes-details",
  "refined-lines",
  "light-shading",
  "finished-sketch",
] as const;

/** Step image n (1-9) with alt text in the article's language. */
export const step = (n: number, alt: string): BlogImage => ({
  src: `${DIR}/how-to-draw-a-face-step-${n}-${STEP_FILES[n - 1]}.jpg`,
  alt,
  width: 292,
  height: 394,
  // Same per-step framing as the homepage demo (only blank paper is cropped;
  // checked for every step). Files untouched, never enlarged.
  framing: demo.stepFraming[n - 1],
});
