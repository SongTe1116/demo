const app = document.getElementById("agentApp");

function renderHome() {
  app.className = "agent-app home-page";
  app.innerHTML = `
    <section class="home-hero">
      <div class="world-bg" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="eyebrow">AGENT INTELLIGENCE</p>
        <h1>合规智能体</h1>
        <p class="hero-copy">围绕法规检索、差距评估、敏感数据识别与变更影响分析，提供可追溯的合规辅助能力</p>

        <form class="task-bar" id="taskForm">
          <label class="sr-only" for="taskInput">任务描述</label>
          <input id="taskInput" value="评估车联网数据处理与 GDPR 的差距" />
          <button type="submit"><i data-lucide="play"></i>开始任务</button>
          <button class="ghost-btn" type="button" data-view="upload"><i data-lucide="upload"></i>上传材料</button>
        </form>

        <div class="capability-grid">
          <button class="capability is-selected" type="button" data-task="评估车联网数据处理与 GDPR 的差距">
            <span class="icon-tile"><i data-lucide="scale"></i></span>
            <span>
              <strong>合规差距评估</strong>
              <small>对业务流程、字段清单与法规要求做差距比对</small>
            </span>
          </button>
          <button class="capability" type="button" data-task="识别驾驶员画像材料中的敏感个人信息">
            <span class="icon-tile"><i data-lucide="scan-search"></i></span>
            <span>
              <strong>敏感数据识别</strong>
              <small>识别个人信息、敏感字段及其流转环节</small>
            </span>
          </button>
          <button class="capability" type="button" data-task="分析欧盟 AI Act 更新对业务流程的影响">
            <span class="icon-tile"><i data-lucide="refresh-cw"></i></span>
            <span>
              <strong>变更影响分析</strong>
              <small>分析法规更新或业务变化带来的影响</small>
            </span>
          </button>
          <button class="capability" type="button" data-task="阅读法规案例并提炼监管问答要点">
            <span class="icon-tile"><i data-lucide="file-text"></i></span>
            <span>
              <strong>文档阅读助手</strong>
              <small>提炼法规、案例与手册中的重点内容</small>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="home-panels">
      <article class="panel recent-panel">
        <div class="panel-head">
          <strong><i data-lucide="clock-3"></i>最近任务</strong>
          <button type="button">查看全部</button>
        </div>
        <div class="task-table">
          <div class="table-head"><span>任务名称</span><span>任务类型</span><span>国家/地区</span><span>状态</span><span>更新时间</span></div>
          <div class="selectable-row is-selected"><span><i data-lucide="file-check-2"></i>GDPR 车联网差距评估</span><span>合规差距评估</span><span>欧盟</span><b>进行中</b><span>2026-06-17 15:30</span></div>
          <div class="selectable-row"><span><i data-lucide="fingerprint"></i>PII 字段识别-驾驶员画像</span><span>敏感数据识别</span><span>中国</span><b class="done">已完成</b><span>2026-06-17 10:18</span></div>
          <div class="selectable-row"><span><i data-lucide="git-compare-arrows"></i>欧盟 AI Act 变更影响</span><span>变更影响分析</span><span>欧盟</span><b class="done">已完成</b><span>2026-06-16 16:45</span></div>
        </div>
      </article>

      <article class="panel template-panel">
        <div class="panel-head">
          <strong><i data-lucide="bookmark"></i>常用模板</strong>
          <button type="button">查看全部</button>
        </div>
        <div class="template-grid">
          <button class="template-item is-selected" type="button"><i data-lucide="globe-2"></i><strong>跨境传输合规检查</strong><span>评估数据跨境传输的合法性与合规要求</span></button>
          <button class="template-item" type="button"><i data-lucide="shield-check"></i><strong>隐私政策审阅</strong><span>审阅隐私政策内容，识别合规风险</span></button>
          <button class="template-item" type="button"><i data-lucide="database-zap"></i><strong>数据处理活动梳理</strong><span>形成处理活动清单</span></button>
          <button class="template-item" type="button"><i data-lucide="message-square-text"></i><strong>监管问答复要点</strong><span>生成监管问询答复重点</span></button>
        </div>
      </article>

      <article class="panel execution-panel">
        <strong><i data-lucide="workflow"></i>任务执行方式</strong>
        <div class="step-row">
          <div><b>1</b><span>提交问题/材料</span><small>输入问题或上传相关材料，明确任务目标</small></div>
          <div><b>2</b><span>补全关键信息</span><small>智能体将引导补充关键信息，完善任务范围</small></div>
          <div><b>3</b><span>生成结果与依据</span><small>输出结构化结果与法规依据，支持溯源追溯</small></div>
        </div>
      </article>
    </section>
  `;
}

