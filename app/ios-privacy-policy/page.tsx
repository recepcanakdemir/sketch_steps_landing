import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

const SUPPORT_EMAIL = "support@sketchsteps.app";
const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
const textStyles = "text-sm leading-7 text-muted sm:text-base";
const listStyles =
  "mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-muted marker:text-accent sm:text-base";

export const metadata: Metadata = {
  title: {
    absolute: "iOS Privacy Policy | Sketch Steps",
  },
  description: "Privacy Policy for the Sketch Steps iOS application.",
  alternates: {
    canonical: "/ios-privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Sketch Steps home"
      className={`flex min-w-0 items-center gap-3 rounded-2xl ${focusStyles}`}
    >
      <Image
        src="/images/sketch-steps-app-icon.png"
        alt=""
        width={40}
        height={40}
        className="block h-10 w-10 rounded-2xl object-cover"
        priority
      />
      <Image
        src="/images/sketch-steps-wordmark.png"
        alt="Sketch Steps"
        width={120}
        height={40}
        className="block h-8 w-[96px] object-contain sm:h-9 sm:w-[108px]"
        priority
      />
    </Link>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = `section-${number}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-[28px] border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff4f5] text-sm font-bold text-accent">
          {number}
        </span>
        <h2
          id={headingId}
          className="pt-0.5 text-2xl font-semibold tracking-normal sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-2 text-lg font-semibold tracking-normal text-foreground sm:text-xl">
      {children}
    </h3>
  );
}

function ProviderLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
    >
      {children}
    </a>
  );
}

export default function IOSPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <BrandLogo />
          <Link
            href="/"
            className={`rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 ${focusStyles}`}
          >
            Back to home
          </Link>
        </div>
      </header>

      <main>
        <section className="px-5 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4f5] text-accent">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              iOS application
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-[54px]">
              Sketch Steps iOS Privacy Policy
            </h1>
            <p className="mt-5 text-base font-medium text-muted sm:text-lg">
              Last updated: October 11, 2026
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-5xl space-y-6 px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <div className="rounded-[28px] border border-border bg-[#fffafb] p-6 sm:p-8">
            <p className={textStyles}>
              Sketch Steps (&quot;Sketch Steps,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) respects your privacy. This Privacy Policy explains what
              information we collect, how we use and share it, how long we keep
              it, and the choices available to you when you use the Sketch Steps
              mobile application on iOS or Android (the &quot;App&quot;).
            </p>
          </div>

          <PolicySection number="1" title="Information We Collect">
            <p className={textStyles}>
              The information we collect depends on the features you use.
            </p>

            <Subheading>A. Photos, images, and generated content</Subheading>
            <p className={textStyles}>We may process:</p>
            <ul className={listStyles}>
              <li>Photos or images you select or capture for AI Loomis tutorial generation or AI tracing features</li>
              <li>Generated tutorial images and AI tracing results</li>
              <li>Images, screenshots, or recordings you choose to save on your device</li>
              <li>Feedback you submit about an AI-generated result, such as a rating</li>
              <li>Reports you submit about an AI-generated result: the reason you choose, an optional note, the related request, and the app version</li>
            </ul>
            <p className={textStyles}>
              Camera tracing, screen tracing, and tracing video recordings
              operate on your device. A photo or image is uploaded to
              our backend and AI service providers only when you choose a feature
              that requires cloud or AI processing.
            </p>

            <Subheading>B. Onboarding responses</Subheading>
            <p className={textStyles}>We collect onboarding responses such as:</p>
            <ul className={listStyles}>
              <li>How you discovered Sketch Steps</li>
              <li>Your drawing goals and experience level</li>
              <li>Your biggest drawing challenge</li>
              <li>Preferred drawing styles</li>
              <li>Focus categories</li>
            </ul>
            <p className={textStyles}>
              Earlier versions of the App asked for an age-range selection.
              Historical responses from those versions may remain in our records,
              but current versions no longer ask this question.
            </p>

            <Subheading>C. Identifiers and account information</Subheading>
            <p className={textStyles}>We may process:</p>
            <ul className={listStyles}>
              <li>An anonymous Sketch Steps user ID generated by the App</li>
              <li>A RevenueCat app user ID used for purchases and entitlements</li>
              <li>Account and authentication identifiers</li>
              <li>If you use Google Sign-In on Android, information made available through your Google account, such as your email address, display name, and profile image</li>
            </ul>
            <p className={textStyles}>
              The iOS version may be used without creating a traditional login
              account. Features and account options may differ by platform.
            </p>

            <Subheading>D. Purchases, subscriptions, and wallet information</Subheading>
            <p className={textStyles}>We may process:</p>
            <ul className={listStyles}>
              <li>Subscription and entitlement status</li>
              <li>Product identifiers</li>
              <li>Purchase transaction identifiers and purchase events</li>
              <li>Subscription and purchased coin balances</li>
              <li>Coin grants, spending, and refund ledger entries</li>
              <li>Information required to verify, restore, and prevent duplicate purchases</li>
            </ul>
            <p className={textStyles}>
              Payment card or bank account details are processed by the relevant
              app store. We do not receive your full payment card or bank account
              information.
            </p>

            <Subheading>E. Usage, diagnostics, and technical information</Subheading>
            <p className={textStyles}>
              We may collect limited information needed to operate and improve the App, including:
            </p>
            <ul className={listStyles}>
              <li>Feature interactions and event names</li>
              <li>Screens or feature sources associated with an event</li>
              <li>Session and generation request identifiers</li>
              <li>App version and build number</li>
              <li>App language, device region, and app-store country</li>
              <li>AI job status, error codes, and refund status</li>
              <li>Technical request information that our infrastructure may automatically process, such as IP address and request metadata</li>
              <li>Crash reports, such as stack traces, device model, operating-system version, app version, and app state at the time of a crash</li>
            </ul>
            <p className={textStyles}>
              Product-usage events (for example screens and paywalls viewed,
              plans selected, generations started or completed, and app opens)
              are processed by PostHog together with the anonymous Sketch Steps
              user ID. Purchase and subscription events from RevenueCat may be
              linked to these events through the same identifier. Crash reports
              are processed by Google Firebase Crashlytics and do not include a
              user identifier.
            </p>
            <p className={textStyles}>
              We do not use this information for third-party advertising, and we
              do not use it to track you across apps or websites owned by other companies.
            </p>

            <Subheading>F. Customer support information</Subheading>
            <p className={textStyles}>
              If you contact us, we may process your email address, the contents
              of your message, attachments you provide, and your Sketch Steps
              Support ID so we can investigate and respond to your request.
            </p>

            <Subheading>G. Device permissions</Subheading>
            <p className={textStyles}>Depending on the features you choose, the App may request access to:</p>
            <ul className={listStyles}>
              <li>The camera, for capturing images and for camera tracing</li>
              <li>The microphone, only if you choose to record a tracing video with sound; the recording stays on your device</li>
              <li>The photo library, for importing or saving images, screenshots, or recordings</li>
            </ul>
            <p className={textStyles}>You can manage these permissions in your device settings.</p>
          </PolicySection>

          <PolicySection number="2" title="How We Use Information">
            <p className={textStyles}>We use information to:</p>
            <ul className={listStyles}>
              <li>Provide drawing, tracing, camera, AI Loomis, and AI tracing features</li>
              <li>Upload and process images when you request an AI feature</li>
              <li>Generate, deliver, and recover AI results</li>
              <li>Operate accounts, subscriptions, purchases, coin balances, and restores</li>
              <li>Verify purchase entitlements and prevent duplicate or unauthorized coin grants</li>
              <li>Process appropriate coin refunds after failed AI requests</li>
              <li>Move your subscription and coin balances to your new App identity when you restore purchases on a new device or after reinstalling</li>
              <li>Review reported AI results to improve quality and enforce our rules</li>
              <li>Remember settings, favorites, onboarding progress, and locally saved content</li>
              <li>Measure feature usage and improve the App</li>
              <li>Diagnose errors, protect the App, prevent abuse, and maintain reliability</li>
              <li>Respond to support and privacy requests</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </PolicySection>

          <PolicySection number="3" title="AI Features and Image Processing">
            <p className={textStyles}>
              Sketch Steps provides AI-powered features, including AI Loomis
              tutorial generation and AI tracing style generation.
            </p>
            <p className={textStyles}>
              Before your first AI generation, the App asks for your explicit
              permission to send the photo you select to our third-party AI
              service providers. Nothing is uploaded for AI processing until you
              allow it. You can withdraw this permission at any time in the
              App&apos;s Settings under Privacy; the App will then ask again
              before the next AI generation.
            </p>
            <p className={textStyles}>When you choose to use an AI feature:</p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-7 text-muted marker:font-semibold marker:text-accent sm:text-base">
              <li>The image you select is uploaded to private cloud storage associated with an anonymous or account identifier.</li>
              <li>Our backend creates and tracks a generation request.</li>
              <li>The image and instructions needed to fulfill the request may be sent to third-party AI infrastructure providers, including fal.ai and AI models made available through it, such as models from OpenAI or Google depending on the selected style, and, for certain image-analysis workflows, Google Gemini.</li>
              <li>The generated result is returned to the App and may be stored in our backend to support delivery, reliability, and result recovery.</li>
            </ol>
            <p className={textStyles}>
              We delete the photo you uploaded from our storage within one hour
              after the request finishes, and in any case no later than seven
              days after upload. How long each kind of AI data is kept is
              described in Data Retention below.
            </p>
            <p className={textStyles}>
              Each AI result has a Report option. If you report a result, we
              store your report and may review the result and the related images
              to improve quality and to enforce our rules and the rules of our
              AI providers.
            </p>
            <p className={textStyles}>
              AI providers may apply automated safety checks and may reject
              content that violates their rules. AI-generated results may be
              inaccurate, unexpected, or similar to content generated for others.
            </p>
            <p className={textStyles}>
              We do not use images submitted to AI features for advertising.
              Third-party providers process submitted content under their
              applicable terms, privacy policies, and our service arrangements with them.
            </p>
          </PolicySection>

          <PolicySection number="4" title="Where Information Is Stored">
            <Subheading>On your device</Subheading>
            <p className={textStyles}>The App may store information locally, including:</p>
            <ul className={listStyles}>
              <li>Onboarding selections and completion state</li>
              <li>Language and feature settings</li>
              <li>Favorites and review-prompt state</li>
              <li>Pending AI-generation recovery information</li>
              <li>Saved Loomis tutorials</li>
              <li>Saved AI-generated tracing references</li>
            </ul>
            <p className={textStyles}>
              The anonymous Sketch Steps user ID is stored using secure device
              storage, such as the iOS Keychain. Depending on operating-system
              behavior, this identifier may persist across App launches and may
              sometimes remain after the App is reinstalled.
            </p>
            <p className={textStyles}>
              Using <strong className="font-semibold text-foreground">Reset App Data</strong> removes the local categories listed in the
              confirmation shown by the App. It does not by itself erase backend
              purchase, wallet, ledger, generation, or other operational records.
            </p>
            <Subheading>In our backend</Subheading>
            <p className={textStyles}>We use Supabase infrastructure for services such as:</p>
            <ul className={listStyles}>
              <li>Anonymous and authenticated user records</li>
              <li>Onboarding and product-usage events</li>
              <li>Wallet and coin ledgers</li>
              <li>Subscription and purchase processing</li>
              <li>AI-generation job records</li>
              <li>Source-image and generated-result storage used by AI features</li>
              <li>Reports you submit about AI results</li>
            </ul>
            <Subheading>Purchase and platform services</Subheading>
            <p className={textStyles}>
              Apple, Google Play, and RevenueCat process information needed to
              complete purchases, verify entitlements, and support purchase restoration.
            </p>
          </PolicySection>

          <PolicySection number="5" title="Service Providers">
            <p className={textStyles}>We use service providers to operate the App, including:</p>
            <ul className={listStyles}>
              <li><ProviderLink href="https://supabase.com/privacy">Supabase</ProviderLink> for database, backend functions, authentication, and storage</li>
              <li><ProviderLink href="https://www.revenuecat.com/privacy-policy/">RevenueCat</ProviderLink> for subscription and in-app purchase management</li>
              <li><ProviderLink href="https://www.apple.com/legal/privacy/">Apple</ProviderLink> for App Store distribution, StoreKit purchases, and platform services</li>
              <li><ProviderLink href="https://policies.google.com/privacy">Google</ProviderLink> for Google Sign-In, Google Play services, and certain Gemini-powered image-analysis workflows</li>
              <li><ProviderLink href="https://fal.ai/legal/privacy-policy">fal.ai</ProviderLink> for AI generation infrastructure, including models from <ProviderLink href="https://openai.com/policies/privacy-policy/">OpenAI</ProviderLink> and Google made available through it</li>
              <li><ProviderLink href="https://posthog.com/privacy">PostHog</ProviderLink> (EU cloud) for product analytics: in-app usage events, the app version, device language and region, and the anonymous Sketch Steps user ID. We do not send your name, email address, or photos to PostHog, and IP addresses are not stored</li>
              <li><ProviderLink href="https://firebase.google.com/support/privacy">Google Firebase Crashlytics</ProviderLink> for crash reporting and diagnostics</li>
            </ul>
            <p className={textStyles}>
              These providers may process information on our behalf as needed to
              provide their services. They may also process certain information
              under their own terms and privacy policies.
            </p>
          </PolicySection>

          <PolicySection number="6" title="How We Share Information">
            <p className={textStyles}>
              We do not sell your personal information. We do not share personal
              information for cross-context behavioral advertising.
            </p>
            <p className={textStyles}>We may share information:</p>
            <ul className={listStyles}>
              <li>With service providers that help us operate the App, process purchases, store data, provide support, or deliver AI features</li>
              <li>When you direct us to do so or consent to a feature that requires the sharing</li>
              <li>When required by law, legal process, or an enforceable government request</li>
              <li>To protect users, our rights, or the security and integrity of the App</li>
              <li>In connection with a merger, acquisition, financing, reorganization, or sale of business assets, subject to appropriate safeguards</li>
            </ul>
          </PolicySection>

          <PolicySection number="7" title="Purchases, Coins, and AI Failures">
            <p className={textStyles}>
              We use anonymous or authenticated identifiers, purchase events,
              wallet balances, generation request IDs, and ledger records to
              operate coin-based features safely.
            </p>
            <p className={textStyles}>
              If an AI request fails before a successful result is completed,
              our backend may restore the coin used for that request when
              appropriate. If generation completed successfully but a later
              download, device-storage, or display problem occurs, the coin may
              remain consumed while the App attempts to preserve access to the completed result.
            </p>
          </PolicySection>

          <PolicySection number="8" title="Data Retention">
            <p className={textStyles}>
              We retain information for as long as reasonably necessary for the purposes described in this Policy, including to:
            </p>
            <ul className={listStyles}>
              <li>Provide and recover requested AI results</li>
              <li>Maintain wallet, subscription, and purchase integrity</li>
              <li>Prevent duplicate transactions and generation requests</li>
              <li>Investigate errors, fraud, abuse, and support issues</li>
              <li>Satisfy accounting, legal, and regulatory obligations</li>
            </ul>
            <p className={textStyles}>For AI features we use these retention periods:</p>
            <ul className={listStyles}>
              <li>Photos you upload for AI generation: deleted from our storage within one hour after the request finishes, and no later than seven days after upload</li>
              <li>AI Loomis tutorial results: kept in our private storage for 90 days so you can recover them, then deleted</li>
              <li>Generated outputs held by our AI infrastructure provider (fal.ai): we request automatic deletion after one day for AI Loomis results and after seven days for AI tracing results</li>
              <li>Photos and instructions sent to AI providers for processing are handled under the providers&apos; own terms and retention practices</li>
              <li>AI job records (status, style, timestamps, coin use) and result reports: kept while needed to operate the service, handle support and refunds, and prevent abuse</li>
            </ul>
            <p className={textStyles}>
              Purchase, coin-ledger, and fraud-prevention records may be retained
              longer where reasonably necessary.
            </p>
            <p className={textStyles}>
              Content saved only on your device remains there until you delete
              it, reset applicable App data, or remove it through operating-system
              controls. Removing the App does not necessarily remove every
              identifier held in secure device storage or records held by our service providers.
            </p>
            <p className={textStyles}>
              When information is no longer reasonably needed, we may delete or
              de-identify it, subject to technical, legal, accounting,
              fraud-prevention, and backup requirements.
            </p>
          </PolicySection>

          <PolicySection number="9" title="Your Choices and Privacy Rights">
            <p className={textStyles}>You may:</p>
            <ul className={listStyles}>
              <li>Choose not to use AI features if you do not want an image uploaded and processed by AI providers</li>
              <li>Withdraw your AI processing permission in the App&apos;s Settings under Privacy</li>
              <li>Report an AI-generated result that is inappropriate or inaccurate</li>
              <li>Deny or revoke camera, microphone, and photo-library permissions in device settings</li>
              <li>Reset supported categories of local App data</li>
              <li>Restore eligible purchases through the App</li>
              <li>Delete an authenticated Android account using the account-deletion option in Settings</li>
              <li>Contact us to request access to, correction of, or deletion of personal information associated with you</li>
            </ul>
            <p className={textStyles}>
              Because iOS may use an anonymous identifier rather than a login,
              include the <strong className="font-semibold text-foreground">Support ID</strong> shown in the App&apos;s Settings when making a
              privacy request. We may ask for reasonable verification before
              fulfilling a request. Some records may need to be retained where
              permitted or required for purchases, accounting, security, fraud prevention, or legal compliance.
            </p>
            <p className={textStyles}>
              Depending on where you live, you may also have rights to object to
              or restrict processing, receive a portable copy of certain
              information, withdraw consent, or appeal a decision concerning a
              privacy request. You may have the right to complain to your local data-protection authority.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Legal Bases for Processing">
            <p className={textStyles}>Where applicable law requires a legal basis, we process information:</p>
            <ul className={listStyles}>
              <li>To perform our contract with you and provide features you request</li>
              <li>With your consent, including the permission the App asks for before sending a photo to AI providers, and device permissions you grant</li>
              <li>For legitimate interests such as securing, maintaining, analyzing, and improving the App, provided those interests are not overridden by your rights</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className={textStyles}>
              You may withdraw consent where processing is based on consent, but
              this does not affect processing that occurred before withdrawal.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Children’s Privacy">
            <p className={textStyles}>
              Sketch Steps is not directed to children under 13, and we do not
              knowingly collect personal information from children under 13.
              Users who have not reached the age of digital consent where they
              live should use the App only with authorization from a parent or legal guardian.
            </p>
            <p className={textStyles}>
              Certain third-party AI services may impose additional age
              requirements. Users must meet the age requirements applicable to
              the services and features they use. If you believe a child has
              provided personal information without appropriate authorization,
              contact us so we can review and, where appropriate, delete it.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Security">
            <p className={textStyles}>
              We use reasonable administrative, technical, and organizational
              safeguards designed to protect information processed through Sketch
              Steps. These measures include private backend storage and
              server-side controls for AI requests, purchases, and coin accounting.
              However, no method of storage, transmission, or processing is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection number="13" title="International Processing">
            <p className={textStyles}>
              Information may be processed in countries other than the country
              where you live, including countries where our service providers
              operate. Where required, we rely on appropriate legal mechanisms
              and safeguards for international transfers.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Changes to This Privacy Policy">
            <p className={textStyles}>
              We may update this Privacy Policy to reflect changes to the App,
              our providers, or applicable requirements. We will update the date
              at the top of this page and, where appropriate, provide additional
              notice in the App or by other reasonable means.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Contact Us">
            <p className={textStyles}>For privacy questions or requests, contact:</p>
            <address className="not-italic">
              <p className="font-semibold text-foreground">Sketch Steps</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`mt-1 inline-block rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
              >
                {SUPPORT_EMAIL}
              </a>
            </address>
            <p className={textStyles}>
              When contacting us about an anonymous iOS record, include the
              Support ID shown in Sketch Steps Settings so we can locate the relevant record.
            </p>
          </PolicySection>
        </article>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-sm text-muted sm:px-6 md:flex-row md:text-left lg:px-8">
          <BrandLogo />
          <p>© {new Date().getFullYear()} Sketch Steps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
