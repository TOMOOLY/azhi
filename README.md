# 造物社

餐饮与消费品牌的视觉全案站。静态 HTML / CSS，少量原生 JS 做案例轮播。相对路径，GitHub Pages 发布在 `/azhi/`。

合作站以工作室能力与案例呈现，不把个人名字当作主标识。求职页仍单独放在 `job.html`，页内使用「阿志」；合作站页眉、首页主视觉不再导流到求职版，页脚只留极小字链。

| 入口 | 说明 |
|------|------|
| `index.html` | 营销首页：案例轮播、定位句、三列作品、业务、合作、咨询 |
| `service.html` | 业务：品牌全案 / 字体 / 平面包装 / IP 插画 |
| `works/*.html` | 案例页。四个已完成项目为深色开场 + 通栏画面 |
| `job.html` | 求职页（保留，不在合作站主路径上） |

## 线上地址

GitHub Pages（仓库 `TOMOOLY/azhi`，分支 `main`，目录 `/`）：

- 首页：<https://TOMOOLY.github.io/azhi/>
- 业务：<https://TOMOOLY.github.io/azhi/service.html>
- 求职页：<https://TOMOOLY.github.io/azhi/job.html>

仓库根目录有 `.nojekyll`，避免 Jekyll 忽略 `works/_template.html`。

## 本地预览

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8765/>。

## 文件

| 路径 | 作用 |
|------|------|
| `index.html` | 营销首页 |
| `service.html` | 业务页 |
| `studio.css` / `studio.js` | 合作站样式与轮播、菜单 |
| `styles.css` | 求职页仍使用的样式 |
| `job.html` | 求职页 |
| `assets/` | 项目图片 |
| `works/projects.json` | 作品注册表 |
| `works/_template.html` | 新项目页模板 |
| `works/*.html` | 各项目页 |

## 如何新增一个完整项目

1. 在 `works/projects.json` 登记，或把 `upcoming` 项 `status` 改为 `"ready"`。
2. `cp works/_template.html works/<slug>.html`，填写标题、问题句、说明与画面。
3. 图片放 `assets/`。项目页用 `../assets/…`，首页用 `assets/…`。
4. 在 `index.html` 的轮播和 `.work-grid` 加上入口；若从占位升级，把它移出 MORE 列表。
5. 去掉「画面待上传」占位。

现成占位：`hera`、`liufang`、`meiweimeiguo`、`font-design`、`layout-design`、`illustration`。

精选案例：椰知卿、龍面馆、伽乐酸奶、龍尊轩。合作联系：shiqiangqiang96@163.com / 17621419257。

## 许可

内容版权归站点所有者所有。
