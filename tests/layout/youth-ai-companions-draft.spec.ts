import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { getArticleAlternates, getArticlePath } from '../../src/lib/articleRoutes';

const siteUrl = 'https://promptedpsyche.com';
const translationKey = 'youth-ai-companions-bridge-or-substitute';
const files = {
  en: resolve('src/content/articles/chatbot-or-human-why-teenagers-confide-in-ai.md'),
  pl: resolve('src/content/articles/chatbot-zamiast-czlowieka-dlaczego-nastolatkowie-zwierzaja-sie-ai.md')
} as const;
const routes = {
  en: '/articles/chatbot-or-human-why-teenagers-confide-in-ai/',
  pl: '/pl/articles/chatbot-zamiast-czlowieka-dlaczego-nastolatkowie-zwierzaja-sie-ai/'
} as const;
const oldRoutes = {
  en: '/articles/bridge-or-substitute-teen-chatbot/',
  pl: '/pl/articles/most-czy-zastepstwo-nastolatek-chatbot/'
} as const;
const titles = {
  en: 'Chatbot or Human? Why Teenagers Confide in AI',
  pl: 'Chatbot zamiast człowieka? Dlaczego nastolatkowie zwierzają się AI'
} as const;
const descriptions = {
  en: 'What research actually shows about teens and AI - from the 33% figure to when a chatbot helps someone reach people or begins to replace human contact.',
  pl: 'Co badania naprawdę pokazują o nastolatkach i AI - od liczby 33% po pytanie, kiedy chatbot pomaga wrócić do ludzi, a kiedy zaczyna ich zastępować.'
} as const;
const heroPath = '/images/articles/youth-ai-companions-bridge-or-substitute.svg';
const socialPath = '/images/articles/youth-ai-companions-bridge-or-substitute-social.png';
const figurePaths = {
  en: '/images/articles/youth-ai-companions-33-percent-en.svg',
  pl: '/images/articles/youth-ai-companions-33-percent-pl.svg'
} as const;

function read(path: string) {
  return readFileSync(path, 'utf8');
}

function getFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
  expect(match).not.toBeNull();
  return match?.[1] ?? '';
}

function getBody(source: string) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/u, '');
}

function getReferenceBlocks(source: string, heading: 'Sources' | 'Źródła') {
  const references = source.split(new RegExp(`^## ${heading}\\s*$`, 'mu'))[1] ?? '';
  return references
    .trim()
    .split(/\r?\n\s*\r?\n/u)
    .map((block) => block.trim())
    .filter(Boolean);
}

function readBuiltSitemap() {
  return readdirSync(resolve('dist'))
    .filter((fileName) => /^sitemap-\d+\.xml$/u.test(fileName))
    .map((fileName) => read(resolve('dist', fileName)))
    .join('\n');
}

