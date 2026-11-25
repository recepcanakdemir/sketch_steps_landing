import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

import { RootDocument } from "@/components/root-document";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { localeDetectionScript } from "@/lib/locale-detection";
import { rootViewport, sharedRootMetadata } from "@/lib/metadata";
import { EN_HOME_DESCRIPTION, EN_HOME_TITLE } from "@/lib/site";

/**
 * Root layout for English, the default locale, served on the root domain
 * (`/`, `/support`, ...). The `(en)` route group does not appear in URLs.
 */

export const metadata: Metadata = {
  ...sharedRootMetadata,
  title: {
    default: EN_HOME_TITLE,
    template: "%s | Sketch Steps",
  },
  description: EN_HOME_DESCRIPTION,
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
      "Upload a portrait photo and get a step-by-step Loomis construction guide, made for beginners and aspiring portrait artists.",
    url: "https://sketchsteps.app",
    siteName: "Sketch Steps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch Steps - AI Loomis Drawing Guides",
    description:
      "Step-by-step Loomis drawing guides generated from your own portrait photos.",
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

  // Browser-language detection; it only ever acts on "/" (lib/locale-detection).
  return (
    <RootDocument locale={DEFAULT_LOCALE} headScript={localeDetectionScript()}>
      {children}
    </RootDocument>
  );
}
