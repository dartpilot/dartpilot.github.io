import en from './en.json';
import tr from './tr.json';

type NestedRecord = { [key: string]: string | NestedRecord };

const locales: Record<string, NestedRecord> = { en, tr };
const defaultLocale = 'en';

function getNestedValue(obj: NestedRecord, path: string): string {
  const keys = path.split('.');
  let current: string | NestedRecord = obj;
  for (const key of keys) {
    if (typeof current === 'string' || current === undefined) return path;
    current = current[key];
  }
  return typeof current === 'string' ? current : path;
}

export function t(key: string, locale: string = defaultLocale, params?: Record<string, string>): string {
  const translations = locales[locale] ?? locales[defaultLocale];
  let value = getNestedValue(translations, key);
  if (value === key && locale !== defaultLocale) {
    value = getNestedValue(locales[defaultLocale], key);
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, v);
    }
  }
  return value;
}

export function getLocale(url: URL): string {
  const [, segment] = url.pathname.split('/');
  return segment && segment in locales && segment !== defaultLocale ? segment : defaultLocale;
}

export function getLocalizedPath(path: string, locale: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

export function getAvailableLocales(): string[] {
  return Object.keys(locales);
}
