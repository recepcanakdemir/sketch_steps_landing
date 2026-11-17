import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LOGO_PATH,
  SITE_NAME,
  SITE_URL,
  STORE_APP_NAME,
  SUPPORT_EMAIL,
  absoluteUrl,
} from "@/lib/site";

/**
 * Homepage JSON-LD. Every value here must be verifiable on the live site or
 * the public store listings. Do not add aggregateRating/review data unless it
 * is pulled from a current, verifiable source and kept in sync.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: SITE_NAME,
      alternateName: STORE_APP_NAME,
      url: SITE_URL,
      description:
        "AI drawing app that transforms face photos into step-by-step Loomis Method portrait drawing guides.",
      applicationCategory: "DesignApplication",
      operatingSystem: "iOS, Android",
      image: absoluteUrl(LOGO_PATH),
      downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
      sameAs: [APP_STORE_URL, GOOGLE_PLAY_URL],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free to download. Premium options are shown in the app.",
      },
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

/** Serializes JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
