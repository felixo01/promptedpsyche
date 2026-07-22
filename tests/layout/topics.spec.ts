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
        await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);

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

  test('adds the bilingual LLM package to AI and cognition without replacing the flagship', async ({ page }) => {
    const cases = [
      {
        route: '/topics/ai-and-cognition/',
        flagship: "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
        article: 'OpenAI, ChatGPT, GPT and LLM: What Is the Difference?',
        concept: 'Large Language Model (LLM)'
      },
      {
        route: '/pl/topics/ai-i-myslenie/',
        flagship: 'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać',
        article: 'OpenAI, ChatGPT, GPT i LLM - czym się różnią?',
        concept: 'LLM (duży model językowy)'
      }
    ];

    for (const testCase of cases) {
      await page.goto(testCase.route);
      await expect(page.locator('[data-qa="topic-hub"]')).toContainText(testCase.flagship);
      await expect(page.getByRole('link', { name: testCase.article, exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: testCase.concept, exact: true })).toBeVisible();
    }
  });
});
