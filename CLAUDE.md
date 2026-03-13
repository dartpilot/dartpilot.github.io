# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

dartpilot.dev — The official website for the dartpilot open-source organization, built with Astro 6.0. It showcases Flutter/Dart enterprise templates and tools. The site is fully static with zero client-side API calls (GitHub data is fetched at build time).

- **Astro:** 6.0 | **Node.js:** >=22.12 | **Tailwind CSS:** v4
- **Deployment:** GitHub Pages via GitHub Actions (auto-deploys on push to `main`, plus daily rebuild at 06:00 UTC for fresh GitHub stats)
- **Site URL:** https://dartpilot.dev

## Common Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build locally
```

There are no lint, format, or test commands configured. Use `npm run build` to validate changes (type errors and broken imports will fail the build).

## Architecture

### Tech Stack
- **Astro 6.0** — Static output, zero-JS-by-default, file-based routing
- **Tailwind CSS v4** — CSS-first config via `@theme` tokens in `src/styles/global.css`
- **MDX** — Blog content via Astro content collections
- **astro-icon** — Icon sets: `lucide` and `simple-icons` (via Iconify)
- **Astro Fonts API** — Inter (body, `--font-inter`) + JetBrains Mono (code, `--font-mono`) via fontsource

### Layout Chain
All pages follow: **Page** → `PageLayout.astro` → `BaseLayout.astro`
- `BaseLayout.astro` — HTML shell, SEO meta, OG tags, JSON-LD, theme FOUC prevention script, `<ClientRouter />` for view transitions
- `PageLayout.astro` — Wraps BaseLayout with Navbar + Footer + skip-nav link + `<main id="main-content">`

### Path Aliases (tsconfig.json)
- `@/*` → `src/*`
- `@components/*`, `@layouts/*`, `@lib/*`, `@data/*`, `@i18n/*` — corresponding `src/` subdirectories

### Dark Mode
- Toggle stored in `localStorage` key `"theme"`, class `"dark"` on `<html>`
- Inline script in BaseLayout prevents FOUC by reading localStorage before paint
- CSS uses `.dark` parent selector pattern (e.g., `.dark body`, `.dark .glass`)

### Design Tokens
Defined as `@theme` in `src/styles/global.css`:
- **Colors:** Zinc scale (50–950) + Indigo accent (400/500/600)
- **Utility classes:** `.glass` (glassmorphism), `.hero-gradient` / `.hero-gradient-light`, animation classes (`.animate-fade-in-up`, `.animate-fade-in`, `.animate-slide-in-left`) with `.delay-{100-600}` stagger

### i18n
- Default locale: `en` (no URL prefix). Future: `tr` (prefix `/tr/`)
- Translation helper: `t('dotted.key', locale)` from `src/i18n/utils.ts` — supports nested keys and `{param}` interpolation
- `getLocale(url)` extracts locale from URL pathname
- All user-facing strings in components use i18n keys from `src/i18n/en.json` / `tr.json`
- Navigation labels in `src/lib/constants.ts` are i18n keys (e.g., `'nav.projects'`), resolved via `t()` at render time

### Content Collections
- Blog posts: `src/content/blog/*.mdx`
- Schema in `src/content.config.ts`: `title`, `description`, `date`, `author`, `tags[]`, `ogImage?`, `draft` (boolean)
- Uses Astro's `glob` loader pattern
- RSS feed generated at `/rss.xml`

### GitHub API Integration
- `src/lib/github.ts` fetches repo stats and contributors at **build time**
- Optional `GITHUB_TOKEN` env var avoids rate limiting
- Gracefully returns zeros/empty arrays on failure

### Client-Side JS
Minimal — only these interactive behaviors:
- `ScrollReveal` component: IntersectionObserver triggers CSS animations, re-inits on `astro:after-swap` (view transitions)
- Theme toggle (localStorage persistence)
- Mobile menu
- Screenshot showcase tabs

### Key Data Files
- `src/lib/constants.ts` — Site metadata, nav links, stats, platform list
- `src/data/projects.ts` — Project catalog (typed `Project[]` interface)
- `src/lib/utils.ts` — `formatDate()`, `readingTime()`, `cn()` class joiner
