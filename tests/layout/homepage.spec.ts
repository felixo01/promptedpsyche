import { expect, test } from '@playwright/test';

test.describe('homepage hero positioning', () => {
  test('shows the English project positioning', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('The human side of AI.');
    await expect(page.locator('body')).toContainText('The first essays and notes are now live.');
    await expect(page.locator('body')).not.toContainText('The first article is now published.');
  });

  test('shows the Polish project positioning', async ({ page }) => {
    await page.goto('/pl/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('Ludzka strona AI.');
    await expect(page.locator('body')).toContainText('Pierwsze eseje i notatki są już dostępne.');
    await expect(page.locator('body')).not.toContainText('Pierwszy artykuł jest już dostępny.');
  });
});
