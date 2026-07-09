---
title: "Jak poprosić model o niepewność"
description: "Praktyka proszenia AI o pokazanie założeń, braków, poziomu ostrożności i warunków, które mogą zmienić odpowiedź."
publishedAt: 2026-07-03
draft: false
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

Model może odpowiedzieć płynnie nawet wtedy, gdy brakuje mu ważnych informacji. Ta praktyka pomaga zatrzymać się przy odpowiedzi, która brzmi gotowo, i zapytać: co jest znane, co jest prawdopodobne, co jest założeniem, czego brakuje i co mogłoby zmienić wniosek.

Celem nie jest wymuszenie liczby pewności. Celem jest lepszy osąd: które fragmenty odpowiedzi są mocniejsze, które są robocze i co człowiek powinien sprawdzić poza modelem przed dalszym krokiem. Ten wpis dotyczy ostrożności wobec wniosku; osobna praktyka sprawdza, czy model miał wystarczający kontekst wejściowy.

## Kiedy to pomaga

- Gdy odpowiedź dotyczy złożonej sytuacji, decyzji albo interpretacji.
- Gdy brakuje danych wejściowych, kontekstu albo jasnych kryteriów.
- Gdy model brzmi zbyt pewnie.
- Gdy chcesz przygotować pytania sprawdzające, zanim użyjesz odpowiedzi.

## O co poprosić model

Poproś model o rozdzielenie odpowiedzi na to, co wiadomo, co jest prawdopodobne, co jest założeniem i czego nadal brakuje. Nie proś o sztuczną precyzję.

```text
Przeanalizuj swoją poprzednią odpowiedź pod kątem niepewności.

Podziel ją na 6 części:

1. Co wynika bezpośrednio z podanych informacji.
2. Co jest prawdopodobną interpretacją, ale nie faktem.
3. Jakie założenia przyjąłeś.
4. Jakich informacji brakuje, żeby odpowiedź była mocniejsza.
5. Co mogłoby zmienić tę odpowiedź.
6. Co powinienem sprawdzić poza modelem albo w rozmowie z właściwą osobą przed użyciem tej odpowiedzi.

Nie podawaj procentowej pewności, jeśli nie masz do tego podstaw. Zamiast tego opisz poziom ostrożności prostym językiem: wysoka ostrożność, średnia ostrożność albo niska ostrożność. Wyjaśnij, z czego ten poziom ostrożności wynika i czego nie obejmuje. Na końcu zaproponuj 5 pytań, które powinienem zadać przed dalszym krokiem.
```

## Co sprawdzić samodzielnie

- Czy model nie przyjął warunków, których nie podałeś.
- Czy brakujące informacje da się szybko uzupełnić.
- Czy odpowiedź zależy od danych, które mogą być nieaktualne albo niepełne.
- Czy poziom ostrożności jest opisem pomocniczym, a nie pomiarem prawdy.
- Czy odpowiedź nie miesza braku danych z pewnością stylu.
- Czy decyzja wymaga rozmowy z człowiekiem, źródła, procedury albo dodatkowego kontekstu.

## Co może pójść źle

- Model może nie zauważyć własnych luk.
- Lista założeń może wyglądać kompletnie, mimo że nadal czegoś brakuje.
- Etykieta ostrożności może zacząć brzmieć jak obiektywny wynik.
- Zbyt długa lista zastrzeżeń może sparaliżować działanie zamiast pomóc w rozsądnym kolejnym kroku.
- Użytkownik może potraktować ostrożniejszą odpowiedź jak weryfikację faktów.

## Lepszy sposób użycia odpowiedzi

Model rekomenduje jeden kierunek działania dla zespołu, ale użytkownik podał tylko krótki opis problemu. Po użyciu promptu widać, że odpowiedź zakłada stabilny termin, mały zespół i brak ograniczeń budżetowych. To nie znaczy, że rekomendacja jest fałszywa. Znaczy tylko, że jej użycie zależy od warunków, które trzeba najpierw dopowiedzieć albo sprawdzić.

Ten prompt pomaga budować [skalibrowane zaufanie](/pl/concepts/calibrated-trust/). Zamiast traktować płynną odpowiedź jako gotowy wniosek, użytkownik widzi, które części zależą od danych, kontekstu i założeń. To także ćwiczenie [czujności epistemicznej](/pl/concepts/epistemic-vigilance/): model może porządkować materiał w ramach dostępnego [context window](/pl/concepts/context-window/), ale nie zna wszystkiego, czego człowiek nie podał.

## Krótka zasada

Nie pytaj modelu o sztuczną pewność. Poproś go, żeby pokazał, od czego zależy odpowiedź i co trzeba wiedzieć przed działaniem.

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
