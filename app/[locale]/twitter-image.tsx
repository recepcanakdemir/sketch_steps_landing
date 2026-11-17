import { PREFIXED_LIVE_LOCALES } from "@/i18n/config";

export { default, size, contentType } from "./opengraph-image";

// Route config must be declared here; Next.js does not read re-exported config.
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LIVE_LOCALES.map((locale) => ({ locale }));
}
