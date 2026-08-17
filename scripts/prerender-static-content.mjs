import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dataModuleUrl = pathToFileURL(path.join(root, "assets", "data.js")).href;
const { BATCHES, COMPETITORS, GROUP_LABELS, SITE, findCompetitor } = await import(dataModuleUrl);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function statusClass(value) {
  const normalized = String(value).toLowerCase();
  if (normalized === "yes") return "yes";
  if (normalized === "no") return "no";
  return "partial";
}

function formatCell(value) {
  const safe = value || "-";
  return `<span class="status ${statusClass(safe)}">${escapeHtml(safe)}</span>`;
}

function buildFilterButtons() {
  return GROUP_LABELS.map((group, index) => {
    const active = index === 0 ? " active" : "";
    return `<button type="button" class="filter-btn${active}" data-group="${group.id}">${escapeHtml(group.label)}</button>`;
  }).join("\n");
}

function replaceTagById(html, tagName, id, content) {
  const pattern = new RegExp(`(<${tagName}[^>]*id=\"${id}\"[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`);
  if (!pattern.test(html)) return html;
  return html.replace(pattern, (_match, openTag, _inner, closeTag) => `${openTag}${content}${closeTag}`);
}

function replaceDivById(html, id, content) {
  return replaceTagById(html, "div", id, content);
}

function replaceTbodyById(html, id, content) {
  return replaceTagById(html, "tbody", id, `\n${content}\n          `);
}

function replaceSpanById(html, id, content) {
  return replaceTagById(html, "span", id, escapeHtml(content));
}

function getBatchForCompetitor(slug) {
  const competitor = findCompetitor(slug);
  if (!competitor) return null;
  return BATCHES[competitor.batch] || null;
}

function buildComparisonRows(batch, slug) {
  const lines = [];
  for (const group of batch.groups) {
    lines.push(`            <tr class="group-row" data-group="${group.id}">`);
    lines.push(`              <td colspan="3">${escapeHtml(group.title)}</td>`);
    lines.push("            </tr>");

    for (const row of group.rows) {
      const compValue = row.c[slug] || "Not listed";
      lines.push(`            <tr data-group="${group.id}">`);
      lines.push(`              <td>${escapeHtml(row.f)}</td>`);
      lines.push(`              <td class="vyom-col">${formatCell(row.v)}</td>`);
      lines.push(`              <td>${formatCell(compValue)}</td>`);
      lines.push("            </tr>");
    }
  }
  return lines.join("\n");
}

function buildMatrixHeader(batch) {
  const cols = ["<th>Feature</th>", "<th>Vyom</th>"];
  for (const slug of batch.slugs) {
    const competitor = findCompetitor(slug);
    if (competitor) cols.push(`<th>${escapeHtml(competitor.name)}</th>`);
  }
  return cols.join("");
}

function buildMatrixRows(batch) {
  const colSpan = batch.slugs.length + 2;
  const lines = [];
  for (const group of batch.groups) {
    lines.push(`            <tr class="group-row" data-group="${group.id}">`);
    lines.push(`              <td colspan="${colSpan}">${escapeHtml(group.title)}</td>`);
    lines.push("            </tr>");

    for (const row of group.rows) {
      lines.push(`            <tr data-group="${group.id}">`);
      lines.push(`              <td>${escapeHtml(row.f)}</td>`);
      lines.push(`              <td class="vyom-col">${formatCell(row.v)}</td>`);
      for (const slug of batch.slugs) {
        lines.push(`              <td>${formatCell(row.c[slug] || "Not listed")}</td>`);
      }
      lines.push("            </tr>");
    }
  }
  return lines.join("\n");
}

function buildHubCards(basePath) {
  return COMPETITORS.map((item) => {
    const href = `${basePath}compare/vyom-vs-${item.slug}.html`;
    return [
      `        <a class="compare-card" href="${href}">`,
      `          <h3>Vyom vs ${escapeHtml(item.name)}</h3>`,
      `          <p>${escapeHtml(item.oneLiner)}</p>`,
      `          <div class="meta">${escapeHtml(item.market)} | ${escapeHtml(item.pricing)}</div>`,
      "        </a>"
    ].join("\n");
  }).join("\n");
}

