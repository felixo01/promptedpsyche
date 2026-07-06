import { expect, test, type Page } from '@playwright/test';

const showPractice = process.env.SHOW_PRACTICE === 'true';

const forbiddenPracticePhrases = [
  'Prompt library',
  'Prompt database',
  'Best prompts',
  'Prompt hacks',
  'Szukaj promptu'
];

const practiceDrafts = [
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
  }
];

const publicIndexes = [
  '/',
  '/pl/',
  '/articles/',
  '/pl/articles/',
  '/notes/',
  '/pl/notes/',
  '/concepts/',
  '/pl/concepts/'
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

test.describe('practice drafts', () => {
  test('keeps practice drafts out of public indexes and routes', async ({ page, request }) => {
    test.skip(showPractice, 'Production Practice safety runs with SHOW_PRACTICE disabled.');

    for (const path of publicIndexes) {
      await page.goto(path);

      await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Practice');
      await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Praktyka');

      for (const draft of practiceDrafts) {
        await expect(page.locator('body')).not.toContainText(draft.title);
      }
    }

    for (const draft of practiceDrafts) {
      const response = await request.get(draft.route);
      expect(response.ok()).toBe(false);
    }

    const enIndexResponse = await request.get('/practice/');
    const plIndexResponse = await request.get('/pl/practice/');

    expect(enIndexResponse.ok()).toBe(false);
    expect(plIndexResponse.ok()).toBe(false);
  });

  test('renders local Practice preview routes when SHOW_PRACTICE is enabled', async ({ page, request }) => {
    test.skip(!showPractice, 'Practice preview routes are generated only with SHOW_PRACTICE=true.');

    const enIndexResponse = await request.get('/practice/');
    const plIndexResponse = await request.get('/pl/practice/');
    const enEntryResponse = await request.get('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    const plEntryResponse = await request.get('/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/');

    expect(enIndexResponse.ok()).toBe(true);
    expect(plIndexResponse.ok()).toBe(true);
    expect(enEntryResponse.ok()).toBe(true);
    expect(plEntryResponse.ok()).toBe(true);

    await page.goto('/practice/');
    await expect(page.getByRole('heading', { name: 'Practice', level: 1 })).toBeVisible();
    await expect(page.locator('.practice-index')).toBeVisible();
    await expect(
      page.getByText(
        'Practice is a set of short, practical AI-use scenarios - not a prompt library, but a guide to using models responsibly in concrete situations.'
      )
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Choose a situation', level: 2 })).toBeVisible();
    await expect(
      page.getByText(
        'Short, practical scenarios for working with AI more carefully - checking answers, handling sources, asking for uncertainty, reviewing text and keeping decisions human.'
      )
    ).toBeVisible();
    await expect(page.locator('.entry-list article')).toHaveCount(6);
    await expect(page.locator('.entry-list article').first().locator('.entry-meta')).toContainText('Practice');
    await expect(page.locator('.entry-list article').first().locator('.tag-list li').first()).toBeVisible();
    await expect(
      page.locator('.entry-title-link', { hasText: 'How to check whether an AI answer has sources' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Open scenario:/ })).toHaveCount(6);
    await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Practice');
    await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Praktyka');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/practice/'
    );
    for (const phrase of forbiddenPracticePhrases) {
      await expect(page.locator('body')).not.toContainText(phrase);
    }
    await expectNoHorizontalOverflow(page);

    await page.goto('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    await expect(page.getByRole('heading', { name: 'How to check whether an AI answer has sources' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'
    );

    await page.goto('/pl/practice/');
    await expect(page.getByRole('heading', { name: 'Praktyka', level: 1 })).toBeVisible();
    await expect(page.locator('.practice-index')).toBeVisible();
    await expect(
      page.getByText(
        'Praktyka to krótkie, praktyczne scenariusze pracy z AI - nie baza promptów, ale przewodniki po rozsądnym użyciu modeli w konkretnych sytuacjach.'
      )
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Wybierz sytuację', level: 2 })).toBeVisible();
    await expect(
      page.getByText(
        'Krótkie, praktyczne scenariusze pracy z AI - sprawdzanie odpowiedzi, źródeł, niepewności, tekstów i decyzji bez oddawania modelowi odpowiedzialności.'
      )
    ).toBeVisible();
    await expect(page.locator('.entry-list article')).toHaveCount(6);
    await expect(page.locator('.entry-list article').first().locator('.entry-meta')).toContainText('Praktyka');
    await expect(page.locator('.entry-list article').first().locator('.tag-list li').first()).toBeVisible();
    await expect(
      page.locator('.entry-title-link', { hasText: 'Jak sprawdzić, czy odpowiedź AI ma źródła' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Otwórz scenariusz:/ })).toHaveCount(6);
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/practice/'
    );
    for (const phrase of forbiddenPracticePhrases) {
      await expect(page.locator('body')).not.toContainText(phrase);
    }
    await expectNoHorizontalOverflow(page);
  });
});
