# Sketch Steps: search and AI discoverability implementation plan

**Status:** proposal for approval, 24 Nov 2026. Nothing has been changed in
the repo or in DNS, and nothing has been pushed or deployed.

## Fact sources

Every fact proposed for the site comes from one of these:

- **[A] App Store listing**, read 24 Nov 2026 from Apple's public lookup and the listing text:
  - free;
  - iOS 18 or later, iPhone and iPad;
  - 11 languages;
  - version 2.0.
- **[G] Google Play listing**, read 24 Nov 2026:
  - available in the US and Spain;
  - free with in-app purchases;
  - 500K+ downloads.
- **[S] The current live site** (`messages/en.json`), already verified against app screenshots.

The Play page's full description could not be read automatically. Facts
marked **[A] only** (languages, "no account needed", 90-day storage, tracing
modes) are confirmed for iOS. They need your confirmation before they're
presented as true on Android too.

## Prioritized plan

| # | Priority | Work | Who | Repo change |
|---|---|---|---|---|
| 1 | P1 | Fix www (section 1) | You, Vercel dashboard | None |
| 2 | P1 | Verify Search Console and Bing Webmaster Tools; submit the sitemap | You | None |
| 3 | P1 | Homepage facts: FAQ rewrite, a facts line, tracing card (section 2) | Me, after approval | `messages/en.json`, `components/home/closing-sections.tsx` |
| 4 | P1 | Structured data corrections (section 3) | Me, with item 3 | `lib/structured-data.ts`, `messages/en.json` (Metadata) |
| 5 | P1 | AI referral measurement in GA4 and Vercel (section 4) | You, dashboards | None |
| 6 | P2 | Publish the Spanish face article once reviews pass | Me, after approval | Existing branch |
| 7 | P2 | New content, in priority order (section 5) | Me, drafts for review | New article files |
| 8 | P3 | Translate the homepage changes into es/fr/ja/de with native review | Me plus reviewers | `messages/*.json` |

**Code workflow for items 3 and 4:**

- Create a new local branch from `origin/main`, e.g. `feature/home-facts`.
- `feature/es-content-seo` (the English corrections and Spanish draft) stays untouched.
- Run tsc, eslint, a production build, and validate the JSON-LD in the built HTML.
- Commit locally. No push.

Until item 8 is done, the other languages keep their current homepage text.

---

## 1. Fix www.sketchsteps.app

### Current state (checked 24 Nov)

- **Namecheap:** the registrar's name servers return a single `www CNAME cname.vercel-dns-0.com.` record, which is correct. The apex `sketchsteps.app` resolves to Vercel (216.198.79.1).
- **Vercel:** `www.sketchsteps.app` is **not added** to project `sketch-steps-landing`, so Vercel has no certificate for it. The result is a TLS error on `https://www…`.
- **Correction:** my audit said Namecheap had an extra A record. That was wrong: the addresses I saw were the CNAME target's own records. The audit file is corrected.

### Vercel dashboard (you)

1. Go to vercel.com and open team **sketchsteps**, then project **sketch-steps-landing**, then **Settings → Domains**.
2. Click **Add Domain**, enter `www.sketchsteps.app`, and continue.
3. When asked how to connect it, choose **Redirect to Another Domain**. Pick `sketchsteps.app` and the status code **308 Permanent Redirect**. Do not choose "Connect to an environment"; that would serve a duplicate site on www.
4. Save. Vercel checks DNS. Because the CNAME already points to Vercel, it should show **Valid Configuration** and issue the certificate within minutes.
   - If Vercel shows a different CNAME value than `cname.vercel-dns-0.com`, stop and send me a screenshot. Don't change DNS yet.
5. Leave `sketchsteps.app` itself unchanged (production, no redirect).

### Namecheap

**Expected: no change.** To confirm, without saving anything, open **Domain List → sketchsteps.app → Manage → Advanced DNS → Host Records**. The www row should be:

| Type | Host | Value | TTL |
|---|---|---|---|
| CNAME Record | `www` | `cname.vercel-dns-0.com.` | Automatic |

- If there is also a `www` A record, AAAA record or URL Redirect record, tell me before deleting anything. It would conflict with the CNAME.
- Do not touch the `@` records.

### Verification (I can run these afterwards, read-only)

- `https://www.sketchsteps.app/` → 308 → `https://sketchsteps.app/`, with a valid certificate.
- `https://www.sketchsteps.app/blog/how-to-draw-a-face?x=1` → 308 to the same path and query on the apex.
- `http://www.sketchsteps.app/` → `https://sketchsteps.app/`. Up to two hops is fine.
- The apex is unchanged: 200, same canonical.

