import { expect, test } from '@playwright/test';

type Box = {
  name: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function overlapArea(a: Box, b: Box) {
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x * y;
}

const routes = ['/', '/pl/'];

test.describe('critical element overlap', () => {
  for (const route of routes) {
    test(`keeps homepage modules separated on ${route}`, async ({ page }) => {
      await page.goto(route);

      const overlaps = await page.evaluate(() => {
        const selectors = [
          ['hero-title', '[data-qa="hero-title"]'],
          ['hero-sidecar', '[data-qa="hero-sidecar"]'],
          ['writing-card-1', '[data-qa="writing-card"]:nth-of-type(1)'],
          ['writing-card-2', '[data-qa="writing-card"]:nth-of-type(2)'],
          ['consulting-teaser', '[data-qa="consulting-teaser"]']
        ] as const;

        const boxes = selectors.flatMap(([name, selector]) => {
          const element = document.querySelector(selector);
          if (!element) {
            return [];
          }
          const rect = element.getBoundingClientRect();
          return [
            {
              name,
              left: rect.left,
              right: rect.right,
              top: rect.top,
              bottom: rect.bottom
            }
          ];
        });

        const badPairs = [];
        for (let first = 0; first < boxes.length; first += 1) {
          for (let second = first + 1; second < boxes.length; second += 1) {
            const area = Math.round(
              Math.max(0, Math.min(boxes[first].right, boxes[second].right) - Math.max(boxes[first].left, boxes[second].left)) *
                Math.max(0, Math.min(boxes[first].bottom, boxes[second].bottom) - Math.max(boxes[first].top, boxes[second].top))
            );
            if (area > 1) {
              badPairs.push({ first: boxes[first].name, second: boxes[second].name, area });
            }
          }
        }

        return badPairs;
      });

      expect(overlaps).toEqual([]);
    });

    test(`does not overlap publication nav links on ${route}`, async ({ page }) => {
      await page.goto(route);
      const boxes = await page.locator('[data-qa="site-nav"] a').evaluateAll((links) =>
        links.map((link) => {
          const rect = link.getBoundingClientRect();
          return {
            name: link.textContent?.trim() ?? '',
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom
          };
        })
      );

      const collisions = [];
      for (let first = 0; first < boxes.length; first += 1) {
        for (let second = first + 1; second < boxes.length; second += 1) {
          const area = overlapArea(boxes[first], boxes[second]);
          if (area > 1) {
            collisions.push({ first: boxes[first].name, second: boxes[second].name, area });
          }
        }
      }

      expect(collisions).toEqual([]);
    });
  }
});
