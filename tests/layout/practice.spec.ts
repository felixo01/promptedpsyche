import { expect, test } from '@playwright/test';

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

test.describe('practice drafts', () => {
  test('keeps practice drafts out of public indexes and routes', async ({ page, request }) => {
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
  });
});
