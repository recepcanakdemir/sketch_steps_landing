import { M_PLUS_Rounded_1c, Nunito } from "next/font/google";

/**
 * Typography: SF Pro Rounded first, licensed rounded fonts as fallbacks.
 *
 * Apple's San Francisco font licence (developer.apple.com/fonts) only allows
 * the fonts for UI mock-ups and forbids embedding them or making them
 * available over a network, so the site never ships Apple font files. It asks
 * the browser for the copy already on the visitor's device instead:
 *   - `ui-rounded`: SF Pro Rounded, exposed by Safari on macOS and iOS/iPadOS;
 *   - "SF Pro Rounded": the same font if the visitor installed it locally.
 *
 * Everywhere else (Chrome/Edge/Firefox, Windows, Android, Linux) the text
 * falls back to fonts released under the SIL Open Font License, which next/font
 * downloads at build time and serves from this site (no Google request):
 *   - Nunito: rounded Latin, including accented letters for Spanish/French.
 *   - M PLUS Rounded 1c: rounded Japanese (kana + kanji). Google splits it into
 *     unicode-range slices and it is not preloaded, so a browser only fetches
 *     it when a page actually contains Japanese text.
 * Japanese uses M PLUS Rounded 1c on Apple devices too: SF Pro Rounded has
 * no Japanese glyphs and Hiragino Maru Gothic ships in a single weight, so
 * bold headings would turn regular (faux bold is disabled in globals.css).
 */
export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-mplus-rounded",
});

export const fontVariables = `${nunito.variable} ${mPlusRounded.variable}`;
