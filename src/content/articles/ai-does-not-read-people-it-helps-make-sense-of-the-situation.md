---
title: "AI does not read people. It helps make sense of the situation."
description: "A case-study based essay on how AI can help organize difficult communication: tensions, missing information, possible readings and response risks."
publishedAt: 2026-07-02
draft: false
tags:
  - AI literacy
  - communication
  - Human-AI Interaction
  - trust
  - context
  - AI work
author: "Feliks Mamczur"
readingTime: "15 min read"
lang: "en"
translationKey: "ai-context-communication"
---

Someone receives a difficult email. It is not openly hostile. There are no capital letters, threats or direct accusations. Still, something in it raises the temperature: a formal tone, a few sentences about responsibility, a suggestion that a deadline may slip, a vague reference to earlier agreements and an ending that sounds polite while closing the conversation down.

The first impulse is human: to understand what the other person really means. Are they trying to withdraw? Are they shifting responsibility? Are they protecting themselves in case something goes wrong? Is this a sign of conflict, fatigue, pressure from someone else, or simply imprecise writing?

More and more often, a second impulse follows: paste the message into an AI system and ask, "What does this person really want?"

That question feels natural because it promises relief. The model can answer fluently. It can name possible intentions, describe tone, suggest a hidden meaning and draft a response. In a few seconds, tension receives a story.

The problem is that this is the wrong question.

AI does not know what someone really thinks. It does not know the whole relationship, the project history, the conversations that happened outside the text, the pressure inside the team, the organizational dependencies or the emotional state of the sender. It can work only with what it has been given.

A better question is different: what is visible in this communication, what is missing, what are possible readings, what is fact, what is interpretation and what should be checked before replying?

That shift is small, but it changes the whole practice. It moves the model away from the role of relationship judge and toward the role of second reader. The point is not to make the system tell us the truth about a person. The point is to help make sense of the situation before a human being makes a decision.

## Case study: the email that looked like a personal problem

The example below is composite and anonymized. It does not describe one specific correspondence and does not quote real messages. It combines typical situations in which AI can help organize communication context.

Imagine an international or cross-functional project. The specific industry, country and organization do not matter. The structure is enough: Team A is responsible for part of the material and for several decisions on the client side. Team B coordinates delivery and communication with a local partner. A vendor is waiting for final confirmation. A senior decision-maker is not in every conversation but needs to approve significant changes.

At first, everything looks ordinary. There are meetings, notes, a task list, a timeline and a few points that still need clarification. Then delays begin to appear. One decision is postponed, another comes back with comments and a third turns out to depend on information that nobody had previously named as critical.

Each side has reasons. Team A feels that Team B is avoiding responsibility and answering too generally. Team B feels that Team A is pushing deadlines without fully understanding local constraints and the cost of changing direction. The vendor is waiting. The decision-maker wants a clean recommendation, not another thread of uncertainty.

The correspondence becomes more formal. Sentences become longer. Phrases appear such as "as previously agreed", "we do not see grounds for changing the scope", "please provide unambiguous confirmation" or "the schedule will need to be reopened". Nobody writes, "we do not trust you". Nobody says, "we are afraid of responsibility". Nobody admits, "we still do not have a decision". But the pressure increases.

Finally, an email arrives that one person in Team A reads as a personal problem. The sender from Team B seems cold, evasive and overly formal. The temptation is to answer sharply: remind them of earlier agreements, point to missed deadlines, demand a decision and state clearly who is responsible for the delay.

At this point, AI can easily make things worse. If the user asks, "Is this person trying to shift blame?", the model may produce a convincing analysis that strengthens that exact interpretation. If the user asks, "How do I reply so they cannot back out?", the model may help write a tactically effective message that damages the relationship. If the user asks, "What are they really trying to do?", the model may build a psychological narrative that sounds reasonable but does not have the status of fact.

Better work begins with a different framing. Not: who is the difficult person? Not: who is right? Not: what is this person hiding? But: what layers of the situation are visible in this correspondence?

Once the correspondence is organized this way, the email no longer has to be read mainly as bad faith. Several layers become visible at the same time: unclear ownership of a decision, lack of formal confirmation, deadline pressure, different expectations about quality, an unnamed cost of correction and a risk that one side will lose face if the decision is framed too bluntly.

The tension is real. But it does not automatically mean that someone "is the problem". A more useful reading is that the project has been pushing uncomfortable decisions into email for too long.

This difference matters. AI did not recognize people's intentions. It helped name parts of the situation that had previously blended into one emotional reaction.

## The model sees text, not the whole relationship

A message is never the whole situation. An email, a comment in a document, a short chat reply or a formal note is only one fragment of a larger arrangement. Behind it may be earlier conversations, unclear agreements, hierarchy, deadlines, cultural differences, fatigue, budget pressure or simple lack of precision.

The model does not know those things unless they are described. It sees available text and works inside the limits of the [context window](/concepts/context-window/). It can notice inconsistencies, point to gaps, suggest several possible readings and name places that need clarification. It cannot confirm that a person had a specific intention.

