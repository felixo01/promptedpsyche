import type { CollectionEntry } from 'astro:content';
import { withArticlePublicationMetadata, type PublicationLocale } from './articlePublicationMetadata';
import { getArticlePath } from './articleRoutes';
import { onlyPublicEntriesByLang, sortByDateDesc } from './content';

export type SelectedAuthorPublication = {
  title: string;
  description: string;
  publishedAt: Date;
  href: string;
  doi: string;
  doiUrl: string;
  identifierDoi?: string;
  version?: string;
};

export function getSelectedAuthorPublications(
  entries: CollectionEntry<'articles'>[],
  lang: PublicationLocale
): SelectedAuthorPublication[] {
  const publicEntries = onlyPublicEntriesByLang(entries, lang).map((entry) =>
    withArticlePublicationMetadata(entry, lang)
  );

  return sortByDateDesc(publicEntries)
    .flatMap((entry) => {
      const doi = lang === 'pl' ? (entry.data.relatedDoi ?? entry.data.doi) : entry.data.doi;
      const doiUrl = lang === 'pl'
        ? (entry.data.relatedDoiUrl ?? entry.data.doiUrl)
        : entry.data.doiUrl;
      const version = lang === 'pl'
        ? (entry.data.relatedVersion ?? entry.data.version)
        : entry.data.version;

      if (!doi) {
        return [];
      }

      return [{
        title: entry.data.title,
        description: entry.data.description,
        publishedAt: entry.data.publishedAt,
        href: getArticlePath(entry, lang),
        doi,
        doiUrl: doiUrl ?? `https://doi.org/${doi}`,
        identifierDoi: entry.data.doi,
        version
      }];
    })
    .slice(0, 5);
}
