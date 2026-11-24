import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LOGO_PATH,
  SITE_NAME,
  SITE_URL,
  STORE_APP_NAME,
  EN_HOME_DESCRIPTION,
  EN_HOME_TITLE,
  SUPPORT_EMAIL,
  absoluteUrl,
} from "@/lib/site";

/**
 * Homepage JSON-LD. Every value here must be verifiable on the live site or
 * the public store listings. Do not add aggregateRating/review data unless it
 * is pulled from a current, verifiable source and kept in sync.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(LOGO_PATH),
    width: 512,
    height: 512,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SUPPORT_EMAIL,
    url: absoluteUrl("/support"),
  },
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION_ID },
};

/**
 * English app node. Platform-specific items say which platform they apply to,
 * matching the homepage copy. Facts: App Store and Google Play listings and
 * the privacy policies (checked 2026-11-24).
 */
const app = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: SITE_NAME,
  alternateName: STORE_APP_NAME,
  url: SITE_URL,
  description:
    "Drawing app that turns portrait photos into step-by-step Loomis method drawing tutorials, with Trace AI and a tracing studio for drawing on real paper.",
  applicationCategory: "DesignApplication",
  operatingSystem: "iOS 18+, Android",
  featureList: [
    "Step-by-step Loomis method drawing tutorials from your photos",
    "Trace AI: turns a photo into a drawing-style tracing reference",
    "Tracing Studio with Draw with Camera and Draw on Screen",
    "Ready-made line drawings to trace",
    "Animal Drawing style (iPhone and iPad)",
    "Free ready-made tutorials (iPhone and iPad)",
  ],
  image: absoluteUrl(LOGO_PATH),
  downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
  sameAs: [APP_STORE_URL, GOOGLE_PLAY_URL],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description:
      "Free to download. AI generation requires a subscription or coins (in-app purchases).",
  },
  publisher: { "@id": ORGANIZATION_ID },
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    website,
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: EN_HOME_TITLE,
      description: EN_HOME_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": APP_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
    app,
  ],
};

/**
 * JSON-LD for a translated homepage (e.g. /es). Same organization, website and
 * app as English (shared @ids), plus a WebPage node in the page's language;
 * only the app/offer descriptions are translated.
 */
export function localizedHomeStructuredData({
  locale,
  url,
  title,
  description,
  appDescription,
  offerDescription,
}: {
  locale: string;
  url: string;
  title: string;
  description: string;
  appDescription: string;
  offerDescription: string;
}) {
  // featureList is English-only until it is translated, so it is left out
  // of the translated pages to keep JSON-LD consistent with visible text.
  const localizedApp = Object.fromEntries(
    Object.entries(app).filter(([key]) => key !== "featureList"),
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": APP_ID },
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        ...localizedApp,
        description: appDescription,
        offers: { ...app.offers, description: offerDescription },
      },
    ],
  };
}

/** Serializes JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
