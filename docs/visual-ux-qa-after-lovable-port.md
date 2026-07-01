# Visual and UX QA after Lovable port

Date: 2026-07-01

## Scope

This QA pass reviewed the Astro implementation after the Lovable layout parity pass. The goal was not a redesign, but a production-readiness check for visual stability, readability, responsive behavior and obvious layout regressions.

## Checked views

EN:

- `/`
- `/about`
- `/consulting`
- `/contact`
- `/concepts`
- `/concepts/ai-literacy`
- `/concepts/ai-mediated-communication`

PL:

- `/pl`
- `/pl/about`
- `/pl/consulting`
- `/pl/contact`
- `/pl/concepts`
- `/pl/concepts/ai-literacy`
- `/pl/concepts/ai-mediated-communication`

## Checked viewports

- 1440px desktop
- 1280px laptop
- 1024px tablet landscape
- 768px tablet
- 390px mobile

The audit used the local Astro dev server and browser measurements for scroll width, element boxes, process labels, H1 scale, concept card counts, tag link behavior and visible overflow.

## Layout bugs found before fixes

1. The homepage and consulting process line used a fixed five-column grid. It was visually fragile for Polish labels such as `Odpowiedzialność` and for longer consulting steps such as `Ryzyka i odpowiedzialność`.
2. At 1024px the process line gave each step about 192px. This was technically fitting, but too close to the limit for PL copy and could produce the reported visual merge, for example `OdpowiedzialnośćZasady`, depending on rendering conditions.
3. Long concept detail pages had horizontal overflow on 390px mobile. The measured scroll width was about 405px on `/concepts/ai-mediated-communication` and `/pl/concepts/ai-mediated-communication`.
4. The overflow came from grid children in concept detail pages. `.article-grid` was correctly sized, but `.article-aside` and `.prose` could keep a larger intrinsic width.
5. Subpage H1 headings used almost the same maximum scale as the homepage hero. This made About, Consulting, Contact and concept detail pages feel heavier than needed.
6. Section H2 headings were readable, but slightly too dominant after the Lovable port on content-heavy sections.

## Readability and UX findings

- Header behavior was stable across EN and PL. It did not cover the hero, and the active link treatment remained readable.
- Homepage hero was stable across desktop, tablet and mobile. The dossier panel collapsed cleanly on mobile.
- The Who section kept its editorial stagger on desktop and became a logical single column on mobile.
- Areas looked intentional as an editorial topic index. No random gaps or card-like dashboard behavior were detected.
- Archive, Author and Final CTA sections stayed project-first and did not expose draft articles.
- Consulting content was understandable, but the process line needed stronger responsive behavior to avoid becoming decorative or cramped.
- Concepts index behaved like a glossary rather than a blog list. There were 10 concept cards in EN and 10 in PL.
- Concept tags were informational and non-clickable.
- Concept detail APA references and related concepts remained readable after the mobile overflow fix.
- Contact pages had visible contact structure and did not look like an empty form.

## PL-specific issues

- PL process labels are longer than EN labels and need to drive responsive spacing decisions.
- PL consulting process descriptions are longer and need wider wrapping behavior than the EN equivalent.
- PL subpage H1 headings, especially `/pl/consulting` and `/pl/contact`, needed a calmer page-heading scale.

## Fixes implemented

1. Changed `.process-line` from a rigid five-column grid to a responsive grid:
   - `repeat(auto-fit, minmax(min(100%, 12rem), 1fr))`
   - steps can wrap before labels become cramped
   - mobile remains one column
2. Reduced process label scale:
   - from `clamp(1.25rem, 2.4vw, 1.9rem)`
   - to `clamp(1.2rem, 1.8vw, 1.65rem)`
3. Added safer process step sizing:
   - `min-width: 0`
   - more bottom padding
   - `overflow-wrap: anywhere`
4. Reduced subpage H1 scale:
   - page hero H1 now uses `clamp(2.9rem, 5.4vw, 4.1rem)`
   - entry detail H1 now uses `clamp(2.75rem, 5.4vw, 4.1rem)`
5. Reduced section heading scale:
   - H2 scale now uses `clamp(2.05rem, 3.6vw, 3rem)`
6. Fixed concept detail mobile overflow:
   - `.article-aside` gets `min-width: 0`
   - `.prose` gets `width: 100%`, `min-width: 0` and `overflow-wrap: break-word`

## Post-fix verification

- No process label collisions were detected on checked pages and widths.
- No horizontal overflow was detected at 1440, 1280, 1024, 768 or 390px on the checked views.
- `/pl` process labels no longer risk visual merging in the organization application section.
- `/pl/consulting` process labels and descriptions remain readable.
- `/concepts/ai-mediated-communication` and `/pl/concepts/ai-mediated-communication` no longer produce mobile overflow at 390px.
- H1 scale is now calmer on subpages while the homepage remains the strongest typographic moment.
- Concepts index still renders 10 entries in EN and 10 entries in PL.
- Concept detail pages still render related concepts and APA references.
- Tags remain non-clickable metadata.

## Safety status

- Astro stack remains unchanged.
- Content collections remain unchanged.
- Public concept terminology remains unchanged.
- No concepts were added.
- Article drafts remain unpublished.
- Noindex remains active in `BaseLayout.astro`.
- Vercel `X-Robots-Tag` remains active in `vercel.json`.
- RSS and sitemap behavior remains draft-safe after build verification.
- No prototype labels, version markers or Lovable routing were introduced.
