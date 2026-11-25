import { SOCIAL_IMAGE_SIZE, renderSocialImage } from "@/lib/social-image";

/**
 * English social image (also the fallback for any route without its own).
 * Copy is taken verbatim from the homepage hero; no ratings or claims.
 */

export const alt =
  "Sketch Steps: a face photo turned into a step-by-step Loomis drawing guide";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSocialImage({
    heading: "Step-by-Step Loomis Drawing Guide",
    body: "Upload a face photo and get guided drawing steps.",
    stepLabel: (step) => `Step ${step}`,
  });
}
