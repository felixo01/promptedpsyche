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
    await expect(page.getByText('może przechodzić w badania, narzędzia, formaty edukacyjne')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kierunki, które porządkują dalszą pracę' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Język dla artykułów, pojęć i praktyki' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI i psychoedukacja' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI jako wsparcie rozumowania diagnostycznego' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HumanAI research' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Słownik Prompted Psyche' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projekty archiwalne' })).toBeVisible();
    await expect(page.getByText('Archiwalny · Rekrutacja zakończona')).toBeVisible();
    await expect(page.locator('dt').filter({ hasText: 'Możliwy rezultat' })).toHaveCount(4);
    await expect(page.locator('dt').filter({ hasText: 'Etap' })).toHaveCount(4);
    await expect(page.getByText('Nie jest terapią, diagnozą ani zamiennikiem kontaktu ze specjalistą.')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Zobacz pojęcia' })).toHaveAttribute('href', '/pl/concepts/');
    await expect(page.getByRole('link', { name: 'Zobacz archiwum projektu' })).toHaveAttribute(
      'href',
      '/pl/projects/humanai-lab/'
    );
    expect(await page.locator('a[href="/pl/consulting/"]').filter({ hasText: 'Konsulting' }).count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('a[href="/pl/contact/"]').filter({ hasText: 'Kontakt' }).count()).toBeGreaterThanOrEqual(1);
  });

  test('renders the English Projects page', async ({ page }) => {
    await page.goto('/projects/');

    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
    await expect(page.getByText('starts to become research, tools, educational formats')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Directions that organize the next layer of work' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Language for articles, Concepts and practice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI and psychoeducation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI-assisted diagnostic reasoning' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HumanAI research' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Prompted Psyche Concepts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Archived projects' })).toBeVisible();
    await expect(page.getByText('Archived · Recruitment closed')).toBeVisible();
    await expect(page.locator('dt').filter({ hasText: 'Possible output' })).toHaveCount(4);
    await expect(page.locator('dt').filter({ hasText: 'Stage' })).toHaveCount(4);
    await expect(page.getByText('This is not therapy, diagnosis or a substitute for contact with a specialist.')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Explore concepts' })).toHaveAttribute('href', '/concepts/');
    await expect(page.getByRole('link', { name: 'View archived project' })).toHaveAttribute(
      'href',
      '/projects/humanai-lab/'
    );
    expect(await page.locator('a[href="/consulting/"]').filter({ hasText: 'Consulting' }).count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('a[href="/contact/"]').filter({ hasText: 'Contact' }).count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe('HumanAI Lab archive', () => {
  const archivePages = [
    {
      route: '/projects/humanai-lab/',
      lang: 'en',
      title: 'HumanAI Lab — archived research project',
      statusHeading: 'Project status',
      scopeHeading: 'What the project explored',
      resultsHeading: 'Results',
      continuingHeading: 'Continuing work',
      resultsCopy: 'Public results for this project are not currently available.',
      closedCopy: 'Recruitment has closed',
      updatedCopy: '21 July 2026',
      homePath: '/',
      projectsPath: '/projects/',
      trustPath: '/topics/trust-in-ai/',
      cognitionPath: '/topics/ai-and-cognition/',
      description:
        'Archived HumanAI Lab research project on conversational AI, trust, emotion and decision-making.'
    },
    {
      route: '/pl/projects/humanai-lab/',
      lang: 'pl',
      title: 'HumanAI Lab — archiwalny projekt badawczy',
      statusHeading: 'Status projektu',
      scopeHeading: 'Czego dotyczył projekt',
      resultsHeading: 'Wyniki',
      continuingHeading: 'Dalsze prace',
      resultsCopy: 'Publiczne wyniki tego projektu nie są obecnie dostępne.',
      closedCopy: 'Rekrutacja została zamknięta',
      updatedCopy: '21 lipca 2026',
      homePath: '/pl/',
      projectsPath: '/pl/projects/',
      trustPath: '/pl/topics/zaufanie-do-ai/',
      cognitionPath: '/pl/topics/ai-i-myslenie/',
      description:
        'Archiwalna strona projektu HumanAI Lab dotyczącego korzystania z chatbotów AI, zaufania, emocji i podejmowania decyzji.'
    }
  ] as const;

  for (const archive of archivePages) {
    test(`renders archived, closed-project content on ${archive.route}`, async ({ page }) => {
      await page.goto(archive.route);

      await expect(page.locator('html')).toHaveAttribute('lang', archive.lang);
      await expect(page.getByRole('heading', { name: archive.title, level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: archive.statusHeading })).toBeVisible();
      await expect(page.getByRole('heading', { name: archive.scopeHeading })).toBeVisible();
      await expect(page.getByRole('heading', { name: archive.resultsHeading })).toBeVisible();
      await expect(page.getByRole('heading', { name: archive.continuingHeading })).toBeVisible();
      await expect(page.getByText(archive.resultsCopy)).toBeVisible();
      await expect(page.getByText(archive.closedCopy, { exact: false })).toBeVisible();
      await expect(page.getByText(archive.updatedCopy, { exact: false })).toBeVisible();

      for (const href of [
        archive.homePath,
        archive.projectsPath,
        archive.trustPath,
        archive.cognitionPath
      ]) {
        expect(await page.locator(`a[href="${href}"]`).count()).toBeGreaterThanOrEqual(1);
      }
    });

    test(`publishes canonical, hreflang and index metadata on ${archive.route}`, async ({ page }) => {
      await page.goto(archive.route);

      await expect(page).toHaveTitle(`${archive.title} | Prompted Psyche`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${archive.route}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        'https://promptedpsyche.com/projects/humanai-lab/'
      );
      await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
        'href',
        'https://promptedpsyche.com/pl/projects/humanai-lab/'
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        archive.description
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        `https://promptedpsyche.com${archive.route}`
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://promptedpsyche.com/images/social/humanai-lab-archive-social-1200x630.png'
      );

      const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
      expect(structuredData).toContain('"dateModified":"2026-07-21"');
      expect(structuredData).not.toContain('doi');
    });

    test(`has no recruitment form or student framing on ${archive.route}`, async ({ page }) => {
      await page.goto(archive.route);

      const bodyText = (await page.locator('body').innerText()).toLocaleLowerCase();
      expect(bodyText).not.toContain('wypełnij ankietę');
      expect(bodyText).not.toContain('take the survey');
      expect(bodyText).not.toContain('student psychologii');
      expect(bodyText).not.toContain('psychology student');
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator('a[href*="docs.google.com/forms"], a[href*="forms.gle"]')).toHaveCount(0);
    });

    test(`has no horizontal overflow on mobile for ${archive.route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(archive.route);

      await expectNoHorizontalOverflow(page);
    });
  }

  test('switches directly between the English and Polish archive pages', async ({ page }) => {
    await page.goto('/projects/humanai-lab/');

    await expect(page.locator('[data-qa="language-switcher"] a', { hasText: 'PL' })).toHaveAttribute(
      'href',
      '/pl/projects/humanai-lab/'
    );

    await page.goto('/pl/projects/humanai-lab/');
    await expect(page.locator('[data-qa="language-switcher"] a', { hasText: 'EN' })).toHaveAttribute(
      'href',
      '/projects/humanai-lab/'
    );
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