No repo change is needed. `docs/analytics.md` lists www as a GA host, which is harmless once www only redirects.

---

## 2. Homepage changes (English)

Everything below stays inside the existing components. There are no new
sections or page designs, and nothing hidden or aimed only at crawlers. The
FAQ is already server-rendered, so its text is visible to people and
crawlers alike.

### 2.1 FAQ (`Home.faq.items`, existing accordion, `#faq`)

Order matters: the facts people ask before installing come first.
"Unchanged" means the current text is kept as it is.

1. **What is the Loomis Method?** Unchanged.
2. **What can I learn to draw with Sketch Steps?** Unchanged.
3. **Is the app free?** *(rewrite)* [A][G]
   > Sketch Steps is free to download, and the ready-made tutorials are free and need no coins. Creating your own AI drawing guides requires an active subscription or coins, which are in-app purchases. Current prices are shown in the app and on the App Store or Google Play before you buy.
4. **Which devices does Sketch Steps work on?** *(new; replaces "Is there an Android version?")* [A][G]
   > On Apple devices, Sketch Steps runs on iPhone and iPad with iOS 18 or later. On Android, you can download it from Google Play.
5. **Can I use my own photos?** *(rewrite; the current answer mentions only face photos)* [A]
   > Yes. Choose a photo of a face or an animal from your library, or take a new one with the camera. You can crop it before your guide is created.
6. **How accurate are the AI drawing guides?** *(new)* [A]
   > The guides are generated by AI from your photo. They can occasionally be imperfect, and results vary from photo to photo. You can zoom in to check proportions while you follow the steps.
7. **Does the app support tracing?** *(rewrite)* [A] only
   > Yes. Tracing Studio gives you two ways to trace onto real paper. With Draw with Camera, you prop your phone above the paper and see the reference over the live camera view. With Draw on Screen, you turn up the brightness and lay paper over the screen. You can adjust opacity, size and rotation, flip the image, add a grid or turn on the flashlight.
8. **What is Trace AI?** Unchanged, but see the open question below.
9. **Is Sketch Steps suitable for beginners?** Unchanged.
10. **Do I need an account?** *(new)* [A] only
    > No. You can start using Sketch Steps without creating an account.
11. **Which languages is the app available in?** *(new)* [A] only
    > Sketch Steps is available in 11 languages: English, Chinese, French, German, Indonesian, Italian, Japanese, Korean, Portuguese, Spanish and Turkish.
12. **How long are my drawings and guides kept?** *(new)* [A] only
    > Everything you create is kept in My Generations for 90 days. Save the guides you want to keep and come back to them whenever you like. You can also save single steps or a whole guide to Photos.

Twelve items is long for an accordion. If you prefer fewer, merge 10–12 into
one "What else should I know?" answer, or drop 12.

### 2.2 Facts line under the final call to action

The new `Home.finalCta.facts` line goes below the store buttons in the dark
final CTA band. It uses the same small `text-white/85` style as the lead.
It's one line on desktop and wraps on mobile. [A][G]

> Free download · In-app purchases · iPhone and iPad (iOS 18 or later) · Android

I have not put it in the hero. The hero already carries the H1, the
downloads count, the store buttons and the tags, and a fourth line would
crowd it on phones. If you'd rather have it at the top, it fits best under
the hero store buttons, replacing nothing.

### 2.3 Tracing Studio card (`Home.features.tracingStudio.body`)

> **Now:** Browse ready-made line drawings in categories such as animals, anime and cars, and keep your favorites.
>
> **Proposed:** Trace onto real paper with Draw with Camera or Draw on Screen, using ready-made line drawings (animals, anime, cars, portraits and more) or your own photos. [A] only

The card stays the same size. The new text is about one line longer on mobile.

### 2.4 H1: your decision

> **Now:** Learn to Draw Anything, *Step by Step.*
>
> **Proposed:** Learn to Draw Portraits, *Step by Step.*

The proposed version matches the first line of the App Store description
("Learn to draw portraits step by step") and the product's real scope.
"Anything" over-promises, because AI guides cover faces and animals. Pets stay
visible in the hero tags right below.

Trade-off: it narrows the brand headline. If you want animals in the H1:
"Learn to Draw Faces and Pets, *Step by Step.*" Recommended: the portraits
version.

### 2.5 Meta description (`Metadata.home.description`)

