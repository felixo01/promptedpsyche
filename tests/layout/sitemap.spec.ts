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

test.describe('built sitemap and RSS policy', () => {
  test('excludes tag archives and Practice drafts from sitemap', () => {
    const sitemap = readBuiltSitemap();

    expect(sitemap).not.toContain('/tags/');
    expect(sitemap).not.toContain('/pl/tags/');
    expect(sitemap).not.toContain('/practice/');
    expect(sitemap).not.toContain('/pl/practice/');
    expect(sitemap).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(sitemap).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
  });

  test('keeps Practice drafts out of RSS', () => {
    const rss = readDistFile('rss.xml');

    expect(rss).not.toContain('/practice/');
    expect(rss).not.toContain('/pl/practice/');
    expect(rss).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(rss).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
  });
});
