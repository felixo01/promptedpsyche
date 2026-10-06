# Editorial prototype C2

This preview introduces a bilingual editorial homepage, shared wordmark/navigation/footer and an article reading template. Existing routes, published content and bibliographic identifiers are retained. Other page types keep their existing compositions.

## Implementation

- `EditorialHome` selects public, localized entries through the existing collection and route helpers. Titles, descriptions and reading times remain owned by content frontmatter.
- `beyondAiShareRecord` supplies the complete research title, author, publication destination and preregistration link. The preprint's lack of formal peer review is explicit.
- The homepage pairs the complete essay title, lead, author and reading link with a conceptual print illustration. Text and illustration sit alongside each other on desktop and stack naturally on mobile. Recommendations remain open columns.
- `EditorialImage` uses local raster imports and Astro image optimization: responsive WebP variants, explicit dimensions, an eager/high-priority cover and lazy recommended images.
- The article layout derives its contents list from rendered H2 elements, including existing HTML section headings. The complete body is retained. The original trust diagram appears after the introduction, with its original caption and alternative text.
- Article text uses a 700px maximum measure, 20px/1.6 on desktop and 19px/1.6 on mobile. Other entry types retain their reading layout.
- Navigation becomes a keyboard-operable disclosure below 1100px, with Escape restoring focus. Search and language alternatives stay available outside the disclosure. Without JavaScript the navigation remains visible.

## Preview indexing

`BaseLayout` resolves `robots` and `googlebot` to `noindex, nofollow` only when `process.env.VERCEL_ENV === 'preview'`. In every other environment the existing page-provided indexing rules are retained, including search/tag exclusions and publication-specific rules. Canonical and language-alternate URLs continue to point to the public domain.

The environment signal is documented in [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_env). No deployment, domain, DNS or production-branch configuration is changed by this prototype.

## Regression validation

The compact fixture `tests/fixtures/c2-seo-baseline.json` was captured from the unchanged `2d971cbf81fe25f1e3e3a2ff05ceb83d6f544805` build. It covers 244 HTML routes, six discovery outputs and 113 source files. It checks the head metadata, canonical/hreflang, JSON-LD, citation fields, indexing policy, RSS/sitemap/search outputs, redirect configuration and unchanged publication/content sources.

```sh
npm ci
npm run build
node scripts/check-c2-seo.mjs production
npm run test:layout
VERCEL_ENV=preview npm run build
node scripts/check-c2-seo.mjs preview
```

The C2 viewport matrix exercises homepage and trust article in both languages at 320, 390, 430, 768, 1280 and 1440px. It checks unclipped titles, mobile content order, reading measure, responsive illustrations, preservation of the original diagram, navigation, dates, counterparts, DOI ownership, all contents anchors and all 18 references. Existing SEO/Scholar/content/route tests remain in the suite. Assertions for the previous homepage composition and navigation labels are updated to the new visible behavior.

## Illustration policy

The three illustrations address specific ideas in the selected articles: sources hidden by a neat answer; human selection and revision of a creative work; and the difference between a completed solution and practicing the reasoning. They share linocut and cut-paper textures, charcoal/plum ink and a restrained terracotta accent. They are conceptual illustrations, not documentary photographs or study data.

The built-in image-generation tool created the local assets. Exact prompts and the learning illustration's final correction are documented in [editorial-illustration-prompts.md](editorial-illustration-prompts.md). The initial decorative photographs are removed. Existing article diagrams retain their original content, captions and alternative text.

## Validation record — 2026-10-06

- `npm ci`: passed; no dependency or lockfile changes.
- `npm run build`: passed, zero errors/warnings; the three existing Zod deprecation hints remain in `src/content.config.ts`.
- Full `npm run test:layout -- --workers=8`: **1769 passed, 135 skipped, zero failed**. Skips include matrices intentionally restricted to one project to avoid repeating their explicit viewport sets.
- Production SEO comparison: all 244 routes passed, with unchanged existing indexing exceptions, six discovery outputs and 113 content files.
- `VERCEL_ENV=preview npm run build` and preview SEO comparison: passed. Both robots and googlebot are `noindex, nofollow` on layout pages; Astro's two existing redirect pages retain their own `noindex`.
- Both homepages, both trust articles and Beyond AI Share explicitly checked in preview HTML.
- Visual review: both languages, homepage and article, at desktop and 390px; bibliographies inspected separately. Full titles wrap, the article measure stays readable and the research section remains subordinate to editorial reading.
- Four C2 pages checked at all six required widths. Both trust articles contain all 16 section links, the original diagram and 18 bibliography entries.
- Targeted accessibility audit: 16 page/viewport combinations, no horizontal overflow or computed AA text-contrast failures; skip links, keyboard menu, Escape/focus, reduced motion, image alternative text/dimensions and reflow checked. This is a targeted audit, not a WCAG certification.
- All 20 rendered public article bodies compared with the original text, accounting for the relocated figure/caption: unchanged.
- `git diff --check`: passed.

Existing content pages use the shared system, but this iteration does not manually redesign every archive or project page.
