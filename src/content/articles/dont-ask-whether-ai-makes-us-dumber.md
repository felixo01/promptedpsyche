---
title: "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing"
description: "What current evidence says about AI, learning and independent thought, and why ready-made answers and well-designed scaffolding produce different outcomes."
publishedAt: 2026-07-14
draft: false
scholarPrimary: true
tags:
  - AI and humans
  - cognition
  - learning
  - Human-AI Interaction
  - AI literacy
  - education
author: "Feliks Mamczur"
readingTime: "22 min read"
doi: "10.5281/zenodo.21358687"
doiUrl: "https://doi.org/10.5281/zenodo.21358687"
version: "1.0"
licenseName: "CC BY 4.0"
licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
inBrief:
  - "Current studies do not measure one outcome called becoming dumber. They examine memory, effort, persistence, learning, transfer, creativity and other distinct processes."
  - "AI can improve performance while it is available and still leave a person less able to solve a similar problem independently."
  - "The clearest comparisons concern the structure of assistance: ready-made answers, hints, feedback, guided questions and the gradual removal of support."
  - "A completion interface should reduce unnecessary effort. A learning interface must preserve the effort through which a skill is built."
image: /images/articles/ai-thinking-practice.svg
imageAlt: "A calm diagram of two routes from a problem to an outcome: a short path through a ready-made answer and a longer path through an attempt, a hint, feedback and independent transfer."
imageCaption: "Both routes can end in a completed task. Only one keeps the attempt, correction and independent performance visibly inside the process."
lang: "en"
translationKey: "ai-thinking-practice"
---
<style>
.article-data-table {
  margin: clamp(2.2rem, 4vw, 3rem) 0;
}

.article-data-table__scroll {
  overflow-x: auto;
  border-block: 1px solid var(--line-strong);
  -webkit-overflow-scrolling: touch;
}

.article-data-table table {
  width: 100%;
  min-width: 44rem;
  border-collapse: collapse;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  line-height: 1.48;
}

.article-data-table caption {
  padding: 0.85rem 0.85rem 0.7rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.11em;
  text-align: left;
  text-transform: uppercase;
}

.article-data-table th,
.article-data-table td {
  padding: 0.72rem 0.85rem;
  border-bottom: 1px solid var(--line-soft);
  vertical-align: top;
}

.article-data-table th {
  background: var(--accent-soft);
  color: var(--ink);
  font-weight: 650;
  text-align: left;
}

.article-data-table tbody tr:last-child td {
  border-bottom: 0;
}

