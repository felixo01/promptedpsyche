import { expect, test } from '@playwright/test';

const notePairs = [
  {
    plTitle: 'Brzmi dobrze, ale to nie znaczy, że jest prawdziwe',
    enTitle: 'Fluent does not mean true',
    plRoute: '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/',
    enRoute: '/notes/fluent-does-not-mean-true/',
    plDate: '2026, 24 czerwca',
    enDate: '2026, June 24',
    plConcepts: [
      '/pl/concepts/model-output/',
      '/pl/concepts/calibrated-trust/',
      '/pl/concepts/epistemic-vigilance/',
      '/pl/concepts/ai-literacy/'
    ],
    enConcepts: [
      '/concepts/model-output/',
      '/concepts/calibrated-trust/',
      '/concepts/epistemic-vigilance/',
      '/concepts/ai-literacy/'
    ]
  },
  {
    plTitle: 'Model widzi tekst, a nie całą relację',
    enTitle: 'The model sees text, not the whole relationship',
    plRoute: '/pl/notes/model-widzi-tekst-nie-cala-relacje/',
    enRoute: '/notes/the-model-sees-text-not-the-whole-relationship/',
    plDate: '2026, 26 czerwca',
    enDate: '2026, June 26',
    plConcepts: [
      '/pl/concepts/context-window/',
      '/pl/concepts/model-output/',
      '/pl/concepts/mental-model/',
      '/pl/concepts/epistemic-vigilance/'
    ],
    enConcepts: [
      '/concepts/context-window/',
      '/concepts/model-output/',
      '/concepts/mental-model/',
      '/concepts/epistemic-vigilance/'
    ]
  },
  {
    plTitle: 'Nie diagnozuj ludzi z maili',
    enTitle: 'Do not diagnose people from emails',
    plRoute: '/pl/notes/nie-diagnozuj-ludzi-z-maili/',
    enRoute: '/notes/do-not-diagnose-people-from-emails/',
    plDate: '2026, 30 czerwca',
    enDate: '2026, June 30',
    plConcepts: [
      '/pl/concepts/ai-mediated-communication/',
      '/pl/concepts/calibrated-trust/',
      '/pl/concepts/epistemic-vigilance/',
      '/pl/concepts/nadzor-ze-strony-czlowieka/'
    ],
    enConcepts: [
      '/concepts/ai-mediated-communication/',
      '/concepts/calibrated-trust/',
      '/concepts/epistemic-vigilance/',
      '/concepts/human-oversight/'
    ]
  },
  {
    plTitle: 'Dobre streszczenie to jeszcze nie dobra decyzja',
    enTitle: 'A good summary is not the same as a good decision',
    plRoute: '/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/',
    enRoute: '/notes/a-good-summary-is-not-the-same-as-a-good-decision/',
    plDate: '2026, 2 lipca',
    enDate: '2026, July 2',
    plConcepts: [
      '/pl/concepts/cognitive-load/',
      '/pl/concepts/ai-literacy/',
      '/pl/concepts/metacognition/',
      '/pl/concepts/epistemic-vigilance/',
      '/pl/concepts/calibrated-trust/',
      '/pl/concepts/nadzor-ze-strony-czlowieka/'
    ],
    enConcepts: [
      '/concepts/cognitive-load/',
      '/concepts/ai-literacy/',
      '/concepts/metacognition/',
      '/concepts/epistemic-vigilance/',
      '/concepts/calibrated-trust/',
      '/concepts/human-oversight/'
    ]
  },
  {
    plTitle: '„Masz rację” — powiedziało AI. Problem w tym, że znało tylko twoją wersję',
    enTitle: '“You’re Right,” Said the AI. But It Only Knew Your Side of the Story',
    plRoute: '/pl/notes/masz-racje-powiedzialo-ai/',
    enRoute: '/notes/youre-right-said-the-ai/',
    plDate: '2026, 18 lipca',
    enDate: '2026, July 18',
    plConcepts: ['/pl/concepts/potakiwanie-modelu/'],
    enConcepts: ['/concepts/sycophancy/']
  }
];

const llmNotePair = {
  plTitle: 'OpenAI, ChatGPT, GPT i LLM - czym się różnią?',
  enTitle: 'OpenAI, ChatGPT, GPT and LLM: What Is the Difference?',
  plRoute: '/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/',
  enRoute: '/notes/openai-chatgpt-gpt-llm-difference/',
  plDate: '2026, 22 lipca',
  enDate: '2026, July 22'
};

