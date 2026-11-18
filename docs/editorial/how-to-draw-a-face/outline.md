# Outline: How to Draw a Face Step by Step

Status (2026-11-18): **English draft written** in
`content/blog/how-to-draw-a-face/index.ts` (`status: "draft"`, not in the
registry, never built). The owner approved the homepage demo set; the
"Images" decision below is superseded. See `image-review.md` (update section)
for the evidence behind each step.

## Article facts

| Field | Proposal |
|---|---|
| Working title (H1) | How to Draw a Face Step by Step: Loomis Method for Beginners |
| `seoTitle` (<title> gets " \| Sketch Steps" appended: 62 chars in total; Google may shorten long titles) | How to Draw a Face Step by Step (Loomis Method) |
| Slug | `how-to-draw-a-face` (permanent) |
| Article id / folder | `how-to-draw-a-face` |
| Category | `portraits` |
| Language | English (en-US) only. No translations until the English article is reviewed and published. |
| Author | "Sketch Steps Team" (organization). At draft time, change the display name in `content/blog/authors.ts` from "Sketch Steps" to "Sketch Steps Team". No personal byline. |
| Audience | US beginners who have never drawn a face with a construction method |
| Primary topic | How to draw a face step by step |
| Supporting topic | Loomis method for beginners |
| Scope | One face, front view, from construction to finished sketch, in nine steps from one drawing process. Profile and 3/4 views are out of scope (possible follow-up articles). |
| Length | No word-count target: as long as the steps need. |

Meta description draft (to finalize with the text, 140-160 chars):
"Learn to draw a face step by step with the Loomis method: start with a
simple ball, place the features with guidelines, then refine. Made for
beginners." (152)

## Search intent (assumptions, to confirm)

No competitor or keyword research has been done yet. Based on what the query
asks for, a beginner expects:

1. A sequence they can follow from a blank page to a recognizable face.
2. Where the eyes, nose, mouth and ears go (proportions), shown visually.
3. What the Loomis method is, briefly, without theory overload.
4. What materials they need (simple).
5. Common mistakes and how to fix them.

If competitor research is wanted, record only structural notes (which
questions are answered, depth, image count) in `research-notes.md`; no
copied text or step sequences.

## Proposed structure

H2/H3 wording is provisional; final headings follow the images.

### Intro (no heading, 2-3 short paragraphs)
- What the reader will draw, and that it is built from simple guidelines.
- One sentence on why construction first (structure before details).
- What the article covers; no "in this guide" phrasing.
- Image: hero = finished drawing next to (or above) the construction stage.

### H2: What you need
- Short list of the materials actually used, **as confirmed by the team after
  the images are made**. Until then: placeholder only. No pencil grades, paper
  brands or techniques that were not confirmed.

### H2: The Loomis method in one minute
- 3-5 sentences: the head as a ball with the sides cut off, a center line, and
  horizontal lines that split the face into roughly equal thirds.
- Why it helps beginners: placement before detail, easy to correct.
- Image: annotated construction stage (only if we have one; otherwise use the
  matching step image).

### H2: How to draw a face step by step
One `steps` block (numbered cards) or one H3 per step, depending on how much
explanation each step needs. Per step:
- What to draw (where, how big, how light).
- Why it matters.
- Common mistake and how to spot/fix it, where relevant.
- One image per step, alt text describing the stage.

Nine steps, one per supplied image. The stages below are only a guess at a
typical Loomis progression, **not** the article's steps: the real titles and
instructions come from the images, and anything that does not match is
dropped.
1. Cranium ball.
2. Side plane and center line.
3. Brow line, nose line, chin: facial thirds and the jaw.
4. Placing the eyes, nose and mouth.
5. Ears and the line of the jaw/neck.
6. Hair shape.
7. Refining features.
8. Shading / final sketch.

Decision: a new, original nine-step front-view sequence made for this
article. The homepage demo images are **not** used anywhere in this article.

### H2: Common mistakes (and quick fixes)
- 3-5 items, each tied to a visible step, e.g. eyes placed too high, features
  too large for the face, a center line that ignores head tilt, pressing too
  hard on construction lines. Final list chosen after image review; only
  mistakes we can illustrate or explain from our steps.

### H2: Practice ideas
- Repeat the construction on different faces, start light, compare your
  thirds with the reference. Practical, no promises about results.

### `appCta` block (one, inline, after the practice section)
Natural transition, e.g. practicing the same construction on your own photos.
Only verified app claims (see standards §4). The page's own end-of-article CTA
then follows automatically.

### Optional H2: Questions beginners ask
Plain headings + short answers (no FAQ schema). Candidates, keep only those
the article does not already answer:
- Do I need to learn the Loomis method before drawing faces?
- How long should construction lines be visible?
- Does this work for other angles? (Answer: same idea; separate article.)

### Closing (1-2 sentences, no "conclusion" heading)
What to try next (e.g. a future 3/4-view article, once it exists).

## Images needed

Please supply (originals, plus the person who drew them):

| # | Image | Notes |
|---|---|---|
| 1-9 | One image per step, all from the same drawing | Same framing and size for every step (no jumps in scale/position); plain paper background; at least 900 px wide; each step adds only the new lines. |
| H | Hero (optional) | If omitted, step 9 (the finished drawing) is the hero. A landscape or square crop at least 1200 px wide works best for social cards. |
| R | Reference photo | **Not included** until the team confirms publication rights. The article must work without it. |

With the images, please note: the materials actually used, and anything the
artist did between steps that is not visible in the images (for example
erasing guidelines).

## Image review protocol (when images arrive)

For each step image, record in `image-review.md`:
1. What is new compared with the previous image.
2. Which Loomis element it shows (glossary term).
3. Is the change clear at article size (mobile width)?
4. Missing transitions (something appears without a step showing it).
5. Questions for the artist; steps marked **UNCLEAR** are not written until
   answered.

## Decisions (owner, recorded)

| Topic | Decision |
|---|---|
| Images | ~~New, original sequence; demo images not used.~~ Superseded 2026-11-18: the nine homepage demo stages (Sketch Steps output from a portrait photo) are approved; the article must say they were generated by the app, not hand drawn. |
| Accuracy review | A team member with drawing experience reviews the instructions before publication. |
| Authorship | "Sketch Steps Team". No invented authorship, credentials, experiences or misleading claims. AI-assistance disclosure to be evaluated before publication. |
| Materials | Confirmed by the team after the images are prepared; nothing invented meanwhile. |
| Reference photo | Not included until publication rights are confirmed. |
| Translations | English first; no translation until it is reviewed. |

## Still open

1. Materials list (after the images).
2. Reference photo rights (only if it will be shown).
3. AI-assistance disclosure (before publication).
4. Name of the accuracy reviewer, for the review notes.

## Next steps

1. Receive the nine images; save them in `public/blog/how-to-draw-a-face/`
   (`step-1.jpg` ... `step-9.jpg`).
2. Image review (`image-review.md`): per-image notes, UNCLEAR steps flagged
   for the team.
3. After the questions are answered: draft in
   `content/blog/how-to-draw-a-face/index.ts` with `status: "draft"`.
4. Human review against `docs/editorial/standards.md`; publish only with the
   owner's approval.
