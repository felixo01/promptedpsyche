---
title: "How to separate facts from interpretations"
description: "A practice for separating what is visible in the material from interpretations, assumptions and questions before a conclusion or decision forms."
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

When working with AI, an organized summary can look like a finished conclusion. Facts, interpretations, assumptions and recommendations can blend into one paragraph. This practice helps slow that movement down before a first reading of the situation turns into a decision.

The goal is a map of the material before a decision, not a decision made by the model. AI can help separate layers of information, but the person remains responsible for judgment, context and the next step. Emotions are also information about the situation, but they are not the same as a fact visible in the material.

## When this helps

- Before a decision based on emails, notes, reports or conversations.
- When the material is messy, emotional or cognitively demanding.
- When you need questions for a team, client or expert.
- When an AI answer contains conclusions but does not show how it got there.

## What to ask the model

Ask the model for columns or layered categories. The key distinction is: what can be pointed to in the material, what is a reading of it, what is an assumption and what question has to be asked before deciding.

```text
Help me organize the material below before I make a decision.

Do not decide for me. Do not diagnose people and do not guess hidden intentions.

Divide the material into 5 columns:

1. Fact: what can be quoted, observed or pointed to in the material.
2. Interpretation: what I think it may mean.
3. Assumption: what I am adding without enough confirmation.
4. Alternative reading: what other interpretation could also fit the same fact.
5. Question: what needs to be known before the next step.

Then identify which conclusions would be premature based on this material. If you suggest possible directions of action, describe them as options, not as the decision. Do not ignore information that does not fit the most convenient conclusion.

Material:
[paste material]
```

## What to check yourself

- Whether a "fact" can really be pointed to in the material.
- Whether the same information could support more than one interpretation.
- Whether assumptions are coming mainly from tension, fatigue or previous history.
- Whether the person, team or source affected by the situation is missing from the material.
- Whether emotion helps reveal the stakes, but does not replace checking the situation.

## What can go wrong

- The model may wrongly classify an interpretation as a fact.
- A tidy table may create the impression of more certainty than actually exists.
- The user may use the exercise to defend a decision already made.
- Emotions may be ignored instead of named and separated from facts.
- In legal, HR, health, safety, violence or high-risk contexts, proper people, procedures and sources are needed.

## Better way to use the answer

A note says, "The client is unhappy and the project is at risk." Better analysis does not start with a decision. It separates layers. The fact may be: the client has not replied for five days or wrote that they are missing materials. The interpretation: the client is unhappy. The assumption: no reply means project risk. The question: has the client reported a problem, what do they expect and which deadline matters now?

This prompt supports [decision support](/concepts/decision-support/) without moving the decision onto the model. The user gets an organized map of the material, not a verdict. It also helps maintain [calibrated trust](/concepts/calibrated-trust/): [model output](/concepts/model-output/) can be a useful map, but it does not replace checking facts, asking people questions or taking responsibility for the next step.

## Short rule

First separate what is visible from what it may mean. Only then decide which question or action makes sense.

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
