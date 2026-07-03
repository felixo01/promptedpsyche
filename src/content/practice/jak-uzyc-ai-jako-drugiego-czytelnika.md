---
title: "Jak użyć AI jako drugiego czytelnika"
description: "Praktyka używania AI do redakcyjnego sprawdzenia tekstu bez oddawania modelowi autorstwa, tonu ani decyzji o sensie."
publishedAt: 2026-07-03
draft: true
tags:
  - redakcja
  - pisanie
  - AI literacy
  - odpowiedzialność
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "ai-as-second-reader"
type: "practice"
category: "Praktyka"
---

Autor tekstu zwykle wie, co chciał powiedzieć. Właśnie dlatego łatwo przeoczyć niejasne przejścia, brakujący kontekst albo zdania, które czytelnik może zrozumieć inaczej. AI może pomóc jako drugi czytelnik, ale nie powinno przejmować autorstwa.

Ta praktyka ustawia model jako narzędzie redakcyjnego dystansu. Ma pomóc zobaczyć możliwe reakcje czytelnika, a nie automatycznie wygładzić tekst.

## Kiedy używać

- Przed publikacją artykułu, notatki, maila albo prezentacji.
- Gdy tekst jest zrozumiały dla autora, ale może być niejasny dla odbiorcy.
- Gdy chcesz sprawdzić, czy argument prowadzi czytelnika krok po kroku.
- Gdy tekst może brzmieć zbyt pewnie, zbyt ostro albo zbyt ogólnie.

## Czego nie robić

- Nie proś modelu o przepisanie tekstu w cudzy styl.
- Nie oddawaj modelowi decyzji o tezie, tonie ani finalnej wersji.
- Nie akceptuj wszystkich sugestii tylko dlatego, że brzmią profesjonalnie.
- Nie zamieniaj autorskiego tekstu w neutralną, wygładzoną wypowiedź bez charakteru.

## Prompt

```text
Przeczytaj mój tekst jak drugi czytelnik, nie jak autor.

Nie przepisuj całości. Pomóż mi zobaczyć, jak tekst może zostać odebrany.

Wypisz:

1. Główne twierdzenie tekstu, tak jak je rozumiesz.
2. Miejsca, w których czytelnik może się zgubić.
3. Zdania, które brzmią zbyt pewnie wobec dostępnych argumentów.
4. Brakujący kontekst, którego czytelnik może potrzebować.
5. Fragmenty, które mogą zostać odczytane inaczej niż zamierzam.
6. Trzy konkretne pytania redakcyjne, które powinienem sobie zadać.

Nie zmieniaj tonu na marketingowy. Nie wygładzaj tekstu automatycznie. Nie przejmuj autorstwa. Jeśli proponujesz poprawkę, wyjaśnij, jaki problem czytelniczy ona rozwiązuje.

Tekst:
[wklej tekst]
```

## Krótki przykład

Autor pisze krótki tekst o AI w organizacji i zakłada, że czytelnik rozumie różnicę między automatyzacją a wsparciem decyzji. Prompt może pokazać, że ten skrót jest jasny dla autora, ale niekoniecznie dla odbiorcy. Model sugeruje pytania redakcyjne i miejsca wymagające kontekstu, zamiast przejmować ton tekstu. Ostateczna decyzja o zmianach zostaje po stronie autora.

## Dlaczego to pomaga

Ten prompt traktuje [odpowiedź modelu](/pl/concepts/model-output/) jako informację zwrotną, a nie gotowy tekst. Model może pokazać, gdzie czytelnik może się zatrzymać, ale nie wie, jaki głos, rytm i sens autor chce zachować.

Praktyka wspiera [sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/). AI może zmniejszyć [cognitive load](/pl/concepts/cognitive-load/) w redakcji, ale nie zastępuje decyzji autora.

## Ryzyko i ograniczenia

- Model może premiować gładkość zamiast precyzji.
- Sugestie mogą osłabić autorski głos.
- Model nie zna realnego odbiorcy ani pełnego kontekstu publikacji.
- Autor nadal musi ocenić, które uwagi są trafne i co zmienić.

## Powiązane pojęcia

- [Odpowiedź modelu](/pl/concepts/model-output/)
- [Mental model (model mentalny)](/pl/concepts/mental-model/)
- [Sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/)
- [Komunikacja zapośredniczona przez AI](/pl/concepts/ai-mediated-communication/)
- [Cognitive load (obciążenie poznawcze)](/pl/concepts/cognitive-load/)

## Dalsza lektura

- [Nie chodzi tylko o prompt](/pl/articles/nie-chodzi-tylko-o-prompt/)
- [AI jako lustro. Dlaczego tak łatwo się z nim dogadujemy?](/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/)
- [Dobre streszczenie to jeszcze nie dobra decyzja](/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/)
