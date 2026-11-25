# Change report: Spanish draft "Cómo dibujar una cara paso a paso"

Branch `feature/es-content-seo`, on top of commit `8f65a12`. **Uncommitted**,
not pushed, not published; the Spanish article stays `status: "draft"`.
No drawing, native-speaker or owner review is marked complete.

Preview: http://localhost:3000/es/blog/como-dibujar-una-cara

## 1. Image verification (all nine steps)

All nine steps were re-checked against their image files. Steps 1, 3, 5, 7, 8
and 9 match the text as written.

Three places were imprecise about the position of the step-2 line:

| Step | Text said | Image shows |
|---|---|---|
| 2 | The horizontal line is "close to its middle" | It crosses about 58% of the way down the circle, a little **below** the middle. |
| 4 | The eyes go "on that middle line" | The eyes go on the step-2 line, which is not the circle's middle. |
| 6 (tip) | The eyes sit "on the middle line of the circle" | Same: the step-2 line. |

Steps 2, 3, 5 and 6 were checked in detail:

- **Step 2:** the vertical line leans about 9°, the horizontal line is at a right angle to it, and the vertical continues well below the circle. This matches the text.
- **Step 3:**
  - side-plane curves sit inside both edges of the circle;
  - an angular jaw with a flat chin on the center line;
  - two lighter lines run toward the chin corners;
  - these match the text. What the two lighter lines are for remains a question for the drawing reviewer.
- **Step 5:** the eyebrows are outlined and the eyes are not drawn yet. The ear on the viewer's right is a small C-curve; no ear can be identified on the viewer's left. The text ("only hinted at") is accurate; this remains open for the reviewer.
- **Step 6:** the upper lid covers the top of the iris. The step-2 line runs through the lower half of both eyes.

## 2. Brow line vs. eye-level line

Each comparison was made within a single image, because the stage images are
not pixel-aligned with each other.

- In **step 4**, the brows are drawn about 12–15 px *above* the step-2 line.
- In **step 6**, the line runs through the lower half of the eyes, about
  2–5 px below the iris centers.

So the drawing uses an **eye line placed a little below the circle's middle**.
Classic Loomis puts the **brow line on the middle of the ball**, with the eyes
below it. The two constructions differ by design; this is not a drawing error.
The existing explanation was correct in substance. Only the position wording
changed.

## 3. "Eyes about halfway down the head"

Measurements are in step 3 file pixels, along the tilted center line (the tilt
does not change the ratio):

- top of the cranium circle (the skull, not the hair): y ≈ 61;
- the step-2 eye line: y ≈ 170;
- bottom of the chin: y ≈ 304.

The eye line therefore sits (170 − 61) / (304 − 61) ≈ **45%** of the way down.

- The common guideline is about 50%. The text's "a little higher than that" is accurate for this drawing.
- The earlier note of about 39% was wrong. It is corrected in `review.md` and `image-review.md`.

## 4. CTA, availability and pricing

Checked against the public store pages on 2026-11-24:

- **App Store** (id 6763632360, "Sketch Steps: AI Loomis Draw"): free with in-app purchases (EUR 0 in Spain, MXN 0 in Mexico). Requires iOS 18 or later, on iPhone and iPad.
- **Google Play** (`com.sketchsteps.app`, same listing name): live in Spain and Mexico, free with in-app purchases, 500k+ downloads. Google Play availability is **independently confirmed**.

The Spanish CTA ("Descarga gratuita en el App Store y Google Play"), the
Spanish landing page and the shared store-button components are accurate.
**No change.**

The Play listing is published under a personal developer name. Please confirm
it is your account.

## 5. Before → after (Spanish draft)

**F** = factual correction from the measurements. **W** = wording, pending
native-speaker approval.

