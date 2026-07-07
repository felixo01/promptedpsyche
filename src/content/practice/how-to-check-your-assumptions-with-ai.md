---
title: "How to check your assumptions with AI"
description: "A scenario for using AI to see what in your reasoning is a fact, an assumption or missing context."
publishedAt: 2026-07-07
draft: true
tags:
  - assumptions
  - checking
  - interpretation
  - AI literacy
author: "Feliks Mamczur"
readingTime: "5 min read"
lang: "en"
translationKey: "practice-assumptions"
type: "practice"
category: "Practice"
---

Your own assumptions can be hard to notice because they often feel obvious. AI can help name them, but it does not know your hidden motives or the whole context. It can organize a text, decision or situation description and show what has been added without strong confirmation.

This practice helps check reasoning before assumptions turn into conclusions.

## When this helps

- When you describe a situation and move quickly toward a conclusion.
- When a decision depends on information you have not checked.
- When you have a strong first reading of a situation.
- When you want questions before defending your interpretation.

## What to ask the model

Ask the model to separate facts, assumptions and missing context. Do not ask it to assess your intentions.

```text
Read the description below and help me check my assumptions.

Do not evaluate my personality, motives or emotions. Work only with the material I provide.

Divide the analysis into 6 parts:

1. Facts: what can be pointed to in the description.
2. Assumptions: what I am adding without full confirmation.
3. Stronger assumptions: which assumptions make sense based on the material.
4. Weaker assumptions: which assumptions need checking.
5. Missing context: what needs to be known.
6. Questions: what I should ask or verify before forming a conclusion.

At the end, identify which conclusions would be premature and why.

Description:
[paste description]
```

## What to check yourself

- Whether the "facts" are really present in the material.
- Whether an assumption comes mainly from emotion, speed or previous experience.
- Whether the person or source affected by the situation is missing from the material.
- Whether the model added context you did not provide.
- Whether the result gives you concrete questions, not only a longer list of doubts.

## What can go wrong

- The model may name an assumption too confidently.
- The user may use the assumption list to defend an earlier decision.
- The exercise may look like neutral analysis even when the material is incomplete.
- In high-risk situations, proper people, sources and procedures are needed.

## Better way to use the answer

You describe a situation: "The team is not replying, so the project is not important to them." The model can separate the fact: the team has not replied for two days. The assumption: no reply means low commitment. The missing context: whether the team has other deadlines, whether they received all materials and whether they know what you expect. This does not solve the situation, but it changes the first move: instead of a judgment, there is a question.

This practice connects [epistemic vigilance](/concepts/epistemic-vigilance/) with [metacognition](/concepts/metacognition/). The model helps reveal the structure of reasoning, but it does not replace checking the situation or human responsibility.

## Short rule

Do not ask AI what you really think. Ask it to show what in your reasoning is an assumption.

## Related Concepts

- [Epistemic vigilance](/concepts/epistemic-vigilance/)
- [Metacognition](/concepts/metacognition/)
- [Human agency](/concepts/human-agency/)
- [Model Output](/concepts/model-output/)

## Further Reading

- [AI does not read people. It helps make sense of the situation.](/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/)
- [A good summary is not the same as a good decision](/notes/a-good-summary-is-not-the-same-as-a-good-decision/)
- [The model sees text, not the whole relationship](/notes/the-model-sees-text-not-the-whole-relationship/)
