import { expect, test, type Page } from '@playwright/test';

const orcidUrl = 'https://orcid.org/0009-0001-0715-0517';
const aiFearsEnglishDoi = '10.5281/zenodo.21340181';
const aiFearsEnglishDoiUrl = `https://doi.org/${aiFearsEnglishDoi}`;
const privatePatterns = /\/Users\/felix|AI SPECIALIST|ai-specialista|backstage|content\/drafts|research\//i;

type JsonLd = Record<string, any>;

async function readStructuredData(page: Page) {
  return page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.map((node) => JSON.parse(node.textContent ?? '{}') as JsonLd)
  );
}

function findStructuredData(items: JsonLd[], type: string) {
  return items.find((item) => item['@type'] === type);
}

test.describe('author entity structured data', () => {
  test('describes the English About page as Feliks Mamczur ProfilePage', async ({ page }) => {
    await page.goto('/about/');

    const items = await readStructuredData(page);
    const profilePage = findStructuredData(items, 'ProfilePage');
    const serialized = JSON.stringify(items);

    expect(profilePage).toBeTruthy();
    expect(profilePage).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: 'https://promptedpsyche.com/about/',
      inLanguage: 'en',
      mainEntity: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/about/'
      }
    });
    expect(profilePage?.mainEntity.description).toContain('writes and consults');
    expect(profilePage?.mainEntity.sameAs).toEqual([orcidUrl]);
    expect(serialized).not.toMatch(privatePatterns);
    expect(serialized).not.toContain('AI engineer');
    expect(serialized).not.toContain('clinical psychologist');
    expect(serialized).not.toContain('research institute');
  });

  test('describes the Polish About page as Feliks Mamczur ProfilePage', async ({ page }) => {
    await page.goto('/pl/about/');

    const items = await readStructuredData(page);
    const profilePage = findStructuredData(items, 'ProfilePage');
    const serialized = JSON.stringify(items);

    expect(profilePage).toBeTruthy();
    expect(profilePage).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: 'https://promptedpsyche.com/pl/about/',
      inLanguage: 'pl',
      mainEntity: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/pl/about/'
      }
    });
    expect(profilePage?.mainEntity.description).toContain('pisze i konsultuje');
    expect(profilePage?.mainEntity.sameAs).toEqual([orcidUrl]);
    expect(serialized).not.toMatch(privatePatterns);
    expect(serialized).not.toContain('AI engineer');
    expect(serialized).not.toContain('clinical psychologist');
    expect(serialized).not.toContain('research institute');
  });

  test('connects English articles to the canonical English author page', async ({ page }) => {
    await page.goto('/articles/trust-in-the-age-of-ready-made-answers/');

    const items = await readStructuredData(page);
    const article = findStructuredData(items, 'Article');
    const serialized = JSON.stringify(items);

    expect(article).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Trust in the age of ready-made answers',
      url: 'https://promptedpsyche.com/articles/trust-in-the-age-of-ready-made-answers/',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://promptedpsyche.com/articles/trust-in-the-age-of-ready-made-answers/'
      },
      author: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/about/',
        sameAs: [orcidUrl]
      },
      inLanguage: 'en'
    });
    expect(article?.datePublished).toMatch(/^2026-07-02T/);
    expect(article?.dateModified).toMatch(/^2026-07-10T/);
    expect(serialized).not.toMatch(privatePatterns);
  });

  test('connects Polish articles to the canonical Polish author page', async ({ page }) => {
    await page.goto('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');

    const items = await readStructuredData(page);
    const article = findStructuredData(items, 'Article');
    const serialized = JSON.stringify(items);

    expect(article).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Zaufanie w epoce gotowych odpowiedzi',
      url: 'https://promptedpsyche.com/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
      author: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/pl/about/',
        sameAs: [orcidUrl]
      },
      inLanguage: 'pl'
    });
    expect(article?.datePublished).toMatch(/^2026-07-02T/);
    expect(article?.dateModified).toMatch(/^2026-07-10T/);
    expect(serialized).not.toMatch(privatePatterns);
  });

  test('connects the revised Polish AI fears article to its author and revision date', async ({ page }) => {
    await page.goto('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');

    const items = await readStructuredData(page);
    const article = findStructuredData(items, 'Article');
    const serialized = JSON.stringify(items);

    expect(article).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Czy boimy się AI, czy boimy się samych siebie?',
      url: 'https://promptedpsyche.com/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
      author: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/pl/about/',
        sameAs: [orcidUrl]
      },
      inLanguage: 'pl',
      image: 'https://promptedpsyche.com/images/articles/ai-fear-human-mirror-social.webp'
    });
    expect(article?.datePublished).toMatch(/^2026-07-04T/);
    expect(article?.dateModified).toMatch(/^2026-07-13T/);
    expect(article?.identifier).toBeUndefined();
    expect(serialized).not.toMatch(privatePatterns);
  });

  test('connects the revised English AI fears article to its author and revision date', async ({ page }) => {
    await page.goto('/articles/are-we-afraid-of-ai-or-of-ourselves/');

    const items = await readStructuredData(page);
    const article = findStructuredData(items, 'Article');
    const serialized = JSON.stringify(items);

    expect(article).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Are we afraid of AI, or of ourselves?',
      url: 'https://promptedpsyche.com/articles/are-we-afraid-of-ai-or-of-ourselves/',
      author: {
        '@type': 'Person',
        name: 'Feliks Mamczur',
        url: 'https://promptedpsyche.com/about/',
        sameAs: [orcidUrl]
      },
      inLanguage: 'en',
      image: 'https://promptedpsyche.com/images/articles/ai-fear-human-mirror-social.webp',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'DOI',
        value: aiFearsEnglishDoi
      },
      sameAs: aiFearsEnglishDoiUrl,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      version: '2.1'
    });
    expect(article?.datePublished).toMatch(/^2026-07-04T/);
    expect(article?.dateModified).toMatch(/^2026-07-13T/);
    expect(serialized).not.toMatch(privatePatterns);
  });
});
