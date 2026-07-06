import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const isTagArchive = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/tags/') || pathname.startsWith('/pl/tags/');
};

const isSearchIndex = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/search-index') && pathname.endsWith('.json');
};

const isPracticePreview = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/practice/') || pathname.startsWith('/pl/practice/');
};

export default defineConfig({
  site: 'https://promptedpsyche.com',
  redirects: {
    '/author': '/about/',
    '/pl/author': '/pl/about/'
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !isTagArchive(page) && !isSearchIndex(page) && !isPracticePreview(page)
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
