/**
 * v2 导出模板：专业简约的双主题文档排版
 *
 * 相对 v1 的差异：
 * 1. 浅色 / 深色双主题：优先跟随系统（prefers-color-scheme），
 *    点击右上角按钮后固定为用户选择，并写入 localStorage 记忆；
 *    <head> 内联脚本在渲染前设定 data-theme，避免深色用户打开时白闪。
 * 2. 移动端友好：窄屏下目录收起为左侧抽屉（悬浮按钮呼出），
 *    正文满宽并优化触控目标与代码块滚动。
 * 3. 排版重做：正文列宽限制在可读区间，全部颜色走 CSS 变量，随主题联动。
 *
 * 设计约束：导出的 HTML 必须是单文件、完全离线可用，
 * 因此不引用任何外部字体 / CDN，图标为单位内联 SVG。
 */

/**
 * 模板版本类型
 */
export type TemplateVersion = 'v1' | 'v2';

/**
 * v2 模板入参（共享逻辑由调用方处理：KaTeX 注入、TOC 生成等）
 */
export interface V2TemplateOptions {
	/** 文档标题（笔记文件名） */
	title: string;
	/** 已生成的嵌套目录 <ul>（复用 generateNestedTOC） */
	tocHtml: string;
	/** 渲染并后处理过的正文 HTML */
	contentHtml: string;
	/** KaTeX 样式 <style> 片段（无公式时为空串） */
	mathCss: string;
	/** KaTeX 渲染 <script> 片段（无公式时为空串） */
	mathScript: string;
}

/**
 * v2 模板样式：浅色 / 深色两套 token + 全部元素随变量联动
 */
