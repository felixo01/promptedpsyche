---
title: "How to ask a model about uncertainty"
description: "A practice for asking AI to name assumptions, missing information and conditions that could change an answer without treating model confidence as proof."
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

A model can answer fluently even when important information is missing. This practice helps you ask not only for the answer, but for the assumptions, gaps and conditions that could change it.

The goal is not to get an artificial confidence score. The goal is to see which parts of the answer are better grounded, which parts are tentative and what a person should verify outside the model.

## When to use it

- When an answer concerns a complex situation, decision or interpretation.
- When input data, context or criteria are incomplete.
- When the model sounds more certain than the material allows.
- When you want control questions before taking the next step.

## What not to do

- Do not ask for a percentage of certainty when there is no basis for one.
- Do not treat the model's uncertainty statement as an objective measurement.
- Do not use this practice to move responsibility for a decision onto the model.
- Do not treat a long list of caveats as proof that the answer is good.

## Prompt

```text
Analyze your answer in terms of uncertainty.

List:

1. What assumptions you made.
2. What information is missing that would make the answer stronger.
3. Which parts of the answer are most grounded in the information provided.
4. Which parts are hypotheses or working interpretations.
5. What could change your answer.
6. What I should verify outside the model before using this answer.

Do not give me an artificial confidence percentage. Instead, describe the level of caution in plain language: high caution, medium caution or low caution. At the end, suggest 5 questions I should ask before taking the next step.
```

## Short example

The model recommends one direction for a team, but the user gave only a short description of the problem. After using the prompt, it becomes visible that the answer assumed a stable deadline, a small team and no budget constraint. The model can help name those assumptions and gaps, but it does not prove the recommendation is true. The user gets a checklist for what to verify before deciding.

## Why this helps

This prompt supports [calibrated trust](/concepts/calibrated-trust/). Instead of treating fluent output as a finished conclusion, the user sees which parts depend on data, context and assumptions.

It is also an exercise in [epistemic vigilance](/concepts/epistemic-vigilance/). A model works inside the available [context window](/concepts/context-window/), so it can organize material, but it does not know everything the person did not provide.

## Risk and limitations

- The model may fail to notice its own gaps.
- The assumption list may look complete when it is not.
- A caution label is not a truth measurement or a quality guarantee.
- In high-stakes contexts, verification should leave the chat and involve appropriate people, sources or procedures.

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
