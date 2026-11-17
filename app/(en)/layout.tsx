import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

import { RootDocument } from "@/components/root-document";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { rootViewport, sharedRootMetadata } from "@/lib/metadata";

/**
 * Root layout for English, the default locale, served on the root domain
 * (`/`, `/support`, ...). The `(en)` route group does not appear in URLs.
 */

export const metadata: Metadata = {
  ...sharedRootMetadata,
  title: {
    default: "Sketch Steps - AI Loomis Drawing Guides for Portrait Artists",
    template: "%s | Sketch Steps",
  },
  description:
    "Turn any face photo into an AI-generated step-by-step Loomis drawing guide. Learn portrait drawing faster with guided construction, tracing, and saved practice references.",
  keywords: [
    "AI Drawing App",
    "Loomis Method",
    "Learn Portrait Drawing",
    "Drawing Tutorial App",
    "AI Art Education",
    "Face Drawing Guide",
    "portrait drawing app",
    "Loomis drawing guide",
  ],
  openGraph: {
    title: "Sketch Steps - Turn Photos Into Loomis Drawing Guides",
    description:
      "Upload a face photo and instantly receive an AI-powered Loomis construction breakdown designed for beginners and aspiring portrait artists.",
    url: "https://sketchsteps.app",
    siteName: "Sketch Steps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch Steps - AI Loomis Drawing Guides",
    description:
      "Learn portrait drawing faster with AI-generated step-by-step Loomis guides from your own photos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = rootViewport;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setRequestLocale(DEFAULT_LOCALE);

  return <RootDocument locale={DEFAULT_LOCALE}>{children}</RootDocument>;
}
