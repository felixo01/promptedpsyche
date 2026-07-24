import { expect, test, type Page } from '@playwright/test';

const forbiddenPracticePhrases = [
  'Prompt library',
  'Prompt database',
  'Best prompts',
  'Prompt hacks',
  'Szukaj promptu'
];

const practiceEntries = [
  {
    title: 'Jak sprawdzić, czy odpowiedź AI ma źródła',
    route: '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'
  },
  {
    title: 'Jak nie pomylić płynności z prawdą',
    route: '/pl/practice/jak-nie-pomylic-plynnosci-z-prawda/'
  },
  {
    title: 'Jak analizować wiadomość bez diagnozowania człowieka',
    route: '/pl/practice/jak-analizowac-wiadomosc-bez-diagnozowania-czlowieka/'
  },
  {
    title: 'Jak poprosić model o niepewność',
    route: '/pl/practice/jak-poprosic-model-o-niepewnosc/'
  },
  {
    title: 'Jak użyć AI jako drugiego czytelnika',
    route: '/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/'
  },
  {
    title: 'Jak oddzielić fakty od interpretacji',
    route: '/pl/practice/jak-oddzielic-fakty-od-interpretacji/'
  },
  {
    title: 'Jak poprosić AI o kontrargument',
    route: '/pl/practice/jak-poprosic-ai-o-kontrargument/'
  },
  {
    title: 'Jak sprawdzić własne założenia z pomocą AI',
    route: '/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/'
  },
  {
    title: 'Jak użyć AI bez oddawania mu decyzji',
    route: '/pl/practice/jak-uzyc-ai-bez-oddawania-mu-decyzji/'
  },
  {
    title: 'Jak sprawdzić, czy model ma potrzebny kontekst',
    route: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/'
  },
  {
    title: 'How to check whether an AI answer has sources',
    route: '/practice/how-to-check-whether-an-ai-answer-has-sources/'
  },
  {
    title: 'How not to confuse fluency with truth',
    route: '/practice/how-not-to-confuse-fluency-with-truth/'
  },
  {
    title: 'How to analyze a message without diagnosing a person',
    route: '/practice/how-to-analyze-a-message-without-diagnosing-a-person/'
  },
  {
    title: 'How to ask a model about uncertainty',
    route: '/practice/how-to-ask-a-model-about-uncertainty/'
  },
  {
    title: 'How to use AI as a second reader',
    route: '/practice/how-to-use-ai-as-a-second-reader/'
  },
  {
    title: 'How to separate facts from interpretations',
    route: '/practice/how-to-separate-facts-from-interpretations/'
  },
  {
    title: 'How to ask AI for a counterargument',
    route: '/practice/how-to-ask-ai-for-a-counterargument/'
  },
  {
    title: 'How to check your assumptions with AI',
    route: '/practice/how-to-check-your-assumptions-with-ai/'
  },
  {
    title: 'How to use AI without handing over the decision',
    route: '/practice/how-to-use-ai-without-handing-over-the-decision/'
  },
  {
    title: 'How to Check Whether the Model Has the Context It Needs',
    route: '/practice/how-to-check-whether-the-model-has-enough-context/'
  }
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(overflow.documentScrollWidth).toBeLessThanOrEqual(overflow.documentClientWidth + 1);
  expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
}

const practiceIndexCases = [
  {
    route: '/practice/',
    h1: 'How to Talk to AI',
    title: 'How to Talk to AI | Prompted Psyche',
    description:
      'Practical exercises for giving AI context, checking sources, handling uncertainty and keeping responsibility for decisions.',
    canonical: 'https://promptedpsyche.com/practice/',
    alternate: 'https://promptedpsyche.com/pl/practice/',
    alternateLang: 'pl',
    startHeading: 'Four exercises for a careful first workflow',
    boundaryHeading: 'It is not only about the prompt',
    groupCounts: [1, 3, 5, 1]
  },
  {
    route: '/pl/practice/',
    h1: 'Jak rozmawiać ze sztuczną inteligencją',
    title: 'Jak rozmawiać ze sztuczną inteligencją | Prompted Psyche',
    description:
      'Praktyczne ćwiczenia: jak przekazać AI kontekst, sprawdzać źródła, rozpoznawać niepewność i zachować odpowiedzialność za decyzje.',
    canonical: 'https://promptedpsyche.com/pl/practice/',
    alternate: 'https://promptedpsyche.com/practice/',
    alternateLang: 'en',
    startHeading: 'Cztery ćwiczenia na początek',
    boundaryHeading: 'Nie chodzi tylko o prompt',
    groupCounts: [1, 3, 5, 1]
  }
] as const;

