import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update SITE before deploying. Used for canonical URLs, sitemap, and OG.
const SITE = 'https://emmanuelcik.dev';

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-MX' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: { inlineStylesheets: 'auto' },
});