const contextNotePair = {
  plTitle: 'Model nie pamięta. Model ma kontekst.',
  enTitle: 'The model does not remember. It works with context.',
  plRoute: '/pl/notes/model-nie-pamieta-model-ma-kontekst/',
  enRoute: '/notes/the-model-does-not-remember-it-works-with-context/',
  plDate: '2026, 28 marca',
  enDate: '2026, March 28'
};

const allNotePairs = [...notePairs, llmNotePair, contextNotePair];

test.describe('published notes', () => {
  test('shows public English notes on the English notes index', async ({ page }) => {
    await page.goto('/notes/');

    await expect(page.locator('.entry-list article')).toHaveCount(allNotePairs.length);
    await expect(page.locator('body')).not.toContainText('Notes are in preparation.');
    await expect(page.locator('body')).not.toContainText('A good summary is not a good decision');

    for (const note of allNotePairs) {
      await expect(page.locator('.entry-list')).toContainText(note.enTitle);
      await expect(page.locator('body')).not.toContainText(note.plTitle);

      const titleLink = page.getByRole('link', { name: note.enTitle, exact: true });
      const ctaLink = page.getByRole('link', { name: `Read note: ${note.enTitle}` });

      await expect(titleLink).toHaveAttribute('href', note.enRoute);
      await expect(ctaLink).toHaveAttribute('href', note.enRoute);
      await expect(ctaLink).toContainText('Read note');
      await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    }

    const dates = await page.locator('.entry-list time').evaluateAll((items) =>
      items.map((item) => item.getAttribute('datetime'))
    );
    expect(new Set(dates).size).toBe(allNotePairs.length);
  });

  test('shows public Polish notes on the Polish notes index', async ({ page }) => {
    await page.goto('/pl/notes/');

    await expect(page.locator('.entry-list article')).toHaveCount(allNotePairs.length);
    await expect(page.locator('body')).not.toContainText('Notatki są w przygotowaniu.');
    await expect(page.locator('body')).not.toContainText('Dobre streszczenie nie jest dobrą decyzją');

    for (const note of allNotePairs) {
      await expect(page.locator('.entry-list')).toContainText(note.plTitle);
      await expect(page.locator('body')).not.toContainText(note.enTitle);

      const titleLink = page.getByRole('link', { name: note.plTitle, exact: true });
      const ctaLink = page.getByRole('link', { name: `Czytaj notatkę: ${note.plTitle}` });

      await expect(titleLink).toHaveAttribute('href', note.plRoute);
      await expect(ctaLink).toHaveAttribute('href', note.plRoute);
      await expect(ctaLink).toContainText('Czytaj notatkę');
      await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    }

    const dates = await page.locator('.entry-list time').evaluateAll((items) =>
      items.map((item) => item.getAttribute('datetime'))
    );
    expect(new Set(dates).size).toBe(allNotePairs.length);
  });

  test('keeps matching publication dates for note counterparts', async ({ page }) => {
    for (const note of allNotePairs) {
      await page.goto(note.enRoute);
      const enDate = await page.locator('[data-qa="article-byline"] time').getAttribute('datetime');

      await page.goto(note.plRoute);
      const plDate = await page.locator('[data-qa="article-byline"] time').getAttribute('datetime');

      expect(enDate).toBe(plDate);
    }
  });

  test('does not expose Polish notes on English routes', async ({ request }) => {
    for (const note of allNotePairs) {
      const leakedRoute = await request.get(note.plRoute.replace('/pl', ''));
      expect(leakedRoute.ok()).toBe(false);
    }
  });

  test('renders copyable prompt examples in the model sees text note pair', async ({ page }) => {
    await page.goto('/pl/notes/model-widzi-tekst-nie-cala-relacje/');

    await expect(page.locator('.prompt-example')).toHaveCount(2);
    await expect(page.locator('.prompt-example--bad')).toContainText('Nie pytaj tak');
    await expect(page.locator('.prompt-example--better')).toContainText('Lepsze pytanie');
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toHaveCount(2);

    await page.goto('/notes/the-model-sees-text-not-the-whole-relationship/');

    await expect(page.locator('.prompt-example')).toHaveCount(2);
    await expect(page.locator('.prompt-example--bad')).toContainText('Do not ask this');
    await expect(page.locator('.prompt-example--better')).toContainText('Better question');
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toHaveCount(2);
  });

  test('publishes the bilingual LLM explainer as Notes without changing its evidence package', async ({ page, request }) => {
    const cases = [
      {
        route: llmNotePair.enRoute,
        alternate: llmNotePair.plRoute,
        title: llmNotePair.enTitle,
        lang: 'en',
        label: 'Note',
        readingTime: '10 min read',
        bibliography: 'Bibliography',
        concept: '/concepts/llm/'
      },
      {
        route: llmNotePair.plRoute,
        alternate: llmNotePair.enRoute,
        title: llmNotePair.plTitle,
        lang: 'pl',
        label: 'Notatka',
        readingTime: '11 min czytania',
        bibliography: 'Bibliografia',
        concept: '/pl/concepts/llm/'
      }
    ] as const;

    for (const testCase of cases) {
      const response = await request.get(testCase.route);
      expect(response.ok(), testCase.route).toBe(true);

      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(testCase.route);

      await expect(page.locator('html')).toHaveAttribute('lang', testCase.lang);
      await expect(page.locator('.eyebrow')).toHaveText(testCase.label);
      await expect(page.locator('.content-header h1')).toHaveText(testCase.title);
      await expect(page.locator('[data-qa="article-byline"]')).toContainText(testCase.readingTime);
      await expect(page.locator('[data-qa="article-byline"] time')).toHaveAttribute(
        'datetime',
        '2026-07-22T00:00:00.000Z'
      );
      await expect(page.locator('[data-qa="in-brief"] p')).toHaveCount(4);
      await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
      await expect(page.locator('[data-qa="article-byline"]')).not.toContainText('DOI');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${testCase.route}`
      );
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${testCase.lang === 'en' ? 'pl' : 'en'}"]`)
      ).toHaveAttribute('href', `https://promptedpsyche.com${testCase.alternate}`);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${llmNotePair.enRoute}`
      );
      await expect(page.locator(`.language-switcher a[href="${testCase.alternate}"]`)).toBeVisible();
      await expect(page.locator(`.prose a[href="${testCase.concept}"]`)).toBeVisible();

      const structuredDataText = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));
      expect(structuredDataText).toContain('"@type":"BlogPosting"');
      expect(structuredDataText).not.toContain('"@type":"Article"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#feliks-mamczur"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#publisher"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#website"');
      expect(structuredDataText).not.toContain('"propertyID":"DOI"');

      const comparison = page.locator('[data-qa="llm-entity-comparison"]');
      await expect(comparison.locator('thead th')).toHaveCount(5);
      await expect(comparison.locator('tbody tr')).toHaveCount(4);
      await expect(comparison.locator('.entity-comparison__cards .entity-card')).toHaveCount(4);

      const map = page.locator('[data-qa="llm-entity-map"]');
      await expect(map.locator('[data-node="OpenAI"]')).toHaveCount(1);
      await expect(map.locator('[data-node="ChatGPT"]')).toHaveCount(1);
      await expect(map.locator('[data-node="GPT"]')).toHaveCount(1);
      await expect(map.locator('[data-node="LLM"]')).toHaveCount(1);
      await expect(map.locator('[data-qa="llm-entity-map-semantic"] dl > div')).toHaveCount(7);
      await expect(map.locator('[data-qa="llm-entity-map-semantic"] ol > li')).toHaveCount(7);

      await expect(page.locator('a[data-footnote-ref]')).toHaveCount(15);
      await expect(page.locator('section[data-footnotes] li')).toHaveCount(15);
      const bibliographyHeading = page.getByRole('heading', { name: testCase.bibliography, exact: true });
      await expect(bibliographyHeading).toBeVisible();
      await expect(bibliographyHeading.locator('xpath=following-sibling::ol[1]/li')).toHaveCount(24);

      for (const width of [390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await expect(comparison.locator('.entity-comparison__cards .entity-card').first()).toBeVisible();
        await expect(comparison.locator('.entity-comparison__table')).toBeHidden();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        expect(overflow, `${testCase.route} at ${width}px`).toBe(false);
      }
    }
  });

  test('publishes the context and memory explainer as Notes without changing its evidence package', async ({ page, request }) => {
    const cases = [
      {
        route: contextNotePair.enRoute,
        alternate: contextNotePair.plRoute,
        title: contextNotePair.enTitle,
        lang: 'en',
        label: 'Note',
        readingTime: '9 min read',
        citationDate: contextNotePair.enDate,
        bibliography: 'References',
        caption: 'available context',
        conceptPrefix: '/concepts/'
      },
      {
        route: contextNotePair.plRoute,
        alternate: contextNotePair.enRoute,
        title: contextNotePair.plTitle,
        lang: 'pl',
        label: 'Notatka',
        readingTime: '9 min czytania',
        citationDate: contextNotePair.plDate,
        bibliography: 'Źródła i dalsza lektura',
        caption: 'dostępnym kontekście',
        conceptPrefix: '/pl/concepts/'
      }
    ] as const;

    for (const testCase of cases) {
      const response = await request.get(testCase.route);
      expect(response.ok(), testCase.route).toBe(true);

      await page.goto(testCase.route);
      await expect(page.locator('html')).toHaveAttribute('lang', testCase.lang);
      await expect(page.locator('.eyebrow')).toHaveText(testCase.label);
      await expect(page.locator('.content-header h1')).toHaveText(testCase.title);
      await expect(page.locator('[data-qa="article-aside-label"]')).toHaveText(
        testCase.lang === 'pl' ? 'W tekście' : 'In this note'
      );
      await expect(page.locator('[data-qa="article-byline"]')).toContainText(testCase.readingTime);
      await expect(page.locator('[data-qa="article-byline"] time')).toHaveAttribute(
        'datetime',
        '2026-03-28T00:00:00.000Z'
      );
      await expect(page.locator('[data-qa="in-brief"] p')).toHaveCount(4);
      await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
        'src',
        '/images/articles/model-context-window-diagram.svg'
      );
      await expect(page.locator('.article-hero-figure figcaption')).toContainText(testCase.caption);
      await expect(page.locator('.editorial-aside')).toContainText(
        testCase.lang === 'pl' ? 'W praktyce' : 'In practice'
      );
      await expect(page.locator(`.prose a[href="${testCase.conceptPrefix}context-window/"]`)).toBeVisible();
      await expect(page.locator(`.prose a[href="${testCase.conceptPrefix}token/"]`)).toBeVisible();
      await expect(page.locator('a[data-footnote-ref]')).toHaveCount(0);
      await expect(page.locator('.prose table')).toHaveCount(0);
      const bibliographyHeading = page.getByRole('heading', {
        name: testCase.bibliography,
        exact: true
      });
      await expect(bibliographyHeading.locator('xpath=following-sibling::ul[1]/li')).toHaveCount(8);
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
        `Mamczur, F. (${testCase.citationDate}). ${testCase.title} Prompted Psyche. https://promptedpsyche.com${testCase.route}`
      );
      await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${testCase.route}`
      );
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${testCase.lang === 'en' ? 'pl' : 'en'}"]`)
      ).toHaveAttribute('href', `https://promptedpsyche.com${testCase.alternate}`);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${contextNotePair.enRoute}`
      );

      const structuredDataText = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));
      expect(structuredDataText).toContain('"@type":"BlogPosting"');
      expect(structuredDataText).not.toContain('"@type":"Article"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#feliks-mamczur"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#publisher"');
      expect(structuredDataText).toContain('"@id":"https://promptedpsyche.com/#website"');
    }
  });

  for (const note of notePairs) {
    test(`renders English note detail page for ${note.enTitle}`, async ({ page }) => {
      await page.goto(note.enRoute);

      await expect(page.locator('.content-header h1')).toHaveText(note.enTitle);
      await expect(page.locator('[data-qa="in-brief"]')).toHaveCount(0);
      await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
      await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
        `Mamczur, F. (${note.enDate}). ${note.enTitle}. Prompted Psyche. https://promptedpsyche.com${note.enRoute}`
      );
      await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
      await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
        'All rights reserved'
      );

      for (const href of note.enConcepts) {
        await expect(page.locator(`.prose a[href="${href}"]`)).toBeVisible();
      }

      await expect(page.locator(`.language-switcher a[href="${note.plRoute}"]`)).toBeVisible();
    });

    test(`renders Polish note detail page for ${note.plTitle}`, async ({ page }) => {
      await page.goto(note.plRoute);

      await expect(page.locator('.content-header h1')).toHaveText(note.plTitle);
      await expect(page.locator('[data-qa="in-brief"]')).toHaveCount(0);
      await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
      await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
        `Mamczur, F. (${note.plDate}). ${note.plTitle}. Prompted Psyche. https://promptedpsyche.com${note.plRoute}`
      );
      await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
      await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
        'Wszystkie prawa zastrzeżone'
      );

      for (const href of note.plConcepts) {
        await expect(page.locator(`.prose a[href="${href}"]`)).toBeVisible();
      }

      await expect(page.locator(`.language-switcher a[href="${note.enRoute}"]`)).toBeVisible();
    });
  }
});
