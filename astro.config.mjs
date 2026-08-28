// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Confirmed 2026-08-25: user-site repo alvaro-rrdt.github.io, served from
  // the site root, so no `base` is needed and root-relative links are fine.
  site: 'https://alvaro-rrdt.github.io',
  // English stays at the root (all pre-i18n URLs unchanged); Spanish and
  // Italian live under /es and /it. Static output means no server-side
  // language detection: switching happens through the header toggle.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Muted greys that sit well inside zinc-900 code panels
      theme: 'github-dark-dimmed',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
