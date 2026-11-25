# GEO audit: sketchsteps.app

Date: 24 Nov 2026. Scope: the live production site (`main`, e0d48f5) and the
public store listings. Read-only: no files changed, nothing deployed.

AI assistants were **not** queried directly, so this report makes no claim
about whether ChatGPT, Gemini, Perplexity or Copilot currently recommend or
cite Sketch Steps.

## Summary

| Priority | Item | Type |
|---|---|---|
| **P1** | `https://www.sketchsteps.app` fails with a TLS certificate error. The www host is not attached to the Vercel project. | Technical fix |
| **P1** | Confirm Google Search Console and Bing Webmaster Tools are verified, the sitemap is submitted, and Bing AI Performance is on. | Dashboard |
| **P1** | The site does not state the facts assistants need to recommend the app: pricing model, iOS 18+ requirement, iPad support, app languages, limitations. All are public on the App Store but absent from the site. | Content |
| **P1** | Publish the Spanish article after review. Until then, `/es/blog` stays noindex and there is no Spanish content beyond the landing page. | Content |
| P2 | Structured data gaps: Organization has no `sameAs`; the English homepage lacks the `WebPage` node the other languages have; SoftwareApplication has no `featureList` and no rating. | Technical fix |
| P2 | Only one article, and no page on the Loomis method or on drawing from photos, which are the app's core topics. | Content |
| P2 | Brand disambiguation: a separate App Store app named "SketchStep - Learn to Draw" exists. | Content / entity |
| P3 | AI referral measurement: GA4 channel group, Vercel Analytics referrers, GSC Generative AI report, Bing AI Performance. | Measurement |

Crawler access is already in good shape: every documented crawler user agent
receives the full, server-rendered page.

---

## 1. Verified findings

### 1.1 robots.txt and crawler access

The live `robots.txt` is:

```
User-Agent: *
Allow: /
Sitemap: https://sketchsteps.app/sitemap.xml
```

All crawlers are allowed, including search crawlers (OAI-SearchBot,
PerplexityBot, Googlebot, Bingbot) and training crawlers (GPTBot). Allowing
GPTBot or using Google-Extended is a separate business decision. Per OpenAI's
and Google's documentation, neither affects ChatGPT Search or Google Search /
AI Overviews.

I fetched `/`, `/es`, `/blog`, `/blog/how-to-draw-a-face` and `/sitemap.xml`
with these user agents: Googlebot, Bingbot, OAI-SearchBot, GPTBot,
ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Safari, and an empty
user agent.

- Every request returned **HTTP 200 with byte-identical responses**.
- There was no challenge page and no `x-vercel-mitigated` or `X-Robots-Tag` header.
- `/` serves English directly. Language detection is client-side, so bots are never redirected.

The content is server-rendered. The English homepage HTML contains about
925 words of visible text, including:

- the How it works steps;
- the features;
- 8 FAQ answers.

Crawlers that don't execute JavaScript see all of it.

**Caveat:** these requests came from one ordinary IP using spoofed user
agents. That shows the site does not filter by user agent. It does not
reproduce how Vercel treats verified bot IP ranges.

### 1.2 Vercel security, headers and redirects

Read-only checks via the Vercel API and CLI:

- **Firewall:** `GET /v1/security/firewall/config/active` returned "Config not found". This project has no custom firewall rules, no managed bot rules and no IP blocks.
- **Attack mode:** the project's `security` field is empty, so attack mode is not configured.
- **Deployment Protection:** `ssoProtection: all_except_custom_domains`. Preview URLs are protected, which is good because they stay out of indexes. The production domain is public.
- **Headers** (`next.config.ts`):
  - `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin` and `Permissions-Policy`, none of which affect crawling;
  - `X-Robots-Tag: noindex` only on `/blog/fixture-*`, which are never built.
- **No middleware or proxy file** exists.
- **Redirect:** `http://sketchsteps.app` → 308 → `https://sketchsteps.app`.

**Issue (P1): www is broken.**

