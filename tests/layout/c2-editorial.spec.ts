import { expect, test, type Locator, type Page } from '@playwright/test';

const widths = [320, 390, 430, 768, 1280, 1440];
const editions = [
  {
    home: '/',
    article: '/articles/trust-in-the-age-of-ready-made-answers/',
    counterpart: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
    title: 'Trust in the age of ready-made answers',
    recommended: [
      'Who Had the Final Say? Authorship in AI-Assisted Creative Work',
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing"
    ],
    references: 'References'
  },
  {
    home: '/pl/',
    article: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
    counterpart: '/articles/trust-in-the-age-of-ready-made-answers/',
    title: 'Zaufanie do nauki w erze gotowych odpowiedzi',
    recommended: [
      'Kto miał ostatnie słowo? O autorstwie w twórczości wspieranej przez AI',
      'Gotowe odpowiedzi zmieniają sposób uczenia się. Co mówi o tym nauka?'
    ],
    references: 'Źródła i dalsza lektura'
  }
];

async function expectNoOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  expect(sizes.document, JSON.stringify(sizes)).toBeLessThanOrEqual(sizes.viewport + 1);
  expect(sizes.body, JSON.stringify(sizes)).toBeLessThanOrEqual(sizes.viewport + 1);
}

async function expectNoRejectedEditorialImages(page: Page) {
  const retiredAssets = [
    'c2-redesign-',
    'c2-trust-hidden-sources',
    'c2-authorship-final-decision',
    'c2-learning-active-reasoning'
  ];
  await expect(page.locator(retiredAssets.flatMap((asset) => [
    `main img[src*="${asset}"]`,
    `main img[srcset*="${asset}"]`,
    `main source[srcset*="${asset}"]`,
    `link[rel="preload"][as="image"][href*="${asset}"]`,
    `link[rel="preload"][as="image"][imagesrcset*="${asset}"]`
  ]).join(', '))).toHaveCount(0);
}

async function expectWebPImage(image: Locator) {
  // Astro serves optimized files in builds and a format query in development.
  await expect(image).toHaveAttribute('src', /(?:\.webp(?:$|\?)|[?&]f=webp(?:&|$))/);
}

async function expectCompleteHeading(locator: Locator, title: string) {
  await expect(locator).toHaveText(title);
  const layout = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      overflow: style.textOverflow,
      clamp: style.webkitLineClamp,
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth
    };
  });
  expect(layout.overflow).not.toBe('ellipsis');
  expect(['none', '', '0']).toContain(layout.clamp);
  expect(layout.scrollHeight).toBeLessThanOrEqual(layout.clientHeight + 1);
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
}

