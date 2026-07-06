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

async function expectStructuredAuthorIdentity(page: Page) {
  const structuredData = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => script.textContent ?? '').join('\n')
  );

  expect(structuredData).toContain('Feliks Mamczur');
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
    await expect(page.locator('body')).toContainText('artificial intelligence changes the way people think');
    await expect(page.locator('body')).toContainText('My name is Feliks Mamczur');
    await expect(page.locator('body')).toContainText(
      'I created Prompted Psyche as a place to write about the human side of AI'
    );
    await expectStructuredAuthorIdentity(page);
    await expect(page.locator('body')).toContainText('Cyberpsychology and Human-AI Interaction');
    await expect(page.locator('body')).toContainText('intelligent systems');
    await expect(page.locator('body')).toContainText(
      'You can find my earlier visual and film projects at felixmamczur.com.'
    );
    await expect(page.getByRole('link', { name: 'earlier visual and film projects' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'earlier visual and film projects' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - earlier visual and film projects'
    );
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('film director portfolio and earlier projects');
    await expect(page.locator('body')).not.toContainText('European Film Academy');
    await expect(page.locator('body')).not.toContainText('I am a filmmaker');
    await expect(page.locator('body')).not.toContainText('filmmaker');
    await expect(page.locator('body')).not.toContainText('film director');
    await expect(page.locator('body')).not.toContainText('director');
    await expect(page.locator('body')).not.toContainText('film work and directing portfolio');
    await expect(page.locator('body')).not.toContainText('studying psychology');
    await expect(page.locator('body')).not.toContainText('psychology studies');
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
    await expect(page.locator('body')).toContainText('sztuczna inteligencja zmienia sposób myślenia');
    await expect(page.locator('body')).toContainText('Nazywam się Feliks Mamczur');
    await expect(page.locator('body')).toContainText('stworzyłem Prompted Psyche');
    await expectStructuredAuthorIdentity(page);
    await expect(page.locator('body')).toContainText('cyberpsychologii, Human-AI Interaction');
    await expect(page.locator('body')).toContainText('inteligentnymi systemami');
    await expect(page.locator('body')).toContainText(
      'Moje wcześniejsze projekty wizualne i filmowe można znaleźć na felixmamczur.com.'
    );
    await expect(page.getByRole('link', { name: 'wcześniejsze projekty wizualne i filmowe' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'wcześniejsze projekty wizualne i filmowe' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - wcześniejsze projekty wizualne i filmowe'
    );
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('portfolio filmowe i wcześniejsze projekty');
    await expect(page.locator('body')).not.toContainText('European Film Academy');
    await expect(page.locator('body')).not.toContainText('Jestem reżyserem');
    await expect(page.locator('body')).not.toContainText('reżyser');
    await expect(page.locator('body')).not.toContainText('montażysta');
    await expect(page.locator('body')).not.toContainText('filmowiec');
    await expect(page.locator('body')).not.toContainText('portfolio reżyserskie');
    await expect(page.locator('body')).not.toContainText('studiuję psychologię');
    await expect(page.locator('body')).not.toContainText('studiuje psychologię');
    await expect(page.locator('body')).not.toContainText('studia psychologiczne');
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
