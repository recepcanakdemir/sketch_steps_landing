import LandingPage from "@/components/landing-page";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sketch Steps",
  applicationCategory: "EducationApplication",
  operatingSystem: "iOS",
  description:
    "AI drawing app that transforms face photos into step-by-step Loomis Method portrait drawing guides.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2400",
  },
  keywords:
    "AI Drawing App, Loomis Method, Learn Portrait Drawing, Drawing Tutorial App, AI Art Education, Face Drawing Guide",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPage />
    </>
  );
}
