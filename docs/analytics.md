# Analytics

> **Decision (owner, 2026-11-25): GA4 stays off.** It is deliberately not
> configured or activated, to avoid extra cookie-consent and privacy
> requirements. The GA4 and consent code below is kept as is and stays
> dormant. Do not set the measurement ID, add tracking scripts, change the
> consent code or add other tracking tools. See `CLAUDE.md` §5a and
> `docs/SEO-GEO-STATUS.md` §3a. The "turn it on" steps below are historical.

Two tools run on sketchsteps.app:

- **Vercel Analytics** (`@vercel/analytics`, in `components/root-document.tsx`):
  cookieless page counts, unchanged.
- **Google Analytics 4** (`lib/analytics.ts`, `components/analytics.tsx`):
  traffic sources, language performance and store-click conversions. It only
  runs after the visitor accepts analytics cookies.

There is no Google Tag Manager container; gtag.js is loaded directly, once.

## Configuration and deployment

| Variable | Where it comes from | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Not set at launch (GA off). To turn on: `G-6Q1F6EHWDD` in a committed `.env.production` or in Vercel | GA4 web stream ID. Unset or empty = GA off. |
| `NEXT_PUBLIC_GA_HOSTS` | Default in code: `sketchsteps.app,www.sketchsteps.app` | Hostnames where GA may load. |

Both are `NEXT_PUBLIC_` values, inlined into the JavaScript at build time.

Where analytics runs:

| Environment | GA4 |
|---|---|
| `next dev` (localhost) | Off: `.env.production` is not read in development. |
| `next build` + `next start` on localhost | Off: localhost is not an allowed host. No banner, no requests. |
| Vercel Preview (`*.vercel.app`, branch URLs) | Off: the ID is in the build, but the host is not allowed. |
| Vercel Production on sketchsteps.app / www | On, after consent. |

**Launch status: GA4 is off.** The site launched without a measurement ID,
so gtag.js is never loaded, no cookie is set and no consent banner is shown.
Turn it on only after the Privacy Policy covers the website
(`docs/privacy-disclosures.md`): add `.env.production` with
`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6Q1F6EHWDD` (a public ID, not a secret), or
set the same variable for Production in Vercel, then redeploy.

Optional Vercel variables (Project Settings → Environment Variables):

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Production): only to use a different
  property than the committed one.
- To test analytics before launch without touching production data, create a
  separate GA4 test property and set, for the **Preview** environment only,
  `NEXT_PUBLIC_GA_MEASUREMENT_ID=<test property ID>` and
  `NEXT_PUBLIC_GA_HOSTS=<the preview hostname>`; then check GA4 DebugView /
  Realtime of the test property. Remove both afterwards.
- A custom domain added later (for example a staging subdomain) is off until
  it is added to `NEXT_PUBLIC_GA_HOSTS`.

No private credentials are used: gtag.js needs only the public measurement ID.

## Consent

- One banner for every visitor and every locale (text in `messages/*.json`,
  `Client.consent`), with **Reject** and **Accept** given equal weight and a
  link to the privacy policy. Nothing from Google is requested, stored or sent
  before **Accept**.
- The choice is kept in `localStorage` (`sketchsteps.consent`). If storage is
  blocked, it applies to the current page load only and the banner returns.
- **Cookie settings** reopens the banner to change or withdraw the choice: in
  the homepage footer (all five languages), the footers of the account
  deletion and privacy policy pages, and the "Delete your data" section of
  the support page. There is only ever one banner. Withdrawing sets
  `ga-disable-<ID>`, updates consent to denied and deletes `_ga*` cookies.
- After **Accept**, Consent Mode v2 is set to `analytics_storage: granted`,
  with `ad_storage`, `ad_user_data` and `ad_personalization` denied. Google
  signals and ad personalization are off. GA4 does not log or store IP
  addresses.

Opt-in is used everywhere rather than only in the EU/EEA, UK and Switzerland:
the site is static and does not look up visitors' location, so it cannot
tell where a visitor is.

## Page views

`gtag('config')` sends the first `page_view`. Client-side navigation is
counted by GA4's own enhanced measurement ("Page changes based on browser
history events", on by default). The code never sends `page_view` itself, so
nothing is counted twice. Language switches are full page loads and count as
one page view on the new page.

