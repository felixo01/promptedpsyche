export type Locale = 'en' | 'pl';

export type AlternateLinks = {
  en: string;
  pl: string;
  xDefault?: string;
};

type RoutePair = {
  en: string;
  pl: string;
};

const routePairs: RoutePair[] = [
  { en: '/', pl: '/pl/' },
  { en: '/about/', pl: '/pl/about/' },
  { en: '/consulting/', pl: '/pl/consulting/' },
  { en: '/contact/', pl: '/pl/contact/' },
  { en: '/articles/', pl: '/pl/articles/' },
  { en: '/notes/', pl: '/pl/notes/' },
  { en: '/concepts/', pl: '/pl/concepts/' },
  { en: '/practice/', pl: '/pl/practice/' },
  { en: '/projects/', pl: '/pl/projects/' },
  { en: '/topics/', pl: '/pl/topics/' },
  { en: '/topics/trust-in-ai/', pl: '/pl/topics/zaufanie-do-ai/' },
  { en: '/topics/ai-and-cognition/', pl: '/pl/topics/ai-i-myslenie/' },
  { en: '/topics/human-agency-and-responsibility/', pl: '/pl/topics/sprawczosc-i-odpowiedzialnosc/' },
  { en: '/search/', pl: '/pl/search/' }
];

export const navItemsByLocale: Record<Locale, Array<{ label: string; href: string }>> = {
  en: [
    { label: 'Home', href: '/' },
    { label: 'Author', href: '/about/' },
    { label: 'Consulting', href: '/consulting/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Articles', href: '/articles/' },
    { label: 'Notes', href: '/notes/' },
    { label: 'Concepts', href: '/concepts/' },
    { label: 'Practice', href: '/practice/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Search', href: '/search/' }
  ],
  pl: [
    { label: 'Start', href: '/pl/' },
    { label: 'Kim jestem', href: '/pl/about/' },
    { label: 'Konsulting', href: '/pl/consulting/' },
    { label: 'Kontakt', href: '/pl/contact/' },
    { label: 'Artykuły', href: '/pl/articles/' },
    { label: 'Notatki', href: '/pl/notes/' },
    { label: 'Pojęcia', href: '/pl/concepts/' },
    { label: 'Praktyka', href: '/pl/practice/' },
    { label: 'Projekty', href: '/pl/projects/' },
    { label: 'Szukaj', href: '/pl/search/' }
  ]
};

export const footerCopy: Record<Locale, { tagline: string; meta: string }> = {
  en: {
    tagline: 'AI, cyberpsychology and Human-AI Interaction.',
    meta: 'This pre-launch site is intentionally not indexed yet.'
  },
  pl: {
    tagline: 'AI, cyberpsychologia i Human-AI Interaction.',
    meta: 'Ta strona w trybie pre-launch celowo nie jest jeszcze indeksowana.'
  }
};

export function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/)[0] || '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;

  if (withLeadingSlash === '/') {
    return '/';
  }

  return withLeadingSlash.replace(/\/+$/, '');
}

export function getLangFromPath(pathname: string): Locale {
  const path = normalizePath(pathname);

  return path === '/pl' || path.startsWith('/pl/') ? 'pl' : 'en';
}

export function getNavItems(locale: Locale) {
  return navItemsByLocale[locale];
}

function findRoutePair(pathname: string): RoutePair {
  const path = normalizePath(pathname);
  const exactPair = routePairs.find((pair) => path === normalizePath(pair.en) || path === normalizePath(pair.pl));

  if (exactPair) {
    return exactPair;
  }

  if (path.startsWith('/pl/articles/') || path.startsWith('/articles/')) {
    return routePairs.find((pair) => pair.en === '/articles/') ?? routePairs[0];
  }

  if (path.startsWith('/pl/notes/') || path.startsWith('/notes/')) {
    return routePairs.find((pair) => pair.en === '/notes/') ?? routePairs[0];
  }

  if (path.startsWith('/pl/concepts/') || path.startsWith('/concepts/')) {
    return routePairs.find((pair) => pair.en === '/concepts/') ?? routePairs[0];
  }

  if (path.startsWith('/pl/practice/') || path.startsWith('/practice/')) {
    return routePairs.find((pair) => pair.en === '/practice/') ?? routePairs[0];
  }

  return routePairs[0];
}

export function getAlternatePath(pathname: string, locale: Locale) {
  return findRoutePair(pathname)[locale];
}

export function getAlternateLinks(pathname: string): Required<AlternateLinks> {
  const routePair = findRoutePair(pathname);

  return {
    en: routePair.en,
    pl: routePair.pl,
    xDefault: routePair.en
  };
}
