import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "@/lib/content";
import { SITE } from "@/config";

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: `${SITE.name} · writing`,
    description: SITE.description,
    site: context.site ?? new URL(SITE.url),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category, ...post.data.tags],
      link: `/blog/${post.id}/`,
    })),
  });
}