- `www.sketchsteps.app` has a single CNAME to `cname.vercel-dns-0.com` at the registrar's name servers, which is correct. (Corrected 24 Nov: an earlier note mentioned an extra A record; those addresses were the CNAME target's own A records.)
- The Vercel project only has `sketchsteps.app` attached.
- The certificate only covers `sketchsteps.app`, so `https://www.sketchsteps.app` fails with a hostname mismatch.
- `http://www.sketchsteps.app` 308-redirects into that failure.

Any link, bookmark or crawler using www hits an error. `docs/analytics.md`
also lists www as a production host.

### 1.3 Sitemap, indexing, canonical and hreflang

- **Sitemap:** 11 URLs (5 language homepages, support, iOS and Android privacy policies, account deletion, `/blog`, and the one article).
- **Canonicals:** every checked page has a self-referencing canonical on the apex domain.
- **hreflang:**
  - the five homepages carry en/es/fr/ja/de plus x-default, and these are reciprocal;
  - the blog has no hreflang yet, which is correct because it's English only;
  - `/es/blog` is `noindex, follow` and absent from the sitemap, as designed until a Spanish article is published.
- **Gap (P2):** the homepages and legal pages have no `<lastmod>`; only the blog URLs do. Bing documents `lastmod` as a crawl signal. Use real dates only.
- The Spanish translation (draft, on the feature branch) was already verified to produce reciprocal en/es hreflang once published.

### 1.4 Structured data

| Page | JSON-LD | Notes |
|---|---|---|
| `/` | Organization, WebSite, SoftwareApplication | No `WebPage` node. The other four language homepages have one. |
| `/es`, `/fr`, `/ja`, `/de` | Organization, WebSite, WebPage, SoftwareApplication | Descriptions are localized. |
| `/blog` | Organization, Blog, BreadcrumbList | |
| `/blog/how-to-draw-a-face` | Organization, BlogPosting, BreadcrumbList | Includes headline, dates, two images, `inLanguage`, author = Organization. |
| `/support`, legal pages | none | Acceptable. |

**SoftwareApplication** currently contains:

- `operatingSystem: "iOS, Android"`;
- `applicationCategory: DesignApplication`;
- `downloadUrl` and `sameAs` pointing to both store listings;
- `offers` with price 0 USD and the note "premium options are shown in the app".

It has no `aggregateRating` or `review`. Google's software app documentation
requires one of those for the software app rich result, so the homepage is
**not eligible** for that result today. The data is otherwise valid.

**Organization** has a logo and a support contact. It has **no `sameAs`**: no
store developer pages and no social profiles.

### 1.5 Does the site explain the product?

Compared against the live English homepage and the US App Store listing:

| Fact | On the site | Public elsewhere |
|---|---|---|
| What it does (photo → step-by-step Loomis-style drawing tutorial) | ✅ Clear: How it works, demo, features | |
| Styles and step counts (Realistic Paper Portrait 9, Digital Clean 8, Animal 9) | ✅ | |
| Trace AI, Tracing Studio, gallery, free tutorials | ✅ | The App Store also lists Draw with Camera, Draw on Screen, opacity/grid/flashlight, crop and zoom. |
| Platforms | ⚠️ "App Store / Google Play" only | App Store: **requires iOS 18 or later, iPhone and iPad**. Google Play: live in Spain and Mexico. |
| Pricing | ⚠️ "includes free tutorials; pricing and premium options are shown in the app" | App Store (US): free; **Pro Weekly $7.99, Monthly $19.99, Yearly $79.99, Yearly 400 generations $49.99, coin packs $3.99–$39.99**; free tutorials "need no coins". |
| App languages | ❌ | App Store: English plus 10 more, including Spanish. |
| Limitations (AI-generated stages, photo requirements, internet needed?) | ❌ | Not stated anywhere I found. |
| Rating | not shown | App Store US: 4.2 out of 5 (199 ratings). Google Play: 500k+ downloads. |
| Who makes it | ❌ | Both store listings name the developer and link back to `sketchsteps.app`. That is good for entity linking. |

The homepage H1, "Learn to Draw Anything, Step by Step", is broader than the
product's documented scope (portraits, animals, tracing). Assistants summarize
what pages say, so precise scope statements are safer.

### 1.6 Blog citability