test.describe('youth AI companions bilingual publication contract', () => {
  test('publishes the paired S2 articles with complete editorial metadata', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers static source checks.');

    for (const lang of ['en', 'pl'] as const) {
      const source = read(files[lang]);
      const metadata = getFrontmatter(source);

      expect(metadata).toContain(`title: "${titles[lang]}"`);
      expect(metadata).toContain(`description: "${descriptions[lang]}"`);
      expect(descriptions[lang].length).toBeGreaterThanOrEqual(145);
      expect(descriptions[lang].length).toBeLessThanOrEqual(160);
      expect(metadata).toMatch(/^publishedAt: 2026-08-17$/mu);
      expect(metadata).toMatch(/^draft: false$/mu);
      expect(metadata).toMatch(/^scholarPrimary: false$/mu);
      expect(metadata).toMatch(new RegExp(`^lang: "${lang}"$`, 'mu'));
      expect(metadata).toContain(`translationKey: "${translationKey}"`);
      expect(metadata).not.toMatch(/^(?:doi|doiUrl|relatedDoi|relatedDoiUrl|version|licenseName|licenseUrl):/mu);
      expect(metadata).toContain(`image: ${heroPath}`);
      expect(metadata).toContain(`socialImage: ${socialPath}`);

      const inBrief = metadata.match(/^inBrief:\s*\r?\n((?:\s{2}- .*(?:\r?\n|$))+)/mu)?.[1] ?? '';
      expect(inBrief.match(/^\s{2}- /gmu)).toHaveLength(4);

      const body = getBody(source);
      expect(body).toContain(figurePaths[lang]);
    }

    const entries = [
      { id: 'chatbot-or-human-why-teenagers-confide-in-ai', data: { lang: 'en' as const, translationKey } },
      { id: 'chatbot-zamiast-czlowieka-dlaczego-nastolatkowie-zwierzaja-sie-ai', data: { lang: 'pl' as const, translationKey } }
    ];
    expect(getArticlePath(entries[0], 'en')).toBe(routes.en);
    expect(getArticlePath(entries[1], 'pl')).toBe(routes.pl);
    expect(getArticleAlternates(entries[0], entries)).toEqual({
      en: routes.en,
      pl: routes.pl,
      xDefault: routes.en
    });
  });

  test('preserves the factual lock, heuristic boundary and 15-source parity', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers static source checks.');

    const en = getBody(read(files.en));
    const pl = getBody(read(files.pl));
    const enArticle = en.split(/^## Sources\s*$/mu)[0];
    const plArticle = pl.split(/^## Źródła\s*$/mu)[0];

    for (const required of ['758', '17%', '12%', '4%', '33%', '66%']) {
      expect(enArticle).toContain(required);
      expect(plArticle).toContain(required);
    }
    expect(enArticle).toContain('1,060');
    expect(plArticle).toContain('1060');
    expect(enArticle).toContain('13 to 17');
    expect(plArticle).toContain('13-17');
    expect(enArticle).toContain('This is not a diagnostic test.');
    expect(plArticle).toContain('To nie jest test diagnostyczny.');
    expect(enArticle).toContain('There is no number of messages');
    expect(plArticle).toContain('Nie istnieje liczba wiadomości');
    expect(enArticle.match(/HRejter/gu)).toHaveLength(1);
    expect(plArticle.match(/HRejter/gu)).toHaveLength(1);
    expect(getReferenceBlocks(en, 'Sources')).toHaveLength(15);
    expect(getReferenceBlocks(pl, 'Źródła')).toHaveLength(15);
  });

  test('renders both public routes with canonical, hreflang, structured data and discovery coverage', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers publication surfaces.');

    const [enRoute, plRoute, enIndex, plIndex, enSearch, plSearch, rss] = await Promise.all([
      request.get(routes.en),
      request.get(routes.pl),
      request.get('/articles/'),
      request.get('/pl/articles/'),
      request.get('/search-index.en.json'),
      request.get('/search-index.pl.json'),
      request.get('/rss.xml')
    ]);

    expect(enRoute.status()).toBe(200);
    expect(plRoute.status()).toBe(200);

    const enHtml = await enRoute.text();
    const plHtml = await plRoute.text();
    expect(enHtml).toContain(`<link rel="canonical" href="${siteUrl}${routes.en}"`);
    expect(plHtml).toContain(`<link rel="canonical" href="${siteUrl}${routes.pl}"`);
    expect(enHtml).toContain(`hreflang="pl" href="${siteUrl}${routes.pl}"`);
    expect(plHtml).toContain(`hreflang="en" href="${siteUrl}${routes.en}"`);
    expect(enHtml).toContain('"@type":"Article"');
    expect(plHtml).toContain('"@type":"Article"');
    expect(enHtml).not.toContain('citation_title');
    expect(plHtml).not.toContain('citation_title');

    const publicSurfaces = [
      await enIndex.text(),
      await plIndex.text(),
      await enSearch.text(),
      await plSearch.text(),
      await rss.text(),
      readBuiltSitemap()
    ].join('\n');
    for (const value of [...Object.values(routes), ...Object.values(titles)]) {
      expect(publicSurfaces).toContain(value);
    }
  });

  test('preserves permanent redirects from the previously indexed article URLs', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers redirect config.');

    const vercel = JSON.parse(read(resolve('vercel.json'))) as {
      redirects?: Array<{ source: string; destination: string; permanent?: boolean }>;
    };
    const redirects = vercel.redirects ?? [];

    for (const lang of ['en', 'pl'] as const) {
      expect(redirects).toContainEqual({
        source: oldRoutes[lang],
        destination: routes[lang],
        permanent: true
      });
    }
  });

  test('uses accessible and correctly sized publication graphics', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers asset checks.');

    for (const svgPath of [heroPath, ...Object.values(figurePaths)]) {
      const svg = read(resolve('public', svgPath.slice(1)));
      expect(svg).toMatch(/<svg\b[^>]*viewBox=/u);
      expect(svg).toMatch(/<title(?:\s[^>]*)?>[^<]+<\/title>/u);
      expect(svg).toMatch(/<desc(?:\s[^>]*)?>[^<]+<\/desc>/u);
      expect(svg).not.toMatch(/<(?:script|foreignObject)\b/iu);
      expect(svg).not.toMatch(/(?:href|src)="https?:\/\//iu);
      const response = await request.get(svgPath);
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toContain('image/svg+xml');
    }

    const png = readFileSync(resolve('public', socialPath.slice(1)));
    expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    const response = await request.get(socialPath);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('keeps curated internal links resolvable', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers link checks.');
    const links = new Set<string>();
    for (const file of Object.values(files)) {
      for (const match of getBody(read(file)).matchAll(/\]\((\/(?:pl\/)?(?:articles|concepts|notes)\/[^)]+)\)/gu)) {
        links.add(match[1]);
      }
    }
    expect(links.size).toBeGreaterThanOrEqual(8);
    for (const link of links) {
      const response = await request.get(link);
      expect(response.status(), link).toBe(200);
    }
  });
});
