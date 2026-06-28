import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getEntryLang, onlyPublicEntries } from '../lib/content';
import { site } from '../lib/site';

function getEntryLink(entry: any, collection: string) {
  if (collection === 'articles' && getEntryLang(entry) === 'pl') {
    return `/pl/articles/${entry.id}/`;
  }

  return `/${collection}/${entry.id}/`;
}

export async function GET(context: APIContext) {
  const articles = onlyPublicEntries(await getCollection('articles'));
  const notes = onlyPublicEntries(await getCollection('notes'));

  const items = [
    ...articles.map((entry) => ({ entry, collection: 'articles' })),
    ...notes.map((entry) => ({ entry, collection: 'notes' }))
  ].sort(
    (a, b) => b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime()
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: items.map(({ entry, collection }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: getEntryLink(entry, collection),
      categories: entry.data.tags
    }))
  });
}