function upsertSectionBeforeMainEnd(html, id, sectionMarkup) {
  const existingPattern = new RegExp(`<section[^>]*id="${id}"[^>]*>[\\s\\S]*?<\\/section>\\s*`, "m");
  if (existingPattern.test(html)) {
    return html.replace(existingPattern, `${sectionMarkup}\n\n`);
  }
  return html.replace("</main>", `${sectionMarkup}\n\n  </main>`);
}

function replaceFooter(html, footerMarkup) {
  return html.replace(/<footer>[\s\S]*?<\/footer>/, footerMarkup);
}

function joinCompetitorNames(slugs) {
  return slugs
    .map((slug) => findCompetitor(slug))
    .filter(Boolean)
    .map((item) => item.name)
    .join(", ");
}

function buildComparisonInsightSection(competitor) {
  return `
  <section id="comparison-insights" class="section">
    <div class="site-shell">
      <h2>Editorial Analysis: Vyom vs ${escapeHtml(competitor.name)}</h2>
      <p>
        This page is written for people who want practical, decision-ready comparisons rather than shallow feature checklists.
        Vyom and ${escapeHtml(competitor.name)} both serve astrology users, but they are built for different workflows, different depth levels, and different learning styles.
      </p>
      <p>
        ${escapeHtml(competitor.name)} is commonly discussed in ${escapeHtml(competitor.market)} markets and is typically chosen by ${escapeHtml(competitor.audience)}.
        In contrast, Vyom focuses on a structured Vedic-first approach with transparent charting depth, comparison clarity, and a roadmap that serves both learners and advanced practitioners.
      </p>
      <p>
        If you are evaluating whether to switch, use the table above to compare high-impact criteria first: chart depth, astrology system, personalization quality,
        and pricing model. Then evaluate long-term fit: how fast you can learn, how reliable the experience feels day-to-day, and whether the app grows with your needs.
      </p>
      <p>
        Official product links: <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a> and
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">Vyom app page</a>.
      </p>
    </div>
  </section>`;
}

function buildComparisonFaqSection(competitor) {
  return `
  <section id="comparison-faq" class="section">
    <div class="site-shell">
      <h2>FAQ: Vyom vs ${escapeHtml(competitor.name)}</h2>
      <h3>What is the biggest difference between Vyom and ${escapeHtml(competitor.name)}?</h3>
      <p>
        The biggest difference is depth and structure. Vyom is designed for detailed Vedic workflows with a clear feature model,
        while ${escapeHtml(competitor.name)} is often preferred for its own audience strengths and presentation style.
      </p>
      <h3>How is this comparison written?</h3>
      <p>
        This comparison is written in a practical editorial format so readers can make a fast, informed decision without marketing noise.
      </p>
      <h3>Where can I verify Vyom details directly?</h3>
      <p>
        You can verify product details on <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a>
        and on the official Vyom page at
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">https://myoracular.com/apps/vyom</a>.
      </p>
      <h3>How often is this page updated?</h3>
      <p>
        Content is refreshed as product capabilities evolve. Always check the snapshot date on the page and validate critical decisions against official sources.
      </p>
    </div>
  </section>`;
}

function buildMatrixInsightSection(batch) {
  const competitorList = joinCompetitorNames(batch.slugs);
  return `
  <section id="matrix-insights" class="section">
    <div class="site-shell">
      <h2>How To Use This Matrix Effectively</h2>
      <p>
        This matrix compares Vyom against ${escapeHtml(competitorList)} across the criteria that usually drive real-world product decisions.
        Instead of reading every row in order, start with the category that matters most for your goals, then narrow down from there.
      </p>
      <p>
        For most users, the fastest decision path is: core chart depth, personalization quality, platform support, and total pricing model.
        If you are comparing for professional or long-term use, prioritize reliability and feature depth over short-term visual polish.
      </p>
      <p>
        Official reference links: <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a> and
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">Vyom app page</a>.
      </p>
    </div>
  </section>`;
}

