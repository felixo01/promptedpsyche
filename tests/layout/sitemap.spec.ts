import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

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

test.describe('built sitemap and RSS policy', () => {
  test('excludes tag archives and Practice drafts from sitemap', () => {
    const sitemap = readBuiltSitemap();

    expect(sitemap).not.toContain('/tags/');
    expect(sitemap).not.toContain('/pl/tags/');
    expect(sitemap).not.toContain('/practice/');
    expect(sitemap).not.toContain('/pl/practice/');
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
    expect(sitemap).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(sitemap).not.toContain(
      'https://promptedpsyche.com/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
    );
  });

  test('keeps Practice drafts out of RSS', () => {
    const rss = readDistFile('rss.xml');

    expect(rss).not.toContain('/practice/');
    expect(rss).not.toContain('/pl/practice/');
    expect(rss).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(rss).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    expect(rss).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(rss).not.toContain(
      'https://promptedpsyche.com/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
    );
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
