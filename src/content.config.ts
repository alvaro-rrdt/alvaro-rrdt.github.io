import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Unified writing space. `platform` posts render postmortem chrome,
 * `security` posts render dossier chrome (see PostHeader.astro).
 *
 * HTB policy: only write up RETIRED machines, never exam content.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(["platform", "security", "dev"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Postmortem chrome (category: platform) */
    severity: z.string().optional(),
    timeToResolve: z.string().optional(),
    /** Dossier chrome (category: security) */
    machine: z.string().optional(),
    difficulty: z.string().optional(),
    os: z.string().optional(),
    techniques: z.array(z.string()).default([]),
    spoiler: z.boolean().default(false),
  }),
});

/** One entry per employer; `order` ascending = most recent first. */
const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string().optional(),
    order: z.number(),
    award: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    repoUrl: z.url().optional(),
    /**
     * File name inside src/assets/projects/ (e.g. "homelab.png").
     * Optional: cards fall back to a terminal-styled placeholder.
     */
    screenshot: z.string().optional(),
    order: z.number(),
    synced: z.boolean().default(false),
    track: z.enum(["platform", "security"]).default("platform"),
  }),
});

/** Reader quotes, shown on the homepage only when entries exist. */
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    order: z.number(),
  }),
});

export const collections = { blog, experience, projects, testimonials };
