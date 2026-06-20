import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sketchsteps.app"),
  title: {
    default: "Sketch Steps - AI Loomis Drawing Guides for Portrait Artists",
    template: "%s | Sketch Steps",
  },
  description:
    "Turn any face photo into an AI-generated step-by-step Loomis drawing guide. Learn portrait drawing faster with guided construction, tracing, and saved practice references.",
  keywords: [
    "AI Drawing App",
    "Loomis Method",
    "Learn Portrait Drawing",
    "Drawing Tutorial App",
    "AI Art Education",
    "Face Drawing Guide",
    "portrait drawing app",
    "Loomis drawing guide",
  ],
  applicationName: "Sketch Steps",
  authors: [{ name: "Sketch Steps" }],
  creator: "Sketch Steps",
  publisher: "Sketch Steps",
  icons: {
    icon: "/images/sketch-steps-app-icon.png",
    shortcut: "/images/sketch-steps-app-icon.png",
    apple: "/images/sketch-steps-app-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sketch Steps - Turn Photos Into Loomis Drawing Guides",
    description:
      "Upload a face photo and instantly receive an AI-powered Loomis construction breakdown designed for beginners and aspiring portrait artists.",
    url: "https://sketchsteps.app",
    siteName: "Sketch Steps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch Steps - AI Loomis Drawing Guides",
    description:
      "Learn portrait drawing faster with AI-generated step-by-step Loomis guides from your own photos.",
  },
  appleWebApp: {
    title: "Sketch Steps",
    capable: true,
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
