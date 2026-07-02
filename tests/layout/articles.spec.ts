import { expect, test } from '@playwright/test';

const polishArticleRoute = '/pl/articles/nie-chodzi-tylko-o-prompt/';
const secondPolishArticleRoute = '/pl/articles/model-nie-pamieta-model-ma-kontekst/';
const thirdPolishArticleRoute = '/pl/articles/ai-nie-czyta-ludzi-pomaga-czytac-kontekst/';
const englishArticleRoute = '/articles/it-is-not-just-about-the-prompt/';
const secondEnglishArticleRoute = '/articles/the-model-does-not-remember-it-works-with-context/';
const thirdPolishArticleTitle = 'AI nie czyta ludzi. Pomaga czytać kontekst.';

test.describe('published articles', () => {
  test('shows the English article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('.entry-list')).toContainText('It is not just about the prompt');
    await expect(page.locator('.entry-list')).toContainText(
      'The model does not remember. It works with context.'
    );
    const titleLink = page.getByRole('link', {
      name: 'It is not just about the prompt',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Read article: It is not just about the prompt'
    });

    await expect(titleLink).toHaveAttribute('href', englishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', englishArticleRoute);
    await expect(ctaLink).toBeVisible();
    await ctaLink.focus();
    await expect(ctaLink).toBeFocused();

    const secondTitleLink = page.getByRole('link', {
      name: 'The model does not remember. It works with context.',
      exact: true
    });
    const secondCtaLink = page.getByRole('link', {
      name: 'Read article: The model does not remember. It works with context.'
    });

    await expect(secondTitleLink).toHaveAttribute('href', secondEnglishArticleRoute);
    await expect(secondCtaLink).toHaveAttribute('href', secondEnglishArticleRoute);
  });

  test('shows the Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(3);
    await expect(page.locator('.entry-list')).toContainText('Nie chodzi tylko o prompt');
    const titleLink = page.getByRole('link', {
      name: 'Nie chodzi tylko o prompt',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Czytaj artykuł: Nie chodzi tylko o prompt'
    });

    await expect(titleLink).toHaveAttribute('href', polishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', polishArticleRoute);
    await expect(ctaLink).toBeVisible();
    await ctaLink.focus();
    await expect(ctaLink).toBeFocused();
  });

  test('shows the third Polish article first on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    const titles = await page.locator('.entry-title-link').allTextContents();
    expect(titles.slice(0, 3)).toEqual([
      thirdPolishArticleTitle,
      'Model nie pamięta. Model ma kontekst.',
      'Nie chodzi tylko o prompt'
    ]);

    const titleLink = page.getByRole('link', {
      name: thirdPolishArticleTitle,
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${thirdPolishArticleTitle}`
    });

    await expect(titleLink).toHaveAttribute('href', thirdPolishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', thirdPolishArticleRoute);
    await expect(ctaLink).toBeVisible();
  });

  test('shows the second Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list')).toContainText(
      'Model nie pamięta. Model ma kontekst.'
    );
    const titleLink = page.getByRole('link', {
      name: 'Model nie pamięta. Model ma kontekst.',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Czytaj artykuł: Model nie pamięta. Model ma kontekst.'
    });

    await expect(titleLink).toHaveAttribute('href', secondPolishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', secondPolishArticleRoute);
    await expect(ctaLink).toBeVisible();
  });

  test('does not show the Polish article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('body')).not.toContainText('Model nie pamięta. Model ma kontekst.');
    await expect(page.locator('body')).not.toContainText(thirdPolishArticleTitle);
  });

  test('does not show the English article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('body')).not.toContainText('It is not just about the prompt');
    await expect(page.locator('body')).not.toContainText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('body')).not.toContainText(
      'AI does not read people. It helps read context.'
    );
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
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/human-ai-workflow-judgment.webp'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram showing that the prompt is only one part of AI work, alongside context, attention, trust, verification, cognitive load and responsibility.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'A prompt is only one point'
    );
    await expect(page.locator('body')).not.toContainText(/PRZYGOTOWANE POD/i);
    await expect(page.locator('[data-qa="article-aside-label"]')).toHaveText('In this article');

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
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/human-ai-workflow-judgment.webp'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram pokazujący, że prompt jest tylko częścią pracy z AI: obok kontekstu, uwagi, zaufania, weryfikacji, obciążenia poznawczego i odpowiedzialności.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'Prompt jest tylko jednym punktem'
    );
    await expect(page.locator('body')).not.toContainText(/PRZYGOTOWANE POD/i);
    await expect(page.locator('[data-qa="article-aside-label"]')).toHaveText('W tekście');

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('renders the second Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(secondPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(
      'Model nie pamięta. Model ma kontekst.'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). Model nie pamięta. Model ma kontekst. Prompted Psyche. https://promptedpsyche.com/pl/articles/model-nie-pamieta-model-ma-kontekst/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/token/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/human-ai-interaction/"]')).toBeVisible();
  });

  test('renders the third Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(thirdPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(thirdPolishArticleTitle);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${thirdPolishArticleTitle} Prompted Psyche. https://promptedpsyche.com/pl/articles/ai-nie-czyta-ludzi-pomaga-czytac-kontekst/`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-mediated-communication/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/metacognition/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/nadzor-ze-strony-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-literacy/"]')).toBeVisible();
  });

  test('renders the second English article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(secondEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026). The model does not remember. It works with context. Prompted Psyche. https://promptedpsyche.com/articles/the-model-does-not-remember-it-works-with-context/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/token/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-ai-interaction/"]')).toBeVisible();
  });

  test('keeps other article drafts hidden', async ({ page, request }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('AI Literacy Is Not Prompt Engineering');
    await expect(page.locator('body')).not.toContainText("Why People Trust AI Even When They Shouldn't");
    await expect(page.locator('body')).not.toContainText('AI does not read people. It helps read context.');

    const aiLiteracyDraft = await request.get('/articles/ai-literacy-is-not-prompt-engineering/');
    const trustDraft = await request.get('/articles/why-people-trust-ai-even-when-they-shouldnt/');
    const thirdEnglishDraft = await request.get('/articles/ai-does-not-read-people-it-helps-read-context/');

    expect(aiLiteracyDraft.ok()).toBe(false);
    expect(trustDraft.ok()).toBe(false);
    expect(thirdEnglishDraft.ok()).toBe(false);
  });
});
