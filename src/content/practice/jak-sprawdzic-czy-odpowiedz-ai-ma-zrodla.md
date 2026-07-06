---
title: "Jak sprawdzić, czy odpowiedź AI ma źródła"
description: "Praktyka rozkładania odpowiedzi AI na twierdzenia, źródła i miejsca ryzyka, zanim tekst trafi do artykułu, prezentacji, notatki zespołowej albo decyzji."
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

Płynna odpowiedź AI może wyglądać jak gotowe wyjaśnienie. Problem w tym, że sama forma nie pokazuje jeszcze, skąd pochodzą twierdzenia. Link, tytuł publikacji albo nazwisko autora też nie są dowodem, dopóki człowiek nie sprawdzi, czy źródło istnieje i czy rzeczywiście wspiera daną tezę.

Ta praktyka pomaga potraktować odpowiedź jako materiał do sprawdzenia, a nie jako gotową podstawę. Chodzi o oddzielenie twierdzeń wymagających źródła od interpretacji, wskazanie miejsc najbardziej ryzykownych i przygotowanie pracy, którą trzeba wykonać poza rozmową z modelem.

Najlepiej sprawdza się przy szkicach artykułów, notatkach dla zespołu, prezentacjach i zdaniach, w których pojawiają się liczby, daty, nazwiska, badania albo nazwy instytucji.

## Kiedy to pomaga

- Gdy odpowiedź zawiera daty, liczby, nazwiska, przepisy, badania, raporty albo nazwy instytucji.
- Gdy tekst ma trafić do artykułu, prezentacji, notatki dla zespołu, oferty albo decyzji.
- Gdy model podaje linki, cytowania albo tytuły, których nie sprawdziłeś samodzielnie.
- Gdy chcesz ustalić, które fragmenty odpowiedzi są hipotezą, które interpretacją, a które wymagają realnego źródła.

## O co poprosić model

Użyj modelu do uporządkowania ryzyka, nie do samopotwierdzenia. Źródła sprawdza człowiek poza modelem, najlepiej w osobnym kroku.

```text
Przeczytaj swoją poprzednią odpowiedź i pomóż mi sprawdzić, które jej fragmenty wymagają źródeł.

Podziel odpowiedź na 5 części:

1. Twierdzenia, które wymagają źródła.
2. Twierdzenia, które są interpretacją albo ogólnym wyjaśnieniem.
3. Podane linki, tytuły, nazwiska lub cytowania, które muszę sprawdzić poza rozmową.
4. Miejsca, w których źródło musi nie tylko istnieć, ale też wspierać tę konkretną tezę.
5. Informacje, których nie powinienem używać bez aktualnej, zewnętrznej weryfikacji.

Nie wymyślaj publikacji, linków ani autorów. Nie udawaj, że sprawdzasz źródła, jeśli nie masz do nich dostępu. Jeśli nie możesz czegoś zweryfikować, nazwij to wprost. Na końcu wskaż 3 fragmenty najbardziej ryzykowne, jeśli użyję ich bez sprawdzenia.
```

## Co sprawdzić samodzielnie

- Czy źródło rzeczywiście istnieje.
- Czy jest pierwotne, wiarygodne i wystarczająco aktualne dla tego tematu.
- Czy mówi dokładnie to, co przypisał mu model.
- Czy liczby, daty, nazwiska i zakres badania zgadzają się z materiałem źródłowym.
- Czy odpowiedź nie skleja kilku różnych źródeł w jedną zbyt pewną tezę.

## Co może pójść źle

- Model może podać źródło, które brzmi prawdopodobnie, ale nie istnieje.
- Model może wskazać istniejące źródło, które nie wspiera danej tezy.
- Model może pomylić autora, rok, zakres badania albo kontekst.
- Użytkownik może potraktować obecność cytowania jak dekorację wiarygodności.

## Lepszy sposób użycia odpowiedzi

Model napisał w szkicu prezentacji, że konkretna metoda "zwiększa skuteczność zespołów o 30%" i że potwierdzają to badania z ostatnich lat. Dobra reakcja nie polega na poproszeniu modelu, żeby "dodał źródła". Lepiej najpierw oznaczyć tę liczbę jako twierdzenie wymagające weryfikacji, sprawdzić, czy badanie istnieje, a potem zobaczyć, czy dotyczy podobnego typu zespołu, metody i kontekstu. Dopiero wtedy warto zdecydować, czy zdanie zostaje, zostaje osłabione, czy znika.

Ten prompt przesuwa uwagę z gotowej [odpowiedzi modelu](/pl/concepts/model-output/) na pytanie, na czym opiera się dana informacja. To prosty trening [czujności epistemicznej](/pl/concepts/epistemic-vigilance/): nie tylko "czy to brzmi dobrze?", ale "co można sprawdzić, gdzie i przez kogo?".

## Krótka zasada

Nie pytaj modelu, czy ma rację. Poproś go, żeby pokazał, co trzeba sprawdzić poza modelem.

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
