import { expect, test } from '@playwright/test';

const conceptIndexRoutes = [
  { route: '/concepts/', readMore: 'Read more' },
  { route: '/pl/concepts/', readMore: 'Czytaj dalej' }
];

const waveTwoDetailRoutes = [
  '/concepts/token/',
  '/concepts/context-window/',
  '/concepts/cognitive-load/',
  '/concepts/mental-model/',
  '/concepts/metacognition/',
  '/concepts/epistemic-vigilance/',
  '/pl/concepts/token/',
  '/pl/concepts/context-window/',
  '/pl/concepts/cognitive-load/',
  '/pl/concepts/mental-model/',
  '/pl/concepts/metacognition/',
  '/pl/concepts/epistemic-vigilance/'
];

const conceptDetailRoutes = [
  '/concepts/ai-literacy/',
  '/concepts/ai-mediated-communication/',
  '/pl/concepts/ai-literacy/',
  '/pl/concepts/ai-mediated-communication/',
  ...waveTwoDetailRoutes
];

test.describe('concept cards and tags', () => {
  for (const { route, readMore } of conceptIndexRoutes) {
    test(`shows at least 16 public concept cards on ${route}`, async ({ page }) => {
      await page.goto(route);

      const cardCount = await page.locator('[data-qa="concept-card"]').count();
      expect(cardCount).toBeGreaterThanOrEqual(16);
    });

    test(`keeps concept tags informational on ${route}`, async ({ page }) => {
      await page.goto(route);

      const tags = page.locator('[data-qa="concept-tag"]');
      await expect(tags.first()).toBeVisible();

      const tagStates = await tags.evaluateAll((items) =>
        items.map((item) => {
          const style = window.getComputedStyle(item);
          return {
            tagName: item.tagName.toLowerCase(),
            hasHref: item.hasAttribute('href'),
            closestLink: Boolean(item.closest('a')),
            cursor: style.cursor,
            textDecorationLine: style.textDecorationLine
          };
        })
      );

      for (const state of tagStates) {
        expect(state.tagName).not.toBe('a');
        expect(state.hasHref).toBe(false);
        expect(state.closestLink).toBe(false);
        expect(state.cursor).not.toBe('pointer');
        expect(state.textDecorationLine).not.toContain('underline');
      }

      const readMoreLinks = page.locator('[data-qa="concept-read-more"]');
      await expect(readMoreLinks.first()).toBeVisible();
      await expect(readMoreLinks).toContainText([readMore]);
    });

    test(`links concept cards to real pages on ${route}`, async ({ page, request }) => {
      await page.goto(route);
      const hrefs = await page.locator('[data-qa="concept-read-more"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href)
      );

      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        const response = await request.get(href);
        expect(response.ok(), href).toBe(true);
      }
    });
  }

  for (const route of conceptDetailRoutes) {
    test(`keeps detail tags noninteractive on ${route}`, async ({ page }) => {
      await page.goto(route);
      const tags = page.locator('[data-qa="concept-tag"]');
      await expect(tags.first()).toBeVisible();

      const states = await tags.evaluateAll((items) =>
        items.map((item) => ({
          tagName: item.tagName.toLowerCase(),
          hasHref: item.hasAttribute('href'),
          closestLink: Boolean(item.closest('a')),
          cursor: window.getComputedStyle(item).cursor
        }))
      );

      for (const state of states) {
        expect(state.tagName).not.toBe('a');
        expect(state.hasHref).toBe(false);
        expect(state.closestLink).toBe(false);
        expect(state.cursor).not.toBe('pointer');
      }
    });
  }

  for (const route of waveTwoDetailRoutes) {
    test(`renders wave two detail page with references on ${route}`, async ({ page }) => {
      await page.goto(route);

      await expect(page.locator('.content-header h1')).toBeVisible();
      await expect(page.locator('.prose')).toContainText(/Sources and context|Źródła i kontekst/);

      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(hasOverflow).toBe(false);
    });
  }
});
