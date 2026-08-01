import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const siteUrl = 'https://promptedpsyche.com';
const fallbackImage = `${siteUrl}/images/social/prompted-psyche-home-social-1200x630.png`;
const updatedAt = '2026-08-01';
const guidelinesUrl =
  'https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems';

const files = {
  en: resolve('src/content/articles/who-had-the-final-say-ai-authorship.mdx'),
  pl: resolve('src/content/articles/kto-mial-ostatnie-slowo-autorstwo-ai.mdx'),
  materials: resolve('src/components/ResearchMaterials.astro'),
  workflow: resolve('src/components/AiAuthorshipWorkflowComparison.astro'),
  chart: resolve('src/components/AiAuthorshipVignetteChart.astro')
} as const;

const routes = {
  en: '/articles/who-had-the-final-say-ai-authorship/',
  pl: '/pl/articles/kto-mial-ostatnie-slowo-autorstwo-ai/'
} as const;

const cases = [
  {
    lang: 'en',
    route: routes.en,
    alternate: routes.pl,
    title: 'Who Had the Final Say? Authorship in AI-Assisted Creative Work',
    description:
      "The controversy over Olga Tokarczuk's use of AI exposed the limits of a binary label. A preregistered study of 429 adults suggests that authorship is better discussed through direction, selection, revision, and final decision authority than through a supposed percentage of AI contribution.",
    closing:
      'AI can generate content, but the final sentence should belong to the human - even if it reads: “No. Try again.”',
    legalLabel: 'Legal update - obligations apply from 2 August 2026',
    regulationUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    legalPhrases: [
      'machine-readable format',
      'human review or editorial control',
      'holds editorial responsibility',
      'evidently artistic, creative, satirical, or fictional work',
      'not a legal test of authorship',
      '2 December 2026'
    ],
    index: '/articles/',
    searchIndex: '/search-index.en.json',
    hub: '/topics/human-agency-and-responsibility/',
    practice: '/practice/how-to-use-ai-as-a-second-reader/',
    practiceAnchor: 'Authorship in AI-assisted creative work',
    fear: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    fearAnchor: 'felt authorship of an outcome',
    tag: '/tags/ai-and-humans/'
  },
  {
    lang: 'pl',
    route: routes.pl,
    alternate: routes.en,
    title: 'Kto miał ostatnie słowo? O autorstwie w twórczości wspieranej przez AI',
    description:
      'Burza wokół wypowiedzi Olgi Tokarczuk pokazała, jak szybko informacja o AI zmienia się w wyrok: „to już nie twoja praca”. Badanie 429 osób nie wyznacza granicy autorstwa, ale pomaga zobaczyć, dlaczego sam deklarowany udział AI nie wystarcza do opisania pracy twórczej.',
    closing:
      'AI może wygenerować treść, ale to człowiek powinien mieć ostatnie zdanie - choćby brzmiało ono: „nie, jeszcze raz”.',
    legalLabel: 'Aktualizacja prawna - obowiązki od 2 sierpnia 2026',
    regulationUrl: 'https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32024R1689',
    legalPhrases: [
      'odczytu maszynowego',
      'weryfikację przez człowieka lub kontrolę redakcyjną',
      'ponosi odpowiedzialność redakcyjną',
      'ewidentnie artystycznego, twórczego, satyrycznego lub fikcyjnego',
      'nie ustanawiają prawnego testu autorstwa',
      '2 grudnia 2026'
    ],
    index: '/pl/articles/',
    searchIndex: '/search-index.pl.json',
    hub: '/pl/topics/sprawczosc-i-odpowiedzialnosc/',
    practice: '/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/',
    practiceAnchor: 'Autorstwo w twórczości wspieranej przez AI',
    fear: '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
    fearAnchor: 'poczucie autorstwa wyniku',
    tag: '/pl/tags/ai-i-czlowiek/'
  }
] as const;

const researchUrls = [
  'https://doi.org/10.5281/zenodo.21705721',
  'https://zenodo.org/api/records/21705721/files/Beyond_AI_Share_Preprint_v1.0.pdf/content',
  'https://zenodo.org/api/records/21705721/files/Beyond_AI_Share_Appendix_A_v1.0.pdf/content',
  'https://doi.org/10.17605/OSF.IO/GSWN3'
] as const;

