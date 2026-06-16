# 全球数据法规字典 UI 壳

这是一个无后端依赖的静态前端框架壳，可直接打开 `index.html` 预览。

## 结构

- `index.html`：页面结构与挂载点
- `styles.css`：视觉样式与响应式布局
- `app.js`：导航、筛选、区域侧栏、结果列表的配置和渲染逻辑
- `assets/hero-globe.png`：原创数字地球首屏背景图
- `workspace-tabs/`：各顶部标签对应的独立业务页面目录
- `top-tabs/`：顶部标签加载器与自动生成的标签清单
- `scripts/build-top-tabs.mjs`：扫描 `workspace-tabs/*/tab.manifest.json` 并生成标签清单

## 多人协作新增顶部标签

业务同事新增页面时，优先只改自己的目录：

```text
workspace-tabs/<your-tab>/
  tab.manifest.json
  index.html
  styles.css
  ...
```

然后运行：

```bash
npm run sync-tabs
```

脚本会自动更新 `top-tabs/tabs.generated.js`，首页会把该目录挂成新的顶部标签。一般不要直接修改 `index.html`、`top-tabs/top-tabs.js` 或全局 `styles.css`。

如果多人同时新增了不同目录，先 `git pull --rebase origin main`，再运行一次 `npm run sync-tabs`，最后提交自己的目录和生成后的 `top-tabs/tabs.generated.js`。

## 填充接口

后续接入真实数据时，可以替换 `app.js` 顶部的 `seedData`，或在页面加载后调用：

```js
window.RegulationShell.setResults(results);
window.RegulationShell.setConfig(partialConfig);
```

`results` 条目建议保留这些字段：

```js
{
  id: "unique-id",
  title: "Title",
  summary: "摘要",
  region: "europe",
  regionLabel: "欧洲",
  type: "guide",
  typeLabel: "监管指南",
  topic: "ai",
  topicLabel: "人工智能与新技术治理",
  status: "现行有效",
  date: "2026-05-18"
}
```
