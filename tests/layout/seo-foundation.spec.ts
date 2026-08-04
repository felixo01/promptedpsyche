import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://promptedpsyche.com';

type JsonLd = Record<string, any>;

const strategicPages = [
  {
    route: '/',
    pair: '/pl/',
    xDefault: '/',
    lang: 'en',
    h1: 'The human side of AI.',
    title: 'AI Psychology, Cyberpsychology and Human-AI Interaction | Prompted Psyche'
  },
  {
    route: '/pl/',
    pair: '/',
    xDefault: '/',
    lang: 'pl',
    h1: 'Ludzka strona AI.',
    title: 'Psychologia AI, cyberpsychologia i Human-AI Interaction | Prompted Psyche'
  },
  {
    route: '/about/',
    pair: '/pl/about/',
    xDefault: '/about/',
    lang: 'en',
    h1: 'Feliks Mamczur',
    title: 'Feliks Mamczur - AI, Cyberpsychology and Human-AI Interaction'
  },
  {
    route: '/pl/about/',
    pair: '/about/',
    xDefault: '/about/',
    lang: 'pl',
    h1: 'Feliks Mamczur',
    title: 'Feliks Mamczur - psychologia AI, cyberpsychologia i Human-AI Interaction'
  },
  {
    route: '/articles/',
    pair: '/pl/articles/',
    xDefault: '/articles/',
    lang: 'en',
    h1: 'Articles',
    title: 'Articles on AI Psychology and Human-AI Interaction | Prompted Psyche'
  },
  {
    route: '/pl/articles/',
    pair: '/articles/',
    xDefault: '/articles/',
    lang: 'pl',
    h1: 'Artykuły',
    title: 'Artykuły o psychologii AI i relacji człowiek-AI | Prompted Psyche'
  },
  {
    route: '/notes/',
    pair: '/pl/notes/',
    xDefault: '/notes/',
    lang: 'en',
    h1: 'Notes',
    title: 'Research Notes on Human Behavior and AI | Prompted Psyche'
  },
  {
    route: '/pl/notes/',
    pair: '/notes/',
    xDefault: '/notes/',
    lang: 'pl',
    h1: 'Notatki',
    title: 'Notatki badawcze o zachowaniu ludzi i AI | Prompted Psyche'
  },
  {
    route: '/concepts/',
    pair: '/pl/concepts/',
    xDefault: '/concepts/',
    lang: 'en',
    h1: 'Concepts',
    title: 'AI Psychology and Human-AI Interaction Glossary | Prompted Psyche'
  },
  {
    route: '/pl/concepts/',
    pair: '/concepts/',
    xDefault: '/concepts/',
    lang: 'pl',
    h1: 'Pojęcia',
    title: 'Słownik psychologii AI i relacji człowiek-AI | Prompted Psyche'
  },
  {
    route: '/topics/',
    pair: '/pl/topics/',
    xDefault: '/topics/',
    lang: 'en',
    h1: 'Topics',
    title: 'Guides to the Psychological and Social Effects of AI | Prompted Psyche'
  },
  {
    route: '/pl/topics/',
    pair: '/topics/',
    xDefault: '/topics/',
    lang: 'pl',
    h1: 'Obszary',
    title: 'Przewodniki po psychologicznych i społecznych skutkach AI | Prompted Psyche'
  },
  {
    route: '/consulting/',
    pair: '/pl/consulting/',
    xDefault: '/consulting/',
    lang: 'en',
    h1: 'AI Use Audit for Teams',
    title: 'AI Use Audit for Creative, Marketing and Communication Teams | Prompted Psyche'
  },
  {
    route: '/pl/consulting/',
    pair: '/consulting/',
    xDefault: '/consulting/',
    lang: 'pl',
    h1: 'Audyt wykorzystania AI w zespole',
    title: 'Audyt wykorzystania AI w zespole kreatywnym, marketingowym lub komunikacyjnym | Prompted Psyche'
  }
] as const;

