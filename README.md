# 造物设 · zaowu design

餐饮与消费品牌的视觉全案站。静态 HTML / CSS，少量原生 JS。相对路径，GitHub Pages 发布在 `/azhi/`。

信息架构对齐 [Zara Okafor](https://zaraokafor.framer.website/)：Home、Works、About（`/zara/`）、Journal、Contact。界面正文为中文；首页顶栏与大标题锁排按参考稿：`ZAOWU` / `造物设`。合作站主标识为「造物设」，英文标识 zaowu design。求职页 `job.html` 保留，不进主导航。

| 入口 | 说明 |
|------|------|
| `index.html` | 首页：深色全屏英雄、精选作品、关于摘要、六项能力、客户、约稿 |
| `works/` | 作品索引，链到案例页 |
| `zara/` | 关于（`about.html` 与 `zara.html` 会跳到这里） |
| `journal.html` | 手记 |
| `contact.html` | 联系：表单 mailto、FAQ、黑场到光粒页脚 |
| `works/*.html` | 案例详情 |
| `job.html` | 求职页（不进主导航） |

## 线上地址

GitHub Pages（仓库 `TOMOOLY/azhi`，分支 `main`，目录 `/`）：

- 首页：<https://tomooly.github.io/azhi/>
- 作品：<https://tomooly.github.io/azhi/works/>
- 关于：<https://tomooly.github.io/azhi/zara/>
- 手记：<https://tomooly.github.io/azhi/journal.html>
- 联系：<https://tomooly.github.io/azhi/contact.html>

仓库根目录有 `.nojekyll`，避免 Jekyll 忽略 `works/_template.html`。

## 本地预览

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8765/>。

## 样式与脚本

| 路径 | 作用 |
|------|------|
| `editorial.css` | 全站编辑式样式。墨色 `#261d1d`，纸色 `#fafafa`。展示拉丁用 Darker Grotesque，正文用 Satoshi，中文大标题用 Noto Sans SC |
| `editorial.js` | 上海时间、导航、滚动显现、联系表单 mailto、作品索引悬停 |
| `styles.css` | 求职页 |
| `studio.css` / `studio.js` | 旧业务页 `service.html`（不进主导航） |

## 主案例

稻成酸菜魚、牛小丫、百老汇小镇、空杯计划、灵感杯子、留芳茶社、龍麵館、龍尊軒。预览图在 `assets/works/<slug>/`。注册表：`works/projects.json`。

联系：shiqiangqiang96@163.com / 17621419257。表单在浏览器里打开邮件草稿，没有服务端。

## 如何新增项目

1. 在 `works/projects.json` 登记。
2. `cp works/_template.html works/<slug>.html`，填写内容。
3. 图片放 `assets/works/<slug>/`。
4. 在 `index.html` 精选列表与 `works/index.html` 各加一条入口。

## 许可

内容版权归站点所有者所有。
