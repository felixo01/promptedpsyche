import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('author and about routes', () => {
  test('keeps English About as the canonical author route', async ({ page }) => {
    await page.goto('/about/');

    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'About the author' })).toBeVisible();
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Author' })).toHaveAttribute(
      'href',
      '/about/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/about/'
    );
    await expect(page.locator('body')).toContainText('European Film Academy');
    await expect(page.locator('body')).toContainText('studying psychology');
    await expect(page.locator('body')).toContainText('tools, repositories, versioned texts, sources');
    await expect(page.locator('body')).toContainText(
      'You can find my film work and directing portfolio at felixmamczur.com.'
    );
    await expect(page.getByRole('link', { name: 'film work and directing portfolio' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'film work and directing portfolio' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - film work and directing portfolio'
    );
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('film director portfolio and earlier projects');
    await expect(page.locator('body')).not.toContainText('AI engineer');
    await expect(page.locator('body')).not.toContainText('cybersecurity expert');
    await expect(page.locator('body')).not.toContainText('clinical psychologist');
    await expect(page.getByRole('link', { name: /^Practice$/ })).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });

  test('keeps Polish About as the canonical author route', async ({ page }) => {
    await page.goto('/pl/about/');

    await expect(page).toHaveURL(/\/pl\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Kim jestem' })).toBeVisible();
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Kim jestem' })).toHaveAttribute(
      'href',
      '/pl/about/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/about/'
    );
    await expect(page.locator('body')).toContainText('European Film Academy');
    await expect(page.locator('body')).toContainText('studiuję psychologię');
    await expect(page.locator('body')).toContainText('narzędziami, repozytoriami, wersjonowanymi tekstami');
    await expect(page.locator('body')).toContainText(
      'Moje prace filmowe i portfolio reżyserskie można znaleźć na felixmamczur.com.'
    );
    await expect(page.getByRole('link', { name: 'prace filmowe i portfolio reżyserskie' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'prace filmowe i portfolio reżyserskie' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - prace filmowe i portfolio reżyserskie'
    );
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('portfolio filmowe i wcześniejsze projekty');
    await expect(page.locator('body')).not.toContainText('inżynier AI');
    await expect(page.locator('body')).not.toContainText('ekspert cyberbezpieczeństwa');
    await expect(page.locator('body')).not.toContainText('psychologiem');
    await expect(page.getByRole('link', { name: /^Praktyka$/ })).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });

  test('redirects the English author alias to canonical About', async ({ page }) => {
    await page.goto('/author/');

    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'About the author' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('redirects the Polish author alias to canonical About', async ({ page }) => {
    await page.goto('/pl/author/');

    await expect(page).toHaveURL(/\/pl\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Kim jestem' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