const protectedDoiPublications = [
  {
    route: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    title: 'Are we afraid of AI, or of ourselves?',
    doi: '10.5281/zenodo.21340181',
    scholarPrimary: true
  },
  {
    route: '/articles/trust-in-the-age-of-ready-made-answers/',
    title: 'Trust in the age of ready-made answers',
    doi: '10.5281/zenodo.21301650',
    scholarPrimary: true
  },
  {
    route: '/articles/dont-ask-whether-ai-makes-us-dumber/',
    title: "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
    doi: '10.5281/zenodo.21358687',
    scholarPrimary: true
  },
  {
    route: '/articles/what-changes-when-ai-has-a-body/',
    title: 'What changes when AI has a body?',
    doi: '10.5281/zenodo.21296384',
    scholarPrimary: false
  },
  {
    route: '/articles/when-search-becomes-an-answer/',
    title: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
    doi: '10.5281/zenodo.21491639',
    scholarPrimary: true
  }
] as const;

function flattenStructuredData(items: JsonLd[]) {
  return items.flatMap((item) => (Array.isArray(item['@graph']) ? item['@graph'] : [item]));
}

async function readStructuredData(page: Page) {
  const documents = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.map((node) => JSON.parse(node.textContent ?? '{}') as JsonLd)
  );

  return flattenStructuredData(documents);
}

function findType(graph: JsonLd[], type: string) {
  return graph.find((node) => node['@type'] === type);
}

function readBuiltSitemap() {
  const distPath = path.join(process.cwd(), 'dist');
  return fs
    .readdirSync(distPath)
    .filter((fileName) => /^sitemap-\d+\.xml$/.test(fileName))
    .map((fileName) => fs.readFileSync(path.join(distPath, fileName), 'utf8'))
    .join('\n');
}

