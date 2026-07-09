# Practice release candidate audit

Date: 2026-07-09  
Repository: `C:/Users/mamcz/Documents/promptedpsyche`  
Branch: `main`  
Mode: pre-launch review only

## Current status

- Practice content exists as 10 PL/EN pairs in `src/content/practice/*.md` (20 entries total).
- All Practice entries are currently drafts: `draft: true`.
- Route generation is guarded by `SHOW_PRACTICE`:
  - `src/lib/features.ts` (`showPractice = process.env.SHOW_PRACTICE === 'true'`)
  - `src/pages/practice/[...slug].astro`
  - `src/pages/pl/practice/[...slug].astro`
- Practice uses its own collection schema in `src/content.config.ts`:
  - `lang`, `translationKey` (required), `type: 'practice'`, `category: 'Practice'` (EN) / `Praktyka` (PL)
- Current launch behavior:
  - when `SHOW_PRACTICE` is false, no practice routes are generated and no practice content is exposed
  - when true, routes render in noindex mode (`meta robots: noindex, nofollow`)
  - sitemap and RSS still do not expose practice routes (filtering configured in `astro.config.mjs` via integration filter)

## PL/EN Practice pairs

1. `checking-ai-answer-sources`  
   - EN: `How to check whether an AI answer has sources` (`/practice/how-to-check-whether-an-ai-answer-has-sources/`)
   - PL: `Jak sprawdzić, czy odpowiedź AI ma źródła` (`/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/`)
2. `fluency-is-not-truth`  
   - EN: `How not to confuse fluency with truth` (`/practice/how-not-to-confuse-fluency-with-truth/`)
   - PL: `Jak nie pomylić płynności z prawdą` (`/pl/practice/jak-nie-pomylic-plynnosci-z-prawda/`)
3. `analyze-message-without-diagnosing`  
   - EN: `How to analyze a message without diagnosing a person` (`/practice/how-to-analyze-a-message-without-diagnosing-a-person/`)
   - PL: `Jak analizować wiadomość bez diagnozowania człowieka` (`/pl/practice/jak-analizowac-wiadomosc-bez-diagnozowania-czlowieka/`)
4. `ask-model-about-uncertainty`  
   - EN: `How to ask a model about uncertainty` (`/practice/how-to-ask-a-model-about-uncertainty/`)
   - PL: `Jak poprosić model o niepewność` (`/pl/practice/jak-poprosic-model-o-niepewnosc/`)
5. `practice-counterargument`  
   - EN: `How to ask AI for a counterargument` (`/practice/how-to-ask-ai-for-a-counterargument/`)
   - PL: `Jak poprosić AI o kontrargument` (`/pl/practice/jak-poprosic-ai-o-kontrargument/`)
6. `practice-assumptions`  
   - EN: `How to check your assumptions with AI` (`/practice/how-to-check-your-assumptions-with-ai/`)
   - PL: `Jak sprawdzić własne założenia z pomocą AI` (`/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/`)
7. `practice-context-check`  
   - EN: `How to check whether the model has enough context` (`/practice/how-to-check-whether-the-model-has-enough-context/`)
   - PL: `Jak sprawdzić, czy model ma wystarczający kontekst` (`/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/`)
8. `practice-decision-ownership`  
   - EN: `How to use AI without handing over the decision` (`/practice/how-to-use-ai-without-handing-over-the-decision/`)
   - PL: `Jak użyć AI bez oddawania mu decyzji` (`/pl/practice/jak-uzyc-ai-bez-oddawania-mu-decyzji/`)
9. `separate-facts-from-interpretations`  
   - EN: `How to separate facts from interpretations` (`/practice/how-to-separate-facts-from-interpretations/`)
   - PL: `Jak oddzielić fakty od interpretacji` (`/pl/practice/jak-oddzielic-fakty-od-interpretacji/`)
10. `ai-as-second-reader`  
    - EN: `How to use AI as a second reader` (`/practice/how-to-use-ai-as-a-second-reader/`)
    - PL: `Jak użyć AI jako drugiego czytelnika` (`/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/`)

## Content readiness verdict

**Verdict:** Ready for structured release candidate process, not yet public.

- Clarity: good. The copy is instructional and role-based, with explicit guardrails and limits.
- Tone: practical and restrained.
- Human readability: good; the exercise format and headings are consistent.
- No therapy/diagnosis overclaim in claims body:
  - at least one explicit anti-therapy rule exists per pair (no personality/intent diagnosis, no hidden motive claims)
  - many prompts warn that model output is a draft and not final judgment