test.describe('practice section', () => {
  for (const indexCase of practiceIndexCases) {
    test(`keeps the broad Practice intent crawlable and complete on ${indexCase.route}`, async ({ page, request }) => {
      const response = await request.get(indexCase.route);
      expect(response.status()).toBe(200);

      await page.goto(indexCase.route);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: indexCase.h1, level: 1 })).toBeVisible();
      await expect(page).toHaveTitle(indexCase.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', indexCase.description);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', indexCase.canonical);
      await expect(page.locator(`link[rel="alternate"][hreflang="${indexCase.alternateLang}"]`)).toHaveAttribute(
        'href',
        indexCase.alternate
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        'https://promptedpsyche.com/practice/'
      );
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
      await expect(page.getByRole('heading', { name: indexCase.startHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: indexCase.boundaryHeading, level: 2 })).toBeVisible();
      await expect(page.locator('[data-qa="practice-start"] .entry-item')).toHaveCount(4);
      await expect(page.locator('[data-qa="practice-learning-paths"] .practice-group')).toHaveCount(4);
      await expect(page.locator('[data-qa="practice-learning-paths"] .entry-item')).toHaveCount(10);

      const groups = page.locator('[data-qa="practice-learning-paths"] .practice-group');
      for (let index = 0; index < indexCase.groupCounts.length; index += 1) {
        await expect(groups.nth(index).locator('.entry-item')).toHaveCount(indexCase.groupCounts[index]);
      }

      const expectedRoutes = practiceEntries
        .filter((entry) => entry.route.startsWith(indexCase.route))
        .map((entry) => entry.route)
        .sort();
      const linkedRoutes = await page
        .locator('[data-qa="practice-learning-paths"] .entry-title-link')
        .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? '').sort());
      expect(linkedRoutes).toEqual(expectedRoutes);

      const internalLinks = await page
        .locator('.practice-index a[href^="/"]')
        .evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''))]);
      for (const href of internalLinks) {
        const linkedResponse = await request.get(href);
        expect(linkedResponse.ok(), `${href} should be a working internal link`).toBe(true);
      }

      await expect(page.locator('.entry-meta').first()).toContainText(indexCase.route.startsWith('/pl/') ? 'Praktyka' : 'Practice');
      await expect(page.locator('.tag-list li').first()).toBeVisible();
      await expect(page.locator('script[type="application/ld+json"]')).not.toContainText('FAQPage');
      for (const phrase of forbiddenPracticePhrases) {
        await expect(page.locator('body')).not.toContainText(phrase);
      }
      await expectNoHorizontalOverflow(page);
    });
  }

  test('keeps index metadata unique across languages', async ({ page }) => {
    const metadata: Array<{ title: string; description: string }> = [];

    for (const indexCase of practiceIndexCases) {
      await page.goto(indexCase.route);
      metadata.push({
        title: await page.title(),
        description: (await page.locator('meta[name="description"]').getAttribute('content')) ?? ''
      });
    }

    expect(new Set(metadata.map((item) => item.title)).size).toBe(2);
    expect(new Set(metadata.map((item) => item.description)).size).toBe(2);
  });

  test('surfaces Practice from both homepages with descriptive anchors', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-qa="home-practice"]')).toContainText('How to Talk to AI');
    await expect(page.getByRole('link', { name: 'Explore practice' })).toHaveAttribute('href', '/practice/');
    await expect(page.getByRole('link', { name: 'Browse all articles' })).toHaveAttribute('href', '/articles/');
    await expect(page.getByRole('link', { name: 'Browse all notes' })).toHaveAttribute('href', '/notes/');

    await page.goto('/pl/');
    await expect(page.locator('[data-qa="home-practice"]')).toContainText('Jak rozmawiać ze sztuczną inteligencją');
    await expect(page.getByRole('link', { name: 'Przejdź do praktyki' })).toHaveAttribute('href', '/pl/practice/');
    await expect(page.getByRole('link', { name: 'Wszystkie artykuły' })).toHaveAttribute('href', '/pl/articles/');
    await expect(page.getByRole('link', { name: 'Wszystkie notatki' })).toHaveAttribute('href', '/pl/notes/');
  });

  test('keeps all public Practice routes and prompt interactions working', async ({ page, request }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });

    const enEntryResponse = await request.get('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    const plEntryResponse = await request.get('/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/');

    expect(enEntryResponse.ok()).toBe(true);
    expect(plEntryResponse.ok()).toBe(true);

    for (const entry of practiceEntries) {
      const response = await request.get(entry.route);
      expect(response.ok(), `${entry.title} should have a public route`).toBe(true);
    }

    await page.goto('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    await expect(page.getByRole('heading', { name: 'How to check whether an AI answer has sources' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'
    );
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toContainText('Example prompt');
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toBeVisible();
    await page.getByRole('button', { name: 'Copy example prompt' }).click();
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toContainText('Copied');
    const copiedEnglishPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedEnglishPrompt).toContain('Read your previous answer and help me check which parts require sources.');
    await expectNoHorizontalOverflow(page);

    await page.goto('/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/');
    await expect(
      page.getByRole('heading', { name: 'Jak sprawdzić własne założenia z pomocą AI' })
    ).toBeVisible();
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toContainText('Przykładowy prompt');
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toBeVisible();
    await page.getByRole('button', { name: 'Kopiuj przykładowy prompt' }).click();
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toContainText('Skopiowano');
    const copiedPolishPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPolishPrompt).toContain('Przeczytaj poniższy opis i pomóż mi sprawdzić moje założenia.');
    await expectNoHorizontalOverflow(page);
  });
});
