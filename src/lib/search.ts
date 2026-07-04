import { getCollection } from 'astro:content';
import { getArticlePath } from './articleRoutes';
import { getConceptPath } from './conceptRoutes';
import { getNotePath } from './noteRoutes';
import {
  onlyPublicEntriesByLang,
  sortByDateDesc,
  type SearchLocale
} from './content';
import { sortConceptsForIndex } from './conceptOrder';

export type SearchItemType = 'article' | 'note' | 'concept';

export type SearchIndexItem = {
  title: string;
  description: string;
  url: string;
  type: SearchItemType;
  language: SearchLocale;
  tags: string[];
  date?: string;
  readingTime?: string;
};

function formatDateForIndex(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function buildSearchIndex(language: SearchLocale): Promise<SearchIndexItem[]> {
  const articles = sortByDateDesc(
    onlyPublicEntriesByLang(await getCollection('articles'), language)
  );
  const notes = sortByDateDesc(onlyPublicEntriesByLang(await getCollection('notes'), language));
  const concepts = sortConceptsForIndex(
    onlyPublicEntriesByLang(await getCollection('concepts'), language)
  );

  return [
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: getArticlePath(entry, language),
      type: 'article' as const,
      language,
      tags: entry.data.tags ?? [],
      date: formatDateForIndex(entry.data.publishedAt),
      readingTime: entry.data.readingTime
    })),
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: getNotePath(entry, language),
      type: 'note' as const,
      language,
      tags: entry.data.tags ?? [],
      date: formatDateForIndex(entry.data.publishedAt)
    })),
    ...concepts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: getConceptPath(entry, language),
      type: 'concept' as const,
      language,
      tags: entry.data.tags ?? []
    }))
  ];
}
