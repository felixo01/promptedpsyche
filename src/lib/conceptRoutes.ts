import type { AlternateLinks } from './i18n';

type ConceptRouteEntry = {
  id: string;
  data: {
    lang?: 'en' | 'pl';
    routeSlug?: string;
    translationKey?: string;
  };
};

export function getConceptSlug(entry: ConceptRouteEntry) {
  return entry.data.routeSlug ?? entry.id;
}

export function getConceptPath(entry: ConceptRouteEntry, lang: 'en' | 'pl') {
  const basePath = lang === 'pl' ? '/pl/concepts' : '/concepts';

  return `${basePath}/${getConceptSlug(entry)}/`;
}

export function getConceptAlternates(
  entry: ConceptRouteEntry,
  publicConcepts: ConceptRouteEntry[]
): AlternateLinks {
  const translationKey = entry.data.translationKey;
  const currentLang = entry.data.lang ?? 'en';
  const fallbackEnPath = currentLang === 'en' ? getConceptPath(entry, 'en') : '/concepts/';
  const fallbackPlPath = currentLang === 'pl' ? getConceptPath(entry, 'pl') : '/pl/concepts/';

  if (!translationKey) {
    return {
      en: fallbackEnPath,
      pl: fallbackPlPath,
      xDefault: fallbackEnPath
    };
  }

  const enEntry = publicConcepts.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      (candidate.data.lang ?? 'en') === 'en'
  );
  const plEntry = publicConcepts.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      candidate.data.lang === 'pl'
  );
  const enPath = enEntry ? getConceptPath(enEntry, 'en') : fallbackEnPath;
  const plPath = plEntry ? getConceptPath(plEntry, 'pl') : fallbackPlPath;

  return {
    en: enPath,
    pl: plPath,
    xDefault: enPath
  };
}
