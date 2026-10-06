const SITE_URL = 'https://promptedpsyche.com';
const ZENODO_RECORDS_URL = 'https://zenodo.org/records';

export const PUBLICATION_AUTHOR = 'Feliks Mamczur';
export const PUBLICATION_AUTHOR_ORCID = '0009-0001-0715-0517';
export const PUBLICATION_LICENSE = {
  name: 'CC BY 4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/'
} as const;

export type PublicationFile = {
  filename: string;
  url: string;
  checksum: `md5:${string}`;
  size: number;
};

export type ScholarlyPublication = {
  title: string;
  doi: `10.5281/zenodo.${string}`;
  doiUrl: `https://doi.org/${string}`;
  zenodoRecordUrl: `https://zenodo.org/records/${string}`;
  publicationDate: `${number}-${number}-${number}`;
  version?: string;
  author: typeof PUBLICATION_AUTHOR;
  orcid: typeof PUBLICATION_AUTHOR_ORCID;
  landingPath: `/${string}/`;
  landingUrl: `https://promptedpsyche.com/${string}/`;
  pdf: PublicationFile;
  license: typeof PUBLICATION_LICENSE;
  publicationType: string;
  status: string;
  translationKey?: string;
  abstract?: string;
  appendix?: PublicationFile;
};

function zenodoFile(recordId: string, filename: string): string {
  return `${ZENODO_RECORDS_URL}/${recordId}/files/${filename}`;
}