const V2_CSS = `
:root {
	color-scheme: light;

	/* 浅色主题 token：靛蓝紫强调色，安静内敛 */
	--bg: #ffffff;
	--bg-soft: #f7f7f9;
	--text: #232429;
	--text-soft: #5a5c65;
	--text-faint: #8a8c95;
	--border: #e8e9ee;
	--border-strong: #d6d8df;
	--accent: #5a4fd0;
	--accent-soft: rgba(90, 79, 208, 0.09);
	--selection: rgba(90, 79, 208, 0.22);
	--code-bg: #f6f6f8;
	--scrim: rgba(20, 21, 26, 0.45);
	--font-sans: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
	--font-mono: "SF Mono", "JetBrains Mono", Consolas, "Liberation Mono", "Courier New", monospace;
}

:root[data-theme="dark"] {
	color-scheme: dark;

	/* 深色主题 token：提高强调色明度保证对比度，图片轻微压暗防过曝（见 img 规则） */
	--bg: #17181d;
	--bg-soft: #1d1f25;
	--text: #dcdee3;
	--text-soft: #a6a8b0;
	--text-faint: #6d6f79;
	--border: #2a2c34;
	--border-strong: #3b3e48;
	--accent: #a79bf5;
	--accent-soft: rgba(167, 155, 245, 0.13);
	--selection: rgba(167, 155, 245, 0.30);
	--code-bg: #1e2129;
	--scrim: rgba(0, 0, 0, 0.55);
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	scroll-behavior: smooth;
	/* 锚点跳转时给标题留出呼吸空间 */
	scroll-padding-top: 1.5rem;
}

::selection {
	background: var(--selection);
}

body {
	font-family: var(--font-sans);
	font-size: 16px;
	line-height: 1.8;
	background: var(--bg);
	color: var(--text);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5, h6 {
	font-weight: 650;
	line-height: 1.35;
	letter-spacing: -0.011em;
	margin: 2em 0 0.6em;
	color: var(--text);
}

h1 {
	font-size: 1.75rem;
	margin-top: 0;
	padding-bottom: 0.45em;
	border-bottom: 1px solid var(--border);
}

h2 {
	font-size: 1.375rem;
	padding-bottom: 0.35em;
	border-bottom: 1px solid var(--border);
}

h3 { font-size: 1.125rem; }
h4 { font-size: 1rem; }
h5 { font-size: 0.9375rem; color: var(--text-soft); }
h6 { font-size: 0.875rem; color: var(--text-soft); }

p {
	margin-bottom: 1.25em;
}

ul, ol {
	margin-bottom: 1.25em;
	padding-left: 1.6em;
}

li {
	margin: 0.4em 0;
}

li > ul,
li > ol {
	margin-top: 0.4em;
	margin-bottom: 0.2em;
}

::marker {
	color: var(--text-faint);
}

/* 任务列表（Obsidian 渲染为 contains-task-list） */
.contains-task-list {
	list-style: none;
	padding-left: 1.2em;
}

.contains-task-list input[type="checkbox"] {
	margin-right: 0.5em;
 accent-color: var(--accent);
}

a {
	color: var(--accent);
	text-decoration: none;
	text-underline-offset: 0.18em;
}

a:hover {
	text-decoration: underline;
}

code {
	font-family: var(--font-mono);
	font-size: 0.875em;
	background: var(--code-bg);
	border: 1px solid var(--border);
	border-radius: 5px;
	padding: 0.12em 0.4em;
	color: var(--text);
}

/* 代码块外层结构由 wrapCodeBlocks 生成：div.code-block-wrapper > div.line-numbers + pre */
.code-block-wrapper {
	position: relative;
	margin-bottom: 1.5em;
	border: 1px solid var(--border);
	border-radius: 10px;
	background: var(--code-bg);
	overflow: hidden;
}

.code-block-wrapper pre {
	margin: 0;
	padding: 1.1em 1.2em 1.1em 3.7em;
	overflow: auto;
	font-family: var(--font-mono);
	font-size: 0.8438rem;
	line-height: 1.7;
	tab-size: 4;
}

pre code {
	display: block;
	background: transparent;
	border: none;
	padding: 0;
	font-size: inherit;
	color: var(--text);
	white-space: pre;
	word-wrap: normal;
}

.code-block-wrapper .line-numbers {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 3.1em;
	padding: 1.1em 0;
	text-align: right;
	color: var(--text-faint);
	font-family: var(--font-mono);
	font-size: 0.8438rem;
	line-height: 1.7;
	border-right: 1px solid var(--border);
	user-select: none;
	pointer-events: none;
	overflow: hidden;
}

.code-block-wrapper .line-numbers span {
	display: block;
	padding-right: 0.7em;
}

/* 复制按钮：由 v2 脚本注入（v1 并未实际插入按钮）；触屏设备常显 */
.code-block-wrapper .copy-code-button {
	position: absolute;
	top: 0.5em;
	right: 0.6em;
	display: flex;
	align-items: center;
	gap: 0.35em;
	padding: 0.3em 0.55em;
	font-family: var(--font-sans);
	font-size: 0.75rem;
	line-height: 1.4;
	background: var(--bg);
	border: 1px solid var(--border);
	border-radius: 6px;
	color: var(--text-soft);
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.15s ease, color 0.15s ease, border-color 0.15s ease;
	z-index: 5;
}

.code-block-wrapper:hover .copy-code-button,
.code-block-wrapper:focus-within .copy-code-button {
	opacity: 1;
}

.code-block-wrapper .copy-code-button:hover {
	color: var(--text);
	border-color: var(--border-strong);
}

.code-block-wrapper .copy-code-button.copied {
	color: var(--accent);
	border-color: var(--accent);
	opacity: 1;
}

@media (hover: none) {
	.code-block-wrapper .copy-code-button {
		opacity: 1;
	}
}

blockquote {
	margin: 0 0 1.5em;
	padding: 0.9em 1.2em;
	border-left: 3px solid var(--accent);
	border-radius: 0 8px 8px 0;
	background: var(--accent-soft);
	color: var(--text-soft);
}

blockquote > :last-child {
	margin-bottom: 0;
}

img {
	max-width: 100%;
	height: auto;
	border-radius: 8px;
	margin: 0.25em 0 1.5em;
}

:root[data-theme="dark"] img {
	filter: brightness(0.92);
}

hr {
	border: none;
	height: 1px;
	background: var(--border);
	margin: 2.5em 0;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin: 0;
	font-size: 0.9375rem;
}

th, td {
	padding: 0.65em 0.9em;
	border-bottom: 1px solid var(--border);
	text-align: left;
}

th {
	font-weight: 650;
	border-bottom: 2px solid var(--border);
	color: var(--text-soft);
}

tbody tr:last-child td {
	border-bottom: none;
}

th, td {
	overflow-wrap: anywhere;
}

/* 表格横向滚动容器：由模板拼装时包裹 <table> 生成。
 * 列给最小宽度，避免窄屏把每列压成一字一行；
 * 宁可左右滚，也不挤压可读性 */
.table-scroll {
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	margin-bottom: 1.75em;
}

.table-scroll td,
.table-scroll th {
	min-width: 7em;
}

.math-display {
	overflow-x: auto;
	overflow-y: hidden;
}

.math-display .katex-display {
	margin: 0.75em 0;
}

/* ===== 固定悬浮按钮 ===== */
.toc-toggle,
.theme-toggle {
	position: fixed;
	z-index: 60;
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg);
	border: 1px solid var(--border);
	border-radius: 50%;
	color: var(--text-soft);
	cursor: pointer;
	box-shadow: 0 1px 6px rgba(15, 16, 22, 0.10);
	transition: color 0.15s ease, border-color 0.15s ease;
}

.toc-toggle:hover,
.theme-toggle:hover {
	color: var(--text);
	border-color: var(--border-strong);
}

.theme-toggle {
	top: max(1rem, env(safe-area-inset-top));
	right: max(1rem, env(safe-area-inset-right));
}

.toc-toggle {
	top: max(1rem, env(safe-area-inset-top));
	left: max(1rem, env(safe-area-inset-left));
	display: none;
}

/* 主题图标由 CSS 按 data-theme 切换，无需 JS 改写按钮内容 */
.theme-toggle .icon-sun { display: none; }
:root[data-theme="dark"] .theme-toggle .icon-sun { display: block; }
:root[data-theme="dark"] .theme-toggle .icon-moon { display: none; }

/* ===== 目录面板（桌面固定侧栏，窄屏变抽屉） ===== */
.toc-panel {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	width: 264px;
	padding: 1.5rem 0.9rem;
	background: var(--bg-soft);
	border-right: 1px solid var(--border);
	overflow-y: auto;
	overscroll-behavior: contain;
	z-index: 40;
	scrollbar-width: thin;
}

.toc-panel::-webkit-scrollbar {
	width: 4px;
}

.toc-panel::-webkit-scrollbar-thumb {
	background: var(--border-strong);
	border-radius: 2px;
}

.toc-title {
	font-size: 0.875rem;
	font-weight: 650;
	color: var(--text-soft);
	padding: 0 0.75rem;
	margin-bottom: 1rem;
	overflow-wrap: anywhere;
}

.toc-panel ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.toc-panel ul ul {
	margin: 0;
	margin-left: 0.55em;
	padding-left: 1.05em;
	border-left: 1px solid var(--border);
}

.toc-panel a {
	display: block;
	padding: 0.38em 0.75em;
	border-radius: 6px;
	font-size: 0.875rem;
	line-height: 1.5;
	color: var(--text-soft);
	overflow-wrap: anywhere;
	transition: background 0.12s ease, color 0.12s ease;
}

.toc-panel a:hover {
	color: var(--text);
	background: var(--accent-soft);
	text-decoration: none;
}

.toc-panel a.current {
	color: var(--accent);
	background: var(--accent-soft);
	font-weight: 550;
}

/* 遮罩仅在窄屏抽屉模式下参与交互，桌面隐藏 */
.toc-overlay {
	position: fixed;
	inset: 0;
	background: var(--scrim);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.25s ease, visibility 0.25s ease;
	z-index: 30;
}

/* ===== 页面布局：侧栏 + 可读列宽 =====
 * 列宽主动放宽到 56rem：目标场景是 SOP / 技术文档，
 * 表格与代码块更需要横向空间，单纯散文场景由 h2 分节弥补行长 */
.page {
	margin-left: 264px;
}

.prose {
	max-width: 56rem;
	margin: 0 auto;
	padding: 3.5rem 1.5rem 6rem;
}

.prose > :last-child {
	margin-bottom: 0;
}

/* ===== 窄屏适配：目录抽屉 + 正文满宽 ===== */
@media (max-width: 820px) {
	html {
		scroll-padding-top: 4.5rem;
	}

	body {
		font-size: 16.5px;
	}

	.toc-toggle {
		display: flex;
	}

	.toc-panel {
		width: min(78vw, 20rem);
		transform: translateX(-100%);
		transition: transform 0.25s ease;
	}

	body.toc-open .toc-panel {
		transform: none;
	}

	body.toc-open .toc-overlay {
		opacity: 1;
		visibility: visible;
	}

	.page {
		margin-left: 0;
	}

	.prose {
		padding: 4.25rem 1.25rem 5rem;
	}

	.code-block-wrapper pre {
		font-size: 0.8125rem;
		padding-left: 3.4em;
	}
}

/* ===== 打印：隐藏交互元素，强制回到浅色可打印配色 ===== */
@media print {
	:root,
	:root[data-theme="dark"] {
		--bg: #ffffff;
		--bg-soft: #f7f7f9;
		--text: #232429;
		--text-soft: #5a5c65;
		--text-faint: #8a8c95;
		--border: #e8e9ee;
		--border-strong: #d6d8df;
		--accent: #5a4fd0;
		--accent-soft: rgba(90, 79, 208, 0.09);
		--code-bg: #f6f6f8;
	}

	.toc-panel,
	.toc-toggle,
	.theme-toggle,
	.toc-overlay,
	.copy-code-button {
		display: none !important;
	}

	.page {
		margin-left: 0;
	}

	.prose {
		max-width: none;
		padding: 0;
	}

	/* 打印时取消横向滚动，表格按纸张宽度自然排版 */
	.table-scroll {
		overflow: visible;
		margin-bottom: 1.75em;
	}

	.code-block-wrapper {
		break-inside: avoid;
	}
}

/* 尊重系统减弱动态偏好：关闭平滑滚动与过渡动画 */
@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}

	.toc-panel,
	.toc-overlay,
	.toc-panel a,
	.toc-toggle,
	.theme-toggle,
	.code-block-wrapper .copy-code-button {
		transition: none;
	}
}
`;

