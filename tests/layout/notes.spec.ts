import { expect, test } from '@playwright/test';

const notePairs = [
  {
    plTitle: 'Brzmi dobrze, ale to nie znaczy, że jest prawdziwe',
    enTitle: 'Fluent does not mean true',
    plRoute: '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/',
    enRoute: '/notes/fluent-does-not-mean-true/',
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
    plTitle: 'Model widzi tekst, nie całą relację',
    enTitle: 'The model sees text, not the whole relationship',
    plRoute: '/pl/notes/model-widzi-tekst-nie-cala-relacje/',
    enRoute: '/notes/the-model-sees-text-not-the-whole-relationship/',
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
    plTitle: 'Dobre streszczenie nie jest dobrą decyzją',
    enTitle: 'A good summary is not a good decision',
    plRoute: '/pl/notes/dobre-streszczenie-nie-jest-dobra-decyzja/',
    enRoute: '/notes/a-good-summary-is-not-a-good-decision/',
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
  }
];

test.describe('published notes', () => {
  test('shows public English notes on the English notes index', async ({ page }) => {
    await page.goto('/notes/');

    await expect(page.locator('.entry-list article')).toHaveCount(notePairs.length);
    await expect(page.locator('body')).not.toContainText('Notes are in preparation.');

    for (const note of notePairs) {
      await expect(page.locator('.entry-list')).toContainText(note.enTitle);
      await expect(page.locator('body')).not.toContainText(note.plTitle);

      const titleLink = page.getByRole('link', { name: note.enTitle, exact: true });
      const ctaLink = page.getByRole('link', { name: `Read note: ${note.enTitle}` });

      await expect(titleLink).toHaveAttribute('href', note.enRoute);
      await expect(ctaLink).toHaveAttribute('href', note.enRoute);
      await expect(ctaLink).toContainText('Read note');
      await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    }
  });

  test('shows public Polish notes on the Polish notes index', async ({ page }) => {
    await page.goto('/pl/notes/');

    await expect(page.locator('.entry-list article')).toHaveCount(notePairs.length);
    await expect(page.locator('body')).not.toContainText('Notatki są w przygotowaniu.');

    for (const note of notePairs) {
      await expect(page.locator('.entry-list')).toContainText(note.plTitle);
      await expect(page.locator('body')).not.toContainText(note.enTitle);

      const titleLink = page.getByRole('link', { name: note.plTitle, exact: true });
      const ctaLink = page.getByRole('link', { name: `Czytaj notatkę: ${note.plTitle}` });

      await expect(titleLink).toHaveAttribute('href', note.plRoute);
      await expect(ctaLink).toHaveAttribute('href', note.plRoute);
      await expect(ctaLink).toContainText('Czytaj notatkę');
      await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    }
  });

  test('does not expose Polish notes on English routes', async ({ request }) => {
    for (const note of notePairs) {
      const leakedRoute = await request.get(note.plRoute.replace('/pl', ''));
      expect(leakedRoute.ok()).toBe(false);
    }
  });

  for (const note of notePairs) {
    test(`renders English note detail page for ${note.enTitle}`, async ({ page }) => {
      await page.goto(note.enRoute);

      await expect(page.locator('.content-header h1')).toHaveText(note.enTitle);
      await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
      await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
        `Mamczur, F. (2026). ${note.enTitle}. Prompted Psyche. https://promptedpsyche.com${note.enRoute}`
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
      await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
      await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
      await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
        `Mamczur, F. (2026). ${note.plTitle}. Prompted Psyche. https://promptedpsyche.com${note.plRoute}`
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
