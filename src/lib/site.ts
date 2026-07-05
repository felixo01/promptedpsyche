import { siteVersion } from './buildMeta';
import type { Locale } from './i18n';

export const site = {
  name: 'Prompted Psyche',
  tagline: 'AI, cyberpsychology and Human-AI Interaction.',
  description:
    'A research-informed expert project by Feliks Mamczur on how artificial intelligence shapes thought, emotion, trust, communication, relationships, creativity and work.',
  url: 'https://promptedpsyche.com',
  authorName: 'Feliks Mamczur',
  author: 'Feliks Mamczur',
  authorUrls: {
    en: '/about/',
    pl: '/pl/about/'
  },
  authorDescriptions: {
    en: 'Feliks Mamczur writes and consults on how artificial intelligence shapes thought, emotion, trust, communication, relationships, creativity and work.',
    pl: 'Feliks Mamczur pisze i konsultuje o tym, jak sztuczna inteligencja wpływa na myślenie, emocje, zaufanie, komunikację, relacje, twórczość i pracę.'
  },
  sameAs: ['https://orcid.org/0009-0001-0715-0517'],
  email: 'humanai.lab.edu@gmail.com',
  version: siteVersion,
  locale: 'en',
  futureLocales: ['pl']
};

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function getAuthorUrl(lang: Locale) {
  return site.authorUrls[lang];
}

export function getAuthorEntity(lang: Locale) {
  return {
    '@type': 'Person',
    name: site.authorName,
    url: absoluteUrl(getAuthorUrl(lang)),
    description: site.authorDescriptions[lang],
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {})
  };
}

export const navItems = [
  { label: 'Articles', href: '/articles/' },
  { label: 'Notes', href: '/notes/' },
  { label: 'Concepts', href: '/concepts/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Consulting', href: '/consulting/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' }
];
