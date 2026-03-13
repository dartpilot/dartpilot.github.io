export const SITE = {
  title: 'dartpilot',
  description: 'Open-source templates and tools for the Flutter/Dart ecosystem',
  url: 'https://dartpilot.dev',
  github: {
    org: 'https://github.com/dartpilot',
    repo: 'https://github.com/dartpilot/flutter-enterprise-starter',
    repoApi: 'https://api.github.com/repos/dartpilot/flutter-enterprise-starter',
  },
  author: {
    name: 'Mehmet Cevheri BOZOGLAN',
    github: 'https://github.com/cevheri',
  },
} as const;

export const NAV_LINKS = [
  { href: '/projects/', label: 'nav.projects' },
  { href: '/docs/', label: 'nav.docs' },
  { href: '/community/', label: 'nav.community' },
  { href: '/blog/', label: 'nav.blog' },
] as const;

export const STATS = [
  { value: 472, suffix: '+', label: 'stats.tests' },
  { value: 6, suffix: '', label: 'stats.platforms' },
  { value: 14, suffix: '+', label: 'stats.components' },
  { value: 0, suffix: '', label: 'stats.license', display: 'MIT' },
] as const;

export const PLATFORMS = [
  { name: 'platforms.android', icon: 'lucide:smartphone' },
  { name: 'platforms.ios', icon: 'lucide:tablet-smartphone' },
  { name: 'platforms.web', icon: 'lucide:globe' },
  { name: 'platforms.macos', icon: 'lucide:laptop' },
  { name: 'platforms.linux', icon: 'lucide:monitor' },
  { name: 'platforms.windows', icon: 'lucide:monitor-dot' },
] as const;
