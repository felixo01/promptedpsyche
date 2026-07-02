import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => {
    const documentElement = document.documentElement;

    return {
      documentScrollWidth: documentElement.scrollWidth,
      documentClientWidth: documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth
    };
  });

  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('Projects page navigation', () => {
  test('adds Projects to the English header', async ({ page }) => {
    await page.goto('/');

    const projectsLink = page.locator('[data-qa="site-nav"] a', { hasText: 'Projects' });
    await expect(projectsLink).toHaveAttribute('href', '/projects/');
  });

  test('adds Projekty to the Polish header', async ({ page }) => {
    await page.goto('/pl/');

    const projectsLink = page.locator('[data-qa="site-nav"] a', { hasText: 'Projekty' });
    await expect(projectsLink).toHaveAttribute('href', '/pl/projects/');
  });
});

test.describe('Projects page content', () => {
  test('renders the Polish Projects page', async ({ page }) => {
    await page.goto('/pl/projects/');

    await expect(page.getByRole('heading', { name: 'Projekty', level: 1 })).toBeVisible();
    await expect(page.getByText('Kierunki pracy badawczo-praktycznej')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI i psychoedukacja' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI jako wsparcie rozumowania diagnostycznego' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HumanAI research' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Słownik Prompted Psyche' })).toBeVisible();
    await expect(page.getByText('nie zastępują terapii, diagnozy ani decyzji specjalisty')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Zobacz pojęcia' })).toHaveAttribute('href', '/pl/concepts/');
    expect(await page.locator('a[href="/pl/consulting/"]').filter({ hasText: 'Konsulting' }).count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('a[href="/pl/contact/"]').filter({ hasText: 'Kontakt' }).count()).toBeGreaterThanOrEqual(1);
  });

  test('renders the English Projects page', async ({ page }) => {
    await page.goto('/projects/');

    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
    await expect(page.getByText('Research-informed and applied')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI and psychoeducation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI-assisted diagnostic reasoning' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HumanAI research' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Prompted Psyche Concepts' })).toBeVisible();
    await expect(page.getByText('do not replace therapy, diagnosis or specialist decisions')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Explore concepts' })).toHaveAttribute('href', '/concepts/');
    expect(await page.locator('a[href="/consulting/"]').filter({ hasText: 'Consulting' }).count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('a[href="/contact/"]').filter({ hasText: 'Contact' }).count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Projects page safety', () => {
  for (const route of ['/pl/projects/', '/projects/']) {
    test(`does not expose internal or unsafe framing on ${route}`, async ({ page }) => {
      await page.goto(route);

      const body = page.locator('body');
      await expect(body).not.toContainText('automatyczna diagnoza');
      await expect(body).not.toContainText('automatic diagnosis');
      await expect(body).not.toContainText('terapia AI');
      await expect(body).not.toContainText('AI therapy');
    });
  }
});

test.describe('Projects page layout', () => {
  for (const route of ['/pl/projects/', '/projects/']) {
    test(`has no horizontal overflow on mobile for ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(route);

      await expectNoHorizontalOverflow(page);
    });
  }
});
