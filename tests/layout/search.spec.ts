import { expect, test, type APIRequestContext } from '@playwright/test';

type SearchItem = {
  title: string;
  description: string;
  url: string;
  type: 'article' | 'note' | 'concept' | 'practice';
  language: 'en' | 'pl';
  tags: string[];
  date?: string;
  readingTime?: string;
};

const showPractice = process.env.SHOW_PRACTICE === 'true';

const practiceTitles = [
  'Jak sprawdzić, czy odpowiedź AI ma źródła',
  'How to check whether an AI answer has sources'
];

const draftTitles = [
  'AI Literacy Is Not Prompt Engineering',
  "Why People Trust AI Even When They Shouldn't",
  'We Prompt Machines. Machines Prompt Us Back',
  'What Is Cyberpsychology of AI?',
  "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
  'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać'
];

function countByType(items: SearchItem[], type: SearchItem['type']) {
  return items.filter((item) => item.type === type).length;
}

async function readSearchIndex(request: APIRequestContext, path: string) {
  const response = await request.get(path);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/json');
  return (await response.json()) as SearchItem[];
}

test.describe('local search', () => {
  test('builds search pages with language alternates and indexable robots state', async ({ page }) => {
    await page.goto('/search/');

    await expect(page.getByRole('heading', { name: 'Search', level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder('Search by topic, concept or phrase')).toBeVisible();
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Search' })).toHaveAttribute(
      'href',
      '/search/'
    );
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Search' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.getByText(showPractice ? 'Search articles, notes, concepts and practice exercises on Prompted Psyche.' : 'Search articles, notes and concepts on Prompted Psyche.')).toBeVisible();
    await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/pl/search/'
    );

    await page.goto('/pl/search/');

    await expect(page.getByRole('heading', { name: 'Szukaj', level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder('Szukaj tematu, pojęcia albo frazy')).toBeVisible();
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Szukaj' })).toHaveAttribute(
      'href',
      '/pl/search/'
    );
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Szukaj' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.getByText(showPractice ? 'Szukaj w artykułach, notatkach, pojęciach i ćwiczeniach Prompted Psyche.' : 'Szukaj w artykułach, notatkach i pojęciach Prompted Psyche.')).toBeVisible();
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/search/'
    );
  });

  test('keeps search indexes public-only and language-scoped', async ({ request }) => {
    const enIndex = await readSearchIndex(request, '/search-index.en.json');
    const plIndex = await readSearchIndex(request, '/search-index.pl.json');
    const allText = JSON.stringify([...enIndex, ...plIndex]);

    expect(countByType(enIndex, 'article')).toBe(7);
    expect(countByType(plIndex, 'article')).toBe(7);
    expect(countByType(enIndex, 'note')).toBe(4);
    expect(countByType(plIndex, 'note')).toBe(4);
    expect(countByType(enIndex, 'concept')).toBe(26);
    expect(countByType(plIndex, 'concept')).toBe(26);
    expect(countByType(enIndex, 'practice')).toBe(showPractice ? 10 : 0);
    expect(countByType(plIndex, 'practice')).toBe(showPractice ? 10 : 0);
    expect(enIndex.every((item) => item.language === 'en')).toBe(true);
    expect(plIndex.every((item) => item.language === 'pl')).toBe(true);
    expect(enIndex).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Trust in the age of ready-made answers',
          url: '/articles/trust-in-the-age-of-ready-made-answers/',
          type: 'article'
        }),
        expect.objectContaining({
          title: 'Are we afraid of AI, or of ourselves?',
          url: '/articles/are-we-afraid-of-ai-or-of-ourselves/',
          type: 'article'
        })
      ])
    );
    expect(plIndex).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Czy boimy się AI, czy boimy się samych siebie?',
          url: '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
          type: 'article'
        })
      ])
    );
    expect(enIndex.map((item) => item.title)).not.toContain(
      'Czy boimy się AI, czy boimy się samych siebie?'
    );
    expect(enIndex.map((item) => item.url)).not.toContain(
      '/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
    );

    if (showPractice) {
      expect(enIndex).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'How to check whether an AI answer has sources',
            url: '/practice/how-to-check-whether-an-ai-answer-has-sources/',
            type: 'practice'
          })
        ])
      );
      expect(plIndex).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Jak sprawdzić, czy odpowiedź AI ma źródła',
            url: '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/',
            type: 'practice'
          })
        ])
      );
    } else {
      for (const title of practiceTitles) {
        expect(allText).not.toContain(title);
      }
      expect(allText).not.toContain('/practice/');
      expect(allText).not.toContain('/pl/practice/');
    }

    for (const title of draftTitles) {
      expect(allText).not.toContain(title);
    }
  });

  test('runs English client search without Polish leakage', async ({ page }) => {
    await page.goto('/search/');

    await expect(page.getByText(showPractice ? 'Start typing to search public articles, notes, concepts and practice exercises.' : 'Start typing to search public articles, notes and concepts.')).toBeVisible();
    await page.getByPlaceholder('Search by topic, concept or phrase').fill('trust');

    await expect(page.getByRole('link', { name: 'Trust in the age of ready-made answers' })).toBeVisible();
    await expect(page.locator('[data-search-results]')).toContainText('Article');
    await expect(page.locator('[data-search-results]')).not.toContainText('Zaufanie w epoce gotowych odpowiedzi');

    await page.getByPlaceholder('Search by topic, concept or phrase').fill('zzzz-no-result-phrase');
    await expect(page.getByText('No results found. Try a different phrase.')).toBeVisible();
  });

  test('runs Polish client search with diacritic-insensitive matching', async ({ page }) => {
    await page.goto('/pl/search/');

    await expect(
      page.getByText(showPractice ? 'Zacznij pisać, żeby przeszukać publiczne artykuły, notatki, pojęcia i ćwiczenia.' : 'Zacznij pisać, żeby przeszukać publiczne artykuły, notatki i pojęcia.')
    ).toBeVisible();
    await page.getByPlaceholder('Szukaj tematu, pojęcia albo frazy').fill('zrodla');

    await expect(
      page.getByRole('link', { name: 'Grounding: oparcie odpowiedzi na źródłach' })
    ).toBeVisible();
    await expect(page.locator('[data-search-results]')).toContainText('Pojęcie');
  });

  test('finds the revised Polish AI fears article by title and responsibility framing', async ({ page }) => {
    await page.goto('/pl/search/');

    const input = page.getByPlaceholder('Szukaj tematu, pojęcia albo frazy');
    const articleLink = page.getByRole('link', {
      name: 'Czy boimy się AI, czy boimy się samych siebie?'
    });

    await input.fill('czy boimy');
    await expect(articleLink).toBeVisible();

    await input.fill('moralne alibi');
    await expect(articleLink).toBeVisible();

    await input.fill('odpowiedzialnosc');
    await expect(articleLink).toBeVisible();
  });

  test('finds the revised English AI fears article by title and responsibility framing', async ({ page }) => {
    await page.goto('/search/');

    const input = page.getByPlaceholder('Search by topic, concept or phrase');
    const articleLink = page.getByRole('link', {
      name: 'Are we afraid of AI, or of ourselves?'
    });

    await input.fill('afraid');
    await expect(articleLink).toBeVisible();

    await input.fill('moral alibi');
    await expect(articleLink).toBeVisible();

    await input.fill('responsibility');
    await expect(articleLink).toBeVisible();

  });
});
