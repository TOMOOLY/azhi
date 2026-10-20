# 阿志 · 品牌视觉架构师

石强强（阿志）个人静态站：同一 GitHub Pages 仓库，**两张面孔**共享设计系统与作品页。

| 入口 | 面向 | 说明 |
|------|------|------|
| `index.html` | **合作 / 私活**（主页） | 品牌合作咨询、案例、软简介；完整经历链到求职版 |
| `job.html` | **求职** | 能力 / 工具 / 教育、完整经历、作品佐证；联系面向 HR |

页脚可切换「合作版」/「求职版」。纯 HTML + CSS，无构建步骤。相对路径部署于 `/azhi/`。

## 线上地址

GitHub Pages（仓库 `TOMOOLY/azhi`，分支 `main`，目录 `/`）：

- 合作版：<https://TOMOOLY.github.io/azhi/>
- 求职版：<https://TOMOOLY.github.io/azhi/job.html>

站内链接使用相对路径（`styles.css`、`job.html`、`works/…`、`assets/…`、`../index.html`、`../job.html`）。仓库根目录有 `.nojekyll`，避免 Jekyll 忽略 `works/_template.html`。

## 本地预览

在仓库根目录：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

- 合作版：<http://127.0.0.1:8765/>
- 求职版：<http://127.0.0.1:8765/job.html>

## 文件结构

| 路径 | 作用 |
|------|------|
| `index.html` | 合作 / 私活主页 |
| `job.html` | 求职向主页 |
| `styles.css` | 共享设计系统（含 `.face-coop` / `.face-job`、`.face-switch`） |
| `assets/` | 项目图片（JPG） |
| `works/projects.json` | 作品注册表（featured / upcoming） |
| `works/_template.html` | 新项目页模板 |
| `works/*.html` | 各项目独立页（共享，两面孔均可进入） |
| `README.md` | 本说明 |

## 如何新增一个完整项目

1. **注册** — 在 `works/projects.json` 增加或把 `upcoming` 项 `status` 改为 `"ready"`。
2. **建页** — `cp works/_template.html works/<slug>.html`，填标题 / 画面。
3. **放图** — `assets/`，项目页用 `../assets/…`，首页封面用 `assets/…`。
4. **挂卡** — 在 `index.html` 与 `job.html` 的 `.work-grid`（及 upcoming）同步加卡，或从 upcoming 升级。
5. **清占位** — 去掉 `stub-banner` / `.gallery-slot-empty`。

现成占位：`hera`、`liufang`、`meiweimeiguo`、`font-design`、`layout-design`、`illustration`。

## 设计 tokens（摘要）

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#ffffff` | 主背景 |
| `--bg-warm` | `#f7f5f2` | 暖灰区块 |
| `--fg` | `#0a0a0a` | 正文 |
| `--accent-soft` | `#c4a090` | 粉米色点缀 |
| `--font-display` | Songti SC / Noto Serif SC… | 大标题 |
| 母题 | `+ − × ÷ = ∞` | 页眉 / 页脚 |

视觉：白底高对比、杂志感作品卡、深色合作条（合作版）；非暗色主题站。

## 内容来源

文案与经历取自设计作品集 PDF。精选：椰知卿、龍面馆、伽乐酸奶、龍尊轩。联系：shiqiangqiang96@163.com / 176 2141 9257。

## 许可

内容版权归站点所有者「阿志 / 石强强」所有。