This distinction is basic. [Model output](/concepts/model-output/) may look like an interpretation of the situation, but it remains a system result. It is generated from the input, surrounding context and language patterns. It is not direct access to another person's motivation. The more psychological the answer sounds, the easier it becomes to overvalue it.

In the case study, the difference was practical. If the email is treated as the full picture of the relationship, the answer may become fast, defensive and hard. If it is treated as a fragment of a wider system, different questions appear: who can actually make the decision? Do both sides understand the change in the same way? Is the deadline problem technical, organizational or reputational? Does the email contain a clear refusal, or does it signal that the sender does not want to own the interpretation alone?

These are questions about the situation, not about the sender's mind.

## The wrong question: what does this person really think?

The question about someone's real intention is risky because it turns uncertainty into a story. The model can produce a narrative that is coherent, persuasive and emotionally satisfying. It can also align quickly with the user's tone. If a message is pasted into the system by someone who already feels treated unfairly, the model may offer a reading that makes this feeling stronger.

In difficult correspondence, this matters. The human reader already has tension, a history of contact and a stake in the outcome. The model can add a language of apparent objectivity. Instead of thinking, "I am upset and this is how I am reading it", the user may begin to think, "AI also sees that they are avoiding responsibility."

This does not make AI analysis useless. It can be useful when the question is framed carefully. Instead of asking, "What does this person really think?", it is better to ask:

- What are possible readings of this message?
- What information is missing?
- Which sentences may escalate tension?
- What assumptions am I making as the reader?
- What is fact, and what is interpretation?
- What questions would reduce the risk of misinterpretation?

Those questions do not pretend to reveal the inside of another person. They help reveal the user's own [mental model](/concepts/mental-model/) of the situation: what is being filled in, what feels obvious, where the interpretation may be too fast and which parts of the reading are coming from the text rather than from the reader's emotional state.

This is where [epistemic vigilance](/concepts/epistemic-vigilance/) becomes useful. In practice, it means pausing over information: how do I know what I think I know? Does it come from the message, from the previous relationship, from my emotion, from my position in the project or from a narrative produced by the model? This is not cynicism and it is not decision paralysis. It is hygiene for interpretation.

In the case study, that pause changed the reply. Instead of a message carrying a hidden accusation, the response separated three things: what had been agreed, what was still missing and what decision was needed to prevent the tension from spreading further.

## How AI can help organize correspondence

The most practical value of AI in difficult communication is not that the system "reads" people. It is that it can help separate layers that often collapse into one anxious reaction in the reader's mind.

AI can help create a map of facts: what was actually written, which dates appear, which commitments are named, which decisions were confirmed and which were only implied. That sounds simple, but in a tense situation simple things often disappear under emotion.

It can also help list missing information. Do we know who approves the change? Do we know when an answer is needed? Is the other side asking for a decision, an opinion, consent, or simply written protection? Is the issue about quality, cost, timing, responsibility, reputation, or several of these at once?

Another layer is possible interpretation. Not one final interpretation, but several readings with different levels of confidence. In the case study, the same email could be read as an attempt to avoid responsibility, a signal that the sender did not yet have authority to decide, caution about the cost of change, or a formal style shaped by coordination across several organizations. Each reading would lead to a different reply.

AI can also point to escalation points. Sometimes a sentence is technically correct but sounds like blame in a particular context. Sometimes "again" suggests impatience. Sometimes "we expect" sounds stronger than "we need". Sometimes a long list of reminders looks like an indictment even when the writer only wanted to organize facts.

A better way of working does not need to become a named framework. It can begin with a different kind of prompt.

Instead of asking:

`What is this person really trying to do?`

Better:

`List possible readings of this message. Separate facts from hypotheses. Identify what we do not know. Suggest questions that would reduce the risk of misinterpretation.`

This is not a prompt trick. It is a change in thinking. AI is not being asked to decide who is right. It is being asked to make visible what is in the text, what is missing and where the human reader should be careful.

## AI as a second reader, not a relationship psychologist

The safest way to think about AI in this situation is as a second reader of a message. A second reader can notice something the writer or recipient missed. It can say that a reply sounds too sharp, that an argument is unclear, that a question sounds like an accusation, or that the text lacks information needed for a decision.

This matters especially when communication is supported, edited or partly created by AI systems. That is the domain of [AI-mediated communication](/concepts/ai-mediated-communication/): communication between people in which a system helps choose words, tone, structure or sequence.

That help can be valuable. It can reduce chaos, lower unnecessary tension and make the message clearer. But it can also blur authorship and responsibility. If the model suggests a firmer reply, the human still has to decide whether that tone is appropriate. If the model suggests that the other side is avoiding responsibility, the human has to ask whether this follows from the text or only from a plausible-sounding interpretation.

In the case study, this limitation was central. AI could help notice that one draft response mixed facts with interpretation. It could point out that the email lacked a calm question about decision ownership. It could suggest a clearer order: first shared facts, then missing information, then a concrete request, then a deadline. It could not say whether the local partner was acting in good faith or bad faith.

