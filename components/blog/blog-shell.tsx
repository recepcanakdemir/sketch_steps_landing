import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { SiteFooter } from "@/components/home/closing-sections";
import { SiteHeader } from "@/components/home/hero";
import { focusRing } from "@/components/home/primitives";
import { InAppBrowserNotice, StoreBadges, type CtaLocation } from "@/components/home/store-buttons";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Page frame shared by the blog index and articles: the site header and footer. */
export function BlogShell({
  languageHrefs,
  children,
}: {
  languageHrefs: Partial<Record<Locale, string>>;
  children: React.ReactNode;
}) {
  return (
    <>
      <InAppBrowserNotice />
      <div className="sketchbook-grid bg-cream">
        <SiteHeader onHomePage={false} languageHrefs={languageHrefs} />
        <main className="pb-16 sm:pb-24">{children}</main>
      </div>
      <SiteFooter languageHrefs={languageHrefs} />
    </>
  );
}

/** App Store / Google Play call to action box. */
export function BlogCta({
  title,
  body,
  location,
  className,
}: {
  title: string;
  body: string;
  location: CtaLocation;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-[28px] border border-line bg-white px-6 py-8 text-center shadow-card sm:px-10",
        className,
      )}
    >
      <p className="text-balance font-display text-2xl font-extrabold leading-tight text-ink sm:text-[28px]">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-7 text-ink-soft">{body}</p>
      <StoreBadges size="compact" location={location} className="mt-6" />
    </aside>
  );
}

/** Visible marker on local fixture pages (never shown on real articles). */
export async function FixtureNotice() {
  const t = await getTranslations("Blog.article");
  return (
    <p
      role="note"
      className="mx-auto mb-6 max-w-3xl rounded-2xl border-2 border-dashed border-crimson bg-blush px-4 py-3 text-center text-sm font-bold text-crimson"
    >
      {t("fixture")}
    </p>
  );
}

export function Breadcrumbs({
  label,
  items,
}: {
  label: string;
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label={label} className="text-sm font-semibold text-ink-soft">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex min-w-0 items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-sand">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className={cn("rounded-sm transition hover:text-ink", focusRing)}>
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