function read(path: string) {
  return readFileSync(path, 'utf8');
}

function frontmatter(path: string) {
  const source = read(path);
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  expect(match, `${path} must contain frontmatter`).not.toBeNull();
  return match?.[1] ?? '';
}

function readBuiltSitemap() {
  const distPath = resolve('dist');
  return readdirSync(distPath)
    .filter((fileName) => /^sitemap-\d+\.xml$/.test(fileName))
    .map((fileName) => readFileSync(join(distPath, fileName), 'utf8'))
    .join('\n');
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
  expect(dimensions.bodyWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

test.describe('bilingual AI authorship publication', () => {
  test('publishes both localized entries together without Scholar or article DOI metadata', () => {
    for (const [lang, path] of Object.entries({ en: files.en, pl: files.pl })) {
      const metadata = frontmatter(path);

      expect(metadata).toMatch(/^publishedAt: 2026-07-31$/m);
      expect(metadata).toMatch(new RegExp(`^updatedAt: ${updatedAt}$`, 'm'));
      expect(metadata).toMatch(/^draft: false$/m);
      expect(metadata).toMatch(/^scholarPrimary: false$/m);
      expect(metadata).toMatch(/^translationKey: "ai-authorship-final-say"$/m);
      expect(metadata).toMatch(new RegExp(`^lang: "${lang}"$`, 'm'));
      expect(metadata).not.toMatch(/^(?:doi|doiUrl|relatedDoi|relatedDoiUrl|version):/m);
      expect(metadata).not.toMatch(/^(?:image|imageAlt|imageCaption|socialImage):/m);
    }

    const polishSource = read(files.pl);
    expect(polishSource).toContain('O\u00a0autorstwie');
    expect(polishSource).not.toContain('O autorstwie');
    expect(polishSource).not.toMatch(/AI Act.{0,80}wszedł w życie 2 sierpnia 2026/is);
    expect(read(files.en)).not.toMatch(/AI Act.{0,80}entered into force (?:on )?2 August 2026/is);
  });

  for (const article of cases) {
    test(`renders the ${article.lang.toUpperCase()} article with its full publication contract`, async ({ page }) => {
      const response = await page.goto(article.route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', article.lang);
      await expect(page.getByRole('heading', { name: article.title, level: 1 })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${siteUrl}${article.route}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        `${siteUrl}${routes.en}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
        'href',
        `${siteUrl}${routes.pl}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `${siteUrl}${routes.en}`
      );
      await expect(
        page.locator('[data-qa="language-switcher"]').getByRole('link', {
          name: article.lang === 'en' ? 'PL' : 'EN'
        })
      ).toHaveAttribute('href', article.alternate);

      await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
      const structuredData = JSON.parse(
        (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}'
      ) as { '@graph'?: Array<Record<string, unknown>> };
      const graph = structuredData['@graph'] ?? [];
      const articleNode = graph.find((node) => node['@type'] === 'Article');
      expect(articleNode).toBeDefined();
      expect(articleNode).toMatchObject({
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `${siteUrl}${article.route}`,
        datePublished: '2026-07-31T00:00:00.000Z',
        dateModified: `${updatedAt}T00:00:00.000Z`,
        inLanguage: article.lang,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}${article.route}`
        },
        author: { name: 'Feliks Mamczur' },
        publisher: { '@id': `${siteUrl}/#publisher` }
      });
      expect(articleNode).not.toHaveProperty('identifier');
      expect(articleNode).not.toHaveProperty('sameAs');
      expect(articleNode).not.toHaveProperty('image');
      expect(JSON.stringify(graph)).not.toContain('ScholarlyArticle');

      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        fallbackImage
      );
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
      await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute('content', 'image/png');
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
        'content',
        'Prompted Psyche - The human side of AI'
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        fallbackImage
      );

      const materials = page.locator('[data-qa="research-materials"]');
      await expect(materials).toBeVisible();
      const materialLinks = await materials.locator('a').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href'))
      );
      expect(materialLinks).toEqual(researchUrls);
      await expect(materials.locator('a[rel~="nofollow"]')).toHaveCount(0);
      await expect(page.locator('[data-qa="ai-authorship-workflow-comparison"]')).toBeVisible();
      await expect(page.locator('[data-qa="ai-authorship-vignette-chart"]')).toBeVisible();
      await expect(page.locator('[data-qa="ai-authorship-vignette-chart"] table')).toHaveCount(1);
      await expect(page.locator('[data-qa="closing-passage"]')).toContainText(article.closing);

      const legalUpdate = page.locator('[data-qa="ai-act-article-50-update"]');
      await expect(legalUpdate).toBeVisible();
      await expect(legalUpdate.locator('.editorial-aside__label')).toHaveText(article.legalLabel);
      for (const phrase of article.legalPhrases) await expect(legalUpdate).toContainText(phrase);
      await expect(legalUpdate.locator(`a[href="${article.regulationUrl}"]`)).toHaveCount(1);
      await expect(legalUpdate.locator(`a[href="${guidelinesUrl}"]`)).toHaveCount(1);
    });
  }

  test('keeps the Polish title orphan fix intact and visible at every required width', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One browser project covers the explicit viewport matrix.');

    for (const width of [1920, 1600, 1440, 1280, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width <= 390 ? 780 : 900 });
      await page.goto(routes.pl);
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('O\u00a0autorstwie');

      const measurement = await heading.evaluate((element) => {
        const target = 'O\u00a0autorstwie';
        const text = element.textContent ?? '';
        const start = text.indexOf(target);
        if (start < 0) return { found: false, sameLine: false, clipped: true };

        const rectForCharacter = (offset: number) => {
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          let traversed = 0;
          let node = walker.nextNode();
          while (node) {
            const length = node.textContent?.length ?? 0;
            if (offset < traversed + length) {
              const range = document.createRange();
              const localOffset = offset - traversed;
              range.setStart(node, localOffset);
              range.setEnd(node, localOffset + 1);
              return range.getBoundingClientRect();
            }
            traversed += length;
            node = walker.nextNode();
          }
          return null;
        };

        const first = rectForCharacter(start);
        const nextWord = rectForCharacter(start + 2);
        const headingRect = element.getBoundingClientRect();
        return {
          found: true,
          sameLine: Boolean(first && nextWord && Math.abs(first.top - nextWord.top) < 1),
          clipped:
            headingRect.left < -1 ||
            headingRect.right > document.documentElement.clientWidth + 1 ||
            headingRect.width <= 0 ||
            headingRect.height <= 0
        };
      });

      expect(measurement, `${width}px`).toEqual({ found: true, sameLine: true, clipped: false });
      await expectNoHorizontalOverflow(page);
    }
  });

  test('exposes both articles through indexes, search, RSS, sitemap, tags and the agency hubs', async ({ request }) => {
    const sitemap = readBuiltSitemap();
    const rssResponse = await request.get('/rss.xml');
    expect(rssResponse.ok()).toBe(true);
    const rss = await rssResponse.text();

    for (const article of cases) {
      const [indexResponse, searchResponse, hubResponse, tagResponse] = await Promise.all([
        request.get(article.index),
        request.get(article.searchIndex),
        request.get(article.hub),
        request.get(article.tag)
      ]);
      for (const response of [indexResponse, searchResponse, hubResponse, tagResponse]) {
        expect(response.ok()).toBe(true);
      }

      expect(await indexResponse.text()).toContain(article.title);
      const searchItems = (await searchResponse.json()) as Array<{
        title: string;
        url: string;
        type: string;
        date?: string;
      }>;
      expect(searchItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: article.title,
            url: article.route,
            type: 'article',
            date: '2026-07-31'
          })
        ])
      );
      expect(await hubResponse.text()).toContain(article.route);
      expect(await tagResponse.text()).toContain(article.title);
      expect(sitemap.match(new RegExp(article.route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).toHaveLength(1);

      const absoluteUrl = `${siteUrl}${article.route}`;
      expect(rss.match(new RegExp(`<link>${absoluteUrl}</link>`, 'g')) ?? []).toHaveLength(1);
      const rssItem = rss.match(
        new RegExp(`<item>[\\s\\S]*?<link>${absoluteUrl}</link>[\\s\\S]*?</item>`)
      )?.[0];
      expect(rssItem).toContain('<pubDate>Fri, 31 Jul 2026');
    }
  });

  test('keeps the two curated backlink pairs natural and resolvable', async ({ page, request }) => {
    for (const article of cases) {
      for (const [source, anchor] of [
        [article.practice, article.practiceAnchor],
        [article.fear, article.fearAnchor]
      ] as const) {
        const response = await page.goto(source);
        expect(response?.status()).toBe(200);
        const link = page.getByRole('link', { name: anchor, exact: true });
        await expect(link).toHaveAttribute('href', article.route);
        expect((await request.get(article.route)).ok()).toBe(true);
      }
    }
  });

  test('keeps all internal links in both articles resolvable', async ({ page, request }) => {
    const hrefs = new Set<string>();
    for (const article of cases) {
      await page.goto(article.route);
      const articleHrefs = await page.locator('#main a[href^="/"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href') ?? '').filter(Boolean)
      );
      articleHrefs.forEach((href) => hrefs.add(href));
    }

    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.ok(), href).toBe(true);
    }
  });

  for (const article of cases) {
    test(`has no console errors or horizontal overflow on ${article.lang.toUpperCase()} publication surfaces`, async ({ page }, testInfo) => {
      test.setTimeout(60_000);
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        const text = message.text();
        const isAstroDevAuditFailure =
          text.includes('Astro') && text.includes("Error while running audit's match function");
        if (message.type() === 'error' && !isAstroDevAuditFailure) consoleErrors.push(text);
      });
      page.on('pageerror', (error) => consoleErrors.push(error.message));

      const responsiveRoutes = [
        article.route,
        article.index,
        article.hub,
        article.practice,
        article.fear
      ];
      for (const route of responsiveRoutes) {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      }

      if (testInfo.project.name === 'mobile-390') {
        await page.setViewportSize({ width: 320, height: 780 });
        for (const route of responsiveRoutes) {
          await page.goto(route);
          await expectNoHorizontalOverflow(page);
        }
      }

      expect(consoleErrors).toEqual([]);
    });
  }

  test('keeps the workflow, chart data and closing passage visible in print', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One desktop print rendering is sufficient.');
    await page.emulateMedia({ media: 'print' });
    await page.goto(routes.en);

    await expect(page.locator('[data-qa="research-materials"]')).toBeVisible();
    await expect(page.locator('[data-qa="ai-authorship-workflow-comparison"]')).toBeVisible();
    const chart = page.locator('[data-qa="ai-authorship-vignette-chart"]');
    await expect(chart).toBeVisible();
    await expect(chart.locator('figcaption')).toBeVisible();
    await chart.locator('details').evaluate((details: HTMLDetailsElement) => {
      details.open = true;
    });
    await expect(chart.locator('table')).toBeVisible();
    await expect(page.locator('[data-qa="closing-passage"]')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('locks the canonical research links, workflow labels and all reported vignette values', () => {
    const materials = read(files.materials);
    const workflow = read(files.workflow);
    const chart = read(files.chart);

    for (const url of researchUrls) expect(materials).toContain(`'${url}'`);
    for (const label of [
      'Human-directed workflow',
      'Near-final AI output',
      'Proces kierowany przez człowieka',
      'Niemal gotowy wynik AI',
      'Supplementary Appendix A, section A8',
      'Supplementary Appendix A, sekcja A8'
    ]) {
      expect(workflow).toContain(label);
    }

    const rows = [
      ['3.430', '1.208', '2.570', '1.235', '.860', '.610'],
      ['3.507', '1.172', '2.706', '1.253', '.801', '.559'],
      ['3.565', '1.196', '2.720', '1.255', '.846', '.597'],
      ['3.501', '1.081', '2.665', '1.132', '.836', '.659']
    ];
    for (const row of rows) {
      for (const value of row) expect(chart).toContain(`'${value}'`);
    }
    for (const statistic of [
      'n = 428',
      '95% CI [.715, .956]',
      't(427) = 13.628',
      'p < .001',
      'd_z = .659'
    ]) {
      expect(chart).toContain(statistic);
    }
  });
});
