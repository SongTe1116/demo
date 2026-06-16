# 顶部标签业务目录

每个顶部标签对应 `workspace-tabs/<tab-folder>/` 下的一个独立页面目录。新增业务页时，只改自己的目录，再运行一次清单生成脚本。

## 新增标签

1. 新建 `workspace-tabs/<your-tab>/`。
2. 在目录中添加 `tab.manifest.json`。
3. 在同一目录维护自己的 `index.html`、CSS、JS 和资源文件。
4. 运行：

```bash
npm run sync-tabs
```

`index.html`、`top-tabs/top-tabs.js` 和 `styles.css` 是公共壳，业务同事通常不需要改。

## tab.manifest.json

```json
{
  "id": "unique-tab-id",
  "label": "顶部标签名",
  "title": "页面标题",
  "order": 100,
  "url": "index.html"
}
```

- `id` 只能使用小写字母、数字和连字符。
- `url` 相对于当前业务目录。
- `order` 越小越靠前。
