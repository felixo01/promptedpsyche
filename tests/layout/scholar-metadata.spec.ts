import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { publications as publicationRegistry } from '../../src/lib/publications';

type JsonLd = Record<string, unknown>;

type SearchItem = {
  title: string;
  url: string;
  type: 'article' | 'note' | 'concept' | 'practice' | 'topic' | 'project';
  language: 'en' | 'pl';
};

type ScholarPublication = {
  route: string;
  alternateRoute: string;
  sourceFile?: string;
  title: string;
  visibleHeading: string;
  publishedAt: string;
  updatedAt?: string;
  doi: string;
  pdfUrl: string;
  zenodoUrl: string;
  kind: 'article' | 'preprint';
  appendixUrl?: string;
};

const siteUrl = 'https://promptedpsyche.com';
const authorName = 'Feliks Mamczur';
const authorEntityId = `${siteUrl}/#feliks-mamczur`;
const versionDoi = '10.5281/zenodo.21491639';
const conceptDoi = '10.5281/zenodo.21491638';
const beyondAbstract =
  'AI involvement in creative work can be described by quantity, but quantity alone does not reveal how decisions are organized or whether human input remains consequential. This preregistered cross-sectional online survey with two within-person vignettes examined perceived authorship, authenticity, and control in AI-assisted creative practice. The full sample comprised 429 adults, including 164 creators who used AI. Among these creators, declared AI share was not negatively associated with perceived authorship (r = .141, p = .071), contrary to H1. Perceived control was positively associated with authorship (r = .234, p = .003), supporting H2. Control did not moderate the association between AI share and authenticity (interaction b = .043, p = .559), so H3 was not supported. In the full sample, expressive orientation toward art was associated with creative identity threat (r = .341, p < .001), cautiously supporting H4. The strongest result was the vignette contrast: a human-directed process involving idea formation, selection, and substantial revision was evaluated more favorably than acceptance of a near-final AI output (mean difference = .836, t = 13.628, p < .001, dz = .659). Several short indicators had low reliability, limiting strong inference. Meaningful human control is therefore used only as an interpretive lens, not as a validated model. The findings suggest that digital creative practice and tool design should attend to process structure and consequential human control rather than relying on AI-share estimates alone.';

const scholarPublications: ScholarPublication[] = [
  {
    route: '/articles/trust-in-the-age-of-ready-made-answers/',
    alternateRoute: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
    sourceFile: 'src/content/articles/trust-in-the-age-of-ready-made-answers.md',
    title: 'Trust in the age of ready-made answers',
    visibleHeading: 'Trust in the age of ready-made answers',
    publishedAt: '2026-07-02',
    updatedAt: '2026-07-10',
    doi: '10.5281/zenodo.21301650',
    pdfUrl:
      'https://zenodo.org/records/21301650/files/feliks-mamczur-trust-in-the-age-of-ready-made-answers-v1.0-CC-BY.pdf',
    zenodoUrl: 'https://zenodo.org/records/21301650',
    kind: 'article'
  },
  {
    route: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    alternateRoute: '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
    sourceFile: 'src/content/articles/are-we-afraid-of-ai-or-of-ourselves.md',
    title: 'Are we afraid of AI, or of ourselves?',
    visibleHeading: 'Are we afraid of AI, or of ourselves?',
    publishedAt: '2026-07-04',
    updatedAt: '2026-07-13',
    doi: '10.5281/zenodo.21340181',
    pdfUrl:
      'https://zenodo.org/records/21340181/files/feliks-mamczur-are-we-afraid-of-ai-or-of-ourselves-v2.1.pdf',
    zenodoUrl: 'https://zenodo.org/records/21340181',
    kind: 'article'
  },
  {
    route: '/articles/what-changes-when-ai-has-a-body/',
    alternateRoute: '/pl/articles/co-sie-zmienia-kiedy-ai-ma-cialo/',
    sourceFile: 'src/content/articles/what-changes-when-ai-has-a-body.md',
    title: 'What changes when AI has a body?',
    visibleHeading: 'What changes when AI has a body?',
    publishedAt: '2026-07-10',
    doi: '10.5281/zenodo.21296384',
    pdfUrl:
      'https://zenodo.org/records/21296384/files/feliks-mamczur-what-changes-when-ai-has-a-body-v1.0-CC-BY.pdf',
    zenodoUrl: 'https://zenodo.org/records/21296384',
    kind: 'article'
  },
  {
    route: '/articles/dont-ask-whether-ai-makes-us-dumber/',
    alternateRoute: '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
    sourceFile: 'src/content/articles/dont-ask-whether-ai-makes-us-dumber.md',
    title:
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
    visibleHeading:
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
    publishedAt: '2026-07-14',
    doi: '10.5281/zenodo.21358687',
    pdfUrl:
      'https://zenodo.org/records/21358687/files/feliks-mamczur-dont-ask-whether-ai-makes-us-dumber-v1.0.pdf',
    zenodoUrl: 'https://zenodo.org/records/21358687',
    kind: 'article'
  },
  {
    route: '/articles/when-search-becomes-an-answer/',
    alternateRoute: '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/',
    sourceFile: 'src/content/articles/when-search-becomes-an-answer.mdx',
    title: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
    visibleHeading: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
    publishedAt: '2026-07-22',
    doi: versionDoi,
    pdfUrl:
      'https://zenodo.org/records/21491639/files/feliks-mamczur-when-search-becomes-an-answer-v1.7.pdf',
    zenodoUrl: 'https://zenodo.org/records/21491639',
    kind: 'article'
  },
  {
    route: '/projects/beyond-ai-share/',
    alternateRoute: '/pl/projects/beyond-ai-share/',
    title:
      'Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice',
    visibleHeading: 'Beyond AI Share',
    publishedAt: '2026-07-30',
    updatedAt: '2026-08-04',
    doi: '10.5281/zenodo.21705721',
    pdfUrl:
      'https://zenodo.org/records/21705721/files/Beyond_AI_Share_Preprint_v1.0.pdf',
    zenodoUrl: 'https://zenodo.org/records/21705721',
    appendixUrl:
      'https://zenodo.org/records/21705721/files/Beyond_AI_Share_Appendix_A_v1.0.pdf',
    kind: 'preprint'
  }
];

