# Blog editorial standards

Applies to every article on the Sketch Steps blog. Technical setup (content
files, slugs, SEO fields) is in `docs/blog.md`; this file covers what we write
and how it is checked before publication.

An article is published only when every box below is ticked by a person, and
the reviewers are recorded in the article's review notes.

## 1. Writing

- [ ] Opens with what the reader will draw and what they need, in the first
      two or three sentences. No warm-up paragraph.
- [ ] Natural American English: US spelling ("color", "gray"), inches
      where a size is needed, double quotes.
- [ ] Friendly and direct; second person ("you") for instructions.
- [ ] Sentence length varies; paragraphs are short where the content is a
      sequence of actions.
- [ ] Each instruction can be followed right away: what to draw, where, and
      roughly how big or how light.
- [ ] No filler sentences that only restate the heading.
- [ ] Each step is written for its own content; steps do not all follow the
      same sentence pattern.

Phrases to cut on sight (generic, promotional or empty):

| Avoid | Write instead |
|---|---|
| "In today's world…", "Whether you're a beginner or a pro…" | Start with the task. |
| "Unlock", "master", "dive in", "game-changer", "effortlessly" | Say what the reader does. |
| "Drawing a face can seem daunting, but…" | Name the specific difficulty, then solve it. |
| "In this comprehensive guide…" | Nothing; the headings show the scope. |
| "It's important to note that…" | State the point. |

## 2. Honesty and authorship

- [ ] No first-person experiences ("When I started drawing…"), invented
      artists, quotes, testimonials, credentials or classroom anecdotes.
- [ ] Author is "Sketch Steps Team" (organization). No personal byline
      unless a real person wrote or substantially edited the article and
      agreed to be named.
- [ ] AI assistance is not hidden or disguised. Whether to add a disclosure
      line is decided by the owner before publication.
- [ ] Materials, tools and techniques are only those the team confirmed were
      actually used for the article's drawings.
- [ ] A reference photo appears only after its publication rights are
      confirmed.
- [ ] No statistics, survey results, keyword volumes, rankings or "studies
      show" claims unless a citable public source is linked.
- [ ] No promises about results ("draw a realistic portrait in 10 minutes",
      "guaranteed improvement"). Describe practice, not outcomes.

## 3. Drawing accuracy

- [ ] Every instructional step matches a supplied image, in the same order.
      No step, line or detail that is not visible in the images.
- [ ] Unclear steps are flagged in the review notes, not guessed.
- [ ] Each step explains **what** to draw, **why** it matters, and **how to
      spot and fix** a common mistake, where that adds something.
- [ ] Loomis terms are used accurately and consistently (see glossary).
- [ ] Proportions are described as guidelines ("about", "roughly") that vary
      between faces, never as fixed rules.
- [ ] A team member with drawing experience has checked the instructions
      against the images (named in the review notes).
- [ ] All step images come from one drawing process (no mixing of image
      sets, no app demo images in a hand-drawn sequence).

### Loomis glossary (use these terms, consistently)

| Term | Meaning in our articles |
|---|---|
| Cranium ball | The sphere (drawn as a circle) that stands for the upper skull. |
| Side plane | The flat oval area on the side of the ball, where the sides of the head are "sliced off". |
| Center line | The vertical line down the middle of the face; it follows the head's turn and tilt. |
| Brow line | The horizontal line where the eyebrows sit. |
| Hairline | Top of the face area. |
| Nose line | The line at the bottom of the nose. |
| Chin line | The bottom of the jaw. |
| Facial thirds | Hairline to brow, brow to nose line, nose line to chin: roughly equal in the Loomis method. |
| Jaw line | The line from below the ear to the chin. |

Reviewer note: these definitions must be checked by someone who draws before
the first article is published; correct them here, not per article.

## 4. Claims about Sketch Steps

Only claims that are true in the current app and already stated on the
website may be used. Source of truth: `messages/en.json` (Home) and the store
listings. Currently verified:

- Turns a photo into a step-by-step drawing tutorial; portrait tutorials
  start with Loomis construction lines and build up to a finished sketch.
- Styles: Realistic Paper Portrait (9 steps), Digital Clean Portrait
  (8 steps), Animal Drawing (9 steps).
- Steps can be viewed one at a time or as a scrolling list, with the original
  photo alongside.
- Free tutorials are included; pricing and premium options are shown in the
  app. Available on the App Store and Google Play.

Not allowed without verification: accuracy or quality claims about the AI,
speed of learning, number of users (other than the documented download
milestone), ratings, reviews, comparisons with other apps.

- [ ] Every app statement is on the list above or newly verified (note the
      source in the review notes).
- [ ] At most one in-article call to action (`appCta` block); the article
      page already ends with one. The article must be useful without the app.

## 5. SEO

- [ ] Answers the search intent first: a beginner who wants to draw a face
      step by step.
- [ ] Title and headings describe the content in plain words; the primary
      topic appears in the title, the first paragraph and where it is natural.
- [ ] No keyword stuffing: read the text aloud; if a phrase sounds forced,
      remove it.
- [ ] `description` (meta) is 140-160 characters and says what the reader gets.
- [ ] Slug is short and permanent.
- [ ] Every image has alt text describing what it shows (stage of the
      drawing), written for someone who cannot see it, not a keyword list.
