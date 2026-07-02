import { expect, test } from '@playwright/test';

const polishNoteRoute = '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/';

test.describe('published notes', () => {
  test('shows the first Polish note on the Polish notes index', async ({ page }) => {
    await page.goto('/pl/notes/');

    await expect(page.locator('.entry-list')).toContainText(
      'Brzmi dobrze nie znaczy, że jest prawdziwe'
    );
    await expect(page.locator('body')).not.toContainText('Notatki są w przygotowaniu.');

    const titleLink = page.getByRole('link', {
      name: 'Brzmi dobrze nie znaczy, że jest prawdziwe',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Czytaj notatkę: Brzmi dobrze nie znaczy, że jest prawdziwe'
    });

    await expect(titleLink).toHaveAttribute('href', polishNoteRoute);
    await expect(ctaLink).toHaveAttribute('href', polishNoteRoute);
    await expect(ctaLink).toBeVisible();
  });

  test('keeps the English notes index empty and does not show the Polish note', async ({ page, request }) => {
    await page.goto('/notes/');

    await expect(page.locator('body')).toContainText('Notes are in preparation.');
    await expect(page.locator('body')).not.toContainText(
      'Brzmi dobrze nie znaczy, że jest prawdziwe'
    );

    const leakedRoute = await request.get('/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/');
    expect(leakedRoute.ok()).toBe(false);
  });

  test('renders the first Polish note detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(polishNoteRoute);

    await expect(page.locator('.content-header h1')).toHaveText(
      'Brzmi dobrze nie znaczy, że jest prawdziwe'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). Brzmi dobrze nie znaczy, że jest prawdziwe. Prompted Psyche. https://promptedpsyche.com/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/'
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
