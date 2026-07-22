import { expect, test } from '@playwright/test';

const conceptIndexRoutes = [
  {
    route: '/concepts/',
    expectedCount: 27,
    readMore: 'Read more',
    filterTag: 'cognition',
    allLabel: 'All concepts',
    activeLabel: 'Active filter',
    expectedCopy: 'A working vocabulary',
    absentCopy: 'Roboczy język pojęć',
    emptyFilterMessage: 'No concepts for this filter.',
    requiredTitles: ['Large Language Model (LLM)', 'Model Output', 'Calibrated Trust', 'AI-Mediated Communication'],
    draftTitles: ['What Is Cyberpsychology of AI?', 'Human-AI Interaction: Why Companies Should Care']
  },
  {
    route: '/pl/concepts/',
    expectedCount: 27,
    readMore: 'Czytaj dalej',
    filterTag: 'poznanie',
    allLabel: 'Wszystkie pojęcia',
    activeLabel: 'Aktywny filtr',
    expectedCopy: 'Słownik Prompted Psyche',
    absentCopy: 'Roboczy język pojęć',
    emptyFilterMessage: 'Brak pojęć dla tego filtra.',
    requiredTitles: [
      'Odpowiedź modelu',
      'LLM (duży model językowy)',
      'Skalibrowane zaufanie',
      'Komunikacja zapośredniczona przez AI',
      'Grounding: oparcie odpowiedzi na źródłach',
      'Sycophancy: potakiwanie modelu',
      'Deskilling: erozja kompetencji'
    ],
    draftTitles: ['What Is Cyberpsychology of AI?', 'Human-AI Interaction: Why Companies Should Care']
  }
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

const waveThreeDetailRoutes = [
  '/concepts/hallucination/',
  '/concepts/grounding/',
  '/concepts/sycophancy/',
  '/concepts/overreliance/',
  '/concepts/algorithmic-authority/',
  '/concepts/social-presence/',
  '/concepts/parasocial-relationship/',
  '/concepts/human-agency/',
  '/concepts/deskilling/',
  '/concepts/decision-support/',
  '/pl/concepts/halucynacja-modelu/',
  '/pl/concepts/oparcie-odpowiedzi-na-zrodlach/',
  '/pl/concepts/potakiwanie-modelu/',
  '/pl/concepts/nadmierne-poleganie-na-ai/',
  '/pl/concepts/autorytet-algorytmiczny/',
  '/pl/concepts/poczucie-obecnosci-spolecznej/',
  '/pl/concepts/relacja-paraspoleczna/',
  '/pl/concepts/sprawczosc-czlowieka/',
  '/pl/concepts/erozja-kompetencji/',
  '/pl/concepts/wspomaganie-decyzji/'
];

const conceptDetailRoutes = [
  '/concepts/ai-literacy/',
  '/concepts/llm/',
  '/concepts/ai-mediated-communication/',
  '/pl/concepts/ai-literacy/',
  '/pl/concepts/llm/',
  '/pl/concepts/ai-mediated-communication/',
  ...waveTwoDetailRoutes,
  ...waveThreeDetailRoutes
];

const conceptLanguageChecks = [
  {
    route: '/concepts/',
    visible: ['Hallucination', 'Grounding', 'Sycophancy', 'Human Agency'],
    absent: ['Halucynacja modelu', 'Sprawczość człowieka']
  },
  {
    route: '/pl/concepts/',
    visible: ['Halucynacja modelu', 'Grounding: oparcie odpowiedzi na źródłach', 'Sycophancy: potakiwanie modelu', 'Sprawczość człowieka'],
    absent: ['Algorithmic Authority', 'Decision Support']
  }
];

const conceptLanguagePairs = [
  {
    enRoute: '/concepts/llm/',
    plRoute: '/pl/concepts/llm/',
    enTitle: 'Large Language Model (LLM)',
    plTitle: 'LLM (duży model językowy)'
  },
  {
    enRoute: '/concepts/model-output/',
    plRoute: '/pl/concepts/model-output/',
    enTitle: 'Model Output',
    plTitle: 'Odpowiedź modelu'
  },
  {
    enRoute: '/concepts/calibrated-trust/',
    plRoute: '/pl/concepts/calibrated-trust/',
    enTitle: 'Calibrated Trust',
    plTitle: 'Skalibrowane zaufanie'
  },
  {
    enRoute: '/concepts/ai-mediated-communication/',
    plRoute: '/pl/concepts/ai-mediated-communication/',
    enTitle: 'AI-Mediated Communication',
    plTitle: 'Komunikacja zapośredniczona przez AI'
  },
  {
    enRoute: '/concepts/hallucination/',
    plRoute: '/pl/concepts/halucynacja-modelu/',
    enTitle: 'Hallucination',
    plTitle: 'Halucynacja modelu'
  },
  {
    enRoute: '/concepts/grounding/',
    plRoute: '/pl/concepts/oparcie-odpowiedzi-na-zrodlach/',
    enTitle: 'Grounding',
    plTitle: 'Grounding: oparcie odpowiedzi na źródłach'
  },
  {
    enRoute: '/concepts/sycophancy/',
    plRoute: '/pl/concepts/potakiwanie-modelu/',
    enTitle: 'Sycophancy',
    plTitle: 'Sycophancy: potakiwanie modelu'
  },
  {
    enRoute: '/concepts/decision-support/',
    plRoute: '/pl/concepts/wspomaganie-decyzji/',
    enTitle: 'Decision Support',
    plTitle: 'Wspomaganie decyzji'
  }
];

test.describe('concept cards and tags', () => {
  for (const {
    route,
    readMore,
    filterTag,
    allLabel,
    activeLabel,
    expectedCopy,
    absentCopy,
    emptyFilterMessage,
    expectedCount,
    requiredTitles,
    draftTitles
  } of conceptIndexRoutes) {
    test(`shows ${expectedCount} public concept cards on ${route}`, async ({ page }) => {
      await page.goto(route);

      const cardCount = await page.locator('[data-qa="concept-card"]').count();
      expect(cardCount).toBe(expectedCount);
      await expect(page.locator('body')).toContainText(expectedCopy);
      await expect(page.locator('body')).not.toContainText(absentCopy);

      for (const title of requiredTitles) {
        await expect(page.locator('[data-qa="concept-card"] h2').filter({ hasText: title })).toHaveCount(1);
      }

      for (const title of draftTitles) {
        await expect(page.locator('body')).not.toContainText(title);
      }
    });

    test(`filters concept cards by tag on ${route}`, async ({ page }) => {
      await page.goto(route);

      const allCards = page.locator('[data-qa="concept-card"]');
      const initialCount = await allCards.count();
      expect(initialCount).toBeGreaterThanOrEqual(27);

      const tagLink = page.locator(`[data-concept-tag-link][href*="tag=${encodeURIComponent(filterTag)}"]`).first();
      await expect(tagLink).toBeVisible();
      await expect(tagLink).toHaveAttribute('href', new RegExp(`\\?tag=${encodeURIComponent(filterTag)}`));
      await tagLink.click();

      await expect(page).toHaveURL(new RegExp(`\\?tag=${encodeURIComponent(filterTag)}`));
      await expect(page.locator('[data-active-filter]')).toContainText(activeLabel);
      await expect(page.locator('.concept-filter[aria-current="true"]')).toContainText(filterTag);

      const filteredCount = await page.locator('[data-qa="concept-card"]:visible').count();
      expect(filteredCount).toBeGreaterThan(0);
      expect(filteredCount).toBeLessThanOrEqual(initialCount);

      const readMoreLinks = page.locator('[data-qa="concept-read-more"]:visible');
      await expect(readMoreLinks.first()).toBeVisible();
      await expect(readMoreLinks).toContainText([readMore]);

      await page
        .locator('[data-concept-filter-list]')
        .getByRole('link', { name: allLabel, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${route.replace(/\//g, '\\/')}$`));
      await expect(page.locator('[data-qa="concept-card"]')).toHaveCount(initialCount);
    });

    test(`shows an empty state for an unknown concept tag on ${route}`, async ({ page }) => {
      await page.goto(`${route}?tag=not-a-real-topic`);

      await expect(page.locator('body')).toContainText(emptyFilterMessage);
      await expect(page.locator('[data-active-filter]')).toBeVisible();
      await expect(page.locator('[data-qa="concept-card"]:visible')).toHaveCount(0);
    });

    test(`keeps concept index controls and titles inside the mobile viewport on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(route);

      const result = await page.evaluate(() => {
        const selectors = [
          '.concept-index-heading',
          '[data-concept-filter-list]',
          '[data-qa="concept-card"] h2',
          '.concept-tag-list'
        ];
        const offenders = selectors.flatMap((selector) =>
          Array.from(document.querySelectorAll(selector)).flatMap((node) => {
            const element = node as HTMLElement;
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
              return [];
            }

            if (rect.left >= -1 && rect.right <= window.innerWidth + 1) {
              return [];
            }

            return [
              {
                selector,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 90)
              }
            ];
          })
        );

        return {
          documentScrollWidth: document.documentElement.scrollWidth,
          documentClientWidth: document.documentElement.clientWidth,
          offenders
        };
      });

      expect(result, JSON.stringify(result, null, 2)).toMatchObject({ offenders: [] });
      expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
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

  for (const { route, visible, absent } of conceptLanguageChecks) {
    test(`keeps concept index language scoped on ${route}`, async ({ page }) => {
      await page.goto(route);

      for (const title of visible) {
        await expect(page.locator('[data-qa="concept-card"] h2').filter({ hasText: title })).toBeVisible();
      }

      for (const title of absent) {
        await expect(page.locator('[data-qa="concept-card"] h2').filter({ hasText: title })).toHaveCount(0);
      }
    });
  }

  for (const { enRoute, plRoute, enTitle, plTitle } of conceptLanguagePairs) {
    test(`links language alternates for ${enRoute}`, async ({ page }) => {
      await page.goto(enRoute);

      await expect(page.locator('.content-header h1')).toHaveText(enTitle);
      await expect(page.locator('a[href="' + plRoute + '"]')).toBeVisible();

      await page.goto(plRoute);

      await expect(page.locator('.content-header h1')).toHaveText(plTitle);
      await expect(page.locator('a[href="' + enRoute + '"]')).toBeVisible();
    });
  }

  for (const route of ['/concepts/context-window/', '/pl/concepts/context-window/']) {
    test(`links related concepts to real pages on ${route}`, async ({ page, request }) => {
      await page.goto(route);

      const section = page.locator('.related-concepts');
      await expect(section).toBeVisible();

      const links = section.locator('[data-qa="related-concept-link"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);

      const hrefs = await links.evaluateAll((items) =>
        items.map((item) => (item as HTMLAnchorElement).href)
      );

      for (const href of hrefs) {
        if (route.startsWith('/pl/')) {
          expect(new URL(href).pathname).toMatch(/^\/pl\/concepts\//);
        } else {
          expect(new URL(href).pathname).toMatch(/^\/concepts\//);
        }

        const response = await request.get(href);
        expect(response.ok(), href).toBe(true);
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

  for (const route of waveThreeDetailRoutes) {
    test(`renders wave three detail page with references on ${route}`, async ({ page }) => {
      await page.goto(route);

      await expect(page.locator('.content-header h1')).toBeVisible();
      await expect(page.locator('.prose')).toContainText(/Sources and context|Źródła i kontekst/);

      const text = await page.locator('.prose').innerText();
      expect(text).not.toMatch(/clinical human hallucination|kliniczna halucynacja człowieka/i);
      expect(text).not.toMatch(/the model wants|model chce/i);
      expect(text).not.toMatch(/AI makes the decision for the human|AI podejmuje decyzję za człowieka/i);

      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(hasOverflow).toBe(false);
    });
  }

  test('orders LLM after AI literacy and before Token in both concept indexes', async ({ page }) => {
    for (const testCase of [
      { route: '/concepts/', literacy: 'AI Literacy', llm: 'Large Language Model (LLM)', token: 'Token' },
      { route: '/pl/concepts/', literacy: 'AI literacy', llm: 'LLM (duży model językowy)', token: 'Token' }
    ]) {
      await page.goto(testCase.route);
      const titles = await page.locator('[data-qa="concept-card"] h2').allTextContents();
      expect(titles.indexOf(testCase.llm)).toBe(titles.indexOf(testCase.literacy) + 1);
      expect(titles.indexOf(testCase.token)).toBe(titles.indexOf(testCase.llm) + 1);
    }
  });

  test('keeps the LLM Concept free of the Article-only diagram and Consulting CTA', async ({ page }) => {
    for (const route of ['/concepts/llm/', '/pl/concepts/llm/']) {
      await page.goto(route);
      await expect(page.locator('[data-qa="llm-entity-map"]')).toHaveCount(0);
      await expect(page.locator('[data-qa="consulting-cta"]')).toHaveCount(0);
      await expect(page.locator('.prose')).toContainText(/Bibliography|Bibliografia/);
    }
  });
});
