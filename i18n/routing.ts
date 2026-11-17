import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, LIVE_LOCALES } from "@/i18n/config";

/**
 * next-intl routing definition, for the navigation helpers we will add with
 * the language switcher.
 *
 * - `as-needed`: the default locale (English) has no prefix, so existing URLs
 *   are unchanged.
 * - No middleware is used: there is no locale detection, no cookie and no
 *   redirect. Routes are resolved purely by the file system (see
 *   app/(en) and app/[locale]).
 */
export const routing = defineRouting({
  locales: LIVE_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});
