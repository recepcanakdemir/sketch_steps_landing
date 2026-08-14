import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, ShieldAlert, Trash2 } from "lucide-react";

const SUPPORT_EMAIL = "support@sketchsteps.app";
const SUPPORT_SUBJECT = "Sketch Steps Account Deletion Request";
const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUPPORT_SUBJECT)}`;
const GOOGLE_PLAY_SUBSCRIPTIONS_URL =
  "https://play.google.com/store/account/subscriptions";

export const metadata: Metadata = {
  title: {
    absolute: "Delete Your Sketch Steps Account",
  },
  description:
    "Learn how to permanently delete your Sketch Steps account and associated data.",
  alternates: {
    canonical: "/account-deletion",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const deletionSteps = [
  "Open Sketch Steps",
  "Go to Settings",
  "Under Account, tap Delete Account",
  "Review the information and confirm deletion",
  "Reauthenticate with your current Google account",
];

const deletedData = [
  "Sketch Steps account and Supabase authentication record",
  "Server-side coin wallet and transaction history",
  "Onboarding profile and account preferences",
  "AI generation records and feedback",
  "Uploaded source images and generated account files",
  "Associated RevenueCat customer record",
];

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

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

export default function AccountDeletionPage() {
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
              <Trash2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Account &amp; data
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-[54px]">
              Delete Your Sketch Steps Account
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Sketch Steps users can permanently delete their account and the
              server data associated with it. Account deletion is irreversible
              and cannot be undone.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-6 px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <section
            aria-labelledby="delete-in-app"
            className="rounded-[28px] border border-border bg-white p-6 shadow-premium sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              In-app deletion
            </p>
            <h2
              id="delete-in-app"
              className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl"
            >
              Delete your account in Sketch Steps
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
              Follow these steps while signed in to the account you want to
              delete:
            </p>
            <ol className="mt-7 grid gap-3 sm:grid-cols-2">
              {deletionSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-[20px] bg-neutral-50 p-4 text-sm font-medium leading-6 sm:text-base"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-accent shadow-sm">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="no-access"
            className="rounded-[28px] border border-[#f2d9dc] bg-[#fff4f5] p-6 sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-accent shadow-sm">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2
              id="no-access"
              className="mt-5 text-2xl font-semibold tracking-normal sm:text-3xl"
            >
              Can&apos;t access the app?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
              Email us from the Google email address used for your Sketch Steps
              account. This helps us identify the correct account and process
              your deletion request securely.
            </p>
            <a
              href={SUPPORT_MAILTO}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-accent transition hover:-translate-y-0.5 hover:bg-[#d92f3e] sm:w-auto ${focusStyles}`}
            >
              Request account deletion
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section
              aria-labelledby="data-deleted"
              className="rounded-[28px] border border-border bg-white p-6 shadow-sm sm:p-8"
            >
              <h2
                id="data-deleted"
                className="text-2xl font-semibold tracking-normal"
              >
                Data that will be deleted
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted sm:text-base">
                {deletedData.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="local-data"
              className="rounded-[28px] border border-border bg-neutral-50 p-6 sm:p-8"
            >
              <h2
                id="local-data"
                className="text-2xl font-semibold tracking-normal"
              >
                Data stored on your device
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
                Drawings stored locally on your device and images saved to your
                device gallery are not part of your server account. If you want
                to remove them, delete them directly from your device and photo
                gallery.
              </p>
            </section>
          </div>

          <section
            aria-labelledby="subscription-warning"
            className="rounded-[28px] border border-amber-200 bg-amber-50 p-6 sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2
              id="subscription-warning"
              className="mt-5 text-2xl font-semibold tracking-normal sm:text-3xl"
            >
              Cancel your Google Play subscription separately
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
              Deleting your Sketch Steps account does not automatically cancel
              an active Google Play subscription. Open Google Play Store →
              Payments &amp; subscriptions → Subscriptions and cancel your
              subscription there.
            </p>
            <a
              href={GOOGLE_PLAY_SUBSCRIPTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-100 sm:w-auto ${focusStyles}`}
            >
              Manage Google Play subscriptions
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </section>

          <section
            aria-labelledby="retention"
            className="rounded-[28px] border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2
              id="retention"
              className="text-2xl font-semibold tracking-normal sm:text-3xl"
            >
              Data retention after deletion
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
              <p>
                After deletion, we do not retain your email address, raw user
                UUID, or accessible profile data.
              </p>
              <p>
                We may retain only an irreversible hash record for security,
                fraud prevention, and to prevent a deleted account from being
                recreated accidentally through a webhook.
              </p>
              <p>
                Purchase records that must be retained by law may be stored for
                the period required under applicable regulations.
              </p>
              <p className="font-semibold text-foreground">
                Account deletion is permanent and cannot be reversed.
              </p>
            </div>
          </section>

          <section className="py-8 text-center" aria-labelledby="contact-us">
            <h2
              id="contact-us"
              className="text-2xl font-semibold tracking-normal"
            >
              Need help?
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Contact the Sketch Steps support team at
            </p>
            <a
              href={SUPPORT_MAILTO}
              className={`mt-2 inline-block rounded-sm text-base font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`}
            >
              {SUPPORT_EMAIL}
            </a>
          </section>
        </div>
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
