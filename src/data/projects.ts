export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  github: string;
  demo?: string;
  deepwiki?: string;
  image?: string;
  techStack: { name: string; icon?: string }[];
  features: string[];
  stats: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: 'flutter-enterprise-starter',
    name: 'Flutter Enterprise Starter',
    description:
      'Production-ready Flutter template with clean architecture, BLoC pattern, 6-platform support, and 472+ tests.',
    longDescription:
      'A comprehensive Flutter application template designed for enterprise-grade projects. Features a feature-first clean architecture, BLoC state management, complete auth flow with RBAC, responsive design system with 14+ components, internationalization, mock mode for rapid development, and CI/CD pipeline. Supports Android, iOS, Web, macOS, Linux, and Windows from a single codebase.',
    github: 'https://github.com/dartpilot/flutter-enterprise-starter',
    demo: 'https://cevheri.github.io/flutter-bloc-advanced',
    deepwiki: 'https://deepwiki.com/dartpilot/flutter-enterprise-starter',
    techStack: [
      { name: 'Flutter 3.41', icon: 'simple-icons:flutter' },
      { name: 'Dart 3.11', icon: 'simple-icons:dart' },
      { name: 'BLoC', icon: 'lucide:boxes' },
      { name: 'go_router', icon: 'lucide:route' },
      { name: 'FVM', icon: 'lucide:package' },
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions' },
    ],
    features: [
      'Feature-First Clean Architecture',
      'BLoC State Management with Use Cases',
      'Auth & Role-Based Access Control',
      'Responsive Design System (14+ components)',
      'Internationalization (EN/TR)',
      'Mock Mode (no backend required)',
      'CI/CD with GitHub Actions',
      '472+ Tests with full coverage',
    ],
    stats: [
      { label: 'Tests', value: '472+' },
      { label: 'Platforms', value: '6' },
      { label: 'Components', value: '14+' },
      { label: 'License', value: 'MIT' },
    ],
  },
];
