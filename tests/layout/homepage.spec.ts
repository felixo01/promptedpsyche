import { expect, test } from '@playwright/test';

test.describe('homepage hero positioning', () => {
  test('shows the English project positioning', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('The human side of AI.');
  });

  test('shows the Polish project positioning', async ({ page }) => {
    await page.goto('/pl/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('Ludzka strona AI.');
  });
});
