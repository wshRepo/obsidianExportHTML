/**
 * v3 导出模板：1:1 复刻 Obsync 分享页的阅读版式
 *
 * 设计来源是 obsync 的分享页（React + Tailwind 编译产物），本文件做三件事：
 * 1. 原样搬运它的页面骨架与 Tailwind 类名（见 V3_LAYOUT 中的常量），
 *    样式本体由 template-v3-css.ts 内联，保证单文件离线可用；
 * 2. 补一份「内容映射 CSS」——Obsidian 渲染出的正文元素不带 Tailwind 类，
 *    必须把参考页实测出的字号/间距/颜色落到 .markdown-preview 选择器上；
 * 3. 用原生 JS 复刻顶栏交互（宽屏、配色、主题、大纲、复制）。
 *
 * 相对参考页的取舍（均已与用户确认）：
 * - 去掉「刷新」「语言」按钮、页头「版本」、页脚品牌行、属性区块；
 * - 代码块固定显示行号，只保留复制按钮，不引入语法高亮；
 * - 下拉菜单去掉左侧单选点与右侧对勾，只留色块与文字；
 * - 默认浅色、默认窄屏（顶栏可手动切宽屏）；
 * - 大纲在窄屏改为堆叠在正文上方（参考页直接隐藏，会出现按钮点了没反应的问题），
 *   并限制高度 + 优化滚动条，避免长目录在手机上占满整屏。
 */
import { V3_THEME_CSS, V3_PREVIEW_CSS } from './template-v3-css';
import type { HeadingInfo } from './template-types';

/**
 * v3 模板入参
 */
export interface V3TemplateOptions {
	/** 文档标题（笔记文件名） */
	title: string;
	/** 笔记修改时间（毫秒时间戳），页头展示 */
	mtime: number;
	/** 正文标题列表，用于生成扁平大纲 */
	headings: HeadingInfo[];
	/** 渲染并后处理过的正文 HTML */
	contentHtml: string;
	/** KaTeX 样式 <style> 片段（无公式时为空串） */
	mathCss: string;
	/** KaTeX 渲染 <script> 片段（无公式时为空串） */
	mathScript: string;
}

/* ============================================================
 * 一、图标（lucide 描边图标，与参考页同源）
 * ============================================================ */

