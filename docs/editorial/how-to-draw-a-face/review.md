# Review notes: How to Draw a Face Step by Step

Status: **published 2026-11-18** (`status: "published"`, registered in
`content/blog/index.ts`). The owner read the article and approved
publication; the drawing-accuracy checklist below was not completed
separately. Corrections from it go in as normal content updates (set
`updatedAt`).

| Role | Name | Date | Result |
|---|---|---|---|
| Editorial / technical pre-review (AI-assisted) | — | 2026-11-18 | Done; see below |
| Drawing accuracy reviewer | _to be named_ | | Not done before publication |
| Owner publication approval | Owner | 2026-11-18 | Approved |

## Pre-review results (2026-11-18)

- Terminology: the article separates the classic Loomis construction
  (brow line on the middle of the ball, nose line, chin line, approximate
  thirds) from the guidelines in our Sketch Steps example (eyes on the middle
  line). Stated in "The Loomis method in a nutshell", step 2 and step 4.
- Proportions are described as approximate and checked against "your
  reference" (defined in the intro: this drawing, or the reader's photo).
- Every step's text was compared with its image; nine images in order
  (1-9), aligned with the homepage framing at 360 px and 1280 px.
- Social image: steps 1, 4, 6, 9 (1 and 9 pixel-identical to the source).
- SEO: title 62 chars incl. suffix, description 147 chars, one H1, five H2,
  nine H3, one JSON-LD block (Organization, BlogPosting, BreadcrumbList), one
  in-article CTA (`blog_inline`), no end-of-article duplicate.
- Author "Sketch Steps Team"; the intro states that Sketch Steps generated the
  nine stages from a portrait photo. No AI-writing disclosure (owner
  decision). Materials list approved by the owner.

## For the drawing reviewer (not approved; please tick or correct)

- [ ] **Step 2:** the example's middle line works as an eye-level guide;
      classic Loomis diagrams call it the brow line. Is this distinction
      stated correctly?
- [ ] **Step 2:** the horizontal line sits close to, not exactly on, the
      circle's middle. Is "close to its middle" acceptable?
- [ ] **Step 3:** side planes appear as narrow curves because a front view
      sees them almost edge-on. Correct explanation?
- [ ] **Step 3:** the lighter lines from the lower circle toward the chin
      corners are described without a purpose. Should they be explained or
      left as is?
- [ ] **Step 4:** classic Loomis horizontals named as brow line, nose line
      and chin line, spaced as thirds. Correct?
- [ ] **Step 5:** ears "only hinted at", roughly between the eye-level
      guideline and the bottom of the nose. The ear on the viewer's left is
      uncertain in the image.
- [ ] **Step 6 tip:** "a common guideline puts the eyes roughly halfway
      between the top of the skull and the chin"; measured (2026-11-24), this drawing's
      eye line sits about 45% down (a little higher; earlier note said 39%). Is the wording accurate,
      allowing for the head's tilt?
- [ ] **Step 6:** "drawing the full circle of the iris can make eyes look
      like they're staring". Acceptable as general advice?
- [ ] **Step 8:** no light direction is named (measurements inconclusive).
- [ ] **Step 9:** leftover construction lines presented as the reader's
      choice.
- [ ] **Facts:** Andrew Loomis, American illustrator; *Drawing the Head and
      Hands*. Evidence found 2026-11-23 (see below); still for the reviewer
      to confirm.
- [ ] **Glossary** in `docs/editorial/standards.md` checked by someone who
      draws (required before the first article).

## Pre-translation review (2026-11-23, AI-assisted, before the Spanish version)

Not a drawing review: nothing above is ticked. Findings from re-reading the
English text against the nine images and from public sources:

- **Facts (evidence, not approval).** *Drawing the Head and Hands* is dated
  1956 on its Wikimedia Commons file record. Secondary tutorials (Proko,
  finearttutorials.com) describe the ball's horizontal "equator" as the brow
  line and the vertical as the center line, which matches what the article
  calls the classic Loomis construction (steps 2 and 4).
- **Step 5 image re-checked (enlarged crop).** The eyebrows are outlined and
  no eyes are drawn yet, as the text and alt text say. The ear on the
  viewer's right is a small C-shaped curve; on the viewer's left the hair
  outline and the side-plane line overlap and no ear can be identified. The
  text ("only hinted at and partly hidden by the hair") stays accurate; the
  reviewer item stays open.
- **Step 3 image re-checked.** Two lighter lines run from the lower circle
  toward the chin corners; their purpose is not evident from the image, so
  the text still describes them without a purpose.
- **Step 8 image re-checked.** Hatching appears on both sides of the face;
  no light direction is named, as before.
