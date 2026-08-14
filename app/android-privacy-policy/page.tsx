import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

const SUPPORT_EMAIL = "support@sketchsteps.app";
const ACCOUNT_DELETION_PATH = "/account-deletion";
const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
const textStyles = "text-sm leading-7 text-muted sm:text-base";
const listStyles =
  "mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-muted marker:text-accent sm:text-base";

export const metadata: Metadata = {
  title: {
    absolute: "Android Privacy Policy | Sketch Steps",
  },
  description: "Privacy Policy for the Sketch Steps Android application.",
  alternates: {
    canonical: "/android-privacy-policy",
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

export default function AndroidPrivacyPolicyPage() {
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
              Android application
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-[54px]">
              Sketch Steps Android Privacy Policy
            </h1>
            <p className="mt-5 text-base font-medium text-muted sm:text-lg">
              Effective date: August 14, 2026
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-5xl space-y-6 px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <PolicySection number="1" title="Scope">
            <p className={textStyles}>
              This Privacy Policy applies only to the Sketch Steps Android
              application published under the package name{" "}
              <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.92em] text-foreground">
                com.sketchsteps.app
              </code>
              .
            </p>
            <p className={textStyles}>
              The Sketch Steps iOS application currently uses a different
              account model and is covered by its existing privacy policy. This
              Android Privacy Policy does not replace or modify the iOS privacy
              policy.
            </p>
            <p className={textStyles}>
              In this policy, “Sketch Steps,” “we,” “us,” and “our” refer to the
              provider of the Sketch Steps Android application.
            </p>
          </PolicySection>

          <PolicySection number="2" title="Contact">
            <p className={textStyles}>
              Sketch Steps is responsible for the processing of personal data
              described in this policy.
            </p>
            <p className={textStyles}>
              For privacy questions, data requests, or support, contact:
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className={`inline-block rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
            >
              {SUPPORT_EMAIL}
            </a>
          </PolicySection>

          <PolicySection number="3" title="Information We Collect">
            <Subheading>Account and profile information</Subheading>
            <p className={textStyles}>
              The Android application requires Google Sign-In. When you sign
              in, we may receive and process:
            </p>
            <ul className={listStyles}>
              <li>Your Google account name</li>
              <li>Your email address</li>
              <li>Your Google profile picture, when available</li>
              <li>A Supabase authentication user ID</li>
              <li>
                Internal account identifiers used to connect your account,
                wallet, purchases, and app activity
              </li>
            </ul>
            <p className={textStyles}>
              We do not receive or store your Google password.
            </p>

            <Subheading>Onboarding and personalization information</Subheading>
            <p className={textStyles}>
              We collect the answers you choose to provide during onboarding,
              including:
            </p>
            <ul className={listStyles}>
              <li>How you discovered Sketch Steps</li>
              <li>Your drawing goals</li>
              <li>Your drawing experience level</li>
              <li>Your age range</li>
              <li>Preferred drawing styles</li>
              <li>Subjects or categories you want to focus on</li>
              <li>Onboarding progress and completion status</li>
            </ul>
            <p className={textStyles}>
              We use this information to personalize the app experience and
              preserve your onboarding state across reinstalls and devices.
            </p>

            <Subheading>Photos and user-provided content</Subheading>
            <p className={textStyles}>
              When you choose to use Loomis AI or Trace AI features, you may
              select or capture a photo. The selected photo, cropped version,
              and related processing information may be uploaded to our servers
              and sent to AI processing providers to produce the requested
              drawing guide or transformed image.
            </p>
            <p className={textStyles}>
              Photos are collected only when you choose to use a feature that
              requires them.
            </p>
            <p className={textStyles}>
              Your photos may include images of you or other people. You are
              responsible for ensuring that you have the right and any necessary
              permission to upload and process those images.
            </p>

            <Subheading>AI generation information</Subheading>
            <p className={textStyles}>We may process and store:</p>
            <ul className={listStyles}>
              <li>Uploaded source-image paths</li>
              <li>Generation request identifiers</li>
              <li>Selected generation type or drawing style</li>
              <li>Generation status and timestamps</li>
              <li>Generated images or result references</li>
              <li>Coin usage and refund status associated with a generation</li>
              <li>Feedback or ratings you submit about a generated result</li>
              <li>App version and build number associated with a request</li>
            </ul>
            <p className={textStyles}>
              This information is used to perform AI generation, recover
              interrupted jobs, prevent duplicate charges, provide refunds when
              a generation fails, improve reliability, and respond to support
              requests.
            </p>

            <Subheading>Purchase, subscription, and wallet information</Subheading>
            <p className={textStyles}>
              If you purchase a subscription or coin package, we process
              information such as:
            </p>
            <ul className={listStyles}>
              <li>Product and subscription identifiers</li>
              <li>Purchase and renewal events</li>
              <li>Entitlement and subscription status</li>
              <li>Store transaction identifiers</li>
              <li>Purchase history</li>
              <li>Coin grants</li>
              <li>Subscription and purchased-coin balances</li>
              <li>Coin transaction ledger entries</li>
              <li>Refund, expiration, transfer, and restoration events</li>
            </ul>
            <p className={textStyles}>
              Payments are processed by Google Play. Sketch Steps does not
              receive or store your complete payment-card or bank-account
              information.
            </p>
            <p className={textStyles}>
              RevenueCat helps us manage purchase validation, subscription
              status, entitlements, and purchase restoration.
            </p>

            <Subheading>App interactions</Subheading>
            <p className={textStyles}>
              We may collect app interactions necessary to operate and improve
              the service, including:
            </p>
            <ul className={listStyles}>
              <li>Onboarding progress and selections</li>
              <li>Paywall display, close, and purchase-start states</li>
              <li>Selected subscription plan</li>
              <li>AI generation activity and status</li>
              <li>Feature selections</li>
              <li>Feedback submitted about generated results</li>
              <li>App version, build number, and platform</li>
            </ul>
            <p className={textStyles}>
              Sketch Steps does not use this information for third-party
              advertising.
            </p>

            <Subheading>Data stored locally on your device</Subheading>
            <p className={textStyles}>
              Some data remains on your device, including saved drawings,
              locally exported images, cached working files, favorites, and app
              preferences.
            </p>
            <p className={textStyles}>
              Images or videos that you save to your device gallery are
              controlled through your device and gallery settings. Deleting your
              Sketch Steps account does not automatically remove files stored
              locally on your device.
            </p>
          </PolicySection>

          <PolicySection number="4" title="Camera and Photo Access">
            <p className={textStyles}>
              Sketch Steps may request access to the camera or allow you to
              select media so you can:
            </p>
            <ul className={listStyles}>
              <li>Capture a reference image</li>
              <li>Select a reference image</li>
              <li>Use camera-based drawing or tracing tools</li>
              <li>Save or export an image or video</li>
            </ul>
            <p className={textStyles}>
              Camera previews and locally captured media are not uploaded merely
              because camera access was granted. A selected image is uploaded
              for AI processing only when you choose to start an AI generation
              feature that requires it.
            </p>
            <p className={textStyles}>
              You can manage app permissions through Android system settings.
            </p>
          </PolicySection>

          <PolicySection number="5" title="How We Use Information">
            <p className={textStyles}>We use collected information to:</p>
            <ul className={listStyles}>
              <li>Authenticate users and maintain sessions</li>
              <li>Create and manage Sketch Steps accounts</li>
              <li>
                Restore accounts, wallets, and onboarding state after reinstall
                or device changes
              </li>
              <li>
                Provide Loomis, Trace, camera, drawing, and AI generation
                features
              </li>
              <li>Personalize the app experience</li>
              <li>Process subscriptions and coin purchases</li>
              <li>Maintain server-side coin balances and transaction history</li>
              <li>
                Prevent duplicate grants, duplicate charges, abuse, and fraud
              </li>
              <li>Refund coins when an eligible AI generation fails</li>
              <li>Save generation feedback</li>
              <li>Provide customer support</li>
              <li>Protect the security and integrity of the service</li>
              <li>Comply with applicable legal obligations</li>
              <li>Process account-deletion requests</li>
            </ul>
          </PolicySection>

          <PolicySection number="6" title="Service Providers and Data Processing">
            <p className={textStyles}>
              We use service providers to operate the Android application. They
              process only the information needed to provide their respective
              services.
            </p>
            <p className={textStyles}>These providers include:</p>

            <Subheading>Google</Subheading>
            <p className={textStyles}>
              Google provides Google Sign-In, Google Play distribution, in-app
              purchases, subscription management, and certain AI processing
              functionality.
            </p>

            <Subheading>Supabase</Subheading>
            <p className={textStyles}>
              Supabase provides authentication, database services, server-side
              functions, and storage for account information, wallet records,
              onboarding information, uploaded images, and generation records.
            </p>

            <Subheading>RevenueCat</Subheading>
            <p className={textStyles}>
              RevenueCat processes purchase and subscription events, product
              entitlements, restoration information, and the Sketch Steps
              account identifier used for purchase management.
            </p>

            <Subheading>AI processing providers</Subheading>
            <p className={textStyles}>
              Photos submitted for AI generation may be processed through
              fal.ai and AI model providers made available through that service.
              Depending on the selected feature, processing may include models
              or services provided by OpenAI or Google.
            </p>
            <p className={textStyles}>
              Google Gemini may also be used to analyze an image when required
              by a specific generation feature.
            </p>
            <p className={textStyles}>
              These providers receive the selected image and generation
              instructions necessary to produce the requested output. We do not
              provide your Google password or payment-card details to AI
              providers.
            </p>
            <p className={textStyles}>
              Service providers may process data in countries other than your
              country of residence and under their own security and
              data-processing terms.
            </p>
          </PolicySection>

          <PolicySection number="7" title="Data Sharing and Advertising">
            <p className={textStyles}>We do not sell your personal information.</p>
            <p className={textStyles}>
              We do not share personal information with third parties for
              targeted advertising, cross-app advertising, or independent
              marketing purposes.
            </p>
            <p className={textStyles}>
              Sketch Steps does not display third-party advertising and does not
              use the Android advertising ID.
            </p>
            <p className={textStyles}>
              Information is disclosed to service providers only as needed to
              operate authentication, cloud storage, purchases, subscriptions,
              account security, and AI generation. We may also disclose
              information if required by law or necessary to protect users, our
              rights, or the security of the service.
            </p>
          </PolicySection>

          <PolicySection number="8" title="Data Retention">
            <p className={textStyles}>
              We retain account, wallet, onboarding, generation, and
              purchase-related information for as long as your account remains
              active or as needed to provide the service.
            </p>
            <p className={textStyles}>
              Uploaded source images, generated account files, and associated
              generation records may remain stored until they are deleted
              through account deletion or removed as part of our operational
              cleanup processes.
            </p>
            <p className={textStyles}>
              Locally saved drawings and gallery files remain on your device
              until you delete them.
            </p>
            <p className={textStyles}>
              When an account is deleted, we delete or de-identify the server
              data associated with that account as described on our
              account-deletion page.
            </p>
            <p className={textStyles}>We may retain:</p>
            <ul className={listStyles}>
              <li>
                Records required to comply with legal, tax, accounting,
                fraud-prevention, or transaction-dispute obligations
              </li>
              <li>
                Information retained independently by Google Play or other
                service providers under their own legal obligations
              </li>
              <li>
                A minimal keyed cryptographic hash associated with a deleted
                account
              </li>
            </ul>
            <p className={textStyles}>
              The deletion hash does not contain your email address or raw user
              ID and cannot by itself be used to recover those values. It is
              retained for security, fraud prevention, and to prevent deleted
              account data from being recreated accidentally through delayed
              server events.
            </p>
          </PolicySection>

          <PolicySection number="9" title="Account and Data Deletion">
            <p className={textStyles}>
              You can permanently delete your account from the Android
              application:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-7 text-muted marker:font-semibold marker:text-accent sm:text-base">
              <li>Open Sketch Steps.</li>
              <li>Go to Settings.</li>
              <li>Under Account, select Delete Account.</li>
              <li>Review and confirm the deletion.</li>
              <li>
                Reauthenticate with the Google account currently connected to
                Sketch Steps.
              </li>
            </ol>
            <p className={textStyles}>
              If you cannot access the application, follow the instructions at:
            </p>
            <Link
              href={ACCOUNT_DELETION_PATH}
              className={`inline-block break-all rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
            >
              https://sketchsteps.app/account-deletion
            </Link>
            <p className={textStyles}>
              You may also contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              from the Google email address associated with your account.
            </p>
            <p className={textStyles}>
              Account deletion removes or de-identifies the associated:
            </p>
            <ul className={listStyles}>
              <li>Sketch Steps account</li>
              <li>Supabase authentication record</li>
              <li>Server-side coin wallet and transaction ledger</li>
              <li>Onboarding profile</li>
              <li>AI generation records and feedback</li>
              <li>Uploaded account images and generated account files</li>
              <li>Associated RevenueCat customer record</li>
            </ul>
            <p className={`${textStyles} font-semibold text-foreground`}>
              Account deletion is permanent and cannot be reversed.
            </p>
            <p className={textStyles}>
              Deleting your Sketch Steps account does not automatically cancel
              an active Google Play subscription. Subscriptions must be
              cancelled separately through Google Play.
            </p>
            <p className={textStyles}>
              Account deletion also does not remove drawings, exported images,
              videos, or other files stored locally on your device.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Security">
            <p className={textStyles}>
              We use technical and organizational safeguards designed to
              protect personal information. Data transmitted between the
              Android application and our services is encrypted in transit.
            </p>
            <p className={textStyles}>
              Authentication tokens are used to authorize account-specific
              requests. Financial balances and entitlements are determined by
              server-side records rather than values supplied by the
              application.
            </p>
            <p className={textStyles}>
              No system can guarantee absolute security. You are responsible
              for maintaining the security of your Google account and device.
            </p>
          </PolicySection>

          <PolicySection number="11" title="International Data Processing">
            <p className={textStyles}>
              Our service providers may process information on servers located
              outside your country. Where required, we rely on applicable
              contractual or legal safeguards for international data
              processing.
            </p>
          </PolicySection>

          <PolicySection number="12" title="Your Choices and Rights">
            <p className={textStyles}>
              Depending on where you live, you may have rights to:
            </p>
            <ul className={listStyles}>
              <li>
                Request access to personal information associated with your
                account
              </li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated information</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Contact your local data-protection authority</li>
            </ul>
            <p className={textStyles}>
              You can avoid uploading photos by not using optional AI features
              that require a photo.
            </p>
            <p className={textStyles}>
              You can manage camera and media permissions through Android system
              settings.
            </p>
            <p className={textStyles}>
              To submit a privacy request, contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
              >
                {SUPPORT_EMAIL}
              </a>
              . We may ask you to verify ownership of the relevant Google
              account before fulfilling a request.
            </p>
          </PolicySection>

          <PolicySection number="13" title="Children’s Privacy">
            <p className={textStyles}>
              Sketch Steps is a general-audience creative application and does
              not use personal information for targeted advertising.
            </p>
            <p className={textStyles}>
              If you are below the age at which you can legally consent to data
              processing in your country, you must use Sketch Steps only with
              authorization from a parent or legal guardian where permitted by
              law.
            </p>
            <p className={textStyles}>
              If a parent or guardian believes that a child’s information has
              been collected without the authorization required by applicable
              law, they may contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
              >
                {SUPPORT_EMAIL}
              </a>
              . We will investigate the request and delete the information where
              required.
            </p>
          </PolicySection>

          <PolicySection number="14" title="Changes to This Policy">
            <p className={textStyles}>
              We may update this Privacy Policy when our application, service
              providers, or legal obligations change.
            </p>
            <p className={textStyles}>
              When we make material changes, we will update the effective date
              and provide additional notice when required by law.
            </p>
          </PolicySection>

          <PolicySection number="15" title="Contact Us">
            <p className={textStyles}>
              For privacy questions, account requests, or complaints, contact:
            </p>
            <address className="not-italic">
              <p className="font-semibold text-foreground">Sketch Steps</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className={`mt-1 inline-block rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
              >
                {SUPPORT_EMAIL}
              </a>
            </address>
            <p className={textStyles}>Account deletion instructions:</p>
            <Link
              href={ACCOUNT_DELETION_PATH}
              className={`inline-block break-all rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
            >
              https://sketchsteps.app/account-deletion
            </Link>
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
