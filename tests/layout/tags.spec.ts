import { expect, test } from '@playwright/test';

test.describe('publication tag pages', () => {
  test('links visible article and note tags to English tag pages', async ({ page }) => {
    await page.goto('/articles/');

    const articleTag = page.locator('.entry-list .tag-list a').first();
    await expect(articleTag).toHaveAttribute('href', /\/tags\/.+\/$/);
    await expect(articleTag).toHaveAttribute('href', '/tags/ai-literacy/');

    await articleTag.click();
    await expect(page).toHaveURL(/\/tags\/ai-literacy\/$/);
    await expect(page.locator('.tag-archive-list article').first()).toBeVisible();

    await page.goto('/notes/');
    const noteTag = page.locator('.entry-list .tag-list a').first();
    await expect(noteTag).toHaveAttribute('href', /\/tags\/.+\/$/);
  });

  test('links visible article and note tags to Polish tag pages', async ({ page }) => {
    await page.goto('/pl/articles/');

    const articleTag = page.locator('.entry-list .tag-list a').first();
    await expect(articleTag).toHaveAttribute('href', /\/pl\/tags\/.+\/$/);
    await expect(articleTag).toHaveAttribute('href', '/pl/tags/ai-literacy/');

    await articleTag.click();
    await expect(page).toHaveURL(/\/pl\/tags\/ai-literacy\/$/);
    await expect(page.locator('.tag-archive-list article').first()).toBeVisible();

    await page.goto('/pl/notes/');
    const noteTag = page.locator('.entry-list .tag-list a').first();
    await expect(noteTag).toHaveAttribute('href', /\/pl\/tags\/.+\/$/);
  });

  test('links detail page publication tags without changing concept detail tags', async ({ page }) => {
    await page.goto('/articles/it-is-not-just-about-the-prompt/');
    await expect(page.locator('.content-tags a[href="/tags/ai-literacy/"]')).toBeVisible();

    await page.goto('/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/');
    await expect(page.locator('.content-tags a[href="/pl/tags/ai-literacy/"]')).toBeVisible();

    await page.goto('/concepts/ai-literacy/');
    await expect(page.locator('.content-tags a')).toHaveCount(0);
  });

  test('renders English tag archive without Polish publication leakage', async ({ page }) => {
    await page.goto('/tags/ai-literacy/');

    await expect(page.locator('h1')).toHaveText('#AI literacy');
    await expect(page.locator('body')).toContainText('Publications tagged with');
    await expect(page.locator('.tag-archive-list article')).toHaveCount(7);
    await expect(page.locator('.tag-archive-list')).toContainText('Article');
    await expect(page.locator('.tag-archive-list')).toContainText('Note');
    await expect(page.locator('.tag-archive-list')).toContainText('It is not just about the prompt');
    await expect(page.locator('.tag-archive-list')).not.toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('.tag-archive-list')).not.toContainText('AI Literacy Is Not Prompt Engineering');
  });

  test('renders Polish tag archive without English publication leakage', async ({ page }) => {
    await page.goto('/pl/tags/ai-literacy/');

    await expect(page.locator('h1')).toHaveText('#AI literacy');
    await expect(page.locator('body')).toContainText('Publikacje oznaczone tagiem');
    await expect(page.locator('.tag-archive-list article')).toHaveCount(7);
    await expect(page.locator('.tag-archive-list')).toContainText('Artykuł');
    await expect(page.locator('.tag-archive-list')).toContainText('Notatka');
    await expect(page.locator('.tag-archive-list')).toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('.tag-archive-list')).not.toContainText('It is not just about the prompt');
    await expect(page.locator('.tag-archive-list')).not.toContainText('AI Literacy Is Not Prompt Engineering');
  });
});