| # | Where | Before | After |
|---|---|---|---|
| F1 | Step 2 text and alt text | …cerca de su mitad | …un poco por debajo de su mitad |
| F2 / W9 | Step 2 note | Un apunte sobre los nombres: muchos diagramas de Loomis llaman a la línea horizontal del medio «línea de las cejas». En este dibujo, las cejas quedan justo por encima… | Una aclaración sobre los nombres: los diagramas clásicos de Loomis trazan una línea horizontal justo por la mitad de la bola y la llaman "línea de las cejas". La de este dibujo queda un poco más abajo: las cejas se dibujan por encima de ella y, en el paso 6, los ojos se dibujan sobre ella… |
| F3 | Step 4 | …coloca los ojos sobre esa línea del medio (mira el paso 2). | …coloca los ojos sobre la línea horizontal del paso 2, que queda un poco por debajo de la mitad del círculo. |
| F4 | Step 6 tip | …sobre la línea del medio del círculo… | …sobre la línea horizontal del paso 2… |
| W10 | Step 3 | …se ven casi de canto; por eso aparecen… | …quedan casi paralelos a tu línea de visión; por eso apenas se ven y aparecen… |
| W8 | Step 3 tip | …una cara no se parezca… | …una cara se vea extraña… |
| W2 | Step 4 | la punta y las fosas nasales | la punta y las aletas |
| W12 | Step 5 | Los mechones sueltos, para más adelante. | Deja los mechones sueltos para más adelante. |
| W5 | Step 5 text and alt text, step 8 | camiseta | la ropa (Spain says "camiseta", Mexico "playera") |
| W7 | Step 6 | comisuras de la sonrisa | comisuras de los labios |
| W11 | Step 7 | una pasada de limpieza | un repaso de limpieza |
| W3 | Step 8 | un rayado suave, es decir, con grupos de líneas paralelas | un rayado suave (también llamado achurado): grupos de líneas paralelas |
| W6 | Throughout | « » | straight double quotes (" ") |
| W14 | Intro, "Cómo practicar" | que elijas tú | que tú elijas |
| W13 | "Cómo practicar" | etapa por etapa o como una lista continua | de uno en uno o en una lista continua (same wording as the live Spanish homepage) |
| W15 (new) | Step 1 tip | Nunca te costará menos empezar de nuevo que en este momento. | Es el momento en que menos cuesta empezar de nuevo. |
| W4 | Step 5 heading | "esboza" | unchanged ("encaja" is art-school jargon in Spain) |
| W1 | Whole article | — | still needs a native-speaker read |

The title, meta description, H1 and slug are unchanged.

Supporting changes:

- `docs/editorial/standards.md`, Spanish section: quotes rule, "rayado / achurado", and "la ropa" instead of country-specific clothing words.
- `review.md`: the measurement review, the corrected 45%, and the Spanish checklist. All items remain unticked.

## 6. Proposed corrections to the published English article (not applied)

1. **Step 2 text and alt text:** "close to its middle" → "a little below its middle".
2. **Step 2 note:** "many Loomis diagrams call the middle horizontal line the brow line. In this drawing, the eyebrows end up just above it…" → "classic Loomis diagrams draw a horizontal line through the middle of the ball and call it the brow line. The one in this drawing sits a little lower: the eyebrows go above it and, in step 6, the eyes are drawn along it…"
3. **Step 4:** "puts the eyes on that middle line instead (see step 2)" → "puts the eyes on the horizontal line from step 2 instead, which sits a little below the middle of the circle".
4. **Step 6 tip:** "on the middle line of the circle" → "on the horizontal line from step 2".

These are needed so both versions say the same thing. The English page is
live, so each change needs your approval, plus an `updatedAt` date.

## 7. Checks

- TypeScript and ESLint pass.
- The production build passes, and the Spanish article is not in its output.
- The draft-preview build passes. The Spanish page is `noindex, nofollow` and shows the corrected text.

## Still open

- **Drawing reviewer:**
  - the step 3 lighter jaw lines;
  - step 5 ears;
  - step 6 iris advice;
  - step 8 light direction;
  - step 9 leftover construction lines;
  - the Loomis facts and the glossary;
  - confirming the measurements above.
- **Native Spanish reviewer:** W1–W15.
- **Owner:** approve the English corrections; final publication approval.
