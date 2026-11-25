# "How to Draw a Turkey Step by Step": draft report

Branch **`feature/blog-how-to-draw-a-turkey`**, commit **`e9466b9`**, based on
`origin/main` e0d48f5.

- **Unpublished draft:** it is listed only in `content/blog/drafts.ts`.
- **Not pushed, merged or deployed.**
- **Other branches untouched:** `feature/es-content-seo` (9441afa) and `feature/geo-homepage-facts` (eab7b71).
- **Worktree:** `<local worktree sketch_steps_landing-turkey>`.
- **Local preview:** http://localhost:3002/blog/how-to-draw-a-turkey (draft-preview build, marked noindex).

## 1. Recommended image order

| Step | Your image | File |
|---|---|---|
| 1 | 26 | `how-to-draw-a-turkey-step-1-body-oval.jpg` |
| 2 | 23 | `…-step-2-neck-head.jpg` |
| 3 | 29 | `…-step-3-back-wing-tail.jpg` |
| 4 | 22 | `…-step-4-wing-line.jpg` |
| 5 | 21 | `…-step-5-legs.jpg` |
| 6 | 27 | `…-step-6-line-drawing.jpg` |
| 7 | 28 | `…-step-7-beard-details.jpg` |
| 8 | 24 | `…-step-8-feather-texture.jpg` |
| 9 | 25 | `…-step-9-shading.jpg` |

**Technique:** construction from simple shapes (oval, circle, lines), then a
refined line drawing, then hatching for texture, then layered values. Graphite
pencil on white paper.

## 2. Problems found in the drawings

1. **Steps 3 and 4 (images 29 and 22): high confidence, not certain.**
   - Image 22 adds a long line from the neck to the wing tip, and that line is still there in 21 (the legs).
   - So 29 comes before 22.
2. **Big jump from step 5 to step 6.** Head, wing edge, tail and legs are all refined at once. I split the step 6 text into five parts rather than invent stages.
3. **Framing changes between photos.** Image 28 is noticeably closer. It's readable, so there's no correction.
4. **Low resolution.** About 341 px per image. They display at native size (never enlarged), served through the blog's usual image pipeline. Please send larger originals if you have them.
5. **Not a beginner drawing throughout.**
   - Steps 1–5: beginner-friendly.
   - Steps 8–9 (realistic feathers and values): intermediate.
   - The drawing is a realistic wild turkey, so I did not use "cute", "simple", "easy" or "hand turkey".
6. **Image origin unknown.** Are these hand-drawn, or Sketch Steps output? Nine pencil stages on paper look like the app's Animal Drawing style. Per the editorial standards, if they were generated, the article needs the same disclosure as the face article. Not added yet.

## 3. Final SEO fields

| Field | Value |
|---|---|
| Slug | `/blog/how-to-draw-a-turkey` |
| H1 | How to Draw a Turkey Step by Step |
| SEO title | How to Draw a Turkey Step by Step (Realistic Pencil). The page shows "… \| Sketch Steps". |
| Meta description (152 characters) | Learn how to draw a realistic turkey in pencil, step by step: start with an oval, add the neck, wing, tail and legs, then build up feathers and shading. |

**Changes from your proposal:**

- **"(Easy Tutorial)" → "(Realistic Pencil)":** the images don't support "easy". The honest label also sets expectations for searchers who want a cartoon, so fewer of them land and leave.
- **Meta description:** now says what is actually drawn.
- **"Thanksgiving":** used once, where it helps: stop at step 7 for a clean line drawing for a card.
- **The intro says plainly** that this isn't a cartoon or a hand turkey.

## 4. Article outline (as drafted)

- **Intro:** what you'll draw, and the nine stages. Says the drawing is realistic, not a cartoon or hand turkey, and that you can stop at step 7.
- **H2: What you need:** pencil, paper, an eraser (inferred, please confirm), this page.
- **H2: The shapes that make a turkey:** body, head, neck, wing, tail, legs.
- **H2: How to draw a turkey step by step**
  - Step 1: Draw a tilted oval for the body
  - Step 2: Add the neck and head
  - Step 3: Outline the back, the wing and the tail
  - Step 4: Draw the top edge of the wing
  - Step 5: Add the legs
  - Step 6: Turn the shapes into a line drawing (head, neck and chest, wing, tail, legs)
  - Step 7: Add the beard and strengthen the details, with a "Stopping here" tip
  - Step 8: Build up the feather texture
  - Step 9: Shade the feathers
- **H2: Common mistakes and how to fix them:** five items.
- **H2: What to draw next:** links to `/blog/how-to-draw-a-face`, then one `appCta`.
  - The CTA uses the blog's standard copy ("Turn your own photo into a drawing tutorial").
  - There is no claim that Sketch Steps teaches this turkey.

## 5. Image-to-step accuracy

