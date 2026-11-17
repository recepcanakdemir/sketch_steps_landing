import { DEFAULT_LOCALE, LIVE_LOCALES, type Locale } from "@/i18n/config";

/**
 * Browser-language detection for the English homepage. See docs/i18n.md
 * ("Browser-language detection") for why it works this way.
 *
 * - Runs only on exactly "/". Localized URLs (/es, /fr, ...) and every other
 *   page are never redirected, so a page that was asked for by URL is always
 *   the page that is shown, and a redirect loop is impossible.
 * - Runs in the browser, before the page paints. The server always sends the
 *   same English HTML for "/" (no Accept-Language, IP or user-agent logic),
 *   so search engines index the English page as before.
 * - A language picked in the language switcher is stored in localStorage
 *   and always wins over the browser language, including English.
 * - The browser language is only used for visits that arrive from outside
 *   the site; moving around inside the site never triggers it.
 * - Uses location.replace(), so the hop leaves no history entry (Back does
 *   not bounce), and keeps the full query string and hash (utm_*, gclid...).
 */

/** localStorage key holding a locale the visitor picked in the switcher. */
export const LOCALE_PREFERENCE_KEY = "sketchsteps.locale";

/** Paths where detection may redirect. Only the English homepage. */
const DETECTION_PATHS = ["/"];

/** Remembers a language chosen in the switcher. Never throws. */
export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
  } catch {
    // Storage blocked (some private modes or in-app browsers): the choice
    // then only applies to this navigation, which is still correct.
  }
}

/**
 * Inline script for <head> of the English root layout. It must run before
 * the page renders, so it is plain ES5 with the locale list baked in at
 * build time (a locale only takes part once it is "live").
 *
 * Choice of language: a stored switcher choice if it is a live locale;
 * otherwise, only for visits that arrive from outside the site (no
 * same-origin referrer), the first entry of navigator.languages whose
 * primary subtag is a live locale ("es-MX" -> es, "de-CH" -> de, "en-GB" ->
 * en). English, or no supported language at all, means staying on "/".
 * Skipping detection on internal navigation means that someone who goes to
 * "/" from another page of the site (for example by picking English when
 * storage is blocked and the choice cannot be saved) is not sent back.
 * Any error also leaves the visitor on the English page.
 */
export function localeDetectionScript(): string {
  const config = JSON.stringify({
    paths: DETECTION_PATHS,
    locales: LIVE_LOCALES,
    fallback: DEFAULT_LOCALE,
    key: LOCALE_PREFERENCE_KEY,
  });

  return `(function(c){try{
if(c.paths.indexOf(location.pathname)<0)return;
var t=null,p=null;
try{p=localStorage.getItem(c.key)}catch(e){}
if(p&&c.locales.indexOf(p)>-1){t=p}else{
try{if(document.referrer&&new URL(document.referrer).origin===location.origin)return}catch(e){}
var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
for(var i=0;i<l.length&&!t;i++){var s=String(l[i]||"").toLowerCase().split(/[-_]/)[0];if(c.locales.indexOf(s)>-1)t=s}}
if(!t||t===c.fallback)return;
var h=document.createElement("style");h.textContent="html{visibility:hidden}";document.head.appendChild(h);
setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h)},3000);
location.replace("/"+t+location.search+location.hash);
}catch(e){}})(${config});`;
}
