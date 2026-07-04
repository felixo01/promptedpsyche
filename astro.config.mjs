import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const isTagArchive = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/tags/') || pathname.startsWith('/pl/tags/');
};

export default defineConfig({
  site: 'https://promptedpsyche.com',
  redirects: {
    '/author': '/about/',
    '/pl/author': '/pl/about/'
  },
  integrations: [mdx(), sitemap({ filter: (page) => !isTagArchive(page) })],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
