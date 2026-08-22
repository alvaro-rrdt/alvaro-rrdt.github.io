// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(deploy phase): confirm final origin AND whether a `base` is needed
  // (required when serving from a project subdirectory on github.io).
  // If base gets added, prefix every internal link with import.meta.env.BASE_URL.
  site: 'https://alvaro-rrdt.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
