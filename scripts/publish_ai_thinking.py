from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOI = "10.5281/zenodo.21358687"
DOI_URL = f"https://doi.org/{DOI}"
PUBLISHED_AT = "2026-07-14"
VERSION = "1.0"

EN_PATH = ROOT / "src/content/articles/dont-ask-whether-ai-makes-us-dumber.md"
PL_PATH = ROOT / "src/content/articles/nie-pytaj-czy-ai-nas-oglupia.md"

STYLE_BLOCK = r'''<style>
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
</style>'''

EN_TABLES = {
    "evidence": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="evidence-map">
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
</figure>''',
    "constructs": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="constructs">
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
</figure>''',
    "studies": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="design-comparisons">
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
</figure>''',
    "interfaces": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="interface-matrix">
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
</figure>''',
}

PL_TABLES = {
    "evidence": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="evidence-map">
  <div class="article-data-table__scroll">
    <table>
      <caption>Mapa materiału źródłowego</caption>
      <thead>
        <tr><th scope="col">Rodzaj źródła</th><th scope="col">Liczba</th><th scope="col">Rola w artykule</th></tr>
      </thead>
      <tbody>
        <tr><td>Publikacje recenzowane</td><td>15</td><td>Badania randomizowane, eksperymenty, przeglądy, metaanaliza i wcześniejsza psychologia uczenia się.</td></tr>
        <tr><td>Preprinty</td><td>5</td><td>Najnowsze wyniki dotyczące pisania, wytrwałości, wsparcia tutorów, różnorodności twórczej i krytyki metodologicznej.</td></tr>
        <tr><td>Raport oficjalny</td><td>1</td><td>Kontekst trendów wyników matematycznych, nie dowód wpływu AI.</td></tr>
        <tr><td>Dziennikarstwo</td><td>1</td><td>Analizowany punkt wyjścia debaty publicznej, nie pierwotny dowód naukowy.</td></tr>
        <tr><td>Łącznie</td><td>22</td><td>Zestaw do syntezy narracyjnej, którego nie można sprowadzić do jednego wspólnego efektu.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Źródła dotyczą różnych zadań, populacji, skal czasu i miar. Liczby opisują zestaw materiału, a nie siłę jednego wspólnego efektu.</figcaption>
</figure>''',
    "constructs": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="constructs">
  <div class="article-data-table__scroll">
    <table>
      <caption>Co naprawdę mierzą badania</caption>
      <thead>
        <tr><th scope="col">Zmienna</th><th scope="col">Typowe pytanie</th><th scope="col">Czego sama nie dowodzi</th></tr>
      </thead>
      <tbody>
        <tr><td>Wykonanie zadania</td><td>Czy odpowiedź była poprawna podczas dostępu do AI?</td><td>Trwałego uczenia się lub samodzielnej kompetencji.</td></tr>
        <tr><td>Pamięć</td><td>Czy człowiek pamięta treść, jej źródło albo własny tekst?</td><td>Ogólnej inteligencji.</td></tr>
        <tr><td>Wysiłek / wzorzec EEG</td><td>Jak wymagające było zadanie i jaki wzorzec aktywności mu towarzyszył?</td><td>Bezpośredniej jakości myślenia ani trwałej zmiany mózgu.</td></tr>
        <tr><td>Wytrwałość</td><td>Czy osoba kontynuuje po trudności albo po odebraniu pomocy?</td><td>Długotrwałej erozji kompetencji.</td></tr>
        <tr><td>Transfer</td><td>Czy potrafi rozwiązać podobny problem bez wcześniejszego wsparcia?</td><td>Wyniku we wszystkich innych dziedzinach.</td></tr>
        <tr><td>Kreatywność</td><td>Jak oceniono pojedynczy rezultat i jak różnorodny jest cały zbiór?</td><td>Jednej ogólnej poprawy lub degradacji kreatywności.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Określenie „głupsi” łączy odrębne zmienne. Rzetelna interpretacja zaczyna się od nazwania tego, co faktycznie zmierzono.</figcaption>
</figure>''',
    "studies": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="design-comparisons">
  <div class="article-data-table__scroll">
    <table>
      <caption>Najważniejsze bezpośrednie porównania</caption>
      <thead>
        <tr><th scope="col">Badanie</th><th scope="col">Konstrukcja pomocy</th><th scope="col">Zaobserwowany wynik</th><th scope="col">Granica wniosku</th></tr>
      </thead>
      <tbody>
        <tr><td>Bastani et al. (2025)</td><td>GPT bez ograniczeń kontra tutor ze stopniowanymi wskazówkami i ograniczeniem pełnych rozwiązań.</td><td>Oba warunki poprawiły ćwiczenia; po zwykłym GPT wynik bez AI był gorszy, a po GPT Tutor nie.</td><td>Cztery lekcje matematyki w szkole średniej.</td></tr>
        <tr><td>Kestin et al. (2025)</td><td>Tutor z materiałem tematycznym, informacją zwrotną i sprawdzaniem rozumienia.</td><td>Większy natychmiastowy przyrost wiedzy niż w porównywanych zajęciach z aktywnym uczeniem się.</td><td>Brak pomiaru opóźnionej retencji i szerokiego transferu.</td></tr>
        <tr><td>Liu et al. (2026, preprint)</td><td>Krótki dostęp do bezpośredniej pomocy AI, a potem samodzielna praca.</td><td>Gorsze wykonanie bez AI i częstsza rezygnacja po odebraniu wsparcia.</td><td>Krótkie eksperymenty nie dowodzą trwałej erozji kompetencji.</td></tr>
        <tr><td>Tutor CoPilot (2024, preprint)</td><td>AI podpowiadała strategie pedagogiczne ludzkim korepetytorom.</td><td>Lepsze krótkie wyniki końcowe i więcej pytań naprowadzających.</td><td>Brak istotnej poprawy rocznego wyniku z matematyki.</td></tr>
        <tr><td>Doshi i Hauser (2024)</td><td>Pomysły AI wspierające pisanie krótkich opowiadań.</td><td>Wyższe oceny pojedynczych tekstów, ale większe podobieństwo całego zbioru.</td><td>Jakość jednostkowa i różnorodność zbiorowa są innymi wynikami.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Najmocniejszy wniosek nie brzmi, że AI jest dobra albo zła dla nauki. Różne konstrukcje pomocy zachowują lub zastępują różne części ludzkiego procesu.</figcaption>
</figure>''',
    "interfaces": r'''<figure class="article-data-table" data-qa="ai-thinking-data-table" data-table="interface-matrix">
  <div class="article-data-table__scroll">
    <table>
      <caption>Interfejs ukończenia zadania a interfejs uczenia się</caption>
      <thead>
        <tr><th scope="col">Decyzja projektowa</th><th scope="col">Cel: ukończenie</th><th scope="col">Cel: uczenie się</th></tr>
      </thead>
      <tbody>
        <tr><td>Pierwsza reakcja</td><td>Szybko przygotować użyteczny wynik.</td><td>Poczekać na pierwszą próbę albo diagnozę.</td></tr>
        <tr><td>Poziom pomocy</td><td>Podać pełne przekształcenie lub rozwiązanie.</td><td>Dać najmniejszą użyteczną wskazówkę i zwiększać wsparcie tylko w razie potrzeby.</td></tr>
        <tr><td>Obsługa błędu</td><td>Poprawić rezultat.</td><td>Rozpoznać nieporozumienie i poprosić ucznia o samodzielną korektę.</td></tr>
        <tr><td>Wyjaśnienie</td><td>Uczynić wynik wystarczająco jasnym do użycia.</td><td>Wymagać wyjaśnienia własnymi słowami.</td></tr>
        <tr><td>Miara sukcesu</td><td>Jakość, szybkość i niezawodność ukończonego rezultatu.</td><td>Retencja, transfer i działanie po wycofaniu wsparcia.</td></tr>
        <tr><td>Odpowiedzialność człowieka</td><td>Sprawdzić założenia i zdecydować, czy wynik nadaje się do użycia.</td><td>Zachować rozumowanie potrzebne do wykrycia błędu i rozwiązania nowego wariantu.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Produktywność i uczenie się są uzasadnionymi, ale różnymi celami. Jeden interfejs nie powinien po cichu traktować ich jak tego samego zadania.</figcaption>
</figure>''',
}


def split_document(text: str) -> tuple[list[str], str]:
    if not text.startswith("---\n"):
        raise RuntimeError("Article does not start with front matter")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise RuntimeError("Front matter closing delimiter not found")
    front = text[4:end].splitlines()
    body = text[end + 5 :]
    return front, body


def set_key(lines: list[str], key: str, value: str) -> None:
    prefix = f"{key}:"
    for index, line in enumerate(lines):
        if line.startswith(prefix):
            lines[index] = f"{key}: {value}"
            return
    raise RuntimeError(f"Expected front-matter key not found: {key}")


def remove_keys(lines: list[str], keys: set[str]) -> list[str]:
    return [line for line in lines if line.split(":", 1)[0] not in keys]


def insert_after_key(lines: list[str], key: str, additions: list[str]) -> list[str]:
    for index, line in enumerate(lines):
        if line.startswith(f"{key}:"):
            return lines[: index + 1] + additions + lines[index + 1 :]
    raise RuntimeError(f"Insertion key not found: {key}")


def add_before(body: str, marker: str, block: str) -> str:
    if block in body:
        return body
    if marker not in body:
        raise RuntimeError(f"Insertion marker not found: {marker}")
    return body.replace(marker, f"{block}\n\n{marker}", 1)


def publish(path: Path, lang: str) -> None:
    original = path.read_text(encoding="utf-8")
    front, body = split_document(original)

    set_key(front, "publishedAt", PUBLISHED_AT)
    set_key(front, "draft", "false")
    set_key(front, "readingTime", '"22 min read"' if lang == "en" else '"27 min czytania"')

    publication_keys = {
        "doi",
        "doiUrl",
        "version",
        "relatedDoi",
        "relatedDoiUrl",
        "relatedVersion",
        "relatedDoiLabel",
        "licenseName",
        "licenseUrl",
    }
    front = remove_keys(front, publication_keys)

    if lang == "en":
        metadata = [
            f'doi: "{DOI}"',
            f'doiUrl: "{DOI_URL}"',
            f'version: "{VERSION}"',
            'licenseName: "CC BY 4.0"',
            'licenseUrl: "https://creativecommons.org/licenses/by/4.0/"',
        ]
    else:
        metadata = [
            f'relatedDoi: "{DOI}"',
            f'relatedDoiUrl: "{DOI_URL}"',
            f'relatedVersion: "{VERSION}"',
            'relatedDoiLabel: "DOI wersji angielskiej"',
            'licenseName: "CC BY 4.0"',
            'licenseUrl: "https://creativecommons.org/licenses/by/4.0/"',
        ]
    front = insert_after_key(front, "readingTime", metadata)

    if "article-data-table__scroll" not in body:
        body = f"\n{STYLE_BLOCK}\n\n{body.lstrip()}"

    tables = EN_TABLES if lang == "en" else PL_TABLES
    if lang == "en":
        body = add_before(body, "## What Business Insider gets right", tables["evidence"])
        body = add_before(body, '## What "Your Brain on ChatGPT" actually measured', tables["constructs"])
        body = add_before(body, "## Creativity can rise while diversity falls", tables["studies"])
        body = add_before(body, '<aside class="editorial-aside editorial-aside--practice">', tables["interfaces"])
    else:
        body = add_before(body, "## Co Business Insider trafnie zauważa", tables["evidence"])
        body = add_before(body, "## Co naprawdę pokazuje „Your Brain on ChatGPT”", tables["constructs"])
        body = add_before(body, "## Kreatywność może wzrosnąć, a różnorodność spaść", tables["studies"])
        body = add_before(body, '<aside class="editorial-aside editorial-aside--practice">', tables["interfaces"])

    final = "---\n" + "\n".join(front) + "\n---\n" + body.strip() + "\n"
    path.write_text(final, encoding="utf-8", newline="\n")

    if final.count('data-qa="ai-thinking-data-table"') != 4:
        raise RuntimeError(f"Expected four data tables in {path}")
    if "draft: false" not in final:
        raise RuntimeError(f"Article was not published: {path}")
    if DOI not in final:
        raise RuntimeError(f"DOI missing from {path}")

    print(f"Published {path.relative_to(ROOT)}")


def main() -> int:
    publish(EN_PATH, "en")
    publish(PL_PATH, "pl")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
