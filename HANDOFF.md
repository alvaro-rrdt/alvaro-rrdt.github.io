# HANDOFF: Alvaro Riccardi personal site

Last updated: 2026-08-23. Read this before changing anything.

## What this is

A personal site for **Alvaro Riccardi**, positioned as:
"Software Engineer · Platform Engineering · Security-Minded".

Audience and goal: recruiters at FAANG-class software roles and platform
engineering roles at top startups/scaleups. The HackTheBox security journey
(certs, labs) is a differentiator, not a separate career track.

Live URL: https://alvaro-rrdt.github.io (user-site repo, root serving).
Authoring stays local: pushes go to a private Forgejo (`origin`) which push-
mirrors to the public GitHub repo; GitHub Actions builds and deploys.

## Stack

Astro 7.2 (static output), Tailwind CSS v4 via `@tailwindcss/vite`
(CSS-first config, no tailwind.config), TypeScript strict, zero framework
islands. Fonts self-hosted via Fontsource variable packages
(Inter + JetBrains Mono). Sitemap integration. No standalone .js files ship:
all interactivity is small inline scripts.

## State: DONE

Everything below is implemented and committed on GitButler branch
`portfolio-build` (stack of commits on top of the Astro scaffold):

- Homepage sections in order: Hero (CSS typing effect, availability badge,
  fast-forward links) → build-time StatusStrip (inert until STATUS_URL set in
  config.ts) → About → Projects → Architecture (hand-drawn SVG homelab
  topology) → Writing preview → Experience timeline → Security track
  (HTB learning + Pro Labs columns) → CertBoard → Skills → Beyond (human
  section) → Testimonials (auto-hides while collection is empty) → Footer.
- Unified blog at /blog with categories: `platform` posts get postmortem
  chrome (severity/TTR chips), `security` posts get dossier chrome (machine,
  difficulty, os, techniques, spoiler banner). Category listing pages,
  reading time, TOC (desktop sidebar + mobile details), prev/next cards,
  copy buttons on code blocks, Shiki theme github-dark-dimmed.
- Content collections: blog, experience (+ deep-dive pages /experience/[slug]),
  projects (+ /projects/[slug]), testimonials. Schemas in src/content.config.ts.
- /cv: native HTML CV rendered from site data (paper-sheet styling on dark),
  print button with dedicated print stylesheet; download button appears only
  when CV_PDF_READY is true in src/data/cv.ts.
- /uses page (gear list), themed 404, RSS at /rss.xml, sitemap-index + robots.txt.
- Scroll UX: top reading-progress bar site-wide (rendered from BaseLayout),
  desktop section rail with active-section tracking, scroll-reveal on home
  sections.
- Global chrome: Header (nav, ⌘K, theme toggle, CV link) and Footer render
  from BaseLayout on every page, marked no-print so /cv prints clean.
  Section links in shared chrome must use "/#anchor" form so they resolve
  off the homepage.
- Blog category chips are links to /blog/category/[category]; post rows use
  a stretched-link pattern (row goes to the post, chip goes to the category).
- Placeholder gating: data values containing "TODO" are filtered at render
  (security stats/study list, CV education, /uses items), same idea as the
  empty testimonials section. Replace the TODO text to publish a block.
  The hero pdf button and BaseHead og:image/twitter:image are gated the same
  way, by CV_PDF_READY and SITE.ogImage respectively.
- Experience entries whose summary says "details coming soon" render without
  a summary line (homepage, /experience, /cv); fill the frontmatter to show.
- Project cards hide the screenshot block until `screenshot:` frontmatter
  resolves to a real file, and show "write-up in progress" instead of the
  read link while the body carries the "Write-up in progress" stub marker.
- Footer ends with a contact band (email CTA) and links /uses; the ⌘K
  palette trigger relabels to "search" on touch devices (keyboard hint
  line hidden there too).
- Mobile chip strip is context-aware: homepage shows section chips, all
  other pages show page chips (home/blog/cv/uses) so posts never yank
  readers to homepage anchors. Desktop nav keeps section links everywhere.