| Step | What the text says | What the image shows | Match |
|---|---|---|---|
| 1 | A large oval a little left of center, right end higher, light overlapping lines | Same | ✅ |
| 2 | Small head circle high above the right end; narrow neck; right line continues as the chest; back line from the neck base over the oval | Same | ✅ |
| 3 | Firmer back line, slightly above the oval; wing narrowing to a point at the lower left; bottom edge back toward the middle; two curved lines across the upper wing; two tail lines closed at the end | Same | ✅ |
| 4 | One long curved line from the neck base across the body to the wing tip; it reappears as the wing edge in step 6 | The line is visible in 22 and 21; the wing edge follows it in 27 | ✅ |
| 5 | Thin legs, one under the chest and one farther back, each with an angled upper part and a bend; no feet | Same | ✅ |
| 6 | Bumpy head outline, dark eye, beak curving down, small point above the beak, wattle; firmer neck and chest; ruffled wing edge; jagged tail tips; wider leg tops; construction lines faint | Same | ✅ (a large jump, flagged above) |
| 7 | Beard in front of the front leg, wavy strokes narrowing down; darker wattle, eye and beak; long feather lines in the wing | Same | ✅ |
| 8 | Construction lines erased; rows of short curved strokes following the body; bumpy head and neck; darker tail and wing lines; legs lightly shaded; grass with upward strokes | Same | ✅ |
| 9 | Body dark with light edges along the feather rows; dark bars on the upper wing; lighter speckled patch near the wing tip; dark tail with lighter bands; head and neck light | Same | ✅ |

**Corrected while checking:** my first draft said the grass is darkened in
step 9. I measured it and it isn't, so I removed that.

**General advice that the images don't show:**

- "Add another layer instead of pressing harder"
- "Turn your strokes as the body turns"

Both are worded as tips, not as descriptions of how these drawings were made.

## 6. Checks

- **Code:** `tsc` passes; `eslint --max-warnings=0` passes.
- **Production build:** passes. The draft is not in the output or the sitemap.
- **Draft-preview build:** passes. The page has `noindex, nofollow`, a self-referencing canonical, and is not in the sitemap.
- **Simulated publication** (a scratch copy with today's date and the article in the registry; not committed):
  - Title, description, canonical `https://sketchsteps.app/blog/how-to-draw-a-turkey` and `index, follow` are correct.
  - Open Graph and Twitter use the 1200×630 image; `og:type` is article.
  - One H1, five content H2s, nine step H3s. All 15 images have alt text.
  - JSON-LD: BlogPosting (headline, description, images, dates, language, author = organization) and BreadcrumbList (Home › Blog › article). No FAQ schema.
  - Sitemap entry with `lastmod`. The blog index lists the article under Animals.
  - No hreflang: English only, the same as the face article.
- **Social image:** checked visually. Built from steps 3, 6 and 9; nothing upscaled.
- **Desktop preview:** step images display at their native ~341 px.
- **Mobile:** only spot-checked at the pane's narrow width.

**One side effect of publishing:** the face article's automatic "Related
articles" block will start listing the turkey article. The face article's own
content does not change.

## 7. Before publishing (your decisions)

1. **Image origin and disclosure** (see section 2, item 6).
2. **Materials:** confirm pencil, paper and eraser.
3. **Larger originals**, if you have them.
4. **Drawing review** by someone who draws (editorial checklist, section 3).
5. **Approval to publish.** Thanksgiving is 26 Nov. To publish: move the article to `content/blog/index.ts`, set `status: "published"` and the real `publishedAt`, then push and deploy. None of this happens without your go-ahead.

---

## Update, 25 Nov 2026: final checks (commit `89d5a30`)

**Image quality**

- **Higher-resolution originals:** none among the uploads (only the nine ~341 px files).
- **2× upscale test on one image (step 9):**
  - plain resampling is practically the same as the phone browser's own scaling;
  - sharpening exaggerates paper grain, JPEG noise and edge halos, which alters the drawing;
  - AI upscaling was not used (it can invent feather detail);
  - **so the originals are kept, unchanged.**
- **Mobile (375 px, 2× screen):**
  - images display 321 px wide, never wider than the 341 px files;
  - aspect ratio is kept; no horizontal scroll;
  - phones get AVIF or WebP at about 17 KB instead of 68 KB, with no visible artifacts at display size (PSNR 35–37 dB);
  - drawings look slightly soft on high-density screens. That's the resolution limit of the source files.

**Editorial changes**

- Materials: pencil and paper only. No eraser claim.
- Steps 6–8 now work with or without an eraser.
- "Keep your early lines light" replaces "first five stages", which clashed with step 3's firmer back line.
- All nine steps were rechecked against their images: they match.

**Technical**

- `tsc`, `eslint --max-warnings=0` and the production build pass. The draft is absent from the production build.
- Outside the article's own files, the only difference from `origin/main` is the one-line draft registration in `content/blog/drafts.ts`.
- **Simulated publication:**
  - title, meta description and canonical `https://sketchsteps.app/blog/how-to-draw-a-turkey` correct;
  - `index, follow`; Open Graph and Twitter use the 1200×630 image;
  - one H1; nine step images with alt text, plus alt text on every other image;
  - BlogPosting (headline = H1) and BreadcrumbList; no FAQ schema;
  - one in-article Sketch Steps CTA;
  - the sitemap gains the article (11 → 12 URLs).

**Remaining blocker:** the image origin is still unconfirmed. Everything else is ready.

**Disclosure text, ready to insert as the second paragraph:**

- **If generated by Sketch Steps** (same wording pattern as the face article):
  > "The nine stages shown here were generated by Sketch Steps. They are not an artist's sketches. Think of them as a reference you copy by hand, one stage at a time."
- **If hand-drawn:**
  > "The nine stages shown here were drawn in pencil by the Sketch Steps team." Adjust the wording to say who actually drew them.
