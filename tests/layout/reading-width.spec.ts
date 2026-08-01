import { expect, test } from '@playwright/test';

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 1000 },
  { width: 1280, height: 900 },
  { width: 1024, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 800 }
] as const;

const cases = [
  {
    type: 'article',
    route: '/pl/articles/kto-mial-ostatnie-slowo-autorstwo-ai/',
    hasResearchMaterials: true
  },
  {
    type: 'article',
    route: '/articles/who-had-the-final-say-ai-authorship/',
    hasResearchMaterials: true
  },
  {
    type: 'article',
    route: '/pl/articles/co-sie-zmienia-kiedy-ai-ma-cialo/',
    hasResearchMaterials: false
  },
  {
    type: 'article',
    route: '/articles/what-changes-when-ai-has-a-body/',
    hasResearchMaterials: false
  },
  { type: 'note', route: '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe', hasResearchMaterials: false },
  { type: 'note', route: '/notes/fluent-does-not-mean-true', hasResearchMaterials: false },
  { type: 'practice', route: '/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/', hasResearchMaterials: false },
  { type: 'practice', route: '/practice/how-to-use-ai-as-a-second-reader/', hasResearchMaterials: false },
  { type: 'concept', route: '/pl/concepts/context-window/', hasResearchMaterials: false },
  { type: 'concept', route: '/concepts/context-window/', hasResearchMaterials: false }
] as const;

const publicationTypes = new Set(['article', 'note', 'practice']);

test('keeps reading width scoped by entry type across desktop and mobile', async ({ page }, testInfo) => {
  test.setTimeout(5 * 60 * 1000);
  test.skip(testInfo.project.name !== 'desktop-1440', 'This matrix owns its explicit viewport set.');

  for (const entry of cases) {
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      const consoleErrors: string[] = [];
      const onConsole = (message: import('@playwright/test').ConsoleMessage) => {
        if (message.type() === 'error' && !message.text().includes('ERR_NETWORK_ACCESS_DENIED')) {
          consoleErrors.push(message.text());
        }
      };
      const onPageError = (error: Error) => consoleErrors.push(error.message);
      page.on('console', onConsole);
      page.on('pageerror', onPageError);

      await page.goto(entry.route, { waitUntil: 'networkidle' });

      const metrics = await page.evaluate(() => {
        const article = document.querySelector('.article-shell');
        const grid = document.querySelector('.article-grid');
        const prose = document.querySelector('.article-shell .prose');
        const aside = document.querySelector('.article-aside');
        const research = document.querySelector('.research-materials');
        if (!article || !grid || !prose) throw new Error('Expected entry layout is missing');

        const style = getComputedStyle(prose);
        const proseRect = prose.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        const asideRect = aside?.getBoundingClientRect();
        const researchRect = research?.getBoundingClientRect();
        const wideComponents = [...document.querySelectorAll(
          '.research-materials, .research-table, .article-data-table, .article-figure, .workflow-comparison, .vignette-chart, .prompt-example'
        )].map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            selector: element.getAttribute('data-qa') || element.className,
            left: rect.left,
            right: rect.right,
            width: rect.width
          };
        });

        return {
          classes: [...article.classList],
          gridWidth: gridRect.width,
          proseWidth: proseRect.width,
          proseFontSize: Number.parseFloat(style.fontSize),
          proseLineHeight: Number.parseFloat(style.lineHeight),
          lineHeightRatio: Number.parseFloat(style.lineHeight) / Number.parseFloat(style.fontSize),
          researchWidth: researchRect?.width ?? null,
          wideComponents,
          asideOverlap: Boolean(
            asideRect &&
              asideRect.width > 0 &&
              proseRect.left < asideRect.right - 1 &&
              proseRect.top < asideRect.bottom &&
              proseRect.bottom > asideRect.top
          ),
          documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          viewportOverflow: wideComponents.filter((component) => component.left < -1 || component.right > window.innerWidth + 1)
        };
      });

      expect(metrics.classes).toContain('article-shell');
      expect(metrics.classes).toContain(`article-shell--${entry.type}`);
      expect(consoleErrors, `${entry.route} at ${viewport.width}px`).toEqual([]);
      expect(metrics.documentOverflow, `${entry.route} at ${viewport.width}px`).toBe(false);
      expect(metrics.asideOverlap, `${entry.route} at ${viewport.width}px`).toBe(false);
      expect(metrics.viewportOverflow, `${entry.route} at ${viewport.width}px`).toEqual([]);

      if (entry.type === 'concept') {
        expect(metrics.classes).not.toContain('article-shell--publication');
      } else {
        expect(metrics.classes).toContain('article-shell--publication');
      }

      if (viewport.width >= 1024 && publicationTypes.has(entry.type)) {
        const expectedRatio = entry.type === 'practice' ? 1.86 : 1.82;
        expect(metrics.lineHeightRatio).toBeCloseTo(expectedRatio, 2);
        if (entry.type === 'practice') {
          expect(metrics.proseWidth).toBeLessThan(650);
        } else if (entry.hasResearchMaterials) {
          expect(metrics.proseWidth).toBeGreaterThan(700);
          expect(metrics.proseWidth).toBeLessThan(900);
        } else {
          expect(metrics.proseWidth).toBeGreaterThan(620);
          expect(metrics.proseWidth).toBeLessThan(750);
        }
      }

      if (viewport.width < 1024 && publicationTypes.has(entry.type)) {
        expect(metrics.proseWidth).toBeLessThanOrEqual(metrics.gridWidth + 1);
        expect(metrics.proseWidth).toBeLessThanOrEqual(viewport.width - 31);
      }

      if (entry.hasResearchMaterials) {
        expect(metrics.researchWidth).not.toBeNull();
        expect(metrics.researchWidth!).toBeLessThanOrEqual(1056);
        if (viewport.width >= 1024) {
          expect(metrics.researchWidth!).toBeGreaterThan(metrics.proseWidth);
        } else {
          expect(metrics.researchWidth!).toBeGreaterThanOrEqual(metrics.proseWidth);
        }
      }

      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    }
  }
});
