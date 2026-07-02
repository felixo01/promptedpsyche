import { expect, test } from '@playwright/test';

test.describe('rights and attribution notices', () => {
  test('shows footer rights notice in English', async ({ page }) => {
    await page.goto('/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="footer"]');
    await expect(notice).toContainText('All rights reserved');
    await expect(notice).toContainText('credit the author, title and source link');
  });

  test('shows footer rights notice in Polish', async ({ page }) => {
    await page.goto('/pl/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="footer"]');
    await expect(notice).toContainText('Wszystkie prawa zastrzeżone');
    await expect(notice).toContainText('podaj autora, tytuł i link do źródła');
  });

  test('shows content rights notice on the first English note', async ({ page }) => {
    await page.goto('/notes/fluent-does-not-mean-true/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('All rights reserved');
    await expect(notice).toContainText('Short quotations are permitted only with attribution');
  });

  test('shows content rights notice on the first Polish article', async ({ page }) => {
    await page.goto('/pl/articles/nie-chodzi-tylko-o-prompt/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('Wszystkie prawa zastrzeżone');
    await expect(notice).toContainText('Krótkie cytaty są dozwolone');
  });

  test('shows content rights notice on the first English article', async ({ page }) => {
    await page.goto('/articles/it-is-not-just-about-the-prompt/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('All rights reserved');
    await expect(notice).toContainText('Short quotations are permitted only with attribution');
  });

  test('shows content rights notice on the first Polish note', async ({ page }) => {
    await page.goto('/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('Wszystkie prawa zastrzeżone');
    await expect(notice).toContainText('Krótkie cytaty są dozwolone');
  });

  test('shows content rights notice on concept detail pages', async ({ page }) => {
    await page.goto('/concepts/ai-literacy/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('All rights reserved');
  });

  test('shows content rights notice on Polish concept detail pages', async ({ page }) => {
    await page.goto('/pl/concepts/ai-literacy/');

    const notice = page.locator('[data-qa="rights-notice"][data-variant="content"]');
    await expect(notice).toContainText('Wszystkie prawa zastrzeżone');
  });
});
