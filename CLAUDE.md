# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Obsidian 插件，将 Markdown 笔记导出为带 GitHub 风格样式的单文件 HTML。支持目录导航、图片 Base64 嵌入、代码块行号/复制、KaTeX 数学公式渲染、中英双语界面。仅限桌面端（依赖 Electron API）。

## Build Commands

```bash
npm run build    # 先生成 KaTeX 常量，再用 esbuild 打包 main.ts → main.js
npm run dev      # esbuild watch 模式（不会自动生成 KaTeX 常量）
npm run lint     # ESLint 检查（含 obsidianmd 插件规则）
```

`npm run build` 会先执行 `scripts/generate-katex-constants.js`，将 `node_modules/katex/dist/` 下的 JS 和 CSS 读取后 Base64 编码写入 `katex-constants.ts`。该文件是自动生成的，不要手动编辑。

## Architecture

整个插件只有一个源文件 `main.ts`，所有逻辑集中在此：

- **ExportHTMLPlugin**（主类）：注册命令、右键菜单、设置面板
- **exportToHTML()**：通过 Electron 的 `dialog.showSaveDialog` 选择保存路径，用 `fs/promises` 写文件
- **convertMarkdownToHTML()**：核心转换流程——先用占位符保护数学公式 → 调用 Obsidian 的 `MarkdownRenderer.render()` → 还原公式为 KaTeX 标签 → 提取标题生成 TOC → 图片转 Base64 → 代码块包装行号 → 拼接完整 HTML
- **GITHUB_CSS**：内嵌的 GitHub 风格 CSS 常量（含 TOC 侧边栏、代码块、响应式布局、打印样式）
- **TRANSLATIONS**：中英双语翻译字典，通过 `navigator.language` 自动选择

生成的 HTML 是完全自包含的单文件：CSS 内联、KaTeX JS/CSS 以 Base64 嵌入、图片以 Base64 嵌入、交互脚本内联。

## Key Technical Details

- 插件通过 `window.require()` 访问 Node.js/Electron 模块（`electron`, `fs/promises`, `path`），这是 Obsidian 桌面端插件的标准做法
- 图片解析优先使用 `metadataCache.getFirstLinkpathDest()`，回退到路径拼接
- 数学公式在 Markdown 渲染前用占位符保护，渲染后再还原为 KaTeX HTML 标签，最终由内联 JS 调用 `katex.render()` 渲染
- `my-export-html/` 目录是打包后的插件产物（可直接复制到 Obsidian vault 的 `.obsidian/plugins/` 下使用），ESLint 已配置忽略该目录

## Lint Notes

- 使用 `eslint-plugin-obsidianmd` 的推荐规则
- `@typescript-eslint/no-floating-promises` 设为 error —— 所有 Promise 必须 `await` 或 `void` 显式处理
- `@microsoft/sdl/no-inner-html` 和 `no-document-write` 设为 error
- `obsidianmd/sample-names` 已关闭
- `demo/` 文件夹内容不随代码更新，不要作为参考

## Reference Documentation

- Obsidian 官方开发文档：https://docs.obsidian.md/Home （插件 API、主题开发、CSS 变量等参考）
