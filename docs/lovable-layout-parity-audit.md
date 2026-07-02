# Lovable Layout Parity Audit

This document records the visual and layout parity pass between the current Astro site and the Lovable prototype for Prompted Psyche.

## Lovable reference location

The local Lovable reference was found at:

`C:/Users/mamcz/AppData/Local/Temp/human-ai-observatory-reference`

A ZIP archive was also found at:

`C:/Users/mamcz/Downloads/Human-AI Observatory.zip`

The already extracted temporary reference was used. The Lovable project was not copied into the Astro repository.

## Reference files used

- `src/styles.css`
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/consulting.tsx`
- `src/routes/concepts.index.tsx`
- `src/routes/concepts.$slug.tsx`
- `src/routes/contact.tsx`
- `src/components/concept-diagram.tsx`
- `src/components/site-nav.tsx`
- `src/components/site-footer.tsx`

## Homepage module comparison

### Lovable homepage modules

1. Hero
2. Who Prompted Psyche is for
3. Areas of focus
4. Consulting teaser
5. Archive
6. Author
7. Final CTA
8. Footer

### Astro homepage modules before this pass

1. Hero
2. Who Prompted Psyche is for
3. Areas of focus
4. Consulting teaser
5. Archive
6. Author
7. Final CTA
8. Footer

The module order was already close. The main differences were in CSS layering, proportions, and leftover older card styles.

## Differences before implementation

### Header

Lovable uses a fixed, light header with a 3.5rem rhythm, a small PP stamp, restrained nav links and mono language controls. Astro had the visual direction, but the previous pass had reintroduced Home and Start links. The current requirement keeps the header to Concepts, Consulting, About and Contact in EN, and Pojecia, Konsulting, O projekcie and Kontakt in PL.

### Hero

Lovable uses a 72rem container, a `1fr 400px` desktop grid, 5rem gap, large Newsreader H1, a compact CTA row and a 400px dossier panel. Astro was close, but the H1 width produced a less intentional line break and the dossier lacked the subtle pre-launch note requested in this pass.

### Dossier panel

Lovable uses a flat `ink/[0.03]` panel, thin ring, 2rem padding, space-y rhythm, concept diagram and small rectangular chips. Astro had the diagram and panel, but needed final spacing cleanup and a compact status note.

### Who section

Lovable uses a staggered 12-column layout with I, II and III entries, thin top lines and no cards. Astro had this structure, but old `.icon-card` and card-grid CSS still existed and could interfere with later maintenance.

### Areas

Lovable uses a calm two-column editorial topic index with numbers, serif labels and italic subtitles. Astro matched the structure, but the stylesheet still contained older topic-map and card-based alternatives.

### Consulting teaser

Lovable uses an editorial text block, process line and underline CTA. Astro had this, but old panel and teaser classes still existed in the global CSS.

### Archive section

Lovable uses editorial archive links with top borders and typographic hierarchy. Astro had the correct routes and draft-safe labels, but old grid and card styles remained in the CSS.

### Author and final CTA

Lovable uses two-column author copy and large editorial links. Astro had the layout, but the author section needed a clearer About link and the final CTA needed to remain visually light.

### Footer

Lovable uses a large serif tagline, FM stamp, inquiry links and a restrained bottom row. Astro was already close, but old footer-nav styles remained in CSS.

## Other page differences

### About

Lovable uses a page hero, editorial split sections, a floating side note, lenses, quote plus diagram, ORCID section and final links. Astro already followed this structure. The main gap was global CSS duplication, not page structure.

### Consulting

Lovable uses a hero with side note, service index, tinted situations section, process line, outcome list, disclaimer and calm CTA. Astro had these modules. The main gap was visual cleanup of old service-card and panel styles.

### Concepts index

Lovable presents concepts as a concept library, not a blog list. Astro already used a two-column concept list, non-clickable tags and Read more labels. The CSS needed to make this feel less card-like and more like an editorial index.

### Concept detail

Lovable concept detail uses a top line with a back link and entry metadata, a large title, tag chips, editorial blocks, APA-style sources and related concepts. Astro used `EntryLayout`, which was functional but less close to the Lovable detail header. This pass adds a concept-specific top line while preserving collections and routes.

### Contact

Lovable uses a page hero, calm reasons list and email panel. Astro had this structure. The CSS needed to keep the email panel restrained and avoid a SaaS card feel.

## CSS differences before implementation

- Fonts: Lovable uses Newsreader, Instrument Sans and JetBrains Mono. Astro declared them, but the CSS still contained many older font-system remnants.
- Container: Lovable uses `max-w-6xl`, equivalent to 72rem, with 1.5rem side padding.
- Section padding: Lovable uses mainly 6rem and 8rem vertical rhythm. Astro had several older clamp and card-era spacing rules.
- H1/H2 scale: Lovable uses large Newsreader headings, 1.02 to 1.12 line-height and medium weight.
- Buttons: Lovable uses compact black primary and thin outlined secondary controls with minimal radius.
- Chips: Lovable chips are rectangular and small. Some older Astro styles used rounded pill chips.
- Cards: Lovable avoids heavy cards. Astro still had old `.icon-card`, `.panel`, `.soft-panel`, `.service-card-grid`, `.path-grid`, `.system-grid` and related card styles.
- Diagrams: Lovable uses thin currentColor SVG line art. Astro `VisualPlate` already contained the Lovable concept diagram.

## Implementation list

- Rebuild `global.css` as one Lovable-style layer instead of stacked overrides.
- Keep Astro routes, content collections and public concept terminology unchanged.
- Keep noindex and Vercel X-Robots-Tag unchanged.
- Keep article drafts unpublished.
- Keep header routing to the agreed public navigation set.
- Add a concept-detail top line to `EntryLayout` for closer Lovable parity.
- Add subtle pre-launch status notes inside the homepage dossier panels.
- Add About links in the homepage author modules.
- Superseded: concept tags are now interactive filters on the Concepts index.

## Not transferred from Lovable

- React
- TanStack Router
- Lovable routing
- Lovable data files
- Prototype-only naming
- V2 or REF labels
- Prototype notes
- Any alternate concept terminology

## Post-implementation parity check

### Now aligned with Lovable

- Fonts load from Google Fonts and use Newsreader, Instrument Sans and JetBrains Mono.
- Core tokens match Lovable: paper, ink, accent, rule, radius and 72rem container.
- Header styling follows the Lovable rhythm while preserving the Astro navigation scope.
- Homepage module order matches the Lovable prototype.
- Hero uses a `1fr 400px` desktop grid, 5rem gap and large Newsreader title.
- Dossier panel uses flat `ink/[0.03]` styling, thin border, 2rem padding, Lovable diagram and small rectangular chips.
- Who section uses the staggered 12-column editorial layout.
- Areas uses the two-column editorial topic index.
- Consulting teaser and consulting page use process-line and service-index patterns rather than heavy cards.
- Concepts index reads as an editorial concept library with tag filters.
- Concept detail pages now include a Lovable-style top line and retain APA references.
- Contact uses a calm reasons list and restrained email panel.
- Footer follows the Lovable two-column rhythm.
- Old card-system remnants were removed from active source, including unused `IconCard` and `CtaPanel` components plus stale `.icon-card`, `.soft-panel`, `.home-shell`, `.home-layout` and `.cta-panel` styling.

### Intentional differences

- Navigation logic, language switcher URLs and Astro route structure remain Astro-native.
- Header links do not copy Lovable exactly because the requested public menu scope is fixed.
- Homepage archive links point to Articles, Notes and Concepts rather than Lovable data-driven sample concepts, because article drafts must remain unpublished.
- Public content, concept titles and terminology remain from Astro content collections.
- No prototype labels, route names or data files were imported.

### Safety status

- Astro stack is preserved.
- Content collections are preserved.
- Public concepts remain EN and PL collection entries.
- Article draft status is preserved.
- Noindex remains in `BaseLayout.astro`.
- Vercel `X-Robots-Tag` remains in `vercel.json`.
- Tags remain informational.
- The pre-launch status remains active.