function renderUpload() {
  app.className = "agent-app light-page";
  app.innerHTML = `
    <section class="work-page">
      <div class="page-title">
        <div>
          <h1>任务发起与材料上传</h1>
          <p>用户提出问题或上传材料，系统自动识别并检查信息完整性，缺失项会提示用户补充。</p>
        </div>
        <button class="link-btn" type="button" data-view="home"><i data-lucide="arrow-left"></i>返回首页</button>
      </div>

      <section class="assistant-card">
        <div class="assistant-head">
          <strong>合规助手（Agent）</strong>
          <span>Beta</span>
        </div>
        <div class="prompt-card">
          <strong>请描述您的问题或目标，例如：</strong>
          <div class="quick-prompts">
            <button class="is-selected" type="button">评估数据处理活动与 GDPR 的合规差距</button>
            <button type="button">识别上传文档中的敏感个人信息</button>
            <button type="button">分析法规变更对合规手册的影响</button>
            <button type="button">生成东南亚三国数据合规地图</button>
          </div>
          <div class="textarea-like">
            <span>评估车联网数据处理活动与 GDPR 的合规差距，重点关注跨境传输、敏感个人信息和用户权利响应。</span>
            <button type="button" data-view="report"><i data-lucide="arrow-right"></i>开始分析</button>
          </div>
        </div>
      </section>

      <section class="upload-grid">
        <article class="panel upload-list">
          <div class="panel-head">
            <strong>已上传的材料</strong>
            <button type="button"><i data-lucide="trash-2"></i>清空</button>
          </div>
          <div class="file-row is-selected"><span class="file-icon xls"><i data-lucide="sheet"></i></span><strong>用户信息收集清单.xlsx</strong><span>12.4 KB</span><b>解析成功</b></div>
          <div class="file-row"><span class="file-icon doc"><i data-lucide="file-type-2"></i></span><strong>数据处理活动说明.docx</strong><span>28.7 KB</span><b>解析成功</b></div>
          <div class="file-row"><span class="file-icon pdf"><i data-lucide="file-text"></i></span><strong>车联网业务流程图.pdf</strong><span>512 KB</span><b>解析成功</b></div>
        </article>

        <article class="panel check-panel">
          <div class="panel-head"><strong>信息完整性检测</strong><span></span></div>
          <div class="check-row"><span><i data-lucide="check-circle-2"></i>数据处理活动</span><b>已识别 3 项</b></div>
          <div class="check-row"><span><i data-lucide="check-circle-2"></i>字段清单</span><b>已识别 12 个字段</b></div>
          <div class="check-row"><span><i data-lucide="check-circle-2"></i>敏感个人信息</span><b>识别到 2 个敏感字段</b></div>
          <div class="check-row warn"><span><i data-lucide="triangle-alert"></i>数据跨境传输情况</span><b>待确认</b></div>
          <div class="check-row warn"><span><i data-lucide="triangle-alert"></i>数据保存期限</span><b>待补充</b></div>
          <div class="check-row"><span><i data-lucide="check-circle-2"></i>适用法规与地区</span><b>已选择：欧盟 GDPR</b></div>
        </article>

        <article class="panel confirm-panel">
          <div class="panel-head"><strong>待您确认或补充</strong><span></span></div>
          <label>1. 是否存在向欧盟以外地区传输个人数据？</label>
          <div class="radio-line"><span>是</span><span>否</span><span class="checked">不确定</span></div>
          <label>2. 请说明数据保存期限或规则</label>
          <input value="根据业务场景保存 3 年，具体以用户合同与售后服务周期为准" />
          <label>3. 是否有特殊数据处理方式？</label>
          <div class="radio-line"><span>是</span><span>否</span><span class="checked">不确定</span></div>
          <button type="button" data-view="report"><i data-lucide="arrow-right"></i>确认并开始分析</button>
        </article>
      </section>
    </section>
  `;
}

