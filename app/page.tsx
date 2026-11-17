import type { Metadata } from "next";

import LandingPage from "@/components/landing-page";
import { SITE_URL } from "@/lib/site";
import { homeStructuredData, jsonLd } from "@/lib/structured-data";

// Title, description and social fields come from the root layout defaults.
export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeStructuredData) }}
      />
      <LandingPage />
    </>
  );
}