- [ ] Internal links only where they help the reader (other articles,
      relevant app pages); the build checks blog links.
- [ ] Hero image works as a social card (shown cropped on cards).
- [ ] No FAQ schema or other structured data beyond what the blog emits.

## 6. Originality

- [ ] Competitor pages (e.g. RapidFireArt) were used only to understand what
      readers expect (topics, structure, depth), not as a text source.
- [ ] No sentence, step sequence or example is copied or closely paraphrased
      from another site. When in doubt, rewrite from our own images.
- [ ] All images are our own; the reference photo has the rights/consent
      needed for publication.

## 7. Workflow

| Stage | Output | Who |
|---|---|---|
| 1. Outline | `docs/editorial/<article>/outline.md` | Editor (can be AI-assisted) |
| 2. Images received | Files in `public/blog/<article-id>/`, original + exported sizes | Owner / artist |
| 3. Image review | Per-image notes, open questions flagged | Editor + person who draws |
| 4. Draft (English first; translations only after the English version is reviewed) | `content/blog/<article-id>/index.ts` with `status: "draft"` (never built, not linked) | Editor |
| 5. Human review | This checklist ticked, reviewers named in `review.md` | Reviewer(s) |
| 6. Publish | `status: "published"`, real `publishedAt`, added to `content/blog/index.ts` | Owner approval |

A draft is never published by changing only its status: stage 5 must be
complete.

## 8. Spanish (es)

Applies to every Spanish article in addition to sections 1-7. Section 1's
"American English" rules are replaced by the ones below; everything else
(honesty, drawing accuracy, app claims, SEO, originality, workflow) applies
unchanged.

### Writing

- [ ] Neutral Spanish that reads naturally in Spain and Mexico: "tú" for
      instructions, plural "ustedes" avoided (write to one reader), no
      "vosotros", no regional slang or idioms.
- [ ] Words understood in both markets: "lápiz", "goma de borrar", "papel",
      "hoja", "pelo" or "cabello" (both are fine), "camiseta" for T-shirt
      (or describe the collar without naming the garment).
- [ ] Written as Spanish, not translated English: no calques ("hacer sentido",
      "es importante notar que", "en este tutorial vas a aprender cómo"),
      no English word order, no anglicisms when a common Spanish word exists
      ("boceto", not "sketch", outside the app name).
- [ ] Spanish punctuation and typography: opening "¿" and "¡", Spanish
      quotation marks (« ») or straight double quotes used consistently
      within an article, sentence case in headings ("Paso 1: dibuja un círculo"), not Title Case.
- [ ] Instructions in the imperative ("dibuja", "traza", "compara"), short
      sentences for actions, varied sentence openings.
- [ ] Accents and "ñ" everywhere in text, titles and alt text; never in slugs.

Phrases to cut on sight:

| Avoid | Write instead |
|---|---|
| "En el mundo actual…", "Tanto si eres principiante como experto…" | Start with the task. |
| "Desbloquea", "domina", "sumérgete", "sin esfuerzo", "revolucionario" | Say what the reader does. |
| "En esta guía completa…", "A continuación te mostramos…" | Nothing; the headings show the scope. |
| "Es importante destacar que…", "Cabe mencionar que…" | State the point. |
| Repeating the keyword in every heading or paragraph | Use it where a reader would expect it (title, intro, one H2). |

### Drawing terminology (Spanish glossary)

Use these terms consistently; they map to the English glossary in section 3.
To be checked by a Spanish-speaking person who draws before the first
Spanish article is published.

| English | Spanish (our articles) | Notes |
|---|---|---|
| Cranium ball | círculo (o esfera) del cráneo | "bola" only in the Loomis explanation, in quotes |
| Side plane | plano lateral | |
| Center line | línea central | |
| Brow line | línea de las cejas | classic Loomis horizontal on the middle of the ball |
| Eye-level guide | línea guía de los ojos | this drawing's middle line (step 2) |
| Nose line | línea de la nariz | at the base of the nose |
| Chin line | línea del mentón | |
| Jaw / jaw line | mandíbula / línea de la mandíbula | |
| Hairline | nacimiento del pelo | |
| Facial thirds | tercios del rostro | approximate, never a rule |
| Construction lines | líneas de construcción | |
| Guideline | línea guía | |
| Hatching | rayado (líneas paralelas) | explain once: "grupos de líneas paralelas" |
| Values / tone | tonos / valores | prefer "tonos" for beginners |
| Iris, pupil, upper lid | iris, pupila, párpado superior | |

### Translation of an existing article

- [ ] The Spanish version says what the reviewed source version says, step
      for step: no step, line or detail added or removed; every open
      question in the source's review notes applies to the translation too.
- [ ] Each step text is checked again against its image (not only against
      the English text).
- [ ] Alt text is written in Spanish for the image, not a word-for-word copy.
- [ ] Reviewed by a native Spanish speaker (ideally one from Spain and one
      from Mexico, or one reviewer who checks both); named in the review notes.
- [ ] It is a translation of the same article: it goes in the same entry's
      `translations` (reciprocal hreflang). A new Spanish article on another
      topic gets its own entry and no hreflang to English.