- **One English article**, "How to Draw a Face Step by Step":
  - original images generated by the app;
  - the AI generation is disclosed;
  - step-by-step structure with one H1, 5 H2s and 9 H3s;
  - "common mistake" notes;
  - measured corrections are pending deploy on `feature/es-content-seo`;
  - the drawing-accuracy review is still open.
- **One Spanish draft**, not published.
- **No pages** on:
  - the Loomis method itself;
  - drawing from photos;
  - choosing a drawing app;
  - practice plans.

  These are the topics the target prompts ask about.

### 1.7 Visibility for the target prompts (proxy evidence only)

I used US-indexed web search as a proxy. This is not AI assistant output.

- **"best app to learn portrait drawing from photos Loomis method":** the Sketch Steps **App Store listing** ranked first, alongside Loomity and Atelier. The website did not appear.
- **"mejor app para aprender a dibujar retratos caras desde fotos":** results were App Store listings for other apps and Skillshare classes. No Sketch Steps result.
- **"Sketch Steps" app drawing Loomis:** the correct listing came up, plus a **different app called "SketchStep - Learn to Draw"**, a name-collision risk.
- No search volumes or citation counts are available for these prompts.

### 1.8 Measurement: what exists today

| Tool | What it can show for AI traffic | Status |
|---|---|---|
| Vercel Web Analytics (cookieless, all visitors) | Referrer domains (e.g. chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com), plus the site's own `?s=` link codes | Installed |
| GA4 | Session source/medium, including `utm_source=chatgpt.com`, which OpenAI documents it adds to ChatGPT Search links | Installed, consent-gated: only visitors who accept are counted, so AI share is under-counted |
| Google Search Console | AI Overviews and AI Mode clicks are folded into "Web" totals. The Generative AI report (June 2026) gives impressions only, data from 18 May 2026. | Needs dashboard check |
| Bing Webmaster Tools AI Performance | Citations in Copilot and Bing AI answers, grounding queries, cited pages; no clicks | Needs dashboard check |
| Perplexity, Gemini | No publisher dashboards; referrer traffic only | — |

---

## 2. Requires access to external dashboards

1. **Vercel dashboard:**
   - Firewall → Bot Management: confirm no "AI bots" or bot protection rule is on. The API shows no project config, so confirm visually.
   - Firewall traffic: confirm verified bots aren't challenged.
   - Analytics → Referrers: look for AI domains.
   - Logs: filter on bot user agents to see real crawl activity.
2. **Google Search Console:** verify the domain property, submit the sitemap, check indexing for the 11 URLs, and read the Generative AI report. Watch for the "generative AI features" setting and leave it on the default (included).
3. **Bing Webmaster Tools:** verify the site (import from GSC is possible), submit the sitemap, and read AI Performance.
4. **GA4:** create a custom channel group for AI assistants (see 3.3).
5. **Registrar DNS:** no change needed; confirm the www CNAME is the only www record.
6. **App Store Connect and Play Console:** web referrer and campaign data for installs that come via the site.

---

## 3. Recommendations (prioritized)

### 3.1 Technical fixes

| P | Fix | How |
|---|---|---|
| **P1** | Make www work | Add `www.sketchsteps.app` to the Vercel project as a **308 redirect to `sketchsteps.app`**. Vercel issues the certificate. The registrar's existing `CNAME www → cname.vercel-dns-0.com` is already correct. Verify `https://www…` → 308 → apex. |
| P2 | Organization `sameAs` | Add the App Store developer page, the Play developer page, and any official social profiles the owner confirms. Helps entity resolution and disambiguation from "SketchStep". |
| P2 | `WebPage` node on the English homepage | Same pattern as `/es`, for consistent entity graphs. |
| P2 | SoftwareApplication detail | Add `featureList` (from the verified homepage features). Make `operatingSystem` more precise, e.g. "iOS 18 or later (iPhone, iPad); Android". Add `inLanguage` for the app languages if the owner confirms. |
| P2 | Sitemap `lastmod` for homepages and legal pages | Use real content-change dates. Omit rather than invent. |
| P3 | `aggregateRating` | Only if the rating is **shown on the page** with its source and kept current, per Google's review-snippet guidelines. Otherwise leave it out. Do not invent or round up. |
| P3 | IndexNow | Bing documents IndexNow for fast discovery. A small script pinging changed URLs on deploy. Optional. |

