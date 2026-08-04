import { expect, test, type Page } from '@playwright/test';

type JsonLd = Record<string, any>;

const siteUrl = 'https://promptedpsyche.com';
const projectId = `${siteUrl}/projects/beyond-ai-share/#research-project`;
const authorId = `${siteUrl}/#feliks-mamczur`;
const doi = '10.5281/zenodo.21705721';
const doiUrl = `https://doi.org/${doi}`;
const osfUrl = 'https://doi.org/10.17605/OSF.IO/GSWN3';
const preprintTitle =
  'Beyond AI Share: A Preregistered Survey and Vignette Study of Perceived Control, Authorship, and Authenticity in AI-Assisted Creative Practice';
const socialImage = `${siteUrl}/images/social/beyond-ai-share-project-social-1200x630.png`;

const projectPages = [
  {
    route: '/projects/beyond-ai-share/',
    lang: 'en',
    title: 'Beyond AI Share - AI-Assisted Creativity, Authorship and Control',
    description:
      'A preregistered study of perceived control, authorship and authenticity in AI-assisted creative practice, with results, limitations, preprint and OSF preregistration.',
    projectsPath: '/projects/',
    homeName: 'Home',
    projectsName: 'Projects',
    questionHeading: 'What the study asked',
    findingsHeading: 'Key findings',
    limitationsHeading: 'Limitations and research integrity',
    citationHeading: 'How to cite the preprint',
    authorHeading: 'About the author',
    preprintLabel: 'Read the preprint',
    preregistrationLabel: 'View preregistration',
    imageAlt: 'Beyond AI Share - authorship, control and authenticity in AI-assisted creativity'
  },
  {
    route: '/pl/projects/beyond-ai-share/',
    lang: 'pl',
    title: 'Beyond AI Share - autorstwo, kontrola i twórczość wspomagana przez AI',
    description:
      'Prerejestrowane badanie postrzeganej kontroli, autorstwa i autentyczności w twórczości wspomaganej przez AI, wraz z wynikami, ograniczeniami i preprintem.',
    projectsPath: '/pl/projects/',
    homeName: 'Start',
    projectsName: 'Projekty',
    questionHeading: 'O co pytaliśmy w badaniu',
    findingsHeading: 'Najważniejsze wyniki',
    limitationsHeading: 'Ograniczenia i rzetelność badawcza',
    citationHeading: 'Jak cytować preprint',
    authorHeading: 'O autorze',
    preprintLabel: 'Przeczytaj preprint',
    preregistrationLabel: 'Zobacz prerejestrację',
    imageAlt: 'Beyond AI Share - autorstwo, kontrola i autentyczność w twórczości wspomaganej przez AI'
  }
] as const;

async function readGraph(page: Page) {
  const source = await page.locator('script[type="application/ld+json"]').textContent();
  expect(source).not.toBeNull();
  const parsed = JSON.parse(source ?? '{}') as JsonLd;
  expect(Array.isArray(parsed['@graph'])).toBe(true);
  return parsed['@graph'] as JsonLd[];
}

function nodesOfType(graph: JsonLd[], type: string) {
  return graph.filter((node) => {
    const nodeType = node['@type'];
    return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type;
  });
}

async function overflowSnapshot(page: Page) {
  return page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));
}

