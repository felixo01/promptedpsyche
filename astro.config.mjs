import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { addReliableLastmod } from './src/lib/sitemap';

const isTagArchive = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/tags/') || pathname.startsWith('/pl/tags/');
};

const isSearchIndex = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/search-index') && pathname.endsWith('.json');
};

const isSearchPage = (page) => {
  const { pathname } = new URL(page);
  return pathname === '/search/' || pathname === '/pl/search/';
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
      filter: (page) => !isTagArchive(page) && !isSearchIndex(page) && !isSearchPage(page),
      serialize: addReliableLastmod
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
