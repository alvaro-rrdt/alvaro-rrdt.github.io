# HANDOFF: Alvaro Riccardi personal site

Last updated: 2026-09-01. Read this before changing anything.

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
islands. Typography: JetBrains Mono everywhere (Fontsource variable
package, self-hosted; Inter was removed with the minimalist pass).
Sitemap integration. No standalone .js files ship: all interactivity is
small inline scripts.

## State: DONE

Everything below is implemented and committed on GitButler branch
`portfolio-build` (stack of commits on top of the Astro scaffold):

- Homepage sections in order: Hero (name, role line, tagline with one
  accent word, CV + email CTAs, quiet socials row) → build-time
  StatusStrip (inert until STATUS_URL set in config.ts) → About (absorbed
  the old Beyond section) → Selected work (project grid + homelab topology
  as a sub-block; Architecture is now a partial inside Projects) → Writing
  preview → Experience timeline → Security (HTB learning + pro labs cards,
  then CertBoard as a sub-block partial) → Skills ("Toolbox", compact
  two-column lists) → Testimonials (auto-hides while collection is empty)
  → Footer.
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
- /uses page (gear list), /now page (current focus, src/content/now.md),
  themed 404, RSS at /rss.xml, sitemap-index + robots.txt.
- Scroll UX: top reading-progress bar site-wide (rendered from BaseLayout).
  The desktop section rail and scroll-reveal/stagger JS were removed with
  the minimalist pass; content is plain HTML, always visible without JS.
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
- Mobile chip strip was removed with the minimalist pass: the header is a
  single fixed 56px bar on every viewport (wordmark with blinking caret,
  search, theme, cv); section jumping on mobile happens via the palette.
  Desktop nav shows about/work/writing/experience/security everywhere.
- Shareability: OG images generated at build time by astro-og-canvas
  (src/pages/og/[...route].ts): /og/default.png for the site plus one card
  per post (/og/<post id>.png), single emerald accent, JetBrains Mono.
  BaseHead emits the full tag set (og:image dimensions/alt,
  article:published_time and article:author on posts). Icons: apple-touch-icon
  (180), icon-192/512, maskable 512 in public/site.webmanifest, favicon.svg
  dark + favicon-light.svg light via prefers-color-scheme.
- Mobile fixes: palette input is 16px (no iOS focus zoom) with
  autocapitalize none / enterkeyhint go; opening it locks body scroll and
  sets main.inert; header controls are min-h-11 tap targets; viewport-fit
  cover + safe-area padding keeps the fixed bar clear of notches.
- Hero CTAs are View CV + [email] only; socials are a quiet mono text row
  (full set lives in footer/CV/contact band).
- Visual system (minimalist pass, 2026-08-25): JetBrains Mono is the only
  typeface (body 16px, 1.7 leading, prose capped at 62ch). Single emerald
  accent for links, focus, highlights and the header/footer carets; no
  amber anywhere, track identity lives in words not colors. Cards share one
  quiet style (border-zinc-700/60, bg-zinc-900, hover:border-zinc-500), no
  shadows, no hover lift/scale, no glows, no film grain, no dot-grid, no
  typing/ping animations. The one signature animation is the blinking
  caret on the header wordmark. Section shell: eyebrow path + heading,
  no numbers, no underline, no wash bands.
- Mobile pattern (2026-08-25): below sm (640px) card grids become
  borderless divided lists (`grid gap-0 divide-y sm:grid-cols-N
  sm:gap-N sm:divide-y-0`, articles `py-4 ... sm:rounded-xl sm:border
  sm:bg-zinc-900 sm:p-5`), chip rows collapse to plain `a · b · c` text,
  status chips flatten to colored text. Buttons/rows carry active: states
  for touch feedback. Homelab topology is a collapsed <details> on phones,
  auto-opened on md+ by one inline script. New cards/sections MUST follow
  this responsive pattern.
- ⌘K command palette site-wide (pages/sections/posts, keyboard nav, focus trap).
- Light mode: toggle persists to localStorage, applied pre-paint. Works by
  overriding `--color-zinc-*` and accent vars under :root[data-theme="light"]
  (Tailwind v4 utilities consume those variables directly).
- SEO: per-page titles/descriptions, canonical, OG/Twitter tags, JSON-LD
  Person site-wide and Article on posts, sitemap, robots.txt.
- A11y: skip link, focus-visible ring, aria labels, reduced-motion handling,
  AA contrast for both accents in both themes.
- Hero carries a "work in progress" notice at the very top (owner's
  request, honest signal): the portfolio is under active development.
- i18n (2026-08-28): English at the root (all original URLs unchanged),
  Spanish under /es, Italian under /it, via Astro's i18n routing
  (`prefixDefaultLocale: false`, static output, no auto-redirect).
  Locale pages exist for the homepage, the experience section (listing +
  deep dives) and individual blog posts: a post can carry es/it
  translations as sibling files (`slug.es.md` with `locale: es`) served
  at /es/blog/[slug]; the English post links to them ("also in"). Blog
  LISTINGS stay English-only; as do /cv, /uses, /now, projects deep
  dives, RSS, OG images. The header language menu falls back to the
  locale home on untranslated paths. BaseHead emits hreflang + x-default
  alternates only for paths with locale equivalents. 33 pages build.
  Translations are agent-drafted: owner (native ES) should skim the
  Spanish, and review the Italian more carefully.