> **Now:** Turn any face photo into an AI-generated step-by-step Loomis drawing guide. Learn portrait drawing faster with guided construction, tracing, and saved practice references.
>
> **Proposed (152 characters):** Turn a photo of a face or a pet into a step-by-step Loomis drawing guide, then draw or trace it on paper. Free tutorials included. iPhone, iPad and Android.

This removes "faster", an unmeasured claim, and adds animals and platforms.
The `<title>` is unchanged.

### Open questions for you before I apply section 2

1. **Trace AI effects:**
   - The site lists six (Clean Pencil, Bold Charcoal, Anime Ink, Architectural Line, Soft Sketch, Watercolor).
   - The App Store text lists five AI styles (pencil sketch, line art, charcoal, anime ink, watercolor).
   - Which is current in version 2.0? I won't change it until you say.
2. **Android parity:** are languages, "no account needed", the 90-day storage and both tracing modes the same on Android? If not, I'll mark those answers "on iPhone and iPad".
3. **H1:** keep it, or the portraits version, or the faces-and-pets version?
4. **FAQ length:** all 12 items, or merge?

**Not proposed:**

- **Exact prices:** they differ by country and change. The Pro and coin prices I saw were US App Store prices.
- **Ratings:**
  - App Store: 4.2 from 199 ratings.
  - Google Play: 3.7 from 1,518 ratings.

  They differ by store and need upkeep. Only show them if you want ratings on the page.
- **Download totals beyond the existing "600,000+":** that figure stays as it is.

---

## 3. Structured data (`lib/structured-data.ts`)

Only values that appear on the page or the store listings.

| Change | Now | Proposed | Why |
|---|---|---|---|
| SoftwareApplication `description` | "…transforms face photos into…Loomis Method portrait drawing guides." | "Drawing app that turns photos of faces and animals into step-by-step Loomis method drawing guides, with free tutorials and a tracing studio." | Matches the product; animals were missing. |
| `operatingSystem` | "iOS, Android" | "iOS 18 or later, Android" | [A] |
| `featureList` (new) | — | `["Step-by-step drawing guides from your photos", "Realistic Paper Portrait, Digital Clean Portrait and Animal Drawing styles", "Free ready-made tutorials", "Trace AI", "Tracing Studio with Draw with Camera and Draw on Screen", "Personal gallery"]` | Every item is on the page. Schema.org property. |
| `offers.description` | "Free to download. Premium options are shown in the app." | "Free to download. Free tutorials need no coins; AI guides require a subscription or coins (in-app purchases)." | Matches FAQ 3. Price stays "0". |
| `inLanguage` on the app | — | Add the 11 languages, **only after you confirm Android parity**. Otherwise leave it out. | [A] |
| English `WebPage` node | missing | Same node as es/fr/ja/de: url, name, description, `inLanguage: "en"`, `about` → app | Consistency across languages. |
| Organization `sameAs` | none | Only Sketch Steps' own official profiles (Instagram, TikTok, YouTube…) **if you give me the URLs** | The store developer pages are listed under a personal name, not the Sketch Steps organization, so they don't belong in Organization `sameAs`. The app node already links to both stores. |

The localized `appDescription` and `offerDescription` for es/fr/ja/de get
updated in item 8.

**Deliberately not added:**

- **`aggregateRating` / `review`:** this means the homepage is not eligible for Google's software-app rich result. The repo comment already says why.
- **`FAQPage`:** Google limits FAQ rich results to government and health sites, so it wouldn't produce a result here.
- **`llms.txt` and AI-specific markup.**
- **Sitemap `lastmod` for the homepages:** optional. Only with a real date (the deploy date of this change). I'd add it with this release.

**Validation:**

- Google Rich Results Test and the Schema.org validator on the deployed page.
- Locally, parse the JSON-LD from the build output.

---

## 4. Measuring AI referral traffic

No code change is needed. The site already loads Vercel Web Analytics
(cookieless, every visitor) and GA4 (only after cookie consent). I won't send
any test traffic to the live GA4 property.

### GA4 (you, in Admin)

1. Go to **Admin → Data display → Channel groups → Create new channel group**. Copy the Default channel group and name it "Default + AI assistants".
2. Add a channel **AI assistants**:
   - condition: **Session source** *matches regex*
     `^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|www\.perplexity\.ai|copilot\.microsoft\.com|copilot\.com|gemini\.google\.com|claude\.ai)$`
   - move it **above Referral and Organic Search**, then save.