- **No new factual errors found** in the English text. No change was made to
  the published English article.

### Technical questions that need an experienced drawing reviewer

These apply to the English and Spanish versions alike (the Spanish text says
exactly what the English says):

1. Step 2 / step 4: the "brow line (classic) vs. eye-level guide (this
   drawing)" distinction.
2. Step 3: whether "seen almost edge-on" is the right explanation for the
   narrow side-plane curves, and whether the two light jaw lines need a
   purpose.
3. Step 5: ear placement wording.
4. Step 6: the "eyes roughly halfway" guideline and the iris advice.
5. Glossary in `docs/editorial/standards.md` (English) and its Spanish
   counterpart (section 8).

## Spanish version (es): published 2026-11-25 (UTC)

`content/blog/how-to-draw-a-face/es.ts`, `status: "published"`,
`publishedAt: "2026-11-25"`, slug `como-dibujar-una-cara`. Same entry as the
English article (a genuine translation), so hreflang en ↔ es is generated
from it.

| Role | Name | Date | Result |
|---|---|---|---|
| Translation and SEO pre-check (AI-assisted) | — | 2026-11-23 | Done; see below |
| Native Spanish review (Spain and Mexico readability) | _to be named_ | | **Open** (not done before publication) |
| Drawing accuracy reviewer (shared with English, list above) | _to be named_ | | **Open** (not done before publication) |
| Final accuracy check (AI-assisted) | — | 2026-11-25 | Done; see "Publication check" below |
| Owner publication approval | Owner | 2026-11-25 | Approved, subject to the final accuracy check |

Pre-check (2026-11-23):

- Step for step the same content as the English article: 5 H2, 9 H3, the
  same tips, the same mistakes list, one in-article CTA. No new step,
  practice plan or FAQ added. Each step text re-read against its image.
- Glossary: `docs/editorial/standards.md` section 8 (línea central, línea de
  las cejas, línea guía de los ojos, planos laterales, rayado...).
- SEO: title "Cómo dibujar una cara paso a paso: método Loomis | Sketch
  Steps" (63 characters), description 141 characters, H1 "Cómo dibujar una
  cara paso a paso", no year. Social card `como-dibujar-una-cara-og.png`
  (same four stages as the English card, Spanish title).
- Verified in a simulated publication build (not committed): reciprocal
  hreflang en/es + x-default (English) on both pages, self canonicals,
  both URLs and `/es/blog` in the sitemap, valid BlogPosting and
  BreadcrumbList (Inicio › Blog › article), `inLanguage: es`.

For the Spanish reviewer (please tick or correct):

- [ ] Overall: reads as natural Spanish for Spain and Mexico, not as a
      translation.
- [ ] Step 4: "las aletas" (was "las fosas nasales"): the drawn lines are
      the nostril wings.
- [ ] Step 8: "rayado suave (también llamado achurado)" for hatching.
- [ ] Step 5: "esboza" kept for "block in" ("encaja" is Spain art-school
      jargon).
- [ ] Steps 5 and 8: "la ropa" instead of "camiseta" (Mexico: "playera").
- [ ] Straight double quotes instead of « ».
- [ ] 2026-11-24 proposals applied to the draft for review: "comisuras de los
      labios", "se vea extraña", "Una aclaración", "quedan casi paralelos a
      tu línea de visión" (was "de canto"), "un repaso de limpieza", "Deja
      los mechones sueltos para más adelante", "de uno en uno o en una lista
      continua" (same wording as the live Spanish homepage), "una foto que tú
      elijas", "Es el momento en que menos cuesta empezar de nuevo".
- [ ] The CTA box text comes from `messages/es.json` (Blog.article.ctaTitle,
      ctaBody), already live on the Spanish site.

## Measurement review (2026-11-24, AI-assisted; not a drawing approval)

Method: the original 292×394 step files, grey values read with Pillow;
lines found as the darkest pixels in narrow bands; positions in file pixels.
The step images are not pixel-registered with each other (each stage was
generated separately; the homepage framing aligns them only visually), so
every comparison below is made **within one image**.

| Point (step 3 unless noted) | y (px) |
|---|---|
| Top of the cranium circle, on the center line | ≈61 |
| Bottom of the circle, on the center line (step 2) | ≈248 |
| Step-2 horizontal crossing the center line | ≈170 |
| Bottom of the flat chin, on the center line | ≈304 |

- **Step 2 line position:** the horizontal crosses the center line about
  58% of the way down the circle (circle middle ≈155), i.e. **a little
  below** the middle, not "close to" it. The tilt is consistent: center line
  ≈9° from vertical, horizontal ≈9° from horizontal (right angle kept).