- Shareability: OG images generated at build time by astro-og-canvas
  (src/pages/og/[...route].ts): /og/default.png for the site plus one card
  per post (/og/<post id>.png), emerald platform / amber security accent.
  BaseHead emits the full tag set (og:image dimensions/alt,
  article:published_time and article:author on posts). Icons: apple-touch-icon
  (180), icon-192/512, maskable 512 in public/site.webmanifest, favicon.svg
  dark + favicon-light.svg light via prefers-color-scheme.
- Mobile fixes: palette input is 16px (no iOS focus zoom) with
  autocapitalize none / enterkeyhint go; opening it locks body scroll and
  sets main.inert; header controls are min-h-11 tap targets; viewport-fit
  cover + safe-area padding keeps the chip strip clear of notches.
- Hero CTAs are View CV + [email] only; socials are a quiet mono text row
  (full set lives in footer/CV/contact band).
- Visual system: sections are numbered (01-09) and accent-coded (emerald =
  platform track: projects/architecture, amber = security track:
  security/certs, neutral otherwise) via Section props (accent, index, wash).
  Cards share one elevation language (border-zinc-700/60 + shadow-sm, lift +
  shadow-lg on hover); chips/controls stay quiet (zinc-800). The hero has a
  terminal-window visual (keep its whitespace-pre lines under ~32 chars or
  they clip on small phones) and one accent word in the tagline. A subtle
  fixed film-grain layer (.grain in global.css, print-excluded) and a
  security-track amber glow add depth. Reveal cascades: [data-stagger]
  containers stagger direct children, [data-reveal-delay] fades after N ms.
- ⌘K command palette site-wide (pages/sections/posts, keyboard nav, focus trap).
- Light mode: toggle persists to localStorage, applied pre-paint. Works by
  overriding `--color-zinc-*` and accent vars under :root[data-theme="light"]
  (Tailwind v4 utilities consume those variables directly).
- SEO: per-page titles/descriptions, canonical, OG/Twitter tags, JSON-LD
  Person site-wide and Article on posts, sitemap, robots.txt.
- A11y: skip link, focus-visible ring, aria labels, reduced-motion handling,
  AA contrast for both accents in both themes.
- Public email in footer/CV/palette/JSON-LD. Public GitHub mirror link
  (SOURCE_REPO_URL in config.ts).

## Conventions (do not break)

1. Copy rule: NO em-dashes anywhere (owner treats them as AI slop). Use
   commas, colons, periods, parentheses.
2. Personal data lives in `src/config.ts`; certs in `src/data/certs.ts`;
   HTB/security data in `src/data/security.ts`; skills in `src/data/skills.ts`;
   CV extras in `src/data/cv.ts`. Components read from these, never hardcode.
3. Dark is default. To add colors that must work in both themes, use existing
   zinc/platform/security utilities; if you need new raw hexes, add light-mode
   overrides in global.css under `:root[data-theme="light"]`.
4. Interactivity pattern: `<script is:inline>` delegated listeners or small
   observers, progressive enhancement only (anchors/forms must work without JS).
5. Blog drafts (`draft: true`) are visible during `astro dev` but excluded
   from production builds (helper: `src/lib/content.ts` getPosts()).
6. Gates before every commit: `npx astro check` clean AND `npm run build`
   clean AND `find dist -name '*.js' | wc -l` still returns 0.
7. Commits via GitButler on branch `portfolio-build`. Dev server via
   `astro dev --background`.
8. Never ship visible TODO placeholder strings: components filter them at
   render (see SecurityTrack, cv, uses). New placeholder data must follow
   the same filter pattern until real values land. The same goes for
   "details coming soon" experience summaries and "Write-up in progress"
   project bodies: gate them, never render them as final copy.

## PENDING (needs the owner, then quick builds)

1. Blog post bodies (3 seeded stubs) and experience deep-dive prose.
   Owner prefers an interview flow: ask questions, shape answers into pages.
2. Project screenshots: drop files into `src/assets/projects/`, reference via
   `screenshot: filename.png` frontmatter. Cards auto-use them (glob + astro:assets).
3. HTB numbers in `src/data/security.ts`: machines owned, challenges solved,
   rank, and the current machine/module once practice starts. CJCA progress
   is real (31.8%, 5/20 modules, completed module list); update as you go.
   Pro labs are honestly "planned" (none started).
