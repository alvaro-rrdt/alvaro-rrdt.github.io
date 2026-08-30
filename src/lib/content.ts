import { getCollection } from "astro:content";

/**
 * All published English posts, newest first.
 * In production, drafts are excluded. During `astro dev` drafts are
 * included so you can preview writing in progress. Translated posts
 * (locale es/it, sibling files like `slug.es.md`) render on the locale
 * blog routes, never in the English listing.
 */
export async function getPosts() {
  const posts = await getCollection("blog");
  const english = posts.filter((post) => post.data.locale === "en");
  const visible = import.meta.env.DEV
    ? english
    : english.filter((post) => !post.data.draft);

  return visible.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Rough reading time in minutes from a raw markdown body.
 * Shared by the post page header and the listing meta lines.
 */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
