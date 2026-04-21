import { BATCHES, COMPETITORS, GROUP_LABELS, SITE, findCompetitor } from "./data.js";

function createFilterButtons(container, onClick) {
  if (!container) return;
  GROUP_LABELS.forEach((group, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn${index === 0 ? " active" : ""}`;
    button.dataset.group = group.id;
    button.textContent = group.label;
    button.addEventListener("click", () => {
      container.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      onClick(group.id);
    });
    container.appendChild(button);
  });
}

function statusClass(value) {
  const normalized = value.toLowerCase();
  if (normalized === "yes") return "yes";
  if (normalized === "no") return "no";
  return "partial";
}

function formatCell(value) {
  const safe = value || "-";
  return `<span class="status ${statusClass(safe)}">${safe}</span>`;
}

function findBatchBySlug(slug) {
  const competitor = findCompetitor(slug);
  if (!competitor) return null;
  return BATCHES[competitor.batch] || null;
}

function renderRows(tableBody, groups, resolveCompetitorValue) {
  tableBody.innerHTML = "";
  groups.forEach((group) => {
    const groupRow = document.createElement("tr");
    groupRow.className = "group-row";
    groupRow.dataset.group = group.id;
    groupRow.innerHTML = `<td colspan="3">${group.title}</td>`;
    tableBody.appendChild(groupRow);

    group.rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.dataset.group = group.id;
      const compValue = resolveCompetitorValue(row);
      tr.innerHTML = `
        <td>${row.f}</td>
        <td class="vyom-col">${formatCell(row.v)}</td>
        <td>${formatCell(compValue)}</td>
      `;
      tableBody.appendChild(tr);
    });
  });
}

function wireFiltering(tableBody, group) {
  tableBody.querySelectorAll("tr").forEach((row) => {
    const keep = group === "all" || row.dataset.group === group;
    row.hidden = !keep;
  });
}

function renderComparisonPage() {
  const main = document.querySelector("[data-page='compare']");
  if (!main) return;

  const slug = main.dataset.competitor;
  const competitor = findCompetitor(slug);
  const batch = findBatchBySlug(slug);

  if (!competitor || !batch) return;

  const heroName = document.getElementById("hero-name");
  const heroMeta = document.getElementById("hero-meta");
  const heroOneLiner = document.getElementById("hero-oneliner");
  const noteDate = document.getElementById("note-date");

  heroName.textContent = `Vyom vs ${competitor.name}`;
  heroMeta.textContent = `${competitor.company} | ${competitor.market} | ${competitor.pricing}`;
  heroOneLiner.textContent = competitor.oneLiner;
  noteDate.textContent = SITE.lastUpdated;

  const body = document.getElementById("compare-body");
  renderRows(body, batch.groups, (row) => row.c[slug] || "Not listed");

  const filters = document.getElementById("group-filters");
  createFilterButtons(filters, (group) => wireFiltering(body, group));
}

function renderMatrixPage() {
  const main = document.querySelector("[data-page='matrix']");
  if (!main) return;

  const batchKey = main.dataset.batch;
  const batch = BATCHES[batchKey];
  if (!batch) return;

  const heading = document.getElementById("matrix-heading");
  const noteDate = document.getElementById("matrix-date");
  if (heading) heading.textContent = batch.title;
  if (noteDate) noteDate.textContent = SITE.lastUpdated;

  const headRow = document.getElementById("matrix-head-row");
  const tableBody = document.getElementById("matrix-body");

  if (headRow) {
    headRow.innerHTML = "<th>Feature</th><th>Vyom</th>";
    batch.slugs.forEach((slug) => {
      const competitor = findCompetitor(slug);
      if (competitor) {
        headRow.innerHTML += `<th>${competitor.name}</th>`;
      }
    });
  }

  if (tableBody) {
    tableBody.innerHTML = "";
    batch.groups.forEach((group) => {
      const groupRow = document.createElement("tr");
      groupRow.className = "group-row";
      groupRow.dataset.group = group.id;
      groupRow.innerHTML = `<td colspan="${batch.slugs.length + 2}">${group.title}</td>`;
      tableBody.appendChild(groupRow);

      group.rows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.dataset.group = group.id;
        let cells = `<td>${row.f}</td><td class="vyom-col">${formatCell(row.v)}</td>`;
        batch.slugs.forEach((slug) => {
          cells += `<td>${formatCell(row.c[slug] || "Not listed")}</td>`;
        });
        tr.innerHTML = cells;
        tableBody.appendChild(tr);
      });
    });
  }

  const filters = document.getElementById("group-filters");
  if (filters) {
    createFilterButtons(filters, (group) => wireFiltering(tableBody, group));
  }
}

function renderHubPage() {
  const hub = document.querySelector("[data-page='hub']");
  if (!hub) return;

  const container = document.getElementById("compare-grid");
  if (!container) return;
  const basePath = container.dataset.basePath || "";

  COMPETITORS.forEach((item) => {
    const card = document.createElement("a");
    card.className = "compare-card";
    card.href = `${basePath}compare/vyom-vs-${item.slug}.html`;
    card.innerHTML = `
      <h3>Vyom vs ${item.name}</h3>
      <p>${item.oneLiner}</p>
      <div class="meta">${item.market} | ${item.pricing}</div>
    `;
    container.appendChild(card);
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function addDownloadLink() {
  const downloadUrl = "https://myoracular.com/app-redirect?app=vyom";
  document.querySelectorAll(".nav-links").forEach((nav) => {
    if (nav.querySelector("[data-download-link='vyom']")) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "download-link";
    link.dataset.downloadLink = "vyom";
    link.textContent = "Download Vyom";
    nav.appendChild(link);
  });
}

setYear();
addDownloadLink();
renderHubPage();
renderComparisonPage();
renderMatrixPage();
