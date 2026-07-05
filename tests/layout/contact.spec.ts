import { expect, test } from '@playwright/test';

const email = 'humanai.lab.edu@gmail.com';
const mailto = `mailto:${email}`;

const contactSafetyCases = [
  {
    route: '/contact/',
    expectedClosing: 'I try to respond thoughtfully',
    absentCopy: 'I reply when I can realistically help'
  },
  {
    route: '/pl/contact/',
    expectedClosing: 'Staram się odpowiadać na wiadomości możliwie uważnie',
    absentCopy: 'Odpowiadam wtedy, kiedy mogę realnie pomóc'
  }
];

test.describe('contact pages', () => {
  test('shows direct email access on the English contact page', async ({ page }) => {
    await page.goto('/contact/');

    const emailCard = page.locator('[data-qa="contact-email-card"]');
    const emailLink = page.locator('[data-qa="contact-email-link"]');

    await expect(emailCard).toBeVisible();
    await expect(emailCard).toContainText(email);
    await expect(emailLink).toHaveAttribute('href', mailto);
    await expect(page.getByRole('link', { name: 'Send an email' })).toHaveAttribute(
      'href',
      mailto
    );
  });

  test('shows direct email access on the Polish contact page', async ({ page }) => {
    await page.goto('/pl/contact/');

    const emailCard = page.locator('[data-qa="contact-email-card"]');
    const emailLink = page.locator('[data-qa="contact-email-link"]');

    await expect(emailCard).toBeVisible();
    await expect(emailCard).toContainText(email);
    await expect(emailLink).toHaveAttribute('href', mailto);
    await expect(page.getByRole('link', { name: 'Napisz e-mail' })).toHaveAttribute(
      'href',
      mailto
    );
  });

  for (const { route, expectedClosing, absentCopy } of contactSafetyCases) {
    test(`keeps contact copy and safety boundaries on ${route}`, async ({ page }) => {
      await page.goto(route);

      const body = page.locator('body');
      await expect(body).toContainText(expectedClosing);
      await expect(body).not.toContainText(absentCopy);
      await expect(body).not.toContainText('DOI');
      await expect(body).not.toContainText('Practice');
      await expect(body).not.toContainText('Praktyka');
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    });
  }

  for (const route of ['/contact/', '/pl/contact/']) {
    test(`keeps email layout inside the viewport on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(route);

      const result = await page.evaluate(() => {
        const emailCard = document.querySelector('[data-qa="contact-email-card"]');
        const emailLink = document.querySelector('[data-qa="contact-email-link"]');
        const cardRect = emailCard?.getBoundingClientRect();
        const linkRect = emailLink?.getBoundingClientRect();

        return {
          documentScrollWidth: document.documentElement.scrollWidth,
          documentClientWidth: document.documentElement.clientWidth,
          cardRight: cardRect ? Math.round(cardRect.right) : null,
          linkRight: linkRect ? Math.round(linkRect.right) : null,
          innerWidth: window.innerWidth
        };
      });

      expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
      expect(result.cardRight ?? 0).toBeLessThanOrEqual(result.innerWidth + 1);
      expect(result.linkRight ?? 0).toBeLessThanOrEqual(result.innerWidth + 1);
    });
  }
});
