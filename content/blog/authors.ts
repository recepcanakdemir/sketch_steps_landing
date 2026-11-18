import type { Author } from "@/lib/blog/types";

/**
 * Article authors. Add a real person only with their name as they want it
 * shown (and their consent). Never invent personas or credentials.
 */
export const AUTHORS: Record<string, Author> = {
  team: { kind: "organization", name: "Sketch Steps Team" },
};
