# 阿志 · 品牌视觉架构师

石强强（阿志）个人站点：**作品展示 + 品牌合作 / 私活咨询**。纯 HTML + CSS，无构建步骤。

## 线上地址

GitHub Pages（仓库 `TOMOOLY/azhi`，分支 `main`，目录 `/`）：

<https://TOMOOLY.github.io/azhi/>

站内链接全部使用相对路径（`styles.css`、`works/…`、`assets/…`、`../index.html`），以便挂在 `/azhi/` 子路径下。仓库根目录有 `.nojekyll`，避免 Jekyll 忽略 `works/_template.html`。

## 本地预览

在仓库根目录：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

浏览器打开：<http://127.0.0.1:8765/>

## 文件结构

| 路径 | 作用 |
|------|------|
| `index.html` | 首页（精选作品卡片 + 待上传槽位 + 关于 / 经历 / 联系） |
| `styles.css` | 共享设计系统（首页与项目页共用） |
| `assets/` | 项目图片（JPG） |
| `works/projects.json` | **作品注册表**（featured / upcoming，加项目先改这里） |
| `works/_template.html` | **新项目页模板**（复制改名即可） |
| `works/*.html` | 各项目独立页（含「待上传」占位页） |
| `README.md` | 本说明 |

## 如何新增一个完整项目

1. **注册**  
   在 `works/projects.json` 增加一条（或把 `upcoming` 里对应项的 `status` 改为 `"ready"`），填写 `slug`、`title`、`year`、`cover`、`images`、`tags` 等。

2. **建页**  
   ```bash
   cp works/_template.html works/<slug>.html
   ```
   编辑标题、年份、角色、简介、关键词；把 gallery 里的空槽换成真实 `<figure><img …>`。

3. **放图**  
   图片放入 `assets/`（建议命名清晰，如 `hera-01.jpg`），路径在项目页里写 `../assets/…`，首页封面写 `assets/…`。

4. **挂到首页**  
   - 精选：在 `index.html` 的 `.work-grid` 里加一张 `.work-card`（可复制现有四张之一）。  
   - 或从「更多项目 · 待上传」的 `.upcoming-card` 升级为精选卡片，并删掉对应 upcoming 项。

5. **清占位**  
   删除项目页上的 `stub-banner`、多余的 `.gallery-slot-empty`，按需填写「更多说明 / 交付物清单」。

现成占位页（已标「待上传」）：`hera`、`liufang`、`meiweimeiguo`、`font-design`、`layout-design`、`illustration`。上传完整作品时直接改对应 HTML 即可，不必从零建文件。

## 设计 tokens（摘要）

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#ffffff` | 主背景 |
| `--bg-warm` | `#f7f5f2` | 暖灰区块 |
| `--fg` | `#0a0a0a` | 正文 / 强对比 |
| `--muted` / `--muted-2` | `#5a5a5a` / `#8a8a8a` | 次级文字 |
| `--accent-soft` | `#c4a090` | PDF 粉米色点缀 |
| `--accent-soft-deep` | `#9a7468` | 点缀悬停 |
| `--font-display` | Songti SC / Noto Serif SC / Georgia… | 大标题 |
| `--font-sans` | system-ui + PingFang / YaHei… | 正文 |
| `--font-mono` | ui-monospace… | 元信息、母题 |
| 母题 | `+ − × ÷ = ∞` | 页眉点缀、分隔线 |

视觉取向：白底高对比、杂志感全出血作品卡、悬停揭示文案、偶发深色合作条；非暗色主题站。

## 内容来源

文案与经历取自设计作品集 PDF。精选：椰知卿、龍面馆、伽乐酸奶、龍尊轩。联系：shiqiangqiang96@163.com / 176 2141 9257。

## 许可

内容版权归站点所有者「阿志 / 石强强」所有。