- No fake certainty:
  - recurring wording avoids absolute confidence and asks for verification outside model output
- No overpromising: no claims of guaranteed outcomes
- No misleading AI claims: limitations and context dependency are repeatedly spelled out
- No major awkward language issues detected in the 10 pairs

## Positioning check

Each practice pair supports the Prompted Psyche thesis:

- AI / language models: central to all prompts
- Cyberpsychology: especially in communication, uncertainty management, responsibility
- Human-AI Interaction: explicit in communication/deepening decision workflows
- Trust / trust calibration: tags and body language repeatedly reference uncertainty and verification
- Decision-making: explicit in decision ownership and assumptions/context pair
- Uncertainty: core topic in dedicated pairs
- Communication: dedicated pair on message analysis and broader team communication workflows
- Thinking with AI: all pairs frame AI as instrument for structured human reasoning, not final authority

## Naming

Recommended Polish label for launch:

- **Praktyka**

Reason:
- Matches existing internal route labels and `Header` nav language model expectations.
- Better fits the section function than "Ćwiczenia"; this is not only drills but a reflective method layer linked to AI work.
- Category already set as `Praktyka` in PL content.

## Recommended launch model

**Recommended: soft public launch without nav link**.

Rationale:
- Editorial quality is adequate.
- We should avoid immediate nav/crawling exposure until post-launch verification.
- Current system already supports this state safely with `SHOW_PRACTICE` + `robots` metadata.

## Technical launch checklist

### Required before publication

1. Draft flags
   - set `draft: false` for all 20 practice files in `src/content/practice/`
2. Feature flag
   - set `SHOW_PRACTICE=true` in deployment environment
3. Routes to verify after activation
   - `/practice/`
   - `/pl/practice/`
   - `/practice/[slug]/`
   - `/pl/practice/[slug]/`
4. Header/footer/navigation
   - keep nav hidden for now (no visible nav link) for this launch mode
5. SEO / indexing
   - keep `robots="noindex, nofollow"` on both index and detail pages during soft/noindex launch
   - confirm sitemap and RSS remain unchanged (practice excluded) until explicit indexable launch
6. Canonical/alternate links
   - keep existing language alternates from pages:
     - EN ↔ `/practice/`
     - PL ↔ `/pl/practice/`
7. Metadata
   - keep current practice titles and descriptions unless editorial exceptions are approved
   - ensure all 20 pages retain consistent description and label (`Practice` / `Praktyka`)
8. Safety checks
   - 404/403 behavior with `SHOW_PRACTICE=false`
   - page render with `SHOW_PRACTICE=true` (English and Polish)
   - check `meta[name="robots"]` and OG/Twitter basic fields for consistency

### Release hardening tasks

- Add explicit CI/launch smoke for `showPractice` toggling
- Add optional practice discovery page card behind a feature switch for later launch mode
- Consider nav addition in a separate task after usage review

### Mobile/viewport checks (required in launch verification)

- 390, 430, 768, 1440
- practice index and detail pages:
  - no horizontal overflow
  - readable article body width
  - language switch works both directions
- no clipping of aside or CTA blocks on practice list cards

## Required fixes before publication

- None mandatory for textual safety.
- Mandatory technical changes are the ones listed above (`draft`, feature flag + route verification).
- Keep noindex until final model decision.

## Optional fixes after launch

- Decide whether to add nav link in a controlled phase.
- Decide launch mode conversion to indexable publication:
  - enable indexable mode only after manual quality and legal review
  - remove practice noindex and sitemap filtering together in one guarded release step
- Add practice section notes in About or release notes when promoting in strategy docs.

## Suggested future Codex task (do not execute now)

Create a launch task:

- Title: `Publish Practice section to production (RC noindex)`.
- Scope:
  - `src/content/practice/*.md` (`draft: false`)
  - `.env / deployment variables` (`SHOW_PRACTICE=true`)
  - verify outputs: `/practice/`, `/pl/practice/`, entry URLs
- No change to article pages, search policy, or global site launch intent.
- Safety checks in the same task:
  - build and test
  - confirm 404 behavior with `SHOW_PRACTICE=false` in pre-launch environment
  - confirm noindex and route accessibility behavior in launched environment

## Verification performed

- `npm run build` ✅
- `npm run test:layout` ✅ (1180 passed, 12 skipped)
  - practice draft safety verified in test suite (`tests/layout/practice.spec.ts`)
  - overflow checks passed for global layouts including page set with current configuration
