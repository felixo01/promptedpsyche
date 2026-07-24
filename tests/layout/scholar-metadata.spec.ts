import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

type JsonLd = Record<string, unknown>;

type SearchItem = {
  title: string;
  url: string;
  type: 'article' | 'note' | 'concept' | 'practice' | 'topic';
  language: 'en' | 'pl';
};

type ScholarPublication = {
  route: string;
  alternateRoute: string;
  sourceFile: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  doi: string;
};

const siteUrl = 'https://promptedpsyche.com';
const authorName = 'Feliks Mamczur';
const authorEntityId = `${siteUrl}/#feliks-mamczur`;
const versionDoi = '10.5281/zenodo.21491639';
const conceptDoi = '10.5281/zenodo.21491638';

const scholarPublications: ScholarPublication[] = [
  {
    route: '/articles/trust-in-the-age-of-ready-made-answers/',
    alternateRoute: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
    sourceFile: 'src/content/articles/trust-in-the-age-of-ready-made-answers.md',
    title: 'Trust in the age of ready-made answers',
    publishedAt: '2026-07-02',
    updatedAt: '2026-07-10',
    doi: '10.5281/zenodo.21301650'
  },
  {
    route: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    alternateRoute: '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
    sourceFile: 'src/content/articles/are-we-afraid-of-ai-or-of-ourselves.md',
    title: 'Are we afraid of AI, or of ourselves?',
    publishedAt: '2026-07-04',
    updatedAt: '2026-07-13',
    doi: '10.5281/zenodo.21340181'
  },
  {
    route: '/articles/dont-ask-whether-ai-makes-us-dumber/',
    alternateRoute: '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
    sourceFile: 'src/content/articles/dont-ask-whether-ai-makes-us-dumber.md',
    title:
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
    publishedAt: '2026-07-14',
    doi: '10.5281/zenodo.21358687'
  },
  {
    route: '/articles/when-search-becomes-an-answer/',
    alternateRoute: '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/',
    sourceFile: 'src/content/articles/when-search-becomes-an-answer.mdx',
    title: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
    publishedAt: '2026-07-22',
    doi: versionDoi
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

      // 2-3. The sole citation title matches both the visible H1 and source frontmatter.
      await expect(citationTitle).toHaveCount(1);
      await expect(citationTitle).toHaveAttribute('content', publication.title);
      await expect(page.locator('article h1')).toHaveCount(1);
      await expect(page.locator('article h1')).toHaveText(publication.title);
      expect(readFrontmatterScalar(publication.sourceFile, 'title')).toBe(publication.title);
      expect(readFrontmatterScalar(publication.sourceFile, 'scholarPrimary')).toBe('true');

      // 4-6. The record contains one plain author name, without ORCID or credentials.
      await expect(citationAuthor).toHaveCount(1);
      await expect(citationAuthor).toHaveAttribute('content', authorName);
      const citationAuthorValue = (await citationAuthor.getAttribute('content')) ?? '';
      expect(citationAuthorValue).not.toMatch(/orcid|https?:\/\/orcid\.org|\b(?:dr|prof)\.?\b|ph\.?d/iu);
      expect(readFrontmatterScalar(publication.sourceFile, 'author')).toBe(authorName);

      // 7-10. Scholar uses publishedAt in YYYY/MM/DD form, never updatedAt.
      const expectedPublicationDate = formatScholarDate(publication.publishedAt);
      await expect(citationDate).toHaveCount(1);
      await expect(citationDate).toHaveAttribute('content', expectedPublicationDate);
      expect(expectedPublicationDate).toMatch(/^\d{4}\/\d{2}\/\d{2}$/u);
      expect(readFrontmatterScalar(publication.sourceFile, 'publishedAt')).toBe(
        publication.publishedAt
      );
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

      // 16-18. No fabricated journal fields, ISSN or external PDF metadata are emitted.
      await expect(page.locator('meta[name="citation_journal_title"]')).toHaveCount(0);
      await expect(page.locator('meta[name="citation_issn"]')).toHaveCount(0);
      await expect(page.locator('meta[name="citation_pdf_url"]')).toHaveCount(0);

      // 24 and 38. DOI is never orphaned and every allowed Scholar tag occurs exactly once.
      const citationNames = await page.locator('meta[name^="citation_"]').evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute('name') ?? '').sort()
      );
      expect(citationNames).toEqual(requiredCitationNames);

      // 28. The complete article is visible without a reveal control or login gate.
      const prose = page.locator('.prose');
      await expect(prose).toBeVisible();
      expect((await prose.innerText()).trim().length).toBeGreaterThan(5_000);
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

      // 32-34. Article JSON-LD, Person identity, dates and DOI match the Scholar record.
      const graph = await readJsonLdGraph(page);
      const articleNodes = graph.filter((node) => node['@type'] === 'Article');
      expect(articleNodes).toHaveLength(1);
      expect(findTypedNode(graph, 'ScholarlyArticle')).toBeUndefined();

      const article = articleNodes[0];
      expect(article.headline).toBe(publication.title);
      expect(article.url).toBe(`${siteUrl}${publication.route}`);
      expect(article.inLanguage).toBe('en');
      expect(String(article.datePublished)).toMatch(
        new RegExp(`^${escapeRegExp(publication.publishedAt)}T`)
      );
      if (publication.updatedAt) {
        expect(String(article.dateModified)).toMatch(
          new RegExp(`^${escapeRegExp(publication.updatedAt)}T`)
        );
        expect(String(article.datePublished)).not.toBe(String(article.dateModified));
      }

      const author = article.author as JsonLd;
      expect(author).toMatchObject({
        '@id': authorEntityId,
        '@type': 'Person',
        name: authorName,
        url: `${siteUrl}/about/`
      });

      const identifier = article.identifier as JsonLd;
      expect(identifier).toEqual({
        '@type': 'PropertyValue',
        propertyID: 'DOI',
        value: citationDoiValue
      });
      expect(article.sameAs).toBe(`https://doi.org/${citationDoiValue}`);
    });

    test(`${publication.title} has a parser-friendly References section`, async ({ page }) => {
      await page.goto(publication.route);

      // 25-27. References is an exact standalone heading followed by a semantic ordered list.
      const source = fs.readFileSync(path.join(process.cwd(), publication.sourceFile), 'utf8');
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

  test('15 keeps a DOI-less non-primary Article free of fabricated DOI metadata', async ({
    page
  }) => {
    const sourceFile = 'src/content/articles/it-is-not-just-about-the-prompt.md';
    expect(readFrontmatterScalar(sourceFile, 'doi')).toBe('');

    await page.goto('/articles/it-is-not-just-about-the-prompt/');
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
  });

  test('19-24 keep every non-primary Article, Note, Concept, Practice and Consulting page outside Scholar metadata', async ({
    request
  }, testInfo) => {
    testInfo.setTimeout(120_000);

    const searchItems = await readSearchIndexes(request);
    const primaryRoutes = new Set(scholarPublications.map((publication) => publication.route));
    const gatedTypes = new Set<SearchItem['type']>([
      'article',
      'note',
      'concept',
      'practice'
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

  test('keeps the S2 embodied-AI DOI visible and in Article JSON-LD but out of Scholar tags', async ({
    page
  }) => {
    const route = '/articles/what-changes-when-ai-has-a-body/';
    const doi = '10.5281/zenodo.21296384';

    await page.goto(route);
    await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
    await expect(
      page.locator('[data-qa="article-byline"]').getByRole('link', { name: `DOI ${doi}` })
    ).toHaveAttribute('href', `https://doi.org/${doi}`);

    const graph = await readJsonLdGraph(page);
    const article = findTypedNode(graph, 'Article');
    const identifier = article?.identifier as JsonLd;
    expect(identifier).toMatchObject({ propertyID: 'DOI', value: doi });
  });

  test('35 includes every Scholar-primary URL exactly once in the production sitemap', () => {
    const sitemap = readBuiltSitemap();

    for (const publication of scholarPublications) {
      const location = `<loc>${siteUrl}${publication.route}</loc>`;
      expect(sitemap).toContain(location);
      expect(sitemap.match(new RegExp(escapeRegExp(location), 'gu')) ?? []).toHaveLength(1);
    }
  });

  test('36 exposes every Scholar-primary Article in the English search index', async ({
    request
  }) => {
    const response = await request.get('/search-index.en.json');
    expect(response.ok()).toBeTruthy();
    const entries = (await response.json()) as SearchItem[];

    for (const publication of scholarPublications) {
      const matches = entries.filter(
        (entry) =>
          entry.type === 'article' &&
          entry.url === publication.route &&
          entry.title === publication.title &&
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
        isPublication: true
      })),
      { route: '/articles/', isPublication: false },
      { route: '/about/', isPublication: false },
      { route: '/pl/about/', isPublication: false }
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
          await expect(page.locator('.content-header .lede')).toBeVisible();
          await expect(page.locator('[data-qa="article-byline"]')).toContainText(authorName);
          await expect(page.locator('[data-qa="article-byline"] time').first()).toBeVisible();
          await expect(page.locator('[data-qa="article-byline"] a[href^="https://doi.org/"]')).toBeVisible();
          const referencesHeading = page.locator('.prose > h2').filter({ hasText: /^References$/u });
          await expect(referencesHeading).toBeVisible();
          await expect(referencesHeading.locator('xpath=following-sibling::ol[1]/li').first()).toBeVisible();
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
