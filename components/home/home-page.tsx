import {
  FINAL_CTA_ID,
  Faq,
  FinalCta,
  ScreenGallery,
  SiteFooter,
} from "@/components/home/closing-sections";
import { Features } from "@/components/home/features";
import { HERO_CTA_ID, Hero, SiteHeader } from "@/components/home/hero";
import { DrawingDemo, HowItWorks } from "@/components/home/how-it-works";
import { StickyCta } from "@/components/home/sticky-cta";
import { InAppBrowserNotice } from "@/components/home/store-buttons";

/**
 * Sketch Steps 2.0 homepage. Every section is a Server Component whose copy
 * comes from messages/<locale>.json ("Home" namespace); only the store
 * buttons, the step demo and the sticky CTA hydrate on the client.
 */
export function HomePage() {
  return (
    <>
      <InAppBrowserNotice />
      <div className="sketchbook-grid bg-cream">
        <SiteHeader />
        <main>
          <Hero />
          <HowItWorks />
          <DrawingDemo />
          <Features />
          <ScreenGallery />
          <Faq />
          <FinalCta />
        </main>
      </div>
      <SiteFooter />
      <StickyCta heroAnchorId={HERO_CTA_ID} finalAnchorId={FINAL_CTA_ID} />
    </>
  );
}
