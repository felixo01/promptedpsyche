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

const consultingCases = [
  {
    route: '/consulting/',
    title: 'AI Use Audit for Teams',
    audience: 'When an AI use audit is useful',
    scope: 'What we examine',
    process: 'How the audit works',
    deliverables: 'What the team receives',
    boundaries: 'What the audit does not do',
    heroCta: 'Describe your team and AI use',
    heroCtaHref: '/contact/',
    processCta: 'See how the audit works',
    finalCta: 'Go to contact',
    metaTitle: 'AI Use Audit for Creative and Marketing Teams | Prompted Psyche'
  },
  {
    route: '/pl/consulting/',
    title: 'Audyt wykorzystania AI w zespole',
    audience: 'Kiedy audyt wykorzystania AI ma sens',
    scope: 'Co sprawdzamy',
    process: 'Jak wygląda audyt',
    deliverables: 'Co otrzymuje zespół',
    boundaries: 'Czego audyt nie robi',
    heroCta: 'Opisz swój zespół i sposób używania AI',
    heroCtaHref: '/pl/contact/',
    processCta: 'Zobacz, jak wygląda audyt',
    finalCta: 'Przejdź do kontaktu',
    metaTitle: 'Audyt wykorzystania AI w zespole kreatywnym lub marketingowym | Prompted Psyche'
  }
] as const;

test.describe('AI use audit consulting pages', () => {
  for (const consultingCase of consultingCases) {
    test(`presents the focused audit offer on ${consultingCase.route}`, async ({ page }) => {
      await page.goto(consultingCase.route);

      await expect(page).toHaveTitle(consultingCase.metaTitle);
      await expect(page.getByRole('heading', { name: consultingCase.title, level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: consultingCase.audience })).toBeVisible();
      await expect(page.getByRole('heading', { name: consultingCase.scope })).toBeVisible();
      await expect(page.getByRole('heading', { name: consultingCase.process })).toBeVisible();
      await expect(page.getByRole('heading', { name: consultingCase.deliverables })).toBeVisible();
      await expect(page.getByRole('heading', { name: consultingCase.boundaries })).toBeVisible();

      await expect(page.locator('[data-qa="audit-area"]')).toHaveCount(8);
      await expect(page.locator('[data-qa="audit-process-step"]')).toHaveCount(6);
      await expect(page.locator('[data-qa="audit-audience-list"] li')).toHaveCount(7);
      await expect(page.locator('[data-qa="audit-deliverables-list"] li')).toHaveCount(7);
      await expect(page.locator('[data-qa="audit-boundaries-list"] li')).toHaveCount(6);

      await expect(page.getByRole('link', { name: consultingCase.heroCta })).toHaveAttribute(
        'href',
        consultingCase.heroCtaHref
      );
      await expect(page.getByRole('link', { name: consultingCase.processCta })).toHaveAttribute(
        'href',
        '#audit-process'
      );
      await expect(page.getByRole('link', { name: consultingCase.finalCta })).toHaveAttribute(
        'href',
        consultingCase.heroCtaHref
      );
    });

    test(`keeps clear boundaries and restrained claims on ${consultingCase.route}`, async ({ page }) => {
      await page.goto(consultingCase.route);

      const body = page.locator('body');
      await expect(body).not.toContainText('DOI');
      await expect(body).not.toContainText('ai-specialista');
      await expect(body).not.toContainText('fixed price');
      await expect(body).not.toContainText('price list');
      await expect(body).not.toContainText('cennik');
      await expect(body).not.toContainText('stała cena');
      await expect(body).not.toContainText('guaranteed');
      await expect(body).not.toContainText('gwarant');
      await expect(body).not.toContainText('unlock');
      await expect(body).not.toContainText('odblokuj potencjał');
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    });

    for (const width of [390, 320]) {
      test(`has no horizontal overflow at ${width}px on ${consultingCase.route}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(consultingCase.route);

        await expectNoHorizontalOverflow(page);
      });
    }
  }
});
