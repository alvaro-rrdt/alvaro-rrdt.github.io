# alvaro-rrdt · personal website

Personal site of **Alvaro Riccardi**, software engineer focused on platform
engineering with a practical cybersecurity edge.

Built with Astro 7, Tailwind CSS v4 and TypeScript. Static output, zero
standalone JavaScript: interactivity is small inline scripts only.

## Documentation

| File | Purpose |
|---|---|
| `HANDOFF.md` | Full project state, conventions, pending work, gotchas |
| `CONTENT-GUIDE.md` | How to add posts, projects, screenshots, publish the CV |
| `AGENTS.md` | Working rules for AI agents |

## Commands

```bash
astro dev --background   # dev server at localhost:4321 (background mode)
npm run build            # production build into dist/
npx astro check          # type check
npm run new:post "Title" [category]   # scaffold a blog post draft
```
