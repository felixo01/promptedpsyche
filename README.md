# Prompted Psyche

Prompted Psyche is an Astro MVP for an expert publication and consulting hub by Feliks Mamczur about AI, cyberpsychology and Human-AI Interaction.

Core positioning:

> We prompt machines. Machines prompt us back.

## Stack

- Astro
- TypeScript
- Markdown/MDX content collections
- RSS feed at `/rss.xml`
- Sitemap through `@astrojs/sitemap`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content

Content is organized into three collections:

- `src/content/articles`
- `src/content/notes`
- `src/content/concepts`

Each entry uses frontmatter for title, description, publication date, draft state and tags. Markdown and MDX files are supported.

## Pages

- `/`
- `/articles/`
- `/articles/[slug]/`
- `/notes/`
- `/notes/[slug]/`
- `/concepts/`
- `/concepts/[slug]/`
- `/about/`
- `/consulting/`
- `/contact/`

## Polish Structure

English is the primary language. The `src/pages/pl` directory is reserved so Polish pages can be added later under `/pl`.

## Site URL

The default production URL is set to `https://promptedpsyche.com` in `astro.config.mjs` and `src/lib/site.ts`. Update both if the final domain changes.
