import type { Article } from "@/lib/blog/types";

import howToDrawATurkey from "./how-to-draw-a-turkey";

/**
 * Drafts that can be previewed locally. NOT the public registry
 * (content/blog/index.ts): nothing here is built, listed or indexed unless
 * BLOG_DRAFT_PREVIEW=1 is set on a local machine, and hosted/CI builds
 * (Vercel, CI) ignore that flag. Every translation must stay
 * status: "draft" (the build fails otherwise). See docs/blog.md.
 */
export const DRAFT_ARTICLES: Article[] = [howToDrawATurkey];
