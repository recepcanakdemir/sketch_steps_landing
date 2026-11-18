import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // One root layout per locale group means there is no top-level layout;
    // app/global-not-found.tsx renders the site-wide 404 instead.
    globalNotFound: true,
  },
  async headers() {
    // Local blog fixtures (content/blog/fixtures) are never built in hosted
    // builds; if one were ever served, this keeps it out of search engines.
    const fixtureNoIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/blog/fixture-:slug", headers: fixtureNoIndex },
      { source: "/:locale/blog/fixture-:slug", headers: fixtureNoIndex },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
