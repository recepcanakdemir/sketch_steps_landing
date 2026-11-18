import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { BlogCta } from "@/components/blog/blog-shell";
import { InlineText } from "@/components/blog/inline-text";
import { headingId } from "@/lib/blog/text";
import type { Block, BlogImage } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/**
 * Renders an article body. Typography is set here (no typography plugin):
 * ~68 characters per line, 17-18px text, generous spacing, rounded display
 * font for headings.
 */
export async function ArticleBody({ blocks }: { blocks: Block[] }) {
  const t = await getTranslations("Blog.article");

  return (
    <div className="text-[17px] leading-8 text-ink/90 sm:text-lg sm:leading-[1.8]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mt-6 text-pretty first:mt-0">
                <InlineText text={block.text} />
              </p>
            );
          case "heading": {
            const id = block.id ?? headingId(block.text, index);
            return block.level === 2 ? (
              <h2
                key={index}
                id={id}
                className="mt-14 scroll-mt-6 text-balance font-display text-[26px] font-extrabold leading-tight text-ink first:mt-0 sm:text-[32px]"
              >
                <InlineText text={block.text} />
              </h2>
            ) : (
              <h3
                key={index}
                id={id}
                className="mt-10 scroll-mt-6 text-balance font-display text-xl font-bold leading-snug text-ink sm:text-2xl"
              >
                <InlineText text={block.text} />
              </h3>
            );
          }
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={cn(
                  "mt-6 space-y-2 pl-6 marker:font-bold marker:text-crimson",
                  block.ordered ? "list-decimal" : "list-disc",
                )}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ListTag>
            );
          }
          case "image":
            return <ArticleFigure key={index} image={block.image} caption={block.caption} />;
          case "steps":
            return (
              <ol key={index} className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {block.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card"
                  >
                    {step.image ? (
                      <div className="flex justify-center bg-white px-2 pt-2 sm:px-3 sm:pt-3">
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          width={step.image.width}
                          height={step.image.height}
                          sizes="(min-width: 1024px) 240px, 45vw"
                          className="h-auto w-full rounded-2xl"
                          style={{ maxWidth: step.image.width }}
                        />
                      </div>
                    ) : null}
                    <div className="flex items-start gap-2 p-3 sm:gap-3 sm:p-4">
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-crimson font-display text-sm font-extrabold text-white sm:h-8 sm:w-8"
                      >
                        {stepIndex + 1}
                      </span>
                      <div className="min-w-0 text-[15px] leading-6 sm:text-base sm:leading-7">
                        <p className="font-display font-bold text-ink">
                          <span className="sr-only">{t("step", { step: stepIndex + 1 })}: </span>
                          <InlineText text={step.title} />
                        </p>
                        {step.text ? (
                          <p className="mt-1 text-ink-soft">
                            <InlineText text={step.text} />
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "tip":
            return (
              <aside
                key={index}
                className="mt-8 rounded-3xl border border-sun/40 bg-peach/60 px-5 py-4 sm:px-6"
              >
                <p className="font-display text-base font-extrabold text-ink">
                  {block.title ?? t("tip")}
                </p>
                <p className="mt-1 text-base leading-7">
                  <InlineText text={block.text} />
                </p>
              </aside>
            );
          case "appCta":
            return (
              <BlogCta
                key={index}
                title={t("ctaTitle")}
                body={t("ctaBody")}
                location="blog_inline"
                className="my-10"
              />
            );
        }
      })}
    </div>
  );
}

export function ArticleFigure({
  image,
  caption,
  priority = false,
  className,
}: {
  image: BlogImage;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("mt-8", className)}>
      <div className="flex justify-center overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-card">
        {image.framing ? (
          <FramedImage image={image} framing={image.framing} priority={priority} />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={priority}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto max-h-[640px] w-auto max-w-full rounded-[18px] object-contain"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm leading-6 text-ink-soft">
          <InlineText text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * A step image shown in a common frame (same idea as the homepage demo): a
 * uniform scale <= 1 plus a shift, as a CSS transform. The stage keeps the
 * image's natural size and is never wider than the file, so nothing is
 * stretched or enlarged; only blank paper leaves the frame and the gap is
 * filled with the paper colour.
 */
function FramedImage({
  image,
  framing,
  priority,
}: {
  image: BlogImage;
  framing: NonNullable<BlogImage["framing"]>;
  priority: boolean;
}) {
  const x = (framing.x / image.width) * 100;
  const y = (framing.y / image.height) * 100;
  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] bg-[#F4F4F4]"
      style={{
        maxWidth: image.width,
        aspectRatio: `${image.width} / ${image.height}`,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={`${image.width}px`}
        className="object-cover"
        style={{
          transform: `translate(${x.toFixed(2)}%, ${y.toFixed(2)}%) scale(${framing.scale})`,
        }}
      />
    </div>
  );
}