test.describe('C2 required viewport matrix', () => {
  // Each case sets its own viewport; run once instead of repeating the same
  // six-width matrix in each of the existing project viewport configurations.
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
  });

  for (const width of widths) {
    for (const edition of editions) {
      test(`editorial home ${edition.home} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(edition.home);
        await page.evaluate(() => document.fonts.ready);
        await expectNoOverflow(page);
        await expectCompleteHeading(page.locator('[data-qa="hero-title"]'), edition.title);

        const recommendations = page.locator('[data-qa="start-here-entry"]');
        await expect(recommendations).toHaveCount(2);
        for (let index = 0; index < edition.recommended.length; index += 1) {
          await expectCompleteHeading(recommendations.nth(index).locator('h3'), edition.recommended[index]);
          expect(await recommendations.nth(index).evaluate((element) => getComputedStyle(element).boxShadow)).toBe('none');
        }

        await expectNoRejectedEditorialImages(page);
        const heroImage = page.locator('.c2-cover-image img');
        await expect(heroImage).toHaveAttribute('src', /c2-trust-mediated-knowledge/);
        await expectWebPImage(heroImage);
        await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
        await expect(heroImage).toHaveAttribute('loading', 'eager');
        await expect(heroImage).toHaveAttribute('srcset', /400w.*800w.*1200w.*1600w.*2172w/);
        await expect(heroImage).toHaveAttribute('width', '2172');
        await expect(heroImage).toHaveAttribute('height', '724');
        await expect(heroImage).toHaveAttribute('alt', /\S+/);
        await expect(page.locator('main img[loading="eager"], main img[fetchpriority="high"]')).toHaveCount(1);
        await expect(recommendations.locator('img')).toHaveCount(2);
        await expect(recommendations.locator('img').first()).toHaveAttribute('src', /c2-authorship-selected-frame/);
        await expect(recommendations.locator('img').last()).toHaveAttribute('src', /c2-learning-work-in-progress/);
        for (const photograph of await recommendations.locator('img').all()) {
          await expectWebPImage(photograph);
          await expect(photograph).toHaveAttribute('loading', 'lazy');
          await expect(photograph).toHaveAttribute('fetchpriority', 'auto');
          await expect(photograph).toHaveAttribute('srcset', /400w.*800w.*1200w.*1536w/);
          await expect(photograph).toHaveAttribute('width', '1536');
          await expect(photograph).toHaveAttribute('height', '1024');
          await expect(photograph).toHaveAttribute('alt', /\S+/);
        }

        const boxes = await page.evaluate(() => {
          const box = (selector: string) => {
            const element = document.querySelector(selector);
            if (!element) throw new Error(`Missing required element: ${selector}`);
            const { top, bottom, left, right, width, height } = element.getBoundingClientRect();
            return { top, bottom, left, right, width, height };
          };
          return {
            cover: box('.c2-cover'), image: box('.c2-cover-image'), copy: box('.c2-cover-copy'),
            photograph: box('.c2-cover-image img'),
            kicker: box('.c2-cover .c2-kicker'), title: box('[data-qa="hero-title"]'),
            lead: box('.c2-cover .c2-lead'), meta: box('.c2-cover .c2-meta'),
            cta: box('[data-qa="home-reading-cta"]'), reading: box('.c2-reading'),
            research: box('.c2-research')
          };
        });
        expect(Math.abs(boxes.image.left - boxes.cover.left)).toBeLessThanOrEqual(1);
        expect(Math.abs(boxes.image.right - boxes.cover.right)).toBeLessThanOrEqual(1);
        expect(Math.abs(boxes.photograph.width - boxes.image.width)).toBeLessThanOrEqual(1);
        expect(Math.abs(boxes.copy.left - boxes.image.left)).toBeLessThanOrEqual(1);
        if (width > 1000) {
          expect(boxes.image.height).toBeGreaterThanOrEqual(360);
          expect(boxes.image.height).toBeLessThanOrEqual(440);
          expect(boxes.copy.width / boxes.image.width).toBeGreaterThanOrEqual(0.5);
          expect(boxes.copy.width / boxes.image.width).toBeLessThanOrEqual(0.61);
          const overlapDepth = boxes.image.bottom - boxes.copy.top;
          expect(overlapDepth).toBeGreaterThan(0);
          expect(overlapDepth).toBeLessThanOrEqual(boxes.image.height / 3);
          expect(boxes.copy.bottom).toBeGreaterThan(boxes.image.bottom);
          expect(boxes.image.right - boxes.copy.right).toBeGreaterThanOrEqual(boxes.image.width * 0.39);
          const coveredArea = overlapDepth * boxes.copy.width;
          expect(coveredArea / (boxes.image.width * boxes.image.height)).toBeLessThanOrEqual(0.21);
          const panel = await page.locator('.c2-cover-copy').evaluate((element) => {
            const style = getComputedStyle(element);
            const channels = style.backgroundColor.match(/[\d.]+/g)?.map(Number) ?? [];
            return { channels, opacity: Number(style.opacity) };
          });
          expect(panel.channels.length).toBeGreaterThanOrEqual(3);
          expect(panel.channels.slice(0, 3).every((channel) => channel >= 240)).toBe(true);
          expect(panel.channels[3] ?? 1).toBe(1);
          expect(panel.opacity).toBe(1);
        } else {
          expect(boxes.image.height).toBeCloseTo(width <= 700 ? 210 : 320, 0);
          expect(boxes.copy.top).toBeGreaterThanOrEqual(boxes.image.bottom);
          expect(Math.abs(boxes.copy.width - boxes.image.width)).toBeLessThanOrEqual(1);
          expect(boxes.copy.left).toBeGreaterThanOrEqual(19);
          expect(width - boxes.copy.right).toBeGreaterThanOrEqual(19);
        }
        for (const [first, second] of [
          [boxes.kicker, boxes.title], [boxes.title, boxes.lead], [boxes.lead, boxes.meta],
          [boxes.meta, boxes.cta], [boxes.cta, boxes.reading], [boxes.reading, boxes.research]
        ]) expect(second.top).toBeGreaterThanOrEqual(first.bottom - 1);
        if (width < 768) {
          const wordmarkSize = await page.locator('.c2-header .brand-name').evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
          expect(wordmarkSize).toBeGreaterThanOrEqual(24);
          expect(wordmarkSize).toBeLessThanOrEqual(26);
        }
        const decorativeBackgrounds = await page.locator('.c2-cover, .c2-cover-copy, .c2-recommendation').evaluateAll((elements) =>
          elements.map((element) => getComputedStyle(element).backgroundImage)
        );
        expect(decorativeBackgrounds.every((background) => background === 'none')).toBe(true);
        await expectNoOverflow(page);
      });

      test(`complete trust article ${edition.article} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(edition.article);
        await page.evaluate(() => document.fonts.ready);
        await expectNoOverflow(page);
        await expectCompleteHeading(page.locator('.content-header h1'), edition.title);
        await expect(page.locator('.article-byline')).toContainText('Feliks Mamczur');
        await expect(page.locator('.article-byline time')).toHaveCount(2);
        await expect(page.locator('.article-byline time').first()).toHaveAttribute('datetime', '2026-07-02T00:00:00.000Z');
        await expect(page.locator('.article-byline time').last()).toHaveAttribute('datetime', '2026-07-10T00:00:00.000Z');
        await expect(page.locator('.article-byline__counterpart a')).toHaveAttribute('href', edition.counterpart);
        const doi = page.locator('.article-byline a[aria-label="DOI 10.5281/zenodo.21301650"]');
        await expect(doi).toBeVisible();
        await expect(doi).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.21301650');
        if (edition.home === '/pl/') {
          await expect(page.locator('.article-byline')).toContainText('DOI wersji angielskiej');
          await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
        }

        const prose = page.locator('.c2-article .prose');
        const reading = await prose.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            width: element.getBoundingClientRect().width,
            fontSize: parseFloat(style.fontSize), lineHeight: parseFloat(style.lineHeight),
            align: style.textAlign
          };
        });
        expect(reading.align).toBe('left');
        expect(reading.lineHeight / reading.fontSize).toBeGreaterThanOrEqual(1.55);
        expect(reading.lineHeight / reading.fontSize).toBeLessThanOrEqual(1.65);
        if (width >= 768) {
          expect(reading.width).toBeGreaterThanOrEqual(680);
          expect(reading.width).toBeLessThanOrEqual(720);
          expect(reading.fontSize).toBeGreaterThanOrEqual(19.5);
          expect(reading.fontSize).toBeLessThanOrEqual(20.5);
        } else {
          expect(reading.width).toBeLessThanOrEqual(width - 39);
          expect(reading.fontSize).toBeGreaterThanOrEqual(18);
          expect(reading.fontSize).toBeLessThanOrEqual(19);
        }
        await expect(page.locator('.article-grid > aside')).toHaveCount(0);
        await expectNoRejectedEditorialImages(page);
        const editorialPhotograph = page.locator('[data-qa="article-editorial-figure"] img');
        await expect(editorialPhotograph).toBeVisible();
        await expect(editorialPhotograph).toHaveAttribute('src', /c2-trust-mediated-knowledge/);
        await expectWebPImage(editorialPhotograph);
        await expect(editorialPhotograph).toHaveAttribute('srcset', /400w.*800w.*1200w.*1600w.*2172w/);
        await expect(editorialPhotograph).toHaveAttribute('width', '2172');
        await expect(editorialPhotograph).toHaveAttribute('height', '724');
        await expect(editorialPhotograph).toHaveAttribute('alt', /\S+/);
        await expect(editorialPhotograph).toHaveAttribute('loading', 'lazy');
        await expect(editorialPhotograph).toHaveAttribute('fetchpriority', 'auto');
        await expect(page.locator('main img[loading="eager"], main img[fetchpriority="high"]')).toHaveCount(0);
        const photographHeight = await editorialPhotograph.evaluate((element) => element.getBoundingClientRect().height);
        expect(photographHeight).toBeGreaterThanOrEqual(160);
        expect(photographHeight).toBeLessThanOrEqual(288);
        expect(photographHeight).toBeLessThan(width > 1000 ? 360 : width <= 700 ? 210 : 320);
        const originalDiagram = prose.locator('[data-qa="article-hero-image"]');
        await expect(originalDiagram).toHaveCount(1);
        await expect(originalDiagram).toHaveAttribute('src', '/images/articles/ai-path-to-knowledge.svg');
        await expect(originalDiagram).toHaveAttribute('width', '1600');
        await expect(originalDiagram).toHaveAttribute('height', '900');
        await expect(originalDiagram).toHaveAttribute('alt', /\S+/);
        await expect(originalDiagram).toHaveAttribute('loading', 'lazy');

        const contents = page.locator('[data-qa="article-contents"]');
        await expect(contents).not.toHaveAttribute('open', '');
        await contents.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(contents).toHaveAttribute('open', '');
        const contentsLinks = contents.locator('nav a');
        await expect(contentsLinks).toHaveCount(16);
        await expect(prose.locator(':scope > h2').first())
          .toHaveAttribute('id', edition.home === '/pl/' ? 'abstrakt' : 'abstract');
        expect(await contentsLinks.evaluateAll((links) => links.every((link) => {
          const id = link.getAttribute('href')?.slice(1);
          return id && document.getElementById(decodeURIComponent(id))?.tagName === 'H2';
        }))).toBe(true);
        const boxHeadingText = edition.home === '/pl/'
          ? 'Odtwórz drogę od odpowiedzi do dowodów'
          : 'Reconstruct the path from answer to evidence';
        const boxHeading = prose.locator('.practice-block').getByRole('heading', { name: boxHeadingText, exact: true });
        await expect(boxHeading).toHaveAttribute('id', /^article-section-\d+(?:-\d+)?$/);
        const boxId = await boxHeading.getAttribute('id');
        const boxLink = contents.getByRole('link', { name: boxHeadingText, exact: true });
        await expect(boxLink).toHaveAttribute('href', `#${boxId}`);
        expect(await prose.locator('h2[id]').evaluateAll((headings) => new Set(headings.map((heading) => heading.id)).size))
          .toBe(await prose.locator('h2').count());
        await boxLink.click();
        await expect(boxHeading).toBeInViewport();
        await contentsLinks.last().click();
        const references = prose.getByRole('heading', { name: edition.references, exact: true });
        await expect(references).toBeInViewport();
        const bibliography = references.locator('xpath=following-sibling::*[1]');
        await expect(bibliography.locator(':scope > li')).toHaveCount(18);
        expect(await bibliography.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(18);
        await expect(prose.locator('[data-qa="suggested-citation"]')).toBeVisible();
        await expect(prose.locator('[data-qa="rights-notice"]')).toBeVisible();
        await expectNoOverflow(page);
      });
    }
  }
});
