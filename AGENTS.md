# Project brief for AI agents

Read `HANDOFF.md` first: it contains the full project state, conventions,
pending work, and gotchas. `CONTENT-GUIDE.md` covers the publish workflow.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Non-negotiables

- Version control goes through GitButler (`but`), one dedicated branch per session.
- No em-dashes anywhere in user-facing copy or comments. The owner considers them AI slop.
- Static first: inline scripts only, no framework islands, no standalone .js files in dist/.
- Gates before committing: `npx astro check` (0 errors) and `npm run build` both clean.
- Commit at natural feature boundaries with descriptive messages.

## Documentation

Full Astro documentation: https://docs.astro.build
