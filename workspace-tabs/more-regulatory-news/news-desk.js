(function () {
  const newsItems = [
    {
      id: "eu-ai-act-2024",
      title: "欧盟《人工智能法案》建立高风险 AI 系统合规框架",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "人工智能",
      type: "法规文本",
      language: "EN",
      publishedAt: "2024-07-12",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng",
      summary: "法规对 AI 系统建立统一监管框架，高风险 AI 系统需落实风险管理、数据治理、透明度、人类监督和稳健性要求。",
      relatedLaw: "Regulation (EU) 2024/1689",
      relatedArticles: ["Art. 9", "Art. 10", "Art. 13", "Art. 14", "Art. 15"],
      scenarios: ["车载智能辅助系统", "生成式 AI 客服", "自动化风险评分", "算法合规评估"],
      impact: "高",
      valueScore: 94,
      duplicateRisk: 8,
      recommendedAction: "建议 AI 产品、法务和数据治理团队共同复核高风险系统清单与模型记录机制。"
    },
    {
      id: "eu-data-act-2023",
      title: "欧盟《数据法案》明确互联产品数据访问与云服务切换规则",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "数据流通",
      type: "法规文本",
      language: "EN",
      publishedAt: "2023-12-22",
      url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng",
      summary: "法规围绕产品数据、相关服务数据、数据持有者义务、第三方访问以及数据处理服务切换建立统一规则。",
      relatedLaw: "Regulation (EU) 2023/2854",
      relatedArticles: ["Art. 3", "Art. 4", "Art. 5", "Art. 23", "Art. 25", "Art. 30"],
      scenarios: ["车联网产品数据访问", "云服务供应商切换", "用户数据携带", "供应商合同管理"],
      impact: "高",
      valueScore: 91,
      duplicateRisk: 12,
      recommendedAction: "建议梳理互联产品数据目录、用户访问路径和云服务退出条款。"
    },
    {
      id: "gdpr-2016",
      title: "GDPR 确立个人数据处理原则、权利响应与跨境传输规则",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "数据保护",
      type: "法规文本",
      language: "EN",
      publishedAt: "2016-05-04",
      url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng",
      summary: "法规规定个人数据处理原则、合法性基础、数据主体权利、安全设计、影响评估和第三国传输机制。",
      relatedLaw: "Regulation (EU) 2016/679",
      relatedArticles: ["Art. 5", "Art. 6", "Art. 12", "Art. 17", "Art. 25", "Art. 35", "Art. 44", "Art. 46"],
      scenarios: ["用户数据处理台账", "删除权响应", "DPIA 评估", "跨境供应商运维"],
      impact: "高",
      valueScore: 89,
      duplicateRisk: 18,
      recommendedAction: "建议优先核查处理活动记录、权利响应机制、DPIA 模板和跨境传输文件。"
    },
    {
      id: "dsa-2022",
      title: "欧盟《数字服务法》要求超大型平台开展系统性风险治理",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "平台治理",
      type: "法规文本",
      language: "EN",
      publishedAt: "2022-10-27",
      url: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng",
      summary: "法规对数字中介服务、内容治理、透明度报告、超大型平台风险评估和研究者数据访问提出分层义务。",
      relatedLaw: "Regulation (EU) 2022/2065",
      relatedArticles: ["Art. 14", "Art. 16", "Art. 34", "Art. 35", "Art. 40", "Art. 42"],
      scenarios: ["内容推荐系统", "平台风险评估", "广告透明度", "研究者数据访问"],
      impact: "高",
      valueScore: 82,
      duplicateRisk: 22,
      recommendedAction: "建议平台团队准备风险评估证据、内容治理流程和透明度报告数据。"
    },
    {
      id: "nis2-2022",
      title: "欧盟 NIS2 指令提高关键和重要实体网络安全义务",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "网络安全",
      type: "指令文本",
      language: "EN",
      publishedAt: "2022-12-27",
      url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng",
      summary: "指令要求成员国提升网络和信息系统安全水平，覆盖风险管理措施、事件通报、供应链安全和管理责任。",
      relatedLaw: "Directive (EU) 2022/2555",
      relatedArticles: ["Art. 20", "Art. 21", "Art. 23", "Art. 29", "Art. 32"],
      scenarios: ["车联网后台服务", "云平台运维", "供应链安全审查", "重大事件通报"],
      impact: "高",
      valueScore: 88,
      duplicateRisk: 16,
      recommendedAction: "建议安全、法务和运维团队统一事件分级、报告时限和供应链安全检查项。"
    },
    {
      id: "china-pipl-2021",
      title: "中国《个人信息保护法》明确个人信息处理和出境规则",
      source: "全国人大英文版",
      sourceType: "国家法律文本",
      jurisdiction: "中国",
      topic: "数据保护",
      type: "法律文本",
      language: "EN",
      publishedAt: "2021-08-20",
      url: "http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm",
      summary: "法律规定个人信息处理原则、告知同意、敏感个人信息、自动化决策、个人信息出境和影响评估等要求。",
      relatedLaw: "Personal Information Protection Law of the PRC",
      relatedArticles: ["Art. 13", "Art. 17", "Art. 29", "Art. 38", "Art. 39", "Art. 55"],
      scenarios: ["用户授权与告知", "敏感个人信息处理", "个人信息出境", "自动化决策说明"],
      impact: "高",
      valueScore: 76,
      duplicateRisk: 31,
      recommendedAction: "建议复核个人信息处理规则、出境路径、单独同意和个人信息保护影响评估。"
    },
    {
      id: "ccpa-cpra",
      title: "加州 CCPA/CPRA 强化消费者个人信息权利和敏感信息限制",
      source: "California Legislative Information",
      sourceType: "州法典",
      jurisdiction: "美国加州",
      topic: "数据保护",
      type: "州法律文本",
      language: "EN",
      publishedAt: "2023-01-01",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&lawCode=CIV&part=4.&title=1.81.5",
      summary: "加州消费者隐私规则覆盖告知、访问、删除、选择退出出售或共享、限制使用敏感个人信息和请求响应机制。",
      relatedLaw: "California Civil Code Title 1.81.5",
      relatedArticles: ["§1798.100", "§1798.105", "§1798.110", "§1798.120", "§1798.121", "§1798.130"],
      scenarios: ["隐私声明更新", "消费者请求响应", "敏感信息限制", "广告共享选择退出"],
      impact: "中",
      valueScore: 87,
      duplicateRisk: 19,
      recommendedAction: "建议检查隐私声明、DSAR 流程、敏感信息限制入口和出售/共享选择退出机制。"
    },
    {
      id: "data-governance-act-2022",
      title: "欧盟《数据治理法》规范公共部门受保护数据再利用和数据中介",
      source: "EUR-Lex",
      sourceType: "欧盟官方公报",
      jurisdiction: "欧盟",
      topic: "数据流通",
      type: "法规文本",
      language: "EN",
      publishedAt: "2022-06-03",
      url: "https://eur-lex.europa.eu/eli/reg/2022/868/oj/eng",
      summary: "法规围绕公共部门持有的受保护数据再利用、数据中介服务、数据利他主义和欧洲数据创新委员会建立治理机制。",
      relatedLaw: "Regulation (EU) 2022/868",
      relatedArticles: ["Art. 3", "Art. 5", "Art. 10", "Art. 12", "Art. 16", "Art. 29"],
      scenarios: ["公共数据再利用", "数据中介合规", "数据利他项目", "研究数据共享"],
      impact: "中",
      valueScore: 78,
      duplicateRisk: 27,
      recommendedAction: "建议数据合作项目梳理数据来源、再利用限制、数据中介角色和访问控制要求。"
    }
  ];

  const state = {
    selectedId: newsItems[0].id,
    region: "all",
    topic: "all",
    impact: "all",
    query: ""
  };

  const nodes = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function uniqueValues(key) {
    return [...new Set(newsItems.map((item) => item[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  function getFilteredItems() {
    const query = state.query.toLowerCase();
    return newsItems.filter((item) => {
      const regionMatch = state.region === "all" || item.jurisdiction === state.region;
      const topicMatch = state.topic === "all" || item.topic === state.topic;
      const impactMatch = state.impact === "all" || item.impact === state.impact;
      const text = [item.title, item.source, item.summary, item.relatedLaw, item.recommendedAction].join(" ").toLowerCase();
      return regionMatch && topicMatch && impactMatch && (!query || text.includes(query));
    });
  }

  function selectedItem() {
    return newsItems.find((item) => item.id === state.selectedId) || getFilteredItems()[0] || newsItems[0];
  }

  function renderFilters() {
    nodes.regionFilter.innerHTML = [`<option value="all">全部地区</option>`, ...uniqueValues("jurisdiction").map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`)].join("");
    nodes.topicFilter.innerHTML = [`<option value="all">全部领域</option>`, ...uniqueValues("topic").map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`)].join("");
    nodes.impactFilter.innerHTML = [`<option value="all">全部等级</option>`, ...uniqueValues("impact").map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}影响</option>`)].join("");
  }

  function renderKpis(items) {
    const highValue = items.filter((item) => item.valueScore >= 85).length;
    const deduped = items.filter((item) => item.duplicateRisk <= 25).length;
    const relatedLaws = new Set(items.map((item) => item.relatedLaw)).size;
    const articleLinks = items.reduce((sum, item) => sum + item.relatedArticles.length, 0);
    const reviewNeeded = items.filter((item) => item.duplicateRisk > 25).length;
    const kpis = [
      [items.length, "当前资讯"],
      [deduped, "低重复风险"],
      [highValue, "高价值资讯"],
      [relatedLaws, "关联法规"],
      [articleLinks, "关联条款"],
      [reviewNeeded, "待人工复核"]
    ];
    nodes.kpiStrip.innerHTML = kpis.map(([value, label]) => `
      <article class="kpi-card">
        <strong>${escapeHTML(value)}</strong>
        <span>${escapeHTML(label)}</span>
      </article>
    `).join("");
  }

  function renderNewsList(items) {
    nodes.queueCount.textContent = `${items.length} 条`;
    nodes.newsList.innerHTML = items.length ? items.map((item) => `
      <button type="button" class="news-card ${item.id === state.selectedId ? "is-active" : ""}" data-news-id="${escapeHTML(item.id)}">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
        <div class="tag-row">
          <span class="tag">${escapeHTML(item.jurisdiction)}</span>
          <span class="tag">${escapeHTML(item.topic)}</span>
          <span class="tag ${item.impact === "高" ? "hot" : "ok"}">${escapeHTML(item.impact)}影响</span>
          <span class="tag">评分 ${escapeHTML(item.valueScore)}</span>
        </div>
      </button>
    `).join("") : `<div class="empty">当前筛选下暂无资讯</div>`;

    nodes.newsList.querySelectorAll("[data-news-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedId = button.dataset.newsId;
        render();
      });
    });
  }

  function renderDetail(item) {
    if (!item) {
      nodes.detailContent.innerHTML = `<div class="empty">请选择一条资讯</div>`;
      return;
    }
    nodes.detailContent.innerHTML = `
      <h3 class="detail-title">${escapeHTML(item.title)}</h3>
      <div class="detail-meta">
        <span class="tag">${escapeHTML(item.source)}</span>
        <span class="tag">${escapeHTML(item.sourceType)}</span>
        <span class="tag">${escapeHTML(item.jurisdiction)}</span>
        <span class="tag">${escapeHTML(item.language)}</span>
        <span class="tag">${escapeHTML(item.publishedAt)}</span>
      </div>
      <div class="score-panel">
        <div class="score-card"><strong>${escapeHTML(item.valueScore)}</strong><span>资讯价值</span></div>
        <div class="score-card"><strong>${escapeHTML(item.duplicateRisk)}%</strong><span>重复风险</span></div>
        <div class="score-card"><strong>${escapeHTML(item.relatedArticles.length)}</strong><span>关联条款</span></div>
      </div>
      <section class="detail-section">
        <h3>标准化摘要</h3>
        <p>${escapeHTML(item.summary)}</p>
      </section>
      <div class="detail-grid">
        <section class="detail-section">
          <h3>自动分类标签</h3>
          <div class="tag-row">
            <span class="tag">${escapeHTML(item.topic)}</span>
            <span class="tag">${escapeHTML(item.type)}</span>
            <span class="tag ${item.impact === "高" ? "hot" : "ok"}">${escapeHTML(item.impact)}影响</span>
          </div>
        </section>
        <section class="detail-section">
          <h3>关联法规与条款</h3>
          <p>${escapeHTML(item.relatedLaw)} · ${item.relatedArticles.map(escapeHTML).join(" / ")}</p>
        </section>
        <section class="detail-section">
          <h3>影响场景</h3>
          <ul>${item.scenarios.map((scenario) => `<li>${escapeHTML(scenario)}</li>`).join("")}</ul>
        </section>
        <section class="detail-section">
          <h3>官方原文</h3>
          <p><a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.source)}</a></p>
        </section>
      </div>
      <section class="detail-section action-section">
        <h3>建议动作</h3>
        <p>${escapeHTML(item.recommendedAction)}</p>
      </section>
    `;
  }

  function renderBrief(items) {
    const high = [...items].sort((a, b) => b.valueScore - a.valueScore).slice(0, 3);
    const selected = selectedItem();
    nodes.briefPreview.innerHTML = `
      <section class="brief-block">
        <h3>本周重点</h3>
        <ol>${high.map((item) => `<li>${escapeHTML(item.title)}（${escapeHTML(item.jurisdiction)} / ${escapeHTML(item.topic)}）</li>`).join("")}</ol>
      </section>
      <section class="brief-block">
        <h3>核心影响</h3>
        <ul>
          <li>高价值资讯集中在 ${escapeHTML(high[0]?.topic || "暂无")} 与 ${escapeHTML(high[1]?.topic || "暂无")} 方向，建议优先复核。</li>
          <li>${escapeHTML(selected?.title || "当前资讯")} 已关联 ${escapeHTML(selected?.relatedLaw || "法规知识库")}，可进入条款映射。</li>
          <li>低重复风险资讯占比较高，可优先纳入本周重点研判范围。</li>
        </ul>
      </section>
      <section class="brief-block">
        <h3>建议动作</h3>
        <ul>${high.map((item) => `<li>${escapeHTML(item.recommendedAction)}</li>`).join("")}</ul>
      </section>
    `;
  }

  function render() {
    const items = getFilteredItems();
    if (!items.some((item) => item.id === state.selectedId)) {
      state.selectedId = items[0]?.id || newsItems[0].id;
    }
    const item = selectedItem();
    renderKpis(items);
    renderNewsList(items);
    renderDetail(item);
    renderBrief(items);
  }

  function bindEvents() {
    nodes.regionFilter.addEventListener("change", () => {
      state.region = nodes.regionFilter.value;
      render();
    });
    nodes.topicFilter.addEventListener("change", () => {
      state.topic = nodes.topicFilter.value;
      render();
    });
    nodes.impactFilter.addEventListener("change", () => {
      state.impact = nodes.impactFilter.value;
      render();
    });
    nodes.keywordFilter.addEventListener("input", () => {
      state.query = nodes.keywordFilter.value.trim();
      render();
    });
    nodes.resetFilters.addEventListener("click", () => {
      Object.assign(state, { region: "all", topic: "all", impact: "all", query: "" });
      nodes.regionFilter.value = "all";
      nodes.topicFilter.value = "all";
      nodes.impactFilter.value = "all";
      nodes.keywordFilter.value = "";
      render();
    });
    nodes.regenerateBrief.addEventListener("click", () => renderBrief(getFilteredItems()));
    nodes.generateBriefFromDetail.addEventListener("click", () => renderBrief([selectedItem(), ...getFilteredItems()].filter(Boolean)));
  }

  function mount() {
    Object.assign(nodes, {
      kpiStrip: byId("kpiStrip"),
      regionFilter: byId("regionFilter"),
      topicFilter: byId("topicFilter"),
      impactFilter: byId("impactFilter"),
      keywordFilter: byId("keywordFilter"),
      resetFilters: byId("resetFilters"),
      queueCount: byId("queueCount"),
      newsList: byId("newsList"),
      detailContent: byId("detailContent"),
      generateBriefFromDetail: byId("generateBriefFromDetail"),
      regenerateBrief: byId("regenerateBrief"),
      briefPreview: byId("briefPreview")
    });
    renderFilters();
    bindEvents();
    render();
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
