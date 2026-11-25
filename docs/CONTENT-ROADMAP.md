# Content roadmap

Last updated: 2026-11-25 (UTC).

**How keyword evidence is labelled:**
- **Researched:** backed by a dated source (Google Trends, autocomplete, SERP
  review). Sources are named.
- **Speculative:** an idea that fits the product but has no keyword research
  yet.

**No search volumes or difficulty scores have been measured** for any topic.
The Semrush account had no API units, and Search Console data has not been
pulled. Don't quote volumes until real numbers exist.

Rules for every article: `docs/editorial/standards.md`. How to build and
publish one: `docs/blog.md`.

## Published

| Article | URL | Language | Status | Target keyword | Research |
|---|---|---|---|---|---|
| How to Draw a Face Step by Step (Loomis Method) | `/blog/how-to-draw-a-face` | en | Published 2026-11-18. Update with corrections in the release PR. Drawing review open. | how to draw a face step by step; Loomis method | **Speculative:** no competitor or keyword research was done (`docs/editorial/how-to-draw-a-face/outline.md`). |
| How to Draw a Turkey Step by Step (Realistic Pencil) | `/blog/how-to-draw-a-turkey` | en | Published 2026-11-24 (PR #16) | how to draw a turkey (realistic) | **Researched (relative only):** Google Trends rising queries, US, past 7 days, 24 Nov 2026. "Easy", "cute" and "hand turkey" are deliberately not targeted, because the images don't support them (`docs/editorial/how-to-draw-a-turkey/review.md`). Seasonal: Thanksgiving. |

## New (in the release PR)

| Article | URL | Language | Status | Target keyword | Research |
|---|---|---|---|---|---|
| Cómo dibujar una cara paso a paso: método Loomis | `/es/blog/como-dibujar-una-cara` | es (Spain + Mexico) | Published in the release PR (`publishedAt` = deploy date). Native and drawing reviews open. | cómo dibujar una cara paso a paso; método Loomis | **Researched (qualitative):** Google Trends (ES) and autocomplete (ES, MX), 23 Nov 2026. Strong demand signal, high competition. Seasonality: peak late Nov to early Dec, strong mid-Jan to Mar. `docs/reports/2026-11/es-keyword-research.md` |

## Potential future content

### Researched (Spanish market, qualitative, 23 Nov 2026)

These come from the opportunity matrix in
`docs/reports/2026-11/es-keyword-research.md` §3, in its recommended order.

| # | Topic (es) | Demand evidence | Notes |
|---|---|---|---|
| 1 | Método Loomis para principiantes | Moderate | High app fit. It must have a different job from the face article (method explainer vs step-by-step). It can partly reuse the 9 stages; new diagrams need a drawing review. |
| 2 | Cómo aprender a dibujar desde cero | Moderate (low Trends) | Hub article for January 2027. Needs new images. |
| 3 | Apps para aprender a dibujar | Moderate: "+150%" relative rise (Trends, a signal, not volume) | Best conversion potential. It can only be written honestly after hands-on testing of competing apps. |
| 4 | Cómo dibujar una cara desde una foto | Weak (one autocomplete variant) | Direct product fit. |
| 5 | Plan de práctica / cómo practicar dibujo | Weak | Supports repeat use. |
| 6 | Cómo dibujar ojos realistas | Moderate, results lean toward anime | Needs original eye-stage images. |
| 7 | Cómo dibujar una nariz | Moderate | Needs original images. |

### Speculative (English, no keyword research yet)

Validate each with Search Console queries, Trends or a keyword tool before
writing.

| Topic | Possible URL | Why it fits | What's missing |
|---|---|---|---|
| How to draw a portrait from a photo | `/blog/how-to-draw-a-portrait-from-a-photo` | The app's core capability (photo → guide) | Keyword data; original stage images from a rights-cleared photo |
| Loomis method beginner guide | `/blog/loomis-method` | Explains the method behind the app | Keyword data; must not duplicate the face article |
| How to draw eyes step by step | `/blog/how-to-draw-eyes` | Portrait sub-skill | Keyword data; original stage images |
| Drawing apps comparison | `/blog/best-drawing-apps-for-beginners` (example) | Commercial intent | Keyword data; hands-on testing of each app; a fair, verifiable comparison (no invented features or prices) |
| More animal tutorials (like the turkey) | `/blog/how-to-draw-a-<animal>` | Sketch Steps generates animal stages (iPhone/iPad) | Keyword or seasonal evidence per animal |

### Translations of existing articles

| Article | Languages | Status |
|---|---|---|
| Face article | fr, de, ja | Not started. Each needs a native reviewer before publishing (`docs/i18n.md`, `docs/editorial/standards.md`). |
| Turkey article | any | Not planned (US seasonal topic). |

## Before writing any new article

1. Record the keyword evidence and its date in the article's
   `docs/editorial/<id>/review.md`.
2. Confirm the image origin, and the rights to any reference photo.
3. Never claim the app teaches a specific drawing unless that is true.
4. Add the article to this roadmap and to `docs/SEO-GEO-CHANGELOG.md` when it
   is published.
