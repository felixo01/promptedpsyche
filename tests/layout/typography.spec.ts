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
