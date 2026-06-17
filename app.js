const seedData = {
  navItems: [
    { id: "search", label: "法规检索", title: "法规数据检索台" }
  ],
  types: [
    { id: "law", label: "国家/地区法规" },
    { id: "treaty", label: "国际条约" },
    { id: "guide", label: "监管指南" }
  ],
  topics: [
    { id: "privacy", label: "数据保护与隐私合规" },
    { id: "security", label: "网络安全与韧性" },
    { id: "flow", label: "数据流通与价值释放" },
    { id: "platform", label: "数字市场与平台治理" },
    { id: "ai", label: "人工智能与新技术治理" },
    { id: "market", label: "产品与市场准入" },
    { id: "mobility", label: "交通管理与行业数据监管" },
    { id: "crossborder", label: "数据跨境传输与监管遵从" }
  ],
  regions: [],
  insights: [
    { value: "0", label: "法规索引条目" },
    { value: "0", label: "监管地区覆盖" },
    { value: "0", label: "现行有效法规" }
  ],
  results: []
};

const state = {
  activeNav: "search",
  query: "",
  sort: "latest",
  selectedTypes: new Set(),
  selectedTopics: new Set(),
  selectedRegions: new Set()
};

const nodes = {};
let activeConfig = seedData;
let eventsBound = false;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

function byId(id) {
  return document.getElementById(id);
}

function mount(config = seedData) {
  activeConfig = config;
  Object.assign(nodes, {
    navTabs: byId("navTabs"),
    pageTitle: byId("pageTitle"),
    searchForm: byId("searchForm"),
    globalSearch: byId("globalSearch"),
    typeFilters: byId("typeFilters"),
    topicFilters: byId("topicFilters"),
    regionList: byId("regionList"),
    clearRegions: byId("clearRegions"),
    insightStrip: byId("insightStrip"),
    resultList: byId("resultList"),
    resultCount: byId("resultCount"),
    emptyState: byId("emptyState")
  });

  renderNavigation(config);
  renderCheckboxGroup(nodes.typeFilters, config.types, state.selectedTypes, "types");
  renderCheckboxGroup(nodes.topicFilters, config.topics, state.selectedTopics, "topics");
  renderRegions(config.regions);
  renderInsights(config.insights);
  if (!eventsBound) {
    bindEvents();
    eventsBound = true;
  }
  renderResults(config);
}

function renderNavigation(config) {
  nodes.navTabs.innerHTML = config.navItems
    .map((item) => {
      const active = item.id === state.activeNav ? " is-active" : "";
      return `<button class="nav-tab${active}" type="button" data-nav="${escapeHTML(item.id)}">${escapeHTML(item.label)}</button>`;
    })
    .join("");
}

function renderCheckboxGroup(container, items, selectedSet, groupName) {
  container.innerHTML = items
    .map((item) => {
      const checked = selectedSet.has(item.id) ? "checked" : "";
      return `
        <label class="check-item">
          <input type="checkbox" data-group="${escapeHTML(groupName)}" value="${escapeHTML(item.id)}" ${checked} />
          <span>${escapeHTML(item.label)}</span>
        </label>
      `;
    })
    .join("");
}

function renderRegions(regions) {
  nodes.regionList.innerHTML = regions
    .map((region) => {
      const active = state.selectedRegions.has(region.id) ? " is-active" : "";
      const count = Number.isFinite(Number(region.count)) ? `<small>${escapeHTML(region.count)}</small>` : "";
      return `
        <button class="region-item${active}" type="button" data-region="${escapeHTML(region.id)}">
          <span>${escapeHTML(region.label)}</span>
          ${count}
        </button>
      `;
    })
    .join("");
}

function renderInsights(insights) {
  nodes.insightStrip.innerHTML = insights
    .map((item) => `<div class="insight"><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`)
    .join("");
}

function bindEvents() {
  nodes.navTabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-nav]");
    if (!tab) return;
    state.activeNav = tab.dataset.nav;
    const current = activeConfig.navItems.find((item) => item.id === state.activeNav);
    nodes.pageTitle.textContent = current?.title || "法规数据检索台";
    renderNavigation(activeConfig);
  });

  nodes.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = nodes.globalSearch.value.trim().toLowerCase();
    renderResults(activeConfig);
  });

  nodes.globalSearch.addEventListener("input", () => {
    state.query = nodes.globalSearch.value.trim().toLowerCase();
    renderResults(activeConfig);
  });

  document.addEventListener("change", (event) => {
    const input = event.target.closest("input[type='checkbox'][data-group]");
    if (!input) return;
    const targetSet = input.dataset.group === "types" ? state.selectedTypes : state.selectedTopics;
    input.checked ? targetSet.add(input.value) : targetSet.delete(input.value);
    renderResults(activeConfig);
  });

  nodes.regionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-region]");
    if (!button) return;
    toggleSetValue(state.selectedRegions, button.dataset.region);
    renderRegions(activeConfig.regions);
    renderResults(activeConfig);
  });

  nodes.clearRegions.addEventListener("click", () => {
    state.selectedRegions.clear();
    renderRegions(activeConfig.regions);
    renderResults(activeConfig);
  });

  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sort = button.dataset.sort;
      document.querySelectorAll("[data-sort]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderResults(activeConfig);
    });
  });

  nodes.resultList.addEventListener("click", (event) => {
    const link = event.target.closest("[data-id]");
    if (!link) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("regulation:view", { detail: { id: link.dataset.id } }));
  });
}

