(function () {
  const database = window.RegulationIndexDatabase || { results: [], regions: [], topics: [], meta: {} };
  const allRecords = Array.isArray(database.results) ? database.results : [];
  const topicMap = new Map((database.topics || []).map((topic) => [topic.id, topic.label]));
  const colorSet = ["#2563d8", "#18a8e6", "#34c597", "#f2ad3d", "#e35b76", "#6e68d9", "#0f766e", "#9a6a16"];
  const today = new Date("2026-06-17T00:00:00");

  const obligationSignals = [
    { id: "rights", label: "数据主体权利", keywords: ["数据主体", "data subject", "access", "erasure", "portability", "访问", "删除", "可携"] },
    { id: "transfer", label: "跨境传输", keywords: ["cross-border", "outside the european union", "transfer", "跨境", "境外", "国际传输"] },
    { id: "incident", label: "安全事件报告", keywords: ["incident", "reporting", "notify", "breach", "事件", "报告", "通报", "通知"] },
    { id: "dpo", label: "DPO与治理", keywords: ["dpo", "data protection officer", "supervisory authority", "治理", "主管机关", "数据保护官"] },
    { id: "penalty", label: "处罚与罚款", keywords: ["fine", "penalty", "sanction", "liability", "罚款", "处罚", "制裁", "责任"] },
    { id: "transparency", label: "透明与告知", keywords: ["transparency", "information", "notice", "透明", "告知", "信息提供"] },
    { id: "sharing", label: "数据共享", keywords: ["data sharing", "access to data", "reuse", "数据共享", "数据访问", "再利用"] },
    { id: "ai", label: "AI治理", keywords: ["artificial intelligence", "ai act", "人工智能", "算法"] }
  ];

  const state = {
    region: "all",
    topic: "all",
    status: "all",
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

  function formatDate(value) {
    if (!value) return "待确认";
    return value.slice(0, 10);
  }

  function parseDate(value) {
    if (!value) return null;
    const parsed = new Date(`${value.slice(0, 10)}T00:00:00`);
    return Number.isFinite(parsed.getTime()) ? parsed : null;
  }

  function includesText(record, query) {
    if (!query) return true;
    const blob = [
      record.localTitle,
      record.title,
      record.referenceNo,
      record.issuer,
      record.summary,
      record.englishSummary,
      record.topicLabel,
      record.regionLabel,
      record.status
    ].join(" ").toLowerCase();
    return blob.includes(query.toLowerCase());
  }

  function getFilteredRecords() {
    return allRecords.filter((record) => {
      const regionMatch = state.region === "all" || record.region === state.region;
      const topicMatch = state.topic === "all" || record.topic === state.topic;
      const statusMatch = state.status === "all" || record.status === state.status;
      return regionMatch && topicMatch && statusMatch && includesText(record, state.query);
    });
  }

  function countBy(records, getter) {
    const map = new Map();
    records.forEach((record) => {
      const key = getter(record) || "待确认";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), "zh-CN"));
  }

  function yearOf(record) {
    return (record.publishDate || record.date || "").slice(0, 4) || "未知";
  }

  function getTopTopic(records) {
    const top = countBy(records, (record) => record.topicLabel)[0];
    return top ? top[0] : "暂无";
  }

  function setupFilters() {
    nodes.regionFilter.innerHTML = [
      `<option value="all">全部地区</option>`,
      ...(database.regions || []).map((region) => `<option value="${escapeHTML(region.id)}">${escapeHTML(region.label)} (${escapeHTML(region.count)})</option>`)
    ].join("");
    nodes.topicFilter.innerHTML = [
      `<option value="all">全部领域</option>`,
      ...(database.topics || []).map((topic) => `<option value="${escapeHTML(topic.id)}">${escapeHTML(topic.label)}</option>`)
    ].join("");
    const statuses = countBy(allRecords, (record) => record.status);
    nodes.statusFilter.innerHTML = [
      `<option value="all">全部状态</option>`,
      ...statuses.map(([status, count]) => `<option value="${escapeHTML(status)}">${escapeHTML(status)} (${escapeHTML(count)})</option>`)
    ].join("");
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
    nodes.statusFilter.addEventListener("change", () => {
      state.status = nodes.statusFilter.value;
      render();
    });
    nodes.keywordFilter.addEventListener("input", () => {
      state.query = nodes.keywordFilter.value.trim();
      render();
    });
    nodes.resetFilters.addEventListener("click", () => {
      state.region = "all";
      state.topic = "all";
      state.status = "all";
      state.query = "";
      nodes.regionFilter.value = "all";
      nodes.topicFilter.value = "all";
      nodes.statusFilter.value = "all";
      nodes.keywordFilter.value = "";
      render();
    });
    nodes.refreshInsight.addEventListener("click", () => renderInsight(getFilteredRecords(), true));
    document.querySelectorAll("[data-narrative]").forEach((button) => {
      button.addEventListener("click", () => renderNarrative(button.dataset.narrative, getFilteredRecords()));
    });
  }

  function renderMetrics(records) {
    const regions = new Set(records.map((record) => record.region).filter(Boolean));
    const futureRecords = records.filter((record) => {
      const effective = parseDate(record.effectiveDate);
      return effective && effective > today;
    });
    const values = [
      [records.length, "索引总量", "当前筛选命中的法规索引"],
      [regions.size, "地区覆盖", "按法域/地区聚合的范围"],
      [futureRecords.length, "即将生效", "生效日期晚于当前日期"],
      [getTopTopic(records), "最高热度领域", "当前样本出现最多的主题"]
    ];

    nodes.metricStrip.innerHTML = values
      .map(([value, label, hint]) => `
        <article class="metric-card">
          <strong>${escapeHTML(value)}</strong>
          <span>${escapeHTML(label)}</span>
          <small>${escapeHTML(hint)}</small>
        </article>
      `)
      .join("");
  }

  function renderInsight(records, isManual = false) {
    const topRegion = countBy(records, (record) => record.regionLabel)[0];
    const topTopic = countBy(records, (record) => record.topicLabel)[0];
    const future = records.filter((record) => {
      const effective = parseDate(record.effectiveDate);
      return effective && effective > today;
    });
    const prefix = isManual ? "更新洞察：" : "";
    nodes.autoInsight.textContent = records.length
      ? `${prefix}当前筛选下共有 ${records.length} 条法规索引，${topRegion?.[0] || "暂无地区"}为主要集中区域，${topTopic?.[0] || "暂无领域"}是最活跃主题；未来生效样本 ${future.length} 条，建议优先核查高频领域与即将实施条目的合规准备度。`
      : "当前筛选下暂无数据，建议放宽地区、领域或状态条件。";
  }

  function renderCountryChart(records) {
    const top = countBy(records, (record) => record.regionLabel).slice(0, 8);
    const max = Math.max(...top.map((item) => item[1]), 1);
    nodes.countryChart.innerHTML = top.length ? top.map(([label, count]) => {
      const width = `${Math.max(4, Math.round((count / max) * 100))}%`;
      const region = records.find((record) => record.regionLabel === label)?.region || "all";
      return `
        <button type="button" class="bar-row" data-region-bar="${escapeHTML(region)}">
          <span>${escapeHTML(label)}</span>
          <div class="bar-track"><div class="bar-fill" style="--w:${width}"></div></div>
          <strong>${escapeHTML(count)}</strong>
        </button>
      `;
    }).join("") : `<div class="empty-state">暂无地区分布数据</div>`;

    nodes.countryChart.querySelectorAll("[data-region-bar]").forEach((button) => {
      button.addEventListener("click", () => {
        state.region = button.dataset.regionBar;
        nodes.regionFilter.value = state.region;
        render();
      });
    });
  }

  function renderTrendChart(records) {
    const years = [...new Set(records.map(yearOf).filter((year) => year !== "未知"))].sort();
    const topicCounts = countBy(records, (record) => record.topic).slice(0, state.topic === "all" ? 4 : 1);
    const topics = state.topic === "all" ? topicCounts.map(([topic]) => topic) : [state.topic];
    const width = 680;
    const height = 228;
    const pad = { left: 42, right: 20, top: 18, bottom: 42 };
    const usableW = width - pad.left - pad.right;
    const usableH = height - pad.top - pad.bottom;
    const data = topics.map((topic, index) => ({
      topic,
      label: topicMap.get(topic) || topic,
      color: colorSet[index % colorSet.length],
      values: years.map((year) => records.filter((record) => record.topic === topic && yearOf(record) === year).length)
    }));
    const max = Math.max(1, ...data.flatMap((serie) => serie.values));

    if (!years.length || !data.length) {
      nodes.trendChart.innerHTML = `<div class="empty-state">暂无趋势数据</div>`;
      return;
    }

    const x = (index) => pad.left + (years.length === 1 ? usableW / 2 : (index / (years.length - 1)) * usableW);
    const y = (value) => pad.top + usableH - (value / max) * usableH;
    const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const gy = pad.top + usableH * ratio;
      const label = Math.round(max * (1 - ratio));
      return `<line x1="${pad.left}" y1="${gy}" x2="${width - pad.right}" y2="${gy}" stroke="#dce7f2"/><text class="chart-axis" x="8" y="${gy + 4}">${label}</text>`;
    }).join("");
    const labelEvery = years.length > 12 ? 3 : years.length > 7 ? 2 : 1;
    const shouldShowYear = (index) => index === 0 || index === years.length - 1 || index % labelEvery === 0;
    const yearLabels = years
      .map((year, index) => {
        if (!shouldShowYear(index)) return "";
        return `<text class="chart-axis" x="${x(index)}" y="${height - 14}" text-anchor="middle">${year}</text>`;
      })
      .join("");
    const paths = data.map((serie) => {
      const points = serie.values.map((value, index) => `${x(index)},${y(value)}`);
      const circles = serie.values.map((value, index) => `<circle cx="${x(index)}" cy="${y(value)}" r="3.5" fill="${serie.color}"/>`).join("");
      return `<polyline points="${points.join(" ")}" fill="none" stroke="${serie.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${circles}`;
    }).join("");
    const legend = data.map((serie) => `<span><i class="legend-dot" style="--dot:${serie.color}"></i>${escapeHTML(serie.label)}</span>`).join("");

    nodes.trendChart.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="领域趋势折线图">
        ${grid}
        <line x1="${pad.left}" y1="${pad.top + usableH}" x2="${width - pad.right}" y2="${pad.top + usableH}" stroke="#b9c9dc"/>
        ${yearLabels}
        ${paths}
      </svg>
      <div class="chart-legend">${legend}</div>
    `;
  }

  function renderStatusChart(records) {
    const data = countBy(records, (record) => record.status);
    const total = Math.max(records.length, 1);
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    const segments = data.map(([status, count], index) => {
      const length = (count / total) * circumference;
      const segment = `<circle r="${radius}" cx="78" cy="78" fill="transparent" stroke="${colorSet[index % colorSet.length]}" stroke-width="28" stroke-dasharray="${length} ${circumference - length}" stroke-dashoffset="${-offset}" transform="rotate(-90 78 78)"/>`;
      offset += length;
      return segment;
    }).join("");

    nodes.statusChart.innerHTML = `
      <svg viewBox="0 0 156 156" role="img" aria-label="法规时效状态占比">
        <circle r="${radius}" cx="78" cy="78" fill="transparent" stroke="#edf3f9" stroke-width="28"/>
        ${segments}
        <text x="78" y="72" text-anchor="middle" fill="#132034" font-size="24" font-weight="900">${records.length}</text>
        <text x="78" y="95" text-anchor="middle" fill="#66758b" font-size="12" font-weight="800">条索引</text>
      </svg>
    `;
    nodes.statusLegend.innerHTML = data.map(([status, count], index) => `
      <button type="button" data-status-bar="${escapeHTML(status)}">
        <span><i class="legend-dot" style="--dot:${colorSet[index % colorSet.length]}"></i>${escapeHTML(status)}</span>
        <strong>${escapeHTML(count)}</strong>
      </button>
    `).join("");
    nodes.statusLegend.querySelectorAll("[data-status-bar]").forEach((button) => {
      button.addEventListener("click", () => {
        state.status = button.dataset.statusBar;
        nodes.statusFilter.value = state.status;
        render();
      });
    });
  }

  function scoreRegion(records, regionLabel) {
    const scoped = records.filter((record) => record.regionLabel === regionLabel);
    const text = scoped.map((record) => [record.summary, record.englishSummary, record.title, record.localTitle, record.topicLabel].join(" ")).join(" ").toLowerCase();
    const keywordScore = (keywords, base) => Math.min(96, base + keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 13 : 0), 0) + scoped.length * 2);
    return {
      label: regionLabel,
      values: [
        keywordScore(["fine", "penalty", "sanction", "罚款", "处罚"], 30),
        keywordScore(["local", "localisation", "本地化", "境内"], 24),
        keywordScore(["transfer", "cross-border", "outside", "跨境", "境外"], 28),
        keywordScore(["transparency", "notice", "information", "透明", "告知"], 34),
        keywordScore(["cyber", "security", "incident", "report", "网络安全", "事件"], 32)
      ]
    };
  }

  function renderRadarChart(records) {
    const labels = ["处罚力度", "本地化", "跨境限制", "透明义务", "安全响应"];
    const regions = countBy(records, (record) => record.regionLabel).slice(0, 3).map(([label]) => label);
    if (!regions.length) {
      nodes.radarChart.innerHTML = `<div class="empty-state">暂无评分数据</div>`;
      return;
    }
    const width = 360;
    const height = 246;
    const cx = 180;
    const cy = 116;
    const maxRadius = 74;
    const angle = (index) => -Math.PI / 2 + (index / labels.length) * Math.PI * 2;
    const point = (index, value = 100) => {
      const ratio = value / 100;
      return [cx + Math.cos(angle(index)) * maxRadius * ratio, cy + Math.sin(angle(index)) * maxRadius * ratio];
    };
    const rings = [0.25, 0.5, 0.75, 1].map((ratio) => {
      const points = labels.map((_, index) => point(index, ratio * 100).join(",")).join(" ");
      return `<polygon points="${points}" fill="none" stroke="#dce7f2"/>`;
    }).join("");
    const axes = labels.map((label, index) => {
      const [x2, y2] = point(index, 108);
      const [lx, ly] = point(index, 124);
      return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#dce7f2"/><text class="chart-axis" x="${lx}" y="${ly}" text-anchor="middle">${escapeHTML(label)}</text>`;
    }).join("");
    const series = regions.map((region, index) => {
      const score = scoreRegion(records, region);
      const points = score.values.map((value, axisIndex) => point(axisIndex, value).join(",")).join(" ");
      const color = colorSet[index % colorSet.length];
      return `<polygon points="${points}" fill="${color}24" stroke="${color}" stroke-width="2.5"/>`;
    }).join("");
    const legend = regions.map((region, index) => `<span><i class="legend-dot" style="--dot:${colorSet[index % colorSet.length]}"></i>${escapeHTML(region)}</span>`).join("");
    nodes.radarChart.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="合规参数对比雷达图">
        ${rings}
        ${axes}
        ${series}
      </svg>
      <div class="chart-legend">${legend}</div>
    `;
  }

  function getTopObligation(records) {
    const text = records.map((record) => [record.summary, record.englishSummary, record.title, record.localTitle].join(" ")).join(" ").toLowerCase();
    return obligationSignals
      .map((signal) => ({
        ...signal,
        count: signal.keywords.reduce((sum, keyword) => sum + (text.match(new RegExp(escapeRegExp(keyword.toLowerCase()), "g")) || []).length, 0)
      }))
      .sort((a, b) => b.count - a.count);
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function renderObligationChart(records) {
    const data = getTopObligation(records).filter((item) => item.count > 0).slice(0, 6);
    const max = Math.max(...data.map((item) => item.count), 1);
    nodes.obligationChart.innerHTML = data.length ? data.map((item, index) => `
      <div class="bar-row">
        <span>${escapeHTML(item.label)}</span>
        <div class="bar-track"><div class="bar-fill" style="--w:${Math.max(4, Math.round((item.count / max) * 100))}%; background:linear-gradient(90deg, ${colorSet[index % colorSet.length]}, #18a8e6)"></div></div>
        <strong>${escapeHTML(item.count)}</strong>
      </div>
    `).join("") : `<div class="empty-state">暂无高频关注点</div>`;
  }

  function renderTimeline(records) {
    const upcoming = records
      .map((record) => ({ ...record, effective: parseDate(record.effectiveDate) }))
      .filter((record) => record.effective && record.effective > today)
      .sort((a, b) => a.effective - b.effective)
      .slice(0, 4);
    nodes.timelineList.innerHTML = upcoming.length ? upcoming.map((record) => `
      <article class="timeline-item">
        <div class="timeline-date">${escapeHTML(formatDate(record.effectiveDate).slice(5))}</div>
        <div>
          <h3>${escapeHTML(record.localTitle || record.title)}</h3>
          <p>${escapeHTML(record.regionLabel)} · ${escapeHTML(record.topicLabel)} · 发布 ${escapeHTML(formatDate(record.publishDate))}</p>
        </div>
      </article>
    `).join("") : `<div class="empty-state">当前筛选下暂无未来生效法规</div>`;
  }

  function renderRecords(records) {
    const latest = [...records]
      .sort((a, b) => (parseDate(b.publishDate)?.getTime() || 0) - (parseDate(a.publishDate)?.getTime() || 0))
      .slice(0, 3);
    nodes.datasetMeta.textContent = `${database.meta?.source || "法规索引数据"} · ${records.length} 条`;
    nodes.recordList.innerHTML = latest.length ? latest.map((record) => `
      <article class="record-item">
        <h3>${escapeHTML(record.localTitle || record.title)}</h3>
        <p>${escapeHTML(record.summary || record.englishSummary || "暂无摘要。")}</p>
        <div class="record-meta">
          <span>${escapeHTML(record.regionLabel)}</span>
          <span>${escapeHTML(record.topicLabel)}</span>
          <span>${escapeHTML(formatDate(record.publishDate))}</span>
        </div>
      </article>
    `).join("") : `<div class="empty-state">暂无法规索引</div>`;
  }

  function renderNarrative(kind, records) {
    const topRegion = countBy(records, (record) => record.regionLabel)[0];
    const topTopic = countBy(records, (record) => record.topicLabel)[0];
    const status = countBy(records, (record) => record.status)[0];
    const topSignal = getTopObligation(records)[0];
    const narratives = {
      country: `国别分布显示，${topRegion?.[0] || "暂无地区"}以 ${topRegion?.[1] || 0} 条法规索引位居当前样本首位。建议将该地区作为对标基准，再横向比较其高频领域与即将实施法规。`,
      trend: `领域趋势中，${topTopic?.[0] || "暂无领域"}是当前最活跃主题。若近期年份出现集中发布，通常意味着监管机构正在从原则性规则转向更细的执行与监督框架。`,
      status: `法规时效结构以“${status?.[0] || "暂无"}”为主，占当前样本 ${records.length ? Math.round((status?.[1] || 0) / records.length * 100) : 0}%。建议优先拆解现行有效与即将实施条目的义务边界。`,
      radar: `合规参数对比为规则评分 Demo，基于摘要关键词、主题和地区样本量推断。它适合演示差异化风险画像，正式版本建议接入法规拆解表中的处罚、跨境、本地化和监管要求字段。`,
      obligation: `高频监管关注点中，“${topSignal?.label || "暂无"}”信号最强。该结果来自法规标题和摘要关键词，可作为义务拆解前的粗筛入口。`,
      timeline: `即将实施预警用于排期管理。当前筛选下未来生效条目越集中，越需要提前分配条款解读、业务影响评估和整改验证资源。`
    };
    nodes.chartNarrative.textContent = narratives[kind] || "暂无解读。";
  }

  function render() {
    const records = getFilteredRecords();
    renderMetrics(records);
    renderInsight(records);
    renderCountryChart(records);
    renderTrendChart(records);
    renderStatusChart(records);
    renderRadarChart(records);
    renderObligationChart(records);
    renderTimeline(records);
    renderRecords(records);
  }

  function mount() {
    Object.assign(nodes, {
      regionFilter: byId("regionFilter"),
      topicFilter: byId("topicFilter"),
      statusFilter: byId("statusFilter"),
      keywordFilter: byId("keywordFilter"),
      resetFilters: byId("resetFilters"),
      metricStrip: byId("metricStrip"),
      autoInsight: byId("autoInsight"),
      refreshInsight: byId("refreshInsight"),
      countryChart: byId("countryChart"),
      trendChart: byId("trendChart"),
      statusChart: byId("statusChart"),
      statusLegend: byId("statusLegend"),
      radarChart: byId("radarChart"),
      obligationChart: byId("obligationChart"),
      timelineList: byId("timelineList"),
      chartNarrative: byId("chartNarrative"),
      recordList: byId("recordList"),
      datasetMeta: byId("datasetMeta")
    });

    setupFilters();
    bindEvents();
    render();
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
