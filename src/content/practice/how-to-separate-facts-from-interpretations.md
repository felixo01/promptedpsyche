---
title: "How to separate facts from interpretations"
description: "A practice for organizing material before a decision: what is fact, what is interpretation, what is hypothesis and what is still missing."
publishedAt: 2026-07-03
draft: true
tags:
  - decision-making
  - interpretation
  - AI literacy
  - responsibility
author: "Feliks Mamczur"
readingTime: "5 min read"
lang: "en"
translationKey: "separate-facts-from-interpretations"
type: "practice"
category: "Practice"
---

When working with AI, an organized summary can look like a finished conclusion. Facts, interpretations, assumptions and recommendations can blend into one paragraph. This practice helps slow that movement down.

The goal is a map of the material before a decision, not a decision made by the model. AI can help separate layers of information, but the person remains responsible for judgment, context and the next step.

## When to use it

- Before a decision based on emails, notes, reports or conversations.
- When the material is messy and cognitively demanding.
- When you need questions for a team, client or expert.
- When an AI answer contains conclusions but does not show how it got there.

## What not to do

- Do not ask the model for the final decision.
- Do not treat hypotheses as facts because they are neatly organized.
- Do not ignore information that does not fit a convenient conclusion.
- Do not use this practice to justify a decision already made.

## Prompt

```text
Help me organize the material below before I make a decision.

Do not decide for me. Do not diagnose people and do not guess hidden intentions.

Divide the information into:

1. Facts visible in the material.
2. Interpretations or evaluations.
3. Hypotheses that may be true but need checking.
4. Assumptions present in the material or in my description.
5. Missing information.
6. Questions I should ask before the next step.

Then identify which conclusions would be premature based on this material. If you suggest possible directions of action, describe them as options, not as the decision.

Material:
[paste material]
```

## Short example

A note says, "The client is unhappy and the project is at risk." The prompt helps separate a visible fact, such as a delayed client reply, from the interpretation about dissatisfaction and the hypothesis about project risk. It can also show missing information: whether the client reported a problem, what they expect and what the actual deadline is. This keeps the user from turning the first interpretation into a decision.

## Why this helps

This prompt supports [decision support](/concepts/decision-support/) without moving the decision onto the model. The user gets an organized map of the material, not a verdict.

It also helps maintain [calibrated trust](/concepts/calibrated-trust/). [Model output](/concepts/model-output/) can be a useful map, but it does not replace checking facts, asking people questions or taking responsibility for the next step.

## Risk and limitations

- The model may wrongly classify an interpretation as a fact.
- The input material may be incomplete, biased or missing context.
- Organization can create the impression of more certainty than actually exists.
- In legal, HR, health, safety, violence or high-risk contexts, proper people, procedures and sources are needed.

## Related Concepts

- [Decision support](/concepts/decision-support/)
- [Calibrated trust](/concepts/calibrated-trust/)
- [Human agency](/concepts/human-agency/)
- [Epistemic vigilance](/concepts/epistemic-vigilance/)
- [Model Output](/concepts/model-output/)

## Further Reading

- [AI does not read people. It helps make sense of the situation.](/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/)
- [A good summary is not the same as a good decision](/notes/a-good-summary-is-not-the-same-as-a-good-decision/)
- [The model sees text, not the whole relationship](/notes/the-model-sees-text-not-the-whole-relationship/)
