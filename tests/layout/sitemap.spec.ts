import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const showPractice = process.env.SHOW_PRACTICE === 'true';

function readDistFile(fileName: string) {
  return fs.readFileSync(path.join(process.cwd(), 'dist', fileName), 'utf8');
}

function readBuiltSitemap() {
  const distPath = path.join(process.cwd(), 'dist');
  return fs
    .readdirSync(distPath)
    .filter((fileName) => /^sitemap-\d+\.xml$/.test(fileName))
    .map(readDistFile)
    .join('\n');
}

function readVercelConfig() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countRssItemsByLink(rss: string, url: string) {
  const escapedUrl = escapeRegExp(url);
  return (
    rss.match(new RegExp(`<item>[\\s\\S]*?<link>${escapedUrl}</link>[\\s\\S]*?</item>`, 'g')) ?? []
  ).length;
}

function readRssItemByLink(rss: string, url: string) {
  const escapedUrl = escapeRegExp(url);
  return rss.match(new RegExp(`<item>[\\s\\S]*?<link>${escapedUrl}</link>[\\s\\S]*?</item>`))?.[0];
}

test.describe('built sitemap and RSS policy', () => {
  test('publishes a minimal robots.txt with sitemap reference', () => {
    const robots = readDistFile('robots.txt');

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://promptedpsyche.com/sitemap-index.xml');
    expect(robots).not.toContain('Disallow: /practice');
    expect(robots).not.toContain('Disallow: /pl/practice');
  });

  test('excludes tag archives and follows Practice launch visibility in sitemap', () => {
    const sitemap = readBuiltSitemap();

    expect(sitemap).not.toContain('/tags/');
    expect(sitemap).not.toContain('/pl/tags/');
    if (showPractice) {
      expect(sitemap).toContain('/practice/');
      expect(sitemap).toContain('/pl/practice/');
      expect(sitemap).toContain('/practice/how-to-check-whether-an-ai-answer-has-sources/');
      expect(sitemap).toContain('/practice/how-to-check-your-assumptions-with-ai/');
      expect(sitemap).toContain('/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/');
      expect(sitemap).toContain('/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/');
      expect(sitemap.match(/https:\/\/promptedpsyche\.com\/practice\//g) ?? []).toHaveLength(11);
      expect(sitemap.match(/https:\/\/promptedpsyche\.com\/pl\/practice\//g) ?? []).toHaveLength(11);
    } else {
      expect(sitemap).not.toContain('/practice/');
      expect(sitemap).not.toContain('/pl/practice/');
    }
    expect(sitemap).not.toContain('/search-index.en.json');
    expect(sitemap).not.toContain('/search-index.pl.json');
    expect(sitemap).toContain('/about/');
    expect(sitemap).toContain('/pl/about/');
    expect(sitemap).not.toContain('/author/');
    expect(sitemap).not.toContain('/pl/author/');
    expect(sitemap).toContain('/search/');
    expect(sitemap).toContain('/pl/search/');
    expect(sitemap).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(sitemap).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    expect(sitemap).toContain('/articles/are-we-afraid-of-ai-or-of-ourselves/');
    expect(sitemap).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(sitemap.match(/\/articles\/are-we-afraid-of-ai-or-of-ourselves\//g) ?? []).toHaveLength(1);
  });

  test('keeps Practice out of RSS', () => {
    const rss = readDistFile('rss.xml');

    expect(rss).not.toContain('/practice/');
    expect(rss).not.toContain('/pl/practice/');
    expect(rss).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(rss).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    expect(rss).toContain('/articles/are-we-afraid-of-ai-or-of-ourselves/');
    expect(rss).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/articles/trust-in-the-age-of-ready-made-answers/'
      )
    ).toContain('<pubDate>Thu, 02 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/'
      )
    ).toContain('<pubDate>Thu, 02 Jul 2026');
    expect(
      countRssItemsByLink(
        rss,
        'https://promptedpsyche.com/articles/are-we-afraid-of-ai-or-of-ourselves/'
      )
    ).toBe(1);
    expect(
      countRssItemsByLink(
        rss,
        'https://promptedpsyche.com/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
      )
    ).toBe(1);
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/articles/are-we-afraid-of-ai-or-of-ourselves/'
      )
    ).toContain('<pubDate>Sat, 04 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
      )
    ).toContain('<pubDate>Sat, 04 Jul 2026');
  });

  test('keeps X-Robots-Tag scoped to tag archives after launch', () => {
    const config = readVercelConfig();
    const headers = config.headers ?? [];
    const robotHeaders = headers.flatMap((entry: { source: string; headers: Array<{ key: string; value: string }> }) =>
      entry.headers
        .filter((header) => header.key === 'X-Robots-Tag')
        .map((header) => ({
          source: entry.source,
          value: header.value
        }))
    );

    expect(robotHeaders).toEqual([
      { source: '/tags/(.*)', value: 'noindex, follow' },
      { source: '/pl/tags/(.*)', value: 'noindex, follow' }
    ]);
    expect(robotHeaders).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ source: '/(.*)' })])
    );
  });
});
