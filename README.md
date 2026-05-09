# Portfolio · Jesús Emmanuel López Guerrero

Personal portfolio rebuild in **Astro 5** with View Transitions, bilingual (EN/ES), mobile-first, design-token-driven CSS, and a strong SEO/perf baseline.

## Stack

- [Astro 5](https://astro.build)  static site, zero JS by default
- TypeScript (strict)
- CSS custom properties + Astro scoped styles (no Tailwind)
- View Transitions via `<ClientRouter />`
- `@astrojs/sitemap` for sitemap + hreflang
- Content Collections (Markdown) for `projects`, `experience`, `awards`

## Architecture

```
src/
├── components/{ui,layout,sections,seo}
├── content/{projects,experience,awards}   # Markdown content
├── data/                                  # small static data (socials, etc.)
├── i18n/                                  # ui dict + helpers
├── layouts/                               # BaseLayout
├── pages/                                 # routes (en) + /es/* (Spanish)
├── styles/                                # tokens, reset, typography, animations, global
└── lib/                                   # helpers (added per-feature)
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321 (English) and http://localhost:4321/es/ (Spanish).

## Build

```bash
npm run build      # type-check + build to ./dist
npm run preview    # local preview of the production build
```

## Fonts

The site loads `Geist-Variable.woff2` and `GeistMono-Variable.woff2` from `/public/fonts/`. Download from <https://vercel.com/font> and drop the variable woff2 files in `public/fonts/`. Until they're present, the system fallback in `--font-sans` takes over (with `font-display: swap` so there's no flash blocking).

## i18n

- Default locale: `en` (no prefix → `/`)
- Spanish locale: `/es/*`
- UI strings live in `src/i18n/ui.ts`. Bilingual content fields use `{ en, es }` in the Zod schemas.

## Design tokens

All design decisions live in `src/styles/tokens.css`:
- Color palette · **Aurora Violet** (dark theme by default)
- Fluid type scale (`clamp()`)
- Spacing scale (8px base)
- Radii, shadows, motion easings/durations
- Z-index scale

Adjust there; the rest of the codebase consumes via `var(--token-name)`.

## Performance & SEO baseline

- Static pages, zero client JS by default. Islands hydrated only when needed.
- Self-hosted variable fonts with `font-display: swap` and preload of the primary face.
- View Transitions for soft route changes; `prefers-reduced-motion` honored throughout.
- Sitemap with hreflang, JSON-LD `Person` schema, OG/Twitter tags, canonical URLs.
- Targeted Lighthouse scores: 95+ Performance, 100 SEO/Best Practices/Accessibility.
