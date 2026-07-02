# Prompted Psyche tag system

Tags are functional publication navigation, not decorative labels.

## Rendering

- Visible tags on article and note indexes must be links.
- Visible tags on article and note detail pages must be links.
- Concept detail tags remain informational unless a separate concept tag route is intentionally added.
- Visible hashtags should be clickable when they belong to publication tags.

## Routes

- EN route: `/tags/[slug]/`
- PL route: `/pl/tags/[slug]/`

Tag pages include public articles and public notes with that tag. Draft content is excluded.

## Slugs

Tag slugs are generated from the visible tag label:

- lowercase
- no Polish diacritics
- spaces and punctuation become hyphens
- repeated separators are collapsed

Examples:

- `AI literacy` -> `ai-literacy`
- `Human-AI Interaction` -> `human-ai-interaction`
- `praca z AI` -> `praca-z-ai`
- `odpowiedzialność` -> `odpowiedzialnosc`

## Language separation

EN tag pages show EN publications only.

PL tag pages show PL publications only.

When an equivalent tag slug exists in both languages, the language switcher may point to the matching tag archive. Otherwise it should point to a safe publication index, not to an unrelated tag page.

