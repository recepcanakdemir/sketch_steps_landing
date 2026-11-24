import type { Article, BlogImage } from "@/lib/blog/types";

/**
 * DRAFT (not published). Listed in content/blog/drafts.ts, so it is only
 * built with BLOG_DRAFT_PREVIEW=1 on a local machine. Review notes:
 * docs/editorial/how-to-draw-a-turkey/ (image-review.md, review.md).
 *
 * Images: the nine pencil stages supplied by the owner on 2026-11-24,
 * byte-identical copies (about 341 px square, never enlarged). Their
 * origin (hand-drawn or generated) must be confirmed before publication;
 * see review.md.
 */

const DIR = "/blog/how-to-draw-a-turkey";

const step = (
  n: number,
  name: string,
  size: [number, number],
  alt: string,
): BlogImage => ({
  src: `${DIR}/how-to-draw-a-turkey-step-${n}-${name}.jpg`,
  alt,
  width: size[0],
  height: size[1],
});

const images = {
  s1: step(1, "body-oval", [341, 341], "Step 1 of a turkey drawing: a large, tilted oval drawn with light, overlapping pencil lines"),
  s2: step(2, "neck-head", [342, 341], "Step 2: a small circle for the head joined to the oval by a narrow neck, with lines for the back and chest"),
  s3: step(3, "back-wing-tail", [341, 341], "Step 3: a firmer back line, a pointed wing shape on the side of the body and two lines for the tail at the lower left"),
  s4: step(4, "wing-line", [341, 342], "Step 4: a long, curved line from the base of the neck across the body to the tip of the wing"),
  s5: step(5, "legs", [342, 342], "Step 5: two thin legs under the body, each with a bend near the top"),
  s6: step(6, "line-drawing", [341, 342], "Step 6: a line drawing of a wild turkey with an eye, a hooked beak, a wattle, a ruffled wing edge and jagged tail feathers"),
  s7: step(7, "beard-details", [341, 341], "Step 7: the line drawing with a beard hanging from the chest, a darker wattle and feather lines inside the wing"),
  s8: step(8, "feather-texture", [342, 341], "Step 8: rows of short, curved pencil strokes cover the body as feathers, with a bumpy neck texture and grass around the legs"),
  s9: step(9, "shading", [341, 341], "Step 9: finished pencil drawing of a wild turkey with a dark, shaded body, light feather edges and a light head, standing in grass"),
};