function lucide(className: string, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${body}</svg>`;
}

const ICON_FILE = lucide('lucide lucide-file-text h-5 w-5',
	'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>');

const ICON_CALENDAR = lucide('lucide lucide-calendar h-3 w-3',
	'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>');

const ICON_WIDE = lucide('lucide lucide-move-horizontal size-5',
	'<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>');

const ICON_PALETTE = lucide('lucide lucide-palette size-5',
	'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>');

const ICON_THEME = lucide('lucide lucide-monitor size-5',
	'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>');

const ICON_LIST = lucide('lucide lucide-list size-5',
	'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>');

const ICON_COPY = lucide('lucide lucide-copy size-4',
	'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');

const ICON_CHECK = lucide('lucide lucide-check size-4', '<path d="M20 6 9 17l-5-5"/>');

/* ============================================================
 * 二、类名常量（全部照抄参考页 DOM，保证命中其编译产物）
 * ============================================================ */

/** 次要图标按钮（配色 / 主题） */
const BTN_GHOST =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 min-touch-target size-9 hover:bg-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-0 rounded-xl';

/** 强调图标按钮（宽屏 / 大纲），带 focus ring 与过渡 */
const BTN_SOLID =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground min-touch-target size-9 rounded-xl transition-colors';

/** 代码块悬浮按钮（参考页同款） */
const BTN_CODE =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 min-touch-target size-8 border border-border/70 bg-background/85 text-muted-foreground shadow-sm backdrop-blur hover:bg-background hover:text-foreground';

/** 下拉菜单项（参考页 Radix 菜单项；按需求去掉左侧单选点与右侧对勾） */
const POP_ITEM =
	'v3-pop-item relative flex select-none items-center py-1.5 pl-2 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground rounded-lg cursor-pointer';

/** 大纲条目：普通态 */
const TOC_LINK =
	'block rounded-r-md border-l-2 border-transparent px-2 py-1.5 text-sm transition-all duration-200 text-muted-foreground hover:bg-muted/50 hover:text-foreground';

/** 大纲条目：当前章节高亮态 */
const TOC_LINK_ACTIVE =
	'block rounded-r-md border-l-2 px-2 py-1.5 text-sm transition-all duration-200 border-primary bg-primary/5 font-medium text-primary';

/** 配色项（default 在前，顺序对齐参考页菜单） */
const SCHEMES = ['default', 'green', 'blue', 'sky-blue', 'purple', 'orange', 'rose', 'teal'] as const;

/** 主题项 */
const THEMES = ['system', 'light', 'dark'] as const;

/* ============================================================
 * 三、多语言：按 navigator.language 判定，仅中/英，其余回退英语
 * ============================================================ */

const I18N: { [key: string]: { zh: string; en: string } } = {
	'toc.title': { zh: '大纲', en: 'Outline' },
	'btn.wide': { zh: '切换宽屏', en: 'Toggle full width' },
	'btn.palette': { zh: '配色方案', en: 'Color scheme' },
	'btn.theme': { zh: '切换主题', en: 'Switch theme' },
	'btn.toc': { zh: '显示/隐藏大纲', en: 'Toggle outline' },
	'btn.copy': { zh: '复制', en: 'Copy' },
	'btn.copied': { zh: '已复制', en: 'Copied!' },
	'theme.system': { zh: '跟随系统', en: 'System' },
	'theme.light': { zh: '浅色', en: 'Light' },
	'theme.dark': { zh: '深色', en: 'Dark' },
	'scheme.default': { zh: '标准', en: 'Default' },
	'scheme.green': { zh: '绿色', en: 'Green' },
	'scheme.blue': { zh: '蓝色', en: 'Blue' },
	'scheme.sky-blue': { zh: '天蓝', en: 'Sky blue' },
	'scheme.purple': { zh: '紫色', en: 'Purple' },
	'scheme.orange': { zh: '橙色', en: 'Orange' },
	'scheme.rose': { zh: '玫瑰', en: 'Rose' },
	'scheme.teal': { zh: '青色', en: 'Teal' }
};

/* ============================================================
 * 四、样式
 * ============================================================ */

/**
 * 内容映射 CSS —— 本次保真的核心。
 * 数值全部来自参考页实测：h1 30/36 700 mt32 mb16、h2 24/32 600 mt28 mb12 …
 * 参考页靠元素自带的 Tailwind 类实现，Obsidian 输出没有这些类，故在此补齐。
 */
const V3_CONTENT_CSS = `
.markdown-preview {
	font-size: 1rem;
	line-height: 1.5rem;
	color: var(--foreground);
	word-break: break-word;
	overflow-wrap: anywhere;
}

/* 首/末元素贴边：注意作用域必须是 article 的直接子元素，
   写成 .markdown-preview > :first-child 只会命中 article 本身，
   正文首标题的 margin-top 会残留，导致开头空出一大块 */
.markdown-preview article > :first-child { margin-top: 0; }
.markdown-preview article > :last-child { margin-bottom: 0; }

/* 正文卡片上留白：py-10(40px) 收到 24px，配合上面首元素归零，
   顶部空白从 72px 降到 24px（约原来的 1/3） */
.markdown-preview article {
	padding-top: 1.5rem;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
	margin-top: 1.5rem;
	margin-bottom: 0.75rem;
	scroll-margin-top: 6rem;
	letter-spacing: normal;
}

.markdown-preview h1 {
	font-size: 1.875rem;
	line-height: 2.25rem;
	font-weight: 700;
	margin-top: 2rem;
	margin-bottom: 1rem;
}

.markdown-preview h2 {
	font-size: 1.5rem;
	line-height: 2rem;
	font-weight: 600;
	margin-top: 1.75rem;
	margin-bottom: 0.75rem;
}

.markdown-preview h3 {
	font-size: 1.25rem;
	line-height: 1.75rem;
	font-weight: 600;
	margin-top: 1.5rem;
}

.markdown-preview h4 {
	font-size: 1.125rem;
	line-height: 1.75rem;
	font-weight: 600;
}

.markdown-preview h5 {
	font-size: 1rem;
	line-height: 1.5rem;
	font-weight: 600;
}

.markdown-preview h6 {
	font-size: 0.875rem;
	line-height: 1.25rem;
	font-weight: 600;
	color: var(--muted-foreground);
}

.markdown-preview p {
	margin: 0.75rem 0;
	line-height: 1.75rem;
	color: color-mix(in oklab, var(--foreground) 90%, transparent);
}

.markdown-preview ul,
.markdown-preview ol {
	margin: 0.75rem 0;
	padding-left: 1.5rem;
	line-height: 1.5rem;
}

.markdown-preview ul { list-style: disc; }
.markdown-preview ol { list-style: decimal; }

.markdown-preview li {
	margin: 0.375rem 0;
}

.markdown-preview li > ul,
.markdown-preview li > ol {
	margin-top: 0.375rem;
	margin-bottom: 0.375rem;
}

/* 任务列表：Obsidian 渲染为 contains-task-list */
.markdown-preview .contains-task-list,
.markdown-preview .task-list-item {
	list-style: none;
}

.markdown-preview .contains-task-list {
	padding-left: 0.25rem;
}

/* 任务列表复选框：Tailwind preflight 把 input 的 appearance 置为 none，
   这里统一画成「黑框 + 白底 + 黑色对号」的简洁方块（深色主题自动反色）。
   对勾用 data URI 背景图实现——input 是替换元素，伪元素不可靠 */
.markdown-preview input[type="checkbox"] {
	appearance: none;
	-webkit-appearance: none;
	flex: none;
	width: 1.05em;
	height: 1.05em;
	margin: 0 0.5rem 0 0;
	border: 1.5px solid var(--foreground);
	border-radius: 4px;
	background-color: var(--background);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 78%;
	vertical-align: -0.16em;
	cursor: default;
}

.markdown-preview input[type="checkbox"]:checked {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2334322d' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
}

:root.dark .markdown-preview input[type="checkbox"]:checked {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ededed' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
}

.markdown-preview a {
	color: var(--foreground);
	text-decoration: underline;
	text-underline-offset: 2px;
}

.markdown-preview a:hover {
	color: var(--primary);
}

.markdown-preview blockquote {
	margin: 1rem 0;
	padding-left: 1rem;
	border-left: 4px solid var(--border);
	line-height: 1.5rem;
	color: var(--muted-foreground);
}

.markdown-preview blockquote > :first-child { margin-top: 0; }
.markdown-preview blockquote > :last-child { margin-bottom: 0; }

/* 引用内的段落仍走正文样式（参考页实测：bq p 与普通 p 完全一致） */
.markdown-preview blockquote p {
	margin: 0.75rem 0;
	line-height: 1.75rem;
	color: color-mix(in oklab, var(--foreground) 90%, transparent);
}

.markdown-preview blockquote ul,
.markdown-preview blockquote ol {
	margin: 0.5rem 0;
}

.markdown-preview hr {
	border: none;
	border-top: 1px solid var(--border);
	margin: 1.5rem 0;
}

.markdown-preview code {
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 0.9em;
	padding: 2px 6px;
	border-radius: 4px;
	background: var(--muted);
	color: inherit;
}

.markdown-preview pre {
	margin: 0;
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	white-space: pre;
	tab-size: 4;
}

.markdown-preview pre code {
	display: block;
	padding: 0;
	border-radius: 0;
	background: transparent;
	font-size: 0.875rem;
	line-height: 1.5rem;
	white-space: pre;
	overflow-wrap: normal;
}

.markdown-preview table {
	width: 100%;
	font-size: 0.875rem;
	line-height: 1.25rem;
	border-collapse: collapse;
}

.markdown-preview th,
.markdown-preview td {
	padding: 0.5rem 0.75rem;
	border: 1px solid var(--border);
	text-align: left;
	vertical-align: top;
}

.markdown-preview th {
	font-weight: 600;
}

.markdown-preview thead {
	background: color-mix(in oklab, var(--muted) 50%, transparent);
}

.markdown-preview img {
	display: block;
	max-width: 100%;
	height: auto;
	margin: 1rem 0;
	border: 1px solid rgb(0 0 0 / 0.073);
	border-radius: 8px;
}

.markdown-preview .math-display {
	overflow-x: auto;
	overflow-y: hidden;
	margin: 1rem 0;
}

.markdown-preview .math-inline {
	display: inline-block;
	vertical-align: middle;
}

/* 脚注：Obsidian 输出 section.footnotes > hr + ol，ol/li 已由通用规则覆盖 */
.markdown-preview section.footnotes {
	margin: 0;
}

.markdown-preview .footnote-backref {
	text-decoration: none;
	margin-left: 0.25rem;
}

/* 标签 / 内嵌链接：参考页自带的 .obsidian-tag 用了 hsl(var(--primary)) 三段式写法，
   与本主题的单值 token 不兼容，这里单独给一版 */
.markdown-preview a.tag,
.markdown-preview .tag {
	color: var(--primary);
	background: color-mix(in oklab, var(--primary) 8%, transparent);
	padding: 1px 6px;
	border-radius: 4px;
	font-size: 0.9em;
	text-decoration: none;
	white-space: nowrap;
}

/* Callout：参考页没有这个概念，按 Obsidian 的 --callout-color 自变量补一版简洁样式 */
.markdown-preview .callout {
	--callout-color: 43, 118, 203;
	margin: 1rem 0;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border-left: 4px solid rgb(var(--callout-color));
	background: rgba(var(--callout-color), 0.08);
	overflow: hidden;
}

.markdown-preview .callout-title {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.35rem;
	font-weight: 600;
	color: rgb(var(--callout-color));
}

.markdown-preview .callout-title svg,
.markdown-preview .callout-title img {
	display: inline-block;
	width: 1em;
	height: 1em;
	margin: 0;
	border: none;
	border-radius: 0;
}

.markdown-preview .callout-content > :last-child { margin-bottom: 0; }
.markdown-preview .callout-content p { margin: 0.35rem 0; }
`;

/**
 * UI 补充 CSS —— 参考页没覆盖到的部分：
 * 行号栏（参考页默认关，我们固定开）、复制按钮、自绘下拉菜单、窄屏大纲、打印。
 */
const V3_UI_CSS = `
/* ===== 代码块：复用 main.ts 的 .code-block-wrapper 结构，外观对齐参考页 ===== */
.code-block-wrapper {
	position: relative;
	display: flex;
	align-items: stretch;
	margin: 1rem 0;
	overflow: hidden;
	border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
	border-radius: 8px;
	background: color-mix(in oklab, var(--muted) 40%, transparent);
}

.code-block-wrapper pre {
	flex: 1;
	min-width: 0;
	padding: 1rem 5rem 1rem 1rem;
	overflow-x: auto;
	color: var(--foreground);
}

.code-block-wrapper .line-numbers {
	flex: none;
	overflow: hidden;
	padding: 1rem 0.75rem 1rem 0;
	border-right: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
	background: color-mix(in oklab, var(--muted) 70%, transparent);
	color: var(--muted-foreground);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 0.875rem;
	line-height: 1.5rem;
	text-align: right;
	user-select: none;
	pointer-events: none;
}

.code-block-wrapper .line-numbers span {
	display: block;
}

.v3-code-actions {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	z-index: 10;
	display: flex;
	gap: 0.25rem;
	opacity: 0.8;
	transition: opacity 0.15s ease;
}

.code-block-wrapper:hover .v3-code-actions,
.code-block-wrapper:focus-within .v3-code-actions {
	opacity: 1;
}

.v3-copy-btn.copied {
	color: var(--primary);
	border-color: var(--primary);
}

/* ===== 顶栏下拉菜单（自绘，替代参考页的 Radix Dropdown） ===== */
.v3-pop {
	position: absolute;
	top: calc(100% + 6px);
	right: 0;
	z-index: 50;
	min-width: 11rem;
	padding: 0.25rem;
	border: 1px solid var(--border);
	border-radius: 0.75rem;
	background: var(--popover);
	color: var(--popover-foreground);
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	transform-origin: top right;
	animation: v3-pop-in 0.12s ease-out;
}

.v3-pop[hidden] { display: none; }

@keyframes v3-pop-in {
	from { opacity: 0; transform: scale(0.95); }
	to { opacity: 1; transform: scale(1); }
}

/* 左侧单选点与右侧对勾已按需求移除，这里只保留色块与文字 */
.v3-swatch {
	flex: none;
	width: 0.5rem;
	height: 0.5rem;
	margin-right: 0.5rem;
	border-radius: 9999px;
	background: var(--primary);
}

.v3-pop-item .v3-label { white-space: nowrap; }

/* 当前选中项：浅底 + 加粗。不使用单选点/对勾图标，只靠底色区分 */
.v3-pop-item[aria-checked="true"] {
	background-color: var(--accent);
	color: var(--accent-foreground);
	font-weight: 500;
}

/* ===== 滚动条：Windows/Chromium 默认滚动条在浅色下是粗黑条，这里统一改成细浅色 ===== */
/* 适用于大纲正文、代码块、表格与公式的滚动容器，深浅色主题都靠 --muted-foreground 自适应 */
.v3-toc-body,
.code-block-wrapper pre,
.markdown-preview .my-4.overflow-x-auto,
.markdown-preview .math-display {
	scrollbar-width: thin;
	/* 先给不支持 color-mix 的旧内核一个纯色兜底，再覆盖成半透明 */
	scrollbar-color: var(--muted-foreground) transparent;
	scrollbar-color: color-mix(in oklab, var(--muted-foreground) 45%, transparent) transparent;
}

.v3-toc-body::-webkit-scrollbar,
.code-block-wrapper pre::-webkit-scrollbar,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar,
.markdown-preview .math-display::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

.v3-toc-body::-webkit-scrollbar-track,
.code-block-wrapper pre::-webkit-scrollbar-track,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-track,
.markdown-preview .math-display::-webkit-scrollbar-track {
	background: transparent;
}

.v3-toc-body::-webkit-scrollbar-thumb,
.code-block-wrapper pre::-webkit-scrollbar-thumb,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-thumb,
.markdown-preview .math-display::-webkit-scrollbar-thumb {
	background-color: var(--muted-foreground);
	background-color: color-mix(in oklab, var(--muted-foreground) 45%, transparent);
	border-radius: 9999px;
	/* 留出内边距让圆角滚动条不贴边 */
	border: 2px solid transparent;
	background-clip: padding-box;
}

.v3-toc-body::-webkit-scrollbar-thumb:hover,
.code-block-wrapper pre::-webkit-scrollbar-thumb:hover,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.markdown-preview .math-display::-webkit-scrollbar-thumb:hover {
	background-color: color-mix(in oklab, var(--muted-foreground) 75%, transparent);
}

/* 去掉上下箭头按钮与右下角补块，只留一条细滑块 */
.v3-toc-body::-webkit-scrollbar-button,
.code-block-wrapper pre::-webkit-scrollbar-button,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-button,
.markdown-preview .math-display::-webkit-scrollbar-button {
	display: none;
	width: 0;
	height: 0;
}

.v3-toc-body::-webkit-scrollbar-corner,
.code-block-wrapper pre::-webkit-scrollbar-corner,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-corner,
.markdown-preview .math-display::-webkit-scrollbar-corner {
	background: transparent;
}

/* ===== 窄屏：参考页直接隐藏大纲，这里改为堆叠在正文上方，避免按钮失效 ===== */
@media (max-width: 1023px) {
	.v3-toc {
		position: static;
		width: 100%;
		/* 限高：25 条目录在手机上不能占满整屏，超出部分在面板内部滚动 */
		max-height: 45vh;
	}

	/* items-start 在 flex-col 下会按内容给卡片定宽，宽表格会把卡片撑出屏幕，
	   再被外层 overflow-x-clip 裁掉且无法横向滚动，所以改成拉伸到容器宽度 */
	.v3-main-box {
		align-items: stretch;
	}
}

body.v3-toc-hidden .v3-toc {
	display: none;
}

/* ===== 手机阅读：压缩留白，把宽度让给正文；宽内容一律横向滚动 ===== */
@media (max-width: 640px) {
	.markdown-preview article {
		padding: 1.5rem 1rem 2.5rem;
	}

	/* 右侧 80px 是给复制按钮留的，手机上收窄，别吃掉太多代码可视宽度 */
	.code-block-wrapper pre {
		padding-right: 3.5rem;
	}

	.markdown-preview h1 {
		font-size: 1.5rem;
		line-height: 2rem;
	}
}

/* 表格、代码、公式在窄屏下靠横向滚动，不挤压排版、不换行撑破卡片 */
.code-block-wrapper pre,
.markdown-preview .my-4.overflow-x-auto,
.markdown-preview .math-display {
	overscroll-behavior-x: contain;
	-webkit-overflow-scrolling: touch;
}

/* 中文在任意字间都能换行，表格用 width:100% 会被压成一字一行；
   窄屏下按内容固有宽度撑开，超出部分交给外层 overflow-x-auto 横向滚动 */
@media (max-width: 767px) {
	.markdown-preview table {
		min-width: max-content;
	}
}

/* ===== 打印：只留正文 ===== */
@media print {
	header,
	.v3-toc,
	.v3-code-actions {
		display: none !important;
	}

	.markdown-preview article {
		max-width: none !important;
		padding: 0 !important;
	}

	.code-block-wrapper {
		break-inside: avoid;
	}
}

@media (prefers-reduced-motion: reduce) {
	.v3-pop,
	.v3-code-actions {
		animation: none;
		transition: none;
	}
}
`;

/* ============================================================
 * 五、脚本
 * ============================================================ */

/**
 * 交互脚本：语言判定、宽屏、配色、主题、大纲、复制。
 * 放在 </body> 前同步执行，浏览器首次绘制前就完成换语言，不会闪英文。
 */
const V3_SCRIPT = `
<script>
(function () {
	'use strict';

	/* —— 语言：只认中文，其余一律英语 —— */
	var LANG = /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
	var DICT = ${JSON.stringify(I18N)};

	function t(key) {
		var entry = DICT[key];
		return entry ? (entry[LANG] || entry.en) : key;
	}

	document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : 'en';

	var i18nNodes = document.querySelectorAll('[data-i18n]');
	for (var n = 0; n < i18nNodes.length; n++) {
		i18nNodes[n].textContent = t(i18nNodes[n].getAttribute('data-i18n'));
	}

	var titledNodes = document.querySelectorAll('[data-i18n-title]');
	for (var m = 0; m < titledNodes.length; m++) {
		var label = t(titledNodes[m].getAttribute('data-i18n-title'));
		titledNodes[m].setAttribute('title', label);
		titledNodes[m].setAttribute('aria-label', label);
	}

	/* —— localStorage 在 file:// 下可能不可用，全部降级为「仅本次生效」 —— */
	function read(key) {
		try { return localStorage.getItem(key); } catch (e) { return null; }
	}
	function write(key, value) {
		try { localStorage.setItem(key, value); } catch (e) {}
	}

	/* —— 宽屏：默认关（窄屏），点按可切到全宽 —— */
	function applyWidth(isWide) {
		var boxes = document.querySelectorAll('[data-v3-width]');
		for (var i = 0; i < boxes.length; i++) {
			var el = boxes[i];
			el.classList.remove('max-w-none', 'max-w-5xl', 'max-w-225');
			el.classList.add(isWide ? el.getAttribute('data-wide') : el.getAttribute('data-narrow'));
		}
		write('export-html-v3-width', isWide ? 'true' : 'false');
	}

	var wideBtn = document.querySelector('[data-v3-wide-btn]');
	if (wideBtn) {
		wideBtn.addEventListener('click', function () {
			applyWidth(document.querySelector('main > div').classList.contains('max-w-none') === false);
		});
	}
	applyWidth(read('export-html-v3-width') === 'true');

	/* —— 大纲显隐 —— */
	var tocBtn = document.querySelector('[data-v3-toc-btn]');
	if (tocBtn) {
		tocBtn.addEventListener('click', function () {
			var hidden = document.body.classList.toggle('v3-toc-hidden');
			tocBtn.classList.toggle('bg-primary/10', !hidden);
			tocBtn.classList.toggle('text-primary', !hidden);
			write('export-html-v3-toc', hidden ? 'false' : 'true');
		});
	}
	if (read('export-html-v3-toc') === 'false') {
		document.body.classList.add('v3-toc-hidden');
		if (tocBtn) {
			tocBtn.classList.remove('bg-primary/10', 'text-primary');
		}
	}

	/* —— 主题：默认浅色 —— */
	var root = document.documentElement;
	var systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function applyTheme(mode) {
		var cls = mode === 'system' ? (systemTheme && systemTheme.matches ? 'dark' : 'light') : mode;
		root.classList.remove('light', 'dark');
		root.classList.add(cls);
		write('export-html-v3-theme', mode);
	}

	/* —— 配色：data-color-scheme 驱动 :root[data-color-scheme=X] 的 token —— */
	function applyScheme(name) {
		root.setAttribute('data-color-scheme', name);
		write('export-html-v3-scheme', name);
	}

	/* —— 下拉菜单开合 —— */
	var openPop = null;

	function closePop() {
		if (!openPop) return;
		openPop.hidden = true;
		var trigger = document.querySelector('[data-v3-menu="' + openPop.getAttribute('data-v3-pop') + '"]');
		if (trigger) trigger.setAttribute('aria-expanded', 'false');
		openPop = null;
	}

	function togglePop(name) {
		var pop = document.querySelector('[data-v3-pop="' + name + '"]');
		if (!pop) return;
		var willOpen = pop.hidden;
		closePop();
		if (willOpen) {
			pop.hidden = false;
			openPop = pop;
			var btn = document.querySelector('[data-v3-menu="' + name + '"]');
			if (btn) btn.setAttribute('aria-expanded', 'true');
		}
	}

	var menuTriggers = document.querySelectorAll('[data-v3-menu]');
	for (var b = 0; b < menuTriggers.length; b++) {
		menuTriggers[b].addEventListener('click', function (e) {
			e.stopPropagation();
			togglePop(this.getAttribute('data-v3-menu'));
		});
	}

	document.addEventListener('click', function (e) {
		if (openPop && !openPop.contains(e.target)) closePop();
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closePop();
	});

	/* —— 菜单项选中态 —— */
	function markChecked(popName, value) {
		var items = document.querySelectorAll('[data-v3-pop="' + popName + '"] [role="menuitemradio"]');
		for (var i = 0; i < items.length; i++) {
			var hit = items[i].getAttribute('data-' + popName) === value;
			items[i].setAttribute('aria-checked', hit ? 'true' : 'false');
		}
	}

	var schemeItems = document.querySelectorAll('[data-scheme]');
	for (var s = 0; s < schemeItems.length; s++) {
		schemeItems[s].addEventListener('click', function () {
			applyScheme(this.getAttribute('data-scheme'));
			markChecked('scheme', this.getAttribute('data-scheme'));
			closePop();
		});
	}

	var themeItems = document.querySelectorAll('[data-theme]');
	for (var d = 0; d < themeItems.length; d++) {
		themeItems[d].addEventListener('click', function () {
			applyTheme(this.getAttribute('data-theme'));
			markChecked('theme', this.getAttribute('data-theme'));
			closePop();
		});
	}

	/* —— 配色小圆点：直接读主题变量，避免把 8 套色值硬编码两遍 —— */
	var previousScheme = root.getAttribute('data-color-scheme') || 'default';
	var swatches = document.querySelectorAll('.v3-swatch');
	for (var w = 0; w < swatches.length; w++) {
		var schemeName = swatches[w].closest('[data-scheme]').getAttribute('data-scheme');
		root.setAttribute('data-color-scheme', schemeName);
		var ring = getComputedStyle(root).getPropertyValue('--ring').trim();
		swatches[w].style.backgroundColor = ring || 'var(--primary)';
	}
	root.setAttribute('data-color-scheme', previousScheme);

	/* —— 恢复用户上次的选择 —— */
	var savedScheme = read('export-html-v3-scheme');
	if (savedScheme) {
		applyScheme(savedScheme);
		markChecked('scheme', savedScheme);
	} else {
		markChecked('scheme', previousScheme);
	}

	var savedTheme = read('export-html-v3-theme');
	if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
		applyTheme(savedTheme);
		markChecked('theme', savedTheme);
	} else {
		markChecked('theme', 'light');
	}

	if (systemTheme && systemTheme.addEventListener) {
		systemTheme.addEventListener('change', function () {
			if ((read('export-html-v3-theme') || 'light') === 'system') applyTheme('system');
		});
	}

	/* —— 复制按钮 —— */
	var COPY_ICON = ${JSON.stringify(ICON_COPY)};
	var CHECK_ICON = ${JSON.stringify(ICON_CHECK)};
	var CODE_BTN_CLASS = ${JSON.stringify(BTN_CODE)};

	var blocks = document.querySelectorAll('.code-block-wrapper');
	for (var k = 0; k < blocks.length; k++) {
		(function (block) {
			if (block.querySelector('.v3-code-actions')) return;

			var pre = block.querySelector('pre');
			if (!pre) return;

			var actions = document.createElement('div');
			actions.className = 'v3-code-actions';

			var button = document.createElement('button');
			button.type = 'button';
			button.className = CODE_BTN_CLASS + ' v3-copy-btn';
			button.innerHTML = COPY_ICON;
			button.setAttribute('data-i18n-title', 'btn.copy');
			button.setAttribute('title', t('btn.copy'));
			button.setAttribute('aria-label', t('btn.copy'));

			button.addEventListener('click', function () {
				var code = pre.querySelector('code');
				var text = code ? code.textContent : '';

				function showCopied() {
					button.innerHTML = CHECK_ICON;
					button.classList.add('copied');
					button.setAttribute('title', t('btn.copied'));
					setTimeout(function () {
						button.innerHTML = COPY_ICON;
						button.classList.remove('copied');
						button.setAttribute('title', t('btn.copy'));
					}, 1800);
				}

				function fallbackCopy() {
					var textarea = document.createElement('textarea');
					textarea.value = text;
					textarea.style.position = 'fixed';
					textarea.style.left = '-9999px';
					document.body.appendChild(textarea);
					textarea.select();
					try { if (document.execCommand('copy')) showCopied(); } catch (e) {}
					document.body.removeChild(textarea);
				}

				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(text).then(showCopied, fallbackCopy);
				} else {
					fallbackCopy();
				}
			});

			actions.appendChild(button);
			block.appendChild(actions);

			/* 行号列随代码块横向滚动同步（结构上行号是独立列，这里同步的是纵向） */
			var lineNumbers = block.querySelector('.line-numbers');
			if (lineNumbers) {
				pre.addEventListener('scroll', function () {
					lineNumbers.scrollTop = pre.scrollTop;
				});
			}
		})(blocks[k]);
	}

	/* —— 大纲滚动高亮 —— */
	var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.v3-toc a[href^="#"]'));
	if (tocLinks.length > 0) {
		var linkById = {};
		for (var q = 0; q < tocLinks.length; q++) {
			var id = decodeURIComponent((tocLinks[q].getAttribute('href') || '').slice(1));
			if (id) linkById[id] = tocLinks[q];
		}

		var headings = Array.prototype.slice.call(document.querySelectorAll('.markdown-preview h1, .markdown-preview h2, .markdown-preview h3, .markdown-preview h4, .markdown-preview h5, .markdown-preview h6'))
			.filter(function (h) { return linkById[h.id]; });

		function highlight() {
			if (headings.length === 0) return;
			var offset = window.innerHeight * 0.2;
			var current = headings[0];
			for (var i = 0; i < headings.length; i++) {
				if (headings[i].getBoundingClientRect().top <= offset) current = headings[i];
			}
			for (var j = 0; j < tocLinks.length; j++) {
				var link = tocLinks[j];
				var active = link === linkById[current.id];
				link.classList.toggle('border-primary', active);
				link.classList.toggle('bg-primary/5', active);
				link.classList.toggle('font-medium', active);
				link.classList.toggle('text-primary', active);
				link.classList.toggle('border-transparent', !active);
				link.classList.toggle('text-muted-foreground', !active);
				if (active) {
					link.setAttribute('aria-current', 'location');
				} else {
					link.removeAttribute('aria-current');
				}
			}
		}

		window.addEventListener('scroll', highlight, { passive: true });
		window.addEventListener('resize', highlight);
		highlight();
	}
})();
</script>
`;

/* ============================================================
 * 六、拼装
 * ============================================================ */

/** HTML 转义：标题与大纲文本都来自文件名/正文，可能含 < > & */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** 时间格式与参考页一致：YYYY-MM-DD HH:mm */
function formatDateTime(timestamp: number): string {
	const date = new Date(timestamp);
	const pad = (value: number): string => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * 生成扁平大纲。
 * 参考页不是嵌套列表，而是单层 <ol> + 内联 padding-left（h1=8px，每级 +12px）。
 */
function buildFlatToc(headings: HeadingInfo[]): string {
	if (headings.length === 0) {
		return '';
	}

	const items = headings.map((heading) => {
		const paddingLeft = 8 + (heading.level - 1) * 12;
		// id 可能含中文/空格，编码后由脚本里 decodeURIComponent 还原
		return `<li><a href="#${encodeURIComponent(heading.id)}" class="${TOC_LINK}" style="padding-left: ${paddingLeft}px">${escapeHtml(heading.text)}</a></li>`;
	});

	return `<ol role="list" class="space-y-1">${items.join('')}</ol>`;
}

/**
 * 清理旧版导出残留的复制按钮
 *
 * v1 时代的导出把 <button class="copy-code-button"> 直接写进了正文 HTML，
 * 而现在复制按钮由页尾脚本在运行时注入。残留的空按钮既没有点击逻辑，
 * 又会在代码块左下角显示成一个「假复制图标」，这里直接删掉。
 * @param html 正文 HTML
 * @returns 清理后的正文 HTML
 */
function stripLegacyCopyButtons(html: string): string {
	return html.replace(/<button[^>]*class="[^"]*copy-code-button[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '');
}

/** 表格包进横向滚动容器（与 v2 同样的做法：渲染不会产生嵌套 table，成对替换安全） */
function wrapTables(html: string): string {
	return html
		.replace(/<table([^>]*)>/g, '<div class="my-4 overflow-x-auto"><table$1>')
		.replace(/<\/table>/g, '</table></div>');
}

/** 配色菜单项：色块 + 名称（按需求去掉左侧单选点与右侧对勾） */
function buildSchemeItems(): string {
	return SCHEMES.map((scheme) => {
		const checked = scheme === 'default';
		return `<button type="button" role="menuitemradio" class="${POP_ITEM}" aria-checked="${checked}" data-scheme="${scheme}"><span class="v3-swatch"></span><span class="v3-label" data-i18n="scheme.${scheme}">${escapeHtml(I18N[`scheme.${scheme}`].en)}</span></button>`;
	}).join('');
}

/** 主题菜单项（默认浅色，故 light 为选中态） */
function buildThemeItems(): string {
	return THEMES.map((theme) => {
		const checked = theme === 'light';
		return `<button type="button" role="menuitemradio" class="${POP_ITEM}" aria-checked="${checked}" data-theme="${theme}"><span class="v3-label" data-i18n="theme.${theme}">${escapeHtml(I18N[`theme.${theme}`].en)}</span></button>`;
	}).join('');
}

/**
 * 拼装 v3 完整 HTML 文档
 * @param options 模板入参
 * @returns 完整的单文件离线 HTML 字符串
 */
export function buildV3Template(options: V3TemplateOptions): string {
	const { title, mtime, headings, contentHtml, mathCss, mathScript } = options;

	const safeTitle = escapeHtml(title);
	const tocHtml = buildFlatToc(headings);
	// 默认窄屏（max-w-225 正好卡在 900px 可读宽度），顶栏宽屏按钮可切到 max-w-none
	const articleClass = 'mx-auto px-5 py-10 transition-all duration-300 break-words max-w-225';

	return `<!DOCTYPE html>
