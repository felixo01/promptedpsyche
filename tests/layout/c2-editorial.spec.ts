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

async function expectNoRejectedStockImages(page: Page) {
  await expect(page.locator([
    'main img[src*="c2-redesign-"]',
    'main img[srcset*="c2-redesign-"]',
    'main source[srcset*="c2-redesign-"]',
    'link[rel="preload"][as="image"][href*="c2-redesign-"]'
  ].join(', '))).toHaveCount(0);
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

        await expectNoRejectedStockImages(page);
        const heroImage = page.locator('.c2-cover-image img');
        await expect(heroImage).toHaveAttribute('src', /c2-trust-hidden-sources/);
        await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
        await expect(heroImage).toHaveAttribute('loading', 'eager');
        await expect(heroImage).toHaveAttribute('srcset', /400w.*800w.*1200w.*1536w/);
        await expect(heroImage).toHaveAttribute('width', '1536');
        await expect(heroImage).toHaveAttribute('height', '1024');
        await expect(heroImage).toHaveAttribute('alt', /\S+/);
        await expect(recommendations.locator('img').first()).toHaveAttribute('src', /c2-authorship-final-decision/);
        await expect(recommendations.locator('img').last()).toHaveAttribute('src', /c2-learning-active-reasoning/);
        for (const illustration of await recommendations.locator('img').all()) {
          await expect(illustration).toHaveAttribute('loading', 'lazy');
          await expect(illustration).toHaveAttribute('alt', /\S+/);
        }

        const boxes = await page.evaluate(() => {
          const box = (selector: string) => {
            const element = document.querySelector(selector);
            if (!element) throw new Error(`Missing required element: ${selector}`);
            const { top, bottom, left, right, height } = element.getBoundingClientRect();
            return { top, bottom, left, right, height };
          };
          return {
            image: box('.c2-cover-image'), copy: box('.c2-cover-copy'),
            kicker: box('.c2-cover .c2-kicker'), title: box('[data-qa="hero-title"]'),
            lead: box('.c2-cover .c2-lead'), meta: box('.c2-cover .c2-meta'),
            cta: box('[data-qa="home-reading-cta"]'), reading: box('.c2-reading'),
            research: box('.c2-research')
          };
        });
        if (width >= 768) {
          expect(boxes.image.height).toBeGreaterThanOrEqual(320);
          expect(boxes.image.height).toBeLessThanOrEqual(450);
        } else {
          expect(boxes.image.height).toBeLessThanOrEqual(280);
          expect(boxes.copy.top).toBeGreaterThanOrEqual(boxes.image.bottom);
          expect(boxes.copy.left).toBeGreaterThanOrEqual(19);
          expect(width - boxes.copy.right).toBeGreaterThanOrEqual(19);
          for (const [first, second] of [
            [boxes.kicker, boxes.title], [boxes.title, boxes.lead], [boxes.lead, boxes.meta],
            [boxes.meta, boxes.cta], [boxes.cta, boxes.reading], [boxes.reading, boxes.research]
          ]) expect(second.top).toBeGreaterThanOrEqual(first.bottom - 1);
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
        await expectNoRejectedStockImages(page);
        const editorialIllustration = page.locator('[data-qa="article-editorial-figure"] img');
        await expect(editorialIllustration).toBeVisible();
        await expect(editorialIllustration).toHaveAttribute('src', /c2-trust-hidden-sources/);
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
