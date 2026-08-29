# Content guide

Everything personal or written lives in a few obvious places. Code changes are
rarely needed to publish something new.

## Where things live

| What | Where |
|---|---|
| Name, title, tagline, socials, CV path | `src/config.ts` |
| Blog posts | `src/content/blog/*.md` |
| Work experience deep-dives | `src/content/experience/*.md` |
| Projects | `src/content/projects/*.md` |
| Project screenshots | `src/assets/projects/` |
| Testimonials | `src/content/testimonials/*.md` (section hides while empty) |
| Certification statuses | `src/data/certs.ts` |
| HTB stats, pro labs, current focus | `src/data/security.ts` |
| Skills grid | `src/data/skills.ts` |
| CV page extras (education, languages) | `src/data/cv.ts` |

## Adding a blog post

```bash
npm run new:post "My post title" platform   # or: security, dev
```

Then open the generated file in `src/content/blog/`, write the body in
markdown, and set `draft: false` when it is ready. Drafts never build.

Frontmatter cheat sheet:

| Field | Notes |
|---|---|
| `category` | `platform` gets postmortem chrome, `security` gets dossier chrome |
| `severity`, `timeToResolve` | optional, platform posts only (`SEV-2`, `14h`) |
| `machine`, `difficulty`, `os`, `techniques` | optional, security posts only |
| `spoiler` | shows the spoiler banner on security posts |

Rules for security write-ups: only retired machines, always spoiler banner,
never exam content.

## Adding a project screenshot

1. Drop the file into `src/assets/projects/` (png/jpg/webp/avif)
2. Reference the file name in the project frontmatter:

```yaml
screenshot: my-dashboard.png
```

Cards without a screenshot show a terminal-styled placeholder.

## Publishing the CV

1. Update your details in `src/data/cv.ts` (education, languages)
2. Export `public/cv.pdf`
3. Flip `CV_PDF_READY` to `true` in `src/data/cv.ts`

The `/cv` page renders from site data, so it is always current; the download
button only appears once the PDF exists. The print button produces a clean
paper PDF from the page itself at any time.

## How a change goes live

1. Edit, verify locally (`npx astro check`, `npm run build`)
2. Commit via GitButler on a work branch
3. When the milestone is ready to ship:
   `but land <top-branch> --whole-stack`
4. That lands the stack on main and pushes Forgejo, the mirror syncs to
   GitHub, Actions builds, and https://alvaro-rrdt.github.io updates in a
   minute or two. Nothing deploys until work lands on main.

## Updating /now

Edit `src/content/now.md` (learning / building / aiming for / away from
the keyboard), bump the `updated` date in the frontmatter, ship. Refresh
it whenever something changes; the page is meant to answer "what are you
up to these days".

## Contact

There is no contact form. The site lists the owner's email and LinkedIn
in the footer contact band (both locales' pages included). Recruiters
reach out directly; nothing to deploy or maintain.

## Dev commands

```bash
astro dev --background   # start dev server (already running? it hot-reloads)
npm run build            # production build into dist/
npm run astro check      # type check
npm run new:post "Title" # scaffold a post
```