function buildMatrixFaqSection() {
  return `
  <section id="matrix-faq" class="section">
    <div class="site-shell">
      <h2>FAQ: Comparison Matrix</h2>
      <h3>Who should use this matrix?</h3>
      <p>
        Anyone evaluating astrology apps seriously: individual users, content creators, affiliate reviewers, and product researchers.
      </p>
      <h3>Is this matrix biased toward one app?</h3>
      <p>
        The goal is transparent side-by-side evaluation. Readers should use the categories and evidence to decide what fits their own workflow.
      </p>
      <h3>Where can I find official Vyom information?</h3>
      <p>
        Visit <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a> and
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">https://myoracular.com/apps/vyom</a>.
      </p>
      <h3>How should I interpret partial matches in the table?</h3>
      <p>
        Treat partial matches as capability gaps that may affect advanced use cases. If a feature is mission-critical, test it directly before committing.
      </p>
    </div>
  </section>`;
}

function buildHubInsightSection(isHome) {
  const heading = isHome ? "How This Comparison Hub Helps Real Users" : "How To Navigate These Comparison Pages";
  return `
  <section id="hub-insights" class="section">
    <div class="site-shell">
      <h2>${heading}</h2>
      <p>
        This website is intentionally written in clear, plain language so readers can compare astrology apps without ambiguity.
        Each page combines structured data, direct feature checks, and practical interpretation that supports better user decisions.
      </p>
      <p>
        Start with the app you currently use, open the matching Vyom comparison page, and evaluate differences in core capability,
        product depth, experience quality, and pricing logic. This process works better than browsing random listicles.
      </p>
      <p>
        Official links: <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a> and
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">Vyom app page</a>.
      </p>
    </div>
  </section>`;
}

function buildHubFaqSection() {
  return `
  <section id="hub-faq" class="section">
    <div class="site-shell">
      <h2>FAQ: Vyom Comparison Hub</h2>
      <h3>What is this site for?</h3>
      <p>
        It is a focused comparison hub that helps users evaluate Vyom against leading astrology apps with transparent, readable criteria.
      </p>
      <h3>What editorial standard does this content follow?</h3>
      <p>
        The content follows a clarity-first editorial standard focused on readability, accuracy, and practical decision support.
      </p>
      <h3>Where should I go for official Vyom details?</h3>
      <p>
        You can always verify details on <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a>
        and <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">the Vyom app page</a>.
      </p>
      <h3>How current is the information?</h3>
      <p>
        Snapshot dates are shown on comparison pages and matrix pages. Products can change, so check official product pages for final confirmation.
      </p>
    </div>
  </section>`;
}

function buildStandardFooter() {
  return `<footer id="site-footer">
    <div class="site-shell">
      <div>
        Vyom comparison content by Oracular. Built for transparent, human-readable app evaluation.
      </div>
      <div class="small-links" style="margin-top:0.6rem">
        <a href="https://vyom-astro.github.io/">Home</a>
        <a href="https://vyom-astro.github.io/compare/index.html">Comparison Hub</a>
        <a href="https://vyom-astro.github.io/compare/matrix-a.html">Matrix A</a>
        <a href="https://vyom-astro.github.io/compare/matrix-b.html">Matrix B</a>
        <a href="https://vyom-astro.github.io/compare/matrix-c.html">Matrix C</a>
      </div>
      <div class="small-links" style="margin-top:0.6rem">
        <a href="https://myoracular.com" target="_blank" rel="noopener noreferrer">myoracular.com</a>
        <a href="https://myoracular.com/apps/vyom" target="_blank" rel="noopener noreferrer">Vyom App</a>
      </div>
      <div style="margin-top:0.6rem">
        Last content refresh: ${escapeHtml(SITE.lastUpdated)} | Copyright <span data-year></span> Oracular.
      </div>
    </div>
  </footer>`;
}