/**
 * 主题初始化脚本：必须在 <head> 渲染前同步执行，防止深色用户看到白闪。
 * 两态策略：localStorage 里有用户固定选择则用之，否则跟随系统偏好。
 */
const THEME_INIT_SCRIPT = `
<script>(function () {
	var theme = null;
	try { theme = localStorage.getItem('export-html-theme'); } catch (e) {}
	if (theme !== 'light' && theme !== 'dark') {
		theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	document.documentElement.setAttribute('data-theme', theme);
})();</script>
`;

/**
 * 主题切换 + 移动端抽屉 + 目录高亮 + 复制按钮注入脚本（页尾执行，结构已就绪）
 */
const INTERACTION_SCRIPT = `
<script>
(function () {
	/* —— 两态主题切换：点击即固定选择并记忆 —— */
	var themeButton = document.querySelector('.theme-toggle');
	if (themeButton) {
		themeButton.addEventListener('click', function () {
			var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			try { localStorage.setItem('export-html-theme', next); } catch (e) {}
		});
	}

	/* —— 深浅主题记忆自测：若系统偏好变化且用户从未手动选择，则跟随系统 —— */
	try {
		matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
			var pinned = localStorage.getItem('export-html-theme');
			if (pinned !== 'light' && pinned !== 'dark') {
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			}
		});
	} catch (e) {}

	/* —— 移动端目录抽屉 —— */
	var body = document.body;
	var tocButton = document.querySelector('.toc-toggle');
	var overlay = document.querySelector('.toc-overlay');

	function openDrawer() { body.classList.add('toc-open'); }
	function closeDrawer() { body.classList.remove('toc-open'); }
	function toggleDrawer() { body.classList.contains('toc-open') ? closeDrawer() : openDrawer(); }

	if (tocButton) tocButton.addEventListener('click', toggleDrawer);
	if (overlay) overlay.addEventListener('click', closeDrawer);
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeDrawer();
	});

	/* —— 目录：点击正文链接抽屉收起 + 滚动高亮当前标题 —— */
	var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-panel a'));
	tocLinks.forEach(function (link) {
		link.addEventListener('click', closeDrawer);
	});

	var linkById = {};
	tocLinks.forEach(function (link) {
		try {
			var id = decodeURIComponent((link.getAttribute('href') || '').slice(1));
			if (id) linkById[id] = link;
		} catch (e) {}
	});

	var headings = Array.prototype.slice.call(document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6'))
		.filter(function (h) { return linkById[h.id]; });

	function highlightCurrentHeading() {
		if (headings.length === 0) return;
		var offset = window.innerHeight * 0.2;
		var current = headings[0];
		for (var i = 0; i < headings.length; i++) {
			if (headings[i].getBoundingClientRect().top <= offset) current = headings[i];
		}
		tocLinks.forEach(function (link) { link.classList.remove('current'); });
		var active = linkById[current.id];
		if (active) active.classList.add('current');
	}

	if (headings.length > 0) {
		window.addEventListener('scroll', highlightCurrentHeading, { passive: true });
		window.addEventListener('resize', highlightCurrentHeading);
		highlightCurrentHeading();
	}

	/* —— 复制按钮：注入 DOM（点击复制 + 成功反馈同步，剪贴板 API 失败时降级 execCommand） —— */
	var COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
	var CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

	document.querySelectorAll('.code-block-wrapper').forEach(function (block) {
		var pre = block.querySelector('pre');
		if (!pre || block.querySelector('.copy-code-button')) return;

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'copy-code-button';
		button.innerHTML = COPY_ICON;
		button.setAttribute('aria-label', '复制代码');
		block.appendChild(button);

		button.addEventListener('click', function () {
			var code = pre.querySelector('code');
			var text = code ? code.textContent : '';

			function showCopied() {
				button.innerHTML = CHECK_ICON;
				button.classList.add('copied');
				setTimeout(function () {
					button.innerHTML = COPY_ICON;
					button.classList.remove('copied');
				}, 1800);
			}

			function fallbackCopy() {
				var textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.left = '-9999px';
				document.body.appendChild(textarea);
				textarea.select();
				try {
					if (document.execCommand('copy')) showCopied();
				} catch (e) {}
				document.body.removeChild(textarea);
			}

			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(showCopied, fallbackCopy);
			} else {
				fallbackCopy();
			}
		});

		/* 行号列随代码块同步滚动 */
		var lineNumbers = block.querySelector('.line-numbers');
		if (lineNumbers) {
			pre.addEventListener('scroll', function () {
				lineNumbers.scrollTop = pre.scrollTop;
			});
		}
	});
})();
</script>
`;