- **What the line is used for (steps 4-6, measured in each image):** in
  step 4 the brows are drawn about 12-15 px above it; in step 6 the line
  runs through the lower half of both eyes (≈2-5 px below the iris centers,
  eye opening ≈14 px tall). So the image shows an **eye line** placed a
  little below the circle's middle. Classic Loomis puts the brow line on
  the middle of the ball, with the eyes below it, so the two constructions
  differ by design, not by a drawing error.
- **Eye height:** eye line at (170-61)/(304-61) ≈ **45%** of the distance from
  the top of the cranium circle to the chin. Reference points: top of the
  cranium circle (the skull, not the hair) and the bottom of the chin, along
  the tilted center line (the tilt does not change the ratio). The common
  guideline is "about halfway" (50%), so "a little higher than that" is
  accurate. The earlier figure of ~39% (image-review.md) was wrong.
- **Wording consequences:** "close to its middle" (step 2) and "on the
  middle line of the circle" (step 4, step 6 tip) are imprecise in both
  languages. Fixed in the Spanish draft; proposed for English (below).

Drawing-reviewer items above stay open; these measurements are evidence for
the reviewer, not approval.

### Corrections to the published English article (applied 2026-11-24 in the source, owner-approved; deployed 2026-11-25 with PR #17)

1. Step 2, paragraph 1: "a horizontal line across the circle, close to its
   middle" → "a horizontal line across the circle, a little below its
   middle". Same in the step 2 alt text.
2. Step 2, paragraph 3: "many Loomis diagrams call the middle horizontal
   line the brow line. In this drawing, the eyebrows end up just above it…"
   → "classic Loomis diagrams draw a horizontal line through the middle of
   the ball and call it the brow line. The one in this drawing sits a little
   lower: the eyebrows go above it and, in step 6, the eyes are drawn along
   it, so here it works as your eye-level guide."
3. Step 4, paragraph 2: "This drawing puts the eyes on that middle line
   instead (see step 2)" → "This drawing puts the eyes on the horizontal line
   from step 2 instead, which sits a little below the middle of the circle."
4. Step 6 tip: "on the middle line of the circle" → "on the horizontal line
   from step 2".

Applied to `content/blog/how-to-draw-a-face/index.ts` with the owner's
approval (alt text of step 2 included). URL, SEO title, meta description,
`publishedAt`, images and CTA unchanged. **`updatedAt` not set yet:** add the
real date of the production deploy that ships these corrections (it shows
"Updated on …" on the page and moves the sitemap `lastmod`).

## Publication check (2026-11-25, AI-assisted; not a native or drawing review)

Done before publishing the Spanish version and shipping the English
corrections (release branch `release/seo-geo-es-loomis`):

- **Spanish text re-read in full against the corrected English text.** Same
  steps, tips and mistakes; the step-2 line position wording ("un poco por
  debajo de su mitad", "la línea horizontal del paso 2") matches the
  measurement review and the English corrections. No factual difference
  between the two versions found.
- **Glossary fix:** `docs/editorial/standards.md` section 8 described the
  eye-level guide as "this drawing's middle line"; changed to "this drawing's
  step-2 horizontal, a little below the middle of the circle".
- **Links:** the in-article link `/es#demo-title` points to the demo section
  on the Spanish homepage (`id="demo-title"`); the CTA box text comes from
  `messages/es.json`, already live.
- **SEO:** title "Cómo dibujar una cara paso a paso: método Loomis | Sketch
  Steps"; self canonical; reciprocal hreflang en/es + x-default; BlogPosting
  (`inLanguage: es`) and BreadcrumbList; both URLs and `/es/blog` in the
  sitemap. Verified in the production build output.
- **Dates:** the English corrections ship with `updatedAt: "2026-11-25"` and
  the Spanish version with `publishedAt: "2026-11-25"`: the UTC date on which
  the release branch was prepared (the build rejects future dates, and it
  checks them in UTC). Deployed on 2026-11-25 (UTC) with PR #17 (merge
  commit `0b75f9e`), so both dates match the release date.

**Still open after publication (not resolved by this check):**

1. Native Spanish review (Spain and Mexico): every item in the Spanish
   checklist above, including W1 (whole-article read).
2. Drawing-accuracy review, shared by both languages: every item in "For the
   drawing reviewer". The two items about the step-2 line position are
   answered by the 2026-11-24 measurements, but a person who draws has not
   confirmed them.
3. Glossary check by someone who draws (English section 3 and Spanish
   section 8).

None of these is a known error. They are reviews that have not happened, so
the article must not be described as expert- or native-reviewed.
