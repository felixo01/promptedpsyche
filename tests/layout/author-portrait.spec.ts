import { expect, test } from '@playwright/test';

const portraitCases = [
  {
    route: '/about/',
    alt: 'Feliks Mamczur, author of Prompted Psyche',
    caption: 'Feliks Mamczur - author of Prompted Psyche',
    title: 'Feliks Mamczur',
    summaryTitle: 'In brief',
    stanceTitle: 'Starting point',
    stanceText: 'whether AI is simply good or bad',
    communicationTitle: 'Experience in communication'
  },
  {
    route: '/pl/about/',
    alt: 'Feliks Mamczur, autor Prompted Psyche',
    caption: 'Feliks Mamczur — autor Prompted Psyche',
    title: 'Feliks Mamczur',
    summaryTitle: 'W skrócie',
    stanceTitle: 'Punkt wyjścia',
    stanceText: 'czy AI jest dobre, czy złe',
    communicationTitle: 'Doświadczenie w komunikacji'
  }
];

test.describe('author portrait', () => {
  for (const portraitCase of portraitCases) {
    test(`keeps author portrait accessible on ${portraitCase.route}`, async ({ page }) => {
      await page.goto(portraitCase.route);

      const portrait = page.getByRole('img', { name: portraitCase.alt });
      await expect(portrait).toBeVisible();
      await expect(portrait).toHaveAttribute('src', '/images/author/feliks-mamczur.png');
      await expect(portrait).toHaveAttribute('width', '960');
      await expect(portrait).toHaveAttribute('height', '641');
      await expect(page.locator('[data-qa="author-portrait"] figcaption')).toHaveText(portraitCase.caption);
      expect((await page.request.get('/images/author/feliks-mamczur.png')).status()).toBe(200);

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
      await expect(page.getByRole('heading', { level: 2, name: portraitCase.summaryTitle })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: portraitCase.stanceTitle })).toBeVisible();
      await expect(page.getByText(portraitCase.stanceText)).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: portraitCase.communicationTitle })).toBeVisible();

      const metrics = await page.evaluate(() => {
        const hero = document.querySelector('.about-page .about-hero');
        const sectionList = document.querySelector('.about-page .about-section-list');
        const section = document.querySelector('.about-page .about-section');
        const heroInner = document.querySelector('.about-page .about-hero__inner');
        if (!hero || !sectionList || !section || !heroInner) {
          return null;
        }

        const heroStyle = window.getComputedStyle(hero);
        const sectionListStyle = window.getComputedStyle(sectionList);
        const sectionStyle = window.getComputedStyle(section);
        const heroInnerStyle = window.getComputedStyle(heroInner);

        return {
          heroPaddingTop: Number.parseFloat(heroStyle.paddingTop),
          heroPaddingBottom: Number.parseFloat(heroStyle.paddingBottom),
          listGap: Number.parseFloat(sectionListStyle.rowGap || sectionListStyle.gap),
          sectionPaddingTop: Number.parseFloat(sectionStyle.paddingTop),
          sectionColumnGap: Number.parseFloat(sectionStyle.columnGap || sectionStyle.gap),
          heroColumnGap: Number.parseFloat(heroInnerStyle.columnGap || heroInnerStyle.gap)
        };
      });

      expect(metrics).not.toBeNull();
      const isNarrow = testInfo.project.name === 'mobile-390' || testInfo.project.name === 'tablet-768';
      expect(metrics?.heroPaddingTop).toBeLessThanOrEqual(isNarrow ? 58 : 92);
      expect(metrics?.heroPaddingBottom).toBeLessThanOrEqual(isNarrow ? 58 : 92);
      expect(metrics?.listGap).toBeLessThanOrEqual(isNarrow ? 42 : 62);
      expect(metrics?.sectionPaddingTop).toBeLessThanOrEqual(isNarrow ? 28 : 36);
      expect(metrics?.sectionColumnGap).toBeLessThanOrEqual(isNarrow ? 32 : 58);
      expect(metrics?.heroColumnGap).toBeLessThanOrEqual(isNarrow ? 36 : 76);
    });
  }
});