/**
 * 图标常量（feather 风格描边图标，随按钮颜色联动）
 */
const ICON_TOC = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;

const ICON_MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const ICON_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

/**
 * 拼装 v2 完整 HTML 文档
 * @param options 模板入参
 * @returns 完整的单文件离线 HTML 字符串
 */
export function buildV2Template(options: V2TemplateOptions): string {
	const { title, tocHtml, contentHtml, mathCss, mathScript } = options;

	// 标题中的 HTML 特殊字符需转义，文件名可能包含 < > & 等字符
	const safeTitle = title
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

	// 表格统一包进横向滚动容器：窄屏时不挤压列宽，改为左右滚动。
	// Markdown 渲染不会产生嵌套 table，直接按标签替换成对包裹是安全的
	const bodyHtml = contentHtml
		.replace(/<table([^>]*)>/g, '<div class="table-scroll"><table$1>')
		.replace(/<\/table>/g, '</table></div>');

	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta name="color-scheme" content="light dark">
	<title>${safeTitle}</title>
	<style>${V2_CSS}</style>
	${THEME_INIT_SCRIPT}
	${mathCss}
</head>
<body>
	<div class="toc-overlay"></div>
	<aside class="toc-panel" id="toc">
		<div class="toc-title">${safeTitle}</div>
		${tocHtml}
	</aside>
	<button type="button" class="toc-toggle" aria-label="打开目录" aria-controls="toc">${ICON_TOC}</button>
	<button type="button" class="theme-toggle" aria-label="切换浅色/深色主题">
		<span class="icon-moon">${ICON_MOON}</span>
		<span class="icon-sun">${ICON_SUN}</span>
	</button>
	<div class="page">
		<main class="prose">
			${bodyHtml}
		</main>
	</div>
	${INTERACTION_SCRIPT}
	${mathScript}
</body>
</html>
`;
}
