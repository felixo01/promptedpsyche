---
title: "Jak oddzielić fakty od interpretacji"
description: "Praktyka rozdzielania widocznych faktów, interpretacji, założeń, ocen i brakujących pytań, zanim powstanie wniosek albo decyzja."
publishedAt: 2026-07-03
draft: false
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

W pracy z AI uporządkowane streszczenie może wyglądać jak gotowy wniosek. W jednym akapicie łatwo mieszają się fakty, interpretacje, założenia, oceny i rekomendacje. Ta praktyka pomaga zatrzymać ten skrót, zanim pierwsze odczytanie sytuacji zacznie działać jak decyzja.

Celem jest mapa materiału przed decyzją, nie decyzja podjęta przez model. AI może pomóc rozdzielić warstwy informacji, ale człowiek nadal odpowiada za ocenę, kontekst i dalszy krok. Emocje też są ważną informacją o sytuacji, ale nie są tym samym co fakt, który można wskazać, zacytować albo sprawdzić.

Ta praktyka dotyczy materiału: wiadomości e-mail, notatki, raportu, transkrypcji albo odpowiedzi modelu. Jeśli chcesz sprawdzić przede wszystkim własne pierwsze odczytanie sytuacji, lepsza będzie praktyka o założeniach.

## Kiedy to pomaga

- Przed decyzją opartą na wiadomościach e-mail, notatkach, raportach albo rozmowach.
- Gdy materiał jest chaotyczny, emocjonalny albo obciąża poznawczo.
- Gdy chcesz zmniejszyć pewność pierwszej interpretacji bez ignorowania emocji.
- Gdy chcesz przygotować pytania do zespołu, klienta albo eksperta.
- Gdy odpowiedź AI zawiera wnioski, ale nie pokazuje drogi dojścia.

## O co poprosić model

Poproś model o tabelę albo listę warstw. Najważniejsze rozróżnienie: co można wskazać w materiale, co jest interpretacją, co jest założeniem, co jest oceną i jakie pytanie trzeba zadać przed decyzją.

```text
Pomóż mi uporządkować poniższy materiał przed podjęciem decyzji.

Nie podejmuj decyzji za mnie. Nie diagnozuj ludzi i nie zgaduj ukrytych intencji.

Podziel materiał na 6 kolumn:

1. Fakt: co można zacytować, zaobserwować albo wskazać w materiale.
2. Interpretacja: co ktoś może myśleć, że ten fakt znaczy.
3. Założenie: co zostaje dodane bez wystarczającego potwierdzenia.
4. Ocena lub osąd: gdzie pojawia się wartościowanie osoby, zespołu, sytuacji albo ryzyka.
5. Alternatywne odczytanie: jaka inna interpretacja też pasuje do tego samego faktu.
6. Brakujące pytanie: czego trzeba się dowiedzieć przed dalszym krokiem.

Następnie wskaż, które wnioski byłyby przedwczesne na podstawie tego materiału. Jeśli zaproponujesz możliwe kierunki działania, opisz je jako opcje, nie jako decyzję. Nie pomijaj informacji, które nie pasują do najwygodniejszego wniosku. Jeśli emocja jest widoczna w materiale, nazwij ją jako sygnał do sprawdzenia, nie jako dowód intencji.

Materiał:
[wklej materiał]
```

## Co sprawdzić samodzielnie

- Czy "fakt" naprawdę da się wskazać, zacytować albo sprawdzić.
- Czy ta sama informacja może wspierać więcej niż jedną interpretację.
- Czy ocena nie została przemycona jako neutralny opis sytuacji.
- Czy założenia nie pochodzą głównie z napięcia, zmęczenia albo wcześniejszej historii.
- Czy brakuje głosu osoby, zespołu albo źródła, którego dotyczy sprawa.
- Czy emocja pomaga zauważyć stawkę, ale nie zastępuje sprawdzenia sytuacji.
- Czy ćwiczenie nie zamienia niepewności w tabelę, która tylko wygląda bezstronnie.

## Co może pójść źle

- Model może błędnie uznać interpretację za fakt.
- Uporządkowana tabela może stworzyć wrażenie większej pewności i bezstronności niż istnieje.
- Użytkownik może użyć ćwiczenia do obrony decyzji podjętej wcześniej.
- Emocje mogą zostać zignorowane zamiast nazwane i oddzielone od faktów.
- W sprawach prawnych, HR, zdrowia, bezpieczeństwa, przemocy albo wysokiego ryzyka potrzebne są właściwe osoby, procedury i źródła.

## Lepszy sposób użycia odpowiedzi

W notatce pojawia się zdanie: "Klient jest niezadowolony i projekt jest zagrożony". Lepsza analiza nie zaczyna od decyzji, ale od rozdzielenia warstw. Fakt może brzmieć: klient nie odpowiedział od pięciu dni albo napisał, że brakuje mu materiałów. Interpretacja: klient jest niezadowolony. Założenie: brak odpowiedzi oznacza ryzyko projektu. Ocena: sytuacja jest poważna. Alternatywne odczytanie: klient może czekać na informację, której nie dostał. Brakujące pytanie: czy klient zgłosił problem, czego oczekuje i jaki termin jest teraz kluczowy?

Ten prompt wspiera [wspomaganie decyzji](/pl/concepts/wspomaganie-decyzji/) bez przenoszenia decyzji na model. Użytkownik dostaje uporządkowanie materiału, a nie gotowy wyrok. Pomaga też utrzymać [skalibrowane zaufanie](/pl/concepts/calibrated-trust/): [odpowiedź modelu](/pl/concepts/model-output/) może być użyteczną mapą, ale nie zastępuje sprawdzenia faktów, pytań do ludzi ani odpowiedzialności za dalszy krok.

## Krótka zasada

Najpierw oddziel to, co można wskazać, od tego, co to może znaczyć, jak to oceniasz i czego nadal nie wiesz. Dopiero potem decyduj, jakie pytanie albo działanie ma sens.

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
