import { siteVersion } from './buildMeta';
import type { Locale } from './i18n';

const SITE_URL = 'https://promptedpsyche.com';

export const AUTHOR_ENTITY_ID = `${SITE_URL}/#feliks-mamczur`;
export const WEBSITE_ENTITY_ID = `${SITE_URL}/#website`;
export const PUBLISHER_ENTITY_ID = `${SITE_URL}/#publisher`;

export const AUTHOR_ALTERNATE_NAMES = [
  'Feliks Mirosław Mamczur',
  'Mirosław Mamczur',
  'Felix Mamczur'
] as const;

export const authorPublicProfiles = [
  {
    url: 'https://orcid.org/0009-0001-0715-0517',
    label: { en: 'ORCID', pl: 'ORCID' }
  },
  {
    url: 'https://felixmamczur.com/',
    label: { en: 'Film and visual portfolio', pl: 'Portfolio filmowe i wizualne' }
  },
  {
    url: 'https://www.europeanfilmawards.eu/talent/feliks-mamczur/',
    label: { en: 'European Film Academy', pl: 'European Film Academy' }
  },
  {
    url: 'https://www.filmpolski.pl/fp/index.php/1199894',
    label: { en: 'FilmPolski', pl: 'FilmPolski' }
  },
  {
    url: 'https://www.imdb.com/name/nm7644647/',
    label: { en: 'IMDb', pl: 'IMDb' }
  },
  {
    url: 'https://www.filmweb.pl/person/Feliks%2BMamczur-3134395',
    label: { en: 'Filmweb', pl: 'Filmweb' }
  },
  {
    url: 'https://github.com/felixo01',
    label: { en: 'GitHub', pl: 'GitHub' }
  }
] as const;

export const AUTHOR_SAME_AS = authorPublicProfiles.map((profile) => profile.url);

const authorEntityCopy = {
  en: {
    description:
      'Feliks Mamczur is the author and founder of Prompted Psyche. He writes and consults on AI, cyberpsychology and Human-AI Interaction, drawing on experience in film, communication and creative work.',
    jobTitle: 'Author, filmmaker and Human-AI Interaction consultant'
  },
  pl: {
    description:
      'Feliks Mamczur jest autorem i twórcą Prompted Psyche. Pisze o AI, cyberpsychologii i Human-AI Interaction oraz prowadzi konsultacje w tym zakresie. Korzysta także z doświadczenia w filmie, komunikacji i pracy twórczej.',
    jobTitle: 'Autor, filmowiec i konsultant Human-AI Interaction'
  }
} as const;

const authorKnowledgeAreas = [
  'Artificial intelligence',
  'Cyberpsychology',
  'Human-AI Interaction',
  'Trust in AI',
  'AI literacy',
  'AI and learning',
  'AI-mediated communication',
  'AI and creative work'
] as const;

export const site = {
  name: 'Prompted Psyche',
  tagline: 'AI, cyberpsychology and Human-AI Interaction.',
  description:
    'A research-informed expert project by Feliks Mamczur on how artificial intelligence shapes thought, emotion, trust, communication, relationships, creativity and work.',
  url: SITE_URL,
  authorName: 'Feliks Mamczur',
  author: 'Feliks Mamczur',
  authorUrls: {
    en: '/about/',
    pl: '/pl/about/'
  },
  authorDescriptions: {
    en: authorEntityCopy.en.description,
    pl: authorEntityCopy.pl.description
  },
  sameAs: AUTHOR_SAME_AS,
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
  const copy = authorEntityCopy[lang];
  const imageUrl = absoluteUrl('/images/author/feliks-mamczur.png');

  return {
    '@id': AUTHOR_ENTITY_ID,
    '@type': 'Person',
    name: site.authorName,
    givenName: 'Feliks',
    familyName: 'Mamczur',
    alternateName: AUTHOR_ALTERNATE_NAMES,
    url: absoluteUrl(getAuthorUrl(lang)),
    description: copy.description,
    jobTitle: copy.jobTitle,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      contentUrl: imageUrl,
      width: 960,
      height: 641,
      caption: 'Feliks Mamczur'
    },
    sameAs: AUTHOR_SAME_AS,
    memberOf: {
      '@type': 'Organization',
      name: 'European Film Academy',
      url: 'https://www.europeanfilmawards.eu/talent/feliks-mamczur/'
    },
    knowsAbout: authorKnowledgeAreas
  };
}

export function getWebsiteEntity() {
  return {
    '@id': WEBSITE_ENTITY_ID,
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    publisher: {
      '@id': PUBLISHER_ENTITY_ID
    },
    inLanguage: ['en', 'pl']
  };
}

export function getPublisherEntity() {
  const logoUrl = absoluteUrl('/favicon.svg');

  return {
    '@id': PUBLISHER_ENTITY_ID,
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl('/'),
    description:
      'Prompted Psyche is an independent research-informed publishing platform on the human side of AI.',
    founder: {
      '@id': AUTHOR_ENTITY_ID
    },
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      contentUrl: logoUrl,
      width: 64,
      height: 64,
      caption: site.name
    }
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
