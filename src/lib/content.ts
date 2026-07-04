type DatedEntry = {
  data: {
    publishedAt: Date;
  };
};

type DraftableEntry = {
  data: {
    draft?: boolean;
  };
};

type LanguageEntry = {
  data: {
    lang?: 'en' | 'pl';
  };
};

export type SearchLocale = 'en' | 'pl';

export function onlyPublicEntries<T extends DraftableEntry>(entries: T[]) {
  return entries.filter((entry) => !entry.data.draft);
}

export function getEntryLang(entry: LanguageEntry) {
  return entry.data.lang ?? 'en';
}

export function onlyEntriesByLang<T extends LanguageEntry>(entries: T[], lang: 'en' | 'pl') {
  return entries.filter((entry) => getEntryLang(entry) === lang);
}

export function onlyPublicEntriesByLang<T extends DraftableEntry & LanguageEntry>(
  entries: T[],
  lang: 'en' | 'pl'
) {
  return onlyEntriesByLang(onlyPublicEntries(entries), lang);
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]) {
  return [...entries].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export function formatDate(date: Date, locale: 'en' | 'pl' = 'en') {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
