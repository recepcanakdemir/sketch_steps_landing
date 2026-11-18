import type { Article } from "@/lib/blog/types";

import howToDrawAFace from "./how-to-draw-a-face";

/**
 * Published blog articles. To add one:
 *
 * 1. Create content/blog/<article-id>/ with index.ts (see docs/blog.md for a
 *    template) and put its images in public/blog/<article-id>/.
 * 2. Import it below and add it to ARTICLES.
 *
 * The build checks every article (required fields, dates, slugs, image files,
 * related ids) and fails with a clear message if something is wrong.
 */
export const ARTICLES: Article[] = [howToDrawAFace];
