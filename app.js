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
  regions: [
    { id: "europe", label: "欧洲" },
    { id: "asia", label: "亚洲" },
    { id: "north-america", label: "北美洲" },
    { id: "south-america", label: "南美洲" },
    { id: "oceania", label: "大洋洲" },
    { id: "africa", label: "非洲" }
  ],
  insights: [
    { value: "280", label: "法规条目占位" },
    { value: "42", label: "重点地区占位" },
    { value: "18", label: "待配置专题占位" }
  ],
  results: [
    {
      id: "eu-ai-accountability",
      title: "European Artificial Intelligence Accountability Framework Draft",
      summary: "欧盟人工智能责任框架草案，覆盖高风险系统记录、模型透明度与责任追踪。",
      region: "europe",
      regionLabel: "欧洲",
      type: "guide",
      typeLabel: "监管指南",
      topic: "ai",
      topicLabel: "人工智能与新技术治理",
      status: "现行有效",
      date: "2026-05-18"
    },
    {
      id: "asean-data-flow",
      title: "ASEAN Trusted Data Flow Operational Baseline",
      summary: "东盟可信数据流动操作基线，提供跨境传输评估、接收方义务和申诉协作模板。",
      region: "asia",
      regionLabel: "亚洲",
      type: "treaty",
      typeLabel: "国际条约",
      topic: "crossborder",
      topicLabel: "数据跨境传输与监管遵从",
      status: "跟踪中",
      date: "2026-04-02"
    },
    {
      id: "us-connected-vehicle-data",
      title: "Connected Vehicle Data Governance and Security Notice",
      summary: "面向智能网联汽车的数据治理与安全通知，聚焦采集边界、供应链审查和远程更新。",
      region: "north-america",
      regionLabel: "北美洲",
      type: "law",
      typeLabel: "国家/地区法规",
      topic: "mobility",
      topicLabel: "交通管理与行业数据监管",
      status: "草案征询",
      date: "2026-03-21"
    },
    {
      id: "au-privacy-modernization",
      title: "Privacy Modernisation Package for Digital Services",
      summary: "数字服务隐私现代化方案，包含儿童数据、敏感画像、自动化决策和通知义务。",
      region: "oceania",
      regionLabel: "大洋洲",
      type: "law",
      typeLabel: "国家/地区法规",
      topic: "privacy",
      topicLabel: "数据保护与隐私合规",
      status: "现行有效",
      date: "2026-02-10"
    }
  ]
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
      return `<button class="region-item${active}" type="button" data-region="${escapeHTML(region.id)}">${escapeHTML(region.label)}</button>`;
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
    const searchable = [item.title, item.summary, item.regionLabel, item.typeLabel, item.topicLabel]
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
    return new Date(b.date) - new Date(a.date);
  });
}

function renderResults(config) {
  const results = getFilteredResults(config.results);
  nodes.resultCount.textContent = results.length;
  nodes.emptyState.hidden = results.length > 0;
  nodes.resultList.innerHTML = results.map(renderResultCard).join("");
}

function renderResultCard(item) {
  return `
    <article class="result-card">
      <div class="result-main">
        <h3 class="result-title">${escapeHTML(item.title)}</h3>
        <p class="result-summary">${escapeHTML(item.summary)}</p>
        <div class="metadata">
          <span>地区：${escapeHTML(item.regionLabel)}</span>
          <span>法规类型：${escapeHTML(item.typeLabel)}</span>
          <span>核心领域：${escapeHTML(item.topicLabel)}</span>
          <span>更新：${escapeHTML(item.date)}</span>
        </div>
      </div>
      <div class="result-side">
        <div class="status-pill">${escapeHTML(item.status)}</div>
        <div class="card-actions">
          <a class="view-link" href="#" data-id="${escapeHTML(item.id)}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h13a2 2 0 0 1 2 2v12H6a2 2 0 0 0-2 2V5Z"></path>
              <path d="M6 19h13"></path>
            </svg>
            查看
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

document.addEventListener("DOMContentLoaded", () => mount(seedData));
