import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { ArticleBody, ArticleFigure } from "@/components/blog/article-body";
import { ArticleCard, formatDate } from "@/components/blog/article-card";
import { BlogCta, BlogShell, Breadcrumbs, FixtureNotice } from "@/components/blog/blog-shell";
import { focusRing } from "@/components/home/primitives";
import { localizePath, type Locale } from "@/i18n/config";
import {
  BLOG_PATH,
  blogLanguageHrefs,
  getBlogEntries,
  relatedEntries,
  type BlogEntry,
} from "@/lib/blog";
import { articleStructuredData, blogIndexStructuredData } from "@/lib/blog/seo";
import { readingMinutes } from "@/lib/blog/text";
import { CATEGORY_IDS, type CategoryId } from "@/lib/blog/types";
import { jsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

/** messages key for a category id ("loomis-method" -> "loomisMethod"). */
export const categoryKey = (id: CategoryId) =>
  id.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/** /blog, /es/blog, ...: intro, topic links, articles grouped by topic, CTA. */
export async function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = await getTranslations("Blog");
  const entries = getBlogEntries(locale);
  const topics = CATEGORY_IDS.map((id) => ({
    id,
    label: t(`categories.${categoryKey(id)}`),
    entries: entries.filter((entry) => entry.article.category === id),
  })).filter((topic) => topic.entries.length > 0);
  const hasFixtures = entries.some((entry) => entry.article.fixture);

  return (
    <BlogShell languageHrefs={blogLanguageHrefs()}>
      <JsonLd
        data={blogIndexStructuredData(locale, {
          title: t("index.title"),
          description: t("index.description"),
          home: t("article.home"),
          blog: t("article.blog"),
        })}
      />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        {hasFixtures ? <FixtureNotice /> : null}
        <Breadcrumbs
          label={t("article.breadcrumb")}
          items={[
            { name: t("article.home"), href: localizePath(locale, "/") },
            { name: t("article.blog") },
          ]}
        />
        <header className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-crimson">{t("nav")}</p>
          <h1 className="mt-3 text-balance font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl">
            {t("index.heading")}
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
            {t("index.lead")}
          </p>
        </header>

        {topics.length > 1 ? (
          <nav aria-label={t("index.topics")} className="mt-10">
            <ul className="flex flex-wrap justify-center gap-2">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href={`#${topic.id}`}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-sand hover:bg-cream",
                      focusRing,
                    )}
                  >
                    {topic.label}
                    <span className="text-ink-soft">{topic.entries.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {topics.length === 0 ? (
          <p className="mx-auto mt-12 max-w-xl text-center text-base leading-7 text-ink-soft">
            {t("index.empty")}
          </p>
        ) : (
          topics.map((topic) => (
            <section key={topic.id} aria-labelledby={topic.id} className="mt-14 scroll-mt-6">
              <h2
                id={topic.id}
                className="font-display text-2xl font-extrabold text-ink sm:text-3xl"
              >
                {topic.label}
                <span className="sr-only">: {t("index.count", { count: topic.entries.length })}</span>
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topic.entries.map((entry) => (
                  <ArticleCard key={entry.article.id} entry={entry} categoryLabel={topic.label} />
                ))}
              </div>
            </section>
          ))
        )}

        <BlogCta
          title={t("index.ctaTitle")}
          body={t("index.ctaBody")}
          location="blog_index"
          className="mx-auto mt-16 max-w-3xl"
        />
      </div>
    </BlogShell>
  );
}

/** An article: breadcrumbs, title, meta line, hero, body, CTA, related articles. */
export async function BlogArticlePage({ entry }: { entry: BlogEntry }) {
  const t = await getTranslations("Blog");
  const { translation, locale, article } = entry;
  const category = t(`categories.${categoryKey(article.category)}`);
  const related = relatedEntries(entry);
  const blogHref = localizePath(locale, BLOG_PATH);
  const minutes = readingMinutes(translation.body, locale);

  return (
    <BlogShell languageHrefs={blogLanguageHrefs(article)}>
      <JsonLd
        data={articleStructuredData(entry, {
          home: t("article.home"),
          blog: t("article.blog"),
          section: category,
        })}
      />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        {article.fixture ? <FixtureNotice /> : null}
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            label={t("article.breadcrumb")}
            items={[
              { name: t("article.home"), href: localizePath(locale, "/") },
              { name: t("article.blog"), href: blogHref },
              { name: translation.title },
            ]}
          />
          <header className="mt-8">
            <Link
              href={`${blogHref}#${article.category}`}
              className={cn(
                "inline-flex rounded-full bg-blush px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-crimson",
                focusRing,
              )}
            >
              {category}
            </Link>
            <h1 className="mt-4 text-balance font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl">
              {translation.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-8 text-ink-soft">
              {translation.excerpt ?? translation.description}
            </p>
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-ink-soft">
              <span>{t("article.by", { name: entry.author.name })}</span>
              {translation.publishedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={translation.publishedAt}>
                    {t("article.published", { date: formatDate(translation.publishedAt, locale) })}
                  </time>
                </>
              ) : null}
              {translation.updatedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={translation.updatedAt}>
                    {t("article.updated", { date: formatDate(translation.updatedAt, locale) })}
                  </time>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{t("article.readingTime", { minutes })}</span>
            </p>
          </header>

          <ArticleFigure image={translation.heroImage} priority className="mt-10" />

          <div className="mt-12">
            <ArticleBody blocks={translation.body} />
          </div>

          {/* Skipped when the body already ends with an in-article CTA. */}
          {translation.body.at(-1)?.type !== "appCta" ? (
            <BlogCta
              title={t("article.ctaTitle")}
              body={t("article.ctaBody")}
              location="blog_article"
              className="mt-16"
            />
          ) : null}
        </article>

        {related.length > 0 ? (
          <section aria-labelledby="related" className="mt-20">
            <h2
              id="related"
              className="text-center font-display text-2xl font-extrabold text-ink sm:text-3xl"
            >
              {t("article.related")}
            </h2>
            <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard
                  key={item.article.id}
                  entry={item}
                  categoryLabel={t(`categories.${categoryKey(item.article.category)}`)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-14 text-center">
          <Link
            href={blogHref}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-ink underline decoration-crimson/40 underline-offset-4 transition hover:decoration-crimson",
              focusRing,
            )}
          >
            <span aria-hidden="true">←</span>
            {t("article.backToBlog")}
          </Link>
        </p>
      </div>
    </BlogShell>
  );
}