export const publications = [
  {
    title: 'Trust in the age of ready-made answers',
    doi: '10.5281/zenodo.21301650',
    doiUrl: 'https://doi.org/10.5281/zenodo.21301650',
    zenodoRecordUrl: 'https://zenodo.org/records/21301650',
    publicationDate: '2026-07-02',
    version: '1.0',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/articles/trust-in-the-age-of-ready-made-answers/',
    landingUrl: `${SITE_URL}/articles/trust-in-the-age-of-ready-made-answers/`,
    pdf: {
      filename: 'feliks-mamczur-trust-in-the-age-of-ready-made-answers-v1.0-CC-BY.pdf',
      url: zenodoFile(
        '21301650',
        'feliks-mamczur-trust-in-the-age-of-ready-made-answers-v1.0-CC-BY.pdf'
      ),
      checksum: 'md5:a993e2b0b42140ea3be8e8fb47f3ccbe',
      size: 165674
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Conceptual essay and narrative synthesis',
    status: 'Published on Zenodo; not peer-reviewed',
    translationKey: 'ai-path-to-knowledge'
  },
  {
    title: 'Are we afraid of AI, or of ourselves?',
    doi: '10.5281/zenodo.21340181',
    doiUrl: 'https://doi.org/10.5281/zenodo.21340181',
    zenodoRecordUrl: 'https://zenodo.org/records/21340181',
    publicationDate: '2026-07-04',
    version: '2.1',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    landingUrl: `${SITE_URL}/articles/are-we-afraid-of-ai-or-of-ourselves/`,
    pdf: {
      filename: 'feliks-mamczur-are-we-afraid-of-ai-or-of-ourselves-v2.1.pdf',
      url: zenodoFile(
        '21340181',
        'feliks-mamczur-are-we-afraid-of-ai-or-of-ourselves-v2.1.pdf'
      ),
      checksum: 'md5:96b3b528627c429c88b6374426173c05',
      size: 549869
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Conceptual essay and selective narrative synthesis',
    status: 'Published on Zenodo; not peer-reviewed',
    translationKey: 'ai-fears-human-self-fear'
  },
  {
    title: 'What changes when AI has a body?',
    doi: '10.5281/zenodo.21296384',
    doiUrl: 'https://doi.org/10.5281/zenodo.21296384',
    zenodoRecordUrl: 'https://zenodo.org/records/21296384',
    publicationDate: '2026-07-10',
    version: '1.0',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/articles/what-changes-when-ai-has-a-body/',
    landingUrl: `${SITE_URL}/articles/what-changes-when-ai-has-a-body/`,
    pdf: {
      filename: 'feliks-mamczur-what-changes-when-ai-has-a-body-v1.0-CC-BY.pdf',
      url: zenodoFile(
        '21296384',
        'feliks-mamczur-what-changes-when-ai-has-a-body-v1.0-CC-BY.pdf'
      ),
      checksum: 'md5:32f219b778ebda8afda9f192cd95799c',
      size: 469365
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Research-informed essay',
    status: 'Published on Zenodo; not presented as peer-reviewed',
    translationKey: 'embodied-ai-body'
  },
  {
    title: "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
    doi: '10.5281/zenodo.21358687',
    doiUrl: 'https://doi.org/10.5281/zenodo.21358687',
    zenodoRecordUrl: 'https://zenodo.org/records/21358687',
    publicationDate: '2026-07-14',
    version: '1.0',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/articles/dont-ask-whether-ai-makes-us-dumber/',
    landingUrl: `${SITE_URL}/articles/dont-ask-whether-ai-makes-us-dumber/`,
    pdf: {
      filename: 'feliks-mamczur-dont-ask-whether-ai-makes-us-dumber-v1.0.pdf',
      url: zenodoFile(
        '21358687',
        'feliks-mamczur-dont-ask-whether-ai-makes-us-dumber-v1.0.pdf'
      ),
      checksum: 'md5:bcd271489f0e5f3387a22692baec2939',
      size: 212826
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Research-informed narrative synthesis',
    status: 'Published on Zenodo; not peer-reviewed',
    translationKey: 'ai-thinking-practice'
  },
  {
    title: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
    doi: '10.5281/zenodo.21491639',
    doiUrl: 'https://doi.org/10.5281/zenodo.21491639',
    zenodoRecordUrl: 'https://zenodo.org/records/21491639',
    publicationDate: '2026-07-22',
    version: '1.7',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/articles/when-search-becomes-an-answer/',
    landingUrl: `${SITE_URL}/articles/when-search-becomes-an-answer/`,
    pdf: {
      filename: 'feliks-mamczur-when-search-becomes-an-answer-v1.7.pdf',
      url: zenodoFile(
        '21491639',
        'feliks-mamczur-when-search-becomes-an-answer-v1.7.pdf'
      ),
      checksum: 'md5:20d4292c2650e64274b0793a596631aa',
      size: 366744
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Conceptual essay and narrative synthesis',
    status: 'Published on Zenodo; not peer-reviewed',
    translationKey: 'generative-search-learning'
  },
  {
    title:
      'Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice',
    doi: '10.5281/zenodo.21705721',
    doiUrl: 'https://doi.org/10.5281/zenodo.21705721',
    zenodoRecordUrl: 'https://zenodo.org/records/21705721',
    publicationDate: '2026-07-30',
    version: '1.0',
    author: PUBLICATION_AUTHOR,
    orcid: PUBLICATION_AUTHOR_ORCID,
    landingPath: '/projects/beyond-ai-share/',
    landingUrl: `${SITE_URL}/projects/beyond-ai-share/`,
    pdf: {
      filename: 'Beyond_AI_Share_Preprint_v1.0.pdf',
      url: zenodoFile('21705721', 'Beyond_AI_Share_Preprint_v1.0.pdf'),
      checksum: 'md5:ea3fbc1b18afc6796271f34060cbaa8c',
      size: 872670
    },
    appendix: {
      filename: 'Beyond_AI_Share_Appendix_A_v1.0.pdf',
      url: zenodoFile('21705721', 'Beyond_AI_Share_Appendix_A_v1.0.pdf'),
      checksum: 'md5:d20f33c3f1cc8127fd594aa9f241ad40',
      size: 204254
    },
    license: PUBLICATION_LICENSE,
    publicationType: 'Preprint',
    status: 'Preprint; not peer-reviewed',
    abstract:
      'AI involvement in creative work can be described by quantity, but quantity alone does not reveal how decisions are organized or whether human input remains consequential. This preregistered cross-sectional online survey with two within-person vignettes examined perceived authorship, authenticity, and control in AI-assisted creative practice. The full sample comprised 429 adults, including 164 creators who used AI. Among these creators, declared AI share was not negatively associated with perceived authorship (r = .141, p = .071), contrary to H1. Perceived control was positively associated with authorship (r = .234, p = .003), supporting H2. Control did not moderate the association between AI share and authenticity (interaction b = .043, p = .559), so H3 was not supported. In the full sample, expressive orientation toward art was associated with creative identity threat (r = .341, p < .001), cautiously supporting H4. The strongest result was the vignette contrast: a human-directed process involving idea formation, selection, and substantial revision was evaluated more favorably than acceptance of a near-final AI output (mean difference = .836, t = 13.628, p < .001, dz = .659). Several short indicators had low reliability, limiting strong inference. Meaningful human control is therefore used only as an interpretive lens, not as a validated model. The findings suggest that digital creative practice and tool design should attend to process structure and consequential human control rather than relying on AI-share estimates alone.'
  }
] as const satisfies readonly ScholarlyPublication[];

export function getPublicationByDoi(doi: string | undefined): ScholarlyPublication | undefined {
  return publications.find((publication) => publication.doi === doi);
}

export function getPublicationByLandingPath(pathname: string): ScholarlyPublication | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return publications.find((publication) => publication.landingPath === path);
}

export function getPublicationByTranslationKey(
  translationKey: string | undefined
): ScholarlyPublication | undefined {
  return publications.find(
    (publication) =>
      'translationKey' in publication && publication.translationKey === translationKey
  );
}