function toggleSetValue(set, value) {
  set.has(value) ? set.delete(value) : set.add(value);
}

function getFilteredResults(results) {
  const query = state.query;
  const filtered = results.filter((item) => {
    const searchable = [
      item.title,
      item.localTitle,
      item.referenceNo,
      item.summary,
      item.englishSummary,
      item.issuer,
      item.regionLabel,
      item.typeLabel,
      item.topicLabel,
      item.status
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesRegion = state.selectedRegions.size === 0 || state.selectedRegions.has(item.region);
    const matchesType = state.selectedTypes.size === 0 || state.selectedTypes.has(item.type);
    const matchesTopic = state.selectedTopics.size === 0 || state.selectedTopics.has(item.topic);
    return matchesQuery && matchesRegion && matchesType && matchesTopic;
  });

  return filtered.sort((a, b) => {
    if (state.sort === "region") return a.regionLabel.localeCompare(b.regionLabel, "zh-CN");
    if (state.sort === "status") return a.status.localeCompare(b.status, "zh-CN");
    return getTimeValue(b.date) - getTimeValue(a.date);
  });
}

function getTimeValue(value) {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function renderResults(config) {
  const results = getFilteredResults(config.results);
  nodes.resultCount.textContent = results.length;
  nodes.emptyState.hidden = results.length > 0;
  nodes.resultList.innerHTML = results.map(renderResultCard).join("");
}

function renderResultCard(item) {
  const primaryTitle = item.localTitle || item.title || "未命名法规";
  const secondaryTitle = item.localTitle && item.title && item.localTitle !== item.title
    ? `<p class="original-title">${escapeHTML(item.title)}</p>`
    : "";
  const summary = item.summary || item.englishSummary || "暂无摘要。";
  const effectiveDate = item.effectiveDate || "待确认";
  const publishDate = item.publishDate || item.date || "待确认";
  const issuer = item.issuer || "发布机构待确认";
  const referenceNo = item.referenceNo ? `<span>发文字号：${escapeHTML(item.referenceNo)}</span>` : "";
  const originalAction = item.originalUrl
    ? `<a class="view-link" href="${escapeHTML(item.originalUrl)}" target="_blank" rel="noreferrer">`
    : `<a class="view-link" href="#" data-id="${escapeHTML(item.id)}">`;

  return `
    <article class="result-card">
      <div class="result-main">
        <h3 class="result-title">${escapeHTML(primaryTitle)}</h3>
        ${secondaryTitle}
        <p class="result-summary">${escapeHTML(summary)}</p>
        <div class="metadata">
          <span>地区：${escapeHTML(item.regionLabel)}</span>
          <span>类型：${escapeHTML(item.typeLabel)}</span>
          <span>领域：${escapeHTML(item.topicLabel)}</span>
          <span>发布：${escapeHTML(publishDate)}</span>
          <span>生效：${escapeHTML(effectiveDate)}</span>
          ${referenceNo}
          <span>机构：${escapeHTML(issuer)}</span>
        </div>
      </div>
      <div class="result-side">
        <div class="status-pill">${escapeHTML(item.status)}</div>
        <div class="card-actions">
          ${originalAction}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h13a2 2 0 0 1 2 2v12H6a2 2 0 0 0-2 2V5Z"></path>
              <path d="M6 19h13"></path>
            </svg>
            ${item.originalUrl ? "原文" : "详情"}
          </a>
        </div>
      </div>
    </article>
  `;
}

window.RegulationShell = {
  mount,
  getState: () => structuredClone({
    ...state,
    selectedTypes: [...state.selectedTypes],
    selectedTopics: [...state.selectedTopics],
    selectedRegions: [...state.selectedRegions]
  }),
  setResults(results) {
    seedData.results = Array.isArray(results) ? results : [];
    renderResults(seedData);
  },
  setConfig(partialConfig) {
    Object.assign(seedData, partialConfig);
    mount(seedData);
  }
};

function buildInsights(results, regions) {
  const activeCount = results.filter((item) => item.status === "现行有效").length;
  return [
    { value: String(results.length), label: "法规索引条目" },
    { value: String(regions.length), label: "监管地区覆盖" },
    { value: String(activeCount), label: "现行有效法规" }
  ];
}

function applyDatabase(payload) {
  if (!payload || !Array.isArray(payload.results)) return;

  seedData.results = payload.results;
  if (Array.isArray(payload.regions)) seedData.regions = payload.regions;
  if (Array.isArray(payload.types)) seedData.types = payload.types;
  if (Array.isArray(payload.topics)) seedData.topics = payload.topics;
  seedData.insights = buildInsights(seedData.results, seedData.regions);
  mount(seedData);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.RegulationIndexDatabase) {
    applyDatabase(window.RegulationIndexDatabase);
    return;
  }
  mount(seedData);
});
