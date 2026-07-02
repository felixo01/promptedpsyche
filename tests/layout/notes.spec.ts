import { expect, test } from '@playwright/test';

const polishNoteRoute = '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/';
const englishNoteRoute = '/notes/fluent-does-not-mean-true/';
const polishNoteTitle = 'Brzmi dobrze, ale to nie znaczy, że jest prawdziwe';

test.describe('published notes', () => {
  test('shows the first English note on the English notes index', async ({ page }) => {
    await page.goto('/notes/');

    await expect(page.locator('.entry-list')).toContainText('Fluent does not mean true');
    await expect(page.locator('body')).not.toContainText('Notes are in preparation.');
    await expect(page.locator('body')).not.toContainText(
      polishNoteTitle
    );

    const titleLink = page.getByRole('link', {
      name: 'Fluent does not mean true',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Read note: Fluent does not mean true'
    });

    await expect(titleLink).toHaveAttribute('href', englishNoteRoute);
    await expect(ctaLink).toHaveAttribute('href', englishNoteRoute);
    await expect(ctaLink).toContainText('Read note');
    await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    await expect(ctaLink).toBeVisible();
  });

  test('shows the first Polish note on the Polish notes index', async ({ page }) => {
    await page.goto('/pl/notes/');

    await expect(page.locator('.entry-list')).toContainText(polishNoteTitle);
    await expect(page.locator('body')).not.toContainText('Notatki są w przygotowaniu.');
    await expect(page.locator('body')).not.toContainText('Fluent does not mean true');

    const titleLink = page.getByRole('link', {
      name: polishNoteTitle,
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: `Czytaj notatkę: ${polishNoteTitle}`
    });

    await expect(titleLink).toHaveAttribute('href', polishNoteRoute);
    await expect(ctaLink).toHaveAttribute('href', polishNoteRoute);
    await expect(ctaLink).toContainText('Czytaj notatkę');
    await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    await expect(ctaLink).toBeVisible();
  });

  test('does not expose the Polish note on the English route', async ({ request }) => {
    const leakedRoute = await request.get('/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/');

    expect(leakedRoute.ok()).toBe(false);
  });

  test('renders the first English note detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(englishNoteRoute);

    await expect(page.locator('.content-header h1')).toHaveText('Fluent does not mean true');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). Fluent does not mean true. Prompted Psyche. https://promptedpsyche.com/notes/fluent-does-not-mean-true/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(4);
    await expect(page.locator('.prose a[href="/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-literacy/"]')).toBeVisible();
  });

  test('renders the first Polish note detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(polishNoteRoute);

    await expect(page.locator('.content-header h1')).toHaveText(polishNoteTitle);
    await expect(page.locator('.content-header h1')).not.toHaveText(
      'Brzmi dobrze nie znaczy, że jest prawdziwe'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `Mamczur, F. (2026). ${polishNoteTitle}. Prompted Psyche. https://promptedpsyche.com/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(4);
    await expect(page.locator('.prose a[href="/pl/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-literacy/"]')).toBeVisible();
  });
});