This is why [calibrated trust](/concepts/calibrated-trust/) matters. The question is not whether to trust AI more or less in general. The question is whether trust fits the task. One level of trust may be enough for improving style. Another is needed when summarizing known correspondence. A still higher level of caution is needed when interpreting tension in a project where the reply may affect relationships, reputation or a financial decision.

AI as a second reader is useful when it helps create distance from the text. It becomes risky when it starts replacing conversation, verification and responsibility.

## Before sending the difficult email

AI can help not only when we read someone else's message. It can also help before we send our own. Not to "win" the conversation and not to choose words that make another person react according to our plan. That would be using technology for manipulation, not for responsible communication.

A better use is simpler: check whether the message is understandable. Does it separate facts from interpretation? Does it escalate tension unnecessarily? Does it state clearly what is needed? Does it shift responsibility unfairly? Will the recipient know what decision is needed and by when?

This is a moment for [metacognition](/concepts/metacognition/): noticing one's own thinking. When writing under stress, it is easy to confuse clarity with force, and force with pressure. It is also easy to write as if the other side knows the whole line of reasoning, when they only see a few paragraphs.

There is also [cognitive load](/concepts/cognitive-load/). Difficult communication is tiring because the writer has to hold facts, relationship, goal, risk, tone and consequences at the same time. AI can help separate those layers. It cannot decide what should be sent.

In the case study, the working draft of the reply was long, defensive and full of chronology. It contained important information, but it arranged that information in a way that could make the recipient feel accused. The point of using AI was not to soften everything into polite fog. It was to separate order from pressure.

The final response was simpler. It named the shared goal first. It listed two decisions that required confirmation. It explained what would happen to the timeline if the decision did not arrive. It ended with a request for brief confirmation from the person responsible for choosing the option. The message was still firm. But it did not pretend to know the other side's intention.

## What changed in the case study

The most important change was not that AI solved the conflict. It did not. It did not call the local partner, make a decision for the coordinator, remove deadline pressure or make all parties suddenly think alike.

What changed was the perspective of the person preparing the reply.

The initial question was: who is the problem? After organizing the correspondence, the better question became: what has not been named? Instead of judging intention, it became possible to see a missing decision. Instead of answering formal tone with formal pressure, it became possible to ask who owned the decision. Instead of treating delay as a personal avoidance, it became possible to separate deadline pressure from responsibility for a change in scope.

This was not a soft retreat. It was more precise communication.

AI also helped show that the first draft contained several hidden assumptions. It assumed the other side knew which information was critical. It assumed that lack of answer meant avoidance of responsibility. It assumed that repeating the full project history would increase clarity, although it could also increase defensiveness. Once facts, interpretations and hypotheses were separated, it became easier to write a message that did not abandon the goal but reduced unnecessary escalation.

That is the real value of AI in this use. Not a revelation about people, but help seeing the structure of the situation. Not a psychological portrait of the sender, but a map of missing information, risks and decisions.

AI did not solve the conflict. AI helped organize what was worth asking.

## Responsibility stays with the human

In organizations, communication is not a side activity. It is part of the work. Messages set responsibility, organize decisions, build trust or weaken it. They can help a team act more calmly, but they can also activate conflict when they are unclear, passive-aggressive or too certain in a situation that requires caution.

AI can help organize communication, but it does not carry responsibility for the consequences. The human chooses what to paste, what to omit, what to treat as useful and what to send. The human knows the relationship, risk, organizational norms and possible consequences. In that sense, [human oversight](/concepts/human-oversight/) is not a formality. It is a real part of working with AI.

It is also part of [AI literacy](/concepts/ai-literacy/). Competence with AI is not only the ability to generate quick responses. It also means understanding when a model answer is help, when it is a hypothesis, when it is a draft and when it is an overly confident narrative that should not be mistaken for truth.

In practice, this creates boundaries. Do not use AI to diagnose people from emails. Do not ask the model to tell you who is manipulating whom. Do not treat a fluent interpretation as evidence. Do not send a reply only because it sounds professional. Return to the text, the facts, the missing information and your own responsibility.

AI does not read people. It reads text and works with the context we give it. Its greatest value in difficult communication is not that it can tell us what someone "really" thinks. It is that it can help us make sense of the situation and see what we have not yet named.

## Sources and further reading

- Hancock, J. T., Naaman, M., & Levy, K. (2020). AI-mediated communication: Definition, research agenda, and ethical considerations. *Journal of Computer-Mediated Communication, 25*(1), 89-100.
- Lee, J. D., & See, K. A. (2004). Trust in automation: Designing for appropriate reliance. *Human Factors, 46*(1), 50-80.
- National Institute of Standards and Technology. (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. U.S. Department of Commerce.
- Norman, D. A. (1983). Some observations on mental models. In D. Gentner & A. L. Stevens (Eds.), *Mental models* (pp. 7-14). Lawrence Erlbaum Associates.
- Parasuraman, R., & Riley, V. (1997). Humans and automation: Use, misuse, disuse, abuse. *Human Factors, 39*(2), 230-253.
- Sperber, D., Clement, F., Heintz, C., Mascaro, O., Mercier, H., Origgi, G., & Wilson, D. (2010). Epistemic vigilance. *Mind & Language, 25*(4), 359-393.
- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257-285.
