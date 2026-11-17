import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, isLiveLocale, type Locale } from "@/i18n/config";

/**
 * Per-request i18n config for Server Components. The locale is supplied by
 * `setRequestLocale()` in each root layout, which keeps every page statically
 * rendered. Anything unknown falls back to English.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && isLiveLocale(requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
