# Editorial prototype C2

This preview introduces a bilingual editorial homepage, shared wordmark/navigation/footer and an article reading template. Existing routes, published content and bibliographic identifiers are retained. Other page types keep their existing compositions.

## Implementation

- `EditorialHome` selects public, localized entries through the existing collection and route helpers. Titles, descriptions and reading times remain owned by content frontmatter.
- `beyondAiShareRecord` supplies the complete research title, author, publication destination and preregistration link. The preprint's lack of formal peer review is explicit.
- The homepage opens with a full-container photographic panorama, 360–440px high on desktop. A solid light panel, 60% of the container width, overlaps only the lower-left 112px of the image. It carries the complete source title, lead, author and reading link. At the existing 1000px breakpoint the photograph and copy stack without overlap; the image is 210px high on mobile. Recommendations remain two open columns, stacking at the existing breakpoint.
- `EditorialImage` uses local raster imports and Astro image optimization: responsive WebP variants, explicit dimensions, an eager/high-priority homepage cover and lazy recommendation/article photographs. The article photograph is at most 288px high, below the homepage cover height. Existing authored article images retain their original behavior.
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
npm run test:layout -- --workers=8
VERCEL_ENV=preview npm run build
node scripts/check-c2-seo.mjs preview
git diff --check
```

The C2 viewport matrix exercises homepage and trust article in both languages at 320, 390, 430, 768, 1280 and 1440px. It checks unclipped titles, mobile content order, reading measure, responsive photographic assets, preservation of the original diagram, navigation, dates, counterparts, DOI ownership, all contents anchors and all 18 references. Existing SEO/Scholar/content/route tests remain in the suite. Assertions for the previous homepage composition and navigation labels are updated to the new visible behavior.

## Photographic art direction — correction of 2026-10-07

This corrects the existing C2 prototype at `2d2ceb97b8e2dc6351fc45f90f41f711102f096a`; it does not restart from the production snapshot. The previous split composition and shared linocut/cut-paper treatment are replaced by a panoramic magazine cover and three distinct staged-photography metaphors:

- Trust: archival source materials partly hidden and refracted by a translucent plum plane in a gallery installation (2172 × 724).
- Authorship: variations of one photographic frame, with a final proof selected and cropped in red (1536 × 1024).
- Learning: overlapping tracing-paper attempts, unfinished constructions and erased graphite under raking light (1536 × 1024).

Light, material, framing and the plum/brick-red palette create continuity without requiring an identical technique. These are generated conceptual images with photographic treatment, not documentary evidence or depictions of research data. The learning marks are a metaphor for practice, not an instructional geometric diagram.

The built-in image-generation tool created the local assets. Exact prompts and generation provenance are documented in [editorial-illustration-prompts.md](editorial-illustration-prompts.md). All three superseded linocut PNGs are deleted. Existing article diagrams retain their original content, captions and alternative text.

The correction preserves wordmark, research band, source text, reading typography, navigation, keyboard behavior, metadata and the SEO fixture. New source-backed coverage exercises trust, authorship, learning and the shorter mirror article in both languages: eight routes across four standard test projects, adding 32 active cases. Checks include complete titles and leads, original diagrams and tables, all references, inBrief, key passages, consulting CTA, citation and rights notices.

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


## Validation record — photographic correction, 2026-10-07

- `npm ci`: passed; no dependencies or lockfile changed.
- Production and `VERCEL_ENV=preview` builds: passed, 242 generated pages plus two existing redirects. Astro check: zero errors, zero warnings, three existing Zod deprecation hints.
- Full `npm run test:layout -- --workers=8`: **1801 passed, 135 skipped, zero failed**. All previous active cases remain; 32 shared-article cases were added. The skip count is unchanged.
- Initial targeted testing identified an incorrect whitespace assumption between adjacent MDX key-passage paragraphs. The new test now compares each source paragraph and its count exactly; the complete suite above passes. No article content was changed to satisfy a test.
- Production and preview SEO comparisons both passed: 244 HTML routes, six discovery outputs and 113 content sources unchanged. Preview layout pages retain `noindex, nofollow` for robots/googlebot; the two pre-existing Astro redirect pages retain `noindex`.
- Browser matrix: 10 routes at 320, 390, 430, 768, 1280 and 1440px, **60 combinations with no horizontal overflow or broken images**.
- Screenshots inspected: both homepages and all eight article routes at 1440/390px, including bibliography and closing components; trust additionally checked with its original diagram, expanded inBrief and key passage. Source-backed checks preserve trust's 18, authorship's 17, learning's 22 and mirror's 12 references in each language.
- At 1440px the homepage photograph is 440px high, the 60% copy panel overlaps 112px and covers about 15% of its area. Recommendations begin at y=845px in PL and y=815px in EN. At 390px the photograph is 210px high with no overlap, and recommendations follow the complete source copy at y=843px/716px. The article photograph is 288px on desktop and 176px at 390px.
- Visual judgment: the full-width staged photograph establishes the magazine cover; three distinct physical metaphors replace the shared printmaking style. Long titles remain complete, open recommendations retain whitespace and the research band remains quieter than the cover. The preserved trust SVG has very small labels on mobile; this is an existing source-asset limitation.
- Panorama `sizes` includes the intrinsic width needed for `object-fit: cover`, avoiding undersized mobile crops. Verified 800w WebP at 390px/DPR 1, 1600w for the 1440px homepage and 1200w for its article image.
- Targeted accessibility audit: 16 page/viewport combinations, zero computed AA text-contrast failures, zero overflow, successful skip-link focus and menu Escape/focus restoration, reduced motion respected. This is targeted verification, not a WCAG certification.
- `git diff --check`: passed. Protected content, source metadata, `BaseLayout`, route helpers, publication registry, SEO script and fixture, wordmark/navigation styles, and deployment configuration are unchanged by this correction.

## Files in this correction

Modified:

- `docs/editorial-illustration-prompts.md`
- `docs/editorial-redesign-c2.md`
- `src/components/EditorialImage.astro`
- `src/layouts/EntryLayout.astro`
- `src/styles/editorial-home.css`
- `src/styles/editorial-article.css`
- `tests/layout/c2-editorial.spec.ts`

Added:

- `src/assets/editorial/c2-trust-mediated-knowledge.png`
- `src/assets/editorial/c2-authorship-selected-frame.png`
- `src/assets/editorial/c2-learning-work-in-progress.png`
- `tests/layout/c2-article-coverage.spec.ts`

Deleted:

- `src/assets/editorial/c2-trust-hidden-sources.png`
- `src/assets/editorial/c2-authorship-final-decision.png`
- `src/assets/editorial/c2-learning-active-reasoning.png`
