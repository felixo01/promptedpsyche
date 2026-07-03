---
title: "Jak sprawdzić, czy odpowiedź AI ma źródła"
description: "Praktyka sprawdzania, które części odpowiedzi AI wymagają źródeł i jak przygotować zewnętrzną weryfikację bez proszenia modelu o pewność na skróty."
publishedAt: 2026-07-03
draft: true
tags:
  - źródła
  - weryfikacja
  - AI literacy
  - zaufanie
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "checking-ai-answer-sources"
type: "practice"
category: "Praktyka"
---

Płynna odpowiedź AI może wyglądać jak gotowe wyjaśnienie, ale sama forma nie pokazuje jeszcze, skąd pochodzą twierdzenia. Ta praktyka pomaga potraktować odpowiedź jako materiał do sprawdzenia: rozdzielić fakty, interpretacje, miejsca wymagające źródeł i fragmenty, których nie warto używać bez zewnętrznej kontroli.

Nie chodzi o to, żeby model sam siebie "potwierdził". Chodzi o przygotowanie listy elementów, które człowiek powinien sprawdzić poza rozmową.

## Kiedy używać

- Gdy odpowiedź zawiera daty, liczby, nazwiska, przepisy, badania, raporty albo nazwy instytucji.
- Gdy tekst ma trafić do artykułu, prezentacji, notatki dla zespołu, oferty albo decyzji.
- Gdy model podaje ogólne twierdzenia bez linków, nazw źródeł albo opisu kontekstu.
- Gdy chcesz ustalić, które fragmenty są hipotezą, które interpretacją, a które wymagają sprawdzenia w realnych materiałach.

## Czego nie robić

- Nie proś modelu o wymyślenie bibliografii do gotowego tekstu.
- Nie traktuj samego tonu pewności jako dowodu.
- Nie zakładaj, że link, tytuł albo cytowanie istnieje tylko dlatego, że model je podał.
- Nie używaj tej praktyki jako zastępstwa dla samodzielnego sprawdzenia źródeł.

## Prompt

```text
Przeczytaj swoją poprzednią odpowiedź i pomóż mi sprawdzić, na czym opierają się jej najważniejsze informacje.

Podziel odpowiedź na:

1. Twierdzenia, które wymagają źródła.
2. Twierdzenia, które są raczej ogólnym wyjaśnieniem albo interpretacją.
3. Informacje, których nie powinieneś podawać bez aktualnej weryfikacji.
4. Typy źródeł, których powinienem szukać poza rozmową, żeby to sprawdzić.

Nie wymyślaj konkretnych publikacji, linków ani autorów, jeśli nie masz pewności. Jeśli czegoś nie możesz zweryfikować, napisz to wprost. Na końcu wskaż, które 3 fragmenty odpowiedzi są najbardziej ryzykowne, jeśli użyję ich bez sprawdzenia.
```

## Krótki przykład

Model napisał, że konkretna metoda "zwiększa skuteczność zespołów o 30%" i że potwierdzają to badania z ostatnich lat. Po użyciu promptu użytkownik nie dostaje potwierdzenia tej liczby, tylko rozdzielenie: liczba wymaga źródła, ogólne wyjaśnienie może być interpretacją, a do sprawdzenia potrzebne byłyby raporty, artykuły badawcze albo dokumenty instytucji. To pomaga zaplanować zewnętrzną weryfikację zamiast traktować pewny ton jako dowód.

## Dlaczego to pomaga

Ten prompt przesuwa uwagę z gotowej odpowiedzi na pytanie, na czym opiera się dana informacja. Ułatwia zobaczenie, że [odpowiedź modelu](/pl/concepts/model-output/) może być szkicem, mapą pytań albo propozycją interpretacji, ale nie automatycznie źródłem wiedzy.

To także prosty trening [czujności epistemicznej](/pl/concepts/epistemic-vigilance/). Zamiast pytać tylko "czy to brzmi dobrze?", użytkownik pyta: "na czym to się opiera, co można sprawdzić i czego jeszcze nie wiem?".

## Ryzyko i ograniczenia

- Model nadal może błędnie ocenić, które twierdzenia wymagają źródła.
- Model może nie znać aktualnych danych albo zmian po dacie swojej wiedzy.
- Poprawnie wskazane typy źródeł nadal trzeba sprawdzić poza modelem.
- Sama obecność linku, tytułu albo cytatu nie wystarcza. Trzeba sprawdzić, czy źródło istnieje i czy wspiera konkretną tezę.

## Powiązane pojęcia

- [Grounding: oparcie odpowiedzi na źródłach](/pl/concepts/oparcie-odpowiedzi-na-zrodlach/)
- [Epistemic vigilance](/pl/concepts/epistemic-vigilance/)
- [Calibrated trust](/pl/concepts/calibrated-trust/)
- [Model output](/pl/concepts/model-output/)
- [Halucynacja modelu](/pl/concepts/halucynacja-modelu/)

## Dalsza lektura

- [Zaufanie w epoce gotowych odpowiedzi](/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/)
- [Brzmi dobrze, ale to nie znaczy, że jest prawdziwe](/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/)
- [Nie chodzi tylko o prompt](/pl/articles/nie-chodzi-tylko-o-prompt/)
