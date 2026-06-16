# 全球数据法规字典 UI 壳

这是一个无后端依赖的静态前端框架壳，可直接打开 `index.html` 预览。

## 结构

- `index.html`：页面结构与挂载点
- `styles.css`：视觉样式与响应式布局
- `app.js`：导航、筛选、区域侧栏、结果列表的配置和渲染逻辑
- `assets/hero-globe.png`：原创数字地球首屏背景图

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
