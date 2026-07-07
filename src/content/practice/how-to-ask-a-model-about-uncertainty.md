---
title: "How to ask a model about uncertainty"
description: "A practice for asking AI to show assumptions, missing context, caution levels and conditions that can change an answer."
publishedAt: 2026-07-03
draft: true
tags:
  - uncertainty
  - verification
  - trust
  - AI literacy
author: "Feliks Mamczur"
readingTime: "5 min read"
lang: "en"
translationKey: "ask-model-about-uncertainty"
type: "practice"
category: "Practice"
---

A model can answer fluently even when important information is missing. This practice helps you pause when an answer sounds finished and ask: what is known, what is likely, what is assumed, what is missing and what could change the conclusion?

The goal is not to force a confidence score. The goal is better judgment: which parts of the answer are stronger, which parts are tentative and what a person should verify outside the model before taking the next step.

## When this helps

- When an answer concerns a complex situation, decision or interpretation.
- When input data, context or criteria are incomplete.
- When the model sounds more certain than the material allows.
- When you want checking questions before using the answer.

## What to ask the model

Ask the model to separate what is known, what is likely, what is assumed and what is still missing. Do not ask for false precision.

```text
Analyze your previous answer in terms of uncertainty.

Divide it into 6 parts:

1. What follows directly from the information provided.
2. What is a likely interpretation, but not a fact.
3. What assumptions you made.
4. What information is missing that would make the answer stronger.
5. What could change this answer.
6. What I should verify outside the model or with the right person before using this answer.

Do not give me a confidence percentage unless there is a real basis for it. Instead, describe the level of caution in plain language: high caution, medium caution or low caution. Explain what the caution level is based on and what it does not cover. At the end, suggest 5 questions I should ask before taking the next step.
```

## What to check yourself

- Whether the model assumed conditions you did not provide.
- Whether the missing information can be filled quickly.
- Whether the answer depends on data that may be incomplete or outdated.
- Whether the caution level is a helpful description, not a truth measurement.
- Whether the answer confuses missing data with stylistic confidence.
- Whether the decision needs another person, source, procedure or context.

## What can go wrong

- The model may miss its own gaps.
- The assumption list may look complete when it is not.
- A caution label may start to feel like an objective score.
- Too many caveats may paralyze action instead of supporting a reasonable next step.
- The user may treat a more cautious answer as fact-checking.

## Better way to use the answer

The model recommends one direction for a team, but the user gave only a short description of the problem. After using the prompt, it becomes visible that the answer assumed a stable deadline, a small team and no budget constraint. That does not mean the recommendation is false. It means the recommendation depends on conditions that need to be clarified or checked first.

This prompt supports [calibrated trust](/concepts/calibrated-trust/). Instead of treating fluent output as a finished conclusion, the user sees which parts depend on data, context and assumptions. It is also an exercise in [epistemic vigilance](/concepts/epistemic-vigilance/): a model can organize material inside the available [context window](/concepts/context-window/), but it does not know everything the person did not provide.

## Short rule

Do not ask the model for artificial certainty. Ask it to show what the answer depends on and what needs to be known before acting.

## Related Concepts

- [Calibrated trust](/concepts/calibrated-trust/)
- [Epistemic vigilance](/concepts/epistemic-vigilance/)
- [Model Output](/concepts/model-output/)
- [Context window](/concepts/context-window/)
- [Cognitive load](/concepts/cognitive-load/)

## Further Reading

- [Trust in the age of ready-made answers](/articles/trust-in-the-age-of-ready-made-answers/)
- [The model does not remember. It works with context.](/articles/the-model-does-not-remember-it-works-with-context/)
- [Fluent does not mean true](/notes/fluent-does-not-mean-true/)
