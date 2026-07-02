import { expect, test } from '@playwright/test';

const polishArticleRoute = '/pl/articles/nie-chodzi-tylko-o-prompt/';
const englishArticleRoute = '/articles/it-is-not-just-about-the-prompt/';

test.describe('published articles', () => {
  test('shows the English article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('.entry-list')).toContainText('It is not just about the prompt');
    await expect(page.locator(`a[href="${englishArticleRoute}"]`)).toBeVisible();
  });

  test('shows the Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list')).toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator(`a[href="${polishArticleRoute}"]`)).toBeVisible();
  });

  test('does not show the Polish article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('Nie chodzi tylko o prompt');
  });

  test('does not show the English article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('body')).not.toContainText('It is not just about the prompt');
  });

  test('renders the English article detail page with byline, citation and rights notice', async ({ page }) => {
    await page.goto(englishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText('It is not just about the prompt');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Prompted Psyche');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Published:');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). It is not just about the prompt. Prompted Psyche. https://promptedpsyche.com/articles/it-is-not-just-about-the-prompt/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('renders the Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(polishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText('Nie chodzi tylko o prompt');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Prompted Psyche');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Opublikowano:');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). Nie chodzi tylko o prompt. Prompted Psyche. https://promptedpsyche.com/pl/articles/nie-chodzi-tylko-o-prompt/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('keeps other article drafts hidden', async ({ page, request }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('AI Literacy Is Not Prompt Engineering');
    await expect(page.locator('body')).not.toContainText("Why People Trust AI Even When They Shouldn't");

    const aiLiteracyDraft = await request.get('/articles/ai-literacy-is-not-prompt-engineering/');
    const trustDraft = await request.get('/articles/why-people-trust-ai-even-when-they-shouldnt/');

    expect(aiLiteracyDraft.ok()).toBe(false);
    expect(trustDraft.ok()).toBe(false);
  });
});
