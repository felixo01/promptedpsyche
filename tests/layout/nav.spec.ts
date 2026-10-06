import { expect, test } from '@playwright/test';

const navCases = [
  {
    route: '/',
    labels: ['Articles', 'Research', 'Concepts', 'Practice', 'About'],
    hrefs: ['/articles/', '/projects/', '/concepts/', '/practice/', '/about/'],
    search: '/search/'
  },
  {
    route: '/pl/',
    labels: ['Artykuły', 'Badania', 'Pojęcia', 'Praktyka', 'O projekcie'],
    hrefs: ['/pl/articles/', '/pl/projects/', '/pl/concepts/', '/pl/practice/', '/pl/about/'],
    search: '/pl/search/'
  }
];

test.describe('publication navigation', () => {
  for (const navCase of navCases) {
    test(`renders the C2 editorial menu on ${navCase.route}`, async ({ page }) => {
      await page.goto(navCase.route);

      const nav = page.locator('[data-qa="site-nav"]');
      const toggle = page.locator('.c2-menu-toggle');
      const isCollapsed = (page.viewportSize()?.width ?? 1440) <= 1100;
      await expect(page.locator('.c2-search')).toBeVisible();
      await expect(page.locator('.c2-search')).toHaveAttribute('href', navCase.search);
      if (isCollapsed) {
        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await expect(nav).toBeHidden();
        await expect(nav).toHaveJSProperty('inert', true);
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(nav).toHaveJSProperty('inert', false);
      } else {
        await expect(toggle).toBeHidden();
        await expect(nav).toHaveJSProperty('inert', false);
      }
      await expect(nav).toBeVisible();

      const links = nav.locator('a');
      await expect(links).toHaveText(navCase.labels);

      for (let index = 0; index < navCase.hrefs.length; index += 1) {
        await expect(links.nth(index)).toHaveAttribute('href', navCase.hrefs[index]);
      }

      const languageSwitcher = page.locator('[data-qa="language-switcher"]');
      await expect(languageSwitcher).toBeVisible();
      await expect(languageSwitcher.locator('a')).toHaveText(['EN', 'PL']);

      if (!isCollapsed) {
        const navLines = await links.evaluateAll((items) => {
          const tops = items.map((item) => Math.round(item.getBoundingClientRect().top));
          return new Set(tops).size;
        });
        expect(navLines).toBe(1);
      } else {
        await links.first().focus();
        await page.keyboard.press('Escape');
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await expect(nav).toBeHidden();
        await expect(nav).toHaveJSProperty('inert', true);
        await page.keyboard.press('Enter');
        await expect(nav).toBeVisible();
        await expect(nav).toHaveJSProperty('inert', false);
        await page.keyboard.press('Escape');
        await expect(toggle).toBeFocused();
      }
    });
  }
});
