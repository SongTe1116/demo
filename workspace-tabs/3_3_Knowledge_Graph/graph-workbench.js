const nodeTypes = {
  regulation: { label: "法规", color: "#2457d6" },
  article: { label: "条款", color: "#1fa789" },
  obligation: { label: "义务", color: "#c48725" },
  guide: { label: "指南", color: "#6b5bd6" },
  case: { label: "案例", color: "#c84f6d" },
  scenario: { label: "业务场景", color: "#425466" },
  concept: { label: "领域概念", color: "#159cd7" }
};

const scenarios = [
  {
    id: "dpia",
    title: "GDPR DPIA 关系链",
    mode: "关系链追踪",
    description: "从一个条款出发，沿义务、指南、案例和业务场景做多跳追踪。",
    quality: "人工复核优先",
    selected: "gdpr-35",
    mainPath: ["gdpr-35", "dpia", "edpb-dpia", "case-clearview", "face-entry"],
    evidence: {
      recall: "命中 GDPR 第35条、EDPB DPIA 指南、相关执法案例和汽车场景标签。",
      reason: "主路径说明 DPIA 条款如何落到高风险处理义务，并继续关联到生物识别业务场景。",
      check: "条款到义务、指南到案例等关键关系需要保留来源并经人工复核。"
    },
    nodes: [
      { id: "gdpr", label: "GDPR", type: "regulation", x: 15, y: 28, size: 86, summary: "欧盟通用数据保护条例，是个人数据处理的基础性法规。", tags: ["Regulation", "EU"] },
      { id: "gdpr-35", label: "GDPR 第35条", type: "article", x: 33, y: 28, size: 96, summary: "高风险处理活动应开展数据保护影响评估，DPIA 是汽车智能座舱场景的重要合规入口。", tags: ["Article", "DPIA", "High Risk"] },
      { id: "dpia", label: "DPIA 义务", type: "obligation", x: 52, y: 28, size: 92, summary: "识别处理目的、必要性、比例原则、风险及缓解措施，形成可审计记录。", tags: ["Obligation", "Assessment"] },
      { id: "data-act", label: "数据法案", type: "regulation", x: 34, y: 62, size: 84, summary: "与联网产品、数据访问、数据共享和用户控制相关，可与 DPIA 的数据流识别形成互补。", tags: ["Regulation", "Connected Product"] },
      { id: "edpb-dpia", label: "EDPB 指南", type: "guide", x: 70, y: 25, size: 90, summary: "提供 DPIA 触发条件、风险判断和监管解释，是 RAG 生成解释时的重要依据。", tags: ["Guide", "EDPB"] },
      { id: "case-clearview", label: "执法案例", type: "case", x: 74, y: 55, size: 88, summary: "生物识别数据处理和透明度不足相关案例，可作为风险识别与处罚后果参考。", tags: ["Case", "Biometrics"] },
      { id: "face-entry", label: "人脸识别上车", type: "scenario", x: 53, y: 76, size: 102, summary: "汽车业务场景：采集人脸特征完成身份识别、权限控制或个性化座舱服务。", tags: ["BusinessScenario", "Automotive"] },
      { id: "biometric", label: "生物识别信息", type: "concept", x: 88, y: 78, size: 90, summary: "敏感个人数据概念节点，可向 GDPR、案例和业务场景做多跳扩展。", tags: ["Concept", "Sensitive Data"] }
    ],
    edges: [
      { from: "gdpr", to: "gdpr-35", label: "contains" },
      { from: "gdpr-35", to: "dpia", label: "requires", main: true },
      { from: "dpia", to: "edpb-dpia", label: "explained_by", main: true },
      { from: "edpb-dpia", to: "case-clearview", label: "referenced_by", main: true },
      { from: "case-clearview", to: "face-entry", label: "maps_to", main: true },
      { from: "data-act", to: "face-entry", label: "applies_to" },
      { from: "face-entry", to: "biometric", label: "uses" },
      { from: "biometric", to: "gdpr-35", label: "triggers" }
    ]
  },
  {
    id: "cross-border",
    title: "数据跨境传输跨法域对比",
    mode: "跨法域对比",
    description: "围绕同一合规主题，对比不同法域下的法规、条款和义务。",
    quality: "适合主题映射",
    selected: "cross-border",
    mainPath: ["cross-border", "gdpr-chapter-v", "us-framework", "jp-apppi"],
    evidence: {
      recall: "命中数据跨境传输主题下的欧盟、美国、日本核心法规与条款映射。",
      reason: "同一主题节点将不同法域的法规、条款和义务对齐，便于形成对比视图。",
      check: "重点校验法域、法规层级、条款适用范围和映射关系是否一致。"
    },
    nodes: [
      { id: "cross-border", label: "数据跨境传输", type: "concept", x: 50, y: 20, size: 110, summary: "主题节点，用于聚合不同法域的核心法规、条款和合规机制。", tags: ["Concept", "Cross-border"] },
      { id: "eu", label: "欧盟", type: "scenario", x: 18, y: 48, size: 76, summary: "以 GDPR 第五章、SCC、充分性认定和补充措施为核心。", tags: ["Jurisdiction", "EU"] },
      { id: "us", label: "美国", type: "scenario", x: 50, y: 52, size: 76, summary: "以行业监管、州法、隐私框架和企业承诺为主要映射入口。", tags: ["Jurisdiction", "US"] },
      { id: "jp", label: "日本", type: "scenario", x: 82, y: 48, size: 76, summary: "以 APPI 及个人信息保护委员会指南为核心。", tags: ["Jurisdiction", "Japan"] },
      { id: "gdpr-chapter-v", label: "GDPR 第五章", type: "article", x: 18, y: 76, size: 96, summary: "规定向第三国或国际组织转移个人数据的条件。", tags: ["Article", "Transfer"] },
      { id: "us-framework", label: "隐私框架", type: "regulation", x: 50, y: 78, size: 92, summary: "用于展示美国侧跨境数据治理的法规、框架与企业义务节点。", tags: ["Regulation", "Framework"] },
      { id: "jp-apppi", label: "APPI 跨境规则", type: "article", x: 82, y: 76, size: 96, summary: "日本个人信息保护法下关于第三方提供和境外转移的核心规则。", tags: ["Article", "APPI"] },
      { id: "scc", label: "SCC / 充分性", type: "obligation", x: 31, y: 34, size: 88, summary: "欧盟侧常见传输机制，可与合同、补充措施和风险评估节点连接。", tags: ["Obligation", "Mechanism"] },
      { id: "risk-assessment", label: "传输风险评估", type: "obligation", x: 67, y: 34, size: 90, summary: "比较不同法域下的风险评估、告知、同意和接收方约束。", tags: ["Obligation", "Assessment"] }
    ],
    edges: [
      { from: "cross-border", to: "eu", label: "maps_to", main: true },
      { from: "cross-border", to: "us", label: "maps_to", main: true },
      { from: "cross-border", to: "jp", label: "maps_to", main: true },
      { from: "eu", to: "gdpr-chapter-v", label: "contains", main: true },
      { from: "us", to: "us-framework", label: "contains", main: true },
      { from: "jp", to: "jp-apppi", label: "contains", main: true },
      { from: "gdpr-chapter-v", to: "scc", label: "requires" },
      { from: "scc", to: "risk-assessment", label: "supports" },
      { from: "jp-apppi", to: "risk-assessment", label: "requires" },
      { from: "us-framework", to: "risk-assessment", label: "references" }
    ]
  }
];