.article-data-table figcaption {
  margin-top: 0.7rem;
  color: var(--text-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .article-data-table table {
    min-width: 38rem;
    font-size: 0.82rem;
  }

  .article-data-table th,
  .article-data-table td {
    padding: 0.65rem 0.72rem;
  }
}
</style>

You use AI to solve a problem you did not know how to begin an hour ago. The system identifies the problem type, selects a method, performs the calculation and gives you a clear explanation. The answer is correct. A few minutes later, with the tool no longer available, you face a similar problem and cannot reconstruct the first step.

Did AI help? Yes. Did learning occur? The quality of the assisted result cannot answer that question. Completing a task and building the ability to complete it can look identical at the finish line even when the routes are very different.

On July 7, 2026, Amanda Hoover published [*Is AI making us dumber?*](https://www.businessinsider.com/ai-making-us-dumber-research-2026-7?IR=T) in *Business Insider*. The article brings together several worrying signals: weaker memory for one's own work, lower effort during some tasks, poorer performance after AI is removed, more skipped problems and greater similarity across creative outputs. These are real concerns, not an invented panic. Hoover also makes clear that it is too early to judge long-term effects and that several prominent findings remain preprints.

The trouble lies in placing all of those outcomes under one journalistic question. Remembering an essay, showing a particular EEG pattern while writing, persisting with fractions, passing a later unassisted test and producing diverse stories are not interchangeable measures of intelligence. They are different outcomes, observed in different settings and over different periods.

<aside class="key-passage" data-qa="key-passage">
  <p class="key-passage__label">Key passage</p>
  <p>The problem does not begin when AI makes work shorter. It begins when an interface treats the answer to be produced and the ability to be learned as the same objective. A strong result with assistance can conceal that the user cannot yet reconstruct the process alone.</p>
</aside>

## Abstract

This article is a research-informed narrative synthesis, not a systematic review or meta-analysis. It reads recent generative-AI studies alongside earlier work on learning, memory, effort, persistence, creativity and [cognitive offloading](/concepts/cognitive-offloading/). It does not attempt to estimate AI's overall effect on intelligence because most available studies neither measure intelligence nor track durable cognitive change. Instead, it separates performance with a tool from later learning, retention and transfer. The clearest pattern concerns the structure of assistance. A system that supplies the solution can remove the attempt through which independent skill develops. A system that requires an attempt, offers graduated hints, provides feedback and withdraws support can improve or preserve learning in specific conditions. Interaction design is not the only factor. Task, purpose, prior knowledge, timing, user strategy and outcome measurement also shape what happens.

## Scope and method

The audit began with the complete *Business Insider* article. Each important empirical claim was then checked against its primary source. Peer-reviewed studies, meta-analyses and official reports received priority. Five relevant works that have not yet been replaced by peer-reviewed versions are identified as preprints. Journalism is used to understand the public debate, not as primary scientific evidence.

The evidence set includes laboratory experiments, randomized field studies, large text corpora, cross-sectional work, reviews and older learning research. These designs do not yield one pooled effect. A 20-minute essay study, four mathematics sessions and a cognitive-score trend from 2006 to 2018 ask different questions.

Most generative-AI studies in this area measure immediate or short-term outcomes. They tell us little about what months or years of routine use may do. That gap is not evidence that long-term effects are absent. It is a reason to keep observed results separate from plausible but untested trajectories.

<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="evidence-map">
  <div class="article-data-table__scroll">
    <table>
      <caption>Evidence map</caption>
      <thead>
        <tr><th scope="col">Source class</th><th scope="col">Count</th><th scope="col">Role in the article</th></tr>
      </thead>
      <tbody>
        <tr><td>Peer-reviewed publications</td><td>15</td><td>Randomized studies, experiments, reviews, a meta-analysis and earlier learning research.</td></tr>
        <tr><td>Preprints</td><td>5</td><td>Recent findings on writing, persistence, tutoring support, creative diversity and methodological critique.</td></tr>
        <tr><td>Official report</td><td>1</td><td>Context for US grade 12 mathematics trends, not evidence of an AI effect.</td></tr>
        <tr><td>Journalism</td><td>1</td><td>The public argument being examined, not a primary scientific source.</td></tr>
        <tr><td>Total</td><td>22</td><td>A narrative evidence set that cannot be reduced to one pooled effect.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>The evidence spans different tasks, populations, time scales and outcome measures. The counts describe the source set, not the strength of one common effect.</figcaption>
</figure>

## What Business Insider gets right

An overbroad headline does not call for an equally broad reassurance. Some of the warning signals are substantial.

In a randomized field study, Hamsa Bastani and colleagues assigned nearly 1,000 high-school students to work through four mathematics sessions with unrestricted GPT, a specially designed GPT Tutor or neither tool. Unrestricted GPT improved performance during practice. On a later exam without AI, however, that group scored 17 percent below the control group (Bastani et al., 2025). The tool helped students finish the work in front of them, but that benefit did not carry over to independent performance.

A preprint by Grace Liu and colleagues reports three short randomized experiments involving fraction problems. Participants could use AI for part of the practice and then lost access without warning. In all three experiments, those who had previously received AI assistance solved fewer problems independently. In two experiments they also skipped more. In the first, the later solve rate was 57 percent after AI assistance and 73 percent in control. In the third, it was 76 versus 89 percent (Liu et al., 2026). This is direct evidence of a short-term cost to independent performance in those tasks, though not proof of lasting deskilling.

Other studies report poorer memory for AI-assisted writing, correlations among reported AI use, offloading and critical-thinking measures (Gerlich, 2025), and reduced diversity across creative products. None shows that every user is losing ability. Together, they are enough to reject the assumption that a better assisted output always means better learning.

## "Dumber" is not one variable

Intelligence is a broad family of capacities, itself measured in different ways. Knowledge concerns what someone has learned. Memory may mean recalling a fact, recognizing it, remembering its source or quoting one's own essay. Effort describes the cost of completing a task, not the durability of what changes. Persistence concerns whether someone continues. Transfer asks whether a skill works in a new situation. The creativity of one story is different from diversity across hundreds of stories.

EEG activity or connectivity during a task is not a direct measure of intelligence either. Lower activity is not automatically worse. Expertise can make some work more efficient, and a recorded pattern may reflect strategy, workload or coordination rather than loss of ability. Its meaning comes from the task, the comparison and its relationship with behavior.

The distinction matters when broad historical trends enter the discussion. An analysis of 394,378 US adults found declines in several cognitive subscales from 2006 to 2018 while three-dimensional rotation scores increased (Dworak et al., 2023). US grade 12 mathematics performance has also declined across assessments (National Center for Education Statistics, 2025). Both trends deserve explanation. Neither can show an effect of mass generative-AI use, which came later.

<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="constructs">
  <div class="article-data-table__scroll">
    <table>
      <caption>What the studies actually measure</caption>
      <thead>
        <tr><th scope="col">Construct</th><th scope="col">Typical question</th><th scope="col">What it does not establish by itself</th></tr>
      </thead>
      <tbody>
        <tr><td>Task performance</td><td>Was the answer correct while AI was available?</td><td>Durable learning or independent competence.</td></tr>
        <tr><td>Memory</td><td>Can a person recall content, its source or their own text?</td><td>General intelligence.</td></tr>
        <tr><td>Effort / EEG pattern</td><td>How demanding was this task and what activity pattern accompanied it?</td><td>A direct scale of thought quality or permanent brain change.</td></tr>
        <tr><td>Persistence</td><td>Does the person continue after difficulty or after assistance is removed?</td><td>Long-term deskilling.</td></tr>
        <tr><td>Transfer</td><td>Can the person solve a related problem without the original support?</td><td>Performance in every other domain.</td></tr>
        <tr><td>Creativity</td><td>How is one output rated, and how diverse is the whole collection?</td><td>One universal improvement or decline in creativity.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>"Dumber" collapses distinct variables. A responsible interpretation starts by naming the outcome that was actually measured.</figcaption>
</figure>

## What "Your Brain on ChatGPT" actually measured

The most visible study in this debate is titled *Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task*. It is a substantial preprint by Nataliya Kosmyna and colleagues, not a peer-reviewed finding that establishes what ChatGPT does to the brain (Kosmyna et al., 2025).

Fifty-four adults aged 18 to 39 took part in the first three sessions, with 18 assigned to each of three conditions: an LLM, web search or no tool. They wrote 20-minute SAT-style essays. The researchers examined EEG connectivity, linguistic features, essay assessments, self-reported ownership and the ability to quote from one's own essay. Eighteen participants crossed between conditions in a fourth session.

The clearest behavioral difference concerned memory for the text. After session one, 15 of 18 participants in the LLM condition could not quote their essay accurately. The same problem occurred for 2 of 18 participants in each comparison group. The gap narrowed across sessions but did not disappear. That finding matters because it suggests a cost when much of the formulation is delegated.

The paper also reports different EEG connectivity patterns between conditions. It did not measure IQ, general memory, permanent brain change or later transfer into unrelated tasks. EEG records electrical activity at the scalp and supports analyses of temporal patterns. It is neither a brain scan nor a scale of thought quality.

In a methodological commentary, Milos Stankovic and colleagues raise concerns about the sample size relative to the number of analyses, multiple testing, reproducibility of parts of the EEG workflow, reporting inconsistencies and selective interpretation (Stankovic et al., 2026). Their critique does not erase the dataset. It narrows what can responsibly be said: three writing conditions were associated with different task-specific EEG patterns, memory for the text and ownership reports. Whether those differences become durable cognitive change remains unknown.

## Good performance is not evidence of learning

Learning research has long separated performance during practice from a change that persists after practice. Nicholas Soderstrom and Robert Bjork review cases in which conditions that make current performance look good do little for retention, while conditions that introduce difficulty can strengthen later recall (Soderstrom & Bjork, 2015).

Restudying, for example, can feel fluent. Trying to retrieve an answer without the text feels harder, exposes gaps and can improve later retention (Roediger & Karpicke, 2006). Productive failure draws on a related distinction. A meta-analysis by Tanmay Sinha and Manu Kapur does not recommend leaving learners unsupported. It finds that, under defined conditions, attempting a problem before instruction can improve conceptual knowledge and transfer (Sinha & Kapur, 2021).

Generative AI did not create the tension between smooth performance and learning. It changes how quickly support can arrive, how complete it can be and how easily it can precede an attempt. When a finished solution appears at the first moment of difficulty, the system may remove not only frustration but also retrieval, hypothesis comparison and error correction.

## AI as a substitute for the process

In substitution mode, the user hands the system problem recognition, solution generation, comparison of alternatives, drafting and checking. The person supplies the prompt and judges the result. That can be entirely rational.

If the goal is to transform a table, prepare a first draft of a routine message or locate a syntax error, reducing effort may be the right optimization. Not every task must become a lesson. The risk arises when a completion interface is used where the goal is to develop competence, or when a person remains responsible for the output without retaining enough domain knowledge to evaluate it.

In an [earlier article about ready-made answers](/articles/trust-in-the-age-of-ready-made-answers/), I described how fluent synthesis compresses the visible path from sources to a conclusion. Here, a similar shortcut runs from problem to solution. The more stages disappear into a finished answer, the harder it becomes to know which ones the user could reproduce.

## AI as scaffolding for the process

Scaffolding does not eliminate all difficulty. It helps someone work through difficulty while responsibility gradually returns to the learner. Education research emphasizes assistance that responds to the current attempt, fades over time and transfers control back to the student (van de Pol et al., 2010). Work on solved examples likewise suggests that a gradual transition from a full example to independent problems can support transfer, though not every form of transfer improves equally (Renkl et al., 2002).

An AI learning interface could begin by requiring an attempt. It could identify a specific error, ask a guiding question, offer the smallest useful hint and request an explanation in the learner's own words. It could then present a new problem without help. The most important test occurs not while support is available, but when it can be removed.

Such support can still be poorly calibrated. A model may reveal too much, misidentify the source of confusion or give an explanation that does not fit the learner's level. [Human-AI Interaction](/concepts/human-ai-interaction/) therefore includes the timing, scope, form and contestability of help, not only the words in an answer.

## What direct design comparisons show

The strongest design evidence does not come from placing two unrelated papers side by side. It sits inside the Bastani study. Unrestricted GPT and GPT Tutor raised supported practice performance by 48 and 127 percent relative to control. On the later unassisted exam, the unrestricted group performed worse than control, while the tutor group was statistically indistinguishable from it. GPT Tutor drew on teacher materials and common errors, gave graduated hints and restricted full solutions (Bastani et al., 2025).

This is not a story about a good model and a bad model. It compares two structures of assistance in one setting. The tutor condition did not show the penalty observed with unrestricted GPT, but it did not create a demonstrated advantage on the later exam. That restrained result is valuable: better practice performance is not necessarily learning, and withholding ready-made solutions can protect part of the learner's work.

A randomized study by Greg Kestin and colleagues offers another comparison. A total of 194 students were eligible for a crossover study in an introductory Harvard physics course. The purpose-built AI tutor used topic-specific material, stepwise guidance, checks for understanding, feedback and self-pacing. Across two topics, it produced larger immediate learning gains than the compared active-learning classes while taking less median time. The study did not measure delayed retention or broad transfer, and its two topics and selective institution limit generalization (Kestin et al., 2025).

The *Tutor CoPilot* preprint represents a different arrangement. AI did not teach students on its own. It offered real-time questions and strategies to human tutors working with about 1,800 K-12 students. Access was associated with an increase in short exit-ticket mastery from roughly 62 to 66 percent, with larger gains among lower-rated and less-experienced tutors. Tutors asked more guiding questions and gave away answers less often. The study found no significant gain on year-end mathematics tests (Wang et al., 2024).

Liu and colleagues add a clue about user strategy. In their second experiment, 61 percent of AI users reported mainly asking for direct answers, 27 percent sought hints or clarification and 12 percent did not use the tool. Direct-answer users later solved fewer problems and skipped more than hint seekers. This subgroup comparison was not randomized, so it cannot show that the request style caused the difference. It is nevertheless consistent with the mechanism in Bastani: help that preserves an attempt is different from help that replaces it.

<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="design-comparisons">
  <div class="article-data-table__scroll">
    <table>
      <caption>Direct comparisons that matter most</caption>
      <thead>
        <tr><th scope="col">Study</th><th scope="col">Assistance structure</th><th scope="col">Observed result</th><th scope="col">Boundary</th></tr>
      </thead>
      <tbody>
        <tr><td>Bastani et al. (2025)</td><td>Unrestricted GPT versus a tutor with graduated hints and restricted solutions.</td><td>Both improved practice; unrestricted GPT was followed by worse unassisted performance, while GPT Tutor was not.</td><td>Four high-school mathematics sessions.</td></tr>
        <tr><td>Kestin et al. (2025)</td><td>Purpose-built tutor with topic material, feedback and checks for understanding.</td><td>Larger immediate gains than the compared active-learning classes in two physics topics.</td><td>No delayed retention or broad transfer measure.</td></tr>
        <tr><td>Liu et al. (2026, preprint)</td><td>Short access to direct AI help followed by unassisted work.</td><td>Lower independent performance and more giving up after assistance was removed.</td><td>Brief experiments do not establish lasting deskilling.</td></tr>
        <tr><td>Tutor CoPilot (2024, preprint)</td><td>AI suggested pedagogical strategies to human tutors.</td><td>Higher short exit-ticket mastery and more guiding questions.</td><td>No significant end-of-year mathematics gain.</td></tr>
        <tr><td>Doshi &amp; Hauser (2024)</td><td>AI-generated ideas for short-story writing.</td><td>Higher ratings for individual stories but greater similarity across the collection.</td><td>Individual quality and collective diversity are different outcomes.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>The strongest conclusion is not that AI is good or bad for learning. It is that different structures of assistance preserve or replace different parts of the human process.</figcaption>
</figure>

## Creativity can rise while diversity falls

Creativity makes the problem of measurement especially visible. Anil Doshi and Oliver Hauser asked 293 people to write short stories. Access to AI-generated ideas increased average ratings of novelty and usefulness, particularly among writers with lower initial divergent-association scores. At the same time, AI-assisted stories became more similar to one another (Doshi & Hauser, 2024).

Three statements can therefore be true at once: an individual story received a better rating, someone with a lower baseline gained more, and the collection lost some diversity. Whether this is an improvement depends on the level of analysis and the purpose of the work. A direct comparison of human and ChatGPT-assisted writing points to the same collection-level similarity problem (Moon et al., 2025).

A preprint by Kibum Moon and colleagues examines 372,793 personal statements alongside controlled experiments. After ChatGPT became available, word-level diversity increased while conceptual diversity at sentence and document level declined; raters also judged later essays as more creative (Moon et al., 2026). The historical comparison cannot prove that each post-release essay used AI. Together with the experiments, it does sharpen the possibility of a trade-off between the quality of one product and the diversity of a shared pool of ideas.

## Cognitive offloading is not automatically cognitive decline

People have always moved some memory and calculation into the environment. Writing, notes, books, calculators, search, navigation and other people let us reach beyond individual capacity. In psychology, [cognitive offloading](/concepts/cognitive-offloading/) describes the use of external action or tools to reduce cognitive demand (Risko & Gilbert, 2016). Offloading by itself is not a diagnosis of lost ability.

Experiments by Betsy Sparrow and colleagues found that expecting future access reduced recall of the information while improving memory for where it could be found (Sparrow et al., 2011). That is a shift in memory strategy, not a measure of general intelligence. Louisa Dahmani and Véronique Bohbot linked habitual GPS use with weaker spatial-memory measures, but the main design was cross-sectional and the three-year follow-up included only 13 people (Dahmani & Bohbot, 2020).

The more useful questions are what has been offloaded, whether the skill remains necessary, whether the person can evaluate the result and what happens when support disappears. A pilot may use automation while retaining emergency procedures. A clinician may use decision support but still need to identify an implausible recommendation. A student may use a calculator at one stage while needing to understand what is being calculated at another.

The risk of [deskilling](/concepts/deskilling/) grows when practice disappears but responsibility remains. An older simulator study found that after four months without practice, some discrete instrument-flying procedures deteriorated while continuous control was more stable (Mengelkoch et al., 1971). It is not evidence about AI. It is a reminder that skills differ in how they respond to disuse.

## Completion and learning need different interfaces

A productivity interface has good reason to minimize steps. The user wants the output, not a lesson. The system should expose assumptions, support source checking, communicate uncertainty and leave the decision with a person. It need not force every problem to be rebuilt from first principles.

A learning interface has a different objective. It should not automatically minimize all effort because some effort is the activity through which a skill forms. It should distinguish assistance from substitution: wait for an attempt, diagnose an error from that attempt, give small hints, ask for reasoning, return with a new variation and withdraw support.

For schools and universities, this means that permission or prohibition alone says too little. Educators need to decide which stages produce an artifact and which are meant to reveal understanding or exercise transfer. For employers, the distinction matters when novices train on AI-supported work. If a new employee receives finished decisions from day one, they may produce acceptable output without building the domain understanding needed to notice exceptions.

For product teams, the choice extends beyond model accuracy. It includes when the interface answers, when it asks, how much it reveals, whether it tracks the level of help and whether it tests independent transfer. These are substantive [Human-AI Interaction](/concepts/human-ai-interaction/) decisions, not a decorative layer on top of a model.

For users, the missing skill is often [metacognition](/concepts/metacognition/): knowing whether an explanation has been understood or merely recognized as fluent. It also requires [calibrated trust](/concepts/calibrated-trust/). A direct answer can be appropriate for routine execution and risky in learning, medical interpretation or a high-stakes decision.

<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="interface-matrix">
  <div class="article-data-table__scroll">
    <table>
      <caption>Completion interface versus learning interface</caption>
      <thead>
        <tr><th scope="col">Design choice</th><th scope="col">Completion objective</th><th scope="col">Learning objective</th></tr>
      </thead>
      <tbody>
        <tr><td>First response</td><td>Produce a usable answer quickly.</td><td>Wait for an initial attempt or diagnosis.</td></tr>
        <tr><td>Level of help</td><td>Provide the complete transformation or solution.</td><td>Offer the smallest useful hint and increase help only when needed.</td></tr>
        <tr><td>Error handling</td><td>Correct the output.</td><td>Identify the misconception and ask the learner to repair it.</td></tr>
        <tr><td>Explanation</td><td>Make the result clear enough to use.</td><td>Require explanation in the learner's own words.</td></tr>
        <tr><td>Success measure</td><td>Quality, speed and reliability of the finished result.</td><td>Retention, transfer and performance after support is withdrawn.</td></tr>
        <tr><td>Human responsibility</td><td>Verify assumptions and decide whether the output is fit for use.</td><td>Retain the reasoning needed to detect errors and solve a new variation.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Productivity and learning are legitimate but different objectives. A single interface should not silently treat them as the same task.</figcaption>
</figure>

<aside class="editorial-aside editorial-aside--practice">
  <p class="editorial-aside__label">Simple test</p>
  <p>Before accepting help, ask: am I trying only to complete this task, or to learn how to do it? Which part of the process am I handing to AI? Can I explain the result, solve a similar problem without the tool and notice when the answer is wrong?</p>
</aside>

## Limitations

This is not a systematic review. Sources were selected to examine the claims in *Business Insider* and the distinction between task performance and learning. They concern different populations, subjects, models and outcome measures. Five important works are preprints and may change during review.

Time is the largest gap. Short experiments can show what happens after minutes of use, but not whether people become better at managing assistance over months or gradually practise less on their own. Effects may also differ with age, prior knowledge, language and access to other forms of support.

"Architecture of help" is descriptive language, not a validated construct. Interaction design cannot explain everything. Even a strong tutor operates inside assessment systems, deadlines and incentives that may reward speed over understanding.

## Conclusion

The *Business Insider* article identifies an uncomfortable possibility: a tool can make us more effective at the same moment it removes practice from the process behind the result. That does not amount to one verdict about declining intelligence. It calls for a more precise question.

A model can give us the solution before we have seen the route. Sometimes that is exactly what the task requires. When the goal is learning, however, the route is not wasted motion. It is where a person retrieves, attempts, fails, corrects and tests whether a skill transfers to a new situation.

Instead of asking only whether AI makes us dumber, ask which processes we still perform, which we hand to the tool and whether [human agency](/concepts/human-agency/) remains when the help is removed. The answer will differ between a routine task, mathematics practice, essay writing and a high-stakes decision. That is why one headline-sized question cannot settle the issue.

## References

1. Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences, 122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122

1. Dahmani, L., & Bohbot, V. D. (2020). Habitual use of GPS negatively impacts spatial memory during self-guided navigation. *Scientific Reports, 10*, 6310. https://doi.org/10.1038/s41598-020-62877-0

1. Doshi, A. R., & Hauser, O. P. (2024). Generative AI enhances individual creativity but reduces the collective diversity of novel content. *Science Advances, 10*(28), eadn5290. https://doi.org/10.1126/sciadv.adn5290

1. Dworak, E. M., Revelle, W., & Condon, D. M. (2023). Looking for Flynn effects in a recent online U.S. adult sample: Examining shifts within the SAPA Project. *Intelligence, 98*, 101734. https://doi.org/10.1016/j.intell.2023.101734

1. Gerlich, M. (2025). AI tools in society: Impacts on cognitive offloading and the future of critical thinking. *Societies, 15*(1), 6. https://doi.org/10.3390/soc15010006

1. Hoover, A. (2026, July 7). Is AI making us dumber? *Business Insider*. https://www.businessinsider.com/ai-making-us-dumber-research-2026-7?IR=T

1. Kestin, G., Miller, K., Klales, A., Milbourne, T., & Ponti, G. (2025). AI tutoring outperforms in-class active learning: An RCT introducing a novel research-based design in an authentic educational setting. *Scientific Reports, 15*, 17458. https://doi.org/10.1038/s41598-025-97652-6

1. Kosmyna, N., Hauptmann, E., Yuan, Y. T., Situ, J., Liao, X. H., Beresnitzky, A. V., Braunstein, I., & Maes, P. (2025). *Your Brain on ChatGPT: Accumulation of cognitive debt when using an AI assistant for essay writing task* (Version 2) [Preprint]. arXiv. https://arxiv.org/abs/2506.08872

1. Liu, G., Christian, B., Dumbalska, T., Bakker, M. A., & Dubey, R. (2026). *AI assistance reduces persistence and hurts independent performance* (Version 2) [Preprint]. arXiv. https://arxiv.org/abs/2604.04721

1. Mengelkoch, R. F., Adams, J. A., & Gainer, C. A. (1971). The forgetting of instrument flying skills. *Human Factors, 13*(5), 397-405. https://doi.org/10.1177/001872087101300502

1. Moon, K., Green, A. E., & Kushlev, K. (2025). Homogenizing effect of large language models (LLMs) on creative diversity: An empirical comparison of human and ChatGPT writing. *Computers in Human Behavior: Artificial Humans, 6*, 100207. https://doi.org/10.1016/j.chbah.2025.100207

1. Moon, K., Kushlev, K., Bank, A., Lira Luttges, B., Viskontas, I., Kaufman, J. C., Johnson, D. R., Lee, A., Duckworth, A. L., & Green, A. E. (2026). *The creative link between words and ideas is weakening in the AI era* (Version 6) [Preprint]. PsyArXiv. https://doi.org/10.31234/osf.io/jsz58_v6

1. National Center for Education Statistics. (2025). *2024 mathematics report card at grade 12* (NCES 2024-221). https://www.nationsreportcard.gov/reports/mathematics/2024/g12/

1. Renkl, A., Atkinson, R. K., Maier, U. H., & Staley, R. (2002). From example study to problem solving: Smooth transitions help learning. *The Journal of Experimental Education, 70*(4), 293-315. https://doi.org/10.1080/00220970209599510

1. Risko, E. F., & Gilbert, S. J. (2016). Cognitive offloading. *Trends in Cognitive Sciences, 20*(9), 676-688. https://doi.org/10.1016/j.tics.2016.07.002

1. Roediger, H. L., III, & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science, 17*(3), 249-255. https://doi.org/10.1111/j.1467-9280.2006.01693.x

1. Sinha, T., & Kapur, M. (2021). When problem solving followed by instruction works: Evidence for productive failure. *Review of Educational Research, 91*(5), 761-798. https://doi.org/10.3102/00346543211019105

1. Soderstrom, N. C., & Bjork, R. A. (2015). Learning versus performance: An integrative review. *Perspectives on Psychological Science, 10*(2), 176-199. https://doi.org/10.1177/1745691615569000

1. Sparrow, B., Liu, J., & Wegner, D. M. (2011). Google effects on memory: Cognitive consequences of having information at our fingertips. *Science, 333*(6043), 776-778. https://doi.org/10.1126/science.1207745

1. Stankovic, M., Hirche, E., Kollatzsch, S., & Doetsch, J. N. (2026). *Comment on: Your Brain on ChatGPT: Accumulation of cognitive debt when using an AI assistant for essay writing tasks* [Preprint]. arXiv. https://arxiv.org/abs/2601.00856

1. van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher-student interaction: A decade of research. *Educational Psychology Review, 22*, 271-296. https://doi.org/10.1007/s10648-010-9127-6

1. Wang, R. E., Ribeiro, A. T., Robinson, C. D., Loeb, S., & Demszky, D. (2024). *Tutor CoPilot: A human-AI approach for scaling real-time expertise* [Preprint]. arXiv. https://arxiv.org/abs/2410.03017
