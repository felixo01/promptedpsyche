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
    await expect(page.getByRole('heading', { name: 'Audyt przepływu pracy człowiek-AI' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projektowanie praktycznych przepływów pracy z AI' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Audyt komunikacji i zaufania do AI' })).toBeVisible();
    await expect(page.getByText('repozytoriów, źródeł, cytowania, metadanych')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kiedy warto porozmawiać' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jak może wyglądać współpraca?' })).toBeVisible();
    await expect(page.getByText('Zakres i wycena zależą od sytuacji')).toBeVisible();
    await expect(page.getByText('Nie trzeba od razu wiedzieć, jak nazwać usługę')).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Human-AI workflow audit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Practical AI workflow design' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI communication and trust audit' })).toBeVisible();
    await expect(page.getByText('repositories, sources, citation, metadata')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'When it makes sense to talk' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What can working together look like?' })).toBeVisible();
    await expect(page.getByText('Scope and pricing depend on the situation')).toBeVisible();
    await expect(page.getByText('You do not need to know the exact service name')).toBeVisible();
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
      await expect(body).not.toContainText('security audit');
      await expect(body).not.toContainText('audyt bezpieczeństwa');
      await expect(body).not.toContainText('clinical evaluation');
      await expect(body).not.toContainText('ewaluacja kliniczna');
      await expect(body).not.toContainText('fixed price');
      await expect(body).not.toContainText('price list');
      await expect(body).not.toContainText('cennik');
      await expect(body).not.toContainText('stała cena');

      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    });

    test(`has no horizontal overflow on mobile for ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(route);

      await expectNoHorizontalOverflow(page);
    });
  }
});
