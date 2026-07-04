import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://promptedpsyche.com',
  redirects: {
    '/author': '/about/',
    '/pl/author': '/pl/about/'
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
