# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

dartpilot.dev — The official website for the dartpilot organization, built with Astro 6.0.

- **Astro:** 6.0 | **Node.js:** 22+ | **Tailwind CSS:** v4
- **Deployment:** GitHub Pages via GitHub Actions
- **Line width:** No strict limit (Astro/HTML files)

## Common Commands

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Astro 6.0** — Static-first, zero-JS-by-default
- **Tailwind CSS v4** — CSS-first config with @theme tokens
- **MDX** — Blog content via content collections
- **astro-icon** — Lucide + Simple Icons via Iconify
- **Shiki** — Code syntax highlighting (built-in)

### Project Structure

```
src/
├── components/
│   ├── global/       # Navbar, Footer, ThemeToggle
│   ├── home/         # Hero, StatsBar, FeatureBento, PlatformGrid, etc.
│   ├── projects/     # Project-related components
│   ├── community/    # Contributor components
│   ├── blog/         # Blog components
│   └── ui/           # Button, Card, Badge, SectionHeading, ScrollReveal
├── content/blog/     # MDX blog posts
├── layouts/          # BaseLayout, PageLayout, BlogPostLayout
├── pages/            # Astro pages (file-based routing)
├── i18n/             # Translations (en.json, tr.json) + utils.ts
├── lib/              # Constants, utils, GitHub API helpers
├── data/             # Project metadata
└── styles/           # global.css (Tailwind + design tokens)
```

### Design Tokens
- **Colors:** Zinc scale (from Flutter ThemeColors) + Indigo accent
- **Fonts:** Inter (body) + JetBrains Mono (code) via Astro Fonts API
- **Dark mode:** System default + manual toggle, persisted in localStorage

### i18n
- Default locale: EN (no prefix)
- Future locales: TR (prefix `/tr/`)
- Translation helper: `t('key', locale)` from `src/i18n/utils.ts`

### Content Collections
- Blog posts in `src/content/blog/*.mdx`
- Schema defined in `src/content.config.ts`
- RSS feed at `/rss.xml`

## Key Patterns
- All pages use `PageLayout.astro` (which wraps `BaseLayout.astro`)
- Client-side JS is minimal — scroll reveal, theme toggle, screenshot tabs, mobile menu
- GitHub API data is fetched at build time (zero client-side API calls)
- `ScrollReveal` component handles intersection observer animations
