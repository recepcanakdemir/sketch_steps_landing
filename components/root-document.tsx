import { Analytics } from "@vercel/analytics/next";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import type { Locale } from "@/i18n/config";

/**
 * The <html>/<body> shell shared by every root layout (English at the root,
 * other locales under /[locale]). Keeping it in one place guarantees that all
 * locales get the same analytics, providers and document structure.
 *
 * Only the "Client" message namespace is sent to the browser. Page copy is
 * rendered on the server, so it is not serialized a second time.
 */
export async function RootDocument({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const messages = (await getMessages()) as AbstractIntlMessages;
  const clientMessages = messages.Client
    ? { Client: messages.Client }
    : {};

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
