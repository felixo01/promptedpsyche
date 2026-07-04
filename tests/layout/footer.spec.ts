import { expect, test, type Page } from '@playwright/test';

const cases = [
  {
    route: '/',
    rights: 'All rights reserved',
    citation: 'credit the author, title and source link',
    search: 'Search',
    concepts: 'Concepts',
    author: 'Author',
    practiceLabels: ['Practice', 'Praktyka']
  },
  {
    route: '/pl/',
    rights: 'Wszystkie prawa zastrzeżone',
    citation: 'podaj autora, tytuł i link do źródła',
    search: 'Szukaj',
    concepts: 'Pojęcia',
    author: 'Kim jestem',
    practiceLabels: ['Practice', 'Praktyka']
  }
];

async function expectFooterInsideViewport(page: Page) {
  const result = await page.evaluate(() => {
    const footer = document.querySelector('[data-qa="site-footer"]');
    const offenders = Array.from(footer?.querySelectorAll('*') ?? [])
      .flatMap((node) => {
        const element = node as HTMLElement;
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') {
          return [];
        }

        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          return [];
        }

        if (rect.left >= -1 && rect.right <= window.innerWidth + 1) {
          return [];
        }

        return [
          {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === 'string' ? element.className : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80)
          }
        ];
      })
      .slice(0, 8);

    return {
      documentScrollWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      offenders
    };
  });

  expect(result, JSON.stringify(result, null, 2)).toMatchObject({ offenders: [] });
  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('site footer', () => {
  for (const footerCase of cases) {
    test(`renders intentional footer structure on ${footerCase.route}`, async ({ page }) => {
      await page.goto(footerCase.route);

      const footer = page.locator('[data-qa="site-footer"]');
      const rightsRow = footer.locator('.footer-rights');
      const utilityRow = footer.locator('.footer-utility');
      await expect(footer).toBeVisible();
      await expect(rightsRow).toBeVisible();
      await expect(utilityRow).toBeVisible();
      await expect(footer).toContainText('Prompted Psyche');
      await expect(footer).toContainText('Feliks Mamczur');
      await expect(footer).toContainText('humanai.lab.edu@gmail.com');
      await expect(footer).toContainText(footerCase.rights);
      await expect(footer).toContainText(footerCase.citation);
      await expect(footer.getByRole('link', { name: footerCase.search, exact: true })).toBeVisible();
      await expect(footer.getByRole('link', { name: footerCase.concepts })).toBeVisible();
      await expect(footer.getByRole('link', { name: footerCase.author })).toBeVisible();
      await expect(footer.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/rss.xml');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);

      for (const label of footerCase.practiceLabels) {
        await expect(footer).not.toContainText(label);
      }
    });

    test(`keeps the rights note in a full-width footer row on ${footerCase.route}`, async ({ page }) => {
      await page.goto(footerCase.route);

      const result = await page.evaluate(() => {
        const footerInner = document.querySelector('.footer-inner');
        const rightsRow = document.querySelector('.footer-rights');
        const utilityRow = document.querySelector('.footer-utility');

        return {
          footerWidth: Math.round(footerInner?.getBoundingClientRect().width ?? 0),
          rightsWidth: Math.round(rightsRow?.getBoundingClientRect().width ?? 0),
          utilityWidth: Math.round(utilityRow?.getBoundingClientRect().width ?? 0)
        };
      });

      expect(result.rightsWidth).toBeGreaterThan(0);
      expect(result.utilityWidth).toBeGreaterThan(0);
      expect(result.rightsWidth).toBeGreaterThanOrEqual(result.footerWidth - 1);
      expect(result.utilityWidth).toBeGreaterThanOrEqual(result.footerWidth - 1);
    });

    test(`keeps footer within the viewport on ${footerCase.route}`, async ({ page }) => {
      await page.goto(footerCase.route);

      await expectFooterInsideViewport(page);
    });
  }
});
