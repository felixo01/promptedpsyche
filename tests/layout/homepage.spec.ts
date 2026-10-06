import { expect, test } from '@playwright/test';

const homeSocialImage =
  'https://promptedpsyche.com/images/social/prompted-psyche-home-social-1200x630.png';
const oldDefaultSocialImage = 'https://promptedpsyche.com/images/prompted-psyche-editorial.png';

test.describe('C2 editorial homepage', () => {
  test('opens with the complete English trust essay', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('Trust in the age of ready-made answers');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText(
      'How generative AI compresses the path from sources to answers'
    );
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('ESSAY · TRUST');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('Feliks Mamczur');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('18 min read');
    await expect(page.getByRole('link', { name: 'Read the essay' })).toHaveAttribute('href', '/articles/trust-in-the-age-of-ready-made-answers/');
    await expect(page.getByRole('heading', { name: 'Worth reading', level: 2 })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Human-Machine Interaction');
  });

  test('opens with the complete Polish trust essay', async ({ page }) => {
    await page.goto('/pl/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('Zaufanie do nauki w erze gotowych odpowiedzi');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText(
      'Generatywna AI może skrócić drogę od źródeł naukowych do gotowej odpowiedzi'
    );
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('ESEJ · ZAUFANIE');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('Feliks Mamczur');
    await expect(page.locator('[data-qa="hero-copy"]')).toContainText('22 min czytania');
    await expect(page.getByRole('link', { name: 'Czytaj esej' })).toHaveAttribute('href', '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    await expect(page.getByRole('heading', { name: 'Warto przeczytać', level: 2 })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Human-Machine Interaction');
  });

  test('keeps the complete research title, preprint status and source links', async ({ page }) => {
    for (const [route, heading, status, publication, preregistration, href] of [
      ['/', 'From the research', 'Preprint — not formally peer reviewed', 'Publication', 'Preregistration', '/projects/beyond-ai-share/'],
      ['/pl/', 'Z badań', 'Preprint bez formalnej recenzji naukowej', 'Publikacja', 'Prerejestracja', '/pl/projects/beyond-ai-share/']
    ]) {
      await page.goto(route);
      const research = page.locator('[data-qa="home-research"]');
      await expect(research.getByRole('heading', { level: 2 })).toHaveText(heading);
      await expect(research.getByRole('heading', { level: 3 })).toHaveText('Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice');
      await expect(research).toContainText('Feliks Mamczur');
      await expect(research.locator('.c2-research-status')).toHaveText(status);
      const researchLinks = research.locator('.c2-research-links');
      await expect(researchLinks.getByRole('link', { name: publication, exact: false })).toHaveAttribute('href', href);
      await expect(researchLinks.getByRole('link', { name: preregistration, exact: false })).toHaveAttribute('href', 'https://doi.org/10.17605/OSF.IO/GSWN3');
    }
  });

  test('keeps visible author-name repetition restrained on homepages', async ({ page }) => {
    for (const route of ['/', '/pl/']) {
      await page.goto(route);

      const visibleText = await page.locator('body').innerText();
      const matches = visibleText.match(/Feliks Mamczur/g) ?? [];

      expect(matches.length).toBeLessThanOrEqual(4);
    }
  });

  test('uses the approved homepage social preview image on English and Polish homepages', async ({ page }) => {
    for (const route of ['/', '/pl/']) {
      await page.goto(route);

      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        homeSocialImage
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        homeSocialImage
      );
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
        'content',
        '1200'
      );
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
        'content',
        '630'
      );
      await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute(
        'content',
        'image/png'
      );
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
        'content',
        'Prompted Psyche - The human side of AI'
      );
      await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
        'content',
        'Prompted Psyche - The human side of AI'
      );
      await expect(page.locator(`meta[property="og:image"][content="${oldDefaultSocialImage}"]`)).toHaveCount(0);
    }
  });

  test('keeps the approved social image as the fallback on pages without a custom image', async ({ page }) => {
    await page.goto('/about/');

    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      homeSocialImage
    );
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      '1200'
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      'content',
      '630'
    );
  });

  test('keeps article-specific social images ahead of the default fallback', async ({ page }) => {
    await page.goto('/articles/trust-in-the-age-of-ready-made-answers/');

    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://promptedpsyche.com/images/articles/ai-path-to-knowledge.svg'
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      'https://promptedpsyche.com/images/articles/ai-path-to-knowledge.svg'
    );
    await expect(page.locator(`meta[property="og:image"][content="${homeSocialImage}"]`)).toHaveCount(0);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:image:height"]')).toHaveCount(0);
  });
});