function renderReport() {
  app.className = "agent-app light-page";
  app.innerHTML = `
    <section class="report-page">
      <div class="report-actions">
        <button type="button" data-view="upload"><i data-lucide="arrow-left"></i>返回验证列表</button>
        <div>
          <button type="button"><i data-lucide="download"></i>导出报告</button>
          <button class="primary" type="button"><i data-lucide="message-circle-question"></i>继续追问</button>
        </div>
      </div>

      <header class="report-title">
        <h1>GDPR 合规差距评估报告</h1>
        <p>任务类型：合规差距评估　|　目标法规：GDPR（欧盟通用数据保护条例）　|　分析时间：2026-06-17 15:42</p>
      </header>

      <section class="risk-cards">
        <article><span>总体风险等级</span><strong class="danger">高风险</strong><i></i></article>
        <article><span>差距项数量</span><strong>12</strong><small>个差距</small></article>
        <article><span>高风险项</span><strong class="danger">5</strong><small>项</small></article>
        <article><span>中风险项</span><strong>4</strong><small>项</small></article>
        <article><span>低风险项</span><strong>3</strong><small>项</small></article>
      </section>

      <section class="report-layout">
        <article class="panel report-main">
          <div class="summary-box">
            <strong>结论摘要</strong>
            <p>基于您提供的材料，我们对比 GDPR 要求与当前数据处理活动，识别出 12 项合规差距，其中 5 项为高风险。主要风险集中在跨境传输机制、敏感个人信息处理合法性依据、数据主体权利保障及存储期限设置等方面。</p>
          </div>
          <div class="tabs">
            <button class="active" type="button">差距清单（12）</button>
            <button type="button">高风险（5）</button>
            <button type="button">中风险（4）</button>
            <button type="button">低风险（3）</button>
          </div>
          <div class="gap-table">
            <div class="thead"><span>编号</span><span>差距描述</span><span>风险等级</span><span>相关法规依据</span><span>操作</span></div>
            <div class="is-selected"><span>1</span><p>跨境传输未明确合法性机制，未采用 GDPR 第 44-49 条规定的合规机制。</p><b class="high">高风险</b><span>GDPR Art.44-49</span><button type="button">查看依据</button></div>
            <div><span>2</span><p>生物识别数据（人脸信息）处理未说明合法性依据，可能违反 GDPR Art.9。</p><b class="high">高风险</b><span>GDPR Art.9</span><button type="button">查看依据</button></div>
            <div><span>3</span><p>数据保存期限设置为 3 年，未提供必要性与最小化评估依据。</p><b class="mid">中风险</b><span>GDPR Art.5(1)(e)</span><button type="button">查看依据</button></div>
            <div><span>4</span><p>未明确向数据主体提供可行使权利的渠道与流程。</p><b class="mid">中风险</b><span>GDPR Art.12-22</span><button type="button">查看依据</button></div>
            <div><span>5</span><p>未开展数据保护影响评估（DPIA），对于高风险处理活动不符合要求。</p><b class="mid">中风险</b><span>GDPR Art.35</span><button type="button">查看依据</button></div>
          </div>
        </article>

        <aside class="panel evidence-side">
          <div class="side-head">
            <strong>差距 1 的依据</strong>
            <button type="button">×</button>
          </div>
          <section>
            <h3>差距描述</h3>
            <p>跨境传输未明确合法性机制，未采用 GDPR 第 44-49 条规定的合规机制。</p>
          </section>
          <section>
            <h3>相关法规依据</h3>
            <div class="law-card">
              <strong>GDPR Art.44-49</strong>
              <span>数据跨境传输</span>
            </div>
            <p>第 44 条至 49 条规定了向第三国或国际组织传输个人数据的条件，包括充分性决定、适当保障措施、标准合同条款等。</p>
          </section>
          <section>
            <h3>在您材料中的相关片段</h3>
            <div class="material-card">
              字段：用户位置数据（GPS）<br />
              存储位置：境外服务器（新加坡）<br />
              目的：提供车辆远程控制服务
            </div>
          </section>
          <section>
            <h3>建议</h3>
            <p>评估并采用适当的跨境传输合规机制，如标准合同条款（SCCs）等。</p>
          </section>
        </aside>
      </section>
    </section>
  `;
}

function navigate(view) {
  if (view === "upload") renderUpload();
  else if (view === "report") renderReport();
  else renderHome();
  renderIcons();
}

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-view]");
  if (trigger) {
    event.preventDefault();
    navigate(trigger.dataset.view);
    return;
  }

  const capability = event.target.closest(".capability");
  if (capability) {
    document.querySelectorAll(".capability").forEach((item) => item.classList.remove("is-selected"));
    capability.classList.add("is-selected");
    const input = document.getElementById("taskInput");
    if (input && capability.dataset.task) input.value = capability.dataset.task;
    return;
  }

  const quickPrompt = event.target.closest(".quick-prompts button");
  if (quickPrompt) {
    document.querySelectorAll(".quick-prompts button").forEach((item) => item.classList.remove("is-selected"));
    quickPrompt.classList.add("is-selected");
    const text = document.querySelector(".textarea-like span");
    if (text) text.textContent = quickPrompt.textContent.trim();
    return;
  }

  const template = event.target.closest(".template-item");
  if (template) {
    document.querySelectorAll(".template-item").forEach((item) => item.classList.remove("is-selected"));
    template.classList.add("is-selected");
    return;
  }

  const radio = event.target.closest(".radio-line span");
  if (radio) {
    radio.parentElement.querySelectorAll("span").forEach((item) => item.classList.remove("checked"));
    radio.classList.add("checked");
    return;
  }

  const tableRow = event.target.closest(".gap-table > div:not(.thead), .file-row, .selectable-row");
  if (tableRow) {
    tableRow.parentElement.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
    tableRow.classList.add("is-selected");
    return;
  }

  const tab = event.target.closest(".tabs button");
  if (tab) {
    tab.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "taskForm") return;
  event.preventDefault();
  navigate("upload");
});

navigate("home");