- Public email in footer/CV/palette/JSON-LD; phone + location (Madrid)
  in config.ts, shown in the hero availability line and on the CV sheet.
  Public GitHub mirror link
  (SOURCE_REPO_URL in config.ts).
- Analytics (2026-09-01): self-hosted Umami, LIVE. Gated constants
  ANALYTICS_SRC + ANALYTICS_WEBSITE_ID in config.ts now point at the
  owner's instance (https://homelab.tailafd118.ts.net:8443/script.js,
  Tailscale Funnel on the homelab; guide: UMAMI.md). BaseHead renders
  the deferred tracker tag (data-domains pins it to the SITE.url hostname
  so localhost never records; data-performance collects CWV), blog posts
  fire a one-shot post_read event at 75% scroll via BaseLayout (payload:
  slug + locale, all locales), and CTAs carry data-umami-event
  attributes: email_click (hero + footer mailto), cv_download (hero +
  /cv pdf buttons), linkedin_click (footer contact band + /now).
  Attributes are inert without the tracker; the read script is a silent
  no-op without window.umami. Window.umami typed in
  src/types/umami.d.ts. Emptying either config value turns analytics
  back off. A heatmap recorder tag (recorder.js, same gating, added
  2026-09-02) feeds the dashboard's Heatmap tab; sample rate lives in
  the Umami website settings, not the repo.

## Conventions (do not break)

1. Copy rule: NO em-dashes anywhere (owner treats them as AI slop). Use
   commas, colons, periods, parentheses.
2. Personal data lives in `src/config.ts`; certs in `src/data/certs.ts`;
   HTB/security data in `src/data/security.ts`; skills in `src/data/skills.ts`;
   CV extras in `src/data/cv.ts`. Components read from these, never hardcode.
3. i18n rule: English is the source of truth. UI chrome strings live in
   `src/i18n/ui.ts` and MUST be added to all three dictionaries at once
   (TypeScript enforces the shape). Personal copy (jobTitle, tagline,
   description, location, availabilityScope) is a locale map in
   `src/config.ts`. Experience translations are sibling files
   (`saab.es.md` with `locale: es` in frontmatter); project summaries use
   optional `summary_es` / `summary_it` frontmatter with English
   fallback. New locale page sections must be added to
   `LOCALIZED_SECTIONS` in `src/i18n/index.ts` or the toggle and
   hreflang will not point at them. /cv, blog posts, OG images and RSS
   stay English-only for now.
