import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getPosts } from "@/lib/content";
import { SITE } from "@/config";

/**
 * Full-content feed: subscribers read the whole post in their reader
 * instead of bouncing through a click. content:encoded is the standard
 * channel for this; description stays as the summary.
 */
export async function GET(context: APIContext) {
  const posts = await getPosts();
  const container = await AstroContainer.create();

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content);
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        categories: [post.data.category, ...post.data.tags],
        link: `/blog/${post.id}/`,
        content: html,
      };
    }),
  );

  return rss({
    title: `${SITE.name} · writing`,
    description: SITE.description.en,
    site: context.site ?? new URL(SITE.url),
    items,
  });
}
