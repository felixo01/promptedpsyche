---
title: "Jak poprosić model o niepewność"
description: "Praktyka proszenia AI o założenia, braki i warunki, które mogą zmienić odpowiedź, bez traktowania deklaracji modelu jako dowodu."
publishedAt: 2026-07-03
draft: true
tags:
  - niepewność
  - weryfikacja
  - zaufanie
  - AI literacy
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "ask-model-about-uncertainty"
type: "practice"
category: "Praktyka"
---

Model może odpowiedzieć płynnie nawet wtedy, gdy brakuje mu ważnych informacji. Ta praktyka pomaga zapytać nie tylko o samą odpowiedź, ale też o jej założenia, luki i warunki, które mogłyby zmienić wniosek.

Celem nie jest uzyskanie sztucznej liczby pewności. Celem jest zobaczenie, gdzie odpowiedź jest mocniejsza, gdzie jest robocza i co człowiek powinien sprawdzić poza modelem.

## Kiedy używać

- Gdy odpowiedź dotyczy złożonej sytuacji, decyzji albo interpretacji.
- Gdy brakuje danych wejściowych, kontekstu albo jasnych kryteriów.
- Gdy model brzmi zbyt pewnie.
- Gdy chcesz przygotować pytania kontrolne przed dalszym krokiem.

## Czego nie robić

- Nie proś modelu o procentową pewność, jeśli nie ma podstaw do takiej liczby.
- Nie traktuj deklaracji niepewności jako obiektywnego pomiaru.
- Nie używaj tej praktyki po to, żeby model wziął odpowiedzialność za decyzję.
- Nie uznawaj długiej listy zastrzeżeń za dowód jakości odpowiedzi.

## Prompt

```text
Przeanalizuj swoją odpowiedź pod kątem niepewności.

Wypisz:

1. Jakie założenia przyjąłeś.
2. Jakich informacji brakuje, żeby odpowiedź była mocniejsza.
3. Które elementy odpowiedzi są najbardziej oparte na podanych danych.
4. Które elementy są hipotezą albo roboczą interpretacją.
5. Co mogłoby zmienić Twoją odpowiedź.
6. Co powinienem sprawdzić poza modelem, zanim użyję tej odpowiedzi.

Nie podawaj sztucznej liczby pewności. Zamiast tego opisz poziom ostrożności prostym językiem: wysoka ostrożność, średnia ostrożność albo niska ostrożność. Na końcu zaproponuj 5 pytań, które powinienem zadać przed dalszym krokiem.
```

## Krótki przykład

Model rekomenduje jeden kierunek działania dla zespołu, ale użytkownik podał tylko krótki opis problemu. Po użyciu promptu widać, że odpowiedź zakłada stabilny termin, mały zespół i brak ograniczeń budżetowych. Model może pomóc nazwać te założenia i brakujące informacje, ale nie dowodzi, że rekomendacja jest prawdziwa. Użytkownik dostaje listę rzeczy do sprawdzenia przed decyzją.

## Dlaczego to pomaga

Ten prompt pomaga budować [skalibrowane zaufanie](/pl/concepts/calibrated-trust/). Zamiast traktować płynną odpowiedź jako gotowy wniosek, użytkownik widzi, które części zależą od danych, kontekstu i założeń.

To także ćwiczenie [czujności epistemicznej](/pl/concepts/epistemic-vigilance/). Model działa w ramach dostępnego [context window](/pl/concepts/context-window/), więc może porządkować materiał, ale nie zna wszystkiego, czego człowiek nie podał.

## Ryzyko i ograniczenia

- Model może nie rozpoznać własnych braków.
- Lista założeń może wyglądać kompletnie, mimo że taka nie jest.
- Opis ostrożności nie jest pomiarem prawdy ani gwarancją jakości.
- W sprawach wysokiego ryzyka weryfikacja powinna wyjść poza czat i trafić do właściwych ludzi, źródeł albo procedur.

## Powiązane pojęcia

- [Skalibrowane zaufanie](/pl/concepts/calibrated-trust/)
- [Epistemic vigilance (czujność epistemiczna)](/pl/concepts/epistemic-vigilance/)
- [Odpowiedź modelu](/pl/concepts/model-output/)
- [Context window (okno kontekstu)](/pl/concepts/context-window/)
- [Cognitive load (obciążenie poznawcze)](/pl/concepts/cognitive-load/)

## Dalsza lektura

- [Zaufanie w epoce gotowych odpowiedzi](/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/)
- [Model nie pamięta. Model ma kontekst.](/pl/articles/model-nie-pamieta-model-ma-kontekst/)
- [Brzmi dobrze, ale to nie znaczy, że jest prawdziwe](/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/)
