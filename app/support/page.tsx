import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LifeBuoy } from "lucide-react";

const SUPPORT_EMAIL = "support@sketchsteps.app";
const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
const textStyles = "text-sm leading-7 text-muted sm:text-base";
const listStyles =
  "mt-2 list-disc space-y-2 pl-6 text-sm leading-7 text-muted marker:text-accent sm:text-base";
const linkStyles = `rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent ${focusStyles}`;

export const metadata: Metadata = {
  title: {
    absolute: "Support | Sketch Steps",
  },
  description:
    "Help for the Sketch Steps app: contact, coins and subscriptions, refunds, restoring purchases, and deleting your data.",
  alternates: {
    canonical: "/support",
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

function Topic({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={id}
      className="rounded-[28px] border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 id={id} className="text-xl font-semibold tracking-normal sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyles}>
      {children}
    </a>
  );
}

export default function SupportPage() {
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
        <section className="px-5 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4f5] text-accent">
              <LifeBuoy className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-[54px]">
              Sketch Steps Support
            </h1>
            <p className="mt-5 text-base font-medium text-muted sm:text-lg">
              Help for Sketch Steps on iPhone, iPad and Android.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl space-y-6 px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <section
            aria-labelledby="contact"
            className="rounded-[28px] border border-border bg-[#fffafb] p-6 sm:p-8"
          >
            <h2 id="contact" className="text-xl font-semibold tracking-normal sm:text-2xl">
              Contact us
            </h2>
            <p className={`mt-4 ${textStyles}`}>
              Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className={linkStyles}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p className={`mt-3 ${textStyles}`}>To help us find your record quickly, please include:</p>
            <ul className={listStyles}>
              <li>
                Your <strong className="font-semibold text-foreground">Support ID</strong>, shown in
                the app under Settings
              </li>
              <li>Whether you use iPhone, iPad or Android, and the app version shown in Settings</li>
              <li>What happened and, if you can, a screenshot</li>
            </ul>
            <p className={`mt-3 ${textStyles}`}>
              In the app you can also open Settings and choose Contact Support, which starts an
              email with your Support ID already filled in.
            </p>
          </section>

          <Topic id="coins" title="Coins and generations">
            <p className={textStyles}>
              Each AI generation (a Loomis drawing guide or an AI tracing image) uses one coin.
              Tracing with your own photos and the ready-made templates does not use coins.
            </p>
            <ul className={listStyles}>
              <li>
                Subscription coins come with Sketch Steps Pro. Weekly and monthly plans go back to
                30 every week and unused coins do not roll over; yearly plans give one allowance for
                the whole year. They end when Pro ends.
              </li>
              <li>
                Purchased coins come from coin packs. They never expire and stay yours even if Pro
                ends. Subscription coins are used first.
              </li>
            </ul>
          </Topic>

          <Topic id="failed" title="A generation failed or looks wrong">
            <p className={textStyles}>
              If a generation fails, the coin is returned automatically. If a result arrives but is
              inappropriate or clearly wrong, use Report on the result, or email us with your
              Support ID.
            </p>
            <p className={textStyles}>
              From version 2.0 you can leave the screen while a result is being created. It appears
              on Home and in My Generations when it is ready, and results are kept there for 90
              days.
            </p>
          </Topic>

          <Topic id="restore" title="Restore purchases or use Pro on another device">
            <p className={textStyles}>
              Open Settings and choose Restore Purchases, or use Restore on the subscription
              screen. On iPhone and iPad, use the same Apple Account you bought with. On Android,
              sign in with the same Google account.
            </p>
          </Topic>

          <Topic id="cancel" title="Cancel a subscription">
            <p className={textStyles}>
              Subscriptions are managed by the store you bought from. Deleting the app does not
              cancel a subscription.
            </p>
            <ul className={listStyles}>
              <li>
                iPhone and iPad: Settings app, your name, Subscriptions, Sketch Steps.{" "}
                <ExternalLink href="https://support.apple.com/en-us/118428">
                  Apple&apos;s instructions
                </ExternalLink>
              </li>
              <li>
                Android: Google Play, your profile, Payments and subscriptions, Subscriptions.{" "}
                <ExternalLink href="https://support.google.com/googleplay/answer/7018481">
                  Google&apos;s instructions
                </ExternalLink>
              </li>
            </ul>
          </Topic>

          <Topic id="refunds" title="Refunds">
            <p className={textStyles}>
              Payments are handled by Apple and Google, and refunds are decided by them.
            </p>
            <ul className={listStyles}>
              <li>
                App Store:{" "}
                <ExternalLink href="https://reportaproblem.apple.com">
                  reportaproblem.apple.com
                </ExternalLink>
              </li>
              <li>
                Google Play:{" "}
                <ExternalLink href="https://support.google.com/googleplay/answer/2479637">
                  Google Play refund policies and requests
                </ExternalLink>
              </li>
            </ul>
            <p className={textStyles}>
              If something went wrong with a purchase in the app, for example coins did not arrive,
              email us with your Support ID and we will look into it.
            </p>
          </Topic>

          <Topic id="data" title="Delete your data or account">
            <ul className={listStyles}>
              <li>
                Android: delete your account in the app under Settings, or on the{" "}
                <Link href="/account-deletion" className={linkStyles}>
                  account deletion page
                </Link>
                .
              </li>
              <li>
                iPhone and iPad: there is no login. Reset App Data in Settings clears what is
                stored on the device. To delete the records linked to your anonymous ID on our
                servers, email us with your Support ID.
              </li>
              <li>From version 2.0 you can delete a single AI result in My Generations at any time.</li>
            </ul>
            <p className={textStyles}>
              Details are in the{" "}
              <Link href="/ios-privacy-policy" className={linkStyles}>
                iOS Privacy Policy
              </Link>{" "}
              and the{" "}
              <Link href="/android-privacy-policy" className={linkStyles}>
                Android Privacy Policy
              </Link>
              .
            </p>
          </Topic>
        </article>
      </main>
    </div>
  );
}
