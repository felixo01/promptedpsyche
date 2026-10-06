import type { Locale } from './i18n';
import {
  AUTHOR_ENTITY_ID,
  WEBSITE_ENTITY_ID,
  absoluteUrl,
  getAuthorEntity
} from './site';

export const beyondAiShareRecord = {
  name: 'Beyond AI Share',
  paths: {
    en: '/projects/beyond-ai-share/',
    pl: '/pl/projects/beyond-ai-share/'
  },
  projectId: absoluteUrl('/projects/beyond-ai-share/#research-project'),
  preprint: {
    title:
      'Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice',
    doi: '10.5281/zenodo.21705721',
    url: 'https://doi.org/10.5281/zenodo.21705721',
    recordUrl: 'https://zenodo.org/records/21705721',
    pdfUrl:
      'https://zenodo.org/records/21705721/files/Beyond_AI_Share_Preprint_v1.0.pdf?download=1',
    pdfFileName: 'Beyond_AI_Share_Preprint_v1.0.pdf',
    appendixUrl:
      'https://zenodo.org/records/21705721/files/Beyond_AI_Share_Appendix_A_v1.0.pdf?download=1',
    appendixFileName: 'Beyond_AI_Share_Appendix_A_v1.0.pdf',
    author: 'Feliks Mamczur',
    publicationDate: '2026-07-30',
    version: '1.0',
    licenseName: 'Creative Commons Attribution 4.0 International',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  },
  preregistration: {
    title:
      'Is It Still My Work? Authorship, Authenticity and Control in AI-Assisted Creative Practice',
    doi: '10.17605/OSF.IO/GSWN3',
    url: 'https://doi.org/10.17605/OSF.IO/GSWN3',
    registrationDate: '2026-06-15',
    registrationStatus: 'accepted',
    accessVerifiedAt: '2026-08-04'
  },
  socialImage: '/images/social/beyond-ai-share-project-social-1200x630.png',
  dateModified: '2026-08-04'
} as const;

export const beyondAiShareCitation =
  'Mamczur, F. (2026). Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice [Preprint]. Zenodo. https://doi.org/10.5281/zenodo.21705721';

export function getBeyondAiShareStructuredData(
  lang: Locale,
  pageTitle: string,
  pageDescription: string
) {
  const pagePath = beyondAiShareRecord.paths[lang];
  const pageUrl = absoluteUrl(pagePath);
  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const homeName = lang === 'pl' ? 'Start' : 'Home';
  const projectsName = lang === 'pl' ? 'Projekty' : 'Projects';
  const projectsPath = lang === 'pl' ? '/pl/projects/' : '/projects/';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': webpageId,
        '@type': 'WebPage',
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        inLanguage: lang,
        dateModified: beyondAiShareRecord.dateModified,
        isPartOf: { '@id': WEBSITE_ENTITY_ID },
        breadcrumb: { '@id': breadcrumbId },
        mainEntity: { '@id': beyondAiShareRecord.projectId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(beyondAiShareRecord.socialImage),
          width: 1200,
          height: 630
        }
      },
      {
        '@id': breadcrumbId,
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeName,
            item: absoluteUrl(lang === 'pl' ? '/pl/' : '/')
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: projectsName,
            item: absoluteUrl(projectsPath)
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: beyondAiShareRecord.name,
            item: pageUrl
          }
        ]
      },
      {
        '@id': beyondAiShareRecord.projectId,
        '@type': 'ResearchProject',
        name: beyondAiShareRecord.name,
        description: pageDescription,
        url: absoluteUrl(beyondAiShareRecord.paths.en),
        founder: { '@id': AUTHOR_ENTITY_ID },
        subjectOf: { '@id': beyondAiShareRecord.preprint.url }
      },
      {
        '@id': beyondAiShareRecord.preprint.url,
        '@type': 'ScholarlyArticle',
        name: beyondAiShareRecord.preprint.title,
        headline: beyondAiShareRecord.preprint.title,
        url: beyondAiShareRecord.preprint.url,
        sameAs: beyondAiShareRecord.preprint.recordUrl,
        author: { '@id': AUTHOR_ENTITY_ID },
        datePublished: beyondAiShareRecord.preprint.publicationDate,
        inLanguage: 'en',
        version: beyondAiShareRecord.preprint.version,
        creativeWorkStatus: 'Preprint - not peer-reviewed',
        isAccessibleForFree: true,
        license: beyondAiShareRecord.preprint.licenseUrl,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'DOI',
          value: beyondAiShareRecord.preprint.doi
        },
        publisher: {
          '@type': 'Organization',
          name: 'Zenodo',
          url: 'https://zenodo.org/'
        },
        about: { '@id': beyondAiShareRecord.projectId }
      },
      getAuthorEntity(lang)
    ]
  };
}
