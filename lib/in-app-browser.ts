export type InAppBrowser =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "in-app"
  | null;

export type BrowserEnvironment = {
  browser: InAppBrowser;
  isAndroid: boolean;
  isIOS: boolean;
};

const INSTAGRAM_BROWSER_PATTERN = /Instagram|Threads/i;
const FACEBOOK_BROWSER_PATTERN = /FBAN|FBAV|FB_IAB|Messenger/i;
const TIKTOK_BROWSER_PATTERN =
  /TikTok|musical_ly|Bytedance|ByteLocale|ByteFullLocale|ByteWebView/i;
const OTHER_IN_APP_BROWSER_PATTERN = /Line|Snapchat|Pinterest/i;

export function getBrowserEnvironment(
  userAgent: string,
  platform = "",
  maxTouchPoints = 0,
): BrowserEnvironment {
  let browser: InAppBrowser = null;

  if (INSTAGRAM_BROWSER_PATTERN.test(userAgent)) {
    browser = "instagram";
  } else if (FACEBOOK_BROWSER_PATTERN.test(userAgent)) {
    browser = "facebook";
  } else if (TIKTOK_BROWSER_PATTERN.test(userAgent)) {
    browser = "tiktok";
  } else if (OTHER_IN_APP_BROWSER_PATTERN.test(userAgent)) {
    browser = "in-app";
  }

  return {
    browser,
    isAndroid: /Android/i.test(userAgent),
    isIOS:
      /iPad|iPhone|iPod/i.test(userAgent) ||
      (platform === "MacIntel" && maxTouchPoints > 1),
  };
}

function buildAndroidBrowserIntent(url: string) {
  const urlWithoutScheme = url.replace(/^https?:\/\//i, "");

  return `intent://${urlWithoutScheme}#Intent;scheme=https;S.browser_fallback_url=${encodeURIComponent(url)};end`;
}

export function tryOpenInNativeBrowser(
  environment: BrowserEnvironment,
  url: string,
) {
  if (environment.isIOS && environment.browser === "instagram") {
    window.location.href = `instagram://extbrowser/?url=${encodeURIComponent(url)}`;
    return true;
  }

  if (environment.isIOS && environment.browser === "facebook") {
    window.open(`x-safari-${url}`, "_blank");
    return true;
  }

  if (environment.isAndroid && environment.browser) {
    window.location.href = buildAndroidBrowserIntent(url);
    return true;
  }

  return false;
}
