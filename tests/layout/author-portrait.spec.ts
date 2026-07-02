import { expect, test } from '@playwright/test';

const portraitCases = [
  {
    route: '/about/',
    alt: 'Feliks Mamczur, author of Prompted Psyche'
  },
  {
    route: '/pl/about/',
    alt: 'Feliks Mamczur, autor Prompted Psyche'
  }
];

test.describe('author portrait', () => {
  for (const portraitCase of portraitCases) {
    test(`keeps author portrait accessible on ${portraitCase.route}`, async ({ page }) => {
      await page.goto(portraitCase.route);

      const portrait = page.getByRole('img', { name: portraitCase.alt });
      test.skip((await portrait.count()) === 0, 'Author portrait file is not available yet.');

      await expect(portrait).toBeVisible();

      const viewport = page.viewportSize();
      const box = await portrait.boundingBox();
      expect(box).not.toBeNull();

      if (viewport && box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
      }

      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(hasOverflow).toBe(false);
    });
  }
});
