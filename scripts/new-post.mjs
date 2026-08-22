#!/usr/bin/env node
/**
 * Scaffold a new blog post.
 *
 *   npm run new:post "My post title" [platform|security|dev]
 *
 * Creates src/content/blog/<slug>.md with today's date and starter
 * frontmatter, then you write the body. Set draft: true while working;
 * drafts are excluded from builds and listings.
 */
import { existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const [rawTitle, rawCategory = "platform"] = process.argv.slice(2);

if (!rawTitle) {
  console.error('Usage: npm run new:post "Post title" [platform|security|dev]');
  process.exit(1);
}

const category = ["platform", "security", "dev"].includes(rawCategory)
  ? rawCategory
  : (console.error(`Unknown category "${rawCategory}", using "platform".`),
    "platform");

const slug = rawTitle
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .slice(0, 60);

const target = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "blog",
  `${slug}.md`,
);

if (existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const securityExtras = `machine: "TBA (at retirement)"
difficulty: "TBA"
os: "TODO"
techniques: []
spoiler: true`;

const platformExtras = `severity: SEV-3
timeToResolve: "TODO"`;

const frontmatter = `---
title: "${rawTitle}"
description: "One or two sentences describing the read."
pubDate: ${today}
category: ${category}
tags: []
draft: true
${category === "security" ? securityExtras : category === "platform" ? platformExtras : ""}
---

> ✍️ **Draft.** Writing in progress.

`;

writeFileSync(target, frontmatter);
console.log(`Created src/content/blog/${slug}.md`);
console.log("Write the body, set draft: false when ready to publish.");
