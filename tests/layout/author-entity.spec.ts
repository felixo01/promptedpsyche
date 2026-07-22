import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

const AUTHOR_ENTITY_ID = 'https://promptedpsyche.com/#feliks-mamczur';
const WEBSITE_ENTITY_ID = 'https://promptedpsyche.com/#website';
const PUBLISHER_ENTITY_ID = 'https://promptedpsyche.com/#publisher';
const alternateNames = ['Feliks Mirosław Mamczur', 'Mirosław Mamczur', 'Felix Mamczur'];
const sameAs = [
  'https://orcid.org/0009-0001-0715-0517',
  'https://felixmamczur.com/',
  'https://www.europeanfilmawards.eu/talent/feliks-mamczur/',
  'https://www.filmpolski.pl/fp/index.php/1199894',
  'https://www.imdb.com/name/nm7644647/',
  'https://www.filmweb.pl/person/Feliks%2BMamczur-3134395',
  'https://github.com/felixo01'
];
const privatePatterns = /\/Users\/felix|AI SPECIALIST|ai-specialista|backstage|content\/drafts|research\//i;
const wrongEfaImage = 'Filip-Marczewski-fotos';

type JsonLd = Record<string, any>;

function flattenStructuredData(items: JsonLd[]) {
  return items.flatMap((item) => Array.isArray(item['@graph']) ? item['@graph'] : [item]);
}

async function readStructuredData(page: Page) {
  const documents = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.map((node) => JSON.parse(node.textContent ?? '{}') as JsonLd)
  );

  return flattenStructuredData(documents);
}

function readStructuredDataFromHtml(html: string) {
  const documents = Array.from(
    html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
    (match) => JSON.parse(match[1]) as JsonLd
  );

  return flattenStructuredData(documents);
}

function findStructuredData(items: JsonLd[], type: string) {
  return items.find((item) => item['@type'] === type);
}

function collectTypedObjects(value: unknown, type: string): JsonLd[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectTypedObjects(item, type));
  }

  if (!value || typeof value !== 'object') {
    return [];
  }

  const object = value as JsonLd;
  return [
    ...(object['@type'] === type ? [object] : []),
    ...Object.values(object).flatMap((item) => collectTypedObjects(item, type))
  ];
}

async function readSearchEntries(request: APIRequestContext) {
  const responses = await Promise.all([
    request.get('/search-index.en.json'),
    request.get('/search-index.pl.json')
  ]);

  expect(responses.every((response) => response.ok())).toBe(true);
  return (await Promise.all(responses.map((response) => response.json())))
    .flat() as { type: string; url: string }[];
}

