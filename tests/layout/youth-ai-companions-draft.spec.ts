import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { getArticleAlternates, getArticlePath } from '../../src/lib/articleRoutes';

const siteUrl = 'https://promptedpsyche.com';
const translationKey = 'youth-ai-companions-bridge-or-substitute';
const files = {
  en: resolve('src/content/articles/bridge-or-substitute-teen-chatbot.md'),
  pl: resolve('src/content/articles/most-czy-zastepstwo-nastolatek-chatbot.md')
} as const;
const routes = {
  en: '/articles/bridge-or-substitute-teen-chatbot/',
  pl: '/pl/articles/most-czy-zastepstwo-nastolatek-chatbot/'
} as const;
const titles = {
  en: "Bridge or Substitute? Where Does a Teen's Conversation With a Chatbot Lead?",
  pl: 'Most czy zastępstwo? Dokąd prowadzi rozmowa nastolatka z chatbotem'
} as const;
const descriptions = {
  en: 'What research really shows about teens talking with AI, their relationships with people, and when a chatbot becomes a bridge rather than a substitute.',
  pl: 'Co badania naprawdę pokazują o rozmowach nastolatków z AI, relacjach z ludźmi oraz o tym, kiedy chatbot pomaga nawiązać kontakt, a kiedy zaczyna go zastępować.'
} as const;
const heroPath = '/images/articles/youth-ai-companions-bridge-or-substitute.svg';
const socialPath = '/images/articles/youth-ai-companions-bridge-or-substitute-social.png';

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

test.describe('youth AI companions bilingual draft contract', () => {
  test('keeps both localized entries private, paired and outside Scholar', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers static source checks.');

    for (const lang of ['en', 'pl'] as const) {
      const source = read(files[lang]);
      const metadata = getFrontmatter(source);

      expect(metadata).toContain(`title: "${titles[lang]}"`);
      expect(metadata).toContain(`description: "${descriptions[lang]}"`);
      expect(descriptions[lang].length).toBeGreaterThanOrEqual(145);
      expect(descriptions[lang].length).toBeLessThanOrEqual(160);
      expect(metadata).toMatch(/^publishedAt: 2026-08-17$/mu);
      expect(metadata).toMatch(/^draft: true$/mu);
      expect(metadata).toMatch(/^scholarPrimary: false$/mu);
      expect(metadata).toMatch(new RegExp(`^lang: "${lang}"$`, 'mu'));
      expect(metadata).toContain(`translationKey: "${translationKey}"`);
      expect(metadata).not.toMatch(/^(?:doi|doiUrl|relatedDoi|relatedDoiUrl|version|licenseName|licenseUrl):/mu);
      expect(metadata).toContain(`image: ${heroPath}`);
      expect(metadata).toContain(`socialImage: ${socialPath}`);

      const inBrief = metadata.match(/^inBrief:\s*\r?\n((?:\s{2}- .*(?:\r?\n|$))+)/mu)?.[1] ?? '';
      expect(inBrief.match(/^\s{2}- /gmu)).toHaveLength(4);
    }

    const entries = [
      { id: 'bridge-or-substitute-teen-chatbot', data: { lang: 'en' as const, translationKey } },
      { id: 'most-czy-zastepstwo-nastolatek-chatbot', data: { lang: 'pl' as const, translationKey } }
    ];
    expect(getArticlePath(entries[0], 'en')).toBe(routes.en);
    expect(getArticlePath(entries[1], 'pl')).toBe(routes.pl);
    expect(getArticleAlternates(entries[0], entries)).toEqual({
      en: routes.en,
      pl: routes.pl,
      xDefault: routes.en
    });
    expect(getArticleAlternates(entries[1], entries)).toEqual({
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
    expect(enArticle).toContain('United States');
    expect(plArticle).toContain('13-17');
    expect(plArticle).toContain('Stanach Zjednoczonych');
    expect(enArticle).toContain(
      'interpretive heuristic, not a diagnostic tool, test, scale, threshold, or research result'
    );
    expect(plArticle).toContain('To nie jest test diagnostyczny.');
    expect(enArticle).toContain('Nor is there a universal number of messages');
    expect(plArticle).toContain('Nie ma też uniwersalnej liczby wiadomości');
    expect(enArticle.match(/HRejter/gu)).toHaveLength(1);
    expect(plArticle.match(/HRejter/gu)).toHaveLength(1);
    expect(enArticle).toContain('[HRejterzy');
    expect(plArticle).toContain('[materiale HRejterów');
    expect(getReferenceBlocks(en, 'Sources')).toHaveLength(15);
    expect(getReferenceBlocks(pl, 'Źródła')).toHaveLength(15);

    for (const citation of [
      'American Psychological Association',
      'Brewster',
      'Charles',
      'Common Sense Media',
      'Federal Trade Commission',
      'Herbener',
      'Hinduja',
      'HRejter',
      'Internet Matters',
      'Kim',
      'Kostenius',
      'McBain',
      "O'Neil",
      'Robb',
      'Sun'
    ]) {
      expect(en).toContain(citation);
      expect(pl).toContain(citation);
    }
  });

  test('keeps both drafts out of routes, discovery surfaces and topic hubs', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers draft exclusions.');

    const [enRoute, plRoute, enIndex, plIndex, enSearch, plSearch, rss] = await Promise.all([
      request.get(routes.en),
      request.get(routes.pl),
      request.get('/articles/'),
      request.get('/pl/articles/'),
      request.get('/search-index.en.json'),
      request.get('/search-index.pl.json'),
      request.get('/rss.xml')
    ]);

    expect(enRoute.status()).toBe(404);
    expect(plRoute.status()).toBe(404);
    const publicSurfaces = [
      await enIndex.text(),
      await plIndex.text(),
      await enSearch.text(),
      await plSearch.text(),
      await rss.text(),
      readBuiltSitemap(),
      read(resolve('src/lib/topics.ts'))
    ].join('\n');

    for (const value of [...Object.values(routes), ...Object.values(titles), translationKey]) {
      expect(publicSurfaces).not.toContain(value);
    }
    expect(publicSurfaces).not.toContain(`${siteUrl}${routes.en}`);
    expect(publicSurfaces).not.toContain(`${siteUrl}${routes.pl}`);
  });

  test('uses deterministic, accessible and correctly sized graphic assets', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'One project covers asset checks.');

    const svg = read(resolve('public', heroPath.slice(1)));
    expect(svg).toMatch(/<svg\b[^>]*viewBox="0 0 1600 900"/u);
    expect(svg).toMatch(/<title(?:\s[^>]*)?>[^<]+<\/title>/u);
    expect(svg).toMatch(/<desc(?:\s[^>]*)?>[^<]+<\/desc>/u);
    expect(svg).not.toMatch(/<(?:text|foreignObject|script)\b/iu);
    expect(svg).not.toMatch(/(?:href|src)="https?:\/\//iu);

    const png = readFileSync(resolve('public', socialPath.slice(1)));
    expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);

    const [heroResponse, socialResponse] = await Promise.all([
      request.get(heroPath),
      request.get(socialPath)
    ]);
    expect(heroResponse.ok()).toBe(true);
    expect(socialResponse.ok()).toBe(true);
    expect(heroResponse.headers()['content-type']).toContain('image/svg+xml');
    expect(socialResponse.headers()['content-type']).toContain('image/png');
  });

  test('keeps every curated internal link resolvable while the articles remain drafts', async ({ request }, testInfo) => {
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