async function updateFile(relativePath, updater) {
  const fullPath = path.join(root, relativePath);
  const original = await fs.readFile(fullPath, "utf8");
  const next = updater(original);
  if (next !== original) {
    await fs.writeFile(fullPath, next, "utf8");
    return true;
  }
  return false;
}

const matrixPageMap = {
  batch1: "compare/matrix-a.html",
  batch2: "compare/matrix-b.html",
  batch3: "compare/matrix-c.html"
};

const standardFooter = buildStandardFooter();

let updatedCount = 0;

for (const competitor of COMPETITORS) {
  const file = `compare/vyom-vs-${competitor.slug}.html`;
  const changed = await updateFile(file, (html) => {
    const batch = getBatchForCompetitor(competitor.slug);
    if (!batch) return html;

    let out = html;
    out = replaceTagById(out, "p", "hero-meta", escapeHtml(`${competitor.company} | ${competitor.market} | ${competitor.pricing}`));
    out = replaceTagById(out, "p", "hero-oneliner", escapeHtml(competitor.oneLiner));
    out = replaceSpanById(out, "note-date", SITE.lastUpdated);
    out = replaceDivById(out, "group-filters", `\n        ${buildFilterButtons()}\n      `);
    out = replaceTbodyById(out, "compare-body", buildComparisonRows(batch, competitor.slug));
    out = upsertSectionBeforeMainEnd(out, "comparison-insights", buildComparisonInsightSection(competitor));
    out = upsertSectionBeforeMainEnd(out, "comparison-faq", buildComparisonFaqSection(competitor));
    out = replaceFooter(out, standardFooter);
    return out;
  });
  if (changed) updatedCount += 1;
}

for (const [batchKey, matrixFile] of Object.entries(matrixPageMap)) {
  const changed = await updateFile(matrixFile, (html) => {
    const batch = BATCHES[batchKey];
    if (!batch) return html;

    let out = html;
    out = replaceTagById(out, "h1", "matrix-heading", escapeHtml(batch.title));
    out = replaceTagById(out, "tr", "matrix-head-row", buildMatrixHeader(batch));
    out = replaceTbodyById(out, "matrix-body", buildMatrixRows(batch));
    out = replaceSpanById(out, "matrix-date", SITE.lastUpdated);
    out = replaceDivById(out, "group-filters", `\n        ${buildFilterButtons()}\n      `);
    out = upsertSectionBeforeMainEnd(out, "matrix-insights", buildMatrixInsightSection(batch));
    out = upsertSectionBeforeMainEnd(out, "matrix-faq", buildMatrixFaqSection());
    out = replaceFooter(out, standardFooter);
    return out;
  });
  if (changed) updatedCount += 1;
}

for (const file of ["index.html", "compare/index.html"]) {
  const changed = await updateFile(file, (html) => {
    const match = html.match(/<div[^>]*id="compare-grid"[^>]*>/);
    if (!match) return html;
    const openTag = match[0];
    const baseMatch = openTag.match(/data-base-path="([^"]*)"/);
    const basePath = baseMatch ? baseMatch[1] : "";

    let out = html.replace(
      /(<div[^>]*id="compare-grid"[^>]*>)([\s\S]*?)(<\/div>)/,
      (_match, openTag, _inner, closeTag) => `${openTag}\n${buildHubCards(basePath)}\n      ${closeTag}`
    );
    const isHome = file === "index.html";
    out = upsertSectionBeforeMainEnd(out, "hub-insights", buildHubInsightSection(isHome));
    out = upsertSectionBeforeMainEnd(out, "hub-faq", buildHubFaqSection());
    out = replaceFooter(out, standardFooter);
    return out;
  });
  if (changed) updatedCount += 1;
}

console.log(`Static prerender complete. Updated files: ${updatedCount}`);
