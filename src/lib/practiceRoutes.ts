import type { AlternateLinks } from './i18n';

type PracticeRouteEntry = {
  id: string;
  data: {
    lang?: 'en' | 'pl';
    translationKey?: string;
  };
};

export function getPracticePath(entry: PracticeRouteEntry, lang: 'en' | 'pl') {
  const basePath = lang === 'pl' ? '/pl/practice' : '/practice';

  return `${basePath}/${entry.id}/`;
}

export function getPracticeAlternates(
  entry: PracticeRouteEntry,
  practiceEntries: PracticeRouteEntry[]
): AlternateLinks {
  const translationKey = entry.data.translationKey;
  const currentLang = entry.data.lang ?? 'en';
  const fallbackEnPath = currentLang === 'en' ? getPracticePath(entry, 'en') : '/practice/';
  const fallbackPlPath = currentLang === 'pl' ? getPracticePath(entry, 'pl') : '/pl/practice/';

  if (!translationKey) {
    return {
      en: fallbackEnPath,
      pl: fallbackPlPath,
      xDefault: fallbackEnPath
    };
  }

  const enEntry = practiceEntries.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      (candidate.data.lang ?? 'en') === 'en'
  );
  const plEntry = practiceEntries.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      candidate.data.lang === 'pl'
  );

  const enPath = enEntry ? getPracticePath(enEntry, 'en') : fallbackEnPath;
  const plPath = plEntry ? getPracticePath(plEntry, 'pl') : fallbackPlPath;

  return {
    en: enPath,
    pl: plPath,
    xDefault: enPath
  };
}
