import { expect, test } from '@playwright/test';

const homepageRoutes = ['/', '/pl/'];
const subpageRoutes = [
  '/articles/',
  '/pl/articles/',
  '/notes/',
  '/pl/notes/',
  '/concepts/',
  '/pl/concepts/',
  '/about/',
  '/pl/about/',
  '/consulting/',
  '/pl/consulting/'
];

const longFormRoutes = [
  '/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/',
  '/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/',
  '/notes/fluent-does-not-mean-true/',
  '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/'
];

async function visibleFontSizes(page: import('@playwright/test').Page, selector: string) {
  return page.locator(selector).evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((element) => Number.parseFloat(window.getComputedStyle(element).fontSize))
  );
}

test.describe('typographic scale', () => {
  for (const route of homepageRoutes) {
    test(`keeps homepage H1 within scale on ${route}`, async ({ page }, testInfo) => {
      await page.goto(route);
      const isMobile = testInfo.project.name === 'mobile-390';
      const sizes = await visibleFontSizes(page, 'h1');
      expect(sizes.length).toBeGreaterThan(0);
      expect(Math.max(...sizes)).toBeLessThanOrEqual(isMobile ? 52 : 76);
    });
  }

  for (const route of subpageRoutes) {
    test(`keeps subpage H1 within scale on ${route}`, async ({ page }, testInfo) => {
      await page.goto(route);
      const isMobile = testInfo.project.name === 'mobile-390';
      const sizes = await visibleFontSizes(page, 'h1');
      expect(sizes.length).toBeGreaterThan(0);
      expect(Math.max(...sizes)).toBeLessThanOrEqual(isMobile ? 42 : 54);
    });
  }

  for (const route of [...homepageRoutes, ...subpageRoutes]) {
    test(`keeps H2 within editorial scale on ${route}`, async ({ page }, testInfo) => {
      await page.goto(route);
      const isMobile = testInfo.project.name === 'mobile-390';
      const sizes = await visibleFontSizes(page, 'h2');
      expect(sizes.length).toBeGreaterThan(0);
      expect(Math.max(...sizes)).toBeLessThanOrEqual(isMobile ? 31 : 38);
    });
  }
});

test.describe('long-form reading typography', () => {
  for (const route of longFormRoutes) {
    test(`keeps readable long-form rhythm on ${route}`, async ({ page }, testInfo) => {
      await page.goto(route);

      const prose = page.locator('.article-shell--publication .prose');
      await expect(prose).toBeVisible();

      const metrics = await prose.evaluate((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const fontSize = Number.parseFloat(style.fontSize);
        const lineHeight = Number.parseFloat(style.lineHeight);

        return {
          width: rect.width,
          fontFamily: style.fontFamily,
          lineHeightRatio: lineHeight / fontSize
        };
      });

      expect(metrics.lineHeightRatio).toBeGreaterThanOrEqual(1.7);
      expect(metrics.fontFamily).toContain('Newsreader');

      if (testInfo.project.name !== 'mobile-390') {
        expect(metrics.width).toBeLessThanOrEqual(780);
      }

      const firstH2 = prose.locator('h2').first();
      await expect(firstH2).toBeVisible();

      const h2Height = await firstH2.evaluate((element) => element.getBoundingClientRect().height);
      expect(h2Height).toBeGreaterThan(24);
    });
  }
});