## Events

| Event | Parameters | Sent when |
|---|---|---|
| `store_click` | `store` (`app_store`, `google_play`), `cta_location`, `page_language`, `page_path` | Any App Store / Google Play link is clicked. One delegated listener on `a[data-cta]`; it never blocks navigation. |
| `language_switch` | `from_language`, `to_language`, `page_path` | The visitor picks a different language in the switcher. Automatic browser-language redirects are not counted. |
| `demo_interaction` | `action` (`next`, `previous`, `select_step`, `slider`), `step_number` (1-9), `page_language` | A step button or thumbnail changes the step; the slider reports once the visitor stops on a step (0.8 s). |

`cta_location` values: `header`, `hero`, `how_it_works`, `interactive_demo`,
`final_cta`, `footer`, `sticky_bar`, and on the blog `blog_index` (index page
box), `blog_article` (end of an article) and `blog_inline` (a box inside the
article body) (from the `data-cta-location` attribute). Blog pages use the
same header and footer, so their `header` and `footer` clicks are told apart
by `page_path`. The blog adds no new event and no extra listener: its
store buttons are the same components, so each click sends exactly one
`store_click`.
`page_language` is `en`, `es`, `fr`, `ja` or `de` (the page's `<html lang>`).
`page_path` is a GA4 built-in field: it appears as the standard "Page path"
dimension and needs no custom dimension. No event contains personal data.

GA4 enhanced measurement (set in the property) also sends its own events,
for example `click` for outbound links (a store click therefore shows up as
one `store_click` plus GA's automatic `click`) and `scroll`. Those are not
custom events. gtag.js throttles bursts of many events within milliseconds;
normal clicking is not affected.

## Attribution

Rule: nothing is written to the visitor's device for analytics before
consent (no cookie, no `localStorage`/`sessionStorage`, no identifier), and
the address bar is never changed by analytics.

- UTM parameters, `gclid`, `fbclid` and `ttclid` are never changed or
  removed. The browser-language redirect keeps the full query string, and the
  language switcher carries it over, so GA4 reads them from the URL of the
  page where the visitor accepts.
- The external referrer of the visit (e.g. google.com) is kept in a
  JavaScript variable for the current page load. If the visitor accepts after
  client-side navigation, the one `page_view` sent on Accept reports that
  referrer instead of our own previous page (GA4 reads `document.referrer`
  itself and ignores `page_referrer` set in `config`, so it is restored on
  that page only). Nothing that happened before consent is sent or replayed.
- In-app browsers (TikTok, Instagram) often send no referrer, which GA reports
  as Direct. Tag social links with UTM parameters, for example
  `https://sketchsteps.app/?utm_source=tiktok&utm_medium=social&utm_campaign=bio`.

### Accepted limitations (consent first)

| Situation | What GA4 records |
|---|---|
| Accept on the landing page (most visitors) | Full attribution: campaign from the URL, original referrer. |
| Accept after a language switch | Campaign kept (in the URL); a referrer-only visit (organic, no UTM) becomes Direct. |
| Accept after the automatic redirect `/` -> `/es` etc. | Campaign kept (in the URL); referrer-only visits become Direct. Google mostly sends searchers straight to their language page via hreflang, so few organic visits take this path. |
| Accept after client-side navigation to a page without the campaign in its URL (e.g. home -> `/support`) | Referrer kept, campaign parameters lost. |
| Accept after any other full page load (e.g. `/es` -> `/support`, refresh) | Campaign and referrer of the landing page lost. |
| Reject, or no choice | Nothing (Vercel Analytics still counts pages without cookies). |

Keeping more would require storing the entry context before consent or
rewriting the URL after it; both were removed on purpose.

## GA4 property setup (not done in code)

1. Register custom dimensions (event scope): `store`, `cta_location`,
   `page_language`, `from_language`, `to_language`, `action`, `step_number`
   (not `page_path`, see above).
2. Mark `store_click` as a key event (conversion).
3. Keep enhanced measurement "Page changes based on browser history events"
   on.
4. Optionally exclude internal traffic and set data retention.

## Privacy policy

The required website disclosures for the site owner are listed separately in
`docs/privacy-disclosures.md`. The privacy policy itself is unchanged.
