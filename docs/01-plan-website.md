# dartpilot.dev - Astro Website Planı

## Context

**dartpilot** organizasyonu, Flutter/Dart ekosistemi için production-ready açık kaynak template ve araçlar geliştiren bir topluluk. Flagship proje olan `flutter-enterprise-starter`, 6 platform desteği, clean architecture, 472+ test, BLoC pattern ve kapsamlı design system ile öne çıkıyor. Organizasyonun kamusal yüzü olacak modern bir website'e ihtiyaç var — projeleri sergilemek, topluluğu büyütmek ve açık kaynak katkıyı teşvik etmek için.

---

## 1. Tech Stack

| Teknoloji | Versiyon | Amaç |
|---|---|---|
| **Astro** | **6.0** (10 Mart 2026) | Static-first, zero-JS-by-default, islands architecture |
| **Node.js** | **22+** (Astro 6 zorunlu) | Runtime |
| **Vite** | **7** (Astro 6 ile birlikte) | Build tooling |
| **Tailwind CSS** | v4 | CSS-first config, native nesting, utility-first |
| **MDX** | `@astrojs/mdx` | Blog ve dokümantasyon içerikleri |
| **astro-icon** | + `@iconify-json/lucide`, `@iconify-json/simple-icons` | UI ikonları + marka logoları (Flutter, Dart, GitHub vb.) |
| **sharp** | built-in | Image optimization (WebP/AVIF) |
| **Fonts** | **Astro 6 Built-in Fonts API** | `fontProviders.fontsource()` — otomatik download, cache, optimize, fallback |
| **Shiki** | **4** (Astro 6 ile) | Code syntax highlighting |
| **GitHub Pages** | - | Deployment (ücretsiz, custom domain, GitHub Actions entegrasyonu) |

### Astro 6.0 Avantajları
- **Built-in Fonts API:** `@fontsource/*` paketlerine gerek yok — `astro.config.mjs`'de `fonts` config ile Inter + JetBrains Mono otomatik optimize edilecek
- **CSP (Content Security Policy):** `security: { csp: true }` ile built-in güvenlik
- **Redesigned dev server:** Vite Environment API ile production-identical local dev
- **Shiki 4:** Daha hızlı code highlighting
- **Experimental Rust Compiler:** Opsiyonel, daha hızlı build (`experimental: { rustCompiler: true }`)

**Neden Astro?** Marketing/showcase site için ideal — sıfır JS overhead, mükemmel Lighthouse skorları, islands architecture ile sadece gerekli yerlerde interaktivite.

---

## 2. Site Yapısı & i18n

### i18n Altyapısı
- **Başlangıç dili:** İngilizce (EN) — default, prefix'siz (`/`, `/projects/`, ...)
- **Altyapı:** Astro'nun built-in i18n routing (`astro.config.mjs` → `i18n` config)
- **Gelecek diller:** Prefix'li routing (`/tr/`, `/de/`, `/es/`, vb.)
- **Çeviri dosyaları:** `src/i18n/` dizininde JSON locale dosyaları (`en.json`, sonra `tr.json` vb.)
- **Helper:** `t()` fonksiyonu — `src/i18n/utils.ts` ile tüm component'lerde kullanılabilir
- **Dil seçici:** Navbar'da language switcher (şimdilik sadece EN gösterir, altyapı hazır)

```
/                                    → Homepage (EN, default - prefix yok)
/projects/                           → Project showcase
/projects/flutter-enterprise-starter/      → Project detail
/docs/                               → Documentation hub
/community/                          → Contributors & contribution guide
/blog/                               → Blog listing
/blog/[slug]/                        → Blog post
/about/                              → About dartpilot
/404                                 → Custom 404

# Gelecek diller (altyapı hazır, içerik eklendiğinde aktif):
/tr/                                 → Anasayfa (TR)
/tr/projects/                        → Proje vitrini (TR)
/tr/...                              → ...
```

**Navigasyon:**
```
[dartpilot logo]   Projects   Docs   Community   Blog   [GitHub ikon]  [🌐]  [🌙/☀️]
```

---

## 3. Design System

### Renk Paleti
Flutter projesinin `ThemeColors` zinc paletinden türetilecek (marka sürekliliği):