const article: Article = {
  id: "how-to-draw-a-turkey",
  category: "animals",
  author: "team",
  related: ["how-to-draw-a-face"],
  translations: {
    en: {
      slug: "how-to-draw-a-turkey",
      title: "How to Draw a Turkey Step by Step",
      seoTitle: "How to Draw a Turkey Step by Step (Realistic Pencil)",
      description:
        "Learn how to draw a realistic turkey in pencil, step by step: start with an oval, add the neck, wing, tail and legs, then build up feathers and shading.",
      excerpt:
        "Nine pencil stages, from one light oval to a shaded wild turkey, with what to draw at each stage and how to avoid the usual mistakes.",
      status: "draft",
      heroImage: {
        ...images.s9,
        alt: "Finished pencil drawing of a wild turkey standing in grass, the last of nine drawing stages",
      },
      // Built from the real step images by scripts/blog-og-how-to-draw-a-turkey.mjs
      // (steps scaled down or at native size; nothing upscaled).
      socialImage: {
        src: `${DIR}/how-to-draw-a-turkey-og.png`,
        alt: "How to Draw a Turkey: three stages of a pencil drawing, from simple shapes to a shaded wild turkey",
        width: 1200,
        height: 630,
      },
      body: [
        {
          type: "paragraph",
          text: "This tutorial shows you how to draw a turkey in pencil, in nine stages: from one light oval to a shaded wild turkey standing in grass. You build the bird from a few simple shapes first and leave the feathers and shading for the end.",
        },
        {
          type: "paragraph",
          text: "It's a realistic turkey drawing, not a cartoon or a hand turkey. The first five stages are only shapes and lines, so they're a good fit for beginners. The last two take more time, because the feathers are built up from many short strokes. If you want a clean line drawing for a Thanksgiving card, you can stop after step 7.",
        },

        { type: "heading", level: 2, text: "What you need" },
        {
          type: "list",
          items: [
            "A pencil",
            "Paper",
            "This page, open next to your paper, so you can compare after every stage",
          ],
        },
        {
          type: "paragraph",
          text: "Keep your early lines light. Most of them are guides, and by step 8 they're gone.",
        },

        { type: "heading", level: 2, text: "The shapes that make a turkey" },
        {
          type: "paragraph",
          text: "Seen from the side, a wild turkey is mostly body: one big, tilted oval. The head is small and sits high on a long, narrow neck. The wing covers much of the side of the body, the tail points down and back, and the legs are thin, with a bend near the top. Get those proportions right and the drawing reads as a turkey long before you add a single feather.",
        },

        { type: "heading", level: 2, text: "How to draw a turkey step by step" },

        { type: "heading", level: 3, text: "Step 1: Draw a tilted oval for the body" },
        { type: "image", image: images.s1 },
        {
          type: "paragraph",
          text: "Draw a large oval a little left of center, tilted so that its right end sits higher than its left. This is the body, and it's by far the biggest shape in the drawing. Leave room above it on the right for the neck and head, and below it for the legs.",
        },
        {
          type: "paragraph",
          text: "Look closely and you'll see the oval is made of several light, overlapping lines. Keep yours just as loose. You'll draw a firmer outline later, so for now it only needs to be in roughly the right place.",
        },
        {
          type: "tip",
          title: "Common mistake",
          text: "A level oval. A flat, horizontal body makes the pose look stiff. Tilt the oval so it rises toward the side where the head will be.",
        },

        { type: "heading", level: 3, text: "Step 2: Add the neck and head" },
        { type: "image", image: images.s2 },
        {
          type: "paragraph",
          text: "Draw a small circle for the head, high above the right end of the oval. Connect it to the body with a narrow neck: two lines that run down from the circle and spread apart as they reach the body.",
        },
        {
          type: "paragraph",
          text: "Let the right-hand neck line continue down along the oval. That's the chest. From the base of the neck, draw a second line back to the left over the top of the oval for the back. The outline now looks a bit like a teardrop with a long stem.",
        },
        {
          type: "tip",
          text: "The head is much smaller than you might expect. Compare the circle with the oval before you go on: a head that's too big is one of the quickest ways to make the bird look off.",
        },

        { type: "heading", level: 3, text: "Step 3: Outline the back, the wing and the tail" },
        { type: "image", image: images.s3 },
        {
          type: "paragraph",
          text: "Go over the back with a firmer line, from the base of the neck down to the left end of the body. Let it rise slightly above the oval: the back is round and high.",
        },
        {
          type: "paragraph",
          text: "Then draw the wing on the side of the body. It's a long shape that narrows to a point at the lower left. Its bottom edge runs from that point back toward the middle of the body. Two curved lines across the upper part of the wing complete the shape.",
        },
        {
          type: "paragraph",
          text: "Finally, start the tail: two long lines that leave the body below the wing tip and run down to the left, closed off with a short line at the end.",
        },

        { type: "heading", level: 3, text: "Step 4: Draw the top edge of the wing" },
        { type: "image", image: images.s4 },
        {
          type: "paragraph",
          text: "Draw one long, gently curved line from the base of the neck, across the body, to the tip of the wing. This is the upper edge of the wing, and it separates the wing from the back.",
        },
        {
          type: "paragraph",
          text: "It's only one line, but you'll keep it: in step 6 it becomes the edge where the wing feathers begin.",
        },

        { type: "heading", level: 3, text: "Step 5: Add the legs" },
        { type: "image", image: images.s5 },
        {
          type: "paragraph",
          text: "Place two thin legs under the body: one under the chest, the other farther back. Start each leg with a short line that angles away from the body, then bend it and draw the lower leg as two long, almost straight lines going down. The bend is the joint.",
        },
        {
          type: "paragraph",
          text: "The feet aren't drawn at all. In step 8, grass covers the bottom of the legs, so you don't need them.",
        },
        {
          type: "tip",
          title: "Check the proportions now",
          text: "Small head, long neck, big body, slim legs. If one of these looks wrong, fix it before you go on. It's much harder to change once the details are in.",
        },

        { type: "heading", level: 3, text: "Step 6: Turn the shapes into a line drawing" },
        { type: "image", image: images.s6 },
        {
          type: "paragraph",
          text: "This stage changes the most, so work through it one part at a time:",
        },
        {
          type: "list",
          items: [
            "**Head:** draw the outline with a slightly bumpy edge, a dark eye and a short beak that curves down at the tip. Add the small point above the beak and the lumpy wattle that hangs at the front of the throat.",
            "**Neck and chest:** redraw the front of the neck and the chest with one firmer line.",
            "**Wing:** go over the wing and give its lower part a ruffled edge where the feathers overlap.",
            "**Tail:** give the lower edge of the tail a row of short, jagged feather tips.",
            "**Legs:** widen the tops of the legs where they meet the belly, and redraw the lower legs as slim, straight shapes.",
          ],
        },
        {
          type: "paragraph",
          text: "Leave the oval and the other early lines faint. By step 8 they're gone, so don't go over them.",
        },

        { type: "heading", level: 3, text: "Step 7: Add the beard and strengthen the details" },
        { type: "image", image: images.s7 },
        {
          type: "paragraph",
          text: "First, the beard: the long tuft that hangs from a wild turkey's chest. Draw it in front of the front leg as a bundle of wavy strokes that narrows toward the bottom.",
        },
        {
          type: "paragraph",
          text: "Then darken the lines that matter most: the wattle, the eye and the beak. Add a few long lines inside the wing to suggest its feathers.",
        },
        {
          type: "tip",
          title: "Stopping here",
          text: "This is a good point to finish if you want a clean line drawing, for example for a Thanksgiving card. Remove or lighten the leftover construction lines and you're done.",
        },

        { type: "heading", level: 3, text: "Step 8: Build up the feather texture" },
        { type: "image", image: images.s8 },
        {
          type: "paragraph",
          text: "In the image, the oval and the head circle are gone by this stage. Erase yours, or make sure they're faint enough to disappear under the texture. Then cover the body with rows of short, curved strokes, like overlapping scales. Let the rows follow the body: they curve around the breast and run along the back toward the tail.",
        },
        {
          type: "paragraph",
          text: "The head and neck get a different texture: small, bumpy marks instead of feathers. Add darker lines in the tail and on the wing, shade the legs lightly, and draw grass with quick upward strokes in front of and behind the legs.",
        },
        {
          type: "tip",
          text: "Keep your strokes short and turn them as the body turns. Long, straight strokes across the body make the turkey look flat.",
        },

        { type: "heading", level: 3, text: "Step 9: Shade the feathers" },
        { type: "image", image: images.s9 },
        {
          type: "paragraph",
          text: "The last stage is about value. Add more strokes over the body until most of it is dark, but leave a light edge along each row of feathers. Those light edges are what make the feathers look like separate layers.",
        },
        {
          type: "paragraph",
          text: "Give the upper edge of the wing a few dark bars and keep a lighter, speckled patch near the wing tip. The tail is dark with lighter bands. Keep the head and neck much lighter than the body.",
        },
        {
          type: "tip",
          text: "If an area isn't dark enough, add another layer of strokes instead of pressing harder. Heavy pressure leaves shiny marks that are hard to fix.",
        },

        { type: "heading", level: 2, text: "Common mistakes and how to fix them" },
        {
          type: "list",
          items: [
            "**Adding feathers too early.** Texture on top of a wrong outline is hard to fix. Get the shapes right through step 7 first.",
            "**A short, thick neck.** The neck is long and narrow, and it widens only where it meets the chest.",
            "**Straight legs with no joint.** Give each leg a bend near the body, as in step 5.",
            "**Outlining every feather.** Use short strokes and leave light edges instead of drawing a closed shape around each feather.",
            "**The same darkness everywhere.** Keep the head and neck light and the body dark. That contrast is what makes the head stand out.",
          ],
        },

        { type: "heading", level: 2, text: "What to draw next" },
        {
          type: "paragraph",
          text: "Once this turkey works, try the same process with a photo of a bird: find the body shape, the head and the angle of the neck, then the legs, and only then the feathers. If you'd like to draw people too, [How to Draw a Face Step by Step](/blog/how-to-draw-a-face) uses the same approach: simple shapes first, details last.",
        },
        { type: "appCta" },
      ],
    },
  },
};

export default article;
