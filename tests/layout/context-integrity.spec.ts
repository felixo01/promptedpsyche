import { expect, test, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {
  classifyReconstruction,
  controlledReconstructionCases,
  syntheticContextChecklist
} from '../fixtures/context-integrity';

const routes = {
  en: {
    route: '/practice/how-to-check-whether-the-model-has-enough-context/',
    alternate: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/',
    title: 'How to Check Whether the Model Has the Context It Needs',
    oldTitle: 'How to check whether the model has enough context',
    description:
      'An exercise for checking whether a model still represents the goal, constraints, sources and earlier decisions accurately - without pretending to measure the technical context window.',
    sourceFile: 'src/content/practice/how-to-check-whether-the-model-has-enough-context.mdx',
    authorRoute: '/about/',
    noteRoute: '/notes/the-model-does-not-remember-it-works-with-context/',
    oldNoteRoute: '/articles/the-model-does-not-remember-it-works-with-context/',
    reconstructionButton: 'Copy the context reconstruction prompt',
    reconstructionText: 'no basis in the available context',
    handoffButton: 'Copy the context handoff template',
    handoffText: '# Context handoff',
    statusCaption: 'Context comparison matrix',
    statuses: ['Present', 'Missing', 'Distorted', 'Inferred'],
    checklistTypes: ['Goal', 'Current task', 'Constraint', 'Source', 'Decision', 'Open question', 'Do not assume'],
    sectionHeadings: [
      '1. The situation',
      '2. Goal of the exercise',
      '3. What this exercise does not measure',
      '4. Materials',
      '5. Build a source-of-truth checklist',
      '6. Run the context reconstruction',
      '7. Compare with the source material',
      '8. Classify each item',
      '9. Decide: continue, refresh or start a new context',
      '10. Context handoff',
      '11. Quick 3-minute variant',
      '12. Advanced variant',
      '13. Common mistakes',
      '14. Related materials',
      '15. Sources'
    ]
  },
  pl: {
    route: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/',
    alternate: '/practice/how-to-check-whether-the-model-has-enough-context/',
    title: 'Jak sprawdzić, czy model ma potrzebny kontekst',
    oldTitle: 'Jak sprawdzić, czy model ma wystarczający kontekst',
    description:
      'Ćwiczenie pozwala sprawdzić, czy model nadal prawidłowo uwzględnia cel, ograniczenia, źródła i wcześniejsze decyzje - bez udawania, że mierzy techniczne okno kontekstu.',
    sourceFile: 'src/content/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst.mdx',
    authorRoute: '/pl/about/',
    noteRoute: '/pl/notes/model-nie-pamieta-model-ma-kontekst/',
    oldNoteRoute: '/pl/articles/model-nie-pamieta-model-ma-kontekst/',
    reconstructionButton: 'Kopiuj prompt do odtworzenia stanu zadania',
    reconstructionText: 'brak podstaw w dostępnym kontekście',
    handoffButton: 'Kopiuj szablon przekazania kontekstu',
    handoffText: '# Przekazanie kontekstu',
    statusCaption: 'Macierz porównania odpowiedzi z materiałem źródłowym',
    statuses: ['Obecne', 'Pominięte', 'Zniekształcone', 'Wywnioskowane'],
    checklistTypes: ['Cel', 'Aktualne zadanie', 'Ograniczenie', 'Źródło', 'Decyzja', 'Pytanie otwarte', 'Nie zakładaj'],
    sectionHeadings: [
      '1. Sytuacja',
      '2. Cel ćwiczenia',
      '3. Czego ćwiczenie nie mierzy',
      '4. Materiały',
      '5. Przygotowanie listy kontrolnej',
      '6. Test odtworzenia stanu zadania',
      '7. Porównanie z materiałem źródłowym',
      '8. Klasyfikacja błędów',
      '9. Decyzja: kontynuować, odświeżyć czy zacząć nowy kontekst',
      '10. Przekazanie kontekstu',
      '11. Wariant szybki: 3 minuty',
      '12. Wariant zaawansowany',
      '13. Typowe błędy',
      '14. Powiązane materiały',
      '15. Źródła'
    ]
  }
} as const;

const expectedSourceUrls = [
  'https://developers.openai.com/api/docs/models',
  'https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt',
  'https://help.openai.com/en/articles/8590148-memory-in-chatgpt-faq',
  'https://aclanthology.org/2024.tacl-1.9/'
];

const requiredInternalRoutes = {
  en: [
    '/notes/the-model-does-not-remember-it-works-with-context/',
    '/concepts/context-window/',
    '/concepts/token/',
    '/concepts/llm/',
    '/practice/how-to-check-whether-an-ai-answer-has-sources/',
    '/practice/how-to-separate-facts-from-interpretations/',
    '/topics/ai-and-cognition/'
  ],
  pl: [
    '/pl/notes/model-nie-pamieta-model-ma-kontekst/',
    '/pl/concepts/context-window/',
    '/pl/concepts/token/',
    '/pl/concepts/llm/',
    '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/',
    '/pl/practice/jak-oddzielic-fakty-od-interpretacji/',
    '/pl/topics/ai-i-myslenie/'
  ]
} as const;

function readSource(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(result.documentScrollWidth, JSON.stringify(result, null, 2)).toBeLessThanOrEqual(
    result.documentClientWidth + 1
  );
  expect(result.bodyScrollWidth, JSON.stringify(result, null, 2)).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('Context Integrity Practice', () => {
  for (const [lang, entry] of Object.entries(routes) as Array<[keyof typeof routes, (typeof routes)[keyof typeof routes]]>) {
    test(`publishes the complete ${lang.toUpperCase()} exercise without changing its route`, async ({ page, request }) => {
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => consoleErrors.push(error.message));

      const response = await request.get(entry.route);
      expect(response.ok()).toBe(true);

      await page.goto(entry.route);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { name: entry.title, level: 1 })).toBeVisible();
      await expect(page).toHaveTitle(new RegExp(entry.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', entry.description);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${entry.route}`
      );
      await expect(page.locator(`link[rel="alternate"][hreflang="${lang === 'en' ? 'pl' : 'en'}"]`)).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${entry.alternate}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${routes.en.route}`
      );

      await expect(page.locator('[data-qa="article-byline"] a', { hasText: 'Feliks Mamczur' })).toHaveAttribute(
        'href',
        entry.authorRoute
      );
      await expect(page.locator('[data-qa="article-byline"] time')).toHaveCount(2);
      await expect(page.locator('[data-qa="article-byline"] time').nth(0)).toHaveAttribute(
        'datetime',
        /^2026-07-07/
      );
      await expect(page.locator('[data-qa="article-byline"] time').nth(1)).toHaveAttribute(
        'datetime',
        /^2026-07-23/
      );
      await expect(page.locator('[data-qa="article-byline"]')).toContainText('12 min');

      const inBrief = page.locator('[data-qa="in-brief"]');
      await expect(inBrief).toBeVisible();
      await expect(inBrief.locator('.in-brief__body p')).toHaveCount(4);
      await expect(page.locator('.prose > h2')).toHaveText(entry.sectionHeadings);
      await expect(page.locator('[data-qa="context-integrity-matrix"]')).toHaveCount(2);
      await expect(page.locator('[data-copyable-prompt]')).toHaveCount(2);
      await expect(page.locator('a[href*="doi.org"]')).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      await expect(page.locator('body')).not.toContainText(entry.oldTitle);

      const rawStructuredData = await page.locator('script[type="application/ld+json"]').textContent();
      expect(rawStructuredData).not.toBeNull();
      const structuredData = JSON.parse(rawStructuredData ?? '{}');
      const graph = structuredData['@graph'] as Array<Record<string, unknown>>;
      expect(graph.some((node) => node['@id'] === 'https://promptedpsyche.com/#website')).toBe(true);
      const publisher = graph.find((node) => node['@id'] === 'https://promptedpsyche.com/#publisher');
      expect(publisher).toBeDefined();
      expect(publisher?.founder).toEqual({ '@id': 'https://promptedpsyche.com/#feliks-mamczur' });

      await expectNoHorizontalOverflow(page);
      const actionableConsoleErrors = consoleErrors.filter(
        (message) => message !== 'Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED'
      );
      expect(actionableConsoleErrors).toEqual([]);
    });

    test(`renders the ${lang.toUpperCase()} checklist, four statuses and responsive card equivalent`, async ({ page }) => {
      await page.goto(entry.route);

      const matrices = page.locator('[data-qa="context-integrity-matrix"]');
      const checklist = matrices.nth(0);
      const comparison = matrices.nth(1);
      await expect(checklist.locator('tbody tr')).toHaveCount(7);
      for (const id of ['G-01', 'T-01', 'C-01', 'S-01', 'D-01', 'O-01', 'N-01']) {
        await expect(checklist.locator('tbody th', { hasText: id })).toHaveCount(1);
      }
      await expect(checklist.locator('tbody tr td:nth-child(2)')).toHaveText(entry.checklistTypes);

      await expect(comparison.locator('caption')).toHaveText(entry.statusCaption);
      await expect(comparison.locator('tbody tr')).toHaveCount(4);
      for (const status of entry.statuses) {
        await expect(
          comparison.locator('tbody td').filter({ hasText: new RegExp(`^${status}$`) })
        ).toHaveCount(1);
      }

      const tableDisplay = await checklist.locator('.context-integrity-matrix__table').evaluate(
        (element) => getComputedStyle(element).display
      );
      const cardsDisplay = await checklist.locator('.context-integrity-matrix__cards').evaluate(
        (element) => getComputedStyle(element).display
      );
      if ((page.viewportSize()?.width ?? 1000) <= 900) {
        expect(tableDisplay).toBe('none');
        expect(cardsDisplay).toBe('grid');
        await expect(checklist.locator('.context-integrity-card')).toHaveCount(7);
      } else {
        expect(tableDisplay).not.toBe('none');
        expect(cardsDisplay).toBe('none');
      }
      await expectNoHorizontalOverflow(page);
    });

    test(`copies the ${lang.toUpperCase()} reconstruction prompt and context handoff independently`, async ({ page }) => {
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: {
            writeText: async (text: string) => {
              (window as Window & { __copiedContextBlock?: string }).__copiedContextBlock = text;
            }
          }
        });
      });

      await page.goto(entry.route);
      await page.getByRole('button', { name: entry.reconstructionButton }).click();
      const reconstruction = await page.evaluate(
        () => (window as Window & { __copiedContextBlock?: string }).__copiedContextBlock
      );
      expect(reconstruction).toContain(entry.reconstructionText);

      await page.getByRole('button', { name: entry.handoffButton }).click();
      const handoff = await page.evaluate(
        () => (window as Window & { __copiedContextBlock?: string }).__copiedContextBlock
      );
      expect(handoff).toContain(entry.handoffText);
      expect(handoff).toContain('N-01:');
    });

    test(`keeps required ${lang.toUpperCase()} semantic and source links resolvable`, async ({ page, request }) => {
      await page.goto(entry.route);
      const internalHrefs = await page.locator('.prose a[href^="/"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? '')
      );

      expect(internalHrefs).toEqual(expect.arrayContaining([...requiredInternalRoutes[lang]]));
      expect(internalHrefs).toContain(entry.noteRoute);
      expect(internalHrefs).not.toContain(entry.oldNoteRoute);
      for (const href of new Set(internalHrefs)) {
        const response = await request.get(href);
        expect(response.ok(), href).toBe(true);
      }

      const externalHrefs = await page.locator('.prose a[href^="https://"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href)
      );
      expect(externalHrefs).toEqual(expect.arrayContaining(expectedSourceUrls));
      expect(new Set(externalHrefs).size).toBe(4);
    });
  }

  test('keeps bilingual source files equivalent and within the methodological boundary', async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    const enSource = readSource(routes.en.sourceFile);
    const plSource = readSource(routes.pl.sourceFile);

    for (const source of [enSource, plSource]) {
      expect(source.match(/^## \d+\./gm)).toHaveLength(15);
      expect(source).toContain('publishedAt: 2026-07-07');
      expect(source).toContain('updatedAt: 2026-07-23');
      expect(source).toContain('translationKey: "practice-context-check"');
      expect(source).toContain('draft: false');
      expect(source.match(/<ContextIntegrityMatrix/g)).toHaveLength(2);
      expect(source.match(/<PromptExample/g)).toHaveLength(2);
      expect(source.match(/^\d+\. \*\*/gm)).toHaveLength(10);
      expect(source).not.toMatch(/^doi:/m);
      expect(source).not.toMatch(/[A-Z]:\\Users\\/);
      expect(source).not.toMatch(/sk-[A-Za-z0-9_-]{20,}/);
      expect(source).not.toContain('@gmail.com');
    }

    expect(plSource).not.toContain('kontekstualnej integralności');
    expect(plSource).not.toContain('system ma świadomość swojego okna');
    expect(plSource).not.toContain('model pamięta cały prompt');
    expect(plSource).not.toContain('zmierz poziom kontekstu');
    expect(enSource).toContain('does **not** reveal');
    expect(enSource).not.toContain('the model can reliably report its entire context');

    for (const url of expectedSourceUrls) {
      expect(enSource).toContain(url);
      expect(plSource).toContain(url);
    }
  });

  test('classifies the synthetic fixture as present, missing, distorted and inferred', async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    expect(syntheticContextChecklist).toHaveLength(10);
    expect(syntheticContextChecklist.filter((item) => item.type === 'constraint')).toHaveLength(2);
    expect(syntheticContextChecklist.filter((item) => item.type === 'source')).toHaveLength(2);

    const result = controlledReconstructionCases.map((testCase) => ({
      id: testCase.id,
      status: classifyReconstruction(testCase.id, testCase.reconstruction)
    }));

    expect(result).toEqual([
      { id: 'G-01', status: 'present' },
      { id: 'C-02', status: 'missing' },
      { id: 'D-01', status: 'distorted' },
      { id: 'S-03', status: 'inferred' }
    ]);
  });
});