```css
/* Zinc Scale (Light & Dark) */
--zinc-50:  #FAFAFA    --zinc-500: #71717A    --zinc-950: #09090B
--zinc-100: #F4F4F5    --zinc-600: #52525B
--zinc-200: #E4E4E7    --zinc-700: #3F3F46
--zinc-300: #D4D4D8    --zinc-800: #27272A
--zinc-400: #A1A1AA    --zinc-900: #18181B

/* Accent */
--indigo-500: #6366F1   --indigo-600: #4F46E5

/* Dark mode: zinc-950 surface | Light mode: white surface */
```

### Tipografi (Astro 6 Built-in Fonts API)
Artık `@fontsource/*` paketi gerekmez — Astro 6'nın `fonts` config'i kullanılacak:
```js
// astro.config.mjs
fonts: [
  { name: 'Inter', cssVariable: '--font-inter', provider: fontProviders.fontsource() },
  { name: 'JetBrains Mono', cssVariable: '--font-mono', provider: fontProviders.fontsource() },
]
```
- **Başlıklar:** Inter, 700 weight, tight letter-spacing (-1.5px → -0.25px)
- **Body:** Inter, 400, 16px, line-height 1.5
- **Code:** JetBrains Mono
- Otomatik fallback font üretimi + preload linkleri (Astro 6 built-in)

### 2026 UI/UX Trendleri
| Trend | Uygulama |
|---|---|
| View Transitions API | Astro built-in `<ViewTransitions />` — sayfa geçiş animasyonları |
| Scroll-driven animations | CSS `animation-timeline: scroll()` — hero parallax, section reveal |
| Bento grid layout | Feature showcase — asimetrik grid, farklı boyut kartlar |
| Glassmorphism | Navbar scroll'da `backdrop-blur-xl bg-white/5`, stats bar |
| Gradient mesh | Hero background — zinc-950 üzeri radial gradient, subtle indigo haze |
| Container queries | Feature kartları `@container` ile responsive |
| Motion design | `IntersectionObserver` fade-in-up, 200-300ms, `prefers-reduced-motion` respectful |
| Typography-forward | Büyük display text hero'da, generous whitespace |

### Dark/Light Mode
- Default: sistem tercihi (`prefers-color-scheme`)
- Manuel toggle → `localStorage` persist
- `<head>` inline script ile FOUC önleme

---

## 4. Anasayfa Bölümleri

### 4.1 Hero Section
- Büyük tipografi: **"Build production-ready Flutter apps, faster."**
- Alt başlık: "Open-source templates and tools for the Flutter/Dart ecosystem"
- 2 CTA: "Get Started" (primary) + "View on GitHub" (ghost)
- Background: gradient mesh (zinc-950 + subtle indigo radial)
- Animasyonlu platform ikonları: Android, iOS, Web, macOS, Linux, Windows (staggered fade-in)
- GitHub star count badge (build-time fetch)

### 4.2 Stats Bar
- Glassmorphism strip: "472+ Tests" / "6 Platforms" / "14+ Components" / "MIT Licensed"
- Scroll-into-view animated counters

### 4.3 Feature Showcase (Bento Grid)
- Büyük kart: "Feature-First Clean Architecture" + `high-level-architecture.svg` embed
- Orta kartlar: "BLoC State Management", "Auth & RBAC", "Responsive Design System"
- Küçük kartlar: "i18n (EN/TR)", "Mock Mode", "CI/CD Pipeline"
- Her kartta ikon, başlık, 1 satır açıklama, hover lift animasyonu

