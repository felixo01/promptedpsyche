import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/pl/',
  '/articles/',
  '/pl/articles/',
  '/notes/',
  '/pl/notes/',
  '/concepts/',
  '/pl/concepts/',
  '/concepts/epistemic-vigilance/',
  '/pl/concepts/epistemic-vigilance/',
  '/concepts/context-window/',
  '/pl/concepts/context-window/',
  '/about/',
  '/pl/about/',
  '/consulting/',
  '/pl/consulting/'
];

test.describe('layout overflow', () => {
  for (const route of routes) {
    test(`has no horizontal overflow on ${route}`, async ({ page }) => {
      await page.goto(route);

      const result = await page.evaluate(() => {
        const documentElement = document.documentElement;
        const offenders = Array.from(document.body.querySelectorAll('*'))
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
                id: element.id,
                className: typeof element.className === 'string' ? element.className : '',
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 90)
              }
            ];
          })
          .slice(0, 12);

        return {
          documentScrollWidth: documentElement.scrollWidth,
          documentClientWidth: documentElement.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          innerWidth: window.innerWidth,
          offenders
        };
      });

      expect(result, JSON.stringify(result, null, 2)).toMatchObject({ offenders: [] });
      expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
      expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
    });
  }
});
