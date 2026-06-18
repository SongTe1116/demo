const app = document.getElementById("agentApp");
let selectedAssistant = "compliance";

const scenarioCases = {
  "scenario-gap": {
    icon: "file-check-2",
    title: "GDPR 数据处理活动合规差距评估",
    type: "合规差距评估",
    region: "欧盟",
    time: "2026-06-17 15:30",
    prompt: "我们计划进入欧盟市场，请评估我们的数据处理活动与 GDPR 的差距。",
    flow: ["识别任务意图", "检查输入完整性", "检索法规条款", "对比用户现状", "输出差距报告"],
    inputs: [
      ["数据处理活动", "车联网 App 账号注册、远程控车、驾驶行为分析", "已补充"],
      ["处理目的", "账号管理、车辆安全、驾驶习惯报告、售后服务", "已补充"],
      ["数据类型", "姓名、手机号、车辆 VIN、GPS 位置、驾驶行为、车内人脸图像", "已补充"],
      ["处理主体", "中国总部、德国销售公司、云服务供应商", "已补充"],
      ["跨境传输情况", "欧盟用户数据同步至新加坡云节点，用于统一分析", "待确认"],
      ["保存期限", "账号信息 3 年；位置轨迹 18 个月；人脸图像 90 天", "已补充"]
    ],
    metrics: [
      ["意图识别", "差距评估"],
      ["完整性", "5/6"],
      ["差距项", "8 项"],
      ["最高风险", "高"]
    ],
    summary: "系统识别该任务为 GDPR 合规差距评估。当前输入已能支持初步分析，但跨境传输机制仍需用户确认。模拟报告显示 8 项差距，其中高风险 3 项，集中在跨境传输、敏感数据合法性基础和数据主体权利响应。",
    columns: ["差距项", "风险", "法规依据", "建议动作"],
    badgeColumn: 1,
    rows: [
      ["欧盟用户数据传输至新加坡云节点，但未说明 SCCs、充分性决定或其他传输机制。", "高", "GDPR Art.44-49", "补充跨境传输影响评估，签署 SCCs 并留存接收方安全措施。"],
      ["车内人脸图像属于特殊类别数据，材料未说明 Art.9 例外依据。", "高", "GDPR Art.9", "明确是否取得明示同意，或移除不必要的人脸处理场景。"],
      ["驾驶行为分析用于画像报告，隐私告知未覆盖画像逻辑和反对权。", "中", "GDPR Art.13-15, Art.21", "更新隐私政策，增加画像说明和用户反对处理入口。"],
      ["位置轨迹保存 18 个月，未说明必要性和删除规则。", "中", "GDPR Art.5(1)(e)", "建立保存期限论证和自动删除策略。"]
    ]
  },
  "scenario-quality": {
    icon: "fingerprint",
    title: "用户信息收集清单敏感信息识别",
    type: "数据质检 / 敏感信息识别",
    region: "中国 / 欧盟",
    time: "2026-06-17 10:18",
    prompt: "请解析《用户信息收集清单.xlsx》，识别哪些字段属于敏感个人信息、一般个人信息或非个人信息。",
    flow: ["读取 Excel 表头", "解析字段名与说明", "匹配法规知识库", "分类标注字段", "输出质检表"],
    inputs: [
      ["上传文件", "用户信息收集清单.xlsx", "已解析"],
      ["表头字段", "字段名、字段说明、采集场景、是否必填、保存期限", "已识别"],
      ["适用法规", "中国个人信息保护法、GDPR", "已选择"],
      ["业务场景", "车主 App 注册、车辆绑定、驾驶行为分析、售后服务", "已识别"],
      ["字段总数", "18 个字段", "已统计"],
      ["待复核项", "车内摄像头截图用途说明不足", "待确认"]
    ],
    metrics: [
      ["字段总数", "18"],
      ["敏感个人信息", "5"],
      ["一般个人信息", "10"],
      ["非个人信息", "3"]
    ],
    summary: "系统根据字段名、字段说明和采集场景进行分类。模拟结果识别出 5 个敏感个人信息字段，主要涉及精确位置、生物识别、身份证件和车辆行踪；3 个字段为非个人信息，可作为设备或系统运行信息处理。",
    columns: ["字段名称", "分类", "判断依据", "对应法规条款"],
    badgeColumn: 1,
    rows: [
      ["手机号", "一般个人信息", "可直接联系并识别自然人，但不属于高敏感类别。", "PIPL 第4条；GDPR Art.4(1)"],
      ["实时 GPS 坐标", "敏感个人信息", "可反映个人行踪轨迹，泄露后可能危害人身财产安全。", "PIPL 第28条；GDPR Recital 30"],
      ["车内人脸截图", "敏感个人信息", "涉及生物识别特征和车内影像，需单独授权和必要性说明。", "PIPL 第28条；GDPR Art.9"],
      ["VIN 车辆识别码", "一般个人信息", "与车主账号绑定后可间接识别个人。", "PIPL 第4条；GDPR Art.4(1)"],
      ["电池温度", "非个人信息", "单独字段反映车辆部件状态，不指向自然人。", "不适用个人信息条款"]
    ]
  },
  "scenario-change": {
    icon: "git-compare-arrows",
    title: "德国自动驾驶法变更影响评估",
    type: "法规变更影响评估",
    region: "德国",
    time: "2026-06-16 16:45",
    prompt: "德国自动驾驶法最近修订了，请分析对我们已发布的合规手册有哪些影响。",
    flow: ["识别目标法规", "检索新旧版本变化", "解析用户手册", "逐条比对", "输出需更新项"],
    inputs: [
      ["目标法规名称", "德国自动驾驶法 / 道路交通法自动驾驶相关条款", "已补充"],
      ["用户文档", "自动驾驶功能合规手册 v2.1.docx", "已解析"],
      ["产品范围", "L3/L4 自动驾驶测试车队和远程监控平台", "已补充"],
      ["比对版本", "现行法规变化点 vs 手册 v2.1", "已确认"],
      ["关注章节", "运行设计域、技术监督、事故接管、数据记录", "已识别"],
      ["缺失信息", "内部责任人和更新时间未在手册中标注", "待补充"]
    ],
    metrics: [
      ["变化点", "6"],
      ["手册命中", "11 处"],
      ["需更新", "5 项"],
      ["优先级最高", "P0"]
    ],
    summary: "系统先限制输入为目标法规名称和合规手册文档，再模拟检索法规变化点并对照手册内容。结果显示手册 v2.1 有 5 项需更新，重点是技术监督人职责、事件记录字段、远程接管流程和测试区域限制。",
    columns: ["变化点", "手册现状", "影响等级", "需更新内容"],
    badgeColumn: 2,
    rows: [
      ["技术监督人职责要求细化", "手册仅写明需设置安全员，未定义持续监控和干预责任。", "高", "增加技术监督人职责、授权条件、值守记录和升级机制。"],
      ["自动驾驶事件记录字段扩展", "当前事件日志未覆盖远程指令、接管原因和系统最小风险状态。", "高", "更新数据记录模板，补充事件触发、接管链路和保存期限。"],
      ["运行设计域变更需重新评估", "手册对 ODD 变更仅要求产品评审，缺少法规复核。", "中", "加入 ODD 变更合规复核节点和审批留痕。"],
      ["远程监控平台安全要求增强", "网络安全章节引用较旧，未覆盖远程操作权限分级。", "中", "补充远程访问控制、操作审计和异常阻断流程。"]
    ]
  },
  "scenario-roadmap": {
    icon: "map",
    title: "东南亚三国网约车数据合规路线图",
    type: "跨法域合规路径规划",
    region: "新加坡 / 泰国 / 印尼",
    time: "2026-06-15 11:20",
    prompt: "我们计划在东南亚三国开展网约车业务，请生成数据合规路线图。",
    flow: ["限定国家与业务", "确认数据类型", "匹配法域要求", "拆分阶段任务", "输出路线图"],
    inputs: [
      ["目标国家", "新加坡、泰国、印尼", "已补充"],
      ["业务类型", "网约车平台，含司机入驻、乘客叫车、行程结算、客服投诉", "已补充"],
      ["数据类型", "身份信息、位置轨迹、支付记录、驾驶证件、客服录音", "已补充"],
      ["目标场景", "本地上线、跨境数据分析、第三方支付和客服外包", "已补充"],
      ["数据主体", "乘客、司机、紧急联系人、企业客户联系人", "已识别"],
      ["宽泛风险", "未限定城市、供应商和数据落地架构", "需二次细化"]
    ],
    metrics: [
      ["国家", "3"],
      ["阶段", "4"],
      ["任务", "16"],
      ["首要动作", "数据地图"]
    ],
    summary: "该任务范围较宽，Demo 先要求用户明确国家、业务类型、数据类型和目标场景，再输出分阶段清单。模拟路线图按照上线前、试运营、规模化运营和持续治理四个阶段拆解，避免生成空泛报告。",
    columns: ["阶段", "重点任务", "适用法域", "交付物"],
    badgeColumn: -1,
    rows: [
      ["阶段 1：上线前 0-2 个月", "建立数据地图，区分乘客、司机、车辆、支付和客服数据流。", "三国通用", "数据处理活动清单、字段分级表、供应商清单"],
      ["阶段 2：上线前 2-4 个月", "完成隐私告知、同意管理、司机证件处理规则和跨境传输评估。", "新加坡 PDPA、泰国 PDPA、印尼 PDP Law", "隐私政策、本地同意文案、跨境传输记录"],
      ["阶段 3：试运营", "验证数据主体请求、删除/更正流程、客服录音访问权限和安全事件响应。", "三国通用", "DSR 工单流程、权限矩阵、事件响应预案"],
      ["阶段 4：规模化运营", "建立季度审计、供应商复核、模型画像评估和监管问询响应机制。", "三国通用", "季度合规报告、供应商评估表、监管响应包"]
    ]
  }
};

