# alvaro-rrdt · personal website

Personal site of **Alvaro Riccardi**, software engineer focused on platform
engineering with a practical cybersecurity edge.

Live at **https://alvaro-rrdt.github.io**. Every push that lands on `main`
is checked, built and deployed automatically by GitHub Actions.

Built with Astro 7, Tailwind CSS v4 and TypeScript. Static output, zero
standalone JavaScript: interactivity is small inline scripts only.

## Documentation

| File | Purpose |
|---|---|
| `HANDOFF.md` | Full project state, conventions, pending work, gotchas |
| `CONTENT-GUIDE.md` | Where each piece of content lives, how to publish it |
| `AGENTS.md` | Working rules for AI agents |

## One-time setup

Requires Node.js 22.12+ and npm.

```bash
git clone <forgejo-url-or-github-mirror>
cd portfolio-website          # or alvaro-rrdt.github.io, wherever you cloned
npm install
```

Version control goes through **GitButler** (`but`), not raw git write
commands. After a fresh clone, activate the GitButler workspace once:

```bash
but setup
```

## The workflow, start to finish

Every session that changes the site follows these five steps. Each command
below is exact and copy-pasteable.

### 1. See where things stand

```bash
but status                    # branches, commits, anything uncommitted
npx astro dev --background    # start dev server at http://localhost:4321
npx astro dev status          # already running? this confirms it
npx astro dev logs --follow   # watch dev server output (Ctrl+C only stops following)
```

The dev server compiles on save and hot-reloads the browser: start it once,
then just edit. Two dev-only behaviors to know:

- Blog posts with `draft: true` ARE visible in dev but excluded from
  production builds.
- The dev server is not the deploy artifact. To verify exactly what will
  ship, see step 3.

### 2. Make changes

Edit files. Content work (posts, projects, CV, certs, skills) usually means
markdown in `src/content/` or data files in `src/data/`; see
`CONTENT-GUIDE.md`. Code work means `src/` components and pages.

### 3. Run the gates (all three must pass)

```bash
npx astro check                  # type check: must report 0 errors
npm run build                    # production build: must succeed
find dist -name '*.js' | wc -l   # must print 0: no standalone JS ships
```

The CI deploy runs the same checks, so a failure here would block deploy
later anyway. To eyeball the real build in a browser:

```bash
npx astro preview --background   # serves dist/ at http://localhost:4321
npx astro preview stop           # then restart the dev server for step 2
```

### 4. Commit through GitButler

```bash
but diff                                  # review changes, note file IDs
but commit -b portfolio-build -m "feat: describe the change"   # all changes
but commit -b portfolio-build -m "feat: describe the change" <id> <id>   # selected files only
```

- `-b portfolio-build` targets that branch and creates it if it does not
  exist. Use any branch name you like; one branch per topic keeps history
  clean.
- IDs come from the left edge of `but diff` output (for example `ky:3`).
  Whole changed files can be named by their file ID, no hunk IDs needed.
- Commits sit on your local stack. Nothing is public or deployed yet.

Optional: back up work-in-progress to Forgejo (does NOT deploy, deploys
only happen from `main`):

```bash
but push portfolio-build
```

Fix a local mistake before shipping:

```bash
but undo                      # reverts the last GitButler operation
```

### 5. Ship it: land on main (this triggers the deploy)

```bash
but land portfolio-build                 # land one branch on main and push
but land portfolio-build --whole-stack   # when branches are stacked
```

Landing fast-forwards Forgejo `main` and pushes it. From there everything
is automatic: the Forgejo push mirror syncs GitHub, Actions runs the
checks, builds, deploys, and one to two minutes later the change is live
at https://alvaro-rrdt.github.io

Confirm it happened: GitHub repo, Actions tab, latest
"Deploy to GitHub Pages" run green.

## Quick reference

| Goal | Command |
|---|---|
| Start dev server (background) | `npx astro dev --background` |
| Dev server state | `npx astro dev status` |
| Watch dev logs | `npx astro dev logs --follow` |
| Stop dev server | `npx astro dev stop` |
| Type check | `npx astro check` |
| Production build | `npm run build` |
| Serve the build locally | `npx astro preview --background` |
| Stop preview | `npx astro preview stop` |
| Workspace overview | `but status` |
| Review changes with IDs | `but diff` |
| Commit all changes | `but commit -b portfolio-build -m "message"` |
| Push WIP branch (no deploy) | `but push portfolio-build` |
| Ship: land on main | `but land portfolio-build` |
| Undo last GitButler action | `but undo` |
| Update workspace from main | `but pull` |

## Troubleshooting

- **Site did not update after landing**: check the Actions tab first (red
  run means checks or build failed), then the push mirror status in Forgejo
  (an expired mirror token silently stops syncing).
- **Styled locally but broken live**: almost always the repo name. The site
  builds for root serving, so the GitHub repo must be named exactly
  `alvaro-rrdt.github.io`.
- **Draft posts appearing/disappearing**: `draft: true` posts show in dev
  only. That is expected, not a bug.
