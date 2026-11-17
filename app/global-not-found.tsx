import type { Metadata, Viewport } from "next";
import "./globals.css";

import { DEFAULT_LOCALE } from "@/i18n/config";
import { rootViewport, sharedRootMetadata } from "@/lib/metadata";

/**
 * Site-wide 404. With one root layout per locale group there is no top-level
 * layout, so unmatched URLs (including planned locales such as /es before
 * launch) render this standalone document. Markup mirrors Next.js's default
 * 404 so the page looks the same as before.
 */

export const metadata: Metadata = {
  ...sharedRootMetadata,
  title: "404: This page could not be found.",
  robots: { index: false, follow: true },
  // metadataBase is not applied to file-based social images on this page,
  // which would emit localhost URLs. A 404 needs no share card.
  openGraph: null,
  twitter: null,
};

export const viewport: Viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <div
          style={{
            fontFamily:
              'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1
              style={{
                display: "inline-block",
                margin: "0 20px 0 0",
                padding: "0 23px 0 0",
                fontSize: 24,
                fontWeight: 500,
                verticalAlign: "top",
                lineHeight: "49px",
                borderRight: "1px solid rgba(0,0,0,.3)",
              }}
            >
              404
            </h1>
            <div style={{ display: "inline-block" }}>
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "49px",
                  margin: 0,
                }}
              >
                This page could not be found.
              </h2>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