const draftEntries = [
  {
    route: '/articles/ai-literacy-is-not-prompt-engineering/',
    title: 'AI Literacy Is Not Prompt Engineering'
  },
  {
    route: '/articles/why-people-trust-ai-even-when-they-shouldnt/',
    title: "Why People Trust AI Even When They Shouldn't"
  },
  {
    route: '/notes/we-prompt-machines-machines-prompt-us-back/',
    title: 'We Prompt Machines. Machines Prompt Us Back'
  },
  {
    route: '/concepts/cyberpsychology-of-ai/',
    title: 'What Is Cyberpsychology of AI?'
  },
  {
    route: '/concepts/human-ai-interaction-why-companies-should-care/',
    title: 'Human-AI Interaction: Why Companies Should Care'
  }
] as const;

const requiredCitationNames = [
  'citation_author',
  'citation_doi',
  'citation_language',
  'citation_pdf_url',
  'citation_publication_date',
  'citation_title'
].sort();

function formatScholarDate(value: string) {
  return value.replaceAll('-', '/');
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readFrontmatterScalar(sourceFile: string, field: string) {
  const source = fs.readFileSync(path.join(process.cwd(), sourceFile), 'utf8');
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? '';
  const escapedField = escapeRegExp(field);
  const match = frontmatter.match(
    new RegExp(`^${escapedField}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\r\\n#]+))\\s*$`, 'm')
  );

  return (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim();
}

function readBuiltSitemap() {
  const distPath = path.join(process.cwd(), 'dist');
  const sitemapFiles = fs
    .readdirSync(distPath)
    .filter((fileName) => /^sitemap-\d+\.xml$/.test(fileName));

  expect(sitemapFiles.length, 'a production build should generate a sitemap').toBeGreaterThan(0);

  return sitemapFiles
    .map((fileName) => fs.readFileSync(path.join(distPath, fileName), 'utf8'))
    .join('\n');
}

async function readSearchIndexes(request: APIRequestContext) {
  const [englishResponse, polishResponse] = await Promise.all([
    request.get('/search-index.en.json'),
    request.get('/search-index.pl.json')
  ]);

  expect(englishResponse.ok()).toBeTruthy();
  expect(polishResponse.ok()).toBeTruthy();

  return [
    ...((await englishResponse.json()) as SearchItem[]),
    ...((await polishResponse.json()) as SearchItem[])
  ];
}

function citationNamesFromHtml(html: string) {
  return [
    ...html.matchAll(
      /<meta\b[^>]*\bname\s*=\s*(["'])(citation_[^"']+)\1[^>]*>/giu
    )
  ].map((match) => match[2].toLowerCase());
}

async function requestHtml(request: APIRequestContext, route: string) {
  const response = await request.get(route);

  expect(response.status(), `${route} should return HTTP 200`).toBe(200);
  return response.text();
}

async function readJsonLdGraph(page: Page) {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();

  return scripts.flatMap((source) => {
    const value = JSON.parse(source) as JsonLd;
    const graph = value['@graph'];

    return Array.isArray(graph) ? (graph as JsonLd[]) : [value];
  });
}

function findTypedNode(graph: JsonLd[], type: string) {
  return graph.find((node) => {
    const nodeType = node['@type'];
    return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type;
  });
}

test.describe('Google Scholar metadata hard gate', () => {
  for (const publication of scholarPublications) {
    test(`${publication.title} exposes one complete and internally consistent Scholar record`, async ({
      page
    }) => {
      // 1. Every Scholar-primary page responds successfully.
      const response = await page.goto(publication.route);
      expect(response?.status()).toBe(200);

      const citationTitle = page.locator('meta[name="citation_title"]');
      const citationAuthor = page.locator('meta[name="citation_author"]');
      const citationDate = page.locator('meta[name="citation_publication_date"]');
      const citationLanguage = page.locator('meta[name="citation_language"]');
      const citationDoi = page.locator('meta[name="citation_doi"]');
      const citationPdf = page.locator('meta[name="citation_pdf_url"]');

      // 2-3. The sole citation title matches the protected registry title. Article H1s
      // use that title directly; the preprint remains inside its established project page.
      await expect(citationTitle).toHaveCount(1);
      await expect(citationTitle).toHaveAttribute('content', publication.title);
      await expect(page.locator('article h1')).toHaveCount(1);
      await expect(page.locator('article h1')).toHaveText(publication.visibleHeading);
      if (publication.sourceFile) {
        expect(readFrontmatterScalar(publication.sourceFile, 'title')).toBe(publication.title);
      } else {
        await expect(page.getByText(publication.title, { exact: true })).toHaveCount(1);
      }

      // 4-6. The record contains one plain author name, without ORCID or credentials.
      await expect(citationAuthor).toHaveCount(1);
      await expect(citationAuthor).toHaveAttribute('content', authorName);
      const citationAuthorValue = (await citationAuthor.getAttribute('content')) ?? '';
      expect(citationAuthorValue).not.toMatch(/orcid|https?:\/\/orcid\.org|\b(?:dr|prof)\.?\b|ph\.?d/iu);
      if (publication.sourceFile) {
        expect(readFrontmatterScalar(publication.sourceFile, 'author')).toBe(authorName);
      }

      // 7-10. Scholar uses publishedAt in YYYY/MM/DD form, never updatedAt.
      const expectedPublicationDate = formatScholarDate(publication.publishedAt);
      await expect(citationDate).toHaveCount(1);
      await expect(citationDate).toHaveAttribute('content', expectedPublicationDate);
      expect(expectedPublicationDate).toMatch(/^\d{4}\/\d{2}\/\d{2}$/u);
      if (publication.sourceFile) {
        expect(readFrontmatterScalar(publication.sourceFile, 'publishedAt')).toBe(
          publication.publishedAt
        );
      }
      if (publication.updatedAt) {
        expect(publication.updatedAt).not.toBe(publication.publishedAt);
        expect(expectedPublicationDate).not.toBe(formatScholarDate(publication.updatedAt));
        expect(await citationDate.getAttribute('content')).not.toBe(
          formatScholarDate(publication.updatedAt)
        );
      }

      // 11-15. Language and Version DOI are exact and contain no URL or Concept DOI.
      await expect(citationLanguage).toHaveCount(1);
      await expect(citationLanguage).toHaveAttribute('content', 'en');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(citationDoi).toHaveCount(1);
      await expect(citationDoi).toHaveAttribute('content', publication.doi);
      const citationDoiValue = (await citationDoi.getAttribute('content')) ?? '';
      expect(citationDoiValue).not.toContain('https://doi.org/');
      expect(citationDoiValue).not.toBe(conceptDoi);
      if (publication.route === '/articles/when-search-becomes-an-answer/') {
        expect(citationDoiValue).toBe(versionDoi);
      }

      // 16-18. The exact deposited PDF is discoverable without fabricated journal fields.
      await expect(page.locator('meta[name="citation_journal_title"]')).toHaveCount(0);
      await expect(page.locator('meta[name="citation_issn"]')).toHaveCount(0);
      await expect(citationPdf).toHaveCount(1);
      await expect(citationPdf).toHaveAttribute('content', publication.pdfUrl);

      // 24 and 38. DOI is never orphaned and every allowed Scholar tag occurs exactly once.
      const citationNames = await page.locator('meta[name^="citation_"]').evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute('name') ?? '').sort()
      );
      expect(citationNames).toEqual(requiredCitationNames);

      // 28. The complete article is visible without a reveal control or login gate.
      const publicationContent = publication.kind === 'article' ? page.locator('.prose') : page.locator('main');
      await expect(publicationContent).toBeVisible();
      expect((await publicationContent.innerText()).trim().length).toBeGreaterThan(5_000);
      await expect(page.getByRole('button', { name: /show full text|read full text|sign in|log in/iu })).toHaveCount(0);

      // 29. Neither the general robots tag nor Googlebot carries noindex.
      const robotsValues = await page
        .locator('meta[name="robots"], meta[name="googlebot"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('content') ?? ''));
      expect(robotsValues.every((value) => !/\bnoindex\b/iu.test(value))).toBe(true);

      // 30. The canonical is unique and self-referential.
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      await expect(canonical).toHaveAttribute('href', `${siteUrl}${publication.route}`);

      // 31. EN, PL and x-default alternates continue to describe the translation pair.
      const englishAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
      const polishAlternate = page.locator('link[rel="alternate"][hreflang="pl"]');
      const defaultAlternate = page.locator('link[rel="alternate"][hreflang="x-default"]');
      await expect(englishAlternate).toHaveCount(1);
      await expect(polishAlternate).toHaveCount(1);
      await expect(defaultAlternate).toHaveCount(1);
      await expect(englishAlternate).toHaveAttribute('href', `${siteUrl}${publication.route}`);
      await expect(polishAlternate).toHaveAttribute(
        'href',
        `${siteUrl}${publication.alternateRoute}`
      );
      await expect(defaultAlternate).toHaveAttribute('href', `${siteUrl}${publication.route}`);

      // 32-34. Structured data, Person identity, dates and DOI match the Scholar record
      // without upgrading the five research-informed essays to ScholarlyArticle.
      const graph = await readJsonLdGraph(page);
      const expectedSchemaType = publication.kind === 'preprint' ? 'ScholarlyArticle' : 'Article';
      const publicationNodes = graph.filter((node) => node['@type'] === expectedSchemaType);
      expect(publicationNodes).toHaveLength(1);
      if (publication.kind === 'article') {
        expect(findTypedNode(graph, 'ScholarlyArticle')).toBeUndefined();
      } else {
        expect(findTypedNode(graph, 'Article')).toBeUndefined();
      }

      const publicationNode = publicationNodes[0];
      expect(publicationNode.headline).toBe(publication.title);
      expect(publicationNode.url).toBe(`${siteUrl}${publication.route}`);
      expect(publicationNode.inLanguage).toBe('en');
      expect(String(publicationNode.datePublished)).toMatch(
        new RegExp(`^${escapeRegExp(publication.publishedAt)}(?:T|$)`)
      );
      if (publication.updatedAt && publication.kind === 'article') {
        expect(String(publicationNode.dateModified)).toMatch(
          new RegExp(`^${escapeRegExp(publication.updatedAt)}T`)
        );
        expect(String(publicationNode.datePublished)).not.toBe(String(publicationNode.dateModified));
      }

      const author = publicationNode.author as JsonLd;
      if (publication.kind === 'article') {
        expect(author).toMatchObject({
          '@id': authorEntityId,
          '@type': 'Person',
          name: authorName,
          url: `${siteUrl}/about/`,
          sameAs: expect.arrayContaining(['https://orcid.org/0009-0001-0715-0517'])
        });
      } else {
        expect(author).toEqual({ '@id': authorEntityId });
        const authorEntity = findTypedNode(graph, 'Person');
        expect(authorEntity).toMatchObject({
          '@id': authorEntityId,
          name: authorName,
          sameAs: expect.arrayContaining(['https://orcid.org/0009-0001-0715-0517'])
        });
      }

      const identifier = publicationNode.identifier as JsonLd;
      expect(identifier).toEqual({
        '@type': 'PropertyValue',
        propertyID: 'DOI',
        value: citationDoiValue
      });
      expect(publicationNode.sameAs).toEqual([
        `https://doi.org/${citationDoiValue}`,
        publication.zenodoUrl
      ]);
      expect(publicationNode.encoding).toMatchObject({
        '@type': 'MediaObject',
        contentUrl: publication.pdfUrl,
        encodingFormat: 'application/pdf'
      });

      if (publication.kind === 'preprint') {
        expect(publicationNode.abstract).toBe(beyondAbstract);
        await expect(page.locator('#preprint-abstract-title')).toHaveText('Abstract');
        await expect(page.locator('#preprint-abstract-title + .editorial-copy > p').first()).toHaveText(
          beyondAbstract
        );
        await expect(page.locator(`a[href="${publication.pdfUrl}"]`)).toHaveCount(2);
        await expect(page.locator(`a[href="${publication.appendixUrl}"]`)).toHaveCount(1);
      } else {
        const fileLinks = page.locator('[data-qa="publication-files"]');
        await expect(fileLinks.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
          'href',
          publication.pdfUrl
        );
        await expect(fileLinks.getByRole('link', { name: 'Zenodo record' })).toHaveAttribute(
          'href',
          publication.zenodoUrl
        );
      }
    });

    const sourceFile = publication.sourceFile;
    if (sourceFile && publication.route !== '/articles/what-changes-when-ai-has-a-body/') {
      test(`${publication.title} has a parser-friendly References section`, async ({ page }) => {
        await page.goto(publication.route);

        // 25-27. References is an exact standalone heading followed by a semantic ordered list.
        const source = fs.readFileSync(path.join(process.cwd(), sourceFile), 'utf8');
        expect(source).toMatch(/^## References\s*$/mu);

        const referencesHeading = page.locator('.prose > h2').filter({ hasText: /^References$/u });
        await expect(referencesHeading).toHaveCount(1);
        await expect(referencesHeading).toHaveText('References');

        const bibliography = referencesHeading.locator('xpath=following-sibling::*[1]');
        await expect(bibliography).toHaveCount(1);
        expect(await bibliography.evaluate((node) => node.tagName)).toBe('OL');

        const citations = bibliography.locator(':scope > li');
        expect(await citations.count()).toBeGreaterThan(5);
        const citationTexts = await citations.allTextContents();
        expect(citationTexts.every((citation) => citation.trim().length > 20)).toBe(true);
      });
    }
  }

  test('15 keeps a DOI-less non-primary Article free of fabricated DOI metadata', async ({
    page
  }) => {
    const sourceFile = 'src/content/articles/it-is-not-just-about-the-prompt.md';
    expect(readFrontmatterScalar(sourceFile, 'doi')).toBe('');

    await page.goto('/articles/it-is-not-just-about-the-prompt/');
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
  });

  test('19-24 keep every non-primary Article, Note, Concept, Practice, Project and Consulting page outside Scholar metadata', async ({
    request
  }, testInfo) => {
    testInfo.setTimeout(120_000);

    const searchItems = await readSearchIndexes(request);
    const primaryRoutes = new Set(scholarPublications.map((publication) => publication.route));
    const gatedTypes = new Set<SearchItem['type']>([
      'article',
      'note',
      'concept',
      'practice',
      'project'
    ]);
    const nonPrimaryItems = searchItems.filter(
      (item) => gatedTypes.has(item.type) && !primaryRoutes.has(item.url)
    );

    for (const type of gatedTypes) {
      expect(
        nonPrimaryItems.filter((item) => item.type === type).length,
        `the exhaustive hard-gate check should include ${type} pages`
      ).toBeGreaterThan(0);
    }

    const indexAndConsultingRoutes = [
      '/articles/',
      '/pl/articles/',
      '/notes/',
      '/pl/notes/',
      '/concepts/',
      '/pl/concepts/',
      '/practice/',
      '/pl/practice/',
      '/consulting/',
      '/pl/consulting/'
    ];
    const routes = [
      ...new Set([...nonPrimaryItems.map((item) => item.url), ...indexAndConsultingRoutes])
    ];

    for (let offset = 0; offset < routes.length; offset += 12) {
      const batch = routes.slice(offset, offset + 12);
      const pages = await Promise.all(
        batch.map(async (route) => ({ route, html: await requestHtml(request, route) }))
      );

      for (const { route, html } of pages) {
        expect(citationNamesFromHtml(html), `${route} must have zero citation_* tags`).toEqual([]);
      }
    }
  });

  test('keeps the registry, protected titles and six canonical landing paths in lockstep', () => {
    expect(publicationRegistry).toHaveLength(scholarPublications.length);

    for (const expected of scholarPublications) {
      const registered = publicationRegistry.find((publication) => publication.doi === expected.doi);
      expect(registered, expected.doi).toMatchObject({
        title: expected.title,
        doi: expected.doi,
        doiUrl: `https://doi.org/${expected.doi}`,
        zenodoRecordUrl: expected.zenodoUrl,
        publicationDate: expected.publishedAt,
        landingPath: expected.route,
        landingUrl: `${siteUrl}${expected.route}`,
        author: authorName,
        orcid: '0009-0001-0715-0517',
        pdf: { url: expected.pdfUrl }
      });

      if (expected.sourceFile) {
        expect(readFrontmatterScalar(expected.sourceFile, 'title')).toBe(expected.title);
      }
    }
  });

  test('publishes one indexable overview with all six canonical records and reciprocal locale links', async ({
    page
  }) => {
    await page.goto('/publications/');

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${siteUrl}/publications/`
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      `${siteUrl}/publications/`
    );
    await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
      'href',
      `${siteUrl}/pl/publications/`
    );
    await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);

    const cards = page.locator('[data-qa="publication-list"] > [data-doi]');
    await expect(cards).toHaveCount(scholarPublications.length);
    for (const publication of scholarPublications) {
      const card = page.locator(
        `[data-qa="publication-list"] > [data-doi="${publication.doi}"]`
      );
      await expect(card).toHaveCount(1);
      await expect(card.getByRole('heading', { name: publication.title, exact: true })).toBeVisible();
      await expect(card.locator(`a[href="https://doi.org/${publication.doi}"]`)).toHaveCount(1);
      await expect(card.locator(`a[href="${publication.route}"]`)).toHaveCount(1);
      await expect(card.locator(`a[href="${publication.pdfUrl}"]`)).toHaveCount(1);
      await expect(card.locator(`a[href="${publication.zenodoUrl}"]`)).toHaveCount(1);
    }

    expect(readBuiltSitemap()).toContain(`<loc>${siteUrl}/publications/</loc>`);

    await page.goto('/pl/publications/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${siteUrl}/pl/publications/`
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      `${siteUrl}/publications/`
    );
    await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
      'href',
      `${siteUrl}/pl/publications/`
    );
    await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);

    for (const route of ['/', '/about/', '/projects/']) {
      await page.goto(route);
      await expect(page.locator(`main a[href="/publications/"]`).first()).toBeVisible();
      await expect(page.locator('footer a[href="/publications/"]')).toBeVisible();
    }
  });

  test('keeps every Polish companion page outside direct Scholar ownership', async ({ page }) => {
    for (const publication of scholarPublications) {
      await page.goto(publication.alternateRoute);
      await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute(
        'href',
        `${siteUrl}${publication.alternateRoute}`
      );

      const graph = await readJsonLdGraph(page);
      if (publication.kind === 'article') {
        const article = findTypedNode(graph, 'Article');
        expect(article?.identifier).toBeUndefined();
        expect(article?.sameAs).toBeUndefined();
      } else {
        const webpage = findTypedNode(graph, 'WebPage');
        const preprint = findTypedNode(graph, 'ScholarlyArticle');
        expect(webpage?.url).toBe(`${siteUrl}${publication.alternateRoute}`);
        expect(preprint?.url).toBe(`${siteUrl}${publication.route}`);
        expect(preprint?.identifier).toMatchObject({ propertyID: 'DOI', value: publication.doi });
      }
    }
  });

  test('35 includes every Scholar-primary URL exactly once in the production sitemap', () => {
    const sitemap = readBuiltSitemap();

    for (const publication of scholarPublications) {
      const location = `<loc>${siteUrl}${publication.route}</loc>`;
      expect(sitemap).toContain(location);
      expect(sitemap.match(new RegExp(escapeRegExp(location), 'gu')) ?? []).toHaveLength(1);
    }
  });

  test('36 exposes every canonical DOI publication in the English search index', async ({
    request
  }) => {
    const response = await request.get('/search-index.en.json');
    expect(response.ok()).toBeTruthy();
    const entries = (await response.json()) as SearchItem[];

    for (const publication of scholarPublications) {
      const matches = entries.filter(
        (entry) =>
          entry.type === (publication.kind === 'article' ? 'article' : 'project') &&
          entry.url === publication.route &&
          entry.title === (publication.kind === 'article' ? publication.title : 'Beyond AI Share') &&
          entry.language === 'en'
      );
      expect(matches, publication.route).toHaveLength(1);
    }
  });

  test('37 keeps every known draft out of routes, search and the sitemap', async ({ request }) => {
    const [searchItems, sitemap] = await Promise.all([
      readSearchIndexes(request),
      Promise.resolve(readBuiltSitemap())
    ]);
    const serializedSearch = JSON.stringify(searchItems);

    for (const draft of draftEntries) {
      expect(serializedSearch).not.toContain(draft.title);
      expect(serializedSearch).not.toContain(draft.route);
      expect(sitemap).not.toContain(draft.route);

      const response = await request.get(draft.route);
      expect(response.status(), `${draft.route} must remain unpublished`).toBe(404);
    }
  });

  test('keeps the Scholar visual QA set responsive and free of actionable console errors', async ({
    page
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(error.message));

    const targets = [
      ...scholarPublications.map((publication) => ({
        route: publication.route,
        isPublication: true,
        kind: publication.kind
      })),
      { route: '/articles/', isPublication: false, kind: undefined },
      { route: '/about/', isPublication: false, kind: undefined },
      { route: '/pl/about/', isPublication: false, kind: undefined }
    ];

    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });

      for (const target of targets) {
        await page.goto(target.route);
        const h1 = page.locator('main h1');
        const h1Texts = await h1.allTextContents();
        expect(h1Texts, `${target.route} at ${width}px`).toHaveLength(1);
        await expect(h1).toBeVisible();

        const dimensions = await page.evaluate(() => ({
          bodyScrollWidth: document.body.scrollWidth,
          documentClientWidth: document.documentElement.clientWidth,
          documentScrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        }));
        expect(dimensions.documentScrollWidth, `${target.route} at ${width}px`).toBeLessThanOrEqual(
          dimensions.documentClientWidth + 1
        );
        expect(dimensions.bodyScrollWidth, `${target.route} at ${width}px`).toBeLessThanOrEqual(
          dimensions.innerWidth + 1
        );

        if (target.isPublication) {
          if (target.kind === 'article') {
            await expect(page.locator('.content-header .lede')).toBeVisible();
            await expect(page.locator('[data-qa="article-byline"]')).toContainText(authorName);
            await expect(page.locator('[data-qa="article-byline"] time').first()).toBeVisible();
            await expect(page.locator('[data-qa="article-byline"] a[href^="https://doi.org/"]')).toBeVisible();
            const referencesHeading = page.locator('.prose > h2').filter({
              hasText: /^(?:References|Sources and further reading)$/u
            });
            await expect(referencesHeading).toBeVisible();
            await expect(
              referencesHeading.locator('xpath=following-sibling::*[self::ol or self::ul][1]/li').first()
            ).toBeVisible();
          } else {
            await expect(page.locator('#preprint-abstract-title')).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Public record and materials' })).toBeVisible();
          }
        }
      }
    }

    const actionableConsoleErrors = consoleErrors.filter(
      (message) =>
        message !== 'Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED' &&
        !message.includes("Error while running audit's match function: TypeError: Failed to fetch")
    );
    expect(actionableConsoleErrors).toEqual([]);
  });
});
