import { expect, test } from '@playwright/test';

const homeSocialImage =
  'https://promptedpsyche.com/images/social/prompted-psyche-home-social-1200x630.png';
const oldDefaultSocialImage = 'https://promptedpsyche.com/images/prompted-psyche-editorial.png';

test.describe('homepage hero positioning', () => {
  test('shows the English project positioning', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('The human side of AI.');
    await expect(page.locator('[data-qa="hero-copy"]')).not.toContainText('Feliks Mamczur');
    await expect(page.locator('body')).toContainText('The first essays and notes are now live.');
    await expect(page.locator('body')).not.toContainText('The first article is now published.');
    await expect(page.locator('body')).not.toContainText('Human-Machine Interaction');
  });

  test('shows the Polish project positioning', async ({ page }) => {
    await page.goto('/pl/');

    await expect(page.locator('[data-qa="hero-title"]')).toHaveText('Ludzka strona AI.');
    await expect(page.locator('[data-qa="hero-copy"]')).not.toContainText('Feliks Mamczur');
    await expect(page.locator('body')).toContainText('Pierwsze eseje i notatki są już dostępne.');
    await expect(page.locator('body')).not.toContainText('Pierwszy artykuł jest już dostępny.');
    await expect(page.locator('body')).not.toContainText('Human-Machine Interaction');
  });

  test('keeps visible author-name repetition restrained on homepages', async ({ page }) => {
    for (const route of ['/', '/pl/']) {
      await page.goto(route);

      const visibleText = await page.locator('body').innerText();
      const matches = visibleText.match(/Feliks Mamczur/g) ?? [];

      expect(matches.length).toBeLessThanOrEqual(3);
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