test.describe('author entity structured data', () => {
  const aboutCases = [
    {
      route: '/about/',
      profileId: 'https://promptedpsyche.com/about/#profile-page',
      profileName: 'About Feliks Mamczur',
      lang: 'en',
      authorUrl: 'https://promptedpsyche.com/about/',
      description: 'Feliks Mamczur is the author and founder of Prompted Psyche. He writes and consults on AI, cyberpsychology and Human-AI Interaction, drawing on experience in film, communication and creative work.',
      jobTitle: 'Author, filmmaker and Human-AI Interaction consultant'
    },
    {
      route: '/pl/about/',
      profileId: 'https://promptedpsyche.com/pl/about/#profile-page',
      profileName: 'Feliks Mamczur — autor Prompted Psyche',
      lang: 'pl',
      authorUrl: 'https://promptedpsyche.com/pl/about/',
      description: 'Feliks Mamczur jest autorem i twórcą Prompted Psyche. Pisze o AI, cyberpsychologii i Human-AI Interaction oraz prowadzi konsultacje w tym zakresie. Korzysta także z doświadczenia w filmie, komunikacji i pracy twórczej.',
      jobTitle: 'Autor, filmowiec i konsultant Human-AI Interaction'
    }
  ] as const;

  for (const aboutCase of aboutCases) {
    test(`publishes one canonical Person on ${aboutCase.route}`, async ({ page }) => {
      await page.goto(aboutCase.route);

      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
      const graph = await readStructuredData(page);
      const website = findStructuredData(graph, 'WebSite');
      const publisher = findStructuredData(graph, 'Organization');
      const profilePage = findStructuredData(graph, 'ProfilePage');
      const person = profilePage?.mainEntity;
      const serialized = JSON.stringify(graph);

      expect(website).toMatchObject({
        '@id': WEBSITE_ENTITY_ID,
        '@type': 'WebSite',
        name: 'Prompted Psyche',
        url: 'https://promptedpsyche.com/',
        publisher: { '@id': PUBLISHER_ENTITY_ID },
        inLanguage: ['en', 'pl']
      });
      expect(publisher).toMatchObject({
        '@id': PUBLISHER_ENTITY_ID,
        '@type': 'Organization',
        name: 'Prompted Psyche',
        url: 'https://promptedpsyche.com/',
        founder: { '@id': AUTHOR_ENTITY_ID },
        logo: {
          '@type': 'ImageObject',
          contentUrl: 'https://promptedpsyche.com/favicon.svg',
          width: 64,
          height: 64
        }
      });
      expect(profilePage).toMatchObject({
        '@id': aboutCase.profileId,
        '@type': 'ProfilePage',
        name: aboutCase.profileName,
        url: `https://promptedpsyche.com${aboutCase.route}`,
        inLanguage: aboutCase.lang,
        isPartOf: { '@id': WEBSITE_ENTITY_ID }
      });
      expect(person).toMatchObject({
        '@id': AUTHOR_ENTITY_ID,
        '@type': 'Person',
        name: 'Feliks Mamczur',
        givenName: 'Feliks',
        familyName: 'Mamczur',
        alternateName: alternateNames,
        url: aboutCase.authorUrl,
        jobTitle: aboutCase.jobTitle,
        image: {
          '@type': 'ImageObject',
          url: 'https://promptedpsyche.com/images/author/feliks-mamczur.png',
          contentUrl: 'https://promptedpsyche.com/images/author/feliks-mamczur.png',
          width: 960,
          height: 641,
          caption: 'Feliks Mamczur'
        },
        sameAs,
        memberOf: {
          '@type': 'Organization',
          name: 'European Film Academy',
          url: 'https://www.europeanfilmawards.eu/talent/feliks-mamczur/'
        }
      });
      expect(person.description).toBe(aboutCase.description);
      expect(person.knowsAbout).toHaveLength(8);
      expect(person.sameAs.some((url: string) => url.includes('doi.org') || url.includes('zenodo'))).toBe(false);
      expect(profilePage?.hasPart).toHaveLength(5);
      expect(profilePage?.hasPart.every((item: JsonLd) => item['@type'] === 'Article')).toBe(true);
      expect(profilePage?.hasPart.every((item: JsonLd) => item.author?.['@id'] === AUTHOR_ENTITY_ID)).toBe(true);
      if (aboutCase.lang === 'en') {
        expect(profilePage?.hasPart.every((item: JsonLd) => item.identifier?.propertyID === 'DOI')).toBe(true);
      } else {
        expect(profilePage?.hasPart.every((item: JsonLd) => item.identifier === undefined)).toBe(true);
      }
      expect(collectTypedObjects(graph, 'Person')).toHaveLength(1);
      expect(serialized).not.toMatch(privatePatterns);
      expect(serialized).not.toContain(wrongEfaImage);
      expect(serialized).not.toContain('clinical psychologist');
      expect(serialized).not.toContain('ResearchOrganization');
      expect(serialized).not.toContain('CollegeOrUniversity');
    });
  }

  const articleCases = [
    {
      route: '/articles/when-search-becomes-an-answer/',
      lang: 'en',
      authorUrl: 'https://promptedpsyche.com/about/',
      headline: 'When Search Becomes an Answer: What Generative AI Changes About Learning'
    },
    {
      route: '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/',
      lang: 'pl',
      authorUrl: 'https://promptedpsyche.com/pl/about/',
      headline: 'Wyszukiwarka odpowiada. Co zostaje uczniowi?'
    }
  ] as const;

  for (const articleCase of articleCases) {
    test(`connects ${articleCase.route} to Person, Publisher and WebSite`, async ({ page }) => {
      await page.goto(articleCase.route);

      const graph = await readStructuredData(page);
      const article = findStructuredData(graph, 'Article');
      const personObjects = collectTypedObjects(graph, 'Person');

      expect(article).toMatchObject({
        '@id': `https://promptedpsyche.com${articleCase.route}#article`,
        '@type': 'Article',
        headline: articleCase.headline,
        author: {
          '@id': AUTHOR_ENTITY_ID,
          '@type': 'Person',
          name: 'Feliks Mamczur',
          url: articleCase.authorUrl,
          alternateName: alternateNames,
          sameAs
        },
        publisher: { '@id': PUBLISHER_ENTITY_ID },
        isPartOf: { '@id': WEBSITE_ENTITY_ID },
        inLanguage: articleCase.lang
      });
      expect(findStructuredData(graph, 'WebSite')?.['@id']).toBe(WEBSITE_ENTITY_ID);
      expect(findStructuredData(graph, 'Organization')?.['@id']).toBe(PUBLISHER_ENTITY_ID);
      expect(personObjects).toHaveLength(1);
      expect(JSON.stringify(graph)).not.toContain(wrongEfaImage);
    });
  }

  test('connects all 16 public articles to the same author entity', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    const entries = await readSearchEntries(request);
    const articles = entries.filter((entry) => entry.type === 'article');

    expect(articles).toHaveLength(16);
    for (const entry of articles) {
      const response = await request.get(entry.url);
      expect(response.ok(), entry.url).toBe(true);
      const graph = readStructuredDataFromHtml(await response.text());
      const article = findStructuredData(graph, 'Article');

      expect(article?.author?.['@id'], entry.url).toBe(AUTHOR_ENTITY_ID);
      expect(article?.author?.name, entry.url).toBe('Feliks Mamczur');
      expect(article?.author?.sameAs, entry.url).toEqual(sameAs);
      expect(article?.publisher?.['@id'], entry.url).toBe(PUBLISHER_ENTITY_ID);
      expect(article?.isPartOf?.['@id'], entry.url).toBe(WEBSITE_ENTITY_ID);
      expect(collectTypedObjects(graph, 'Person'), entry.url).toHaveLength(1);
    }
  });

  test('marks every public Note as a BlogPosting with the same author entity', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440');
    const entries = await readSearchEntries(request);
    const notes = entries.filter((entry) => entry.type === 'note');

    expect(notes).toHaveLength(14);
    for (const entry of notes) {
      const response = await request.get(entry.url);
      expect(response.ok(), entry.url).toBe(true);
      const graph = readStructuredDataFromHtml(await response.text());
      const note = findStructuredData(graph, 'BlogPosting');

      expect(note?.author?.['@id'], entry.url).toBe(AUTHOR_ENTITY_ID);
      expect(note?.publisher?.['@id'], entry.url).toBe(PUBLISHER_ENTITY_ID);
      expect(note?.isPartOf?.['@id'], entry.url).toBe(WEBSITE_ENTITY_ID);
      expect(collectTypedObjects(graph, 'Person'), entry.url).toHaveLength(1);
    }
  });

  for (const homepage of [
    { route: '/', lang: 'en', authorUrl: 'https://promptedpsyche.com/about/' },
    { route: '/pl/', lang: 'pl', authorUrl: 'https://promptedpsyche.com/pl/about/' }
  ] as const) {
    test(`connects ${homepage.route} to the shared Person, WebSite and Publisher`, async ({ page }) => {
      await page.goto(homepage.route);
      const graph = await readStructuredData(page);
      const person = findStructuredData(graph, 'Person');

      expect(person).toMatchObject({
        '@id': AUTHOR_ENTITY_ID,
        name: 'Feliks Mamczur',
        url: homepage.authorUrl,
        sameAs
      });
      expect(findStructuredData(graph, 'WebSite')?.['@id']).toBe(WEBSITE_ENTITY_ID);
      expect(findStructuredData(graph, 'Organization')?.['@id']).toBe(PUBLISHER_ENTITY_ID);
      expect(collectTypedObjects(graph, 'Person')).toHaveLength(1);
    });
  }
});
