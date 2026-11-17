import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";

import type { Locale } from "@/i18n/config";

/**
 * The <html>/<body> shell shared by every root layout (English at the root,
 * other locales under /[locale]). Keeping it in one place guarantees that all
 * locales get the same analytics, providers and document structure.
 */
export function RootDocument({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
