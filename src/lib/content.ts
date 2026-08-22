import { getCollection } from "astro:content";

/**
 * All published posts, newest first.
 * In production, drafts are excluded. During `astro dev` drafts are
 * included so you can preview writing in progress.
 */
export async function getPosts() {
  const posts = await getCollection("blog");
  const visible = import.meta.env.DEV
    ? posts
    : posts.filter((post) => !post.data.draft);

  return visible.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