const state = {
  scenarioId: scenarios[0].id,
  selectedNodeId: scenarios[0].selected
};

const nodes = {
  queryForm: document.getElementById("queryForm"),
  graphQuery: document.getElementById("graphQuery"),
  scenarioList: document.getElementById("scenarioList"),
  legend: document.getElementById("legend"),
  modeLabel: document.getElementById("modeLabel"),
  scenarioTitle: document.getElementById("scenarioTitle"),
  qualityChip: document.getElementById("qualityChip"),
  graphCanvas: document.getElementById("graphCanvas"),
  pathStrip: document.getElementById("pathStrip"),
  nodeTitle: document.getElementById("nodeTitle"),
  nodeSummary: document.getElementById("nodeSummary"),
  nodeTags: document.getElementById("nodeTags"),
  evidenceRecall: document.getElementById("evidenceRecall"),
  evidenceReason: document.getElementById("evidenceReason"),
  evidenceCheck: document.getElementById("evidenceCheck"),
  focusPath: document.getElementById("focusPath"),
  exportSubgraph: document.getElementById("exportSubgraph")
};

function getScenario() {
  return scenarios.find((item) => item.id === state.scenarioId) || scenarios[0];
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

function renderScenarioList() {
  nodes.scenarioList.innerHTML = scenarios
    .map((item) => {
      const active = item.id === state.scenarioId ? " is-active" : "";
      return `
        <button class="scenario-button${active}" type="button" data-scenario="${item.id}">
          ${escapeHTML(item.mode)}
          <small>${escapeHTML(item.description)}</small>
        </button>
      `;
    })
    .join("");
}

function renderLegend() {
  nodes.legend.innerHTML = Object.values(nodeTypes)
    .map((item) => `<div class="legend-item" style="--node-color:${item.color}"><span class="legend-dot"></span>${escapeHTML(item.label)}</div>`)
    .join("");
}

function getNodeMap(scenario) {
  return new Map(scenario.nodes.map((node) => [node.id, node]));
}

function edgeLine(edge, nodeMap) {
  const from = nodeMap.get(edge.from);
  const to = nodeMap.get(edge.to);
  if (!from || !to) return "";
  const className = edge.main ? "graph-edge is-main" : "graph-edge";
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return `
    <line class="${className}" x1="${from.x}%" y1="${from.y}%" x2="${to.x}%" y2="${to.y}%"></line>
    <text class="graph-edge-label" x="${midX}%" y="${midY}%">${escapeHTML(edge.label)}</text>
  `;
}

function renderGraph() {
  const scenario = getScenario();
  const nodeMap = getNodeMap(scenario);
  nodes.modeLabel.textContent = `${scenario.mode}结果`;
  nodes.scenarioTitle.textContent = scenario.title;
  nodes.qualityChip.textContent = scenario.quality;
  nodes.evidenceRecall.textContent = scenario.evidence.recall;
  nodes.evidenceReason.textContent = scenario.evidence.reason;
  nodes.evidenceCheck.textContent = scenario.evidence.check;

  const svg = `
    <svg class="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${scenario.edges.map((edge) => edgeLine(edge, nodeMap)).join("")}
    </svg>
  `;

  const graphNodes = scenario.nodes
    .map((node) => {
      const type = nodeTypes[node.type] || nodeTypes.concept;
      const selected = node.id === state.selectedNodeId ? " is-selected" : "";
      return `
        <button class="graph-node${selected}" type="button" data-node="${node.id}" style="--x:${node.x}%;--y:${node.y}%;--size:${node.size}px;--node-color:${type.color}">
          ${escapeHTML(node.label)}
        </button>
      `;
    })
    .join("");

  nodes.graphCanvas.innerHTML = `${svg}${graphNodes}`;
  renderSelectedNode();
  renderPath();
}

function renderSelectedNode() {
  const scenario = getScenario();
  const current = getNodeMap(scenario).get(state.selectedNodeId) || scenario.nodes[0];
  const type = nodeTypes[current.type] || nodeTypes.concept;
  nodes.nodeTitle.textContent = current.label;
  nodes.nodeSummary.textContent = current.summary;
  nodes.nodeTags.innerHTML = [type.label, ...current.tags]
    .map((tag) => `<span>${escapeHTML(tag)}</span>`)
    .join("");
}

function renderPath() {
  const scenario = getScenario();
  const nodeMap = getNodeMap(scenario);
  nodes.pathStrip.innerHTML = scenario.mainPath
    .map((nodeId) => nodeMap.get(nodeId))
    .filter(Boolean)
    .map((node) => `<span class="path-step">${escapeHTML(node.label)}</span>`)
    .join("");
}

function bindEvents() {
  nodes.queryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = nodes.graphQuery.value.trim();
    const nextScenario = /跨境|跨法域|对比|美国|日本|主题|法域/.test(query) ? scenarios[1] : scenarios[0];
    state.scenarioId = nextScenario.id;
    state.selectedNodeId = nextScenario.selected;
    renderScenarioList();
    renderGraph();
  });

  nodes.scenarioList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scenario]");
    if (!button) return;
    const scenario = scenarios.find((item) => item.id === button.dataset.scenario);
    if (!scenario) return;
    state.scenarioId = scenario.id;
    state.selectedNodeId = scenario.selected;
    renderScenarioList();
    renderGraph();
  });

  nodes.graphCanvas.addEventListener("click", (event) => {
    const button = event.target.closest("[data-node]");
    if (!button) return;
    state.selectedNodeId = button.dataset.node;
    renderGraph();
  });

  nodes.focusPath.addEventListener("click", () => {
    const scenario = getScenario();
    state.selectedNodeId = scenario.mainPath[0] || scenario.selected;
    renderGraph();
  });

  nodes.exportSubgraph.addEventListener("click", () => {
    const scenario = getScenario();
    const payload = JSON.stringify(scenario, null, 2);
    const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scenario.id}-subgraph.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

renderScenarioList();
renderLegend();
renderGraph();
bindEvents();
