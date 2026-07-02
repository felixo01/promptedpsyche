import { expect, test } from '@playwright/test';

const polishArticleRoute = '/pl/articles/nie-chodzi-tylko-o-prompt/';
const englishDraftRoute = '/articles/it-is-not-just-about-the-prompt/';

test.describe('published Polish article', () => {
  test('shows the Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list')).toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator(`a[href="${polishArticleRoute}"]`)).toBeVisible();
  });

  test('does not show the Polish article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('Nie chodzi tylko o prompt');
  });

  test('renders the Polish article detail page with rights notice and concept links', async ({ page }) => {
    await page.goto(polishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText('Nie chodzi tylko o prompt');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('does not expose the English draft article detail page', async ({ request }) => {
    const response = await request.get(englishDraftRoute);

    expect(response.ok()).toBe(false);
  });
});
