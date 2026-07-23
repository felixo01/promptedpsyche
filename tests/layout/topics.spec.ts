import { expect, test, type Page } from '@playwright/test';

const topicPairs = [
  {
    en: '/topics/trust-in-ai/',
    pl: '/pl/topics/zaufanie-do-ai/',
    enTitle: 'Trust in AI',
    plTitle: 'Zaufanie do AI'
  },
  {
    en: '/topics/ai-and-cognition/',
    pl: '/pl/topics/ai-i-myslenie/',
    enTitle: 'AI and cognition',
    plTitle: 'AI i myślenie'
  },
  {
    en: '/topics/human-agency-and-responsibility/',
    pl: '/pl/topics/sprawczosc-i-odpowiedzialnosc/',
    enTitle: 'Human agency and responsibility',
    plTitle: 'Sprawczość i odpowiedzialność'
  }
];

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('topic hubs', () => {
  test('publishes bilingual topic indexes without adding Topics to the main menu', async ({ page }) => {
    await page.goto('/topics/');

    await expect(page.getByRole('heading', { name: 'Topics', level: 1 })).toBeVisible();
    await expect(page.locator('[data-qa="topic-index-card"]')).toHaveCount(3);
    await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Topics');
    await expect(page.locator('[data-qa="site-footer"]').getByRole('link', { name: 'Topics' })).toHaveAttribute(
      'href',
      '/topics/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/topics/'
    );
    await expectNoHorizontalOverflow(page);

    await page.goto('/pl/topics/');

    await expect(page.getByRole('heading', { name: 'Obszary', level: 1 })).toBeVisible();
    await expect(page.locator('[data-qa="topic-index-card"]')).toHaveCount(3);
    await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Obszary');
    await expect(page.locator('[data-qa="site-footer"]').getByRole('link', { name: 'Obszary' })).toHaveAttribute(
      'href',
      '/pl/topics/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/topics/'
    );
    await expectNoHorizontalOverflow(page);
  });

  for (const topic of topicPairs) {
    test(`renders complete bilingual topic pair for ${topic.enTitle}`, async ({ page, request }) => {
      for (const [route, title, alternate, language] of [
        [topic.en, topic.enTitle, topic.pl, 'en'],
        [topic.pl, topic.plTitle, topic.en, 'pl']
      ] as const) {
        const response = await request.get(route);
        expect(response.ok(), route).toBe(true);

        await page.goto(route);
        await expect(page.getByRole('heading', { name: title, level: 1 })).toBeVisible();
        await expect(page.locator('[data-qa="topic-hub"]')).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          'href',
          `https://promptedpsyche.com${route}`
        );
        await expect(page.locator(`link[rel="alternate"][hreflang="${language === 'en' ? 'pl' : 'en'}"]`)).toHaveAttribute(
          'href',
          `https://promptedpsyche.com${alternate}`
        );
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
          'href',
          `https://promptedpsyche.com${topic.en}`
        );
        await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
        const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
        expect(structuredData).toContain('https://promptedpsyche.com/#website');
        expect(structuredData).toContain('https://promptedpsyche.com/#publisher');
        expect(structuredData).not.toContain('BreadcrumbList');

        const wordCount = await page.locator('[data-qa="topic-hub"]').evaluate((element) =>
          (element.textContent ?? '').trim().split(/\s+/).filter(Boolean).length
        );
        expect(wordCount).toBeGreaterThanOrEqual(500);
        expect(wordCount).toBeLessThanOrEqual(900);

        await expect(page.locator('.topic-resource-group')).toHaveCount(4);
        await expect(page.locator('.topic-reading-path li')).toHaveCount(5);
        await expect(
          page.locator('#main').getByRole('link', { name: language === 'en' ? 'About the author' : 'Kim jestem' }),
        ).toBeVisible();
        await expectNoHorizontalOverflow(page);
      }
    });
  }

  test('keeps all internal links in topic hubs resolvable', async ({ page, request }) => {
    const routes = topicPairs.flatMap((topic) => [topic.en, topic.pl]);
    const hrefs = new Set<string>();

    for (const route of routes) {
      await page.goto(route);
      const pageHrefs = await page.locator('[data-qa="topic-hub"] a[href^="/"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? '')
      );
      pageHrefs.filter(Boolean).forEach((href) => hrefs.add(href));
    }

    expect(hrefs.size).toBeGreaterThanOrEqual(50);
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.ok(), href).toBe(true);
    }
  });

  test('adds curated exploration links to the three launch clusters', async ({ page }) => {
    const cases = [
      {
        route: '/articles/trust-in-the-age-of-ready-made-answers/',
        heading: 'Continue exploring',
        hub: '/topics/trust-in-ai/',
        count: 4
      },
      {
        route: '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
        heading: 'Czytaj dalej',
        hub: '/pl/topics/ai-i-myslenie/',
        count: 4
      },
      {
        route: '/concepts/human-agency/',
        heading: 'Continue exploring',
        hub: '/topics/human-agency-and-responsibility/',
        count: 5
      },
      {
        route: '/pl/practice/jak-uzyc-ai-bez-oddawania-mu-decyzji/',
        heading: 'Czytaj dalej',
        hub: '/pl/topics/sprawczosc-i-odpowiedzialnosc/',
        count: 3
      },
      {
        route: '/practice/how-to-check-whether-the-model-has-enough-context/',
        heading: 'Continue exploring',
        hub: '/topics/ai-and-cognition/',
        count: 3
      },
      {
        route: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/',
        heading: 'Czytaj dalej',
        hub: '/pl/topics/ai-i-myslenie/',
        count: 3
      }
    ];

    for (const testCase of cases) {
      await page.goto(testCase.route);
      const section = page.locator('[data-qa="continue-exploring"]');
      await expect(section.getByRole('heading', { name: testCase.heading })).toBeVisible();
      await expect(section.locator('li')).toHaveCount(testCase.count);
      await expect(section.locator(`a[href="${testCase.hub}"]`)).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  });

  test('keeps the bilingual explainers in Notes without replacing the cognition flagship', async ({ page }) => {
    const cases = [
      {
        route: '/topics/ai-and-cognition/',
        flagship: "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
        flagshipHref: '/articles/dont-ask-whether-ai-makes-us-dumber/',
        note: 'OpenAI, ChatGPT, GPT and LLM: What Is the Difference?',
        noteHref: '/notes/openai-chatgpt-gpt-llm-difference/',
        contextNote: 'The model does not remember. It works with context',
        contextNoteHref: '/notes/the-model-does-not-remember-it-works-with-context/',
        notesHeading: 'Notes',
        concept: 'Large Language Model (LLM)',
        contextPractice: 'How to Check Whether the Model Has the Context It Needs',
        contextPracticeHref: '/practice/how-to-check-whether-the-model-has-enough-context/',
        generativeSearchArticle: 'When Search Becomes an Answer: What Generative AI Changes About Learning',
        generativeSearchHref: '/articles/when-search-becomes-an-answer/'
      },
      {
        route: '/pl/topics/ai-i-myslenie/',
        flagship: 'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać',
        flagshipHref: '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
        note: 'OpenAI, ChatGPT, GPT i LLM - czym się różnią?',
        noteHref: '/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/',
        contextNote: 'Model nie pamięta. Model ma kontekst',
        contextNoteHref: '/pl/notes/model-nie-pamieta-model-ma-kontekst/',
        notesHeading: 'Notatki',
        concept: 'LLM (duży model językowy)',
        contextPractice: 'Jak sprawdzić, czy model ma potrzebny kontekst',
        contextPracticeHref: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/',
        generativeSearchArticle: 'Wyszukiwarka odpowiada. Co zostaje uczniowi?',
        generativeSearchHref: '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/'
      }
    ];

    for (const testCase of cases) {
      await page.goto(testCase.route);
      await expect(page.locator('[data-qa="topic-hub"]')).toContainText(testCase.flagship);
      await expect(page.locator('.topic-feature')).toHaveAttribute('href', testCase.flagshipHref);
      const notesSection = page.locator('.topic-resource-group').filter({
        has: page.getByRole('heading', { name: testCase.notesHeading, exact: true })
      });
      await expect(
        notesSection.getByRole('link', { name: testCase.note, exact: true })
      ).toHaveAttribute('href', testCase.noteHref);
      await expect(
        notesSection.getByRole('link', { name: testCase.contextNote, exact: true })
      ).toHaveAttribute('href', testCase.contextNoteHref);
      await expect(
        page.locator('.topic-resource-group').filter({
          has: page.getByRole('heading', { name: /Articles|Artykuły/, exact: true })
        }).getByRole('link', { name: testCase.note, exact: true })
      ).toHaveCount(0);
      await expect(
        page.locator('.topic-resource-group').filter({
          has: page.getByRole('heading', { name: /Articles|Artykuły/, exact: true })
        }).getByRole('link', { name: testCase.contextNote, exact: true })
      ).toHaveCount(0);
      await expect(page.getByRole('link', { name: testCase.concept, exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: testCase.contextPractice, exact: true })).toHaveAttribute(
        'href',
        testCase.contextPracticeHref
      );
      await expect(
        page.locator('.topic-resource-group').first().getByRole('link', {
          name: testCase.generativeSearchArticle,
          exact: true
        })
      ).toHaveAttribute('href', testCase.generativeSearchHref);
      await expect(page.locator('.topic-reading-path li')).toHaveCount(5);
      await expect(page.locator(`.topic-reading-path a[href="${testCase.generativeSearchHref}"]`)).toHaveCount(0);
    }
  });
});