<html lang="en" class="light">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="color-scheme" content="light dark">
	<title>${safeTitle}</title>
	<style>${V3_THEME_CSS}</style>
	<style>${V3_PREVIEW_CSS}</style>
	<style>${V3_CONTENT_CSS}</style>
	<style>${V3_UI_CSS}</style>
	${mathCss}
</head>
<body>
	<div class="min-h-screen bg-background relative overflow-x-clip">
		<div class="relative z-10 flex flex-col min-h-screen">
			<header class="border-b bg-card/50 backdrop-blur-md sticky top-0 z-20 px-4 py-3 sm:px-6">
				<div class="mx-auto flex items-center justify-between gap-4 transition-all duration-300 max-w-5xl" data-v3-width data-wide="max-w-none" data-narrow="max-w-5xl">
					<div class="flex items-center gap-3 min-w-0">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">${ICON_FILE}</div>
						<div class="min-w-0">
							<h1 class="truncate text-lg font-bold sm:text-xl">${safeTitle}</h1>
							<div class="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
								<span class="flex items-center gap-1">${ICON_CALENDAR}${formatDateTime(mtime)}</span>
							</div>
						</div>
					</div>
					<div class="flex items-center gap-1 shrink-0">
						<div class="inline-flex items-center">
							<button type="button" class="${BTN_SOLID}" data-v3-wide-btn data-i18n-title="btn.wide">${ICON_WIDE}</button>
						</div>
						<div class="relative inline-flex items-center">
							<button type="button" class="${BTN_GHOST}" data-v3-menu="scheme" aria-haspopup="menu" aria-expanded="false" data-i18n-title="btn.palette">${ICON_PALETTE}</button>
							<div class="v3-pop" role="menu" data-v3-pop="scheme" hidden>${buildSchemeItems()}</div>
						</div>
						<div class="relative inline-flex items-center">
							<button type="button" class="${BTN_GHOST}" data-v3-menu="theme" aria-haspopup="menu" aria-expanded="false" data-i18n-title="btn.theme">${ICON_THEME}</button>
							<div class="v3-pop" role="menu" data-v3-pop="theme" hidden>${buildThemeItems()}</div>
						</div>
						<div class="inline-flex items-center">
							<button type="button" class="${BTN_SOLID} bg-primary/10 text-primary" data-v3-toc-btn data-i18n-title="btn.toc">${ICON_LIST}</button>
						</div>
					</div>
				</div>
			</header>
			<main class="flex-1 overflow-visible p-4 sm:p-6 lg:p-8">
				<div class="mx-auto flex flex-col lg:flex-row items-start gap-4 overflow-visible transition-all duration-300 max-w-5xl v3-main-box" data-v3-width data-wide="max-w-none" data-narrow="max-w-5xl">
					<div class="flex-1 min-w-0 overflow-visible rounded-2xl border bg-card shadow-sm">
						<div class="markdown-preview">
							<article class="${articleClass}" data-v3-width data-wide="max-w-none" data-narrow="max-w-225">
								${wrapTables(stripLegacyCopyButtons(contentHtml))}
							</article>
						</div>
					</div>
					${tocHtml ? `<nav class="v3-toc border border-border bg-card rounded-xl flex flex-col h-fit max-h-[calc(100vh-102px)] overflow-hidden shrink-0 w-60 sticky top-20" aria-label="Outline">
						<div class="sticky top-0 border-b bg-card px-4 py-3 flex items-center justify-between z-10">
							<h3 class="text-sm font-semibold" data-i18n="toc.title">${escapeHtml(I18N['toc.title'].en)}</h3>
						</div>
						<div class="p-2 flex-1 overflow-y-auto min-h-0 v3-toc-body">
							${tocHtml}
						</div>
					</nav>` : ''}
				</div>
			</main>
		</div>
	</div>
	${V3_SCRIPT}
	${mathScript}
</body>
</html>
`;
}
