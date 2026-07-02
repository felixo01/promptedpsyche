import type { AlternateLinks } from './i18n';

type ArticleRouteEntry = {
  id: string;
  data: {
    lang?: 'en' | 'pl';
    translationKey?: string;
  };
};

export function getArticlePath(entry: ArticleRouteEntry, lang: 'en' | 'pl') {
  const basePath = lang === 'pl' ? '/pl/articles' : '/articles';

  return `${basePath}/${entry.id}/`;
}

export function getArticleAlternates(
  entry: ArticleRouteEntry,
  publicArticles: ArticleRouteEntry[]
): AlternateLinks {
  const translationKey = entry.data.translationKey;
  const currentLang = entry.data.lang ?? 'en';
  const fallbackEnPath = currentLang === 'en' ? getArticlePath(entry, 'en') : '/articles/';
  const fallbackPlPath = currentLang === 'pl' ? getArticlePath(entry, 'pl') : '/pl/articles/';

  if (!translationKey) {
    return {
      en: fallbackEnPath,
      pl: fallbackPlPath,
      xDefault: fallbackEnPath
    };
  }

  const enEntry = publicArticles.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      (candidate.data.lang ?? 'en') === 'en'
  );
  const plEntry = publicArticles.find(
    (candidate) =>
      candidate.data.translationKey === translationKey &&
      candidate.data.lang === 'pl'
  );

  const enPath = enEntry ? getArticlePath(enEntry, 'en') : fallbackEnPath;
  const plPath = plEntry ? getArticlePath(plEntry, 'pl') : fallbackPlPath;

  return {
    en: enPath,
    pl: plPath,
    xDefault: enPath
  };
}