test.describe('Beyond AI Share research project pages', () => {
  for (const project of projectPages) {
    test(`renders the complete public research record on ${project.route}`, async ({ page }) => {
      const response = await page.goto(project.route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', project.lang);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.getByRole('heading', { name: 'Beyond AI Share', level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: project.questionHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Study design', level: 2 }).or(page.getByRole('heading', { name: 'Schemat badania', level: 2 }))).toBeVisible();
      await expect(page.getByRole('heading', { name: project.findingsHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: project.limitationsHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: project.citationHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: project.authorHeading, level: 2 })).toBeVisible();
      await expect(page.locator('.research-result-card h3')).toHaveCount(5);
      expect(await page.locator('dl.research-facts').count()).toBeGreaterThanOrEqual(2);
      await expect(page.locator('time[datetime="2026-07-30"]')).toHaveCount(1);
      await expect(page.locator('time[datetime="2026-06-15"]')).toHaveCount(1);
      await expect(page.locator('time[datetime="2026-08-04"]')).toHaveCount(1);

      await expect(page.getByRole('link', { name: project.preprintLabel })).toHaveAttribute('href', doiUrl);
      await expect(page.getByRole('link', { name: project.preregistrationLabel })).toHaveAttribute('href', osfUrl);
      await expect(page.locator(`a[href="${doiUrl}"]`)).toHaveCount(2);
      await expect(page.locator(`a[href="${osfUrl}"]`)).toHaveCount(2);
      await expect(page.getByText(preprintTitle, { exact: true })).toHaveCount(1);
      await expect(page.locator('.research-citation')).toContainText(preprintTitle);
      await expect(page.locator('form')).toHaveCount(0);
    });

    test(`publishes canonical, hreflang and social metadata on ${project.route}`, async ({ page }) => {
      await page.goto(project.route);
      const canonical = `${siteUrl}${project.route}`;

      await expect(page).toHaveTitle(project.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', project.description);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        `${siteUrl}/projects/beyond-ai-share/`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
        'href',
        `${siteUrl}/pl/projects/beyond-ai-share/`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `${siteUrl}/projects/beyond-ai-share/`
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
      await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', 'index, follow');
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', socialImage);
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
      await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute('content', 'image/png');
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', project.imageAlt);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', socialImage);
      await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute('content', project.imageAlt);
    });

    test(`uses conservative, internally consistent structured data on ${project.route}`, async ({ page }) => {
      await page.goto(project.route);
      const graph = await readGraph(page);
      const canonical = `${siteUrl}${project.route}`;

      for (const type of [
        'WebSite',
        'Organization',
        'WebPage',
        'BreadcrumbList',
        'ResearchProject',
        'ScholarlyArticle',
        'Person'
      ]) {
        expect(nodesOfType(graph, type).length, type).toBeGreaterThanOrEqual(1);
      }

      const people = nodesOfType(graph, 'Person');
      expect(people).toHaveLength(1);
      expect(people[0]['@id']).toBe(authorId);

      const webpage = nodesOfType(graph, 'WebPage')[0];
      expect(webpage).toMatchObject({
        url: canonical,
        inLanguage: project.lang,
        dateModified: '2026-08-04',
        mainEntity: { '@id': projectId }
      });

      const researchProject = nodesOfType(graph, 'ResearchProject')[0];
      expect(researchProject).toMatchObject({
        '@id': projectId,
        name: 'Beyond AI Share',
        founder: { '@id': authorId },
        subjectOf: { '@id': doiUrl }
      });
      expect(researchProject).not.toHaveProperty('funder');
      expect(researchProject).not.toHaveProperty('sponsor');
      expect(researchProject).not.toHaveProperty('parentOrganization');

      const preprint = nodesOfType(graph, 'ScholarlyArticle')[0];
      expect(preprint).toMatchObject({
        '@id': doiUrl,
        name: preprintTitle,
        headline: preprintTitle,
        datePublished: '2026-07-30',
        version: '1.0',
        creativeWorkStatus: 'Preprint - not peer-reviewed',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        identifier: { propertyID: 'DOI', value: doi },
        author: { '@id': authorId },
        publisher: { name: 'Zenodo', url: 'https://zenodo.org/' },
        about: { '@id': projectId }
      });

      const breadcrumb = nodesOfType(graph, 'BreadcrumbList')[0];
      expect(breadcrumb.itemListElement.map((item: JsonLd) => item.position)).toEqual([1, 2, 3]);
      expect(breadcrumb.itemListElement.map((item: JsonLd) => item.name)).toEqual([
        project.homeName,
        project.projectsName,
        'Beyond AI Share'
      ]);
      expect(breadcrumb.itemListElement[2].item).toBe(canonical);

      await expect(page.locator('meta[name^="citation_"]')).toHaveCount(0);
      const publicContent = `${await page.locator('main').innerText()}\n${JSON.stringify(graph)}`;
      expect(publicContent).not.toMatch(/Varsovia|ResearchOrganization|CollegeOrUniversity|clinical psychologist|professor/iu);
      expect(publicContent).not.toMatch(/[A-Z]:\\|ART_AI|badanie_art_ai|AI SPECIALIST|submission\/ijhci_reframing_phase0/iu);
      expect(publicContent).not.toContain('citation_title');
      expect(publicContent).not.toContain('citation_doi');
    });
  }

  test('switches directly between the two language versions', async ({ page }) => {
    await page.goto('/projects/beyond-ai-share/');
    await expect(page.locator('[data-qa="language-switcher"] a', { hasText: 'PL' })).toHaveAttribute(
      'href',
      '/pl/projects/beyond-ai-share/'
    );

    await page.goto('/pl/projects/beyond-ai-share/');
    await expect(page.locator('[data-qa="language-switcher"] a', { hasText: 'EN' })).toHaveAttribute(
      'href',
      '/projects/beyond-ai-share/'
    );
  });

  test('has no overflow at 390, 768 or 1440 pixels', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');

    for (const project of projectPages) {
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await page.goto(project.route);
        const result = await overflowSnapshot(page);
        expect(result.documentScrollWidth, `${project.route} at ${width}px`).toBeLessThanOrEqual(
          result.documentClientWidth + 1
        );
        expect(result.bodyScrollWidth, `${project.route} at ${width}px`).toBeLessThanOrEqual(
          result.innerWidth + 1
        );
      }
    }
  });

  test('keeps every in-page link reachable by keyboard', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');

    for (const project of projectPages) {
      await page.goto(project.route);
      const expectedHrefs = await page.locator('.research-project-page a').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href')).filter(Boolean)
      );
      const focused = new Set<string>();

      for (let press = 0; press < 70 && focused.size < expectedHrefs.length; press += 1) {
        await page.keyboard.press('Tab');
        const href = await page.evaluate(() => document.activeElement?.getAttribute('href'));
        if (href && expectedHrefs.includes(href)) focused.add(href);
      }

      expect([...focused].sort(), project.route).toEqual([...new Set(expectedHrefs)].sort());
    }
  });
});
