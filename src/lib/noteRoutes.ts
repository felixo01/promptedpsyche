import type { AlternateLinks } from './i18n';

type NoteRouteEntry = {
  id: string;
  data: {
    lang?: 'en' | 'pl';
    translationKey?: string;
  };
};

export function getNotePath(entry: NoteRouteEntry, lang: 'en' | 'pl') {
  const basePath = lang === 'pl' ? '/pl/notes' : '/notes';

  return `${basePath}/${entry.id}/`;
}

export function getNoteAlternates(
  entry: NoteRouteEntry,
  publicNotes: NoteRouteEntry[]
): AlternateLinks {
  const translationKey = entry.data.translationKey;
  const currentLang = entry.data.lang ?? 'en';
  const fallbackEnPath = currentLang === 'en' ? getNotePath(entry, 'en') : '/notes/';
  const fallbackPlPath = currentLang === 'pl' ? getNotePath(entry, 'pl') : '/pl/notes/';

  if (!translationKey) {
    return {
      en: fallbackEnPath,
      pl: fallbackPlPath,
      xDefault: fallbackEnPath
    };
  }

  const enEntry = publicNotes.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      (candidate.data.lang ?? 'en') === 'en'
  );
  const plEntry = publicNotes.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      candidate.data.lang === 'pl'
  );

  const enPath = enEntry ? getNotePath(enEntry, 'en') : fallbackEnPath;
  const plPath = plEntry ? getNotePath(plEntry, 'pl') : fallbackPlPath;

  return {
    en: enPath,
    pl: plPath,
    xDefault: enPath
  };
}