4. Education + language levels for /cv in `src/data/cv.ts`; updated public/cv.pdf;
   flip CV_PDF_READY when done (enables both the /cv download button and the
   hero pdf button).
5. Testimonials: awaiting quotes from Saab/Zinco colleagues; files go in
   `src/content/testimonials/`.
6. Uptime Kuma status URL into STATUS_URL (config.ts) to activate StatusStrip.
7. DONE 2026-08-23: OG images now generate at build time (astro-og-canvas).
   Optional owner polish: tweak title/subtitle styling in
   src/pages/og/[...route].ts if the default look is not to taste.
8. Display-name check: "Alvaro Riccardi" used everywhere; confirm spelling/accent.

## DEPLOY (pipeline added 2026-08-25, owner setup steps pending)

Done:
- Decisions: user-site repo `alvaro-rrdt.github.io` (root serving, no `base`,
  no link prefixing) + Forgejo push mirror for sync.
- `.github/workflows/deploy.yml`: push to main -> astro check -> build via
  withastro/action@v6 -> deploy-pages@v5. Manual workflow_dispatch enabled.
- robots.txt sitemap URL fixed to root; SOURCE_REPO_URL points at
  https://github.com/alvaro-rrdt/alvaro-rrdt.github.io.
- Landing flow: finished work is landed on main with
  `but land <top-branch> --whole-stack` (fast-forwards origin/main).

Owner setup steps (one-time):
1. GitHub: RENAME the existing mirrored repo
   `alvaro-rrdt/Personal-website` to `alvaro-rrdt.github.io`
   (Settings -> General -> Repository name; keeps history and settings,
   old URLs redirect). Then Settings -> Pages -> Source: GitHub Actions.
2. Forgejo: point the existing push mirror at the new name:
   https://github.com/alvaro-rrdt/alvaro-rrdt.github.io.git
   (edit it, or delete + re-add; keep sync-on-commit enabled; reuse the
   PAT, but if sync starts failing 403 after the rename, re-issue it).
3. Click Synchronize Now. The mirror fast-forwards main from the scaffold
   commit to the full history, Actions builds, site goes live at
   https://alvaro-rrdt.github.io.
Renaming the Forgejo repo itself is optional; names do not need to match.
If renamed, update the local remote URL to the new Forgejo path.

## Gotchas

- Deploy builds from main only. Stack branches mirror to GitHub but never
  deploy; land with `but land <top-branch> --whole-stack` to ship.
- The Forgejo push mirror runs on a PAT. If deploys stop, check the mirror
  status in Forgejo first (expired token is the usual cause).
- Everything pushed to Forgejo becomes public via the mirror; the repo is
  intentionally public source, so keep secrets out.
- Custom domain later: add a CNAME file in public/ + DNS records + update
  `site` in astro.config.mjs and SITE.url in src/config.ts. Root serving
  means no base refactor ever.
- TypeScript is pinned to ^6: TS 7 breaks @astrojs/check
  (assertCompatibleTypeScript throws). Revisit when Astro supports it.
- Palette/BaseLayout inline scripts re-initialize on full page loads only.
  If Astro view transitions get added later, rewire them to `astro:page-load`.
- The testimonials glob loader parses every .md in its folder: do not put
  READMEs inside collection directories.
- ProjectCard image prop expects awaited ImageMetadata from import.meta.glob
  (see Projects.astro resolveImage).
- HTB rules: write-ups only for retired machines, spoiler banner required,
  never exam content (CJCA/CDSA/CPTS exams).

## Key files map

```
src/config.ts            identity, socials, email, cv path, status URL
src/content.config.ts    collection schemas
src/lib/content.ts       getPosts() (draft-aware)
src/data/{certs,security,skills,cv}.ts
src/components/          one component per homepage section + shared UI
src/pages/               index, blog/*, experience/*, projects/[slug],
                         cv, uses, rss.xml.ts, 404
src/styles/global.css    fonts, tokens, light-mode overrides, reveal,
                         scrollbars, print styles
scripts/new-post.mjs     npm run new:post "Title" [category]
CONTENT-GUIDE.md         how the owner publishes content
```
