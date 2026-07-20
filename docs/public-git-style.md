# Public Git history style

Prompted Psyche is a public publication project. Its repository, pull requests and commit history are part of the project's public record and professional presentation.

This guide defines how to describe changes without exposing private strategy, backstage discussion or unnecessary editorial process.

## Core principles

### Describe the public outcome

A pull request title should explain what becomes better, clearer or available to a reader, contributor or site visitor.

Prefer:

- `content: publish a bilingual research note`
- `site: improve consulting and contact journey`
- `seo: add topic hubs and guided navigation`

Avoid titles that merely repeat an internal instruction, correction request or temporary implementation step.

### Keep backstage language private

Do not expose private strategic decisions, unpublished positioning discussions, personal-status deliberations or internal planning in branch names, PR titles, commit titles or public documentation.

When a change originates in private backstage work, describe only its publication-ready result in the public repository.

### Working branches may contain working commits

Feature branches may contain practical commits used during development and review. Before merge, review the complete public history and make sure the final title represents the delivered result.

Prefer squash merge when a branch contains checkpoints, experiments, repeated corrections or mechanical merge commits. The squash commit title must be publication-ready.

A merge commit can remain appropriate when preserving a meaningful branch history is deliberate. It should not be used merely to retain noisy working commits.

### Do not rewrite ordinary historical imperfections

An old commit with a weak but harmless title does not normally justify rewriting public history. Rewrite history only through a separate, reviewed security or privacy procedure when sensitive data, credentials or material that must be removed is present.

## Recommended title format

Use a short scope followed by a concrete public outcome:

```text
content: ...
site: ...
seo: ...
docs: ...
research: ...
accessibility: ...
performance: ...
```

Use sentence fragments, not full release notes. Keep the title specific enough to understand without opening the diff.

## Good examples

- `content: publish bilingual note on AI sycophancy`
- `content: improve Polish language quality in AI thinking article`
- `site: refine public author positioning`
- `site: improve consulting and contact journey`
- `seo: add topic hubs and guided navigation`
- `docs: define public Git history standards`
- `research: clarify source limitations in trust article`
- `accessibility: improve article figure descriptions`
- `performance: reduce article image transfer size`

## Bad examples

- `final fix`
- `remove wrong text`
- `oops`
- `another update`
- `cleanup stuff`
- `fix copy`
- `final final version`
- `remove private note`
- `change positioning`
- `checkpoint`

These titles are weak because they are unclear, expose internal process or frame the public record around a mistake instead of the delivered result.

## Pull request titles

Before opening or updating a pull request:

1. Describe the public outcome, not the instruction that initiated the work.
2. Remove backstage language and private context.
3. Avoid labels such as `fix`, `wrong`, `final` or `remove` unless the title provides necessary public context and no clearer outcome-based wording exists.
4. Keep the title accurate for the complete diff.
5. Revisit the title when the PR scope changes.

## Commit titles

For a final squash commit:

- use one of the recommended scopes;
- describe the result in the present tense;
- avoid checkpoint language;
- avoid editorial self-commentary;
- do not include private names, local paths, credentials or unpublished strategy.

Examples:

```text
content: publish AI thinking article
site: improve mobile article layout
seo: add bilingual topic hubs
docs: document article graphics standards
```

## Pre-merge review

Before merging a public PR, confirm that:

- the PR title describes the complete public outcome;
- the PR body contains no private strategy or backstage notes;
- the chosen merge method produces a professional final commit title;
- no local paths, credentials, private data or embargoed material are included;
- obsolete working branches can be reviewed for later removal after merge.