3. In **Reports → Acquisition → Traffic acquisition**, switch the dimension to the new channel group. Compare engaged sessions and `store_click` events for AI assistants against Organic Search.
4. **Know the limits:**
   - ChatGPT Search adds `utm_source=chatgpt.com` to its links (OpenAI publisher FAQ), so those visits are attributable even without a referrer.
   - Google AI Overviews and AI Mode clicks arrive as ordinary google / organic and can't be separated in GA4.
   - Some assistant apps send no referrer, and those visits show as Direct.
   - GA4 only counts visitors who accept cookies, so treat its AI numbers as a lower bound.

### Vercel Web Analytics (you)

- Go to **Project → Analytics → Referrers**. Set the date range and look for the same domains. This counts every visitor, with or without consent.
- If the **UTM Parameters** panel is available on your plan, filter on `utm_source = chatgpt.com`.
- Check monthly. Vercel doesn't keep long history on every plan, so export or note the numbers.

### Search and citation dashboards (you)

- **Google Search Console:** verify the domain property, submit `https://sketchsteps.app/sitemap.xml`, then read the Generative AI performance report. It shows impressions only.
- **Bing Webmaster Tools:** import the site from Search Console, submit the sitemap, then read AI Performance. This covers citations in Copilot and Bing AI answers.

### Monthly prompt log (optional, manual)

Keep a fixed set of about 10 prompts (English and Spanish). Run each on
ChatGPT Search, Google AI Mode, Gemini, Perplexity and Copilot, and record:

- the date and platform;
- whether Sketch Steps was mentioned;
- whether it was linked;
- which URL.

This is a sample, not a ranking. It is the only way to see mentions on
platforms without a dashboard.

---

## 5. Content opportunities (highest value first)

These are ranked by product fit and by what the search checks showed. I have
no search-volume data for these prompts, so I'm not estimating volume. Each is
a normal article for readers, linked from the blog and the homepage where
relevant.

| # | Article | Prompts it answers | Why it's high value | What makes it original |
|---|---|---|---|---|
| 1 | **Publish** "Cómo dibujar una cara paso a paso" (draft exists) | "cómo aprender el método Loomis", "dibujar caras paso a paso" | Ready once the reviews pass. Makes `/es/blog` indexable. Spanish results showed no Sketch Steps page. | Already written, with real stages and measurements. |
| 2 | **"The Loomis method for beginners: how the head construction works"** (EN, then ES "El método Loomis para principiantes") | "how to learn the Loomis method" | A direct educational query, and the core of the product's method. A different job from the face tutorial: explains the why, not one drawing. | Annotated diagrams made from the app's real construction stages, using the measured terms already in the editorial standards. Classic versus this app's eye-line placement, explained honestly. |
| 3 | **"How to draw a face from a photo"** (EN/ES) | "app to learn drawing faces from photos", "draw a portrait from a photo" | Exact product fit. The page can show the real workflow: choose and crop a photo, follow the stages, compare with the photo. | Real app output. Needs a photo you have rights to, plus disclosure that the stages were generated by Sketch Steps (same as the existing article). |
| 4 | **"How to draw a dog from a photo"** (Animal Drawing style) | "how to draw my dog", "app to draw pets from photos" | The product's second core use. No animal content exists yet. Existing golden retriever stages are on the homepage. | Real nine-stage sequence. |
| 5 | **"How to start learning portrait drawing: a 2-week practice plan"** | "best way to learn portrait drawing", "drawing for beginners" | Answers the informational side of the "best app" prompts and links to 2–4. | Concrete daily exercises tied to the tutorials. No invented results. |
| 6 | Later: **"Apps for learning portrait drawing, compared"** | "best app to learn portrait drawing", "best drawing app for beginners" | Highest commercial fit, but only if it's honest. | Requires hands-on testing of each app, dated pricing, and a clear "we make Sketch Steps" disclosure. Not before items 1–5. |

**For the "best app…" prompts specifically:**

- Assistants mostly draw on store listings and third-party reviews. In the check, your App Store listing already ranked first for the Loomis portrait query.
- So the strongest owned levers are:
  - the homepage facts (section 2);
  - keeping store listings and site wording consistent ("Sketch Steps: AI Loomis Draw");
  - the tutorials above, which give assistants citable pages.
- Third-party coverage helps but can't be manufactured.

**Review requirements for each article** (same as the face article):

- drawing review;
- native review for Spanish;
- your approval before publishing.

---

## What I need from you

1. **Approve** section 2 (with answers to the four open questions) and section 3, so I can implement them on a new local branch.
2. **Do the Vercel www step**, or tell me to wait. I won't touch DNS.
3. **Optional:** official Sketch Steps social profile URLs for Organization `sameAs`.
4. **Choose** which content item to draft first. Recommended: item 2, the Loomis method guide.
