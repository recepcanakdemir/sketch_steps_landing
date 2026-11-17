import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { HomePage } from "@/components/home/home-page";
import { DEFAULT_LOCALE } from "@/i18n/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function InstagramLandingPage() {
  setRequestLocale(DEFAULT_LOCALE);

  return <HomePage />;
}
