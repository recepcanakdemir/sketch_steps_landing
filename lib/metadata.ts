import type { Metadata } from "next";

import { SITE_NAME, absoluteUrl } from "@/lib/site";

type PageMetadataInput = {
  /** Full <title>, used as-is (no template suffix). */
  title: string;
  description: string;
  /** Canonical path, e.g. "/support". */
  path: string;
  /** Shorter title for social cards; defaults to `title`. */
  socialTitle?: string;
  index?: boolean;
};

/**
 * Per-page metadata with a self-referencing canonical and matching Open Graph
 * and Twitter fields. Without this, child pages inherit the homepage's
 * og:url and og:title from the root layout.
 *
 * A page-level `openGraph` object replaces (not merges with) the layout's, so
 * the root `opengraph-image` / `twitter-image` routes are referenced
 * explicitly here.
 */
const SOCIAL_IMAGE = {
  width: 1200,
  height: 630,
  alt: "Sketch Steps: a face photo turned into a step-by-step Loomis drawing guide",
  type: "image/png",
};
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const shareTitle = socialTitle ?? title;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", ...SOCIAL_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: "/twitter-image", ...SOCIAL_IMAGE }],
    },
    robots: { index, follow: true },
  };
}