test.describe('SEO intent and entity foundation', () => {
  for (const pageCase of strategicPages) {
    test(`publishes exact metadata and language signals on ${pageCase.route}`, async ({ page }) => {
      await page.goto(pageCase.route);

      await expect(page).toHaveTitle(pageCase.title);
      await expect(page.locator('html')).toHaveAttribute('lang', pageCase.lang);
      await expect(page.getByRole('heading', { name: pageCase.h1, level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${siteUrl}${pageCase.route}`
      );
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${pageCase.lang === 'en' ? 'pl' : 'en'}"]`)
      ).toHaveAttribute('href', `${siteUrl}${pageCase.pair}`);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `${siteUrl}${pageCase.xDefault}`
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', pageCase.title);
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', pageCase.title);
    });
  }

  test('keeps strategic titles non-empty and unique', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    const titles: string[] = [];

    for (const pageCase of strategicPages) {
      await page.goto(pageCase.route);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(title.trim(), pageCase.route).not.toBe('');
      expect(description?.trim(), pageCase.route).not.toBe('');
      titles.push(title);
    }

    expect(new Set(titles).size).toBe(titles.length);
  });

  test('publishes breadcrumbs for each supported content hierarchy', async ({ page }) => {
    const cases = [
      ['/articles/trust-in-the-age-of-ready-made-answers/', 'Articles', 'Trust in the age of ready-made answers'],
      ['/pl/notes/masz-racje-powiedzialo-ai/', 'Notatki', '„Masz rację” — powiedziało AI. Problem w tym, że znało tylko twoją wersję'],
      ['/concepts/anthropomorphism/', 'Concepts', 'Anthropomorphism'],
      ['/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/', 'Praktyka', 'Jak sprawdzić, czy odpowiedź AI ma źródła'],
      ['/topics/trust-in-ai/', 'Topics', 'Trust in AI']
    ] as const;

    for (const [route, section, current] of cases) {
      await page.goto(route);
      const graph = await readStructuredData(page);
      const breadcrumb = findType(graph, 'BreadcrumbList');

      expect(breadcrumb, route).toBeDefined();
      if (!breadcrumb) throw new Error(`Missing BreadcrumbList on ${route}`);
      expect(breadcrumb.itemListElement, route).toHaveLength(3);
      expect(breadcrumb.itemListElement.map((item: JsonLd) => item.position), route).toEqual([1, 2, 3]);
      expect(breadcrumb.itemListElement[1].name, route).toBe(section);
      expect(breadcrumb.itemListElement[2], route).toMatchObject({
        name: current,
        item: `${siteUrl}${route}`
      });
    }
  });

  test('uses ProfilePage, DefinedTermSet and DefinedTerm without duplicate author entities', async ({ page }) => {
    await page.goto('/about/');
    const aboutGraph = await readStructuredData(page);
    expect(findType(aboutGraph, 'ProfilePage')?.mainEntity).toMatchObject({
      '@id': `${siteUrl}/#feliks-mamczur`,
      '@type': 'Person',
      name: 'Feliks Mamczur'
    });

    await page.goto('/concepts/');
    const indexGraph = await readStructuredData(page);
    expect(findType(indexGraph, 'DefinedTermSet')).toMatchObject({
      '@id': `${siteUrl}/concepts/#defined-term-set`,
      inLanguage: 'en'
    });

    await page.goto('/concepts/anthropomorphism/');
    const conceptGraph = await readStructuredData(page);
    expect(findType(conceptGraph, 'DefinedTerm')).toMatchObject({
      '@id': `${siteUrl}/concepts/anthropomorphism/#defined-term`,
      name: 'Anthropomorphism',
      inDefinedTermSet: { '@id': `${siteUrl}/concepts/#defined-term-set` }
    });
  });

  test('keeps public articles indexable and schema claims conservative', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    const searchResponses = await Promise.all([
      request.get('/search-index.en.json'),
      request.get('/search-index.pl.json')
    ]);
    const searchEntries = (await Promise.all(searchResponses.map((response) => response.json()))).flat() as Array<{
      type: string;
      url: string;
    }>;
    const articleRoutes = searchEntries.filter((entry) => entry.type === 'article').map((entry) => entry.url);

    expect(articleRoutes.length).toBeGreaterThanOrEqual(18);
    for (const route of articleRoutes) {
      const response = await request.get(route);
      expect(response.ok(), route).toBe(true);
      const html = await response.text();
      const robots = Array.from(
        html.matchAll(/<meta name="(?:robots|googlebot)" content="([^"]*)"/g),
        (match) => match[1]
      );
      expect(robots.every((value) => !/\bnoindex\b/i.test(value)), route).toBe(true);

      const jsonText = Array.from(
        html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
        (match) => match[1]
      ).join('\n');
      expect(() => JSON.parse(jsonText), route).not.toThrow();
      expect(jsonText, route).not.toContain('ScholarlyArticle');
      expect(jsonText, route).not.toMatch(/"(?:issn|volumeNumber|issueNumber|pagination|pageStart|pageEnd)"/);
      expect(jsonText, route).not.toContain('Periodical');
    }
  });

  for (const publication of protectedDoiPublications) {
    test(`locks the DOI title for ${publication.doi}`, async ({ page }) => {
      await page.goto(publication.route);
      const graph = await readStructuredData(page);
      const article = findType(graph, 'Article');

      await expect(page.getByRole('heading', { name: publication.title, level: 1 })).toBeVisible();
      if (publication.scholarPrimary) {
        await expect(page.locator('meta[name="citation_title"]')).toHaveAttribute('content', publication.title);
        await expect(page.locator('meta[name="citation_doi"]')).toHaveAttribute('content', publication.doi);
      } else {
        await expect(page.locator('meta[name="citation_title"]')).toHaveCount(0);
        await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
      }
      expect(article?.headline).toBe(publication.title);
      expect(article?.identifier).toMatchObject({ propertyID: 'DOI', value: publication.doi });
    });
  }

  test('keeps drafts and tag archives out of the sitemap while retaining strategic URLs', () => {
    const sitemap = readBuiltSitemap();
    const strategicUrls = [
      '/',
      '/pl/',
      '/about/',
      '/pl/about/',
      '/articles/',
      '/pl/articles/',
      '/topics/trust-in-ai/',
      '/pl/topics/zaufanie-do-ai/',
      '/articles/when-search-becomes-an-answer/',
      '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/'
    ];

    expect(sitemap).not.toContain('/tags/');
    expect(sitemap).not.toContain('/pl/tags/');
    expect(sitemap).not.toContain('/articles/why-people-trust-ai-even-when-they-shouldnt/');
    expect(sitemap).not.toContain('/articles/ai-literacy-is-not-prompt-engineering/');
    expect(sitemap).not.toContain('/concepts/cyberpsychology-of-ai/');
    expect(sitemap).not.toContain('/notes/we-prompt-machines-machines-prompt-us-back/');
    for (const route of strategicUrls) {
      expect(sitemap).toContain(`${siteUrl}${route}`);
    }
  });
});
