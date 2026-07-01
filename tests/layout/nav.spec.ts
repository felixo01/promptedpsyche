import { expect, test } from '@playwright/test';

const navCases = [
  {
    route: '/',
    labels: ['Articles', 'Notes', 'Concepts', 'About', 'Consulting', 'Contact'],
    hrefs: ['/articles/', '/notes/', '/concepts/', '/about/', '/consulting/', '/contact/']
  },
  {
    route: '/pl/',
    labels: ['Artykuły', 'Notatki', 'Pojęcia', 'O projekcie', 'Konsulting', 'Kontakt'],
    hrefs: ['/pl/articles/', '/pl/notes/', '/pl/concepts/', '/pl/about/', '/pl/consulting/', '/pl/contact/']
  }
];

test.describe('publication navigation', () => {
  for (const navCase of navCases) {
    test(`renders publication-first menu on ${navCase.route}`, async ({ page }, testInfo) => {
      await page.goto(navCase.route);

      const nav = page.locator('[data-qa="site-nav"]');
      await expect(nav).toBeVisible();

      const links = nav.locator('a');
      await expect(links).toHaveText(navCase.labels);

      for (let index = 0; index < navCase.hrefs.length; index += 1) {
        await expect(links.nth(index)).toHaveAttribute('href', navCase.hrefs[index]);
      }

      const languageSwitcher = page.locator('[data-qa="language-switcher"]');
      await expect(languageSwitcher).toBeVisible();
      await expect(languageSwitcher.locator('a')).toHaveText(['EN', 'PL']);

      if (testInfo.project.name === 'desktop-1440' || testInfo.project.name === 'laptop-1280') {
        const navLines = await links.evaluateAll((items) => {
          const tops = items.map((item) => Math.round(item.getBoundingClientRect().top));
          return new Set(tops).size;
        });
        expect(navLines).toBe(1);
      }
    });
  }
});
