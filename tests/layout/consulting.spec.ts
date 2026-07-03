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

test.describe('Consulting pages', () => {
  test('renders the Polish consulting page with clearer native copy', async ({ page }) => {
    await page.goto('/pl/consulting/');

    await expect(page.getByRole('heading', { name: 'Konsulting', level: 1 })).toBeVisible();
    await expect(page.getByText('Pomagam osobom i zespołom pracować z AI bardziej świadomie')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dla osób i zespołów, które chcą używać AI uważniej' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'W czym mogę pomóc' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kiedy warto porozmawiać' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jak pracuję' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Czego nie robię' })).toBeVisible();
    await expect(page.getByText('nie sprzedaję gotowych "magicznych promptów"')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Napisz w sprawie konsultingu' })).toHaveAttribute('href', '/pl/contact/');
    await expect(page.locator('body')).not.toContainText('Kiedy ta praca jest potrzebna');
  });

  test('renders the English consulting page with matching structure', async ({ page }) => {
    await page.goto('/consulting/');

    await expect(page.getByRole('heading', { name: 'Consulting', level: 1 })).toBeVisible();
    await expect(page.getByText('I help people and teams work with AI more deliberately')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'For people and teams that want to use AI more carefully' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What I help with' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'When it makes sense to talk' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How I work' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What I do not do' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ask about consulting' })).toHaveAttribute('href', '/contact/');
  });

  for (const route of ['/pl/consulting/', '/consulting/']) {
    test(`keeps public safety boundaries on ${route}`, async ({ page }) => {
      await page.goto(route);

      const body = page.locator('body');
      await expect(body).not.toContainText('DOI');
      await expect(body).not.toContainText('ai-specialista');
      await expect(body).not.toContainText('MVP');
      await expect(body).not.toContainText('odblokuj potencjał');
      await expect(body).not.toContainText('w dynamicznie rozwijającym się świecie');
      await expect(body).not.toContainText('AI therapy');
      await expect(body).not.toContainText('terapia AI');
      await expect(body).not.toContainText('automatic diagnosis');
      await expect(body).not.toContainText('automatyczna diagnoza');

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    });

    test(`has no horizontal overflow on mobile for ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(route);

      await expectNoHorizontalOverflow(page);
    });
  }
});