### 3.2 Content

| P | Opportunity | Why it fits |
|---|---|---|
| **P1** | **Clear facts block or FAQ** on the homepage, in every language: "Is Sketch Steps free?", "What do I need?", "Which languages?", "What are the limits?" | These are the questions assistants answer when recommending apps. Use only owner-confirmed facts: free download; free tutorials need no coins; AI guides use coins or Pro; prices shown in the store and app; iOS 18+ on iPhone and iPad; Android on Google Play; app languages. |
| **P1** | **Publish "Cómo dibujar una cara paso a paso"** after the drawing and native reviews | Makes `/es/blog` indexable and adds Spanish entity coverage. |
| P2 | **"The Loomis method for beginners"** guide (EN, then ES) | Directly answers "how to learn the Loomis method". Can reuse verified construction images and the measured terminology. Different job from the face tutorial, so no cannibalization. |
| P2 | **"How to draw a face from a photo"** (EN/ES) | Exact product fit. The process can be shown with the app's real stages and the photo (once rights are confirmed). |
| P2 | **Precise homepage scope** | Replace or support "Learn to Draw Anything" with what the app teaches (portraits, pets and animals, tracing) so assistants summarize it correctly. |
| P2 | **About page:** who makes Sketch Steps, the developer name as listed in the stores, contact | Entity clarity, trust, disambiguation. Owner decision on what to publish. |
| P3 | **Honest app comparison** ("apps to learn portrait drawing") | Highest commercial fit for "best app…" prompts, but only after hands-on testing and dated pricing. Disclose that we make one of the apps. |
| P3 | **Practice plan** (7-day face drawing) | Useful, evergreen, links to the tutorials. |

### 3.3 Measurement setup

1. **GA4 custom channel group "AI assistants"**, placed above Referral. Source matches regex:

   `chatgpt\.com|openai\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai`

   Report it next to Organic Search. Remember the consent gating.
2. **Vercel Analytics:** a saved view filtering referrers to the same domains. This is cookieless, so it counts every visitor.
3. **GSC Generative AI report and Bing AI Performance:** monthly export of impressions and citations by page.
4. **Manual prompt panel**, monthly:
   - a fixed list of about 10 prompts (EN/ES), run on each platform, logged with date, platform, whether Sketch Steps was mentioned or linked, and which URL;
   - treat it as a sample observation, not a ranking.
5. **Store side:** App Store Connect "Web referrer" for `sketchsteps.app`, and the existing `?s=` codes for owned links.

---

## 4. Speculative opportunities (no documented guarantee)

- **Third-party mentions** (independent reviews, roundups, YouTube or Reddit discussions) likely influence which apps assistants name. There is no platform documentation to quantify this. Earn them; don't buy or fake them.
- **Consistent naming everywhere** ("Sketch Steps", "Sketch Steps: AI Loomis Draw", sketchsteps.app) may reduce confusion with "SketchStep". The effect is plausible but unmeasured.
- **`llms.txt`: not recommended.**
  - Google says it neither helps nor harms Google Search, including AI Overviews and AI Mode, and lists it among tactics to skip.
  - OpenAI, Perplexity and Microsoft publish no documentation that they use it.
  - Revisit only if a target platform documents support.
- **AI-specific markup** beyond schema.org: none is documented by the target platforms. Skip.

---

## Sources

- **OpenAI**
  - [Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
  - [Publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) (`utm_source=chatgpt.com`)
- **Google**
  - [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
  - [Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) (Google-Extended)
  - [Search Console Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
  - [Software app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
  - [Review snippet guidelines](https://developers.google.com/search/docs/advanced/structured-data/review-snippet)
  - Coverage of the llms.txt position: [Search Engine Roundtable](https://seroundtable.com/google-llms-txt-files-hurt-help-41512.html), [Search Engine Land](https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264)
- **Microsoft**
  - [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
  - [June 2026 AI visibility update](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)
- **Perplexity**
  - [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md)
- **Store listings checked 24 Nov 2026**
  - [App Store](https://apps.apple.com/us/app/id6763632360)
  - [Google Play](https://play.google.com/store/apps/details?id=com.sketchsteps.app)
