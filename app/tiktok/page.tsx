import type { Metadata } from "next";

import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TikTokLandingPage() {
  return <LandingPage />;
}