4. Dark is default. Single accent: platform emerald (dark #34d399, light
   #059669). To add colors that must work in both themes, use existing
   zinc/platform utilities; if you need new raw hexes, add light-mode
   overrides in global.css under `:root[data-theme="light"]`.
5. Interactivity pattern: `<script is:inline>` delegated listeners or small
   observers, progressive enhancement only (anchors/forms must work without JS).
6. Blog drafts (`draft: true`) are visible during `astro dev` but excluded
   from production builds (helper: `src/lib/content.ts` getPosts()).
7. Gates before every commit: `npx astro check` clean AND `npm run build`
   clean AND `find dist -name '*.js' | wc -l` still returns 0.
8. Commits via GitButler on branch `portfolio-build`. Dev server via
   `astro dev --background`.
9. Never ship visible TODO placeholder strings: components filter them at
   render (see SecurityTrack, cv, uses). New placeholder data must follow
   the same filter pattern until real values land. The same goes for
   "details coming soon" experience summaries and "Write-up in progress"
   project bodies: gate them, never render them as final copy.

## PENDING (needs the owner, then quick builds)

1. Blog post bodies (3 seeded stubs) and experience deep-dive prose.
   Owner prefers an interview flow: ask questions, shape answers into pages.
   NOTE: experience frontmatter (companies, roles, periods, locations,
   summaries, highlights, tech) is REAL, extracted from the Aug 2026 CV;
   only the deep-dive page bodies are still stubs. Saab award is real:
   Best Engineering Internship of the Year, Danish National Academies,
   plus public endorsement from Saab's Head of Platform Engineering.
   Saab context (owner, 2026-08-27): the internship ran in Saab's
   DEPLOYMENT department; his mentor was the system architect and head
   of that department and attended the award ceremony to represent him;
   the internship was the final project of his AP degree in Computer
   Science (Sønderborg, 2.5 years), which came before the Bachelor of
   Software Development (Esbjerg).
2. Project screenshots: drop files into `src/assets/projects/`, reference via
   `screenshot: filename.png` frontmatter. Cards auto-use them (glob + astro:assets).
3. HTB numbers in `src/data/security.ts`: machines owned, challenges solved,
   rank, and the current machine/module once practice starts. CJCA progress
   is real (31.8%, 5/20 modules, completed module list); update as you go.
   Pro labs are honestly "planned" (none started).
4. DONE 2026-08-25: education + language levels filled in src/data/cv.ts
   from the CV (Bachelor of Software Development, Business Academy
   Southwest, 2021 - Oct 2025; Spanish native, English C2/C1, Italian
   learning). Still pending: updated public/cv.pdf and flipping
   CV_PDF_READY (enables the /cv download and hero pdf buttons).
5. Testimonials: awaiting quotes from Saab/Zinco colleagues; files go in
   `src/content/testimonials/`. CV says references available on request,
   including Zinco's CTO and VP of Engineering.
6. Uptime Kuma status URL into STATUS_URL (config.ts) to activate StatusStrip.
7. DONE 2026-08-23: OG images now generate at build time (astro-og-canvas).
   Optional owner polish: tweak title/subtitle styling in
   src/pages/og/[...route].ts if the default look is not to taste.
8. Display-name check: site uses "Alvaro Riccardi"; full legal name is
   "Alvaro Riccardi Roca de Togores" (CV, Aug 2026). Short form is
   intentional for the site; owner to confirm.
9. Saab deep-dive (/experience/saab): add diagrams of the work (VoIP
   failover analysis, load-test results, Active/Active target
   architecture) and photos from the internship (deployment department,
   Sønderborg) and the award ceremony. Owner reminder, 2026-08-27;
   also noted as YAML comments in saab.md frontmatter.
10. DONE 2026-09-01: analytics go-live. Umami deployed on the homelab
   (Docker + Postgres, 2FA on, published via Tailscale Funnel on 8443),
   config values set and landed. Tracker verified present in production
   HTML on every page.

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
1. GitHub: rename the repo so it is EXACTLY `alvaro-rrdt.github.io`
   (GitHub username + .github.io, NO dots in the username part).
   First rename attempt used `alvaro.rm.rdt.github.io` (Forgejo-style
   name with dots): GitHub treats that as a PROJECT site, serving under
   /alvaro.rm.rdt.github.io/ while the build targets the root, so all
   /_astro assets 404 and pages render unstyled (looks like raw
   markdown, but the Actions build+deploy itself worked).
2. After renaming: Settings -> Pages should show Source: GitHub Actions
   (already true, the deploy job succeeded) and the site URL becomes
   https://alvaro-rrdt.github.io.
3. Actions tab -> Deploy to GitHub Pages -> Run workflow (manual run)
   to redeploy the artifact under the root URL.
4. Forgejo: update the push mirror remote URL to
   https://github.com/alvaro-rrdt/alvaro-rrdt.github.io.git
   (renames keep git redirects and the fine-grained PAT bound to the
   repo, so this is hygiene, not a hard requirement).

## CONTACT (simplified 2026-08-29)

The Telegram-bot + Cloudflare-Worker contact form was removed entirely
by owner decision (overengineered; prefers plain contact points).
Deleted: worker/contact/, src/pages/contact.astro, CONTACT_ENDPOINT in
src/config.ts. Contact is now: email button + LinkedIn button in the
footer contact band (LinkedIn URL comes from SOCIALS in config.ts),
plus the LinkedIn link on /now. Do not reintroduce a form.

## Gotchas

- i18n: GitHub Pages serves only the root /404.html, so locale 404s
  would never render; do not create src/pages/es/404.astro. The header
  toggle and hreflang rely on LOCALIZED_SECTIONS: adding a new locale
  section without updating that set leaves the toggle pointing at the
  locale home (safe) but no hreflang. Experience ids carry the locale
  suffix ("saab.es"); always map ids through experienceSlug() when
  building URLs, and keep the "en" locale filter in the English
  experience pages or translated entries leak into English URLs.

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
- Old homepage anchors (#architecture, #certifications, #beyond) were
  removed by the section merge; the topology now lives under #projects and
  certs under #security. Fix any external links pointing at the old ids.
- The testimonials glob loader parses every .md in its folder: do not put
  READMEs inside collection directories.
- ProjectCard image prop expects awaited ImageMetadata from import.meta.glob
  (see Projects.astro resolveImage).
- HTB rules: write-ups only for retired machines, spoiler banner required,
  never exam content (CJCA/CDSA/CPTS exams).

## Key files map

```
src/config.ts            identity, socials, email, cv path, status URL,
                         contact endpoint
src/content.config.ts    collection schemas
src/lib/content.ts       getPosts() (draft-aware)
src/content/now.md       /now page body (edit + bump updated)
src/data/{certs,security,skills,cv}.ts
src/components/          one component per homepage section + shared UI
src/pages/               index, blog/*, experience/*, projects/[slug],
                         cv, uses, now, contact, rss.xml.ts, 404
src/styles/global.css    fonts, tokens, light-mode overrides, reveal,
                         scrollbars, print styles
worker/                   (empty: the contact-form worker was removed)
scripts/new-post.mjs     npm run new:post "Title" [category]
CONTENT-GUIDE.md         how the owner publishes content
UMAMI.md                 analytics: homelab deployment + site wiring guide
```
