import { getPublicationByTranslationKey } from './publications';

export type PublicationLocale = 'en' | 'pl';

export function withArticlePublicationMetadata<
  T extends {
    data: {
      translationKey?: string;
      doi?: string;
      relatedDoi?: string;
    };
  }
>(entry: T, lang: PublicationLocale): T {
  const publication = getPublicationByTranslationKey(entry.data.translationKey);

  if (!publication || !publication.landingPath.startsWith('/articles/')) {
    return entry;
  }

  const declaredDoi = lang === 'en' ? entry.data.doi : entry.data.relatedDoi;
  if (declaredDoi && declaredDoi !== publication.doi) {
    throw new Error(
      `BLOCKED - DOI METADATA CHANGE: ${publication.zenodoRecordUrl} protects ${publication.doi}; received ${declaredDoi} for translation key ${entry.data.translationKey}.`
    );
  }

  const publicationMetadata =
    lang === 'en'
      ? {
          doi: publication.doi,
          doiUrl: publication.doiUrl,
          ...('version' in publication && publication.version
            ? { version: publication.version }
            : {}),
          licenseName: publication.license.name,
          licenseUrl: publication.license.url
        }
      : {
          relatedDoi: publication.doi,
          relatedDoiUrl: publication.doiUrl,
          ...('version' in publication && publication.version
            ? { relatedVersion: publication.version }
            : {}),
          relatedDoiLabel: 'DOI wersji angielskiej'
        };

  return {
    ...entry,
    data: {
      ...entry.data,
      ...publicationMetadata
    }
  } as T;
}
