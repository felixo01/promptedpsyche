from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEST_PATH = ROOT / "tests/layout/articles.spec.ts"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count == 0:
        if new in text:
            return text
        raise RuntimeError(f"Expected test fragment not found: {label}")
    if count != 1:
        raise RuntimeError(f"Expected one occurrence for {label}, found {count}")
    return text.replace(old, new, 1)


def main() -> int:
    text = TEST_PATH.read_text(encoding="utf-8")

    text = replace_once(
        text,
        """const aiThinkingPolishDraftRoute = '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/';
const aiThinkingEnglishDraftRoute = '/articles/dont-ask-whether-ai-makes-us-dumber/';
const thirdEnglishArticleTitle =
""",
        """const aiThinkingPolishArticleRoute = '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/';
const aiThinkingEnglishArticleRoute = '/articles/dont-ask-whether-ai-makes-us-dumber/';
const aiThinkingPolishArticleTitle =
  'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać';
const aiThinkingEnglishArticleTitle =
  "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing";
const aiThinkingEnglishDoi = '10.5281/zenodo.21358687';
const aiThinkingEnglishDoiUrl = `https://doi.org/${aiThinkingEnglishDoi}`;
const thirdEnglishArticleTitle =
""",
        "AI thinking route constants",
    )

    text = replace_once(
        text,
        """    await page.goto('/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(7);
""",
        """    await page.goto('/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(8);
""",
        "English article index count",
    )
    text = replace_once(
        text,
        """    await expect(page.locator('.entry-list')).toContainText(embodiedEnglishArticleTitle);
""",
        """    await expect(page.locator('.entry-list')).toContainText(embodiedEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiThinkingEnglishArticleTitle);
""",
        "English article index title",
    )
    text = replace_once(
        text,
        """    expect(titles).toHaveLength(7);
    expect(titles).toEqual(expect.arrayContaining([
      embodiedEnglishArticleTitle,
""",
        """    expect(titles).toHaveLength(8);
    expect(titles).toEqual(expect.arrayContaining([
      aiThinkingEnglishArticleTitle,
      embodiedEnglishArticleTitle,
""",
        "English title array",
    )

    text = replace_once(
        text,
        """    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(7);
""",
        """    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(8);
""",
        "Polish article index count",
    )
    text = replace_once(
        text,
        """    await expect(page.locator('.entry-list')).toContainText(embodiedPolishArticleTitle);
""",
        """    await expect(page.locator('.entry-list')).toContainText(embodiedPolishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiThinkingPolishArticleTitle);
""",
        "Polish article index title",
    )
    text = replace_once(
        text,
        """    expect(titles).toHaveLength(7);
    expect(titles).toEqual(expect.arrayContaining([
      embodiedPolishArticleTitle,
""",
        """    expect(titles).toHaveLength(8);
    expect(titles).toEqual(expect.arrayContaining([
      aiThinkingPolishArticleTitle,
      embodiedPolishArticleTitle,
""",
        "Polish title array",
    )

    text = replace_once(
        text,
        """    await expect(page.locator('body')).not.toContainText(aiFearsPolishArticleTitle);
""",
        """    await expect(page.locator('body')).not.toContainText(aiFearsPolishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiThinkingPolishArticleTitle);
""",
        "English index language isolation",
    )
    text = replace_once(
        text,
        """    await expect(page.locator('body')).not.toContainText(aiFearsEnglishArticleTitle);
""",
        """    await expect(page.locator('body')).not.toContainText(aiFearsEnglishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiThinkingEnglishArticleTitle);
""",
        "Polish index language isolation",
    )

    text = text.replace(
        """    await expect(page.locator('body')).not.toContainText(
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing"
    );
""",
        "",
    )
    text = text.replace(
        """    await expect(page.locator('body')).not.toContainText(
      'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać'
    );
""",
        "",
    )
    text = text.replace(
        """    const aiThinkingEnglishDraft = await request.get(aiThinkingEnglishDraftRoute);
    const aiThinkingPolishDraft = await request.get(aiThinkingPolishDraftRoute);

""",
        "",
    )
    text = text.replace(
        """    expect(aiThinkingEnglishDraft.ok()).toBe(false);
    expect(aiThinkingPolishDraft.ok()).toBe(false);
""",
        "",
    )

    publication_tests = r'''
  test('renders the published AI thinking English article with DOI and localized evidence tables', async ({ page }) => {
    await page.goto(aiThinkingEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiThinkingEnglishArticleTitle);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Published: July 14, 2026');
    const byline = page.locator('[data-qa="article-byline"]');
    await expect(byline).toContainText('Citable version (v1.0):');
    await expect(byline.getByRole('link', { name: `DOI ${aiThinkingEnglishDoi}` })).toHaveAttribute(
      'href',
      aiThinkingEnglishDoiUrl
    );
    await expect(page.locator('meta[name="citation_doi"]')).toHaveAttribute(
      'content',
      aiThinkingEnglishDoi
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'CC BY 4.0'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-thinking-practice.svg'
    );
    await expect(page.locator('[data-qa="ai-thinking-data-table"]')).toHaveCount(4);
    await expect(page.locator('.prose')).toContainText('Evidence map');
    await expect(page.locator('.prose')).toContainText('What the studies actually measure');
    await expect(page.locator('.prose')).toContainText('Direct comparisons that matter most');
    await expect(page.locator('.prose')).toContainText('Completion interface versus learning interface');
    await expect(
      page.locator(`.language-switcher a[href="${aiThinkingPolishArticleRoute}"]`)
    ).toBeVisible();

    await page.setViewportSize({ width: 390, height: 900 });
    const overflowingFigures = await page.locator('[data-qa="ai-thinking-data-table"]').evaluateAll((figures) =>
      figures
        .map((figure) => {
          const rect = figure.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingFigures).toEqual([]);
  });

  test('renders the published AI thinking Polish article with the English DOI and localized evidence tables', async ({ page }) => {
    await page.goto(aiThinkingPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiThinkingPolishArticleTitle);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Opublikowano: 14 lipca 2026');
    const byline = page.locator('[data-qa="article-byline"]');
    await expect(byline).toContainText('DOI wersji angielskiej (v1.0):');
    await expect(byline.getByRole('link', { name: `DOI ${aiThinkingEnglishDoi}` })).toHaveAttribute(
      'href',
      aiThinkingEnglishDoiUrl
    );
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'CC BY 4.0'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-thinking-practice.svg'
    );
    await expect(page.locator('[data-qa="ai-thinking-data-table"]')).toHaveCount(4);
    await expect(page.locator('.prose')).toContainText('Mapa materiału źródłowego');
    await expect(page.locator('.prose')).toContainText('Co naprawdę mierzą badania');
    await expect(page.locator('.prose')).toContainText('Najważniejsze bezpośrednie porównania');
    await expect(page.locator('.prose')).toContainText(
      'Interfejs ukończenia zadania a interfejs uczenia się'
    );
    await expect(
      page.locator(`.language-switcher a[href="${aiThinkingEnglishArticleRoute}"]`)
    ).toBeVisible();

    await page.setViewportSize({ width: 390, height: 900 });
    const overflowingFigures = await page.locator('[data-qa="ai-thinking-data-table"]').evaluateAll((figures) =>
      figures
        .map((figure) => {
          const rect = figure.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingFigures).toEqual([]);
  });

'''

    marker = "  test('keeps other article drafts hidden', async ({ page, request }) => {"
    if publication_tests.strip() not in text:
        if marker not in text:
            raise RuntimeError("Draft-isolation test marker not found")
        text = text.replace(marker, publication_tests + marker, 1)

    TEST_PATH.write_text(text, encoding="utf-8", newline="\n")
    print(f"Updated {TEST_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
