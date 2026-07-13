export type PublicationLocale = 'en' | 'pl';

const AI_FEAR_TRANSLATION_KEY = 'ai-fears-human-self-fear';
const AI_FEAR_DOI = '10.5281/zenodo.21340181';
const AI_FEAR_DOI_URL = `https://doi.org/${AI_FEAR_DOI}`;
const AI_FEAR_VERSION = '2.1';

export function withArticlePublicationMetadata<
  T extends {
    data: {
      translationKey?: string;
    };
  }
>(entry: T, lang: PublicationLocale): T {
  if (entry.data.translationKey !== AI_FEAR_TRANSLATION_KEY) {
    return entry;
  }

  const publicationMetadata =
    lang === 'en'
      ? {
          doi: AI_FEAR_DOI,
          doiUrl: AI_FEAR_DOI_URL,
          version: AI_FEAR_VERSION,
          licenseName: 'CC BY 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
        }
      : {
          relatedDoi: AI_FEAR_DOI,
          relatedDoiUrl: AI_FEAR_DOI_URL,
          relatedVersion: AI_FEAR_VERSION,
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
