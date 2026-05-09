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

## Personal GitHub setup (one-time)

This repo is pushed using the **personal** GitHub account (`Emmanuelcik`), not the work account. The work SSH key is `~/.ssh/id_ed25519` and must NOT authenticate personal repos.

1. Create a personal SSH key (skip if you already have one):

   ```bash
   ssh-keygen -t ed25519 -C "jesusemmcik@gmail.com" -f ~/.ssh/id_ed25519_personal
   ```

2. Add the public key to <https://github.com/settings/keys> on the personal account.

3. Configure an SSH host alias in `~/.ssh/config`:

   ```sshconfig
   Host github.com-personal
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_ed25519_personal
     IdentitiesOnly yes
   ```

4. When you `git init` this repo, set the user identity locally so commits aren't attributed to the work email:

   ```bash
   git init
   git config user.name "Jesús Emmanuel López Guerrero"
   git config user.email "jesusemmcik@gmail.com"
   git remote add origin git@github.com-personal:Emmanuelcik/portfolio.git
   ```

5. Verify:

   ```bash
   ssh -T git@github.com-personal       # should greet you as Emmanuelcik
   git config user.email                # should print jesusemmcik@gmail.com
   ```

## Performance & SEO baseline

- Static pages, zero client JS by default. Islands hydrated only when needed.
- Self-hosted variable fonts with `font-display: swap` and preload of the primary face.
- View Transitions for soft route changes; `prefers-reduced-motion` honored throughout.
- Sitemap with hreflang, JSON-LD `Person` schema, OG/Twitter tags, canonical URLs.
- Targeted Lighthouse scores: 95+ Performance, 100 SEO/Best Practices/Accessibility.
