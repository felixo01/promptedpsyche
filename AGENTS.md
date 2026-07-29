# AGENTS.md

Instructions for Codex and future agents working in the public `promptedpsyche` repository.

## DOI / Zenodo Title Protection

Before changing the title of any article, note or publication:

1. Inspect its frontmatter for `doi`, `doiUrl`, `relatedDoi` and `relatedDoiLabel`.
2. Check whether the English publication owns a direct DOI, has a Zenodo bibliographic record, a deposited PDF or another Version of Record.
3. If the English publication owns a direct DOI, verify the canonical title against the DOI or Zenodo metadata and the deposited PDF.

For an English publication with a direct DOI, do not independently change:

- `title`;
- the visible H1;
- a title-derived slug;
- `citation_title`;
- HTML or structured-data title metadata;
- any other publication identifier.

Return `BLOCKED - DOI TITLE CHANGE`, explain which record protects the title and wait for an explicit author decision. Do not automatically repair a mismatch; report it for author review.

`relatedDoi` has a different meaning. In a Polish companion publication it points to the DOI of the English version and is not the Polish page's own DOI. A Polish title may therefore be edited when the author requests it, even when `relatedDoi` or a label mentioning DOI is present. Never propagate that edit to the protected English title automatically.

Lead, abstract, body, style, language, corrections, references, non-identifying SEO, accessibility and text structure may still be edited. These edits must not indirectly change protected identifiers.

## Required Editorial Check

For every future title task:

1. Determine whether the file owns a direct DOI or only references another version through `relatedDoi`.
2. Apply the title lock only to the English publication that owns the direct DOI.
3. Continue non-identifying edits when they remain within the user's request.
4. Keep Polish and English variants explicit; never infer that a Polish title change authorizes an English DOI-title change.

