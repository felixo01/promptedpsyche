import { expect, test } from '@playwright/test';

const portraitCases = [
  {
    route: '/about/',
    alt: 'Feliks Mamczur, author of Prompted Psyche',
    title: 'About the author'
  },
  {
    route: '/pl/about/',
    alt: 'Feliks Mamczur, autor Prompted Psyche',
    title: 'Kim jestem'
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

  for (const portraitCase of portraitCases) {
    test(`keeps author page spacing compact on ${portraitCase.route}`, async ({ page }, testInfo) => {
      await page.goto(portraitCase.route);

      await expect(page.getByRole('heading', { level: 1, name: portraitCase.title })).toBeVisible();

      const metrics = await page.evaluate(() => {
        const block = document.querySelector('.about-page .editorial-block');
        const split = document.querySelector('.about-page .editorial-split');
        if (!block || !split) {
          return null;
        }

        const blockStyle = window.getComputedStyle(block);
        const splitStyle = window.getComputedStyle(split);

        return {
          paddingTop: Number.parseFloat(blockStyle.paddingTop),
          paddingBottom: Number.parseFloat(blockStyle.paddingBottom),
          columnGap: Number.parseFloat(splitStyle.columnGap || splitStyle.gap)
        };
      });

      expect(metrics).not.toBeNull();
      const isNarrow = testInfo.project.name === 'mobile-390' || testInfo.project.name === 'tablet-768';
      expect(metrics?.paddingTop).toBeLessThanOrEqual(isNarrow ? 58 : 92);
      expect(metrics?.paddingBottom).toBeLessThanOrEqual(isNarrow ? 58 : 92);
      expect(metrics?.columnGap).toBeLessThanOrEqual(isNarrow ? 24 : 58);
    });
  }
});
