import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { HomePage } from "@/components/home/home-page";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { languageAlternates } from "@/lib/metadata";
import { SITE_URL, pageLocales } from "@/lib/site";
import { homeStructuredData, jsonLd } from "@/lib/structured-data";

// Title, description and social fields come from the root layout defaults.
// hreflang lists every language the homepage is translated into.
const languages = languageAlternates("/", {}, pageLocales("/"));

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    ...(languages ? { languages } : {}),
  },
};

export default function Home() {
  setRequestLocale(DEFAULT_LOCALE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeStructuredData) }}
      />
      <HomePage />
    </>
  );
}
