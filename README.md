# Export to HTML

<div align="center">

**将 Obsidian 笔记转换为专业级单文件 HTML 文档**

[![Version](https://img.shields.io/badge/version-1.0.6-blue)](https://github.com/JustWSH/obsidianExportHTML)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Obsidian](https://img.shields.io/badge/obsidian-0.15.0+-purple)](https://obsidian.md)

</div>

## 功能特性

- **智能目录导航** — 自动生成层级目录，支持宽度调节和平滑滚动
- **图片 Base64 嵌入** — 单文件即可分享，无需额外资源
- **代码块增强** — 行号显示、一键复制、同步滚动
- **数学公式渲染** — 支持 LaTeX 语法，基于 KaTeX 快速渲染
- **双语界面** — 自动适配中英文环境

## 使用方法

1. 在 Obsidian 文件浏览器中右键点击 Markdown 文件
2. 选择「导出为 HTML...」
3. 选择保存位置，完成导出

或使用命令面板 `Ctrl/Cmd + P`，搜索 `Export to HTML`。

## 在线预览

- [演示 HTML](https://justwsh.github.io/obsidianExportHTML/demo/demo.html)
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

### 项目结构

```
obsidianExportHTML/
├── main.ts              # 插件源码（唯一源文件）
├── main.js              # 打包产物
├── manifest.json        # Obsidian 插件清单
├── package.json
├── katex-constants.ts   # 自动生成，勿手动编辑
├── scripts/
│   └── generate-katex-constants.js
└── my-export-html/      # 可直接安装的插件目录
```

### 核心架构

插件所有逻辑集中在 `main.ts`：

| 组件 | 职责 |
|------|------|
| `ExportHTMLPlugin` | 主类：注册命令、右键菜单、设置面板 |
| `exportToHTML()` | 文件保存流程（Electron dialog + fs） |
| `convertMarkdownToHTML()` | 核心转换：公式保护 → Markdown 渲染 → KaTeX 还原 → TOC 生成 → 图片 Base64 → 代码块包装 |
| `GITHUB_CSS` | 内联 CSS 样式 |
| `TRANSLATIONS` | 中英双语翻译 |

### 技术要点

- 通过 `window.require()` 访问 Electron/Node.js 模块（Obsidian 桌面端标准做法）
- 数学公式先用占位符保护，渲染后还原为 KaTeX 标签
- 图片解析优先 `metadataCache.getFirstLinkpathDest()`，回退路径拼接
- 生成的 HTML 完全自包含：CSS 内联、KaTeX Base64 嵌入、图片 Base64 嵌入

### 安装到 Obsidian

```bash
# 1. 构建项目
npm run build

# 2. 将根目录的 main.js 复制到 my-export-html 目录
cp main.js my-export-html/

# 3. 将 my-export-html 目录复制到 vault 的插件目录
cp -r my-export-html /path/to/vault/.obsidian/plugins/
```

> **注意**：`my-export-html/main.js` 不会自动更新，每次构建后需手动复制。

然后在 Obsidian 设置 → 第三方插件 中启用。

## 许可证

[MIT](LICENSE)
