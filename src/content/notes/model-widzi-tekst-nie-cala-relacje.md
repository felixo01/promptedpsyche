---
title: "Model widzi tekst, nie całą relację"
description: "AI może pomóc analizować komunikację, ale widzi tylko tekst i kontekst, który mu podamy. Nie zna całej historii relacji ani intencji ludzi."
publishedAt: 2026-07-02
draft: false
tags:
  - komunikacja
  - kontekst
  - AI literacy
  - Human-AI Interaction
author: "Feliks Mamczur"
context: "Notatka"
lang: "pl"
translationKey: "model-sees-text"
---

Ktoś wkleja do AI maila, komentarz z dokumentu albo fragment rozmowy i pyta: co to właściwie znaczy? Czasem pytanie jest jeszcze ostrzejsze: co ta osoba naprawdę ma na myśli? Czy jest zła? Czy manipuluje? Czy próbuje przerzucić odpowiedzialność?

To bardzo ludzki odruch. Trudna wiadomość rzadko jest tylko tekstem. Niesie zmęczenie, wcześniejsze rozmowy, niedopowiedziane decyzje, hierarchię, terminy i emocje. Problem polega na tym, że model nie widzi całej tej relacji. Widzi wiadomość, kontekst rozmowy i to, co użytkownik zdecydował się dopisać.

AI może pomóc. Może uporządkować możliwe odczytania, nazwać niejasne miejsca, wypisać brakujące informacje i sprawdzić, czy odpowiedź nie eskaluje napięcia. Nie powinna jednak występować jako ktoś, kto wie, co dzieje się między ludźmi poza tekstem.

## Tekst to nie wszystko

Mail jest fragmentem sytuacji. Komentarz w dokumencie jest fragmentem sytuacji. Wiadomość na czacie też jest fragmentem sytuacji. Nawet jeśli wygląda na kompletną, zwykle nie zawiera pełnej historii współpracy, tonu spotkań, wcześniejszych ustaleń, układu organizacyjnego ani tego, czego nikt nie powiedział wprost.

Model pracuje w granicach [context window](/pl/concepts/context-window/). To znaczy, że jego odpowiedź zależy od tekstu, który dostał, od instrukcji użytkownika i od dostępnego kontekstu. Jeśli czegoś nie ma w tym materiale, model może to najwyżej zasugerować jako hipotezę. Nie może tego wiedzieć.

Dlatego [model output](/pl/concepts/model-output/) w analizie korespondencji trzeba traktować jako pomoc w myśleniu, nie jako prawdę o relacji. Odpowiedź może brzmieć pewnie, spokojnie i psychologicznie. Może nawet trafić w coś ważnego. Nadal pozostaje interpretacją na podstawie ograniczonego materiału.

To ograniczenie jest szczególnie ważne w konfliktach. Im większe napięcie, tym łatwiej chcieć szybkiej opowieści: kto zawinił, kto unika odpowiedzialności, kto gra nie fair. Model może taką opowieść ułożyć. Nie znaczy to, że ona jest prawdziwa.

## Pułapka nadinterpretacji

Największe ryzyko pojawia się wtedy, gdy spójna odpowiedź zaczyna wyglądać jak trafna odpowiedź. AI może zebrać kilka zdań, dodać prawdopodobne tło i stworzyć narrację, która brzmi jak diagnoza sytuacji. To bywa wygodne, bo zmniejsza niepewność. Ale niepewność nie znika tylko dlatego, że tekst został ładnie uporządkowany.

Własny [mental model](/pl/concepts/mental-model/) sytuacji także wpływa na to, jak czytamy odpowiedź modelu. Jeśli już podejrzewamy, że ktoś unika odpowiedzialności, łatwiej przyjąć interpretację, która to potwierdza. Jeśli czujemy się atakowani, łatwiej zobaczyć atak tam, gdzie jest formalność, stres albo nieprecyzyjny styl.

Właśnie tu potrzebna jest [epistemic vigilance](/pl/concepts/epistemic-vigilance/): czujność wobec informacji i wobec własnych interpretacji. Nie chodzi o nieufność wobec wszystkiego. Chodzi o proste pytanie: skąd wiem to, co wydaje mi się oczywiste?

Problemem nie jest korzystanie z AI przy trudnej komunikacji. Problemem jest zapominanie, że model widzi tylko część sytuacji. Może pomóc nazwać możliwe odczytania, ale nie powinien zamykać sprawy za człowieka.

## Bezpieczniejszy sposób pytania

<div class="prompt-example prompt-example--bad" data-copyable-prompt>
  <div class="prompt-example__header">
    <p class="prompt-example__label">Nie pytaj tak</p>
    <button class="prompt-example__copy" type="button" aria-label="Kopiuj przykładowy prompt" data-copy-label="Kopiuj" data-copied-label="Skopiowano">Kopiuj</button>
  </div>
  <pre class="prompt-example__body"><code data-prompt-text>Co ta osoba naprawdę myśli?</code></pre>
</div>

<div class="prompt-example prompt-example--better" data-copyable-prompt>
  <div class="prompt-example__header">
    <p class="prompt-example__label">Lepsze pytanie</p>
    <button class="prompt-example__copy" type="button" aria-label="Kopiuj przykładowy prompt" data-copy-label="Kopiuj" data-copied-label="Skopiowano">Kopiuj</button>
  </div>
  <pre class="prompt-example__body"><code data-prompt-text>Jakie są możliwe odczytania tej wiadomości?
Co jest faktem, co interpretacją, a czego nie wiemy?</code></pre>
</div>

Takie pytanie zmienia rolę AI. Model nie ma zgadywać czyjejś psychiki. Ma pomóc oddzielić widoczne informacje od hipotez. Ma pokazać luki, napięcia i miejsca, które wymagają doprecyzowania.

To mniej efektowne niż szybka odpowiedź o ukrytych intencjach. Jest jednak bezpieczniejsze i bardziej odpowiedzialne. W komunikacji między ludźmi nie chodzi tylko o to, żeby odpowiedzieć szybko. Chodzi o to, żeby nie pomylić własnego napięcia z wiedzą o drugiej osobie.

Model widzi tekst. Człowiek musi pamiętać o relacji, której w tym tekście może nie być.
