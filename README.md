# Export to HTML

<div align="center">

**将 Obsidian 笔记转换为专业级单文件 HTML 文档**

[![Version](https://img.shields.io/badge/version-1.1.1-blue)](https://github.com/wshRepo/obsidianExportHTML)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Obsidian](https://img.shields.io/badge/obsidian-0.15.0+-purple)](https://obsidian.md)

</div>

## 功能特性

- **双模板** — v1 经典样式 / v2 焕新样式，插件设置中随时切换，默认 v1 保证升级无感知
- **浅色 / 深色主题**（v2）— 默认跟随系统偏好，右上角按钮一键切换并持久记忆；渲染前锁定主题避免白闪
- **移动端友好**（v2）— 窄屏下目录收起为抽屉（左上角按钮呼出），正文满宽，触控目标加大
- **表格友好**（v2）— 正文不限最大宽度，充分利用页面；宽表格每列保底宽度，窄屏整块横向滚动而非挤压
- **可拖拽目录** — 目录宽度自由调节（200–600px），拖拽实时联动正文偏移
- **代码块增强** — 行号显示、一键复制、行号随滚动同步
- **图片 Base64 嵌入** — 单文件即可分享，无需额外资源
- **数学公式渲染** — 支持 LaTeX 语法，基于 KaTeX 快速渲染（内置嵌入，无需网络）
- **双语界面** — 自动适配中英文环境

## v2 模板细节

| 能力 | 说明 |
|------|------|
| 主题两态切换 | 初始跟随系统 `prefers-color-scheme`；点击按钮后固定选择写入 `localStorage`，未手动选择前持续跟随系统变化 |
| 无白闪 | `<head>` 内联脚本在渲染前设定 `data-theme` |
| 满宽正文 | 正文不限最大宽度，仅留呼吸边距，适合 SOP / 技术文档等表格密集场景 |
| 表格横向滚动 | 每个 `<table>` 自动包进滚动容器，每列最小 7em，窄屏左右滑动 |
| 目录抽屉 | ≤820px 时目录从左侧滑出，点遮罩 / 目录项 / Esc 收起 |
| 目录高亮 | 滚动时自动高亮当前所在章节 |

## 使用方法

1. 在 Obsidian 文件浏览器中右键点击 Markdown 文件
2. 选择「导出为 HTML...」
3. 选择保存位置，完成导出（可设置导出后自动打开文件夹）

或使用命令面板 `Ctrl/Cmd + P`，搜索 `Export to HTML`。

**模板版本**在插件设置中选择：设置 → 第三方插件 → My Export To HTML → 「HTML 模板」。

## 在线预览

- [v1 演示 HTML](demo/demo.html)
- [v2 演示 HTML](demo/demo-v2.html)（建议同时用浏览器开发者工具切到手机视口体验抽屉目录）
- [源文件](demo/demo.md)

## 开发指南

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装依赖

```bash
npm install
```

### 构建命令

```bash
npm run build    # 生产构建：生成 KaTeX 常量 + esbuild 打包
npm run dev      # 开发模式：esbuild watch（不自动生成 KaTeX 常量）
npm run lint     # ESLint 检查
```

> 注意：`npm run build` 的第一步 `generate-katex-constants.js` 需要 `node_modules/katex`，失败会直接中断。缺依赖时手动单独执行 esbuild 也能成功（`katex-constants.ts` 已提交入库，仅内嵌旧版 KaTeX，本地缺依赖无影响；升级 katex 后需重新生成）。

### 项目结构

```
obsidianExportHTML/
├── main.ts              # 插件主源码：导出流程、共享逻辑、设置页
├── template-v2.ts       # v2 模板样式与外壳（主题 / 抽屉 / 满宽布局）
├── main.js              # 打包产物（gitignore）
├── manifest.json        # Obsidian 插件清单
├── package.json
├── katex-constants.ts   # 自动生成，勿手动编辑
├── AGENTS.md            # AI 编码协作规则（含分发包同步要求）
├── scripts/
│   └── generate-katex-constants.js
└── my-export-html/      # 可直接安装的分发目录（每次构建后必须同步）
```

### 核心架构

| 组件 | 职责 |
|------|------|
| `ExportHTMLPlugin`（main.ts） | 主类：注册命令、右键菜单、设置面板 |
| `exportToHTML()` | 文件保存流程（Electron dialog + fs） |
| `convertMarkdownToHTML()` | 核心转换：公式占位符还原 → Markdown 渲染 → TOC 生成 → 图片 Base64 → 代码块包装，并按 `templateVersion` 分支选择模板 |
| `buildV2Template()`（template-v2.ts） | v2 模板拼装：双主题 CSS、防闪脚本、抽屉与拖拽交互 |
| `GITHUB_CSS`（main.ts） | v1 内联 CSS 样式（保持兼容，不再演进） |
| `TRANSLATIONS` | 中英双语翻译 |

v2 与 v1 复用同一套共享逻辑（KaTeX 注入、目录生成、图片嵌入、代码块包装），仅外壳差异；v1 路径零改动。

### 技术要点

- 通过 `window.require()` 访问 Electron/Node.js 模块（Obsidian 桌面端标准做法）
- 模板内全部颜色走 CSS 变量（`data-theme` 双套 token），代码块、表格、选区随主题联动
- 主题记忆键 `export-html-theme`；目录宽度由 `--toc-width` 变量统一驱动目录、正文偏移与拖拽把手
- 图片解析优先 `metadataCache.getFirstLinkpathDest()`，回退路径拼接
- 生成的 HTML 完全自包含：CSS 内联、KaTeX Base64 嵌入、图片 Base64 嵌入，离线可用
- 尊重 `prefers-reduced-motion`，打印时自动回到浅色可打印配色并隐藏交互元素

### 安装到 Obsidian

```bash
# 1. 构建项目
npm run build

# 2. 将根目录的 main.js 复制到 my-export-html 目录
cp main.js my-export-html/

# 3. 将 my-export-html 目录复制到 vault 的插件目录
cp -r my-export-html /path/to/vault/.obsidian/plugins/
```

> **注意**：`my-export-html/main.js` 不会自动更新，每次构建后需手动复制（这一条同样写在 `AGENTS.md`，AI 协作时自动遵守）。

然后在 Obsidian 设置 → 第三方插件 中启用。

## 许可证

[MIT](LICENSE)