### 4.4 Platform Support Grid
- 6 platform kartı (3x2 grid, mobile'da 2x3)
- Her kart: platform ikonu + isim + yeşil checkmark
- Device mockup illüstrasyonları

### 4.5 Screenshot Showcase
- Tab interface: "Web Dark" / "Web Light" / "Mobile Login" / "Mobile Edit"
- Mevcut screenshot'lar: `docs/screenshots/` dizininden
- Browser/phone frame mockup'ları
- Mobile'da `scroll-snap` swipe

### 4.6 Code Preview
- Dart kod snippet'i (Result pattern veya BLoC pattern)
- `shiki` syntax highlighting (Astro built-in)

### 4.7 Getting Started CTA
- "Clone. Run. Ship." tagline
- Terminal-style: `git clone` → `fvm use` → `flutter run`
- "Start Building" primary button

### 4.8 Community Teaser
- "Built by the community, for the community"
- Contributor avatar'ları (GitHub API, build-time)
- "Become a Contributor" CTA

---

## 5. Diğer Sayfalar

### Projects (`/projects/`)
- Kart grid — şimdilik flutter-enterprise-starter, gelecekte genişleyebilir
- Her kart: proje ikonu, isim, açıklama, tech badge'leri, GitHub stars

### Project Detail (`/projects/flutter-enterprise-starter/`)
- Full tech stack tablosu
- Screenshot gallery
- Architecture diagram
- Quick start guide
- GitHub, DeepWiki, demo linkleri

### Docs (`/docs/`)
- Hub sayfası — DeepWiki linki, in-repo docs linkleri
- Getting started quick guide (MDX)

### Community (`/community/`)
- **Contributor Wall:** GitHub API'dan avatar grid
- **Nasıl Katkı Yapılır:** Adım adım rehber
- **Code of Conduct** linki
- **Yazar spotlight:** Mehmet Cevheri BOZOGLAN

### Blog (`/blog/`)
- MDX content collection
- Kart layout: başlık, tarih, excerpt, okuma süresi
- Tag'ler: release, tutorial, architecture, community
- RSS feed (`/rss.xml`)
- İlk yazılar: v0.19 release notes, architecture migration, getting started

### About (`/about/`)
- dartpilot misyon statement'ı
- Yazar biyografi
- Proje timeline/milestones

---

## 6. Proje Dosya Yapısı

**Lokasyon:** `/home/cevheri/projects/dart/dartpilot.github.io` (ayrı dizin, ayrı git repo)
**Uzak repo:** `github.com/dartpilot/dartpilot.github.io (website repo)`

```
dartpilot.github.io/
├── .github/workflows/deploy.yml     # GitHub Actions: build + deploy to Pages
├── public/
│   ├── favicon.svg                  # Dark-mode aware SVG favicon
│   ├── og-default.png               # Default OG image (1200x630)
│   ├── robots.txt
│   └── images/
│       ├── screenshots/             # Flutter repo'dan kopyalanan screenshot'lar
│       ├── architecture/            # high-level.svg
│       └── platforms/               # Device mockup frame'leri
├── src/
│   ├── components/
│   │   ├── global/                  # Navbar, Footer, ThemeToggle, MobileMenu, SkipNav
│   │   ├── home/                    # Hero, StatsBar, FeatureBento, PlatformGrid,
│   │   │                            # ArchitectureDiagram, ScreenshotShowcase,
│   │   │                            # CodePreview, GetStartedCTA, CommunityTeaser
│   │   ├── projects/               # ProjectCard, TechBadge
│   │   ├── community/              # ContributorWall, ContributorAvatar
│   │   ├── blog/                   # PostCard, PostHeader
│   │   └── ui/                     # Button, Card, Badge, CodeBlock, SectionHeading,
│   │                               # GitHubStatsWidget, ScrollReveal, Counter
│   ├── content/
│   │   ├── config.ts               # Content collection schemas
│   │   └── blog/                   # MDX blog posts
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, <head>, ViewTransitions
│   │   ├── PageLayout.astro        # Navbar + content + Footer
│   │   └── BlogPostLayout.astro    # Blog post layout
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/{index, flutter-enterprise-starter}.astro
│   │   ├── docs/index.astro
│   │   ├── community/index.astro
│   │   ├── blog/{index, [...slug]}.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts
│   ├── i18n/
│   │   ├── utils.ts                # t() helper, getLocale(), getLocalizedPath()
│   │   ├── en.json                 # English translations (default)
│   │   └── tr.json                 # Turkish translations (sonra eklenecek, placeholder)
│   ├── styles/global.css           # Tailwind v4 theme, custom properties, animations
│   ├── lib/
│   │   ├── github.ts               # GitHub API helpers (stars, contributors)
│   │   ├── constants.ts            # Site-wide constants
│   │   └── utils.ts                # Date format, reading time
│   └── data/projects.ts            # Proje metadata
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

---

## 7. GitHub API Entegrasyonu

Build-time fetch (sıfır client-side JS, rate limit sorunu yok):

```typescript
// src/lib/github.ts
export async function getRepoStats() {
  const res = await fetch('https://api.github.com/repos/dartpilot/flutter-enterprise-starter');
  const data = await res.json();
  return { stars: data.stargazers_count, forks: data.forks_count, ... };
}

export async function getContributors() {
  const res = await fetch('https://api.github.com/repos/dartpilot/flutter-enterprise-starter/contributors?per_page=100');
  return await res.json();
}
```

Günlük cron rebuild ile veri güncel kalır.

---

## 8. Uygulama Fazları

### Faz 1: Setup & Foundation (1-2 gün)
- `/home/cevheri/projects/dart/dartpilot.github.io` dizininde Astro 6.0 proje init (Node.js 22+ gerekli)
- Integrations: Tailwind v4, MDX, sitemap, astro-icon
- i18n altyapısı: `astro.config.mjs` i18n config, `src/i18n/utils.ts` t() helper, `en.json` locale
- `global.css` — zinc renk token'ları, tipografi, dark mode
- `astro.config.mjs` — Fonts API config (Inter + JetBrains Mono via fontsource), CSP: `security: { csp: true }`
- `BaseLayout.astro` — HTML shell, `<head>`, ViewTransitions, `<Font />` component, `lang` attribute
- `Navbar.astro` + `Footer.astro` + `ThemeToggle.astro` + `LanguageSwitcher.astro` (placeholder)
- Reusable UI atoms: Button, Card, Badge, SectionHeading
- GitHub Actions deploy workflow
- Asset'leri kopyala (screenshots, SVG'ler — Flutter repo'dan)
- **Çıktı:** Boş iskelet, GitHub Pages'e deploy oluyor, nav/footer/dark mode/i18n altyapısı çalışıyor

### Faz 2: Core Pages (3-4 gün)
- **Anasayfa** — tüm bölümler (Hero → Stats → Bento → Platform → Architecture → Screenshots → Code → CTA → Community)
- **Projects** sayfası + flutter-bloc-advance detay sayfası
- **About** sayfası
- **404** sayfası
- **Çıktı:** Tüm ana sayfalar görsel olarak tamamlanmış, responsive, dark/light

### Faz 3: Interactive Features & Content (2-3 gün)
- GitHub API entegrasyonu (stats, contributors)
- **Community** sayfası (Contributor Wall, katkı rehberi)
- **Docs** hub sayfası
- **Blog** setup (content collection, layout, RSS, ilk 2-3 yazı)
- Scroll animasyonları (`ScrollReveal`, `Counter` island)
- **Çıktı:** Tam interaktif site, canlı GitHub data, blog, animasyonlar

### Faz 4: SEO, Performance & Polish (1-2 gün)
- SEO: unique meta tags, JSON-LD structured data, OG/Twitter Cards, sitemap
- Performance: image optimization (WebP/AVIF), font subsetting, lazy loading
- Accessibility: WCAG 2.2 AA, skip-nav, focus-visible, `prefers-reduced-motion`
- View Transitions fine-tuning
- Lighthouse 100/100 hedefi
- **Çıktı:** Production-quality, perfect Lighthouse, tam erişilebilirlik

### Faz 5: Deploy & Launch (1 gün)
- GitHub Actions: push-to-main deploy + daily cron rebuild
- Custom domain (`dartpilot.dev`) DNS + HTTPS
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Flutter repo README'ye dartpilot.dev linki ekle
- **Çıktı:** Canlı website

---

## 9. Kaynak Dosyalar (Flutter Repo'dan)

| Kaynak | Hedef (Astro) | Amaç |
|---|---|---|
| `docs/screenshots/*.png` | `public/images/screenshots/` | Screenshot showcase |
| `docs/high-level-architecture.svg` | `public/images/architecture/` | Mimari diyagram |
| `README.md` | İçerik kaynağı | Proje detay sayfası içeriği |
| `lib/shared/design_system/theme/theme_colors.dart` | `src/styles/global.css` | Renk token'ları |
| `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` | Community sayfası içeriği | Topluluk rehberleri |

---

## 10. Verification / Test Planı

1. **Build:** `npm run build` hatasız tamamlanmalı
2. **Preview:** `npm run preview` ile tüm sayfalar kontrol
3. **Lighthouse:** 4 kategoride 95+ (hedef 100)
4. **Responsive:** Mobile (375px), Tablet (768px), Desktop (1440px) test
5. **Dark/Light:** Her iki modda tüm sayfalar kontrol
6. **Accessibility:** axe DevTools ile WCAG 2.2 AA tarama
7. **Cross-browser:** Chrome, Firefox, Safari, Edge
8. **Links:** Tüm internal/external linkler çalışıyor
9. **OG Preview:** Facebook Debugger + Twitter Card Validator
10. **Deploy:** GitHub Pages'e otomatik deploy doğrulama