function renderHome() {
  app.className = "agent-app home-page";
  app.innerHTML = `
    <section class="home-hero">
      <div class="world-bg" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="eyebrow">AGENT INTELLIGENCE</p>
        <h1>合规智能体</h1>
        <p class="hero-copy">输入问题和材料后由系统识别任务意图，再进入文档阅读或合规分析流程</p>

        <form class="task-bar" id="taskForm">
          <label class="sr-only" for="taskInput">任务描述</label>
          <input id="taskInput" value="请基于上传的用户信息收集清单和数据处理活动说明，评估车联网业务与 GDPR 的合规差距" />
          <button class="ghost-btn" type="button"><i data-lucide="paperclip"></i>添加文件</button>
          <button type="submit"><i data-lucide="play"></i>开始识别</button>
        </form>
        <div class="attached-files">
          <span><i data-lucide="sheet"></i>用户信息收集清单.xlsx</span>
          <span><i data-lucide="file-type-2"></i>数据处理活动说明.docx</span>
          <span><i data-lucide="file-text"></i>车联网业务流程图.pdf</span>
        </div>

        <div class="capability-grid assistant-mode-grid">
          <button class="capability is-selected" type="button" data-mode="compliance" data-task="请基于上传的用户信息收集清单和数据处理活动说明，评估车联网业务与 GDPR 的合规差距">
            <span class="icon-tile"><i data-lucide="bot"></i></span>
            <span>
              <strong>合规 Agent</strong>
              <small>输入提示词并上传业务材料，系统自动识别差距评估、敏感数据识别、法规变更影响等具体任务</small>
            </span>
          </button>
          <button class="capability" type="button" data-mode="reader" data-task="请对当前 GDPR 文档进行 AI 易读总结，并支持划词翻译">
            <span class="icon-tile"><i data-lucide="file-text"></i></span>
            <span>
              <strong>文档阅读助手</strong>
              <small>用于法规 PDF 的 AI 易读、一键总结和划词翻译</small>
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
          <div class="selectable-row is-selected" data-view="scenario-gap"><span><i data-lucide="file-check-2"></i>GDPR 数据处理活动差距评估</span><span>合规差距评估</span><span>欧盟</span><b class="done">已完成</b><span>2026-06-17 15:30</span></div>
          <div class="selectable-row" data-view="scenario-quality"><span><i data-lucide="fingerprint"></i>用户信息收集清单敏感识别</span><span>数据质检 / 敏感识别</span><span>中国 / 欧盟</span><b class="done">已完成</b><span>2026-06-17 10:18</span></div>
          <div class="selectable-row" data-view="scenario-change"><span><i data-lucide="git-compare-arrows"></i>德国自动驾驶法影响评估</span><span>法规变更影响</span><span>德国</span><b class="done">已完成</b><span>2026-06-16 16:45</span></div>
          <div class="selectable-row" data-view="scenario-roadmap"><span><i data-lucide="map"></i>东南亚网约车合规路线图</span><span>跨法域路径规划</span><span>东南亚</span><b class="done">已完成</b><span>2026-06-15 11:20</span></div>
        </div>
      </article>

      <article class="panel template-panel">
        <div class="panel-head">
          <strong><i data-lucide="radar"></i>意图识别方式</strong>
          <button type="button">查看规则</button>
        </div>
        <div class="intent-flow">
          <div><i data-lucide="message-square-text"></i><strong>读取提示词</strong><span>抽取目标法规、业务场景、期望输出</span></div>
          <div><i data-lucide="files"></i><strong>解析上传文件</strong><span>识别字段清单、处理活动、合同或法规 PDF</span></div>
          <div><i data-lucide="git-branch"></i><strong>路由到任务</strong><span>自动进入合规分析或文档阅读，不让用户选择细分意图</span></div>
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
          <span>意图已识别</span>
        </div>
        <div class="prompt-card">
          <strong>用户输入内容</strong>
          <div class="prompt-review">
            <p>请基于上传的用户信息收集清单和数据处理活动说明，评估车联网业务与 GDPR 的合规差距，重点关注跨境传输、敏感个人信息和用户权利响应。</p>
            <button type="button"><i data-lucide="pencil"></i>修改提示词</button>
          </div>
          <div class="intent-result">
            <div class="intent-score">
              <span>识别结果</span>
              <strong>合规 Agent / 合规差距评估</strong>
              <b>置信度 92%</b>
            </div>
            <div class="intent-tags">
              <span><i data-lucide="scale"></i>任务类型：差距评估</span>
              <span><i data-lucide="globe-2"></i>目标法规：GDPR</span>
              <span><i data-lucide="car"></i>业务场景：车联网数据处理</span>
              <span><i data-lucide="shield-alert"></i>重点风险：跨境传输、敏感个人信息、权利响应</span>
            </div>
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
          <div class="panel-head"><strong>基于识别意图的信息完整性检测</strong><span></span></div>
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

function renderScenario(view) {
  const item = scenarioCases[view] || scenarioCases["scenario-gap"];
  app.className = "agent-app light-page";
  app.innerHTML = `
    <section class="report-page scenario-page">
      <div class="report-actions">
        <button type="button" data-view="home"><i data-lucide="arrow-left"></i>返回首页</button>
        <div>
          <button type="button"><i data-lucide="download"></i>导出结果</button>
          <button class="primary" type="button"><i data-lucide="message-circle-question"></i>继续追问</button>
        </div>
      </div>

      <header class="report-title scenario-title">
        <span><i data-lucide="${item.icon}"></i>${item.type}</span>
        <h1>${item.title}</h1>
        <p>国家/地区：${item.region}　|　任务状态：已完成　|　更新时间：${item.time}</p>
      </header>

      <section class="scenario-flow panel">
        ${item.flow.map((step, index) => `<div><b>${index + 1}</b><span>${step}</span></div>`).join("")}
      </section>

      <section class="scenario-metrics">
        ${item.metrics.map((metric) => `<article><span>${metric[0]}</span><strong>${metric[1]}</strong></article>`).join("")}
      </section>

      <section class="scenario-grid">
        <article class="panel scenario-input">
          <div class="panel-head"><strong><i data-lucide="clipboard-check"></i>需求数据 / 输入检测</strong><button type="button">模拟数据</button></div>
          <div class="prompt-review scenario-prompt">
            <p>${item.prompt}</p>
          </div>
          <div class="input-check-table">
            <div class="thead"><span>检查项</span><span>用户提供内容</span><span>状态</span></div>
            ${item.inputs.map((row) => `<div><strong>${row[0]}</strong><p>${row[1]}</p><b class="${row[2].includes("待") || row[2].includes("需") ? "warn" : ""}">${row[2]}</b></div>`).join("")}
          </div>
        </article>

        <article class="panel scenario-output">
          <div class="panel-head"><strong><i data-lucide="file-spreadsheet"></i>最终结果</strong><button type="button">查看依据</button></div>
          <div class="summary-box">
            <strong>模拟结论</strong>
            <p>${item.summary}</p>
          </div>
          <div class="scenario-result-table">
            <div class="thead">${item.columns.map((column) => `<span>${column}</span>`).join("")}</div>
            ${item.rows.map((row) => `<div>${row.map((cell, index) => index === item.badgeColumn ? `<b class="${cell === "高" || cell.includes("敏感") ? "high" : cell === "中" ? "mid" : ""}">${cell}</b>` : `<p>${cell}</p>`).join("")}</div>`).join("")}
          </div>
        </article>
      </section>
    </section>
  `;
}

function renderDocSummary() {
  app.className = "agent-app light-page";
  app.innerHTML = `
    <section class="work-page doc-page">
      <div class="page-title">
        <div>
          <h1>AI 易读（一键总结）</h1>
          <p>对当前法规文档进行全文理解，生成固定报告结构的法规摘要。</p>
        </div>
        <div class="page-actions">
          <button class="link-btn" type="button" data-view="home"><i data-lucide="arrow-left"></i>返回首页</button>
          <button class="primary compact" type="button" data-view="doc-translate"><i data-lucide="languages"></i>切换翻译</button>
        </div>
      </div>

      <section class="doc-layout">
        <aside class="panel doc-files">
          <div class="panel-head"><strong><i data-lucide="folder-open"></i>当前文档</strong><button type="button"><i data-lucide="upload"></i>上传</button></div>
          <div class="file-row is-selected"><span class="file-icon pdf"><i data-lucide="file-text"></i></span><strong>Regulation (EU) 2016/679 GDPR.pdf</strong><span>88 页</span><b>已总结</b></div>
          <div class="file-row"><span class="file-icon pdf"><i data-lucide="file-text"></i></span><strong>EDPB 第49条例外指南.pdf</strong><span>18 页</span><b>待处理</b></div>
          <div class="doc-meta">
            <span>法规编号 <strong>2016/679</strong></span>
            <span>生效日期 <strong>2018-05-25</strong></span>
            <span>状态 <strong>现行有效</strong></span>
          </div>
        </aside>

        <article class="panel readable-report">
          <div class="report-doc-head">
            <span>AI 易读报告</span>
            <h2>《欧盟通用数据保护条例》（GDPR）全文理解摘要</h2>
            <p>样例来自 database/regulation-index.js 中 Regulation (EU) 2016/679 正式法规条目。</p>
          </div>

          <section class="readable-section">
            <h3>一、文档基本信息</h3>
            <dl class="info-list">
              <div><dt>法规名称</dt><dd>Regulation (EU) 2016/679（General Data Protection Regulation, GDPR）</dd></div>
              <div><dt>中文名称</dt><dd>《欧洲议会和理事会第 2016/679 号条例》（通用数据保护条例）</dd></div>
              <div><dt>发布机构</dt><dd>欧洲议会与欧盟理事会</dd></div>
              <div><dt>发布日期</dt><dd>2016-04-27</dd></div>
              <div><dt>生效日期</dt><dd>2018-05-25</dd></div>
              <div><dt>法规状态</dt><dd>现行有效</dd></div>
            </dl>
          </section>

          <section class="readable-section">
            <h3>二、立法背景</h3>
            <p>GDPR 是欧盟统一个人数据保护规则的基础性法规，用于替代早期数据保护指令，解决成员国规则分散、跨境数据流动监管不一致、数字服务和全球化处理活动快速增长等问题。该法规通过统一处理原则、数据主体权利、控制者与处理者义务以及监管处罚机制，建立欧盟范围内可直接适用的数据保护框架。</p>
          </section>

          <section class="readable-section">
            <h3>三、适用范围</h3>
            <ul>
              <li>适用于在欧盟境内处理个人数据的控制者和处理者。</li>
              <li>适用于虽不在欧盟境内，但向欧盟数据主体提供商品或服务，或监测其行为的境外主体。</li>
              <li>保护对象为自然人的个人数据，包括身份信息、位置数据、在线标识符以及可识别个人的其他信息。</li>
              <li>对跨境传输、敏感数据处理、自动化决策、数据保护影响评估等高风险处理场景提出更高要求。</li>
            </ul>
          </section>

          <section class="readable-section">
            <h3>四、核心义务</h3>
            <div class="obligation-grid">
              <article><strong>合法性基础</strong><p>处理个人数据需具备同意、合同履行、法定义务、重大利益、公共任务或合法利益等依据。</p></article>
              <article><strong>透明告知</strong><p>应向数据主体说明处理目的、数据类别、保存期限、接收方、权利渠道和跨境传输情况。</p></article>
              <article><strong>数据主体权利</strong><p>保障访问、更正、删除、限制处理、数据可携、反对处理及自动化决策相关权利。</p></article>
              <article><strong>安全与问责</strong><p>建立技术和组织安全措施，保存处理活动记录，在高风险场景开展 DPIA，并按要求通报数据泄露。</p></article>
              <article><strong>跨境传输</strong><p>向第三国或国际组织传输个人数据时，应使用充分性决定、标准合同条款等合规机制。</p></article>
              <article><strong>处理者管理</strong><p>控制者需通过合同约束处理者，明确处理范围、安全要求、协助义务和分包处理规则。</p></article>
            </div>
          </section>

          <section class="readable-section">
            <h3>五、处罚标准</h3>
            <div class="penalty-table">
              <div class="thead"><span>处罚层级</span><span>适用情形</span><span>最高罚款</span></div>
              <div><span>一般违规</span><p>控制者/处理者义务、认证机构义务、行为准则监督机构义务等违规。</p><b>1000 万欧元或全球年营业额 2%</b></div>
              <div><span>严重违规</span><p>处理基本原则、同意条件、数据主体权利、第三国跨境传输、成员国法定义务等违规。</p><b>2000 万欧元或全球年营业额 4%</b></div>
              <div><span>监管命令违反</span><p>不遵守监管机构命令，或违反处理限制、数据流暂停等监管措施。</p><b>2000 万欧元或全球年营业额 4%</b></div>
            </div>
          </section>

          <section class="readable-section">
            <h3>六、企业合规关注点</h3>
            <div class="takeaway-list">
              <p><b>数据盘点：</b>建立个人数据处理活动清单，明确数据来源、目的、字段、接收方和保存期限。</p>
              <p><b>高风险评估：</b>对敏感数据、位置数据、画像分析、自动化决策和大规模监测场景开展 DPIA。</p>
              <p><b>跨境机制：</b>对欧盟外传输建立 SCCs、充分性判断、传输影响评估和接收方安全措施留痕。</p>
              <p><b>权利响应：</b>建立数据主体请求处理流程，确保访问、删除、更正、反对处理等请求可追踪。</p>
            </div>
          </section>

          <section class="readable-section conclusion">
            <h3>七、一句话结论</h3>
            <p>GDPR 的核心不是单点隐私声明，而是一套覆盖合法性基础、透明告知、权利响应、安全治理、跨境传输和监管问责的全流程个人数据合规体系。</p>
          </section>
        </article>
      </section>
    </section>
  `;
}

function renderDocTranslate() {
  app.className = "agent-app light-page";
  app.innerHTML = `
    <section class="work-page doc-page">
      <div class="page-title">
        <div>
          <h1>文档划词翻译</h1>
          <p>基于当前 GDPR 文档进行段落级双语对照，鼠标移动到任一段落时同步高亮对应译文和术语关系。</p>
        </div>
        <div class="page-actions">
          <button class="link-btn" type="button" data-view="doc-summary"><i data-lucide="file-search"></i>查看摘要</button>
          <button class="link-btn" type="button" data-view="home"><i data-lucide="arrow-left"></i>返回首页</button>
        </div>
      </div>

      <section class="translation-shell panel">
        <div class="translation-toolbar">
          <strong><i data-lucide="languages"></i>Regulation (EU) 2016/679 GDPR.pdf</strong>
          <div>
            <button class="active" type="button">EN → 中文</button>
            <button type="button">显示术语关系</button>
            <button type="button">导出双语</button>
          </div>
        </div>

        <div class="translation-context">
          <article><span>当前章节</span><strong>Article 5 / Article 6 / Article 12 / Article 83</strong></article>
          <article><span>翻译策略</span><strong>法律术语优先一致，保留 GDPR 核心概念</strong></article>
          <article><span>对齐粒度</span><strong>按条款语义段落对齐</strong></article>
        </div>

        <div class="translation-grid">
          <article class="translation-column">
            <h2>原文</h2>
            <p class="trans-segment" data-segment="1"><b>Article 5 - Principles</b> Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject.</p>
            <p class="trans-segment" data-segment="2"><b>Article 5 - Purpose limitation</b> Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes.</p>
            <p class="trans-segment" data-segment="3"><b>Article 5 - Data minimisation</b> Personal data shall be adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed.</p>
            <p class="trans-segment" data-segment="4"><b>Article 6 - Lawfulness</b> Processing shall be lawful only if and to the extent that at least one lawful basis applies, including consent, contract performance, legal obligation, vital interests, public task or legitimate interests.</p>
            <p class="trans-segment" data-segment="5"><b>Article 12 - Transparent information</b> The controller shall take appropriate measures to provide information relating to processing to the data subject in a concise, transparent, intelligible and easily accessible form.</p>
            <p class="trans-segment" data-segment="6"><b>Article 25 - Data protection by design</b> The controller shall implement appropriate technical and organisational measures designed to implement data-protection principles effectively.</p>
            <p class="trans-segment" data-segment="7"><b>Article 35 - DPIA</b> Where processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall carry out an assessment of the impact of the envisaged processing operations.</p>
            <p class="trans-segment" data-segment="8"><b>Article 44 - Transfers</b> Any transfer of personal data to a third country or an international organisation shall take place only if the conditions laid down in Chapter V are complied with.</p>
            <p class="trans-segment" data-segment="9"><b>Article 83 - Administrative fines</b> Administrative fines shall in each individual case be effective, proportionate and dissuasive.</p>
          </article>

          <article class="translation-column translated">
            <h2>译文</h2>
            <p class="trans-segment" data-segment="1"><b>第 5 条 - 处理原则</b> 个人数据应以合法、公平、透明的方式处理，并与数据主体相关。</p>
            <p class="trans-segment" data-segment="2"><b>第 5 条 - 目的限制</b> 个人数据应为具体、明确且合法的目的而收集，不得以与这些目的不相容的方式进一步处理。</p>
            <p class="trans-segment" data-segment="3"><b>第 5 条 - 数据最小化</b> 个人数据应与处理目的相适应、相关，并限于实现该目的所必要的范围。</p>
            <p class="trans-segment" data-segment="4"><b>第 6 条 - 处理合法性</b> 只有在至少具备一项合法性基础时，处理才是合法的，包括同意、合同履行、法定义务、重大利益、公共任务或合法利益。</p>
            <p class="trans-segment" data-segment="5"><b>第 12 条 - 透明信息</b> 控制者应采取适当措施，以简洁、透明、易懂且便于获取的形式向数据主体提供与处理相关的信息。</p>
            <p class="trans-segment" data-segment="6"><b>第 25 条 - 设计阶段的数据保护</b> 控制者应实施适当的技术和组织措施，以有效落实数据保护原则。</p>
            <p class="trans-segment" data-segment="7"><b>第 35 条 - 数据保护影响评估</b> 当处理可能对自然人的权利和自由造成高风险时，控制者应对拟进行的处理操作开展影响评估。</p>
            <p class="trans-segment" data-segment="8"><b>第 44 条 - 跨境传输</b> 向第三国或国际组织传输个人数据，只有在符合第五章规定条件的情况下方可进行。</p>
            <p class="trans-segment" data-segment="9"><b>第 83 条 - 行政罚款</b> 行政罚款在每一个具体案件中均应有效、相称并具有劝阻性。</p>
          </article>
        </div>

        <section class="term-panel">
          <div class="term-head">
            <strong><i data-lucide="network"></i>术语与关系词</strong>
            <span>用于保持全文翻译一致性</span>
          </div>
          <div class="term-grid">
            <article data-segment="1"><b>lawfully / fairly / transparent</b><span>合法 / 公平 / 透明</span><small>三项并列原则，译文保持同一语法层级。</small></article>
            <article data-segment="2"><b>specified, explicit and legitimate purposes</b><span>具体、明确且合法的目的</span><small>purpose limitation 的核心限定条件。</small></article>
            <article data-segment="3"><b>adequate, relevant and limited</b><span>相适应、相关、限于必要范围</span><small>对应数据最小化，不译成泛化的“足够”。</small></article>
            <article data-segment="4"><b>lawful basis</b><span>合法性基础</span><small>连接第 6 条六类处理依据。</small></article>
            <article data-segment="5"><b>controller / data subject</b><span>控制者 / 数据主体</span><small>主体关系：控制者承担告知义务，数据主体接收信息。</small></article>
            <article data-segment="6"><b>technical and organisational measures</b><span>技术和组织措施</span><small>GDPR 固定表达，不拆译为单纯技术措施。</small></article>
            <article data-segment="7"><b>likely to result in a high risk</b><span>可能造成高风险</span><small>触发 DPIA 的条件关系词。</small></article>
            <article data-segment="8"><b>third country / international organisation</b><span>第三国 / 国际组织</span><small>跨境传输对象，关联第五章传输条件。</small></article>
            <article data-segment="9"><b>effective, proportionate and dissuasive</b><span>有效、相称、具劝阻性</span><small>处罚裁量标准，三词并列不可省略。</small></article>
          </div>
        </section>
      </section>
    </section>
  `;
}

function navigate(view) {
  if (view === "upload") renderUpload();
  else if (view === "report") renderReport();
  else if (scenarioCases[view]) renderScenario(view);
  else if (view === "doc-summary") renderDocSummary();
  else if (view === "doc-translate") renderDocTranslate();
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
    if (capability.dataset.mode) selectedAssistant = capability.dataset.mode;
    const input = document.getElementById("taskInput");
    if (input && capability.dataset.task) input.value = capability.dataset.task;
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

document.addEventListener("mouseover", (event) => {
  const segment = event.target.closest(".trans-segment, .term-grid article");
  if (!segment) return;
  document.querySelectorAll(".trans-segment.is-highlighted, .term-grid article.is-highlighted").forEach((item) => item.classList.remove("is-highlighted"));
  document.querySelectorAll(`.trans-segment[data-segment="${segment.dataset.segment}"]`).forEach((item) => item.classList.add("is-highlighted"));
  document.querySelectorAll(`.term-grid article[data-segment="${segment.dataset.segment}"]`).forEach((item) => item.classList.add("is-highlighted"));
});

document.addEventListener("mouseout", (event) => {
  if (!event.target.closest(".trans-segment, .term-grid article")) return;
  document.querySelectorAll(".trans-segment.is-highlighted, .term-grid article.is-highlighted").forEach((item) => item.classList.remove("is-highlighted"));
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "taskForm") return;
  event.preventDefault();
  navigate(selectedAssistant === "reader" ? "doc-summary" : "upload");
});

navigate("home");
