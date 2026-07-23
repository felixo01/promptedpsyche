import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { showPractice } from '../../src/lib/features';

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
      expect(sitemap).toContain('/practice/how-to-check-whether-the-model-has-enough-context/');
      expect(sitemap).toContain('/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/');
      expect(sitemap).toContain('/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/');
      expect(sitemap).toContain('/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/');
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
    expect(sitemap).toContain('/projects/humanai-lab/');
    expect(sitemap).toContain('/pl/projects/humanai-lab/');
    expect(sitemap).toContain('/topics/');
    expect(sitemap).toContain('/pl/topics/');
    expect(sitemap).toContain('/topics/trust-in-ai/');
    expect(sitemap).toContain('/pl/topics/zaufanie-do-ai/');
    expect(sitemap).toContain('/topics/ai-and-cognition/');
    expect(sitemap).toContain('/pl/topics/ai-i-myslenie/');
    expect(sitemap).toContain('/topics/human-agency-and-responsibility/');
    expect(sitemap).toContain('/pl/topics/sprawczosc-i-odpowiedzialnosc/');
    expect(sitemap).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(sitemap).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    expect(sitemap).toContain('/articles/are-we-afraid-of-ai-or-of-ourselves/');
    expect(sitemap).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(sitemap).toContain('/articles/dont-ask-whether-ai-makes-us-dumber/');
    expect(sitemap).toContain('/pl/articles/nie-pytaj-czy-ai-nas-oglupia/');
    expect(sitemap).toContain('/notes/openai-chatgpt-gpt-llm-difference/');
    expect(sitemap).toContain('/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/');
    expect(sitemap).not.toContain('/articles/openai-chatgpt-gpt-llm-difference/');
    expect(sitemap).not.toContain('/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/');
    expect(sitemap).toContain('/notes/the-model-does-not-remember-it-works-with-context/');
    expect(sitemap).toContain('/pl/notes/model-nie-pamieta-model-ma-kontekst/');
    expect(sitemap).not.toContain('/articles/the-model-does-not-remember-it-works-with-context/');
    expect(sitemap).not.toContain('/pl/articles/model-nie-pamieta-model-ma-kontekst/');
    expect(sitemap).toContain('/articles/when-search-becomes-an-answer/');
    expect(sitemap).toContain('/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/');
    expect(sitemap).toContain('/concepts/llm/');
    expect(sitemap).toContain('/pl/concepts/llm/');
    expect(sitemap.match(/\/articles\/are-we-afraid-of-ai-or-of-ourselves\//g) ?? []).toHaveLength(1);
  });

  test('keeps Practice out of RSS', () => {
    const rss = readDistFile('rss.xml');

    expect(rss).not.toContain('/practice/');
    expect(rss).not.toContain('/pl/practice/');
    expect(rss).not.toContain('/topics/');
    expect(rss).not.toContain('/pl/topics/');
    expect(rss).toContain('/articles/trust-in-the-age-of-ready-made-answers/');
    expect(rss).toContain('/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/');
    expect(rss).toContain('/articles/are-we-afraid-of-ai-or-of-ourselves/');
    expect(rss).toContain('/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/');
    expect(rss).toContain('/articles/dont-ask-whether-ai-makes-us-dumber/');
    expect(rss).toContain('/pl/articles/nie-pytaj-czy-ai-nas-oglupia/');
    expect(rss).toContain('/notes/openai-chatgpt-gpt-llm-difference/');
    expect(rss).toContain('/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/');
    expect(rss).not.toContain('/articles/openai-chatgpt-gpt-llm-difference/');
    expect(rss).not.toContain('/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/');
    expect(rss).toContain('/notes/the-model-does-not-remember-it-works-with-context/');
    expect(rss).toContain('/pl/notes/model-nie-pamieta-model-ma-kontekst/');
    expect(rss).not.toContain('/articles/the-model-does-not-remember-it-works-with-context/');
    expect(rss).not.toContain('/pl/articles/model-nie-pamieta-model-ma-kontekst/');
    expect(rss).toContain('/articles/when-search-becomes-an-answer/');
    expect(rss).toContain('/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/articles/when-search-becomes-an-answer/'
      )
    ).toContain('<pubDate>Wed, 22 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/'
      )
    ).toContain('<pubDate>Wed, 22 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/notes/openai-chatgpt-gpt-llm-difference/'
      )
    ).toContain('<pubDate>Wed, 22 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/'
      )
    ).toContain('<pubDate>Wed, 22 Jul 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/notes/the-model-does-not-remember-it-works-with-context/'
      )
    ).toContain('<pubDate>Sat, 28 Mar 2026');
    expect(
      readRssItemByLink(
        rss,
        'https://promptedpsyche.com/pl/notes/model-nie-pamieta-model-ma-kontekst/'
      )
    ).toContain('<pubDate>Sat, 28 Mar 2026');
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

  test('copies the AI thinking diagram without executable or external assets', () => {
    const svg = readDistFile('images/articles/ai-thinking-practice.svg');

    expect(svg).toContain('viewBox="0 0 1600 900"');
    expect(svg).toContain('<title id="title">');
    expect(svg).toContain('<desc id="desc">');
    expect(svg).not.toContain('<script');
    expect(svg).not.toContain('<image');
    expect(svg).not.toContain('xlink:href');
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

  test('defines permanent platform redirects for the former article routes', () => {
    const config = readVercelConfig();

    expect(config.redirects).toEqual([
      {
        source: '/articles/openai-chatgpt-gpt-llm-difference/',
        destination: '/notes/openai-chatgpt-gpt-llm-difference/',
        permanent: true
      },
      {
        source: '/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/',
        destination: '/pl/notes/openai-chatgpt-gpt-llm-czym-sie-roznia/',
        permanent: true
      },
      {
        source: '/articles/the-model-does-not-remember-it-works-with-context/',
        destination: '/notes/the-model-does-not-remember-it-works-with-context/',
        permanent: true
      },
      {
        source: '/pl/articles/model-nie-pamieta-model-ma-kontekst/',
        destination: '/pl/notes/model-nie-pamieta-model-ma-kontekst/',
        permanent: true
      }
    ]);
  });
});
