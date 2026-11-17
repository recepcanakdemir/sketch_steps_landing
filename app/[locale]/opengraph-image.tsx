import { getTranslations } from "next-intl/server";

import { PREFIXED_LIVE_LOCALES, type Locale } from "@/i18n/config";
import { SOCIAL_IMAGE_SIZE, renderSocialImage } from "@/lib/social-image";

/**
 * Translated social image for a localized homepage, served at
 * /{locale}/opengraph-image (referenced by pageMetadata for that locale).
 * The <meta> alt text is set by pageMetadata from Metadata.socialImage.alt.
 */

export const size = SOCIAL_IMAGE_SIZE;
export const dynamicParams = false;

/** Pre-render at build time for every live prefixed locale. */
export function generateStaticParams() {
  return PREFIXED_LIVE_LOCALES.map((locale) => ({ locale }));
}

export const contentType = "image/png";

export default async function LocalizedOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata.socialImage" });

  return renderSocialImage({
    heading: t("heading"),
    body: t("body"),
    stepLabel: (step) => t("step", { step }),
  });
}
