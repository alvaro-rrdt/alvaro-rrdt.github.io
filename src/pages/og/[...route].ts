import { OGImageRoute } from "astro-og-canvas";
import { getPosts } from "@/lib/content";
import { SITE } from "@/config";

/**
 * Build-time OG image generation (satori -> static PNGs, no runtime JS).
 *
 * One default image for the site, plus one per blog post rendered from
 * its title. BaseHead picks the right one per page, so every shared
 * link renders an image card. Single emerald accent, matching the site.
 */
const posts = await getPosts();

/** pages map: slug -> source data (title/subtitle), rendered below */
const pages: Record<string, { title: string; subtitle: string }> = {
  default: {
    title: SITE.name,
    // OG cards are shared artifacts: always English
    subtitle: SITE.jobTitle.en,
  },
  ...Object.fromEntries(
    posts.map((post) => [
      post.id,
      {
        title: post.data.title,
        subtitle:
          post.data.category === "security"
            ? "security write-up"
            : post.data.category === "platform"
              ? "platform war story"
              : "writing",
      },
    ]),
  ),
};

// OGImageRoute() is async: awaiting it is required, destructuring the
// raw Promise yields undefined exports.
export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  // Slugs must carry the extension so emitted files match referenced paths
  // (default is /src/pages-relative, wrong for a bare map like ours).
  getSlug: (slug) => `${slug}.png`,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.subtitle,
    bgGradient: [
      [13, 13, 16],
      [24, 24, 27],
    ],
    border: {
      color: [52, 211, 153],
      side: "block-start",
      width: 12,
    },
    padding: 72,
    font: {
      title: {
        color: [244, 244, 245],
        size: 64,
        families: ["JetBrains Mono"],
      },
      description: {
        color: [113, 113, 122],
        families: ["JetBrains Mono"],
      },
    },
  }),
});
