import { getCollection, type CollectionEntry } from 'astro:content';
import { onlyPublicEntriesByLang } from './content';
import { slugifyTag } from './tags';

type ArticleEntry = CollectionEntry<'articles'>;
type NoteEntry = CollectionEntry<'notes'>;

export type PublicationItem = {
  entry: ArticleEntry | NoteEntry;
  collection: 'articles' | 'notes';
  href: string;
  kindLabel: string;
};

export type TagPage = {
  slug: string;
  tag: string;
  items: PublicationItem[];
};

export async function getTagPages(lang: 'en' | 'pl'): Promise<TagPage[]> {
  const articles = onlyPublicEntriesByLang(await getCollection('articles'), lang);
  const notes = onlyPublicEntriesByLang(await getCollection('notes'), lang);
  const tagMap = new Map<string, TagPage>();

  const addEntry = (
    entry: ArticleEntry | NoteEntry,
    collection: 'articles' | 'notes',
    basePath: string,
    kindLabel: string
  ) => {
    for (const tag of entry.data.tags ?? []) {
      const slug = slugifyTag(tag);

      if (!slug) {
        continue;
      }

      const page = tagMap.get(slug) ?? { slug, tag, items: [] };
      page.items.push({
        entry,
        collection,
        href: `${basePath}/${entry.id}/`,
        kindLabel
      });
      tagMap.set(slug, page);
    }
  };

  for (const entry of articles) {
    addEntry(
      entry,
      'articles',
      lang === 'pl' ? '/pl/articles' : '/articles',
      lang === 'pl' ? 'Artykuł' : 'Article'
    );
  }

  for (const entry of notes) {
    addEntry(
      entry,
      'notes',
      lang === 'pl' ? '/pl/notes' : '/notes',
      lang === 'pl' ? 'Notatka' : 'Note'
    );
  }

  return [...tagMap.values()]
    .map((page) => ({
      ...page,
      items: page.items.sort(
        (a, b) => b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime()
      )
    }))
    .sort((a, b) => a.tag.localeCompare(b.tag, lang));
}

