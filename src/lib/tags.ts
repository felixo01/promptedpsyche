import type { Locale } from './i18n';

const localeBasePath: Record<Locale, string> = {
  en: '/tags',
  pl: '/pl/tags'
};

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getTagPath(tag: string, lang: Locale = 'en') {
  return `${localeBasePath[lang]}/${slugifyTag(tag)}/`;
}

