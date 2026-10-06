import type { Locale } from './i18n';
import { getPublicationByDoi } from './publications';
import {
  AUTHOR_ENTITY_ID,
  WEBSITE_ENTITY_ID,
  absoluteUrl,
  getAuthorEntity
} from './site';

const beyondAiSharePublication = getPublicationByDoi('10.5281/zenodo.21705721');

if (!beyondAiSharePublication) {
  throw new Error('Beyond AI Share is missing from the scholarly publication registry.');
}

export const beyondAiShareRecord = {
  name: 'Beyond AI Share',
  paths: {
    en: '/projects/beyond-ai-share/',
    pl: '/pl/projects/beyond-ai-share/'
  },
  projectId: absoluteUrl('/projects/beyond-ai-share/#research-project'),
  preprint: {
    title: beyondAiSharePublication.title,
    doi: beyondAiSharePublication.doi,
    url: beyondAiSharePublication.doiUrl,
    recordUrl: beyondAiSharePublication.zenodoRecordUrl,
    landingUrl: beyondAiSharePublication.landingUrl,
    pdfUrl: beyondAiSharePublication.pdf.url,
    pdfFilename: beyondAiSharePublication.pdf.filename,
    appendixUrl: beyondAiSharePublication.appendix?.url,
    abstract: beyondAiSharePublication.abstract,
    author: beyondAiSharePublication.author,
    publicationDate: beyondAiSharePublication.publicationDate,
    version: beyondAiSharePublication.version,
    licenseName: beyondAiSharePublication.license.name,
    licenseUrl: beyondAiSharePublication.license.url,
    publicationType: beyondAiSharePublication.publicationType,
    status: beyondAiSharePublication.status
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
  `Mamczur, F. (2026). ${beyondAiSharePublication.title} [Preprint]. Zenodo. ${beyondAiSharePublication.doiUrl}`;

export function getBeyondAiShareStructuredData(
  lang: Locale,
  pageTitle: string,
  pageDescription: string
) {
  const pagePath = beyondAiShareRecord.paths[lang];
  const pageUrl = absoluteUrl(pagePath);
  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const preprintId = `${beyondAiShareRecord.preprint.landingUrl}#preprint`;
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
        subjectOf: { '@id': preprintId }
      },
      {
        '@id': preprintId,
        '@type': 'ScholarlyArticle',
        name: beyondAiShareRecord.preprint.title,
        headline: beyondAiShareRecord.preprint.title,
        url: beyondAiShareRecord.preprint.landingUrl,
        mainEntityOfPage: beyondAiShareRecord.preprint.landingUrl,
        sameAs: [
          beyondAiShareRecord.preprint.url,
          beyondAiShareRecord.preprint.recordUrl
        ],
        author: { '@id': AUTHOR_ENTITY_ID },
        datePublished: beyondAiShareRecord.preprint.publicationDate,
        inLanguage: 'en',
        version: beyondAiShareRecord.preprint.version,
        creativeWorkStatus: 'Preprint - not peer-reviewed',
        isAccessibleForFree: true,
        license: beyondAiShareRecord.preprint.licenseUrl,
        abstract: beyondAiShareRecord.preprint.abstract,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'DOI',
          value: beyondAiShareRecord.preprint.doi
        },
        encoding: {
          '@type': 'MediaObject',
          contentUrl: beyondAiShareRecord.preprint.pdfUrl,
          encodingFormat: 'application/pdf',
          name: beyondAiShareRecord.preprint.pdfFilename
        },
        about: { '@id': beyondAiShareRecord.projectId }
      },
      getAuthorEntity(lang)
    ]
  };
}
