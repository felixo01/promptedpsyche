---
title: "The model sees text, not the whole relationship"
description: "AI can help analyze communication, but it only sees the text and context we provide. It does not know the whole relationship or people's intentions."
publishedAt: 2026-07-02
draft: false
tags:
  - communication
  - context
  - AI literacy
  - Human-AI Interaction
author: "Feliks Mamczur"
context: "Note"
lang: "en"
translationKey: "model-sees-text"
---

Someone pastes an email, a document comment or a fragment of chat into AI and asks: what does this really mean? Sometimes the question is sharper: what does this person really want? Are they angry? Are they manipulating the situation? Are they trying to shift responsibility?

The impulse is understandable. A difficult message rarely feels like text only. It carries earlier conversations, fatigue, status, deadlines, unresolved decisions and emotion. But the model does not see the whole relationship. It sees the message, the surrounding text and whatever context the user chooses to provide.

AI can still help. It can organize possible readings, name unclear places, list missing information and check whether a reply may increase tension. What it should not do is act as if it knows what is happening between people beyond the text.

## Text is not everything

An email is a fragment of a situation. A comment in a document is a fragment of a situation. A chat message is also a fragment. Even when it looks complete, it usually does not contain the whole history of cooperation, the tone of meetings, earlier agreements, organizational pressure or what nobody has said openly.

The model works inside a [context window](/concepts/context-window/). Its answer depends on the text it receives, the user's instruction and the available context. If something is missing from that material, the model can only suggest it as a hypothesis. It cannot know it.

That is why [model output](/concepts/model-output/) in communication analysis should be treated as support for thinking, not as truth about a relationship. The answer may sound calm, confident and psychologically plausible. It may even notice something useful. It is still an interpretation built from limited material.

This limit matters most when tension is already high. The more uncomfortable the situation, the easier it is to want a quick story: who is wrong, who is avoiding responsibility, who is acting in bad faith. A model can create such a story. That does not make the story true.

## The risk of over-interpretation

The biggest risk appears when a coherent answer begins to feel like an accurate answer. AI can take a few sentences, add a likely background and produce a narrative that sounds like a diagnosis of the situation. That can feel relieving because it reduces uncertainty. But uncertainty does not disappear just because the text has been organized well.

The user's own [mental model](/concepts/mental-model/) also shapes how the model's answer is read. If someone already suspects that the other side is avoiding responsibility, it is easier to accept an interpretation that confirms it. If someone feels attacked, it is easier to see attack where there may be formality, stress or imprecise wording.

This is where [epistemic vigilance](/concepts/epistemic-vigilance/) matters: care with information and with one's own interpretation. It is not about distrusting everything. It is about asking a simple question: how do I know what now feels obvious?

The problem is not using AI for difficult communication. The problem is forgetting that the model sees only part of the situation. It can help name possible readings, but it should not close the question on behalf of the human.

## A safer way to ask

<div class="prompt-example prompt-example--bad" data-copyable-prompt>
  <div class="prompt-example__header">
    <p class="prompt-example__label">Do not ask this</p>
    <button class="prompt-example__copy" type="button" aria-label="Copy example prompt" data-copy-label="Copy" data-copied-label="Copied">Copy</button>
  </div>
  <pre class="prompt-example__body"><code data-prompt-text>What does this person really think?</code></pre>
</div>

<div class="prompt-example prompt-example--better" data-copyable-prompt>
  <div class="prompt-example__header">
    <p class="prompt-example__label">Better question</p>
    <button class="prompt-example__copy" type="button" aria-label="Copy example prompt" data-copy-label="Copy" data-copied-label="Copied">Copy</button>
  </div>
  <pre class="prompt-example__body"><code data-prompt-text>What are possible readings of this message?
What is fact, what is interpretation and what do we not know?</code></pre>
</div>

That question changes the role of AI. The model is no longer asked to guess someone's inner state. It is asked to separate visible information from hypotheses. It helps show gaps, tensions and places where clarification is needed.

This is less dramatic than a fast answer about hidden intentions. It is also safer and more responsible. Human communication is not only about replying quickly. It is also about not mistaking one's own tension for knowledge about another person.

The model sees text. The human has to remember the relationship that may not be present in that text.
