---
title: "Jak oddzielić fakty od interpretacji"
description: "Praktyka porządkowania materiału przed decyzją: co jest faktem, co interpretacją, co hipotezą i czego nadal brakuje."
publishedAt: 2026-07-03
draft: true
tags:
  - decyzje
  - interpretacja
  - AI literacy
  - odpowiedzialność
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "separate-facts-from-interpretations"
type: "practice"
category: "Praktyka"
---

W pracy z AI uporządkowane streszczenie może wyglądać jak gotowy wniosek. W jednym akapicie łatwo mieszają się fakty, interpretacje, przypuszczenia i rekomendacje. Ta praktyka pomaga zatrzymać ten skrót.

Celem jest mapa materiału przed decyzją, nie decyzja podjęta przez model. AI może pomóc rozdzielić warstwy informacji, ale człowiek nadal odpowiada za ocenę, kontekst i dalszy krok.

## Kiedy używać

- Przed decyzją opartą na mailach, notatkach, raportach albo rozmowach.
- Gdy materiał jest chaotyczny i obciąża poznawczo.
- Gdy chcesz przygotować pytania do zespołu, klienta albo eksperta.
- Gdy odpowiedź AI zawiera wnioski, ale nie pokazuje drogi dojścia.

## Czego nie robić

- Nie proś modelu o ostateczną decyzję.
- Nie traktuj hipotez jako faktów tylko dlatego, że są uporządkowane.
- Nie pomijaj informacji, które nie pasują do wygodnego wniosku.
- Nie używaj tej praktyki do uzasadniania decyzji podjętej z góry.

## Prompt

```text
Pomóż mi uporządkować poniższy materiał przed podjęciem decyzji.

Nie podejmuj decyzji za mnie. Nie diagnozuj ludzi i nie zgaduj ukrytych intencji.

Podziel informacje na:

1. Fakty widoczne w materiale.
2. Interpretacje lub oceny.
3. Hipotezy, które mogą być prawdziwe, ale wymagają sprawdzenia.
4. Założenia, które pojawiają się w materiale lub w moim opisie.
5. Braki informacyjne.
6. Pytania, które powinienem zadać przed dalszym krokiem.

Następnie wskaż, które wnioski byłyby przedwczesne na podstawie tego materiału. Jeśli zaproponujesz możliwe kierunki działania, opisz je jako opcje, nie jako decyzję.

Materiał:
[wklej materiał]
```

## Krótki przykład

W notatce pojawia się zdanie: "Klient jest niezadowolony i projekt jest zagrożony". Prompt pomaga rozdzielić widoczny fakt, na przykład opóźnioną odpowiedź klienta, od interpretacji o niezadowoleniu i hipotezy o ryzyku projektu. Może też wskazać brakujące informacje: czy klient zgłosił problem, czego oczekuje i jaki jest rzeczywisty termin. Dzięki temu użytkownik nie zamienia pierwszej interpretacji w decyzję.

## Dlaczego to pomaga

Ten prompt wspiera [wspomaganie decyzji](/pl/concepts/wspomaganie-decyzji/) bez przenoszenia decyzji na model. Użytkownik dostaje uporządkowanie materiału, a nie gotowy wyrok.

Pomaga też utrzymać [skalibrowane zaufanie](/pl/concepts/calibrated-trust/). [Odpowiedź modelu](/pl/concepts/model-output/) może być użyteczną mapą, ale nie zastępuje sprawdzenia faktów, pytań do ludzi ani odpowiedzialności za dalszy krok.

## Ryzyko i ograniczenia

- Model może błędnie uznać interpretację za fakt.
- Materiał wejściowy może być niepełny, stronniczy albo wyrwany z kontekstu.
- Samo uporządkowanie może stworzyć wrażenie większej pewności niż naprawdę istnieje.
- W sprawach prawnych, HR, zdrowia, bezpieczeństwa, przemocy albo wysokiego ryzyka potrzebne są właściwe osoby, procedury i źródła.

## Powiązane pojęcia

- [Wspomaganie decyzji](/pl/concepts/wspomaganie-decyzji/)
- [Skalibrowane zaufanie](/pl/concepts/calibrated-trust/)
- [Sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/)
- [Epistemic vigilance (czujność epistemiczna)](/pl/concepts/epistemic-vigilance/)
- [Odpowiedź modelu](/pl/concepts/model-output/)

## Dalsza lektura

- [AI nie czyta ludzi. Pomaga uporządkować sytuację.](/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/)
- [Dobre streszczenie to jeszcze nie dobra decyzja](/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/)
- [Model widzi tekst, a nie całą relację](/pl/notes/model-widzi-tekst-nie-cala-relacje/)
