var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// main.ts
__export(exports, {
  default: () => ExportHTMLPlugin
});
var import_obsidian = __toModule(require("obsidian"));

// html-utils.ts
function stripLegacyCopyButtons(html) {
  return html.replace(/<button[^>]*class="[^"]*copy-code-button[^"]*"[^>]*>[\s\S]*?<\/button>/gi, "");
}

// template-v2.ts
var V2_CSS = `
:root {
	color-scheme: light;

	/* \u6D45\u8272\u4E3B\u9898 token\uFF1A\u975B\u84DD\u7D2B\u5F3A\u8C03\u8272\uFF0C\u5B89\u9759\u5185\u655B */
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
	--toc-width: 264px;
	--font-sans: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
	--font-mono: "SF Mono", "JetBrains Mono", Consolas, "Liberation Mono", "Courier New", monospace;
}

:root[data-theme="dark"] {
	color-scheme: dark;

	/* \u6DF1\u8272\u4E3B\u9898 token\uFF1A\u63D0\u9AD8\u5F3A\u8C03\u8272\u660E\u5EA6\u4FDD\u8BC1\u5BF9\u6BD4\u5EA6\uFF0C\u56FE\u7247\u8F7B\u5FAE\u538B\u6697\u9632\u8FC7\u66DD\uFF08\u89C1 img \u89C4\u5219\uFF09 */
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
	/* \u951A\u70B9\u8DF3\u8F6C\u65F6\u7ED9\u6807\u9898\u7559\u51FA\u547C\u5438\u7A7A\u95F4 */
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

/* \u4EFB\u52A1\u5217\u8868\uFF08Obsidian \u6E32\u67D3\u4E3A contains-task-list\uFF09 */
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

/* \u4EE3\u7801\u5757\u5916\u5C42\u7ED3\u6784\u7531 wrapCodeBlocks \u751F\u6210\uFF1Adiv.code-block-wrapper > div.line-numbers + pre */
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

/* \u590D\u5236\u6309\u94AE\uFF1A\u7531 v2 \u811A\u672C\u6CE8\u5165\uFF08v1 \u5E76\u672A\u5B9E\u9645\u63D2\u5165\u6309\u94AE\uFF09\uFF1B\u89E6\u5C4F\u8BBE\u5907\u5E38\u663E */
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
	/* \u4E0E v1 \u540C\u5F3A\u5EA6\u7684\u6295\u5F71\uFF1A\u767D\u5E95\u56FE\u7247\u5728\u9875\u9762\u4E0A\u7684\u8FB9\u7F18\u53EF\u8FA8\u8BC6 */
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:root[data-theme="dark"] img {
	filter: brightness(0.92);
	/* \u6DF1\u8272\u4E3B\u9898\u9634\u5F71\u52A0\u6DF1\uFF0C\u9632\u6B62\u6DF1\u8272\u56FE\u7247\u878D\u5165\u80CC\u666F */
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
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
	background: var(--bg-soft);
}

tbody tr:last-child td {
	border-bottom: none;
}

th, td {
	overflow-wrap: anywhere;
}

/* \u8868\u683C\u6A2A\u5411\u6EDA\u52A8\u5BB9\u5668\uFF1A\u7531\u6A21\u677F\u62FC\u88C5\u65F6\u5305\u88F9 <table> \u751F\u6210\u3002
 * \u5217\u7ED9\u6700\u5C0F\u5BBD\u5EA6\uFF0C\u907F\u514D\u7A84\u5C4F\u628A\u6BCF\u5217\u538B\u6210\u4E00\u5B57\u4E00\u884C\uFF1B
 * \u5B81\u53EF\u5DE6\u53F3\u6EDA\uFF0C\u4E5F\u4E0D\u6324\u538B\u53EF\u8BFB\u6027 */
.table-scroll {
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	margin-bottom: 1.75em;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

:root[data-theme="dark"] .table-scroll {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
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

/* ===== \u56FA\u5B9A\u60AC\u6D6E\u6309\u94AE ===== */
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

/* \u4E3B\u9898\u56FE\u6807\u7531 CSS \u6309 data-theme \u5207\u6362\uFF0C\u65E0\u9700 JS \u6539\u5199\u6309\u94AE\u5185\u5BB9 */
.theme-toggle .icon-sun { display: none; }
:root[data-theme="dark"] .theme-toggle .icon-sun { display: block; }
:root[data-theme="dark"] .theme-toggle .icon-moon { display: none; }

/* ===== \u76EE\u5F55\u9762\u677F\uFF08\u684C\u9762\u56FA\u5B9A\u4FA7\u680F\uFF0C\u7A84\u5C4F\u53D8\u62BD\u5C49\uFF09 ===== */
.toc-panel {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	width: var(--toc-width);
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

/* \u906E\u7F69\u4EC5\u5728\u7A84\u5C4F\u62BD\u5C49\u6A21\u5F0F\u4E0B\u53C2\u4E0E\u4EA4\u4E92\uFF0C\u684C\u9762\u9690\u85CF */
.toc-overlay {
	position: fixed;
	inset: 0;
	background: var(--scrim);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.25s ease, visibility 0.25s ease;
	z-index: 30;
}

/* ===== \u62D6\u62FD\u5206\u9694\u6761\uFF1A\u4E0E\u76EE\u5F55\u5BBD\u5EA6\u5171\u7528 --toc-width \u53D8\u91CF ===== */
.resize-handle {
	position: fixed;
	top: 0;
	bottom: 0;
	left: calc(var(--toc-width) - 4px);
	width: 8px;
	cursor: col-resize;
	touch-action: none;
	z-index: 55;
}

.resize-handle::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 3px;
	height: 44px;
	border-radius: 2px;
	background: var(--border-strong);
	transition: background 0.15s ease;
}

.resize-handle:hover::after,
.resize-handle.dragging::after {
	background: var(--accent);
}

.resize-handle:hover {
	background: var(--accent-soft);
}

/* \u62D6\u62FD\u8FC7\u7A0B\u4E2D\u7981\u7528\u6587\u672C\u9009\u62E9\uFF0C\u5149\u6807\u4FDD\u6301\u5217\u8C03\u6574\u5F62\u6001 */
body.toc-resizing {
	cursor: col-resize;
	user-select: none;
}

/* ===== \u9875\u9762\u5E03\u5C40\uFF1A\u4FA7\u680F + \u6B63\u6587\u6EE1\u5BBD =====
 * \u6B63\u6587\u4E0D\u9650\u6700\u5927\u5BBD\u5EA6\uFF0C\u6309\u76EE\u6807\u573A\u666F\uFF08SOP / \u6280\u672F\u6587\u6863\uFF0C\u8868\u683C\u5BC6\u96C6\uFF09
 * \u5145\u5206\u5229\u7528\u9875\u9762\u5BBD\u5EA6\uFF0C\u4EC5\u7ED9\u547C\u5438\u8FB9\u8DDD */
.page {
	margin-left: var(--toc-width);
}

.prose {
	padding: 3.5rem 3rem 6rem;
}

.prose > :last-child {
	margin-bottom: 0;
}

/* ===== \u7A84\u5C4F\u9002\u914D\uFF1A\u76EE\u5F55\u62BD\u5C49 + \u6B63\u6587\u6EE1\u5BBD ===== */
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

	/* \u62BD\u5C49\u6A21\u5F0F\u4E0B\u4E0D\u9700\u8981\u62D6\u62FD\u5206\u9694\u6761 */
	.resize-handle {
		display: none;
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

/* ===== \u6253\u5370\uFF1A\u9690\u85CF\u4EA4\u4E92\u5143\u7D20\uFF0C\u5F3A\u5236\u56DE\u5230\u6D45\u8272\u53EF\u6253\u5370\u914D\u8272 ===== */
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
	.resize-handle,
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

	/* \u6253\u5370\u65F6\u53D6\u6D88\u6A2A\u5411\u6EDA\u52A8\uFF0C\u8868\u683C\u6309\u7EB8\u5F20\u5BBD\u5EA6\u81EA\u7136\u6392\u7248 */
	.table-scroll {
		overflow: visible;
		margin-bottom: 1.75em;
		box-shadow: none;
	}

	img {
		box-shadow: none;
	}

	.code-block-wrapper {
		break-inside: avoid;
	}
}

/* \u5C0A\u91CD\u7CFB\u7EDF\u51CF\u5F31\u52A8\u6001\u504F\u597D\uFF1A\u5173\u95ED\u5E73\u6ED1\u6EDA\u52A8\u4E0E\u8FC7\u6E21\u52A8\u753B */
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
var THEME_INIT_SCRIPT = `
<script>(function () {
	var theme = null;
	try { theme = localStorage.getItem('export-html-theme'); } catch (e) {}
	if (theme !== 'light' && theme !== 'dark') {
		theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	document.documentElement.setAttribute('data-theme', theme);
})();<\/script>
`;
var INTERACTION_SCRIPT = `
<script>
(function () {
	/* \u2014\u2014 \u4E24\u6001\u4E3B\u9898\u5207\u6362\uFF1A\u70B9\u51FB\u5373\u56FA\u5B9A\u9009\u62E9\u5E76\u8BB0\u5FC6 \u2014\u2014 */
	var themeButton = document.querySelector('.theme-toggle');
	if (themeButton) {
		themeButton.addEventListener('click', function () {
			var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			try { localStorage.setItem('export-html-theme', next); } catch (e) {}
		});
	}

	/* \u2014\u2014 \u6DF1\u6D45\u4E3B\u9898\u8BB0\u5FC6\u81EA\u6D4B\uFF1A\u82E5\u7CFB\u7EDF\u504F\u597D\u53D8\u5316\u4E14\u7528\u6237\u4ECE\u672A\u624B\u52A8\u9009\u62E9\uFF0C\u5219\u8DDF\u968F\u7CFB\u7EDF \u2014\u2014 */
	try {
		matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
			var pinned = localStorage.getItem('export-html-theme');
			if (pinned !== 'light' && pinned !== 'dark') {
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			}
		});
	} catch (e) {}

	/* \u2014\u2014 \u684C\u9762\u7AEF\u76EE\u5F55\u5BBD\u5EA6\u62D6\u62FD\uFF08\u4E0E v1 \u884C\u4E3A\u4E00\u81F4\uFF0C\u8303\u56F4 200\u2013600px\uFF09 \u2014\u2014
	 * \u901A\u8FC7\u4FEE\u6539 --toc-width \u53D8\u91CF\u4E00\u6B21\u9A71\u52A8\u76EE\u5F55\u3001\u6B63\u6587\u504F\u79FB\u4E0E\u628A\u624B\u4F4D\u7F6E */
	var handle = document.querySelector('.resize-handle');
	if (handle && window.matchMedia('(hover: hover)').matches) {
		var root = document.documentElement;
		var resizing = false;

		handle.addEventListener('mousedown', function (e) {
			e.preventDefault();
			resizing = true;
			document.body.classList.add('toc-resizing');
		});

		document.addEventListener('mousemove', function (e) {
			if (!resizing) return;
			var width = Math.min(600, Math.max(200, e.clientX));
			root.style.setProperty('--toc-width', width + 'px');
		});

		document.addEventListener('mouseup', function () {
			if (!resizing) return;
			resizing = false;
			document.body.classList.remove('toc-resizing');
		});
	}

	/* \u2014\u2014 \u79FB\u52A8\u7AEF\u76EE\u5F55\u62BD\u5C49 \u2014\u2014 */
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

	/* \u2014\u2014 \u76EE\u5F55\uFF1A\u70B9\u51FB\u6B63\u6587\u94FE\u63A5\u62BD\u5C49\u6536\u8D77 + \u6EDA\u52A8\u9AD8\u4EAE\u5F53\u524D\u6807\u9898 \u2014\u2014 */
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

	/* \u2014\u2014 \u590D\u5236\u6309\u94AE\uFF1A\u6CE8\u5165 DOM\uFF08\u70B9\u51FB\u590D\u5236 + \u6210\u529F\u53CD\u9988\u540C\u6B65\uFF0C\u526A\u8D34\u677F API \u5931\u8D25\u65F6\u964D\u7EA7 execCommand\uFF09 \u2014\u2014 */
	var COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
	var CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

	document.querySelectorAll('.code-block-wrapper').forEach(function (block) {
		var pre = block.querySelector('pre');
		if (!pre) return;

		/* \u7A7A\u4EE3\u7801\u5757\u6CA1\u6709\u53EF\u590D\u5236\u5185\u5BB9\uFF0C\u4E14\u6309\u94AE\u4F1A\u6EA2\u51FA\u77EE\u6846\uFF0C\u76F4\u63A5\u8DF3\u8FC7 */
		var code = pre.querySelector('code');
		var text = code ? code.textContent : '';
		if (!text.trim()) return;

		/* \u65E7\u7248\u672C\u5BFC\u51FA\u53EF\u80FD\u6B8B\u7559\u4E00\u4E2A\u6CA1\u6709\u70B9\u51FB\u903B\u8F91\u7684\u6309\u94AE\uFF0C\u5148\u6E05\u6389\u518D\u6CE8\u5165\u81EA\u5DF1\u7684 */
		var stale = block.querySelectorAll('.copy-code-button');
		for (var s = 0; s < stale.length; s++) {
			if (stale[s].parentNode) stale[s].parentNode.removeChild(stale[s]);
		}

		var button = document.createElement('button');
		button.type = 'button';
		button.className = 'copy-code-button';
		button.innerHTML = COPY_ICON;
		button.setAttribute('aria-label', '\u590D\u5236\u4EE3\u7801');
		block.appendChild(button);

		button.addEventListener('click', function () {
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

		/* \u884C\u53F7\u5217\u968F\u4EE3\u7801\u5757\u540C\u6B65\u6EDA\u52A8 */
		var lineNumbers = block.querySelector('.line-numbers');
		if (lineNumbers) {
			pre.addEventListener('scroll', function () {
				lineNumbers.scrollTop = pre.scrollTop;
			});
		}
	});
})();
<\/script>
`;
var ICON_TOC = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;
var ICON_MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
var ICON_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
function buildV2Template(options) {
  const { title, tocHtml, contentHtml, mathCss, mathScript } = options;
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const bodyHtml = stripLegacyCopyButtons(contentHtml).replace(/<table([^>]*)>/g, '<div class="table-scroll"><table$1>').replace(/<\/table>/g, "</table></div>");
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
	<div class="resize-handle" aria-hidden="true"></div>
	<button type="button" class="toc-toggle" aria-label="\u6253\u5F00\u76EE\u5F55" aria-controls="toc">${ICON_TOC}</button>
	<button type="button" class="theme-toggle" aria-label="\u5207\u6362\u6D45\u8272/\u6DF1\u8272\u4E3B\u9898">
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

// template-v3-css.ts
var V3_THEME_CSS = `/*! tailwindcss v4.3.2 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-50:oklch(97.1% .013 17.38);--color-red-100:oklch(93.6% .032 17.717);--color-red-200:oklch(88.5% .062 18.334);--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-red-900:oklch(39.6% .141 25.723);--color-red-950:oklch(25.8% .092 26.042);--color-orange-50:oklch(98% .016 73.684);--color-orange-100:oklch(95.4% .038 75.164);--color-orange-400:oklch(75% .183 55.934);--color-orange-500:oklch(70.5% .213 47.604);--color-orange-600:oklch(64.6% .222 41.116);--color-orange-900:oklch(40.8% .123 38.172);--color-orange-950:oklch(26.6% .079 36.259);--color-amber-300:oklch(87.9% .169 91.605);--color-amber-400:oklch(82.8% .189 84.429);--color-amber-500:oklch(76.9% .188 70.08);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-yellow-50:oklch(98.7% .026 102.212);--color-yellow-400:oklch(85.2% .199 91.936);--color-yellow-500:oklch(79.5% .184 86.047);--color-yellow-950:oklch(28.6% .066 53.813);--color-green-50:oklch(98.2% .018 155.826);--color-green-100:oklch(96.2% .044 156.743);--color-green-200:oklch(92.5% .084 155.995);--color-green-300:oklch(87.1% .15 154.449);--color-green-400:oklch(79.2% .209 151.711);--color-green-500:oklch(72.3% .219 149.579);--color-green-600:oklch(62.7% .194 149.214);--color-green-700:oklch(52.7% .154 150.069);--color-green-900:oklch(39.3% .095 152.535);--color-green-950:oklch(26.6% .065 152.934);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-teal-50:oklch(98.4% .014 180.72);--color-teal-400:oklch(77.7% .152 181.912);--color-teal-500:oklch(70.4% .14 182.503);--color-teal-950:oklch(27.7% .046 192.524);--color-cyan-50:oklch(98.4% .019 200.873);--color-cyan-400:oklch(78.9% .154 211.53);--color-cyan-500:oklch(71.5% .143 215.221);--color-cyan-950:oklch(30.2% .056 229.695);--color-sky-300:oklch(82.8% .111 230.318);--color-sky-500:oklch(68.5% .169 237.323);--color-sky-600:oklch(58.8% .158 241.966);--color-blue-50:oklch(97% .014 254.604);--color-blue-100:oklch(93.2% .032 255.585);--color-blue-300:oklch(80.9% .105 251.813);--color-blue-400:oklch(70.7% .165 254.624);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-700:oklch(48.8% .243 264.376);--color-blue-900:oklch(37.9% .146 265.522);--color-blue-950:oklch(28.2% .091 267.935);--color-indigo-500:oklch(58.5% .233 277.117);--color-indigo-600:oklch(51.1% .262 276.966);--color-violet-300:oklch(81.1% .111 293.571);--color-purple-50:oklch(97.7% .014 308.299);--color-purple-400:oklch(71.4% .203 305.504);--color-purple-500:oklch(62.7% .265 303.9);--color-purple-600:oklch(55.8% .288 302.321);--color-purple-700:oklch(49.6% .265 301.924);--color-purple-950:oklch(29.1% .149 302.717);--color-fuchsia-300:oklch(83.3% .145 321.434);--color-pink-500:oklch(65.6% .241 354.308);--color-rose-500:oklch(64.5% .246 16.439);--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-500:oklch(55.4% .046 257.417);--color-slate-700:oklch(37.2% .044 257.287);--color-gray-50:oklch(98.5% .002 247.839);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-950:oklch(13% .028 261.692);--color-zinc-500:oklch(55.2% .016 285.938);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-xs:20rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--container-2xl:42rem;--container-3xl:48rem;--container-4xl:56rem;--container-5xl:64rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-black:900;--tracking-tight:-.025em;--tracking-wider:.05em;--tracking-widest:.1em;--leading-tight:1.25;--leading-normal:1.5;--leading-relaxed:1.625;--radius-2xl:1rem;--radius-3xl:1.5rem;--shadow-2xs:var(--shadow-2xs);--shadow-xs:var(--shadow-xs);--shadow-sm:var(--shadow-sm);--shadow-md:var(--shadow-md);--shadow-lg:var(--shadow-lg);--shadow-xl:var(--shadow-xl);--shadow-2xl:var(--shadow-2xl);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-spin:spin 1s linear infinite;--animate-ping:ping 1s cubic-bezier(0, 0, .2, 1) infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--animate-bounce:bounce 1s infinite;--blur-sm:8px;--blur-md:12px;--blur-lg:16px;--blur-3xl:64px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--shadow:var(--shadow)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){*{outline-color:color-mix(in oklab,var(--ring) 50%,transparent)}}body{background-color:var(--background);color:var(--foreground);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;position:relative}#root{position:relative}body:before,body:after{content:"";filter:blur(60px);opacity:.5;z-index:0;pointer-events:none;border-radius:9999px;position:fixed}html.dark body:before,.dark body:before,html.dark body:after,.dark body:after{opacity:.35}.custom-shadow{box-shadow:0 18px 40px #0f172a1a}html.dark .custom-shadow,.dark .custom-shadow{box-shadow:0 18px 40px #00000040}html{touch-action:manipulation;scroll-behavior:smooth;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%}body{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right);overscroll-behavior:none}button,[role=button]{cursor:pointer}button,[role=button],input,select,textarea{-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent}button:not([role=checkbox]):not([data-state]),input:not([type=checkbox]):not([type=radio]),select,textarea{min-height:36px}button[data-size=icon-sm],button[data-size=icon-lg]{width:36px;min-width:36px;height:36px}@media(pointer:coarse){.min-touch-target{min-width:44px;min-height:44px}}input,textarea{font-size:16px}@media(max-width:768px){body:before{filter:blur(50px);opacity:.4;width:250px;height:250px;top:-8%;left:-8%}body:after{filter:blur(40px);opacity:.35;width:180px;height:180px;bottom:3%;right:-5%}}@media(max-width:480px){body:before{opacity:.3;width:180px;height:180px}body:after{opacity:.25;width:120px;height:120px}}.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}}@layer components;@layer utilities{.pointer-events-none{pointer-events:none}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.sticky{position:sticky}.inset-0{top:0;right:0;bottom:0;left:0}.-top-1{top:calc(var(--spacing) * -1)}.-top-16{top:calc(var(--spacing) * -16)}.top-0{top:0}.top-1{top:var(--spacing)}.top-1\\/2{top:50%}.top-2{top:calc(var(--spacing) * 2)}.top-4{top:calc(var(--spacing) * 4)}.top-16{top:calc(var(--spacing) * 16)}.top-20{top:calc(var(--spacing) * 20)}.top-\\[50\\%\\]{top:50%}.-right-1{right:calc(var(--spacing) * -1)}.-right-1\\.5{right:calc(var(--spacing) * -1.5)}.-right-2{right:calc(var(--spacing) * -2)}.-right-16{right:calc(var(--spacing) * -16)}.right-0{right:0}.right-1{right:var(--spacing)}.right-1\\.5{right:calc(var(--spacing) * 1.5)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.right-6{right:calc(var(--spacing) * 6)}.right-8{right:calc(var(--spacing) * 8)}.right-\\[-4px\\]{right:-4px}.-bottom-2{bottom:calc(var(--spacing) * -2)}.-bottom-16{bottom:calc(var(--spacing) * -16)}.bottom-0{bottom:0}.bottom-1{bottom:var(--spacing)}.bottom-2{bottom:calc(var(--spacing) * 2)}.bottom-6{bottom:calc(var(--spacing) * 6)}.bottom-16{bottom:calc(var(--spacing) * 16)}.-left-16{left:calc(var(--spacing) * -16)}.left-0{left:0}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing) * 2)}.left-2\\.5{left:calc(var(--spacing) * 2.5)}.left-3{left:calc(var(--spacing) * 3)}.left-\\[-4px\\]{left:-4px}.left-\\[25px\\]{left:25px}.left-\\[50\\%\\]{left:50%}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-100{z-index:100}.z-\\[9999\\]{z-index:9999}.col-span-2{grid-column:span 2/span 2}.col-span-3{grid-column:span 3/span 3}.col-span-full{grid-column:1/-1}.col-start-2{grid-column-start:2}.row-span-2{grid-row:span 2/span 2}.row-start-1{grid-row-start:1}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.-mx-1{margin-inline:calc(var(--spacing) * -1)}.-mx-2{margin-inline:calc(var(--spacing) * -2)}.mx-0\\.5{margin-inline:calc(var(--spacing) * .5)}.mx-1{margin-inline:var(--spacing)}.mx-1\\.5{margin-inline:calc(var(--spacing) * 1.5)}.mx-2{margin-inline:calc(var(--spacing) * 2)}.mx-auto{margin-inline:auto}.-my-0\\.5{margin-block:calc(var(--spacing) * -.5)}.my-0\\.5{margin-block:calc(var(--spacing) * .5)}.my-1{margin-block:var(--spacing)}.my-1\\.5{margin-block:calc(var(--spacing) * 1.5)}.my-2{margin-block:calc(var(--spacing) * 2)}.my-3{margin-block:calc(var(--spacing) * 3)}.my-4{margin-block:calc(var(--spacing) * 4)}.my-6{margin-block:calc(var(--spacing) * 6)}.mt-0{margin-top:0}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:var(--spacing)}.mt-1\\.5{margin-top:calc(var(--spacing) * 1.5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-2\\.5{margin-top:calc(var(--spacing) * 2.5)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mt-7{margin-top:calc(var(--spacing) * 7)}.mt-8{margin-top:calc(var(--spacing) * 8)}.mt-auto{margin-top:auto}.mr-1{margin-right:var(--spacing)}.mr-1\\.5{margin-right:calc(var(--spacing) * 1.5)}.mr-2{margin-right:calc(var(--spacing) * 2)}.mr-3{margin-right:calc(var(--spacing) * 3)}.mb-1{margin-bottom:var(--spacing)}.mb-1\\.5{margin-bottom:calc(var(--spacing) * 1.5)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-5{margin-bottom:calc(var(--spacing) * 5)}.mb-6{margin-bottom:calc(var(--spacing) * 6)}.ml-0\\.5{margin-left:calc(var(--spacing) * .5)}.ml-1{margin-left:var(--spacing)}.ml-1\\.5{margin-left:calc(var(--spacing) * 1.5)}.ml-2{margin-left:calc(var(--spacing) * 2)}.ml-6{margin-left:calc(var(--spacing) * 6)}.ml-auto{margin-left:auto}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{display:table}.size-2{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.size-3{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-3\\/5{width:60%;height:60%}.size-4{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.size-5{width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.size-9{width:calc(var(--spacing) * 9);height:calc(var(--spacing) * 9)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.h-1{height:var(--spacing)}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-2{height:calc(var(--spacing) * 2)}.h-2\\.5{height:calc(var(--spacing) * 2.5)}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-4\\.5{height:calc(var(--spacing) * 4.5)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-12{height:calc(var(--spacing) * 12)}.h-14{height:calc(var(--spacing) * 14)}.h-16{height:calc(var(--spacing) * 16)}.h-20{height:calc(var(--spacing) * 20)}.h-32{height:calc(var(--spacing) * 32)}.h-36{height:calc(var(--spacing) * 36)}.h-48{height:calc(var(--spacing) * 48)}.h-64{height:calc(var(--spacing) * 64)}.h-\\[1px\\]{height:1px}.h-\\[220px\\]{height:220px}.h-\\[calc\\(100vh-102px\\)\\]{height:calc(100vh - 102px)}.h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.h-auto{height:auto}.h-dvh{height:100dvh}.h-fit{height:fit-content}.h-full{height:100%}.h-px{height:1px}.h-screen{height:100vh}.max-h-60{max-height:calc(var(--spacing) * 60)}.max-h-80{max-height:calc(var(--spacing) * 80)}.max-h-96{max-height:calc(var(--spacing) * 96)}.max-h-\\[70vh\\]{max-height:70vh}.max-h-\\[80vh\\]{max-height:80vh}.max-h-\\[85vh\\]{max-height:85vh}.max-h-\\[300px\\]{max-height:300px}.max-h-\\[500px\\]{max-height:500px}.max-h-\\[calc\\(100vh-102px\\)\\]{max-height:calc(100vh - 102px)}.max-h-\\[calc\\(100vh-120px\\)\\]{max-height:calc(100vh - 120px)}.max-h-\\[calc\\(100vh-166px\\)\\]{max-height:calc(100vh - 166px)}.\\!min-h-0{min-height:0!important}.min-h-0{min-height:0}.min-h-6{min-height:calc(var(--spacing) * 6)}.min-h-10{min-height:calc(var(--spacing) * 10)}.min-h-30{min-height:calc(var(--spacing) * 30)}.min-h-50{min-height:calc(var(--spacing) * 50)}.min-h-52{min-height:calc(var(--spacing) * 52)}.min-h-\\[28px\\]{min-height:28px}.min-h-\\[40px\\]{min-height:40px}.min-h-\\[80px\\]{min-height:80px}.min-h-\\[250px\\]{min-height:250px}.min-h-\\[290px\\]{min-height:290px}.min-h-\\[300px\\]{min-height:300px}.min-h-\\[420px\\]{min-height:420px}.min-h-\\[450px\\]{min-height:450px}.min-h-\\[calc\\(100vh-12rem\\)\\]{min-height:calc(100vh - 12rem)}.min-h-full{min-height:100%}.min-h-screen{min-height:100vh}.w-1{width:var(--spacing)}.w-1\\.5{width:calc(var(--spacing) * 1.5)}.w-2{width:calc(var(--spacing) * 2)}.w-2\\.5{width:calc(var(--spacing) * 2.5)}.w-3{width:calc(var(--spacing) * 3)}.w-3\\.5{width:calc(var(--spacing) * 3.5)}.w-4{width:calc(var(--spacing) * 4)}.w-4\\.5{width:calc(var(--spacing) * 4.5)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-7{width:calc(var(--spacing) * 7)}.w-8{width:calc(var(--spacing) * 8)}.w-9{width:calc(var(--spacing) * 9)}.w-10{width:calc(var(--spacing) * 10)}.w-12{width:calc(var(--spacing) * 12)}.w-16{width:calc(var(--spacing) * 16)}.w-20{width:calc(var(--spacing) * 20)}.w-24{width:calc(var(--spacing) * 24)}.w-25{width:calc(var(--spacing) * 25)}.w-36{width:calc(var(--spacing) * 36)}.w-40{width:calc(var(--spacing) * 40)}.w-48{width:calc(var(--spacing) * 48)}.w-56{width:calc(var(--spacing) * 56)}.w-60{width:calc(var(--spacing) * 60)}.w-72{width:calc(var(--spacing) * 72)}.w-80{width:calc(var(--spacing) * 80)}.w-\\[1px\\]{width:1px}.w-\\[44px\\]{width:44px}.w-\\[70px\\]{width:70px}.w-\\[80px\\]{width:80px}.w-\\[90vw\\]{width:90vw}.w-\\[95vw\\]{width:95vw}.w-\\[100px\\]{width:100px}.w-\\[110px\\]{width:110px}.w-\\[120px\\]{width:120px}.w-\\[150px\\]{width:150px}.w-\\[170px\\]{width:170px}.w-\\[180px\\]{width:180px}.w-\\[320px\\]{width:320px}.w-\\[calc\\(100\\%-0\\.75rem\\)\\]{width:calc(100% - .75rem)}.w-\\[calc\\(100vw-2rem\\)\\]{width:calc(100vw - 2rem)}.w-auto{width:auto}.w-fit{width:fit-content}.w-full{width:100%}.w-screen{width:100vw}.max-w-2xl{max-width:var(--container-2xl)}.max-w-3xl{max-width:var(--container-3xl)}.max-w-4xl{max-width:var(--container-4xl)}.max-w-5xl{max-width:var(--container-5xl)}.max-w-37\\.5{max-width:calc(var(--spacing) * 37.5)}.max-w-65{max-width:calc(var(--spacing) * 65)}.max-w-75{max-width:calc(var(--spacing) * 75)}.max-w-225{max-width:calc(var(--spacing) * 225)}.max-w-\\[80px\\]{max-width:80px}.max-w-\\[120px\\]{max-width:120px}.max-w-\\[150px\\]{max-width:150px}.max-w-\\[200px\\]{max-width:200px}.max-w-\\[250px\\]{max-width:250px}.max-w-\\[260px\\]{max-width:260px}.max-w-\\[280px\\]{max-width:280px}.max-w-\\[300px\\]{max-width:300px}.max-w-\\[320px\\]{max-width:320px}.max-w-\\[calc\\(100vw-3rem\\)\\]{max-width:calc(100vw - 3rem)}.max-w-full{max-width:100%}.max-w-lg{max-width:var(--container-lg)}.max-w-md{max-width:var(--container-md)}.max-w-none{max-width:none}.max-w-sm{max-width:var(--container-sm)}.max-w-xs{max-width:var(--container-xs)}.min-w-0{min-width:0}.min-w-7\\.5{min-width:calc(var(--spacing) * 7.5)}.min-w-20{min-width:calc(var(--spacing) * 20)}.min-w-25{min-width:calc(var(--spacing) * 25)}.min-w-40{min-width:calc(var(--spacing) * 40)}.min-w-44{min-width:calc(var(--spacing) * 44)}.min-w-45{min-width:calc(var(--spacing) * 45)}.min-w-50{min-width:calc(var(--spacing) * 50)}.min-w-\\[3\\.5rem\\]{min-width:3.5rem}.min-w-\\[8rem\\]{min-width:8rem}.min-w-\\[110px\\]{min-width:110px}.min-w-\\[120px\\]{min-width:120px}.min-w-\\[140px\\]{min-width:140px}.min-w-\\[180px\\]{min-width:180px}.min-w-\\[200px\\]{min-width:200px}.min-w-\\[250px\\]{min-width:250px}.min-w-\\[300px\\]{min-width:300px}.min-w-\\[800px\\]{min-width:800px}.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.flex-1{flex:1}.flex-none{flex:none}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.caption-bottom{caption-side:bottom}.border-collapse{border-collapse:collapse}.\\[transform-origin\\:center\\]{transform-origin:50%}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[0\\.5px\\]{--tw-translate-y:.5px;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[1px\\]{--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.scale-110{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x) var(--tw-scale-y)}.scale-200{--tw-scale-x:200%;--tw-scale-y:200%;--tw-scale-z:200%;scale:var(--tw-scale-x) var(--tw-scale-y)}.scale-\\[1\\.01\\]{scale:1.01}.scale-\\[1\\.03\\]{scale:1.03}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-bounce{animation:var(--animate-bounce)}.animate-in{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.animate-none{animation:none}.animate-ping{animation:var(--animate-ping)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-default{cursor:default}.cursor-grab{cursor:grab}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.cursor-text{cursor:text}.resize{resize:both}.scroll-mt-24{scroll-margin-top:calc(var(--spacing) * 24)}.scrollbar-thin{scrollbar-width:thin}.list-inside{list-style-position:inside}.list-decimal{list-style-type:decimal}.list-disc{list-style-type:disc}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-\\[60px_1fr_100px\\]{grid-template-columns:60px 1fr 100px}.grid-cols-\\[144px_1fr\\]{grid-template-columns:144px 1fr}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-nowrap{flex-wrap:nowrap}.flex-wrap{flex-wrap:wrap}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.items-stretch{align-items:stretch}.justify-around{justify-content:space-around}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-start{justify-content:flex-start}.gap-0{gap:0}.gap-0\\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}:where(.space-y-0>:not(:last-child)){--tw-space-y-reverse:0;margin-block:0}:where(.space-y-0\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * .5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * .5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing) * var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}.gap-x-2{column-gap:calc(var(--spacing) * 2)}.gap-x-4{column-gap:calc(var(--spacing) * 4)}.gap-x-5{column-gap:calc(var(--spacing) * 5)}.gap-x-6{column-gap:calc(var(--spacing) * 6)}:where(.space-x-0\\.5>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * .5) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * .5) * calc(1 - var(--tw-space-x-reverse)))}:where(.space-x-1\\.5>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * 1.5) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-x-reverse)))}:where(.space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.gap-y-1{row-gap:var(--spacing)}.gap-y-2{row-gap:calc(var(--spacing) * 2)}.gap-y-3{row-gap:calc(var(--spacing) * 3)}.gap-y-4{row-gap:calc(var(--spacing) * 4)}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-border\\/25>:not(:last-child)){border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){:where(.divide-border\\/25>:not(:last-child)){border-color:color-mix(in oklab,var(--border) 25%,transparent)}}.self-center{align-self:center}.self-start{align-self:flex-start}.justify-self-end{justify-self:flex-end}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-x-clip{overflow-x:clip}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-xl{border-radius:calc(var(--radius) + 4px)}.rounded-t-2xl{border-top-left-radius:var(--radius-2xl);border-top-right-radius:var(--radius-2xl)}.rounded-l-2xl{border-top-left-radius:var(--radius-2xl);border-bottom-left-radius:var(--radius-2xl)}.rounded-r-lg{border-top-right-radius:var(--radius);border-bottom-right-radius:var(--radius)}.rounded-r-md{border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-b-2{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-l-0{border-left-style:var(--tw-border-style);border-left-width:0}.border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-none{--tw-border-style:none;border-style:none}.border-amber-500\\/20{border-color:#f99c0033}@supports (color:color-mix(in lab,red,red)){.border-amber-500\\/20{border-color:color-mix(in oklab,var(--color-amber-500) 20%,transparent)}}.border-amber-500\\/30{border-color:#f99c004d}@supports (color:color-mix(in lab,red,red)){.border-amber-500\\/30{border-color:color-mix(in oklab,var(--color-amber-500) 30%,transparent)}}.border-background{border-color:var(--background)}.border-blue-400{border-color:var(--color-blue-400)}.border-border,.border-border\\/10{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/10{border-color:color-mix(in oklab,var(--border) 10%,transparent)}}.border-border\\/20{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/20{border-color:color-mix(in oklab,var(--border) 20%,transparent)}}.border-border\\/30{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/30{border-color:color-mix(in oklab,var(--border) 30%,transparent)}}.border-border\\/40{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/40{border-color:color-mix(in oklab,var(--border) 40%,transparent)}}.border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/50{border-color:color-mix(in oklab,var(--border) 50%,transparent)}}.border-border\\/60{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/60{border-color:color-mix(in oklab,var(--border) 60%,transparent)}}.border-border\\/70{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/70{border-color:color-mix(in oklab,var(--border) 70%,transparent)}}.border-border\\/80{border-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/80{border-color:color-mix(in oklab,var(--border) 80%,transparent)}}.border-cyan-400{border-color:var(--color-cyan-400)}.border-destructive\\/10{border-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.border-destructive\\/10{border-color:color-mix(in oklab,var(--destructive) 10%,transparent)}}.border-destructive\\/20{border-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.border-destructive\\/20{border-color:color-mix(in oklab,var(--destructive) 20%,transparent)}}.border-emerald-500\\/10{border-color:#00bb7f1a}@supports (color:color-mix(in lab,red,red)){.border-emerald-500\\/10{border-color:color-mix(in oklab,var(--color-emerald-500) 10%,transparent)}}.border-emerald-500\\/20{border-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.border-emerald-500\\/20{border-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.border-emerald-500\\/30{border-color:#00bb7f4d}@supports (color:color-mix(in lab,red,red)){.border-emerald-500\\/30{border-color:color-mix(in oklab,var(--color-emerald-500) 30%,transparent)}}.border-gray-400{border-color:var(--color-gray-400)}.border-green-200{border-color:var(--color-green-200)}.border-green-200\\/50{border-color:#b9f8cf80}@supports (color:color-mix(in lab,red,red)){.border-green-200\\/50{border-color:color-mix(in oklab,var(--color-green-200) 50%,transparent)}}.border-green-300{border-color:var(--color-green-300)}.border-green-400{border-color:var(--color-green-400)}.border-green-500\\/20{border-color:#00c75833}@supports (color:color-mix(in lab,red,red)){.border-green-500\\/20{border-color:color-mix(in oklab,var(--color-green-500) 20%,transparent)}}.border-indigo-500\\/10{border-color:#625fff1a}@supports (color:color-mix(in lab,red,red)){.border-indigo-500\\/10{border-color:color-mix(in oklab,var(--color-indigo-500) 10%,transparent)}}.border-indigo-500\\/20{border-color:#625fff33}@supports (color:color-mix(in lab,red,red)){.border-indigo-500\\/20{border-color:color-mix(in oklab,var(--color-indigo-500) 20%,transparent)}}.border-input{border-color:var(--input)}.border-muted-foreground\\/20{border-color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.border-muted-foreground\\/20{border-color:color-mix(in oklab,var(--muted-foreground) 20%,transparent)}}.border-orange-400{border-color:var(--color-orange-400)}.border-primary,.border-primary\\/10{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.border-primary\\/10{border-color:color-mix(in oklab,var(--primary) 10%,transparent)}}.border-primary\\/20{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.border-primary\\/20{border-color:color-mix(in oklab,var(--primary) 20%,transparent)}}.border-primary\\/30{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.border-primary\\/30{border-color:color-mix(in oklab,var(--primary) 30%,transparent)}}.border-primary\\/40{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.border-primary\\/40{border-color:color-mix(in oklab,var(--primary) 40%,transparent)}}.border-primary\\/50{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.border-primary\\/50{border-color:color-mix(in oklab,var(--primary) 50%,transparent)}}.border-purple-400{border-color:var(--color-purple-400)}.border-red-200{border-color:var(--color-red-200)}.border-red-400{border-color:var(--color-red-400)}.border-rose-500\\/20{border-color:#ff235733}@supports (color:color-mix(in lab,red,red)){.border-rose-500\\/20{border-color:color-mix(in oklab,var(--color-rose-500) 20%,transparent)}}.border-sidebar-border{border-color:var(--sidebar-border)}.border-sky-500\\/10{border-color:#00a5ef1a}@supports (color:color-mix(in lab,red,red)){.border-sky-500\\/10{border-color:color-mix(in oklab,var(--color-sky-500) 10%,transparent)}}.border-sky-500\\/20{border-color:#00a5ef33}@supports (color:color-mix(in lab,red,red)){.border-sky-500\\/20{border-color:color-mix(in oklab,var(--color-sky-500) 20%,transparent)}}.border-slate-100{border-color:var(--color-slate-100)}.border-slate-200{border-color:var(--color-slate-200)}.border-teal-400{border-color:var(--color-teal-400)}.border-transparent{border-color:#0000}.border-white\\/30{border-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.border-white\\/30{border-color:color-mix(in oklab,var(--color-white) 30%,transparent)}}.border-yellow-400{border-color:var(--color-yellow-400)}.border-x-transparent{border-inline-color:#0000}.border-y-border{border-block-color:var(--border)}.border-y-transparent{border-block-color:#0000}.border-t-transparent{border-top-color:#0000}.border-t-white{border-top-color:var(--color-white)}.border-r-border,.border-r-border\\/30{border-right-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.border-r-border\\/30{border-right-color:color-mix(in oklab,var(--border) 30%,transparent)}}.border-r-transparent{border-right-color:#0000}.border-l-blue-600{border-left-color:var(--color-blue-600)}.border-l-green-600{border-left-color:var(--color-green-600)}.border-l-muted{border-left-color:var(--muted)}.border-l-orange-500{border-left-color:var(--color-orange-500)}.border-l-transparent{border-left-color:#0000}.bg-\\[\\#1E88E5\\]{background-color:#1e88e5}.bg-\\[\\#7C4DFF\\]{background-color:#7c4dff}.bg-\\[\\#08b94e\\]{background-color:#08b94e}.bg-\\[\\#FF8A33\\]{background-color:#ff8a33}.bg-accent{background-color:var(--accent)}.bg-amber-500{background-color:var(--color-amber-500)}.bg-amber-500\\/5{background-color:#f99c000d}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\\/5{background-color:color-mix(in oklab,var(--color-amber-500) 5%,transparent)}}.bg-amber-500\\/10{background-color:#f99c001a}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\\/10{background-color:color-mix(in oklab,var(--color-amber-500) 10%,transparent)}}.bg-amber-500\\/\\[0\\.01\\]{background-color:#f99c0003}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\\/\\[0\\.01\\]{background-color:color-mix(in oklab,var(--color-amber-500) 1%,transparent)}}.bg-background,.bg-background\\/30{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.bg-background\\/30{background-color:color-mix(in oklab,var(--background) 30%,transparent)}}.bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.bg-background\\/50{background-color:color-mix(in oklab,var(--background) 50%,transparent)}}.bg-background\\/80{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.bg-background\\/80{background-color:color-mix(in oklab,var(--background) 80%,transparent)}}.bg-background\\/85{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.bg-background\\/85{background-color:color-mix(in oklab,var(--background) 85%,transparent)}}.bg-background\\/95{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.bg-background\\/95{background-color:color-mix(in oklab,var(--background) 95%,transparent)}}.bg-black{background-color:var(--color-black)}.bg-black\\/5{background-color:#0000000d}@supports (color:color-mix(in lab,red,red)){.bg-black\\/5{background-color:color-mix(in oklab,var(--color-black) 5%,transparent)}}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab,red,red)){.bg-black\\/60{background-color:color-mix(in oklab,var(--color-black) 60%,transparent)}}.bg-black\\/80{background-color:#000c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/80{background-color:color-mix(in oklab,var(--color-black) 80%,transparent)}}.bg-blue-50{background-color:var(--color-blue-50)}.bg-blue-100{background-color:var(--color-blue-100)}.bg-blue-500{background-color:var(--color-blue-500)}.bg-blue-500\\/10{background-color:#3080ff1a}@supports (color:color-mix(in lab,red,red)){.bg-blue-500\\/10{background-color:color-mix(in oklab,var(--color-blue-500) 10%,transparent)}}.bg-border,.bg-border\\/40{background-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.bg-border\\/40{background-color:color-mix(in oklab,var(--border) 40%,transparent)}}.bg-border\\/50{background-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.bg-border\\/50{background-color:color-mix(in oklab,var(--border) 50%,transparent)}}.bg-border\\/60{background-color:var(--border)}@supports (color:color-mix(in lab,red,red)){.bg-border\\/60{background-color:color-mix(in oklab,var(--border) 60%,transparent)}}.bg-card,.bg-card\\/30{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.bg-card\\/30{background-color:color-mix(in oklab,var(--card) 30%,transparent)}}.bg-card\\/50{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.bg-card\\/50{background-color:color-mix(in oklab,var(--card) 50%,transparent)}}.bg-card\\/60{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.bg-card\\/60{background-color:color-mix(in oklab,var(--card) 60%,transparent)}}.bg-card\\/80{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.bg-card\\/80{background-color:color-mix(in oklab,var(--card) 80%,transparent)}}.bg-card\\/95{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.bg-card\\/95{background-color:color-mix(in oklab,var(--card) 95%,transparent)}}.bg-cyan-50{background-color:var(--color-cyan-50)}.bg-cyan-500{background-color:var(--color-cyan-500)}.bg-destructive,.bg-destructive\\/5{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.bg-destructive\\/5{background-color:color-mix(in oklab,var(--destructive) 5%,transparent)}}.bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.bg-destructive\\/10{background-color:color-mix(in oklab,var(--destructive) 10%,transparent)}}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-500{background-color:var(--color-emerald-500)}.bg-emerald-500\\/5{background-color:#00bb7f0d}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\\/5{background-color:color-mix(in oklab,var(--color-emerald-500) 5%,transparent)}}.bg-emerald-500\\/10{background-color:#00bb7f1a}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\\/10{background-color:color-mix(in oklab,var(--color-emerald-500) 10%,transparent)}}.bg-emerald-500\\/20{background-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.bg-emerald-500\\/20{background-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.bg-gray-50{background-color:var(--color-gray-50)}.bg-green-50{background-color:var(--color-green-50)}.bg-green-100{background-color:var(--color-green-100)}.bg-green-500{background-color:var(--color-green-500)}.bg-green-500\\/5{background-color:#00c7580d}@supports (color:color-mix(in lab,red,red)){.bg-green-500\\/5{background-color:color-mix(in oklab,var(--color-green-500) 5%,transparent)}}.bg-green-500\\/10{background-color:#00c7581a}@supports (color:color-mix(in lab,red,red)){.bg-green-500\\/10{background-color:color-mix(in oklab,var(--color-green-500) 10%,transparent)}}.bg-green-600{background-color:var(--color-green-600)}.bg-indigo-500{background-color:var(--color-indigo-500)}.bg-indigo-500\\/5{background-color:#625fff0d}@supports (color:color-mix(in lab,red,red)){.bg-indigo-500\\/5{background-color:color-mix(in oklab,var(--color-indigo-500) 5%,transparent)}}.bg-muted{background-color:var(--muted)}.bg-muted-foreground\\/20{background-color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.bg-muted-foreground\\/20{background-color:color-mix(in oklab,var(--muted-foreground) 20%,transparent)}}.bg-muted\\/5{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/5{background-color:color-mix(in oklab,var(--muted) 5%,transparent)}}.bg-muted\\/10{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/10{background-color:color-mix(in oklab,var(--muted) 10%,transparent)}}.bg-muted\\/20{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/20{background-color:color-mix(in oklab,var(--muted) 20%,transparent)}}.bg-muted\\/30{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/30{background-color:color-mix(in oklab,var(--muted) 30%,transparent)}}.bg-muted\\/40{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/40{background-color:color-mix(in oklab,var(--muted) 40%,transparent)}}.bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/50{background-color:color-mix(in oklab,var(--muted) 50%,transparent)}}.bg-muted\\/60{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/60{background-color:color-mix(in oklab,var(--muted) 60%,transparent)}}.bg-muted\\/90{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/90{background-color:color-mix(in oklab,var(--muted) 90%,transparent)}}.bg-orange-50{background-color:var(--color-orange-50)}.bg-orange-100{background-color:var(--color-orange-100)}.bg-orange-500{background-color:var(--color-orange-500)}.bg-orange-500\\/10{background-color:#fe6e001a}@supports (color:color-mix(in lab,red,red)){.bg-orange-500\\/10{background-color:color-mix(in oklab,var(--color-orange-500) 10%,transparent)}}.bg-pink-500{background-color:var(--color-pink-500)}.bg-popover,.bg-popover\\/95{background-color:var(--popover)}@supports (color:color-mix(in lab,red,red)){.bg-popover\\/95{background-color:color-mix(in oklab,var(--popover) 95%,transparent)}}.bg-primary,.bg-primary\\/5{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.bg-primary\\/5{background-color:color-mix(in oklab,var(--primary) 5%,transparent)}}.bg-primary\\/10{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.bg-primary\\/10{background-color:color-mix(in oklab,var(--primary) 10%,transparent)}}.bg-primary\\/20{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.bg-primary\\/20{background-color:color-mix(in oklab,var(--primary) 20%,transparent)}}.bg-purple-50{background-color:var(--color-purple-50)}.bg-purple-500{background-color:var(--color-purple-500)}.bg-purple-500\\/10{background-color:#ac4bff1a}@supports (color:color-mix(in lab,red,red)){.bg-purple-500\\/10{background-color:color-mix(in oklab,var(--color-purple-500) 10%,transparent)}}.bg-red-50{background-color:var(--color-red-50)}.bg-red-100{background-color:var(--color-red-100)}.bg-red-400{background-color:var(--color-red-400)}.bg-red-500{background-color:var(--color-red-500)}.bg-ring{background-color:var(--ring)}.bg-rose-500{background-color:var(--color-rose-500)}.bg-rose-500\\/10{background-color:#ff23571a}@supports (color:color-mix(in lab,red,red)){.bg-rose-500\\/10{background-color:color-mix(in oklab,var(--color-rose-500) 10%,transparent)}}.bg-secondary,.bg-secondary\\/20{background-color:var(--secondary)}@supports (color:color-mix(in lab,red,red)){.bg-secondary\\/20{background-color:color-mix(in oklab,var(--secondary) 20%,transparent)}}.bg-secondary\\/50{background-color:var(--secondary)}@supports (color:color-mix(in lab,red,red)){.bg-secondary\\/50{background-color:color-mix(in oklab,var(--secondary) 50%,transparent)}}.bg-sidebar{background-color:var(--sidebar)}.bg-sky-500\\/5{background-color:#00a5ef0d}@supports (color:color-mix(in lab,red,red)){.bg-sky-500\\/5{background-color:color-mix(in oklab,var(--color-sky-500) 5%,transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-teal-50{background-color:var(--color-teal-50)}.bg-teal-500{background-color:var(--color-teal-500)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\/80{background-color:#fffc}@supports (color:color-mix(in lab,red,red)){.bg-white\\/80{background-color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.bg-yellow-50{background-color:var(--color-yellow-50)}.bg-yellow-500{background-color:var(--color-yellow-500)}.bg-linear-to-r{--tw-gradient-position:to right}@supports (background-image:linear-gradient(in lab,red,red)){.bg-linear-to-r{--tw-gradient-position:to right in oklab}}.bg-linear-to-r{background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-br{--tw-gradient-position:to bottom right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-l{--tw-gradient-position:to left in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-gradient-to-r{--tw-gradient-position:to right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-blue-500{--tw-gradient-from:var(--color-blue-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.from-emerald-500{--tw-gradient-from:var(--color-emerald-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.from-muted\\/60{--tw-gradient-from:var(--muted)}@supports (color:color-mix(in lab,red,red)){.from-muted\\/60{--tw-gradient-from:color-mix(in oklab, var(--muted) 60%, transparent)}}.from-muted\\/60{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.from-primary{--tw-gradient-from:var(--primary);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.from-primary\\/25{--tw-gradient-from:var(--primary)}@supports (color:color-mix(in lab,red,red)){.from-primary\\/25{--tw-gradient-from:color-mix(in oklab, var(--primary) 25%, transparent)}}.from-primary\\/25{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.from-primary\\/40{--tw-gradient-from:var(--primary)}@supports (color:color-mix(in lab,red,red)){.from-primary\\/40{--tw-gradient-from:color-mix(in oklab, var(--primary) 40%, transparent)}}.from-primary\\/40{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-blue-600{--tw-gradient-to:var(--color-blue-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-primary{--tw-gradient-to:var(--primary);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-primary\\/5{--tw-gradient-to:var(--primary)}@supports (color:color-mix(in lab,red,red)){.to-primary\\/5{--tw-gradient-to:color-mix(in oklab, var(--primary) 5%, transparent)}}.to-primary\\/5{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-primary\\/90{--tw-gradient-to:var(--primary)}@supports (color:color-mix(in lab,red,red)){.to-primary\\/90{--tw-gradient-to:color-mix(in oklab, var(--primary) 90%, transparent)}}.to-primary\\/90{--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-teal-500{--tw-gradient-to:var(--color-teal-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-transparent{--tw-gradient-to:transparent;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.fill-amber-500\\/10{fill:#f99c001a}@supports (color:color-mix(in lab,red,red)){.fill-amber-500\\/10{fill:color-mix(in oklab,var(--color-amber-500) 10%,transparent)}}.fill-current{fill:currentColor}.fill-red-500\\/10{fill:#fb2c361a}@supports (color:color-mix(in lab,red,red)){.fill-red-500\\/10{fill:color-mix(in oklab,var(--color-red-500) 10%,transparent)}}.stroke-\\[1\\.5\\]{stroke-width:1.5px}.object-contain{object-fit:contain}.p-0{padding:0}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-2\\.5{padding:calc(var(--spacing) * 2.5)}.p-3{padding:calc(var(--spacing) * 3)}.p-3\\.5{padding:calc(var(--spacing) * 3.5)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.p-12{padding:calc(var(--spacing) * 12)}.p-24{padding:calc(var(--spacing) * 24)}.px-0\\.5{padding-inline:calc(var(--spacing) * .5)}.px-1{padding-inline:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-5{padding-inline:calc(var(--spacing) * 5)}.px-6{padding-inline:calc(var(--spacing) * 6)}.px-8{padding-inline:calc(var(--spacing) * 8)}.py-0{padding-block:0}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-8{padding-block:calc(var(--spacing) * 8)}.py-10{padding-block:calc(var(--spacing) * 10)}.py-12{padding-block:calc(var(--spacing) * 12)}.py-20{padding-block:calc(var(--spacing) * 20)}.pt-0{padding-top:0}.pt-1{padding-top:var(--spacing)}.pt-1\\.5{padding-top:calc(var(--spacing) * 1.5)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-3{padding-top:calc(var(--spacing) * 3)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-5{padding-top:calc(var(--spacing) * 5)}.pt-12{padding-top:calc(var(--spacing) * 12)}.pr-2{padding-right:calc(var(--spacing) * 2)}.pr-3{padding-right:calc(var(--spacing) * 3)}.pr-7{padding-right:calc(var(--spacing) * 7)}.pr-8{padding-right:calc(var(--spacing) * 8)}.pr-9{padding-right:calc(var(--spacing) * 9)}.pr-10{padding-right:calc(var(--spacing) * 10)}.pr-12{padding-right:calc(var(--spacing) * 12)}.pr-14{padding-right:calc(var(--spacing) * 14)}.pr-20{padding-right:calc(var(--spacing) * 20)}.pb-0{padding-bottom:0}.pb-0\\.5{padding-bottom:calc(var(--spacing) * .5)}.pb-1{padding-bottom:var(--spacing)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-8{padding-bottom:calc(var(--spacing) * 8)}.pb-18{padding-bottom:calc(var(--spacing) * 18)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.pb-\\[env\\(safe-area-inset-bottom\\)\\]{padding-bottom:env(safe-area-inset-bottom)}.pl-0{padding-left:0}.pl-1{padding-left:var(--spacing)}.pl-2{padding-left:calc(var(--spacing) * 2)}.pl-3{padding-left:calc(var(--spacing) * 3)}.pl-4{padding-left:calc(var(--spacing) * 4)}.pl-5{padding-left:calc(var(--spacing) * 5)}.pl-6{padding-left:calc(var(--spacing) * 6)}.pl-8{padding-left:calc(var(--spacing) * 8)}.pl-9{padding-left:calc(var(--spacing) * 9)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.align-middle{vertical-align:middle}.align-top{vertical-align:top}.font-mono{font-family:var(--font-mono)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[0\\.9em\\]{font-size:.9em}.text-\\[9px\\]{font-size:9px}.text-\\[10\\.5px\\]{font-size:10.5px}.text-\\[10px\\]{font-size:10px}.text-\\[10px\\]\\!{font-size:10px!important}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.leading-6{--tw-leading:calc(var(--spacing) * 6);line-height:calc(var(--spacing) * 6)}.leading-7{--tw-leading:calc(var(--spacing) * 7);line-height:calc(var(--spacing) * 7)}.leading-none{--tw-leading:1;line-height:1}.leading-normal{--tw-leading:var(--leading-normal);line-height:var(--leading-normal)}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-black{--tw-font-weight:var(--font-weight-black);font-weight:var(--font-weight-black)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.tracking-widest{--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest)}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-line{white-space:pre-line}.whitespace-pre-wrap{white-space:pre-wrap}.text-\\[\\#3DDC84\\]{color:#3ddc84}.text-\\[\\#0078D4\\]{color:#0078d4}.text-\\[\\#4285F4\\]{color:#4285f4}.text-\\[\\#555555\\]{color:#555}.text-accent-foreground{color:var(--accent-foreground)}.text-amber-500{color:var(--color-amber-500)}.text-amber-500\\/80{color:#f99c00cc}@supports (color:color-mix(in lab,red,red)){.text-amber-500\\/80{color:color-mix(in oklab,var(--color-amber-500) 80%,transparent)}}.text-amber-600{color:var(--color-amber-600)}.text-blue-400{color:var(--color-blue-400)}.text-blue-500{color:var(--color-blue-500)}.text-blue-500\\/70{color:#3080ffb3}@supports (color:color-mix(in lab,red,red)){.text-blue-500\\/70{color:color-mix(in oklab,var(--color-blue-500) 70%,transparent)}}.text-blue-700{color:var(--color-blue-700)}.text-card-foreground{color:var(--card-foreground)}.text-current{color:currentColor}.text-cyan-400{color:var(--color-cyan-400)}.text-destructive{color:var(--destructive)}.text-destructive-foreground{color:var(--destructive-foreground)}.text-destructive\\/40{color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.text-destructive\\/40{color:color-mix(in oklab,var(--destructive) 40%,transparent)}}.text-destructive\\/70{color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.text-destructive\\/70{color:color-mix(in oklab,var(--destructive) 70%,transparent)}}.text-destructive\\/80{color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.text-destructive\\/80{color:color-mix(in oklab,var(--destructive) 80%,transparent)}}.text-destructive\\/90{color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.text-destructive\\/90{color:color-mix(in oklab,var(--destructive) 90%,transparent)}}.text-emerald-500{color:var(--color-emerald-500)}.text-emerald-500\\/70{color:#00bb7fb3}@supports (color:color-mix(in lab,red,red)){.text-emerald-500\\/70{color:color-mix(in oklab,var(--color-emerald-500) 70%,transparent)}}.text-emerald-600{color:var(--color-emerald-600)}.text-foreground,.text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab,red,red)){.text-foreground\\/70{color:color-mix(in oklab,var(--foreground) 70%,transparent)}}.text-foreground\\/80{color:var(--foreground)}@supports (color:color-mix(in lab,red,red)){.text-foreground\\/80{color:color-mix(in oklab,var(--foreground) 80%,transparent)}}.text-foreground\\/90{color:var(--foreground)}@supports (color:color-mix(in lab,red,red)){.text-foreground\\/90{color:color-mix(in oklab,var(--foreground) 90%,transparent)}}.text-gray-400{color:var(--color-gray-400)}.text-green-400{color:var(--color-green-400)}.text-green-500{color:var(--color-green-500)}.text-green-600{color:var(--color-green-600)}.text-green-700{color:var(--color-green-700)}.text-green-900{color:var(--color-green-900)}.text-indigo-500\\/70{color:#625fffb3}@supports (color:color-mix(in lab,red,red)){.text-indigo-500\\/70{color:color-mix(in oklab,var(--color-indigo-500) 70%,transparent)}}.text-indigo-600{color:var(--color-indigo-600)}.text-muted-foreground,.text-muted-foreground\\/30{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/30{color:color-mix(in oklab,var(--muted-foreground) 30%,transparent)}}.text-muted-foreground\\/40{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/40{color:color-mix(in oklab,var(--muted-foreground) 40%,transparent)}}.text-muted-foreground\\/45{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/45{color:color-mix(in oklab,var(--muted-foreground) 45%,transparent)}}.text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/50{color:color-mix(in oklab,var(--muted-foreground) 50%,transparent)}}.text-muted-foreground\\/60{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/60{color:color-mix(in oklab,var(--muted-foreground) 60%,transparent)}}.text-muted-foreground\\/70{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/70{color:color-mix(in oklab,var(--muted-foreground) 70%,transparent)}}.text-muted-foreground\\/75{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/75{color:color-mix(in oklab,var(--muted-foreground) 75%,transparent)}}.text-muted-foreground\\/80{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/80{color:color-mix(in oklab,var(--muted-foreground) 80%,transparent)}}.text-muted-foreground\\/85{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/85{color:color-mix(in oklab,var(--muted-foreground) 85%,transparent)}}.text-muted-foreground\\/90{color:var(--muted-foreground)}@supports (color:color-mix(in lab,red,red)){.text-muted-foreground\\/90{color:color-mix(in oklab,var(--muted-foreground) 90%,transparent)}}.text-orange-400{color:var(--color-orange-400)}.text-orange-500{color:var(--color-orange-500)}.text-orange-500\\/70{color:#fe6e00b3}@supports (color:color-mix(in lab,red,red)){.text-orange-500\\/70{color:color-mix(in oklab,var(--color-orange-500) 70%,transparent)}}.text-orange-600{color:var(--color-orange-600)}.text-pink-500\\/70{color:#f6339ab3}@supports (color:color-mix(in lab,red,red)){.text-pink-500\\/70{color:color-mix(in oklab,var(--color-pink-500) 70%,transparent)}}.text-popover-foreground{color:var(--popover-foreground)}.text-primary{color:var(--primary)}.text-primary-foreground{color:var(--primary-foreground)}.text-primary\\/60{color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.text-primary\\/60{color:color-mix(in oklab,var(--primary) 60%,transparent)}}.text-primary\\/70{color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.text-primary\\/70{color:color-mix(in oklab,var(--primary) 70%,transparent)}}.text-primary\\/80{color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.text-primary\\/80{color:color-mix(in oklab,var(--primary) 80%,transparent)}}.text-purple-400{color:var(--color-purple-400)}.text-purple-500{color:var(--color-purple-500)}.text-purple-500\\/70{color:#ac4bffb3}@supports (color:color-mix(in lab,red,red)){.text-purple-500\\/70{color:color-mix(in oklab,var(--color-purple-500) 70%,transparent)}}.text-red-400{color:var(--color-red-400)}.text-red-500{color:var(--color-red-500)}.text-red-600{color:var(--color-red-600)}.text-red-900{color:var(--color-red-900)}.text-rose-500{color:var(--color-rose-500)}.text-secondary-foreground{color:var(--secondary-foreground)}.text-sidebar-foreground{color:var(--sidebar-foreground)}.text-sky-600{color:var(--color-sky-600)}.text-slate-300{color:var(--color-slate-300)}.text-slate-400{color:var(--color-slate-400)}.text-slate-500{color:var(--color-slate-500)}.text-slate-700{color:var(--color-slate-700)}.text-teal-400{color:var(--color-teal-400)}.text-transparent{color:#0000}.text-white{color:var(--color-white)}.text-yellow-400{color:var(--color-yellow-400)}.text-yellow-500{color:var(--color-yellow-500)}.capitalize{text-transform:capitalize}.uppercase{text-transform:uppercase}.italic{font-style:italic}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.underline{text-decoration-line:underline}.decoration-red-400{-webkit-text-decoration-color:var(--color-red-400);text-decoration-color:var(--color-red-400)}.underline-offset-4{text-underline-offset:4px}.accent-primary{accent-color:var(--primary)}.opacity-0{opacity:0}.opacity-10{opacity:.1}.opacity-20{opacity:.2}.opacity-30{opacity:.3}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-90{opacity:.9}.opacity-100{opacity:1}.opacity-\\[0\\.03\\]{opacity:.03}.shadow-2xl{--tw-shadow:var(--shadow-2xl);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[0_0_35px_-5px_rgba\\(245\\,158\\,11\\,0\\.4\\)\\]{--tw-shadow:0 0 35px -5px var(--tw-shadow-color,#f59e0b66);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-lg{--tw-shadow:var(--shadow-lg);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:var(--shadow-md);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:var(--shadow-xl);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xs{--tw-shadow:var(--shadow-xs);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-blue-500\\/20{--tw-shadow-color:#3080ff33}@supports (color:color-mix(in lab,red,red)){.shadow-blue-500\\/20{--tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--color-blue-500) 20%, transparent) var(--tw-shadow-alpha), transparent)}}.shadow-emerald-500\\/20{--tw-shadow-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.shadow-emerald-500\\/20{--tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--color-emerald-500) 20%, transparent) var(--tw-shadow-alpha), transparent)}}.shadow-primary\\/20{--tw-shadow-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.shadow-primary\\/20{--tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--primary) 20%, transparent) var(--tw-shadow-alpha), transparent)}}.ring-background{--tw-ring-color:var(--background)}.ring-primary{--tw-ring-color:var(--primary)}.ring-ring,.ring-ring\\/30{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.ring-ring\\/30{--tw-ring-color:color-mix(in oklab, var(--ring) 30%, transparent)}}.ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.ring-offset-background{--tw-ring-offset-color:var(--background)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur-3xl{--tw-blur:blur(var(--blur-3xl));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.blur-md{--tw-blur:blur(var(--blur-md));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-\\[2px\\]{--tw-backdrop-blur:blur(2px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-lg{--tw-backdrop-blur:blur(var(--blur-lg));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-shadow{transition-property:box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-150{--tw-duration:.15s;transition-duration:.15s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-500{--tw-duration:.5s;transition-duration:.5s}.duration-700{--tw-duration:.7s;transition-duration:.7s}.duration-1000{--tw-duration:1s;transition-duration:1s}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.fade-in-0{--tw-enter-opacity:0}.fill-mode-forwards{--tw-animation-fill-mode:forwards;animation-fill-mode:forwards}.outline-none{--tw-outline-style:none;outline-style:none}.repeat-infinite{--tw-animation-iteration-count:infinite;animation-iteration-count:infinite}.select-all{-webkit-user-select:all;user-select:all}.select-none{-webkit-user-select:none;user-select:none}.select-text{-webkit-user-select:text;user-select:text}.zoom-in-95{--tw-enter-scale:.95}.\\[animation-direction\\:alternate\\]{animation-direction:alternate}.fade-in{--tw-enter-opacity:0}.running{animation-play-state:running}.slide-in-from-bottom-4{--tw-enter-translate-y:calc(4*var(--spacing))}.slide-in-from-left{--tw-enter-translate-x:-100%}.slide-in-from-left-2{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.slide-in-from-top-2{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.slide-in-from-top-3{--tw-enter-translate-y:calc(3*var(--spacing)*-1)}.slide-in-from-top-4{--tw-enter-translate-y:calc(4*var(--spacing)*-1)}.spin-in-12{--tw-enter-rotate: 12deg }.zoom-in{--tw-enter-scale:0}.group-focus-within\\:text-primary:is(:where(.group):focus-within *){color:var(--primary)}@media(hover:hover){.group-hover\\:scale-105:is(:where(.group):hover *){--tw-scale-x:105%;--tw-scale-y:105%;--tw-scale-z:105%;scale:var(--tw-scale-x) var(--tw-scale-y)}.group-hover\\:scale-110:is(:where(.group):hover *){--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x) var(--tw-scale-y)}.group-hover\\:border-primary\\/20:is(:where(.group):hover *){border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.group-hover\\:border-primary\\/20:is(:where(.group):hover *){border-color:color-mix(in oklab,var(--primary) 20%,transparent)}}.group-hover\\:bg-primary:is(:where(.group):hover *),.group-hover\\:bg-primary\\/10:is(:where(.group):hover *){background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.group-hover\\:bg-primary\\/10:is(:where(.group):hover *){background-color:color-mix(in oklab,var(--primary) 10%,transparent)}}.group-hover\\:text-accent-foreground:is(:where(.group):hover *){color:var(--accent-foreground)}.group-hover\\:text-primary:is(:where(.group):hover *){color:var(--primary)}.group-hover\\:text-primary-foreground:is(:where(.group):hover *){color:var(--primary-foreground)}.group-hover\\:text-slate-400:is(:where(.group):hover *){color:var(--color-slate-400)}.group-hover\\:opacity-100:is(:where(.group):hover *),.group-hover\\/search\\:opacity-100:is(:where(.group\\/search):hover *){opacity:1}.group-hover\\/stat\\:text-primary\\/60:is(:where(.group\\/stat):hover *){color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.group-hover\\/stat\\:text-primary\\/60:is(:where(.group\\/stat):hover *){color:color-mix(in oklab,var(--primary) 60%,transparent)}}.group-hover\\/stat\\:opacity-\\[0\\.06\\]:is(:where(.group\\/stat):hover *){opacity:.06}}.peer-disabled\\:cursor-not-allowed:is(:where(.peer):disabled~*){cursor:not-allowed}.peer-disabled\\:opacity-70:is(:where(.peer):disabled~*){opacity:.7}.selection\\:bg-blue-100 ::selection{background-color:var(--color-blue-100)}.selection\\:bg-blue-100::selection{background-color:var(--color-blue-100)}.selection\\:text-blue-900 ::selection{color:var(--color-blue-900)}.selection\\:text-blue-900::selection{color:var(--color-blue-900)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-transparent::file-selector-button{background-color:#0000}.file\\:text-sm::file-selector-button{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.file\\:font-medium::file-selector-button{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.file\\:text-foreground::file-selector-button{color:var(--foreground)}.placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.first\\:mt-0:first-child{margin-top:0}.last\\:mb-0:last-child{margin-bottom:0}.focus-within\\:w-48:focus-within{width:calc(var(--spacing) * 48)}.focus-within\\:border-border:focus-within{border-color:var(--border)}.focus-within\\:bg-muted\\/50:focus-within{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.focus-within\\:bg-muted\\/50:focus-within{background-color:color-mix(in oklab,var(--muted) 50%,transparent)}}.focus-within\\:opacity-100:focus-within{opacity:1}.focus-within\\:ring-2:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-within\\:ring-primary\\/20:focus-within{--tw-ring-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.focus-within\\:ring-primary\\/20:focus-within{--tw-ring-color:color-mix(in oklab, var(--primary) 20%, transparent)}}@media(hover:hover){.hover\\:w-48:hover{width:calc(var(--spacing) * 48)}.hover\\:scale-\\[1\\.03\\]:hover{scale:1.03}.hover\\:border-border:hover{border-color:var(--border)}.hover\\:border-destructive\\/20:hover{border-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-destructive\\/20:hover{border-color:color-mix(in oklab,var(--destructive) 20%,transparent)}}.hover\\:border-destructive\\/40:hover{border-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-destructive\\/40:hover{border-color:color-mix(in oklab,var(--destructive) 40%,transparent)}}.hover\\:border-destructive\\/50:hover{border-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-destructive\\/50:hover{border-color:color-mix(in oklab,var(--destructive) 50%,transparent)}}.hover\\:border-green-300:hover{border-color:var(--color-green-300)}.hover\\:border-primary:hover,.hover\\:border-primary\\/20:hover{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-primary\\/20:hover{border-color:color-mix(in oklab,var(--primary) 20%,transparent)}}.hover\\:border-primary\\/30:hover{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-primary\\/30:hover{border-color:color-mix(in oklab,var(--primary) 30%,transparent)}}.hover\\:border-primary\\/40:hover{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-primary\\/40:hover{border-color:color-mix(in oklab,var(--primary) 40%,transparent)}}.hover\\:border-primary\\/50:hover{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:border-primary\\/50:hover{border-color:color-mix(in oklab,var(--primary) 50%,transparent)}}.hover\\:bg-accent:hover,.hover\\:bg-accent\\/30:hover{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent\\/30:hover{background-color:color-mix(in oklab,var(--accent) 30%,transparent)}}.hover\\:bg-accent\\/50:hover{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent\\/50:hover{background-color:color-mix(in oklab,var(--accent) 50%,transparent)}}.hover\\:bg-accent\\/80:hover{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent\\/80:hover{background-color:color-mix(in oklab,var(--accent) 80%,transparent)}}.hover\\:bg-background:hover,.hover\\:bg-background\\/80:hover{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-background\\/80:hover{background-color:color-mix(in oklab,var(--background) 80%,transparent)}}.hover\\:bg-blue-500\\/20:hover{background-color:#3080ff33}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-blue-500\\/20:hover{background-color:color-mix(in oklab,var(--color-blue-500) 20%,transparent)}}.hover\\:bg-card:hover{background-color:var(--card)}.hover\\:bg-destructive\\/5:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-destructive\\/5:hover{background-color:color-mix(in oklab,var(--destructive) 5%,transparent)}}.hover\\:bg-destructive\\/10:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-destructive\\/10:hover{background-color:color-mix(in oklab,var(--destructive) 10%,transparent)}}.hover\\:bg-destructive\\/80:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-destructive\\/80:hover{background-color:color-mix(in oklab,var(--destructive) 80%,transparent)}}.hover\\:bg-destructive\\/90:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-destructive\\/90:hover{background-color:color-mix(in oklab,var(--destructive) 90%,transparent)}}.hover\\:bg-emerald-500\\/20:hover{background-color:#00bb7f33}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-emerald-500\\/20:hover{background-color:color-mix(in oklab,var(--color-emerald-500) 20%,transparent)}}.hover\\:bg-green-50:hover{background-color:var(--color-green-50)}.hover\\:bg-green-700:hover{background-color:var(--color-green-700)}.hover\\:bg-muted:hover,.hover\\:bg-muted\\/30:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/30:hover{background-color:color-mix(in oklab,var(--muted) 30%,transparent)}}.hover\\:bg-muted\\/40:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/40:hover{background-color:color-mix(in oklab,var(--muted) 40%,transparent)}}.hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab,var(--muted) 50%,transparent)}}.hover\\:bg-muted\\/60:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/60:hover{background-color:color-mix(in oklab,var(--muted) 60%,transparent)}}.hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab,var(--muted) 80%,transparent)}}.hover\\:bg-primary\\/5:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/5:hover{background-color:color-mix(in oklab,var(--primary) 5%,transparent)}}.hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab,var(--primary) 10%,transparent)}}.hover\\:bg-primary\\/15:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/15:hover{background-color:color-mix(in oklab,var(--primary) 15%,transparent)}}.hover\\:bg-primary\\/20:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/20:hover{background-color:color-mix(in oklab,var(--primary) 20%,transparent)}}.hover\\:bg-primary\\/80:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/80:hover{background-color:color-mix(in oklab,var(--primary) 80%,transparent)}}.hover\\:bg-primary\\/90:hover{background-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--primary) 90%,transparent)}}.hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab,var(--secondary) 80%,transparent)}}.hover\\:bg-transparent:hover{background-color:#0000}.hover\\:bg-white:hover{background-color:var(--color-white)}.hover\\:text-accent-foreground:hover{color:var(--accent-foreground)}.hover\\:text-blue-500:hover{color:var(--color-blue-500)}.hover\\:text-blue-600:hover{color:var(--color-blue-600)}.hover\\:text-destructive:hover{color:var(--destructive)}.hover\\:text-foreground:hover,.hover\\:text-foreground\\/80:hover{color:var(--foreground)}@supports (color:color-mix(in lab,red,red)){.hover\\:text-foreground\\/80:hover{color:color-mix(in oklab,var(--foreground) 80%,transparent)}}.hover\\:text-green-600:hover{color:var(--color-green-600)}.hover\\:text-green-700:hover{color:var(--color-green-700)}.hover\\:text-orange-500:hover{color:var(--color-orange-500)}.hover\\:text-primary:hover{color:var(--primary)}.hover\\:text-purple-600:hover{color:var(--color-purple-600)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-80:hover{opacity:.8}.hover\\:opacity-100:hover{opacity:1}.hover\\:shadow-lg:hover{--tw-shadow:var(--shadow-lg);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-md:hover{--tw-shadow:var(--shadow-md);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-sm:hover{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-xl:hover{--tw-shadow:var(--shadow-xl);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:shadow-primary\\/5:hover{--tw-shadow-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-primary\\/5:hover{--tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--primary) 5%, transparent) var(--tw-shadow-alpha), transparent)}}.hover\\:shadow-primary\\/30:hover{--tw-shadow-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:shadow-primary\\/30:hover{--tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--primary) 30%, transparent) var(--tw-shadow-alpha), transparent)}}.hover\\:ring-ring\\/50:hover{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.hover\\:ring-ring\\/50:hover{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}}.focus\\:border-primary\\/50:focus{border-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.focus\\:border-primary\\/50:focus{border-color:color-mix(in oklab,var(--primary) 50%,transparent)}}.focus\\:bg-accent:focus,.focus\\:bg-accent\\/80:focus{background-color:var(--accent)}@supports (color:color-mix(in lab,red,red)){.focus\\:bg-accent\\/80:focus{background-color:color-mix(in oklab,var(--accent) 80%,transparent)}}.focus\\:bg-destructive\\/10:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.focus\\:bg-destructive\\/10:focus{background-color:color-mix(in oklab,var(--destructive) 10%,transparent)}}.focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.focus\\:text-destructive:focus{color:var(--destructive)}.focus\\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-primary\\/20:focus{--tw-ring-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-primary\\/20:focus{--tw-ring-color:color-mix(in oklab, var(--primary) 20%, transparent)}}.focus\\:ring-primary\\/50:focus{--tw-ring-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-primary\\/50:focus{--tw-ring-color:color-mix(in oklab, var(--primary) 50%, transparent)}}.focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-destructive\\/30:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-destructive\\/30:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.focus-visible\\:ring-primary:focus-visible,.focus-visible\\:ring-primary\\/30:focus-visible{--tw-ring-color:var(--primary)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-primary\\/30:focus-visible{--tw-ring-color:color-mix(in oklab, var(--primary) 30%, transparent)}}.focus-visible\\:ring-ring:focus-visible,.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.active\\:scale-95:active{--tw-scale-x:95%;--tw-scale-y:95%;--tw-scale-z:95%;scale:var(--tw-scale-x) var(--tw-scale-y)}.active\\:scale-\\[0\\.97\\]:active{scale:.97}.active\\:cursor-grabbing:active{cursor:grabbing}.active\\:bg-accent:active{background-color:var(--accent)}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-40:disabled{opacity:.4}.disabled\\:opacity-50:disabled{opacity:.5}@media(hover:hover){.disabled\\:hover\\:bg-transparent:disabled:hover{background-color:#0000}}.has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--spacing) * 2.5)}.has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--spacing) * 4)}.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.data-\\[state\\=active\\]\\:bg-card[data-state=active]{background-color:var(--card)}.data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.data-\\[state\\=active\\]\\:text-primary[data-state=active]{color:var(--primary)}.data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[state\\=checked\\]\\:border-primary[data-state=checked]{border-color:var(--primary)}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--primary)}.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:var(--primary-foreground)}.data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity:0}.data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale:.95}.data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed]{--tw-exit-translate-x: -50% }.data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed]{--tw-exit-translate-y: -48% }.data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:var(--accent)}.data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:var(--muted-foreground)}.data-\\[state\\=open\\]\\:fade-in-0[data-state=open]{--tw-enter-opacity:0}.data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale:.95}.data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open]{--tw-enter-translate-x: -50% }.data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open]{--tw-enter-translate-y: -48% }.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.supports-\\[backdrop-filter\\]\\:bg-background\\/60{background-color:var(--background)}@supports (color:color-mix(in lab,red,red)){.supports-\\[backdrop-filter\\]\\:bg-background\\/60{background-color:color-mix(in oklab,var(--background) 60%,transparent)}}.supports-\\[backdrop-filter\\]\\:bg-card\\/80{background-color:var(--card)}@supports (color:color-mix(in lab,red,red)){.supports-\\[backdrop-filter\\]\\:bg-card\\/80{background-color:color-mix(in oklab,var(--card) 80%,transparent)}}}@media(min-width:40rem){.sm\\:col-span-2{grid-column:span 2/span 2}.sm\\:mt-0{margin-top:0}.sm\\:mt-6{margin-top:calc(var(--spacing) * 6)}.sm\\:mr-2{margin-right:calc(var(--spacing) * 2)}.sm\\:mb-4{margin-bottom:calc(var(--spacing) * 4)}.sm\\:mb-6{margin-bottom:calc(var(--spacing) * 6)}.sm\\:block{display:block}.sm\\:flex{display:flex}.sm\\:hidden{display:none}.sm\\:inline{display:inline}.sm\\:inline-flex{display:inline-flex}.sm\\:h-3\\.5{height:calc(var(--spacing) * 3.5)}.sm\\:h-4{height:calc(var(--spacing) * 4)}.sm\\:h-5{height:calc(var(--spacing) * 5)}.sm\\:h-7{height:calc(var(--spacing) * 7)}.sm\\:h-8{height:calc(var(--spacing) * 8)}.sm\\:h-10{height:calc(var(--spacing) * 10)}.sm\\:h-auto{height:auto}.sm\\:max-h-\\[90vh\\]{max-height:90vh}.sm\\:w-3\\.5{width:calc(var(--spacing) * 3.5)}.sm\\:w-4{width:calc(var(--spacing) * 4)}.sm\\:w-5{width:calc(var(--spacing) * 5)}.sm\\:w-7{width:calc(var(--spacing) * 7)}.sm\\:w-8{width:calc(var(--spacing) * 8)}.sm\\:w-10{width:calc(var(--spacing) * 10)}.sm\\:w-64{width:calc(var(--spacing) * 64)}.sm\\:w-100{width:calc(var(--spacing) * 100)}.sm\\:w-auto{width:auto}.sm\\:max-w-\\[200px\\]{max-width:200px}.sm\\:max-w-\\[300px\\]{max-width:300px}.sm\\:max-w-\\[500px\\]{max-width:500px}.sm\\:max-w-\\[600px\\]{max-width:600px}.sm\\:max-w-\\[900px\\]{max-width:900px}.sm\\:max-w-md{max-width:var(--container-md)}.sm\\:max-w-none{max-width:none}.sm\\:scale-175{--tw-scale-x:175%;--tw-scale-y:175%;--tw-scale-z:175%;scale:var(--tw-scale-x) var(--tw-scale-y)}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:items-center{align-items:center}.sm\\:justify-between{justify-content:space-between}.sm\\:justify-end{justify-content:flex-end}.sm\\:justify-start{justify-content:flex-start}.sm\\:gap-0{gap:0}.sm\\:gap-2{gap:calc(var(--spacing) * 2)}.sm\\:gap-3{gap:calc(var(--spacing) * 3)}.sm\\:gap-4{gap:calc(var(--spacing) * 4)}:where(.sm\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.sm\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.sm\\:rounded-lg{border-radius:var(--radius)}.sm\\:rounded-xl{border-radius:calc(var(--radius) + 4px)}.sm\\:border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.sm\\:p-4{padding:calc(var(--spacing) * 4)}.sm\\:p-6{padding:calc(var(--spacing) * 6)}.sm\\:p-7{padding:calc(var(--spacing) * 7)}.sm\\:px-2{padding-inline:calc(var(--spacing) * 2)}.sm\\:px-3{padding-inline:calc(var(--spacing) * 3)}.sm\\:px-6{padding-inline:calc(var(--spacing) * 6)}.sm\\:py-2{padding-block:calc(var(--spacing) * 2)}.sm\\:py-4{padding-block:calc(var(--spacing) * 4)}.sm\\:pt-6{padding-top:calc(var(--spacing) * 6)}.sm\\:pl-4{padding-left:calc(var(--spacing) * 4)}.sm\\:text-left{text-align:left}.sm\\:text-right{text-align:right}.sm\\:text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.sm\\:text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.sm\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.sm\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.sm\\:text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.sm\\:text-xs\\!{font-size:var(--text-xs)!important;line-height:var(--tw-leading,var(--text-xs--line-height))!important}}@media(min-width:48rem){.md\\:relative{position:relative}.md\\:bottom-auto{bottom:auto}.md\\:left-auto{left:auto}.md\\:col-span-2{grid-column:span 2/span 2}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:inline-flex{display:inline-flex}.md\\:h-screen{height:100vh}.md\\:max-h-\\[calc\\(100vh-6rem\\)\\]{max-height:calc(100vh - 6rem)}.md\\:max-w-none{max-width:none}.md\\:translate-x-0{--tw-translate-x:0;translate:var(--tw-translate-x) var(--tw-translate-y)}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:flex-col{flex-direction:column}.md\\:gap-1{gap:var(--spacing)}.md\\:overflow-hidden{overflow:hidden}.md\\:overflow-y-auto{overflow-y:auto}.md\\:p-2{padding:calc(var(--spacing) * 2)}.md\\:p-5{padding:calc(var(--spacing) * 5)}.md\\:p-6{padding:calc(var(--spacing) * 6)}.md\\:px-6{padding-inline:calc(var(--spacing) * 6)}.md\\:pt-6{padding-top:calc(var(--spacing) * 6)}.md\\:pb-4{padding-bottom:calc(var(--spacing) * 4)}.md\\:pb-10{padding-bottom:calc(var(--spacing) * 10)}.md\\:pl-4{padding-left:calc(var(--spacing) * 4)}.md\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}@media(min-width:64rem){.lg\\:sticky{position:sticky}.lg\\:top-4{top:calc(var(--spacing) * 4)}.lg\\:flex{display:flex}.lg\\:w-64{width:calc(var(--spacing) * 64)}.lg\\:w-auto{width:auto}.lg\\:max-w-\\[1000px\\]{max-width:1000px}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:items-center{align-items:center}.lg\\:p-8{padding:calc(var(--spacing) * 8)}.lg\\:pb-4{padding-bottom:calc(var(--spacing) * 4)}}@media(min-width:80rem){.xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}.dark\\:border-red-900\\/30:is(.dark *,html.dark *){border-color:#82181a4d}@supports (color:color-mix(in lab,red,red)){.dark\\:border-red-900\\/30:is(.dark *,html.dark *){border-color:color-mix(in oklab,var(--color-red-900) 30%,transparent)}}.dark\\:border-l-blue-500:is(.dark *,html.dark *){border-left-color:var(--color-blue-500)}.dark\\:border-l-green-500:is(.dark *,html.dark *){border-left-color:var(--color-green-500)}.dark\\:bg-blue-900\\/30:is(.dark *,html.dark *){background-color:#1c398e4d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-blue-900\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-blue-900) 30%,transparent)}}.dark\\:bg-blue-950\\/30:is(.dark *,html.dark *){background-color:#1624564d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-blue-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-blue-950) 30%,transparent)}}.dark\\:bg-cyan-950\\/30:is(.dark *,html.dark *){background-color:#0533454d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-cyan-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-cyan-950) 30%,transparent)}}.dark\\:bg-destructive\\/20:is(.dark *,html.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-destructive\\/20:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--destructive) 20%,transparent)}}.dark\\:bg-gray-950\\/30:is(.dark *,html.dark *){background-color:#0307124d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-gray-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-gray-950) 30%,transparent)}}.dark\\:bg-green-500\\/20:is(.dark *,html.dark *){background-color:#00c75833}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-green-500\\/20:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-green-500) 20%,transparent)}}.dark\\:bg-green-900\\/30:is(.dark *,html.dark *){background-color:#0d542b4d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-green-900\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-green-900) 30%,transparent)}}.dark\\:bg-green-950\\/30:is(.dark *,html.dark *){background-color:#032e154d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-green-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-green-950) 30%,transparent)}}.dark\\:bg-orange-900\\/30:is(.dark *,html.dark *){background-color:#7e2a0c4d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-orange-900\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-orange-900) 30%,transparent)}}.dark\\:bg-orange-950\\/30:is(.dark *,html.dark *){background-color:#4413064d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-orange-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-orange-950) 30%,transparent)}}.dark\\:bg-purple-950\\/30:is(.dark *,html.dark *){background-color:#3c03664d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-purple-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-purple-950) 30%,transparent)}}.dark\\:bg-red-950\\/20:is(.dark *,html.dark *){background-color:#46080933}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-red-950\\/20:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-red-950) 20%,transparent)}}.dark\\:bg-red-950\\/30:is(.dark *,html.dark *){background-color:#4608094d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-red-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-red-950) 30%,transparent)}}.dark\\:bg-teal-950\\/30:is(.dark *,html.dark *){background-color:#022f2e4d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-teal-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-teal-950) 30%,transparent)}}.dark\\:bg-yellow-950\\/30:is(.dark *,html.dark *){background-color:#4320044d}@supports (color:color-mix(in lab,red,red)){.dark\\:bg-yellow-950\\/30:is(.dark *,html.dark *){background-color:color-mix(in oklab,var(--color-yellow-950) 30%,transparent)}}.dark\\:text-amber-400:is(.dark *,html.dark *){color:var(--color-amber-400)}.dark\\:text-blue-300:is(.dark *,html.dark *){color:var(--color-blue-300)}.dark\\:text-blue-400:is(.dark *,html.dark *){color:var(--color-blue-400)}.dark\\:text-green-400:is(.dark *,html.dark *){color:var(--color-green-400)}.dark\\:text-orange-400:is(.dark *,html.dark *){color:var(--color-orange-400)}.dark\\:text-red-400:is(.dark *,html.dark *){color:var(--color-red-400)}.\\[\\&_\\.cm-editor\\]\\:h-full .cm-editor,.\\[\\&_\\.cm-gutters\\]\\:h-full .cm-gutters{height:100%}.\\[\\&_\\.cm-scroller\\]\\:overflow-auto .cm-scroller{overflow:auto}.\\[\\&_\\.hljs-attr\\]\\:text-amber-300 .hljs-attr{color:var(--color-amber-300)}.\\[\\&_\\.hljs-attr\\]\\:text-amber-700 .hljs-attr{color:var(--color-amber-700)}.\\[\\&_\\.hljs-built_in\\]\\:text-purple-700 .hljs-built in{color:var(--color-purple-700)}.\\[\\&_\\.hljs-built_in\\]\\:text-violet-300 .hljs-built in{color:var(--color-violet-300)}.\\[\\&_\\.hljs-comment\\]\\:text-zinc-500 .hljs-comment{color:var(--color-zinc-500)}.\\[\\&_\\.hljs-keyword\\]\\:text-blue-600 .hljs-keyword{color:var(--color-blue-600)}.\\[\\&_\\.hljs-keyword\\]\\:text-sky-300 .hljs-keyword{color:var(--color-sky-300)}.\\[\\&_\\.hljs-literal\\]\\:text-blue-600 .hljs-literal{color:var(--color-blue-600)}.\\[\\&_\\.hljs-literal\\]\\:text-sky-300 .hljs-literal{color:var(--color-sky-300)}.\\[\\&_\\.hljs-name\\]\\:text-emerald-300 .hljs-name{color:var(--color-emerald-300)}.\\[\\&_\\.hljs-name\\]\\:text-green-700 .hljs-name{color:var(--color-green-700)}.\\[\\&_\\.hljs-number\\]\\:text-fuchsia-300 .hljs-number{color:var(--color-fuchsia-300)}.\\[\\&_\\.hljs-number\\]\\:text-purple-700 .hljs-number{color:var(--color-purple-700)}.\\[\\&_\\.hljs-quote\\]\\:text-zinc-500 .hljs-quote{color:var(--color-zinc-500)}.\\[\\&_\\.hljs-section\\]\\:text-emerald-300 .hljs-section{color:var(--color-emerald-300)}.\\[\\&_\\.hljs-section\\]\\:text-green-700 .hljs-section{color:var(--color-green-700)}.\\[\\&_\\.hljs-selector-tag\\]\\:text-blue-600 .hljs-selector-tag{color:var(--color-blue-600)}.\\[\\&_\\.hljs-selector-tag\\]\\:text-sky-300 .hljs-selector-tag{color:var(--color-sky-300)}.\\[\\&_\\.hljs-string\\]\\:text-amber-300 .hljs-string{color:var(--color-amber-300)}.\\[\\&_\\.hljs-string\\]\\:text-amber-700 .hljs-string{color:var(--color-amber-700)}.\\[\\&_\\.hljs-template-tag\\]\\:text-amber-300 .hljs-template-tag{color:var(--color-amber-300)}.\\[\\&_\\.hljs-template-tag\\]\\:text-amber-700 .hljs-template-tag{color:var(--color-amber-700)}.\\[\\&_\\.hljs-title\\]\\:text-emerald-300 .hljs-title{color:var(--color-emerald-300)}.\\[\\&_\\.hljs-title\\]\\:text-green-700 .hljs-title{color:var(--color-green-700)}.\\[\\&_\\.hljs-type\\]\\:text-purple-700 .hljs-type{color:var(--color-purple-700)}.\\[\\&_\\.hljs-type\\]\\:text-violet-300 .hljs-type{color:var(--color-violet-300)}.\\[\\&_code\\]\\:block code{display:block}.\\[\\&_code\\]\\:leading-6 code{--tw-leading:calc(var(--spacing) * 6);line-height:calc(var(--spacing) * 6)}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:0}.\\[\\&\\>span\\]\\:line-clamp-1>span{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.\\[\\&\\>svg\\]\\:h-auto>svg{height:auto}.\\[\\&\\>svg\\]\\:max-w-full>svg{max-width:100%}.\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}[data-sonner-toaster]{z-index:100000!important}:root,:root[data-color-scheme=default]{--background:#fff;--foreground:#34322d;--card:#fff;--card-foreground:#34322d;--popover:#fff;--popover-foreground:#34322d;--primary:#34322d;--primary-foreground:#fff;--secondary:#f3f3f3;--secondary-foreground:#34322d;--muted:#f3f3f3;--muted-foreground:#858481;--accent:#f3f3f3;--accent-foreground:#34322d;--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(97.96% .0101 32.5158);--border:#0000001f;--input:#0000001f;--ring:#34322d;--chart-1:#34322d;--chart-2:#5c5a56;--chart-3:#858481;--chart-4:#adacaa;--chart-5:#d6d5d4;--sidebar:#fbfbfb;--sidebar-foreground:#34322d;--sidebar-primary:#34322d;--sidebar-primary-foreground:#fff;--sidebar-accent:#f3f3f3;--sidebar-accent-foreground:#34322d;--sidebar-border:#00000014;--sidebar-ring:#34322d;--glow-1:#34322d1a;--glow-2:#8584811a;--radius:.5rem;--shadow-x:0;--shadow-y:1px;--shadow-blur:3px;--shadow-spread:0px;--shadow-opacity:.1;--shadow-color:#000;--shadow-2xs:0 1px 3px 0px #0000000d;--shadow-xs:0 1px 3px 0px #0000000d;--shadow-sm:0 1px 3px 0px #0000001a, 0 1px 2px -1px #0000001a;--shadow:0 1px 3px 0px #0000001a, 0 1px 2px -1px #0000001a;--shadow-md:0 1px 3px 0px #0000001a, 0 2px 4px -1px #0000001a;--shadow-lg:0 1px 3px 0px #0000001a, 0 4px 6px -1px #0000001a;--shadow-xl:0 1px 3px 0px #0000001a, 0 8px 10px -1px #0000001a;--shadow-2xl:0 1px 3px 0px #00000040;--tracking-normal:0em;--spacing:.25rem}:root[data-color-scheme=green]{--background:oklch(93.31% .0081 98.8844);--foreground:oklch(35.14% .025 84.4589);--card:oklch(98.91% .0017 325.59);--card-foreground:oklch(35.14% .025 84.4589);--popover:oklch(97.96% .0057 84.5661);--popover-foreground:oklch(35.14% .025 84.4589);--primary:oklch(20% 0 0);--primary-foreground:oklch(98% 0 0);--secondary:oklch(92.04% .0149 98.297);--secondary-foreground:oklch(40.06% .0305 86.8158);--muted:oklch(93.99% .0124 91.5213);--muted-foreground:oklch(51.92% .0198 84.5869);--accent:oklch(68% .1103 148.083);--accent-foreground:oklch(97.92% .0091 150.693);--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(97.96% .0101 32.5158);--border:oklch(87.95% .0142 88.6926);--input:oklch(87.95% .0142 88.6926);--ring:oklch(20% 0 0);--chart-1:oklch(68.09% .1201 145.043);--chart-2:oklch(61.95% .11 147.856);--chart-3:oklch(56.05% .1006 149.757);--chart-4:oklch(50.06% .0903 151.802);--chart-5:oklch(43.88% .0792 155.555);--sidebar:oklch(98.91% .0017 325.59);--sidebar-foreground:oklch(35.14% .025 84.4589);--sidebar-primary:oklch(88.16% .0425 82.469);--sidebar-primary-foreground:oklch(0% 0 0);--sidebar-accent:oklch(96.89% .0079 73.7443);--sidebar-accent-foreground:oklch(97.92% .0091 150.693);--sidebar-border:oklch(87.95% .0142 88.6926);--sidebar-ring:oklch(62.05% .1199 144.861);--glow-1:oklch(50% 0 0);--glow-2:oklch(70% 0 0)}:root[data-color-scheme=blue]{--background:oklch(98.46% .0017 247.84);--foreground:oklch(20.8% .034 264.665);--card:oklch(100% 0 0);--card-foreground:oklch(20.8% .034 264.665);--popover:oklch(100% 0 0);--popover-foreground:oklch(20.8% .034 264.665);--primary:oklch(20.5% 0 0);--primary-foreground:oklch(98.5% 0 0);--secondary:oklch(93.2% .032 255.585);--secondary-foreground:oklch(20.8% .034 264.665);--muted:oklch(96% .002 247.84);--muted-foreground:oklch(55.2% .014 255.6);--accent:oklch(93.2% .032 255.585);--accent-foreground:oklch(48.8% .243 264.376);--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(97.96% .0101 32.5158);--border:oklch(89.8% .005 255.6);--input:oklch(89.8% .005 255.6);--ring:oklch(54.6% .245 262.881);--chart-1:oklch(54.6% .245 262.881);--chart-2:oklch(59.6% .2 262.881);--chart-3:oklch(64.6% .15 262.881);--chart-4:oklch(69.6% .1 262.881);--chart-5:oklch(74.6% .05 262.881);--sidebar:oklch(98.46% .0017 247.84);--sidebar-foreground:oklch(20.8% .034 264.665);--sidebar-primary:oklch(54.6% .245 262.881);--sidebar-primary-foreground:oklch(98.5% 0 0);--sidebar-accent:oklch(93.2% .032 255.585);--sidebar-accent-foreground:oklch(48.8% .243 264.376);--sidebar-border:oklch(89.8% .005 255.6);--sidebar-ring:oklch(54.6% .245 262.881);--glow-1:oklch(54.6% .245 262.881);--glow-2:oklch(60% .2 280)}:root[data-color-scheme=sky-blue]{--background:oklch(95% .012 220);--foreground:oklch(30% .03 230);--card:oklch(98.5% .008 220);--card-foreground:oklch(30% .03 230);--popover:oklch(98% .01 220);--popover-foreground:oklch(30% .03 230);--primary:oklch(72% .08 220);--primary-foreground:oklch(98% .01 220);--secondary:oklch(92% .02 220);--secondary-foreground:oklch(35% .035 230);--muted:oklch(94% .015 220);--muted-foreground:oklch(50% .025 230);--accent:oklch(75% .09 210);--accent-foreground:oklch(98% .01 220);--border:oklch(86% .02 220);--input:oklch(86% .02 220);--ring:oklch(72% .08 220);--chart-1:oklch(75% .09 220);--chart-2:oklch(68% .08 225);--chart-3:oklch(61% .07 230);--chart-4:oklch(54% .06 235);--chart-5:oklch(47% .05 240);--sidebar:oklch(98.5% .008 220);--sidebar-foreground:oklch(30% .03 230);--sidebar-primary:oklch(85% .05 220);--sidebar-primary-foreground:oklch(15% .02 230);--sidebar-accent:oklch(96% .012 220);--sidebar-accent-foreground:oklch(98% .01 220);--sidebar-border:oklch(86% .02 220);--sidebar-ring:oklch(72% .08 220);--glow-1:oklch(72% .08 220);--glow-2:oklch(75% .09 200)}:root[data-color-scheme=purple]{--background:oklch(95% .015 290);--foreground:oklch(30% .035 280);--card:oklch(98.5% .01 290);--card-foreground:oklch(30% .035 280);--popover:oklch(98% .012 290);--popover-foreground:oklch(30% .035 280);--primary:oklch(65% .15 280);--primary-foreground:oklch(98% .01 290);--secondary:oklch(92% .025 290);--secondary-foreground:oklch(35% .04 280);--muted:oklch(94% .018 290);--muted-foreground:oklch(50% .03 280);--accent:oklch(70% .14 275);--accent-foreground:oklch(98% .01 290);--border:oklch(86% .025 290);--input:oklch(86% .025 290);--ring:oklch(65% .15 280);--chart-1:oklch(70% .14 280);--chart-2:oklch(63% .13 285);--chart-3:oklch(56% .12 290);--chart-4:oklch(49% .11 295);--chart-5:oklch(42% .1 300);--sidebar:oklch(98.5% .01 290);--sidebar-foreground:oklch(30% .035 280);--sidebar-primary:oklch(85% .06 290);--sidebar-primary-foreground:oklch(15% .025 280);--sidebar-accent:oklch(96% .015 290);--sidebar-accent-foreground:oklch(98% .01 290);--sidebar-border:oklch(86% .025 290);--sidebar-ring:oklch(65% .15 280);--glow-1:oklch(65% .15 280);--glow-2:oklch(70% .12 300)}:root[data-color-scheme=orange]{--background:oklch(95% .015 60);--foreground:oklch(30% .035 50);--card:oklch(98.5% .01 60);--card-foreground:oklch(30% .035 50);--popover:oklch(98% .012 60);--popover-foreground:oklch(30% .035 50);--primary:oklch(70% .15 50);--primary-foreground:oklch(98% .01 60);--secondary:oklch(92% .025 60);--secondary-foreground:oklch(35% .04 50);--muted:oklch(94% .018 60);--muted-foreground:oklch(50% .03 50);--accent:oklch(75% .14 45);--accent-foreground:oklch(98% .01 60);--border:oklch(86% .025 60);--input:oklch(86% .025 60);--ring:oklch(70% .15 50);--chart-1:oklch(75% .14 50);--chart-2:oklch(68% .13 55);--chart-3:oklch(61% .12 60);--chart-4:oklch(54% .11 65);--chart-5:oklch(47% .1 70);--sidebar:oklch(98.5% .01 60);--sidebar-foreground:oklch(30% .035 50);--sidebar-primary:oklch(85% .06 60);--sidebar-primary-foreground:oklch(15% .025 50);--sidebar-accent:oklch(96% .015 60);--sidebar-accent-foreground:oklch(98% .01 60);--sidebar-border:oklch(86% .025 60);--sidebar-ring:oklch(70% .15 50);--glow-1:oklch(70% .15 50);--glow-2:oklch(75% .12 35)}:root[data-color-scheme=rose]{--background:oklch(95% .015 10);--foreground:oklch(30% .035 5);--card:oklch(98.5% .01 10);--card-foreground:oklch(30% .035 5);--popover:oklch(98% .012 10);--popover-foreground:oklch(30% .035 5);--primary:oklch(65% .15 10);--primary-foreground:oklch(98% .01 10);--secondary:oklch(92% .025 10);--secondary-foreground:oklch(35% .04 5);--muted:oklch(94% .018 10);--muted-foreground:oklch(50% .03 5);--accent:oklch(70% .14 5);--accent-foreground:oklch(98% .01 10);--border:oklch(86% .025 10);--input:oklch(86% .025 10);--ring:oklch(65% .15 10);--chart-1:oklch(70% .14 10);--chart-2:oklch(63% .13 15);--chart-3:oklch(56% .12 20);--chart-4:oklch(49% .11 25);--chart-5:oklch(42% .1 30);--sidebar:oklch(98.5% .01 10);--sidebar-foreground:oklch(30% .035 5);--sidebar-primary:oklch(85% .06 10);--sidebar-primary-foreground:oklch(15% .025 5);--sidebar-accent:oklch(96% .015 10);--sidebar-accent-foreground:oklch(98% .01 10);--sidebar-border:oklch(86% .025 10);--sidebar-ring:oklch(65% .15 10);--glow-1:oklch(65% .15 10);--glow-2:oklch(70% .12 350)}:root[data-color-scheme=teal]{--background:oklch(95% .015 175);--foreground:oklch(30% .035 180);--card:oklch(98.5% .01 175);--card-foreground:oklch(30% .035 180);--popover:oklch(98% .012 175);--popover-foreground:oklch(30% .035 180);--primary:oklch(70% .12 175);--primary-foreground:oklch(98% .01 175);--secondary:oklch(92% .025 175);--secondary-foreground:oklch(35% .04 180);--muted:oklch(94% .018 175);--muted-foreground:oklch(50% .03 180);--accent:oklch(75% .11 170);--accent-foreground:oklch(98% .01 175);--border:oklch(86% .025 175);--input:oklch(86% .025 175);--ring:oklch(70% .12 175);--chart-1:oklch(75% .11 175);--chart-2:oklch(68% .1 180);--chart-3:oklch(61% .09 185);--chart-4:oklch(54% .08 190);--chart-5:oklch(47% .07 195);--sidebar:oklch(98.5% .01 175);--sidebar-foreground:oklch(30% .035 180);--sidebar-primary:oklch(85% .06 175);--sidebar-primary-foreground:oklch(15% .025 180);--sidebar-accent:oklch(96% .015 175);--sidebar-accent-foreground:oklch(98% .01 175);--sidebar-border:oklch(86% .025 175);--sidebar-ring:oklch(70% .12 175);--glow-1:oklch(70% .12 175);--glow-2:oklch(75% .1 190)}html.dark[data-color-scheme=default],.dark[data-color-scheme=default]{--background:#1a1a1a;--foreground:#ededed;--card:#1a1a1a;--card-foreground:#ededed;--popover:#1a1a1a;--popover-foreground:#ededed;--primary:#ededed;--primary-foreground:#1a1a1a;--secondary:#2a2a2a;--secondary-foreground:#ededed;--muted:#2a2a2a;--muted-foreground:#a1a1a1;--accent:#2a2a2a;--accent-foreground:#ededed;--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(94.96% .0101 32.5162);--border:#ffffff1f;--input:#ffffff1f;--ring:#ededed;--chart-1:#ededed;--chart-2:#c7c7c7;--chart-3:#a1a1a1;--chart-4:#7b7b7b;--chart-5:#555;--sidebar:#1f1f1f;--sidebar-foreground:#ededed;--sidebar-primary:#ededed;--sidebar-primary-foreground:#1a1a1a;--sidebar-accent:#2a2a2a;--sidebar-accent-foreground:#ededed;--sidebar-border:#ffffff14;--sidebar-ring:#ededed;--glow-1:#ededed1a;--glow-2:#a1a1a11a}html.dark,.dark,html.dark[data-color-scheme=green],.dark[data-color-scheme=green]{--background:oklch(28.09% .0264 153.404);--foreground:oklch(92% .0104 81.7947);--card:oklch(31.96% .0217 150.339);--card-foreground:oklch(92% .0104 81.7947);--popover:oklch(31.96% .0217 150.339);--popover-foreground:oklch(92% .0104 81.7947);--primary:oklch(69.9% .1292 144.873);--primary-foreground:oklch(22.14% .0312 149.621);--secondary:oklch(37.83% .02 147.987);--secondary-foreground:oklch(88.01% .0117 84.5809);--muted:oklch(34.03% .0192 151.125);--muted-foreground:oklch(68.01% .0151 88.7221);--accent:oklch(74.09% .1207 147.975);--accent-foreground:oklch(21.89% .0281 148.509);--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(94.96% .0101 32.5162);--border:oklch(40.06% .021 145.17);--input:oklch(40.06% .021 145.17);--ring:oklch(69.9% .1292 144.873);--chart-1:oklch(76.03% .1309 144.994);--chart-2:oklch(70.08% .12 147.875);--chart-3:oklch(66.66% .1099 150);--chart-4:oklch(57.95% .0999 151.837);--chart-5:oklch(51.99% .0893 155.145);--sidebar:oklch(25.93% .0275 159.089);--sidebar-foreground:oklch(92% .0104 81.7947);--sidebar-primary:oklch(69.9% .1292 144.873);--sidebar-primary-foreground:oklch(22.14% .0312 149.621);--sidebar-accent:oklch(74.09% .1207 147.975);--sidebar-accent-foreground:oklch(21.89% .0281 148.509);--sidebar-border:oklch(40.06% .021 145.17);--sidebar-ring:oklch(69.9% .1292 144.873);--glow-1:oklch(40% .15 145);--glow-2:oklch(45% .12 160);--radius:.5rem;--shadow-x:0;--shadow-y:1px;--shadow-blur:3px;--shadow-spread:0px;--shadow-opacity:.1;--shadow-color:#000;--shadow-2xs:0 1px 3px 0px #0000000d;--shadow-xs:0 1px 3px 0px #0000000d;--shadow-sm:0 1px 3px 0px #0000001a, 0 1px 2px -1px #0000001a;--shadow:0 1px 3px 0px #0000001a, 0 1px 2px -1px #0000001a;--shadow-md:0 1px 3px 0px #0000001a, 0 2px 4px -1px #0000001a;--shadow-lg:0 1px 3px 0px #0000001a, 0 4px 6px -1px #0000001a;--shadow-xl:0 1px 3px 0px #0000001a, 0 8px 10px -1px #0000001a;--shadow-2xl:0 1px 3px 0px #00000040}html.dark[data-color-scheme=blue],.dark[data-color-scheme=blue]{--background:oklch(18% .03 263);--foreground:oklch(92% .01 263);--card:oklch(20% .03 263);--card-foreground:oklch(92% .01 263);--popover:oklch(20% .03 263);--popover-foreground:oklch(92% .01 263);--primary:oklch(60% .2 263);--primary-foreground:oklch(18% .03 263);--secondary:oklch(25% .03 263);--secondary-foreground:oklch(90% .01 263);--muted:oklch(25% .03 263);--muted-foreground:oklch(70% .02 263);--accent:oklch(25% .03 263);--accent-foreground:oklch(90% .01 263);--destructive:oklch(57.87% .15 34.8321);--destructive-foreground:oklch(94.96% .0101 32.5162);--border:oklch(30% .03 263);--input:oklch(30% .03 263);--ring:oklch(60% .2 263);--chart-1:oklch(60% .2 263);--chart-2:oklch(55% .18 263);--chart-3:oklch(50% .16 263);--chart-4:oklch(45% .14 263);--chart-5:oklch(40% .12 263);--sidebar:oklch(18% .03 263);--sidebar-foreground:oklch(92% .01 263);--sidebar-primary:oklch(60% .2 263);--sidebar-primary-foreground:oklch(18% .03 263);--sidebar-accent:oklch(25% .03 263);--sidebar-accent-foreground:oklch(90% .01 263);--sidebar-border:oklch(30% .03 263);--sidebar-ring:oklch(60% .2 263);--glow-1:oklch(40% .2 263);--glow-2:oklch(45% .15 280)}html.dark[data-color-scheme=sky-blue],.dark[data-color-scheme=sky-blue]{--background:oklch(22% .03 220);--foreground:oklch(92% .015 220);--card:oklch(26% .025 220);--card-foreground:oklch(92% .015 220);--popover:oklch(26% .025 220);--popover-foreground:oklch(92% .015 220);--primary:oklch(72% .08 220);--primary-foreground:oklch(18% .02 220);--secondary:oklch(32% .03 220);--secondary-foreground:oklch(88% .015 220);--muted:oklch(28% .025 220);--muted-foreground:oklch(68% .02 220);--accent:oklch(75% .09 210);--accent-foreground:oklch(18% .02 220);--border:oklch(35% .03 220);--input:oklch(35% .03 220);--ring:oklch(72% .08 220);--chart-1:oklch(75% .09 220);--chart-2:oklch(68% .08 225);--chart-3:oklch(61% .07 230);--chart-4:oklch(54% .06 235);--chart-5:oklch(47% .05 240);--sidebar:oklch(20% .032 220);--sidebar-foreground:oklch(92% .015 220);--sidebar-primary:oklch(72% .08 220);--sidebar-primary-foreground:oklch(18% .02 220);--sidebar-accent:oklch(75% .09 210);--sidebar-accent-foreground:oklch(18% .02 220);--sidebar-border:oklch(35% .03 220);--sidebar-ring:oklch(72% .08 220);--glow-1:oklch(45% .1 220);--glow-2:oklch(50% .08 200)}html.dark[data-color-scheme=purple],.dark[data-color-scheme=purple]{--background:oklch(22% .035 280);--foreground:oklch(92% .018 290);--card:oklch(26% .03 280);--card-foreground:oklch(92% .018 290);--popover:oklch(26% .03 280);--popover-foreground:oklch(92% .018 290);--primary:oklch(65% .15 280);--primary-foreground:oklch(18% .025 280);--secondary:oklch(32% .035 280);--secondary-foreground:oklch(88% .018 290);--muted:oklch(28% .03 280);--muted-foreground:oklch(68% .025 290);--accent:oklch(70% .14 275);--accent-foreground:oklch(18% .025 280);--border:oklch(35% .035 280);--input:oklch(35% .035 280);--ring:oklch(65% .15 280);--chart-1:oklch(70% .14 280);--chart-2:oklch(63% .13 285);--chart-3:oklch(56% .12 290);--chart-4:oklch(49% .11 295);--chart-5:oklch(42% .1 300);--sidebar:oklch(20% .038 280);--sidebar-foreground:oklch(92% .018 290);--sidebar-primary:oklch(65% .15 280);--sidebar-primary-foreground:oklch(18% .025 280);--sidebar-accent:oklch(70% .14 275);--sidebar-accent-foreground:oklch(18% .025 280);--sidebar-border:oklch(35% .035 280);--sidebar-ring:oklch(65% .15 280);--glow-1:oklch(40% .18 280);--glow-2:oklch(45% .15 300)}html.dark[data-color-scheme=orange],.dark[data-color-scheme=orange]{--background:oklch(22% .035 50);--foreground:oklch(92% .018 60);--card:oklch(26% .03 50);--card-foreground:oklch(92% .018 60);--popover:oklch(26% .03 50);--popover-foreground:oklch(92% .018 60);--primary:oklch(70% .15 50);--primary-foreground:oklch(18% .025 50);--secondary:oklch(32% .035 50);--secondary-foreground:oklch(88% .018 60);--muted:oklch(28% .03 50);--muted-foreground:oklch(68% .025 60);--accent:oklch(75% .14 45);--accent-foreground:oklch(18% .025 50);--border:oklch(35% .035 50);--input:oklch(35% .035 50);--ring:oklch(70% .15 50);--chart-1:oklch(75% .14 50);--chart-2:oklch(68% .13 55);--chart-3:oklch(61% .12 60);--chart-4:oklch(54% .11 65);--chart-5:oklch(47% .1 70);--sidebar:oklch(20% .038 50);--sidebar-foreground:oklch(92% .018 60);--sidebar-primary:oklch(70% .15 50);--sidebar-primary-foreground:oklch(18% .025 50);--sidebar-accent:oklch(75% .14 45);--sidebar-accent-foreground:oklch(18% .025 50);--sidebar-border:oklch(35% .035 50);--sidebar-ring:oklch(70% .15 50);--glow-1:oklch(45% .18 50);--glow-2:oklch(50% .15 35)}html.dark[data-color-scheme=rose],.dark[data-color-scheme=rose]{--background:oklch(22% .035 5);--foreground:oklch(92% .018 10);--card:oklch(26% .03 5);--card-foreground:oklch(92% .018 10);--popover:oklch(26% .03 5);--popover-foreground:oklch(92% .018 10);--primary:oklch(65% .15 10);--primary-foreground:oklch(18% .025 5);--secondary:oklch(32% .035 5);--secondary-foreground:oklch(88% .018 10);--muted:oklch(28% .03 5);--muted-foreground:oklch(68% .025 10);--accent:oklch(70% .14 5);--accent-foreground:oklch(18% .025 5);--border:oklch(35% .035 5);--input:oklch(35% .035 5);--ring:oklch(65% .15 10);--chart-1:oklch(70% .14 10);--chart-2:oklch(63% .13 15);--chart-3:oklch(56% .12 20);--chart-4:oklch(49% .11 25);--chart-5:oklch(42% .1 30);--sidebar:oklch(20% .038 5);--sidebar-foreground:oklch(92% .018 10);--sidebar-primary:oklch(65% .15 10);--sidebar-primary-foreground:oklch(18% .025 5);--sidebar-accent:oklch(70% .14 5);--sidebar-accent-foreground:oklch(18% .025 5);--sidebar-border:oklch(35% .035 5);--sidebar-ring:oklch(65% .15 10);--glow-1:oklch(40% .18 10);--glow-2:oklch(45% .15 350)}html.dark[data-color-scheme=teal],.dark[data-color-scheme=teal]{--background:oklch(22% .035 175);--foreground:oklch(92% .018 175);--card:oklch(26% .03 175);--card-foreground:oklch(92% .018 175);--popover:oklch(26% .03 175);--popover-foreground:oklch(92% .018 175);--primary:oklch(70% .12 175);--primary-foreground:oklch(18% .025 175);--secondary:oklch(32% .035 175);--secondary-foreground:oklch(88% .018 175);--muted:oklch(28% .03 175);--muted-foreground:oklch(68% .025 175);--accent:oklch(75% .11 170);--accent-foreground:oklch(18% .025 175);--border:oklch(35% .035 175);--input:oklch(35% .035 175);--ring:oklch(70% .12 175);--chart-1:oklch(75% .11 175);--chart-2:oklch(68% .1 180);--chart-3:oklch(61% .09 185);--chart-4:oklch(54% .08 190);--chart-5:oklch(47% .07 195);--sidebar:oklch(20% .038 175);--sidebar-foreground:oklch(92% .018 175);--sidebar-primary:oklch(70% .12 175);--sidebar-primary-foreground:oklch(18% .025 175);--sidebar-accent:oklch(75% .11 170);--sidebar-accent-foreground:oklch(18% .025 175);--sidebar-border:oklch(35% .035 175);--sidebar-ring:oklch(70% .12 175);--glow-1:oklch(45% .15 175);--glow-2:oklch(50% .12 190)}@media(prefers-reduced-motion:reduce){*,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}.fns-support-view-wrapper{flex-direction:column;gap:16px;padding:8px 0;display:flex}.fns-support-cards-container{grid-template-columns:repeat(2,1fr);gap:12px;width:100%;display:grid}@media(max-width:640px){.fns-support-cards-container{grid-template-columns:1fr}}.fns-support-card{background-color:var(--card);flex:1}@supports (color:color-mix(in lab,red,red)){.fns-support-card{background-color:color-mix(in oklab,var(--card) 50%,transparent)}}.fns-support-card{border:1px solid var(--border);border-radius:12px;flex-direction:column;gap:4px;padding:8px 12px;transition:all .3s cubic-bezier(.4,0,.2,1);display:flex;position:relative;overflow:visible}.fns-support-card:hover{border-color:var(--primary);background-color:var(--muted);transform:translateY(-2px);box-shadow:0 8px 24px #0000001f}@supports (color:color-mix(in lab,red,red)){.fns-support-card:hover{background-color:color-mix(in oklab,var(--muted) 80%,transparent)}}.fns-support-card:hover{opacity:.95}.fns-support-card-header{align-items:center;gap:8px;margin-bottom:0;display:flex}.fns-support-card-icon{font-size:16px}.fns-support-card-title{color:var(--foreground);font-size:.875rem;font-weight:600}.fns-support-card-body{justify-content:center;align-items:center;min-height:80px;padding:8px 0;display:flex}.fns-support-link{text-align:center;width:100%;display:block;text-decoration:none!important}.fns-support-img-kofi{filter:drop-shadow(0 4px 8px #0000001a);border-radius:8px;width:100%;max-width:110px;height:auto;margin:0 auto;transition:transform .3s;display:block}.fns-support-card:hover .fns-support-img-kofi{transform:scale(1.05)}.fns-wechat-qr-wrapper{background-color:var(--muted);cursor:zoom-in;z-index:1;transform-origin:top;border-radius:8px;justify-content:center;align-items:center;padding:6px;transition:transform .3s,box-shadow .3s;display:flex;position:relative;box-shadow:0 4px 12px #0000000d}.fns-wechat-qr-wrapper:hover{z-index:100;transform:scale(1.8);box-shadow:0 10px 40px #0006}.fns-support-img-wechat{width:72px;height:72px;display:block}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes pulse{50%{opacity:.5}}@keyframes bounce{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}.auth-page-container{--default-bg: #ffffff;--default-text-primary: rgb(52, 50, 45);--default-text-secondary: rgb(133, 132, 129);--default-border: rgba(0, 0, 0, .12);--default-input-bg: #ffffff;--default-button-bg: rgb(137, 137, 136);--default-button-text: #ffffff;--default-accent: #000000;position:relative;min-height:100vh;min-height:100dvh;width:100%;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:var(--default-bg);color:var(--default-text-primary);overflow:hidden;background-image:radial-gradient(circle,#d1d1d1 1px,transparent 1px);background-size:20px 20px;background-position:center}@media(pointer:coarse){.auth-page-container{overflow-x:hidden;overflow-y:auto}}.auth-background-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0}body:has(.auth-page-container):before,body:has(.auth-page-container):after{content:none!important;display:none!important}.auth-page-container.dark{--default-bg: #1a1a1a;--default-text-primary: #ededed;--default-text-secondary: #a1a1a1;background-image:radial-gradient(circle,#333 1px,transparent 1px)}.auth-card{position:relative;z-index:50;width:100%;max-width:360px;padding:0;margin:0 auto}.auth-logo-wrapper{display:flex;flex-direction:column;align-items:center;text-align:center}.auth-logo-box{width:64px;height:64px;display:flex;align-items:center;justify-content:center;border-radius:16px;background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 4px 12px #0000000d;margin-bottom:1.5rem;color:var(--default-text-primary)}.auth-page-container.dark .auth-logo-box{background:#2a2a2a;border-color:#ffffff1a;color:#fff;box-shadow:0 4px 12px #0003}.auth-title{font-size:32px;font-weight:600;color:var(--default-text-primary);margin-bottom:.5rem;text-align:center;letter-spacing:-.02em}.auth-subtitle{font-size:14px;color:var(--default-text-secondary);text-align:center;margin-bottom:2rem}.auth-tabs-container{margin-bottom:1.5rem;display:flex;justify-content:center}.auth-tabs{display:flex;background:transparent;padding:0;border:none;gap:1rem}.auth-tab{padding:.5rem 1rem;font-size:14px;font-weight:500;color:var(--default-text-secondary);background:transparent;border:none;cursor:pointer;transition:color .2s}.auth-tab.active{color:var(--default-text-primary);background:transparent;box-shadow:none;border-bottom:2px solid var(--default-text-primary);border-radius:0}.auth-input{width:100%!important;height:40px!important;padding:4px 12px!important;font-size:14px!important;border-radius:8px!important;border:none!important;box-shadow:0 0 0 1px #0000001f!important;background:#fffc!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:var(--default-text-primary)!important;margin-bottom:1rem!important;transition:box-shadow .2s ease!important}.auth-page-container.dark .auth-input{background:#2a2a2acc!important;box-shadow:0 0 0 1px #ffffff1f!important;color:#fff!important}.auth-input:focus{outline:none!important;box-shadow:0 0 0 2px #0003!important}.auth-input:-webkit-autofill,.auth-input:-webkit-autofill:hover,.auth-input:-webkit-autofill:focus,.auth-input:-webkit-autofill:active{-webkit-text-fill-color:#000000!important}.auth-page-container.dark .auth-input:-webkit-autofill,.auth-page-container.dark .auth-input:-webkit-autofill:hover,.auth-page-container.dark .auth-input:-webkit-autofill:focus,.auth-page-container.dark .auth-input:-webkit-autofill:active{-webkit-text-fill-color:#a1a1a1!important;-webkit-box-shadow:0 0 0 30px rgba(42,42,42,.8) inset!important}.auth-button-primary{width:100%;height:40px;display:flex;align-items:center;justify-content:center;gap:.5rem;background-color:var(--default-text-primary);color:#fff;font-size:14px;font-weight:500;border-radius:8px;border:none;cursor:pointer;transition:opacity .2s;margin-top:1rem}.auth-page-container.dark .auth-button-primary{background-color:var( --default-text-primary );color:#000}.auth-button-primary:hover{opacity:.9}.auth-button-primary:disabled{background-color:#898988;cursor:not-allowed}.auth-oidc-section{margin-top:1rem}.auth-divider{width:100%;height:1px;margin:1rem 0;background:#0000001f}.auth-page-container.dark .auth-divider{background:#ffffff1f}.auth-button-secondary{width:100%;min-height:40px;display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.5rem .75rem;color:var(--default-text-primary);background:#ffffffb8;border:1px solid var(--default-border);border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:background-color .2s,border-color .2s}.auth-button-secondary:hover{background:#ffffffe6;border-color:#0003}.auth-button-secondary+.auth-button-secondary{margin-top:.5rem}.auth-button-secondary span{min-width:0;overflow-wrap:anywhere}.auth-page-container.dark .auth-button-secondary{color:#ededed;background:#2a2a2ab8;border-color:#ffffff1f}.auth-page-container.dark .auth-button-secondary:hover{background:#2a2a2ae6;border-color:#fff3}.auth-footer-wrapper{margin-top:auto;padding-top:2rem;padding-bottom:2rem;width:100%;display:flex;justify-content:center}.auth-brand-footer{text-align:center;font-size:12px;color:var(--default-text-secondary);opacity:.7;max-width:400px;line-height:1.5;white-space:pre-line}.auth-brand-footer a{text-decoration:none;color:inherit;transition:color .2s}.auth-brand-footer a:hover{color:var(--default-text-primary)}.auth-floating-actions{position:absolute;top:1.5rem;right:1.5rem;z-index:100;display:flex;gap:.5rem}.auth-floating-switcher{width:32px!important;height:32px!important;min-width:32px!important;min-height:32px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(0,0,0,.08)!important;background:#fff;box-shadow:0 2px 4px #0000000d;color:var(--default-text-secondary);display:flex!important;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;aspect-ratio:1 / 1}.auth-floating-switcher:hover{background:#fcfcfc;border-color:#00000026;color:var(--default-text-primary);transform:translateY(-1px);box-shadow:0 4px 6px #00000014}.auth-page-container.dark .auth-floating-switcher{background:#2a2a2a;border-color:#ffffff1a;color:#a1a1a1}.auth-page-container.dark .auth-floating-switcher:hover{background:#333;color:#fff}.oauth-card{display:flex;flex-direction:column;gap:1rem}.oauth-status{display:flex;align-items:center;justify-content:center;gap:.75rem;min-height:6rem;color:var(--default-text-secondary);font-size:14px}.oauth-spinner{width:18px;height:18px;border:2px solid rgba(0,0,0,.12);border-top-color:var(--default-text-primary);border-radius:999px;animation:oauth-spin .8s linear infinite}.auth-page-container.dark .oauth-spinner{border-color:#ffffff1f;border-top-color:#fff}.oauth-client{display:flex;gap:.75rem;align-items:flex-start;padding:1rem;border-radius:12px;background:#ffffffad;box-shadow:0 0 0 1px #00000014;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.auth-page-container.dark .oauth-client{background:#2a2a2aad;box-shadow:0 0 0 1px #ffffff1a}.oauth-client svg{flex:0 0 auto;color:var(--default-text-primary);margin-top:.15rem}.oauth-client h2{margin:0;font-size:16px;font-weight:600;color:var(--default-text-primary)}.oauth-client p{margin:.25rem 0 0;color:var(--default-text-secondary);font-size:13px;line-height:1.5}.oauth-scope-list{display:grid;gap:.5rem;padding:0;margin:0;list-style:none}.oauth-scope-list li{padding:.75rem .875rem;border-radius:10px;background:#ffffff8f;box-shadow:0 0 0 1px #00000014}.auth-page-container.dark .oauth-scope-list li{background:#2a2a2a8f;box-shadow:0 0 0 1px #ffffff1a}.oauth-scope-list span{display:block;color:var(--default-text-primary);font-size:13px;font-weight:600}.oauth-scope-list p{margin:.25rem 0 0;color:var(--default-text-secondary);font-size:12px;line-height:1.5}.oauth-actions{display:grid;gap:.75rem;margin-top:.25rem}.oauth-error{margin:0;color:#dc2626;font-size:13px;line-height:1.5;text-align:center}.auth-page-container.dark .oauth-error{color:#fb7185}@keyframes oauth-spin{to{transform:rotate(360deg)}}
`;
var V3_PREVIEW_CSS = ".cm-editor{background-color:transparent!important;font-family:inherit!important}.cm-editor .cm-content{font-family:inherit!important;padding:16px!important}.cm-editor .cm-scroller{scrollbar-width:thin;scrollbar-color:transparent transparent;transition:scrollbar-color .3s ease}.cm-editor .cm-scroller:hover{scrollbar-color:rgba(128,128,128,.3) transparent}.cm-editor .cm-scroller::-webkit-scrollbar{width:6px;height:6px}.cm-editor .cm-scroller::-webkit-scrollbar-track{background:transparent}.cm-editor .cm-scroller::-webkit-scrollbar-thumb{background-color:transparent;border-radius:3px;transition:background-color .3s ease}.cm-editor .cm-scroller:hover::-webkit-scrollbar-thumb{background-color:#8080804d}.cm-editor .cm-scroller::-webkit-scrollbar-thumb:hover{background-color:#80808080}.cm-editor.cm-focused{outline:none!important}.markdown-preview{scrollbar-width:thin;scrollbar-color:transparent transparent;transition:scrollbar-color .3s ease}.markdown-preview:hover{scrollbar-color:rgba(128,128,128,.3) transparent}.markdown-preview::-webkit-scrollbar{width:6px;height:6px}.markdown-preview::-webkit-scrollbar-track{background:transparent}.markdown-preview::-webkit-scrollbar-thumb{background-color:transparent;border-radius:3px;transition:background-color .3s ease}.markdown-preview:hover::-webkit-scrollbar-thumb{background-color:#8080804d}.markdown-preview::-webkit-scrollbar-thumb:hover{background-color:#80808080}.obsidian-wiki-link{color:var(--primary);background:hsl(var(--primary) / .08);padding:0 4px;border-radius:4px;font-weight:500;cursor:pointer;transition:background .15s ease,opacity .15s ease;text-decoration:underline;text-underline-offset:4px}.obsidian-wiki-link:hover{opacity:.8}.obsidian-tag{color:hsl(var(--primary));background:hsl(var(--primary) / .08);padding:1px 6px;border-radius:4px;font-size:.9em;white-space:nowrap}mark{background:#fef08a;padding:0 2px;border-radius:2px}.dark mark{background:#854d0e;color:#fef9c3}";

// template-v3.ts
function lucide(className, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${body}</svg>`;
}
var ICON_FILE = lucide("lucide lucide-file-text h-5 w-5", '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>');
var ICON_CALENDAR = lucide("lucide lucide-calendar h-3 w-3", '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>');
var ICON_WIDE = lucide("lucide lucide-move-horizontal size-5", '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>');
var ICON_PALETTE = lucide("lucide lucide-palette size-5", '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>');
var ICON_THEME = lucide("lucide lucide-monitor size-5", '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>');
var ICON_LIST = lucide("lucide lucide-list size-5", '<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>');
var ICON_COPY = lucide("lucide lucide-copy size-4", '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');
var ICON_CHECK = lucide("lucide lucide-check size-4", '<path d="M20 6 9 17l-5-5"/>');
var BTN_GHOST = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 min-touch-target size-9 hover:bg-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-0 rounded-xl";
var BTN_SOLID = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground min-touch-target size-9 rounded-xl transition-colors";
var BTN_CODE = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 min-touch-target size-8 border border-border/70 bg-background/85 text-muted-foreground shadow-sm backdrop-blur hover:bg-background hover:text-foreground";
var POP_ITEM = "v3-pop-item relative flex w-full select-none items-center py-1.5 pl-2 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground rounded-lg cursor-pointer";
var TOC_LINK = "block rounded-r-md border-l-2 border-transparent px-2 py-1.5 text-sm transition-all duration-200 text-muted-foreground hover:bg-muted/50 hover:text-foreground";
var SCHEMES = ["default", "green", "blue", "sky-blue", "purple", "orange", "rose", "teal"];
var THEMES = ["system", "light", "dark"];
var I18N = {
  "toc.title": { zh: "\u5927\u7EB2", en: "Outline" },
  "btn.wide": { zh: "\u5207\u6362\u5BBD\u5C4F", en: "Toggle full width" },
  "btn.palette": { zh: "\u914D\u8272\u65B9\u6848", en: "Color scheme" },
  "btn.theme": { zh: "\u5207\u6362\u4E3B\u9898", en: "Switch theme" },
  "btn.toc": { zh: "\u663E\u793A/\u9690\u85CF\u5927\u7EB2", en: "Toggle outline" },
  "btn.copy": { zh: "\u590D\u5236", en: "Copy" },
  "btn.copied": { zh: "\u5DF2\u590D\u5236", en: "Copied!" },
  "theme.system": { zh: "\u8DDF\u968F\u7CFB\u7EDF", en: "System" },
  "theme.light": { zh: "\u6D45\u8272", en: "Light" },
  "theme.dark": { zh: "\u6DF1\u8272", en: "Dark" },
  "scheme.default": { zh: "\u6807\u51C6", en: "Default" },
  "scheme.green": { zh: "\u7EFF\u8272", en: "Green" },
  "scheme.blue": { zh: "\u84DD\u8272", en: "Blue" },
  "scheme.sky-blue": { zh: "\u5929\u84DD", en: "Sky blue" },
  "scheme.purple": { zh: "\u7D2B\u8272", en: "Purple" },
  "scheme.orange": { zh: "\u6A59\u8272", en: "Orange" },
  "scheme.rose": { zh: "\u73AB\u7470", en: "Rose" },
  "scheme.teal": { zh: "\u9752\u8272", en: "Teal" }
};
var V3_CONTENT_CSS = `
.markdown-preview {
	font-size: 1rem;
	line-height: 1.5rem;
	color: var(--foreground);
	word-break: break-word;
	overflow-wrap: anywhere;
}

/* \u9996/\u672B\u5143\u7D20\u8D34\u8FB9\uFF1A\u6CE8\u610F\u4F5C\u7528\u57DF\u5FC5\u987B\u662F article \u7684\u76F4\u63A5\u5B50\u5143\u7D20\uFF0C
   \u5199\u6210 .markdown-preview > :first-child \u53EA\u4F1A\u547D\u4E2D article \u672C\u8EAB\uFF0C
   \u6B63\u6587\u9996\u6807\u9898\u7684 margin-top \u4F1A\u6B8B\u7559\uFF0C\u5BFC\u81F4\u5F00\u5934\u7A7A\u51FA\u4E00\u5927\u5757 */
.markdown-preview article > :first-child { margin-top: 0; }
.markdown-preview article > :last-child { margin-bottom: 0; }

/* \u6B63\u6587\u5361\u7247\u4E0A\u7559\u767D\uFF1Apy-10(40px) \u6536\u5230 24px\uFF0C\u914D\u5408\u4E0A\u9762\u9996\u5143\u7D20\u5F52\u96F6\uFF0C
   \u9876\u90E8\u7A7A\u767D\u4ECE 72px \u964D\u5230 24px\uFF08\u7EA6\u539F\u6765\u7684 1/3\uFF09 */
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

/* \u4EFB\u52A1\u5217\u8868\uFF1AObsidian \u6E32\u67D3\u4E3A contains-task-list */
.markdown-preview .contains-task-list,
.markdown-preview .task-list-item {
	list-style: none;
}

.markdown-preview .contains-task-list {
	padding-left: 0.25rem;
}

/* \u4EFB\u52A1\u5217\u8868\u590D\u9009\u6846\uFF1ATailwind preflight \u628A input \u7684 appearance \u7F6E\u4E3A none\uFF0C
   \u8FD9\u91CC\u7EDF\u4E00\u753B\u6210\u300C\u9ED1\u6846 + \u767D\u5E95 + \u9ED1\u8272\u5BF9\u53F7\u300D\u7684\u7B80\u6D01\u65B9\u5757\uFF08\u6DF1\u8272\u4E3B\u9898\u81EA\u52A8\u53CD\u8272\uFF09\u3002
   \u5BF9\u52FE\u7528 data URI \u80CC\u666F\u56FE\u5B9E\u73B0\u2014\u2014input \u662F\u66FF\u6362\u5143\u7D20\uFF0C\u4F2A\u5143\u7D20\u4E0D\u53EF\u9760 */
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

/* \u5F15\u7528\u5185\u7684\u6BB5\u843D\u4ECD\u8D70\u6B63\u6587\u6837\u5F0F\uFF08\u53C2\u8003\u9875\u5B9E\u6D4B\uFF1Abq p \u4E0E\u666E\u901A p \u5B8C\u5168\u4E00\u81F4\uFF09 */
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

/* \u811A\u6CE8\uFF1AObsidian \u8F93\u51FA section.footnotes > hr + ol\uFF0Col/li \u5DF2\u7531\u901A\u7528\u89C4\u5219\u8986\u76D6 */
.markdown-preview section.footnotes {
	margin: 0;
}

.markdown-preview .footnote-backref {
	text-decoration: none;
	margin-left: 0.25rem;
}

/* \u6807\u7B7E / \u5185\u5D4C\u94FE\u63A5\uFF1A\u53C2\u8003\u9875\u81EA\u5E26\u7684 .obsidian-tag \u7528\u4E86 hsl(var(--primary)) \u4E09\u6BB5\u5F0F\u5199\u6CD5\uFF0C
   \u4E0E\u672C\u4E3B\u9898\u7684\u5355\u503C token \u4E0D\u517C\u5BB9\uFF0C\u8FD9\u91CC\u5355\u72EC\u7ED9\u4E00\u7248 */
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

/* Callout\uFF1A\u53C2\u8003\u9875\u6CA1\u6709\u8FD9\u4E2A\u6982\u5FF5\uFF0C\u6309 Obsidian \u7684 --callout-color \u81EA\u53D8\u91CF\u8865\u4E00\u7248\u7B80\u6D01\u6837\u5F0F */
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
var V3_UI_CSS = `
/* ===== \u4EE3\u7801\u5757\uFF1A\u590D\u7528 main.ts \u7684 .code-block-wrapper \u7ED3\u6784\uFF0C\u5916\u89C2\u5BF9\u9F50\u53C2\u8003\u9875 ===== */
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
	/* \u5DE6\u53F3\u7559\u4E00\u6837\u7684 padding + \u5C45\u4E2D\uFF0C\u884C\u53F7\u624D\u5728\u72EC\u7ACB\u69FD\u4F4D\u5C45\u4E2D\uFF1B
	   \u539F\u6765\u662F\u53F3\u4FA7\u7559\u767D\u3001\u6587\u5B57\u9760\u53F3\uFF0C\u89C6\u89C9\u4E0A\u8D34\u7740\u4EE3\u7801\u6846\u5DE6\u8FB9 */
	padding: 1rem 0.5rem;
	border-right: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
	background: color-mix(in oklab, var(--muted) 70%, transparent);
	color: var(--muted-foreground);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 0.875rem;
	line-height: 1.5rem;
	text-align: center;
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

/* ===== \u9876\u680F\u4E0B\u62C9\u83DC\u5355\uFF08\u81EA\u7ED8\uFF0C\u66FF\u4EE3\u53C2\u8003\u9875\u7684 Radix Dropdown\uFF09 ===== */
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

/* \u5DE6\u4FA7\u5355\u9009\u70B9\u4E0E\u53F3\u4FA7\u5BF9\u52FE\u5DF2\u6309\u9700\u6C42\u79FB\u9664\uFF0C\u8FD9\u91CC\u53EA\u4FDD\u7559\u8272\u5757\u4E0E\u6587\u5B57 */
.v3-swatch {
	flex: none;
	width: 0.5rem;
	height: 0.5rem;
	margin-right: 0.5rem;
	border-radius: 9999px;
	background: var(--primary);
}

.v3-pop-item .v3-label { white-space: nowrap; }

/* \u5F53\u524D\u9009\u4E2D\u9879\uFF1A\u6D45\u5E95 + \u52A0\u7C97\u3002\u4E0D\u4F7F\u7528\u5355\u9009\u70B9/\u5BF9\u52FE\u56FE\u6807\uFF0C\u53EA\u9760\u5E95\u8272\u533A\u5206 */
.v3-pop-item[aria-checked="true"] {
	background-color: var(--accent);
	color: var(--accent-foreground);
	font-weight: 500;
}

/* ===== \u6EDA\u52A8\u6761\uFF1AWindows/Chromium \u9ED8\u8BA4\u6EDA\u52A8\u6761\u5728\u6D45\u8272\u4E0B\u662F\u7C97\u9ED1\u6761\uFF0C\u8FD9\u91CC\u7EDF\u4E00\u6539\u6210\u7EC6\u6D45\u8272 ===== */
/* \u9002\u7528\u4E8E\u5927\u7EB2\u6B63\u6587\u3001\u4EE3\u7801\u5757\u3001\u8868\u683C\u4E0E\u516C\u5F0F\u7684\u6EDA\u52A8\u5BB9\u5668\uFF0C\u6DF1\u6D45\u8272\u4E3B\u9898\u90FD\u9760 --muted-foreground \u81EA\u9002\u5E94 */
.v3-toc-body,
.code-block-wrapper pre,
.markdown-preview .my-4.overflow-x-auto,
.markdown-preview .math-display {
	scrollbar-width: thin;
	/* \u5148\u7ED9\u4E0D\u652F\u6301 color-mix \u7684\u65E7\u5185\u6838\u4E00\u4E2A\u7EAF\u8272\u515C\u5E95\uFF0C\u518D\u8986\u76D6\u6210\u534A\u900F\u660E */
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
	/* \u7559\u51FA\u5185\u8FB9\u8DDD\u8BA9\u5706\u89D2\u6EDA\u52A8\u6761\u4E0D\u8D34\u8FB9 */
	border: 2px solid transparent;
	background-clip: padding-box;
}

.v3-toc-body::-webkit-scrollbar-thumb:hover,
.code-block-wrapper pre::-webkit-scrollbar-thumb:hover,
.markdown-preview .my-4.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.markdown-preview .math-display::-webkit-scrollbar-thumb:hover {
	background-color: color-mix(in oklab, var(--muted-foreground) 75%, transparent);
}

/* \u53BB\u6389\u4E0A\u4E0B\u7BAD\u5934\u6309\u94AE\u4E0E\u53F3\u4E0B\u89D2\u8865\u5757\uFF0C\u53EA\u7559\u4E00\u6761\u7EC6\u6ED1\u5757 */
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

/* \u684C\u9762\u7AEF\uFF1A\u5927\u7EB2\u9ED8\u8BA4\u663E\u793A\uFF0C\u6309\u94AE\u53EF\u9690\u85CF\uFF08\u72B6\u6001\u8BB0\u5FC6\u5728 localStorage\uFF09 */
body.v3-toc-hidden .v3-toc {
	display: none;
}

/* ===== \u7A84\u5C4F\uFF1A\u76EE\u5F55\u9ED8\u8BA4\u9690\u85CF\uFF0C\u70B9\u6309\u94AE\u5F39\u51FA\u60AC\u6D6E\u9762\u677F\uFF08\u4E0D\u6324\u538B\u6B63\u6587\uFF09 ===== */
@media (max-width: 1023px) {
	.v3-toc {
		position: fixed;
		/* \u9876\u680F\u7EA6 65px\uFF0C\u7559 7px \u95F4\u9699\uFF1B\u5E95\u90E8\u7559 24px\uFF0C\u907F\u514D\u8D34\u4F4F\u5C4F\u5E55\u8FB9\u7F18 */
		top: 4.5rem;
		left: 0.75rem;
		right: 0.75rem;
		width: auto;
		max-height: calc(100vh - 6rem);
		z-index: 30;
		/* \u9ED8\u8BA4\u9690\u85CF\uFF1A\u624B\u673A\u9605\u8BFB\u65F6\u76EE\u5F55\u4E0D\u5360\u6B63\u6587\u7A7A\u95F4 */
		display: none;
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
	}

	/* \u540E\u9762\u7684\u89C4\u5219\u4E0E body.v3-toc-hidden \u540C\u6743\u91CD\uFF0C\u9760\u987A\u5E8F\u4FDD\u8BC1\u62BD\u5C49\u80FD\u6253\u5F00 */
	body.v3-toc-open .v3-toc {
		display: flex;
	}

	/* \u62BD\u5C49\u6253\u5F00\u65F6\u9501\u4F4F\u80CC\u666F\u6EDA\u52A8\uFF0C\u907F\u514D\u6ED1\u52A8\u7A7F\u900F */
	body.v3-toc-open {
		overflow: hidden;
	}

	.v3-toc-backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		background: rgb(0 0 0 / 0.28);
		-webkit-backdrop-filter: blur(1px);
		backdrop-filter: blur(1px);
	}

	.v3-toc-backdrop:not([hidden]) {
		display: block;
	}

	/* items-start \u5728 flex-col \u4E0B\u4F1A\u6309\u5185\u5BB9\u7ED9\u5361\u7247\u5B9A\u5BBD\uFF0C\u5BBD\u8868\u683C\u4F1A\u628A\u5361\u7247\u6491\u51FA\u5C4F\u5E55\uFF0C
	   \u518D\u88AB\u5916\u5C42 overflow-x-clip \u88C1\u6389\u4E14\u65E0\u6CD5\u6A2A\u5411\u6EDA\u52A8\uFF0C\u6240\u4EE5\u6539\u6210\u62C9\u4F38\u5230\u5BB9\u5668\u5BBD\u5EA6 */
	.v3-main-box {
		align-items: stretch;
	}
}

/* \u975E\u624B\u673A\u7AEF\u4E0D\u663E\u793A\u906E\u7F69\uFF0C\u9632\u6B62\u72B6\u6001\u6B8B\u7559\u65F6\u76D6\u4F4F\u9875\u9762 */
.v3-toc-backdrop {
	display: none;
}

/* ===== \u624B\u673A\u9605\u8BFB\uFF1A\u538B\u7F29\u7559\u767D\uFF0C\u628A\u5BBD\u5EA6\u8BA9\u7ED9\u6B63\u6587\uFF1B\u5BBD\u5185\u5BB9\u4E00\u5F8B\u6A2A\u5411\u6EDA\u52A8 ===== */
@media (max-width: 640px) {
	.markdown-preview article {
		padding: 1.5rem 1rem 2.5rem;
	}

	/* \u53F3\u4FA7 80px \u662F\u7ED9\u590D\u5236\u6309\u94AE\u7559\u7684\uFF0C\u624B\u673A\u4E0A\u6536\u7A84\uFF0C\u522B\u5403\u6389\u592A\u591A\u4EE3\u7801\u53EF\u89C6\u5BBD\u5EA6 */
	.code-block-wrapper pre {
		padding-right: 3.5rem;
	}

	.markdown-preview h1 {
		font-size: 1.5rem;
		line-height: 2rem;
	}
}

/* \u8868\u683C\u3001\u4EE3\u7801\u3001\u516C\u5F0F\u5728\u7A84\u5C4F\u4E0B\u9760\u6A2A\u5411\u6EDA\u52A8\uFF0C\u4E0D\u6324\u538B\u6392\u7248\u3001\u4E0D\u6362\u884C\u6491\u7834\u5361\u7247 */
.code-block-wrapper pre,
.markdown-preview .my-4.overflow-x-auto,
.markdown-preview .math-display {
	overscroll-behavior-x: contain;
	-webkit-overflow-scrolling: touch;
}

/* \u4E2D\u6587\u5728\u4EFB\u610F\u5B57\u95F4\u90FD\u80FD\u6362\u884C\uFF0C\u8868\u683C\u7528 width:100% \u4F1A\u88AB\u538B\u6210\u4E00\u5B57\u4E00\u884C\uFF1B
   \u7A84\u5C4F\u4E0B\u6309\u5185\u5BB9\u56FA\u6709\u5BBD\u5EA6\u6491\u5F00\uFF0C\u8D85\u51FA\u90E8\u5206\u4EA4\u7ED9\u5916\u5C42 overflow-x-auto \u6A2A\u5411\u6EDA\u52A8 */
@media (max-width: 767px) {
	.markdown-preview table {
		min-width: max-content;
	}
}

/* ===== \u6253\u5370\uFF1A\u53EA\u7559\u6B63\u6587 ===== */
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
var V3_SCRIPT = `
<script>
(function () {
	'use strict';

	/* \u2014\u2014 \u8BED\u8A00\uFF1A\u53EA\u8BA4\u4E2D\u6587\uFF0C\u5176\u4F59\u4E00\u5F8B\u82F1\u8BED \u2014\u2014 */
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

	/* \u2014\u2014 localStorage \u5728 file:// \u4E0B\u53EF\u80FD\u4E0D\u53EF\u7528\uFF0C\u5168\u90E8\u964D\u7EA7\u4E3A\u300C\u4EC5\u672C\u6B21\u751F\u6548\u300D \u2014\u2014 */
	function read(key) {
		try { return localStorage.getItem(key); } catch (e) { return null; }
	}
	function write(key, value) {
		try { localStorage.setItem(key, value); } catch (e) {}
	}

	/* \u2014\u2014 \u5BBD\u5C4F\uFF1A\u9ED8\u8BA4\u5173\uFF08\u7A84\u5C4F\uFF09\uFF0C\u70B9\u6309\u53EF\u5207\u5230\u5168\u5BBD \u2014\u2014 */
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

	/* \u2014\u2014 \u5927\u7EB2\uFF1A\u684C\u9762\u4FA7\u680F\u53EF\u9690\u85CF\uFF1B\u624B\u673A\u9ED8\u8BA4\u9690\u85CF\uFF0C\u70B9\u6309\u94AE\u5F39\u51FA\u60AC\u6D6E\u9762\u677F \u2014\u2014 */
	var tocBtn = document.querySelector('[data-v3-toc-btn]');
	var tocBackdrop = document.querySelector('[data-v3-toc-backdrop]');
	var mobileToc = window.matchMedia ? window.matchMedia('(max-width: 1023px)') : null;

	function isMobileToc() {
		return mobileToc ? mobileToc.matches : window.innerWidth < 1024;
	}

	function setTocBtnState(active) {
		if (!tocBtn) return;
		tocBtn.classList.toggle('bg-primary/10', active);
		tocBtn.classList.toggle('text-primary', active);
		tocBtn.setAttribute('aria-expanded', active ? 'true' : 'false');
	}

	function isTocDrawerOpen() {
		return document.body.classList.contains('v3-toc-open');
	}

	function openTocDrawer() {
		document.body.classList.add('v3-toc-open');
		if (tocBackdrop) tocBackdrop.hidden = false;
		setTocBtnState(true);
	}

	function closeTocDrawer() {
		document.body.classList.remove('v3-toc-open');
		if (tocBackdrop) tocBackdrop.hidden = true;
		if (isMobileToc()) setTocBtnState(false);
	}

	/* \u684C\u9762\u7AEF\u6CBF\u7528\u4E0A\u6B21\u7684\u663E\u9690\u9009\u62E9 */
	function applyDesktopTocState() {
		var hidden = read('export-html-v3-toc') === 'false';
		document.body.classList.toggle('v3-toc-hidden', hidden);
		setTocBtnState(!hidden);
	}

	if (tocBtn) {
		tocBtn.addEventListener('click', function () {
			if (isMobileToc()) {
				if (isTocDrawerOpen()) closeTocDrawer();
				else openTocDrawer();
				return;
			}
			var hidden = document.body.classList.toggle('v3-toc-hidden');
			setTocBtnState(!hidden);
			write('export-html-v3-toc', hidden ? 'false' : 'true');
		});
	}

	if (tocBackdrop) {
		tocBackdrop.addEventListener('click', closeTocDrawer);
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && isTocDrawerOpen()) closeTocDrawer();
	});

	/* \u624B\u673A\u9996\u6B21\u8FDB\u5165\u4E00\u5F8B\u6536\u8D77\uFF0C\u4E0D\u8BB0\u5FC6\u62BD\u5C49\u72B6\u6001\uFF1B\u684C\u9762\u6062\u590D\u4E0A\u6B21\u9009\u62E9 */
	if (isMobileToc()) {
		closeTocDrawer();
	} else {
		applyDesktopTocState();
	}

	function handleTocBreakpoint() {
		closeTocDrawer();
		if (!isMobileToc()) applyDesktopTocState();
	}

	if (mobileToc) {
		if (mobileToc.addEventListener) mobileToc.addEventListener('change', handleTocBreakpoint);
		else if (mobileToc.addListener) mobileToc.addListener(handleTocBreakpoint);
	}

	/* \u2014\u2014 \u4E3B\u9898\uFF1A\u9ED8\u8BA4\u6D45\u8272 \u2014\u2014 */
	var root = document.documentElement;
	var systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function applyTheme(mode) {
		var cls = mode === 'system' ? (systemTheme && systemTheme.matches ? 'dark' : 'light') : mode;
		root.classList.remove('light', 'dark');
		root.classList.add(cls);
		write('export-html-v3-theme', mode);
	}

	/* \u2014\u2014 \u914D\u8272\uFF1Adata-color-scheme \u9A71\u52A8 :root[data-color-scheme=X] \u7684 token \u2014\u2014 */
	function applyScheme(name) {
		root.setAttribute('data-color-scheme', name);
		write('export-html-v3-scheme', name);
	}

	/* \u2014\u2014 \u4E0B\u62C9\u83DC\u5355\u5F00\u5408 \u2014\u2014 */
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

	/* \u2014\u2014 \u83DC\u5355\u9879\u9009\u4E2D\u6001 \u2014\u2014 */
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

	/* \u2014\u2014 \u914D\u8272\u5C0F\u5706\u70B9\uFF1A\u76F4\u63A5\u8BFB\u4E3B\u9898\u53D8\u91CF\uFF0C\u907F\u514D\u628A 8 \u5957\u8272\u503C\u786C\u7F16\u7801\u4E24\u904D \u2014\u2014 */
	var previousScheme = root.getAttribute('data-color-scheme') || 'default';
	var swatches = document.querySelectorAll('.v3-swatch');
	for (var w = 0; w < swatches.length; w++) {
		var schemeName = swatches[w].closest('[data-scheme]').getAttribute('data-scheme');
		root.setAttribute('data-color-scheme', schemeName);
		var ring = getComputedStyle(root).getPropertyValue('--ring').trim();
		swatches[w].style.backgroundColor = ring || 'var(--primary)';
	}
	root.setAttribute('data-color-scheme', previousScheme);

	/* \u2014\u2014 \u6062\u590D\u7528\u6237\u4E0A\u6B21\u7684\u9009\u62E9 \u2014\u2014 */
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

	/* \u2014\u2014 \u590D\u5236\u6309\u94AE \u2014\u2014 */
	var COPY_ICON = ${JSON.stringify(ICON_COPY)};
	var CHECK_ICON = ${JSON.stringify(ICON_CHECK)};
	var CODE_BTN_CLASS = ${JSON.stringify(BTN_CODE)};

	var blocks = document.querySelectorAll('.code-block-wrapper');
	for (var k = 0; k < blocks.length; k++) {
		(function (block) {
			if (block.querySelector('.v3-code-actions')) return;

			var pre = block.querySelector('pre');
			if (!pre) return;

			/* \u7A7A\u4EE3\u7801\u5757\u6CA1\u6709\u53EF\u590D\u5236\u7684\u5185\u5BB9\uFF1B\u6846\u53EA\u6709\u4E00\u884C\u9AD8\u65F6\u6309\u94AE\u8FD8\u4F1A\u6EA2\u51FA\u8FB9\u754C\uFF0C\u76F4\u63A5\u8DF3\u8FC7 */
			var code = pre.querySelector('code');
			if (!code || !code.textContent.trim()) return;

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
				var text = code.textContent;

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

			/* \u884C\u53F7\u5217\u968F\u4EE3\u7801\u5757\u6A2A\u5411\u6EDA\u52A8\u540C\u6B65\uFF08\u7ED3\u6784\u4E0A\u884C\u53F7\u662F\u72EC\u7ACB\u5217\uFF0C\u8FD9\u91CC\u540C\u6B65\u7684\u662F\u7EB5\u5411\uFF09 */
			var lineNumbers = block.querySelector('.line-numbers');
			if (lineNumbers) {
				pre.addEventListener('scroll', function () {
					lineNumbers.scrollTop = pre.scrollTop;
				});
			}
		})(blocks[k]);
	}

	/* \u2014\u2014 \u5927\u7EB2\u6EDA\u52A8\u9AD8\u4EAE \u2014\u2014 */
	var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.v3-toc a[href^="#"]'));
	/* \u624B\u673A\u4E0A\u70B9\u51FB\u76EE\u5F55\u9879\u8DF3\u8F6C\u540E\u7ACB\u5373\u6536\u8D77\u60AC\u6D6E\u9762\u677F */
	for (var tli = 0; tli < tocLinks.length; tli++) {
		tocLinks[tli].addEventListener('click', function () {
			if (isMobileToc()) closeTocDrawer();
		});
	}
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
<\/script>
`;
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function buildFlatToc(headings) {
  if (headings.length === 0) {
    return "";
  }
  const items = headings.map((heading) => {
    const paddingLeft = 8 + (heading.level - 1) * 12;
    return `<li><a href="#${encodeURIComponent(heading.id)}" class="${TOC_LINK}" style="padding-left: ${paddingLeft}px">${escapeHtml(heading.text)}</a></li>`;
  });
  return `<ol role="list" class="space-y-1">${items.join("")}</ol>`;
}
function wrapTables(html) {
  return html.replace(/<table([^>]*)>/g, '<div class="my-4 overflow-x-auto"><table$1>').replace(/<\/table>/g, "</table></div>");
}
function buildSchemeItems() {
  return SCHEMES.map((scheme) => {
    const checked = scheme === "default";
    return `<button type="button" role="menuitemradio" class="${POP_ITEM}" aria-checked="${checked}" data-scheme="${scheme}"><span class="v3-swatch"></span><span class="v3-label" data-i18n="scheme.${scheme}">${escapeHtml(I18N[`scheme.${scheme}`].en)}</span></button>`;
  }).join("");
}
function buildThemeItems() {
  return THEMES.map((theme) => {
    const checked = theme === "light";
    return `<button type="button" role="menuitemradio" class="${POP_ITEM}" aria-checked="${checked}" data-theme="${theme}"><span class="v3-label" data-i18n="theme.${theme}">${escapeHtml(I18N[`theme.${theme}`].en)}</span></button>`;
  }).join("");
}
function buildV3Template(options) {
  const { title, mtime, headings, contentHtml, mathCss, mathScript } = options;
  const safeTitle = escapeHtml(title);
  const tocHtml = buildFlatToc(headings);
  const articleClass = "mx-auto px-5 py-10 transition-all duration-300 break-words max-w-225";
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
						${tocHtml ? `<div class="inline-flex items-center">
							<button type="button" class="${BTN_SOLID} bg-primary/10 text-primary" data-v3-toc-btn aria-controls="v3-toc" aria-expanded="true" data-i18n-title="btn.toc">${ICON_LIST}</button>
						</div>` : ""}
					</div>
				</div>
			</header>
			<div class="v3-toc-backdrop" data-v3-toc-backdrop hidden></div>
			<main class="flex-1 overflow-visible p-4 sm:p-6 lg:p-8">
				<div class="mx-auto flex flex-col lg:flex-row items-start gap-4 overflow-visible transition-all duration-300 max-w-5xl v3-main-box" data-v3-width data-wide="max-w-none" data-narrow="max-w-5xl">
					<div class="flex-1 min-w-0 overflow-visible rounded-2xl border bg-card shadow-sm">
						<div class="markdown-preview">
							<article class="${articleClass}" data-v3-width data-wide="max-w-none" data-narrow="max-w-225">
								${wrapTables(stripLegacyCopyButtons(contentHtml))}
							</article>
						</div>
					</div>
					${tocHtml ? `<nav id="v3-toc" class="v3-toc border border-border bg-card rounded-xl flex flex-col h-fit max-h-[calc(100vh-102px)] overflow-hidden shrink-0 w-60 sticky top-20" aria-label="Outline">
						<div class="sticky top-0 border-b bg-card px-4 py-3 flex items-center justify-between z-10">
							<h3 class="text-sm font-semibold" data-i18n="toc.title">${escapeHtml(I18N["toc.title"].en)}</h3>
						</div>
						<div class="p-2 flex-1 overflow-y-auto min-h-0 v3-toc-body">
							${tocHtml}
						</div>
					</nav>` : ""}
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

// katex-constants.ts
var KATEX_JS_BASE64 = "IWZ1bmN0aW9uKGUsdCl7Im9iamVjdCI9PXR5cGVvZiBleHBvcnRzJiYib2JqZWN0Ij09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6ImZ1bmN0aW9uIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6Im9iamVjdCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMua2F0ZXg9dCgpOmUua2F0ZXg9dCgpfSgidW5kZWZpbmVkIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLChmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbigpeyJ1c2Ugc3RyaWN0Ijt2YXIgZT17ZDpmdW5jdGlvbih0LHIpe2Zvcih2YXIgbiBpbiByKWUubyhyLG4pJiYhZS5vKHQsbikmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2VudW1lcmFibGU6ITAsZ2V0OnJbbl19KX0sbzpmdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX19LHQ9e307ZS5kKHQse2RlZmF1bHQ6ZnVuY3Rpb24oKXtyZXR1cm4gbmF9fSk7dmFyIHI9ZnVuY3Rpb24gZSh0LHIpe3RoaXMubmFtZT12b2lkIDAsdGhpcy5wb3NpdGlvbj12b2lkIDAsdGhpcy5sZW5ndGg9dm9pZCAwLHRoaXMucmF3TWVzc2FnZT12b2lkIDA7dmFyIG4sYSxpPSJLYVRlWCBwYXJzZSBlcnJvcjogIit0LG89ciYmci5sb2M7aWYobyYmby5zdGFydDw9by5lbmQpe3ZhciBzPW8ubGV4ZXIuaW5wdXQ7bj1vLnN0YXJ0LGE9by5lbmQsbj09PXMubGVuZ3RoP2krPSIgYXQgZW5kIG9mIGlucHV0OiAiOmkrPSIgYXQgcG9zaXRpb24gIisobisxKSsiOiAiO3ZhciBsPXMuc2xpY2UobixhKS5yZXBsYWNlKC9bXl0vZywiJCZcdTAzMzIiKTtpKz0obj4xNT8iXHUyMDI2IitzLnNsaWNlKG4tMTUsbik6cy5zbGljZSgwLG4pKStsKyhhKzE1PHMubGVuZ3RoP3Muc2xpY2UoYSxhKzE1KSsiXHUyMDI2IjpzLnNsaWNlKGEpKX12YXIgaD1uZXcgRXJyb3IoaSk7cmV0dXJuIGgubmFtZT0iUGFyc2VFcnJvciIsaC5fX3Byb3RvX189ZS5wcm90b3R5cGUsaC5wb3NpdGlvbj1uLG51bGwhPW4mJm51bGwhPWEmJihoLmxlbmd0aD1hLW4pLGgucmF3TWVzc2FnZT10LGh9O3IucHJvdG90eXBlLl9fcHJvdG9fXz1FcnJvci5wcm90b3R5cGU7dmFyIG49cixhPS8oW0EtWl0pL2csaT17IiYiOiImYW1wOyIsIj4iOiImZ3Q7IiwiPCI6IiZsdDsiLCciJzoiJnF1b3Q7IiwiJyI6IiYjeDI3OyJ9LG89L1smPjwiJ10vZzt2YXIgcz1mdW5jdGlvbiBlKHQpe3JldHVybiJvcmRncm91cCI9PT10LnR5cGV8fCJjb2xvciI9PT10LnR5cGU/MT09PXQuYm9keS5sZW5ndGg/ZSh0LmJvZHlbMF0pOnQ6ImZvbnQiPT09dC50eXBlP2UodC5ib2R5KTp0fSxsPXtjb250YWluczpmdW5jdGlvbihlLHQpe3JldHVybi0xIT09ZS5pbmRleE9mKHQpfSxkZWZsdDpmdW5jdGlvbihlLHQpe3JldHVybiB2b2lkIDA9PT1lP3Q6ZX0sZXNjYXBlOmZ1bmN0aW9uKGUpe3JldHVybiBTdHJpbmcoZSkucmVwbGFjZShvLChmdW5jdGlvbihlKXtyZXR1cm4gaVtlXX0pKX0saHlwaGVuYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlcGxhY2UoYSwiLSQxIikudG9Mb3dlckNhc2UoKX0sZ2V0QmFzZUVsZW06cyxpc0NoYXJhY3RlckJveDpmdW5jdGlvbihlKXt2YXIgdD1zKGUpO3JldHVybiJtYXRob3JkIj09PXQudHlwZXx8InRleHRvcmQiPT09dC50eXBlfHwiYXRvbSI9PT10LnR5cGV9LHByb3RvY29sRnJvbVVybDpmdW5jdGlvbihlKXt2YXIgdD0vXlxzKihbXlxcLyNdKj8pKD86OnwmIzAqNTh8JiN4MCozYSkvaS5leGVjKGUpO3JldHVybiBudWxsIT10P3RbMV06Il9yZWxhdGl2ZSJ9fSxoPXtkaXNwbGF5TW9kZTp7dHlwZToiYm9vbGVhbiIsZGVzY3JpcHRpb246IlJlbmRlciBtYXRoIGluIGRpc3BsYXkgbW9kZSwgd2hpY2ggcHV0cyB0aGUgbWF0aCBpbiBkaXNwbGF5IHN0eWxlIChzbyBcXGludCBhbmQgXFxzdW0gYXJlIGxhcmdlLCBmb3IgZXhhbXBsZSksIGFuZCBjZW50ZXJzIHRoZSBtYXRoIG9uIHRoZSBwYWdlIG9uIGl0cyBvd24gbGluZS4iLGNsaToiLWQsIC0tZGlzcGxheS1tb2RlIn0sb3V0cHV0Ont0eXBlOntlbnVtOlsiaHRtbEFuZE1hdGhtbCIsImh0bWwiLCJtYXRobWwiXX0sZGVzY3JpcHRpb246IkRldGVybWluZXMgdGhlIG1hcmt1cCBsYW5ndWFnZSBvZiB0aGUgb3V0cHV0LiIsY2xpOiItRiwgLS1mb3JtYXQgPHR5cGU+In0sbGVxbm86e3R5cGU6ImJvb2xlYW4iLGRlc2NyaXB0aW9uOiJSZW5kZXIgZGlzcGxheSBtYXRoIGluIGxlcW5vIHN0eWxlIChsZWZ0LWp1c3RpZmllZCB0YWdzKS4ifSxmbGVxbjp7dHlwZToiYm9vbGVhbiIsZGVzY3JpcHRpb246IlJlbmRlciBkaXNwbGF5IG1hdGggZmx1c2ggbGVmdC4ifSx0aHJvd09uRXJyb3I6e3R5cGU6ImJvb2xlYW4iLGRlZmF1bHQ6ITAsY2xpOiItdCwgLS1uby10aHJvdy1vbi1lcnJvciIsY2xpRGVzY3JpcHRpb246IlJlbmRlciBlcnJvcnMgKGluIHRoZSBjb2xvciBnaXZlbiBieSAtLWVycm9yLWNvbG9yKSBpbnN0ZWFkIG9mIHRocm93aW5nIGEgUGFyc2VFcnJvciBleGNlcHRpb24gd2hlbiBlbmNvdW50ZXJpbmcgYW4gZXJyb3IuIn0sZXJyb3JDb2xvcjp7dHlwZToic3RyaW5nIixkZWZhdWx0OiIjY2MwMDAwIixjbGk6Ii1jLCAtLWVycm9yLWNvbG9yIDxjb2xvcj4iLGNsaURlc2NyaXB0aW9uOiJBIGNvbG9yIHN0cmluZyBnaXZlbiBpbiB0aGUgZm9ybWF0ICdyZ2InIG9yICdycmdnYmInIChubyAjKS4gVGhpcyBvcHRpb24gZGV0ZXJtaW5lcyB0aGUgY29sb3Igb2YgZXJyb3JzIHJlbmRlcmVkIGJ5IHRoZSAtdCBvcHRpb24uIixjbGlQcm9jZXNzb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIiMiK2V9fSxtYWNyb3M6e3R5cGU6Im9iamVjdCIsY2xpOiItbSwgLS1tYWNybyA8ZGVmPiIsY2xpRGVzY3JpcHRpb246IkRlZmluZSBjdXN0b20gbWFjcm8gb2YgdGhlIGZvcm0gJ1xcZm9vOmV4cGFuc2lvbicgKHVzZSBtdWx0aXBsZSAtbSBhcmd1bWVudHMgZm9yIG11bHRpcGxlIG1hY3JvcykuIixjbGlEZWZhdWx0OltdLGNsaVByb2Nlc3NvcjpmdW5jdGlvbihlLHQpe3JldHVybiB0LnB1c2goZSksdH19LG1pblJ1bGVUaGlja25lc3M6e3R5cGU6Im51bWJlciIsZGVzY3JpcHRpb246IlNwZWNpZmllcyBhIG1pbmltdW0gdGhpY2tuZXNzLCBpbiBlbXMsIGZvciBmcmFjdGlvbiBsaW5lcywgYFxcc3FydGAgdG9wIGxpbmVzLCBge2FycmF5fWAgdmVydGljYWwgbGluZXMsIGBcXGhsaW5lYCwgYFxcaGRhc2hsaW5lYCwgYFxcdW5kZXJsaW5lYCwgYFxcb3ZlcmxpbmVgLCBhbmQgdGhlIGJvcmRlcnMgb2YgYFxcZmJveGAsIGBcXGJveGVkYCwgYW5kIGBcXGZjb2xvcmJveGAuIixwcm9jZXNzb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIE1hdGgubWF4KDAsZSl9LGNsaToiLS1taW4tcnVsZS10aGlja25lc3MgPHNpemU+IixjbGlQcm9jZXNzb3I6cGFyc2VGbG9hdH0sY29sb3JJc1RleHRDb2xvcjp7dHlwZToiYm9vbGVhbiIsZGVzY3JpcHRpb246Ik1ha2VzIFxcY29sb3IgYmVoYXZlIGxpa2UgTGFUZVgncyAyLWFyZ3VtZW50IFxcdGV4dGNvbG9yLCBpbnN0ZWFkIG9mIExhVGVYJ3Mgb25lLWFyZ3VtZW50IFxcY29sb3IgbW9kZSBjaGFuZ2UuIixjbGk6Ii1iLCAtLWNvbG9yLWlzLXRleHQtY29sb3IifSxzdHJpY3Q6e3R5cGU6W3tlbnVtOlsid2FybiIsImlnbm9yZSIsImVycm9yIl19LCJib29sZWFuIiwiZnVuY3Rpb24iXSxkZXNjcmlwdGlvbjoiVHVybiBvbiBzdHJpY3QgLyBMYVRlWCBmYWl0aGZ1bG5lc3MgbW9kZSwgd2hpY2ggdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBpbnB1dCB1c2VzIGZlYXR1cmVzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgTGFUZVguIixjbGk6Ii1TLCAtLXN0cmljdCIsY2xpRGVmYXVsdDohMX0sdHJ1c3Q6e3R5cGU6WyJib29sZWFuIiwiZnVuY3Rpb24iXSxkZXNjcmlwdGlvbjoiVHJ1c3QgdGhlIGlucHV0LCBlbmFibGluZyBhbGwgSFRNTCBmZWF0dXJlcyBzdWNoIGFzIFxcdXJsLiIsY2xpOiItVCwgLS10cnVzdCJ9LG1heFNpemU6e3R5cGU6Im51bWJlciIsZGVmYXVsdDoxLzAsZGVzY3JpcHRpb246IklmIG5vbi16ZXJvLCBhbGwgdXNlci1zcGVjaWZpZWQgc2l6ZXMsIGUuZy4gaW4gXFxydWxlezUwMGVtfXs1MDBlbX0sIHdpbGwgYmUgY2FwcGVkIHRvIG1heFNpemUgZW1zLiBPdGhlcndpc2UsIGVsZW1lbnRzIGFuZCBzcGFjZXMgY2FuIGJlIGFyYml0cmFyaWx5IGxhcmdlIixwcm9jZXNzb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIE1hdGgubWF4KDAsZSl9LGNsaToiLXMsIC0tbWF4LXNpemUgPG4+IixjbGlQcm9jZXNzb3I6cGFyc2VJbnR9LG1heEV4cGFuZDp7dHlwZToibnVtYmVyIixkZWZhdWx0OjFlMyxkZXNjcmlwdGlvbjoiTGltaXQgdGhlIG51bWJlciBvZiBtYWNybyBleHBhbnNpb25zIHRvIHRoZSBzcGVjaWZpZWQgbnVtYmVyLCB0byBwcmV2ZW50IGUuZy4gaW5maW5pdGUgbWFjcm8gbG9vcHMuIElmIHNldCB0byBJbmZpbml0eSwgdGhlIG1hY3JvIGV4cGFuZGVyIHdpbGwgdHJ5IHRvIGZ1bGx5IGV4cGFuZCBhcyBpbiBMYVRlWC4iLHByb2Nlc3NvcjpmdW5jdGlvbihlKXtyZXR1cm4gTWF0aC5tYXgoMCxlKX0sY2xpOiItZSwgLS1tYXgtZXhwYW5kIDxuPiIsY2xpUHJvY2Vzc29yOmZ1bmN0aW9uKGUpe3JldHVybiJJbmZpbml0eSI9PT1lPzEvMDpwYXJzZUludChlKX19LGdsb2JhbEdyb3VwOnt0eXBlOiJib29sZWFuIixjbGk6ITF9fTtmdW5jdGlvbiBjKGUpe2lmKGUuZGVmYXVsdClyZXR1cm4gZS5kZWZhdWx0O3ZhciB0PWUudHlwZSxyPUFycmF5LmlzQXJyYXkodCk/dFswXTp0O2lmKCJzdHJpbmciIT10eXBlb2YgcilyZXR1cm4gci5lbnVtWzBdO3N3aXRjaChyKXtjYXNlImJvb2xlYW4iOnJldHVybiExO2Nhc2Uic3RyaW5nIjpyZXR1cm4iIjtjYXNlIm51bWJlciI6cmV0dXJuIDA7Y2FzZSJvYmplY3QiOnJldHVybnt9fX12YXIgbT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7Zm9yKHZhciB0IGluIHRoaXMuZGlzcGxheU1vZGU9dm9pZCAwLHRoaXMub3V0cHV0PXZvaWQgMCx0aGlzLmxlcW5vPXZvaWQgMCx0aGlzLmZsZXFuPXZvaWQgMCx0aGlzLnRocm93T25FcnJvcj12b2lkIDAsdGhpcy5lcnJvckNvbG9yPXZvaWQgMCx0aGlzLm1hY3Jvcz12b2lkIDAsdGhpcy5taW5SdWxlVGhpY2tuZXNzPXZvaWQgMCx0aGlzLmNvbG9ySXNUZXh0Q29sb3I9dm9pZCAwLHRoaXMuc3RyaWN0PXZvaWQgMCx0aGlzLnRydXN0PXZvaWQgMCx0aGlzLm1heFNpemU9dm9pZCAwLHRoaXMubWF4RXhwYW5kPXZvaWQgMCx0aGlzLmdsb2JhbEdyb3VwPXZvaWQgMCxlPWV8fHt9LGgpaWYoaC5oYXNPd25Qcm9wZXJ0eSh0KSl7dmFyIHI9aFt0XTt0aGlzW3RdPXZvaWQgMCE9PWVbdF0/ci5wcm9jZXNzb3I/ci5wcm9jZXNzb3IoZVt0XSk6ZVt0XTpjKHIpfX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5yZXBvcnROb25zdHJpY3Q9ZnVuY3Rpb24oZSx0LHIpe3ZhciBhPXRoaXMuc3RyaWN0O2lmKCJmdW5jdGlvbiI9PXR5cGVvZiBhJiYoYT1hKGUsdCxyKSksYSYmImlnbm9yZSIhPT1hKXtpZighMD09PWF8fCJlcnJvciI9PT1hKXRocm93IG5ldyBuKCJMYVRlWC1pbmNvbXBhdGlibGUgaW5wdXQgYW5kIHN0cmljdCBtb2RlIGlzIHNldCB0byAnZXJyb3InOiAiK3QrIiBbIitlKyJdIixyKTsid2FybiI9PT1hPyJ1bmRlZmluZWQiIT10eXBlb2YgY29uc29sZSYmY29uc29sZS53YXJuKCJMYVRlWC1pbmNvbXBhdGlibGUgaW5wdXQgYW5kIHN0cmljdCBtb2RlIGlzIHNldCB0byAnd2Fybic6ICIrdCsiIFsiK2UrIl0iKToidW5kZWZpbmVkIiE9dHlwZW9mIGNvbnNvbGUmJmNvbnNvbGUud2FybigiTGFUZVgtaW5jb21wYXRpYmxlIGlucHV0IGFuZCBzdHJpY3QgbW9kZSBpcyBzZXQgdG8gdW5yZWNvZ25pemVkICciK2ErIic6ICIrdCsiIFsiK2UrIl0iKX19LHQudXNlU3RyaWN0QmVoYXZpb3I9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPXRoaXMuc3RyaWN0O2lmKCJmdW5jdGlvbiI9PXR5cGVvZiBuKXRyeXtuPW4oZSx0LHIpfWNhdGNoKGUpe249ImVycm9yIn1yZXR1cm4hKCFufHwiaWdub3JlIj09PW4pJiYoITA9PT1ufHwiZXJyb3IiPT09bnx8KCJ3YXJuIj09PW4/KCJ1bmRlZmluZWQiIT10eXBlb2YgY29uc29sZSYmY29uc29sZS53YXJuKCJMYVRlWC1pbmNvbXBhdGlibGUgaW5wdXQgYW5kIHN0cmljdCBtb2RlIGlzIHNldCB0byAnd2Fybic6ICIrdCsiIFsiK2UrIl0iKSwhMSk6KCJ1bmRlZmluZWQiIT10eXBlb2YgY29uc29sZSYmY29uc29sZS53YXJuKCJMYVRlWC1pbmNvbXBhdGlibGUgaW5wdXQgYW5kIHN0cmljdCBtb2RlIGlzIHNldCB0byB1bnJlY29nbml6ZWQgJyIrbisiJzogIit0KyIgWyIrZSsiXSIpLCExKSkpfSx0LmlzVHJ1c3RlZD1mdW5jdGlvbihlKXtlLnVybCYmIWUucHJvdG9jb2wmJihlLnByb3RvY29sPWwucHJvdG9jb2xGcm9tVXJsKGUudXJsKSk7dmFyIHQ9ImZ1bmN0aW9uIj09dHlwZW9mIHRoaXMudHJ1c3Q/dGhpcy50cnVzdChlKTp0aGlzLnRydXN0O3JldHVybiBCb29sZWFuKHQpfSxlfSgpLHU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCxyKXt0aGlzLmlkPXZvaWQgMCx0aGlzLnNpemU9dm9pZCAwLHRoaXMuY3JhbXBlZD12b2lkIDAsdGhpcy5pZD1lLHRoaXMuc2l6ZT10LHRoaXMuY3JhbXBlZD1yfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnN1cD1mdW5jdGlvbigpe3JldHVybiBwW2RbdGhpcy5pZF1dfSx0LnN1Yj1mdW5jdGlvbigpe3JldHVybiBwW2ZbdGhpcy5pZF1dfSx0LmZyYWNOdW09ZnVuY3Rpb24oKXtyZXR1cm4gcFtnW3RoaXMuaWRdXX0sdC5mcmFjRGVuPWZ1bmN0aW9uKCl7cmV0dXJuIHBbdlt0aGlzLmlkXV19LHQuY3JhbXA9ZnVuY3Rpb24oKXtyZXR1cm4gcFtiW3RoaXMuaWRdXX0sdC50ZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHBbeVt0aGlzLmlkXV19LHQuaXNUaWdodD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNpemU+PTJ9LGV9KCkscD1bbmV3IHUoMCwwLCExKSxuZXcgdSgxLDAsITApLG5ldyB1KDIsMSwhMSksbmV3IHUoMywxLCEwKSxuZXcgdSg0LDIsITEpLG5ldyB1KDUsMiwhMCksbmV3IHUoNiwzLCExKSxuZXcgdSg3LDMsITApXSxkPVs0LDUsNCw1LDYsNyw2LDddLGY9WzUsNSw1LDUsNyw3LDcsN10sZz1bMiwzLDQsNSw2LDcsNiw3XSx2PVszLDMsNSw1LDcsNyw3LDddLGI9WzEsMSwzLDMsNSw1LDcsN10seT1bMCwxLDIsMywyLDMsMiwzXSx4PXtESVNQTEFZOnBbMF0sVEVYVDpwWzJdLFNDUklQVDpwWzRdLFNDUklQVFNDUklQVDpwWzZdfSx3PVt7bmFtZToibGF0aW4iLGJsb2NrczpbWzI1Niw1OTFdLFs3NjgsODc5XV19LHtuYW1lOiJjeXJpbGxpYyIsYmxvY2tzOltbMTAyNCwxMjc5XV19LHtuYW1lOiJhcm1lbmlhbiIsYmxvY2tzOltbMTMyOCwxNDIzXV19LHtuYW1lOiJicmFobWljIixibG9ja3M6W1syMzA0LDQyNTVdXX0se25hbWU6Imdlb3JnaWFuIixibG9ja3M6W1s0MjU2LDQzNTFdXX0se25hbWU6ImNqayIsYmxvY2tzOltbMTIyODgsMTI1NDNdLFsxOTk2OCw0MDg3OV0sWzY1MjgwLDY1Mzc2XV19LHtuYW1lOiJoYW5ndWwiLGJsb2NrczpbWzQ0MDMyLDU1MjE1XV19XTt2YXIgaz1bXTtmdW5jdGlvbiBTKGUpe2Zvcih2YXIgdD0wO3Q8ay5sZW5ndGg7dCs9MilpZihlPj1rW3RdJiZlPD1rW3QrMV0pcmV0dXJuITA7cmV0dXJuITF9dy5mb3JFYWNoKChmdW5jdGlvbihlKXtyZXR1cm4gZS5ibG9ja3MuZm9yRWFjaCgoZnVuY3Rpb24oZSl7cmV0dXJuIGsucHVzaC5hcHBseShrLGUpfSkpfSkpO3ZhciBNPTgwLHo9e2RvdWJsZWxlZnRhcnJvdzoiTTI2MiAxNTdcbmwxMC0xMGMzNC0zNiA2Mi43LTc3IDg2LTEyMyAzLjMtOCA1LTEzLjMgNS0xNiAwLTUuMy02LjctOC0yMC04LTcuM1xuIDAtMTIuMi41LTE0LjUgMS41LTIuMyAxLTQuOCA0LjUtNy41IDEwLjUtNDkuMyA5Ny4zLTEyMS43IDE2OS4zLTIxNyAyMTYtMjhcbiAxNC01Ny4zIDI1LTg4IDMzLTYuNyAyLTExIDMuOC0xMyA1LjUtMiAxLjctMyA0LjItMyA3LjVzMSA1LjggMyA3LjVcbmMyIDEuNyA2LjMgMy41IDEzIDUuNSA2OCAxNy4zIDEyOC4yIDQ3LjggMTgwLjUgOTEuNSA1Mi4zIDQzLjcgOTMuOCA5Ni4yIDEyNC41XG4gMTU3LjUgOS4zIDggMTUuMyAxMi4zIDE4IDEzaDZjMTItLjcgMTgtNCAxOC0xMCAwLTItMS43LTctNS0xNS0yMy4zLTQ2LTUyLTg3XG4tODYtMTIzbC0xMC0xMGgzOTk3Mzh2LTQwSDIxOGMzMjggMCAwIDAgMCAwbC0xMC04Yy0yNi43LTIwLTY1LjctNDMtMTE3LTY5IDIuN1xuLTIgNi0zLjcgMTAtNSAzNi43LTE2IDcyLjMtMzcuMyAxMDctNjRsMTAtOGgzOTk3ODJ2LTQwelxubTggMHY0MGgzOTk3MzB2LTQwem0wIDE5NHY0MGgzOTk3MzB2LTQweiIsZG91YmxlcmlnaHRhcnJvdzoiTTM5OTczOCAzOTJsXG4tMTAgMTBjLTM0IDM2LTYyLjcgNzctODYgMTIzLTMuMyA4LTUgMTMuMy01IDE2IDAgNS4zIDYuNyA4IDIwIDggNy4zIDAgMTIuMi0uNVxuIDE0LjUtMS41IDIuMy0xIDQuOC00LjUgNy41LTEwLjUgNDkuMy05Ny4zIDEyMS43LTE2OS4zIDIxNy0yMTYgMjgtMTQgNTcuMy0yNSA4OFxuLTMzIDYuNy0yIDExLTMuOCAxMy01LjUgMi0xLjcgMy00LjIgMy03LjVzLTEtNS44LTMtNy41Yy0yLTEuNy02LjMtMy41LTEzLTUuNS02OFxuLTE3LjMtMTI4LjItNDcuOC0xODAuNS05MS41LTUyLjMtNDMuNy05My44LTk2LjItMTI0LjUtMTU3LjUtOS4zLTgtMTUuMy0xMi4zLTE4XG4tMTNoLTZjLTEyIC43LTE4IDQtMTggMTAgMCAyIDEuNyA3IDUgMTUgMjMuMyA0NiA1MiA4NyA4NiAxMjNsMTAgMTBIMHY0MGgzOTk3ODJcbmMtMzI4IDAgMCAwIDAgMGwxMCA4YzI2LjcgMjAgNjUuNyA0MyAxMTcgNjktMi43IDItNiAzLjctMTAgNS0zNi43IDE2LTcyLjMgMzcuM1xuLTEwNyA2NGwtMTAgOEgwdjQwek0wIDE1N3Y0MGgzOTk3MzB2LTQwem0wIDE5NHY0MGgzOTk3MzB2LTQweiIsbGVmdGFycm93OiJNNDAwMDAwIDI0MUgxMTBsMy0zYzY4LjctNTIuNyAxMTMuNy0xMjBcbiAxMzUtMjAyIDQtMTQuNyA2LTIzIDYtMjUgMC03LjMtNy0xMS0yMS0xMS04IDAtMTMuMi44LTE1LjUgMi41LTIuMyAxLjctNC4yIDUuOFxuLTUuNSAxMi41LTEuMyA0LjctMi43IDEwLjMtNCAxNy0xMiA0OC43LTM0LjggOTItNjguNSAxMzBTNjUuMyAyMjguMyAxOCAyNDdcbmMtMTAgNC0xNiA3LjctMTggMTEgMCA4LjcgNiAxNC4zIDE4IDE3IDQ3LjMgMTguNyA4Ny44IDQ3IDEyMS41IDg1UzE5NiA0NDEuMyAyMDhcbiA0OTBjLjcgMiAxLjMgNSAyIDlzMS4yIDYuNyAxLjUgOGMuMyAxLjMgMSAzLjMgMiA2czIuMiA0LjUgMy41IDUuNWMxLjMgMSAzLjNcbiAxLjggNiAyLjVzNiAxIDEwIDFjMTQgMCAyMS0zLjcgMjEtMTEgMC0yLTItMTAuMy02LTI1LTIwLTc5LjMtNjUtMTQ2LjctMTM1LTIwMlxuIGwtMy0zaDM5OTg5MHpNMTAwIDI0MXY0MGgzOTk5MDB2LTQweiIsbGVmdGJyYWNlOiJNNiA1NDhsLTYtNnYtMzVsNi0xMWM1Ni0xMDQgMTM1LjMtMTgxLjMgMjM4LTIzMiA1Ny4zLTI4LjcgMTE3XG4tNDUgMTc5LTUwaDM5OTU3N3YxMjBINDAzYy00My4zIDctODEgMTUtMTEzIDI2LTEwMC43IDMzLTE3OS43IDkxLTIzNyAxNzQtMi43XG4gNS02IDktMTAgMTMtLjcgMS03LjMgMS0yMCAxSDZ6IixsZWZ0YnJhY2V1bmRlcjoiTTAgNmw2LTZoMTdjMTIuNjg4IDAgMTkuMzEzLjMgMjAgMSA0IDQgNy4zMTMgOC4zIDEwIDEzXG4gMzUuMzEzIDUxLjMgODAuODEzIDkzLjggMTM2LjUgMTI3LjUgNTUuNjg4IDMzLjcgMTE3LjE4OCA1NS44IDE4NC41IDY2LjUuNjg4XG4gMCAyIC4zIDQgMSAxOC42ODggMi43IDc2IDQuMyAxNzIgNWgzOTk0NTB2MTIwSDQyOWwtNi0xYy0xMjQuNjg4LTgtMjM1LTYxLjdcbi0zMzEtMTYxQzYwLjY4NyAxMzguNyAzMi4zMTIgOTkuMyA3IDU0TDAgNDFWNnoiLGxlZnRncm91cDoiTTQwMDAwMCA4MFxuSDQzNUM2NCA4MCAxNjguMyAyMjkuNCAyMSAyNjBjLTUuOSAxLjItMTggMC0xOCAwLTIgMC0zLTEtMy0zdi0zOEM3NiA2MSAyNTcgMFxuIDQzNSAwaDM5OTU2NXoiLGxlZnRncm91cHVuZGVyOiJNNDAwMDAwIDI2MlxuSDQzNUM2NCAyNjIgMTY4LjMgMTEyLjYgMjEgODJjLTUuOS0xLjItMTggMC0xOCAwLTIgMC0zIDEtMyAzdjM4Yzc2IDE1OCAyNTcgMjE5XG4gNDM1IDIxOWgzOTk1NjV6IixsZWZ0aGFycG9vbjoiTTAgMjY3Yy43IDUuMyAzIDEwIDcgMTRoMzk5OTkzdi00MEg5M2MzLjNcbi0zLjMgMTAuMi05LjUgMjAuNS0xOC41czE3LjgtMTUuOCAyMi41LTIwLjVjNTAuNy01MiA4OC0xMTAuMyAxMTItMTc1IDQtMTEuMyA1XG4tMTguMyAzLTIxLTEuMy00LTcuMy02LTE4LTYtOCAwLTEzIC43LTE1IDJzLTQuNyA2LjctOCAxNmMtNDIgOTguNy0xMDcuMyAxNzQuN1xuLTE5NiAyMjgtNi43IDQuNy0xMC43IDgtMTIgMTAtMS4zIDItMiA1LjctMiAxMXptMTAwLTI2djQwaDM5OTkwMHYtNDB6IixsZWZ0aGFycG9vbnBsdXM6Ik0wIDI2N2MuNyA1LjMgMyAxMCA3IDE0aDM5OTk5M3YtNDBIOTNjMy4zLTMuMyAxMC4yLTkuNVxuIDIwLjUtMTguNXMxNy44LTE1LjggMjIuNS0yMC41YzUwLjctNTIgODgtMTEwLjMgMTEyLTE3NSA0LTExLjMgNS0xOC4zIDMtMjEtMS4zXG4tNC03LjMtNi0xOC02LTggMC0xMyAuNy0xNSAycy00LjcgNi43LTggMTZjLTQyIDk4LjctMTA3LjMgMTc0LjctMTk2IDIyOC02LjcgNC43XG4tMTAuNyA4LTEyIDEwLTEuMyAyLTIgNS43LTIgMTF6bTEwMC0yNnY0MGgzOTk5MDB2LTQwek0wIDQzNXY0MGg0MDAwMDB2LTQwelxubTAgMHY0MGg0MDAwMDB2LTQweiIsbGVmdGhhcnBvb25kb3duOiJNNyAyNDFjLTQgNC02LjMzMyA4LjY2Ny03IDE0IDAgNS4zMzMuNjY3IDkgMiAxMXM1LjMzM1xuIDUuMzMzIDEyIDEwYzkwLjY2NyA1NCAxNTYgMTMwIDE5NiAyMjggMy4zMzMgMTAuNjY3IDYuMzMzIDE2LjMzMyA5IDE3IDIgLjY2NyA1XG4gMSA5IDFoNWMxMC42NjcgMCAxNi42NjctMiAxOC02IDItMi42NjcgMS05LjY2Ny0zLTIxLTMyLTg3LjMzMy04Mi42NjctMTU3LjY2N1xuLTE1Mi0yMTFsLTMtM2gzOTk5MDd2LTQwek05MyAyODEgSDQwMDAwMCB2LTQwTDcgMjQxeiIsbGVmdGhhcnBvb25kb3ducGx1czoiTTcgNDM1Yy00IDQtNi4zIDguNy03IDE0IDAgNS4zLjcgOSAyIDExczUuMyA1LjMgMTJcbiAxMGM5MC43IDU0IDE1NiAxMzAgMTk2IDIyOCAzLjMgMTAuNyA2LjMgMTYuMyA5IDE3IDIgLjcgNSAxIDkgMWg1YzEwLjcgMCAxNi43XG4tMiAxOC02IDItMi43IDEtOS43LTMtMjEtMzItODcuMy04Mi43LTE1Ny43LTE1Mi0yMTFsLTMtM2gzOTk5MDd2LTQwSDd6bTkzIDBcbnY0MGgzOTk5MDB2LTQwek0wIDI0MXY0MGgzOTk5MDB2LTQwem0wIDB2NDBoMzk5OTAwdi00MHoiLGxlZnRob29rOiJNNDAwMDAwIDI4MSBIMTAzcy0zMy0xMS4yLTYxLTMzLjVTMCAxOTcuMyAwIDE2NHMxNC4yLTYxLjIgNDIuNVxuLTgzLjVDNzAuOCA1OC4yIDEwNCA0NyAxNDIgNDcgYzE2LjcgMCAyNSA2LjcgMjUgMjAgMCAxMi04LjcgMTguNy0yNiAyMC00MCAzLjNcbi02OC43IDE1LjctODYgMzctMTAgMTItMTUgMjUuMy0xNSA0MCAwIDIyLjcgOS44IDQwLjcgMjkuNSA1NCAxOS43IDEzLjMgNDMuNSAyMVxuIDcxLjUgMjNoMzk5ODU5ek0xMDMgMjgxdi00MGgzOTk4OTd2NDB6IixsZWZ0bGluZXNlZ21lbnQ6Ik00MCAyODEgVjQyOCBIMCBWOTQgSDQwIFYyNDEgSDQwMDAwMCB2NDB6XG5NNDAgMjgxIFY0MjggSDAgVjk0IEg0MCBWMjQxIEg0MDAwMDAgdjQweiIsbGVmdG1hcHN0bzoiTTQwIDI4MSBWNDQ4SDBWNzRINDBWMjQxSDQwMDAwMHY0MHpcbk00MCAyODEgVjQ0OEgwVjc0SDQwVjI0MUg0MDAwMDB2NDB6IixsZWZ0VG9Gcm9tOiJNMCAxNDdoNDAwMDAwdjQwSDB6bTAgMjE0YzY4IDQwIDExNS43IDk1LjcgMTQzIDE2N2gyMmMxNS4zIDAgMjNcbi0uMyAyMy0xIDAtMS4zLTUuMy0xMy43LTE2LTM3LTE4LTM1LjMtNDEuMy02OS03MC0xMDFsLTctOGgzOTk5MDV2LTQwSDk1bDctOFxuYzI4LjctMzIgNTItNjUuNyA3MC0xMDEgMTAuNy0yMy4zIDE2LTM1LjcgMTYtMzcgMC0uNy03LjctMS0yMy0xaC0yMkMxMTUuNyAyNjUuM1xuIDY4IDMyMSAwIDM2MXptMC0xNzR2LTQwaDM5OTkwMHY0MHptMTAwIDE1NHY0MGgzOTk5MDB2LTQweiIsbG9uZ2VxdWFsOiJNMCA1MCBoNDAwMDAwIHY0MEgweiBtMCAxOTRoNDAwMDB2NDBIMHpcbk0wIDUwIGg0MDAwMDAgdjQwSDB6IG0wIDE5NGg0MDAwMHY0MEgweiIsbWlkYnJhY2U6Ik0yMDA0MjggMzM0XG5jLTEwMC43LTguMy0xOTUuMy00NC0yODAtMTA4LTU1LjMtNDItMTAxLjctOTMtMTM5LTE1M2wtOS0xNGMtMi43IDQtNS43IDguNy05IDE0XG4tNTMuMyA4Ni43LTEyMy43IDE1My0yMTEgMTk5LTY2LjcgMzYtMTM3LjMgNTYuMy0yMTIgNjJIMFYyMTRoMTk5NTY4YzE3OC4zLTExLjdcbiAzMTEuNy03OC4zIDQwMy0yMDEgNi04IDkuNy0xMiAxMS0xMiAuNy0uNyA2LjctMSAxOC0xczE3LjMuMyAxOCAxYzEuMyAwIDUgNCAxMVxuIDEyIDQ0LjcgNTkuMyAxMDEuMyAxMDYuMyAxNzAgMTQxczE0NS4zIDU0LjMgMjI5IDYwaDE5OTU3MnYxMjB6IixtaWRicmFjZXVuZGVyOiJNMTk5NTcyIDIxNFxuYzEwMC43IDguMyAxOTUuMyA0NCAyODAgMTA4IDU1LjMgNDIgMTAxLjcgOTMgMTM5IDE1M2w5IDE0YzIuNy00IDUuNy04LjcgOS0xNFxuIDUzLjMtODYuNyAxMjMuNy0xNTMgMjExLTE5OSA2Ni43LTM2IDEzNy4zLTU2LjMgMjEyLTYyaDE5OTU2OHYxMjBIMjAwNDMyYy0xNzguM1xuIDExLjctMzExLjcgNzguMy00MDMgMjAxLTYgOC05LjcgMTItMTEgMTItLjcuNy02LjcgMS0xOCAxcy0xNy4zLS4zLTE4LTFjLTEuMyAwXG4tNS00LTExLTEyLTQ0LjctNTkuMy0xMDEuMy0xMDYuMy0xNzAtMTQxcy0xNDUuMy01NC4zLTIyOS02MEgwVjIxNHoiLG9paW50U2l6ZTE6Ik01MTIuNiA3MS42YzI3Mi42IDAgMzIwLjMgMTA2LjggMzIwLjMgMTc4LjIgMCA3MC44LTQ3LjcgMTc3LjZcbi0zMjAuMyAxNzcuNlMxOTMuMSAzMjAuNiAxOTMuMSAyNDkuOGMwLTcxLjQgNDYuOS0xNzguMiAzMTkuNS0xNzguMnpcbm0zNjguMSAxNzguMmMwLTg2LjQtNjAuOS0yMTUuNC0zNjguMS0yMTUuNC0zMDYuNCAwLTM2Ny4zIDEyOS0zNjcuMyAyMTUuNCAwIDg1LjhcbjYwLjkgMjE0LjggMzY3LjMgMjE0LjggMzA3LjIgMCAzNjguMS0xMjkgMzY4LjEtMjE0Ljh6IixvaWludFNpemUyOiJNNzU3LjggMTAwLjFjMzg0LjcgMCA0NTEuMSAxMzcuNiA0NTEuMSAyMzAgMCA5MS4zLTY2LjQgMjI4Ljhcbi00NTEuMSAyMjguOC0zODYuMyAwLTQ1Mi43LTEzNy41LTQ1Mi43LTIyOC44IDAtOTIuNCA2Ni40LTIzMCA0NTIuNy0yMzB6XG5tNTAyLjQgMjMwYzAtMTExLjItODIuNC0yNzcuMi01MDIuNC0yNzcuMnMtNTA0IDE2Ni01MDQgMjc3LjJcbmMwIDExMCA4NCAyNzYgNTA0IDI3NnM1MDIuNC0xNjYgNTAyLjQtMjc2eiIsb2lpaW50U2l6ZTE6Ik02ODEuNCA3MS42YzQwOC45IDAgNDgwLjUgMTA2LjggNDgwLjUgMTc4LjIgMCA3MC44LTcxLjYgMTc3LjZcbi00ODAuNSAxNzcuNlMyMDIuMSAzMjAuNiAyMDIuMSAyNDkuOGMwLTcxLjQgNzAuNS0xNzguMiA0NzkuMy0xNzguMnpcbm01MjUuOCAxNzguMmMwLTg2LjQtODYuOC0yMTUuNC01MjUuNy0yMTUuNC00MzcuOSAwLTUyNC43IDEyOS01MjQuNyAyMTUuNCAwXG44NS44IDg2LjggMjE0LjggNTI0LjcgMjE0LjggNDM4LjkgMCA1MjUuNy0xMjkgNTI1LjctMjE0Ljh6IixvaWlpbnRTaXplMjoiTTEwMjEuMiA1M2M2MDMuNiAwIDcwNy44IDE2NS44IDcwNy44IDI3Ny4yIDAgMTEwLTEwNC4yIDI3NS44XG4tNzA3LjggMjc1LjgtNjA2IDAtNzEwLjItMTY1LjgtNzEwLjItMjc1LjhDMzExIDIxOC44IDQxNS4yIDUzIDEwMjEuMiA1M3pcbm03NzAuNCAyNzcuMWMwLTEzMS4yLTEyNi40LTMyNy42LTc3MC41LTMyNy42UzI0OC40IDE5OC45IDI0OC40IDMzMC4xXG5jMCAxMzAgMTI4LjggMzI2LjQgNzcyLjcgMzI2LjRzNzcwLjUtMTk2LjQgNzcwLjUtMzI2LjR6IixyaWdodGFycm93OiJNMCAyNDF2NDBoMzk5ODkxYy00Ny4zIDM1LjMtODQgNzgtMTEwIDEyOFxuLTE2LjcgMzItMjcuNyA2My43LTMzIDk1IDAgMS4zLS4yIDIuNy0uNSA0LS4zIDEuMy0uNSAyLjMtLjUgMyAwIDcuMyA2LjcgMTEgMjBcbiAxMSA4IDAgMTMuMi0uOCAxNS41LTIuNSAyLjMtMS43IDQuMi01LjUgNS41LTExLjUgMi0xMy4zIDUuNy0yNyAxMS00MSAxNC43LTQ0LjdcbiAzOS04NC41IDczLTExOS41czczLjctNjAuMiAxMTktNzUuNWM2LTIgOS01LjcgOS0xMXMtMy05LTktMTFjLTQ1LjMtMTUuMy04NVxuLTQwLjUtMTE5LTc1LjVzLTU4LjMtNzQuOC03My0xMTkuNWMtNC43LTE0LTguMy0yNy4zLTExLTQwLTEuMy02LjctMy4yLTEwLjgtNS41XG4tMTIuNS0yLjMtMS43LTcuNS0yLjUtMTUuNS0yLjUtMTQgMC0yMSAzLjctMjEgMTEgMCAyIDIgMTAuMyA2IDI1IDIwLjcgODMuMyA2N1xuIDE1MS43IDEzOSAyMDV6bTAgMHY0MGgzOTk5MDB2LTQweiIscmlnaHRicmFjZToiTTQwMDAwMCA1NDJsXG4tNiA2aC0xN2MtMTIuNyAwLTE5LjMtLjMtMjAtMS00LTQtNy4zLTguMy0xMC0xMy0zNS4zLTUxLjMtODAuOC05My44LTEzNi41LTEyNy41XG5zLTExNy4yLTU1LjgtMTg0LjUtNjYuNWMtLjcgMC0yLS4zLTQtMS0xOC43LTIuNy03Ni00LjMtMTcyLTVIMFYyMTRoMzk5NTcxbDYgMVxuYzEyNC43IDggMjM1IDYxLjcgMzMxIDE2MSAzMS4zIDMzLjMgNTkuNyA3Mi43IDg1IDExOGw3IDEzdjM1eiIscmlnaHRicmFjZXVuZGVyOiJNMzk5OTk0IDBsNiA2djM1bC02IDExYy01NiAxMDQtMTM1LjMgMTgxLjMtMjM4IDIzMi01Ny4zXG4gMjguNy0xMTcgNDUtMTc5IDUwSC0zMDBWMjE0aDM5OTg5N2M0My4zLTcgODEtMTUgMTEzLTI2IDEwMC43LTMzIDE3OS43LTkxIDIzN1xuLTE3NCAyLjctNSA2LTkgMTAtMTMgLjctMSA3LjMtMSAyMC0xaDE3eiIscmlnaHRncm91cDoiTTAgODBoMzk5NTY1YzM3MSAwIDI2Ni43IDE0OS40IDQxNCAxODAgNS45IDEuMiAxOCAwIDE4IDAgMiAwXG4gMy0xIDMtM3YtMzhjLTc2LTE1OC0yNTctMjE5LTQzNS0yMTlIMHoiLHJpZ2h0Z3JvdXB1bmRlcjoiTTAgMjYyaDM5OTU2NWMzNzEgMCAyNjYuNy0xNDkuNCA0MTQtMTgwIDUuOS0xLjIgMTggMCAxOFxuIDAgMiAwIDMgMSAzIDN2MzhjLTc2IDE1OC0yNTcgMjE5LTQzNSAyMTlIMHoiLHJpZ2h0aGFycG9vbjoiTTAgMjQxdjQwaDM5OTk5M2M0LjctNC43IDctOS4zIDctMTQgMC05LjNcbi0zLjctMTUuMy0xMS0xOC05Mi43LTU2LjctMTU5LTEzMy43LTE5OS0yMzEtMy4zLTkuMy02LTE0LjctOC0xNi0yLTEuMy03LTItMTUtMlxuLTEwLjcgMC0xNi43IDItMTggNi0yIDIuNy0xIDkuNyAzIDIxIDE1LjMgNDIgMzYuNyA4MS44IDY0IDExOS41IDI3LjMgMzcuNyA1OFxuIDY5LjIgOTIgOTQuNXptMCAwdjQwaDM5OTkwMHYtNDB6IixyaWdodGhhcnBvb25wbHVzOiJNMCAyNDF2NDBoMzk5OTkzYzQuNy00LjcgNy05LjMgNy0xNCAwLTkuMy0zLjctMTUuMy0xMVxuLTE4LTkyLjctNTYuNy0xNTktMTMzLjctMTk5LTIzMS0zLjMtOS4zLTYtMTQuNy04LTE2LTItMS4zLTctMi0xNS0yLTEwLjcgMC0xNi43XG4gMi0xOCA2LTIgMi43LTEgOS43IDMgMjEgMTUuMyA0MiAzNi43IDgxLjggNjQgMTE5LjUgMjcuMyAzNy43IDU4IDY5LjIgOTIgOTQuNXpcbm0wIDB2NDBoMzk5OTAwdi00MHogbTEwMCAxOTR2NDBoMzk5OTAwdi00MHptMCAwdjQwaDM5OTkwMHYtNDB6IixyaWdodGhhcnBvb25kb3duOiJNMzk5NzQ3IDUxMWMwIDcuMyA2LjcgMTEgMjAgMTEgOCAwIDEzLS44IDE1LTIuNXM0LjctNi44XG4gOC0xNS41YzQwLTk0IDk5LjMtMTY2LjMgMTc4LTIxNyAxMy4zLTggMjAuMy0xMi4zIDIxLTEzIDUuMy0zLjMgOC41LTUuOCA5LjVcbi03LjUgMS0xLjcgMS41LTUuMiAxLjUtMTAuNXMtMi4zLTEwLjMtNy0xNUgwdjQwaDM5OTkwOGMtMzQgMjUuMy02NC43IDU3LTkyIDk1XG4tMjcuMyAzOC00OC43IDc3LjctNjQgMTE5LTMuMyA4LjctNSAxNC01IDE2ek0wIDI0MXY0MGgzOTk5MDB2LTQweiIscmlnaHRoYXJwb29uZG93bnBsdXM6Ik0zOTk3NDcgNzA1YzAgNy4zIDYuNyAxMSAyMCAxMSA4IDAgMTMtLjhcbiAxNS0yLjVzNC43LTYuOCA4LTE1LjVjNDAtOTQgOTkuMy0xNjYuMyAxNzgtMjE3IDEzLjMtOCAyMC4zLTEyLjMgMjEtMTMgNS4zLTMuM1xuIDguNS01LjggOS41LTcuNSAxLTEuNyAxLjUtNS4yIDEuNS0xMC41cy0yLjMtMTAuMy03LTE1SDB2NDBoMzk5OTA4Yy0zNCAyNS4zXG4tNjQuNyA1Ny05MiA5NS0yNy4zIDM4LTQ4LjcgNzcuNy02NCAxMTktMy4zIDguNy01IDE0LTUgMTZ6TTAgNDM1djQwaDM5OTkwMHYtNDB6XG5tMC0xOTR2NDBoNDAwMDAwdi00MHptMCAwdjQwaDQwMDAwMHYtNDB6IixyaWdodGhvb2s6Ik0zOTk4NTkgMjQxYy03NjQgMCAwIDAgMCAwIDQwLTMuMyA2OC43LTE1LjcgODYtMzcgMTAtMTIgMTUtMjUuM1xuIDE1LTQwIDAtMjIuNy05LjgtNDAuNy0yOS41LTU0LTE5LjctMTMuMy00My41LTIxLTcxLjUtMjMtMTcuMy0xLjMtMjYtOC0yNi0yMCAwXG4tMTMuMyA4LjctMjAgMjYtMjAgMzggMCA3MSAxMS4yIDk5IDMzLjUgMCAwIDcgNS42IDIxIDE2LjcgMTQgMTEuMiAyMSAzMy41IDIxXG4gNjYuOHMtMTQgNjEuMi00MiA4My41Yy0yOCAyMi4zLTYxIDMzLjUtOTkgMzMuNUwwIDI0MXogTTAgMjgxdi00MGgzOTk4NTl2NDB6IixyaWdodGxpbmVzZWdtZW50OiJNMzk5OTYwIDI0MSBWOTQgaDQwIFY0MjggaC00MCBWMjgxIEgwIHYtNDB6XG5NMzk5OTYwIDI0MSBWOTQgaDQwIFY0MjggaC00MCBWMjgxIEgwIHYtNDB6IixyaWdodFRvRnJvbToiTTQwMDAwMCAxNjdjLTcwLjctNDItMTE4LTk3LjctMTQyLTE2N2gtMjNjLTE1LjMgMC0yMyAuMy0yM1xuIDEgMCAxLjMgNS4zIDEzLjcgMTYgMzcgMTggMzUuMyA0MS4zIDY5IDcwIDEwMWw3IDhIMHY0MGgzOTk5MDVsLTcgOGMtMjguNyAzMlxuLTUyIDY1LjctNzAgMTAxLTEwLjcgMjMuMy0xNiAzNS43LTE2IDM3IDAgLjcgNy43IDEgMjMgMWgyM2MyNC02OS4zIDcxLjMtMTI1IDE0MlxuLTE2N3ogTTEwMCAxNDd2NDBoMzk5OTAwdi00MHpNMCAzNDF2NDBoMzk5OTAwdi00MHoiLHR3b2hlYWRsZWZ0YXJyb3c6Ik0wIDE2N2M2OCA0MFxuIDExNS43IDk1LjcgMTQzIDE2N2gyMmMxNS4zIDAgMjMtLjMgMjMtMSAwLTEuMy01LjMtMTMuNy0xNi0zNy0xOC0zNS4zLTQxLjMtNjlcbi03MC0xMDFsLTctOGgxMjVsOSA3YzUwLjcgMzkuMyA4NSA4NiAxMDMgMTQwaDQ2YzAtNC43LTYuMy0xOC43LTE5LTQyLTE4LTM1LjNcbi00MC02Ny4zLTY2LTk2bC05LTloMzk5NzE2di00MEgyODRsOS05YzI2LTI4LjcgNDgtNjAuNyA2Ni05NiAxMi43LTIzLjMzMyAxOVxuLTM3LjMzMyAxOS00MmgtNDZjLTE4IDU0LTUyLjMgMTAwLjctMTAzIDE0MGwtOSA3SDk1bDctOGMyOC43LTMyIDUyLTY1LjcgNzAtMTAxXG4gMTAuNy0yMy4zMzMgMTYtMzUuNyAxNi0zNyAwLS43LTcuNy0xLTIzLTFoLTIyQzExNS43IDcxLjMgNjggMTI3IDAgMTY3eiIsdHdvaGVhZHJpZ2h0YXJyb3c6Ik00MDAwMDAgMTY3XG5jLTY4LTQwLTExNS43LTk1LjctMTQzLTE2N2gtMjJjLTE1LjMgMC0yMyAuMy0yMyAxIDAgMS4zIDUuMyAxMy43IDE2IDM3IDE4IDM1LjNcbiA0MS4zIDY5IDcwIDEwMWw3IDhoLTEyNWwtOS03Yy01MC43LTM5LjMtODUtODYtMTAzLTE0MGgtNDZjMCA0LjcgNi4zIDE4LjcgMTkgNDJcbiAxOCAzNS4zIDQwIDY3LjMgNjYgOTZsOSA5SDB2NDBoMzk5NzE2bC05IDljLTI2IDI4LjctNDggNjAuNy02NiA5Ni0xMi43IDIzLjMzM1xuLTE5IDM3LjMzMy0xOSA0Mmg0NmMxOC01NCA1Mi4zLTEwMC43IDEwMy0xNDBsOS03aDEyNWwtNyA4Yy0yOC43IDMyLTUyIDY1LjctNzBcbiAxMDEtMTAuNyAyMy4zMzMtMTYgMzUuNy0xNiAzNyAwIC43IDcuNyAxIDIzIDFoMjJjMjcuMy03MS4zIDc1LTEyNyAxNDMtMTY3eiIsdGlsZGUxOiJNMjAwIDU1LjUzOGMtNzcgMC0xNjggNzMuOTUzLTE3NyA3My45NTMtMyAwLTdcbi0yLjE3NS05LTUuNDM3TDIgOTdjLTEtMi0yLTQtMi02IDAtNCAyLTcgNS05bDIwLTEyQzExNiAxMiAxNzEgMCAyMDcgMGM4NiAwXG4gMTE0IDY4IDE5MSA2OCA3OCAwIDE2OC02OCAxNzctNjggNCAwIDcgMiA5IDVsMTIgMTljMSAyLjE3NSAyIDQuMzUgMiA2LjUyNSAwXG4gNC4zNS0yIDcuNjEzLTUgOS43ODhsLTE5IDEzLjA1Yy05MiA2My4wNzctMTE2LjkzNyA3NS4zMDgtMTgzIDc2LjEyOFxuLTY4LjI2Ny44NDctMTEzLTczLjk1Mi0xOTEtNzMuOTUyeiIsdGlsZGUyOiJNMzQ0IDU1LjI2NmMtMTQyIDAtMzAwLjYzOCA4MS4zMTYtMzExLjUgODYuNDE4XG4tOC4wMSAzLjc2Mi0yMi41IDEwLjkxLTIzLjUgNS41NjJMMSAxMjBjLTEtMi0xLTMtMS00IDAtNSAzLTkgOC0xMGwxOC40LTlDMTYwLjlcbiAzMS45IDI4MyAwIDM1OCAwYzE0OCAwIDE4OCAxMjIgMzMxIDEyMnMzMTQtOTcgMzI2LTk3YzQgMCA4IDIgMTAgN2w3IDIxLjExNFxuYzEgMi4xNCAxIDMuMjEgMSA0LjI4IDAgNS4zNDctMyA5LjYyNi03IDEwLjY5NmwtMjIuMyAxMi42MjJDODUyLjYgMTU4LjM3MiA3NTFcbiAxODEuNDc2IDY3NiAxODEuNDc2Yy0xNDkgMC0xODktMTI2LjIxLTMzMi0xMjYuMjF6Iix0aWxkZTM6Ik03ODYgNTlDNDU3IDU5IDMyIDE3NS4yNDIgMTMgMTc1LjI0MmMtNiAwLTEwLTMuNDU3XG4tMTEtMTAuMzdMLjE1IDEzOGMtMS03IDMtMTIgMTAtMTNsMTkuMi02LjRDMzc4LjQgNDAuNyA2MzQuMyAwIDgwNC4zIDBjMzM3IDBcbiA0MTEuOCAxNTcgNzQ2LjggMTU3IDMyOCAwIDc1NC0xMTIgNzczLTExMiA1IDAgMTAgMyAxMSA5bDEgMTQuMDc1YzEgOC4wNjYtLjY5N1xuIDE2LjU5NS02LjY5NyAxNy40OTJsLTIxLjA1MiA3LjMxYy0zNjcuOSA5OC4xNDYtNjA5LjE1IDEyMi42OTYtNzc4LjE1IDEyMi42OTZcbiAtMzM4IDAtNDA5LTE1Ni41NzMtNzQ0LTE1Ni41NzN6Iix0aWxkZTQ6Ik03ODYgNThDNDU3IDU4IDMyIDE3Ny40ODcgMTMgMTc3LjQ4N2MtNiAwLTEwLTMuMzQ1XG4tMTEtMTAuMDM1TC4xNSAxNDNjLTEtNyAzLTEyIDEwLTEzbDIyLTYuN0MzODEuMiAzNSA2MzcuMTUgMCA4MDcuMTUgMGMzMzcgMCA0MDlcbiAxNzcgNzQ0IDE3NyAzMjggMCA3NTQtMTI3IDc3My0xMjcgNSAwIDEwIDMgMTEgOWwxIDE0Ljc5NGMxIDcuODA1LTMgMTMuMzgtOVxuIDE0LjQ5NWwtMjAuNyA1LjU3NGMtMzY2Ljg1IDk5Ljc5LTYwNy4zIDEzOS4zNzItNzc2LjMgMTM5LjM3Mi0zMzggMC00MDlcbiAtMTc1LjIzNi03NDQtMTc1LjIzNnoiLHZlYzoiTTM3NyAyMGMwLTUuMzMzIDEuODMzLTEwIDUuNS0xNFMzOTEgMCAzOTcgMGM0LjY2NyAwIDguNjY3IDEuNjY3IDEyIDVcbjMuMzMzIDIuNjY3IDYuNjY3IDkgMTAgMTkgNi42NjcgMjQuNjY3IDIwLjMzMyA0My42NjcgNDEgNTcgNy4zMzMgNC42NjcgMTFcbjEwLjY2NyAxMSAxOCAwIDYtMSAxMC0zIDEycy02LjY2NyA1LTE0IDljLTI4LjY2NyAxNC42NjctNTMuNjY3IDM1LjY2Ny03NSA2M1xuLTEuMzMzIDEuMzMzLTMuMTY3IDMuNS01LjUgNi41cy00IDQuODMzLTUgNS41Yy0xIC42NjctMi41IDEuMzMzLTQuNSAycy00LjMzMyAxXG4tNyAxYy00LjY2NyAwLTkuMTY3LTEuODMzLTEzLjUtNS41UzMzNyAxODQgMzM3IDE3OGMwLTEyLjY2NyAxNS42NjctMzIuMzMzIDQ3LTU5XG5IMjEzbC0xNzEtMWMtOC42NjctNi0xMy0xMi4zMzMtMTMtMTkgMC00LjY2NyA0LjMzMy0xMS4zMzMgMTMtMjBoMzU5XG5jLTE2LTI1LjMzMy0yNC00NS0yNC01OXoiLHdpZGVoYXQxOiJNNTI5IDBoNWw1MTkgMTE1YzUgMSA5IDUgOSAxMCAwIDEtMSAyLTEgM2wtNCAyMlxuYy0xIDUtNSA5LTExIDloLTJMNTMyIDY3IDE5IDE1OWgtMmMtNSAwLTktNC0xMS05bC01LTIyYy0xLTYgMi0xMiA4LTEzeiIsd2lkZWhhdDI6Ik0xMTgxIDBoMmwxMTcxIDE3NmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDIyMGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWhhdDM6Ik0xMTgxIDBoMmwxMTcxIDIzNmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDI4MGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWhhdDQ6Ik0xMTgxIDBoMmwxMTcxIDI5NmM2IDAgMTAgNSAxMCAxMWwtMiAyM2MtMSA2LTUgMTBcbi0xMSAxMGgtMUwxMTgyIDY3IDE1IDM0MGgtMWMtNiAwLTEwLTQtMTEtMTBsLTItMjNjLTEtNiA0LTExIDEwLTExeiIsd2lkZWNoZWNrMToiTTUyOSwxNTloNWw1MTksLTExNWM1LC0xLDksLTUsOSwtMTBjMCwtMSwtMSwtMiwtMSwtM2wtNCwtMjJjLTEsXG4tNSwtNSwtOSwtMTEsLTloLTJsLTUxMiw5MmwtNTEzLC05MmgtMmMtNSwwLC05LDQsLTExLDlsLTUsMjJjLTEsNiwyLDEyLDgsMTN6Iix3aWRlY2hlY2syOiJNMTE4MSwyMjBoMmwxMTcxLC0xNzZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwxNTNsLTExNjcsLTE1M2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6Iix3aWRlY2hlY2szOiJNMTE4MSwyODBoMmwxMTcxLC0yMzZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwyMTNsLTExNjcsLTIxM2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6Iix3aWRlY2hlY2s0OiJNMTE4MSwzNDBoMmwxMTcxLC0yOTZjNiwwLDEwLC01LDEwLC0xMWwtMiwtMjNjLTEsLTYsLTUsLTEwLFxuLTExLC0xMGgtMWwtMTE2OCwyNzNsLTExNjcsLTI3M2gtMWMtNiwwLC0xMCw0LC0xMSwxMGwtMiwyM2MtMSw2LDQsMTEsMTAsMTF6IixiYXJhYm92ZWxlZnRhcnJvdzoiTTQwMDAwMCA2MjBoLTM5OTg5MGwzIC0zYzY4LjcgLTUyLjcgMTEzLjcgLTEyMCAxMzUgLTIwMlxuYzQgLTE0LjcgNiAtMjMgNiAtMjVjMCAtNy4zIC03IC0xMSAtMjEgLTExYy04IDAgLTEzLjIgMC44IC0xNS41IDIuNVxuYy0yLjMgMS43IC00LjIgNS44IC01LjUgMTIuNWMtMS4zIDQuNyAtMi43IDEwLjMgLTQgMTdjLTEyIDQ4LjcgLTM0LjggOTIgLTY4LjUgMTMwXG5zLTc0LjIgNjYuMyAtMTIxLjUgODVjLTEwIDQgLTE2IDcuNyAtMTggMTFjMCA4LjcgNiAxNC4zIDE4IDE3YzQ3LjMgMTguNyA4Ny44IDQ3XG4xMjEuNSA4NXM1Ni41IDgxLjMgNjguNSAxMzBjMC43IDIgMS4zIDUgMiA5czEuMiA2LjcgMS41IDhjMC4zIDEuMyAxIDMuMyAyIDZcbnMyLjIgNC41IDMuNSA1LjVjMS4zIDEgMy4zIDEuOCA2IDIuNXM2IDEgMTAgMWMxNCAwIDIxIC0zLjcgMjEgLTExXG5jMCAtMiAtMiAtMTAuMyAtNiAtMjVjLTIwIC03OS4zIC02NSAtMTQ2LjcgLTEzNSAtMjAybC0zIC0zaDM5OTg5MHpcbk0xMDAgNjIwdjQwaDM5OTkwMHYtNDB6IE0wIDI0MXY0MGgzOTk5MDB2LTQwek0wIDI0MXY0MGgzOTk5MDB2LTQweiIscmlnaHRhcnJvd2Fib3ZlYmFyOiJNMCAyNDF2NDBoMzk5ODkxYy00Ny4zIDM1LjMtODQgNzgtMTEwIDEyOC0xNi43IDMyXG4tMjcuNyA2My43LTMzIDk1IDAgMS4zLS4yIDIuNy0uNSA0LS4zIDEuMy0uNSAyLjMtLjUgMyAwIDcuMyA2LjcgMTEgMjAgMTEgOCAwXG4xMy4yLS44IDE1LjUtMi41IDIuMy0xLjcgNC4yLTUuNSA1LjUtMTEuNSAyLTEzLjMgNS43LTI3IDExLTQxIDE0LjctNDQuNyAzOVxuLTg0LjUgNzMtMTE5LjVzNzMuNy02MC4yIDExOS03NS41YzYtMiA5LTUuNyA5LTExcy0zLTktOS0xMWMtNDUuMy0xNS4zLTg1LTQwLjVcbi0xMTktNzUuNXMtNTguMy03NC44LTczLTExOS41Yy00LjctMTQtOC4zLTI3LjMtMTEtNDAtMS4zLTYuNy0zLjItMTAuOC01LjVcbi0xMi41LTIuMy0xLjctNy41LTIuNS0xNS41LTIuNS0xNCAwLTIxIDMuNy0yMSAxMSAwIDIgMiAxMC4zIDYgMjUgMjAuNyA4My4zIDY3XG4xNTEuNyAxMzkgMjA1em05NiAzNzloMzk5ODk0djQwSDB6bTAgMGgzOTk5MDR2NDBIMHoiLGJhcmFib3Zlc2hvcnRsZWZ0aGFycG9vbjoiTTUwNyw0MzVjLTQsNCwtNi4zLDguNywtNywxNGMwLDUuMywwLjcsOSwyLDExXG5jMS4zLDIsNS4zLDUuMywxMiwxMGM5MC43LDU0LDE1NiwxMzAsMTk2LDIyOGMzLjMsMTAuNyw2LjMsMTYuMyw5LDE3XG5jMiwwLjcsNSwxLDksMWMwLDAsNSwwLDUsMGMxMC43LDAsMTYuNywtMiwxOCwtNmMyLC0yLjcsMSwtOS43LC0zLC0yMVxuYy0zMiwtODcuMywtODIuNywtMTU3LjcsLTE1MiwtMjExYzAsMCwtMywtMywtMywtM2wzOTkzNTEsMGwwLC00MFxuYy0zOTg1NzAsMCwtMzk5NDM3LDAsLTM5OTQzNywweiBNNTkzIDQzNSB2NDAgSDM5OTUwMCB2LTQwelxuTTAgMjgxIHYtNDAgSDM5OTkwOCB2NDB6IE0wIDI4MSB2LTQwIEgzOTk5MDggdjQweiIscmlnaHRoYXJwb29uYWJvdmVzaG9ydGJhcjoiTTAsMjQxIGwwLDQwYzM5OTEyNiwwLDM5OTk5MywwLDM5OTk5MywwXG5jNC43LC00LjcsNywtOS4zLDcsLTE0YzAsLTkuMywtMy43LC0xNS4zLC0xMSwtMThjLTkyLjcsLTU2LjcsLTE1OSwtMTMzLjcsLTE5OSxcbi0yMzFjLTMuMywtOS4zLC02LC0xNC43LC04LC0xNmMtMiwtMS4zLC03LC0yLC0xNSwtMmMtMTAuNywwLC0xNi43LDIsLTE4LDZcbmMtMiwyLjcsLTEsOS43LDMsMjFjMTUuMyw0MiwzNi43LDgxLjgsNjQsMTE5LjVjMjcuMywzNy43LDU4LDY5LjIsOTIsOTQuNXpcbk0wIDI0MSB2NDAgSDM5OTkwOCB2LTQweiBNMCA0NzUgdi00MCBIMzk5NTAwIHY0MHogTTAgNDc1IHYtNDAgSDM5OTUwMCB2NDB6IixzaG9ydGJhcmFib3ZlbGVmdGhhcnBvb246Ik03LDQzNWMtNCw0LC02LjMsOC43LC03LDE0YzAsNS4zLDAuNyw5LDIsMTFcbmMxLjMsMiw1LjMsNS4zLDEyLDEwYzkwLjcsNTQsMTU2LDEzMCwxOTYsMjI4YzMuMywxMC43LDYuMywxNi4zLDksMTdjMiwwLjcsNSwxLDksXG4xYzAsMCw1LDAsNSwwYzEwLjcsMCwxNi43LC0yLDE4LC02YzIsLTIuNywxLC05LjcsLTMsLTIxYy0zMiwtODcuMywtODIuNywtMTU3LjcsXG4tMTUyLC0yMTFjMCwwLC0zLC0zLC0zLC0zbDM5OTkwNywwbDAsLTQwYy0zOTkxMjYsMCwtMzk5OTkzLDAsLTM5OTk5MywwelxuTTkzIDQzNSB2NDAgSDQwMDAwMCB2LTQweiBNNTAwIDI0MSB2NDAgSDQwMDAwMCB2LTQweiBNNTAwIDI0MSB2NDAgSDQwMDAwMCB2LTQweiIsc2hvcnRyaWdodGhhcnBvb25hYm92ZWJhcjoiTTUzLDI0MWwwLDQwYzM5ODU3MCwwLDM5OTQzNywwLDM5OTQzNywwXG5jNC43LC00LjcsNywtOS4zLDcsLTE0YzAsLTkuMywtMy43LC0xNS4zLC0xMSwtMThjLTkyLjcsLTU2LjcsLTE1OSwtMTMzLjcsLTE5OSxcbi0yMzFjLTMuMywtOS4zLC02LC0xNC43LC04LC0xNmMtMiwtMS4zLC03LC0yLC0xNSwtMmMtMTAuNywwLC0xNi43LDIsLTE4LDZcbmMtMiwyLjcsLTEsOS43LDMsMjFjMTUuMyw0MiwzNi43LDgxLjgsNjQsMTE5LjVjMjcuMywzNy43LDU4LDY5LjIsOTIsOTQuNXpcbk01MDAgMjQxIHY0MCBIMzk5NDA4IHYtNDB6IE01MDAgNDM1IHY0MCBINDAwMDAwIHYtNDB6In0sQT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7dGhpcy5jaGlsZHJlbj12b2lkIDAsdGhpcy5jbGFzc2VzPXZvaWQgMCx0aGlzLmhlaWdodD12b2lkIDAsdGhpcy5kZXB0aD12b2lkIDAsdGhpcy5tYXhGb250U2l6ZT12b2lkIDAsdGhpcy5zdHlsZT12b2lkIDAsdGhpcy5jaGlsZHJlbj1lLHRoaXMuY2xhc3Nlcz1bXSx0aGlzLmhlaWdodD0wLHRoaXMuZGVwdGg9MCx0aGlzLm1heEZvbnRTaXplPTAsdGhpcy5zdHlsZT17fX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5oYXNDbGFzcz1mdW5jdGlvbihlKXtyZXR1cm4gbC5jb250YWlucyh0aGlzLmNsYXNzZXMsZSl9LHQudG9Ob2RlPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSx0PTA7dDx0aGlzLmNoaWxkcmVuLmxlbmd0aDt0KyspZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW3RdLnRvTm9kZSgpKTtyZXR1cm4gZX0sdC50b01hcmt1cD1mdW5jdGlvbigpe2Zvcih2YXIgZT0iIix0PTA7dDx0aGlzLmNoaWxkcmVuLmxlbmd0aDt0KyspZSs9dGhpcy5jaGlsZHJlblt0XS50b01hcmt1cCgpO3JldHVybiBlfSx0LnRvVGV4dD1mdW5jdGlvbigpe3ZhciBlPWZ1bmN0aW9uKGUpe3JldHVybiBlLnRvVGV4dCgpfTtyZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZSkuam9pbigiIil9LGV9KCksVD17IkFNUy1SZWd1bGFyIjp7MzI6WzAsMCwwLDAsLjI1XSw2NTpbMCwuNjg4ODksMCwwLC43MjIyMl0sNjY6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDY3OlswLC42ODg4OSwwLDAsLjcyMjIyXSw2ODpbMCwuNjg4ODksMCwwLC43MjIyMl0sNjk6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDcwOlswLC42ODg4OSwwLDAsLjYxMTExXSw3MTpbMCwuNjg4ODksMCwwLC43Nzc3OF0sNzI6WzAsLjY4ODg5LDAsMCwuNzc3NzhdLDczOlswLC42ODg4OSwwLDAsLjM4ODg5XSw3NDpbLjE2NjY3LC42ODg4OSwwLDAsLjVdLDc1OlswLC42ODg4OSwwLDAsLjc3Nzc4XSw3NjpbMCwuNjg4ODksMCwwLC42NjY2N10sNzc6WzAsLjY4ODg5LDAsMCwuOTQ0NDVdLDc4OlswLC42ODg4OSwwLDAsLjcyMjIyXSw3OTpbLjE2NjY3LC42ODg4OSwwLDAsLjc3Nzc4XSw4MDpbMCwuNjg4ODksMCwwLC42MTExMV0sODE6Wy4xNjY2NywuNjg4ODksMCwwLC43Nzc3OF0sODI6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDgzOlswLC42ODg4OSwwLDAsLjU1NTU2XSw4NDpbMCwuNjg4ODksMCwwLC42NjY2N10sODU6WzAsLjY4ODg5LDAsMCwuNzIyMjJdLDg2OlswLC42ODg4OSwwLDAsLjcyMjIyXSw4NzpbMCwuNjg4ODksMCwwLDFdLDg4OlswLC42ODg4OSwwLDAsLjcyMjIyXSw4OTpbMCwuNjg4ODksMCwwLC43MjIyMl0sOTA6WzAsLjY4ODg5LDAsMCwuNjY2NjddLDEwNzpbMCwuNjg4ODksMCwwLC41NTU1Nl0sMTYwOlswLDAsMCwwLC4yNV0sMTY1OlswLC42NzUsLjAyNSwwLC43NV0sMTc0OlsuMTU1NTksLjY5MjI0LDAsMCwuOTQ2NjZdLDI0MDpbMCwuNjg4ODksMCwwLC41NTU1Nl0sMjk1OlswLC42ODg4OSwwLDAsLjU0MDI4XSw3MTA6WzAsLjgyNSwwLDAsMi4zMzMzNF0sNzMyOlswLC45LDAsMCwyLjMzMzM0XSw3NzA6WzAsLjgyNSwwLDAsMi4zMzMzNF0sNzcxOlswLC45LDAsMCwyLjMzMzM0XSw5ODk6Wy4wODE2NywuNTgxNjcsMCwwLC43Nzc3OF0sMTAwODpbMCwuNDMwNTYsLjA0MDI4LDAsLjY2NjY3XSw4MjQ1OlswLC41NDk4NiwwLDAsLjI3NV0sODQ2MzpbMCwuNjg4ODksMCwwLC41NDAyOF0sODQ4NzpbMCwuNjg4ODksMCwwLC43MjIyMl0sODQ5ODpbMCwuNjg4ODksMCwwLC41NTU1Nl0sODUwMjpbMCwuNjg4ODksMCwwLC42NjY2N10sODUwMzpbMCwuNjg4ODksMCwwLC40NDQ0NV0sODUwNDpbMCwuNjg4ODksMCwwLC42NjY2N10sODUxMzpbMCwuNjg4ODksMCwwLC42Mzg4OV0sODU5MjpbLS4wMzU5OCwuNDY0MDIsMCwwLC41XSw4NTk0OlstLjAzNTk4LC40NjQwMiwwLDAsLjVdLDg2MDI6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjAzOlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODYwNjpbLjAxMzU0LC41MjIzOSwwLDAsMV0sODYwODpbLjAxMzU0LC41MjIzOSwwLDAsMV0sODYxMDpbLjAxMzU0LC41MjIzOSwwLDAsMS4xMTExMV0sODYxMTpbLjAxMzU0LC41MjIzOSwwLDAsMS4xMTExMV0sODYxOTpbMCwuNTQ5ODYsMCwwLDFdLDg2MjA6WzAsLjU0OTg2LDAsMCwxXSw4NjIxOlstLjEzMzEzLC4zNzc4OCwwLDAsMS4zODg4OV0sODYyMjpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2MjQ6WzAsLjY5MjI0LDAsMCwuNV0sODYyNTpbMCwuNjkyMjQsMCwwLC41XSw4NjMwOlswLC40MzA1NiwwLDAsMV0sODYzMTpbMCwuNDMwNTYsMCwwLDFdLDg2MzQ6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODYzNTpbLjA4MTk4LC41ODE5OCwwLDAsLjc3Nzc4XSw4NjM4OlsuMTk0NDQsLjY5MjI0LDAsMCwuNDE2NjddLDg2Mzk6Wy4xOTQ0NCwuNjkyMjQsMCwwLC40MTY2N10sODY0MjpbLjE5NDQ0LC42OTIyNCwwLDAsLjQxNjY3XSw4NjQzOlsuMTk0NDQsLjY5MjI0LDAsMCwuNDE2NjddLDg2NDQ6Wy4xODA4LC42NzUsMCwwLDFdLDg2NDY6Wy4xODA4LC42NzUsMCwwLDFdLDg2NDc6Wy4xODA4LC42NzUsMCwwLDFdLDg2NDg6Wy4xOTQ0NCwuNjkyMjQsMCwwLC44MzMzNF0sODY0OTpbLjE4MDgsLjY3NSwwLDAsMV0sODY1MDpbLjE5NDQ0LC42OTIyNCwwLDAsLjgzMzM0XSw4NjUxOlsuMDEzNTQsLjUyMjM5LDAsMCwxXSw4NjUyOlsuMDEzNTQsLjUyMjM5LDAsMCwxXSw4NjUzOlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODY1NDpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NTU6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjY2OlsuMTM2NjcsLjYzNjY3LDAsMCwxXSw4NjY3OlsuMTM2NjcsLjYzNjY3LDAsMCwxXSw4NjY5OlstLjEzMzEzLC4zNzc4OCwwLDAsMV0sODY3MjpbLS4wNjQsLjQzNywwLDAsMS4zMzRdLDg2NzQ6Wy0uMDY0LC40MzcsMCwwLDEuMzM0XSw4NzA1OlswLC44MjUsMCwwLC41XSw4NzA4OlswLC42ODg4OSwwLDAsLjU1NTU2XSw4NzA5OlsuMDgxNjcsLjU4MTY3LDAsMCwuNzc3NzhdLDg3MTc6WzAsLjQzMDU2LDAsMCwuNDI5MTddLDg3MjI6Wy0uMDM1OTgsLjQ2NDAyLDAsMCwuNV0sODcyNDpbLjA4MTk4LC42OTIyNCwwLDAsLjc3Nzc4XSw4NzI2OlsuMDgxNjcsLjU4MTY3LDAsMCwuNzc3NzhdLDg3MzM6WzAsLjY5MjI0LDAsMCwuNzc3NzhdLDg3MzY6WzAsLjY5MjI0LDAsMCwuNzIyMjJdLDg3Mzc6WzAsLjY5MjI0LDAsMCwuNzIyMjJdLDg3Mzg6Wy4wMzUxNywuNTIyMzksMCwwLC43MjIyMl0sODczOTpbLjA4MTY3LC41ODE2NywwLDAsLjIyMjIyXSw4NzQwOlsuMjUxNDIsLjc0MTExLDAsMCwuMjc3NzhdLDg3NDE6Wy4wODE2NywuNTgxNjcsMCwwLC4zODg4OV0sODc0MjpbLjI1MTQyLC43NDExMSwwLDAsLjVdLDg3NTY6WzAsLjY5MjI0LDAsMCwuNjY2NjddLDg3NTc6WzAsLjY5MjI0LDAsMCwuNjY2NjddLDg3NjQ6Wy0uMTMzMTMsLjM2Njg3LDAsMCwuNzc3NzhdLDg3NjU6Wy0uMTMzMTMsLjM3Nzg4LDAsMCwuNzc3NzhdLDg3Njk6Wy0uMTMzMTMsLjM2Njg3LDAsMCwuNzc3NzhdLDg3NzA6Wy0uMDM2MjUsLjQ2Mzc1LDAsMCwuNzc3NzhdLDg3NzQ6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODc3NjpbLS4wMTY4OCwuNDgzMTIsMCwwLC43Nzc3OF0sODc3ODpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw4NzgyOlsuMDYwNjIsLjU0OTg2LDAsMCwuNzc3NzhdLDg3ODM6Wy4wNjA2MiwuNTQ5ODYsMCwwLC43Nzc3OF0sODc4NTpbLjA4MTk4LC41ODE5OCwwLDAsLjc3Nzc4XSw4Nzg2OlsuMDgxOTgsLjU4MTk4LDAsMCwuNzc3NzhdLDg3ODc6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODc5MDpbMCwuNjkyMjQsMCwwLC43Nzc3OF0sODc5MTpbLjIyOTU4LC43Mjk1OCwwLDAsLjc3Nzc4XSw4Nzk2OlsuMDgxOTgsLjkxNjY3LDAsMCwuNzc3NzhdLDg4MDY6Wy4yNTU4MywuNzU1ODMsMCwwLC43Nzc3OF0sODgwNzpbLjI1NTgzLC43NTU4MywwLDAsLjc3Nzc4XSw4ODA4OlsuMjUxNDIsLjc1NzI2LDAsMCwuNzc3NzhdLDg4MDk6Wy4yNTE0MiwuNzU3MjYsMCwwLC43Nzc3OF0sODgxMjpbLjI1NTgzLC43NTU4MywwLDAsLjVdLDg4MTQ6Wy4yMDU3NiwuNzA1NzYsMCwwLC43Nzc3OF0sODgxNTpbLjIwNTc2LC43MDU3NiwwLDAsLjc3Nzc4XSw4ODE2OlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg4MTc6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODgxODpbLjIyOTU4LC43Mjk1OCwwLDAsLjc3Nzc4XSw4ODE5OlsuMjI5NTgsLjcyOTU4LDAsMCwuNzc3NzhdLDg4MjI6Wy4xODA4LC42NzUsMCwwLC43Nzc3OF0sODgyMzpbLjE4MDgsLjY3NSwwLDAsLjc3Nzc4XSw4ODI4OlsuMTM2NjcsLjYzNjY3LDAsMCwuNzc3NzhdLDg4Mjk6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sODgzMDpbLjIyOTU4LC43Mjk1OCwwLDAsLjc3Nzc4XSw4ODMxOlsuMjI5NTgsLjcyOTU4LDAsMCwuNzc3NzhdLDg4MzI6Wy4yMDU3NiwuNzA1NzYsMCwwLC43Nzc3OF0sODgzMzpbLjIwNTc2LC43MDU3NiwwLDAsLjc3Nzc4XSw4ODQwOlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg4NDE6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODg0MjpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODQzOlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4NDc6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sODg0ODpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw4ODU4OlsuMDgxOTgsLjU4MTk4LDAsMCwuNzc3NzhdLDg4NTk6Wy4wODE5OCwuNTgxOTgsMCwwLC43Nzc3OF0sODg2MTpbLjA4MTk4LC41ODE5OCwwLDAsLjc3Nzc4XSw4ODYyOlswLC42NzUsMCwwLC43Nzc3OF0sODg2MzpbMCwuNjc1LDAsMCwuNzc3NzhdLDg4NjQ6WzAsLjY3NSwwLDAsLjc3Nzc4XSw4ODY1OlswLC42NzUsMCwwLC43Nzc3OF0sODg3MjpbMCwuNjkyMjQsMCwwLC42MTExMV0sODg3MzpbMCwuNjkyMjQsMCwwLC43MjIyMl0sODg3NDpbMCwuNjkyMjQsMCwwLC44ODg4OV0sODg3NjpbMCwuNjg4ODksMCwwLC42MTExMV0sODg3NzpbMCwuNjg4ODksMCwwLC42MTExMV0sODg3ODpbMCwuNjg4ODksMCwwLC43MjIyMl0sODg3OTpbMCwuNjg4ODksMCwwLC43MjIyMl0sODg4MjpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw4ODgzOlsuMDM1MTcsLjU0OTg2LDAsMCwuNzc3NzhdLDg4ODQ6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sODg4NTpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSw4ODg4OlswLC41NDk4NiwwLDAsMS4xMTExMV0sODg5MDpbLjE5NDQ0LC40MzA1NiwwLDAsLjU1NTU2XSw4ODkxOlsuMTk0NDQsLjY5MjI0LDAsMCwuNjExMTFdLDg4OTI6Wy4xOTQ0NCwuNjkyMjQsMCwwLC42MTExMV0sODkwMTpbMCwuNTQ5ODYsMCwwLC4yNzc3OF0sODkwMzpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw4OTA1OlsuMDgxNjcsLjU4MTY3LDAsMCwuNzc3NzhdLDg5MDY6Wy4wODE2NywuNTgxNjcsMCwwLC43Nzc3OF0sODkwNzpbMCwuNjkyMjQsMCwwLC43Nzc3OF0sODkwODpbMCwuNjkyMjQsMCwwLC43Nzc3OF0sODkwOTpbLS4wMzU5OCwuNDY0MDIsMCwwLC43Nzc3OF0sODkxMDpbMCwuNTQ5ODYsMCwwLC43NjA0Ml0sODkxMTpbMCwuNTQ5ODYsMCwwLC43NjA0Ml0sODkxMjpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw4OTEzOlsuMDM1MTcsLjU0OTg2LDAsMCwuNzc3NzhdLDg5MTQ6WzAsLjU0OTg2LDAsMCwuNjY2NjddLDg5MTU6WzAsLjU0OTg2LDAsMCwuNjY2NjddLDg5MTY6WzAsLjY5MjI0LDAsMCwuNjY2NjddLDg5MTg6Wy4wMzkxLC41MzkxLDAsMCwuNzc3NzhdLDg5MTk6Wy4wMzkxLC41MzkxLDAsMCwuNzc3NzhdLDg5MjA6Wy4wMzUxNywuNTQ5ODYsMCwwLDEuMzMzMzRdLDg5MjE6Wy4wMzUxNywuNTQ5ODYsMCwwLDEuMzMzMzRdLDg5MjI6Wy4zODU2OSwuODg1NjksMCwwLC43Nzc3OF0sODkyMzpbLjM4NTY5LC44ODU2OSwwLDAsLjc3Nzc4XSw4OTI2OlsuMTM2NjcsLjYzNjY3LDAsMCwuNzc3NzhdLDg5Mjc6Wy4xMzY2NywuNjM2NjcsMCwwLC43Nzc3OF0sODkyODpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw4OTI5OlsuMzAyNzQsLjc5MzgzLDAsMCwuNzc3NzhdLDg5MzQ6Wy4yMzIyMiwuNzQxMTEsMCwwLC43Nzc3OF0sODkzNTpbLjIzMjIyLC43NDExMSwwLDAsLjc3Nzc4XSw4OTM2OlsuMjMyMjIsLjc0MTExLDAsMCwuNzc3NzhdLDg5Mzc6Wy4yMzIyMiwuNzQxMTEsMCwwLC43Nzc3OF0sODkzODpbLjIwNTc2LC43MDU3NiwwLDAsLjc3Nzc4XSw4OTM5OlsuMjA1NzYsLjcwNTc2LDAsMCwuNzc3NzhdLDg5NDA6Wy4zMDI3NCwuNzkzODMsMCwwLC43Nzc3OF0sODk0MTpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw4OTk0OlsuMTk0NDQsLjY5MjI0LDAsMCwuNzc3NzhdLDg5OTU6Wy4xOTQ0NCwuNjkyMjQsMCwwLC43Nzc3OF0sOTQxNjpbLjE1NTU5LC42OTIyNCwwLDAsLjkwMjIyXSw5NDg0OlswLC42OTIyNCwwLDAsLjVdLDk0ODg6WzAsLjY5MjI0LDAsMCwuNV0sOTQ5MjpbMCwuMzc3ODgsMCwwLC41XSw5NDk2OlswLC4zNzc4OCwwLDAsLjVdLDk1ODU6Wy4xOTQ0NCwuNjg4ODksMCwwLC44ODg4OV0sOTU4NjpbLjE5NDQ0LC43NDExMSwwLDAsLjg4ODg5XSw5NjMyOlswLC42NzUsMCwwLC43Nzc3OF0sOTYzMzpbMCwuNjc1LDAsMCwuNzc3NzhdLDk2NTA6WzAsLjU0OTg2LDAsMCwuNzIyMjJdLDk2NTE6WzAsLjU0OTg2LDAsMCwuNzIyMjJdLDk2NTQ6Wy4wMzUxNywuNTQ5ODYsMCwwLC43Nzc3OF0sOTY2MDpbMCwuNTQ5ODYsMCwwLC43MjIyMl0sOTY2MTpbMCwuNTQ5ODYsMCwwLC43MjIyMl0sOTY2NDpbLjAzNTE3LC41NDk4NiwwLDAsLjc3Nzc4XSw5Njc0OlsuMTExMTEsLjY5MjI0LDAsMCwuNjY2NjddLDk3MzM6Wy4xOTQ0NCwuNjkyMjQsMCwwLC45NDQ0NV0sMTAwMDM6WzAsLjY5MjI0LDAsMCwuODMzMzRdLDEwMDE2OlswLC42OTIyNCwwLDAsLjgzMzM0XSwxMDczMTpbLjExMTExLC42OTIyNCwwLDAsLjY2NjY3XSwxMDg0NjpbLjE5NDQ0LC43NTU4MywwLDAsLjYxMTExXSwxMDg3NzpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSwxMDg3ODpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSwxMDg4NTpbLjI1NTgzLC43NTU4MywwLDAsLjc3Nzc4XSwxMDg4NjpbLjI1NTgzLC43NTU4MywwLDAsLjc3Nzc4XSwxMDg4NzpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSwxMDg4ODpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSwxMDg4OTpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDg5MDpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDg5MTpbLjQ4MjU2LC45ODI1NiwwLDAsLjc3Nzc4XSwxMDg5MjpbLjQ4MjU2LC45ODI1NiwwLDAsLjc3Nzc4XSwxMDkwMTpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSwxMDkwMjpbLjEzNjY3LC42MzY2NywwLDAsLjc3Nzc4XSwxMDkzMzpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSwxMDkzNDpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSwxMDkzNTpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDkzNjpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDkzNzpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDkzODpbLjI2MTY3LC43NTcyNiwwLDAsLjc3Nzc4XSwxMDk0OTpbLjI1NTgzLC43NTU4MywwLDAsLjc3Nzc4XSwxMDk1MDpbLjI1NTgzLC43NTU4MywwLDAsLjc3Nzc4XSwxMDk1NTpbLjI4NDgxLC43OTM4MywwLDAsLjc3Nzc4XSwxMDk1NjpbLjI4NDgxLC43OTM4MywwLDAsLjc3Nzc4XSw1NzM1MDpbLjA4MTY3LC41ODE2NywwLDAsLjIyMjIyXSw1NzM1MTpbLjA4MTY3LC41ODE2NywwLDAsLjM4ODg5XSw1NzM1MjpbLjA4MTY3LC41ODE2NywwLDAsLjc3Nzc4XSw1NzM1MzpbMCwuNDMwNTYsLjA0MDI4LDAsLjY2NjY3XSw1NzM1NjpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM1NzpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM1ODpbLjQxOTUxLC45MTk1MSwwLDAsLjc3Nzc4XSw1NzM1OTpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw1NzM2MDpbLjMwMjc0LC43OTM4MywwLDAsLjc3Nzc4XSw1NzM2MTpbLjQxOTUxLC45MTk1MSwwLDAsLjc3Nzc4XSw1NzM2NjpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM2NzpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM2ODpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM2OTpbLjI1MTQyLC43NTcyNiwwLDAsLjc3Nzc4XSw1NzM3MDpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw1NzM3MTpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XX0sIkNhbGlncmFwaGljLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDY1OlswLC42ODMzMywwLC4xOTQ0NSwuNzk4NDddLDY2OlswLC42ODMzMywuMDMwNDEsLjEzODg5LC42NTY4MV0sNjc6WzAsLjY4MzMzLC4wNTgzNCwuMTM4ODksLjUyNjUzXSw2ODpbMCwuNjgzMzMsLjAyNzc4LC4wODMzNCwuNzcxMzldLDY5OlswLC42ODMzMywuMDg5NDQsLjExMTExLC41Mjc3OF0sNzA6WzAsLjY4MzMzLC4wOTkzMSwuMTExMTEsLjcxODc1XSw3MTpbLjA5NzIyLC42ODMzMywuMDU5MywuMTExMTEsLjU5NDg3XSw3MjpbMCwuNjgzMzMsLjAwOTY1LC4xMTExMSwuODQ0NTJdLDczOlswLC42ODMzMywuMDczODIsMCwuNTQ0NTJdLDc0OlsuMDk3MjIsLjY4MzMzLC4xODQ3MiwuMTY2NjcsLjY3Nzc4XSw3NTpbMCwuNjgzMzMsLjAxNDQ1LC4wNTU1NiwuNzYxOTVdLDc2OlswLC42ODMzMywwLC4xMzg4OSwuNjg5NzJdLDc3OlswLC42ODMzMywwLC4xMzg4OSwxLjIwMDldLDc4OlswLC42ODMzMywuMTQ3MzYsLjA4MzM0LC44MjA0OV0sNzk6WzAsLjY4MzMzLC4wMjc3OCwuMTExMTEsLjc5NjExXSw4MDpbMCwuNjgzMzMsLjA4MjIyLC4wODMzNCwuNjk1NTZdLDgxOlsuMDk3MjIsLjY4MzMzLDAsLjExMTExLC44MTY2N10sODI6WzAsLjY4MzMzLDAsLjA4MzM0LC44NDc1XSw4MzpbMCwuNjgzMzMsLjA3NSwuMTM4ODksLjYwNTU2XSw4NDpbMCwuNjgzMzMsLjI1NDE3LDAsLjU0NDY0XSw4NTpbMCwuNjgzMzMsLjA5OTMxLC4wODMzNCwuNjI1ODNdLDg2OlswLC42ODMzMywuMDgyMjIsMCwuNjEyNzhdLDg3OlswLC42ODMzMywuMDgyMjIsLjA4MzM0LC45ODc3OF0sODg6WzAsLjY4MzMzLC4xNDY0MywuMTM4ODksLjcxMzNdLDg5OlsuMDk3MjIsLjY4MzMzLC4wODIyMiwuMDgzMzQsLjY2ODM0XSw5MDpbMCwuNjgzMzMsLjA3OTQ0LC4xMzg4OSwuNzI0NzNdLDE2MDpbMCwwLDAsMCwuMjVdfSwiRnJha3R1ci1SZWd1bGFyIjp7MzI6WzAsMCwwLDAsLjI1XSwzMzpbMCwuNjkxNDEsMCwwLC4yOTU3NF0sMzQ6WzAsLjY5MTQxLDAsMCwuMjE0NzFdLDM4OlswLC42OTE0MSwwLDAsLjczNzg2XSwzOTpbMCwuNjkxNDEsMCwwLC4yMTIwMV0sNDA6Wy4yNDk4MiwuNzQ5NDcsMCwwLC4zODg2NV0sNDE6Wy4yNDk4MiwuNzQ5NDcsMCwwLC4zODg2NV0sNDI6WzAsLjYyMTE5LDAsMCwuMjc3NjRdLDQzOlsuMDgzMTksLjU4MjgzLDAsMCwuNzU2MjNdLDQ0OlswLC4xMDgwMywwLDAsLjI3NzY0XSw0NTpbLjA4MzE5LC41ODI4MywwLDAsLjc1NjIzXSw0NjpbMCwuMTA4MDMsMCwwLC4yNzc2NF0sNDc6Wy4yNDk4MiwuNzQ5NDcsMCwwLC41MDE4MV0sNDg6WzAsLjQ3NTM0LDAsMCwuNTAxODFdLDQ5OlswLC40NzUzNCwwLDAsLjUwMTgxXSw1MDpbMCwuNDc1MzQsMCwwLC41MDE4MV0sNTE6Wy4xODkwNiwuNDc1MzQsMCwwLC41MDE4MV0sNTI6Wy4xODkwNiwuNDc1MzQsMCwwLC41MDE4MV0sNTM6Wy4xODkwNiwuNDc1MzQsMCwwLC41MDE4MV0sNTQ6WzAsLjY5MTQxLDAsMCwuNTAxODFdLDU1OlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAxODFdLDU2OlswLC42OTE0MSwwLDAsLjUwMTgxXSw1NzpbLjE4OTA2LC40NzUzNCwwLDAsLjUwMTgxXSw1ODpbMCwuNDc1MzQsMCwwLC4yMTYwNl0sNTk6Wy4xMjYwNCwuNDc1MzQsMCwwLC4yMTYwNl0sNjE6Wy0uMTMwOTksLjM2ODY2LDAsMCwuNzU2MjNdLDYzOlswLC42OTE0MSwwLDAsLjM2MjQ1XSw2NTpbMCwuNjkxNDEsMCwwLC43MTc2XSw2NjpbMCwuNjkxNDEsMCwwLC44ODM5N10sNjc6WzAsLjY5MTQxLDAsMCwuNjEyNTRdLDY4OlswLC42OTE0MSwwLDAsLjgzMTU4XSw2OTpbMCwuNjkxNDEsMCwwLC42NjI3OF0sNzA6Wy4xMjYwNCwuNjkxNDEsMCwwLC42MTExOV0sNzE6WzAsLjY5MTQxLDAsMCwuNzg1MzldLDcyOlsuMDYzMDIsLjY5MTQxLDAsMCwuNzIwM10sNzM6WzAsLjY5MTQxLDAsMCwuNTU0NDhdLDc0OlsuMTI2MDQsLjY5MTQxLDAsMCwuNTUyMzFdLDc1OlswLC42OTE0MSwwLDAsLjY2ODQ1XSw3NjpbMCwuNjkxNDEsMCwwLC42NjYwMl0sNzc6WzAsLjY5MTQxLDAsMCwxLjA0OTUzXSw3ODpbMCwuNjkxNDEsMCwwLC44MzIxMl0sNzk6WzAsLjY5MTQxLDAsMCwuODI2OTldLDgwOlsuMTg5MDYsLjY5MTQxLDAsMCwuODI3NTNdLDgxOlsuMDM3ODEsLjY5MTQxLDAsMCwuODI2OTldLDgyOlswLC42OTE0MSwwLDAsLjgyODA3XSw4MzpbMCwuNjkxNDEsMCwwLC44Mjg2MV0sODQ6WzAsLjY5MTQxLDAsMCwuNjY4OTldLDg1OlswLC42OTE0MSwwLDAsLjY0NTc2XSw4NjpbMCwuNjkxNDEsMCwwLC44MzEzMV0sODc6WzAsLjY5MTQxLDAsMCwxLjA0NjAyXSw4ODpbMCwuNjkxNDEsMCwwLC43MTkyMl0sODk6Wy4xODkwNiwuNjkxNDEsMCwwLC44MzI5M10sOTA6Wy4xMjYwNCwuNjkxNDEsMCwwLC42MDIwMV0sOTE6Wy4yNDk4MiwuNzQ5NDcsMCwwLC4yNzc2NF0sOTM6Wy4yNDk4MiwuNzQ5NDcsMCwwLC4yNzc2NF0sOTQ6WzAsLjY5MTQxLDAsMCwuNDk5NjVdLDk3OlswLC40NzUzNCwwLDAsLjUwMDQ2XSw5ODpbMCwuNjkxNDEsMCwwLC41MTMxNV0sOTk6WzAsLjQ3NTM0LDAsMCwuMzg5NDZdLDEwMDpbMCwuNjIxMTksMCwwLC40OTg1N10sMTAxOlswLC40NzUzNCwwLDAsLjQwMDUzXSwxMDI6Wy4xODkwNiwuNjkxNDEsMCwwLC4zMjYyNl0sMTAzOlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAzN10sMTA0OlsuMTg5MDYsLjY5MTQxLDAsMCwuNTIxMjZdLDEwNTpbMCwuNjkxNDEsMCwwLC4yNzg5OV0sMTA2OlswLC42OTE0MSwwLDAsLjI4MDg4XSwxMDc6WzAsLjY5MTQxLDAsMCwuMzg5NDZdLDEwODpbMCwuNjkxNDEsMCwwLC4yNzk1M10sMTA5OlswLC40NzUzNCwwLDAsLjc2Njc2XSwxMTA6WzAsLjQ3NTM0LDAsMCwuNTI2NjZdLDExMTpbMCwuNDc1MzQsMCwwLC40ODg4NV0sMTEyOlsuMTg5MDYsLjUyMzk2LDAsMCwuNTAwNDZdLDExMzpbLjE4OTA2LC40NzUzNCwwLDAsLjQ4OTEyXSwxMTQ6WzAsLjQ3NTM0LDAsMCwuMzg5MTldLDExNTpbMCwuNDc1MzQsMCwwLC40NDI2Nl0sMTE2OlswLC42MjExOSwwLDAsLjMzMzAxXSwxMTc6WzAsLjQ3NTM0LDAsMCwuNTE3Ml0sMTE4OlswLC41MjM5NiwwLDAsLjUxMThdLDExOTpbMCwuNTIzOTYsMCwwLC43NzM1MV0sMTIwOlsuMTg5MDYsLjQ3NTM0LDAsMCwuMzg4NjVdLDEyMTpbLjE4OTA2LC40NzUzNCwwLDAsLjQ5ODg0XSwxMjI6Wy4xODkwNiwuNDc1MzQsMCwwLC4zOTA1NF0sMTYwOlswLDAsMCwwLC4yNV0sODIxNjpbMCwuNjkxNDEsMCwwLC4yMTQ3MV0sODIxNzpbMCwuNjkxNDEsMCwwLC4yMTQ3MV0sNTgxMTI6WzAsLjYyMTE5LDAsMCwuNDk3NDldLDU4MTEzOlswLC42MjExOSwwLDAsLjQ5ODNdLDU4MTE0OlsuMTg5MDYsLjY5MTQxLDAsMCwuMzMzMjhdLDU4MTE1OlsuMTg5MDYsLjY5MTQxLDAsMCwuMzI5MjNdLDU4MTE2OlsuMTg5MDYsLjQ3NTM0LDAsMCwuNTAzNDNdLDU4MTE3OlswLC42OTE0MSwwLDAsLjMzMzAxXSw1ODExODpbMCwuNjIxMTksMCwwLC4zMzQwOV0sNTgxMTk6WzAsLjQ3NTM0LDAsMCwuNTAwNzNdfSwiTWFpbi1Cb2xkIjp7MzI6WzAsMCwwLDAsLjI1XSwzMzpbMCwuNjk0NDQsMCwwLC4zNV0sMzQ6WzAsLjY5NDQ0LDAsMCwuNjAyNzhdLDM1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuOTU4MzNdLDM2OlsuMDU1NTYsLjc1LDAsMCwuNTc1XSwzNzpbLjA1NTU2LC43NSwwLDAsLjk1ODMzXSwzODpbMCwuNjk0NDQsMCwwLC44OTQ0NF0sMzk6WzAsLjY5NDQ0LDAsMCwuMzE5NDRdLDQwOlsuMjUsLjc1LDAsMCwuNDQ3MjJdLDQxOlsuMjUsLjc1LDAsMCwuNDQ3MjJdLDQyOlswLC43NSwwLDAsLjU3NV0sNDM6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sNDQ6Wy4xOTQ0NCwuMTU1NTYsMCwwLC4zMTk0NF0sNDU6WzAsLjQ0NDQ0LDAsMCwuMzgzMzNdLDQ2OlswLC4xNTU1NiwwLDAsLjMxOTQ0XSw0NzpbLjI1LC43NSwwLDAsLjU3NV0sNDg6WzAsLjY0NDQ0LDAsMCwuNTc1XSw0OTpbMCwuNjQ0NDQsMCwwLC41NzVdLDUwOlswLC42NDQ0NCwwLDAsLjU3NV0sNTE6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1MjpbMCwuNjQ0NDQsMCwwLC41NzVdLDUzOlswLC42NDQ0NCwwLDAsLjU3NV0sNTQ6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1NTpbMCwuNjQ0NDQsMCwwLC41NzVdLDU2OlswLC42NDQ0NCwwLDAsLjU3NV0sNTc6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1ODpbMCwuNDQ0NDQsMCwwLC4zMTk0NF0sNTk6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC4zMTk0NF0sNjA6Wy4wODU1NiwuNTg1NTYsMCwwLC44OTQ0NF0sNjE6Wy0uMTA4ODksLjM5MTExLDAsMCwuODk0NDRdLDYyOlsuMDg1NTYsLjU4NTU2LDAsMCwuODk0NDRdLDYzOlswLC42OTQ0NCwwLDAsLjU0MzA1XSw2NDpbMCwuNjk0NDQsMCwwLC44OTQ0NF0sNjU6WzAsLjY4NjExLDAsMCwuODY5NDRdLDY2OlswLC42ODYxMSwwLDAsLjgxODA1XSw2NzpbMCwuNjg2MTEsMCwwLC44MzA1NV0sNjg6WzAsLjY4NjExLDAsMCwuODgxOTRdLDY5OlswLC42ODYxMSwwLDAsLjc1NTU1XSw3MDpbMCwuNjg2MTEsMCwwLC43MjM2MV0sNzE6WzAsLjY4NjExLDAsMCwuOTA0MTZdLDcyOlswLC42ODYxMSwwLDAsLjldLDczOlswLC42ODYxMSwwLDAsLjQzNjExXSw3NDpbMCwuNjg2MTEsMCwwLC41OTQ0NF0sNzU6WzAsLjY4NjExLDAsMCwuOTAxMzhdLDc2OlswLC42ODYxMSwwLDAsLjY5MTY2XSw3NzpbMCwuNjg2MTEsMCwwLDEuMDkxNjZdLDc4OlswLC42ODYxMSwwLDAsLjldLDc5OlswLC42ODYxMSwwLDAsLjg2Mzg4XSw4MDpbMCwuNjg2MTEsMCwwLC43ODYxMV0sODE6Wy4xOTQ0NCwuNjg2MTEsMCwwLC44NjM4OF0sODI6WzAsLjY4NjExLDAsMCwuODYyNV0sODM6WzAsLjY4NjExLDAsMCwuNjM4ODldLDg0OlswLC42ODYxMSwwLDAsLjhdLDg1OlswLC42ODYxMSwwLDAsLjg4NDcyXSw4NjpbMCwuNjg2MTEsLjAxNTk3LDAsLjg2OTQ0XSw4NzpbMCwuNjg2MTEsLjAxNTk3LDAsMS4xODg4OF0sODg6WzAsLjY4NjExLDAsMCwuODY5NDRdLDg5OlswLC42ODYxMSwuMDI4NzUsMCwuODY5NDRdLDkwOlswLC42ODYxMSwwLDAsLjcwMjc3XSw5MTpbLjI1LC43NSwwLDAsLjMxOTQ0XSw5MjpbLjI1LC43NSwwLDAsLjU3NV0sOTM6Wy4yNSwuNzUsMCwwLC4zMTk0NF0sOTQ6WzAsLjY5NDQ0LDAsMCwuNTc1XSw5NTpbLjMxLC4xMzQ0NCwuMDMxOTQsMCwuNTc1XSw5NzpbMCwuNDQ0NDQsMCwwLC41NTkwMl0sOTg6WzAsLjY5NDQ0LDAsMCwuNjM4ODldLDk5OlswLC40NDQ0NCwwLDAsLjUxMTExXSwxMDA6WzAsLjY5NDQ0LDAsMCwuNjM4ODldLDEwMTpbMCwuNDQ0NDQsMCwwLC41MjcwOF0sMTAyOlswLC42OTQ0NCwuMTA5MDMsMCwuMzUxMzldLDEwMzpbLjE5NDQ0LC40NDQ0NCwuMDE1OTcsMCwuNTc1XSwxMDQ6WzAsLjY5NDQ0LDAsMCwuNjM4ODldLDEwNTpbMCwuNjk0NDQsMCwwLC4zMTk0NF0sMTA2OlsuMTk0NDQsLjY5NDQ0LDAsMCwuMzUxMzldLDEwNzpbMCwuNjk0NDQsMCwwLC42MDY5NF0sMTA4OlswLC42OTQ0NCwwLDAsLjMxOTQ0XSwxMDk6WzAsLjQ0NDQ0LDAsMCwuOTU4MzNdLDExMDpbMCwuNDQ0NDQsMCwwLC42Mzg4OV0sMTExOlswLC40NDQ0NCwwLDAsLjU3NV0sMTEyOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNjM4ODldLDExMzpbLjE5NDQ0LC40NDQ0NCwwLDAsLjYwNjk0XSwxMTQ6WzAsLjQ0NDQ0LDAsMCwuNDczNjFdLDExNTpbMCwuNDQ0NDQsMCwwLC40NTM2MV0sMTE2OlswLC42MzQ5MiwwLDAsLjQ0NzIyXSwxMTc6WzAsLjQ0NDQ0LDAsMCwuNjM4ODldLDExODpbMCwuNDQ0NDQsLjAxNTk3LDAsLjYwNjk0XSwxMTk6WzAsLjQ0NDQ0LC4wMTU5NywwLC44MzA1NV0sMTIwOlswLC40NDQ0NCwwLDAsLjYwNjk0XSwxMjE6Wy4xOTQ0NCwuNDQ0NDQsLjAxNTk3LDAsLjYwNjk0XSwxMjI6WzAsLjQ0NDQ0LDAsMCwuNTExMTFdLDEyMzpbLjI1LC43NSwwLDAsLjU3NV0sMTI0OlsuMjUsLjc1LDAsMCwuMzE5NDRdLDEyNTpbLjI1LC43NSwwLDAsLjU3NV0sMTI2OlsuMzUsLjM0NDQ0LDAsMCwuNTc1XSwxNjA6WzAsMCwwLDAsLjI1XSwxNjM6WzAsLjY5NDQ0LDAsMCwuODY4NTNdLDE2ODpbMCwuNjk0NDQsMCwwLC41NzVdLDE3MjpbMCwuNDQ0NDQsMCwwLC43NjY2Nl0sMTc2OlswLC42OTQ0NCwwLDAsLjg2OTQ0XSwxNzc6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sMTg0OlsuMTcwMTQsMCwwLDAsLjUxMTExXSwxOTg6WzAsLjY4NjExLDAsMCwxLjA0MTY2XSwyMTU6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sMjE2OlsuMDQ4NjEsLjczNDcyLDAsMCwuODk0NDRdLDIyMzpbMCwuNjk0NDQsMCwwLC41OTcyMl0sMjMwOlswLC40NDQ0NCwwLDAsLjgzMDU1XSwyNDc6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sMjQ4OlsuMDk3MjIsLjU0MTY3LDAsMCwuNTc1XSwzMDU6WzAsLjQ0NDQ0LDAsMCwuMzE5NDRdLDMzODpbMCwuNjg2MTEsMCwwLDEuMTY5NDRdLDMzOTpbMCwuNDQ0NDQsMCwwLC44OTQ0NF0sNTY3OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuMzUxMzldLDcxMDpbMCwuNjk0NDQsMCwwLC41NzVdLDcxMTpbMCwuNjMxOTQsMCwwLC41NzVdLDcxMzpbMCwuNTk2MTEsMCwwLC41NzVdLDcxNDpbMCwuNjk0NDQsMCwwLC41NzVdLDcxNTpbMCwuNjk0NDQsMCwwLC41NzVdLDcyODpbMCwuNjk0NDQsMCwwLC41NzVdLDcyOTpbMCwuNjk0NDQsMCwwLC4zMTk0NF0sNzMwOlswLC42OTQ0NCwwLDAsLjg2OTQ0XSw3MzI6WzAsLjY5NDQ0LDAsMCwuNTc1XSw3MzM6WzAsLjY5NDQ0LDAsMCwuNTc1XSw5MTU6WzAsLjY4NjExLDAsMCwuNjkxNjZdLDkxNjpbMCwuNjg2MTEsMCwwLC45NTgzM10sOTIwOlswLC42ODYxMSwwLDAsLjg5NDQ0XSw5MjM6WzAsLjY4NjExLDAsMCwuODA1NTVdLDkyNjpbMCwuNjg2MTEsMCwwLC43NjY2Nl0sOTI4OlswLC42ODYxMSwwLDAsLjldLDkzMTpbMCwuNjg2MTEsMCwwLC44MzA1NV0sOTMzOlswLC42ODYxMSwwLDAsLjg5NDQ0XSw5MzQ6WzAsLjY4NjExLDAsMCwuODMwNTVdLDkzNjpbMCwuNjg2MTEsMCwwLC44OTQ0NF0sOTM3OlswLC42ODYxMSwwLDAsLjgzMDU1XSw4MjExOlswLC40NDQ0NCwuMDMxOTQsMCwuNTc1XSw4MjEyOlswLC40NDQ0NCwuMDMxOTQsMCwxLjE0OTk5XSw4MjE2OlswLC42OTQ0NCwwLDAsLjMxOTQ0XSw4MjE3OlswLC42OTQ0NCwwLDAsLjMxOTQ0XSw4MjIwOlswLC42OTQ0NCwwLDAsLjYwMjc4XSw4MjIxOlswLC42OTQ0NCwwLDAsLjYwMjc4XSw4MjI0OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNTExMTFdLDgyMjU6Wy4xOTQ0NCwuNjk0NDQsMCwwLC41MTExMV0sODI0MjpbMCwuNTU1NTYsMCwwLC4zNDQ0NF0sODQwNzpbMCwuNzI0NDQsLjE1NDg2LDAsLjU3NV0sODQ2MzpbMCwuNjk0NDQsMCwwLC42Njc1OV0sODQ2NTpbMCwuNjk0NDQsMCwwLC44MzA1NV0sODQ2NzpbMCwuNjk0NDQsMCwwLC40NzM2MV0sODQ3MjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjc0MDI3XSw4NDc2OlswLC42OTQ0NCwwLDAsLjgzMDU1XSw4NTAxOlswLC42OTQ0NCwwLDAsLjcwMjc3XSw4NTkyOlstLjEwODg5LC4zOTExMSwwLDAsMS4xNDk5OV0sODU5MzpbLjE5NDQ0LC42OTQ0NCwwLDAsLjU3NV0sODU5NDpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg1OTU6Wy4xOTQ0NCwuNjk0NDQsMCwwLC41NzVdLDg1OTY6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NTk3OlsuMjUsLjc1LDAsMCwuNTc1XSw4NTk4OlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjE0OTk5XSw4NTk5OlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjE0OTk5XSw4NjAwOlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjE0OTk5XSw4NjAxOlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjE0OTk5XSw4NjM2OlstLjEwODg5LC4zOTExMSwwLDAsMS4xNDk5OV0sODYzNzpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2NDA6Wy0uMTA4ODksLjM5MTExLDAsMCwxLjE0OTk5XSw4NjQxOlstLjEwODg5LC4zOTExMSwwLDAsMS4xNDk5OV0sODY1NjpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2NTc6Wy4xOTQ0NCwuNjk0NDQsMCwwLC43MDI3N10sODY1ODpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2NTk6Wy4xOTQ0NCwuNjk0NDQsMCwwLC43MDI3N10sODY2MDpbLS4xMDg4OSwuMzkxMTEsMCwwLDEuMTQ5OTldLDg2NjE6Wy4yNSwuNzUsMCwwLC43MDI3N10sODcwNDpbMCwuNjk0NDQsMCwwLC42Mzg4OV0sODcwNjpbMCwuNjk0NDQsLjA2Mzg5LDAsLjYyODQ3XSw4NzA3OlswLC42OTQ0NCwwLDAsLjYzODg5XSw4NzA5OlsuMDU1NTYsLjc1LDAsMCwuNTc1XSw4NzExOlswLC42ODYxMSwwLDAsLjk1ODMzXSw4NzEyOlsuMDg1NTYsLjU4NTU2LDAsMCwuNzY2NjZdLDg3MTU6Wy4wODU1NiwuNTg1NTYsMCwwLC43NjY2Nl0sODcyMjpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4NzIzOlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDg3MjU6Wy4yNSwuNzUsMCwwLC41NzVdLDg3MjY6Wy4yNSwuNzUsMCwwLC41NzVdLDg3Mjc6Wy0uMDI3NzgsLjQ3MjIyLDAsMCwuNTc1XSw4NzI4OlstLjAyNjM5LC40NzM2MSwwLDAsLjU3NV0sODcyOTpbLS4wMjYzOSwuNDczNjEsMCwwLC41NzVdLDg3MzA6Wy4xOCwuODIsMCwwLC45NTgzM10sODczMzpbMCwuNDQ0NDQsMCwwLC44OTQ0NF0sODczNDpbMCwuNDQ0NDQsMCwwLDEuMTQ5OTldLDg3MzY6WzAsLjY5MjI0LDAsMCwuNzIyMjJdLDg3Mzk6Wy4yNSwuNzUsMCwwLC4zMTk0NF0sODc0MTpbLjI1LC43NSwwLDAsLjU3NV0sODc0MzpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODc0NDpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODc0NTpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODc0NjpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODc0NzpbLjE5NDQ0LC42OTQ0NCwuMTI3NzgsMCwuNTY4NzVdLDg3NjQ6Wy0uMTA4ODksLjM5MTExLDAsMCwuODk0NDRdLDg3Njg6Wy4xOTQ0NCwuNjk0NDQsMCwwLC4zMTk0NF0sODc3MTpbLjAwMjIyLC41MDIyMiwwLDAsLjg5NDQ0XSw4NzczOlsuMDI3LC42MzgsMCwwLC44OTRdLDg3NzY6Wy4wMjQ0NCwuNTI0NDQsMCwwLC44OTQ0NF0sODc4MTpbLjAwMjIyLC41MDIyMiwwLDAsLjg5NDQ0XSw4ODAxOlsuMDAyMjIsLjUwMjIyLDAsMCwuODk0NDRdLDg4MDQ6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sODgwNTpbLjE5NjY3LC42OTY2NywwLDAsLjg5NDQ0XSw4ODEwOlsuMDg1NTYsLjU4NTU2LDAsMCwxLjE0OTk5XSw4ODExOlsuMDg1NTYsLjU4NTU2LDAsMCwxLjE0OTk5XSw4ODI2OlsuMDg1NTYsLjU4NTU2LDAsMCwuODk0NDRdLDg4Mjc6Wy4wODU1NiwuNTg1NTYsMCwwLC44OTQ0NF0sODgzNDpbLjA4NTU2LC41ODU1NiwwLDAsLjg5NDQ0XSw4ODM1OlsuMDg1NTYsLjU4NTU2LDAsMCwuODk0NDRdLDg4Mzg6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sODgzOTpbLjE5NjY3LC42OTY2NywwLDAsLjg5NDQ0XSw4ODQ2OlswLC41NTU1NiwwLDAsLjc2NjY2XSw4ODQ5OlsuMTk2NjcsLjY5NjY3LDAsMCwuODk0NDRdLDg4NTA6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sODg1MTpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODg1MjpbMCwuNTU1NTYsMCwwLC43NjY2Nl0sODg1MzpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4ODU0OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDg4NTU6Wy4xMzMzMywuNjMzMzMsMCwwLC44OTQ0NF0sODg1NjpbLjEzMzMzLC42MzMzMywwLDAsLjg5NDQ0XSw4ODU3OlsuMTMzMzMsLjYzMzMzLDAsMCwuODk0NDRdLDg4NjY6WzAsLjY5NDQ0LDAsMCwuNzAyNzddLDg4Njc6WzAsLjY5NDQ0LDAsMCwuNzAyNzddLDg4Njg6WzAsLjY5NDQ0LDAsMCwuODk0NDRdLDg4Njk6WzAsLjY5NDQ0LDAsMCwuODk0NDRdLDg5MDA6Wy0uMDI2MzksLjQ3MzYxLDAsMCwuNTc1XSw4OTAxOlstLjAyNjM5LC40NzM2MSwwLDAsLjMxOTQ0XSw4OTAyOlstLjAyNzc4LC40NzIyMiwwLDAsLjU3NV0sODk2ODpbLjI1LC43NSwwLDAsLjUxMTExXSw4OTY5OlsuMjUsLjc1LDAsMCwuNTExMTFdLDg5NzA6Wy4yNSwuNzUsMCwwLC41MTExMV0sODk3MTpbLjI1LC43NSwwLDAsLjUxMTExXSw4OTk0OlstLjEzODg5LC4zNjExMSwwLDAsMS4xNDk5OV0sODk5NTpbLS4xMzg4OSwuMzYxMTEsMCwwLDEuMTQ5OTldLDk2NTE6Wy4xOTQ0NCwuNjk0NDQsMCwwLDEuMDIyMjJdLDk2NTc6Wy0uMDI3NzgsLjQ3MjIyLDAsMCwuNTc1XSw5NjYxOlsuMTk0NDQsLjY5NDQ0LDAsMCwxLjAyMjIyXSw5NjY3OlstLjAyNzc4LC40NzIyMiwwLDAsLjU3NV0sOTcxMTpbLjE5NDQ0LC42OTQ0NCwwLDAsMS4xNDk5OV0sOTgyNDpbLjEyOTYzLC42OTQ0NCwwLDAsLjg5NDQ0XSw5ODI1OlsuMTI5NjMsLjY5NDQ0LDAsMCwuODk0NDRdLDk4MjY6Wy4xMjk2MywuNjk0NDQsMCwwLC44OTQ0NF0sOTgyNzpbLjEyOTYzLC42OTQ0NCwwLDAsLjg5NDQ0XSw5ODM3OlswLC43NSwwLDAsLjQ0NzIyXSw5ODM4OlsuMTk0NDQsLjY5NDQ0LDAsMCwuNDQ3MjJdLDk4Mzk6Wy4xOTQ0NCwuNjk0NDQsMCwwLC40NDcyMl0sMTAyMTY6Wy4yNSwuNzUsMCwwLC40NDcyMl0sMTAyMTc6Wy4yNSwuNzUsMCwwLC40NDcyMl0sMTA4MTU6WzAsLjY4NjExLDAsMCwuOV0sMTA5Mjc6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sMTA5Mjg6Wy4xOTY2NywuNjk2NjcsMCwwLC44OTQ0NF0sNTczNzY6Wy4xOTQ0NCwuNjk0NDQsMCwwLDBdfSwiTWFpbi1Cb2xkSXRhbGljIjp7MzI6WzAsMCwwLDAsLjI1XSwzMzpbMCwuNjk0NDQsLjExNDE3LDAsLjM4NjExXSwzNDpbMCwuNjk0NDQsLjA3OTM5LDAsLjYyMDU1XSwzNTpbLjE5NDQ0LC42OTQ0NCwuMDY4MzMsMCwuOTQ0NDRdLDM3OlsuMDU1NTYsLjc1LC4xMjg2MSwwLC45NDQ0NF0sMzg6WzAsLjY5NDQ0LC4wODUyOCwwLC44ODU1NV0sMzk6WzAsLjY5NDQ0LC4xMjk0NSwwLC4zNTU1NV0sNDA6Wy4yNSwuNzUsLjE1ODA2LDAsLjQ3MzMzXSw0MTpbLjI1LC43NSwuMDMzMDYsMCwuNDczMzNdLDQyOlswLC43NSwuMTQzMzMsMCwuNTkxMTFdLDQzOlsuMTAzMzMsLjYwMzMzLC4wMzMwNiwwLC44ODU1NV0sNDQ6Wy4xOTQ0NCwuMTQ3MjIsMCwwLC4zNTU1NV0sNDU6WzAsLjQ0NDQ0LC4wMjYxMSwwLC40MTQ0NF0sNDY6WzAsLjE0NzIyLDAsMCwuMzU1NTVdLDQ3OlsuMjUsLjc1LC4xNTgwNiwwLC41OTExMV0sNDg6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNDk6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTA6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTE6WzAsLjY0NDQ0LC4xMzE2NywwLC41OTExMV0sNTI6Wy4xOTQ0NCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1MzpbMCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1NDpbMCwuNjQ0NDQsLjEzMTY3LDAsLjU5MTExXSw1NTpbLjE5NDQ0LC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDU2OlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDU3OlswLC42NDQ0NCwuMTMxNjcsMCwuNTkxMTFdLDU4OlswLC40NDQ0NCwuMDY2OTUsMCwuMzU1NTVdLDU5OlsuMTk0NDQsLjQ0NDQ0LC4wNjY5NSwwLC4zNTU1NV0sNjE6Wy0uMTA4ODksLjM5MTExLC4wNjgzMywwLC44ODU1NV0sNjM6WzAsLjY5NDQ0LC4xMTQ3MiwwLC41OTExMV0sNjQ6WzAsLjY5NDQ0LC4wOTIwOCwwLC44ODU1NV0sNjU6WzAsLjY4NjExLDAsMCwuODY1NTVdLDY2OlswLC42ODYxMSwuMDk5MiwwLC44MTY2Nl0sNjc6WzAsLjY4NjExLC4xNDIwOCwwLC44MjY2Nl0sNjg6WzAsLjY4NjExLC4wOTA2MiwwLC44NzU1NV0sNjk6WzAsLjY4NjExLC4xMTQzMSwwLC43NTY2Nl0sNzA6WzAsLjY4NjExLC4xMjkwMywwLC43MjcyMl0sNzE6WzAsLjY4NjExLC4wNzM0NywwLC44OTUyN10sNzI6WzAsLjY4NjExLC4xNzIwOCwwLC44OTYxXSw3MzpbMCwuNjg2MTEsLjE1NjgxLDAsLjQ3MTY2XSw3NDpbMCwuNjg2MTEsLjE0NSwwLC42MTA1NV0sNzU6WzAsLjY4NjExLC4xNDIwOCwwLC44OTQ5OV0sNzY6WzAsLjY4NjExLDAsMCwuNjk3NzddLDc3OlswLC42ODYxMSwuMTcyMDgsMCwxLjA3Mjc3XSw3ODpbMCwuNjg2MTEsLjE3MjA4LDAsLjg5NjFdLDc5OlswLC42ODYxMSwuMDkwNjIsMCwuODU0OTldLDgwOlswLC42ODYxMSwuMDk5MiwwLC43ODcyMV0sODE6Wy4xOTQ0NCwuNjg2MTEsLjA5MDYyLDAsLjg1NDk5XSw4MjpbMCwuNjg2MTEsLjAyNTU5LDAsLjg1OTQ0XSw4MzpbMCwuNjg2MTEsLjExMjY0LDAsLjY0OTk5XSw4NDpbMCwuNjg2MTEsLjEyOTAzLDAsLjc5NjFdLDg1OlswLC42ODYxMSwuMTcyMDgsMCwuODgwODNdLDg2OlswLC42ODYxMSwuMTg2MjUsMCwuODY1NTVdLDg3OlswLC42ODYxMSwuMTg2MjUsMCwxLjE1OTk5XSw4ODpbMCwuNjg2MTEsLjE1NjgxLDAsLjg2NTU1XSw4OTpbMCwuNjg2MTEsLjE5ODAzLDAsLjg2NTU1XSw5MDpbMCwuNjg2MTEsLjE0MjA4LDAsLjcwODg4XSw5MTpbLjI1LC43NSwuMTg3NSwwLC4zNTYxMV0sOTM6Wy4yNSwuNzUsLjA5OTcyLDAsLjM1NjExXSw5NDpbMCwuNjk0NDQsLjA2NzA5LDAsLjU5MTExXSw5NTpbLjMxLC4xMzQ0NCwuMDk4MTEsMCwuNTkxMTFdLDk3OlswLC40NDQ0NCwuMDk0MjYsMCwuNTkxMTFdLDk4OlswLC42OTQ0NCwuMDc4NjEsMCwuNTMyMjJdLDk5OlswLC40NDQ0NCwuMDUyMjIsMCwuNTMyMjJdLDEwMDpbMCwuNjk0NDQsLjEwODYxLDAsLjU5MTExXSwxMDE6WzAsLjQ0NDQ0LC4wODUsMCwuNTMyMjJdLDEwMjpbLjE5NDQ0LC42OTQ0NCwuMjE3NzgsMCwuNF0sMTAzOlsuMTk0NDQsLjQ0NDQ0LC4xMDUsMCwuNTMyMjJdLDEwNDpbMCwuNjk0NDQsLjA5NDI2LDAsLjU5MTExXSwxMDU6WzAsLjY5MzI2LC4xMTM4NywwLC4zNTU1NV0sMTA2OlsuMTk0NDQsLjY5MzI2LC4xNjcyLDAsLjM1NTU1XSwxMDc6WzAsLjY5NDQ0LC4xMTExMSwwLC41MzIyMl0sMTA4OlswLC42OTQ0NCwuMTA4NjEsMCwuMjk2NjZdLDEwOTpbMCwuNDQ0NDQsLjA5NDI2LDAsLjk0NDQ0XSwxMTA6WzAsLjQ0NDQ0LC4wOTQyNiwwLC42NDk5OV0sMTExOlswLC40NDQ0NCwuMDc4NjEsMCwuNTkxMTFdLDExMjpbLjE5NDQ0LC40NDQ0NCwuMDc4NjEsMCwuNTkxMTFdLDExMzpbLjE5NDQ0LC40NDQ0NCwuMTA1LDAsLjUzMjIyXSwxMTQ6WzAsLjQ0NDQ0LC4xMTExMSwwLC41MDE2N10sMTE1OlswLC40NDQ0NCwuMDgxNjcsMCwuNDg2OTRdLDExNjpbMCwuNjM0OTIsLjA5NjM5LDAsLjM4NV0sMTE3OlswLC40NDQ0NCwuMDk0MjYsMCwuNjIwNTVdLDExODpbMCwuNDQ0NDQsLjExMTExLDAsLjUzMjIyXSwxMTk6WzAsLjQ0NDQ0LC4xMTExMSwwLC43Njc3N10sMTIwOlswLC40NDQ0NCwuMTI1ODMsMCwuNTYwNTVdLDEyMTpbLjE5NDQ0LC40NDQ0NCwuMTA1LDAsLjU2MTY2XSwxMjI6WzAsLjQ0NDQ0LC4xMzg4OSwwLC40OTA1NV0sMTI2OlsuMzUsLjM0NDQ0LC4xMTQ3MiwwLC41OTExMV0sMTYwOlswLDAsMCwwLC4yNV0sMTY4OlswLC42OTQ0NCwuMTE0NzMsMCwuNTkxMTFdLDE3NjpbMCwuNjk0NDQsMCwwLC45NDg4OF0sMTg0OlsuMTcwMTQsMCwwLDAsLjUzMjIyXSwxOTg6WzAsLjY4NjExLC4xMTQzMSwwLDEuMDIyNzddLDIxNjpbLjA0ODYxLC43MzQ3MiwuMDkwNjIsMCwuODg1NTVdLDIyMzpbLjE5NDQ0LC42OTQ0NCwuMDk3MzYsMCwuNjY1XSwyMzA6WzAsLjQ0NDQ0LC4wODUsMCwuODI2NjZdLDI0ODpbLjA5NzIyLC41NDE2NywuMDk0NTgsMCwuNTkxMTFdLDMwNTpbMCwuNDQ0NDQsLjA5NDI2LDAsLjM1NTU1XSwzMzg6WzAsLjY4NjExLC4xMTQzMSwwLDEuMTQwNTRdLDMzOTpbMCwuNDQ0NDQsLjA4NSwwLC44MjY2Nl0sNTY3OlsuMTk0NDQsLjQ0NDQ0LC4wNDYxMSwwLC4zODVdLDcxMDpbMCwuNjk0NDQsLjA2NzA5LDAsLjU5MTExXSw3MTE6WzAsLjYzMTk0LC4wODI3MSwwLC41OTExMV0sNzEzOlswLC41OTQ0NCwuMTA0NDQsMCwuNTkxMTFdLDcxNDpbMCwuNjk0NDQsLjA4NTI4LDAsLjU5MTExXSw3MTU6WzAsLjY5NDQ0LDAsMCwuNTkxMTFdLDcyODpbMCwuNjk0NDQsLjEwMzMzLDAsLjU5MTExXSw3Mjk6WzAsLjY5NDQ0LC4xMjk0NSwwLC4zNTU1NV0sNzMwOlswLC42OTQ0NCwwLDAsLjk0ODg4XSw3MzI6WzAsLjY5NDQ0LC4xMTQ3MiwwLC41OTExMV0sNzMzOlswLC42OTQ0NCwuMTE0NzIsMCwuNTkxMTFdLDkxNTpbMCwuNjg2MTEsLjEyOTAzLDAsLjY5Nzc3XSw5MTY6WzAsLjY4NjExLDAsMCwuOTQ0NDRdLDkyMDpbMCwuNjg2MTEsLjA5MDYyLDAsLjg4NTU1XSw5MjM6WzAsLjY4NjExLDAsMCwuODA2NjZdLDkyNjpbMCwuNjg2MTEsLjE1MDkyLDAsLjc2Nzc3XSw5Mjg6WzAsLjY4NjExLC4xNzIwOCwwLC44OTYxXSw5MzE6WzAsLjY4NjExLC4xMTQzMSwwLC44MjY2Nl0sOTMzOlswLC42ODYxMSwuMTA3NzgsMCwuODg1NTVdLDkzNDpbMCwuNjg2MTEsLjA1NjMyLDAsLjgyNjY2XSw5MzY6WzAsLjY4NjExLC4xMDc3OCwwLC44ODU1NV0sOTM3OlswLC42ODYxMSwuMDk5MiwwLC44MjY2Nl0sODIxMTpbMCwuNDQ0NDQsLjA5ODExLDAsLjU5MTExXSw4MjEyOlswLC40NDQ0NCwuMDk4MTEsMCwxLjE4MjIxXSw4MjE2OlswLC42OTQ0NCwuMTI5NDUsMCwuMzU1NTVdLDgyMTc6WzAsLjY5NDQ0LC4xMjk0NSwwLC4zNTU1NV0sODIyMDpbMCwuNjk0NDQsLjE2NzcyLDAsLjYyMDU1XSw4MjIxOlswLC42OTQ0NCwuMDc5MzksMCwuNjIwNTVdfSwiTWFpbi1JdGFsaWMiOnszMjpbMCwwLDAsMCwuMjVdLDMzOlswLC42OTQ0NCwuMTI0MTcsMCwuMzA2NjddLDM0OlswLC42OTQ0NCwuMDY5NjEsMCwuNTE0NDRdLDM1OlsuMTk0NDQsLjY5NDQ0LC4wNjYxNiwwLC44MTc3N10sMzc6Wy4wNTU1NiwuNzUsLjEzNjM5LDAsLjgxNzc3XSwzODpbMCwuNjk0NDQsLjA5Njk0LDAsLjc2NjY2XSwzOTpbMCwuNjk0NDQsLjEyNDE3LDAsLjMwNjY3XSw0MDpbLjI1LC43NSwuMTYxOTQsMCwuNDA4ODldLDQxOlsuMjUsLjc1LC4wMzY5NCwwLC40MDg4OV0sNDI6WzAsLjc1LC4xNDkxNywwLC41MTExMV0sNDM6Wy4wNTY2NywuNTYxNjcsLjAzNjk0LDAsLjc2NjY2XSw0NDpbLjE5NDQ0LC4xMDU1NiwwLDAsLjMwNjY3XSw0NTpbMCwuNDMwNTYsLjAyODI2LDAsLjM1Nzc4XSw0NjpbMCwuMTA1NTYsMCwwLC4zMDY2N10sNDc6Wy4yNSwuNzUsLjE2MTk0LDAsLjUxMTExXSw0ODpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw0OTpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1MDpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1MTpbMCwuNjQ0NDQsLjEzNTU2LDAsLjUxMTExXSw1MjpbLjE5NDQ0LC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDUzOlswLC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDU0OlswLC42NDQ0NCwuMTM1NTYsMCwuNTExMTFdLDU1OlsuMTk0NDQsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTY6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTc6WzAsLjY0NDQ0LC4xMzU1NiwwLC41MTExMV0sNTg6WzAsLjQzMDU2LC4wNTgyLDAsLjMwNjY3XSw1OTpbLjE5NDQ0LC40MzA1NiwuMDU4MiwwLC4zMDY2N10sNjE6Wy0uMTMzMTMsLjM2Njg3LC4wNjYxNiwwLC43NjY2Nl0sNjM6WzAsLjY5NDQ0LC4xMjI1LDAsLjUxMTExXSw2NDpbMCwuNjk0NDQsLjA5NTk3LDAsLjc2NjY2XSw2NTpbMCwuNjgzMzMsMCwwLC43NDMzM10sNjY6WzAsLjY4MzMzLC4xMDI1NywwLC43MDM4OV0sNjc6WzAsLjY4MzMzLC4xNDUyOCwwLC43MTU1NV0sNjg6WzAsLjY4MzMzLC4wOTQwMywwLC43NTVdLDY5OlswLC42ODMzMywuMTIwMjgsMCwuNjc4MzNdLDcwOlswLC42ODMzMywuMTMzMDUsMCwuNjUyNzddLDcxOlswLC42ODMzMywuMDg3MjIsMCwuNzczNjFdLDcyOlswLC42ODMzMywuMTYzODksMCwuNzQzMzNdLDczOlswLC42ODMzMywuMTU4MDYsMCwuMzg1NTVdLDc0OlswLC42ODMzMywuMTQwMjgsMCwuNTI1XSw3NTpbMCwuNjgzMzMsLjE0NTI4LDAsLjc2ODg4XSw3NjpbMCwuNjgzMzMsMCwwLC42MjcyMl0sNzc6WzAsLjY4MzMzLC4xNjM4OSwwLC44OTY2Nl0sNzg6WzAsLjY4MzMzLC4xNjM4OSwwLC43NDMzM10sNzk6WzAsLjY4MzMzLC4wOTQwMywwLC43NjY2Nl0sODA6WzAsLjY4MzMzLC4xMDI1NywwLC42NzgzM10sODE6Wy4xOTQ0NCwuNjgzMzMsLjA5NDAzLDAsLjc2NjY2XSw4MjpbMCwuNjgzMzMsLjAzODY4LDAsLjcyOTQ0XSw4MzpbMCwuNjgzMzMsLjExOTcyLDAsLjU2MjIyXSw4NDpbMCwuNjgzMzMsLjEzMzA1LDAsLjcxNTU1XSw4NTpbMCwuNjgzMzMsLjE2Mzg5LDAsLjc0MzMzXSw4NjpbMCwuNjgzMzMsLjE4MzYxLDAsLjc0MzMzXSw4NzpbMCwuNjgzMzMsLjE4MzYxLDAsLjk5ODg4XSw4ODpbMCwuNjgzMzMsLjE1ODA2LDAsLjc0MzMzXSw4OTpbMCwuNjgzMzMsLjE5MzgzLDAsLjc0MzMzXSw5MDpbMCwuNjgzMzMsLjE0NTI4LDAsLjYxMzMzXSw5MTpbLjI1LC43NSwuMTg3NSwwLC4zMDY2N10sOTM6Wy4yNSwuNzUsLjEwNTI4LDAsLjMwNjY3XSw5NDpbMCwuNjk0NDQsLjA2NjQ2LDAsLjUxMTExXSw5NTpbLjMxLC4xMjA1NiwuMDkyMDgsMCwuNTExMTFdLDk3OlswLC40MzA1NiwuMDc2NzEsMCwuNTExMTFdLDk4OlswLC42OTQ0NCwuMDYzMTIsMCwuNDZdLDk5OlswLC40MzA1NiwuMDU2NTMsMCwuNDZdLDEwMDpbMCwuNjk0NDQsLjEwMzMzLDAsLjUxMTExXSwxMDE6WzAsLjQzMDU2LC4wNzUxNCwwLC40Nl0sMTAyOlsuMTk0NDQsLjY5NDQ0LC4yMTE5NCwwLC4zMDY2N10sMTAzOlsuMTk0NDQsLjQzMDU2LC4wODg0NywwLC40Nl0sMTA0OlswLC42OTQ0NCwuMDc2NzEsMCwuNTExMTFdLDEwNTpbMCwuNjU1MzYsLjEwMTksMCwuMzA2NjddLDEwNjpbLjE5NDQ0LC42NTUzNiwuMTQ0NjcsMCwuMzA2NjddLDEwNzpbMCwuNjk0NDQsLjEwNzY0LDAsLjQ2XSwxMDg6WzAsLjY5NDQ0LC4xMDMzMywwLC4yNTU1NV0sMTA5OlswLC40MzA1NiwuMDc2NzEsMCwuODE3NzddLDExMDpbMCwuNDMwNTYsLjA3NjcxLDAsLjU2MjIyXSwxMTE6WzAsLjQzMDU2LC4wNjMxMiwwLC41MTExMV0sMTEyOlsuMTk0NDQsLjQzMDU2LC4wNjMxMiwwLC41MTExMV0sMTEzOlsuMTk0NDQsLjQzMDU2LC4wODg0NywwLC40Nl0sMTE0OlswLC40MzA1NiwuMTA3NjQsMCwuNDIxNjZdLDExNTpbMCwuNDMwNTYsLjA4MjA4LDAsLjQwODg5XSwxMTY6WzAsLjYxNTA4LC4wOTQ4NiwwLC4zMzIyMl0sMTE3OlswLC40MzA1NiwuMDc2NzEsMCwuNTM2NjZdLDExODpbMCwuNDMwNTYsLjEwNzY0LDAsLjQ2XSwxMTk6WzAsLjQzMDU2LC4xMDc2NCwwLC42NjQ0NF0sMTIwOlswLC40MzA1NiwuMTIwNDIsMCwuNDYzODldLDEyMTpbLjE5NDQ0LC40MzA1NiwuMDg4NDcsMCwuNDg1NTVdLDEyMjpbMCwuNDMwNTYsLjEyMjkyLDAsLjQwODg5XSwxMjY6Wy4zNSwuMzE3ODYsLjExNTg1LDAsLjUxMTExXSwxNjA6WzAsMCwwLDAsLjI1XSwxNjg6WzAsLjY2Nzg2LC4xMDQ3NCwwLC41MTExMV0sMTc2OlswLC42OTQ0NCwwLDAsLjgzMTI5XSwxODQ6Wy4xNzAxNCwwLDAsMCwuNDZdLDE5ODpbMCwuNjgzMzMsLjEyMDI4LDAsLjg4Mjc3XSwyMTY6Wy4wNDg2MSwuNzMxOTQsLjA5NDAzLDAsLjc2NjY2XSwyMjM6Wy4xOTQ0NCwuNjk0NDQsLjEwNTE0LDAsLjUzNjY2XSwyMzA6WzAsLjQzMDU2LC4wNzUxNCwwLC43MTU1NV0sMjQ4OlsuMDk3MjIsLjUyNzc4LC4wOTE5NCwwLC41MTExMV0sMzM4OlswLC42ODMzMywuMTIwMjgsMCwuOTg0OTldLDMzOTpbMCwuNDMwNTYsLjA3NTE0LDAsLjcxNTU1XSw3MTA6WzAsLjY5NDQ0LC4wNjY0NiwwLC41MTExMV0sNzExOlswLC42Mjg0NywuMDgyOTUsMCwuNTExMTFdLDcxMzpbMCwuNTYxNjcsLjEwMzMzLDAsLjUxMTExXSw3MTQ6WzAsLjY5NDQ0LC4wOTY5NCwwLC41MTExMV0sNzE1OlswLC42OTQ0NCwwLDAsLjUxMTExXSw3Mjg6WzAsLjY5NDQ0LC4xMDgwNiwwLC41MTExMV0sNzI5OlswLC42Njc4NiwuMTE3NTIsMCwuMzA2NjddLDczMDpbMCwuNjk0NDQsMCwwLC44MzEyOV0sNzMyOlswLC42Njc4NiwuMTE1ODUsMCwuNTExMTFdLDczMzpbMCwuNjk0NDQsLjEyMjUsMCwuNTExMTFdLDkxNTpbMCwuNjgzMzMsLjEzMzA1LDAsLjYyNzIyXSw5MTY6WzAsLjY4MzMzLDAsMCwuODE3NzddLDkyMDpbMCwuNjgzMzMsLjA5NDAzLDAsLjc2NjY2XSw5MjM6WzAsLjY4MzMzLDAsMCwuNjkyMjJdLDkyNjpbMCwuNjgzMzMsLjE1Mjk0LDAsLjY2NDQ0XSw5Mjg6WzAsLjY4MzMzLC4xNjM4OSwwLC43NDMzM10sOTMxOlswLC42ODMzMywuMTIwMjgsMCwuNzE1NTVdLDkzMzpbMCwuNjgzMzMsLjExMTExLDAsLjc2NjY2XSw5MzQ6WzAsLjY4MzMzLC4wNTk4NiwwLC43MTU1NV0sOTM2OlswLC42ODMzMywuMTExMTEsMCwuNzY2NjZdLDkzNzpbMCwuNjgzMzMsLjEwMjU3LDAsLjcxNTU1XSw4MjExOlswLC40MzA1NiwuMDkyMDgsMCwuNTExMTFdLDgyMTI6WzAsLjQzMDU2LC4wOTIwOCwwLDEuMDIyMjJdLDgyMTY6WzAsLjY5NDQ0LC4xMjQxNywwLC4zMDY2N10sODIxNzpbMCwuNjk0NDQsLjEyNDE3LDAsLjMwNjY3XSw4MjIwOlswLC42OTQ0NCwuMTY4NSwwLC41MTQ0NF0sODIyMTpbMCwuNjk0NDQsLjA2OTYxLDAsLjUxNDQ0XSw4NDYzOlswLC42ODg4OSwwLDAsLjU0MDI4XX0sIk1haW4tUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LDAsMCwuMjc3NzhdLDM0OlswLC42OTQ0NCwwLDAsLjVdLDM1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuODMzMzRdLDM2OlsuMDU1NTYsLjc1LDAsMCwuNV0sMzc6Wy4wNTU1NiwuNzUsMCwwLC44MzMzNF0sMzg6WzAsLjY5NDQ0LDAsMCwuNzc3NzhdLDM5OlswLC42OTQ0NCwwLDAsLjI3Nzc4XSw0MDpbLjI1LC43NSwwLDAsLjM4ODg5XSw0MTpbLjI1LC43NSwwLDAsLjM4ODg5XSw0MjpbMCwuNzUsMCwwLC41XSw0MzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw0NDpbLjE5NDQ0LC4xMDU1NiwwLDAsLjI3Nzc4XSw0NTpbMCwuNDMwNTYsMCwwLC4zMzMzM10sNDY6WzAsLjEwNTU2LDAsMCwuMjc3NzhdLDQ3OlsuMjUsLjc1LDAsMCwuNV0sNDg6WzAsLjY0NDQ0LDAsMCwuNV0sNDk6WzAsLjY0NDQ0LDAsMCwuNV0sNTA6WzAsLjY0NDQ0LDAsMCwuNV0sNTE6WzAsLjY0NDQ0LDAsMCwuNV0sNTI6WzAsLjY0NDQ0LDAsMCwuNV0sNTM6WzAsLjY0NDQ0LDAsMCwuNV0sNTQ6WzAsLjY0NDQ0LDAsMCwuNV0sNTU6WzAsLjY0NDQ0LDAsMCwuNV0sNTY6WzAsLjY0NDQ0LDAsMCwuNV0sNTc6WzAsLjY0NDQ0LDAsMCwuNV0sNTg6WzAsLjQzMDU2LDAsMCwuMjc3NzhdLDU5OlsuMTk0NDQsLjQzMDU2LDAsMCwuMjc3NzhdLDYwOlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw2MTpbLS4xMzMxMywuMzY2ODcsMCwwLC43Nzc3OF0sNjI6Wy4wMzkxLC41MzkxLDAsMCwuNzc3NzhdLDYzOlswLC42OTQ0NCwwLDAsLjQ3MjIyXSw2NDpbMCwuNjk0NDQsMCwwLC43Nzc3OF0sNjU6WzAsLjY4MzMzLDAsMCwuNzVdLDY2OlswLC42ODMzMywwLDAsLjcwODM0XSw2NzpbMCwuNjgzMzMsMCwwLC43MjIyMl0sNjg6WzAsLjY4MzMzLDAsMCwuNzYzODldLDY5OlswLC42ODMzMywwLDAsLjY4MDU2XSw3MDpbMCwuNjgzMzMsMCwwLC42NTI3OF0sNzE6WzAsLjY4MzMzLDAsMCwuNzg0NzJdLDcyOlswLC42ODMzMywwLDAsLjc1XSw3MzpbMCwuNjgzMzMsMCwwLC4zNjExMV0sNzQ6WzAsLjY4MzMzLDAsMCwuNTEzODldLDc1OlswLC42ODMzMywwLDAsLjc3Nzc4XSw3NjpbMCwuNjgzMzMsMCwwLC42MjVdLDc3OlswLC42ODMzMywwLDAsLjkxNjY3XSw3ODpbMCwuNjgzMzMsMCwwLC43NV0sNzk6WzAsLjY4MzMzLDAsMCwuNzc3NzhdLDgwOlswLC42ODMzMywwLDAsLjY4MDU2XSw4MTpbLjE5NDQ0LC42ODMzMywwLDAsLjc3Nzc4XSw4MjpbMCwuNjgzMzMsMCwwLC43MzYxMV0sODM6WzAsLjY4MzMzLDAsMCwuNTU1NTZdLDg0OlswLC42ODMzMywwLDAsLjcyMjIyXSw4NTpbMCwuNjgzMzMsMCwwLC43NV0sODY6WzAsLjY4MzMzLC4wMTM4OSwwLC43NV0sODc6WzAsLjY4MzMzLC4wMTM4OSwwLDEuMDI3NzhdLDg4OlswLC42ODMzMywwLDAsLjc1XSw4OTpbMCwuNjgzMzMsLjAyNSwwLC43NV0sOTA6WzAsLjY4MzMzLDAsMCwuNjExMTFdLDkxOlsuMjUsLjc1LDAsMCwuMjc3NzhdLDkyOlsuMjUsLjc1LDAsMCwuNV0sOTM6Wy4yNSwuNzUsMCwwLC4yNzc3OF0sOTQ6WzAsLjY5NDQ0LDAsMCwuNV0sOTU6Wy4zMSwuMTIwNTYsLjAyNzc4LDAsLjVdLDk3OlswLC40MzA1NiwwLDAsLjVdLDk4OlswLC42OTQ0NCwwLDAsLjU1NTU2XSw5OTpbMCwuNDMwNTYsMCwwLC40NDQ0NV0sMTAwOlswLC42OTQ0NCwwLDAsLjU1NTU2XSwxMDE6WzAsLjQzMDU2LDAsMCwuNDQ0NDVdLDEwMjpbMCwuNjk0NDQsLjA3Nzc4LDAsLjMwNTU2XSwxMDM6Wy4xOTQ0NCwuNDMwNTYsLjAxMzg5LDAsLjVdLDEwNDpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sMTA1OlswLC42Njc4NiwwLDAsLjI3Nzc4XSwxMDY6Wy4xOTQ0NCwuNjY3ODYsMCwwLC4zMDU1Nl0sMTA3OlswLC42OTQ0NCwwLDAsLjUyNzc4XSwxMDg6WzAsLjY5NDQ0LDAsMCwuMjc3NzhdLDEwOTpbMCwuNDMwNTYsMCwwLC44MzMzNF0sMTEwOlswLC40MzA1NiwwLDAsLjU1NTU2XSwxMTE6WzAsLjQzMDU2LDAsMCwuNV0sMTEyOlsuMTk0NDQsLjQzMDU2LDAsMCwuNTU1NTZdLDExMzpbLjE5NDQ0LC40MzA1NiwwLDAsLjUyNzc4XSwxMTQ6WzAsLjQzMDU2LDAsMCwuMzkxNjddLDExNTpbMCwuNDMwNTYsMCwwLC4zOTQ0NV0sMTE2OlswLC42MTUwOCwwLDAsLjM4ODg5XSwxMTc6WzAsLjQzMDU2LDAsMCwuNTU1NTZdLDExODpbMCwuNDMwNTYsLjAxMzg5LDAsLjUyNzc4XSwxMTk6WzAsLjQzMDU2LC4wMTM4OSwwLC43MjIyMl0sMTIwOlswLC40MzA1NiwwLDAsLjUyNzc4XSwxMjE6Wy4xOTQ0NCwuNDMwNTYsLjAxMzg5LDAsLjUyNzc4XSwxMjI6WzAsLjQzMDU2LDAsMCwuNDQ0NDVdLDEyMzpbLjI1LC43NSwwLDAsLjVdLDEyNDpbLjI1LC43NSwwLDAsLjI3Nzc4XSwxMjU6Wy4yNSwuNzUsMCwwLC41XSwxMjY6Wy4zNSwuMzE3ODYsMCwwLC41XSwxNjA6WzAsMCwwLDAsLjI1XSwxNjM6WzAsLjY5NDQ0LDAsMCwuNzY5MDldLDE2NzpbLjE5NDQ0LC42OTQ0NCwwLDAsLjQ0NDQ1XSwxNjg6WzAsLjY2Nzg2LDAsMCwuNV0sMTcyOlswLC40MzA1NiwwLDAsLjY2NjY3XSwxNzY6WzAsLjY5NDQ0LDAsMCwuNzVdLDE3NzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSwxODI6Wy4xOTQ0NCwuNjk0NDQsMCwwLC42MTExMV0sMTg0OlsuMTcwMTQsMCwwLDAsLjQ0NDQ1XSwxOTg6WzAsLjY4MzMzLDAsMCwuOTAyNzhdLDIxNTpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSwyMTY6Wy4wNDg2MSwuNzMxOTQsMCwwLC43Nzc3OF0sMjIzOlswLC42OTQ0NCwwLDAsLjVdLDIzMDpbMCwuNDMwNTYsMCwwLC43MjIyMl0sMjQ3OlsuMDgzMzMsLjU4MzMzLDAsMCwuNzc3NzhdLDI0ODpbLjA5NzIyLC41Mjc3OCwwLDAsLjVdLDMwNTpbMCwuNDMwNTYsMCwwLC4yNzc3OF0sMzM4OlswLC42ODMzMywwLDAsMS4wMTM4OV0sMzM5OlswLC40MzA1NiwwLDAsLjc3Nzc4XSw1Njc6Wy4xOTQ0NCwuNDMwNTYsMCwwLC4zMDU1Nl0sNzEwOlswLC42OTQ0NCwwLDAsLjVdLDcxMTpbMCwuNjI4NDcsMCwwLC41XSw3MTM6WzAsLjU2Nzc4LDAsMCwuNV0sNzE0OlswLC42OTQ0NCwwLDAsLjVdLDcxNTpbMCwuNjk0NDQsMCwwLC41XSw3Mjg6WzAsLjY5NDQ0LDAsMCwuNV0sNzI5OlswLC42Njc4NiwwLDAsLjI3Nzc4XSw3MzA6WzAsLjY5NDQ0LDAsMCwuNzVdLDczMjpbMCwuNjY3ODYsMCwwLC41XSw3MzM6WzAsLjY5NDQ0LDAsMCwuNV0sOTE1OlswLC42ODMzMywwLDAsLjYyNV0sOTE2OlswLC42ODMzMywwLDAsLjgzMzM0XSw5MjA6WzAsLjY4MzMzLDAsMCwuNzc3NzhdLDkyMzpbMCwuNjgzMzMsMCwwLC42OTQ0NV0sOTI2OlswLC42ODMzMywwLDAsLjY2NjY3XSw5Mjg6WzAsLjY4MzMzLDAsMCwuNzVdLDkzMTpbMCwuNjgzMzMsMCwwLC43MjIyMl0sOTMzOlswLC42ODMzMywwLDAsLjc3Nzc4XSw5MzQ6WzAsLjY4MzMzLDAsMCwuNzIyMjJdLDkzNjpbMCwuNjgzMzMsMCwwLC43Nzc3OF0sOTM3OlswLC42ODMzMywwLDAsLjcyMjIyXSw4MjExOlswLC40MzA1NiwuMDI3NzgsMCwuNV0sODIxMjpbMCwuNDMwNTYsLjAyNzc4LDAsMV0sODIxNjpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sODIxNzpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sODIyMDpbMCwuNjk0NDQsMCwwLC41XSw4MjIxOlswLC42OTQ0NCwwLDAsLjVdLDgyMjQ6Wy4xOTQ0NCwuNjk0NDQsMCwwLC40NDQ0NV0sODIyNTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjQ0NDQ1XSw4MjMwOlswLC4xMjMsMCwwLDEuMTcyXSw4MjQyOlswLC41NTU1NiwwLDAsLjI3NV0sODQwNzpbMCwuNzE0NDQsLjE1MzgyLDAsLjVdLDg0NjM6WzAsLjY4ODg5LDAsMCwuNTQwMjhdLDg0NjU6WzAsLjY5NDQ0LDAsMCwuNzIyMjJdLDg0Njc6WzAsLjY5NDQ0LDAsLjExMTExLC40MTY2N10sODQ3MjpbLjE5NDQ0LC40MzA1NiwwLC4xMTExMSwuNjM2NDZdLDg0NzY6WzAsLjY5NDQ0LDAsMCwuNzIyMjJdLDg1MDE6WzAsLjY5NDQ0LDAsMCwuNjExMTFdLDg1OTI6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NTkzOlsuMTk0NDQsLjY5NDQ0LDAsMCwuNV0sODU5NDpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg1OTU6Wy4xOTQ0NCwuNjk0NDQsMCwwLC41XSw4NTk2OlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODU5NzpbLjI1LC43NSwwLDAsLjVdLDg1OTg6Wy4xOTQ0NCwuNjk0NDQsMCwwLDFdLDg1OTk6Wy4xOTQ0NCwuNjk0NDQsMCwwLDFdLDg2MDA6Wy4xOTQ0NCwuNjk0NDQsMCwwLDFdLDg2MDE6Wy4xOTQ0NCwuNjk0NDQsMCwwLDFdLDg2MTQ6Wy4wMTEsLjUxMSwwLDAsMV0sODYxNzpbLjAxMSwuNTExLDAsMCwxLjEyNl0sODYxODpbLjAxMSwuNTExLDAsMCwxLjEyNl0sODYzNjpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2Mzc6Wy0uMTMzMTMsLjM2Njg3LDAsMCwxXSw4NjQwOlstLjEzMzEzLC4zNjY4NywwLDAsMV0sODY0MTpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NTI6Wy4wMTEsLjY3MSwwLDAsMV0sODY1NjpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NTc6Wy4xOTQ0NCwuNjk0NDQsMCwwLC42MTExMV0sODY1ODpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NTk6Wy4xOTQ0NCwuNjk0NDQsMCwwLC42MTExMV0sODY2MDpbLS4xMzMxMywuMzY2ODcsMCwwLDFdLDg2NjE6Wy4yNSwuNzUsMCwwLC42MTExMV0sODcwNDpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sODcwNjpbMCwuNjk0NDQsLjA1NTU2LC4wODMzNCwuNTMwOV0sODcwNzpbMCwuNjk0NDQsMCwwLC41NTU1Nl0sODcwOTpbLjA1NTU2LC43NSwwLDAsLjVdLDg3MTE6WzAsLjY4MzMzLDAsMCwuODMzMzRdLDg3MTI6Wy4wMzkxLC41MzkxLDAsMCwuNjY2NjddLDg3MTU6Wy4wMzkxLC41MzkxLDAsMCwuNjY2NjddLDg3MjI6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODcyMzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw4NzI1OlsuMjUsLjc1LDAsMCwuNV0sODcyNjpbLjI1LC43NSwwLDAsLjVdLDg3Mjc6Wy0uMDM0NzIsLjQ2NTI4LDAsMCwuNV0sODcyODpbLS4wNTU1NSwuNDQ0NDUsMCwwLC41XSw4NzI5OlstLjA1NTU1LC40NDQ0NSwwLDAsLjVdLDg3MzA6Wy4yLC44LDAsMCwuODMzMzRdLDg3MzM6WzAsLjQzMDU2LDAsMCwuNzc3NzhdLDg3MzQ6WzAsLjQzMDU2LDAsMCwxXSw4NzM2OlswLC42OTIyNCwwLDAsLjcyMjIyXSw4NzM5OlsuMjUsLjc1LDAsMCwuMjc3NzhdLDg3NDE6Wy4yNSwuNzUsMCwwLC41XSw4NzQzOlswLC41NTU1NiwwLDAsLjY2NjY3XSw4NzQ0OlswLC41NTU1NiwwLDAsLjY2NjY3XSw4NzQ1OlswLC41NTU1NiwwLDAsLjY2NjY3XSw4NzQ2OlswLC41NTU1NiwwLDAsLjY2NjY3XSw4NzQ3OlsuMTk0NDQsLjY5NDQ0LC4xMTExMSwwLC40MTY2N10sODc2NDpbLS4xMzMxMywuMzY2ODcsMCwwLC43Nzc3OF0sODc2ODpbLjE5NDQ0LC42OTQ0NCwwLDAsLjI3Nzc4XSw4NzcxOlstLjAzNjI1LC40NjM3NSwwLDAsLjc3Nzc4XSw4NzczOlstLjAyMiwuNTg5LDAsMCwuNzc4XSw4Nzc2OlstLjAxNjg4LC40ODMxMiwwLDAsLjc3Nzc4XSw4NzgxOlstLjAzNjI1LC40NjM3NSwwLDAsLjc3Nzc4XSw4Nzg0OlstLjEzMywuNjczLDAsMCwuNzc4XSw4ODAxOlstLjAzNjI1LC40NjM3NSwwLDAsLjc3Nzc4XSw4ODA0OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4MDU6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sODgxMDpbLjAzOTEsLjUzOTEsMCwwLDFdLDg4MTE6Wy4wMzkxLC41MzkxLDAsMCwxXSw4ODI2OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4ODI3OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4ODM0OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4ODM1OlsuMDM5MSwuNTM5MSwwLDAsLjc3Nzc4XSw4ODM4OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4Mzk6Wy4xMzU5NywuNjM1OTcsMCwwLC43Nzc3OF0sODg0NjpbMCwuNTU1NTYsMCwwLC42NjY2N10sODg0OTpbLjEzNTk3LC42MzU5NywwLDAsLjc3Nzc4XSw4ODUwOlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDg4NTE6WzAsLjU1NTU2LDAsMCwuNjY2NjddLDg4NTI6WzAsLjU1NTU2LDAsMCwuNjY2NjddLDg4NTM6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODg1NDpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw4ODU1OlsuMDgzMzMsLjU4MzMzLDAsMCwuNzc3NzhdLDg4NTY6Wy4wODMzMywuNTgzMzMsMCwwLC43Nzc3OF0sODg1NzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw4ODY2OlswLC42OTQ0NCwwLDAsLjYxMTExXSw4ODY3OlswLC42OTQ0NCwwLDAsLjYxMTExXSw4ODY4OlswLC42OTQ0NCwwLDAsLjc3Nzc4XSw4ODY5OlswLC42OTQ0NCwwLDAsLjc3Nzc4XSw4ODcyOlsuMjQ5LC43NSwwLDAsLjg2N10sODkwMDpbLS4wNTU1NSwuNDQ0NDUsMCwwLC41XSw4OTAxOlstLjA1NTU1LC40NDQ0NSwwLDAsLjI3Nzc4XSw4OTAyOlstLjAzNDcyLC40NjUyOCwwLDAsLjVdLDg5MDQ6Wy4wMDUsLjUwNSwwLDAsLjldLDg5NDI6Wy4wMywuOTAzLDAsMCwuMjc4XSw4OTQzOlstLjE5LC4zMTMsMCwwLDEuMTcyXSw4OTQ1OlstLjEsLjgyMywwLDAsMS4yODJdLDg5Njg6Wy4yNSwuNzUsMCwwLC40NDQ0NV0sODk2OTpbLjI1LC43NSwwLDAsLjQ0NDQ1XSw4OTcwOlsuMjUsLjc1LDAsMCwuNDQ0NDVdLDg5NzE6Wy4yNSwuNzUsMCwwLC40NDQ0NV0sODk5NDpbLS4xNDIzNiwuMzU3NjQsMCwwLDFdLDg5OTU6Wy0uMTQyMzYsLjM1NzY0LDAsMCwxXSw5MTM2OlsuMjQ0LC43NDQsMCwwLC40MTJdLDkxMzc6Wy4yNDQsLjc0NSwwLDAsLjQxMl0sOTY1MTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjg4ODg5XSw5NjU3OlstLjAzNDcyLC40NjUyOCwwLDAsLjVdLDk2NjE6Wy4xOTQ0NCwuNjk0NDQsMCwwLC44ODg4OV0sOTY2NzpbLS4wMzQ3MiwuNDY1MjgsMCwwLC41XSw5NzExOlsuMTk0NDQsLjY5NDQ0LDAsMCwxXSw5ODI0OlsuMTI5NjMsLjY5NDQ0LDAsMCwuNzc3NzhdLDk4MjU6Wy4xMjk2MywuNjk0NDQsMCwwLC43Nzc3OF0sOTgyNjpbLjEyOTYzLC42OTQ0NCwwLDAsLjc3Nzc4XSw5ODI3OlsuMTI5NjMsLjY5NDQ0LDAsMCwuNzc3NzhdLDk4Mzc6WzAsLjc1LDAsMCwuMzg4ODldLDk4Mzg6Wy4xOTQ0NCwuNjk0NDQsMCwwLC4zODg4OV0sOTgzOTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjM4ODg5XSwxMDIxNjpbLjI1LC43NSwwLDAsLjM4ODg5XSwxMDIxNzpbLjI1LC43NSwwLDAsLjM4ODg5XSwxMDIyMjpbLjI0NCwuNzQ0LDAsMCwuNDEyXSwxMDIyMzpbLjI0NCwuNzQ1LDAsMCwuNDEyXSwxMDIyOTpbLjAxMSwuNTExLDAsMCwxLjYwOV0sMTAyMzA6Wy4wMTEsLjUxMSwwLDAsMS42MzhdLDEwMjMxOlsuMDExLC41MTEsMCwwLDEuODU5XSwxMDIzMjpbLjAyNCwuNTI1LDAsMCwxLjYwOV0sMTAyMzM6Wy4wMjQsLjUyNSwwLDAsMS42MzhdLDEwMjM0OlsuMDI0LC41MjUsMCwwLDEuODU4XSwxMDIzNjpbLjAxMSwuNTExLDAsMCwxLjYzOF0sMTA4MTU6WzAsLjY4MzMzLDAsMCwuNzVdLDEwOTI3OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDEwOTI4OlsuMTM1OTcsLjYzNTk3LDAsMCwuNzc3NzhdLDU3Mzc2OlsuMTk0NDQsLjY5NDQ0LDAsMCwwXX0sIk1hdGgtQm9sZEl0YWxpYyI6ezMyOlswLDAsMCwwLC4yNV0sNDg6WzAsLjQ0NDQ0LDAsMCwuNTc1XSw0OTpbMCwuNDQ0NDQsMCwwLC41NzVdLDUwOlswLC40NDQ0NCwwLDAsLjU3NV0sNTE6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41NzVdLDUyOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNTc1XSw1MzpbLjE5NDQ0LC40NDQ0NCwwLDAsLjU3NV0sNTQ6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1NTpbLjE5NDQ0LC40NDQ0NCwwLDAsLjU3NV0sNTY6WzAsLjY0NDQ0LDAsMCwuNTc1XSw1NzpbLjE5NDQ0LC40NDQ0NCwwLDAsLjU3NV0sNjU6WzAsLjY4NjExLDAsMCwuODY5NDRdLDY2OlswLC42ODYxMSwuMDQ4MzUsMCwuODY2NF0sNjc6WzAsLjY4NjExLC4wNjk3OSwwLC44MTY5NF0sNjg6WzAsLjY4NjExLC4wMzE5NCwwLC45MzgxMl0sNjk6WzAsLjY4NjExLC4wNTQ1MSwwLC44MTAwN10sNzA6WzAsLjY4NjExLC4xNTk3MiwwLC42ODg4OV0sNzE6WzAsLjY4NjExLDAsMCwuODg2NzNdLDcyOlswLC42ODYxMSwuMDgyMjksMCwuOTgyMjldLDczOlswLC42ODYxMSwuMDc3NzgsMCwuNTExMTFdLDc0OlswLC42ODYxMSwuMTAwNjksMCwuNjMxMjVdLDc1OlswLC42ODYxMSwuMDY5NzksMCwuOTcxMThdLDc2OlswLC42ODYxMSwwLDAsLjc1NTU1XSw3NzpbMCwuNjg2MTEsLjExNDI0LDAsMS4xNDIwMV0sNzg6WzAsLjY4NjExLC4xMTQyNCwwLC45NTAzNF0sNzk6WzAsLjY4NjExLC4wMzE5NCwwLC44MzY2Nl0sODA6WzAsLjY4NjExLC4xNTk3MiwwLC43MjMwOV0sODE6Wy4xOTQ0NCwuNjg2MTEsMCwwLC44Njg2MV0sODI6WzAsLjY4NjExLC4wMDQyMSwwLC44NzIzNV0sODM6WzAsLjY4NjExLC4wNTM4MiwwLC42OTI3MV0sODQ6WzAsLjY4NjExLC4xNTk3MiwwLC42MzY2M10sODU6WzAsLjY4NjExLC4xMTQyNCwwLC44MDAyN10sODY6WzAsLjY4NjExLC4yNTU1NSwwLC42Nzc3OF0sODc6WzAsLjY4NjExLC4xNTk3MiwwLDEuMDkzMDVdLDg4OlswLC42ODYxMSwuMDc3NzgsMCwuOTQ3MjJdLDg5OlswLC42ODYxMSwuMjU1NTUsMCwuNjc0NThdLDkwOlswLC42ODYxMSwuMDY5NzksMCwuNzcyNTddLDk3OlswLC40NDQ0NCwwLDAsLjYzMjg3XSw5ODpbMCwuNjk0NDQsMCwwLC41MjA4M10sOTk6WzAsLjQ0NDQ0LDAsMCwuNTEzNDJdLDEwMDpbMCwuNjk0NDQsMCwwLC42MDk3Ml0sMTAxOlswLC40NDQ0NCwwLDAsLjU1MzYxXSwxMDI6Wy4xOTQ0NCwuNjk0NDQsLjExMDQyLDAsLjU2ODA2XSwxMDM6Wy4xOTQ0NCwuNDQ0NDQsLjAzNzA0LDAsLjU0NDldLDEwNDpbMCwuNjk0NDQsMCwwLC42Njc1OV0sMTA1OlswLC42OTMyNiwwLDAsLjQwNDhdLDEwNjpbLjE5NDQ0LC42OTMyNiwuMDYyMiwwLC40NzA4M10sMTA3OlswLC42OTQ0NCwuMDE4NTIsMCwuNjAzN10sMTA4OlswLC42OTQ0NCwuMDA4OCwwLC4zNDgxNV0sMTA5OlswLC40NDQ0NCwwLDAsMS4wMzI0XSwxMTA6WzAsLjQ0NDQ0LDAsMCwuNzEyOTZdLDExMTpbMCwuNDQ0NDQsMCwwLC41ODQ3Ml0sMTEyOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNjAwOTJdLDExMzpbLjE5NDQ0LC40NDQ0NCwuMDM3MDQsMCwuNTQyMTNdLDExNDpbMCwuNDQ0NDQsLjAzMTk0LDAsLjUyODddLDExNTpbMCwuNDQ0NDQsMCwwLC41MzEyNV0sMTE2OlswLC42MzQ5MiwwLDAsLjQxNTI4XSwxMTc6WzAsLjQ0NDQ0LDAsMCwuNjgxMDJdLDExODpbMCwuNDQ0NDQsLjAzNzA0LDAsLjU2NjY2XSwxMTk6WzAsLjQ0NDQ0LC4wMjc3OCwwLC44MzE0OF0sMTIwOlswLC40NDQ0NCwwLDAsLjY1OTAzXSwxMjE6Wy4xOTQ0NCwuNDQ0NDQsLjAzNzA0LDAsLjU5MDI4XSwxMjI6WzAsLjQ0NDQ0LC4wNDIxMywwLC41NTUwOV0sMTYwOlswLDAsMCwwLC4yNV0sOTE1OlswLC42ODYxMSwuMTU5NzIsMCwuNjU2OTRdLDkxNjpbMCwuNjg2MTEsMCwwLC45NTgzM10sOTIwOlswLC42ODYxMSwuMDMxOTQsMCwuODY3MjJdLDkyMzpbMCwuNjg2MTEsMCwwLC44MDU1NV0sOTI2OlswLC42ODYxMSwuMDc0NTgsMCwuODQxMjVdLDkyODpbMCwuNjg2MTEsLjA4MjI5LDAsLjk4MjI5XSw5MzE6WzAsLjY4NjExLC4wNTQ1MSwwLC44ODUwN10sOTMzOlswLC42ODYxMSwuMTU5NzIsMCwuNjcwODNdLDkzNDpbMCwuNjg2MTEsMCwwLC43NjY2Nl0sOTM2OlswLC42ODYxMSwuMTE2NTMsMCwuNzE0MDJdLDkzNzpbMCwuNjg2MTEsLjA0ODM1LDAsLjg3ODldLDk0NTpbMCwuNDQ0NDQsMCwwLC43NjA2NF0sOTQ2OlsuMTk0NDQsLjY5NDQ0LC4wMzQwMywwLC42NTk3Ml0sOTQ3OlsuMTk0NDQsLjQ0NDQ0LC4wNjM4OSwwLC41OTAwM10sOTQ4OlswLC42OTQ0NCwuMDM4MTksMCwuNTIyMjJdLDk0OTpbMCwuNDQ0NDQsMCwwLC41Mjg4Ml0sOTUwOlsuMTk0NDQsLjY5NDQ0LC4wNjIxNSwwLC41MDgzM10sOTUxOlsuMTk0NDQsLjQ0NDQ0LC4wMzcwNCwwLC42XSw5NTI6WzAsLjY5NDQ0LC4wMzE5NCwwLC41NjE4XSw5NTM6WzAsLjQ0NDQ0LDAsMCwuNDEyMDRdLDk1NDpbMCwuNDQ0NDQsMCwwLC42Njc1OV0sOTU1OlswLC42OTQ0NCwwLDAsLjY3MDgzXSw5NTY6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC43MDc4N10sOTU3OlswLC40NDQ0NCwuMDY4OTgsMCwuNTc2ODVdLDk1ODpbLjE5NDQ0LC42OTQ0NCwuMDMwMjEsMCwuNTA4MzNdLDk1OTpbMCwuNDQ0NDQsMCwwLC41ODQ3Ml0sOTYwOlswLC40NDQ0NCwuMDM3MDQsMCwuNjgyNDFdLDk2MTpbLjE5NDQ0LC40NDQ0NCwwLDAsLjYxMThdLDk2MjpbLjA5NzIyLC40NDQ0NCwuMDc5MTcsMCwuNDIzNjFdLDk2MzpbMCwuNDQ0NDQsLjAzNzA0LDAsLjY4NTg4XSw5NjQ6WzAsLjQ0NDQ0LC4xMzQ3MiwwLC41MjA4M10sOTY1OlswLC40NDQ0NCwuMDM3MDQsMCwuNjMwNTVdLDk2NjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjc0NzIyXSw5Njc6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC43MTgwNV0sOTY4OlsuMTk0NDQsLjY5NDQ0LC4wMzcwNCwwLC43NTgzM10sOTY5OlswLC40NDQ0NCwuMDM3MDQsMCwuNzE3ODJdLDk3NzpbMCwuNjk0NDQsMCwwLC42OTE1NV0sOTgxOlsuMTk0NDQsLjY5NDQ0LDAsMCwuNzEyNV0sOTgyOlswLC40NDQ0NCwuMDMxOTQsMCwuOTc1XSwxMDA5OlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNjExOF0sMTAxMzpbMCwuNDQ0NDQsMCwwLC40ODMzM10sNTc2NDk6WzAsLjQ0NDQ0LDAsMCwuMzkzNTJdLDU3OTExOlsuMTk0NDQsLjQ0NDQ0LDAsMCwuNDM4ODldfSwiTWF0aC1JdGFsaWMiOnszMjpbMCwwLDAsMCwuMjVdLDQ4OlswLC40MzA1NiwwLDAsLjVdLDQ5OlswLC40MzA1NiwwLDAsLjVdLDUwOlswLC40MzA1NiwwLDAsLjVdLDUxOlsuMTk0NDQsLjQzMDU2LDAsMCwuNV0sNTI6Wy4xOTQ0NCwuNDMwNTYsMCwwLC41XSw1MzpbLjE5NDQ0LC40MzA1NiwwLDAsLjVdLDU0OlswLC42NDQ0NCwwLDAsLjVdLDU1OlsuMTk0NDQsLjQzMDU2LDAsMCwuNV0sNTY6WzAsLjY0NDQ0LDAsMCwuNV0sNTc6Wy4xOTQ0NCwuNDMwNTYsMCwwLC41XSw2NTpbMCwuNjgzMzMsMCwuMTM4ODksLjc1XSw2NjpbMCwuNjgzMzMsLjA1MDE3LC4wODMzNCwuNzU4NTFdLDY3OlswLC42ODMzMywuMDcxNTMsLjA4MzM0LC43MTQ3Ml0sNjg6WzAsLjY4MzMzLC4wMjc3OCwuMDU1NTYsLjgyNzkyXSw2OTpbMCwuNjgzMzMsLjA1NzY0LC4wODMzNCwuNzM4Ml0sNzA6WzAsLjY4MzMzLC4xMzg4OSwuMDgzMzQsLjY0MzA2XSw3MTpbMCwuNjgzMzMsMCwuMDgzMzQsLjc4NjI1XSw3MjpbMCwuNjgzMzMsLjA4MTI1LC4wNTU1NiwuODMxMjVdLDczOlswLC42ODMzMywuMDc4NDcsLjExMTExLC40Mzk1OF0sNzQ6WzAsLjY4MzMzLC4wOTYxOCwuMTY2NjcsLjU1NDUxXSw3NTpbMCwuNjgzMzMsLjA3MTUzLC4wNTU1NiwuODQ5MzFdLDc2OlswLC42ODMzMywwLC4wMjc3OCwuNjgwNTZdLDc3OlswLC42ODMzMywuMTA5MDMsLjA4MzM0LC45NzAxNF0sNzg6WzAsLjY4MzMzLC4xMDkwMywuMDgzMzQsLjgwMzQ3XSw3OTpbMCwuNjgzMzMsLjAyNzc4LC4wODMzNCwuNzYyNzhdLDgwOlswLC42ODMzMywuMTM4ODksLjA4MzM0LC42NDIwMV0sODE6Wy4xOTQ0NCwuNjgzMzMsMCwuMDgzMzQsLjc5MDU2XSw4MjpbMCwuNjgzMzMsLjAwNzczLC4wODMzNCwuNzU5MjldLDgzOlswLC42ODMzMywuMDU3NjQsLjA4MzM0LC42MTMyXSw4NDpbMCwuNjgzMzMsLjEzODg5LC4wODMzNCwuNTg0MzhdLDg1OlswLC42ODMzMywuMTA5MDMsLjAyNzc4LC42ODI3OF0sODY6WzAsLjY4MzMzLC4yMjIyMiwwLC41ODMzM10sODc6WzAsLjY4MzMzLC4xMzg4OSwwLC45NDQ0NV0sODg6WzAsLjY4MzMzLC4wNzg0NywuMDgzMzQsLjgyODQ3XSw4OTpbMCwuNjgzMzMsLjIyMjIyLDAsLjU4MDU2XSw5MDpbMCwuNjgzMzMsLjA3MTUzLC4wODMzNCwuNjgyNjRdLDk3OlswLC40MzA1NiwwLDAsLjUyODU5XSw5ODpbMCwuNjk0NDQsMCwwLC40MjkxN10sOTk6WzAsLjQzMDU2LDAsLjA1NTU2LC40MzI3Nl0sMTAwOlswLC42OTQ0NCwwLC4xNjY2NywuNTIwNDldLDEwMTpbMCwuNDMwNTYsMCwuMDU1NTYsLjQ2NTYzXSwxMDI6Wy4xOTQ0NCwuNjk0NDQsLjEwNzY0LC4xNjY2NywuNDg5NTldLDEwMzpbLjE5NDQ0LC40MzA1NiwuMDM1ODgsLjAyNzc4LC40NzY5N10sMTA0OlswLC42OTQ0NCwwLDAsLjU3NjE2XSwxMDU6WzAsLjY1OTUyLDAsMCwuMzQ0NTFdLDEwNjpbLjE5NDQ0LC42NTk1MiwuMDU3MjQsMCwuNDExODFdLDEwNzpbMCwuNjk0NDQsLjAzMTQ4LDAsLjUyMDZdLDEwODpbMCwuNjk0NDQsLjAxOTY4LC4wODMzNCwuMjk4MzhdLDEwOTpbMCwuNDMwNTYsMCwwLC44NzgwMV0sMTEwOlswLC40MzA1NiwwLDAsLjYwMDIzXSwxMTE6WzAsLjQzMDU2LDAsLjA1NTU2LC40ODQ3Ml0sMTEyOlsuMTk0NDQsLjQzMDU2LDAsLjA4MzM0LC41MDMxM10sMTEzOlsuMTk0NDQsLjQzMDU2LC4wMzU4OCwuMDgzMzQsLjQ0NjQxXSwxMTQ6WzAsLjQzMDU2LC4wMjc3OCwuMDU1NTYsLjQ1MTE2XSwxMTU6WzAsLjQzMDU2LDAsLjA1NTU2LC40Njg3NV0sMTE2OlswLC42MTUwOCwwLC4wODMzNCwuMzYxMTFdLDExNzpbMCwuNDMwNTYsMCwuMDI3NzgsLjU3MjQ2XSwxMTg6WzAsLjQzMDU2LC4wMzU4OCwuMDI3NzgsLjQ4NDcyXSwxMTk6WzAsLjQzMDU2LC4wMjY5MSwuMDgzMzQsLjcxNTkyXSwxMjA6WzAsLjQzMDU2LDAsLjAyNzc4LC41NzE1M10sMTIxOlsuMTk0NDQsLjQzMDU2LC4wMzU4OCwuMDU1NTYsLjQ5MDI4XSwxMjI6WzAsLjQzMDU2LC4wNDM5OCwuMDU1NTYsLjQ2NTA1XSwxNjA6WzAsMCwwLDAsLjI1XSw5MTU6WzAsLjY4MzMzLC4xMzg4OSwuMDgzMzQsLjYxNTI4XSw5MTY6WzAsLjY4MzMzLDAsLjE2NjY3LC44MzMzNF0sOTIwOlswLC42ODMzMywuMDI3NzgsLjA4MzM0LC43NjI3OF0sOTIzOlswLC42ODMzMywwLC4xNjY2NywuNjk0NDVdLDkyNjpbMCwuNjgzMzMsLjA3NTY5LC4wODMzNCwuNzQyMzZdLDkyODpbMCwuNjgzMzMsLjA4MTI1LC4wNTU1NiwuODMxMjVdLDkzMTpbMCwuNjgzMzMsLjA1NzY0LC4wODMzNCwuNzc5ODZdLDkzMzpbMCwuNjgzMzMsLjEzODg5LC4wNTU1NiwuNTgzMzNdLDkzNDpbMCwuNjgzMzMsMCwuMDgzMzQsLjY2NjY3XSw5MzY6WzAsLjY4MzMzLC4xMSwuMDU1NTYsLjYxMjIyXSw5Mzc6WzAsLjY4MzMzLC4wNTAxNywuMDgzMzQsLjc3MjRdLDk0NTpbMCwuNDMwNTYsLjAwMzcsLjAyNzc4LC42Mzk3XSw5NDY6Wy4xOTQ0NCwuNjk0NDQsLjA1Mjc4LC4wODMzNCwuNTY1NjNdLDk0NzpbLjE5NDQ0LC40MzA1NiwuMDU1NTYsMCwuNTE3NzNdLDk0ODpbMCwuNjk0NDQsLjAzNzg1LC4wNTU1NiwuNDQ0NDRdLDk0OTpbMCwuNDMwNTYsMCwuMDgzMzQsLjQ2NjMyXSw5NTA6Wy4xOTQ0NCwuNjk0NDQsLjA3Mzc4LC4wODMzNCwuNDM3NV0sOTUxOlsuMTk0NDQsLjQzMDU2LC4wMzU4OCwuMDU1NTYsLjQ5NjUzXSw5NTI6WzAsLjY5NDQ0LC4wMjc3OCwuMDgzMzQsLjQ2OTQ0XSw5NTM6WzAsLjQzMDU2LDAsLjA1NTU2LC4zNTM5NF0sOTU0OlswLC40MzA1NiwwLDAsLjU3NjE2XSw5NTU6WzAsLjY5NDQ0LDAsMCwuNTgzMzRdLDk1NjpbLjE5NDQ0LC40MzA1NiwwLC4wMjc3OCwuNjAyNTVdLDk1NzpbMCwuNDMwNTYsLjA2MzY2LC4wMjc3OCwuNDkzOThdLDk1ODpbLjE5NDQ0LC42OTQ0NCwuMDQ2MDEsLjExMTExLC40Mzc1XSw5NTk6WzAsLjQzMDU2LDAsLjA1NTU2LC40ODQ3Ml0sOTYwOlswLC40MzA1NiwuMDM1ODgsMCwuNTcwMDNdLDk2MTpbLjE5NDQ0LC40MzA1NiwwLC4wODMzNCwuNTE3MDJdLDk2MjpbLjA5NzIyLC40MzA1NiwuMDc5ODYsLjA4MzM0LC4zNjI4NV0sOTYzOlswLC40MzA1NiwuMDM1ODgsMCwuNTcxNDFdLDk2NDpbMCwuNDMwNTYsLjExMzIsLjAyNzc4LC40MzcxNV0sOTY1OlswLC40MzA1NiwuMDM1ODgsLjAyNzc4LC41NDAyOF0sOTY2OlsuMTk0NDQsLjQzMDU2LDAsLjA4MzM0LC42NTQxN10sOTY3OlsuMTk0NDQsLjQzMDU2LDAsLjA1NTU2LC42MjU2OV0sOTY4OlsuMTk0NDQsLjY5NDQ0LC4wMzU4OCwuMTExMTEsLjY1MTM5XSw5Njk6WzAsLjQzMDU2LC4wMzU4OCwwLC42MjI0NV0sOTc3OlswLC42OTQ0NCwwLC4wODMzNCwuNTkxNDRdLDk4MTpbLjE5NDQ0LC42OTQ0NCwwLC4wODMzNCwuNTk1ODNdLDk4MjpbMCwuNDMwNTYsLjAyNzc4LDAsLjgyODEzXSwxMDA5OlsuMTk0NDQsLjQzMDU2LDAsLjA4MzM0LC41MTcwMl0sMTAxMzpbMCwuNDMwNTYsMCwuMDU1NTYsLjQwNTldLDU3NjQ5OlswLC40MzA1NiwwLC4wMjc3OCwuMzIyNDZdLDU3OTExOlsuMTk0NDQsLjQzMDU2LDAsLjA4MzM0LC4zODQwM119LCJTYW5zU2VyaWYtQm9sZCI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LDAsMCwuMzY2NjddLDM0OlswLC42OTQ0NCwwLDAsLjU1ODM0XSwzNTpbLjE5NDQ0LC42OTQ0NCwwLDAsLjkxNjY3XSwzNjpbLjA1NTU2LC43NSwwLDAsLjU1XSwzNzpbLjA1NTU2LC43NSwwLDAsMS4wMjkxMl0sMzg6WzAsLjY5NDQ0LDAsMCwuODMwNTZdLDM5OlswLC42OTQ0NCwwLDAsLjMwNTU2XSw0MDpbLjI1LC43NSwwLDAsLjQyNzc4XSw0MTpbLjI1LC43NSwwLDAsLjQyNzc4XSw0MjpbMCwuNzUsMCwwLC41NV0sNDM6Wy4xMTY2NywuNjE2NjcsMCwwLC44NTU1Nl0sNDQ6Wy4xMDU1NiwuMTMwNTYsMCwwLC4zMDU1Nl0sNDU6WzAsLjQ1ODMzLDAsMCwuMzY2NjddLDQ2OlswLC4xMzA1NiwwLDAsLjMwNTU2XSw0NzpbLjI1LC43NSwwLDAsLjU1XSw0ODpbMCwuNjk0NDQsMCwwLC41NV0sNDk6WzAsLjY5NDQ0LDAsMCwuNTVdLDUwOlswLC42OTQ0NCwwLDAsLjU1XSw1MTpbMCwuNjk0NDQsMCwwLC41NV0sNTI6WzAsLjY5NDQ0LDAsMCwuNTVdLDUzOlswLC42OTQ0NCwwLDAsLjU1XSw1NDpbMCwuNjk0NDQsMCwwLC41NV0sNTU6WzAsLjY5NDQ0LDAsMCwuNTVdLDU2OlswLC42OTQ0NCwwLDAsLjU1XSw1NzpbMCwuNjk0NDQsMCwwLC41NV0sNTg6WzAsLjQ1ODMzLDAsMCwuMzA1NTZdLDU5OlsuMTA1NTYsLjQ1ODMzLDAsMCwuMzA1NTZdLDYxOlstLjA5Mzc1LC40MDYyNSwwLDAsLjg1NTU2XSw2MzpbMCwuNjk0NDQsMCwwLC41MTk0NV0sNjQ6WzAsLjY5NDQ0LDAsMCwuNzMzMzRdLDY1OlswLC42OTQ0NCwwLDAsLjczMzM0XSw2NjpbMCwuNjk0NDQsMCwwLC43MzMzNF0sNjc6WzAsLjY5NDQ0LDAsMCwuNzAyNzhdLDY4OlswLC42OTQ0NCwwLDAsLjc5NDQ1XSw2OTpbMCwuNjk0NDQsMCwwLC42NDE2N10sNzA6WzAsLjY5NDQ0LDAsMCwuNjExMTFdLDcxOlswLC42OTQ0NCwwLDAsLjczMzM0XSw3MjpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sNzM6WzAsLjY5NDQ0LDAsMCwuMzMwNTZdLDc0OlswLC42OTQ0NCwwLDAsLjUxOTQ1XSw3NTpbMCwuNjk0NDQsMCwwLC43NjM4OV0sNzY6WzAsLjY5NDQ0LDAsMCwuNTgwNTZdLDc3OlswLC42OTQ0NCwwLDAsLjk3Nzc4XSw3ODpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sNzk6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDgwOlswLC42OTQ0NCwwLDAsLjcwMjc4XSw4MTpbLjEwNTU2LC42OTQ0NCwwLDAsLjc5NDQ1XSw4MjpbMCwuNjk0NDQsMCwwLC43MDI3OF0sODM6WzAsLjY5NDQ0LDAsMCwuNjExMTFdLDg0OlswLC42OTQ0NCwwLDAsLjczMzM0XSw4NTpbMCwuNjk0NDQsMCwwLC43NjM4OV0sODY6WzAsLjY5NDQ0LC4wMTUyOCwwLC43MzMzNF0sODc6WzAsLjY5NDQ0LC4wMTUyOCwwLDEuMDM4ODldLDg4OlswLC42OTQ0NCwwLDAsLjczMzM0XSw4OTpbMCwuNjk0NDQsLjAyNzUsMCwuNzMzMzRdLDkwOlswLC42OTQ0NCwwLDAsLjY3MjIzXSw5MTpbLjI1LC43NSwwLDAsLjM0MzA2XSw5MzpbLjI1LC43NSwwLDAsLjM0MzA2XSw5NDpbMCwuNjk0NDQsMCwwLC41NV0sOTU6Wy4zNSwuMTA4MzMsLjAzMDU2LDAsLjU1XSw5NzpbMCwuNDU4MzMsMCwwLC41MjVdLDk4OlswLC42OTQ0NCwwLDAsLjU2MTExXSw5OTpbMCwuNDU4MzMsMCwwLC40ODg4OV0sMTAwOlswLC42OTQ0NCwwLDAsLjU2MTExXSwxMDE6WzAsLjQ1ODMzLDAsMCwuNTExMTFdLDEwMjpbMCwuNjk0NDQsLjA3NjM5LDAsLjMzNjExXSwxMDM6Wy4xOTQ0NCwuNDU4MzMsLjAxNTI4LDAsLjU1XSwxMDQ6WzAsLjY5NDQ0LDAsMCwuNTYxMTFdLDEwNTpbMCwuNjk0NDQsMCwwLC4yNTU1Nl0sMTA2OlsuMTk0NDQsLjY5NDQ0LDAsMCwuMjg2MTFdLDEwNzpbMCwuNjk0NDQsMCwwLC41MzA1Nl0sMTA4OlswLC42OTQ0NCwwLDAsLjI1NTU2XSwxMDk6WzAsLjQ1ODMzLDAsMCwuODY2NjddLDExMDpbMCwuNDU4MzMsMCwwLC41NjExMV0sMTExOlswLC40NTgzMywwLDAsLjU1XSwxMTI6Wy4xOTQ0NCwuNDU4MzMsMCwwLC41NjExMV0sMTEzOlsuMTk0NDQsLjQ1ODMzLDAsMCwuNTYxMTFdLDExNDpbMCwuNDU4MzMsLjAxNTI4LDAsLjM3MjIyXSwxMTU6WzAsLjQ1ODMzLDAsMCwuNDIxNjddLDExNjpbMCwuNTg5MjksMCwwLC40MDQxN10sMTE3OlswLC40NTgzMywwLDAsLjU2MTExXSwxMTg6WzAsLjQ1ODMzLC4wMTUyOCwwLC41XSwxMTk6WzAsLjQ1ODMzLC4wMTUyOCwwLC43NDQ0NV0sMTIwOlswLC40NTgzMywwLDAsLjVdLDEyMTpbLjE5NDQ0LC40NTgzMywuMDE1MjgsMCwuNV0sMTIyOlswLC40NTgzMywwLDAsLjQ3NjM5XSwxMjY6Wy4zNSwuMzQ0NDQsMCwwLC41NV0sMTYwOlswLDAsMCwwLC4yNV0sMTY4OlswLC42OTQ0NCwwLDAsLjU1XSwxNzY6WzAsLjY5NDQ0LDAsMCwuNzMzMzRdLDE4MDpbMCwuNjk0NDQsMCwwLC41NV0sMTg0OlsuMTcwMTQsMCwwLDAsLjQ4ODg5XSwzMDU6WzAsLjQ1ODMzLDAsMCwuMjU1NTZdLDU2NzpbLjE5NDQ0LC40NTgzMywwLDAsLjI4NjExXSw3MTA6WzAsLjY5NDQ0LDAsMCwuNTVdLDcxMTpbMCwuNjM1NDIsMCwwLC41NV0sNzEzOlswLC42Mzc3OCwwLDAsLjU1XSw3Mjg6WzAsLjY5NDQ0LDAsMCwuNTVdLDcyOTpbMCwuNjk0NDQsMCwwLC4zMDU1Nl0sNzMwOlswLC42OTQ0NCwwLDAsLjczMzM0XSw3MzI6WzAsLjY5NDQ0LDAsMCwuNTVdLDczMzpbMCwuNjk0NDQsMCwwLC41NV0sOTE1OlswLC42OTQ0NCwwLDAsLjU4MDU2XSw5MTY6WzAsLjY5NDQ0LDAsMCwuOTE2NjddLDkyMDpbMCwuNjk0NDQsMCwwLC44NTU1Nl0sOTIzOlswLC42OTQ0NCwwLDAsLjY3MjIzXSw5MjY6WzAsLjY5NDQ0LDAsMCwuNzMzMzRdLDkyODpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sOTMxOlswLC42OTQ0NCwwLDAsLjc5NDQ1XSw5MzM6WzAsLjY5NDQ0LDAsMCwuODU1NTZdLDkzNDpbMCwuNjk0NDQsMCwwLC43OTQ0NV0sOTM2OlswLC42OTQ0NCwwLDAsLjg1NTU2XSw5Mzc6WzAsLjY5NDQ0LDAsMCwuNzk0NDVdLDgyMTE6WzAsLjQ1ODMzLC4wMzA1NiwwLC41NV0sODIxMjpbMCwuNDU4MzMsLjAzMDU2LDAsMS4xMDAwMV0sODIxNjpbMCwuNjk0NDQsMCwwLC4zMDU1Nl0sODIxNzpbMCwuNjk0NDQsMCwwLC4zMDU1Nl0sODIyMDpbMCwuNjk0NDQsMCwwLC41NTgzNF0sODIyMTpbMCwuNjk0NDQsMCwwLC41NTgzNF19LCJTYW5zU2VyaWYtSXRhbGljIjp7MzI6WzAsMCwwLDAsLjI1XSwzMzpbMCwuNjk0NDQsLjA1NzMzLDAsLjMxOTQ1XSwzNDpbMCwuNjk0NDQsLjAwMzE2LDAsLjVdLDM1OlsuMTk0NDQsLjY5NDQ0LC4wNTA4NywwLC44MzMzNF0sMzY6Wy4wNTU1NiwuNzUsLjExMTU2LDAsLjVdLDM3OlsuMDU1NTYsLjc1LC4wMzEyNiwwLC44MzMzNF0sMzg6WzAsLjY5NDQ0LC4wMzA1OCwwLC43NTgzNF0sMzk6WzAsLjY5NDQ0LC4wNzgxNiwwLC4yNzc3OF0sNDA6Wy4yNSwuNzUsLjEzMTY0LDAsLjM4ODg5XSw0MTpbLjI1LC43NSwuMDI1MzYsMCwuMzg4ODldLDQyOlswLC43NSwuMTE3NzUsMCwuNV0sNDM6Wy4wODMzMywuNTgzMzMsLjAyNTM2LDAsLjc3Nzc4XSw0NDpbLjEyNSwuMDgzMzMsMCwwLC4yNzc3OF0sNDU6WzAsLjQ0NDQ0LC4wMTk0NiwwLC4zMzMzM10sNDY6WzAsLjA4MzMzLDAsMCwuMjc3NzhdLDQ3OlsuMjUsLjc1LC4xMzE2NCwwLC41XSw0ODpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDQ5OlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTA6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1MTpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDUyOlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTM6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1NDpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDU1OlswLC42NTU1NiwuMTExNTYsMCwuNV0sNTY6WzAsLjY1NTU2LC4xMTE1NiwwLC41XSw1NzpbMCwuNjU1NTYsLjExMTU2LDAsLjVdLDU4OlswLC40NDQ0NCwuMDI1MDIsMCwuMjc3NzhdLDU5OlsuMTI1LC40NDQ0NCwuMDI1MDIsMCwuMjc3NzhdLDYxOlstLjEzLC4zNywuMDUwODcsMCwuNzc3NzhdLDYzOlswLC42OTQ0NCwuMTE4MDksMCwuNDcyMjJdLDY0OlswLC42OTQ0NCwuMDc1NTUsMCwuNjY2NjddLDY1OlswLC42OTQ0NCwwLDAsLjY2NjY3XSw2NjpbMCwuNjk0NDQsLjA4MjkzLDAsLjY2NjY3XSw2NzpbMCwuNjk0NDQsLjExOTgzLDAsLjYzODg5XSw2ODpbMCwuNjk0NDQsLjA3NTU1LDAsLjcyMjIzXSw2OTpbMCwuNjk0NDQsLjExOTgzLDAsLjU5NzIyXSw3MDpbMCwuNjk0NDQsLjEzMzcyLDAsLjU2OTQ1XSw3MTpbMCwuNjk0NDQsLjExOTgzLDAsLjY2NjY3XSw3MjpbMCwuNjk0NDQsLjA4MDk0LDAsLjcwODM0XSw3MzpbMCwuNjk0NDQsLjEzMzcyLDAsLjI3Nzc4XSw3NDpbMCwuNjk0NDQsLjA4MDk0LDAsLjQ3MjIyXSw3NTpbMCwuNjk0NDQsLjExOTgzLDAsLjY5NDQ1XSw3NjpbMCwuNjk0NDQsMCwwLC41NDE2N10sNzc6WzAsLjY5NDQ0LC4wODA5NCwwLC44NzVdLDc4OlswLC42OTQ0NCwuMDgwOTQsMCwuNzA4MzRdLDc5OlswLC42OTQ0NCwuMDc1NTUsMCwuNzM2MTFdLDgwOlswLC42OTQ0NCwuMDgyOTMsMCwuNjM4ODldLDgxOlsuMTI1LC42OTQ0NCwuMDc1NTUsMCwuNzM2MTFdLDgyOlswLC42OTQ0NCwuMDgyOTMsMCwuNjQ1ODRdLDgzOlswLC42OTQ0NCwuMDkyMDUsMCwuNTU1NTZdLDg0OlswLC42OTQ0NCwuMTMzNzIsMCwuNjgwNTZdLDg1OlswLC42OTQ0NCwuMDgwOTQsMCwuNjg3NV0sODY6WzAsLjY5NDQ0LC4xNjE1LDAsLjY2NjY3XSw4NzpbMCwuNjk0NDQsLjE2MTUsMCwuOTQ0NDVdLDg4OlswLC42OTQ0NCwuMTMzNzIsMCwuNjY2NjddLDg5OlswLC42OTQ0NCwuMTcyNjEsMCwuNjY2NjddLDkwOlswLC42OTQ0NCwuMTE5ODMsMCwuNjExMTFdLDkxOlsuMjUsLjc1LC4xNTk0MiwwLC4yODg4OV0sOTM6Wy4yNSwuNzUsLjA4NzE5LDAsLjI4ODg5XSw5NDpbMCwuNjk0NDQsLjA3OTksMCwuNV0sOTU6Wy4zNSwuMDk0NDQsLjA4NjE2LDAsLjVdLDk3OlswLC40NDQ0NCwuMDA5ODEsMCwuNDgwNTZdLDk4OlswLC42OTQ0NCwuMDMwNTcsMCwuNTE2NjddLDk5OlswLC40NDQ0NCwuMDgzMzYsMCwuNDQ0NDVdLDEwMDpbMCwuNjk0NDQsLjA5NDgzLDAsLjUxNjY3XSwxMDE6WzAsLjQ0NDQ0LC4wNjc3OCwwLC40NDQ0NV0sMTAyOlswLC42OTQ0NCwuMjE3MDUsMCwuMzA1NTZdLDEwMzpbLjE5NDQ0LC40NDQ0NCwuMTA4MzYsMCwuNV0sMTA0OlswLC42OTQ0NCwuMDE3NzgsMCwuNTE2NjddLDEwNTpbMCwuNjc5MzcsLjA5NzE4LDAsLjIzODg5XSwxMDY6Wy4xOTQ0NCwuNjc5MzcsLjA5MTYyLDAsLjI2NjY3XSwxMDc6WzAsLjY5NDQ0LC4wODMzNiwwLC40ODg4OV0sMTA4OlswLC42OTQ0NCwuMDk0ODMsMCwuMjM4ODldLDEwOTpbMCwuNDQ0NDQsLjAxNzc4LDAsLjc5NDQ1XSwxMTA6WzAsLjQ0NDQ0LC4wMTc3OCwwLC41MTY2N10sMTExOlswLC40NDQ0NCwuMDY2MTMsMCwuNV0sMTEyOlsuMTk0NDQsLjQ0NDQ0LC4wMzg5LDAsLjUxNjY3XSwxMTM6Wy4xOTQ0NCwuNDQ0NDQsLjA0MTY5LDAsLjUxNjY3XSwxMTQ6WzAsLjQ0NDQ0LC4xMDgzNiwwLC4zNDE2N10sMTE1OlswLC40NDQ0NCwuMDc3OCwwLC4zODMzM10sMTE2OlswLC41NzE0MywuMDcyMjUsMCwuMzYxMTFdLDExNzpbMCwuNDQ0NDQsLjA0MTY5LDAsLjUxNjY3XSwxMTg6WzAsLjQ0NDQ0LC4xMDgzNiwwLC40NjExMV0sMTE5OlswLC40NDQ0NCwuMTA4MzYsMCwuNjgzMzRdLDEyMDpbMCwuNDQ0NDQsLjA5MTY5LDAsLjQ2MTExXSwxMjE6Wy4xOTQ0NCwuNDQ0NDQsLjEwODM2LDAsLjQ2MTExXSwxMjI6WzAsLjQ0NDQ0LC4wODc1MiwwLC40MzQ3Ml0sMTI2OlsuMzUsLjMyNjU5LC4wODgyNiwwLC41XSwxNjA6WzAsMCwwLDAsLjI1XSwxNjg6WzAsLjY3OTM3LC4wNjM4NSwwLC41XSwxNzY6WzAsLjY5NDQ0LDAsMCwuNzM3NTJdLDE4NDpbLjE3MDE0LDAsMCwwLC40NDQ0NV0sMzA1OlswLC40NDQ0NCwuMDQxNjksMCwuMjM4ODldLDU2NzpbLjE5NDQ0LC40NDQ0NCwuMDQxNjksMCwuMjY2NjddLDcxMDpbMCwuNjk0NDQsLjA3OTksMCwuNV0sNzExOlswLC42MzE5NCwuMDg0MzIsMCwuNV0sNzEzOlswLC42MDg4OSwuMDg3NzYsMCwuNV0sNzE0OlswLC42OTQ0NCwuMDkyMDUsMCwuNV0sNzE1OlswLC42OTQ0NCwwLDAsLjVdLDcyODpbMCwuNjk0NDQsLjA5NDgzLDAsLjVdLDcyOTpbMCwuNjc5MzcsLjA3Nzc0LDAsLjI3Nzc4XSw3MzA6WzAsLjY5NDQ0LDAsMCwuNzM3NTJdLDczMjpbMCwuNjc2NTksLjA4ODI2LDAsLjVdLDczMzpbMCwuNjk0NDQsLjA5MjA1LDAsLjVdLDkxNTpbMCwuNjk0NDQsLjEzMzcyLDAsLjU0MTY3XSw5MTY6WzAsLjY5NDQ0LDAsMCwuODMzMzRdLDkyMDpbMCwuNjk0NDQsLjA3NTU1LDAsLjc3Nzc4XSw5MjM6WzAsLjY5NDQ0LDAsMCwuNjExMTFdLDkyNjpbMCwuNjk0NDQsLjEyODE2LDAsLjY2NjY3XSw5Mjg6WzAsLjY5NDQ0LC4wODA5NCwwLC43MDgzNF0sOTMxOlswLC42OTQ0NCwuMTE5ODMsMCwuNzIyMjJdLDkzMzpbMCwuNjk0NDQsLjA5MDMxLDAsLjc3Nzc4XSw5MzQ6WzAsLjY5NDQ0LC4wNDYwMywwLC43MjIyMl0sOTM2OlswLC42OTQ0NCwuMDkwMzEsMCwuNzc3NzhdLDkzNzpbMCwuNjk0NDQsLjA4MjkzLDAsLjcyMjIyXSw4MjExOlswLC40NDQ0NCwuMDg2MTYsMCwuNV0sODIxMjpbMCwuNDQ0NDQsLjA4NjE2LDAsMV0sODIxNjpbMCwuNjk0NDQsLjA3ODE2LDAsLjI3Nzc4XSw4MjE3OlswLC42OTQ0NCwuMDc4MTYsMCwuMjc3NzhdLDgyMjA6WzAsLjY5NDQ0LC4xNDIwNSwwLC41XSw4MjIxOlswLC42OTQ0NCwuMDAzMTYsMCwuNV19LCJTYW5zU2VyaWYtUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sMzM6WzAsLjY5NDQ0LDAsMCwuMzE5NDVdLDM0OlswLC42OTQ0NCwwLDAsLjVdLDM1OlsuMTk0NDQsLjY5NDQ0LDAsMCwuODMzMzRdLDM2OlsuMDU1NTYsLjc1LDAsMCwuNV0sMzc6Wy4wNTU1NiwuNzUsMCwwLC44MzMzNF0sMzg6WzAsLjY5NDQ0LDAsMCwuNzU4MzRdLDM5OlswLC42OTQ0NCwwLDAsLjI3Nzc4XSw0MDpbLjI1LC43NSwwLDAsLjM4ODg5XSw0MTpbLjI1LC43NSwwLDAsLjM4ODg5XSw0MjpbMCwuNzUsMCwwLC41XSw0MzpbLjA4MzMzLC41ODMzMywwLDAsLjc3Nzc4XSw0NDpbLjEyNSwuMDgzMzMsMCwwLC4yNzc3OF0sNDU6WzAsLjQ0NDQ0LDAsMCwuMzMzMzNdLDQ2OlswLC4wODMzMywwLDAsLjI3Nzc4XSw0NzpbLjI1LC43NSwwLDAsLjVdLDQ4OlswLC42NTU1NiwwLDAsLjVdLDQ5OlswLC42NTU1NiwwLDAsLjVdLDUwOlswLC42NTU1NiwwLDAsLjVdLDUxOlswLC42NTU1NiwwLDAsLjVdLDUyOlswLC42NTU1NiwwLDAsLjVdLDUzOlswLC42NTU1NiwwLDAsLjVdLDU0OlswLC42NTU1NiwwLDAsLjVdLDU1OlswLC42NTU1NiwwLDAsLjVdLDU2OlswLC42NTU1NiwwLDAsLjVdLDU3OlswLC42NTU1NiwwLDAsLjVdLDU4OlswLC40NDQ0NCwwLDAsLjI3Nzc4XSw1OTpbLjEyNSwuNDQ0NDQsMCwwLC4yNzc3OF0sNjE6Wy0uMTMsLjM3LDAsMCwuNzc3NzhdLDYzOlswLC42OTQ0NCwwLDAsLjQ3MjIyXSw2NDpbMCwuNjk0NDQsMCwwLC42NjY2N10sNjU6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDY2OlswLC42OTQ0NCwwLDAsLjY2NjY3XSw2NzpbMCwuNjk0NDQsMCwwLC42Mzg4OV0sNjg6WzAsLjY5NDQ0LDAsMCwuNzIyMjNdLDY5OlswLC42OTQ0NCwwLDAsLjU5NzIyXSw3MDpbMCwuNjk0NDQsMCwwLC41Njk0NV0sNzE6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDcyOlswLC42OTQ0NCwwLDAsLjcwODM0XSw3MzpbMCwuNjk0NDQsMCwwLC4yNzc3OF0sNzQ6WzAsLjY5NDQ0LDAsMCwuNDcyMjJdLDc1OlswLC42OTQ0NCwwLDAsLjY5NDQ1XSw3NjpbMCwuNjk0NDQsMCwwLC41NDE2N10sNzc6WzAsLjY5NDQ0LDAsMCwuODc1XSw3ODpbMCwuNjk0NDQsMCwwLC43MDgzNF0sNzk6WzAsLjY5NDQ0LDAsMCwuNzM2MTFdLDgwOlswLC42OTQ0NCwwLDAsLjYzODg5XSw4MTpbLjEyNSwuNjk0NDQsMCwwLC43MzYxMV0sODI6WzAsLjY5NDQ0LDAsMCwuNjQ1ODRdLDgzOlswLC42OTQ0NCwwLDAsLjU1NTU2XSw4NDpbMCwuNjk0NDQsMCwwLC42ODA1Nl0sODU6WzAsLjY5NDQ0LDAsMCwuNjg3NV0sODY6WzAsLjY5NDQ0LC4wMTM4OSwwLC42NjY2N10sODc6WzAsLjY5NDQ0LC4wMTM4OSwwLC45NDQ0NV0sODg6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDg5OlswLC42OTQ0NCwuMDI1LDAsLjY2NjY3XSw5MDpbMCwuNjk0NDQsMCwwLC42MTExMV0sOTE6Wy4yNSwuNzUsMCwwLC4yODg4OV0sOTM6Wy4yNSwuNzUsMCwwLC4yODg4OV0sOTQ6WzAsLjY5NDQ0LDAsMCwuNV0sOTU6Wy4zNSwuMDk0NDQsLjAyNzc4LDAsLjVdLDk3OlswLC40NDQ0NCwwLDAsLjQ4MDU2XSw5ODpbMCwuNjk0NDQsMCwwLC41MTY2N10sOTk6WzAsLjQ0NDQ0LDAsMCwuNDQ0NDVdLDEwMDpbMCwuNjk0NDQsMCwwLC41MTY2N10sMTAxOlswLC40NDQ0NCwwLDAsLjQ0NDQ1XSwxMDI6WzAsLjY5NDQ0LC4wNjk0NCwwLC4zMDU1Nl0sMTAzOlsuMTk0NDQsLjQ0NDQ0LC4wMTM4OSwwLC41XSwxMDQ6WzAsLjY5NDQ0LDAsMCwuNTE2NjddLDEwNTpbMCwuNjc5MzcsMCwwLC4yMzg4OV0sMTA2OlsuMTk0NDQsLjY3OTM3LDAsMCwuMjY2NjddLDEwNzpbMCwuNjk0NDQsMCwwLC40ODg4OV0sMTA4OlswLC42OTQ0NCwwLDAsLjIzODg5XSwxMDk6WzAsLjQ0NDQ0LDAsMCwuNzk0NDVdLDExMDpbMCwuNDQ0NDQsMCwwLC41MTY2N10sMTExOlswLC40NDQ0NCwwLDAsLjVdLDExMjpbLjE5NDQ0LC40NDQ0NCwwLDAsLjUxNjY3XSwxMTM6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC41MTY2N10sMTE0OlswLC40NDQ0NCwuMDEzODksMCwuMzQxNjddLDExNTpbMCwuNDQ0NDQsMCwwLC4zODMzM10sMTE2OlswLC41NzE0MywwLDAsLjM2MTExXSwxMTc6WzAsLjQ0NDQ0LDAsMCwuNTE2NjddLDExODpbMCwuNDQ0NDQsLjAxMzg5LDAsLjQ2MTExXSwxMTk6WzAsLjQ0NDQ0LC4wMTM4OSwwLC42ODMzNF0sMTIwOlswLC40NDQ0NCwwLDAsLjQ2MTExXSwxMjE6Wy4xOTQ0NCwuNDQ0NDQsLjAxMzg5LDAsLjQ2MTExXSwxMjI6WzAsLjQ0NDQ0LDAsMCwuNDM0NzJdLDEyNjpbLjM1LC4zMjY1OSwwLDAsLjVdLDE2MDpbMCwwLDAsMCwuMjVdLDE2ODpbMCwuNjc5MzcsMCwwLC41XSwxNzY6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDE4NDpbLjE3MDE0LDAsMCwwLC40NDQ0NV0sMzA1OlswLC40NDQ0NCwwLDAsLjIzODg5XSw1Njc6Wy4xOTQ0NCwuNDQ0NDQsMCwwLC4yNjY2N10sNzEwOlswLC42OTQ0NCwwLDAsLjVdLDcxMTpbMCwuNjMxOTQsMCwwLC41XSw3MTM6WzAsLjYwODg5LDAsMCwuNV0sNzE0OlswLC42OTQ0NCwwLDAsLjVdLDcxNTpbMCwuNjk0NDQsMCwwLC41XSw3Mjg6WzAsLjY5NDQ0LDAsMCwuNV0sNzI5OlswLC42NzkzNywwLDAsLjI3Nzc4XSw3MzA6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDczMjpbMCwuNjc2NTksMCwwLC41XSw3MzM6WzAsLjY5NDQ0LDAsMCwuNV0sOTE1OlswLC42OTQ0NCwwLDAsLjU0MTY3XSw5MTY6WzAsLjY5NDQ0LDAsMCwuODMzMzRdLDkyMDpbMCwuNjk0NDQsMCwwLC43Nzc3OF0sOTIzOlswLC42OTQ0NCwwLDAsLjYxMTExXSw5MjY6WzAsLjY5NDQ0LDAsMCwuNjY2NjddLDkyODpbMCwuNjk0NDQsMCwwLC43MDgzNF0sOTMxOlswLC42OTQ0NCwwLDAsLjcyMjIyXSw5MzM6WzAsLjY5NDQ0LDAsMCwuNzc3NzhdLDkzNDpbMCwuNjk0NDQsMCwwLC43MjIyMl0sOTM2OlswLC42OTQ0NCwwLDAsLjc3Nzc4XSw5Mzc6WzAsLjY5NDQ0LDAsMCwuNzIyMjJdLDgyMTE6WzAsLjQ0NDQ0LC4wMjc3OCwwLC41XSw4MjEyOlswLC40NDQ0NCwuMDI3NzgsMCwxXSw4MjE2OlswLC42OTQ0NCwwLDAsLjI3Nzc4XSw4MjE3OlswLC42OTQ0NCwwLDAsLjI3Nzc4XSw4MjIwOlswLC42OTQ0NCwwLDAsLjVdLDgyMjE6WzAsLjY5NDQ0LDAsMCwuNV19LCJTY3JpcHQtUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sNjU6WzAsLjcsLjIyOTI1LDAsLjgwMjUzXSw2NjpbMCwuNywuMDQwODcsMCwuOTA3NTddLDY3OlswLC43LC4xNjg5LDAsLjY2NjE5XSw2ODpbMCwuNywuMDkzNzEsMCwuNzc0NDNdLDY5OlswLC43LC4xODU4MywwLC41NjE2Ml0sNzA6WzAsLjcsLjEzNjM0LDAsLjg5NTQ0XSw3MTpbMCwuNywuMTczMjIsMCwuNjA5NjFdLDcyOlswLC43LC4yOTY5NCwwLC45NjkxOV0sNzM6WzAsLjcsLjE5MTg5LDAsLjgwOTA3XSw3NDpbLjI3Nzc4LC43LC4xOTE4OSwwLDEuMDUxNTldLDc1OlswLC43LC4zMTI1OSwwLC45MTM2NF0sNzY6WzAsLjcsLjE5MTg5LDAsLjg3MzczXSw3NzpbMCwuNywuMTU5ODEsMCwxLjA4MDMxXSw3ODpbMCwuNywuMzUyNSwwLC45MDE1XSw3OTpbMCwuNywuMDgwNzgsMCwuNzM3ODddLDgwOlswLC43LC4wODA3OCwwLDEuMDEyNjJdLDgxOlswLC43LC4wMzMwNSwwLC44ODI4Ml0sODI6WzAsLjcsLjA2MjU5LDAsLjg1XSw4MzpbMCwuNywuMTkxODksMCwuODY3NjddLDg0OlswLC43LC4yOTA4NywwLC43NDY5N10sODU6WzAsLjcsLjI1ODE1LDAsLjc5OTk2XSw4NjpbMCwuNywuMjc1MjMsMCwuNjIyMDRdLDg3OlswLC43LC4yNzUyMywwLC44MDUzMl0sODg6WzAsLjcsLjI2MDA2LDAsLjk0NDQ1XSw4OTpbMCwuNywuMjkzOSwwLC43MDk2MV0sOTA6WzAsLjcsLjI0MDM3LDAsLjgyMTJdLDE2MDpbMCwwLDAsMCwuMjVdfSwiU2l6ZTEtUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sNDA6Wy4zNTAwMSwuODUsMCwwLC40NTgzNF0sNDE6Wy4zNTAwMSwuODUsMCwwLC40NTgzNF0sNDc6Wy4zNTAwMSwuODUsMCwwLC41Nzc3OF0sOTE6Wy4zNTAwMSwuODUsMCwwLC40MTY2N10sOTI6Wy4zNTAwMSwuODUsMCwwLC41Nzc3OF0sOTM6Wy4zNTAwMSwuODUsMCwwLC40MTY2N10sMTIzOlsuMzUwMDEsLjg1LDAsMCwuNTgzMzRdLDEyNTpbLjM1MDAxLC44NSwwLDAsLjU4MzM0XSwxNjA6WzAsMCwwLDAsLjI1XSw3MTA6WzAsLjcyMjIyLDAsMCwuNTU1NTZdLDczMjpbMCwuNzIyMjIsMCwwLC41NTU1Nl0sNzcwOlswLC43MjIyMiwwLDAsLjU1NTU2XSw3NzE6WzAsLjcyMjIyLDAsMCwuNTU1NTZdLDgyMTQ6Wy05OWUtNSwuNjAxLDAsMCwuNzc3NzhdLDg1OTM6WzFlLTUsLjYsMCwwLC42NjY2N10sODU5NTpbMWUtNSwuNiwwLDAsLjY2NjY3XSw4NjU3OlsxZS01LC42LDAsMCwuNzc3NzhdLDg2NTk6WzFlLTUsLjYsMCwwLC43Nzc3OF0sODcxOTpbLjI1MDAxLC43NSwwLDAsLjk0NDQ1XSw4NzIwOlsuMjUwMDEsLjc1LDAsMCwuOTQ0NDVdLDg3MjE6Wy4yNTAwMSwuNzUsMCwwLDEuMDU1NTZdLDg3MzA6Wy4zNTAwMSwuODUsMCwwLDFdLDg3Mzk6Wy0uMDA1OTksLjYwNiwwLDAsLjMzMzMzXSw4NzQxOlstLjAwNTk5LC42MDYsMCwwLC41NTU1Nl0sODc0NzpbLjMwNjEyLC44MDUsLjE5NDQ1LDAsLjQ3MjIyXSw4NzQ4OlsuMzA2LC44MDUsLjE5NDQ1LDAsLjQ3MjIyXSw4NzQ5OlsuMzA2LC44MDUsLjE5NDQ1LDAsLjQ3MjIyXSw4NzUwOlsuMzA2MTIsLjgwNSwuMTk0NDUsMCwuNDcyMjJdLDg4OTY6Wy4yNTAwMSwuNzUsMCwwLC44MzMzNF0sODg5NzpbLjI1MDAxLC43NSwwLDAsLjgzMzM0XSw4ODk4OlsuMjUwMDEsLjc1LDAsMCwuODMzMzRdLDg4OTk6Wy4yNTAwMSwuNzUsMCwwLC44MzMzNF0sODk2ODpbLjM1MDAxLC44NSwwLDAsLjQ3MjIyXSw4OTY5OlsuMzUwMDEsLjg1LDAsMCwuNDcyMjJdLDg5NzA6Wy4zNTAwMSwuODUsMCwwLC40NzIyMl0sODk3MTpbLjM1MDAxLC44NSwwLDAsLjQ3MjIyXSw5MTY4OlstOTllLTUsLjYwMSwwLDAsLjY2NjY3XSwxMDIxNjpbLjM1MDAxLC44NSwwLDAsLjQ3MjIyXSwxMDIxNzpbLjM1MDAxLC44NSwwLDAsLjQ3MjIyXSwxMDc1MjpbLjI1MDAxLC43NSwwLDAsMS4xMTExMV0sMTA3NTM6Wy4yNTAwMSwuNzUsMCwwLDEuMTExMTFdLDEwNzU0OlsuMjUwMDEsLjc1LDAsMCwxLjExMTExXSwxMDc1NjpbLjI1MDAxLC43NSwwLDAsLjgzMzM0XSwxMDc1ODpbLjI1MDAxLC43NSwwLDAsLjgzMzM0XX0sIlNpemUyLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDQwOlsuNjUwMDIsMS4xNSwwLDAsLjU5NzIyXSw0MTpbLjY1MDAyLDEuMTUsMCwwLC41OTcyMl0sNDc6Wy42NTAwMiwxLjE1LDAsMCwuODExMTFdLDkxOlsuNjUwMDIsMS4xNSwwLDAsLjQ3MjIyXSw5MjpbLjY1MDAyLDEuMTUsMCwwLC44MTExMV0sOTM6Wy42NTAwMiwxLjE1LDAsMCwuNDcyMjJdLDEyMzpbLjY1MDAyLDEuMTUsMCwwLC42NjY2N10sMTI1OlsuNjUwMDIsMS4xNSwwLDAsLjY2NjY3XSwxNjA6WzAsMCwwLDAsLjI1XSw3MTA6WzAsLjc1LDAsMCwxXSw3MzI6WzAsLjc1LDAsMCwxXSw3NzA6WzAsLjc1LDAsMCwxXSw3NzE6WzAsLjc1LDAsMCwxXSw4NzE5OlsuNTUwMDEsMS4wNSwwLDAsMS4yNzc3OF0sODcyMDpbLjU1MDAxLDEuMDUsMCwwLDEuMjc3NzhdLDg3MjE6Wy41NTAwMSwxLjA1LDAsMCwxLjQ0NDQ1XSw4NzMwOlsuNjUwMDIsMS4xNSwwLDAsMV0sODc0NzpbLjg2MjI1LDEuMzYsLjQ0NDQ1LDAsLjU1NTU2XSw4NzQ4OlsuODYyLDEuMzYsLjQ0NDQ1LDAsLjU1NTU2XSw4NzQ5OlsuODYyLDEuMzYsLjQ0NDQ1LDAsLjU1NTU2XSw4NzUwOlsuODYyMjUsMS4zNiwuNDQ0NDUsMCwuNTU1NTZdLDg4OTY6Wy41NTAwMSwxLjA1LDAsMCwxLjExMTExXSw4ODk3OlsuNTUwMDEsMS4wNSwwLDAsMS4xMTExMV0sODg5ODpbLjU1MDAxLDEuMDUsMCwwLDEuMTExMTFdLDg4OTk6Wy41NTAwMSwxLjA1LDAsMCwxLjExMTExXSw4OTY4OlsuNjUwMDIsMS4xNSwwLDAsLjUyNzc4XSw4OTY5OlsuNjUwMDIsMS4xNSwwLDAsLjUyNzc4XSw4OTcwOlsuNjUwMDIsMS4xNSwwLDAsLjUyNzc4XSw4OTcxOlsuNjUwMDIsMS4xNSwwLDAsLjUyNzc4XSwxMDIxNjpbLjY1MDAyLDEuMTUsMCwwLC42MTExMV0sMTAyMTc6Wy42NTAwMiwxLjE1LDAsMCwuNjExMTFdLDEwNzUyOlsuNTUwMDEsMS4wNSwwLDAsMS41MTExMl0sMTA3NTM6Wy41NTAwMSwxLjA1LDAsMCwxLjUxMTEyXSwxMDc1NDpbLjU1MDAxLDEuMDUsMCwwLDEuNTExMTJdLDEwNzU2OlsuNTUwMDEsMS4wNSwwLDAsMS4xMTExMV0sMTA3NTg6Wy41NTAwMSwxLjA1LDAsMCwxLjExMTExXX0sIlNpemUzLVJlZ3VsYXIiOnszMjpbMCwwLDAsMCwuMjVdLDQwOlsuOTUwMDMsMS40NSwwLDAsLjczNjExXSw0MTpbLjk1MDAzLDEuNDUsMCwwLC43MzYxMV0sNDc6Wy45NTAwMywxLjQ1LDAsMCwxLjA0NDQ1XSw5MTpbLjk1MDAzLDEuNDUsMCwwLC41Mjc3OF0sOTI6Wy45NTAwMywxLjQ1LDAsMCwxLjA0NDQ1XSw5MzpbLjk1MDAzLDEuNDUsMCwwLC41Mjc3OF0sMTIzOlsuOTUwMDMsMS40NSwwLDAsLjc1XSwxMjU6Wy45NTAwMywxLjQ1LDAsMCwuNzVdLDE2MDpbMCwwLDAsMCwuMjVdLDcxMDpbMCwuNzUsMCwwLDEuNDQ0NDVdLDczMjpbMCwuNzUsMCwwLDEuNDQ0NDVdLDc3MDpbMCwuNzUsMCwwLDEuNDQ0NDVdLDc3MTpbMCwuNzUsMCwwLDEuNDQ0NDVdLDg3MzA6Wy45NTAwMywxLjQ1LDAsMCwxXSw4OTY4OlsuOTUwMDMsMS40NSwwLDAsLjU4MzM0XSw4OTY5OlsuOTUwMDMsMS40NSwwLDAsLjU4MzM0XSw4OTcwOlsuOTUwMDMsMS40NSwwLDAsLjU4MzM0XSw4OTcxOlsuOTUwMDMsMS40NSwwLDAsLjU4MzM0XSwxMDIxNjpbLjk1MDAzLDEuNDUsMCwwLC43NV0sMTAyMTc6Wy45NTAwMywxLjQ1LDAsMCwuNzVdfSwiU2l6ZTQtUmVndWxhciI6ezMyOlswLDAsMCwwLC4yNV0sNDA6WzEuMjUwMDMsMS43NSwwLDAsLjc5MTY3XSw0MTpbMS4yNTAwMywxLjc1LDAsMCwuNzkxNjddLDQ3OlsxLjI1MDAzLDEuNzUsMCwwLDEuMjc3NzhdLDkxOlsxLjI1MDAzLDEuNzUsMCwwLC41ODMzNF0sOTI6WzEuMjUwMDMsMS43NSwwLDAsMS4yNzc3OF0sOTM6WzEuMjUwMDMsMS43NSwwLDAsLjU4MzM0XSwxMjM6WzEuMjUwMDMsMS43NSwwLDAsLjgwNTU2XSwxMjU6WzEuMjUwMDMsMS43NSwwLDAsLjgwNTU2XSwxNjA6WzAsMCwwLDAsLjI1XSw3MTA6WzAsLjgyNSwwLDAsMS44ODg5XSw3MzI6WzAsLjgyNSwwLDAsMS44ODg5XSw3NzA6WzAsLjgyNSwwLDAsMS44ODg5XSw3NzE6WzAsLjgyNSwwLDAsMS44ODg5XSw4NzMwOlsxLjI1MDAzLDEuNzUsMCwwLDFdLDg5Njg6WzEuMjUwMDMsMS43NSwwLDAsLjYzODg5XSw4OTY5OlsxLjI1MDAzLDEuNzUsMCwwLC42Mzg4OV0sODk3MDpbMS4yNTAwMywxLjc1LDAsMCwuNjM4ODldLDg5NzE6WzEuMjUwMDMsMS43NSwwLDAsLjYzODg5XSw5MTE1OlsuNjQ1MDIsMS4xNTUsMCwwLC44NzVdLDkxMTY6WzFlLTUsLjYsMCwwLC44NzVdLDkxMTc6Wy42NDUwMiwxLjE1NSwwLDAsLjg3NV0sOTExODpbLjY0NTAyLDEuMTU1LDAsMCwuODc1XSw5MTE5OlsxZS01LC42LDAsMCwuODc1XSw5MTIwOlsuNjQ1MDIsMS4xNTUsMCwwLC44NzVdLDkxMjE6Wy42NDUwMiwxLjE1NSwwLDAsLjY2NjY3XSw5MTIyOlstOTllLTUsLjYwMSwwLDAsLjY2NjY3XSw5MTIzOlsuNjQ1MDIsMS4xNTUsMCwwLC42NjY2N10sOTEyNDpbLjY0NTAyLDEuMTU1LDAsMCwuNjY2NjddLDkxMjU6Wy05OWUtNSwuNjAxLDAsMCwuNjY2NjddLDkxMjY6Wy42NDUwMiwxLjE1NSwwLDAsLjY2NjY3XSw5MTI3OlsxZS01LC45LDAsMCwuODg4ODldLDkxMjg6Wy42NTAwMiwxLjE1LDAsMCwuODg4ODldLDkxMjk6Wy45MDAwMSwwLDAsMCwuODg4ODldLDkxMzA6WzAsLjMsMCwwLC44ODg4OV0sOTEzMTpbMWUtNSwuOSwwLDAsLjg4ODg5XSw5MTMyOlsuNjUwMDIsMS4xNSwwLDAsLjg4ODg5XSw5MTMzOlsuOTAwMDEsMCwwLDAsLjg4ODg5XSw5MTQzOlsuODg1MDIsLjkxNSwwLDAsMS4wNTU1Nl0sMTAyMTY6WzEuMjUwMDMsMS43NSwwLDAsLjgwNTU2XSwxMDIxNzpbMS4yNTAwMywxLjc1LDAsMCwuODA1NTZdLDU3MzQ0OlstLjAwNDk5LC42MDUsMCwwLDEuMDU1NTZdLDU3MzQ1OlstLjAwNDk5LC42MDUsMCwwLDEuMDU1NTZdLDU3NjgwOlswLC4xMiwwLDAsLjQ1XSw1NzY4MTpbMCwuMTIsMCwwLC40NV0sNTc2ODI6WzAsLjEyLDAsMCwuNDVdLDU3NjgzOlswLC4xMiwwLDAsLjQ1XX0sIlR5cGV3cml0ZXItUmVndWxhciI6ezMyOlswLDAsMCwwLC41MjVdLDMzOlswLC42MTExMSwwLDAsLjUyNV0sMzQ6WzAsLjYxMTExLDAsMCwuNTI1XSwzNTpbMCwuNjExMTEsMCwwLC41MjVdLDM2OlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSwzNzpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sMzg6WzAsLjYxMTExLDAsMCwuNTI1XSwzOTpbMCwuNjExMTEsMCwwLC41MjVdLDQwOlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSw0MTpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sNDI6WzAsLjUyMDgzLDAsMCwuNTI1XSw0MzpbLS4wODA1NiwuNTMwNTUsMCwwLC41MjVdLDQ0OlsuMTM4ODksLjEyNSwwLDAsLjUyNV0sNDU6Wy0uMDgwNTYsLjUzMDU1LDAsMCwuNTI1XSw0NjpbMCwuMTI1LDAsMCwuNTI1XSw0NzpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sNDg6WzAsLjYxMTExLDAsMCwuNTI1XSw0OTpbMCwuNjExMTEsMCwwLC41MjVdLDUwOlswLC42MTExMSwwLDAsLjUyNV0sNTE6WzAsLjYxMTExLDAsMCwuNTI1XSw1MjpbMCwuNjExMTEsMCwwLC41MjVdLDUzOlswLC42MTExMSwwLDAsLjUyNV0sNTQ6WzAsLjYxMTExLDAsMCwuNTI1XSw1NTpbMCwuNjExMTEsMCwwLC41MjVdLDU2OlswLC42MTExMSwwLDAsLjUyNV0sNTc6WzAsLjYxMTExLDAsMCwuNTI1XSw1ODpbMCwuNDMwNTYsMCwwLC41MjVdLDU5OlsuMTM4ODksLjQzMDU2LDAsMCwuNTI1XSw2MDpbLS4wNTU1NiwuNTU1NTYsMCwwLC41MjVdLDYxOlstLjE5NTQ5LC40MTU2MiwwLDAsLjUyNV0sNjI6Wy0uMDU1NTYsLjU1NTU2LDAsMCwuNTI1XSw2MzpbMCwuNjExMTEsMCwwLC41MjVdLDY0OlswLC42MTExMSwwLDAsLjUyNV0sNjU6WzAsLjYxMTExLDAsMCwuNTI1XSw2NjpbMCwuNjExMTEsMCwwLC41MjVdLDY3OlswLC42MTExMSwwLDAsLjUyNV0sNjg6WzAsLjYxMTExLDAsMCwuNTI1XSw2OTpbMCwuNjExMTEsMCwwLC41MjVdLDcwOlswLC42MTExMSwwLDAsLjUyNV0sNzE6WzAsLjYxMTExLDAsMCwuNTI1XSw3MjpbMCwuNjExMTEsMCwwLC41MjVdLDczOlswLC42MTExMSwwLDAsLjUyNV0sNzQ6WzAsLjYxMTExLDAsMCwuNTI1XSw3NTpbMCwuNjExMTEsMCwwLC41MjVdLDc2OlswLC42MTExMSwwLDAsLjUyNV0sNzc6WzAsLjYxMTExLDAsMCwuNTI1XSw3ODpbMCwuNjExMTEsMCwwLC41MjVdLDc5OlswLC42MTExMSwwLDAsLjUyNV0sODA6WzAsLjYxMTExLDAsMCwuNTI1XSw4MTpbLjEzODg5LC42MTExMSwwLDAsLjUyNV0sODI6WzAsLjYxMTExLDAsMCwuNTI1XSw4MzpbMCwuNjExMTEsMCwwLC41MjVdLDg0OlswLC42MTExMSwwLDAsLjUyNV0sODU6WzAsLjYxMTExLDAsMCwuNTI1XSw4NjpbMCwuNjExMTEsMCwwLC41MjVdLDg3OlswLC42MTExMSwwLDAsLjUyNV0sODg6WzAsLjYxMTExLDAsMCwuNTI1XSw4OTpbMCwuNjExMTEsMCwwLC41MjVdLDkwOlswLC42MTExMSwwLDAsLjUyNV0sOTE6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDkyOlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSw5MzpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sOTQ6WzAsLjYxMTExLDAsMCwuNTI1XSw5NTpbLjA5NTE0LDAsMCwwLC41MjVdLDk2OlswLC42MTExMSwwLDAsLjUyNV0sOTc6WzAsLjQzMDU2LDAsMCwuNTI1XSw5ODpbMCwuNjExMTEsMCwwLC41MjVdLDk5OlswLC40MzA1NiwwLDAsLjUyNV0sMTAwOlswLC42MTExMSwwLDAsLjUyNV0sMTAxOlswLC40MzA1NiwwLDAsLjUyNV0sMTAyOlswLC42MTExMSwwLDAsLjUyNV0sMTAzOlsuMjIyMjIsLjQzMDU2LDAsMCwuNTI1XSwxMDQ6WzAsLjYxMTExLDAsMCwuNTI1XSwxMDU6WzAsLjYxMTExLDAsMCwuNTI1XSwxMDY6Wy4yMjIyMiwuNjExMTEsMCwwLC41MjVdLDEwNzpbMCwuNjExMTEsMCwwLC41MjVdLDEwODpbMCwuNjExMTEsMCwwLC41MjVdLDEwOTpbMCwuNDMwNTYsMCwwLC41MjVdLDExMDpbMCwuNDMwNTYsMCwwLC41MjVdLDExMTpbMCwuNDMwNTYsMCwwLC41MjVdLDExMjpbLjIyMjIyLC40MzA1NiwwLDAsLjUyNV0sMTEzOlsuMjIyMjIsLjQzMDU2LDAsMCwuNTI1XSwxMTQ6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTU6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTY6WzAsLjU1MzU4LDAsMCwuNTI1XSwxMTc6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTg6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMTk6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMjA6WzAsLjQzMDU2LDAsMCwuNTI1XSwxMjE6Wy4yMjIyMiwuNDMwNTYsMCwwLC41MjVdLDEyMjpbMCwuNDMwNTYsMCwwLC41MjVdLDEyMzpbLjA4MzMzLC42OTQ0NCwwLDAsLjUyNV0sMTI0OlsuMDgzMzMsLjY5NDQ0LDAsMCwuNTI1XSwxMjU6Wy4wODMzMywuNjk0NDQsMCwwLC41MjVdLDEyNjpbMCwuNjExMTEsMCwwLC41MjVdLDEyNzpbMCwuNjExMTEsMCwwLC41MjVdLDE2MDpbMCwwLDAsMCwuNTI1XSwxNzY6WzAsLjYxMTExLDAsMCwuNTI1XSwxODQ6Wy4xOTQ0NSwwLDAsMCwuNTI1XSwzMDU6WzAsLjQzMDU2LDAsMCwuNTI1XSw1Njc6Wy4yMjIyMiwuNDMwNTYsMCwwLC41MjVdLDcxMTpbMCwuNTY1OTcsMCwwLC41MjVdLDcxMzpbMCwuNTY1NTUsMCwwLC41MjVdLDcxNDpbMCwuNjExMTEsMCwwLC41MjVdLDcxNTpbMCwuNjExMTEsMCwwLC41MjVdLDcyODpbMCwuNjExMTEsMCwwLC41MjVdLDczMDpbMCwuNjExMTEsMCwwLC41MjVdLDc3MDpbMCwuNjExMTEsMCwwLC41MjVdLDc3MTpbMCwuNjExMTEsMCwwLC41MjVdLDc3NjpbMCwuNjExMTEsMCwwLC41MjVdLDkxNTpbMCwuNjExMTEsMCwwLC41MjVdLDkxNjpbMCwuNjExMTEsMCwwLC41MjVdLDkyMDpbMCwuNjExMTEsMCwwLC41MjVdLDkyMzpbMCwuNjExMTEsMCwwLC41MjVdLDkyNjpbMCwuNjExMTEsMCwwLC41MjVdLDkyODpbMCwuNjExMTEsMCwwLC41MjVdLDkzMTpbMCwuNjExMTEsMCwwLC41MjVdLDkzMzpbMCwuNjExMTEsMCwwLC41MjVdLDkzNDpbMCwuNjExMTEsMCwwLC41MjVdLDkzNjpbMCwuNjExMTEsMCwwLC41MjVdLDkzNzpbMCwuNjExMTEsMCwwLC41MjVdLDgyMTY6WzAsLjYxMTExLDAsMCwuNTI1XSw4MjE3OlswLC42MTExMSwwLDAsLjUyNV0sODI0MjpbMCwuNjExMTEsMCwwLC41MjVdLDkyNTE6Wy4xMTExMSwuMjE5NDQsMCwwLC41MjVdfX0sQj17c2xhbnQ6Wy4yNSwuMjUsLjI1XSxzcGFjZTpbMCwwLDBdLHN0cmV0Y2g6WzAsMCwwXSxzaHJpbms6WzAsMCwwXSx4SGVpZ2h0OlsuNDMxLC40MzEsLjQzMV0scXVhZDpbMSwxLjE3MSwxLjQ3Ml0sZXh0cmFTcGFjZTpbMCwwLDBdLG51bTE6Wy42NzcsLjczMiwuOTI1XSxudW0yOlsuMzk0LC4zODQsLjM4N10sbnVtMzpbLjQ0NCwuNDcxLC41MDRdLGRlbm9tMTpbLjY4NiwuNzUyLDEuMDI1XSxkZW5vbTI6Wy4zNDUsLjM0NCwuNTMyXSxzdXAxOlsuNDEzLC41MDMsLjUwNF0sc3VwMjpbLjM2MywuNDMxLC40MDRdLHN1cDM6Wy4yODksLjI4NiwuMjk0XSxzdWIxOlsuMTUsLjE0MywuMl0sc3ViMjpbLjI0NywuMjg2LC40XSxzdXBEcm9wOlsuMzg2LC4zNTMsLjQ5NF0sc3ViRHJvcDpbLjA1LC4wNzEsLjFdLGRlbGltMTpbMi4zOSwxLjcsMS45OF0sZGVsaW0yOlsxLjAxLDEuMTU3LDEuNDJdLGF4aXNIZWlnaHQ6Wy4yNSwuMjUsLjI1XSxkZWZhdWx0UnVsZVRoaWNrbmVzczpbLjA0LC4wNDksLjA0OV0sYmlnT3BTcGFjaW5nMTpbLjExMSwuMTExLC4xMTFdLGJpZ09wU3BhY2luZzI6Wy4xNjYsLjE2NiwuMTY2XSxiaWdPcFNwYWNpbmczOlsuMiwuMiwuMl0sYmlnT3BTcGFjaW5nNDpbLjYsLjYxMSwuNjExXSxiaWdPcFNwYWNpbmc1OlsuMSwuMTQzLC4xNDNdLHNxcnRSdWxlVGhpY2tuZXNzOlsuMDQsLjA0LC4wNF0scHRQZXJFbTpbMTAsMTAsMTBdLGRvdWJsZVJ1bGVTZXA6Wy4yLC4yLC4yXSxhcnJheVJ1bGVXaWR0aDpbLjA0LC4wNCwuMDRdLGZib3hzZXA6Wy4zLC4zLC4zXSxmYm94cnVsZTpbLjA0LC4wNCwuMDRdfSxDPXsiXHhjNSI6IkEiLCJceGQwIjoiRCIsIlx4ZGUiOiJvIiwiXHhlNSI6ImEiLCJceGYwIjoiZCIsIlx4ZmUiOiJvIiwiXHUwNDEwIjoiQSIsIlx1MDQxMSI6IkIiLCJcdTA0MTIiOiJCIiwiXHUwNDEzIjoiRiIsIlx1MDQxNCI6IkEiLCJcdTA0MTUiOiJFIiwiXHUwNDE2IjoiSyIsIlx1MDQxNyI6IjMiLCJcdTA0MTgiOiJOIiwiXHUwNDE5IjoiTiIsIlx1MDQxYSI6IksiLCJcdTA0MWIiOiJOIiwiXHUwNDFjIjoiTSIsIlx1MDQxZCI6IkgiLCJcdTA0MWUiOiJPIiwiXHUwNDFmIjoiTiIsIlx1MDQyMCI6IlAiLCJcdTA0MjEiOiJDIiwiXHUwNDIyIjoiVCIsIlx1MDQyMyI6InkiLCJcdTA0MjQiOiJPIiwiXHUwNDI1IjoiWCIsIlx1MDQyNiI6IlUiLCJcdTA0MjciOiJoIiwiXHUwNDI4IjoiVyIsIlx1MDQyOSI6IlciLCJcdTA0MmEiOiJCIiwiXHUwNDJiIjoiWCIsIlx1MDQyYyI6IkIiLCJcdTA0MmQiOiIzIiwiXHUwNDJlIjoiWCIsIlx1MDQyZiI6IlIiLCJcdTA0MzAiOiJhIiwiXHUwNDMxIjoiYiIsIlx1MDQzMiI6ImEiLCJcdTA0MzMiOiJyIiwiXHUwNDM0IjoieSIsIlx1MDQzNSI6ImUiLCJcdTA0MzYiOiJtIiwiXHUwNDM3IjoiZSIsIlx1MDQzOCI6Im4iLCJcdTA0MzkiOiJuIiwiXHUwNDNhIjoibiIsIlx1MDQzYiI6Im4iLCJcdTA0M2MiOiJtIiwiXHUwNDNkIjoibiIsIlx1MDQzZSI6Im8iLCJcdTA0M2YiOiJuIiwiXHUwNDQwIjoicCIsIlx1MDQ0MSI6ImMiLCJcdTA0NDIiOiJvIiwiXHUwNDQzIjoieSIsIlx1MDQ0NCI6ImIiLCJcdTA0NDUiOiJ4IiwiXHUwNDQ2IjoibiIsIlx1MDQ0NyI6Im4iLCJcdTA0NDgiOiJ3IiwiXHUwNDQ5IjoidyIsIlx1MDQ0YSI6ImEiLCJcdTA0NGIiOiJtIiwiXHUwNDRjIjoiYSIsIlx1MDQ0ZCI6ImUiLCJcdTA0NGUiOiJtIiwiXHUwNDRmIjoiciJ9O2Z1bmN0aW9uIE4oZSx0LHIpe2lmKCFUW3RdKXRocm93IG5ldyBFcnJvcigiRm9udCBtZXRyaWNzIG5vdCBmb3VuZCBmb3IgZm9udDogIit0KyIuIik7dmFyIG49ZS5jaGFyQ29kZUF0KDApLGE9VFt0XVtuXTtpZighYSYmZVswXWluIEMmJihuPUNbZVswXV0uY2hhckNvZGVBdCgwKSxhPVRbdF1bbl0pLGF8fCJ0ZXh0IiE9PXJ8fFMobikmJihhPVRbdF1bNzddKSxhKXJldHVybntkZXB0aDphWzBdLGhlaWdodDphWzFdLGl0YWxpYzphWzJdLHNrZXc6YVszXSx3aWR0aDphWzRdfX12YXIgcT17fTt2YXIgST1bWzEsMSwxXSxbMiwxLDFdLFszLDEsMV0sWzQsMiwxXSxbNSwyLDFdLFs2LDMsMV0sWzcsNCwyXSxbOCw2LDNdLFs5LDcsNl0sWzEwLDgsN10sWzExLDEwLDldXSxSPVsuNSwuNiwuNywuOCwuOSwxLDEuMiwxLjQ0LDEuNzI4LDIuMDc0LDIuNDg4XSxIPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuc2l6ZTwyP2U6SVtlLTFdW3Quc2l6ZS0xXX0sTz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7dGhpcy5zdHlsZT12b2lkIDAsdGhpcy5jb2xvcj12b2lkIDAsdGhpcy5zaXplPXZvaWQgMCx0aGlzLnRleHRTaXplPXZvaWQgMCx0aGlzLnBoYW50b209dm9pZCAwLHRoaXMuZm9udD12b2lkIDAsdGhpcy5mb250RmFtaWx5PXZvaWQgMCx0aGlzLmZvbnRXZWlnaHQ9dm9pZCAwLHRoaXMuZm9udFNoYXBlPXZvaWQgMCx0aGlzLnNpemVNdWx0aXBsaWVyPXZvaWQgMCx0aGlzLm1heFNpemU9dm9pZCAwLHRoaXMubWluUnVsZVRoaWNrbmVzcz12b2lkIDAsdGhpcy5fZm9udE1ldHJpY3M9dm9pZCAwLHRoaXMuc3R5bGU9dC5zdHlsZSx0aGlzLmNvbG9yPXQuY29sb3IsdGhpcy5zaXplPXQuc2l6ZXx8ZS5CQVNFU0laRSx0aGlzLnRleHRTaXplPXQudGV4dFNpemV8fHRoaXMuc2l6ZSx0aGlzLnBoYW50b209ISF0LnBoYW50b20sdGhpcy5mb250PXQuZm9udHx8IiIsdGhpcy5mb250RmFtaWx5PXQuZm9udEZhbWlseXx8IiIsdGhpcy5mb250V2VpZ2h0PXQuZm9udFdlaWdodHx8IiIsdGhpcy5mb250U2hhcGU9dC5mb250U2hhcGV8fCIiLHRoaXMuc2l6ZU11bHRpcGxpZXI9Ult0aGlzLnNpemUtMV0sdGhpcy5tYXhTaXplPXQubWF4U2l6ZSx0aGlzLm1pblJ1bGVUaGlja25lc3M9dC5taW5SdWxlVGhpY2tuZXNzLHRoaXMuX2ZvbnRNZXRyaWNzPXZvaWQgMH12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5leHRlbmQ9ZnVuY3Rpb24odCl7dmFyIHI9e3N0eWxlOnRoaXMuc3R5bGUsc2l6ZTp0aGlzLnNpemUsdGV4dFNpemU6dGhpcy50ZXh0U2l6ZSxjb2xvcjp0aGlzLmNvbG9yLHBoYW50b206dGhpcy5waGFudG9tLGZvbnQ6dGhpcy5mb250LGZvbnRGYW1pbHk6dGhpcy5mb250RmFtaWx5LGZvbnRXZWlnaHQ6dGhpcy5mb250V2VpZ2h0LGZvbnRTaGFwZTp0aGlzLmZvbnRTaGFwZSxtYXhTaXplOnRoaXMubWF4U2l6ZSxtaW5SdWxlVGhpY2tuZXNzOnRoaXMubWluUnVsZVRoaWNrbmVzc307Zm9yKHZhciBuIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShuKSYmKHJbbl09dFtuXSk7cmV0dXJuIG5ldyBlKHIpfSx0LmhhdmluZ1N0eWxlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnN0eWxlPT09ZT90aGlzOnRoaXMuZXh0ZW5kKHtzdHlsZTplLHNpemU6SCh0aGlzLnRleHRTaXplLGUpfSl9LHQuaGF2aW5nQ3JhbXBlZFN0eWxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaGF2aW5nU3R5bGUodGhpcy5zdHlsZS5jcmFtcCgpKX0sdC5oYXZpbmdTaXplPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnNpemU9PT1lJiZ0aGlzLnRleHRTaXplPT09ZT90aGlzOnRoaXMuZXh0ZW5kKHtzdHlsZTp0aGlzLnN0eWxlLnRleHQoKSxzaXplOmUsdGV4dFNpemU6ZSxzaXplTXVsdGlwbGllcjpSW2UtMV19KX0sdC5oYXZpbmdCYXNlU3R5bGU9ZnVuY3Rpb24odCl7dD10fHx0aGlzLnN0eWxlLnRleHQoKTt2YXIgcj1IKGUuQkFTRVNJWkUsdCk7cmV0dXJuIHRoaXMuc2l6ZT09PXImJnRoaXMudGV4dFNpemU9PT1lLkJBU0VTSVpFJiZ0aGlzLnN0eWxlPT09dD90aGlzOnRoaXMuZXh0ZW5kKHtzdHlsZTp0LHNpemU6cn0pfSx0LmhhdmluZ0Jhc2VTaXppbmc9ZnVuY3Rpb24oKXt2YXIgZTtzd2l0Y2godGhpcy5zdHlsZS5pZCl7Y2FzZSA0OmNhc2UgNTplPTM7YnJlYWs7Y2FzZSA2OmNhc2UgNzplPTE7YnJlYWs7ZGVmYXVsdDplPTZ9cmV0dXJuIHRoaXMuZXh0ZW5kKHtzdHlsZTp0aGlzLnN0eWxlLnRleHQoKSxzaXplOmV9KX0sdC53aXRoQ29sb3I9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZXh0ZW5kKHtjb2xvcjplfSl9LHQud2l0aFBoYW50b209ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5leHRlbmQoe3BoYW50b206ITB9KX0sdC53aXRoRm9udD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnQ6ZX0pfSx0LndpdGhUZXh0Rm9udEZhbWlseT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnRGYW1pbHk6ZSxmb250OiIifSl9LHQud2l0aFRleHRGb250V2VpZ2h0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmV4dGVuZCh7Zm9udFdlaWdodDplLGZvbnQ6IiJ9KX0sdC53aXRoVGV4dEZvbnRTaGFwZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5leHRlbmQoe2ZvbnRTaGFwZTplLGZvbnQ6IiJ9KX0sdC5zaXppbmdDbGFzc2VzPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNpemUhPT10aGlzLnNpemU/WyJzaXppbmciLCJyZXNldC1zaXplIitlLnNpemUsInNpemUiK3RoaXMuc2l6ZV06W119LHQuYmFzZVNpemluZ0NsYXNzZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zaXplIT09ZS5CQVNFU0laRT9bInNpemluZyIsInJlc2V0LXNpemUiK3RoaXMuc2l6ZSwic2l6ZSIrZS5CQVNFU0laRV06W119LHQuZm9udE1ldHJpY3M9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZm9udE1ldHJpY3N8fCh0aGlzLl9mb250TWV0cmljcz1mdW5jdGlvbihlKXt2YXIgdDtpZighcVt0PWU+PTU/MDplPj0zPzE6Ml0pe3ZhciByPXFbdF09e2Nzc0VtUGVyTXU6Qi5xdWFkW3RdLzE4fTtmb3IodmFyIG4gaW4gQilCLmhhc093blByb3BlcnR5KG4pJiYocltuXT1CW25dW3RdKX1yZXR1cm4gcVt0XX0odGhpcy5zaXplKSksdGhpcy5fZm9udE1ldHJpY3N9LHQuZ2V0Q29sb3I9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5waGFudG9tPyJ0cmFuc3BhcmVudCI6dGhpcy5jb2xvcn0sZX0oKTtPLkJBU0VTSVpFPTY7dmFyIEU9TyxMPXtwdDoxLG1tOjcyMjcvMjU0MCxjbTo3MjI3LzI1NCxpbjo3Mi4yNyxicDoxLjAwMzc1LHBjOjEyLGRkOjEyMzgvMTE1NyxjYzoxNDg1Ni8xMTU3LG5kOjY4NS82NDIsbmM6MTM3MC8xMDcsc3A6MS82NTUzNixweDoxLjAwMzc1fSxEPXtleDohMCxlbTohMCxtdTohMH0sVj1mdW5jdGlvbihlKXtyZXR1cm4ic3RyaW5nIiE9dHlwZW9mIGUmJihlPWUudW5pdCksZSBpbiBMfHxlIGluIER8fCJleCI9PT1lfSxQPWZ1bmN0aW9uKGUsdCl7dmFyIHI7aWYoZS51bml0IGluIEwpcj1MW2UudW5pdF0vdC5mb250TWV0cmljcygpLnB0UGVyRW0vdC5zaXplTXVsdGlwbGllcjtlbHNlIGlmKCJtdSI9PT1lLnVuaXQpcj10LmZvbnRNZXRyaWNzKCkuY3NzRW1QZXJNdTtlbHNle3ZhciBhO2lmKGE9dC5zdHlsZS5pc1RpZ2h0KCk/dC5oYXZpbmdTdHlsZSh0LnN0eWxlLnRleHQoKSk6dCwiZXgiPT09ZS51bml0KXI9YS5mb250TWV0cmljcygpLnhIZWlnaHQ7ZWxzZXtpZigiZW0iIT09ZS51bml0KXRocm93IG5ldyBuKCJJbnZhbGlkIHVuaXQ6ICciK2UudW5pdCsiJyIpO3I9YS5mb250TWV0cmljcygpLnF1YWR9YSE9PXQmJihyKj1hLnNpemVNdWx0aXBsaWVyL3Quc2l6ZU11bHRpcGxpZXIpfXJldHVybiBNYXRoLm1pbihlLm51bWJlcipyLHQubWF4U2l6ZSl9LEY9ZnVuY3Rpb24oZSl7cmV0dXJuK2UudG9GaXhlZCg0KSsiZW0ifSxHPWZ1bmN0aW9uKGUpe3JldHVybiBlLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuIGV9KSkuam9pbigiICIpfSxVPWZ1bmN0aW9uKGUsdCxyKXtpZih0aGlzLmNsYXNzZXM9ZXx8W10sdGhpcy5hdHRyaWJ1dGVzPXt9LHRoaXMuaGVpZ2h0PTAsdGhpcy5kZXB0aD0wLHRoaXMubWF4Rm9udFNpemU9MCx0aGlzLnN0eWxlPXJ8fHt9LHQpe3Quc3R5bGUuaXNUaWdodCgpJiZ0aGlzLmNsYXNzZXMucHVzaCgibXRpZ2h0Iik7dmFyIG49dC5nZXRDb2xvcigpO24mJih0aGlzLnN0eWxlLmNvbG9yPW4pfX0sWT1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGUpO2Zvcih2YXIgciBpbiB0LmNsYXNzTmFtZT1HKHRoaXMuY2xhc3NlcyksdGhpcy5zdHlsZSl0aGlzLnN0eWxlLmhhc093blByb3BlcnR5KHIpJiYodC5zdHlsZVtyXT10aGlzLnN0eWxlW3JdKTtmb3IodmFyIG4gaW4gdGhpcy5hdHRyaWJ1dGVzKXRoaXMuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShuKSYmdC5zZXRBdHRyaWJ1dGUobix0aGlzLmF0dHJpYnV0ZXNbbl0pO2Zvcih2YXIgYT0wO2E8dGhpcy5jaGlsZHJlbi5sZW5ndGg7YSsrKXQuYXBwZW5kQ2hpbGQodGhpcy5jaGlsZHJlblthXS50b05vZGUoKSk7cmV0dXJuIHR9LFg9ZnVuY3Rpb24oZSl7dmFyIHQ9IjwiK2U7dGhpcy5jbGFzc2VzLmxlbmd0aCYmKHQrPScgY2xhc3M9IicrbC5lc2NhcGUoRyh0aGlzLmNsYXNzZXMpKSsnIicpO3ZhciByPSIiO2Zvcih2YXIgbiBpbiB0aGlzLnN0eWxlKXRoaXMuc3R5bGUuaGFzT3duUHJvcGVydHkobikmJihyKz1sLmh5cGhlbmF0ZShuKSsiOiIrdGhpcy5zdHlsZVtuXSsiOyIpO2Zvcih2YXIgYSBpbiByJiYodCs9JyBzdHlsZT0iJytsLmVzY2FwZShyKSsnIicpLHRoaXMuYXR0cmlidXRlcyl0aGlzLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYSkmJih0Kz0iICIrYSsnPSInK2wuZXNjYXBlKHRoaXMuYXR0cmlidXRlc1thXSkrJyInKTt0Kz0iPiI7Zm9yKHZhciBpPTA7aTx0aGlzLmNoaWxkcmVuLmxlbmd0aDtpKyspdCs9dGhpcy5jaGlsZHJlbltpXS50b01hcmt1cCgpO3JldHVybiB0Kz0iPC8iK2UrIj4ifSxXPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQscixuKXt0aGlzLmNoaWxkcmVuPXZvaWQgMCx0aGlzLmF0dHJpYnV0ZXM9dm9pZCAwLHRoaXMuY2xhc3Nlcz12b2lkIDAsdGhpcy5oZWlnaHQ9dm9pZCAwLHRoaXMuZGVwdGg9dm9pZCAwLHRoaXMud2lkdGg9dm9pZCAwLHRoaXMubWF4Rm9udFNpemU9dm9pZCAwLHRoaXMuc3R5bGU9dm9pZCAwLFUuY2FsbCh0aGlzLGUscixuKSx0aGlzLmNoaWxkcmVuPXR8fFtdfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnNldEF0dHJpYnV0ZT1mdW5jdGlvbihlLHQpe3RoaXMuYXR0cmlidXRlc1tlXT10fSx0Lmhhc0NsYXNzPWZ1bmN0aW9uKGUpe3JldHVybiBsLmNvbnRhaW5zKHRoaXMuY2xhc3NlcyxlKX0sdC50b05vZGU9ZnVuY3Rpb24oKXtyZXR1cm4gWS5jYWxsKHRoaXMsInNwYW4iKX0sdC50b01hcmt1cD1mdW5jdGlvbigpe3JldHVybiBYLmNhbGwodGhpcywic3BhbiIpfSxlfSgpLF89ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCxyLG4pe3RoaXMuY2hpbGRyZW49dm9pZCAwLHRoaXMuYXR0cmlidXRlcz12b2lkIDAsdGhpcy5jbGFzc2VzPXZvaWQgMCx0aGlzLmhlaWdodD12b2lkIDAsdGhpcy5kZXB0aD12b2lkIDAsdGhpcy5tYXhGb250U2l6ZT12b2lkIDAsdGhpcy5zdHlsZT12b2lkIDAsVS5jYWxsKHRoaXMsdCxuKSx0aGlzLmNoaWxkcmVuPXJ8fFtdLHRoaXMuc2V0QXR0cmlidXRlKCJocmVmIixlKX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5zZXRBdHRyaWJ1dGU9ZnVuY3Rpb24oZSx0KXt0aGlzLmF0dHJpYnV0ZXNbZV09dH0sdC5oYXNDbGFzcz1mdW5jdGlvbihlKXtyZXR1cm4gbC5jb250YWlucyh0aGlzLmNsYXNzZXMsZSl9LHQudG9Ob2RlPWZ1bmN0aW9uKCl7cmV0dXJuIFkuY2FsbCh0aGlzLCJhIil9LHQudG9NYXJrdXA9ZnVuY3Rpb24oKXtyZXR1cm4gWC5jYWxsKHRoaXMsImEiKX0sZX0oKSxqPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQscil7dGhpcy5zcmM9dm9pZCAwLHRoaXMuYWx0PXZvaWQgMCx0aGlzLmNsYXNzZXM9dm9pZCAwLHRoaXMuaGVpZ2h0PXZvaWQgMCx0aGlzLmRlcHRoPXZvaWQgMCx0aGlzLm1heEZvbnRTaXplPXZvaWQgMCx0aGlzLnN0eWxlPXZvaWQgMCx0aGlzLmFsdD10LHRoaXMuc3JjPWUsdGhpcy5jbGFzc2VzPVsibW9yZCJdLHRoaXMuc3R5bGU9cn12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5oYXNDbGFzcz1mdW5jdGlvbihlKXtyZXR1cm4gbC5jb250YWlucyh0aGlzLmNsYXNzZXMsZSl9LHQudG9Ob2RlPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaW1nIik7Zm9yKHZhciB0IGluIGUuc3JjPXRoaXMuc3JjLGUuYWx0PXRoaXMuYWx0LGUuY2xhc3NOYW1lPSJtb3JkIix0aGlzLnN0eWxlKXRoaXMuc3R5bGUuaGFzT3duUHJvcGVydHkodCkmJihlLnN0eWxlW3RdPXRoaXMuc3R5bGVbdF0pO3JldHVybiBlfSx0LnRvTWFya3VwPWZ1bmN0aW9uKCl7dmFyIGU9IjxpbWcgIHNyYz0nIit0aGlzLnNyYysiICdhbHQ9JyIrdGhpcy5hbHQrIicgIix0PSIiO2Zvcih2YXIgciBpbiB0aGlzLnN0eWxlKXRoaXMuc3R5bGUuaGFzT3duUHJvcGVydHkocikmJih0Kz1sLmh5cGhlbmF0ZShyKSsiOiIrdGhpcy5zdHlsZVtyXSsiOyIpO3JldHVybiB0JiYoZSs9JyBzdHlsZT0iJytsLmVzY2FwZSh0KSsnIicpLGUrPSInLz4ifSxlfSgpLCQ9eyJceGVlIjoiXHUwMTMxXHUwMzAyIiwiXHhlZiI6Ilx1MDEzMVx1MDMwOCIsIlx4ZWQiOiJcdTAxMzFcdTAzMDEiLCJceGVjIjoiXHUwMTMxXHUwMzAwIn0sWj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LHIsbixhLGksbyxzKXt0aGlzLnRleHQ9dm9pZCAwLHRoaXMuaGVpZ2h0PXZvaWQgMCx0aGlzLmRlcHRoPXZvaWQgMCx0aGlzLml0YWxpYz12b2lkIDAsdGhpcy5za2V3PXZvaWQgMCx0aGlzLndpZHRoPXZvaWQgMCx0aGlzLm1heEZvbnRTaXplPXZvaWQgMCx0aGlzLmNsYXNzZXM9dm9pZCAwLHRoaXMuc3R5bGU9dm9pZCAwLHRoaXMudGV4dD1lLHRoaXMuaGVpZ2h0PXR8fDAsdGhpcy5kZXB0aD1yfHwwLHRoaXMuaXRhbGljPW58fDAsdGhpcy5za2V3PWF8fDAsdGhpcy53aWR0aD1pfHwwLHRoaXMuY2xhc3Nlcz1vfHxbXSx0aGlzLnN0eWxlPXN8fHt9LHRoaXMubWF4Rm9udFNpemU9MDt2YXIgbD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PHcubGVuZ3RoO3QrKylmb3IodmFyIHI9d1t0XSxuPTA7bjxyLmJsb2Nrcy5sZW5ndGg7bisrKXt2YXIgYT1yLmJsb2Nrc1tuXTtpZihlPj1hWzBdJiZlPD1hWzFdKXJldHVybiByLm5hbWV9cmV0dXJuIG51bGx9KHRoaXMudGV4dC5jaGFyQ29kZUF0KDApKTtsJiZ0aGlzLmNsYXNzZXMucHVzaChsKyJfZmFsbGJhY2siKSwvW1x4ZWVceGVmXHhlZFx4ZWNdLy50ZXN0KHRoaXMudGV4dCkmJih0aGlzLnRleHQ9JFt0aGlzLnRleHRdKX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5oYXNDbGFzcz1mdW5jdGlvbihlKXtyZXR1cm4gbC5jb250YWlucyh0aGlzLmNsYXNzZXMsZSl9LHQudG9Ob2RlPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy50ZXh0KSx0PW51bGw7Zm9yKHZhciByIGluIHRoaXMuaXRhbGljPjAmJigodD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIikpLnN0eWxlLm1hcmdpblJpZ2h0PUYodGhpcy5pdGFsaWMpKSx0aGlzLmNsYXNzZXMubGVuZ3RoPjAmJigodD10fHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIikpLmNsYXNzTmFtZT1HKHRoaXMuY2xhc3NlcykpLHRoaXMuc3R5bGUpdGhpcy5zdHlsZS5oYXNPd25Qcm9wZXJ0eShyKSYmKCh0PXR8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNwYW4iKSkuc3R5bGVbcl09dGhpcy5zdHlsZVtyXSk7cmV0dXJuIHQ/KHQuYXBwZW5kQ2hpbGQoZSksdCk6ZX0sdC50b01hcmt1cD1mdW5jdGlvbigpe3ZhciBlPSExLHQ9IjxzcGFuIjt0aGlzLmNsYXNzZXMubGVuZ3RoJiYoZT0hMCx0Kz0nIGNsYXNzPSInLHQrPWwuZXNjYXBlKEcodGhpcy5jbGFzc2VzKSksdCs9JyInKTt2YXIgcj0iIjtmb3IodmFyIG4gaW4gdGhpcy5pdGFsaWM+MCYmKHIrPSJtYXJnaW4tcmlnaHQ6Iit0aGlzLml0YWxpYysiZW07IiksdGhpcy5zdHlsZSl0aGlzLnN0eWxlLmhhc093blByb3BlcnR5KG4pJiYocis9bC5oeXBoZW5hdGUobikrIjoiK3RoaXMuc3R5bGVbbl0rIjsiKTtyJiYoZT0hMCx0Kz0nIHN0eWxlPSInK2wuZXNjYXBlKHIpKyciJyk7dmFyIGE9bC5lc2NhcGUodGhpcy50ZXh0KTtyZXR1cm4gZT8odCs9Ij4iLHQrPWEsdCs9Ijwvc3Bhbj4iKTphfSxlfSgpLEs9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dGhpcy5jaGlsZHJlbj12b2lkIDAsdGhpcy5hdHRyaWJ1dGVzPXZvaWQgMCx0aGlzLmNoaWxkcmVuPWV8fFtdLHRoaXMuYXR0cmlidXRlcz10fHx7fX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC50b05vZGU9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwic3ZnIik7Zm9yKHZhciB0IGluIHRoaXMuYXR0cmlidXRlcylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5hdHRyaWJ1dGVzLHQpJiZlLnNldEF0dHJpYnV0ZSh0LHRoaXMuYXR0cmlidXRlc1t0XSk7Zm9yKHZhciByPTA7cjx0aGlzLmNoaWxkcmVuLmxlbmd0aDtyKyspZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW3JdLnRvTm9kZSgpKTtyZXR1cm4gZX0sdC50b01hcmt1cD1mdW5jdGlvbigpe3ZhciBlPSc8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyInO2Zvcih2YXIgdCBpbiB0aGlzLmF0dHJpYnV0ZXMpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuYXR0cmlidXRlcyx0KSYmKGUrPSIgIit0KyI9JyIrdGhpcy5hdHRyaWJ1dGVzW3RdKyInIik7ZSs9Ij4iO2Zvcih2YXIgcj0wO3I8dGhpcy5jaGlsZHJlbi5sZW5ndGg7cisrKWUrPXRoaXMuY2hpbGRyZW5bcl0udG9NYXJrdXAoKTtyZXR1cm4gZSs9Ijwvc3ZnPiJ9LGV9KCksSj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXt0aGlzLnBhdGhOYW1lPXZvaWQgMCx0aGlzLmFsdGVybmF0ZT12b2lkIDAsdGhpcy5wYXRoTmFtZT1lLHRoaXMuYWx0ZXJuYXRlPXR9dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQudG9Ob2RlPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsInBhdGgiKTtyZXR1cm4gdGhpcy5hbHRlcm5hdGU/ZS5zZXRBdHRyaWJ1dGUoImQiLHRoaXMuYWx0ZXJuYXRlKTplLnNldEF0dHJpYnV0ZSgiZCIselt0aGlzLnBhdGhOYW1lXSksZX0sdC50b01hcmt1cD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmFsdGVybmF0ZT8iPHBhdGggZD0nIit0aGlzLmFsdGVybmF0ZSsiJy8+IjoiPHBhdGggZD0nIit6W3RoaXMucGF0aE5hbWVdKyInLz4ifSxlfSgpLFE9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUpe3RoaXMuYXR0cmlidXRlcz12b2lkIDAsdGhpcy5hdHRyaWJ1dGVzPWV8fHt9fXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnRvTm9kZT1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLCJsaW5lIik7Zm9yKHZhciB0IGluIHRoaXMuYXR0cmlidXRlcylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5hdHRyaWJ1dGVzLHQpJiZlLnNldEF0dHJpYnV0ZSh0LHRoaXMuYXR0cmlidXRlc1t0XSk7cmV0dXJuIGV9LHQudG9NYXJrdXA9ZnVuY3Rpb24oKXt2YXIgZT0iPGxpbmUiO2Zvcih2YXIgdCBpbiB0aGlzLmF0dHJpYnV0ZXMpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuYXR0cmlidXRlcyx0KSYmKGUrPSIgIit0KyI9JyIrdGhpcy5hdHRyaWJ1dGVzW3RdKyInIik7cmV0dXJuIGUrPSIvPiJ9LGV9KCk7ZnVuY3Rpb24gZWUoZSl7aWYoZSBpbnN0YW5jZW9mIFopcmV0dXJuIGU7dGhyb3cgbmV3IEVycm9yKCJFeHBlY3RlZCBzeW1ib2xOb2RlIGJ1dCBnb3QgIitTdHJpbmcoZSkrIi4iKX12YXIgdGU9e2JpbjoxLGNsb3NlOjEsaW5uZXI6MSxvcGVuOjEscHVuY3Q6MSxyZWw6MX0scmU9eyJhY2NlbnQtdG9rZW4iOjEsbWF0aG9yZDoxLCJvcC10b2tlbiI6MSxzcGFjaW5nOjEsdGV4dG9yZDoxfSxuZT17bWF0aDp7fSx0ZXh0Ont9fSxhZT1uZTtmdW5jdGlvbiBpZShlLHQscixuLGEsaSl7bmVbZV1bYV09e2ZvbnQ6dCxncm91cDpyLHJlcGxhY2U6bn0saSYmbiYmKG5lW2VdW25dPW5lW2VdW2FdKX12YXIgb2U9Im1hdGgiLHNlPSJ0ZXh0IixsZT0ibWFpbiIsaGU9ImFtcyIsY2U9ImFjY2VudC10b2tlbiIsbWU9ImJpbiIsdWU9ImNsb3NlIixwZT0iaW5uZXIiLGRlPSJtYXRob3JkIixmZT0ib3AtdG9rZW4iLGdlPSJvcGVuIix2ZT0icHVuY3QiLGJlPSJyZWwiLHllPSJzcGFjaW5nIix4ZT0idGV4dG9yZCI7aWUob2UsbGUsYmUsIlx1MjI2MSIsIlxcZXF1aXYiLCEwKSxpZShvZSxsZSxiZSwiXHUyMjdhIiwiXFxwcmVjIiwhMCksaWUob2UsbGUsYmUsIlx1MjI3YiIsIlxcc3VjYyIsITApLGllKG9lLGxlLGJlLCJcdTIyM2MiLCJcXHNpbSIsITApLGllKG9lLGxlLGJlLCJcdTIyYTUiLCJcXHBlcnAiKSxpZShvZSxsZSxiZSwiXHUyYWFmIiwiXFxwcmVjZXEiLCEwKSxpZShvZSxsZSxiZSwiXHUyYWIwIiwiXFxzdWNjZXEiLCEwKSxpZShvZSxsZSxiZSwiXHUyMjQzIiwiXFxzaW1lcSIsITApLGllKG9lLGxlLGJlLCJcdTIyMjMiLCJcXG1pZCIsITApLGllKG9lLGxlLGJlLCJcdTIyNmEiLCJcXGxsIiwhMCksaWUob2UsbGUsYmUsIlx1MjI2YiIsIlxcZ2ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMjRkIiwiXFxhc3ltcCIsITApLGllKG9lLGxlLGJlLCJcdTIyMjUiLCJcXHBhcmFsbGVsIiksaWUob2UsbGUsYmUsIlx1MjJjOCIsIlxcYm93dGllIiwhMCksaWUob2UsbGUsYmUsIlx1MjMyMyIsIlxcc21pbGUiLCEwKSxpZShvZSxsZSxiZSwiXHUyMjkxIiwiXFxzcXN1YnNldGVxIiwhMCksaWUob2UsbGUsYmUsIlx1MjI5MiIsIlxcc3FzdXBzZXRlcSIsITApLGllKG9lLGxlLGJlLCJcdTIyNTAiLCJcXGRvdGVxIiwhMCksaWUob2UsbGUsYmUsIlx1MjMyMiIsIlxcZnJvd24iLCEwKSxpZShvZSxsZSxiZSwiXHUyMjBiIiwiXFxuaSIsITApLGllKG9lLGxlLGJlLCJcdTIyMWQiLCJcXHByb3B0byIsITApLGllKG9lLGxlLGJlLCJcdTIyYTIiLCJcXHZkYXNoIiwhMCksaWUob2UsbGUsYmUsIlx1MjJhMyIsIlxcZGFzaHYiLCEwKSxpZShvZSxsZSxiZSwiXHUyMjBiIiwiXFxvd25zIiksaWUob2UsbGUsdmUsIi4iLCJcXGxkb3RwIiksaWUob2UsbGUsdmUsIlx1MjJjNSIsIlxcY2RvdHAiKSxpZShvZSxsZSx4ZSwiIyIsIlxcIyIpLGllKHNlLGxlLHhlLCIjIiwiXFwjIiksaWUob2UsbGUseGUsIiYiLCJcXCYiKSxpZShzZSxsZSx4ZSwiJiIsIlxcJiIpLGllKG9lLGxlLHhlLCJcdTIxMzUiLCJcXGFsZXBoIiwhMCksaWUob2UsbGUseGUsIlx1MjIwMCIsIlxcZm9yYWxsIiwhMCksaWUob2UsbGUseGUsIlx1MjEwZiIsIlxcaGJhciIsITApLGllKG9lLGxlLHhlLCJcdTIyMDMiLCJcXGV4aXN0cyIsITApLGllKG9lLGxlLHhlLCJcdTIyMDciLCJcXG5hYmxhIiwhMCksaWUob2UsbGUseGUsIlx1MjY2ZCIsIlxcZmxhdCIsITApLGllKG9lLGxlLHhlLCJcdTIxMTMiLCJcXGVsbCIsITApLGllKG9lLGxlLHhlLCJcdTI2NmUiLCJcXG5hdHVyYWwiLCEwKSxpZShvZSxsZSx4ZSwiXHUyNjYzIiwiXFxjbHVic3VpdCIsITApLGllKG9lLGxlLHhlLCJcdTIxMTgiLCJcXHdwIiwhMCksaWUob2UsbGUseGUsIlx1MjY2ZiIsIlxcc2hhcnAiLCEwKSxpZShvZSxsZSx4ZSwiXHUyNjYyIiwiXFxkaWFtb25kc3VpdCIsITApLGllKG9lLGxlLHhlLCJcdTIxMWMiLCJcXFJlIiwhMCksaWUob2UsbGUseGUsIlx1MjY2MSIsIlxcaGVhcnRzdWl0IiwhMCksaWUob2UsbGUseGUsIlx1MjExMSIsIlxcSW0iLCEwKSxpZShvZSxsZSx4ZSwiXHUyNjYwIiwiXFxzcGFkZXN1aXQiLCEwKSxpZShvZSxsZSx4ZSwiXHhhNyIsIlxcUyIsITApLGllKHNlLGxlLHhlLCJceGE3IiwiXFxTIiksaWUob2UsbGUseGUsIlx4YjYiLCJcXFAiLCEwKSxpZShzZSxsZSx4ZSwiXHhiNiIsIlxcUCIpLGllKG9lLGxlLHhlLCJcdTIwMjAiLCJcXGRhZyIpLGllKHNlLGxlLHhlLCJcdTIwMjAiLCJcXGRhZyIpLGllKHNlLGxlLHhlLCJcdTIwMjAiLCJcXHRleHRkYWdnZXIiKSxpZShvZSxsZSx4ZSwiXHUyMDIxIiwiXFxkZGFnIiksaWUoc2UsbGUseGUsIlx1MjAyMSIsIlxcZGRhZyIpLGllKHNlLGxlLHhlLCJcdTIwMjEiLCJcXHRleHRkYWdnZXJkYmwiKSxpZShvZSxsZSx1ZSwiXHUyM2IxIiwiXFxybW91c3RhY2hlIiwhMCksaWUob2UsbGUsZ2UsIlx1MjNiMCIsIlxcbG1vdXN0YWNoZSIsITApLGllKG9lLGxlLHVlLCJcdTI3ZWYiLCJcXHJncm91cCIsITApLGllKG9lLGxlLGdlLCJcdTI3ZWUiLCJcXGxncm91cCIsITApLGllKG9lLGxlLG1lLCJcdTIyMTMiLCJcXG1wIiwhMCksaWUob2UsbGUsbWUsIlx1MjI5NiIsIlxcb21pbnVzIiwhMCksaWUob2UsbGUsbWUsIlx1MjI4ZSIsIlxcdXBsdXMiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjkzIiwiXFxzcWNhcCIsITApLGllKG9lLGxlLG1lLCJcdTIyMTciLCJcXGFzdCIpLGllKG9lLGxlLG1lLCJcdTIyOTQiLCJcXHNxY3VwIiwhMCksaWUob2UsbGUsbWUsIlx1MjVlZiIsIlxcYmlnY2lyYyIsITApLGllKG9lLGxlLG1lLCJcdTIyMTkiLCJcXGJ1bGxldCIsITApLGllKG9lLGxlLG1lLCJcdTIwMjEiLCJcXGRkYWdnZXIiKSxpZShvZSxsZSxtZSwiXHUyMjQwIiwiXFx3ciIsITApLGllKG9lLGxlLG1lLCJcdTJhM2YiLCJcXGFtYWxnIiksaWUob2UsbGUsbWUsIiYiLCJcXEFuZCIpLGllKG9lLGxlLGJlLCJcdTI3ZjUiLCJcXGxvbmdsZWZ0YXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMWQwIiwiXFxMZWZ0YXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyN2Y4IiwiXFxMb25nbGVmdGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjdmNiIsIlxcbG9uZ3JpZ2h0YXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMWQyIiwiXFxSaWdodGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjdmOSIsIlxcTG9uZ3JpZ2h0YXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMTk0IiwiXFxsZWZ0cmlnaHRhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTI3ZjciLCJcXGxvbmdsZWZ0cmlnaHRhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxZDQiLCJcXExlZnRyaWdodGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjdmYSIsIlxcTG9uZ2xlZnRyaWdodGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFhNiIsIlxcbWFwc3RvIiwhMCksaWUob2UsbGUsYmUsIlx1MjdmYyIsIlxcbG9uZ21hcHN0byIsITApLGllKG9lLGxlLGJlLCJcdTIxOTciLCJcXG5lYXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMWE5IiwiXFxob29rbGVmdGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFhYSIsIlxcaG9va3JpZ2h0YXJyb3ciLCEwKSxpZShvZSxsZSxiZSwiXHUyMTk4IiwiXFxzZWFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFiYyIsIlxcbGVmdGhhcnBvb251cCIsITApLGllKG9lLGxlLGJlLCJcdTIxYzAiLCJcXHJpZ2h0aGFycG9vbnVwIiwhMCksaWUob2UsbGUsYmUsIlx1MjE5OSIsIlxcc3dhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxYmQiLCJcXGxlZnRoYXJwb29uZG93biIsITApLGllKG9lLGxlLGJlLCJcdTIxYzEiLCJcXHJpZ2h0aGFycG9vbmRvd24iLCEwKSxpZShvZSxsZSxiZSwiXHUyMTk2IiwiXFxud2Fycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFjYyIsIlxccmlnaHRsZWZ0aGFycG9vbnMiLCEwKSxpZShvZSxoZSxiZSwiXHUyMjZlIiwiXFxubGVzcyIsITApLGllKG9lLGhlLGJlLCJcdWUwMTAiLCJcXEBubGVxc2xhbnQiKSxpZShvZSxoZSxiZSwiXHVlMDExIiwiXFxAbmxlcXEiKSxpZShvZSxoZSxiZSwiXHUyYTg3IiwiXFxsbmVxIiwhMCksaWUob2UsaGUsYmUsIlx1MjI2OCIsIlxcbG5lcXEiLCEwKSxpZShvZSxoZSxiZSwiXHVlMDBjIiwiXFxAbHZlcnRuZXFxIiksaWUob2UsaGUsYmUsIlx1MjJlNiIsIlxcbG5zaW0iLCEwKSxpZShvZSxoZSxiZSwiXHUyYTg5IiwiXFxsbmFwcHJveCIsITApLGllKG9lLGhlLGJlLCJcdTIyODAiLCJcXG5wcmVjIiwhMCksaWUob2UsaGUsYmUsIlx1MjJlMCIsIlxcbnByZWNlcSIsITApLGllKG9lLGhlLGJlLCJcdTIyZTgiLCJcXHByZWNuc2ltIiwhMCksaWUob2UsaGUsYmUsIlx1MmFiOSIsIlxccHJlY25hcHByb3giLCEwKSxpZShvZSxoZSxiZSwiXHUyMjQxIiwiXFxuc2ltIiwhMCksaWUob2UsaGUsYmUsIlx1ZTAwNiIsIlxcQG5zaG9ydG1pZCIpLGllKG9lLGhlLGJlLCJcdTIyMjQiLCJcXG5taWQiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmFjIiwiXFxudmRhc2giLCEwKSxpZShvZSxoZSxiZSwiXHUyMmFkIiwiXFxudkRhc2giLCEwKSxpZShvZSxoZSxiZSwiXHUyMmVhIiwiXFxudHJpYW5nbGVsZWZ0IiksaWUob2UsaGUsYmUsIlx1MjJlYyIsIlxcbnRyaWFuZ2xlbGVmdGVxIiwhMCksaWUob2UsaGUsYmUsIlx1MjI4YSIsIlxcc3Vic2V0bmVxIiwhMCksaWUob2UsaGUsYmUsIlx1ZTAxYSIsIlxcQHZhcnN1YnNldG5lcSIpLGllKG9lLGhlLGJlLCJcdTJhY2IiLCJcXHN1YnNldG5lcXEiLCEwKSxpZShvZSxoZSxiZSwiXHVlMDE3IiwiXFxAdmFyc3Vic2V0bmVxcSIpLGllKG9lLGhlLGJlLCJcdTIyNmYiLCJcXG5ndHIiLCEwKSxpZShvZSxoZSxiZSwiXHVlMDBmIiwiXFxAbmdlcXNsYW50IiksaWUob2UsaGUsYmUsIlx1ZTAwZSIsIlxcQG5nZXFxIiksaWUob2UsaGUsYmUsIlx1MmE4OCIsIlxcZ25lcSIsITApLGllKG9lLGhlLGJlLCJcdTIyNjkiLCJcXGduZXFxIiwhMCksaWUob2UsaGUsYmUsIlx1ZTAwZCIsIlxcQGd2ZXJ0bmVxcSIpLGllKG9lLGhlLGJlLCJcdTIyZTciLCJcXGduc2ltIiwhMCksaWUob2UsaGUsYmUsIlx1MmE4YSIsIlxcZ25hcHByb3giLCEwKSxpZShvZSxoZSxiZSwiXHUyMjgxIiwiXFxuc3VjYyIsITApLGllKG9lLGhlLGJlLCJcdTIyZTEiLCJcXG5zdWNjZXEiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmU5IiwiXFxzdWNjbnNpbSIsITApLGllKG9lLGhlLGJlLCJcdTJhYmEiLCJcXHN1Y2NuYXBwcm94IiwhMCksaWUob2UsaGUsYmUsIlx1MjI0NiIsIlxcbmNvbmciLCEwKSxpZShvZSxoZSxiZSwiXHVlMDA3IiwiXFxAbnNob3J0cGFyYWxsZWwiKSxpZShvZSxoZSxiZSwiXHUyMjI2IiwiXFxucGFyYWxsZWwiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmFmIiwiXFxuVkRhc2giLCEwKSxpZShvZSxoZSxiZSwiXHUyMmViIiwiXFxudHJpYW5nbGVyaWdodCIpLGllKG9lLGhlLGJlLCJcdTIyZWQiLCJcXG50cmlhbmdsZXJpZ2h0ZXEiLCEwKSxpZShvZSxoZSxiZSwiXHVlMDE4IiwiXFxAbnN1cHNldGVxcSIpLGllKG9lLGhlLGJlLCJcdTIyOGIiLCJcXHN1cHNldG5lcSIsITApLGllKG9lLGhlLGJlLCJcdWUwMWIiLCJcXEB2YXJzdXBzZXRuZXEiKSxpZShvZSxoZSxiZSwiXHUyYWNjIiwiXFxzdXBzZXRuZXFxIiwhMCksaWUob2UsaGUsYmUsIlx1ZTAxOSIsIlxcQHZhcnN1cHNldG5lcXEiKSxpZShvZSxoZSxiZSwiXHUyMmFlIiwiXFxuVmRhc2giLCEwKSxpZShvZSxoZSxiZSwiXHUyYWI1IiwiXFxwcmVjbmVxcSIsITApLGllKG9lLGhlLGJlLCJcdTJhYjYiLCJcXHN1Y2NuZXFxIiwhMCksaWUob2UsaGUsYmUsIlx1ZTAxNiIsIlxcQG5zdWJzZXRlcXEiKSxpZShvZSxoZSxtZSwiXHUyMmI0IiwiXFx1bmxoZCIpLGllKG9lLGhlLG1lLCJcdTIyYjUiLCJcXHVucmhkIiksaWUob2UsaGUsYmUsIlx1MjE5YSIsIlxcbmxlZnRhcnJvdyIsITApLGllKG9lLGhlLGJlLCJcdTIxOWIiLCJcXG5yaWdodGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjFjZCIsIlxcbkxlZnRhcnJvdyIsITApLGllKG9lLGhlLGJlLCJcdTIxY2YiLCJcXG5SaWdodGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjFhZSIsIlxcbmxlZnRyaWdodGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjFjZSIsIlxcbkxlZnRyaWdodGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjViMyIsIlxcdmFydHJpYW5nbGUiKSxpZShvZSxoZSx4ZSwiXHUyMTBmIiwiXFxoc2xhc2giKSxpZShvZSxoZSx4ZSwiXHUyNWJkIiwiXFx0cmlhbmdsZWRvd24iKSxpZShvZSxoZSx4ZSwiXHUyNWNhIiwiXFxsb3plbmdlIiksaWUob2UsaGUseGUsIlx1MjRjOCIsIlxcY2lyY2xlZFMiKSxpZShvZSxoZSx4ZSwiXHhhZSIsIlxcY2lyY2xlZFIiKSxpZShzZSxoZSx4ZSwiXHhhZSIsIlxcY2lyY2xlZFIiKSxpZShvZSxoZSx4ZSwiXHUyMjIxIiwiXFxtZWFzdXJlZGFuZ2xlIiwhMCksaWUob2UsaGUseGUsIlx1MjIwNCIsIlxcbmV4aXN0cyIpLGllKG9lLGhlLHhlLCJcdTIxMjciLCJcXG1obyIpLGllKG9lLGhlLHhlLCJcdTIxMzIiLCJcXEZpbnYiLCEwKSxpZShvZSxoZSx4ZSwiXHUyMTQxIiwiXFxHYW1lIiwhMCksaWUob2UsaGUseGUsIlx1MjAzNSIsIlxcYmFja3ByaW1lIiksaWUob2UsaGUseGUsIlx1MjViMiIsIlxcYmxhY2t0cmlhbmdsZSIpLGllKG9lLGhlLHhlLCJcdTI1YmMiLCJcXGJsYWNrdHJpYW5nbGVkb3duIiksaWUob2UsaGUseGUsIlx1MjVhMCIsIlxcYmxhY2tzcXVhcmUiKSxpZShvZSxoZSx4ZSwiXHUyOWViIiwiXFxibGFja2xvemVuZ2UiKSxpZShvZSxoZSx4ZSwiXHUyNjA1IiwiXFxiaWdzdGFyIiksaWUob2UsaGUseGUsIlx1MjIyMiIsIlxcc3BoZXJpY2FsYW5nbGUiLCEwKSxpZShvZSxoZSx4ZSwiXHUyMjAxIiwiXFxjb21wbGVtZW50IiwhMCksaWUob2UsaGUseGUsIlx4ZjAiLCJcXGV0aCIsITApLGllKHNlLGxlLHhlLCJceGYwIiwiXHhmMCIpLGllKG9lLGhlLHhlLCJcdTI1NzEiLCJcXGRpYWd1cCIpLGllKG9lLGhlLHhlLCJcdTI1NzIiLCJcXGRpYWdkb3duIiksaWUob2UsaGUseGUsIlx1MjVhMSIsIlxcc3F1YXJlIiksaWUob2UsaGUseGUsIlx1MjVhMSIsIlxcQm94IiksaWUob2UsaGUseGUsIlx1MjVjYSIsIlxcRGlhbW9uZCIpLGllKG9lLGhlLHhlLCJceGE1IiwiXFx5ZW4iLCEwKSxpZShzZSxoZSx4ZSwiXHhhNSIsIlxceWVuIiwhMCksaWUob2UsaGUseGUsIlx1MjcxMyIsIlxcY2hlY2ttYXJrIiwhMCksaWUoc2UsaGUseGUsIlx1MjcxMyIsIlxcY2hlY2ttYXJrIiksaWUob2UsaGUseGUsIlx1MjEzNiIsIlxcYmV0aCIsITApLGllKG9lLGhlLHhlLCJcdTIxMzgiLCJcXGRhbGV0aCIsITApLGllKG9lLGhlLHhlLCJcdTIxMzciLCJcXGdpbWVsIiwhMCksaWUob2UsaGUseGUsIlx1MDNkZCIsIlxcZGlnYW1tYSIsITApLGllKG9lLGhlLHhlLCJcdTAzZjAiLCJcXHZhcmthcHBhIiksaWUob2UsaGUsZ2UsIlx1MjUwYyIsIlxcQHVsY29ybmVyIiwhMCksaWUob2UsaGUsdWUsIlx1MjUxMCIsIlxcQHVyY29ybmVyIiwhMCksaWUob2UsaGUsZ2UsIlx1MjUxNCIsIlxcQGxsY29ybmVyIiwhMCksaWUob2UsaGUsdWUsIlx1MjUxOCIsIlxcQGxyY29ybmVyIiwhMCksaWUob2UsaGUsYmUsIlx1MjI2NiIsIlxcbGVxcSIsITApLGllKG9lLGhlLGJlLCJcdTJhN2QiLCJcXGxlcXNsYW50IiwhMCksaWUob2UsaGUsYmUsIlx1MmE5NSIsIlxcZXFzbGFudGxlc3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMjcyIiwiXFxsZXNzc2ltIiwhMCksaWUob2UsaGUsYmUsIlx1MmE4NSIsIlxcbGVzc2FwcHJveCIsITApLGllKG9lLGhlLGJlLCJcdTIyNGEiLCJcXGFwcHJveGVxIiwhMCksaWUob2UsaGUsbWUsIlx1MjJkNiIsIlxcbGVzc2RvdCIpLGllKG9lLGhlLGJlLCJcdTIyZDgiLCJcXGxsbCIsITApLGllKG9lLGhlLGJlLCJcdTIyNzYiLCJcXGxlc3NndHIiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmRhIiwiXFxsZXNzZXFndHIiLCEwKSxpZShvZSxoZSxiZSwiXHUyYThiIiwiXFxsZXNzZXFxZ3RyIiwhMCksaWUob2UsaGUsYmUsIlx1MjI1MSIsIlxcZG90ZXFkb3QiKSxpZShvZSxoZSxiZSwiXHUyMjUzIiwiXFxyaXNpbmdkb3RzZXEiLCEwKSxpZShvZSxoZSxiZSwiXHUyMjUyIiwiXFxmYWxsaW5nZG90c2VxIiwhMCksaWUob2UsaGUsYmUsIlx1MjIzZCIsIlxcYmFja3NpbSIsITApLGllKG9lLGhlLGJlLCJcdTIyY2QiLCJcXGJhY2tzaW1lcSIsITApLGllKG9lLGhlLGJlLCJcdTJhYzUiLCJcXHN1YnNldGVxcSIsITApLGllKG9lLGhlLGJlLCJcdTIyZDAiLCJcXFN1YnNldCIsITApLGllKG9lLGhlLGJlLCJcdTIyOGYiLCJcXHNxc3Vic2V0IiwhMCksaWUob2UsaGUsYmUsIlx1MjI3YyIsIlxccHJlY2N1cmx5ZXEiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmRlIiwiXFxjdXJseWVxcHJlYyIsITApLGllKG9lLGhlLGJlLCJcdTIyN2UiLCJcXHByZWNzaW0iLCEwKSxpZShvZSxoZSxiZSwiXHUyYWI3IiwiXFxwcmVjYXBwcm94IiwhMCksaWUob2UsaGUsYmUsIlx1MjJiMiIsIlxcdmFydHJpYW5nbGVsZWZ0IiksaWUob2UsaGUsYmUsIlx1MjJiNCIsIlxcdHJpYW5nbGVsZWZ0ZXEiKSxpZShvZSxoZSxiZSwiXHUyMmE4IiwiXFx2RGFzaCIsITApLGllKG9lLGhlLGJlLCJcdTIyYWEiLCJcXFZ2ZGFzaCIsITApLGllKG9lLGhlLGJlLCJcdTIzMjMiLCJcXHNtYWxsc21pbGUiKSxpZShvZSxoZSxiZSwiXHUyMzIyIiwiXFxzbWFsbGZyb3duIiksaWUob2UsaGUsYmUsIlx1MjI0ZiIsIlxcYnVtcGVxIiwhMCksaWUob2UsaGUsYmUsIlx1MjI0ZSIsIlxcQnVtcGVxIiwhMCksaWUob2UsaGUsYmUsIlx1MjI2NyIsIlxcZ2VxcSIsITApLGllKG9lLGhlLGJlLCJcdTJhN2UiLCJcXGdlcXNsYW50IiwhMCksaWUob2UsaGUsYmUsIlx1MmE5NiIsIlxcZXFzbGFudGd0ciIsITApLGllKG9lLGhlLGJlLCJcdTIyNzMiLCJcXGd0cnNpbSIsITApLGllKG9lLGhlLGJlLCJcdTJhODYiLCJcXGd0cmFwcHJveCIsITApLGllKG9lLGhlLG1lLCJcdTIyZDciLCJcXGd0cmRvdCIpLGllKG9lLGhlLGJlLCJcdTIyZDkiLCJcXGdnZyIsITApLGllKG9lLGhlLGJlLCJcdTIyNzciLCJcXGd0cmxlc3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmRiIiwiXFxndHJlcWxlc3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyYThjIiwiXFxndHJlcXFsZXNzIiwhMCksaWUob2UsaGUsYmUsIlx1MjI1NiIsIlxcZXFjaXJjIiwhMCksaWUob2UsaGUsYmUsIlx1MjI1NyIsIlxcY2lyY2VxIiwhMCksaWUob2UsaGUsYmUsIlx1MjI1YyIsIlxcdHJpYW5nbGVxIiwhMCksaWUob2UsaGUsYmUsIlx1MjIzYyIsIlxcdGhpY2tzaW0iKSxpZShvZSxoZSxiZSwiXHUyMjQ4IiwiXFx0aGlja2FwcHJveCIpLGllKG9lLGhlLGJlLCJcdTJhYzYiLCJcXHN1cHNldGVxcSIsITApLGllKG9lLGhlLGJlLCJcdTIyZDEiLCJcXFN1cHNldCIsITApLGllKG9lLGhlLGJlLCJcdTIyOTAiLCJcXHNxc3Vwc2V0IiwhMCksaWUob2UsaGUsYmUsIlx1MjI3ZCIsIlxcc3VjY2N1cmx5ZXEiLCEwKSxpZShvZSxoZSxiZSwiXHUyMmRmIiwiXFxjdXJseWVxc3VjYyIsITApLGllKG9lLGhlLGJlLCJcdTIyN2YiLCJcXHN1Y2NzaW0iLCEwKSxpZShvZSxoZSxiZSwiXHUyYWI4IiwiXFxzdWNjYXBwcm94IiwhMCksaWUob2UsaGUsYmUsIlx1MjJiMyIsIlxcdmFydHJpYW5nbGVyaWdodCIpLGllKG9lLGhlLGJlLCJcdTIyYjUiLCJcXHRyaWFuZ2xlcmlnaHRlcSIpLGllKG9lLGhlLGJlLCJcdTIyYTkiLCJcXFZkYXNoIiwhMCksaWUob2UsaGUsYmUsIlx1MjIyMyIsIlxcc2hvcnRtaWQiKSxpZShvZSxoZSxiZSwiXHUyMjI1IiwiXFxzaG9ydHBhcmFsbGVsIiksaWUob2UsaGUsYmUsIlx1MjI2YyIsIlxcYmV0d2VlbiIsITApLGllKG9lLGhlLGJlLCJcdTIyZDQiLCJcXHBpdGNoZm9yayIsITApLGllKG9lLGhlLGJlLCJcdTIyMWQiLCJcXHZhcnByb3B0byIpLGllKG9lLGhlLGJlLCJcdTI1YzAiLCJcXGJsYWNrdHJpYW5nbGVsZWZ0IiksaWUob2UsaGUsYmUsIlx1MjIzNCIsIlxcdGhlcmVmb3JlIiwhMCksaWUob2UsaGUsYmUsIlx1MjIwZCIsIlxcYmFja2Vwc2lsb24iKSxpZShvZSxoZSxiZSwiXHUyNWI2IiwiXFxibGFja3RyaWFuZ2xlcmlnaHQiKSxpZShvZSxoZSxiZSwiXHUyMjM1IiwiXFxiZWNhdXNlIiwhMCksaWUob2UsaGUsYmUsIlx1MjJkOCIsIlxcbGxsZXNzIiksaWUob2UsaGUsYmUsIlx1MjJkOSIsIlxcZ2dndHIiKSxpZShvZSxoZSxtZSwiXHUyMmIyIiwiXFxsaGQiKSxpZShvZSxoZSxtZSwiXHUyMmIzIiwiXFxyaGQiKSxpZShvZSxoZSxiZSwiXHUyMjQyIiwiXFxlcXNpbSIsITApLGllKG9lLGxlLGJlLCJcdTIyYzgiLCJcXEpvaW4iKSxpZShvZSxoZSxiZSwiXHUyMjUxIiwiXFxEb3RlcSIsITApLGllKG9lLGhlLG1lLCJcdTIyMTQiLCJcXGRvdHBsdXMiLCEwKSxpZShvZSxoZSxtZSwiXHUyMjE2IiwiXFxzbWFsbHNldG1pbnVzIiksaWUob2UsaGUsbWUsIlx1MjJkMiIsIlxcQ2FwIiwhMCksaWUob2UsaGUsbWUsIlx1MjJkMyIsIlxcQ3VwIiwhMCksaWUob2UsaGUsbWUsIlx1MmE1ZSIsIlxcZG91YmxlYmFyd2VkZ2UiLCEwKSxpZShvZSxoZSxtZSwiXHUyMjlmIiwiXFxib3htaW51cyIsITApLGllKG9lLGhlLG1lLCJcdTIyOWUiLCJcXGJveHBsdXMiLCEwKSxpZShvZSxoZSxtZSwiXHUyMmM3IiwiXFxkaXZpZGVvbnRpbWVzIiwhMCksaWUob2UsaGUsbWUsIlx1MjJjOSIsIlxcbHRpbWVzIiwhMCksaWUob2UsaGUsbWUsIlx1MjJjYSIsIlxccnRpbWVzIiwhMCksaWUob2UsaGUsbWUsIlx1MjJjYiIsIlxcbGVmdHRocmVldGltZXMiLCEwKSxpZShvZSxoZSxtZSwiXHUyMmNjIiwiXFxyaWdodHRocmVldGltZXMiLCEwKSxpZShvZSxoZSxtZSwiXHUyMmNmIiwiXFxjdXJseXdlZGdlIiwhMCksaWUob2UsaGUsbWUsIlx1MjJjZSIsIlxcY3VybHl2ZWUiLCEwKSxpZShvZSxoZSxtZSwiXHUyMjlkIiwiXFxjaXJjbGVkZGFzaCIsITApLGllKG9lLGhlLG1lLCJcdTIyOWIiLCJcXGNpcmNsZWRhc3QiLCEwKSxpZShvZSxoZSxtZSwiXHUyMmM1IiwiXFxjZW50ZXJkb3QiKSxpZShvZSxoZSxtZSwiXHUyMmJhIiwiXFxpbnRlcmNhbCIsITApLGllKG9lLGhlLG1lLCJcdTIyZDIiLCJcXGRvdWJsZWNhcCIpLGllKG9lLGhlLG1lLCJcdTIyZDMiLCJcXGRvdWJsZWN1cCIpLGllKG9lLGhlLG1lLCJcdTIyYTAiLCJcXGJveHRpbWVzIiwhMCksaWUob2UsaGUsYmUsIlx1MjFlMiIsIlxcZGFzaHJpZ2h0YXJyb3ciLCEwKSxpZShvZSxoZSxiZSwiXHUyMWUwIiwiXFxkYXNobGVmdGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjFjNyIsIlxcbGVmdGxlZnRhcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWM2IiwiXFxsZWZ0cmlnaHRhcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWRhIiwiXFxMbGVmdGFycm93IiwhMCksaWUob2UsaGUsYmUsIlx1MjE5ZSIsIlxcdHdvaGVhZGxlZnRhcnJvdyIsITApLGllKG9lLGhlLGJlLCJcdTIxYTIiLCJcXGxlZnRhcnJvd3RhaWwiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWFiIiwiXFxsb29wYXJyb3dsZWZ0IiwhMCksaWUob2UsaGUsYmUsIlx1MjFjYiIsIlxcbGVmdHJpZ2h0aGFycG9vbnMiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWI2IiwiXFxjdXJ2ZWFycm93bGVmdCIsITApLGllKG9lLGhlLGJlLCJcdTIxYmEiLCJcXGNpcmNsZWFycm93bGVmdCIsITApLGllKG9lLGhlLGJlLCJcdTIxYjAiLCJcXExzaCIsITApLGllKG9lLGhlLGJlLCJcdTIxYzgiLCJcXHVwdXBhcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWJmIiwiXFx1cGhhcnBvb25sZWZ0IiwhMCksaWUob2UsaGUsYmUsIlx1MjFjMyIsIlxcZG93bmhhcnBvb25sZWZ0IiwhMCksaWUob2UsbGUsYmUsIlx1MjJiNiIsIlxcb3JpZ29mIiwhMCksaWUob2UsbGUsYmUsIlx1MjJiNyIsIlxcaW1hZ2VvZiIsITApLGllKG9lLGhlLGJlLCJcdTIyYjgiLCJcXG11bHRpbWFwIiwhMCksaWUob2UsaGUsYmUsIlx1MjFhZCIsIlxcbGVmdHJpZ2h0c3F1aWdhcnJvdyIsITApLGllKG9lLGhlLGJlLCJcdTIxYzkiLCJcXHJpZ2h0cmlnaHRhcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWM0IiwiXFxyaWdodGxlZnRhcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWEwIiwiXFx0d29oZWFkcmlnaHRhcnJvdyIsITApLGllKG9lLGhlLGJlLCJcdTIxYTMiLCJcXHJpZ2h0YXJyb3d0YWlsIiwhMCksaWUob2UsaGUsYmUsIlx1MjFhYyIsIlxcbG9vcGFycm93cmlnaHQiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWI3IiwiXFxjdXJ2ZWFycm93cmlnaHQiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWJiIiwiXFxjaXJjbGVhcnJvd3JpZ2h0IiwhMCksaWUob2UsaGUsYmUsIlx1MjFiMSIsIlxcUnNoIiwhMCksaWUob2UsaGUsYmUsIlx1MjFjYSIsIlxcZG93bmRvd25hcnJvd3MiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWJlIiwiXFx1cGhhcnBvb25yaWdodCIsITApLGllKG9lLGhlLGJlLCJcdTIxYzIiLCJcXGRvd25oYXJwb29ucmlnaHQiLCEwKSxpZShvZSxoZSxiZSwiXHUyMWRkIiwiXFxyaWdodHNxdWlnYXJyb3ciLCEwKSxpZShvZSxoZSxiZSwiXHUyMWRkIiwiXFxsZWFkc3RvIiksaWUob2UsaGUsYmUsIlx1MjFkYiIsIlxcUnJpZ2h0YXJyb3ciLCEwKSxpZShvZSxoZSxiZSwiXHUyMWJlIiwiXFxyZXN0cmljdGlvbiIpLGllKG9lLGxlLHhlLCJcdTIwMTgiLCJgIiksaWUob2UsbGUseGUsIiQiLCJcXCQiKSxpZShzZSxsZSx4ZSwiJCIsIlxcJCIpLGllKHNlLGxlLHhlLCIkIiwiXFx0ZXh0ZG9sbGFyIiksaWUob2UsbGUseGUsIiUiLCJcXCUiKSxpZShzZSxsZSx4ZSwiJSIsIlxcJSIpLGllKG9lLGxlLHhlLCJfIiwiXFxfIiksaWUoc2UsbGUseGUsIl8iLCJcXF8iKSxpZShzZSxsZSx4ZSwiXyIsIlxcdGV4dHVuZGVyc2NvcmUiKSxpZShvZSxsZSx4ZSwiXHUyMjIwIiwiXFxhbmdsZSIsITApLGllKG9lLGxlLHhlLCJcdTIyMWUiLCJcXGluZnR5IiwhMCksaWUob2UsbGUseGUsIlx1MjAzMiIsIlxccHJpbWUiKSxpZShvZSxsZSx4ZSwiXHUyNWIzIiwiXFx0cmlhbmdsZSIpLGllKG9lLGxlLHhlLCJcdTAzOTMiLCJcXEdhbW1hIiwhMCksaWUob2UsbGUseGUsIlx1MDM5NCIsIlxcRGVsdGEiLCEwKSxpZShvZSxsZSx4ZSwiXHUwMzk4IiwiXFxUaGV0YSIsITApLGllKG9lLGxlLHhlLCJcdTAzOWIiLCJcXExhbWJkYSIsITApLGllKG9lLGxlLHhlLCJcdTAzOWUiLCJcXFhpIiwhMCksaWUob2UsbGUseGUsIlx1MDNhMCIsIlxcUGkiLCEwKSxpZShvZSxsZSx4ZSwiXHUwM2EzIiwiXFxTaWdtYSIsITApLGllKG9lLGxlLHhlLCJcdTAzYTUiLCJcXFVwc2lsb24iLCEwKSxpZShvZSxsZSx4ZSwiXHUwM2E2IiwiXFxQaGkiLCEwKSxpZShvZSxsZSx4ZSwiXHUwM2E4IiwiXFxQc2kiLCEwKSxpZShvZSxsZSx4ZSwiXHUwM2E5IiwiXFxPbWVnYSIsITApLGllKG9lLGxlLHhlLCJBIiwiXHUwMzkxIiksaWUob2UsbGUseGUsIkIiLCJcdTAzOTIiKSxpZShvZSxsZSx4ZSwiRSIsIlx1MDM5NSIpLGllKG9lLGxlLHhlLCJaIiwiXHUwMzk2IiksaWUob2UsbGUseGUsIkgiLCJcdTAzOTciKSxpZShvZSxsZSx4ZSwiSSIsIlx1MDM5OSIpLGllKG9lLGxlLHhlLCJLIiwiXHUwMzlhIiksaWUob2UsbGUseGUsIk0iLCJcdTAzOWMiKSxpZShvZSxsZSx4ZSwiTiIsIlx1MDM5ZCIpLGllKG9lLGxlLHhlLCJPIiwiXHUwMzlmIiksaWUob2UsbGUseGUsIlAiLCJcdTAzYTEiKSxpZShvZSxsZSx4ZSwiVCIsIlx1MDNhNCIpLGllKG9lLGxlLHhlLCJYIiwiXHUwM2E3IiksaWUob2UsbGUseGUsIlx4YWMiLCJcXG5lZyIsITApLGllKG9lLGxlLHhlLCJceGFjIiwiXFxsbm90IiksaWUob2UsbGUseGUsIlx1MjJhNCIsIlxcdG9wIiksaWUob2UsbGUseGUsIlx1MjJhNSIsIlxcYm90IiksaWUob2UsbGUseGUsIlx1MjIwNSIsIlxcZW1wdHlzZXQiKSxpZShvZSxoZSx4ZSwiXHUyMjA1IiwiXFx2YXJub3RoaW5nIiksaWUob2UsbGUsZGUsIlx1MDNiMSIsIlxcYWxwaGEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2IyIiwiXFxiZXRhIiwhMCksaWUob2UsbGUsZGUsIlx1MDNiMyIsIlxcZ2FtbWEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2I0IiwiXFxkZWx0YSIsITApLGllKG9lLGxlLGRlLCJcdTAzZjUiLCJcXGVwc2lsb24iLCEwKSxpZShvZSxsZSxkZSwiXHUwM2I2IiwiXFx6ZXRhIiwhMCksaWUob2UsbGUsZGUsIlx1MDNiNyIsIlxcZXRhIiwhMCksaWUob2UsbGUsZGUsIlx1MDNiOCIsIlxcdGhldGEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2I5IiwiXFxpb3RhIiwhMCksaWUob2UsbGUsZGUsIlx1MDNiYSIsIlxca2FwcGEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2JiIiwiXFxsYW1iZGEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2JjIiwiXFxtdSIsITApLGllKG9lLGxlLGRlLCJcdTAzYmQiLCJcXG51IiwhMCksaWUob2UsbGUsZGUsIlx1MDNiZSIsIlxceGkiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2JmIiwiXFxvbWljcm9uIiwhMCksaWUob2UsbGUsZGUsIlx1MDNjMCIsIlxccGkiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2MxIiwiXFxyaG8iLCEwKSxpZShvZSxsZSxkZSwiXHUwM2MzIiwiXFxzaWdtYSIsITApLGllKG9lLGxlLGRlLCJcdTAzYzQiLCJcXHRhdSIsITApLGllKG9lLGxlLGRlLCJcdTAzYzUiLCJcXHVwc2lsb24iLCEwKSxpZShvZSxsZSxkZSwiXHUwM2Q1IiwiXFxwaGkiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2M3IiwiXFxjaGkiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2M4IiwiXFxwc2kiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2M5IiwiXFxvbWVnYSIsITApLGllKG9lLGxlLGRlLCJcdTAzYjUiLCJcXHZhcmVwc2lsb24iLCEwKSxpZShvZSxsZSxkZSwiXHUwM2QxIiwiXFx2YXJ0aGV0YSIsITApLGllKG9lLGxlLGRlLCJcdTAzZDYiLCJcXHZhcnBpIiwhMCksaWUob2UsbGUsZGUsIlx1MDNmMSIsIlxcdmFycmhvIiwhMCksaWUob2UsbGUsZGUsIlx1MDNjMiIsIlxcdmFyc2lnbWEiLCEwKSxpZShvZSxsZSxkZSwiXHUwM2M2IiwiXFx2YXJwaGkiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjE3IiwiKiIsITApLGllKG9lLGxlLG1lLCIrIiwiKyIpLGllKG9lLGxlLG1lLCJcdTIyMTIiLCItIiwhMCksaWUob2UsbGUsbWUsIlx1MjJjNSIsIlxcY2RvdCIsITApLGllKG9lLGxlLG1lLCJcdTIyMTgiLCJcXGNpcmMiLCEwKSxpZShvZSxsZSxtZSwiXHhmNyIsIlxcZGl2IiwhMCksaWUob2UsbGUsbWUsIlx4YjEiLCJcXHBtIiwhMCksaWUob2UsbGUsbWUsIlx4ZDciLCJcXHRpbWVzIiwhMCksaWUob2UsbGUsbWUsIlx1MjIyOSIsIlxcY2FwIiwhMCksaWUob2UsbGUsbWUsIlx1MjIyYSIsIlxcY3VwIiwhMCksaWUob2UsbGUsbWUsIlx1MjIxNiIsIlxcc2V0bWludXMiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjI3IiwiXFxsYW5kIiksaWUob2UsbGUsbWUsIlx1MjIyOCIsIlxcbG9yIiksaWUob2UsbGUsbWUsIlx1MjIyNyIsIlxcd2VkZ2UiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjI4IiwiXFx2ZWUiLCEwKSxpZShvZSxsZSx4ZSwiXHUyMjFhIiwiXFxzdXJkIiksaWUob2UsbGUsZ2UsIlx1MjdlOCIsIlxcbGFuZ2xlIiwhMCksaWUob2UsbGUsZ2UsIlx1MjIyMyIsIlxcbHZlcnQiKSxpZShvZSxsZSxnZSwiXHUyMjI1IiwiXFxsVmVydCIpLGllKG9lLGxlLHVlLCI/IiwiPyIpLGllKG9lLGxlLHVlLCIhIiwiISIpLGllKG9lLGxlLHVlLCJcdTI3ZTkiLCJcXHJhbmdsZSIsITApLGllKG9lLGxlLHVlLCJcdTIyMjMiLCJcXHJ2ZXJ0IiksaWUob2UsbGUsdWUsIlx1MjIyNSIsIlxcclZlcnQiKSxpZShvZSxsZSxiZSwiPSIsIj0iKSxpZShvZSxsZSxiZSwiOiIsIjoiKSxpZShvZSxsZSxiZSwiXHUyMjQ4IiwiXFxhcHByb3giLCEwKSxpZShvZSxsZSxiZSwiXHUyMjQ1IiwiXFxjb25nIiwhMCksaWUob2UsbGUsYmUsIlx1MjI2NSIsIlxcZ2UiKSxpZShvZSxsZSxiZSwiXHUyMjY1IiwiXFxnZXEiLCEwKSxpZShvZSxsZSxiZSwiXHUyMTkwIiwiXFxnZXRzIiksaWUob2UsbGUsYmUsIj4iLCJcXGd0IiwhMCksaWUob2UsbGUsYmUsIlx1MjIwOCIsIlxcaW4iLCEwKSxpZShvZSxsZSxiZSwiXHVlMDIwIiwiXFxAbm90IiksaWUob2UsbGUsYmUsIlx1MjI4MiIsIlxcc3Vic2V0IiwhMCksaWUob2UsbGUsYmUsIlx1MjI4MyIsIlxcc3Vwc2V0IiwhMCksaWUob2UsbGUsYmUsIlx1MjI4NiIsIlxcc3Vic2V0ZXEiLCEwKSxpZShvZSxsZSxiZSwiXHUyMjg3IiwiXFxzdXBzZXRlcSIsITApLGllKG9lLGhlLGJlLCJcdTIyODgiLCJcXG5zdWJzZXRlcSIsITApLGllKG9lLGhlLGJlLCJcdTIyODkiLCJcXG5zdXBzZXRlcSIsITApLGllKG9lLGxlLGJlLCJcdTIyYTgiLCJcXG1vZGVscyIpLGllKG9lLGxlLGJlLCJcdTIxOTAiLCJcXGxlZnRhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIyNjQiLCJcXGxlIiksaWUob2UsbGUsYmUsIlx1MjI2NCIsIlxcbGVxIiwhMCksaWUob2UsbGUsYmUsIjwiLCJcXGx0IiwhMCksaWUob2UsbGUsYmUsIlx1MjE5MiIsIlxccmlnaHRhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxOTIiLCJcXHRvIiksaWUob2UsaGUsYmUsIlx1MjI3MSIsIlxcbmdlcSIsITApLGllKG9lLGhlLGJlLCJcdTIyNzAiLCJcXG5sZXEiLCEwKSxpZShvZSxsZSx5ZSwiXHhhMCIsIlxcICIpLGllKG9lLGxlLHllLCJceGEwIiwiXFxzcGFjZSIpLGllKG9lLGxlLHllLCJceGEwIiwiXFxub2JyZWFrc3BhY2UiKSxpZShzZSxsZSx5ZSwiXHhhMCIsIlxcICIpLGllKHNlLGxlLHllLCJceGEwIiwiICIpLGllKHNlLGxlLHllLCJceGEwIiwiXFxzcGFjZSIpLGllKHNlLGxlLHllLCJceGEwIiwiXFxub2JyZWFrc3BhY2UiKSxpZShvZSxsZSx5ZSxudWxsLCJcXG5vYnJlYWsiKSxpZShvZSxsZSx5ZSxudWxsLCJcXGFsbG93YnJlYWsiKSxpZShvZSxsZSx2ZSwiLCIsIiwiKSxpZShvZSxsZSx2ZSwiOyIsIjsiKSxpZShvZSxoZSxtZSwiXHUyMmJjIiwiXFxiYXJ3ZWRnZSIsITApLGllKG9lLGhlLG1lLCJcdTIyYmIiLCJcXHZlZWJhciIsITApLGllKG9lLGxlLG1lLCJcdTIyOTkiLCJcXG9kb3QiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjk1IiwiXFxvcGx1cyIsITApLGllKG9lLGxlLG1lLCJcdTIyOTciLCJcXG90aW1lcyIsITApLGllKG9lLGxlLHhlLCJcdTIyMDIiLCJcXHBhcnRpYWwiLCEwKSxpZShvZSxsZSxtZSwiXHUyMjk4IiwiXFxvc2xhc2giLCEwKSxpZShvZSxoZSxtZSwiXHUyMjlhIiwiXFxjaXJjbGVkY2lyYyIsITApLGllKG9lLGhlLG1lLCJcdTIyYTEiLCJcXGJveGRvdCIsITApLGllKG9lLGxlLG1lLCJcdTI1YjMiLCJcXGJpZ3RyaWFuZ2xldXAiKSxpZShvZSxsZSxtZSwiXHUyNWJkIiwiXFxiaWd0cmlhbmdsZWRvd24iKSxpZShvZSxsZSxtZSwiXHUyMDIwIiwiXFxkYWdnZXIiKSxpZShvZSxsZSxtZSwiXHUyMmM0IiwiXFxkaWFtb25kIiksaWUob2UsbGUsbWUsIlx1MjJjNiIsIlxcc3RhciIpLGllKG9lLGxlLG1lLCJcdTI1YzMiLCJcXHRyaWFuZ2xlbGVmdCIpLGllKG9lLGxlLG1lLCJcdTI1YjkiLCJcXHRyaWFuZ2xlcmlnaHQiKSxpZShvZSxsZSxnZSwieyIsIlxceyIpLGllKHNlLGxlLHhlLCJ7IiwiXFx7IiksaWUoc2UsbGUseGUsInsiLCJcXHRleHRicmFjZWxlZnQiKSxpZShvZSxsZSx1ZSwifSIsIlxcfSIpLGllKHNlLGxlLHhlLCJ9IiwiXFx9IiksaWUoc2UsbGUseGUsIn0iLCJcXHRleHRicmFjZXJpZ2h0IiksaWUob2UsbGUsZ2UsInsiLCJcXGxicmFjZSIpLGllKG9lLGxlLHVlLCJ9IiwiXFxyYnJhY2UiKSxpZShvZSxsZSxnZSwiWyIsIlxcbGJyYWNrIiwhMCksaWUoc2UsbGUseGUsIlsiLCJcXGxicmFjayIsITApLGllKG9lLGxlLHVlLCJdIiwiXFxyYnJhY2siLCEwKSxpZShzZSxsZSx4ZSwiXSIsIlxccmJyYWNrIiwhMCksaWUob2UsbGUsZ2UsIigiLCJcXGxwYXJlbiIsITApLGllKG9lLGxlLHVlLCIpIiwiXFxycGFyZW4iLCEwKSxpZShzZSxsZSx4ZSwiPCIsIlxcdGV4dGxlc3MiLCEwKSxpZShzZSxsZSx4ZSwiPiIsIlxcdGV4dGdyZWF0ZXIiLCEwKSxpZShvZSxsZSxnZSwiXHUyMzBhIiwiXFxsZmxvb3IiLCEwKSxpZShvZSxsZSx1ZSwiXHUyMzBiIiwiXFxyZmxvb3IiLCEwKSxpZShvZSxsZSxnZSwiXHUyMzA4IiwiXFxsY2VpbCIsITApLGllKG9lLGxlLHVlLCJcdTIzMDkiLCJcXHJjZWlsIiwhMCksaWUob2UsbGUseGUsIlxcIiwiXFxiYWNrc2xhc2giKSxpZShvZSxsZSx4ZSwiXHUyMjIzIiwifCIpLGllKG9lLGxlLHhlLCJcdTIyMjMiLCJcXHZlcnQiKSxpZShzZSxsZSx4ZSwifCIsIlxcdGV4dGJhciIsITApLGllKG9lLGxlLHhlLCJcdTIyMjUiLCJcXHwiKSxpZShvZSxsZSx4ZSwiXHUyMjI1IiwiXFxWZXJ0IiksaWUoc2UsbGUseGUsIlx1MjIyNSIsIlxcdGV4dGJhcmRibCIpLGllKHNlLGxlLHhlLCJ+IiwiXFx0ZXh0YXNjaWl0aWxkZSIpLGllKHNlLGxlLHhlLCJcXCIsIlxcdGV4dGJhY2tzbGFzaCIpLGllKHNlLGxlLHhlLCJeIiwiXFx0ZXh0YXNjaWljaXJjdW0iKSxpZShvZSxsZSxiZSwiXHUyMTkxIiwiXFx1cGFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFkMSIsIlxcVXBhcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxOTMiLCJcXGRvd25hcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxZDMiLCJcXERvd25hcnJvdyIsITApLGllKG9lLGxlLGJlLCJcdTIxOTUiLCJcXHVwZG93bmFycm93IiwhMCksaWUob2UsbGUsYmUsIlx1MjFkNSIsIlxcVXBkb3duYXJyb3ciLCEwKSxpZShvZSxsZSxmZSwiXHUyMjEwIiwiXFxjb3Byb2QiKSxpZShvZSxsZSxmZSwiXHUyMmMxIiwiXFxiaWd2ZWUiKSxpZShvZSxsZSxmZSwiXHUyMmMwIiwiXFxiaWd3ZWRnZSIpLGllKG9lLGxlLGZlLCJcdTJhMDQiLCJcXGJpZ3VwbHVzIiksaWUob2UsbGUsZmUsIlx1MjJjMiIsIlxcYmlnY2FwIiksaWUob2UsbGUsZmUsIlx1MjJjMyIsIlxcYmlnY3VwIiksaWUob2UsbGUsZmUsIlx1MjIyYiIsIlxcaW50IiksaWUob2UsbGUsZmUsIlx1MjIyYiIsIlxcaW50b3AiKSxpZShvZSxsZSxmZSwiXHUyMjJjIiwiXFxpaW50IiksaWUob2UsbGUsZmUsIlx1MjIyZCIsIlxcaWlpbnQiKSxpZShvZSxsZSxmZSwiXHUyMjBmIiwiXFxwcm9kIiksaWUob2UsbGUsZmUsIlx1MjIxMSIsIlxcc3VtIiksaWUob2UsbGUsZmUsIlx1MmEwMiIsIlxcYmlnb3RpbWVzIiksaWUob2UsbGUsZmUsIlx1MmEwMSIsIlxcYmlnb3BsdXMiKSxpZShvZSxsZSxmZSwiXHUyYTAwIiwiXFxiaWdvZG90IiksaWUob2UsbGUsZmUsIlx1MjIyZSIsIlxcb2ludCIpLGllKG9lLGxlLGZlLCJcdTIyMmYiLCJcXG9paW50IiksaWUob2UsbGUsZmUsIlx1MjIzMCIsIlxcb2lpaW50IiksaWUob2UsbGUsZmUsIlx1MmEwNiIsIlxcYmlnc3FjdXAiKSxpZShvZSxsZSxmZSwiXHUyMjJiIiwiXFxzbWFsbGludCIpLGllKHNlLGxlLHBlLCJcdTIwMjYiLCJcXHRleHRlbGxpcHNpcyIpLGllKG9lLGxlLHBlLCJcdTIwMjYiLCJcXG1hdGhlbGxpcHNpcyIpLGllKHNlLGxlLHBlLCJcdTIwMjYiLCJcXGxkb3RzIiwhMCksaWUob2UsbGUscGUsIlx1MjAyNiIsIlxcbGRvdHMiLCEwKSxpZShvZSxsZSxwZSwiXHUyMmVmIiwiXFxAY2RvdHMiLCEwKSxpZShvZSxsZSxwZSwiXHUyMmYxIiwiXFxkZG90cyIsITApLGllKG9lLGxlLHhlLCJcdTIyZWUiLCJcXHZhcnZkb3RzIiksaWUob2UsbGUsY2UsIlx1MDJjYSIsIlxcYWN1dGUiKSxpZShvZSxsZSxjZSwiXHUwMmNiIiwiXFxncmF2ZSIpLGllKG9lLGxlLGNlLCJceGE4IiwiXFxkZG90IiksaWUob2UsbGUsY2UsIn4iLCJcXHRpbGRlIiksaWUob2UsbGUsY2UsIlx1MDJjOSIsIlxcYmFyIiksaWUob2UsbGUsY2UsIlx1MDJkOCIsIlxcYnJldmUiKSxpZShvZSxsZSxjZSwiXHUwMmM3IiwiXFxjaGVjayIpLGllKG9lLGxlLGNlLCJeIiwiXFxoYXQiKSxpZShvZSxsZSxjZSwiXHUyMGQ3IiwiXFx2ZWMiKSxpZShvZSxsZSxjZSwiXHUwMmQ5IiwiXFxkb3QiKSxpZShvZSxsZSxjZSwiXHUwMmRhIiwiXFxtYXRocmluZyIpLGllKG9lLGxlLGRlLCJcdWUxMzEiLCJcXEBpbWF0aCIpLGllKG9lLGxlLGRlLCJcdWUyMzciLCJcXEBqbWF0aCIpLGllKG9lLGxlLHhlLCJcdTAxMzEiLCJcdTAxMzEiKSxpZShvZSxsZSx4ZSwiXHUwMjM3IiwiXHUwMjM3IiksaWUoc2UsbGUseGUsIlx1MDEzMSIsIlxcaSIsITApLGllKHNlLGxlLHhlLCJcdTAyMzciLCJcXGoiLCEwKSxpZShzZSxsZSx4ZSwiXHhkZiIsIlxcc3MiLCEwKSxpZShzZSxsZSx4ZSwiXHhlNiIsIlxcYWUiLCEwKSxpZShzZSxsZSx4ZSwiXHUwMTUzIiwiXFxvZSIsITApLGllKHNlLGxlLHhlLCJceGY4IiwiXFxvIiwhMCksaWUoc2UsbGUseGUsIlx4YzYiLCJcXEFFIiwhMCksaWUoc2UsbGUseGUsIlx1MDE1MiIsIlxcT0UiLCEwKSxpZShzZSxsZSx4ZSwiXHhkOCIsIlxcTyIsITApLGllKHNlLGxlLGNlLCJcdTAyY2EiLCJcXCciKSxpZShzZSxsZSxjZSwiXHUwMmNiIiwiXFxgIiksaWUoc2UsbGUsY2UsIlx1MDJjNiIsIlxcXiIpLGllKHNlLGxlLGNlLCJcdTAyZGMiLCJcXH4iKSxpZShzZSxsZSxjZSwiXHUwMmM5IiwiXFw9IiksaWUoc2UsbGUsY2UsIlx1MDJkOCIsIlxcdSIpLGllKHNlLGxlLGNlLCJcdTAyZDkiLCJcXC4iKSxpZShzZSxsZSxjZSwiXHhiOCIsIlxcYyIpLGllKHNlLGxlLGNlLCJcdTAyZGEiLCJcXHIiKSxpZShzZSxsZSxjZSwiXHUwMmM3IiwiXFx2IiksaWUoc2UsbGUsY2UsIlx4YTgiLCdcXCInKSxpZShzZSxsZSxjZSwiXHUwMmRkIiwiXFxIIiksaWUoc2UsbGUsY2UsIlx1MjVlZiIsIlxcdGV4dGNpcmNsZWQiKTt2YXIgd2U9eyItLSI6ITAsIi0tLSI6ITAsImBgIjohMCwiJyciOiEwfTtpZShzZSxsZSx4ZSwiXHUyMDEzIiwiLS0iLCEwKSxpZShzZSxsZSx4ZSwiXHUyMDEzIiwiXFx0ZXh0ZW5kYXNoIiksaWUoc2UsbGUseGUsIlx1MjAxNCIsIi0tLSIsITApLGllKHNlLGxlLHhlLCJcdTIwMTQiLCJcXHRleHRlbWRhc2giKSxpZShzZSxsZSx4ZSwiXHUyMDE4IiwiYCIsITApLGllKHNlLGxlLHhlLCJcdTIwMTgiLCJcXHRleHRxdW90ZWxlZnQiKSxpZShzZSxsZSx4ZSwiXHUyMDE5IiwiJyIsITApLGllKHNlLGxlLHhlLCJcdTIwMTkiLCJcXHRleHRxdW90ZXJpZ2h0IiksaWUoc2UsbGUseGUsIlx1MjAxYyIsImBgIiwhMCksaWUoc2UsbGUseGUsIlx1MjAxYyIsIlxcdGV4dHF1b3RlZGJsbGVmdCIpLGllKHNlLGxlLHhlLCJcdTIwMWQiLCInJyIsITApLGllKHNlLGxlLHhlLCJcdTIwMWQiLCJcXHRleHRxdW90ZWRibHJpZ2h0IiksaWUob2UsbGUseGUsIlx4YjAiLCJcXGRlZ3JlZSIsITApLGllKHNlLGxlLHhlLCJceGIwIiwiXFxkZWdyZWUiKSxpZShzZSxsZSx4ZSwiXHhiMCIsIlxcdGV4dGRlZ3JlZSIsITApLGllKG9lLGxlLHhlLCJceGEzIiwiXFxwb3VuZHMiKSxpZShvZSxsZSx4ZSwiXHhhMyIsIlxcbWF0aHN0ZXJsaW5nIiwhMCksaWUoc2UsbGUseGUsIlx4YTMiLCJcXHBvdW5kcyIpLGllKHNlLGxlLHhlLCJceGEzIiwiXFx0ZXh0c3RlcmxpbmciLCEwKSxpZShvZSxoZSx4ZSwiXHUyNzIwIiwiXFxtYWx0ZXNlIiksaWUoc2UsaGUseGUsIlx1MjcyMCIsIlxcbWFsdGVzZSIpO2Zvcih2YXIga2U9JzAxMjM0NTY3ODkvQC4iJyxTZT0wO1NlPGtlLmxlbmd0aDtTZSsrKXt2YXIgTWU9a2UuY2hhckF0KFNlKTtpZShvZSxsZSx4ZSxNZSxNZSl9Zm9yKHZhciB6ZT0nMDEyMzQ1Njc4OSFAKigpLT0rIjs6Py8uLCcsQWU9MDtBZTx6ZS5sZW5ndGg7QWUrKyl7dmFyIFRlPXplLmNoYXJBdChBZSk7aWUoc2UsbGUseGUsVGUsVGUpfWZvcih2YXIgQmU9IkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoiLENlPTA7Q2U8QmUubGVuZ3RoO0NlKyspe3ZhciBOZT1CZS5jaGFyQXQoQ2UpO2llKG9lLGxlLGRlLE5lLE5lKSxpZShzZSxsZSx4ZSxOZSxOZSl9aWUob2UsaGUseGUsIkMiLCJcdTIxMDIiKSxpZShzZSxoZSx4ZSwiQyIsIlx1MjEwMiIpLGllKG9lLGhlLHhlLCJIIiwiXHUyMTBkIiksaWUoc2UsaGUseGUsIkgiLCJcdTIxMGQiKSxpZShvZSxoZSx4ZSwiTiIsIlx1MjExNSIpLGllKHNlLGhlLHhlLCJOIiwiXHUyMTE1IiksaWUob2UsaGUseGUsIlAiLCJcdTIxMTkiKSxpZShzZSxoZSx4ZSwiUCIsIlx1MjExOSIpLGllKG9lLGhlLHhlLCJRIiwiXHUyMTFhIiksaWUoc2UsaGUseGUsIlEiLCJcdTIxMWEiKSxpZShvZSxoZSx4ZSwiUiIsIlx1MjExZCIpLGllKHNlLGhlLHhlLCJSIiwiXHUyMTFkIiksaWUob2UsaGUseGUsIloiLCJcdTIxMjQiKSxpZShzZSxoZSx4ZSwiWiIsIlx1MjEyNCIpLGllKG9lLGxlLGRlLCJoIiwiXHUyMTBlIiksaWUoc2UsbGUsZGUsImgiLCJcdTIxMGUiKTtmb3IodmFyIHFlPSIiLEllPTA7SWU8QmUubGVuZ3RoO0llKyspe3ZhciBSZT1CZS5jaGFyQXQoSWUpO2llKG9lLGxlLGRlLFJlLHFlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTYzMjArSWUpKSxpZShzZSxsZSx4ZSxSZSxxZSksaWUob2UsbGUsZGUsUmUscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjM3MitJZSkpLGllKHNlLGxlLHhlLFJlLHFlKSxpZShvZSxsZSxkZSxSZSxxZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NDI0K0llKSksaWUoc2UsbGUseGUsUmUscWUpLGllKG9lLGxlLGRlLFJlLHFlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTY1ODArSWUpKSxpZShzZSxsZSx4ZSxSZSxxZSksaWUob2UsbGUsZGUsUmUscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjY4NCtJZSkpLGllKHNlLGxlLHhlLFJlLHFlKSxpZShvZSxsZSxkZSxSZSxxZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NzM2K0llKSksaWUoc2UsbGUseGUsUmUscWUpLGllKG9lLGxlLGRlLFJlLHFlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTY3ODgrSWUpKSxpZShzZSxsZSx4ZSxSZSxxZSksaWUob2UsbGUsZGUsUmUscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1Njg0MCtJZSkpLGllKHNlLGxlLHhlLFJlLHFlKSxpZShvZSxsZSxkZSxSZSxxZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2OTQ0K0llKSksaWUoc2UsbGUseGUsUmUscWUpLEllPDI2JiYoaWUob2UsbGUsZGUsUmUscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjYzMitJZSkpLGllKHNlLGxlLHhlLFJlLHFlKSxpZShvZSxsZSxkZSxSZSxxZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU2NDc2K0llKSksaWUoc2UsbGUseGUsUmUscWUpKX1pZShvZSxsZSxkZSwiayIscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NjY2OCkpLGllKHNlLGxlLHhlLCJrIixxZSk7Zm9yKHZhciBIZT0wO0hlPDEwO0hlKyspe3ZhciBPZT1IZS50b1N0cmluZygpO2llKG9lLGxlLGRlLE9lLHFlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTcyOTQrSGUpKSxpZShzZSxsZSx4ZSxPZSxxZSksaWUob2UsbGUsZGUsT2UscWU9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTM0OSw1NzMxNCtIZSkpLGllKHNlLGxlLHhlLE9lLHFlKSxpZShvZSxsZSxkZSxPZSxxZT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1MzQ5LDU3MzI0K0hlKSksaWUoc2UsbGUseGUsT2UscWUpLGllKG9lLGxlLGRlLE9lLHFlPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUzNDksNTczMzQrSGUpKSxpZShzZSxsZSx4ZSxPZSxxZSl9Zm9yKHZhciBFZT0iXHhkMFx4ZGVceGZlIixMZT0wO0xlPEVlLmxlbmd0aDtMZSsrKXt2YXIgRGU9RWUuY2hhckF0KExlKTtpZShvZSxsZSxkZSxEZSxEZSksaWUoc2UsbGUseGUsRGUsRGUpfXZhciBWZT1bWyJtYXRoYmYiLCJ0ZXh0YmYiLCJNYWluLUJvbGQiXSxbIm1hdGhiZiIsInRleHRiZiIsIk1haW4tQm9sZCJdLFsibWF0aG5vcm1hbCIsInRleHRpdCIsIk1hdGgtSXRhbGljIl0sWyJtYXRobm9ybWFsIiwidGV4dGl0IiwiTWF0aC1JdGFsaWMiXSxbImJvbGRzeW1ib2wiLCJib2xkc3ltYm9sIiwiTWFpbi1Cb2xkSXRhbGljIl0sWyJib2xkc3ltYm9sIiwiYm9sZHN5bWJvbCIsIk1haW4tQm9sZEl0YWxpYyJdLFsibWF0aHNjciIsInRleHRzY3IiLCJTY3JpcHQtUmVndWxhciJdLFsiIiwiIiwiIl0sWyIiLCIiLCIiXSxbIiIsIiIsIiJdLFsibWF0aGZyYWsiLCJ0ZXh0ZnJhayIsIkZyYWt0dXItUmVndWxhciJdLFsibWF0aGZyYWsiLCJ0ZXh0ZnJhayIsIkZyYWt0dXItUmVndWxhciJdLFsibWF0aGJiIiwidGV4dGJiIiwiQU1TLVJlZ3VsYXIiXSxbIm1hdGhiYiIsInRleHRiYiIsIkFNUy1SZWd1bGFyIl0sWyJtYXRoYm9sZGZyYWsiLCJ0ZXh0Ym9sZGZyYWsiLCJGcmFrdHVyLVJlZ3VsYXIiXSxbIm1hdGhib2xkZnJhayIsInRleHRib2xkZnJhayIsIkZyYWt0dXItUmVndWxhciJdLFsibWF0aHNmIiwidGV4dHNmIiwiU2Fuc1NlcmlmLVJlZ3VsYXIiXSxbIm1hdGhzZiIsInRleHRzZiIsIlNhbnNTZXJpZi1SZWd1bGFyIl0sWyJtYXRoYm9sZHNmIiwidGV4dGJvbGRzZiIsIlNhbnNTZXJpZi1Cb2xkIl0sWyJtYXRoYm9sZHNmIiwidGV4dGJvbGRzZiIsIlNhbnNTZXJpZi1Cb2xkIl0sWyJtYXRoaXRzZiIsInRleHRpdHNmIiwiU2Fuc1NlcmlmLUl0YWxpYyJdLFsibWF0aGl0c2YiLCJ0ZXh0aXRzZiIsIlNhbnNTZXJpZi1JdGFsaWMiXSxbIiIsIiIsIiJdLFsiIiwiIiwiIl0sWyJtYXRodHQiLCJ0ZXh0dHQiLCJUeXBld3JpdGVyLVJlZ3VsYXIiXSxbIm1hdGh0dCIsInRleHR0dCIsIlR5cGV3cml0ZXItUmVndWxhciJdXSxQZT1bWyJtYXRoYmYiLCJ0ZXh0YmYiLCJNYWluLUJvbGQiXSxbIiIsIiIsIiJdLFsibWF0aHNmIiwidGV4dHNmIiwiU2Fuc1NlcmlmLVJlZ3VsYXIiXSxbIm1hdGhib2xkc2YiLCJ0ZXh0Ym9sZHNmIiwiU2Fuc1NlcmlmLUJvbGQiXSxbIm1hdGh0dCIsInRleHR0dCIsIlR5cGV3cml0ZXItUmVndWxhciJdXSxGZT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGFlW3JdW2VdJiZhZVtyXVtlXS5yZXBsYWNlJiYoZT1hZVtyXVtlXS5yZXBsYWNlKSx7dmFsdWU6ZSxtZXRyaWNzOk4oZSx0LHIpfX0sR2U9ZnVuY3Rpb24oZSx0LHIsbixhKXt2YXIgaSxvPUZlKGUsdCxyKSxzPW8ubWV0cmljcztpZihlPW8udmFsdWUscyl7dmFyIGw9cy5pdGFsaWM7KCJ0ZXh0Ij09PXJ8fG4mJiJtYXRoaXQiPT09bi5mb250KSYmKGw9MCksaT1uZXcgWihlLHMuaGVpZ2h0LHMuZGVwdGgsbCxzLnNrZXcscy53aWR0aCxhKX1lbHNlInVuZGVmaW5lZCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLndhcm4oIk5vIGNoYXJhY3RlciBtZXRyaWNzIGZvciAnIitlKyInIGluIHN0eWxlICciK3QrIicgYW5kIG1vZGUgJyIrcisiJyIpLGk9bmV3IFooZSwwLDAsMCwwLDAsYSk7aWYobil7aS5tYXhGb250U2l6ZT1uLnNpemVNdWx0aXBsaWVyLG4uc3R5bGUuaXNUaWdodCgpJiZpLmNsYXNzZXMucHVzaCgibXRpZ2h0Iik7dmFyIGg9bi5nZXRDb2xvcigpO2gmJihpLnN0eWxlLmNvbG9yPWgpfXJldHVybiBpfSxVZT1mdW5jdGlvbihlLHQpe2lmKEcoZS5jbGFzc2VzKSE9PUcodC5jbGFzc2VzKXx8ZS5za2V3IT09dC5za2V3fHxlLm1heEZvbnRTaXplIT09dC5tYXhGb250U2l6ZSlyZXR1cm4hMTtpZigxPT09ZS5jbGFzc2VzLmxlbmd0aCl7dmFyIHI9ZS5jbGFzc2VzWzBdO2lmKCJtYmluIj09PXJ8fCJtb3JkIj09PXIpcmV0dXJuITF9Zm9yKHZhciBuIGluIGUuc3R5bGUpaWYoZS5zdHlsZS5oYXNPd25Qcm9wZXJ0eShuKSYmZS5zdHlsZVtuXSE9PXQuc3R5bGVbbl0pcmV0dXJuITE7Zm9yKHZhciBhIGluIHQuc3R5bGUpaWYodC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShhKSYmZS5zdHlsZVthXSE9PXQuc3R5bGVbYV0pcmV0dXJuITE7cmV0dXJuITB9LFllPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wLHI9MCxuPTAsYT0wO2E8ZS5jaGlsZHJlbi5sZW5ndGg7YSsrKXt2YXIgaT1lLmNoaWxkcmVuW2FdO2kuaGVpZ2h0PnQmJih0PWkuaGVpZ2h0KSxpLmRlcHRoPnImJihyPWkuZGVwdGgpLGkubWF4Rm9udFNpemU+biYmKG49aS5tYXhGb250U2l6ZSl9ZS5oZWlnaHQ9dCxlLmRlcHRoPXIsZS5tYXhGb250U2l6ZT1ufSxYZT1mdW5jdGlvbihlLHQscixuKXt2YXIgYT1uZXcgVyhlLHQscixuKTtyZXR1cm4gWWUoYSksYX0sV2U9ZnVuY3Rpb24oZSx0LHIsbil7cmV0dXJuIG5ldyBXKGUsdCxyLG4pfSxfZT1mdW5jdGlvbihlKXt2YXIgdD1uZXcgQShlKTtyZXR1cm4gWWUodCksdH0samU9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPSIiO3N3aXRjaChlKXtjYXNlImFtc3JtIjpuPSJBTVMiO2JyZWFrO2Nhc2UidGV4dHJtIjpuPSJNYWluIjticmVhaztjYXNlInRleHRzZiI6bj0iU2Fuc1NlcmlmIjticmVhaztjYXNlInRleHR0dCI6bj0iVHlwZXdyaXRlciI7YnJlYWs7ZGVmYXVsdDpuPWV9cmV0dXJuIG4rIi0iKygidGV4dGJmIj09PXQmJiJ0ZXh0aXQiPT09cj8iQm9sZEl0YWxpYyI6InRleHRiZiI9PT10PyJCb2xkIjoidGV4dGl0Ij09PXQ/Ikl0YWxpYyI6IlJlZ3VsYXIiKX0sJGU9e21hdGhiZjp7dmFyaWFudDoiYm9sZCIsZm9udE5hbWU6Ik1haW4tQm9sZCJ9LG1hdGhybTp7dmFyaWFudDoibm9ybWFsIixmb250TmFtZToiTWFpbi1SZWd1bGFyIn0sdGV4dGl0Ont2YXJpYW50OiJpdGFsaWMiLGZvbnROYW1lOiJNYWluLUl0YWxpYyJ9LG1hdGhpdDp7dmFyaWFudDoiaXRhbGljIixmb250TmFtZToiTWFpbi1JdGFsaWMifSxtYXRobm9ybWFsOnt2YXJpYW50OiJpdGFsaWMiLGZvbnROYW1lOiJNYXRoLUl0YWxpYyJ9LG1hdGhiYjp7dmFyaWFudDoiZG91YmxlLXN0cnVjayIsZm9udE5hbWU6IkFNUy1SZWd1bGFyIn0sbWF0aGNhbDp7dmFyaWFudDoic2NyaXB0Iixmb250TmFtZToiQ2FsaWdyYXBoaWMtUmVndWxhciJ9LG1hdGhmcmFrOnt2YXJpYW50OiJmcmFrdHVyIixmb250TmFtZToiRnJha3R1ci1SZWd1bGFyIn0sbWF0aHNjcjp7dmFyaWFudDoic2NyaXB0Iixmb250TmFtZToiU2NyaXB0LVJlZ3VsYXIifSxtYXRoc2Y6e3ZhcmlhbnQ6InNhbnMtc2VyaWYiLGZvbnROYW1lOiJTYW5zU2VyaWYtUmVndWxhciJ9LG1hdGh0dDp7dmFyaWFudDoibW9ub3NwYWNlIixmb250TmFtZToiVHlwZXdyaXRlci1SZWd1bGFyIn19LFplPXt2ZWM6WyJ2ZWMiLC40NzEsLjcxNF0sb2lpbnRTaXplMTpbIm9paW50U2l6ZTEiLC45NTcsLjQ5OV0sb2lpbnRTaXplMjpbIm9paW50U2l6ZTIiLDEuNDcyLC42NTldLG9paWludFNpemUxOlsib2lpaW50U2l6ZTEiLDEuMzA0LC40OTldLG9paWludFNpemUyOlsib2lpaW50U2l6ZTIiLDEuOTgsLjY1OV19LEtlPXtmb250TWFwOiRlLG1ha2VTeW1ib2w6R2UsbWF0aHN5bTpmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gdm9pZCAwPT09biYmKG49W10pLCJib2xkc3ltYm9sIj09PXIuZm9udCYmRmUoZSwiTWFpbi1Cb2xkIix0KS5tZXRyaWNzP0dlKGUsIk1haW4tQm9sZCIsdCxyLG4uY29uY2F0KFsibWF0aGJmIl0pKToiXFwiPT09ZXx8Im1haW4iPT09YWVbdF1bZV0uZm9udD9HZShlLCJNYWluLVJlZ3VsYXIiLHQscixuKTpHZShlLCJBTVMtUmVndWxhciIsdCxyLG4uY29uY2F0KFsiYW1zcm0iXSkpfSxtYWtlU3BhbjpYZSxtYWtlU3ZnU3BhbjpXZSxtYWtlTGluZVNwYW46ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPVhlKFtlXSxbXSx0KTtyZXR1cm4gbi5oZWlnaHQ9TWF0aC5tYXgocnx8dC5mb250TWV0cmljcygpLmRlZmF1bHRSdWxlVGhpY2tuZXNzLHQubWluUnVsZVRoaWNrbmVzcyksbi5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aD1GKG4uaGVpZ2h0KSxuLm1heEZvbnRTaXplPTEsbn0sbWFrZUFuY2hvcjpmdW5jdGlvbihlLHQscixuKXt2YXIgYT1uZXcgXyhlLHQscixuKTtyZXR1cm4gWWUoYSksYX0sbWFrZUZyYWdtZW50Ol9lLHdyYXBGcmFnbWVudDpmdW5jdGlvbihlLHQpe3JldHVybiBlIGluc3RhbmNlb2YgQT9YZShbXSxbZV0sdCk6ZX0sbWFrZVZMaXN0OmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPWZ1bmN0aW9uKGUpe2lmKCJpbmRpdmlkdWFsU2hpZnQiPT09ZS5wb3NpdGlvblR5cGUpe2Zvcih2YXIgdD1lLmNoaWxkcmVuLHI9W3RbMF1dLG49LXRbMF0uc2hpZnQtdFswXS5lbGVtLmRlcHRoLGE9bixpPTE7aTx0Lmxlbmd0aDtpKyspe3ZhciBvPS10W2ldLnNoaWZ0LWEtdFtpXS5lbGVtLmRlcHRoLHM9by0odFtpLTFdLmVsZW0uaGVpZ2h0K3RbaS0xXS5lbGVtLmRlcHRoKTthKz1vLHIucHVzaCh7dHlwZToia2VybiIsc2l6ZTpzfSksci5wdXNoKHRbaV0pfXJldHVybntjaGlsZHJlbjpyLGRlcHRoOm59fXZhciBsO2lmKCJ0b3AiPT09ZS5wb3NpdGlvblR5cGUpe2Zvcih2YXIgaD1lLnBvc2l0aW9uRGF0YSxjPTA7YzxlLmNoaWxkcmVuLmxlbmd0aDtjKyspe3ZhciBtPWUuY2hpbGRyZW5bY107aC09Imtlcm4iPT09bS50eXBlP20uc2l6ZTptLmVsZW0uaGVpZ2h0K20uZWxlbS5kZXB0aH1sPWh9ZWxzZSBpZigiYm90dG9tIj09PWUucG9zaXRpb25UeXBlKWw9LWUucG9zaXRpb25EYXRhO2Vsc2V7dmFyIHU9ZS5jaGlsZHJlblswXTtpZigiZWxlbSIhPT11LnR5cGUpdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBjaGlsZCBtdXN0IGhhdmUgdHlwZSAiZWxlbSIuJyk7aWYoInNoaWZ0Ij09PWUucG9zaXRpb25UeXBlKWw9LXUuZWxlbS5kZXB0aC1lLnBvc2l0aW9uRGF0YTtlbHNle2lmKCJmaXJzdEJhc2VsaW5lIiE9PWUucG9zaXRpb25UeXBlKXRocm93IG5ldyBFcnJvcigiSW52YWxpZCBwb3NpdGlvblR5cGUgIitlLnBvc2l0aW9uVHlwZSsiLiIpO2w9LXUuZWxlbS5kZXB0aH19cmV0dXJue2NoaWxkcmVuOmUuY2hpbGRyZW4sZGVwdGg6bH19KGUpLG49ci5jaGlsZHJlbixhPXIuZGVwdGgsaT0wLG89MDtvPG4ubGVuZ3RoO28rKyl7dmFyIHM9bltvXTtpZigiZWxlbSI9PT1zLnR5cGUpe3ZhciBsPXMuZWxlbTtpPU1hdGgubWF4KGksbC5tYXhGb250U2l6ZSxsLmhlaWdodCl9fWkrPTI7dmFyIGg9WGUoWyJwc3RydXQiXSxbXSk7aC5zdHlsZS5oZWlnaHQ9RihpKTtmb3IodmFyIGM9W10sbT1hLHU9YSxwPWEsZD0wO2Q8bi5sZW5ndGg7ZCsrKXt2YXIgZj1uW2RdO2lmKCJrZXJuIj09PWYudHlwZSlwKz1mLnNpemU7ZWxzZXt2YXIgZz1mLmVsZW0sdj1mLndyYXBwZXJDbGFzc2VzfHxbXSxiPWYud3JhcHBlclN0eWxlfHx7fSx5PVhlKHYsW2gsZ10sdm9pZCAwLGIpO3kuc3R5bGUudG9wPUYoLWktcC1nLmRlcHRoKSxmLm1hcmdpbkxlZnQmJih5LnN0eWxlLm1hcmdpbkxlZnQ9Zi5tYXJnaW5MZWZ0KSxmLm1hcmdpblJpZ2h0JiYoeS5zdHlsZS5tYXJnaW5SaWdodD1mLm1hcmdpblJpZ2h0KSxjLnB1c2goeSkscCs9Zy5oZWlnaHQrZy5kZXB0aH1tPU1hdGgubWluKG0scCksdT1NYXRoLm1heCh1LHApfXZhciB4LHc9WGUoWyJ2bGlzdCJdLGMpO2lmKHcuc3R5bGUuaGVpZ2h0PUYodSksbTwwKXt2YXIgaz1YZShbXSxbXSksUz1YZShbInZsaXN0Il0sW2tdKTtTLnN0eWxlLmhlaWdodD1GKC1tKTt2YXIgTT1YZShbInZsaXN0LXMiXSxbbmV3IFooIlx1MjAwYiIpXSk7eD1bWGUoWyJ2bGlzdC1yIl0sW3csTV0pLFhlKFsidmxpc3QtciJdLFtTXSldfWVsc2UgeD1bWGUoWyJ2bGlzdC1yIl0sW3ddKV07dmFyIHo9WGUoWyJ2bGlzdC10Il0seCk7cmV0dXJuIDI9PT14Lmxlbmd0aCYmei5jbGFzc2VzLnB1c2goInZsaXN0LXQyIiksei5oZWlnaHQ9dSx6LmRlcHRoPS1tLHp9LG1ha2VPcmQ6ZnVuY3Rpb24oZSx0LHIpe3ZhciBhPWUubW9kZSxpPWUudGV4dCxvPVsibW9yZCJdLHM9Im1hdGgiPT09YXx8InRleHQiPT09YSYmdC5mb250LGw9cz90LmZvbnQ6dC5mb250RmFtaWx5LGg9IiIsYz0iIjtpZig1NTM0OT09PWkuY2hhckNvZGVBdCgwKSl7dmFyIG09ZnVuY3Rpb24oZSx0KXt2YXIgcj0xMDI0KihlLmNoYXJDb2RlQXQoMCktNTUyOTYpKyhlLmNoYXJDb2RlQXQoMSktNTYzMjApKzY1NTM2LGE9Im1hdGgiPT09dD8wOjE7aWYoMTE5ODA4PD1yJiZyPDEyMDQ4NCl7dmFyIGk9TWF0aC5mbG9vcigoci0xMTk4MDgpLzI2KTtyZXR1cm5bVmVbaV1bMl0sVmVbaV1bYV1dfWlmKDEyMDc4Mjw9ciYmcjw9MTIwODMxKXt2YXIgbz1NYXRoLmZsb29yKChyLTEyMDc4MikvMTApO3JldHVybltQZVtvXVsyXSxQZVtvXVthXV19aWYoMTIwNDg1PT09cnx8MTIwNDg2PT09cilyZXR1cm5bVmVbMF1bMl0sVmVbMF1bYV1dO2lmKDEyMDQ4NjxyJiZyPDEyMDc4MilyZXR1cm5bIiIsIiJdO3Rocm93IG5ldyBuKCJVbnN1cHBvcnRlZCBjaGFyYWN0ZXI6ICIrZSl9KGksYSk7aD1tWzBdLGM9bVsxXX1pZihoLmxlbmd0aD4wKXJldHVybiBHZShpLGgsYSx0LG8uY29uY2F0KGMpKTtpZihsKXt2YXIgdSxwO2lmKCJib2xkc3ltYm9sIj09PWwpe3ZhciBkPWZ1bmN0aW9uKGUsdCxyLG4sYSl7cmV0dXJuInRleHRvcmQiIT09YSYmRmUoZSwiTWF0aC1Cb2xkSXRhbGljIix0KS5tZXRyaWNzP3tmb250TmFtZToiTWF0aC1Cb2xkSXRhbGljIixmb250Q2xhc3M6ImJvbGRzeW1ib2wifTp7Zm9udE5hbWU6Ik1haW4tQm9sZCIsZm9udENsYXNzOiJtYXRoYmYifX0oaSxhLDAsMCxyKTt1PWQuZm9udE5hbWUscD1bZC5mb250Q2xhc3NdfWVsc2Ugcz8odT0kZVtsXS5mb250TmFtZSxwPVtsXSk6KHU9amUobCx0LmZvbnRXZWlnaHQsdC5mb250U2hhcGUpLHA9W2wsdC5mb250V2VpZ2h0LHQuZm9udFNoYXBlXSk7aWYoRmUoaSx1LGEpLm1ldHJpY3MpcmV0dXJuIEdlKGksdSxhLHQsby5jb25jYXQocCkpO2lmKHdlLmhhc093blByb3BlcnR5KGkpJiYiVHlwZXdyaXRlciI9PT11LnNsaWNlKDAsMTApKXtmb3IodmFyIGY9W10sZz0wO2c8aS5sZW5ndGg7ZysrKWYucHVzaChHZShpW2ddLHUsYSx0LG8uY29uY2F0KHApKSk7cmV0dXJuIF9lKGYpfX1pZigibWF0aG9yZCI9PT1yKXJldHVybiBHZShpLCJNYXRoLUl0YWxpYyIsYSx0LG8uY29uY2F0KFsibWF0aG5vcm1hbCJdKSk7aWYoInRleHRvcmQiPT09cil7dmFyIHY9YWVbYV1baV0mJmFlW2FdW2ldLmZvbnQ7aWYoImFtcyI9PT12KXt2YXIgYj1qZSgiYW1zcm0iLHQuZm9udFdlaWdodCx0LmZvbnRTaGFwZSk7cmV0dXJuIEdlKGksYixhLHQsby5jb25jYXQoImFtc3JtIix0LmZvbnRXZWlnaHQsdC5mb250U2hhcGUpKX1pZigibWFpbiIhPT12JiZ2KXt2YXIgeT1qZSh2LHQuZm9udFdlaWdodCx0LmZvbnRTaGFwZSk7cmV0dXJuIEdlKGkseSxhLHQsby5jb25jYXQoeSx0LmZvbnRXZWlnaHQsdC5mb250U2hhcGUpKX12YXIgeD1qZSgidGV4dHJtIix0LmZvbnRXZWlnaHQsdC5mb250U2hhcGUpO3JldHVybiBHZShpLHgsYSx0LG8uY29uY2F0KHQuZm9udFdlaWdodCx0LmZvbnRTaGFwZSkpfXRocm93IG5ldyBFcnJvcigidW5leHBlY3RlZCB0eXBlOiAiK3IrIiBpbiBtYWtlT3JkIil9LG1ha2VHbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9WGUoWyJtc3BhY2UiXSxbXSx0KSxuPVAoZSx0KTtyZXR1cm4gci5zdHlsZS5tYXJnaW5SaWdodD1GKG4pLHJ9LHN0YXRpY1N2ZzpmdW5jdGlvbihlLHQpe3ZhciByPVplW2VdLG49clswXSxhPXJbMV0saT1yWzJdLG89bmV3IEoobikscz1uZXcgSyhbb10se3dpZHRoOkYoYSksaGVpZ2h0OkYoaSksc3R5bGU6IndpZHRoOiIrRihhKSx2aWV3Qm94OiIwIDAgIisxZTMqYSsiICIrMWUzKmkscHJlc2VydmVBc3BlY3RSYXRpbzoieE1pbllNaW4ifSksbD1XZShbIm92ZXJsYXkiXSxbc10sdCk7cmV0dXJuIGwuaGVpZ2h0PWksbC5zdHlsZS5oZWlnaHQ9RihpKSxsLnN0eWxlLndpZHRoPUYoYSksbH0sc3ZnRGF0YTpaZSx0cnlDb21iaW5lQ2hhcnM6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDxlLmxlbmd0aC0xO3QrKyl7dmFyIHI9ZVt0XSxuPWVbdCsxXTtyIGluc3RhbmNlb2YgWiYmbiBpbnN0YW5jZW9mIFomJlVlKHIsbikmJihyLnRleHQrPW4udGV4dCxyLmhlaWdodD1NYXRoLm1heChyLmhlaWdodCxuLmhlaWdodCksci5kZXB0aD1NYXRoLm1heChyLmRlcHRoLG4uZGVwdGgpLHIuaXRhbGljPW4uaXRhbGljLGUuc3BsaWNlKHQrMSwxKSx0LS0pfXJldHVybiBlfX0sSmU9e251bWJlcjozLHVuaXQ6Im11In0sUWU9e251bWJlcjo0LHVuaXQ6Im11In0sZXQ9e251bWJlcjo1LHVuaXQ6Im11In0sdHQ9e21vcmQ6e21vcDpKZSxtYmluOlFlLG1yZWw6ZXQsbWlubmVyOkplfSxtb3A6e21vcmQ6SmUsbW9wOkplLG1yZWw6ZXQsbWlubmVyOkplfSxtYmluOnttb3JkOlFlLG1vcDpRZSxtb3BlbjpRZSxtaW5uZXI6UWV9LG1yZWw6e21vcmQ6ZXQsbW9wOmV0LG1vcGVuOmV0LG1pbm5lcjpldH0sbW9wZW46e30sbWNsb3NlOnttb3A6SmUsbWJpbjpRZSxtcmVsOmV0LG1pbm5lcjpKZX0sbXB1bmN0Onttb3JkOkplLG1vcDpKZSxtcmVsOmV0LG1vcGVuOkplLG1jbG9zZTpKZSxtcHVuY3Q6SmUsbWlubmVyOkplfSxtaW5uZXI6e21vcmQ6SmUsbW9wOkplLG1iaW46UWUsbXJlbDpldCxtb3BlbjpKZSxtcHVuY3Q6SmUsbWlubmVyOkplfX0scnQ9e21vcmQ6e21vcDpKZX0sbW9wOnttb3JkOkplLG1vcDpKZX0sbWJpbjp7fSxtcmVsOnt9LG1vcGVuOnt9LG1jbG9zZTp7bW9wOkplfSxtcHVuY3Q6e30sbWlubmVyOnttb3A6SmV9fSxudD17fSxhdD17fSxpdD17fTtmdW5jdGlvbiBvdChlKXtmb3IodmFyIHQ9ZS50eXBlLHI9ZS5uYW1lcyxuPWUucHJvcHMsYT1lLmhhbmRsZXIsaT1lLmh0bWxCdWlsZGVyLG89ZS5tYXRobWxCdWlsZGVyLHM9e3R5cGU6dCxudW1BcmdzOm4ubnVtQXJncyxhcmdUeXBlczpuLmFyZ1R5cGVzLGFsbG93ZWRJbkFyZ3VtZW50OiEhbi5hbGxvd2VkSW5Bcmd1bWVudCxhbGxvd2VkSW5UZXh0OiEhbi5hbGxvd2VkSW5UZXh0LGFsbG93ZWRJbk1hdGg6dm9pZCAwPT09bi5hbGxvd2VkSW5NYXRofHxuLmFsbG93ZWRJbk1hdGgsbnVtT3B0aW9uYWxBcmdzOm4ubnVtT3B0aW9uYWxBcmdzfHwwLGluZml4OiEhbi5pbmZpeCxwcmltaXRpdmU6ISFuLnByaW1pdGl2ZSxoYW5kbGVyOmF9LGw9MDtsPHIubGVuZ3RoOysrbCludFtyW2xdXT1zO3QmJihpJiYoYXRbdF09aSksbyYmKGl0W3RdPW8pKX1mdW5jdGlvbiBzdChlKXtvdCh7dHlwZTplLnR5cGUsbmFtZXM6W10scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcjpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcigiU2hvdWxkIG5ldmVyIGJlIGNhbGxlZC4iKX0saHRtbEJ1aWxkZXI6ZS5odG1sQnVpbGRlcixtYXRobWxCdWlsZGVyOmUubWF0aG1sQnVpbGRlcn0pfXZhciBsdD1mdW5jdGlvbihlKXtyZXR1cm4ib3JkZ3JvdXAiPT09ZS50eXBlJiYxPT09ZS5ib2R5Lmxlbmd0aD9lLmJvZHlbMF06ZX0saHQ9ZnVuY3Rpb24oZSl7cmV0dXJuIm9yZGdyb3VwIj09PWUudHlwZT9lLmJvZHk6W2VdfSxjdD1LZS5tYWtlU3BhbixtdD1bImxlZnRtb3N0IiwibWJpbiIsIm1vcGVuIiwibXJlbCIsIm1vcCIsIm1wdW5jdCJdLHV0PVsicmlnaHRtb3N0IiwibXJlbCIsIm1jbG9zZSIsIm1wdW5jdCJdLHB0PXtkaXNwbGF5OnguRElTUExBWSx0ZXh0OnguVEVYVCxzY3JpcHQ6eC5TQ1JJUFQsc2NyaXB0c2NyaXB0OnguU0NSSVBUU0NSSVBUfSxkdD17bW9yZDoibW9yZCIsbW9wOiJtb3AiLG1iaW46Im1iaW4iLG1yZWw6Im1yZWwiLG1vcGVuOiJtb3BlbiIsbWNsb3NlOiJtY2xvc2UiLG1wdW5jdDoibXB1bmN0IixtaW5uZXI6Im1pbm5lciJ9LGZ0PWZ1bmN0aW9uKGUsdCxyLG4pe3ZvaWQgMD09PW4mJihuPVtudWxsLG51bGxdKTtmb3IodmFyIGE9W10saT0wO2k8ZS5sZW5ndGg7aSsrKXt2YXIgbz13dChlW2ldLHQpO2lmKG8gaW5zdGFuY2VvZiBBKXt2YXIgcz1vLmNoaWxkcmVuO2EucHVzaC5hcHBseShhLHMpfWVsc2UgYS5wdXNoKG8pfWlmKEtlLnRyeUNvbWJpbmVDaGFycyhhKSwhcilyZXR1cm4gYTt2YXIgaD10O2lmKDE9PT1lLmxlbmd0aCl7dmFyIGM9ZVswXTsic2l6aW5nIj09PWMudHlwZT9oPXQuaGF2aW5nU2l6ZShjLnNpemUpOiJzdHlsaW5nIj09PWMudHlwZSYmKGg9dC5oYXZpbmdTdHlsZShwdFtjLnN0eWxlXSkpfXZhciBtPWN0KFtuWzBdfHwibGVmdG1vc3QiXSxbXSx0KSx1PWN0KFtuWzFdfHwicmlnaHRtb3N0Il0sW10sdCkscD0icm9vdCI9PT1yO3JldHVybiBndChhLChmdW5jdGlvbihlLHQpe3ZhciByPXQuY2xhc3Nlc1swXSxuPWUuY2xhc3Nlc1swXTsibWJpbiI9PT1yJiZsLmNvbnRhaW5zKHV0LG4pP3QuY2xhc3Nlc1swXT0ibW9yZCI6Im1iaW4iPT09biYmbC5jb250YWlucyhtdCxyKSYmKGUuY2xhc3Nlc1swXT0ibW9yZCIpfSkse25vZGU6bX0sdSxwKSxndChhLChmdW5jdGlvbihlLHQpe3ZhciByPXl0KHQpLG49eXQoZSksYT1yJiZuP2UuaGFzQ2xhc3MoIm10aWdodCIpP3J0W3JdW25dOnR0W3JdW25dOm51bGw7aWYoYSlyZXR1cm4gS2UubWFrZUdsdWUoYSxoKX0pLHtub2RlOm19LHUscCksYX0sZ3Q9ZnVuY3Rpb24gZSh0LHIsbixhLGkpe2EmJnQucHVzaChhKTtmb3IodmFyIG89MDtvPHQubGVuZ3RoO28rKyl7dmFyIHM9dFtvXSxsPXZ0KHMpO2lmKGwpZShsLmNoaWxkcmVuLHIsbixudWxsLGkpO2Vsc2V7dmFyIGg9IXMuaGFzQ2xhc3MoIm1zcGFjZSIpO2lmKGgpe3ZhciBjPXIocyxuLm5vZGUpO2MmJihuLmluc2VydEFmdGVyP24uaW5zZXJ0QWZ0ZXIoYyk6KHQudW5zaGlmdChjKSxvKyspKX1oP24ubm9kZT1zOmkmJnMuaGFzQ2xhc3MoIm5ld2xpbmUiKSYmKG4ubm9kZT1jdChbImxlZnRtb3N0Il0pKSxuLmluc2VydEFmdGVyPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihyKXt0LnNwbGljZShlKzEsMCxyKSxvKyt9fShvKX19YSYmdC5wb3AoKX0sdnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBBfHxlIGluc3RhbmNlb2YgX3x8ZSBpbnN0YW5jZW9mIFcmJmUuaGFzQ2xhc3MoImVuY2xvc2luZyIpP2U6bnVsbH0sYnQ9ZnVuY3Rpb24gZSh0LHIpe3ZhciBuPXZ0KHQpO2lmKG4pe3ZhciBhPW4uY2hpbGRyZW47aWYoYS5sZW5ndGgpe2lmKCJyaWdodCI9PT1yKXJldHVybiBlKGFbYS5sZW5ndGgtMV0sInJpZ2h0Iik7aWYoImxlZnQiPT09cilyZXR1cm4gZShhWzBdLCJsZWZ0Iil9fXJldHVybiB0fSx5dD1mdW5jdGlvbihlLHQpe3JldHVybiBlPyh0JiYoZT1idChlLHQpKSxkdFtlLmNsYXNzZXNbMF1dfHxudWxsKTpudWxsfSx4dD1mdW5jdGlvbihlLHQpe3ZhciByPVsibnVsbGRlbGltaXRlciJdLmNvbmNhdChlLmJhc2VTaXppbmdDbGFzc2VzKCkpO3JldHVybiBjdCh0LmNvbmNhdChyKSl9LHd0PWZ1bmN0aW9uKGUsdCxyKXtpZighZSlyZXR1cm4gY3QoKTtpZihhdFtlLnR5cGVdKXt2YXIgYT1hdFtlLnR5cGVdKGUsdCk7aWYociYmdC5zaXplIT09ci5zaXplKXthPWN0KHQuc2l6aW5nQ2xhc3NlcyhyKSxbYV0sdCk7dmFyIGk9dC5zaXplTXVsdGlwbGllci9yLnNpemVNdWx0aXBsaWVyO2EuaGVpZ2h0Kj1pLGEuZGVwdGgqPWl9cmV0dXJuIGF9dGhyb3cgbmV3IG4oIkdvdCBncm91cCBvZiB1bmtub3duIHR5cGU6ICciK2UudHlwZSsiJyIpfTtmdW5jdGlvbiBrdChlLHQpe3ZhciByPWN0KFsiYmFzZSJdLGUsdCksbj1jdChbInN0cnV0Il0pO3JldHVybiBuLnN0eWxlLmhlaWdodD1GKHIuaGVpZ2h0K3IuZGVwdGgpLHIuZGVwdGgmJihuLnN0eWxlLnZlcnRpY2FsQWxpZ249Rigtci5kZXB0aCkpLHIuY2hpbGRyZW4udW5zaGlmdChuKSxyfWZ1bmN0aW9uIFN0KGUsdCl7dmFyIHI9bnVsbDsxPT09ZS5sZW5ndGgmJiJ0YWciPT09ZVswXS50eXBlJiYocj1lWzBdLnRhZyxlPWVbMF0uYm9keSk7dmFyIG4sYT1mdChlLHQsInJvb3QiKTsyPT09YS5sZW5ndGgmJmFbMV0uaGFzQ2xhc3MoInRhZyIpJiYobj1hLnBvcCgpKTtmb3IodmFyIGksbz1bXSxzPVtdLGw9MDtsPGEubGVuZ3RoO2wrKylpZihzLnB1c2goYVtsXSksYVtsXS5oYXNDbGFzcygibWJpbiIpfHxhW2xdLmhhc0NsYXNzKCJtcmVsIil8fGFbbF0uaGFzQ2xhc3MoImFsbG93YnJlYWsiKSl7Zm9yKHZhciBoPSExO2w8YS5sZW5ndGgtMSYmYVtsKzFdLmhhc0NsYXNzKCJtc3BhY2UiKSYmIWFbbCsxXS5oYXNDbGFzcygibmV3bGluZSIpOylsKysscy5wdXNoKGFbbF0pLGFbbF0uaGFzQ2xhc3MoIm5vYnJlYWsiKSYmKGg9ITApO2h8fChvLnB1c2goa3Qocyx0KSkscz1bXSl9ZWxzZSBhW2xdLmhhc0NsYXNzKCJuZXdsaW5lIikmJihzLnBvcCgpLHMubGVuZ3RoPjAmJihvLnB1c2goa3Qocyx0KSkscz1bXSksby5wdXNoKGFbbF0pKTtzLmxlbmd0aD4wJiZvLnB1c2goa3Qocyx0KSkscj8oKGk9a3QoZnQocix0LCEwKSkpLmNsYXNzZXM9WyJ0YWciXSxvLnB1c2goaSkpOm4mJm8ucHVzaChuKTt2YXIgYz1jdChbImthdGV4LWh0bWwiXSxvKTtpZihjLnNldEF0dHJpYnV0ZSgiYXJpYS1oaWRkZW4iLCJ0cnVlIiksaSl7dmFyIG09aS5jaGlsZHJlblswXTttLnN0eWxlLmhlaWdodD1GKGMuaGVpZ2h0K2MuZGVwdGgpLGMuZGVwdGgmJihtLnN0eWxlLnZlcnRpY2FsQWxpZ249RigtYy5kZXB0aCkpfXJldHVybiBjfWZ1bmN0aW9uIE10KGUpe3JldHVybiBuZXcgQShlKX12YXIgenQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCxyKXt0aGlzLnR5cGU9dm9pZCAwLHRoaXMuYXR0cmlidXRlcz12b2lkIDAsdGhpcy5jaGlsZHJlbj12b2lkIDAsdGhpcy5jbGFzc2VzPXZvaWQgMCx0aGlzLnR5cGU9ZSx0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5jaGlsZHJlbj10fHxbXSx0aGlzLmNsYXNzZXM9cnx8W119dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQuc2V0QXR0cmlidXRlPWZ1bmN0aW9uKGUsdCl7dGhpcy5hdHRyaWJ1dGVzW2VdPXR9LHQuZ2V0QXR0cmlidXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmF0dHJpYnV0ZXNbZV19LHQudG9Ob2RlPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIix0aGlzLnR5cGUpO2Zvcih2YXIgdCBpbiB0aGlzLmF0dHJpYnV0ZXMpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuYXR0cmlidXRlcyx0KSYmZS5zZXRBdHRyaWJ1dGUodCx0aGlzLmF0dHJpYnV0ZXNbdF0pO3RoaXMuY2xhc3Nlcy5sZW5ndGg+MCYmKGUuY2xhc3NOYW1lPUcodGhpcy5jbGFzc2VzKSk7Zm9yKHZhciByPTA7cjx0aGlzLmNoaWxkcmVuLmxlbmd0aDtyKyspZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW3JdLnRvTm9kZSgpKTtyZXR1cm4gZX0sdC50b01hcmt1cD1mdW5jdGlvbigpe3ZhciBlPSI8Iit0aGlzLnR5cGU7Zm9yKHZhciB0IGluIHRoaXMuYXR0cmlidXRlcylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5hdHRyaWJ1dGVzLHQpJiYoZSs9IiAiK3QrJz0iJyxlKz1sLmVzY2FwZSh0aGlzLmF0dHJpYnV0ZXNbdF0pLGUrPSciJyk7dGhpcy5jbGFzc2VzLmxlbmd0aD4wJiYoZSs9JyBjbGFzcyA9IicrbC5lc2NhcGUoRyh0aGlzLmNsYXNzZXMpKSsnIicpLGUrPSI+Ijtmb3IodmFyIHI9MDtyPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO3IrKyllKz10aGlzLmNoaWxkcmVuW3JdLnRvTWFya3VwKCk7cmV0dXJuIGUrPSI8LyIrdGhpcy50eXBlKyI+In0sdC50b1RleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRvVGV4dCgpfSkpLmpvaW4oIiIpfSxlfSgpLEF0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXt0aGlzLnRleHQ9dm9pZCAwLHRoaXMudGV4dD1lfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnRvTm9kZT1mdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnRleHQpfSx0LnRvTWFya3VwPWZ1bmN0aW9uKCl7cmV0dXJuIGwuZXNjYXBlKHRoaXMudG9UZXh0KCkpfSx0LnRvVGV4dD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRleHR9LGV9KCksVHQ9e01hdGhOb2RlOnp0LFRleHROb2RlOkF0LFNwYWNlTm9kZTpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7dGhpcy53aWR0aD12b2lkIDAsdGhpcy5jaGFyYWN0ZXI9dm9pZCAwLHRoaXMud2lkdGg9ZSx0aGlzLmNoYXJhY3Rlcj1lPj0uMDU1NTUmJmU8PS4wNTU1Nj8iXHUyMDBhIjplPj0uMTY2NiYmZTw9LjE2Njc/Ilx1MjAwOSI6ZT49LjIyMjImJmU8PS4yMjIzPyJcdTIwMDUiOmU+PS4yNzc3JiZlPD0uMjc3OD8iXHUyMDA1XHUyMDBhIjplPj0tLjA1NTU2JiZlPD0tLjA1NTU1PyJcdTIwMGFcdTIwNjMiOmU+PS0uMTY2NyYmZTw9LS4xNjY2PyJcdTIwMDlcdTIwNjMiOmU+PS0uMjIyMyYmZTw9LS4yMjIyPyJcdTIwNWZcdTIwNjMiOmU+PS0uMjc3OCYmZTw9LS4yNzc3PyJcdTIwMDVcdTIwNjMiOm51bGx9dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQudG9Ob2RlPWZ1bmN0aW9uKCl7aWYodGhpcy5jaGFyYWN0ZXIpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuY2hhcmFjdGVyKTt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwiLCJtc3BhY2UiKTtyZXR1cm4gZS5zZXRBdHRyaWJ1dGUoIndpZHRoIixGKHRoaXMud2lkdGgpKSxlfSx0LnRvTWFya3VwPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hhcmFjdGVyPyI8bXRleHQ+Iit0aGlzLmNoYXJhY3RlcisiPC9tdGV4dD4iOic8bXNwYWNlIHdpZHRoPSInK0YodGhpcy53aWR0aCkrJyIvPid9LHQudG9UZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hhcmFjdGVyP3RoaXMuY2hhcmFjdGVyOiIgIn0sZX0oKSxuZXdEb2N1bWVudEZyYWdtZW50Ok10fSxCdD1mdW5jdGlvbihlLHQscil7cmV0dXJuIWFlW3RdW2VdfHwhYWVbdF1bZV0ucmVwbGFjZXx8NTUzNDk9PT1lLmNoYXJDb2RlQXQoMCl8fHdlLmhhc093blByb3BlcnR5KGUpJiZyJiYoci5mb250RmFtaWx5JiYidHQiPT09ci5mb250RmFtaWx5LnNsaWNlKDQsNil8fHIuZm9udCYmInR0Ij09PXIuZm9udC5zbGljZSg0LDYpKXx8KGU9YWVbdF1bZV0ucmVwbGFjZSksbmV3IFR0LlRleHROb2RlKGUpfSxDdD1mdW5jdGlvbihlKXtyZXR1cm4gMT09PWUubGVuZ3RoP2VbMF06bmV3IFR0Lk1hdGhOb2RlKCJtcm93IixlKX0sTnQ9ZnVuY3Rpb24oZSx0KXtpZigidGV4dHR0Ij09PXQuZm9udEZhbWlseSlyZXR1cm4ibW9ub3NwYWNlIjtpZigidGV4dHNmIj09PXQuZm9udEZhbWlseSlyZXR1cm4idGV4dGl0Ij09PXQuZm9udFNoYXBlJiYidGV4dGJmIj09PXQuZm9udFdlaWdodD8ic2Fucy1zZXJpZi1ib2xkLWl0YWxpYyI6InRleHRpdCI9PT10LmZvbnRTaGFwZT8ic2Fucy1zZXJpZi1pdGFsaWMiOiJ0ZXh0YmYiPT09dC5mb250V2VpZ2h0PyJib2xkLXNhbnMtc2VyaWYiOiJzYW5zLXNlcmlmIjtpZigidGV4dGl0Ij09PXQuZm9udFNoYXBlJiYidGV4dGJmIj09PXQuZm9udFdlaWdodClyZXR1cm4iYm9sZC1pdGFsaWMiO2lmKCJ0ZXh0aXQiPT09dC5mb250U2hhcGUpcmV0dXJuIml0YWxpYyI7aWYoInRleHRiZiI9PT10LmZvbnRXZWlnaHQpcmV0dXJuImJvbGQiO3ZhciByPXQuZm9udDtpZighcnx8Im1hdGhub3JtYWwiPT09cilyZXR1cm4gbnVsbDt2YXIgbj1lLm1vZGU7aWYoIm1hdGhpdCI9PT1yKXJldHVybiJpdGFsaWMiO2lmKCJib2xkc3ltYm9sIj09PXIpcmV0dXJuInRleHRvcmQiPT09ZS50eXBlPyJib2xkIjoiYm9sZC1pdGFsaWMiO2lmKCJtYXRoYmYiPT09cilyZXR1cm4iYm9sZCI7aWYoIm1hdGhiYiI9PT1yKXJldHVybiJkb3VibGUtc3RydWNrIjtpZigibWF0aGZyYWsiPT09cilyZXR1cm4iZnJha3R1ciI7aWYoIm1hdGhzY3IiPT09cnx8Im1hdGhjYWwiPT09cilyZXR1cm4ic2NyaXB0IjtpZigibWF0aHNmIj09PXIpcmV0dXJuInNhbnMtc2VyaWYiO2lmKCJtYXRodHQiPT09cilyZXR1cm4ibW9ub3NwYWNlIjt2YXIgYT1lLnRleHQ7cmV0dXJuIGwuY29udGFpbnMoWyJcXGltYXRoIiwiXFxqbWF0aCJdLGEpP251bGw6KGFlW25dW2FdJiZhZVtuXVthXS5yZXBsYWNlJiYoYT1hZVtuXVthXS5yZXBsYWNlKSxOKGEsS2UuZm9udE1hcFtyXS5mb250TmFtZSxuKT9LZS5mb250TWFwW3JdLnZhcmlhbnQ6bnVsbCl9LHF0PWZ1bmN0aW9uKGUsdCxyKXtpZigxPT09ZS5sZW5ndGgpe3ZhciBuPVJ0KGVbMF0sdCk7cmV0dXJuIHImJm4gaW5zdGFuY2VvZiB6dCYmIm1vIj09PW4udHlwZSYmKG4uc2V0QXR0cmlidXRlKCJsc3BhY2UiLCIwZW0iKSxuLnNldEF0dHJpYnV0ZSgicnNwYWNlIiwiMGVtIikpLFtuXX1mb3IodmFyIGEsaT1bXSxvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBzPVJ0KGVbb10sdCk7aWYocyBpbnN0YW5jZW9mIHp0JiZhIGluc3RhbmNlb2YgenQpe2lmKCJtdGV4dCI9PT1zLnR5cGUmJiJtdGV4dCI9PT1hLnR5cGUmJnMuZ2V0QXR0cmlidXRlKCJtYXRodmFyaWFudCIpPT09YS5nZXRBdHRyaWJ1dGUoIm1hdGh2YXJpYW50Iikpe3ZhciBsOyhsPWEuY2hpbGRyZW4pLnB1c2guYXBwbHkobCxzLmNoaWxkcmVuKTtjb250aW51ZX1pZigibW4iPT09cy50eXBlJiYibW4iPT09YS50eXBlKXt2YXIgaDsoaD1hLmNoaWxkcmVuKS5wdXNoLmFwcGx5KGgscy5jaGlsZHJlbik7Y29udGludWV9aWYoIm1pIj09PXMudHlwZSYmMT09PXMuY2hpbGRyZW4ubGVuZ3RoJiYibW4iPT09YS50eXBlKXt2YXIgYz1zLmNoaWxkcmVuWzBdO2lmKGMgaW5zdGFuY2VvZiBBdCYmIi4iPT09Yy50ZXh0KXt2YXIgbTsobT1hLmNoaWxkcmVuKS5wdXNoLmFwcGx5KG0scy5jaGlsZHJlbik7Y29udGludWV9fWVsc2UgaWYoIm1pIj09PWEudHlwZSYmMT09PWEuY2hpbGRyZW4ubGVuZ3RoKXt2YXIgdT1hLmNoaWxkcmVuWzBdO2lmKHUgaW5zdGFuY2VvZiBBdCYmIlx1MDMzOCI9PT11LnRleHQmJigibW8iPT09cy50eXBlfHwibWkiPT09cy50eXBlfHwibW4iPT09cy50eXBlKSl7dmFyIHA9cy5jaGlsZHJlblswXTtwIGluc3RhbmNlb2YgQXQmJnAudGV4dC5sZW5ndGg+MCYmKHAudGV4dD1wLnRleHQuc2xpY2UoMCwxKSsiXHUwMzM4IitwLnRleHQuc2xpY2UoMSksaS5wb3AoKSl9fX1pLnB1c2gocyksYT1zfXJldHVybiBpfSxJdD1mdW5jdGlvbihlLHQscil7cmV0dXJuIEN0KHF0KGUsdCxyKSl9LFJ0PWZ1bmN0aW9uKGUsdCl7aWYoIWUpcmV0dXJuIG5ldyBUdC5NYXRoTm9kZSgibXJvdyIpO2lmKGl0W2UudHlwZV0pcmV0dXJuIGl0W2UudHlwZV0oZSx0KTt0aHJvdyBuZXcgbigiR290IGdyb3VwIG9mIHVua25vd24gdHlwZTogJyIrZS50eXBlKyInIil9O2Z1bmN0aW9uIEh0KGUsdCxyLG4sYSl7dmFyIGksbz1xdChlLHIpO2k9MT09PW8ubGVuZ3RoJiZvWzBdaW5zdGFuY2VvZiB6dCYmbC5jb250YWlucyhbIm1yb3ciLCJtdGFibGUiXSxvWzBdLnR5cGUpP29bMF06bmV3IFR0Lk1hdGhOb2RlKCJtcm93IixvKTt2YXIgcz1uZXcgVHQuTWF0aE5vZGUoImFubm90YXRpb24iLFtuZXcgVHQuVGV4dE5vZGUodCldKTtzLnNldEF0dHJpYnV0ZSgiZW5jb2RpbmciLCJhcHBsaWNhdGlvbi94LXRleCIpO3ZhciBoPW5ldyBUdC5NYXRoTm9kZSgic2VtYW50aWNzIixbaSxzXSksYz1uZXcgVHQuTWF0aE5vZGUoIm1hdGgiLFtoXSk7Yy5zZXRBdHRyaWJ1dGUoInhtbG5zIiwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCIpLG4mJmMuc2V0QXR0cmlidXRlKCJkaXNwbGF5IiwiYmxvY2siKTt2YXIgbT1hPyJrYXRleCI6ImthdGV4LW1hdGhtbCI7cmV0dXJuIEtlLm1ha2VTcGFuKFttXSxbY10pfXZhciBPdD1mdW5jdGlvbihlKXtyZXR1cm4gbmV3IEUoe3N0eWxlOmUuZGlzcGxheU1vZGU/eC5ESVNQTEFZOnguVEVYVCxtYXhTaXplOmUubWF4U2l6ZSxtaW5SdWxlVGhpY2tuZXNzOmUubWluUnVsZVRoaWNrbmVzc30pfSxFdD1mdW5jdGlvbihlLHQpe2lmKHQuZGlzcGxheU1vZGUpe3ZhciByPVsia2F0ZXgtZGlzcGxheSJdO3QubGVxbm8mJnIucHVzaCgibGVxbm8iKSx0LmZsZXFuJiZyLnB1c2goImZsZXFuIiksZT1LZS5tYWtlU3BhbihyLFtlXSl9cmV0dXJuIGV9LEx0PWZ1bmN0aW9uKGUsdCxyKXt2YXIgbixhPU90KHIpO2lmKCJtYXRobWwiPT09ci5vdXRwdXQpcmV0dXJuIEh0KGUsdCxhLHIuZGlzcGxheU1vZGUsITApO2lmKCJodG1sIj09PXIub3V0cHV0KXt2YXIgaT1TdChlLGEpO249S2UubWFrZVNwYW4oWyJrYXRleCJdLFtpXSl9ZWxzZXt2YXIgbz1IdChlLHQsYSxyLmRpc3BsYXlNb2RlLCExKSxzPVN0KGUsYSk7bj1LZS5tYWtlU3BhbihbImthdGV4Il0sW28sc10pfXJldHVybiBFdChuLHIpfSxEdD17d2lkZWhhdDoiXiIsd2lkZWNoZWNrOiJcdTAyYzciLHdpZGV0aWxkZToifiIsdXRpbGRlOiJ+IixvdmVybGVmdGFycm93OiJcdTIxOTAiLHVuZGVybGVmdGFycm93OiJcdTIxOTAiLHhsZWZ0YXJyb3c6Ilx1MjE5MCIsb3ZlcnJpZ2h0YXJyb3c6Ilx1MjE5MiIsdW5kZXJyaWdodGFycm93OiJcdTIxOTIiLHhyaWdodGFycm93OiJcdTIxOTIiLHVuZGVyYnJhY2U6Ilx1MjNkZiIsb3ZlcmJyYWNlOiJcdTIzZGUiLG92ZXJncm91cDoiXHUyM2UwIix1bmRlcmdyb3VwOiJcdTIzZTEiLG92ZXJsZWZ0cmlnaHRhcnJvdzoiXHUyMTk0Iix1bmRlcmxlZnRyaWdodGFycm93OiJcdTIxOTQiLHhsZWZ0cmlnaHRhcnJvdzoiXHUyMTk0IixPdmVycmlnaHRhcnJvdzoiXHUyMWQyIix4UmlnaHRhcnJvdzoiXHUyMWQyIixvdmVybGVmdGhhcnBvb246Ilx1MjFiYyIseGxlZnRoYXJwb29udXA6Ilx1MjFiYyIsb3ZlcnJpZ2h0aGFycG9vbjoiXHUyMWMwIix4cmlnaHRoYXJwb29udXA6Ilx1MjFjMCIseExlZnRhcnJvdzoiXHUyMWQwIix4TGVmdHJpZ2h0YXJyb3c6Ilx1MjFkNCIseGhvb2tsZWZ0YXJyb3c6Ilx1MjFhOSIseGhvb2tyaWdodGFycm93OiJcdTIxYWEiLHhtYXBzdG86Ilx1MjFhNiIseHJpZ2h0aGFycG9vbmRvd246Ilx1MjFjMSIseGxlZnRoYXJwb29uZG93bjoiXHUyMWJkIix4cmlnaHRsZWZ0aGFycG9vbnM6Ilx1MjFjYyIseGxlZnRyaWdodGhhcnBvb25zOiJcdTIxY2IiLHh0d29oZWFkbGVmdGFycm93OiJcdTIxOWUiLHh0d29oZWFkcmlnaHRhcnJvdzoiXHUyMWEwIix4bG9uZ2VxdWFsOiI9Iix4dG9mcm9tOiJcdTIxYzQiLHhyaWdodGxlZnRhcnJvd3M6Ilx1MjFjNCIseHJpZ2h0ZXF1aWxpYnJpdW06Ilx1MjFjYyIseGxlZnRlcXVpbGlicml1bToiXHUyMWNiIiwiXFxjZHJpZ2h0YXJyb3ciOiJcdTIxOTIiLCJcXGNkbGVmdGFycm93IjoiXHUyMTkwIiwiXFxjZGxvbmdlcXVhbCI6Ij0ifSxWdD17b3ZlcnJpZ2h0YXJyb3c6W1sicmlnaHRhcnJvdyJdLC44ODgsNTIyLCJ4TWF4WU1pbiJdLG92ZXJsZWZ0YXJyb3c6W1sibGVmdGFycm93Il0sLjg4OCw1MjIsInhNaW5ZTWluIl0sdW5kZXJyaWdodGFycm93OltbInJpZ2h0YXJyb3ciXSwuODg4LDUyMiwieE1heFlNaW4iXSx1bmRlcmxlZnRhcnJvdzpbWyJsZWZ0YXJyb3ciXSwuODg4LDUyMiwieE1pbllNaW4iXSx4cmlnaHRhcnJvdzpbWyJyaWdodGFycm93Il0sMS40NjksNTIyLCJ4TWF4WU1pbiJdLCJcXGNkcmlnaHRhcnJvdyI6W1sicmlnaHRhcnJvdyJdLDMsNTIyLCJ4TWF4WU1pbiJdLHhsZWZ0YXJyb3c6W1sibGVmdGFycm93Il0sMS40NjksNTIyLCJ4TWluWU1pbiJdLCJcXGNkbGVmdGFycm93IjpbWyJsZWZ0YXJyb3ciXSwzLDUyMiwieE1pbllNaW4iXSxPdmVycmlnaHRhcnJvdzpbWyJkb3VibGVyaWdodGFycm93Il0sLjg4OCw1NjAsInhNYXhZTWluIl0seFJpZ2h0YXJyb3c6W1siZG91YmxlcmlnaHRhcnJvdyJdLDEuNTI2LDU2MCwieE1heFlNaW4iXSx4TGVmdGFycm93OltbImRvdWJsZWxlZnRhcnJvdyJdLDEuNTI2LDU2MCwieE1pbllNaW4iXSxvdmVybGVmdGhhcnBvb246W1sibGVmdGhhcnBvb24iXSwuODg4LDUyMiwieE1pbllNaW4iXSx4bGVmdGhhcnBvb251cDpbWyJsZWZ0aGFycG9vbiJdLC44ODgsNTIyLCJ4TWluWU1pbiJdLHhsZWZ0aGFycG9vbmRvd246W1sibGVmdGhhcnBvb25kb3duIl0sLjg4OCw1MjIsInhNaW5ZTWluIl0sb3ZlcnJpZ2h0aGFycG9vbjpbWyJyaWdodGhhcnBvb24iXSwuODg4LDUyMiwieE1heFlNaW4iXSx4cmlnaHRoYXJwb29udXA6W1sicmlnaHRoYXJwb29uIl0sLjg4OCw1MjIsInhNYXhZTWluIl0seHJpZ2h0aGFycG9vbmRvd246W1sicmlnaHRoYXJwb29uZG93biJdLC44ODgsNTIyLCJ4TWF4WU1pbiJdLHhsb25nZXF1YWw6W1sibG9uZ2VxdWFsIl0sLjg4OCwzMzQsInhNaW5ZTWluIl0sIlxcY2Rsb25nZXF1YWwiOltbImxvbmdlcXVhbCJdLDMsMzM0LCJ4TWluWU1pbiJdLHh0d29oZWFkbGVmdGFycm93OltbInR3b2hlYWRsZWZ0YXJyb3ciXSwuODg4LDMzNCwieE1pbllNaW4iXSx4dHdvaGVhZHJpZ2h0YXJyb3c6W1sidHdvaGVhZHJpZ2h0YXJyb3ciXSwuODg4LDMzNCwieE1heFlNaW4iXSxvdmVybGVmdHJpZ2h0YXJyb3c6W1sibGVmdGFycm93IiwicmlnaHRhcnJvdyJdLC44ODgsNTIyXSxvdmVyYnJhY2U6W1sibGVmdGJyYWNlIiwibWlkYnJhY2UiLCJyaWdodGJyYWNlIl0sMS42LDU0OF0sdW5kZXJicmFjZTpbWyJsZWZ0YnJhY2V1bmRlciIsIm1pZGJyYWNldW5kZXIiLCJyaWdodGJyYWNldW5kZXIiXSwxLjYsNTQ4XSx1bmRlcmxlZnRyaWdodGFycm93OltbImxlZnRhcnJvdyIsInJpZ2h0YXJyb3ciXSwuODg4LDUyMl0seGxlZnRyaWdodGFycm93OltbImxlZnRhcnJvdyIsInJpZ2h0YXJyb3ciXSwxLjc1LDUyMl0seExlZnRyaWdodGFycm93OltbImRvdWJsZWxlZnRhcnJvdyIsImRvdWJsZXJpZ2h0YXJyb3ciXSwxLjc1LDU2MF0seHJpZ2h0bGVmdGhhcnBvb25zOltbImxlZnRoYXJwb29uZG93bnBsdXMiLCJyaWdodGhhcnBvb25wbHVzIl0sMS43NSw3MTZdLHhsZWZ0cmlnaHRoYXJwb29uczpbWyJsZWZ0aGFycG9vbnBsdXMiLCJyaWdodGhhcnBvb25kb3ducGx1cyJdLDEuNzUsNzE2XSx4aG9va2xlZnRhcnJvdzpbWyJsZWZ0YXJyb3ciLCJyaWdodGhvb2siXSwxLjA4LDUyMl0seGhvb2tyaWdodGFycm93OltbImxlZnRob29rIiwicmlnaHRhcnJvdyJdLDEuMDgsNTIyXSxvdmVybGluZXNlZ21lbnQ6W1sibGVmdGxpbmVzZWdtZW50IiwicmlnaHRsaW5lc2VnbWVudCJdLC44ODgsNTIyXSx1bmRlcmxpbmVzZWdtZW50OltbImxlZnRsaW5lc2VnbWVudCIsInJpZ2h0bGluZXNlZ21lbnQiXSwuODg4LDUyMl0sb3Zlcmdyb3VwOltbImxlZnRncm91cCIsInJpZ2h0Z3JvdXAiXSwuODg4LDM0Ml0sdW5kZXJncm91cDpbWyJsZWZ0Z3JvdXB1bmRlciIsInJpZ2h0Z3JvdXB1bmRlciJdLC44ODgsMzQyXSx4bWFwc3RvOltbImxlZnRtYXBzdG8iLCJyaWdodGFycm93Il0sMS41LDUyMl0seHRvZnJvbTpbWyJsZWZ0VG9Gcm9tIiwicmlnaHRUb0Zyb20iXSwxLjc1LDUyOF0seHJpZ2h0bGVmdGFycm93czpbWyJiYXJhYm92ZWxlZnRhcnJvdyIsInJpZ2h0YXJyb3dhYm92ZWJhciJdLDEuNzUsOTAxXSx4cmlnaHRlcXVpbGlicml1bTpbWyJiYXJhYm92ZXNob3J0bGVmdGhhcnBvb24iLCJyaWdodGhhcnBvb25hYm92ZXNob3J0YmFyIl0sMS43NSw3MTZdLHhsZWZ0ZXF1aWxpYnJpdW06W1sic2hvcnRiYXJhYm92ZWxlZnRoYXJwb29uIiwic2hvcnRyaWdodGhhcnBvb25hYm92ZWJhciJdLDEuNzUsNzE2XX0sUHQ9ZnVuY3Rpb24oZSx0LHIsbixhKXt2YXIgaSxvPWUuaGVpZ2h0K2UuZGVwdGgrcituO2lmKC9mYm94fGNvbG9yfGFuZ2wvLnRlc3QodCkpe2lmKGk9S2UubWFrZVNwYW4oWyJzdHJldGNoeSIsdF0sW10sYSksImZib3giPT09dCl7dmFyIHM9YS5jb2xvciYmYS5nZXRDb2xvcigpO3MmJihpLnN0eWxlLmJvcmRlckNvbG9yPXMpfX1lbHNle3ZhciBsPVtdOy9eW2J4XWNhbmNlbCQvLnRlc3QodCkmJmwucHVzaChuZXcgUSh7eDE6IjAiLHkxOiIwIix4MjoiMTAwJSIseTI6IjEwMCUiLCJzdHJva2Utd2lkdGgiOiIwLjA0NmVtIn0pKSwvXng/Y2FuY2VsJC8udGVzdCh0KSYmbC5wdXNoKG5ldyBRKHt4MToiMCIseTE6IjEwMCUiLHgyOiIxMDAlIix5MjoiMCIsInN0cm9rZS13aWR0aCI6IjAuMDQ2ZW0ifSkpO3ZhciBoPW5ldyBLKGwse3dpZHRoOiIxMDAlIixoZWlnaHQ6RihvKX0pO2k9S2UubWFrZVN2Z1NwYW4oW10sW2hdLGEpfXJldHVybiBpLmhlaWdodD1vLGkuc3R5bGUuaGVpZ2h0PUYobyksaX0sRnQ9ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IFR0Lk1hdGhOb2RlKCJtbyIsW25ldyBUdC5UZXh0Tm9kZShEdFtlLnJlcGxhY2UoL15cXC8sIiIpXSldKTtyZXR1cm4gdC5zZXRBdHRyaWJ1dGUoInN0cmV0Y2h5IiwidHJ1ZSIpLHR9LEd0PWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgcj00ZTUsbj1lLmxhYmVsLnNsaWNlKDEpO2lmKGwuY29udGFpbnMoWyJ3aWRlaGF0Iiwid2lkZWNoZWNrIiwid2lkZXRpbGRlIiwidXRpbGRlIl0sbikpe3ZhciBhLGksbyxzPSJvcmRncm91cCI9PT0oZD1lLmJhc2UpLnR5cGU/ZC5ib2R5Lmxlbmd0aDoxO2lmKHM+NSkid2lkZWhhdCI9PT1ufHwid2lkZWNoZWNrIj09PW4/KGE9NDIwLHI9MjM2NCxvPS40MixpPW4rIjQiKTooYT0zMTIscj0yMzQwLG89LjM0LGk9InRpbGRlNCIpO2Vsc2V7dmFyIGg9WzEsMSwyLDIsMywzXVtzXTsid2lkZWhhdCI9PT1ufHwid2lkZWNoZWNrIj09PW4/KHI9WzAsMTA2MiwyMzY0LDIzNjQsMjM2NF1baF0sYT1bMCwyMzksMzAwLDM2MCw0MjBdW2hdLG89WzAsLjI0LC4zLC4zLC4zNiwuNDJdW2hdLGk9bitoKToocj1bMCw2MDAsMTAzMywyMzM5LDIzNDBdW2hdLGE9WzAsMjYwLDI4NiwzMDYsMzEyXVtoXSxvPVswLC4yNiwuMjg2LC4zLC4zMDYsLjM0XVtoXSxpPSJ0aWxkZSIraCl9dmFyIGM9bmV3IEooaSksbT1uZXcgSyhbY10se3dpZHRoOiIxMDAlIixoZWlnaHQ6RihvKSx2aWV3Qm94OiIwIDAgIityKyIgIithLHByZXNlcnZlQXNwZWN0UmF0aW86Im5vbmUifSk7cmV0dXJue3NwYW46S2UubWFrZVN2Z1NwYW4oW10sW21dLHQpLG1pbldpZHRoOjAsaGVpZ2h0Om99fXZhciB1LHAsZCxmPVtdLGc9VnRbbl0sdj1nWzBdLGI9Z1sxXSx5PWdbMl0seD15LzFlMyx3PXYubGVuZ3RoO2lmKDE9PT13KXU9WyJoaWRlLXRhaWwiXSxwPVtnWzNdXTtlbHNlIGlmKDI9PT13KXU9WyJoYWxmYXJyb3ctbGVmdCIsImhhbGZhcnJvdy1yaWdodCJdLHA9WyJ4TWluWU1pbiIsInhNYXhZTWluIl07ZWxzZXtpZigzIT09dyl0aHJvdyBuZXcgRXJyb3IoIkNvcnJlY3Qga2F0ZXhJbWFnZXNEYXRhIG9yIHVwZGF0ZSBjb2RlIGhlcmUgdG8gc3VwcG9ydFxuICAgICAgICAgICAgICAgICAgICAiK3crIiBjaGlsZHJlbi4iKTt1PVsiYnJhY2UtbGVmdCIsImJyYWNlLWNlbnRlciIsImJyYWNlLXJpZ2h0Il0scD1bInhNaW5ZTWluIiwieE1pZFlNaW4iLCJ4TWF4WU1pbiJdfWZvcih2YXIgaz0wO2s8dztrKyspe3ZhciBTPW5ldyBKKHZba10pLE09bmV3IEsoW1NdLHt3aWR0aDoiNDAwZW0iLGhlaWdodDpGKHgpLHZpZXdCb3g6IjAgMCAiK3IrIiAiK3kscHJlc2VydmVBc3BlY3RSYXRpbzpwW2tdKyIgc2xpY2UifSksej1LZS5tYWtlU3ZnU3BhbihbdVtrXV0sW01dLHQpO2lmKDE9PT13KXJldHVybntzcGFuOnosbWluV2lkdGg6YixoZWlnaHQ6eH07ei5zdHlsZS5oZWlnaHQ9Rih4KSxmLnB1c2goeil9cmV0dXJue3NwYW46S2UubWFrZVNwYW4oWyJzdHJldGNoeSJdLGYsdCksbWluV2lkdGg6YixoZWlnaHQ6eH19KCksbj1yLnNwYW4sYT1yLm1pbldpZHRoLGk9ci5oZWlnaHQ7cmV0dXJuIG4uaGVpZ2h0PWksbi5zdHlsZS5oZWlnaHQ9RihpKSxhPjAmJihuLnN0eWxlLm1pbldpZHRoPUYoYSkpLG59O2Z1bmN0aW9uIFV0KGUsdCl7aWYoIWV8fGUudHlwZSE9PXQpdGhyb3cgbmV3IEVycm9yKCJFeHBlY3RlZCBub2RlIG9mIHR5cGUgIit0KyIsIGJ1dCBnb3QgIisoZT8ibm9kZSBvZiB0eXBlICIrZS50eXBlOlN0cmluZyhlKSkpO3JldHVybiBlfWZ1bmN0aW9uIFl0KGUpe3ZhciB0PVh0KGUpO2lmKCF0KXRocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgbm9kZSBvZiBzeW1ib2wgZ3JvdXAgdHlwZSwgYnV0IGdvdCAiKyhlPyJub2RlIG9mIHR5cGUgIitlLnR5cGU6U3RyaW5nKGUpKSk7cmV0dXJuIHR9ZnVuY3Rpb24gWHQoZSl7cmV0dXJuIGUmJigiYXRvbSI9PT1lLnR5cGV8fHJlLmhhc093blByb3BlcnR5KGUudHlwZSkpP2U6bnVsbH12YXIgV3Q9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGE7ZSYmInN1cHN1YiI9PT1lLnR5cGU/KHI9KG49VXQoZS5iYXNlLCJhY2NlbnQiKSkuYmFzZSxlLmJhc2U9cixhPWZ1bmN0aW9uKGUpe2lmKGUgaW5zdGFuY2VvZiBXKXJldHVybiBlO3Rocm93IG5ldyBFcnJvcigiRXhwZWN0ZWQgc3BhbjxIdG1sRG9tTm9kZT4gYnV0IGdvdCAiK1N0cmluZyhlKSsiLiIpfSh3dChlLHQpKSxlLmJhc2U9bik6cj0obj1VdChlLCJhY2NlbnQiKSkuYmFzZTt2YXIgaT13dChyLHQuaGF2aW5nQ3JhbXBlZFN0eWxlKCkpLG89MDtpZihuLmlzU2hpZnR5JiZsLmlzQ2hhcmFjdGVyQm94KHIpKXt2YXIgcz1sLmdldEJhc2VFbGVtKHIpO289ZWUod3Qocyx0LmhhdmluZ0NyYW1wZWRTdHlsZSgpKSkuc2tld312YXIgaCxjPSJcXGMiPT09bi5sYWJlbCxtPWM/aS5oZWlnaHQraS5kZXB0aDpNYXRoLm1pbihpLmhlaWdodCx0LmZvbnRNZXRyaWNzKCkueEhlaWdodCk7aWYobi5pc1N0cmV0Y2h5KWg9R3Qobix0KSxoPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06aX0se3R5cGU6ImVsZW0iLGVsZW06aCx3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdLHdyYXBwZXJTdHlsZTpvPjA/e3dpZHRoOiJjYWxjKDEwMCUgLSAiK0YoMipvKSsiKSIsbWFyZ2luTGVmdDpGKDIqbyl9OnZvaWQgMH1dfSx0KTtlbHNle3ZhciB1LHA7IlxcdmVjIj09PW4ubGFiZWw/KHU9S2Uuc3RhdGljU3ZnKCJ2ZWMiLHQpLHA9S2Uuc3ZnRGF0YS52ZWNbMV0pOigodT1lZSh1PUtlLm1ha2VPcmQoe21vZGU6bi5tb2RlLHRleHQ6bi5sYWJlbH0sdCwidGV4dG9yZCIpKSkuaXRhbGljPTAscD11LndpZHRoLGMmJihtKz11LmRlcHRoKSksaD1LZS5tYWtlU3BhbihbImFjY2VudC1ib2R5Il0sW3VdKTt2YXIgZD0iXFx0ZXh0Y2lyY2xlZCI9PT1uLmxhYmVsO2QmJihoLmNsYXNzZXMucHVzaCgiYWNjZW50LWZ1bGwiKSxtPWkuaGVpZ2h0KTt2YXIgZj1vO2R8fChmLT1wLzIpLGguc3R5bGUubGVmdD1GKGYpLCJcXHRleHRjaXJjbGVkIj09PW4ubGFiZWwmJihoLnN0eWxlLnRvcD0iLjJlbSIpLGg9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImZpcnN0QmFzZWxpbmUiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTppfSx7dHlwZToia2VybiIsc2l6ZTotbX0se3R5cGU6ImVsZW0iLGVsZW06aH1dfSx0KX12YXIgZz1LZS5tYWtlU3BhbihbIm1vcmQiLCJhY2NlbnQiXSxbaF0sdCk7cmV0dXJuIGE/KGEuY2hpbGRyZW5bMF09ZyxhLmhlaWdodD1NYXRoLm1heChnLmhlaWdodCxhLmhlaWdodCksYS5jbGFzc2VzWzBdPSJtb3JkIixhKTpnfSxfdD1mdW5jdGlvbihlLHQpe3ZhciByPWUuaXNTdHJldGNoeT9GdChlLmxhYmVsKTpuZXcgVHQuTWF0aE5vZGUoIm1vIixbQnQoZS5sYWJlbCxlLm1vZGUpXSksbj1uZXcgVHQuTWF0aE5vZGUoIm1vdmVyIixbUnQoZS5iYXNlLHQpLHJdKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoImFjY2VudCIsInRydWUiKSxufSxqdD1uZXcgUmVnRXhwKFsiXFxhY3V0ZSIsIlxcZ3JhdmUiLCJcXGRkb3QiLCJcXHRpbGRlIiwiXFxiYXIiLCJcXGJyZXZlIiwiXFxjaGVjayIsIlxcaGF0IiwiXFx2ZWMiLCJcXGRvdCIsIlxcbWF0aHJpbmciXS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiJcXCIrZX0pKS5qb2luKCJ8IikpO290KHt0eXBlOiJhY2NlbnQiLG5hbWVzOlsiXFxhY3V0ZSIsIlxcZ3JhdmUiLCJcXGRkb3QiLCJcXHRpbGRlIiwiXFxiYXIiLCJcXGJyZXZlIiwiXFxjaGVjayIsIlxcaGF0IiwiXFx2ZWMiLCJcXGRvdCIsIlxcbWF0aHJpbmciLCJcXHdpZGVjaGVjayIsIlxcd2lkZWhhdCIsIlxcd2lkZXRpbGRlIiwiXFxvdmVycmlnaHRhcnJvdyIsIlxcb3ZlcmxlZnRhcnJvdyIsIlxcT3ZlcnJpZ2h0YXJyb3ciLCJcXG92ZXJsZWZ0cmlnaHRhcnJvdyIsIlxcb3Zlcmdyb3VwIiwiXFxvdmVybGluZXNlZ21lbnQiLCJcXG92ZXJsZWZ0aGFycG9vbiIsIlxcb3ZlcnJpZ2h0aGFycG9vbiJdLHByb3BzOntudW1BcmdzOjF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1sdCh0WzBdKSxuPSFqdC50ZXN0KGUuZnVuY05hbWUpLGE9IW58fCJcXHdpZGVoYXQiPT09ZS5mdW5jTmFtZXx8Ilxcd2lkZXRpbGRlIj09PWUuZnVuY05hbWV8fCJcXHdpZGVjaGVjayI9PT1lLmZ1bmNOYW1lO3JldHVybnt0eXBlOiJhY2NlbnQiLG1vZGU6ZS5wYXJzZXIubW9kZSxsYWJlbDplLmZ1bmNOYW1lLGlzU3RyZXRjaHk6bixpc1NoaWZ0eTphLGJhc2U6cn19LGh0bWxCdWlsZGVyOld0LG1hdGhtbEJ1aWxkZXI6X3R9KSxvdCh7dHlwZToiYWNjZW50IixuYW1lczpbIlxcJyIsIlxcYCIsIlxcXiIsIlxcfiIsIlxcPSIsIlxcdSIsIlxcLiIsJ1xcIicsIlxcYyIsIlxcciIsIlxcSCIsIlxcdiIsIlxcdGV4dGNpcmNsZWQiXSxwcm9wczp7bnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITAsYWxsb3dlZEluTWF0aDohMCxhcmdUeXBlczpbInByaW1pdGl2ZSJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dFswXSxuPWUucGFyc2VyLm1vZGU7cmV0dXJuIm1hdGgiPT09biYmKGUucGFyc2VyLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgibWF0aFZzVGV4dEFjY2VudHMiLCJMYVRlWCdzIGFjY2VudCAiK2UuZnVuY05hbWUrIiB3b3JrcyBvbmx5IGluIHRleHQgbW9kZSIpLG49InRleHQiKSx7dHlwZToiYWNjZW50Iixtb2RlOm4sbGFiZWw6ZS5mdW5jTmFtZSxpc1N0cmV0Y2h5OiExLGlzU2hpZnR5OiEwLGJhc2U6cn19LGh0bWxCdWlsZGVyOld0LG1hdGhtbEJ1aWxkZXI6X3R9KSxvdCh7dHlwZToiYWNjZW50VW5kZXIiLG5hbWVzOlsiXFx1bmRlcmxlZnRhcnJvdyIsIlxcdW5kZXJyaWdodGFycm93IiwiXFx1bmRlcmxlZnRyaWdodGFycm93IiwiXFx1bmRlcmdyb3VwIiwiXFx1bmRlcmxpbmVzZWdtZW50IiwiXFx1dGlsZGUiXSxwcm9wczp7bnVtQXJnczoxfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj1lLmZ1bmNOYW1lLGE9dFswXTtyZXR1cm57dHlwZToiYWNjZW50VW5kZXIiLG1vZGU6ci5tb2RlLGxhYmVsOm4sYmFzZTphfX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj13dChlLmJhc2UsdCksbj1HdChlLHQpLGE9IlxcdXRpbGRlIj09PWUubGFiZWw/LjEyOjAsaT1LZS5tYWtlVkxpc3Qoe3Bvc2l0aW9uVHlwZToidG9wIixwb3NpdGlvbkRhdGE6ci5oZWlnaHQsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOm4sd3JhcHBlckNsYXNzZXM6WyJzdmctYWxpZ24iXX0se3R5cGU6Imtlcm4iLHNpemU6YX0se3R5cGU6ImVsZW0iLGVsZW06cn1dfSx0KTtyZXR1cm4gS2UubWFrZVNwYW4oWyJtb3JkIiwiYWNjZW50dW5kZXIiXSxbaV0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1GdChlLmxhYmVsKSxuPW5ldyBUdC5NYXRoTm9kZSgibXVuZGVyIixbUnQoZS5iYXNlLHQpLHJdKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoImFjY2VudHVuZGVyIiwidHJ1ZSIpLG59fSk7dmFyICR0PWZ1bmN0aW9uKGUpe3ZhciB0PW5ldyBUdC5NYXRoTm9kZSgibXBhZGRlZCIsZT9bZV06W10pO3JldHVybiB0LnNldEF0dHJpYnV0ZSgid2lkdGgiLCIrMC42ZW0iKSx0LnNldEF0dHJpYnV0ZSgibHNwYWNlIiwiMC4zZW0iKSx0fTtvdCh7dHlwZToieEFycm93IixuYW1lczpbIlxceGxlZnRhcnJvdyIsIlxceHJpZ2h0YXJyb3ciLCJcXHhMZWZ0YXJyb3ciLCJcXHhSaWdodGFycm93IiwiXFx4bGVmdHJpZ2h0YXJyb3ciLCJcXHhMZWZ0cmlnaHRhcnJvdyIsIlxceGhvb2tsZWZ0YXJyb3ciLCJcXHhob29rcmlnaHRhcnJvdyIsIlxceG1hcHN0byIsIlxceHJpZ2h0aGFycG9vbmRvd24iLCJcXHhyaWdodGhhcnBvb251cCIsIlxceGxlZnRoYXJwb29uZG93biIsIlxceGxlZnRoYXJwb29udXAiLCJcXHhyaWdodGxlZnRoYXJwb29ucyIsIlxceGxlZnRyaWdodGhhcnBvb25zIiwiXFx4bG9uZ2VxdWFsIiwiXFx4dHdvaGVhZHJpZ2h0YXJyb3ciLCJcXHh0d29oZWFkbGVmdGFycm93IiwiXFx4dG9mcm9tIiwiXFx4cmlnaHRsZWZ0YXJyb3dzIiwiXFx4cmlnaHRlcXVpbGlicml1bSIsIlxceGxlZnRlcXVpbGlicml1bSIsIlxcXFxjZHJpZ2h0YXJyb3ciLCJcXFxcY2RsZWZ0YXJyb3ciLCJcXFxcY2Rsb25nZXF1YWwiXSxwcm9wczp7bnVtQXJnczoxLG51bU9wdGlvbmFsQXJnczoxfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLnBhcnNlcixhPWUuZnVuY05hbWU7cmV0dXJue3R5cGU6InhBcnJvdyIsbW9kZTpuLm1vZGUsbGFiZWw6YSxib2R5OnRbMF0sYmVsb3c6clswXX19LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHIsbj10LnN0eWxlLGE9dC5oYXZpbmdTdHlsZShuLnN1cCgpKSxpPUtlLndyYXBGcmFnbWVudCh3dChlLmJvZHksYSx0KSx0KSxvPSJcXHgiPT09ZS5sYWJlbC5zbGljZSgwLDIpPyJ4IjoiY2QiO2kuY2xhc3Nlcy5wdXNoKG8rIi1hcnJvdy1wYWQiKSxlLmJlbG93JiYoYT10LmhhdmluZ1N0eWxlKG4uc3ViKCkpLChyPUtlLndyYXBGcmFnbWVudCh3dChlLmJlbG93LGEsdCksdCkpLmNsYXNzZXMucHVzaChvKyItYXJyb3ctcGFkIikpO3ZhciBzLGw9R3QoZSx0KSxoPS10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCsuNSpsLmhlaWdodCxjPS10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodC0uNSpsLmhlaWdodC0uMTExO2lmKChpLmRlcHRoPi4yNXx8IlxceGxlZnRlcXVpbGlicml1bSI9PT1lLmxhYmVsKSYmKGMtPWkuZGVwdGgpLHIpe3ZhciBtPS10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCtyLmhlaWdodCsuNSpsLmhlaWdodCsuMTExO3M9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmksc2hpZnQ6Y30se3R5cGU6ImVsZW0iLGVsZW06bCxzaGlmdDpofSx7dHlwZToiZWxlbSIsZWxlbTpyLHNoaWZ0Om19XX0sdCl9ZWxzZSBzPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTppLHNoaWZ0OmN9LHt0eXBlOiJlbGVtIixlbGVtOmwsc2hpZnQ6aH1dfSx0KTtyZXR1cm4gcy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jbGFzc2VzLnB1c2goInN2Zy1hbGlnbiIpLEtlLm1ha2VTcGFuKFsibXJlbCIsIngtYXJyb3ciXSxbc10sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcixuPUZ0KGUubGFiZWwpO2lmKG4uc2V0QXR0cmlidXRlKCJtaW5zaXplIiwieCI9PT1lLmxhYmVsLmNoYXJBdCgwKT8iMS43NWVtIjoiMy4wZW0iKSxlLmJvZHkpe3ZhciBhPSR0KFJ0KGUuYm9keSx0KSk7aWYoZS5iZWxvdyl7dmFyIGk9JHQoUnQoZS5iZWxvdyx0KSk7cj1uZXcgVHQuTWF0aE5vZGUoIm11bmRlcm92ZXIiLFtuLGksYV0pfWVsc2Ugcj1uZXcgVHQuTWF0aE5vZGUoIm1vdmVyIixbbixhXSl9ZWxzZSBpZihlLmJlbG93KXt2YXIgbz0kdChSdChlLmJlbG93LHQpKTtyPW5ldyBUdC5NYXRoTm9kZSgibXVuZGVyIixbbixvXSl9ZWxzZSByPSR0KCkscj1uZXcgVHQuTWF0aE5vZGUoIm1vdmVyIixbbixyXSk7cmV0dXJuIHJ9fSk7dmFyIFp0PUtlLm1ha2VTcGFuO2Z1bmN0aW9uIEt0KGUsdCl7dmFyIHI9ZnQoZS5ib2R5LHQsITApO3JldHVybiBadChbZS5tY2xhc3NdLHIsdCl9ZnVuY3Rpb24gSnQoZSx0KXt2YXIgcixuPXF0KGUuYm9keSx0KTtyZXR1cm4ibWlubmVyIj09PWUubWNsYXNzP3I9bmV3IFR0Lk1hdGhOb2RlKCJtcGFkZGVkIixuKToibW9yZCI9PT1lLm1jbGFzcz9lLmlzQ2hhcmFjdGVyQm94PyhyPW5bMF0pLnR5cGU9Im1pIjpyPW5ldyBUdC5NYXRoTm9kZSgibWkiLG4pOihlLmlzQ2hhcmFjdGVyQm94PyhyPW5bMF0pLnR5cGU9Im1vIjpyPW5ldyBUdC5NYXRoTm9kZSgibW8iLG4pLCJtYmluIj09PWUubWNsYXNzPyhyLmF0dHJpYnV0ZXMubHNwYWNlPSIwLjIyZW0iLHIuYXR0cmlidXRlcy5yc3BhY2U9IjAuMjJlbSIpOiJtcHVuY3QiPT09ZS5tY2xhc3M/KHIuYXR0cmlidXRlcy5sc3BhY2U9IjBlbSIsci5hdHRyaWJ1dGVzLnJzcGFjZT0iMC4xN2VtIik6Im1vcGVuIj09PWUubWNsYXNzfHwibWNsb3NlIj09PWUubWNsYXNzPyhyLmF0dHJpYnV0ZXMubHNwYWNlPSIwZW0iLHIuYXR0cmlidXRlcy5yc3BhY2U9IjBlbSIpOiJtaW5uZXIiPT09ZS5tY2xhc3MmJihyLmF0dHJpYnV0ZXMubHNwYWNlPSIwLjA1NTZlbSIsci5hdHRyaWJ1dGVzLndpZHRoPSIrMC4xMTExZW0iKSkscn1vdCh7dHlwZToibWNsYXNzIixuYW1lczpbIlxcbWF0aG9yZCIsIlxcbWF0aGJpbiIsIlxcbWF0aHJlbCIsIlxcbWF0aG9wZW4iLCJcXG1hdGhjbG9zZSIsIlxcbWF0aHB1bmN0IiwiXFxtYXRoaW5uZXIiXSxwcm9wczp7bnVtQXJnczoxLHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49ZS5mdW5jTmFtZSxhPXRbMF07cmV0dXJue3R5cGU6Im1jbGFzcyIsbW9kZTpyLm1vZGUsbWNsYXNzOiJtIituLnNsaWNlKDUpLGJvZHk6aHQoYSksaXNDaGFyYWN0ZXJCb3g6bC5pc0NoYXJhY3RlckJveChhKX19LGh0bWxCdWlsZGVyOkt0LG1hdGhtbEJ1aWxkZXI6SnR9KTt2YXIgUXQ9ZnVuY3Rpb24oZSl7dmFyIHQ9Im9yZGdyb3VwIj09PWUudHlwZSYmZS5ib2R5Lmxlbmd0aD9lLmJvZHlbMF06ZTtyZXR1cm4iYXRvbSIhPT10LnR5cGV8fCJiaW4iIT09dC5mYW1pbHkmJiJyZWwiIT09dC5mYW1pbHk/Im1vcmQiOiJtIit0LmZhbWlseX07b3Qoe3R5cGU6Im1jbGFzcyIsbmFtZXM6WyJcXEBiaW5yZWwiXSxwcm9wczp7bnVtQXJnczoyfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJue3R5cGU6Im1jbGFzcyIsbW9kZTplLnBhcnNlci5tb2RlLG1jbGFzczpRdCh0WzBdKSxib2R5Omh0KHRbMV0pLGlzQ2hhcmFjdGVyQm94OmwuaXNDaGFyYWN0ZXJCb3godFsxXSl9fX0pLG90KHt0eXBlOiJtY2xhc3MiLG5hbWVzOlsiXFxzdGFja3JlbCIsIlxcb3ZlcnNldCIsIlxcdW5kZXJzZXQiXSxwcm9wczp7bnVtQXJnczoyfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHIsbj1lLnBhcnNlcixhPWUuZnVuY05hbWUsaT10WzFdLG89dFswXTtyPSJcXHN0YWNrcmVsIiE9PWE/UXQoaSk6Im1yZWwiO3ZhciBzPXt0eXBlOiJvcCIsbW9kZTppLm1vZGUsbGltaXRzOiEwLGFsd2F5c0hhbmRsZVN1cFN1YjohMCxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITEsc3VwcHJlc3NCYXNlU2hpZnQ6Ilxcc3RhY2tyZWwiIT09YSxib2R5Omh0KGkpfSxoPXt0eXBlOiJzdXBzdWIiLG1vZGU6by5tb2RlLGJhc2U6cyxzdXA6IlxcdW5kZXJzZXQiPT09YT9udWxsOm8sc3ViOiJcXHVuZGVyc2V0Ij09PWE/bzpudWxsfTtyZXR1cm57dHlwZToibWNsYXNzIixtb2RlOm4ubW9kZSxtY2xhc3M6cixib2R5OltoXSxpc0NoYXJhY3RlckJveDpsLmlzQ2hhcmFjdGVyQm94KGgpfX0saHRtbEJ1aWxkZXI6S3QsbWF0aG1sQnVpbGRlcjpKdH0pLG90KHt0eXBlOiJwbWIiLG5hbWVzOlsiXFxwbWIiXSxwcm9wczp7bnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXtyZXR1cm57dHlwZToicG1iIixtb2RlOmUucGFyc2VyLm1vZGUsbWNsYXNzOlF0KHRbMF0pLGJvZHk6aHQodFswXSl9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPWZ0KGUuYm9keSx0LCEwKSxuPUtlLm1ha2VTcGFuKFtlLm1jbGFzc10scix0KTtyZXR1cm4gbi5zdHlsZS50ZXh0U2hhZG93PSIwLjAyZW0gMC4wMWVtIDAuMDRweCIsbn0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXF0KGUuYm9keSx0KSxuPW5ldyBUdC5NYXRoTm9kZSgibXN0eWxlIixyKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoInN0eWxlIiwidGV4dC1zaGFkb3c6IDAuMDJlbSAwLjAxZW0gMC4wNHB4Iiksbn19KTt2YXIgZXI9eyI+IjoiXFxcXGNkcmlnaHRhcnJvdyIsIjwiOiJcXFxcY2RsZWZ0YXJyb3ciLCI9IjoiXFxcXGNkbG9uZ2VxdWFsIixBOiJcXHVwYXJyb3ciLFY6IlxcZG93bmFycm93IiwifCI6IlxcVmVydCIsIi4iOiJubyBhcnJvdyJ9LHRyPWZ1bmN0aW9uKGUpe3JldHVybiJ0ZXh0b3JkIj09PWUudHlwZSYmIkAiPT09ZS50ZXh0fTtmdW5jdGlvbiBycihlLHQscil7dmFyIG49ZXJbZV07c3dpdGNoKG4pe2Nhc2UiXFxcXGNkcmlnaHRhcnJvdyI6Y2FzZSJcXFxcY2RsZWZ0YXJyb3ciOnJldHVybiByLmNhbGxGdW5jdGlvbihuLFt0WzBdXSxbdFsxXV0pO2Nhc2UiXFx1cGFycm93IjpjYXNlIlxcZG93bmFycm93Ijp2YXIgYT17dHlwZToiYXRvbSIsdGV4dDpuLG1vZGU6Im1hdGgiLGZhbWlseToicmVsIn0saT17dHlwZToib3JkZ3JvdXAiLG1vZGU6Im1hdGgiLGJvZHk6W3IuY2FsbEZ1bmN0aW9uKCJcXFxcY2RsZWZ0IixbdFswXV0sW10pLHIuY2FsbEZ1bmN0aW9uKCJcXEJpZyIsW2FdLFtdKSxyLmNhbGxGdW5jdGlvbigiXFxcXGNkcmlnaHQiLFt0WzFdXSxbXSldfTtyZXR1cm4gci5jYWxsRnVuY3Rpb24oIlxcXFxjZHBhcmVudCIsW2ldLFtdKTtjYXNlIlxcXFxjZGxvbmdlcXVhbCI6cmV0dXJuIHIuY2FsbEZ1bmN0aW9uKCJcXFxcY2Rsb25nZXF1YWwiLFtdLFtdKTtjYXNlIlxcVmVydCI6cmV0dXJuIHIuY2FsbEZ1bmN0aW9uKCJcXEJpZyIsW3t0eXBlOiJ0ZXh0b3JkIix0ZXh0OiJcXFZlcnQiLG1vZGU6Im1hdGgifV0sW10pO2RlZmF1bHQ6cmV0dXJue3R5cGU6InRleHRvcmQiLHRleHQ6IiAiLG1vZGU6Im1hdGgifX19b3Qoe3R5cGU6ImNkbGFiZWwiLG5hbWVzOlsiXFxcXGNkbGVmdCIsIlxcXFxjZHJpZ2h0Il0scHJvcHM6e251bUFyZ3M6MX0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToiY2RsYWJlbCIsbW9kZTpyLm1vZGUsc2lkZTpuLnNsaWNlKDQpLGxhYmVsOnRbMF19fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXQuaGF2aW5nU3R5bGUodC5zdHlsZS5zdXAoKSksbj1LZS53cmFwRnJhZ21lbnQod3QoZS5sYWJlbCxyLHQpLHQpO3JldHVybiBuLmNsYXNzZXMucHVzaCgiY2QtbGFiZWwtIitlLnNpZGUpLG4uc3R5bGUuYm90dG9tPUYoLjgtbi5kZXB0aCksbi5oZWlnaHQ9MCxuLmRlcHRoPTAsbn0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPW5ldyBUdC5NYXRoTm9kZSgibXJvdyIsW1J0KGUubGFiZWwsdCldKTtyZXR1cm4ocj1uZXcgVHQuTWF0aE5vZGUoIm1wYWRkZWQiLFtyXSkpLnNldEF0dHJpYnV0ZSgid2lkdGgiLCIwIiksImxlZnQiPT09ZS5zaWRlJiZyLnNldEF0dHJpYnV0ZSgibHNwYWNlIiwiLTF3aWR0aCIpLHIuc2V0QXR0cmlidXRlKCJ2b2Zmc2V0IiwiMC43ZW0iKSwocj1uZXcgVHQuTWF0aE5vZGUoIm1zdHlsZSIsW3JdKSkuc2V0QXR0cmlidXRlKCJkaXNwbGF5c3R5bGUiLCJmYWxzZSIpLHIuc2V0QXR0cmlidXRlKCJzY3JpcHRsZXZlbCIsIjEiKSxyfX0pLG90KHt0eXBlOiJjZGxhYmVscGFyZW50IixuYW1lczpbIlxcXFxjZHBhcmVudCJdLHByb3BzOntudW1BcmdzOjF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXtyZXR1cm57dHlwZToiY2RsYWJlbHBhcmVudCIsbW9kZTplLnBhcnNlci5tb2RlLGZyYWdtZW50OnRbMF19fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPUtlLndyYXBGcmFnbWVudCh3dChlLmZyYWdtZW50LHQpLHQpO3JldHVybiByLmNsYXNzZXMucHVzaCgiY2QtdmVydC1hcnJvdyIpLHJ9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IFR0Lk1hdGhOb2RlKCJtcm93IixbUnQoZS5mcmFnbWVudCx0KV0pfX0pLG90KHt0eXBlOiJ0ZXh0b3JkIixuYW1lczpbIlxcQGNoYXIiXSxwcm9wczp7bnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9ZS5wYXJzZXIsYT1VdCh0WzBdLCJvcmRncm91cCIpLmJvZHksaT0iIixvPTA7bzxhLmxlbmd0aDtvKyspe2krPVV0KGFbb10sInRleHRvcmQiKS50ZXh0fXZhciBzLGw9cGFyc2VJbnQoaSk7aWYoaXNOYU4obCkpdGhyb3cgbmV3IG4oIlxcQGNoYXIgaGFzIG5vbi1udW1lcmljIGFyZ3VtZW50ICIraSk7aWYobDwwfHxsPj0xMTE0MTExKXRocm93IG5ldyBuKCJcXEBjaGFyIHdpdGggaW52YWxpZCBjb2RlIHBvaW50ICIraSk7cmV0dXJuIGw8PTY1NTM1P3M9U3RyaW5nLmZyb21DaGFyQ29kZShsKToobC09NjU1MzYscz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2KyhsPj4xMCksNTYzMjArKDEwMjMmbCkpKSx7dHlwZToidGV4dG9yZCIsbW9kZTpyLm1vZGUsdGV4dDpzfX19KTt2YXIgbnI9ZnVuY3Rpb24oZSx0KXt2YXIgcj1mdChlLmJvZHksdC53aXRoQ29sb3IoZS5jb2xvciksITEpO3JldHVybiBLZS5tYWtlRnJhZ21lbnQocil9LGFyPWZ1bmN0aW9uKGUsdCl7dmFyIHI9cXQoZS5ib2R5LHQud2l0aENvbG9yKGUuY29sb3IpKSxuPW5ldyBUdC5NYXRoTm9kZSgibXN0eWxlIixyKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoIm1hdGhjb2xvciIsZS5jb2xvciksbn07b3Qoe3R5cGU6ImNvbG9yIixuYW1lczpbIlxcdGV4dGNvbG9yIl0scHJvcHM6e251bUFyZ3M6MixhbGxvd2VkSW5UZXh0OiEwLGFyZ1R5cGVzOlsiY29sb3IiLCJvcmlnaW5hbCJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj1VdCh0WzBdLCJjb2xvci10b2tlbiIpLmNvbG9yLGE9dFsxXTtyZXR1cm57dHlwZToiY29sb3IiLG1vZGU6ci5tb2RlLGNvbG9yOm4sYm9keTpodChhKX19LGh0bWxCdWlsZGVyOm5yLG1hdGhtbEJ1aWxkZXI6YXJ9KSxvdCh7dHlwZToiY29sb3IiLG5hbWVzOlsiXFxjb2xvciJdLHByb3BzOntudW1BcmdzOjEsYWxsb3dlZEluVGV4dDohMCxhcmdUeXBlczpbImNvbG9yIl19LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuYnJlYWtPblRva2VuVGV4dCxhPVV0KHRbMF0sImNvbG9yLXRva2VuIikuY29sb3I7ci5ndWxsZXQubWFjcm9zLnNldCgiXFxjdXJyZW50QGNvbG9yIixhKTt2YXIgaT1yLnBhcnNlRXhwcmVzc2lvbighMCxuKTtyZXR1cm57dHlwZToiY29sb3IiLG1vZGU6ci5tb2RlLGNvbG9yOmEsYm9keTppfX0saHRtbEJ1aWxkZXI6bnIsbWF0aG1sQnVpbGRlcjphcn0pLG90KHt0eXBlOiJjciIsbmFtZXM6WyJcXFxcIl0scHJvcHM6e251bUFyZ3M6MCxudW1PcHRpb25hbEFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLnBhcnNlcixhPSJbIj09PW4uZ3VsbGV0LmZ1dHVyZSgpLnRleHQ/bi5wYXJzZVNpemVHcm91cCghMCk6bnVsbCxpPSFuLnNldHRpbmdzLmRpc3BsYXlNb2RlfHwhbi5zZXR0aW5ncy51c2VTdHJpY3RCZWhhdmlvcigibmV3TGluZUluRGlzcGxheU1vZGUiLCJJbiBMYVRlWCwgXFxcXCBvciBcXG5ld2xpbmUgZG9lcyBub3RoaW5nIGluIGRpc3BsYXkgbW9kZSIpO3JldHVybnt0eXBlOiJjciIsbW9kZTpuLm1vZGUsbmV3TGluZTppLHNpemU6YSYmVXQoYSwic2l6ZSIpLnZhbHVlfX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1LZS5tYWtlU3BhbihbIm1zcGFjZSJdLFtdLHQpO3JldHVybiBlLm5ld0xpbmUmJihyLmNsYXNzZXMucHVzaCgibmV3bGluZSIpLGUuc2l6ZSYmKHIuc3R5bGUubWFyZ2luVG9wPUYoUChlLnNpemUsdCkpKSkscn0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPW5ldyBUdC5NYXRoTm9kZSgibXNwYWNlIik7cmV0dXJuIGUubmV3TGluZSYmKHIuc2V0QXR0cmlidXRlKCJsaW5lYnJlYWsiLCJuZXdsaW5lIiksZS5zaXplJiZyLnNldEF0dHJpYnV0ZSgiaGVpZ2h0IixGKFAoZS5zaXplLHQpKSkpLHJ9fSk7dmFyIGlyPXsiXFxnbG9iYWwiOiJcXGdsb2JhbCIsIlxcbG9uZyI6IlxcXFxnbG9iYWxsb25nIiwiXFxcXGdsb2JhbGxvbmciOiJcXFxcZ2xvYmFsbG9uZyIsIlxcZGVmIjoiXFxnZGVmIiwiXFxnZGVmIjoiXFxnZGVmIiwiXFxlZGVmIjoiXFx4ZGVmIiwiXFx4ZGVmIjoiXFx4ZGVmIiwiXFxsZXQiOiJcXFxcZ2xvYmFsbGV0IiwiXFxmdXR1cmVsZXQiOiJcXFxcZ2xvYmFsZnV0dXJlIn0sb3I9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50ZXh0O2lmKC9eKD86W1xce30kJiNeX118RU9GKSQvLnRlc3QodCkpdGhyb3cgbmV3IG4oIkV4cGVjdGVkIGEgY29udHJvbCBzZXF1ZW5jZSIsZSk7cmV0dXJuIHR9LHNyPWZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBhPWUuZ3VsbGV0Lm1hY3Jvcy5nZXQoci50ZXh0KTtudWxsPT1hJiYoci5ub2V4cGFuZD0hMCxhPXt0b2tlbnM6W3JdLG51bUFyZ3M6MCx1bmV4cGFuZGFibGU6IWUuZ3VsbGV0LmlzRXhwYW5kYWJsZShyLnRleHQpfSksZS5ndWxsZXQubWFjcm9zLnNldCh0LGEsbil9O290KHt0eXBlOiJpbnRlcm5hbCIsbmFtZXM6WyJcXGdsb2JhbCIsIlxcbG9uZyIsIlxcXFxnbG9iYWxsb25nIl0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTt0LmNvbnN1bWVTcGFjZXMoKTt2YXIgYT10LmZldGNoKCk7aWYoaXJbYS50ZXh0XSlyZXR1cm4iXFxnbG9iYWwiIT09ciYmIlxcXFxnbG9iYWxsb25nIiE9PXJ8fChhLnRleHQ9aXJbYS50ZXh0XSksVXQodC5wYXJzZUZ1bmN0aW9uKCksImludGVybmFsIik7dGhyb3cgbmV3IG4oIkludmFsaWQgdG9rZW4gYWZ0ZXIgbWFjcm8gcHJlZml4IixhKX19KSxvdCh7dHlwZToiaW50ZXJuYWwiLG5hbWVzOlsiXFxkZWYiLCJcXGdkZWYiLCJcXGVkZWYiLCJcXHhkZWYiXSxwcm9wczp7bnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITAscHJpbWl0aXZlOiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZSxhPXQuZ3VsbGV0LnBvcFRva2VuKCksaT1hLnRleHQ7aWYoL14oPzpbXFx7fSQmI15fXXxFT0YpJC8udGVzdChpKSl0aHJvdyBuZXcgbigiRXhwZWN0ZWQgYSBjb250cm9sIHNlcXVlbmNlIixhKTtmb3IodmFyIG8scz0wLGw9W1tdXTsieyIhPT10Lmd1bGxldC5mdXR1cmUoKS50ZXh0OylpZigiIyI9PT0oYT10Lmd1bGxldC5wb3BUb2tlbigpKS50ZXh0KXtpZigieyI9PT10Lmd1bGxldC5mdXR1cmUoKS50ZXh0KXtvPXQuZ3VsbGV0LmZ1dHVyZSgpLGxbc10ucHVzaCgieyIpO2JyZWFrfWlmKGE9dC5ndWxsZXQucG9wVG9rZW4oKSwhL15bMS05XSQvLnRlc3QoYS50ZXh0KSl0aHJvdyBuZXcgbignSW52YWxpZCBhcmd1bWVudCBudW1iZXIgIicrYS50ZXh0KyciJyk7aWYocGFyc2VJbnQoYS50ZXh0KSE9PXMrMSl0aHJvdyBuZXcgbignQXJndW1lbnQgbnVtYmVyICInK2EudGV4dCsnIiBvdXQgb2Ygb3JkZXInKTtzKyssbC5wdXNoKFtdKX1lbHNle2lmKCJFT0YiPT09YS50ZXh0KXRocm93IG5ldyBuKCJFeHBlY3RlZCBhIG1hY3JvIGRlZmluaXRpb24iKTtsW3NdLnB1c2goYS50ZXh0KX12YXIgaD10Lmd1bGxldC5jb25zdW1lQXJnKCkudG9rZW5zO3JldHVybiBvJiZoLnVuc2hpZnQobyksIlxcZWRlZiIhPT1yJiYiXFx4ZGVmIiE9PXJ8fChoPXQuZ3VsbGV0LmV4cGFuZFRva2VucyhoKSkucmV2ZXJzZSgpLHQuZ3VsbGV0Lm1hY3Jvcy5zZXQoaSx7dG9rZW5zOmgsbnVtQXJnczpzLGRlbGltaXRlcnM6bH0scj09PWlyW3JdKSx7dHlwZToiaW50ZXJuYWwiLG1vZGU6dC5tb2RlfX19KSxvdCh7dHlwZToiaW50ZXJuYWwiLG5hbWVzOlsiXFxsZXQiLCJcXFxcZ2xvYmFsbGV0Il0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlKXt2YXIgdD1lLnBhcnNlcixyPWUuZnVuY05hbWUsbj1vcih0Lmd1bGxldC5wb3BUb2tlbigpKTt0Lmd1bGxldC5jb25zdW1lU3BhY2VzKCk7dmFyIGE9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5ndWxsZXQucG9wVG9rZW4oKTtyZXR1cm4iPSI9PT10LnRleHQmJiIgIj09PSh0PWUuZ3VsbGV0LnBvcFRva2VuKCkpLnRleHQmJih0PWUuZ3VsbGV0LnBvcFRva2VuKCkpLHR9KHQpO3JldHVybiBzcih0LG4sYSwiXFxcXGdsb2JhbGxldCI9PT1yKSx7dHlwZToiaW50ZXJuYWwiLG1vZGU6dC5tb2RlfX19KSxvdCh7dHlwZToiaW50ZXJuYWwiLG5hbWVzOlsiXFxmdXR1cmVsZXQiLCJcXFxcZ2xvYmFsZnV0dXJlIl0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlKXt2YXIgdD1lLnBhcnNlcixyPWUuZnVuY05hbWUsbj1vcih0Lmd1bGxldC5wb3BUb2tlbigpKSxhPXQuZ3VsbGV0LnBvcFRva2VuKCksaT10Lmd1bGxldC5wb3BUb2tlbigpO3JldHVybiBzcih0LG4saSwiXFxcXGdsb2JhbGZ1dHVyZSI9PT1yKSx0Lmd1bGxldC5wdXNoVG9rZW4oaSksdC5ndWxsZXQucHVzaFRva2VuKGEpLHt0eXBlOiJpbnRlcm5hbCIsbW9kZTp0Lm1vZGV9fX0pO3ZhciBscj1mdW5jdGlvbihlLHQscil7dmFyIG49TihhZS5tYXRoW2VdJiZhZS5tYXRoW2VdLnJlcGxhY2V8fGUsdCxyKTtpZighbil0aHJvdyBuZXcgRXJyb3IoIlVuc3VwcG9ydGVkIHN5bWJvbCAiK2UrIiBhbmQgZm9udCBzaXplICIrdCsiLiIpO3JldHVybiBufSxocj1mdW5jdGlvbihlLHQscixuKXt2YXIgYT1yLmhhdmluZ0Jhc2VTdHlsZSh0KSxpPUtlLm1ha2VTcGFuKG4uY29uY2F0KGEuc2l6aW5nQ2xhc3NlcyhyKSksW2VdLHIpLG89YS5zaXplTXVsdGlwbGllci9yLnNpemVNdWx0aXBsaWVyO3JldHVybiBpLmhlaWdodCo9byxpLmRlcHRoKj1vLGkubWF4Rm9udFNpemU9YS5zaXplTXVsdGlwbGllcixpfSxjcj1mdW5jdGlvbihlLHQscil7dmFyIG49dC5oYXZpbmdCYXNlU3R5bGUociksYT0oMS10LnNpemVNdWx0aXBsaWVyL24uc2l6ZU11bHRpcGxpZXIpKnQuZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0O2UuY2xhc3Nlcy5wdXNoKCJkZWxpbWNlbnRlciIpLGUuc3R5bGUudG9wPUYoYSksZS5oZWlnaHQtPWEsZS5kZXB0aCs9YX0sbXI9ZnVuY3Rpb24oZSx0LHIsbixhLGkpe3ZhciBvPWZ1bmN0aW9uKGUsdCxyLG4pe3JldHVybiBLZS5tYWtlU3ltYm9sKGUsIlNpemUiK3QrIi1SZWd1bGFyIixyLG4pfShlLHQsYSxuKSxzPWhyKEtlLm1ha2VTcGFuKFsiZGVsaW1zaXppbmciLCJzaXplIit0XSxbb10sbikseC5URVhULG4saSk7cmV0dXJuIHImJmNyKHMsbix4LlRFWFQpLHN9LHVyPWZ1bmN0aW9uKGUsdCxyKXt2YXIgbjtyZXR1cm4gbj0iU2l6ZTEtUmVndWxhciI9PT10PyJkZWxpbS1zaXplMSI6ImRlbGltLXNpemU0Iix7dHlwZToiZWxlbSIsZWxlbTpLZS5tYWtlU3BhbihbImRlbGltc2l6aW5naW5uZXIiLG5dLFtLZS5tYWtlU3BhbihbXSxbS2UubWFrZVN5bWJvbChlLHQscildKV0pfX0scHI9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPVRbIlNpemU0LVJlZ3VsYXIiXVtlLmNoYXJDb2RlQXQoMCldP1RbIlNpemU0LVJlZ3VsYXIiXVtlLmNoYXJDb2RlQXQoMCldWzRdOlRbIlNpemUxLVJlZ3VsYXIiXVtlLmNoYXJDb2RlQXQoMCldWzRdLGE9bmV3IEooImlubmVyIixmdW5jdGlvbihlLHQpe3N3aXRjaChlKXtjYXNlIlx1MjM5YyI6cmV0dXJuIk0yOTEgMCBINDE3IFYiK3QrIiBIMjkxeiBNMjkxIDAgSDQxNyBWIit0KyIgSDI5MXoiO2Nhc2UiXHUyMjIzIjpyZXR1cm4iTTE0NSAwIEgxODggViIrdCsiIEgxNDV6IE0xNDUgMCBIMTg4IFYiK3QrIiBIMTQ1eiI7Y2FzZSJcdTIyMjUiOnJldHVybiJNMTQ1IDAgSDE4OCBWIit0KyIgSDE0NXogTTE0NSAwIEgxODggViIrdCsiIEgxNDV6TTM2NyAwIEg0MTAgViIrdCsiIEgzNjd6IE0zNjcgMCBINDEwIFYiK3QrIiBIMzY3eiI7Y2FzZSJcdTIzOWYiOnJldHVybiJNNDU3IDAgSDU4MyBWIit0KyIgSDQ1N3ogTTQ1NyAwIEg1ODMgViIrdCsiIEg0NTd6IjtjYXNlIlx1MjNhMiI6cmV0dXJuIk0zMTkgMCBINDAzIFYiK3QrIiBIMzE5eiBNMzE5IDAgSDQwMyBWIit0KyIgSDMxOXoiO2Nhc2UiXHUyM2E1IjpyZXR1cm4iTTI2MyAwIEgzNDcgViIrdCsiIEgyNjN6IE0yNjMgMCBIMzQ3IFYiK3QrIiBIMjYzeiI7Y2FzZSJcdTIzYWEiOnJldHVybiJNMzg0IDAgSDUwNCBWIit0KyIgSDM4NHogTTM4NCAwIEg1MDQgViIrdCsiIEgzODR6IjtjYXNlIlx1MjNkMCI6cmV0dXJuIk0zMTIgMCBIMzU1IFYiK3QrIiBIMzEyeiBNMzEyIDAgSDM1NSBWIit0KyIgSDMxMnoiO2Nhc2UiXHUyMDE2IjpyZXR1cm4iTTI1NyAwIEgzMDAgViIrdCsiIEgyNTd6IE0yNTcgMCBIMzAwIFYiK3QrIiBIMjU3ek00NzggMCBINTIxIFYiK3QrIiBINDc4eiBNNDc4IDAgSDUyMSBWIit0KyIgSDQ3OHoiO2RlZmF1bHQ6cmV0dXJuIiJ9fShlLE1hdGgucm91bmQoMWUzKnQpKSksaT1uZXcgSyhbYV0se3dpZHRoOkYobiksaGVpZ2h0OkYodCksc3R5bGU6IndpZHRoOiIrRihuKSx2aWV3Qm94OiIwIDAgIisxZTMqbisiICIrTWF0aC5yb3VuZCgxZTMqdCkscHJlc2VydmVBc3BlY3RSYXRpbzoieE1pbllNaW4ifSksbz1LZS5tYWtlU3ZnU3BhbihbXSxbaV0scik7cmV0dXJuIG8uaGVpZ2h0PXQsby5zdHlsZS5oZWlnaHQ9Rih0KSxvLnN0eWxlLndpZHRoPUYobikse3R5cGU6ImVsZW0iLGVsZW06b319LGRyPXt0eXBlOiJrZXJuIixzaXplOi0uMDA4fSxmcj1bInwiLCJcXGx2ZXJ0IiwiXFxydmVydCIsIlxcdmVydCJdLGdyPVsiXFx8IiwiXFxsVmVydCIsIlxcclZlcnQiLCJcXFZlcnQiXSx2cj1mdW5jdGlvbihlLHQscixuLGEsaSl7dmFyIG8scyxoLGMsbT0iIix1PTA7bz1oPWM9ZSxzPW51bGw7dmFyIHA9IlNpemUxLVJlZ3VsYXIiOyJcXHVwYXJyb3ciPT09ZT9oPWM9Ilx1MjNkMCI6IlxcVXBhcnJvdyI9PT1lP2g9Yz0iXHUyMDE2IjoiXFxkb3duYXJyb3ciPT09ZT9vPWg9Ilx1MjNkMCI6IlxcRG93bmFycm93Ij09PWU/bz1oPSJcdTIwMTYiOiJcXHVwZG93bmFycm93Ij09PWU/KG89IlxcdXBhcnJvdyIsaD0iXHUyM2QwIixjPSJcXGRvd25hcnJvdyIpOiJcXFVwZG93bmFycm93Ij09PWU/KG89IlxcVXBhcnJvdyIsaD0iXHUyMDE2IixjPSJcXERvd25hcnJvdyIpOmwuY29udGFpbnMoZnIsZSk/KGg9Ilx1MjIyMyIsbT0idmVydCIsdT0zMzMpOmwuY29udGFpbnMoZ3IsZSk/KGg9Ilx1MjIyNSIsbT0iZG91YmxldmVydCIsdT01NTYpOiJbIj09PWV8fCJcXGxicmFjayI9PT1lPyhvPSJcdTIzYTEiLGg9Ilx1MjNhMiIsYz0iXHUyM2EzIixwPSJTaXplNC1SZWd1bGFyIixtPSJsYnJhY2siLHU9NjY3KToiXSI9PT1lfHwiXFxyYnJhY2siPT09ZT8obz0iXHUyM2E0IixoPSJcdTIzYTUiLGM9Ilx1MjNhNiIscD0iU2l6ZTQtUmVndWxhciIsbT0icmJyYWNrIix1PTY2Nyk6IlxcbGZsb29yIj09PWV8fCJcdTIzMGEiPT09ZT8oaD1vPSJcdTIzYTIiLGM9Ilx1MjNhMyIscD0iU2l6ZTQtUmVndWxhciIsbT0ibGZsb29yIix1PTY2Nyk6IlxcbGNlaWwiPT09ZXx8Ilx1MjMwOCI9PT1lPyhvPSJcdTIzYTEiLGg9Yz0iXHUyM2EyIixwPSJTaXplNC1SZWd1bGFyIixtPSJsY2VpbCIsdT02NjcpOiJcXHJmbG9vciI9PT1lfHwiXHUyMzBiIj09PWU/KGg9bz0iXHUyM2E1IixjPSJcdTIzYTYiLHA9IlNpemU0LVJlZ3VsYXIiLG09InJmbG9vciIsdT02NjcpOiJcXHJjZWlsIj09PWV8fCJcdTIzMDkiPT09ZT8obz0iXHUyM2E0IixoPWM9Ilx1MjNhNSIscD0iU2l6ZTQtUmVndWxhciIsbT0icmNlaWwiLHU9NjY3KToiKCI9PT1lfHwiXFxscGFyZW4iPT09ZT8obz0iXHUyMzliIixoPSJcdTIzOWMiLGM9Ilx1MjM5ZCIscD0iU2l6ZTQtUmVndWxhciIsbT0ibHBhcmVuIix1PTg3NSk6IikiPT09ZXx8IlxccnBhcmVuIj09PWU/KG89Ilx1MjM5ZSIsaD0iXHUyMzlmIixjPSJcdTIzYTAiLHA9IlNpemU0LVJlZ3VsYXIiLG09InJwYXJlbiIsdT04NzUpOiJcXHsiPT09ZXx8IlxcbGJyYWNlIj09PWU/KG89Ilx1MjNhNyIscz0iXHUyM2E4IixjPSJcdTIzYTkiLGg9Ilx1MjNhYSIscD0iU2l6ZTQtUmVndWxhciIpOiJcXH0iPT09ZXx8IlxccmJyYWNlIj09PWU/KG89Ilx1MjNhYiIscz0iXHUyM2FjIixjPSJcdTIzYWQiLGg9Ilx1MjNhYSIscD0iU2l6ZTQtUmVndWxhciIpOiJcXGxncm91cCI9PT1lfHwiXHUyN2VlIj09PWU/KG89Ilx1MjNhNyIsYz0iXHUyM2E5IixoPSJcdTIzYWEiLHA9IlNpemU0LVJlZ3VsYXIiKToiXFxyZ3JvdXAiPT09ZXx8Ilx1MjdlZiI9PT1lPyhvPSJcdTIzYWIiLGM9Ilx1MjNhZCIsaD0iXHUyM2FhIixwPSJTaXplNC1SZWd1bGFyIik6IlxcbG1vdXN0YWNoZSI9PT1lfHwiXHUyM2IwIj09PWU/KG89Ilx1MjNhNyIsYz0iXHUyM2FkIixoPSJcdTIzYWEiLHA9IlNpemU0LVJlZ3VsYXIiKToiXFxybW91c3RhY2hlIiE9PWUmJiJcdTIzYjEiIT09ZXx8KG89Ilx1MjNhYiIsYz0iXHUyM2E5IixoPSJcdTIzYWEiLHA9IlNpemU0LVJlZ3VsYXIiKTt2YXIgZD1scihvLHAsYSksZj1kLmhlaWdodCtkLmRlcHRoLGc9bHIoaCxwLGEpLHY9Zy5oZWlnaHQrZy5kZXB0aCxiPWxyKGMscCxhKSx5PWIuaGVpZ2h0K2IuZGVwdGgsdz0wLGs9MTtpZihudWxsIT09cyl7dmFyIFM9bHIocyxwLGEpO3c9Uy5oZWlnaHQrUy5kZXB0aCxrPTJ9dmFyIE09Zit5K3csej1NK01hdGgubWF4KDAsTWF0aC5jZWlsKCh0LU0pLyhrKnYpKSkqayp2LEE9bi5mb250TWV0cmljcygpLmF4aXNIZWlnaHQ7ciYmKEEqPW4uc2l6ZU11bHRpcGxpZXIpO3ZhciBUPXovMi1BLEI9W107aWYobS5sZW5ndGg+MCl7dmFyIEM9ei1mLXksTj1NYXRoLnJvdW5kKDFlMyp6KSxxPWZ1bmN0aW9uKGUsdCl7c3dpdGNoKGUpe2Nhc2UibGJyYWNrIjpyZXR1cm4iTTQwMyAxNzU5IFY4NCBINjY2IFYwIEgzMTkgVjE3NTkgdiIrdCsiIHYxNzU5IGgzNDcgdi04NFxuSDQwM3ogTTQwMyAxNzU5IFYwIEgzMTkgVjE3NTkgdiIrdCsiIHYxNzU5IGg4NHoiO2Nhc2UicmJyYWNrIjpyZXR1cm4iTTM0NyAxNzU5IFYwIEgwIFY4NCBIMjYzIFYxNzU5IHYiK3QrIiB2MTc1OSBIMCB2ODQgSDM0N3pcbk0zNDcgMTc1OSBWMCBIMjYzIFYxNzU5IHYiK3QrIiB2MTc1OSBoODR6IjtjYXNlInZlcnQiOnJldHVybiJNMTQ1IDE1IHY1ODUgdiIrdCsiIHY1ODUgYzIuNjY3LDEwLDkuNjY3LDE1LDIxLDE1XG5jMTAsMCwxNi42NjcsLTUsMjAsLTE1IHYtNTg1IHYiKy10KyIgdi01ODUgYy0yLjY2NywtMTAsLTkuNjY3LC0xNSwtMjEsLTE1XG5jLTEwLDAsLTE2LjY2Nyw1LC0yMCwxNXogTTE4OCAxNSBIMTQ1IHY1ODUgdiIrdCsiIHY1ODUgaDQzeiI7Y2FzZSJkb3VibGV2ZXJ0IjpyZXR1cm4iTTE0NSAxNSB2NTg1IHYiK3QrIiB2NTg1IGMyLjY2NywxMCw5LjY2NywxNSwyMSwxNVxuYzEwLDAsMTYuNjY3LC01LDIwLC0xNSB2LTU4NSB2IistdCsiIHYtNTg1IGMtMi42NjcsLTEwLC05LjY2NywtMTUsLTIxLC0xNVxuYy0xMCwwLC0xNi42NjcsNSwtMjAsMTV6IE0xODggMTUgSDE0NSB2NTg1IHYiK3QrIiB2NTg1IGg0M3pcbk0zNjcgMTUgdjU4NSB2Iit0KyIgdjU4NSBjMi42NjcsMTAsOS42NjcsMTUsMjEsMTVcbmMxMCwwLDE2LjY2NywtNSwyMCwtMTUgdi01ODUgdiIrLXQrIiB2LTU4NSBjLTIuNjY3LC0xMCwtOS42NjcsLTE1LC0yMSwtMTVcbmMtMTAsMCwtMTYuNjY3LDUsLTIwLDE1eiBNNDEwIDE1IEgzNjcgdjU4NSB2Iit0KyIgdjU4NSBoNDN6IjtjYXNlImxmbG9vciI6cmV0dXJuIk0zMTkgNjAyIFYwIEg0MDMgVjYwMiB2Iit0KyIgdjE3MTUgaDI2MyB2ODQgSDMxOXpcbk1NMzE5IDYwMiBWMCBINDAzIFY2MDIgdiIrdCsiIHYxNzE1IEgzMTl6IjtjYXNlInJmbG9vciI6cmV0dXJuIk0zMTkgNjAyIFYwIEg0MDMgVjYwMiB2Iit0KyIgdjE3OTkgSDAgdi04NCBIMzE5elxuTU0zMTkgNjAyIFYwIEg0MDMgVjYwMiB2Iit0KyIgdjE3MTUgSDMxOXoiO2Nhc2UibGNlaWwiOnJldHVybiJNNDAzIDE3NTkgVjg0IEg2NjYgVjAgSDMxOSBWMTc1OSB2Iit0KyIgdjYwMiBoODR6XG5NNDAzIDE3NTkgVjAgSDMxOSBWMTc1OSB2Iit0KyIgdjYwMiBoODR6IjtjYXNlInJjZWlsIjpyZXR1cm4iTTM0NyAxNzU5IFYwIEgwIFY4NCBIMjYzIFYxNzU5IHYiK3QrIiB2NjAyIGg4NHpcbk0zNDcgMTc1OSBWMCBoLTg0IFYxNzU5IHYiK3QrIiB2NjAyIGg4NHoiO2Nhc2UibHBhcmVuIjpyZXR1cm4iTTg2Myw5YzAsLTIsLTIsLTUsLTYsLTljMCwwLC0xNywwLC0xNywwYy0xMi43LDAsLTE5LjMsMC4zLC0yMCwxXG5jLTUuMyw1LjMsLTEwLjMsMTEsLTE1LDE3Yy0yNDIuNywyOTQuNywtMzk1LjMsNjgyLC00NTgsMTE2MmMtMjEuMywxNjMuMywtMzMuMywzNDksXG4tMzYsNTU3IGwwLCIrKHQrODQpKyJjMC4yLDYsMCwyNiwwLDYwYzIsMTU5LjMsMTAsMzEwLjcsMjQsNDU0YzUzLjMsNTI4LDIxMCxcbjk0OS43LDQ3MCwxMjY1YzQuNyw2LDkuNywxMS43LDE1LDE3YzAuNywwLjcsNywxLDE5LDFjMCwwLDE4LDAsMTgsMGM0LC00LDYsLTcsNiwtOVxuYzAsLTIuNywtMy4zLC04LjcsLTEwLC0xOGMtMTM1LjMsLTE5Mi43LC0yMzUuNSwtNDE0LjMsLTMwMC41LC02NjVjLTY1LC0yNTAuNywtMTAyLjUsXG4tNTQ0LjcsLTExMi41LC04ODJjLTIsLTEwNCwtMywtMTY3LC0zLC0xODlcbmwwLC0iKyh0KzkyKSsiYzAsLTE2Mi43LDUuNywtMzE0LDE3LC00NTRjMjAuNywtMjcyLDYzLjcsLTUxMywxMjksLTcyM2M2NS4zLFxuLTIxMCwxNTUuMywtMzk2LjMsMjcwLC01NTljNi43LC05LjMsMTAsLTE1LjMsMTAsLTE4eiI7Y2FzZSJycGFyZW4iOnJldHVybiJNNzYsMGMtMTYuNywwLC0yNSwzLC0yNSw5YzAsMiwyLDYuMyw2LDEzYzIxLjMsMjguNyw0Mi4zLDYwLjMsXG42Myw5NWM5Ni43LDE1Ni43LDE3Mi44LDMzMi41LDIyOC41LDUyNy41YzU1LjcsMTk1LDkyLjgsNDE2LjUsMTExLjUsNjY0LjVcbmMxMS4zLDEzOS4zLDE3LDI5MC43LDE3LDQ1NGMwLDI4LDEuNyw0MywzLjMsNDVsMCwiKyh0KzkpKyJcbmMtMyw0LC0zLjMsMTYuNywtMy4zLDM4YzAsMTYyLC01LjcsMzEzLjcsLTE3LDQ1NWMtMTguNywyNDgsLTU1LjgsNDY5LjMsLTExMS41LDY2NFxuYy01NS43LDE5NC43LC0xMzEuOCwzNzAuMywtMjI4LjUsNTI3Yy0yMC43LDM0LjcsLTQxLjcsNjYuMywtNjMsOTVjLTIsMy4zLC00LDcsLTYsMTFcbmMwLDcuMyw1LjcsMTEsMTcsMTFjMCwwLDExLDAsMTEsMGM5LjMsMCwxNC4zLC0wLjMsMTUsLTFjNS4zLC01LjMsMTAuMywtMTEsMTUsLTE3XG5jMjQyLjcsLTI5NC43LDM5NS4zLC02ODEuNyw0NTgsLTExNjFjMjEuMywtMTY0LjcsMzMuMywtMzUwLjcsMzYsLTU1OFxubDAsLSIrKHQrMTQ0KSsiYy0yLC0xNTkuMywtMTAsLTMxMC43LC0yNCwtNDU0Yy01My4zLC01MjgsLTIxMCwtOTQ5LjcsXG4tNDcwLC0xMjY1Yy00LjcsLTYsLTkuNywtMTEuNywtMTUsLTE3Yy0wLjcsLTAuNywtNi43LC0xLC0xOCwtMXoiO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbmtub3duIHN0cmV0Y2h5IGRlbGltaXRlci4iKX19KG0sTWF0aC5yb3VuZCgxZTMqQykpLEk9bmV3IEoobSxxKSxSPSh1LzFlMykudG9GaXhlZCgzKSsiZW0iLEg9KE4vMWUzKS50b0ZpeGVkKDMpKyJlbSIsTz1uZXcgSyhbSV0se3dpZHRoOlIsaGVpZ2h0Okgsdmlld0JveDoiMCAwICIrdSsiICIrTn0pLEU9S2UubWFrZVN2Z1NwYW4oW10sW09dLG4pO0UuaGVpZ2h0PU4vMWUzLEUuc3R5bGUud2lkdGg9UixFLnN0eWxlLmhlaWdodD1ILEIucHVzaCh7dHlwZToiZWxlbSIsZWxlbTpFfSl9ZWxzZXtpZihCLnB1c2godXIoYyxwLGEpKSxCLnB1c2goZHIpLG51bGw9PT1zKXt2YXIgTD16LWYteSsuMDE2O0IucHVzaChwcihoLEwsbikpfWVsc2V7dmFyIEQ9KHotZi15LXcpLzIrLjAxNjtCLnB1c2gocHIoaCxELG4pKSxCLnB1c2goZHIpLEIucHVzaCh1cihzLHAsYSkpLEIucHVzaChkciksQi5wdXNoKHByKGgsRCxuKSl9Qi5wdXNoKGRyKSxCLnB1c2godXIobyxwLGEpKX12YXIgVj1uLmhhdmluZ0Jhc2VTdHlsZSh4LlRFWFQpLFA9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOlQsY2hpbGRyZW46Qn0sVik7cmV0dXJuIGhyKEtlLm1ha2VTcGFuKFsiZGVsaW1zaXppbmciLCJtdWx0Il0sW1BdLFYpLHguVEVYVCxuLGkpfSxicj0uMDgseXI9ZnVuY3Rpb24oZSx0LHIsbixhKXt2YXIgaT1mdW5jdGlvbihlLHQscil7dCo9MWUzO3ZhciBuPSIiO3N3aXRjaChlKXtjYXNlInNxcnRNYWluIjpuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIk05NSwiKyg2MjIrZSt0KSsiXG5jLTIuNywwLC03LjE3LC0yLjcsLTEzLjUsLThjLTUuOCwtNS4zLC05LjUsLTEwLC05LjUsLTE0XG5jMCwtMiwwLjMsLTMuMywxLC00YzEuMywtMi43LDIzLjgzLC0yMC43LDY3LjUsLTU0XG5jNDQuMiwtMzMuMyw2NS44LC01MC4zLDY2LjUsLTUxYzEuMywtMS4zLDMsLTIsNSwtMmM0LjcsMCw4LjcsMy4zLDEyLDEwXG5zMTczLDM3OCwxNzMsMzc4YzAuNywwLDM1LjMsLTcxLDEwNCwtMjEzYzY4LjcsLTE0MiwxMzcuNSwtMjg1LDIwNi41LC00MjlcbmM2OSwtMTQ0LDEwNC41LC0yMTcuNywxMDYuNSwtMjIxXG5sIitlLzIuMDc1KyIgLSIrZSsiXG5jNS4zLC05LjMsMTIsLTE0LDIwLC0xNFxuSDQwMDAwMHYiKyg0MCtlKSsiSDg0NS4yNzI0XG5zLTIyNS4yNzIsNDY3LC0yMjUuMjcyLDQ2N3MtMjM1LDQ4NiwtMjM1LDQ4NmMtMi43LDQuNywtOSw3LC0xOSw3XG5jLTYsMCwtMTAsLTEsLTEyLC0zcy0xOTQsLTQyMiwtMTk0LC00MjJzLTY1LDQ3LC02NSw0N3pcbk0iKyg4MzQrZSkrIiAiK3QrImg0MDAwMDB2IisoNDArZSkrImgtNDAwMDAweiJ9KHQsTSk7YnJlYWs7Y2FzZSJzcXJ0U2l6ZTEiOm49ZnVuY3Rpb24oZSx0KXtyZXR1cm4iTTI2MywiKyg2MDErZSt0KSsiYzAuNywwLDE4LDM5LjcsNTIsMTE5XG5jMzQsNzkuMyw2OC4xNjcsMTU4LjcsMTAyLjUsMjM4YzM0LjMsNzkuMyw1MS44LDExOS4zLDUyLjUsMTIwXG5jMzQwLC03MDQuNyw1MTAuNywtMTA2MC4zLDUxMiwtMTA2N1xubCIrZS8yLjA4NCsiIC0iK2UrIlxuYzQuNywtNy4zLDExLC0xMSwxOSwtMTFcbkg0MDAwMHYiKyg0MCtlKSsiSDEwMTIuM1xucy0yNzEuMyw1NjcsLTI3MS4zLDU2N2MtMzguNyw4MC43LC04NCwxNzUsLTEzNiwyODNjLTUyLDEwOCwtODkuMTY3LDE4NS4zLC0xMTEuNSwyMzJcbmMtMjIuMyw0Ni43LC0zMy44LDcwLjMsLTM0LjUsNzFjLTQuNyw0LjcsLTEyLjMsNywtMjMsN3MtMTIsLTEsLTEyLC0xXG5zLTEwOSwtMjUzLC0xMDksLTI1M2MtNzIuNywtMTY4LC0xMDkuMywtMjUyLC0xMTAsLTI1MmMtMTAuNyw4LC0yMiwxNi43LC0zNCwyNlxuYy0yMiwxNy4zLC0zMy4zLDI2LC0zNCwyNnMtMjYsLTI2LC0yNiwtMjZzNzYsLTU5LDc2LC01OXM3NiwtNjAsNzYsLTYwelxuTSIrKDEwMDErZSkrIiAiK3QrImg0MDAwMDB2IisoNDArZSkrImgtNDAwMDAweiJ9KHQsTSk7YnJlYWs7Y2FzZSJzcXJ0U2l6ZTIiOm49ZnVuY3Rpb24oZSx0KXtyZXR1cm4iTTk4MyAiKygxMCtlK3QpKyJcbmwiK2UvMy4xMysiIC0iK2UrIlxuYzQsLTYuNywxMCwtMTAsMTgsLTEwIEg0MDAwMDB2IisoNDArZSkrIlxuSDEwMTMuMXMtODMuNCwyNjgsLTI2NC4xLDg0MGMtMTgwLjcsNTcyLC0yNzcsODc2LjMsLTI4OSw5MTNjLTQuNyw0LjcsLTEyLjcsNywtMjQsN1xucy0xMiwwLC0xMiwwYy0xLjMsLTMuMywtMy43LC0xMS43LC03LC0yNWMtMzUuMywtMTI1LjMsLTEwNi43LC0zNzMuMywtMjE0LC03NDRcbmMtMTAsMTIsLTIxLDI1LC0zMywzOXMtMzIsMzksLTMyLDM5Yy02LC01LjMsLTE1LC0xNCwtMjcsLTI2czI1LC0zMCwyNSwtMzBcbmMyNi43LC0zMi43LDUyLC02Myw3NiwtOTFzNTIsLTYwLDUyLC02MHMyMDgsNzIyLDIwOCw3MjJcbmM1NiwtMTc1LjMsMTI2LjMsLTM5Ny4zLDIxMSwtNjY2Yzg0LjcsLTI2OC43LDE1My44LC00ODguMiwyMDcuNSwtNjU4LjVcbmM1My43LC0xNzAuMyw4NC41LC0yNjYuOCw5Mi41LC0yODkuNXpcbk0iKygxMDAxK2UpKyIgIit0KyJoNDAwMDAwdiIrKDQwK2UpKyJoLTQwMDAwMHoifSh0LE0pO2JyZWFrO2Nhc2Uic3FydFNpemUzIjpuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIk00MjQsIisoMjM5OCtlK3QpKyJcbmMtMS4zLC0wLjcsLTM4LjUsLTE3MiwtMTExLjUsLTUxNGMtNzMsLTM0MiwtMTA5LjgsLTUxMy4zLC0xMTAuNSwtNTE0XG5jMCwtMiwtMTAuNywxNC4zLC0zMiw0OWMtNC43LDcuMywtOS44LDE1LjcsLTE1LjUsMjVjLTUuNyw5LjMsLTkuOCwxNiwtMTIuNSwyMFxucy01LDcsLTUsN2MtNCwtMy4zLC04LjMsLTcuNywtMTMsLTEzcy0xMywtMTMsLTEzLC0xM3M3NiwtMTIyLDc2LC0xMjJzNzcsLTEyMSw3NywtMTIxXG5zMjA5LDk2OCwyMDksOTY4YzAsLTIsODQuNywtMzYxLjcsMjU0LC0xMDc5YzE2OS4zLC03MTcuMywyNTQuNywtMTA3Ny43LDI1NiwtMTA4MVxubCIrZS80LjIyMysiIC0iK2UrImM0LC02LjcsMTAsLTEwLDE4LC0xMCBINDAwMDAwXG52IisoNDArZSkrIkgxMDE0LjZcbnMtODcuMywzNzguNywtMjcyLjYsMTE2NmMtMTg1LjMsNzg3LjMsLTI3OS4zLDExODIuMywtMjgyLDExODVcbmMtMiw2LC0xMCw5LC0yNCw5XG5jLTgsMCwtMTIsLTAuNywtMTIsLTJ6IE0iKygxMDAxK2UpKyIgIit0KyJcbmg0MDAwMDB2IisoNDArZSkrImgtNDAwMDAweiJ9KHQsTSk7YnJlYWs7Y2FzZSJzcXJ0U2l6ZTQiOm49ZnVuY3Rpb24oZSx0KXtyZXR1cm4iTTQ3MywiKygyNzEzK2UrdCkrIlxuYzMzOS4zLC0xNzk5LjMsNTA5LjMsLTI3MDAsNTEwLC0yNzAyIGwiK2UvNS4yOTgrIiAtIitlKyJcbmMzLjMsLTcuMyw5LjMsLTExLDE4LC0xMSBINDAwMDAwdiIrKDQwK2UpKyJIMTAxNy43XG5zLTkwLjUsNDc4LC0yNzYuMiwxNDY2Yy0xODUuNyw5ODgsLTI3OS41LDE0ODMsLTI4MS41LDE0ODVjLTIsNiwtMTAsOSwtMjQsOVxuYy04LDAsLTEyLC0wLjcsLTEyLC0yYzAsLTEuMywtNS4zLC0zMiwtMTYsLTkyYy01MC43LC0yOTMuMywtMTE5LjcsLTY5My4zLC0yMDcsLTEyMDBcbmMwLC0xLjMsLTUuMyw4LjcsLTE2LDMwYy0xMC43LDIxLjMsLTIxLjMsNDIuNywtMzIsNjRzLTE2LDMzLC0xNiwzM3MtMjYsLTI2LC0yNiwtMjZcbnM3NiwtMTUzLDc2LC0xNTNzNzcsLTE1MSw3NywtMTUxYzAuNywwLjcsMzUuNywyMDIsMTA1LDYwNGM2Ny4zLDQwMC43LDEwMiw2MDIuNywxMDQsXG42MDZ6TSIrKDEwMDErZSkrIiAiK3QrImg0MDAwMDB2IisoNDArZSkrIkgxMDE3Ljd6In0odCxNKTticmVhaztjYXNlInNxcnRUYWxsIjpuPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4iTTcwMiAiKyhlK3QpKyJINDAwMDAwIisoNDArZSkrIlxuSDc0MnYiKyhyLTU0LXQtZSkrImwtNCA0LTQgNGMtLjY2Ny43IC0yIDEuNS00IDIuNXMtNC4xNjcgMS44MzMtNi41IDIuNS01LjUgMS05LjUgMVxuaC0xMmwtMjgtODRjLTE2LjY2Ny01Mi05Ni42NjcgLTI5NC4zMzMtMjQwLTcyN2wtMjEyIC02NDMgLTg1IDE3MFxuYy00LTMuMzMzLTguMzMzLTcuNjY3LTEzIC0xM2wtMTMtMTNsNzctMTU1IDc3LTE1NmM2NiAxOTkuMzMzIDEzOSA0MTkuNjY3XG4yMTkgNjYxIGwyMTggNjYxek03MDIgIit0KyJINDAwMDAwdiIrKDQwK2UpKyJINzQyeiJ9KHQsTSxyKX1yZXR1cm4gbn0oZSxuLHIpLG89bmV3IEooZSxpKSxzPW5ldyBLKFtvXSx7d2lkdGg6IjQwMGVtIixoZWlnaHQ6Rih0KSx2aWV3Qm94OiIwIDAgNDAwMDAwICIrcixwcmVzZXJ2ZUFzcGVjdFJhdGlvOiJ4TWluWU1pbiBzbGljZSJ9KTtyZXR1cm4gS2UubWFrZVN2Z1NwYW4oWyJoaWRlLXRhaWwiXSxbc10sYSl9LHhyPVsiKCIsIlxcbHBhcmVuIiwiKSIsIlxccnBhcmVuIiwiWyIsIlxcbGJyYWNrIiwiXSIsIlxccmJyYWNrIiwiXFx7IiwiXFxsYnJhY2UiLCJcXH0iLCJcXHJicmFjZSIsIlxcbGZsb29yIiwiXFxyZmxvb3IiLCJcdTIzMGEiLCJcdTIzMGIiLCJcXGxjZWlsIiwiXFxyY2VpbCIsIlx1MjMwOCIsIlx1MjMwOSIsIlxcc3VyZCJdLHdyPVsiXFx1cGFycm93IiwiXFxkb3duYXJyb3ciLCJcXHVwZG93bmFycm93IiwiXFxVcGFycm93IiwiXFxEb3duYXJyb3ciLCJcXFVwZG93bmFycm93IiwifCIsIlxcfCIsIlxcdmVydCIsIlxcVmVydCIsIlxcbHZlcnQiLCJcXHJ2ZXJ0IiwiXFxsVmVydCIsIlxcclZlcnQiLCJcXGxncm91cCIsIlxccmdyb3VwIiwiXHUyN2VlIiwiXHUyN2VmIiwiXFxsbW91c3RhY2hlIiwiXFxybW91c3RhY2hlIiwiXHUyM2IwIiwiXHUyM2IxIl0sa3I9WyI8IiwiPiIsIlxcbGFuZ2xlIiwiXFxyYW5nbGUiLCIvIiwiXFxiYWNrc2xhc2giLCJcXGx0IiwiXFxndCJdLFNyPVswLDEuMiwxLjgsMi40LDNdLE1yPVt7dHlwZToic21hbGwiLHN0eWxlOnguU0NSSVBUU0NSSVBUfSx7dHlwZToic21hbGwiLHN0eWxlOnguU0NSSVBUfSx7dHlwZToic21hbGwiLHN0eWxlOnguVEVYVH0se3R5cGU6ImxhcmdlIixzaXplOjF9LHt0eXBlOiJsYXJnZSIsc2l6ZToyfSx7dHlwZToibGFyZ2UiLHNpemU6M30se3R5cGU6ImxhcmdlIixzaXplOjR9XSx6cj1be3R5cGU6InNtYWxsIixzdHlsZTp4LlNDUklQVFNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTp4LlNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTp4LlRFWFR9LHt0eXBlOiJzdGFjayJ9XSxBcj1be3R5cGU6InNtYWxsIixzdHlsZTp4LlNDUklQVFNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTp4LlNDUklQVH0se3R5cGU6InNtYWxsIixzdHlsZTp4LlRFWFR9LHt0eXBlOiJsYXJnZSIsc2l6ZToxfSx7dHlwZToibGFyZ2UiLHNpemU6Mn0se3R5cGU6ImxhcmdlIixzaXplOjN9LHt0eXBlOiJsYXJnZSIsc2l6ZTo0fSx7dHlwZToic3RhY2sifV0sVHI9ZnVuY3Rpb24oZSl7aWYoInNtYWxsIj09PWUudHlwZSlyZXR1cm4iTWFpbi1SZWd1bGFyIjtpZigibGFyZ2UiPT09ZS50eXBlKXJldHVybiJTaXplIitlLnNpemUrIi1SZWd1bGFyIjtpZigic3RhY2siPT09ZS50eXBlKXJldHVybiJTaXplNC1SZWd1bGFyIjt0aHJvdyBuZXcgRXJyb3IoIkFkZCBzdXBwb3J0IGZvciBkZWxpbSB0eXBlICciK2UudHlwZSsiJyBoZXJlLiIpfSxCcj1mdW5jdGlvbihlLHQscixuKXtmb3IodmFyIGE9TWF0aC5taW4oMiwzLW4uc3R5bGUuc2l6ZSk7YTxyLmxlbmd0aCYmInN0YWNrIiE9PXJbYV0udHlwZTthKyspe3ZhciBpPWxyKGUsVHIoclthXSksIm1hdGgiKSxvPWkuaGVpZ2h0K2kuZGVwdGg7aWYoInNtYWxsIj09PXJbYV0udHlwZSYmKG8qPW4uaGF2aW5nQmFzZVN0eWxlKHJbYV0uc3R5bGUpLnNpemVNdWx0aXBsaWVyKSxvPnQpcmV0dXJuIHJbYV19cmV0dXJuIHJbci5sZW5ndGgtMV19LENyPWZ1bmN0aW9uKGUsdCxyLG4sYSxpKXt2YXIgbzsiPCI9PT1lfHwiXFxsdCI9PT1lfHwiXHUyN2U4Ij09PWU/ZT0iXFxsYW5nbGUiOiI+IiE9PWUmJiJcXGd0IiE9PWUmJiJcdTI3ZTkiIT09ZXx8KGU9IlxccmFuZ2xlIiksbz1sLmNvbnRhaW5zKGtyLGUpP01yOmwuY29udGFpbnMoeHIsZSk/QXI6enI7dmFyIHM9QnIoZSx0LG8sbik7cmV0dXJuInNtYWxsIj09PXMudHlwZT9mdW5jdGlvbihlLHQscixuLGEsaSl7dmFyIG89S2UubWFrZVN5bWJvbChlLCJNYWluLVJlZ3VsYXIiLGEsbikscz1ocihvLHQsbixpKTtyZXR1cm4gciYmY3IocyxuLHQpLHN9KGUscy5zdHlsZSxyLG4sYSxpKToibGFyZ2UiPT09cy50eXBlP21yKGUscy5zaXplLHIsbixhLGkpOnZyKGUsdCxyLG4sYSxpKX0sTnI9e3NxcnRJbWFnZTpmdW5jdGlvbihlLHQpe3ZhciByLG4sYT10LmhhdmluZ0Jhc2VTaXppbmcoKSxpPUJyKCJcXHN1cmQiLGUqYS5zaXplTXVsdGlwbGllcixBcixhKSxvPWEuc2l6ZU11bHRpcGxpZXIscz1NYXRoLm1heCgwLHQubWluUnVsZVRoaWNrbmVzcy10LmZvbnRNZXRyaWNzKCkuc3FydFJ1bGVUaGlja25lc3MpLGw9MCxoPTAsYz0wO3JldHVybiJzbWFsbCI9PT1pLnR5cGU/KGU8MT9vPTE6ZTwxLjQmJihvPS43KSxoPSgxK3MpL28sKHI9eXIoInNxcnRNYWluIixsPSgxK3MrYnIpL28sYz0xZTMrMWUzKnMrODAscyx0KSkuc3R5bGUubWluV2lkdGg9IjAuODUzZW0iLG49LjgzMy9vKToibGFyZ2UiPT09aS50eXBlPyhjPTEwODAqU3JbaS5zaXplXSxoPShTcltpLnNpemVdK3MpL28sbD0oU3JbaS5zaXplXStzK2JyKS9vLChyPXlyKCJzcXJ0U2l6ZSIraS5zaXplLGwsYyxzLHQpKS5zdHlsZS5taW5XaWR0aD0iMS4wMmVtIixuPTEvbyk6KGw9ZStzK2JyLGg9ZStzLGM9TWF0aC5mbG9vcigxZTMqZStzKSs4MCwocj15cigic3FydFRhbGwiLGwsYyxzLHQpKS5zdHlsZS5taW5XaWR0aD0iMC43NDJlbSIsbj0xLjA1Niksci5oZWlnaHQ9aCxyLnN0eWxlLmhlaWdodD1GKGwpLHtzcGFuOnIsYWR2YW5jZVdpZHRoOm4scnVsZVdpZHRoOih0LmZvbnRNZXRyaWNzKCkuc3FydFJ1bGVUaGlja25lc3Mrcykqb319LHNpemVkRGVsaW06ZnVuY3Rpb24oZSx0LHIsYSxpKXtpZigiPCI9PT1lfHwiXFxsdCI9PT1lfHwiXHUyN2U4Ij09PWU/ZT0iXFxsYW5nbGUiOiI+IiE9PWUmJiJcXGd0IiE9PWUmJiJcdTI3ZTkiIT09ZXx8KGU9IlxccmFuZ2xlIiksbC5jb250YWlucyh4cixlKXx8bC5jb250YWlucyhrcixlKSlyZXR1cm4gbXIoZSx0LCExLHIsYSxpKTtpZihsLmNvbnRhaW5zKHdyLGUpKXJldHVybiB2cihlLFNyW3RdLCExLHIsYSxpKTt0aHJvdyBuZXcgbigiSWxsZWdhbCBkZWxpbWl0ZXI6ICciK2UrIiciKX0sc2l6ZVRvTWF4SGVpZ2h0OlNyLGN1c3RvbVNpemVkRGVsaW06Q3IsbGVmdFJpZ2h0RGVsaW06ZnVuY3Rpb24oZSx0LHIsbixhLGkpe3ZhciBvPW4uZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0Km4uc2l6ZU11bHRpcGxpZXIscz01L24uZm9udE1ldHJpY3MoKS5wdFBlckVtLGw9TWF0aC5tYXgodC1vLHIrbyksaD1NYXRoLm1heChsLzUwMCo5MDEsMipsLXMpO3JldHVybiBDcihlLGgsITAsbixhLGkpfX0scXI9eyJcXGJpZ2wiOnttY2xhc3M6Im1vcGVuIixzaXplOjF9LCJcXEJpZ2wiOnttY2xhc3M6Im1vcGVuIixzaXplOjJ9LCJcXGJpZ2dsIjp7bWNsYXNzOiJtb3BlbiIsc2l6ZTozfSwiXFxCaWdnbCI6e21jbGFzczoibW9wZW4iLHNpemU6NH0sIlxcYmlnciI6e21jbGFzczoibWNsb3NlIixzaXplOjF9LCJcXEJpZ3IiOnttY2xhc3M6Im1jbG9zZSIsc2l6ZToyfSwiXFxiaWdnciI6e21jbGFzczoibWNsb3NlIixzaXplOjN9LCJcXEJpZ2dyIjp7bWNsYXNzOiJtY2xvc2UiLHNpemU6NH0sIlxcYmlnbSI6e21jbGFzczoibXJlbCIsc2l6ZToxfSwiXFxCaWdtIjp7bWNsYXNzOiJtcmVsIixzaXplOjJ9LCJcXGJpZ2dtIjp7bWNsYXNzOiJtcmVsIixzaXplOjN9LCJcXEJpZ2dtIjp7bWNsYXNzOiJtcmVsIixzaXplOjR9LCJcXGJpZyI6e21jbGFzczoibW9yZCIsc2l6ZToxfSwiXFxCaWciOnttY2xhc3M6Im1vcmQiLHNpemU6Mn0sIlxcYmlnZyI6e21jbGFzczoibW9yZCIsc2l6ZTozfSwiXFxCaWdnIjp7bWNsYXNzOiJtb3JkIixzaXplOjR9fSxJcj1bIigiLCJcXGxwYXJlbiIsIikiLCJcXHJwYXJlbiIsIlsiLCJcXGxicmFjayIsIl0iLCJcXHJicmFjayIsIlxceyIsIlxcbGJyYWNlIiwiXFx9IiwiXFxyYnJhY2UiLCJcXGxmbG9vciIsIlxccmZsb29yIiwiXHUyMzBhIiwiXHUyMzBiIiwiXFxsY2VpbCIsIlxccmNlaWwiLCJcdTIzMDgiLCJcdTIzMDkiLCI8IiwiPiIsIlxcbGFuZ2xlIiwiXHUyN2U4IiwiXFxyYW5nbGUiLCJcdTI3ZTkiLCJcXGx0IiwiXFxndCIsIlxcbHZlcnQiLCJcXHJ2ZXJ0IiwiXFxsVmVydCIsIlxcclZlcnQiLCJcXGxncm91cCIsIlxccmdyb3VwIiwiXHUyN2VlIiwiXHUyN2VmIiwiXFxsbW91c3RhY2hlIiwiXFxybW91c3RhY2hlIiwiXHUyM2IwIiwiXHUyM2IxIiwiLyIsIlxcYmFja3NsYXNoIiwifCIsIlxcdmVydCIsIlxcfCIsIlxcVmVydCIsIlxcdXBhcnJvdyIsIlxcVXBhcnJvdyIsIlxcZG93bmFycm93IiwiXFxEb3duYXJyb3ciLCJcXHVwZG93bmFycm93IiwiXFxVcGRvd25hcnJvdyIsIi4iXTtmdW5jdGlvbiBScihlLHQpe3ZhciByPVh0KGUpO2lmKHImJmwuY29udGFpbnMoSXIsci50ZXh0KSlyZXR1cm4gcjt0aHJvdyBuZXcgbihyPyJJbnZhbGlkIGRlbGltaXRlciAnIityLnRleHQrIicgYWZ0ZXIgJyIrdC5mdW5jTmFtZSsiJyI6IkludmFsaWQgZGVsaW1pdGVyIHR5cGUgJyIrZS50eXBlKyInIixlKX1mdW5jdGlvbiBIcihlKXtpZighZS5ib2R5KXRocm93IG5ldyBFcnJvcigiQnVnOiBUaGUgbGVmdHJpZ2h0IFBhcnNlTm9kZSB3YXNuJ3QgZnVsbHkgcGFyc2VkLiIpfW90KHt0eXBlOiJkZWxpbXNpemluZyIsbmFtZXM6WyJcXGJpZ2wiLCJcXEJpZ2wiLCJcXGJpZ2dsIiwiXFxCaWdnbCIsIlxcYmlnciIsIlxcQmlnciIsIlxcYmlnZ3IiLCJcXEJpZ2dyIiwiXFxiaWdtIiwiXFxCaWdtIiwiXFxiaWdnbSIsIlxcQmlnZ20iLCJcXGJpZyIsIlxcQmlnIiwiXFxiaWdnIiwiXFxCaWdnIl0scHJvcHM6e251bUFyZ3M6MSxhcmdUeXBlczpbInByaW1pdGl2ZSJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9UnIodFswXSxlKTtyZXR1cm57dHlwZToiZGVsaW1zaXppbmciLG1vZGU6ZS5wYXJzZXIubW9kZSxzaXplOnFyW2UuZnVuY05hbWVdLnNpemUsbWNsYXNzOnFyW2UuZnVuY05hbWVdLm1jbGFzcyxkZWxpbTpyLnRleHR9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiIuIj09PWUuZGVsaW0/S2UubWFrZVNwYW4oW2UubWNsYXNzXSk6TnIuc2l6ZWREZWxpbShlLmRlbGltLGUuc2l6ZSx0LGUubW9kZSxbZS5tY2xhc3NdKX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlKXt2YXIgdD1bXTsiLiIhPT1lLmRlbGltJiZ0LnB1c2goQnQoZS5kZWxpbSxlLm1vZGUpKTt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm1vIix0KTsibW9wZW4iPT09ZS5tY2xhc3N8fCJtY2xvc2UiPT09ZS5tY2xhc3M/ci5zZXRBdHRyaWJ1dGUoImZlbmNlIiwidHJ1ZSIpOnIuc2V0QXR0cmlidXRlKCJmZW5jZSIsImZhbHNlIiksci5zZXRBdHRyaWJ1dGUoInN0cmV0Y2h5IiwidHJ1ZSIpO3ZhciBuPUYoTnIuc2l6ZVRvTWF4SGVpZ2h0W2Uuc2l6ZV0pO3JldHVybiByLnNldEF0dHJpYnV0ZSgibWluc2l6ZSIsbiksci5zZXRBdHRyaWJ1dGUoIm1heHNpemUiLG4pLHJ9fSksb3Qoe3R5cGU6ImxlZnRyaWdodC1yaWdodCIsbmFtZXM6WyJcXHJpZ2h0Il0scHJvcHM6e251bUFyZ3M6MSxwcmltaXRpdmU6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlci5ndWxsZXQubWFjcm9zLmdldCgiXFxjdXJyZW50QGNvbG9yIik7aWYociYmInN0cmluZyIhPXR5cGVvZiByKXRocm93IG5ldyBuKCJcXGN1cnJlbnRAY29sb3Igc2V0IHRvIG5vbi1zdHJpbmcgaW4gXFxyaWdodCIpO3JldHVybnt0eXBlOiJsZWZ0cmlnaHQtcmlnaHQiLG1vZGU6ZS5wYXJzZXIubW9kZSxkZWxpbTpScih0WzBdLGUpLnRleHQsY29sb3I6cn19fSksb3Qoe3R5cGU6ImxlZnRyaWdodCIsbmFtZXM6WyJcXGxlZnQiXSxwcm9wczp7bnVtQXJnczoxLHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPVJyKHRbMF0sZSksbj1lLnBhcnNlcjsrK24ubGVmdHJpZ2h0RGVwdGg7dmFyIGE9bi5wYXJzZUV4cHJlc3Npb24oITEpOy0tbi5sZWZ0cmlnaHREZXB0aCxuLmV4cGVjdCgiXFxyaWdodCIsITEpO3ZhciBpPVV0KG4ucGFyc2VGdW5jdGlvbigpLCJsZWZ0cmlnaHQtcmlnaHQiKTtyZXR1cm57dHlwZToibGVmdHJpZ2h0Iixtb2RlOm4ubW9kZSxib2R5OmEsbGVmdDpyLnRleHQscmlnaHQ6aS5kZWxpbSxyaWdodENvbG9yOmkuY29sb3J9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe0hyKGUpO2Zvcih2YXIgcixuLGE9ZnQoZS5ib2R5LHQsITAsWyJtb3BlbiIsIm1jbG9zZSJdKSxpPTAsbz0wLHM9ITEsbD0wO2w8YS5sZW5ndGg7bCsrKWFbbF0uaXNNaWRkbGU/cz0hMDooaT1NYXRoLm1heChhW2xdLmhlaWdodCxpKSxvPU1hdGgubWF4KGFbbF0uZGVwdGgsbykpO2lmKGkqPXQuc2l6ZU11bHRpcGxpZXIsbyo9dC5zaXplTXVsdGlwbGllcixyPSIuIj09PWUubGVmdD94dCh0LFsibW9wZW4iXSk6TnIubGVmdFJpZ2h0RGVsaW0oZS5sZWZ0LGksbyx0LGUubW9kZSxbIm1vcGVuIl0pLGEudW5zaGlmdChyKSxzKWZvcih2YXIgaD0xO2g8YS5sZW5ndGg7aCsrKXt2YXIgYz1hW2hdLmlzTWlkZGxlO2MmJihhW2hdPU5yLmxlZnRSaWdodERlbGltKGMuZGVsaW0saSxvLGMub3B0aW9ucyxlLm1vZGUsW10pKX1pZigiLiI9PT1lLnJpZ2h0KW49eHQodCxbIm1jbG9zZSJdKTtlbHNle3ZhciBtPWUucmlnaHRDb2xvcj90LndpdGhDb2xvcihlLnJpZ2h0Q29sb3IpOnQ7bj1Oci5sZWZ0UmlnaHREZWxpbShlLnJpZ2h0LGksbyxtLGUubW9kZSxbIm1jbG9zZSJdKX1yZXR1cm4gYS5wdXNoKG4pLEtlLm1ha2VTcGFuKFsibWlubmVyIl0sYSx0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe0hyKGUpO3ZhciByPXF0KGUuYm9keSx0KTtpZigiLiIhPT1lLmxlZnQpe3ZhciBuPW5ldyBUdC5NYXRoTm9kZSgibW8iLFtCdChlLmxlZnQsZS5tb2RlKV0pO24uc2V0QXR0cmlidXRlKCJmZW5jZSIsInRydWUiKSxyLnVuc2hpZnQobil9aWYoIi4iIT09ZS5yaWdodCl7dmFyIGE9bmV3IFR0Lk1hdGhOb2RlKCJtbyIsW0J0KGUucmlnaHQsZS5tb2RlKV0pO2Euc2V0QXR0cmlidXRlKCJmZW5jZSIsInRydWUiKSxlLnJpZ2h0Q29sb3ImJmEuc2V0QXR0cmlidXRlKCJtYXRoY29sb3IiLGUucmlnaHRDb2xvciksci5wdXNoKGEpfXJldHVybiBDdChyKX19KSxvdCh7dHlwZToibWlkZGxlIixuYW1lczpbIlxcbWlkZGxlIl0scHJvcHM6e251bUFyZ3M6MSxwcmltaXRpdmU6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1Scih0WzBdLGUpO2lmKCFlLnBhcnNlci5sZWZ0cmlnaHREZXB0aCl0aHJvdyBuZXcgbigiXFxtaWRkbGUgd2l0aG91dCBwcmVjZWRpbmcgXFxsZWZ0IixyKTtyZXR1cm57dHlwZToibWlkZGxlIixtb2RlOmUucGFyc2VyLm1vZGUsZGVsaW06ci50ZXh0fX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcjtpZigiLiI9PT1lLmRlbGltKXI9eHQodCxbXSk7ZWxzZXtyPU5yLnNpemVkRGVsaW0oZS5kZWxpbSwxLHQsZS5tb2RlLFtdKTt2YXIgbj17ZGVsaW06ZS5kZWxpbSxvcHRpb25zOnR9O3IuaXNNaWRkbGU9bn1yZXR1cm4gcn0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPSJcXHZlcnQiPT09ZS5kZWxpbXx8InwiPT09ZS5kZWxpbT9CdCgifCIsInRleHQiKTpCdChlLmRlbGltLGUubW9kZSksbj1uZXcgVHQuTWF0aE5vZGUoIm1vIixbcl0pO3JldHVybiBuLnNldEF0dHJpYnV0ZSgiZmVuY2UiLCJ0cnVlIiksbi5zZXRBdHRyaWJ1dGUoImxzcGFjZSIsIjAuMDVlbSIpLG4uc2V0QXR0cmlidXRlKCJyc3BhY2UiLCIwLjA1ZW0iKSxufX0pO3ZhciBPcj1mdW5jdGlvbihlLHQpe3ZhciByLG4sYSxpPUtlLndyYXBGcmFnbWVudCh3dChlLmJvZHksdCksdCksbz1lLmxhYmVsLnNsaWNlKDEpLHM9dC5zaXplTXVsdGlwbGllcixoPTAsYz1sLmlzQ2hhcmFjdGVyQm94KGUuYm9keSk7aWYoInNvdXQiPT09bykocj1LZS5tYWtlU3BhbihbInN0cmV0Y2h5Iiwic291dCJdKSkuaGVpZ2h0PXQuZm9udE1ldHJpY3MoKS5kZWZhdWx0UnVsZVRoaWNrbmVzcy9zLGg9LS41KnQuZm9udE1ldHJpY3MoKS54SGVpZ2h0O2Vsc2UgaWYoInBoYXNlIj09PW8pe3ZhciBtPVAoe251bWJlcjouNix1bml0OiJwdCJ9LHQpLHU9UCh7bnVtYmVyOi4zNSx1bml0OiJleCJ9LHQpO3MvPXQuaGF2aW5nQmFzZVNpemluZygpLnNpemVNdWx0aXBsaWVyO3ZhciBwPWkuaGVpZ2h0K2kuZGVwdGgrbSt1O2kuc3R5bGUucGFkZGluZ0xlZnQ9RihwLzIrbSk7dmFyIGQ9TWF0aC5mbG9vcigxZTMqcCpzKSxmPSJNNDAwMDAwICIrKG49ZCkrIiBIMCBMIituLzIrIiAwIGw2NSA0NSBMMTQ1ICIrKG4tODApKyIgSDQwMDAwMHoiLGc9bmV3IEsoW25ldyBKKCJwaGFzZSIsZildLHt3aWR0aDoiNDAwZW0iLGhlaWdodDpGKGQvMWUzKSx2aWV3Qm94OiIwIDAgNDAwMDAwICIrZCxwcmVzZXJ2ZUFzcGVjdFJhdGlvOiJ4TWluWU1pbiBzbGljZSJ9KTsocj1LZS5tYWtlU3ZnU3BhbihbImhpZGUtdGFpbCJdLFtnXSx0KSkuc3R5bGUuaGVpZ2h0PUYocCksaD1pLmRlcHRoK20rdX1lbHNley9jYW5jZWwvLnRlc3Qobyk/Y3x8aS5jbGFzc2VzLnB1c2goImNhbmNlbC1wYWQiKToiYW5nbCI9PT1vP2kuY2xhc3Nlcy5wdXNoKCJhbmdscGFkIik6aS5jbGFzc2VzLnB1c2goImJveHBhZCIpO3ZhciB2PTAsYj0wLHk9MDsvYm94Ly50ZXN0KG8pPyh5PU1hdGgubWF4KHQuZm9udE1ldHJpY3MoKS5mYm94cnVsZSx0Lm1pblJ1bGVUaGlja25lc3MpLGI9dj10LmZvbnRNZXRyaWNzKCkuZmJveHNlcCsoImNvbG9yYm94Ij09PW8/MDp5KSk6ImFuZ2wiPT09bz8odj00Kih5PU1hdGgubWF4KHQuZm9udE1ldHJpY3MoKS5kZWZhdWx0UnVsZVRoaWNrbmVzcyx0Lm1pblJ1bGVUaGlja25lc3MpKSxiPU1hdGgubWF4KDAsLjI1LWkuZGVwdGgpKTpiPXY9Yz8uMjowLHI9UHQoaSxvLHYsYix0KSwvZmJveHxib3hlZHxmY29sb3Jib3gvLnRlc3Qobyk/KHIuc3R5bGUuYm9yZGVyU3R5bGU9InNvbGlkIixyLnN0eWxlLmJvcmRlcldpZHRoPUYoeSkpOiJhbmdsIj09PW8mJi4wNDkhPT15JiYoci5zdHlsZS5ib3JkZXJUb3BXaWR0aD1GKHkpLHIuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aD1GKHkpKSxoPWkuZGVwdGgrYixlLmJhY2tncm91bmRDb2xvciYmKHIuc3R5bGUuYmFja2dyb3VuZENvbG9yPWUuYmFja2dyb3VuZENvbG9yLGUuYm9yZGVyQ29sb3ImJihyLnN0eWxlLmJvcmRlckNvbG9yPWUuYm9yZGVyQ29sb3IpKX1pZihlLmJhY2tncm91bmRDb2xvcilhPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyLHNoaWZ0Omh9LHt0eXBlOiJlbGVtIixlbGVtOmksc2hpZnQ6MH1dfSx0KTtlbHNle3ZhciB4PS9jYW5jZWx8cGhhc2UvLnRlc3Qobyk/WyJzdmctYWxpZ24iXTpbXTthPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTppLHNoaWZ0OjB9LHt0eXBlOiJlbGVtIixlbGVtOnIsc2hpZnQ6aCx3cmFwcGVyQ2xhc3Nlczp4fV19LHQpfXJldHVybi9jYW5jZWwvLnRlc3QobykmJihhLmhlaWdodD1pLmhlaWdodCxhLmRlcHRoPWkuZGVwdGgpLC9jYW5jZWwvLnRlc3QobykmJiFjP0tlLm1ha2VTcGFuKFsibW9yZCIsImNhbmNlbC1sYXAiXSxbYV0sdCk6S2UubWFrZVNwYW4oWyJtb3JkIl0sW2FdLHQpfSxFcj1mdW5jdGlvbihlLHQpe3ZhciByPTAsbj1uZXcgVHQuTWF0aE5vZGUoZS5sYWJlbC5pbmRleE9mKCJjb2xvcmJveCIpPi0xPyJtcGFkZGVkIjoibWVuY2xvc2UiLFtSdChlLmJvZHksdCldKTtzd2l0Y2goZS5sYWJlbCl7Y2FzZSJcXGNhbmNlbCI6bi5zZXRBdHRyaWJ1dGUoIm5vdGF0aW9uIiwidXBkaWFnb25hbHN0cmlrZSIpO2JyZWFrO2Nhc2UiXFxiY2FuY2VsIjpuLnNldEF0dHJpYnV0ZSgibm90YXRpb24iLCJkb3duZGlhZ29uYWxzdHJpa2UiKTticmVhaztjYXNlIlxccGhhc2UiOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsInBoYXNvcmFuZ2xlIik7YnJlYWs7Y2FzZSJcXHNvdXQiOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsImhvcml6b250YWxzdHJpa2UiKTticmVhaztjYXNlIlxcZmJveCI6bi5zZXRBdHRyaWJ1dGUoIm5vdGF0aW9uIiwiYm94Iik7YnJlYWs7Y2FzZSJcXGFuZ2wiOm4uc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsImFjdHVhcmlhbCIpO2JyZWFrO2Nhc2UiXFxmY29sb3Jib3giOmNhc2UiXFxjb2xvcmJveCI6aWYocj10LmZvbnRNZXRyaWNzKCkuZmJveHNlcCp0LmZvbnRNZXRyaWNzKCkucHRQZXJFbSxuLnNldEF0dHJpYnV0ZSgid2lkdGgiLCIrIisyKnIrInB0Iiksbi5zZXRBdHRyaWJ1dGUoImhlaWdodCIsIisiKzIqcisicHQiKSxuLnNldEF0dHJpYnV0ZSgibHNwYWNlIixyKyJwdCIpLG4uc2V0QXR0cmlidXRlKCJ2b2Zmc2V0IixyKyJwdCIpLCJcXGZjb2xvcmJveCI9PT1lLmxhYmVsKXt2YXIgYT1NYXRoLm1heCh0LmZvbnRNZXRyaWNzKCkuZmJveHJ1bGUsdC5taW5SdWxlVGhpY2tuZXNzKTtuLnNldEF0dHJpYnV0ZSgic3R5bGUiLCJib3JkZXI6ICIrYSsiZW0gc29saWQgIitTdHJpbmcoZS5ib3JkZXJDb2xvcikpfWJyZWFrO2Nhc2UiXFx4Y2FuY2VsIjpuLnNldEF0dHJpYnV0ZSgibm90YXRpb24iLCJ1cGRpYWdvbmFsc3RyaWtlIGRvd25kaWFnb25hbHN0cmlrZSIpfXJldHVybiBlLmJhY2tncm91bmRDb2xvciYmbi5zZXRBdHRyaWJ1dGUoIm1hdGhiYWNrZ3JvdW5kIixlLmJhY2tncm91bmRDb2xvciksbn07b3Qoe3R5cGU6ImVuY2xvc2UiLG5hbWVzOlsiXFxjb2xvcmJveCJdLHByb3BzOntudW1BcmdzOjIsYWxsb3dlZEluVGV4dDohMCxhcmdUeXBlczpbImNvbG9yIiwidGV4dCJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLnBhcnNlcixhPWUuZnVuY05hbWUsaT1VdCh0WzBdLCJjb2xvci10b2tlbiIpLmNvbG9yLG89dFsxXTtyZXR1cm57dHlwZToiZW5jbG9zZSIsbW9kZTpuLm1vZGUsbGFiZWw6YSxiYWNrZ3JvdW5kQ29sb3I6aSxib2R5Om99fSxodG1sQnVpbGRlcjpPcixtYXRobWxCdWlsZGVyOkVyfSksb3Qoe3R5cGU6ImVuY2xvc2UiLG5hbWVzOlsiXFxmY29sb3Jib3giXSxwcm9wczp7bnVtQXJnczozLGFsbG93ZWRJblRleHQ6ITAsYXJnVHlwZXM6WyJjb2xvciIsImNvbG9yIiwidGV4dCJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLnBhcnNlcixhPWUuZnVuY05hbWUsaT1VdCh0WzBdLCJjb2xvci10b2tlbiIpLmNvbG9yLG89VXQodFsxXSwiY29sb3ItdG9rZW4iKS5jb2xvcixzPXRbMl07cmV0dXJue3R5cGU6ImVuY2xvc2UiLG1vZGU6bi5tb2RlLGxhYmVsOmEsYmFja2dyb3VuZENvbG9yOm8sYm9yZGVyQ29sb3I6aSxib2R5OnN9fSxodG1sQnVpbGRlcjpPcixtYXRobWxCdWlsZGVyOkVyfSksb3Qoe3R5cGU6ImVuY2xvc2UiLG5hbWVzOlsiXFxmYm94Il0scHJvcHM6e251bUFyZ3M6MSxhcmdUeXBlczpbImhib3giXSxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJue3R5cGU6ImVuY2xvc2UiLG1vZGU6ZS5wYXJzZXIubW9kZSxsYWJlbDoiXFxmYm94Iixib2R5OnRbMF19fX0pLG90KHt0eXBlOiJlbmNsb3NlIixuYW1lczpbIlxcY2FuY2VsIiwiXFxiY2FuY2VsIiwiXFx4Y2FuY2VsIiwiXFxzb3V0IiwiXFxwaGFzZSJdLHByb3BzOntudW1BcmdzOjF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT10WzBdO3JldHVybnt0eXBlOiJlbmNsb3NlIixtb2RlOnIubW9kZSxsYWJlbDpuLGJvZHk6YX19LGh0bWxCdWlsZGVyOk9yLG1hdGhtbEJ1aWxkZXI6RXJ9KSxvdCh7dHlwZToiZW5jbG9zZSIsbmFtZXM6WyJcXGFuZ2wiXSxwcm9wczp7bnVtQXJnczoxLGFyZ1R5cGVzOlsiaGJveCJdLGFsbG93ZWRJblRleHQ6ITF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXtyZXR1cm57dHlwZToiZW5jbG9zZSIsbW9kZTplLnBhcnNlci5tb2RlLGxhYmVsOiJcXGFuZ2wiLGJvZHk6dFswXX19fSk7dmFyIExyPXt9O2Z1bmN0aW9uIERyKGUpe2Zvcih2YXIgdD1lLnR5cGUscj1lLm5hbWVzLG49ZS5wcm9wcyxhPWUuaGFuZGxlcixpPWUuaHRtbEJ1aWxkZXIsbz1lLm1hdGhtbEJ1aWxkZXIscz17dHlwZTp0LG51bUFyZ3M6bi5udW1BcmdzfHwwLGFsbG93ZWRJblRleHQ6ITEsbnVtT3B0aW9uYWxBcmdzOjAsaGFuZGxlcjphfSxsPTA7bDxyLmxlbmd0aDsrK2wpTHJbcltsXV09cztpJiYoYXRbdF09aSksbyYmKGl0W3RdPW8pfXZhciBWcj17fTtmdW5jdGlvbiBQcihlLHQpe1ZyW2VdPXR9dmFyIEZyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQscil7dGhpcy5sZXhlcj12b2lkIDAsdGhpcy5zdGFydD12b2lkIDAsdGhpcy5lbmQ9dm9pZCAwLHRoaXMubGV4ZXI9ZSx0aGlzLnN0YXJ0PXQsdGhpcy5lbmQ9cn1yZXR1cm4gZS5yYW5nZT1mdW5jdGlvbih0LHIpe3JldHVybiByP3QmJnQubG9jJiZyLmxvYyYmdC5sb2MubGV4ZXI9PT1yLmxvYy5sZXhlcj9uZXcgZSh0LmxvYy5sZXhlcix0LmxvYy5zdGFydCxyLmxvYy5lbmQpOm51bGw6dCYmdC5sb2N9LGV9KCksR3I9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dGhpcy50ZXh0PXZvaWQgMCx0aGlzLmxvYz12b2lkIDAsdGhpcy5ub2V4cGFuZD12b2lkIDAsdGhpcy50cmVhdEFzUmVsYXg9dm9pZCAwLHRoaXMudGV4dD1lLHRoaXMubG9jPXR9cmV0dXJuIGUucHJvdG90eXBlLnJhbmdlPWZ1bmN0aW9uKHQscil7cmV0dXJuIG5ldyBlKHIsRnIucmFuZ2UodGhpcyx0KSl9LGV9KCk7ZnVuY3Rpb24gVXIoZSl7dmFyIHQ9W107ZS5jb25zdW1lU3BhY2VzKCk7dmFyIHI9ZS5mZXRjaCgpLnRleHQ7Zm9yKCJcXHJlbGF4Ij09PXImJihlLmNvbnN1bWUoKSxlLmNvbnN1bWVTcGFjZXMoKSxyPWUuZmV0Y2goKS50ZXh0KTsiXFxobGluZSI9PT1yfHwiXFxoZGFzaGxpbmUiPT09cjspZS5jb25zdW1lKCksdC5wdXNoKCJcXGhkYXNobGluZSI9PT1yKSxlLmNvbnN1bWVTcGFjZXMoKSxyPWUuZmV0Y2goKS50ZXh0O3JldHVybiB0fXZhciBZcj1mdW5jdGlvbihlKXtpZighZS5wYXJzZXIuc2V0dGluZ3MuZGlzcGxheU1vZGUpdGhyb3cgbmV3IG4oInsiK2UuZW52TmFtZSsifSBjYW4gYmUgdXNlZCBvbmx5IGluIGRpc3BsYXkgbW9kZS4iKX07ZnVuY3Rpb24gWHIoZSl7aWYoLTE9PT1lLmluZGV4T2YoImVkIikpcmV0dXJuLTE9PT1lLmluZGV4T2YoIioiKX1mdW5jdGlvbiBXcihlLHQscil7dmFyIGE9dC5oc2tpcEJlZm9yZUFuZEFmdGVyLGk9dC5hZGRKb3Qsbz10LmNvbHMscz10LmFycmF5c3RyZXRjaCxsPXQuY29sU2VwYXJhdGlvblR5cGUsaD10LmF1dG9UYWcsYz10LnNpbmdsZVJvdyxtPXQuZW1wdHlTaW5nbGVSb3csdT10Lm1heE51bUNvbHMscD10LmxlcW5vO2lmKGUuZ3VsbGV0LmJlZ2luR3JvdXAoKSxjfHxlLmd1bGxldC5tYWNyb3Muc2V0KCJcXGNyIiwiXFxcXFxccmVsYXgiKSwhcyl7dmFyIGQ9ZS5ndWxsZXQuZXhwYW5kTWFjcm9Bc1RleHQoIlxcYXJyYXlzdHJldGNoIik7aWYobnVsbD09ZClzPTE7ZWxzZSBpZighKHM9cGFyc2VGbG9hdChkKSl8fHM8MCl0aHJvdyBuZXcgbigiSW52YWxpZCBcXGFycmF5c3RyZXRjaDogIitkKX1lLmd1bGxldC5iZWdpbkdyb3VwKCk7dmFyIGY9W10sZz1bZl0sdj1bXSxiPVtdLHk9bnVsbCE9aD9bXTp2b2lkIDA7ZnVuY3Rpb24geCgpe2gmJmUuZ3VsbGV0Lm1hY3Jvcy5zZXQoIlxcQGVxbnN3IiwiMSIsITApfWZ1bmN0aW9uIHcoKXt5JiYoZS5ndWxsZXQubWFjcm9zLmdldCgiXFxkZkB0YWciKT8oeS5wdXNoKGUuc3VicGFyc2UoW25ldyBHcigiXFxkZkB0YWciKV0pKSxlLmd1bGxldC5tYWNyb3Muc2V0KCJcXGRmQHRhZyIsdm9pZCAwLCEwKSk6eS5wdXNoKEJvb2xlYW4oaCkmJiIxIj09PWUuZ3VsbGV0Lm1hY3Jvcy5nZXQoIlxcQGVxbnN3IikpKX1mb3IoeCgpLGIucHVzaChVcihlKSk7Oyl7dmFyIGs9ZS5wYXJzZUV4cHJlc3Npb24oITEsYz8iXFxlbmQiOiJcXFxcIik7ZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5iZWdpbkdyb3VwKCksaz17dHlwZToib3JkZ3JvdXAiLG1vZGU6ZS5tb2RlLGJvZHk6a30sciYmKGs9e3R5cGU6InN0eWxpbmciLG1vZGU6ZS5tb2RlLHN0eWxlOnIsYm9keTpba119KSxmLnB1c2goayk7dmFyIFM9ZS5mZXRjaCgpLnRleHQ7aWYoIiYiPT09Uyl7aWYodSYmZi5sZW5ndGg9PT11KXtpZihjfHxsKXRocm93IG5ldyBuKCJUb28gbWFueSB0YWIgY2hhcmFjdGVyczogJiIsZS5uZXh0VG9rZW4pO2Uuc2V0dGluZ3MucmVwb3J0Tm9uc3RyaWN0KCJ0ZXh0RW52IiwiVG9vIGZldyBjb2x1bW5zIHNwZWNpZmllZCBpbiB0aGUge2FycmF5fSBjb2x1bW4gYXJndW1lbnQuIil9ZS5jb25zdW1lKCl9ZWxzZXtpZigiXFxlbmQiPT09Uyl7dygpLDE9PT1mLmxlbmd0aCYmInN0eWxpbmciPT09ay50eXBlJiYwPT09ay5ib2R5WzBdLmJvZHkubGVuZ3RoJiYoZy5sZW5ndGg+MXx8IW0pJiZnLnBvcCgpLGIubGVuZ3RoPGcubGVuZ3RoKzEmJmIucHVzaChbXSk7YnJlYWt9aWYoIlxcXFwiIT09Uyl0aHJvdyBuZXcgbigiRXhwZWN0ZWQgJiBvciBcXFxcIG9yIFxcY3Igb3IgXFxlbmQiLGUubmV4dFRva2VuKTtlLmNvbnN1bWUoKTt2YXIgTT12b2lkIDA7IiAiIT09ZS5ndWxsZXQuZnV0dXJlKCkudGV4dCYmKE09ZS5wYXJzZVNpemVHcm91cCghMCkpLHYucHVzaChNP00udmFsdWU6bnVsbCksdygpLGIucHVzaChVcihlKSksZj1bXSxnLnB1c2goZikseCgpfX1yZXR1cm4gZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5lbmRHcm91cCgpLHt0eXBlOiJhcnJheSIsbW9kZTplLm1vZGUsYWRkSm90OmksYXJyYXlzdHJldGNoOnMsYm9keTpnLGNvbHM6byxyb3dHYXBzOnYsaHNraXBCZWZvcmVBbmRBZnRlcjphLGhMaW5lc0JlZm9yZVJvdzpiLGNvbFNlcGFyYXRpb25UeXBlOmwsdGFnczp5LGxlcW5vOnB9fWZ1bmN0aW9uIF9yKGUpe3JldHVybiJkIj09PWUuc2xpY2UoMCwxKT8iZGlzcGxheSI6InRleHQifXZhciBqcj1mdW5jdGlvbihlLHQpe3ZhciByLGEsaT1lLmJvZHkubGVuZ3RoLG89ZS5oTGluZXNCZWZvcmVSb3cscz0wLGg9bmV3IEFycmF5KGkpLGM9W10sbT1NYXRoLm1heCh0LmZvbnRNZXRyaWNzKCkuYXJyYXlSdWxlV2lkdGgsdC5taW5SdWxlVGhpY2tuZXNzKSx1PTEvdC5mb250TWV0cmljcygpLnB0UGVyRW0scD01KnU7ZS5jb2xTZXBhcmF0aW9uVHlwZSYmInNtYWxsIj09PWUuY29sU2VwYXJhdGlvblR5cGUmJihwPXQuaGF2aW5nU3R5bGUoeC5TQ1JJUFQpLnNpemVNdWx0aXBsaWVyL3Quc2l6ZU11bHRpcGxpZXIqLjI3NzgpO3ZhciBkPSJDRCI9PT1lLmNvbFNlcGFyYXRpb25UeXBlP1Aoe251bWJlcjozLHVuaXQ6ImV4In0sdCk6MTIqdSxmPTMqdSxnPWUuYXJyYXlzdHJldGNoKmQsdj0uNypnLGI9LjMqZyx5PTA7ZnVuY3Rpb24gdyhlKXtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoOysrdCl0PjAmJih5Kz0uMjUpLGMucHVzaCh7cG9zOnksaXNEYXNoZWQ6ZVt0XX0pfWZvcih3KG9bMF0pLHI9MDtyPGUuYm9keS5sZW5ndGg7KytyKXt2YXIgaz1lLmJvZHlbcl0sUz12LE09YjtzPGsubGVuZ3RoJiYocz1rLmxlbmd0aCk7dmFyIHo9bmV3IEFycmF5KGsubGVuZ3RoKTtmb3IoYT0wO2E8ay5sZW5ndGg7KythKXt2YXIgQT13dChrW2FdLHQpO008QS5kZXB0aCYmKE09QS5kZXB0aCksUzxBLmhlaWdodCYmKFM9QS5oZWlnaHQpLHpbYV09QX12YXIgVD1lLnJvd0dhcHNbcl0sQj0wO1QmJihCPVAoVCx0KSk+MCYmKE08KEIrPWIpJiYoTT1CKSxCPTApLGUuYWRkSm90JiYoTSs9Ziksei5oZWlnaHQ9Uyx6LmRlcHRoPU0seSs9Uyx6LnBvcz15LHkrPU0rQixoW3JdPXosdyhvW3IrMV0pfXZhciBDLE4scT15LzIrdC5mb250TWV0cmljcygpLmF4aXNIZWlnaHQsST1lLmNvbHN8fFtdLFI9W10sSD1bXTtpZihlLnRhZ3MmJmUudGFncy5zb21lKChmdW5jdGlvbihlKXtyZXR1cm4gZX0pKSlmb3Iocj0wO3I8aTsrK3Ipe3ZhciBPPWhbcl0sRT1PLnBvcy1xLEw9ZS50YWdzW3JdLEQ9dm9pZCAwOyhEPSEwPT09TD9LZS5tYWtlU3BhbihbImVxbi1udW0iXSxbXSx0KTohMT09PUw/S2UubWFrZVNwYW4oW10sW10sdCk6S2UubWFrZVNwYW4oW10sZnQoTCx0LCEwKSx0KSkuZGVwdGg9Ty5kZXB0aCxELmhlaWdodD1PLmhlaWdodCxILnB1c2goe3R5cGU6ImVsZW0iLGVsZW06RCxzaGlmdDpFfSl9Zm9yKGE9MCxOPTA7YTxzfHxOPEkubGVuZ3RoOysrYSwrK04pe2Zvcih2YXIgVj1JW05dfHx7fSxHPSEwOyJzZXBhcmF0b3IiPT09Vi50eXBlOyl7aWYoR3x8KChDPUtlLm1ha2VTcGFuKFsiYXJyYXljb2xzZXAiXSxbXSkpLnN0eWxlLndpZHRoPUYodC5mb250TWV0cmljcygpLmRvdWJsZVJ1bGVTZXApLFIucHVzaChDKSksInwiIT09Vi5zZXBhcmF0b3ImJiI6IiE9PVYuc2VwYXJhdG9yKXRocm93IG5ldyBuKCJJbnZhbGlkIHNlcGFyYXRvciB0eXBlOiAiK1Yuc2VwYXJhdG9yKTt2YXIgVT0ifCI9PT1WLnNlcGFyYXRvcj8ic29saWQiOiJkYXNoZWQiLFk9S2UubWFrZVNwYW4oWyJ2ZXJ0aWNhbC1zZXBhcmF0b3IiXSxbXSx0KTtZLnN0eWxlLmhlaWdodD1GKHkpLFkuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aD1GKG0pLFkuc3R5bGUuYm9yZGVyUmlnaHRTdHlsZT1VLFkuc3R5bGUubWFyZ2luPSIwICIrRigtbS8yKTt2YXIgWD15LXE7WCYmKFkuc3R5bGUudmVydGljYWxBbGlnbj1GKC1YKSksUi5wdXNoKFkpLFY9SVsrK05dfHx7fSxHPSExfWlmKCEoYT49cykpe3ZhciBXPXZvaWQgMDsoYT4wfHxlLmhza2lwQmVmb3JlQW5kQWZ0ZXIpJiYwIT09KFc9bC5kZWZsdChWLnByZWdhcCxwKSkmJigoQz1LZS5tYWtlU3BhbihbImFycmF5Y29sc2VwIl0sW10pKS5zdHlsZS53aWR0aD1GKFcpLFIucHVzaChDKSk7dmFyIF89W107Zm9yKHI9MDtyPGk7KytyKXt2YXIgaj1oW3JdLCQ9althXTtpZigkKXt2YXIgWj1qLnBvcy1xOyQuZGVwdGg9ai5kZXB0aCwkLmhlaWdodD1qLmhlaWdodCxfLnB1c2goe3R5cGU6ImVsZW0iLGVsZW06JCxzaGlmdDpafSl9fV89S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46X30sdCksXz1LZS5tYWtlU3BhbihbImNvbC1hbGlnbi0iKyhWLmFsaWdufHwiYyIpXSxbX10pLFIucHVzaChfKSwoYTxzLTF8fGUuaHNraXBCZWZvcmVBbmRBZnRlcikmJjAhPT0oVz1sLmRlZmx0KFYucG9zdGdhcCxwKSkmJigoQz1LZS5tYWtlU3BhbihbImFycmF5Y29sc2VwIl0sW10pKS5zdHlsZS53aWR0aD1GKFcpLFIucHVzaChDKSl9fWlmKGg9S2UubWFrZVNwYW4oWyJtdGFibGUiXSxSKSxjLmxlbmd0aD4wKXtmb3IodmFyIEs9S2UubWFrZUxpbmVTcGFuKCJobGluZSIsdCxtKSxKPUtlLm1ha2VMaW5lU3BhbigiaGRhc2hsaW5lIix0LG0pLFE9W3t0eXBlOiJlbGVtIixlbGVtOmgsc2hpZnQ6MH1dO2MubGVuZ3RoPjA7KXt2YXIgZWU9Yy5wb3AoKSx0ZT1lZS5wb3MtcTtlZS5pc0Rhc2hlZD9RLnB1c2goe3R5cGU6ImVsZW0iLGVsZW06SixzaGlmdDp0ZX0pOlEucHVzaCh7dHlwZToiZWxlbSIsZWxlbTpLLHNoaWZ0OnRlfSl9aD1LZS5tYWtlVkxpc3Qoe3Bvc2l0aW9uVHlwZToiaW5kaXZpZHVhbFNoaWZ0IixjaGlsZHJlbjpRfSx0KX1pZigwPT09SC5sZW5ndGgpcmV0dXJuIEtlLm1ha2VTcGFuKFsibW9yZCJdLFtoXSx0KTt2YXIgcmU9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46SH0sdCk7cmV0dXJuIHJlPUtlLm1ha2VTcGFuKFsidGFnIl0sW3JlXSx0KSxLZS5tYWtlRnJhZ21lbnQoW2gscmVdKX0sJHI9e2M6ImNlbnRlciAiLGw6ImxlZnQgIixyOiJyaWdodCAifSxacj1mdW5jdGlvbihlLHQpe2Zvcih2YXIgcj1bXSxuPW5ldyBUdC5NYXRoTm9kZSgibXRkIixbXSxbIm10ci1nbHVlIl0pLGE9bmV3IFR0Lk1hdGhOb2RlKCJtdGQiLFtdLFsibW1sLWVxbi1udW0iXSksaT0wO2k8ZS5ib2R5Lmxlbmd0aDtpKyspe2Zvcih2YXIgbz1lLmJvZHlbaV0scz1bXSxsPTA7bDxvLmxlbmd0aDtsKyspcy5wdXNoKG5ldyBUdC5NYXRoTm9kZSgibXRkIixbUnQob1tsXSx0KV0pKTtlLnRhZ3MmJmUudGFnc1tpXSYmKHMudW5zaGlmdChuKSxzLnB1c2gobiksZS5sZXFubz9zLnVuc2hpZnQoYSk6cy5wdXNoKGEpKSxyLnB1c2gobmV3IFR0Lk1hdGhOb2RlKCJtdHIiLHMpKX12YXIgaD1uZXcgVHQuTWF0aE5vZGUoIm10YWJsZSIsciksYz0uNT09PWUuYXJyYXlzdHJldGNoPy4xOi4xNitlLmFycmF5c3RyZXRjaC0xKyhlLmFkZEpvdD8uMDk6MCk7aC5zZXRBdHRyaWJ1dGUoInJvd3NwYWNpbmciLEYoYykpO3ZhciBtPSIiLHU9IiI7aWYoZS5jb2xzJiZlLmNvbHMubGVuZ3RoPjApe3ZhciBwPWUuY29scyxkPSIiLGY9ITEsZz0wLHY9cC5sZW5ndGg7InNlcGFyYXRvciI9PT1wWzBdLnR5cGUmJihtKz0idG9wICIsZz0xKSwic2VwYXJhdG9yIj09PXBbcC5sZW5ndGgtMV0udHlwZSYmKG0rPSJib3R0b20gIix2LT0xKTtmb3IodmFyIGI9ZztiPHY7YisrKSJhbGlnbiI9PT1wW2JdLnR5cGU/KHUrPSRyW3BbYl0uYWxpZ25dLGYmJihkKz0ibm9uZSAiKSxmPSEwKToic2VwYXJhdG9yIj09PXBbYl0udHlwZSYmZiYmKGQrPSJ8Ij09PXBbYl0uc2VwYXJhdG9yPyJzb2xpZCAiOiJkYXNoZWQgIixmPSExKTtoLnNldEF0dHJpYnV0ZSgiY29sdW1uYWxpZ24iLHUudHJpbSgpKSwvW3NkXS8udGVzdChkKSYmaC5zZXRBdHRyaWJ1dGUoImNvbHVtbmxpbmVzIixkLnRyaW0oKSl9aWYoImFsaWduIj09PWUuY29sU2VwYXJhdGlvblR5cGUpe2Zvcih2YXIgeT1lLmNvbHN8fFtdLHg9IiIsdz0xO3c8eS5sZW5ndGg7dysrKXgrPXclMj8iMGVtICI6IjFlbSAiO2guc2V0QXR0cmlidXRlKCJjb2x1bW5zcGFjaW5nIix4LnRyaW0oKSl9ZWxzZSJhbGlnbmF0Ij09PWUuY29sU2VwYXJhdGlvblR5cGV8fCJnYXRoZXIiPT09ZS5jb2xTZXBhcmF0aW9uVHlwZT9oLnNldEF0dHJpYnV0ZSgiY29sdW1uc3BhY2luZyIsIjBlbSIpOiJzbWFsbCI9PT1lLmNvbFNlcGFyYXRpb25UeXBlP2guc2V0QXR0cmlidXRlKCJjb2x1bW5zcGFjaW5nIiwiMC4yNzc4ZW0iKToiQ0QiPT09ZS5jb2xTZXBhcmF0aW9uVHlwZT9oLnNldEF0dHJpYnV0ZSgiY29sdW1uc3BhY2luZyIsIjAuNWVtIik6aC5zZXRBdHRyaWJ1dGUoImNvbHVtbnNwYWNpbmciLCIxZW0iKTt2YXIgaz0iIixTPWUuaExpbmVzQmVmb3JlUm93O20rPVNbMF0ubGVuZ3RoPjA/ImxlZnQgIjoiIixtKz1TW1MubGVuZ3RoLTFdLmxlbmd0aD4wPyJyaWdodCAiOiIiO2Zvcih2YXIgTT0xO008Uy5sZW5ndGgtMTtNKyspays9MD09PVNbTV0ubGVuZ3RoPyJub25lICI6U1tNXVswXT8iZGFzaGVkICI6InNvbGlkICI7cmV0dXJuL1tzZF0vLnRlc3QoaykmJmguc2V0QXR0cmlidXRlKCJyb3dsaW5lcyIsay50cmltKCkpLCIiIT09bSYmKGg9bmV3IFR0Lk1hdGhOb2RlKCJtZW5jbG9zZSIsW2hdKSkuc2V0QXR0cmlidXRlKCJub3RhdGlvbiIsbS50cmltKCkpLGUuYXJyYXlzdHJldGNoJiZlLmFycmF5c3RyZXRjaDwxJiYoaD1uZXcgVHQuTWF0aE5vZGUoIm1zdHlsZSIsW2hdKSkuc2V0QXR0cmlidXRlKCJzY3JpcHRsZXZlbCIsIjEiKSxofSxLcj1mdW5jdGlvbihlLHQpey0xPT09ZS5lbnZOYW1lLmluZGV4T2YoImVkIikmJllyKGUpO3ZhciByLGE9W10saT1lLmVudk5hbWUuaW5kZXhPZigiYXQiKT4tMT8iYWxpZ25hdCI6ImFsaWduIixvPSJzcGxpdCI9PT1lLmVudk5hbWUscz1XcihlLnBhcnNlcix7Y29sczphLGFkZEpvdDohMCxhdXRvVGFnOm8/dm9pZCAwOlhyKGUuZW52TmFtZSksZW1wdHlTaW5nbGVSb3c6ITAsY29sU2VwYXJhdGlvblR5cGU6aSxtYXhOdW1Db2xzOm8/Mjp2b2lkIDAsbGVxbm86ZS5wYXJzZXIuc2V0dGluZ3MubGVxbm99LCJkaXNwbGF5IiksbD0wLGg9e3R5cGU6Im9yZGdyb3VwIixtb2RlOmUubW9kZSxib2R5OltdfTtpZih0WzBdJiYib3JkZ3JvdXAiPT09dFswXS50eXBlKXtmb3IodmFyIGM9IiIsbT0wO208dFswXS5ib2R5Lmxlbmd0aDttKyspe2MrPVV0KHRbMF0uYm9keVttXSwidGV4dG9yZCIpLnRleHR9cj1OdW1iZXIoYyksbD0yKnJ9dmFyIHU9IWw7cy5ib2R5LmZvckVhY2goKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8ZS5sZW5ndGg7dCs9Mil7dmFyIGE9VXQoZVt0XSwic3R5bGluZyIpO1V0KGEuYm9keVswXSwib3JkZ3JvdXAiKS5ib2R5LnVuc2hpZnQoaCl9aWYodSlsPGUubGVuZ3RoJiYobD1lLmxlbmd0aCk7ZWxzZXt2YXIgaT1lLmxlbmd0aC8yO2lmKHI8aSl0aHJvdyBuZXcgbigiVG9vIG1hbnkgbWF0aCBpbiBhIHJvdzogZXhwZWN0ZWQgIityKyIsIGJ1dCBnb3QgIitpLGVbMF0pfX0pKTtmb3IodmFyIHA9MDtwPGw7KytwKXt2YXIgZD0iciIsZj0wO3AlMj09MT9kPSJsIjpwPjAmJnUmJihmPTEpLGFbcF09e3R5cGU6ImFsaWduIixhbGlnbjpkLHByZWdhcDpmLHBvc3RnYXA6MH19cmV0dXJuIHMuY29sU2VwYXJhdGlvblR5cGU9dT8iYWxpZ24iOiJhbGlnbmF0IixzfTtEcih7dHlwZToiYXJyYXkiLG5hbWVzOlsiYXJyYXkiLCJkYXJyYXkiXSxwcm9wczp7bnVtQXJnczoxfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9KFh0KHRbMF0pP1t0WzBdXTpVdCh0WzBdLCJvcmRncm91cCIpLmJvZHkpLm1hcCgoZnVuY3Rpb24oZSl7dmFyIHQ9WXQoZSkudGV4dDtpZigtMSE9PSJsY3IiLmluZGV4T2YodCkpcmV0dXJue3R5cGU6ImFsaWduIixhbGlnbjp0fTtpZigifCI9PT10KXJldHVybnt0eXBlOiJzZXBhcmF0b3IiLHNlcGFyYXRvcjoifCJ9O2lmKCI6Ij09PXQpcmV0dXJue3R5cGU6InNlcGFyYXRvciIsc2VwYXJhdG9yOiI6In07dGhyb3cgbmV3IG4oIlVua25vd24gY29sdW1uIGFsaWdubWVudDogIit0LGUpfSkpLGE9e2NvbHM6cixoc2tpcEJlZm9yZUFuZEFmdGVyOiEwLG1heE51bUNvbHM6ci5sZW5ndGh9O3JldHVybiBXcihlLnBhcnNlcixhLF9yKGUuZW52TmFtZSkpfSxodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksRHIoe3R5cGU6ImFycmF5IixuYW1lczpbIm1hdHJpeCIsInBtYXRyaXgiLCJibWF0cml4IiwiQm1hdHJpeCIsInZtYXRyaXgiLCJWbWF0cml4IiwibWF0cml4KiIsInBtYXRyaXgqIiwiYm1hdHJpeCoiLCJCbWF0cml4KiIsInZtYXRyaXgqIiwiVm1hdHJpeCoiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PXttYXRyaXg6bnVsbCxwbWF0cml4OlsiKCIsIikiXSxibWF0cml4OlsiWyIsIl0iXSxCbWF0cml4OlsiXFx7IiwiXFx9Il0sdm1hdHJpeDpbInwiLCJ8Il0sVm1hdHJpeDpbIlxcVmVydCIsIlxcVmVydCJdfVtlLmVudk5hbWUucmVwbGFjZSgiKiIsIiIpXSxyPSJjIixhPXtoc2tpcEJlZm9yZUFuZEFmdGVyOiExLGNvbHM6W3t0eXBlOiJhbGlnbiIsYWxpZ246cn1dfTtpZigiKiI9PT1lLmVudk5hbWUuY2hhckF0KGUuZW52TmFtZS5sZW5ndGgtMSkpe3ZhciBpPWUucGFyc2VyO2lmKGkuY29uc3VtZVNwYWNlcygpLCJbIj09PWkuZmV0Y2goKS50ZXh0KXtpZihpLmNvbnN1bWUoKSxpLmNvbnN1bWVTcGFjZXMoKSxyPWkuZmV0Y2goKS50ZXh0LC0xPT09ImxjciIuaW5kZXhPZihyKSl0aHJvdyBuZXcgbigiRXhwZWN0ZWQgbCBvciBjIG9yIHIiLGkubmV4dFRva2VuKTtpLmNvbnN1bWUoKSxpLmNvbnN1bWVTcGFjZXMoKSxpLmV4cGVjdCgiXSIpLGkuY29uc3VtZSgpLGEuY29scz1be3R5cGU6ImFsaWduIixhbGlnbjpyfV19fXZhciBvPVdyKGUucGFyc2VyLGEsX3IoZS5lbnZOYW1lKSkscz1NYXRoLm1heC5hcHBseShNYXRoLFswXS5jb25jYXQoby5ib2R5Lm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGUubGVuZ3RofSkpKSk7cmV0dXJuIG8uY29scz1uZXcgQXJyYXkocykuZmlsbCh7dHlwZToiYWxpZ24iLGFsaWduOnJ9KSx0P3t0eXBlOiJsZWZ0cmlnaHQiLG1vZGU6ZS5tb2RlLGJvZHk6W29dLGxlZnQ6dFswXSxyaWdodDp0WzFdLHJpZ2h0Q29sb3I6dm9pZCAwfTpvfSxodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksRHIoe3R5cGU6ImFycmF5IixuYW1lczpbInNtYWxsbWF0cml4Il0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcjpmdW5jdGlvbihlKXt2YXIgdD1XcihlLnBhcnNlcix7YXJyYXlzdHJldGNoOi41fSwic2NyaXB0Iik7cmV0dXJuIHQuY29sU2VwYXJhdGlvblR5cGU9InNtYWxsIix0fSxodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksRHIoe3R5cGU6ImFycmF5IixuYW1lczpbInN1YmFycmF5Il0scHJvcHM6e251bUFyZ3M6MX0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPShYdCh0WzBdKT9bdFswXV06VXQodFswXSwib3JkZ3JvdXAiKS5ib2R5KS5tYXAoKGZ1bmN0aW9uKGUpe3ZhciB0PVl0KGUpLnRleHQ7aWYoLTEhPT0ibGMiLmluZGV4T2YodCkpcmV0dXJue3R5cGU6ImFsaWduIixhbGlnbjp0fTt0aHJvdyBuZXcgbigiVW5rbm93biBjb2x1bW4gYWxpZ25tZW50OiAiK3QsZSl9KSk7aWYoci5sZW5ndGg+MSl0aHJvdyBuZXcgbigie3N1YmFycmF5fSBjYW4gY29udGFpbiBvbmx5IG9uZSBjb2x1bW4iKTt2YXIgYT17Y29sczpyLGhza2lwQmVmb3JlQW5kQWZ0ZXI6ITEsYXJyYXlzdHJldGNoOi41fTtpZigoYT1XcihlLnBhcnNlcixhLCJzY3JpcHQiKSkuYm9keS5sZW5ndGg+MCYmYS5ib2R5WzBdLmxlbmd0aD4xKXRocm93IG5ldyBuKCJ7c3ViYXJyYXl9IGNhbiBjb250YWluIG9ubHkgb25lIGNvbHVtbiIpO3JldHVybiBhfSxodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksRHIoe3R5cGU6ImFycmF5IixuYW1lczpbImNhc2VzIiwiZGNhc2VzIiwicmNhc2VzIiwiZHJjYXNlcyJdLHByb3BzOntudW1BcmdzOjB9LGhhbmRsZXI6ZnVuY3Rpb24oZSl7dmFyIHQ9V3IoZS5wYXJzZXIse2FycmF5c3RyZXRjaDoxLjIsY29sczpbe3R5cGU6ImFsaWduIixhbGlnbjoibCIscHJlZ2FwOjAscG9zdGdhcDoxfSx7dHlwZToiYWxpZ24iLGFsaWduOiJsIixwcmVnYXA6MCxwb3N0Z2FwOjB9XX0sX3IoZS5lbnZOYW1lKSk7cmV0dXJue3R5cGU6ImxlZnRyaWdodCIsbW9kZTplLm1vZGUsYm9keTpbdF0sbGVmdDplLmVudk5hbWUuaW5kZXhPZigiciIpPi0xPyIuIjoiXFx7IixyaWdodDplLmVudk5hbWUuaW5kZXhPZigiciIpPi0xPyJcXH0iOiIuIixyaWdodENvbG9yOnZvaWQgMH19LGh0bWxCdWlsZGVyOmpyLG1hdGhtbEJ1aWxkZXI6WnJ9KSxEcih7dHlwZToiYXJyYXkiLG5hbWVzOlsiYWxpZ24iLCJhbGlnbioiLCJhbGlnbmVkIiwic3BsaXQiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOktyLGh0bWxCdWlsZGVyOmpyLG1hdGhtbEJ1aWxkZXI6WnJ9KSxEcih7dHlwZToiYXJyYXkiLG5hbWVzOlsiZ2F0aGVyZWQiLCJnYXRoZXIiLCJnYXRoZXIqIl0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcjpmdW5jdGlvbihlKXtsLmNvbnRhaW5zKFsiZ2F0aGVyIiwiZ2F0aGVyKiJdLGUuZW52TmFtZSkmJllyKGUpO3ZhciB0PXtjb2xzOlt7dHlwZToiYWxpZ24iLGFsaWduOiJjIn1dLGFkZEpvdDohMCxjb2xTZXBhcmF0aW9uVHlwZToiZ2F0aGVyIixhdXRvVGFnOlhyKGUuZW52TmFtZSksZW1wdHlTaW5nbGVSb3c6ITAsbGVxbm86ZS5wYXJzZXIuc2V0dGluZ3MubGVxbm99O3JldHVybiBXcihlLnBhcnNlcix0LCJkaXNwbGF5Iil9LGh0bWxCdWlsZGVyOmpyLG1hdGhtbEJ1aWxkZXI6WnJ9KSxEcih7dHlwZToiYXJyYXkiLG5hbWVzOlsiYWxpZ25hdCIsImFsaWduYXQqIiwiYWxpZ25lZGF0Il0scHJvcHM6e251bUFyZ3M6MX0saGFuZGxlcjpLcixodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksRHIoe3R5cGU6ImFycmF5IixuYW1lczpbImVxdWF0aW9uIiwiZXF1YXRpb24qIl0scHJvcHM6e251bUFyZ3M6MH0saGFuZGxlcjpmdW5jdGlvbihlKXtZcihlKTt2YXIgdD17YXV0b1RhZzpYcihlLmVudk5hbWUpLGVtcHR5U2luZ2xlUm93OiEwLHNpbmdsZVJvdzohMCxtYXhOdW1Db2xzOjEsbGVxbm86ZS5wYXJzZXIuc2V0dGluZ3MubGVxbm99O3JldHVybiBXcihlLnBhcnNlcix0LCJkaXNwbGF5Iil9LGh0bWxCdWlsZGVyOmpyLG1hdGhtbEJ1aWxkZXI6WnJ9KSxEcih7dHlwZToiYXJyYXkiLG5hbWVzOlsiQ0QiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3JldHVybiBZcihlKSxmdW5jdGlvbihlKXt2YXIgdD1bXTtmb3IoZS5ndWxsZXQuYmVnaW5Hcm91cCgpLGUuZ3VsbGV0Lm1hY3Jvcy5zZXQoIlxcY3IiLCJcXFxcXFxyZWxheCIpLGUuZ3VsbGV0LmJlZ2luR3JvdXAoKTs7KXt0LnB1c2goZS5wYXJzZUV4cHJlc3Npb24oITEsIlxcXFwiKSksZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5iZWdpbkdyb3VwKCk7dmFyIHI9ZS5mZXRjaCgpLnRleHQ7aWYoIiYiIT09ciYmIlxcXFwiIT09cil7aWYoIlxcZW5kIj09PXIpezA9PT10W3QubGVuZ3RoLTFdLmxlbmd0aCYmdC5wb3AoKTticmVha310aHJvdyBuZXcgbigiRXhwZWN0ZWQgXFxcXCBvciBcXGNyIG9yIFxcZW5kIixlLm5leHRUb2tlbil9ZS5jb25zdW1lKCl9Zm9yKHZhciBhLGksbz1bXSxzPVtvXSxsPTA7bDx0Lmxlbmd0aDtsKyspe2Zvcih2YXIgaD10W2xdLGM9e3R5cGU6InN0eWxpbmciLGJvZHk6W10sbW9kZToibWF0aCIsc3R5bGU6ImRpc3BsYXkifSxtPTA7bTxoLmxlbmd0aDttKyspaWYodHIoaFttXSkpe28ucHVzaChjKTt2YXIgdT1ZdChoW20rPTFdKS50ZXh0LHA9bmV3IEFycmF5KDIpO2lmKHBbMF09e3R5cGU6Im9yZGdyb3VwIixtb2RlOiJtYXRoIixib2R5OltdfSxwWzFdPXt0eXBlOiJvcmRncm91cCIsbW9kZToibWF0aCIsYm9keTpbXX0sIj18LiIuaW5kZXhPZih1KT4tMSk7ZWxzZXtpZighKCI8PkFWIi5pbmRleE9mKHUpPi0xKSl0aHJvdyBuZXcgbignRXhwZWN0ZWQgb25lIG9mICI8PkFWPXwuIiBhZnRlciBAJyxoW21dKTtmb3IodmFyIGQ9MDtkPDI7ZCsrKXtmb3IodmFyIGY9ITAsZz1tKzE7ZzxoLmxlbmd0aDtnKyspe2lmKGk9dSwoIm1hdGhvcmQiPT09KGE9aFtnXSkudHlwZXx8ImF0b20iPT09YS50eXBlKSYmYS50ZXh0PT09aSl7Zj0hMSxtPWc7YnJlYWt9aWYodHIoaFtnXSkpdGhyb3cgbmV3IG4oIk1pc3NpbmcgYSAiK3UrIiBjaGFyYWN0ZXIgdG8gY29tcGxldGUgYSBDRCBhcnJvdy4iLGhbZ10pO3BbZF0uYm9keS5wdXNoKGhbZ10pfWlmKGYpdGhyb3cgbmV3IG4oIk1pc3NpbmcgYSAiK3UrIiBjaGFyYWN0ZXIgdG8gY29tcGxldGUgYSBDRCBhcnJvdy4iLGhbbV0pfX12YXIgdj17dHlwZToic3R5bGluZyIsYm9keTpbcnIodSxwLGUpXSxtb2RlOiJtYXRoIixzdHlsZToiZGlzcGxheSJ9O28ucHVzaCh2KSxjPXt0eXBlOiJzdHlsaW5nIixib2R5OltdLG1vZGU6Im1hdGgiLHN0eWxlOiJkaXNwbGF5In19ZWxzZSBjLmJvZHkucHVzaChoW21dKTtsJTI9PTA/by5wdXNoKGMpOm8uc2hpZnQoKSxvPVtdLHMucHVzaChvKX1yZXR1cm4gZS5ndWxsZXQuZW5kR3JvdXAoKSxlLmd1bGxldC5lbmRHcm91cCgpLHt0eXBlOiJhcnJheSIsbW9kZToibWF0aCIsYm9keTpzLGFycmF5c3RyZXRjaDoxLGFkZEpvdDohMCxyb3dHYXBzOltudWxsXSxjb2xzOm5ldyBBcnJheShzWzBdLmxlbmd0aCkuZmlsbCh7dHlwZToiYWxpZ24iLGFsaWduOiJjIixwcmVnYXA6LjI1LHBvc3RnYXA6LjI1fSksY29sU2VwYXJhdGlvblR5cGU6IkNEIixoTGluZXNCZWZvcmVSb3c6bmV3IEFycmF5KHMubGVuZ3RoKzEpLmZpbGwoW10pfX0oZS5wYXJzZXIpfSxodG1sQnVpbGRlcjpqcixtYXRobWxCdWlsZGVyOlpyfSksUHIoIlxcbm9udW1iZXIiLCJcXGdkZWZcXEBlcW5zd3swfSIpLFByKCJcXG5vdGFnIiwiXFxub251bWJlciIpLG90KHt0eXBlOiJ0ZXh0IixuYW1lczpbIlxcaGxpbmUiLCJcXGhkYXNobGluZSJdLHByb3BzOntudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMCxhbGxvd2VkSW5NYXRoOiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dGhyb3cgbmV3IG4oZS5mdW5jTmFtZSsiIHZhbGlkIG9ubHkgd2l0aGluIGFycmF5IGVudmlyb25tZW50Iil9fSk7dmFyIEpyPUxyO290KHt0eXBlOiJlbnZpcm9ubWVudCIsbmFtZXM6WyJcXGJlZ2luIiwiXFxlbmQiXSxwcm9wczp7bnVtQXJnczoxLGFyZ1R5cGVzOlsidGV4dCJdfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsYT1lLmZ1bmNOYW1lLGk9dFswXTtpZigib3JkZ3JvdXAiIT09aS50eXBlKXRocm93IG5ldyBuKCJJbnZhbGlkIGVudmlyb25tZW50IG5hbWUiLGkpO2Zvcih2YXIgbz0iIixzPTA7czxpLmJvZHkubGVuZ3RoOysrcylvKz1VdChpLmJvZHlbc10sInRleHRvcmQiKS50ZXh0O2lmKCJcXGJlZ2luIj09PWEpe2lmKCFKci5oYXNPd25Qcm9wZXJ0eShvKSl0aHJvdyBuZXcgbigiTm8gc3VjaCBlbnZpcm9ubWVudDogIitvLGkpO3ZhciBsPUpyW29dLGg9ci5wYXJzZUFyZ3VtZW50cygiXFxiZWdpbnsiK28rIn0iLGwpLGM9aC5hcmdzLG09aC5vcHRBcmdzLHU9e21vZGU6ci5tb2RlLGVudk5hbWU6byxwYXJzZXI6cn0scD1sLmhhbmRsZXIodSxjLG0pO3IuZXhwZWN0KCJcXGVuZCIsITEpO3ZhciBkPXIubmV4dFRva2VuLGY9VXQoci5wYXJzZUZ1bmN0aW9uKCksImVudmlyb25tZW50Iik7aWYoZi5uYW1lIT09byl0aHJvdyBuZXcgbigiTWlzbWF0Y2g6IFxcYmVnaW57IitvKyJ9IG1hdGNoZWQgYnkgXFxlbmR7IitmLm5hbWUrIn0iLGQpO3JldHVybiBwfXJldHVybnt0eXBlOiJlbnZpcm9ubWVudCIsbW9kZTpyLm1vZGUsbmFtZTpvLG5hbWVHcm91cDppfX19KTt2YXIgUXI9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLmZvbnQsbj10LndpdGhGb250KHIpO3JldHVybiB3dChlLmJvZHksbil9LGVuPWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5mb250LG49dC53aXRoRm9udChyKTtyZXR1cm4gUnQoZS5ib2R5LG4pfSx0bj17IlxcQmJiIjoiXFxtYXRoYmIiLCJcXGJvbGQiOiJcXG1hdGhiZiIsIlxcZnJhayI6IlxcbWF0aGZyYWsiLCJcXGJtIjoiXFxib2xkc3ltYm9sIn07b3Qoe3R5cGU6ImZvbnQiLG5hbWVzOlsiXFxtYXRocm0iLCJcXG1hdGhpdCIsIlxcbWF0aGJmIiwiXFxtYXRobm9ybWFsIiwiXFxtYXRoYmIiLCJcXG1hdGhjYWwiLCJcXG1hdGhmcmFrIiwiXFxtYXRoc2NyIiwiXFxtYXRoc2YiLCJcXG1hdGh0dCIsIlxcQmJiIiwiXFxib2xkIiwiXFxmcmFrIl0scHJvcHM6e251bUFyZ3M6MSxhbGxvd2VkSW5Bcmd1bWVudDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49ZS5mdW5jTmFtZSxhPWx0KHRbMF0pLGk9bjtyZXR1cm4gaSBpbiB0biYmKGk9dG5baV0pLHt0eXBlOiJmb250Iixtb2RlOnIubW9kZSxmb250Omkuc2xpY2UoMSksYm9keTphfX0saHRtbEJ1aWxkZXI6UXIsbWF0aG1sQnVpbGRlcjplbn0pLG90KHt0eXBlOiJtY2xhc3MiLG5hbWVzOlsiXFxib2xkc3ltYm9sIiwiXFxibSJdLHByb3BzOntudW1BcmdzOjF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPXRbMF0sYT1sLmlzQ2hhcmFjdGVyQm94KG4pO3JldHVybnt0eXBlOiJtY2xhc3MiLG1vZGU6ci5tb2RlLG1jbGFzczpRdChuKSxib2R5Olt7dHlwZToiZm9udCIsbW9kZTpyLm1vZGUsZm9udDoiYm9sZHN5bWJvbCIsYm9keTpufV0saXNDaGFyYWN0ZXJCb3g6YX19fSksb3Qoe3R5cGU6ImZvbnQiLG5hbWVzOlsiXFxybSIsIlxcc2YiLCJcXHR0IiwiXFxiZiIsIlxcaXQiLCJcXGNhbCJdLHByb3BzOntudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49ZS5mdW5jTmFtZSxhPWUuYnJlYWtPblRva2VuVGV4dCxpPXIubW9kZSxvPXIucGFyc2VFeHByZXNzaW9uKCEwLGEpO3JldHVybnt0eXBlOiJmb250Iixtb2RlOmksZm9udDoibWF0aCIrbi5zbGljZSgxKSxib2R5Ont0eXBlOiJvcmRncm91cCIsbW9kZTpyLm1vZGUsYm9keTpvfX19LGh0bWxCdWlsZGVyOlFyLG1hdGhtbEJ1aWxkZXI6ZW59KTt2YXIgcm49ZnVuY3Rpb24oZSx0KXt2YXIgcj10O3JldHVybiJkaXNwbGF5Ij09PWU/cj1yLmlkPj14LlNDUklQVC5pZD9yLnRleHQoKTp4LkRJU1BMQVk6InRleHQiPT09ZSYmci5zaXplPT09eC5ESVNQTEFZLnNpemU/cj14LlRFWFQ6InNjcmlwdCI9PT1lP3I9eC5TQ1JJUFQ6InNjcmlwdHNjcmlwdCI9PT1lJiYocj14LlNDUklQVFNDUklQVCkscn0sbm49ZnVuY3Rpb24oZSx0KXt2YXIgcixuPXJuKGUuc2l6ZSx0LnN0eWxlKSxhPW4uZnJhY051bSgpLGk9bi5mcmFjRGVuKCk7cj10LmhhdmluZ1N0eWxlKGEpO3ZhciBvPXd0KGUubnVtZXIscix0KTtpZihlLmNvbnRpbnVlZCl7dmFyIHM9OC41L3QuZm9udE1ldHJpY3MoKS5wdFBlckVtLGw9My41L3QuZm9udE1ldHJpY3MoKS5wdFBlckVtO28uaGVpZ2h0PW8uaGVpZ2h0PHM/czpvLmhlaWdodCxvLmRlcHRoPW8uZGVwdGg8bD9sOm8uZGVwdGh9cj10LmhhdmluZ1N0eWxlKGkpO3ZhciBoLGMsbSx1LHAsZCxmLGcsdixiLHk9d3QoZS5kZW5vbSxyLHQpO2lmKGUuaGFzQmFyTGluZT8oZS5iYXJTaXplPyhjPVAoZS5iYXJTaXplLHQpLGg9S2UubWFrZUxpbmVTcGFuKCJmcmFjLWxpbmUiLHQsYykpOmg9S2UubWFrZUxpbmVTcGFuKCJmcmFjLWxpbmUiLHQpLGM9aC5oZWlnaHQsbT1oLmhlaWdodCk6KGg9bnVsbCxjPTAsbT10LmZvbnRNZXRyaWNzKCkuZGVmYXVsdFJ1bGVUaGlja25lc3MpLG4uc2l6ZT09PXguRElTUExBWS5zaXplfHwiZGlzcGxheSI9PT1lLnNpemU/KHU9dC5mb250TWV0cmljcygpLm51bTEscD1jPjA/MyptOjcqbSxkPXQuZm9udE1ldHJpY3MoKS5kZW5vbTEpOihjPjA/KHU9dC5mb250TWV0cmljcygpLm51bTIscD1tKToodT10LmZvbnRNZXRyaWNzKCkubnVtMyxwPTMqbSksZD10LmZvbnRNZXRyaWNzKCkuZGVub20yKSxoKXt2YXIgdz10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodDt1LW8uZGVwdGgtKHcrLjUqYyk8cCYmKHUrPXAtKHUtby5kZXB0aC0odysuNSpjKSkpLHctLjUqYy0oeS5oZWlnaHQtZCk8cCYmKGQrPXAtKHctLjUqYy0oeS5oZWlnaHQtZCkpKTt2YXIgaz0tKHctLjUqYyk7Zj1LZS5tYWtlVkxpc3Qoe3Bvc2l0aW9uVHlwZToiaW5kaXZpZHVhbFNoaWZ0IixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06eSxzaGlmdDpkfSx7dHlwZToiZWxlbSIsZWxlbTpoLHNoaWZ0Omt9LHt0eXBlOiJlbGVtIixlbGVtOm8sc2hpZnQ6LXV9XX0sdCl9ZWxzZXt2YXIgUz11LW8uZGVwdGgtKHkuaGVpZ2h0LWQpO1M8cCYmKHUrPS41KihwLVMpLGQrPS41KihwLVMpKSxmPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTp5LHNoaWZ0OmR9LHt0eXBlOiJlbGVtIixlbGVtOm8sc2hpZnQ6LXV9XX0sdCl9cmV0dXJuIHI9dC5oYXZpbmdTdHlsZShuKSxmLmhlaWdodCo9ci5zaXplTXVsdGlwbGllci90LnNpemVNdWx0aXBsaWVyLGYuZGVwdGgqPXIuc2l6ZU11bHRpcGxpZXIvdC5zaXplTXVsdGlwbGllcixnPW4uc2l6ZT09PXguRElTUExBWS5zaXplP3QuZm9udE1ldHJpY3MoKS5kZWxpbTE6bi5zaXplPT09eC5TQ1JJUFRTQ1JJUFQuc2l6ZT90LmhhdmluZ1N0eWxlKHguU0NSSVBUKS5mb250TWV0cmljcygpLmRlbGltMjp0LmZvbnRNZXRyaWNzKCkuZGVsaW0yLHY9bnVsbD09ZS5sZWZ0RGVsaW0/eHQodCxbIm1vcGVuIl0pOk5yLmN1c3RvbVNpemVkRGVsaW0oZS5sZWZ0RGVsaW0sZywhMCx0LmhhdmluZ1N0eWxlKG4pLGUubW9kZSxbIm1vcGVuIl0pLGI9ZS5jb250aW51ZWQ/S2UubWFrZVNwYW4oW10pOm51bGw9PWUucmlnaHREZWxpbT94dCh0LFsibWNsb3NlIl0pOk5yLmN1c3RvbVNpemVkRGVsaW0oZS5yaWdodERlbGltLGcsITAsdC5oYXZpbmdTdHlsZShuKSxlLm1vZGUsWyJtY2xvc2UiXSksS2UubWFrZVNwYW4oWyJtb3JkIl0uY29uY2F0KHIuc2l6aW5nQ2xhc3Nlcyh0KSksW3YsS2UubWFrZVNwYW4oWyJtZnJhYyJdLFtmXSksYl0sdCl9LGFuPWZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IFR0Lk1hdGhOb2RlKCJtZnJhYyIsW1J0KGUubnVtZXIsdCksUnQoZS5kZW5vbSx0KV0pO2lmKGUuaGFzQmFyTGluZSl7aWYoZS5iYXJTaXplKXt2YXIgbj1QKGUuYmFyU2l6ZSx0KTtyLnNldEF0dHJpYnV0ZSgibGluZXRoaWNrbmVzcyIsRihuKSl9fWVsc2Ugci5zZXRBdHRyaWJ1dGUoImxpbmV0aGlja25lc3MiLCIwcHgiKTt2YXIgYT1ybihlLnNpemUsdC5zdHlsZSk7aWYoYS5zaXplIT09dC5zdHlsZS5zaXplKXtyPW5ldyBUdC5NYXRoTm9kZSgibXN0eWxlIixbcl0pO3ZhciBpPWEuc2l6ZT09PXguRElTUExBWS5zaXplPyJ0cnVlIjoiZmFsc2UiO3Iuc2V0QXR0cmlidXRlKCJkaXNwbGF5c3R5bGUiLGkpLHIuc2V0QXR0cmlidXRlKCJzY3JpcHRsZXZlbCIsIjAiKX1pZihudWxsIT1lLmxlZnREZWxpbXx8bnVsbCE9ZS5yaWdodERlbGltKXt2YXIgbz1bXTtpZihudWxsIT1lLmxlZnREZWxpbSl7dmFyIHM9bmV3IFR0Lk1hdGhOb2RlKCJtbyIsW25ldyBUdC5UZXh0Tm9kZShlLmxlZnREZWxpbS5yZXBsYWNlKCJcXCIsIiIpKV0pO3Muc2V0QXR0cmlidXRlKCJmZW5jZSIsInRydWUiKSxvLnB1c2gocyl9aWYoby5wdXNoKHIpLG51bGwhPWUucmlnaHREZWxpbSl7dmFyIGw9bmV3IFR0Lk1hdGhOb2RlKCJtbyIsW25ldyBUdC5UZXh0Tm9kZShlLnJpZ2h0RGVsaW0ucmVwbGFjZSgiXFwiLCIiKSldKTtsLnNldEF0dHJpYnV0ZSgiZmVuY2UiLCJ0cnVlIiksby5wdXNoKGwpfXJldHVybiBDdChvKX1yZXR1cm4gcn07b3Qoe3R5cGU6ImdlbmZyYWMiLG5hbWVzOlsiXFxkZnJhYyIsIlxcZnJhYyIsIlxcdGZyYWMiLCJcXGRiaW5vbSIsIlxcYmlub20iLCJcXHRiaW5vbSIsIlxcXFxhdG9wZnJhYyIsIlxcXFxicmFjZWZyYWMiLCJcXFxcYnJhY2tmcmFjIl0scHJvcHM6e251bUFyZ3M6MixhbGxvd2VkSW5Bcmd1bWVudDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByLG49ZS5wYXJzZXIsYT1lLmZ1bmNOYW1lLGk9dFswXSxvPXRbMV0scz1udWxsLGw9bnVsbCxoPSJhdXRvIjtzd2l0Y2goYSl7Y2FzZSJcXGRmcmFjIjpjYXNlIlxcZnJhYyI6Y2FzZSJcXHRmcmFjIjpyPSEwO2JyZWFrO2Nhc2UiXFxcXGF0b3BmcmFjIjpyPSExO2JyZWFrO2Nhc2UiXFxkYmlub20iOmNhc2UiXFxiaW5vbSI6Y2FzZSJcXHRiaW5vbSI6cj0hMSxzPSIoIixsPSIpIjticmVhaztjYXNlIlxcXFxicmFjZWZyYWMiOnI9ITEscz0iXFx7IixsPSJcXH0iO2JyZWFrO2Nhc2UiXFxcXGJyYWNrZnJhYyI6cj0hMSxzPSJbIixsPSJdIjticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiVW5yZWNvZ25pemVkIGdlbmZyYWMgY29tbWFuZCIpfXN3aXRjaChhKXtjYXNlIlxcZGZyYWMiOmNhc2UiXFxkYmlub20iOmg9ImRpc3BsYXkiO2JyZWFrO2Nhc2UiXFx0ZnJhYyI6Y2FzZSJcXHRiaW5vbSI6aD0idGV4dCJ9cmV0dXJue3R5cGU6ImdlbmZyYWMiLG1vZGU6bi5tb2RlLGNvbnRpbnVlZDohMSxudW1lcjppLGRlbm9tOm8saGFzQmFyTGluZTpyLGxlZnREZWxpbTpzLHJpZ2h0RGVsaW06bCxzaXplOmgsYmFyU2l6ZTpudWxsfX0saHRtbEJ1aWxkZXI6bm4sbWF0aG1sQnVpbGRlcjphbn0pLG90KHt0eXBlOiJnZW5mcmFjIixuYW1lczpbIlxcY2ZyYWMiXSxwcm9wczp7bnVtQXJnczoyfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj0oZS5mdW5jTmFtZSx0WzBdKSxhPXRbMV07cmV0dXJue3R5cGU6ImdlbmZyYWMiLG1vZGU6ci5tb2RlLGNvbnRpbnVlZDohMCxudW1lcjpuLGRlbm9tOmEsaGFzQmFyTGluZTohMCxsZWZ0RGVsaW06bnVsbCxyaWdodERlbGltOm51bGwsc2l6ZToiZGlzcGxheSIsYmFyU2l6ZTpudWxsfX19KSxvdCh7dHlwZToiaW5maXgiLG5hbWVzOlsiXFxvdmVyIiwiXFxjaG9vc2UiLCJcXGF0b3AiLCJcXGJyYWNlIiwiXFxicmFjayJdLHByb3BzOntudW1BcmdzOjAsaW5maXg6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSl7dmFyIHQscj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT1lLnRva2VuO3N3aXRjaChuKXtjYXNlIlxcb3ZlciI6dD0iXFxmcmFjIjticmVhaztjYXNlIlxcY2hvb3NlIjp0PSJcXGJpbm9tIjticmVhaztjYXNlIlxcYXRvcCI6dD0iXFxcXGF0b3BmcmFjIjticmVhaztjYXNlIlxcYnJhY2UiOnQ9IlxcXFxicmFjZWZyYWMiO2JyZWFrO2Nhc2UiXFxicmFjayI6dD0iXFxcXGJyYWNrZnJhYyI7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlVucmVjb2duaXplZCBpbmZpeCBnZW5mcmFjIGNvbW1hbmQiKX1yZXR1cm57dHlwZToiaW5maXgiLG1vZGU6ci5tb2RlLHJlcGxhY2VXaXRoOnQsdG9rZW46YX19fSk7dmFyIG9uPVsiZGlzcGxheSIsInRleHQiLCJzY3JpcHQiLCJzY3JpcHRzY3JpcHQiXSxzbj1mdW5jdGlvbihlKXt2YXIgdD1udWxsO3JldHVybiBlLmxlbmd0aD4wJiYodD0iLiI9PT0odD1lKT9udWxsOnQpLHR9O290KHt0eXBlOiJnZW5mcmFjIixuYW1lczpbIlxcZ2VuZnJhYyJdLHByb3BzOntudW1BcmdzOjYsYWxsb3dlZEluQXJndW1lbnQ6ITAsYXJnVHlwZXM6WyJtYXRoIiwibWF0aCIsInNpemUiLCJ0ZXh0IiwibWF0aCIsIm1hdGgiXX0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByLG49ZS5wYXJzZXIsYT10WzRdLGk9dFs1XSxvPWx0KHRbMF0pLHM9ImF0b20iPT09by50eXBlJiYib3BlbiI9PT1vLmZhbWlseT9zbihvLnRleHQpOm51bGwsbD1sdCh0WzFdKSxoPSJhdG9tIj09PWwudHlwZSYmImNsb3NlIj09PWwuZmFtaWx5P3NuKGwudGV4dCk6bnVsbCxjPVV0KHRbMl0sInNpemUiKSxtPW51bGw7cj0hIWMuaXNCbGFua3x8KG09Yy52YWx1ZSkubnVtYmVyPjA7dmFyIHU9ImF1dG8iLHA9dFszXTtpZigib3JkZ3JvdXAiPT09cC50eXBlKXtpZihwLmJvZHkubGVuZ3RoPjApe3ZhciBkPVV0KHAuYm9keVswXSwidGV4dG9yZCIpO3U9b25bTnVtYmVyKGQudGV4dCldfX1lbHNlIHA9VXQocCwidGV4dG9yZCIpLHU9b25bTnVtYmVyKHAudGV4dCldO3JldHVybnt0eXBlOiJnZW5mcmFjIixtb2RlOm4ubW9kZSxudW1lcjphLGRlbm9tOmksY29udGludWVkOiExLGhhc0JhckxpbmU6cixiYXJTaXplOm0sbGVmdERlbGltOnMscmlnaHREZWxpbTpoLHNpemU6dX19LGh0bWxCdWlsZGVyOm5uLG1hdGhtbEJ1aWxkZXI6YW59KSxvdCh7dHlwZToiaW5maXgiLG5hbWVzOlsiXFxhYm92ZSJdLHByb3BzOntudW1BcmdzOjEsYXJnVHlwZXM6WyJzaXplIl0saW5maXg6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPShlLmZ1bmNOYW1lLGUudG9rZW4pO3JldHVybnt0eXBlOiJpbmZpeCIsbW9kZTpyLm1vZGUscmVwbGFjZVdpdGg6IlxcXFxhYm92ZWZyYWMiLHNpemU6VXQodFswXSwic2l6ZSIpLnZhbHVlLHRva2VuOm59fX0pLG90KHt0eXBlOiJnZW5mcmFjIixuYW1lczpbIlxcXFxhYm92ZWZyYWMiXSxwcm9wczp7bnVtQXJnczozLGFyZ1R5cGVzOlsibWF0aCIsInNpemUiLCJtYXRoIl19LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPShlLmZ1bmNOYW1lLHRbMF0pLGE9ZnVuY3Rpb24oZSl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKCJFeHBlY3RlZCBub24tbnVsbCwgYnV0IGdvdCAiK1N0cmluZyhlKSk7cmV0dXJuIGV9KFV0KHRbMV0sImluZml4Iikuc2l6ZSksaT10WzJdLG89YS5udW1iZXI+MDtyZXR1cm57dHlwZToiZ2VuZnJhYyIsbW9kZTpyLm1vZGUsbnVtZXI6bixkZW5vbTppLGNvbnRpbnVlZDohMSxoYXNCYXJMaW5lOm8sYmFyU2l6ZTphLGxlZnREZWxpbTpudWxsLHJpZ2h0RGVsaW06bnVsbCxzaXplOiJhdXRvIn19LGh0bWxCdWlsZGVyOm5uLG1hdGhtbEJ1aWxkZXI6YW59KTt2YXIgbG49ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGE9dC5zdHlsZTsic3Vwc3ViIj09PWUudHlwZT8ocj1lLnN1cD93dChlLnN1cCx0LmhhdmluZ1N0eWxlKGEuc3VwKCkpLHQpOnd0KGUuc3ViLHQuaGF2aW5nU3R5bGUoYS5zdWIoKSksdCksbj1VdChlLmJhc2UsImhvcml6QnJhY2UiKSk6bj1VdChlLCJob3JpekJyYWNlIik7dmFyIGksbz13dChuLmJhc2UsdC5oYXZpbmdCYXNlU3R5bGUoeC5ESVNQTEFZKSkscz1HdChuLHQpO2lmKG4uaXNPdmVyPyhpPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06b30se3R5cGU6Imtlcm4iLHNpemU6LjF9LHt0eXBlOiJlbGVtIixlbGVtOnN9XX0sdCkpLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNsYXNzZXMucHVzaCgic3ZnLWFsaWduIik6KGk9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOm8uZGVwdGgrLjErcy5oZWlnaHQsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOnN9LHt0eXBlOiJrZXJuIixzaXplOi4xfSx7dHlwZToiZWxlbSIsZWxlbTpvfV19LHQpKS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jbGFzc2VzLnB1c2goInN2Zy1hbGlnbiIpLHIpe3ZhciBsPUtlLm1ha2VTcGFuKFsibW9yZCIsbi5pc092ZXI/Im1vdmVyIjoibXVuZGVyIl0sW2ldLHQpO2k9bi5pc092ZXI/S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImZpcnN0QmFzZWxpbmUiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpsfSx7dHlwZToia2VybiIsc2l6ZTouMn0se3R5cGU6ImVsZW0iLGVsZW06cn1dfSx0KTpLZS5tYWtlVkxpc3Qoe3Bvc2l0aW9uVHlwZToiYm90dG9tIixwb3NpdGlvbkRhdGE6bC5kZXB0aCsuMityLmhlaWdodCtyLmRlcHRoLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfSx7dHlwZToia2VybiIsc2l6ZTouMn0se3R5cGU6ImVsZW0iLGVsZW06bH1dfSx0KX1yZXR1cm4gS2UubWFrZVNwYW4oWyJtb3JkIixuLmlzT3Zlcj8ibW92ZXIiOiJtdW5kZXIiXSxbaV0sdCl9O290KHt0eXBlOiJob3JpekJyYWNlIixuYW1lczpbIlxcb3ZlcmJyYWNlIiwiXFx1bmRlcmJyYWNlIl0scHJvcHM6e251bUFyZ3M6MX0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToiaG9yaXpCcmFjZSIsbW9kZTpyLm1vZGUsbGFiZWw6bixpc092ZXI6L15cXG92ZXIvLnRlc3QobiksYmFzZTp0WzBdfX0saHRtbEJ1aWxkZXI6bG4sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPUZ0KGUubGFiZWwpO3JldHVybiBuZXcgVHQuTWF0aE5vZGUoZS5pc092ZXI/Im1vdmVyIjoibXVuZGVyIixbUnQoZS5iYXNlLHQpLHJdKX19KSxvdCh7dHlwZToiaHJlZiIsbmFtZXM6WyJcXGhyZWYiXSxwcm9wczp7bnVtQXJnczoyLGFyZ1R5cGVzOlsidXJsIiwib3JpZ2luYWwiXSxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj10WzFdLGE9VXQodFswXSwidXJsIikudXJsO3JldHVybiByLnNldHRpbmdzLmlzVHJ1c3RlZCh7Y29tbWFuZDoiXFxocmVmIix1cmw6YX0pP3t0eXBlOiJocmVmIixtb2RlOnIubW9kZSxocmVmOmEsYm9keTpodChuKX06ci5mb3JtYXRVbnN1cHBvcnRlZENtZCgiXFxocmVmIil9LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZnQoZS5ib2R5LHQsITEpO3JldHVybiBLZS5tYWtlQW5jaG9yKGUuaHJlZixbXSxyLHQpfSxtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9SXQoZS5ib2R5LHQpO3JldHVybiByIGluc3RhbmNlb2YgenR8fChyPW5ldyB6dCgibXJvdyIsW3JdKSksci5zZXRBdHRyaWJ1dGUoImhyZWYiLGUuaHJlZikscn19KSxvdCh7dHlwZToiaHJlZiIsbmFtZXM6WyJcXHVybCJdLHByb3BzOntudW1BcmdzOjEsYXJnVHlwZXM6WyJ1cmwiXSxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj1VdCh0WzBdLCJ1cmwiKS51cmw7aWYoIXIuc2V0dGluZ3MuaXNUcnVzdGVkKHtjb21tYW5kOiJcXHVybCIsdXJsOm59KSlyZXR1cm4gci5mb3JtYXRVbnN1cHBvcnRlZENtZCgiXFx1cmwiKTtmb3IodmFyIGE9W10saT0wO2k8bi5sZW5ndGg7aSsrKXt2YXIgbz1uW2ldOyJ+Ij09PW8mJihvPSJcXHRleHRhc2NpaXRpbGRlIiksYS5wdXNoKHt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iix0ZXh0Om99KX12YXIgcz17dHlwZToidGV4dCIsbW9kZTpyLm1vZGUsZm9udDoiXFx0ZXh0dHQiLGJvZHk6YX07cmV0dXJue3R5cGU6ImhyZWYiLG1vZGU6ci5tb2RlLGhyZWY6bixib2R5Omh0KHMpfX19KSxvdCh7dHlwZToiaGJveCIsbmFtZXM6WyJcXGhib3giXSxwcm9wczp7bnVtQXJnczoxLGFyZ1R5cGVzOlsidGV4dCJdLGFsbG93ZWRJblRleHQ6ITAscHJpbWl0aXZlOiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJue3R5cGU6Imhib3giLG1vZGU6ZS5wYXJzZXIubW9kZSxib2R5Omh0KHRbMF0pfX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1mdChlLmJvZHksdCwhMSk7cmV0dXJuIEtlLm1ha2VGcmFnbWVudChyKX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiBuZXcgVHQuTWF0aE5vZGUoIm1yb3ciLHF0KGUuYm9keSx0KSl9fSksb3Qoe3R5cGU6Imh0bWwiLG5hbWVzOlsiXFxodG1sQ2xhc3MiLCJcXGh0bWxJZCIsIlxcaHRtbFN0eWxlIiwiXFxodG1sRGF0YSJdLHByb3BzOntudW1BcmdzOjIsYXJnVHlwZXM6WyJyYXciLCJvcmlnaW5hbCJdLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcixhPWUucGFyc2VyLGk9ZS5mdW5jTmFtZSxvPShlLnRva2VuLFV0KHRbMF0sInJhdyIpLnN0cmluZykscz10WzFdO2Euc2V0dGluZ3Muc3RyaWN0JiZhLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgiaHRtbEV4dGVuc2lvbiIsIkhUTUwgZXh0ZW5zaW9uIGlzIGRpc2FibGVkIG9uIHN0cmljdCBtb2RlIik7dmFyIGw9e307c3dpdGNoKGkpe2Nhc2UiXFxodG1sQ2xhc3MiOmwuY2xhc3M9byxyPXtjb21tYW5kOiJcXGh0bWxDbGFzcyIsY2xhc3M6b307YnJlYWs7Y2FzZSJcXGh0bWxJZCI6bC5pZD1vLHI9e2NvbW1hbmQ6IlxcaHRtbElkIixpZDpvfTticmVhaztjYXNlIlxcaHRtbFN0eWxlIjpsLnN0eWxlPW8scj17Y29tbWFuZDoiXFxodG1sU3R5bGUiLHN0eWxlOm99O2JyZWFrO2Nhc2UiXFxodG1sRGF0YSI6Zm9yKHZhciBoPW8uc3BsaXQoIiwiKSxjPTA7YzxoLmxlbmd0aDtjKyspe3ZhciBtPWhbY10uc3BsaXQoIj0iKTtpZigyIT09bS5sZW5ndGgpdGhyb3cgbmV3IG4oIkVycm9yIHBhcnNpbmcga2V5LXZhbHVlIGZvciBcXGh0bWxEYXRhIik7bFsiZGF0YS0iK21bMF0udHJpbSgpXT1tWzFdLnRyaW0oKX1yPXtjb21tYW5kOiJcXGh0bWxEYXRhIixhdHRyaWJ1dGVzOmx9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbnJlY29nbml6ZWQgaHRtbCBjb21tYW5kIil9cmV0dXJuIGEuc2V0dGluZ3MuaXNUcnVzdGVkKHIpP3t0eXBlOiJodG1sIixtb2RlOmEubW9kZSxhdHRyaWJ1dGVzOmwsYm9keTpodChzKX06YS5mb3JtYXRVbnN1cHBvcnRlZENtZChpKX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1mdChlLmJvZHksdCwhMSksbj1bImVuY2xvc2luZyJdO2UuYXR0cmlidXRlcy5jbGFzcyYmbi5wdXNoLmFwcGx5KG4sZS5hdHRyaWJ1dGVzLmNsYXNzLnRyaW0oKS5zcGxpdCgvXHMrLykpO3ZhciBhPUtlLm1ha2VTcGFuKG4scix0KTtmb3IodmFyIGkgaW4gZS5hdHRyaWJ1dGVzKSJjbGFzcyIhPT1pJiZlLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoaSkmJmEuc2V0QXR0cmlidXRlKGksZS5hdHRyaWJ1dGVzW2ldKTtyZXR1cm4gYX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiBJdChlLmJvZHksdCl9fSksb3Qoe3R5cGU6Imh0bWxtYXRobWwiLG5hbWVzOlsiXFxodG1sQG1hdGhtbCJdLHByb3BzOntudW1BcmdzOjIsYWxsb3dlZEluVGV4dDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3JldHVybnt0eXBlOiJodG1sbWF0aG1sIixtb2RlOmUucGFyc2VyLm1vZGUsaHRtbDpodCh0WzBdKSxtYXRobWw6aHQodFsxXSl9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPWZ0KGUuaHRtbCx0LCExKTtyZXR1cm4gS2UubWFrZUZyYWdtZW50KHIpfSxtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEl0KGUubWF0aG1sLHQpfX0pO3ZhciBobj1mdW5jdGlvbihlKXtpZigvXlstK10/ICooXGQrKFwuXGQqKT98XC5cZCspJC8udGVzdChlKSlyZXR1cm57bnVtYmVyOitlLHVuaXQ6ImJwIn07dmFyIHQ9LyhbLStdPykgKihcZCsoPzpcLlxkKik/fFwuXGQrKSAqKFthLXpdezJ9KS8uZXhlYyhlKTtpZighdCl0aHJvdyBuZXcgbigiSW52YWxpZCBzaXplOiAnIitlKyInIGluIFxcaW5jbHVkZWdyYXBoaWNzIik7dmFyIHI9e251bWJlcjorKHRbMV0rdFsyXSksdW5pdDp0WzNdfTtpZighVihyKSl0aHJvdyBuZXcgbigiSW52YWxpZCB1bml0OiAnIityLnVuaXQrIicgaW4gXFxpbmNsdWRlZ3JhcGhpY3MuIik7cmV0dXJuIHJ9O290KHt0eXBlOiJpbmNsdWRlZ3JhcGhpY3MiLG5hbWVzOlsiXFxpbmNsdWRlZ3JhcGhpY3MiXSxwcm9wczp7bnVtQXJnczoxLG51bU9wdGlvbmFsQXJnczoxLGFyZ1R5cGVzOlsicmF3IiwidXJsIl0sYWxsb3dlZEluVGV4dDohMX0saGFuZGxlcjpmdW5jdGlvbihlLHQscil7dmFyIGE9ZS5wYXJzZXIsaT17bnVtYmVyOjAsdW5pdDoiZW0ifSxvPXtudW1iZXI6LjksdW5pdDoiZW0ifSxzPXtudW1iZXI6MCx1bml0OiJlbSJ9LGw9IiI7aWYoclswXSlmb3IodmFyIGg9VXQoclswXSwicmF3Iikuc3RyaW5nLnNwbGl0KCIsIiksYz0wO2M8aC5sZW5ndGg7YysrKXt2YXIgbT1oW2NdLnNwbGl0KCI9Iik7aWYoMj09PW0ubGVuZ3RoKXt2YXIgdT1tWzFdLnRyaW0oKTtzd2l0Y2gobVswXS50cmltKCkpe2Nhc2UiYWx0IjpsPXU7YnJlYWs7Y2FzZSJ3aWR0aCI6aT1obih1KTticmVhaztjYXNlImhlaWdodCI6bz1obih1KTticmVhaztjYXNlInRvdGFsaGVpZ2h0IjpzPWhuKHUpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IG4oIkludmFsaWQga2V5OiAnIittWzBdKyInIGluIFxcaW5jbHVkZWdyYXBoaWNzLiIpfX19dmFyIHA9VXQodFswXSwidXJsIikudXJsO3JldHVybiIiPT09bCYmKGw9KGw9KGw9cCkucmVwbGFjZSgvXi4qW1xcL10vLCIiKSkuc3Vic3RyaW5nKDAsbC5sYXN0SW5kZXhPZigiLiIpKSksYS5zZXR0aW5ncy5pc1RydXN0ZWQoe2NvbW1hbmQ6IlxcaW5jbHVkZWdyYXBoaWNzIix1cmw6cH0pP3t0eXBlOiJpbmNsdWRlZ3JhcGhpY3MiLG1vZGU6YS5tb2RlLGFsdDpsLHdpZHRoOmksaGVpZ2h0Om8sdG90YWxoZWlnaHQ6cyxzcmM6cH06YS5mb3JtYXRVbnN1cHBvcnRlZENtZCgiXFxpbmNsdWRlZ3JhcGhpY3MiKX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1QKGUuaGVpZ2h0LHQpLG49MDtlLnRvdGFsaGVpZ2h0Lm51bWJlcj4wJiYobj1QKGUudG90YWxoZWlnaHQsdCktcik7dmFyIGE9MDtlLndpZHRoLm51bWJlcj4wJiYoYT1QKGUud2lkdGgsdCkpO3ZhciBpPXtoZWlnaHQ6RihyK24pfTthPjAmJihpLndpZHRoPUYoYSkpLG4+MCYmKGkudmVydGljYWxBbGlnbj1GKC1uKSk7dmFyIG89bmV3IGooZS5zcmMsZS5hbHQsaSk7cmV0dXJuIG8uaGVpZ2h0PXIsby5kZXB0aD1uLG99LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm1nbHlwaCIsW10pO3Iuc2V0QXR0cmlidXRlKCJhbHQiLGUuYWx0KTt2YXIgbj1QKGUuaGVpZ2h0LHQpLGE9MDtpZihlLnRvdGFsaGVpZ2h0Lm51bWJlcj4wJiYoYT1QKGUudG90YWxoZWlnaHQsdCktbixyLnNldEF0dHJpYnV0ZSgidmFsaWduIixGKC1hKSkpLHIuc2V0QXR0cmlidXRlKCJoZWlnaHQiLEYobithKSksZS53aWR0aC5udW1iZXI+MCl7dmFyIGk9UChlLndpZHRoLHQpO3Iuc2V0QXR0cmlidXRlKCJ3aWR0aCIsRihpKSl9cmV0dXJuIHIuc2V0QXR0cmlidXRlKCJzcmMiLGUuc3JjKSxyfX0pLG90KHt0eXBlOiJrZXJuIixuYW1lczpbIlxca2VybiIsIlxcbWtlcm4iLCJcXGhza2lwIiwiXFxtc2tpcCJdLHByb3BzOntudW1BcmdzOjEsYXJnVHlwZXM6WyJzaXplIl0scHJpbWl0aXZlOiEwLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT1VdCh0WzBdLCJzaXplIik7aWYoci5zZXR0aW5ncy5zdHJpY3Qpe3ZhciBpPSJtIj09PW5bMV0sbz0ibXUiPT09YS52YWx1ZS51bml0O2k/KG98fHIuc2V0dGluZ3MucmVwb3J0Tm9uc3RyaWN0KCJtYXRoVnNUZXh0VW5pdHMiLCJMYVRlWCdzICIrbisiIHN1cHBvcnRzIG9ubHkgbXUgdW5pdHMsIG5vdCAiK2EudmFsdWUudW5pdCsiIHVuaXRzIiksIm1hdGgiIT09ci5tb2RlJiZyLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgibWF0aFZzVGV4dFVuaXRzIiwiTGFUZVgncyAiK24rIiB3b3JrcyBvbmx5IGluIG1hdGggbW9kZSIpKTpvJiZyLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgibWF0aFZzVGV4dFVuaXRzIiwiTGFUZVgncyAiK24rIiBkb2Vzbid0IHN1cHBvcnQgbXUgdW5pdHMiKX1yZXR1cm57dHlwZToia2VybiIsbW9kZTpyLm1vZGUsZGltZW5zaW9uOmEudmFsdWV9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiBLZS5tYWtlR2x1ZShlLmRpbWVuc2lvbix0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPVAoZS5kaW1lbnNpb24sdCk7cmV0dXJuIG5ldyBUdC5TcGFjZU5vZGUocil9fSksb3Qoe3R5cGU6ImxhcCIsbmFtZXM6WyJcXG1hdGhsbGFwIiwiXFxtYXRocmxhcCIsIlxcbWF0aGNsYXAiXSxwcm9wczp7bnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT10WzBdO3JldHVybnt0eXBlOiJsYXAiLG1vZGU6ci5tb2RlLGFsaWdubWVudDpuLnNsaWNlKDUpLGJvZHk6YX19LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI7ImNsYXAiPT09ZS5hbGlnbm1lbnQ/KHI9S2UubWFrZVNwYW4oW10sW3d0KGUuYm9keSx0KV0pLHI9S2UubWFrZVNwYW4oWyJpbm5lciJdLFtyXSx0KSk6cj1LZS5tYWtlU3BhbihbImlubmVyIl0sW3d0KGUuYm9keSx0KV0pO3ZhciBuPUtlLm1ha2VTcGFuKFsiZml4Il0sW10pLGE9S2UubWFrZVNwYW4oW2UuYWxpZ25tZW50XSxbcixuXSx0KSxpPUtlLm1ha2VTcGFuKFsic3RydXQiXSk7cmV0dXJuIGkuc3R5bGUuaGVpZ2h0PUYoYS5oZWlnaHQrYS5kZXB0aCksYS5kZXB0aCYmKGkuc3R5bGUudmVydGljYWxBbGlnbj1GKC1hLmRlcHRoKSksYS5jaGlsZHJlbi51bnNoaWZ0KGkpLGE9S2UubWFrZVNwYW4oWyJ0aGluYm94Il0sW2FdLHQpLEtlLm1ha2VTcGFuKFsibW9yZCIsInZib3giXSxbYV0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm1wYWRkZWQiLFtSdChlLmJvZHksdCldKTtpZigicmxhcCIhPT1lLmFsaWdubWVudCl7dmFyIG49ImxsYXAiPT09ZS5hbGlnbm1lbnQ/Ii0xIjoiLTAuNSI7ci5zZXRBdHRyaWJ1dGUoImxzcGFjZSIsbisid2lkdGgiKX1yZXR1cm4gci5zZXRBdHRyaWJ1dGUoIndpZHRoIiwiMHB4Iikscn19KSxvdCh7dHlwZToic3R5bGluZyIsbmFtZXM6WyJcXCgiLCIkIl0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLGFsbG93ZWRJbk1hdGg6ITF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLmZ1bmNOYW1lLG49ZS5wYXJzZXIsYT1uLm1vZGU7bi5zd2l0Y2hNb2RlKCJtYXRoIik7dmFyIGk9IlxcKCI9PT1yPyJcXCkiOiIkIixvPW4ucGFyc2VFeHByZXNzaW9uKCExLGkpO3JldHVybiBuLmV4cGVjdChpKSxuLnN3aXRjaE1vZGUoYSkse3R5cGU6InN0eWxpbmciLG1vZGU6bi5tb2RlLHN0eWxlOiJ0ZXh0Iixib2R5Om99fX0pLG90KHt0eXBlOiJ0ZXh0IixuYW1lczpbIlxcKSIsIlxcXSJdLHByb3BzOntudW1BcmdzOjAsYWxsb3dlZEluVGV4dDohMCxhbGxvd2VkSW5NYXRoOiExfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dGhyb3cgbmV3IG4oIk1pc21hdGNoZWQgIitlLmZ1bmNOYW1lKX19KTt2YXIgY249ZnVuY3Rpb24oZSx0KXtzd2l0Y2godC5zdHlsZS5zaXplKXtjYXNlIHguRElTUExBWS5zaXplOnJldHVybiBlLmRpc3BsYXk7Y2FzZSB4LlRFWFQuc2l6ZTpyZXR1cm4gZS50ZXh0O2Nhc2UgeC5TQ1JJUFQuc2l6ZTpyZXR1cm4gZS5zY3JpcHQ7Y2FzZSB4LlNDUklQVFNDUklQVC5zaXplOnJldHVybiBlLnNjcmlwdHNjcmlwdDtkZWZhdWx0OnJldHVybiBlLnRleHR9fTtvdCh7dHlwZToibWF0aGNob2ljZSIsbmFtZXM6WyJcXG1hdGhjaG9pY2UiXSxwcm9wczp7bnVtQXJnczo0LHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3JldHVybnt0eXBlOiJtYXRoY2hvaWNlIixtb2RlOmUucGFyc2VyLm1vZGUsZGlzcGxheTpodCh0WzBdKSx0ZXh0Omh0KHRbMV0pLHNjcmlwdDpodCh0WzJdKSxzY3JpcHRzY3JpcHQ6aHQodFszXSl9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPWNuKGUsdCksbj1mdChyLHQsITEpO3JldHVybiBLZS5tYWtlRnJhZ21lbnQobil9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1jbihlLHQpO3JldHVybiBJdChyLHQpfX0pO3ZhciBtbj1mdW5jdGlvbihlLHQscixuLGEsaSxvKXtlPUtlLm1ha2VTcGFuKFtdLFtlXSk7dmFyIHMsaCxjLG09ciYmbC5pc0NoYXJhY3RlckJveChyKTtpZih0KXt2YXIgdT13dCh0LG4uaGF2aW5nU3R5bGUoYS5zdXAoKSksbik7aD17ZWxlbTp1LGtlcm46TWF0aC5tYXgobi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzEsbi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzMtdS5kZXB0aCl9fWlmKHIpe3ZhciBwPXd0KHIsbi5oYXZpbmdTdHlsZShhLnN1YigpKSxuKTtzPXtlbGVtOnAsa2VybjpNYXRoLm1heChuLmZvbnRNZXRyaWNzKCkuYmlnT3BTcGFjaW5nMixuLmZvbnRNZXRyaWNzKCkuYmlnT3BTcGFjaW5nNC1wLmhlaWdodCl9fWlmKGgmJnMpe3ZhciBkPW4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmc1K3MuZWxlbS5oZWlnaHQrcy5lbGVtLmRlcHRoK3Mua2VybitlLmRlcHRoK287Yz1LZS5tYWtlVkxpc3Qoe3Bvc2l0aW9uVHlwZToiYm90dG9tIixwb3NpdGlvbkRhdGE6ZCxjaGlsZHJlbjpbe3R5cGU6Imtlcm4iLHNpemU6bi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzV9LHt0eXBlOiJlbGVtIixlbGVtOnMuZWxlbSxtYXJnaW5MZWZ0OkYoLWkpfSx7dHlwZToia2VybiIsc2l6ZTpzLmtlcm59LHt0eXBlOiJlbGVtIixlbGVtOmV9LHt0eXBlOiJrZXJuIixzaXplOmgua2Vybn0se3R5cGU6ImVsZW0iLGVsZW06aC5lbGVtLG1hcmdpbkxlZnQ6RihpKX0se3R5cGU6Imtlcm4iLHNpemU6bi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzV9XX0sbil9ZWxzZSBpZihzKXt2YXIgZj1lLmhlaWdodC1vO2M9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6InRvcCIscG9zaXRpb25EYXRhOmYsY2hpbGRyZW46W3t0eXBlOiJrZXJuIixzaXplOm4uZm9udE1ldHJpY3MoKS5iaWdPcFNwYWNpbmc1fSx7dHlwZToiZWxlbSIsZWxlbTpzLmVsZW0sbWFyZ2luTGVmdDpGKC1pKX0se3R5cGU6Imtlcm4iLHNpemU6cy5rZXJufSx7dHlwZToiZWxlbSIsZWxlbTplfV19LG4pfWVsc2V7aWYoIWgpcmV0dXJuIGU7dmFyIGc9ZS5kZXB0aCtvO2M9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImJvdHRvbSIscG9zaXRpb25EYXRhOmcsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmV9LHt0eXBlOiJrZXJuIixzaXplOmgua2Vybn0se3R5cGU6ImVsZW0iLGVsZW06aC5lbGVtLG1hcmdpbkxlZnQ6RihpKX0se3R5cGU6Imtlcm4iLHNpemU6bi5mb250TWV0cmljcygpLmJpZ09wU3BhY2luZzV9XX0sbil9dmFyIHY9W2NdO2lmKHMmJjAhPT1pJiYhbSl7dmFyIGI9S2UubWFrZVNwYW4oWyJtc3BhY2UiXSxbXSxuKTtiLnN0eWxlLm1hcmdpblJpZ2h0PUYoaSksdi51bnNoaWZ0KGIpfXJldHVybiBLZS5tYWtlU3BhbihbIm1vcCIsIm9wLWxpbWl0cyJdLHYsbil9LHVuPVsiXFxzbWFsbGludCJdLHBuPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixhLGk9ITE7InN1cHN1YiI9PT1lLnR5cGU/KHI9ZS5zdXAsbj1lLnN1YixhPVV0KGUuYmFzZSwib3AiKSxpPSEwKTphPVV0KGUsIm9wIik7dmFyIG8scz10LnN0eWxlLGg9ITE7aWYocy5zaXplPT09eC5ESVNQTEFZLnNpemUmJmEuc3ltYm9sJiYhbC5jb250YWlucyh1bixhLm5hbWUpJiYoaD0hMCksYS5zeW1ib2wpe3ZhciBjPWg/IlNpemUyLVJlZ3VsYXIiOiJTaXplMS1SZWd1bGFyIixtPSIiO2lmKCJcXG9paW50IiE9PWEubmFtZSYmIlxcb2lpaW50IiE9PWEubmFtZXx8KG09YS5uYW1lLnNsaWNlKDEpLGEubmFtZT0ib2lpbnQiPT09bT8iXFxpaW50IjoiXFxpaWludCIpLG89S2UubWFrZVN5bWJvbChhLm5hbWUsYywibWF0aCIsdCxbIm1vcCIsIm9wLXN5bWJvbCIsaD8ibGFyZ2Utb3AiOiJzbWFsbC1vcCJdKSxtLmxlbmd0aD4wKXt2YXIgdT1vLml0YWxpYyxwPUtlLnN0YXRpY1N2ZyhtKyJTaXplIisoaD8iMiI6IjEiKSx0KTtvPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJpbmRpdmlkdWFsU2hpZnQiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpvLHNoaWZ0OjB9LHt0eXBlOiJlbGVtIixlbGVtOnAsc2hpZnQ6aD8uMDg6MH1dfSx0KSxhLm5hbWU9IlxcIittLG8uY2xhc3Nlcy51bnNoaWZ0KCJtb3AiKSxvLml0YWxpYz11fX1lbHNlIGlmKGEuYm9keSl7dmFyIGQ9ZnQoYS5ib2R5LHQsITApOzE9PT1kLmxlbmd0aCYmZFswXWluc3RhbmNlb2YgWj8obz1kWzBdKS5jbGFzc2VzWzBdPSJtb3AiOm89S2UubWFrZVNwYW4oWyJtb3AiXSxkLHQpfWVsc2V7Zm9yKHZhciBmPVtdLGc9MTtnPGEubmFtZS5sZW5ndGg7ZysrKWYucHVzaChLZS5tYXRoc3ltKGEubmFtZVtnXSxhLm1vZGUsdCkpO289S2UubWFrZVNwYW4oWyJtb3AiXSxmLHQpfXZhciB2PTAsYj0wO3JldHVybihvIGluc3RhbmNlb2YgWnx8Ilxcb2lpbnQiPT09YS5uYW1lfHwiXFxvaWlpbnQiPT09YS5uYW1lKSYmIWEuc3VwcHJlc3NCYXNlU2hpZnQmJih2PShvLmhlaWdodC1vLmRlcHRoKS8yLXQuZm9udE1ldHJpY3MoKS5heGlzSGVpZ2h0LGI9by5pdGFsaWMpLGk/bW4obyxyLG4sdCxzLGIsdik6KHYmJihvLnN0eWxlLnBvc2l0aW9uPSJyZWxhdGl2ZSIsby5zdHlsZS50b3A9Rih2KSksbyl9LGRuPWZ1bmN0aW9uKGUsdCl7dmFyIHI7aWYoZS5zeW1ib2wpcj1uZXcgenQoIm1vIixbQnQoZS5uYW1lLGUubW9kZSldKSxsLmNvbnRhaW5zKHVuLGUubmFtZSkmJnIuc2V0QXR0cmlidXRlKCJsYXJnZW9wIiwiZmFsc2UiKTtlbHNlIGlmKGUuYm9keSlyPW5ldyB6dCgibW8iLHF0KGUuYm9keSx0KSk7ZWxzZXtyPW5ldyB6dCgibWkiLFtuZXcgQXQoZS5uYW1lLnNsaWNlKDEpKV0pO3ZhciBuPW5ldyB6dCgibW8iLFtCdCgiXHUyMDYxIiwidGV4dCIpXSk7cj1lLnBhcmVudElzU3VwU3ViP25ldyB6dCgibXJvdyIsW3Isbl0pOk10KFtyLG5dKX1yZXR1cm4gcn0sZm49eyJcdTIyMGYiOiJcXHByb2QiLCJcdTIyMTAiOiJcXGNvcHJvZCIsIlx1MjIxMSI6Ilxcc3VtIiwiXHUyMmMwIjoiXFxiaWd3ZWRnZSIsIlx1MjJjMSI6IlxcYmlndmVlIiwiXHUyMmMyIjoiXFxiaWdjYXAiLCJcdTIyYzMiOiJcXGJpZ2N1cCIsIlx1MmEwMCI6IlxcYmlnb2RvdCIsIlx1MmEwMSI6IlxcYmlnb3BsdXMiLCJcdTJhMDIiOiJcXGJpZ290aW1lcyIsIlx1MmEwNCI6IlxcYmlndXBsdXMiLCJcdTJhMDYiOiJcXGJpZ3NxY3VwIn07b3Qoe3R5cGU6Im9wIixuYW1lczpbIlxcY29wcm9kIiwiXFxiaWd2ZWUiLCJcXGJpZ3dlZGdlIiwiXFxiaWd1cGx1cyIsIlxcYmlnY2FwIiwiXFxiaWdjdXAiLCJcXGludG9wIiwiXFxwcm9kIiwiXFxzdW0iLCJcXGJpZ290aW1lcyIsIlxcYmlnb3BsdXMiLCJcXGJpZ29kb3QiLCJcXGJpZ3NxY3VwIiwiXFxzbWFsbGludCIsIlx1MjIwZiIsIlx1MjIxMCIsIlx1MjIxMSIsIlx1MjJjMCIsIlx1MjJjMSIsIlx1MjJjMiIsIlx1MjJjMyIsIlx1MmEwMCIsIlx1MmEwMSIsIlx1MmEwMiIsIlx1MmEwNCIsIlx1MmEwNiJdLHByb3BzOntudW1BcmdzOjB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWU7cmV0dXJuIDE9PT1uLmxlbmd0aCYmKG49Zm5bbl0pLHt0eXBlOiJvcCIsbW9kZTpyLm1vZGUsbGltaXRzOiEwLHBhcmVudElzU3VwU3ViOiExLHN5bWJvbDohMCxuYW1lOm59fSxodG1sQnVpbGRlcjpwbixtYXRobWxCdWlsZGVyOmRufSksb3Qoe3R5cGU6Im9wIixuYW1lczpbIlxcbWF0aG9wIl0scHJvcHM6e251bUFyZ3M6MSxwcmltaXRpdmU6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPXRbMF07cmV0dXJue3R5cGU6Im9wIixtb2RlOnIubW9kZSxsaW1pdHM6ITEscGFyZW50SXNTdXBTdWI6ITEsc3ltYm9sOiExLGJvZHk6aHQobil9fSxodG1sQnVpbGRlcjpwbixtYXRobWxCdWlsZGVyOmRufSk7dmFyIGduPXsiXHUyMjJiIjoiXFxpbnQiLCJcdTIyMmMiOiJcXGlpbnQiLCJcdTIyMmQiOiJcXGlpaW50IiwiXHUyMjJlIjoiXFxvaW50IiwiXHUyMjJmIjoiXFxvaWludCIsIlx1MjIzMCI6Ilxcb2lpaW50In07b3Qoe3R5cGU6Im9wIixuYW1lczpbIlxcYXJjc2luIiwiXFxhcmNjb3MiLCJcXGFyY3RhbiIsIlxcYXJjdGciLCJcXGFyY2N0ZyIsIlxcYXJnIiwiXFxjaCIsIlxcY29zIiwiXFxjb3NlYyIsIlxcY29zaCIsIlxcY290IiwiXFxjb3RnIiwiXFxjb3RoIiwiXFxjc2MiLCJcXGN0ZyIsIlxcY3RoIiwiXFxkZWciLCJcXGRpbSIsIlxcZXhwIiwiXFxob20iLCJcXGtlciIsIlxcbGciLCJcXGxuIiwiXFxsb2ciLCJcXHNlYyIsIlxcc2luIiwiXFxzaW5oIiwiXFxzaCIsIlxcdGFuIiwiXFx0YW5oIiwiXFx0ZyIsIlxcdGgiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToib3AiLG1vZGU6dC5tb2RlLGxpbWl0czohMSxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITEsbmFtZTpyfX0saHRtbEJ1aWxkZXI6cG4sbWF0aG1sQnVpbGRlcjpkbn0pLG90KHt0eXBlOiJvcCIsbmFtZXM6WyJcXGRldCIsIlxcZ2NkIiwiXFxpbmYiLCJcXGxpbSIsIlxcbWF4IiwiXFxtaW4iLCJcXFByIiwiXFxzdXAiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTtyZXR1cm57dHlwZToib3AiLG1vZGU6dC5tb2RlLGxpbWl0czohMCxwYXJlbnRJc1N1cFN1YjohMSxzeW1ib2w6ITEsbmFtZTpyfX0saHRtbEJ1aWxkZXI6cG4sbWF0aG1sQnVpbGRlcjpkbn0pLG90KHt0eXBlOiJvcCIsbmFtZXM6WyJcXGludCIsIlxcaWludCIsIlxcaWlpbnQiLCJcXG9pbnQiLCJcXG9paW50IiwiXFxvaWlpbnQiLCJcdTIyMmIiLCJcdTIyMmMiLCJcdTIyMmQiLCJcdTIyMmUiLCJcdTIyMmYiLCJcdTIyMzAiXSxwcm9wczp7bnVtQXJnczowfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyc2VyLHI9ZS5mdW5jTmFtZTtyZXR1cm4gMT09PXIubGVuZ3RoJiYocj1nbltyXSkse3R5cGU6Im9wIixtb2RlOnQubW9kZSxsaW1pdHM6ITEscGFyZW50SXNTdXBTdWI6ITEsc3ltYm9sOiEwLG5hbWU6cn19LGh0bWxCdWlsZGVyOnBuLG1hdGhtbEJ1aWxkZXI6ZG59KTt2YXIgdm49ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGEsaSxvPSExO2lmKCJzdXBzdWIiPT09ZS50eXBlPyhyPWUuc3VwLG49ZS5zdWIsYT1VdChlLmJhc2UsIm9wZXJhdG9ybmFtZSIpLG89ITApOmE9VXQoZSwib3BlcmF0b3JuYW1lIiksYS5ib2R5Lmxlbmd0aD4wKXtmb3IodmFyIHM9YS5ib2R5Lm1hcCgoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50ZXh0O3JldHVybiJzdHJpbmciPT10eXBlb2YgdD97dHlwZToidGV4dG9yZCIsbW9kZTplLm1vZGUsdGV4dDp0fTplfSkpLGw9ZnQocyx0LndpdGhGb250KCJtYXRocm0iKSwhMCksaD0wO2g8bC5sZW5ndGg7aCsrKXt2YXIgYz1sW2hdO2MgaW5zdGFuY2VvZiBaJiYoYy50ZXh0PWMudGV4dC5yZXBsYWNlKC9cdTIyMTIvLCItIikucmVwbGFjZSgvXHUyMjE3LywiKiIpKX1pPUtlLm1ha2VTcGFuKFsibW9wIl0sbCx0KX1lbHNlIGk9S2UubWFrZVNwYW4oWyJtb3AiXSxbXSx0KTtyZXR1cm4gbz9tbihpLHIsbix0LHQuc3R5bGUsMCwwKTppfTtmdW5jdGlvbiBibihlLHQscil7Zm9yKHZhciBuPWZ0KGUsdCwhMSksYT10LnNpemVNdWx0aXBsaWVyL3Iuc2l6ZU11bHRpcGxpZXIsaT0wO2k8bi5sZW5ndGg7aSsrKXt2YXIgbz1uW2ldLmNsYXNzZXMuaW5kZXhPZigic2l6aW5nIik7bzwwP0FycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG5baV0uY2xhc3Nlcyx0LnNpemluZ0NsYXNzZXMocikpOm5baV0uY2xhc3Nlc1tvKzFdPT09InJlc2V0LXNpemUiK3Quc2l6ZSYmKG5baV0uY2xhc3Nlc1tvKzFdPSJyZXNldC1zaXplIityLnNpemUpLG5baV0uaGVpZ2h0Kj1hLG5baV0uZGVwdGgqPWF9cmV0dXJuIEtlLm1ha2VGcmFnbWVudChuKX1vdCh7dHlwZToib3BlcmF0b3JuYW1lIixuYW1lczpbIlxcb3BlcmF0b3JuYW1lQCIsIlxcb3BlcmF0b3JuYW1ld2l0aGxpbWl0cyJdLHByb3BzOntudW1BcmdzOjF9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT10WzBdO3JldHVybnt0eXBlOiJvcGVyYXRvcm5hbWUiLG1vZGU6ci5tb2RlLGJvZHk6aHQoYSksYWx3YXlzSGFuZGxlU3VwU3ViOiJcXG9wZXJhdG9ybmFtZXdpdGhsaW1pdHMiPT09bixsaW1pdHM6ITEscGFyZW50SXNTdXBTdWI6ITF9fSxodG1sQnVpbGRlcjp2bixtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPXF0KGUuYm9keSx0LndpdGhGb250KCJtYXRocm0iKSksbj0hMCxhPTA7YTxyLmxlbmd0aDthKyspe3ZhciBpPXJbYV07aWYoaSBpbnN0YW5jZW9mIFR0LlNwYWNlTm9kZSk7ZWxzZSBpZihpIGluc3RhbmNlb2YgVHQuTWF0aE5vZGUpc3dpdGNoKGkudHlwZSl7Y2FzZSJtaSI6Y2FzZSJtbiI6Y2FzZSJtcyI6Y2FzZSJtc3BhY2UiOmNhc2UibXRleHQiOmJyZWFrO2Nhc2UibW8iOnZhciBvPWkuY2hpbGRyZW5bMF07MT09PWkuY2hpbGRyZW4ubGVuZ3RoJiZvIGluc3RhbmNlb2YgVHQuVGV4dE5vZGU/by50ZXh0PW8udGV4dC5yZXBsYWNlKC9cdTIyMTIvLCItIikucmVwbGFjZSgvXHUyMjE3LywiKiIpOm49ITE7YnJlYWs7ZGVmYXVsdDpuPSExfWVsc2Ugbj0hMX1pZihuKXt2YXIgcz1yLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGUudG9UZXh0KCl9KSkuam9pbigiIik7cj1bbmV3IFR0LlRleHROb2RlKHMpXX12YXIgbD1uZXcgVHQuTWF0aE5vZGUoIm1pIixyKTtsLnNldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiLCJub3JtYWwiKTt2YXIgaD1uZXcgVHQuTWF0aE5vZGUoIm1vIixbQnQoIlx1MjA2MSIsInRleHQiKV0pO3JldHVybiBlLnBhcmVudElzU3VwU3ViP25ldyBUdC5NYXRoTm9kZSgibXJvdyIsW2wsaF0pOlR0Lm5ld0RvY3VtZW50RnJhZ21lbnQoW2wsaF0pfX0pLFByKCJcXG9wZXJhdG9ybmFtZSIsIlxcQGlmc3Rhclxcb3BlcmF0b3JuYW1ld2l0aGxpbWl0c1xcb3BlcmF0b3JuYW1lQCIpLHN0KHt0eXBlOiJvcmRncm91cCIsaHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5zZW1pc2ltcGxlP0tlLm1ha2VGcmFnbWVudChmdChlLmJvZHksdCwhMSkpOktlLm1ha2VTcGFuKFsibW9yZCJdLGZ0KGUuYm9keSx0LCEwKSx0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiBJdChlLmJvZHksdCwhMCl9fSksb3Qoe3R5cGU6Im92ZXJsaW5lIixuYW1lczpbIlxcb3ZlcmxpbmUiXSxwcm9wczp7bnVtQXJnczoxfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj10WzBdO3JldHVybnt0eXBlOiJvdmVybGluZSIsbW9kZTpyLm1vZGUsYm9keTpufX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj13dChlLmJvZHksdC5oYXZpbmdDcmFtcGVkU3R5bGUoKSksbj1LZS5tYWtlTGluZVNwYW4oIm92ZXJsaW5lLWxpbmUiLHQpLGE9dC5mb250TWV0cmljcygpLmRlZmF1bHRSdWxlVGhpY2tuZXNzLGk9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImZpcnN0QmFzZWxpbmUiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfSx7dHlwZToia2VybiIsc2l6ZTozKmF9LHt0eXBlOiJlbGVtIixlbGVtOm59LHt0eXBlOiJrZXJuIixzaXplOmF9XX0sdCk7cmV0dXJuIEtlLm1ha2VTcGFuKFsibW9yZCIsIm92ZXJsaW5lIl0sW2ldLHQpfSxtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IFR0Lk1hdGhOb2RlKCJtbyIsW25ldyBUdC5UZXh0Tm9kZSgiXHUyMDNlIildKTtyLnNldEF0dHJpYnV0ZSgic3RyZXRjaHkiLCJ0cnVlIik7dmFyIG49bmV3IFR0Lk1hdGhOb2RlKCJtb3ZlciIsW1J0KGUuYm9keSx0KSxyXSk7cmV0dXJuIG4uc2V0QXR0cmlidXRlKCJhY2NlbnQiLCJ0cnVlIiksbn19KSxvdCh7dHlwZToicGhhbnRvbSIsbmFtZXM6WyJcXHBoYW50b20iXSxwcm9wczp7bnVtQXJnczoxLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPXRbMF07cmV0dXJue3R5cGU6InBoYW50b20iLG1vZGU6ci5tb2RlLGJvZHk6aHQobil9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPWZ0KGUuYm9keSx0LndpdGhQaGFudG9tKCksITEpO3JldHVybiBLZS5tYWtlRnJhZ21lbnQocil9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1xdChlLmJvZHksdCk7cmV0dXJuIG5ldyBUdC5NYXRoTm9kZSgibXBoYW50b20iLHIpfX0pLG90KHt0eXBlOiJocGhhbnRvbSIsbmFtZXM6WyJcXGhwaGFudG9tIl0scHJvcHM6e251bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj10WzBdO3JldHVybnt0eXBlOiJocGhhbnRvbSIsbW9kZTpyLm1vZGUsYm9keTpufX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1LZS5tYWtlU3BhbihbXSxbd3QoZS5ib2R5LHQud2l0aFBoYW50b20oKSldKTtpZihyLmhlaWdodD0wLHIuZGVwdGg9MCxyLmNoaWxkcmVuKWZvcih2YXIgbj0wO248ci5jaGlsZHJlbi5sZW5ndGg7bisrKXIuY2hpbGRyZW5bbl0uaGVpZ2h0PTAsci5jaGlsZHJlbltuXS5kZXB0aD0wO3JldHVybiByPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06cn1dfSx0KSxLZS5tYWtlU3BhbihbIm1vcmQiXSxbcl0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1xdChodChlLmJvZHkpLHQpLG49bmV3IFR0Lk1hdGhOb2RlKCJtcGhhbnRvbSIsciksYT1uZXcgVHQuTWF0aE5vZGUoIm1wYWRkZWQiLFtuXSk7cmV0dXJuIGEuc2V0QXR0cmlidXRlKCJoZWlnaHQiLCIwcHgiKSxhLnNldEF0dHJpYnV0ZSgiZGVwdGgiLCIwcHgiKSxhfX0pLG90KHt0eXBlOiJ2cGhhbnRvbSIsbmFtZXM6WyJcXHZwaGFudG9tIl0scHJvcHM6e251bUFyZ3M6MSxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5wYXJzZXIsbj10WzBdO3JldHVybnt0eXBlOiJ2cGhhbnRvbSIsbW9kZTpyLm1vZGUsYm9keTpufX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1LZS5tYWtlU3BhbihbImlubmVyIl0sW3d0KGUuYm9keSx0LndpdGhQaGFudG9tKCkpXSksbj1LZS5tYWtlU3BhbihbImZpeCJdLFtdKTtyZXR1cm4gS2UubWFrZVNwYW4oWyJtb3JkIiwicmxhcCJdLFtyLG5dLHQpfSxtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9cXQoaHQoZS5ib2R5KSx0KSxuPW5ldyBUdC5NYXRoTm9kZSgibXBoYW50b20iLHIpLGE9bmV3IFR0Lk1hdGhOb2RlKCJtcGFkZGVkIixbbl0pO3JldHVybiBhLnNldEF0dHJpYnV0ZSgid2lkdGgiLCIwcHgiKSxhfX0pLG90KHt0eXBlOiJyYWlzZWJveCIsbmFtZXM6WyJcXHJhaXNlYm94Il0scHJvcHM6e251bUFyZ3M6MixhcmdUeXBlczpbInNpemUiLCJoYm94Il0sYWxsb3dlZEluVGV4dDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUucGFyc2VyLG49VXQodFswXSwic2l6ZSIpLnZhbHVlLGE9dFsxXTtyZXR1cm57dHlwZToicmFpc2Vib3giLG1vZGU6ci5tb2RlLGR5Om4sYm9keTphfX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj13dChlLmJvZHksdCksbj1QKGUuZHksdCk7cmV0dXJuIEtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOi1uLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfV19LHQpfSxtYXRobWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IFR0Lk1hdGhOb2RlKCJtcGFkZGVkIixbUnQoZS5ib2R5LHQpXSksbj1lLmR5Lm51bWJlcitlLmR5LnVuaXQ7cmV0dXJuIHIuc2V0QXR0cmlidXRlKCJ2b2Zmc2V0IixuKSxyfX0pLG90KHt0eXBlOiJpbnRlcm5hbCIsbmFtZXM6WyJcXHJlbGF4Il0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwfSxoYW5kbGVyOmZ1bmN0aW9uKGUpe3JldHVybnt0eXBlOiJpbnRlcm5hbCIsbW9kZTplLnBhcnNlci5tb2RlfX19KSxvdCh7dHlwZToicnVsZSIsbmFtZXM6WyJcXHJ1bGUiXSxwcm9wczp7bnVtQXJnczoyLG51bU9wdGlvbmFsQXJnczoxLGFyZ1R5cGVzOlsic2l6ZSIsInNpemUiLCJzaXplIl19LGhhbmRsZXI6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPWUucGFyc2VyLGE9clswXSxpPVV0KHRbMF0sInNpemUiKSxvPVV0KHRbMV0sInNpemUiKTtyZXR1cm57dHlwZToicnVsZSIsbW9kZTpuLm1vZGUsc2hpZnQ6YSYmVXQoYSwic2l6ZSIpLnZhbHVlLHdpZHRoOmkudmFsdWUsaGVpZ2h0Om8udmFsdWV9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPUtlLm1ha2VTcGFuKFsibW9yZCIsInJ1bGUiXSxbXSx0KSxuPVAoZS53aWR0aCx0KSxhPVAoZS5oZWlnaHQsdCksaT1lLnNoaWZ0P1AoZS5zaGlmdCx0KTowO3JldHVybiByLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg9RihuKSxyLnN0eWxlLmJvcmRlclRvcFdpZHRoPUYoYSksci5zdHlsZS5ib3R0b209RihpKSxyLndpZHRoPW4sci5oZWlnaHQ9YStpLHIuZGVwdGg9LWksci5tYXhGb250U2l6ZT0xLjEyNSphKnQuc2l6ZU11bHRpcGxpZXIscn0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPVAoZS53aWR0aCx0KSxuPVAoZS5oZWlnaHQsdCksYT1lLnNoaWZ0P1AoZS5zaGlmdCx0KTowLGk9dC5jb2xvciYmdC5nZXRDb2xvcigpfHwiYmxhY2siLG89bmV3IFR0Lk1hdGhOb2RlKCJtc3BhY2UiKTtvLnNldEF0dHJpYnV0ZSgibWF0aGJhY2tncm91bmQiLGkpLG8uc2V0QXR0cmlidXRlKCJ3aWR0aCIsRihyKSksby5zZXRBdHRyaWJ1dGUoImhlaWdodCIsRihuKSk7dmFyIHM9bmV3IFR0Lk1hdGhOb2RlKCJtcGFkZGVkIixbb10pO3JldHVybiBhPj0wP3Muc2V0QXR0cmlidXRlKCJoZWlnaHQiLEYoYSkpOihzLnNldEF0dHJpYnV0ZSgiaGVpZ2h0IixGKGEpKSxzLnNldEF0dHJpYnV0ZSgiZGVwdGgiLEYoLWEpKSkscy5zZXRBdHRyaWJ1dGUoInZvZmZzZXQiLEYoYSkpLHN9fSk7dmFyIHluPVsiXFx0aW55IiwiXFxzaXhwdHNpemUiLCJcXHNjcmlwdHNpemUiLCJcXGZvb3Rub3Rlc2l6ZSIsIlxcc21hbGwiLCJcXG5vcm1hbHNpemUiLCJcXGxhcmdlIiwiXFxMYXJnZSIsIlxcTEFSR0UiLCJcXGh1Z2UiLCJcXEh1Z2UiXTtvdCh7dHlwZToic2l6aW5nIixuYW1lczp5bixwcm9wczp7bnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLmJyZWFrT25Ub2tlblRleHQsbj1lLmZ1bmNOYW1lLGE9ZS5wYXJzZXIsaT1hLnBhcnNlRXhwcmVzc2lvbighMSxyKTtyZXR1cm57dHlwZToic2l6aW5nIixtb2RlOmEubW9kZSxzaXplOnluLmluZGV4T2YobikrMSxib2R5Oml9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXQuaGF2aW5nU2l6ZShlLnNpemUpO3JldHVybiBibihlLmJvZHkscix0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXQuaGF2aW5nU2l6ZShlLnNpemUpLG49cXQoZS5ib2R5LHIpLGE9bmV3IFR0Lk1hdGhOb2RlKCJtc3R5bGUiLG4pO3JldHVybiBhLnNldEF0dHJpYnV0ZSgibWF0aHNpemUiLEYoci5zaXplTXVsdGlwbGllcikpLGF9fSksb3Qoe3R5cGU6InNtYXNoIixuYW1lczpbIlxcc21hc2giXSxwcm9wczp7bnVtQXJnczoxLG51bU9wdGlvbmFsQXJnczoxLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPWUucGFyc2VyLGE9ITEsaT0hMSxvPXJbMF0mJlV0KHJbMF0sIm9yZGdyb3VwIik7aWYobylmb3IodmFyIHM9IiIsbD0wO2w8by5ib2R5Lmxlbmd0aDsrK2wpe2lmKCJ0Ij09PShzPW8uYm9keVtsXS50ZXh0KSlhPSEwO2Vsc2V7aWYoImIiIT09cyl7YT0hMSxpPSExO2JyZWFrfWk9ITB9fWVsc2UgYT0hMCxpPSEwO3ZhciBoPXRbMF07cmV0dXJue3R5cGU6InNtYXNoIixtb2RlOm4ubW9kZSxib2R5Omgsc21hc2hIZWlnaHQ6YSxzbWFzaERlcHRoOml9fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPUtlLm1ha2VTcGFuKFtdLFt3dChlLmJvZHksdCldKTtpZighZS5zbWFzaEhlaWdodCYmIWUuc21hc2hEZXB0aClyZXR1cm4gcjtpZihlLnNtYXNoSGVpZ2h0JiYoci5oZWlnaHQ9MCxyLmNoaWxkcmVuKSlmb3IodmFyIG49MDtuPHIuY2hpbGRyZW4ubGVuZ3RoO24rKylyLmNoaWxkcmVuW25dLmhlaWdodD0wO2lmKGUuc21hc2hEZXB0aCYmKHIuZGVwdGg9MCxyLmNoaWxkcmVuKSlmb3IodmFyIGE9MDthPHIuY2hpbGRyZW4ubGVuZ3RoO2ErKylyLmNoaWxkcmVuW2FdLmRlcHRoPTA7dmFyIGk9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImZpcnN0QmFzZWxpbmUiLGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpyfV19LHQpO3JldHVybiBLZS5tYWtlU3BhbihbIm1vcmQiXSxbaV0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm1wYWRkZWQiLFtSdChlLmJvZHksdCldKTtyZXR1cm4gZS5zbWFzaEhlaWdodCYmci5zZXRBdHRyaWJ1dGUoImhlaWdodCIsIjBweCIpLGUuc21hc2hEZXB0aCYmci5zZXRBdHRyaWJ1dGUoImRlcHRoIiwiMHB4Iikscn19KSxvdCh7dHlwZToic3FydCIsbmFtZXM6WyJcXHNxcnQiXSxwcm9wczp7bnVtQXJnczoxLG51bU9wdGlvbmFsQXJnczoxfSxoYW5kbGVyOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLnBhcnNlcixhPXJbMF0saT10WzBdO3JldHVybnt0eXBlOiJzcXJ0Iixtb2RlOm4ubW9kZSxib2R5OmksaW5kZXg6YX19LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9d3QoZS5ib2R5LHQuaGF2aW5nQ3JhbXBlZFN0eWxlKCkpOzA9PT1yLmhlaWdodCYmKHIuaGVpZ2h0PXQuZm9udE1ldHJpY3MoKS54SGVpZ2h0KSxyPUtlLndyYXBGcmFnbWVudChyLHQpO3ZhciBuPXQuZm9udE1ldHJpY3MoKS5kZWZhdWx0UnVsZVRoaWNrbmVzcyxhPW47dC5zdHlsZS5pZDx4LlRFWFQuaWQmJihhPXQuZm9udE1ldHJpY3MoKS54SGVpZ2h0KTt2YXIgaT1uK2EvNCxvPXIuaGVpZ2h0K3IuZGVwdGgraStuLHM9TnIuc3FydEltYWdlKG8sdCksbD1zLnNwYW4saD1zLnJ1bGVXaWR0aCxjPXMuYWR2YW5jZVdpZHRoLG09bC5oZWlnaHQtaDttPnIuaGVpZ2h0K3IuZGVwdGgraSYmKGk9KGkrbS1yLmhlaWdodC1yLmRlcHRoKS8yKTt2YXIgdT1sLmhlaWdodC1yLmhlaWdodC1pLWg7ci5zdHlsZS5wYWRkaW5nTGVmdD1GKGMpO3ZhciBwPUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJmaXJzdEJhc2VsaW5lIixjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06cix3cmFwcGVyQ2xhc3NlczpbInN2Zy1hbGlnbiJdfSx7dHlwZToia2VybiIsc2l6ZTotKHIuaGVpZ2h0K3UpfSx7dHlwZToiZWxlbSIsZWxlbTpsfSx7dHlwZToia2VybiIsc2l6ZTpofV19LHQpO2lmKGUuaW5kZXgpe3ZhciBkPXQuaGF2aW5nU3R5bGUoeC5TQ1JJUFRTQ1JJUFQpLGY9d3QoZS5pbmRleCxkLHQpLGc9LjYqKHAuaGVpZ2h0LXAuZGVwdGgpLHY9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6InNoaWZ0Iixwb3NpdGlvbkRhdGE6LWcsY2hpbGRyZW46W3t0eXBlOiJlbGVtIixlbGVtOmZ9XX0sdCksYj1LZS5tYWtlU3BhbihbInJvb3QiXSxbdl0pO3JldHVybiBLZS5tYWtlU3BhbihbIm1vcmQiLCJzcXJ0Il0sW2IscF0sdCl9cmV0dXJuIEtlLm1ha2VTcGFuKFsibW9yZCIsInNxcnQiXSxbcF0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLmJvZHksbj1lLmluZGV4O3JldHVybiBuP25ldyBUdC5NYXRoTm9kZSgibXJvb3QiLFtSdChyLHQpLFJ0KG4sdCldKTpuZXcgVHQuTWF0aE5vZGUoIm1zcXJ0IixbUnQocix0KV0pfX0pO3ZhciB4bj17ZGlzcGxheTp4LkRJU1BMQVksdGV4dDp4LlRFWFQsc2NyaXB0OnguU0NSSVBULHNjcmlwdHNjcmlwdDp4LlNDUklQVFNDUklQVH07b3Qoe3R5cGU6InN0eWxpbmciLG5hbWVzOlsiXFxkaXNwbGF5c3R5bGUiLCJcXHRleHRzdHlsZSIsIlxcc2NyaXB0c3R5bGUiLCJcXHNjcmlwdHNjcmlwdHN0eWxlIl0scHJvcHM6e251bUFyZ3M6MCxhbGxvd2VkSW5UZXh0OiEwLHByaW1pdGl2ZTohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3ZhciByPWUuYnJlYWtPblRva2VuVGV4dCxuPWUuZnVuY05hbWUsYT1lLnBhcnNlcixpPWEucGFyc2VFeHByZXNzaW9uKCEwLHIpLG89bi5zbGljZSgxLG4ubGVuZ3RoLTUpO3JldHVybnt0eXBlOiJzdHlsaW5nIixtb2RlOmEubW9kZSxzdHlsZTpvLGJvZHk6aX19LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9eG5bZS5zdHlsZV0sbj10LmhhdmluZ1N0eWxlKHIpLndpdGhGb250KCIiKTtyZXR1cm4gYm4oZS5ib2R5LG4sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj14bltlLnN0eWxlXSxuPXQuaGF2aW5nU3R5bGUociksYT1xdChlLmJvZHksbiksaT1uZXcgVHQuTWF0aE5vZGUoIm1zdHlsZSIsYSksbz17ZGlzcGxheTpbIjAiLCJ0cnVlIl0sdGV4dDpbIjAiLCJmYWxzZSJdLHNjcmlwdDpbIjEiLCJmYWxzZSJdLHNjcmlwdHNjcmlwdDpbIjIiLCJmYWxzZSJdfVtlLnN0eWxlXTtyZXR1cm4gaS5zZXRBdHRyaWJ1dGUoInNjcmlwdGxldmVsIixvWzBdKSxpLnNldEF0dHJpYnV0ZSgiZGlzcGxheXN0eWxlIixvWzFdKSxpfX0pO3ZhciB3bj1mdW5jdGlvbihlLHQpe3ZhciByPWUuYmFzZTtyZXR1cm4gcj8ib3AiPT09ci50eXBlP3IubGltaXRzJiYodC5zdHlsZS5zaXplPT09eC5ESVNQTEFZLnNpemV8fHIuYWx3YXlzSGFuZGxlU3VwU3ViKT9wbjpudWxsOiJvcGVyYXRvcm5hbWUiPT09ci50eXBlP3IuYWx3YXlzSGFuZGxlU3VwU3ViJiYodC5zdHlsZS5zaXplPT09eC5ESVNQTEFZLnNpemV8fHIubGltaXRzKT92bjpudWxsOiJhY2NlbnQiPT09ci50eXBlP2wuaXNDaGFyYWN0ZXJCb3goci5iYXNlKT9XdDpudWxsOiJob3JpekJyYWNlIj09PXIudHlwZSYmIWUuc3ViPT09ci5pc092ZXI/bG46bnVsbDpudWxsfTtzdCh7dHlwZToic3Vwc3ViIixodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXduKGUsdCk7aWYocilyZXR1cm4gcihlLHQpO3ZhciBuLGEsaSxvPWUuYmFzZSxzPWUuc3VwLGg9ZS5zdWIsYz13dChvLHQpLG09dC5mb250TWV0cmljcygpLHU9MCxwPTAsZD1vJiZsLmlzQ2hhcmFjdGVyQm94KG8pO2lmKHMpe3ZhciBmPXQuaGF2aW5nU3R5bGUodC5zdHlsZS5zdXAoKSk7bj13dChzLGYsdCksZHx8KHU9Yy5oZWlnaHQtZi5mb250TWV0cmljcygpLnN1cERyb3AqZi5zaXplTXVsdGlwbGllci90LnNpemVNdWx0aXBsaWVyKX1pZihoKXt2YXIgZz10LmhhdmluZ1N0eWxlKHQuc3R5bGUuc3ViKCkpO2E9d3QoaCxnLHQpLGR8fChwPWMuZGVwdGgrZy5mb250TWV0cmljcygpLnN1YkRyb3AqZy5zaXplTXVsdGlwbGllci90LnNpemVNdWx0aXBsaWVyKX1pPXQuc3R5bGU9PT14LkRJU1BMQVk/bS5zdXAxOnQuc3R5bGUuY3JhbXBlZD9tLnN1cDM6bS5zdXAyO3ZhciB2LGI9dC5zaXplTXVsdGlwbGllcix5PUYoLjUvbS5wdFBlckVtL2IpLHc9bnVsbDtpZihhKXt2YXIgaz1lLmJhc2UmJiJvcCI9PT1lLmJhc2UudHlwZSYmZS5iYXNlLm5hbWUmJigiXFxvaWludCI9PT1lLmJhc2UubmFtZXx8Ilxcb2lpaW50Ij09PWUuYmFzZS5uYW1lKTsoYyBpbnN0YW5jZW9mIFp8fGspJiYodz1GKC1jLml0YWxpYykpfWlmKG4mJmEpe3U9TWF0aC5tYXgodSxpLG4uZGVwdGgrLjI1Km0ueEhlaWdodCkscD1NYXRoLm1heChwLG0uc3ViMik7dmFyIFM9NCptLmRlZmF1bHRSdWxlVGhpY2tuZXNzO2lmKHUtbi5kZXB0aC0oYS5oZWlnaHQtcCk8Uyl7cD1TLSh1LW4uZGVwdGgpK2EuaGVpZ2h0O3ZhciBNPS44Km0ueEhlaWdodC0odS1uLmRlcHRoKTtNPjAmJih1Kz1NLHAtPU0pfXZhciB6PVt7dHlwZToiZWxlbSIsZWxlbTphLHNoaWZ0OnAsbWFyZ2luUmlnaHQ6eSxtYXJnaW5MZWZ0Ond9LHt0eXBlOiJlbGVtIixlbGVtOm4sc2hpZnQ6LXUsbWFyZ2luUmlnaHQ6eX1dO3Y9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6ImluZGl2aWR1YWxTaGlmdCIsY2hpbGRyZW46en0sdCl9ZWxzZSBpZihhKXtwPU1hdGgubWF4KHAsbS5zdWIxLGEuaGVpZ2h0LS44Km0ueEhlaWdodCk7dmFyIEE9W3t0eXBlOiJlbGVtIixlbGVtOmEsbWFyZ2luTGVmdDp3LG1hcmdpblJpZ2h0Onl9XTt2PUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOnAsY2hpbGRyZW46QX0sdCl9ZWxzZXtpZighbil0aHJvdyBuZXcgRXJyb3IoInN1cHN1YiBtdXN0IGhhdmUgZWl0aGVyIHN1cCBvciBzdWIuIik7dT1NYXRoLm1heCh1LGksbi5kZXB0aCsuMjUqbS54SGVpZ2h0KSx2PUtlLm1ha2VWTGlzdCh7cG9zaXRpb25UeXBlOiJzaGlmdCIscG9zaXRpb25EYXRhOi11LGNoaWxkcmVuOlt7dHlwZToiZWxlbSIsZWxlbTpuLG1hcmdpblJpZ2h0Onl9XX0sdCl9dmFyIFQ9eXQoYywicmlnaHQiKXx8Im1vcmQiO3JldHVybiBLZS5tYWtlU3BhbihbVF0sW2MsS2UubWFrZVNwYW4oWyJtc3Vwc3ViIl0sW3ZdKV0sdCl9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcixuPSExO2UuYmFzZSYmImhvcml6QnJhY2UiPT09ZS5iYXNlLnR5cGUmJiEhZS5zdXA9PT1lLmJhc2UuaXNPdmVyJiYobj0hMCxyPWUuYmFzZS5pc092ZXIpLCFlLmJhc2V8fCJvcCIhPT1lLmJhc2UudHlwZSYmIm9wZXJhdG9ybmFtZSIhPT1lLmJhc2UudHlwZXx8KGUuYmFzZS5wYXJlbnRJc1N1cFN1Yj0hMCk7dmFyIGEsaT1bUnQoZS5iYXNlLHQpXTtpZihlLnN1YiYmaS5wdXNoKFJ0KGUuc3ViLHQpKSxlLnN1cCYmaS5wdXNoKFJ0KGUuc3VwLHQpKSxuKWE9cj8ibW92ZXIiOiJtdW5kZXIiO2Vsc2UgaWYoZS5zdWIpaWYoZS5zdXApe3ZhciBvPWUuYmFzZTthPW8mJiJvcCI9PT1vLnR5cGUmJm8ubGltaXRzJiZ0LnN0eWxlPT09eC5ESVNQTEFZfHxvJiYib3BlcmF0b3JuYW1lIj09PW8udHlwZSYmby5hbHdheXNIYW5kbGVTdXBTdWImJih0LnN0eWxlPT09eC5ESVNQTEFZfHxvLmxpbWl0cyk/Im11bmRlcm92ZXIiOiJtc3Vic3VwIn1lbHNle3ZhciBzPWUuYmFzZTthPXMmJiJvcCI9PT1zLnR5cGUmJnMubGltaXRzJiYodC5zdHlsZT09PXguRElTUExBWXx8cy5hbHdheXNIYW5kbGVTdXBTdWIpfHxzJiYib3BlcmF0b3JuYW1lIj09PXMudHlwZSYmcy5hbHdheXNIYW5kbGVTdXBTdWImJihzLmxpbWl0c3x8dC5zdHlsZT09PXguRElTUExBWSk/Im11bmRlciI6Im1zdWIifWVsc2V7dmFyIGw9ZS5iYXNlO2E9bCYmIm9wIj09PWwudHlwZSYmbC5saW1pdHMmJih0LnN0eWxlPT09eC5ESVNQTEFZfHxsLmFsd2F5c0hhbmRsZVN1cFN1Yil8fGwmJiJvcGVyYXRvcm5hbWUiPT09bC50eXBlJiZsLmFsd2F5c0hhbmRsZVN1cFN1YiYmKGwubGltaXRzfHx0LnN0eWxlPT09eC5ESVNQTEFZKT8ibW92ZXIiOiJtc3VwIn1yZXR1cm4gbmV3IFR0Lk1hdGhOb2RlKGEsaSl9fSksc3Qoe3R5cGU6ImF0b20iLGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEtlLm1hdGhzeW0oZS50ZXh0LGUubW9kZSx0LFsibSIrZS5mYW1pbHldKX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPW5ldyBUdC5NYXRoTm9kZSgibW8iLFtCdChlLnRleHQsZS5tb2RlKV0pO2lmKCJiaW4iPT09ZS5mYW1pbHkpe3ZhciBuPU50KGUsdCk7ImJvbGQtaXRhbGljIj09PW4mJnIuc2V0QXR0cmlidXRlKCJtYXRodmFyaWFudCIsbil9ZWxzZSJwdW5jdCI9PT1lLmZhbWlseT9yLnNldEF0dHJpYnV0ZSgic2VwYXJhdG9yIiwidHJ1ZSIpOiJvcGVuIiE9PWUuZmFtaWx5JiYiY2xvc2UiIT09ZS5mYW1pbHl8fHIuc2V0QXR0cmlidXRlKCJzdHJldGNoeSIsImZhbHNlIik7cmV0dXJuIHJ9fSk7dmFyIGtuPXttaToiaXRhbGljIixtbjoibm9ybWFsIixtdGV4dDoibm9ybWFsIn07c3Qoe3R5cGU6Im1hdGhvcmQiLGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEtlLm1ha2VPcmQoZSx0LCJtYXRob3JkIil9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm1pIixbQnQoZS50ZXh0LGUubW9kZSx0KV0pLG49TnQoZSx0KXx8Iml0YWxpYyI7cmV0dXJuIG4hPT1rbltyLnR5cGVdJiZyLnNldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiLG4pLHJ9fSksc3Qoe3R5cGU6InRleHRvcmQiLGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEtlLm1ha2VPcmQoZSx0LCJ0ZXh0b3JkIil9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcixuPUJ0KGUudGV4dCxlLm1vZGUsdCksYT1OdChlLHQpfHwibm9ybWFsIjtyZXR1cm4gcj0idGV4dCI9PT1lLm1vZGU/bmV3IFR0Lk1hdGhOb2RlKCJtdGV4dCIsW25dKTovWzAtOV0vLnRlc3QoZS50ZXh0KT9uZXcgVHQuTWF0aE5vZGUoIm1uIixbbl0pOiJcXHByaW1lIj09PWUudGV4dD9uZXcgVHQuTWF0aE5vZGUoIm1vIixbbl0pOm5ldyBUdC5NYXRoTm9kZSgibWkiLFtuXSksYSE9PWtuW3IudHlwZV0mJnIuc2V0QXR0cmlidXRlKCJtYXRodmFyaWFudCIsYSkscn19KTt2YXIgU249eyJcXG5vYnJlYWsiOiJub2JyZWFrIiwiXFxhbGxvd2JyZWFrIjoiYWxsb3dicmVhayJ9LE1uPXsiICI6e30sIlxcICI6e30sIn4iOntjbGFzc05hbWU6Im5vYnJlYWsifSwiXFxzcGFjZSI6e30sIlxcbm9icmVha3NwYWNlIjp7Y2xhc3NOYW1lOiJub2JyZWFrIn19O3N0KHt0eXBlOiJzcGFjaW5nIixodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe2lmKE1uLmhhc093blByb3BlcnR5KGUudGV4dCkpe3ZhciByPU1uW2UudGV4dF0uY2xhc3NOYW1lfHwiIjtpZigidGV4dCI9PT1lLm1vZGUpe3ZhciBhPUtlLm1ha2VPcmQoZSx0LCJ0ZXh0b3JkIik7cmV0dXJuIGEuY2xhc3Nlcy5wdXNoKHIpLGF9cmV0dXJuIEtlLm1ha2VTcGFuKFsibXNwYWNlIixyXSxbS2UubWF0aHN5bShlLnRleHQsZS5tb2RlLHQpXSx0KX1pZihTbi5oYXNPd25Qcm9wZXJ0eShlLnRleHQpKXJldHVybiBLZS5tYWtlU3BhbihbIm1zcGFjZSIsU25bZS50ZXh0XV0sW10sdCk7dGhyb3cgbmV3IG4oJ1Vua25vd24gdHlwZSBvZiBzcGFjZSAiJytlLnRleHQrJyInKX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe2lmKCFNbi5oYXNPd25Qcm9wZXJ0eShlLnRleHQpKXtpZihTbi5oYXNPd25Qcm9wZXJ0eShlLnRleHQpKXJldHVybiBuZXcgVHQuTWF0aE5vZGUoIm1zcGFjZSIpO3Rocm93IG5ldyBuKCdVbmtub3duIHR5cGUgb2Ygc3BhY2UgIicrZS50ZXh0KyciJyl9cmV0dXJuIG5ldyBUdC5NYXRoTm9kZSgibXRleHQiLFtuZXcgVHQuVGV4dE5vZGUoIlx4YTAiKV0pfX0pO3ZhciB6bj1mdW5jdGlvbigpe3ZhciBlPW5ldyBUdC5NYXRoTm9kZSgibXRkIixbXSk7cmV0dXJuIGUuc2V0QXR0cmlidXRlKCJ3aWR0aCIsIjUwJSIpLGV9O3N0KHt0eXBlOiJ0YWciLG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgVHQuTWF0aE5vZGUoIm10YWJsZSIsW25ldyBUdC5NYXRoTm9kZSgibXRyIixbem4oKSxuZXcgVHQuTWF0aE5vZGUoIm10ZCIsW0l0KGUuYm9keSx0KV0pLHpuKCksbmV3IFR0Lk1hdGhOb2RlKCJtdGQiLFtJdChlLnRhZyx0KV0pXSldKTtyZXR1cm4gci5zZXRBdHRyaWJ1dGUoIndpZHRoIiwiMTAwJSIpLHJ9fSk7dmFyIEFuPXsiXFx0ZXh0Ijp2b2lkIDAsIlxcdGV4dHJtIjoidGV4dHJtIiwiXFx0ZXh0c2YiOiJ0ZXh0c2YiLCJcXHRleHR0dCI6InRleHR0dCIsIlxcdGV4dG5vcm1hbCI6InRleHRybSJ9LFRuPXsiXFx0ZXh0YmYiOiJ0ZXh0YmYiLCJcXHRleHRtZCI6InRleHRtZCJ9LEJuPXsiXFx0ZXh0aXQiOiJ0ZXh0aXQiLCJcXHRleHR1cCI6InRleHR1cCJ9LENuPWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5mb250O3JldHVybiByP0FuW3JdP3Qud2l0aFRleHRGb250RmFtaWx5KEFuW3JdKTpUbltyXT90LndpdGhUZXh0Rm9udFdlaWdodChUbltyXSk6dC53aXRoVGV4dEZvbnRTaGFwZShCbltyXSk6dH07b3Qoe3R5cGU6InRleHQiLG5hbWVzOlsiXFx0ZXh0IiwiXFx0ZXh0cm0iLCJcXHRleHRzZiIsIlxcdGV4dHR0IiwiXFx0ZXh0bm9ybWFsIiwiXFx0ZXh0YmYiLCJcXHRleHRtZCIsIlxcdGV4dGl0IiwiXFx0ZXh0dXAiXSxwcm9wczp7bnVtQXJnczoxLGFyZ1R5cGVzOlsidGV4dCJdLGFsbG93ZWRJbkFyZ3VtZW50OiEwLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnBhcnNlcixuPWUuZnVuY05hbWUsYT10WzBdO3JldHVybnt0eXBlOiJ0ZXh0Iixtb2RlOnIubW9kZSxib2R5Omh0KGEpLGZvbnQ6bn19LGh0bWxCdWlsZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9Q24oZSx0KSxuPWZ0KGUuYm9keSxyLCEwKTtyZXR1cm4gS2UubWFrZVNwYW4oWyJtb3JkIiwidGV4dCJdLG4scil9LG1hdGhtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj1DbihlLHQpO3JldHVybiBJdChlLmJvZHkscil9fSksb3Qoe3R5cGU6InVuZGVybGluZSIsbmFtZXM6WyJcXHVuZGVybGluZSJdLHByb3BzOntudW1BcmdzOjEsYWxsb3dlZEluVGV4dDohMH0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3JldHVybnt0eXBlOiJ1bmRlcmxpbmUiLG1vZGU6ZS5wYXJzZXIubW9kZSxib2R5OnRbMF19fSxodG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPXd0KGUuYm9keSx0KSxuPUtlLm1ha2VMaW5lU3BhbigidW5kZXJsaW5lLWxpbmUiLHQpLGE9dC5mb250TWV0cmljcygpLmRlZmF1bHRSdWxlVGhpY2tuZXNzLGk9S2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6InRvcCIscG9zaXRpb25EYXRhOnIuaGVpZ2h0LGNoaWxkcmVuOlt7dHlwZToia2VybiIsc2l6ZTphfSx7dHlwZToiZWxlbSIsZWxlbTpufSx7dHlwZToia2VybiIsc2l6ZTozKmF9LHt0eXBlOiJlbGVtIixlbGVtOnJ9XX0sdCk7cmV0dXJuIEtlLm1ha2VTcGFuKFsibW9yZCIsInVuZGVybGluZSJdLFtpXSx0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPW5ldyBUdC5NYXRoTm9kZSgibW8iLFtuZXcgVHQuVGV4dE5vZGUoIlx1MjAzZSIpXSk7ci5zZXRBdHRyaWJ1dGUoInN0cmV0Y2h5IiwidHJ1ZSIpO3ZhciBuPW5ldyBUdC5NYXRoTm9kZSgibXVuZGVyIixbUnQoZS5ib2R5LHQpLHJdKTtyZXR1cm4gbi5zZXRBdHRyaWJ1dGUoImFjY2VudHVuZGVyIiwidHJ1ZSIpLG59fSksb3Qoe3R5cGU6InZjZW50ZXIiLG5hbWVzOlsiXFx2Y2VudGVyIl0scHJvcHM6e251bUFyZ3M6MSxhcmdUeXBlczpbIm9yaWdpbmFsIl0sYWxsb3dlZEluVGV4dDohMX0saGFuZGxlcjpmdW5jdGlvbihlLHQpe3JldHVybnt0eXBlOiJ2Y2VudGVyIixtb2RlOmUucGFyc2VyLm1vZGUsYm9keTp0WzBdfX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXt2YXIgcj13dChlLmJvZHksdCksbj10LmZvbnRNZXRyaWNzKCkuYXhpc0hlaWdodCxhPS41KihyLmhlaWdodC1uLShyLmRlcHRoK24pKTtyZXR1cm4gS2UubWFrZVZMaXN0KHtwb3NpdGlvblR5cGU6InNoaWZ0Iixwb3NpdGlvbkRhdGE6YSxjaGlsZHJlbjpbe3R5cGU6ImVsZW0iLGVsZW06cn1dfSx0KX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3JldHVybiBuZXcgVHQuTWF0aE5vZGUoIm1wYWRkZWQiLFtSdChlLmJvZHksdCldLFsidmNlbnRlciJdKX19KSxvdCh7dHlwZToidmVyYiIsbmFtZXM6WyJcXHZlcmIiXSxwcm9wczp7bnVtQXJnczowLGFsbG93ZWRJblRleHQ6ITB9LGhhbmRsZXI6ZnVuY3Rpb24oZSx0LHIpe3Rocm93IG5ldyBuKCJcXHZlcmIgZW5kZWQgYnkgZW5kIG9mIGxpbmUgaW5zdGVhZCBvZiBtYXRjaGluZyBkZWxpbWl0ZXIiKX0saHRtbEJ1aWxkZXI6ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9Tm4oZSksbj1bXSxhPXQuaGF2aW5nU3R5bGUodC5zdHlsZS50ZXh0KCkpLGk9MDtpPHIubGVuZ3RoO2krKyl7dmFyIG89cltpXTsifiI9PT1vJiYobz0iXFx0ZXh0YXNjaWl0aWxkZSIpLG4ucHVzaChLZS5tYWtlU3ltYm9sKG8sIlR5cGV3cml0ZXItUmVndWxhciIsZS5tb2RlLGEsWyJtb3JkIiwidGV4dHR0Il0pKX1yZXR1cm4gS2UubWFrZVNwYW4oWyJtb3JkIiwidGV4dCJdLmNvbmNhdChhLnNpemluZ0NsYXNzZXModCkpLEtlLnRyeUNvbWJpbmVDaGFycyhuKSxhKX0sbWF0aG1sQnVpbGRlcjpmdW5jdGlvbihlLHQpe3ZhciByPW5ldyBUdC5UZXh0Tm9kZShObihlKSksbj1uZXcgVHQuTWF0aE5vZGUoIm10ZXh0Iixbcl0pO3JldHVybiBuLnNldEF0dHJpYnV0ZSgibWF0aHZhcmlhbnQiLCJtb25vc3BhY2UiKSxufX0pO3ZhciBObj1mdW5jdGlvbihlKXtyZXR1cm4gZS5ib2R5LnJlcGxhY2UoLyAvZyxlLnN0YXI/Ilx1MjQyMyI6Ilx4YTAiKX0scW49bnQsSW49IlsgXHJcblx0XSIsUm49IihcXFxcW2EtekEtWkBdKykiK0luKyIqIixIbj0iW1x1MDMwMC1cdTAzNmZdIixPbj1uZXcgUmVnRXhwKEhuKyIrJCIpLEVuPSIoIitJbisiKyl8XFxcXChcbnxbIFxyXHRdK1xuPylbIFxyXHRdKnwoWyEtXFxbXFxdLVx1MjAyN1x1MjAyYS1cdWQ3ZmZcdWY5MDAtXHVmZmZmXSIrSG4rIip8W1x1ZDgwMC1cdWRiZmZdW1x1ZGMwMC1cdWRmZmZdIitIbisiKnxcXFxcdmVyYlxcKihbXl0pLio/XFw0fFxcXFx2ZXJiKFteKmEtekEtWl0pLio/XFw1fCIrUm4rInxcXFxcW15cdWQ4MDAtXHVkZmZmXSkiLExuPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe3RoaXMuaW5wdXQ9dm9pZCAwLHRoaXMuc2V0dGluZ3M9dm9pZCAwLHRoaXMudG9rZW5SZWdleD12b2lkIDAsdGhpcy5jYXRjb2Rlcz12b2lkIDAsdGhpcy5pbnB1dD1lLHRoaXMuc2V0dGluZ3M9dCx0aGlzLnRva2VuUmVnZXg9bmV3IFJlZ0V4cChFbiwiZyIpLHRoaXMuY2F0Y29kZXM9eyIlIjoxNCwifiI6MTN9fXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LnNldENhdGNvZGU9ZnVuY3Rpb24oZSx0KXt0aGlzLmNhdGNvZGVzW2VdPXR9LHQubGV4PWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5pbnB1dCx0PXRoaXMudG9rZW5SZWdleC5sYXN0SW5kZXg7aWYodD09PWUubGVuZ3RoKXJldHVybiBuZXcgR3IoIkVPRiIsbmV3IEZyKHRoaXMsdCx0KSk7dmFyIHI9dGhpcy50b2tlblJlZ2V4LmV4ZWMoZSk7aWYobnVsbD09PXJ8fHIuaW5kZXghPT10KXRocm93IG5ldyBuKCJVbmV4cGVjdGVkIGNoYXJhY3RlcjogJyIrZVt0XSsiJyIsbmV3IEdyKGVbdF0sbmV3IEZyKHRoaXMsdCx0KzEpKSk7dmFyIGE9cls2XXx8clszXXx8KHJbMl0/IlxcICI6IiAiKTtpZigxND09PXRoaXMuY2F0Y29kZXNbYV0pe3ZhciBpPWUuaW5kZXhPZigiXG4iLHRoaXMudG9rZW5SZWdleC5sYXN0SW5kZXgpO3JldHVybi0xPT09aT8odGhpcy50b2tlblJlZ2V4Lmxhc3RJbmRleD1lLmxlbmd0aCx0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgiY29tbWVudEF0RW5kIiwiJSBjb21tZW50IGhhcyBubyB0ZXJtaW5hdGluZyBuZXdsaW5lOyBMYVRlWCB3b3VsZCBmYWlsIGJlY2F1c2Ugb2YgY29tbWVudGluZyB0aGUgZW5kIG9mIG1hdGggbW9kZSAoZS5nLiAkKSIpKTp0aGlzLnRva2VuUmVnZXgubGFzdEluZGV4PWkrMSx0aGlzLmxleCgpfXJldHVybiBuZXcgR3IoYSxuZXcgRnIodGhpcyx0LHRoaXMudG9rZW5SZWdleC5sYXN0SW5kZXgpKX0sZX0oKSxEbj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXt2b2lkIDA9PT1lJiYoZT17fSksdm9pZCAwPT09dCYmKHQ9e30pLHRoaXMuY3VycmVudD12b2lkIDAsdGhpcy5idWlsdGlucz12b2lkIDAsdGhpcy51bmRlZlN0YWNrPXZvaWQgMCx0aGlzLmN1cnJlbnQ9dCx0aGlzLmJ1aWx0aW5zPWUsdGhpcy51bmRlZlN0YWNrPVtdfXZhciB0PWUucHJvdG90eXBlO3JldHVybiB0LmJlZ2luR3JvdXA9ZnVuY3Rpb24oKXt0aGlzLnVuZGVmU3RhY2sucHVzaCh7fSl9LHQuZW5kR3JvdXA9ZnVuY3Rpb24oKXtpZigwPT09dGhpcy51bmRlZlN0YWNrLmxlbmd0aCl0aHJvdyBuZXcgbigiVW5iYWxhbmNlZCBuYW1lc3BhY2UgZGVzdHJ1Y3Rpb246IGF0dGVtcHQgdG8gcG9wIGdsb2JhbCBuYW1lc3BhY2U7IHBsZWFzZSByZXBvcnQgdGhpcyBhcyBhIGJ1ZyIpO3ZhciBlPXRoaXMudW5kZWZTdGFjay5wb3AoKTtmb3IodmFyIHQgaW4gZSllLmhhc093blByb3BlcnR5KHQpJiYobnVsbD09ZVt0XT9kZWxldGUgdGhpcy5jdXJyZW50W3RdOnRoaXMuY3VycmVudFt0XT1lW3RdKX0sdC5lbmRHcm91cHM9ZnVuY3Rpb24oKXtmb3IoO3RoaXMudW5kZWZTdGFjay5sZW5ndGg+MDspdGhpcy5lbmRHcm91cCgpfSx0Lmhhcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5jdXJyZW50Lmhhc093blByb3BlcnR5KGUpfHx0aGlzLmJ1aWx0aW5zLmhhc093blByb3BlcnR5KGUpfSx0LmdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5jdXJyZW50Lmhhc093blByb3BlcnR5KGUpP3RoaXMuY3VycmVudFtlXTp0aGlzLmJ1aWx0aW5zW2VdfSx0LnNldD1mdW5jdGlvbihlLHQscil7aWYodm9pZCAwPT09ciYmKHI9ITEpLHIpe2Zvcih2YXIgbj0wO248dGhpcy51bmRlZlN0YWNrLmxlbmd0aDtuKyspZGVsZXRlIHRoaXMudW5kZWZTdGFja1tuXVtlXTt0aGlzLnVuZGVmU3RhY2subGVuZ3RoPjAmJih0aGlzLnVuZGVmU3RhY2tbdGhpcy51bmRlZlN0YWNrLmxlbmd0aC0xXVtlXT10KX1lbHNle3ZhciBhPXRoaXMudW5kZWZTdGFja1t0aGlzLnVuZGVmU3RhY2subGVuZ3RoLTFdO2EmJiFhLmhhc093blByb3BlcnR5KGUpJiYoYVtlXT10aGlzLmN1cnJlbnRbZV0pfW51bGw9PXQ/ZGVsZXRlIHRoaXMuY3VycmVudFtlXTp0aGlzLmN1cnJlbnRbZV09dH0sZX0oKSxWbj1WcjtQcigiXFxub2V4cGFuZCIsKGZ1bmN0aW9uKGUpe3ZhciB0PWUucG9wVG9rZW4oKTtyZXR1cm4gZS5pc0V4cGFuZGFibGUodC50ZXh0KSYmKHQubm9leHBhbmQ9ITAsdC50cmVhdEFzUmVsYXg9ITApLHt0b2tlbnM6W3RdLG51bUFyZ3M6MH19KSksUHIoIlxcZXhwYW5kYWZ0ZXIiLChmdW5jdGlvbihlKXt2YXIgdD1lLnBvcFRva2VuKCk7cmV0dXJuIGUuZXhwYW5kT25jZSghMCkse3Rva2VuczpbdF0sbnVtQXJnczowfX0pKSxQcigiXFxAZmlyc3RvZnR3byIsKGZ1bmN0aW9uKGUpe3JldHVybnt0b2tlbnM6ZS5jb25zdW1lQXJncygyKVswXSxudW1BcmdzOjB9fSkpLFByKCJcXEBzZWNvbmRvZnR3byIsKGZ1bmN0aW9uKGUpe3JldHVybnt0b2tlbnM6ZS5jb25zdW1lQXJncygyKVsxXSxudW1BcmdzOjB9fSkpLFByKCJcXEBpZm5leHRjaGFyIiwoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb25zdW1lQXJncygzKTtlLmNvbnN1bWVTcGFjZXMoKTt2YXIgcj1lLmZ1dHVyZSgpO3JldHVybiAxPT09dFswXS5sZW5ndGgmJnRbMF1bMF0udGV4dD09PXIudGV4dD97dG9rZW5zOnRbMV0sbnVtQXJnczowfTp7dG9rZW5zOnRbMl0sbnVtQXJnczowfX0pKSxQcigiXFxAaWZzdGFyIiwiXFxAaWZuZXh0Y2hhciAqe1xcQGZpcnN0b2Z0d297IzF9fSIpLFByKCJcXFRleHRPck1hdGgiLChmdW5jdGlvbihlKXt2YXIgdD1lLmNvbnN1bWVBcmdzKDIpO3JldHVybiJ0ZXh0Ij09PWUubW9kZT97dG9rZW5zOnRbMF0sbnVtQXJnczowfTp7dG9rZW5zOnRbMV0sbnVtQXJnczowfX0pKTt2YXIgUG49ezA6MCwxOjEsMjoyLDM6Myw0OjQsNTo1LDY6Niw3OjcsODo4LDk6OSxhOjEwLEE6MTAsYjoxMSxCOjExLGM6MTIsQzoxMixkOjEzLEQ6MTMsZToxNCxFOjE0LGY6MTUsRjoxNX07UHIoIlxcY2hhciIsKGZ1bmN0aW9uKGUpe3ZhciB0LHI9ZS5wb3BUb2tlbigpLGE9IiI7aWYoIiciPT09ci50ZXh0KXQ9OCxyPWUucG9wVG9rZW4oKTtlbHNlIGlmKCciJz09PXIudGV4dCl0PTE2LHI9ZS5wb3BUb2tlbigpO2Vsc2UgaWYoImAiPT09ci50ZXh0KWlmKCJcXCI9PT0ocj1lLnBvcFRva2VuKCkpLnRleHRbMF0pYT1yLnRleHQuY2hhckNvZGVBdCgxKTtlbHNle2lmKCJFT0YiPT09ci50ZXh0KXRocm93IG5ldyBuKCJcXGNoYXJgIG1pc3NpbmcgYXJndW1lbnQiKTthPXIudGV4dC5jaGFyQ29kZUF0KDApfWVsc2UgdD0xMDtpZih0KXtpZihudWxsPT0oYT1QbltyLnRleHRdKXx8YT49dCl0aHJvdyBuZXcgbigiSW52YWxpZCBiYXNlLSIrdCsiIGRpZ2l0ICIrci50ZXh0KTtmb3IodmFyIGk7bnVsbCE9KGk9UG5bZS5mdXR1cmUoKS50ZXh0XSkmJmk8dDspYSo9dCxhKz1pLGUucG9wVG9rZW4oKX1yZXR1cm4iXFxAY2hhcnsiK2ErIn0ifSkpO3ZhciBGbj1mdW5jdGlvbihlLHQscil7dmFyIGE9ZS5jb25zdW1lQXJnKCkudG9rZW5zO2lmKDEhPT1hLmxlbmd0aCl0aHJvdyBuZXcgbigiXFxuZXdjb21tYW5kJ3MgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIG1hY3JvIG5hbWUiKTt2YXIgaT1hWzBdLnRleHQsbz1lLmlzRGVmaW5lZChpKTtpZihvJiYhdCl0aHJvdyBuZXcgbigiXFxuZXdjb21tYW5keyIraSsifSBhdHRlbXB0aW5nIHRvIHJlZGVmaW5lICIraSsiOyB1c2UgXFxyZW5ld2NvbW1hbmQiKTtpZighbyYmIXIpdGhyb3cgbmV3IG4oIlxccmVuZXdjb21tYW5keyIraSsifSB3aGVuIGNvbW1hbmQgIitpKyIgZG9lcyBub3QgeWV0IGV4aXN0OyB1c2UgXFxuZXdjb21tYW5kIik7dmFyIHM9MDtpZigxPT09KGE9ZS5jb25zdW1lQXJnKCkudG9rZW5zKS5sZW5ndGgmJiJbIj09PWFbMF0udGV4dCl7Zm9yKHZhciBsPSIiLGg9ZS5leHBhbmROZXh0VG9rZW4oKTsiXSIhPT1oLnRleHQmJiJFT0YiIT09aC50ZXh0OylsKz1oLnRleHQsaD1lLmV4cGFuZE5leHRUb2tlbigpO2lmKCFsLm1hdGNoKC9eXHMqWzAtOV0rXHMqJC8pKXRocm93IG5ldyBuKCJJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHM6ICIrbCk7cz1wYXJzZUludChsKSxhPWUuY29uc3VtZUFyZygpLnRva2Vuc31yZXR1cm4gZS5tYWNyb3Muc2V0KGkse3Rva2VuczphLG51bUFyZ3M6c30pLCIifTtQcigiXFxuZXdjb21tYW5kIiwoZnVuY3Rpb24oZSl7cmV0dXJuIEZuKGUsITEsITApfSkpLFByKCJcXHJlbmV3Y29tbWFuZCIsKGZ1bmN0aW9uKGUpe3JldHVybiBGbihlLCEwLCExKX0pKSxQcigiXFxwcm92aWRlY29tbWFuZCIsKGZ1bmN0aW9uKGUpe3JldHVybiBGbihlLCEwLCEwKX0pKSxQcigiXFxtZXNzYWdlIiwoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb25zdW1lQXJncygxKVswXTtyZXR1cm4gY29uc29sZS5sb2codC5yZXZlcnNlKCkubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS50ZXh0fSkpLmpvaW4oIiIpKSwiIn0pKSxQcigiXFxlcnJtZXNzYWdlIiwoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb25zdW1lQXJncygxKVswXTtyZXR1cm4gY29uc29sZS5lcnJvcih0LnJldmVyc2UoKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRleHR9KSkuam9pbigiIikpLCIifSkpLFByKCJcXHNob3ciLChmdW5jdGlvbihlKXt2YXIgdD1lLnBvcFRva2VuKCkscj10LnRleHQ7cmV0dXJuIGNvbnNvbGUubG9nKHQsZS5tYWNyb3MuZ2V0KHIpLHFuW3JdLGFlLm1hdGhbcl0sYWUudGV4dFtyXSksIiJ9KSksUHIoIlxcYmdyb3VwIiwieyIpLFByKCJcXGVncm91cCIsIn0iKSxQcigifiIsIlxcbm9icmVha3NwYWNlIiksUHIoIlxcbHEiLCJgIiksUHIoIlxccnEiLCInIiksUHIoIlxcYWEiLCJcXHIgYSIpLFByKCJcXEFBIiwiXFxyIEEiKSxQcigiXFx0ZXh0Y29weXJpZ2h0IiwiXFxodG1sQG1hdGhtbHtcXHRleHRjaXJjbGVke2N9fXtcXGNoYXJgXHhhOX0iKSxQcigiXFxjb3B5cmlnaHQiLCJcXFRleHRPck1hdGh7XFx0ZXh0Y29weXJpZ2h0fXtcXHRleHR7XFx0ZXh0Y29weXJpZ2h0fX0iKSxQcigiXFx0ZXh0cmVnaXN0ZXJlZCIsIlxcaHRtbEBtYXRobWx7XFx0ZXh0Y2lyY2xlZHtcXHNjcmlwdHNpemUgUn19e1xcY2hhcmBceGFlfSIpLFByKCJcdTIxMmMiLCJcXG1hdGhzY3J7Qn0iKSxQcigiXHUyMTMwIiwiXFxtYXRoc2Nye0V9IiksUHIoIlx1MjEzMSIsIlxcbWF0aHNjcntGfSIpLFByKCJcdTIxMGIiLCJcXG1hdGhzY3J7SH0iKSxQcigiXHUyMTEwIiwiXFxtYXRoc2Nye0l9IiksUHIoIlx1MjExMiIsIlxcbWF0aHNjcntMfSIpLFByKCJcdTIxMzMiLCJcXG1hdGhzY3J7TX0iKSxQcigiXHUyMTFiIiwiXFxtYXRoc2Nye1J9IiksUHIoIlx1MjEyZCIsIlxcbWF0aGZyYWt7Q30iKSxQcigiXHUyMTBjIiwiXFxtYXRoZnJha3tIfSIpLFByKCJcdTIxMjgiLCJcXG1hdGhmcmFre1p9IiksUHIoIlxcQmJiayIsIlxcQmJie2t9IiksUHIoIlx4YjciLCJcXGNkb3RwIiksUHIoIlxcbGxhcCIsIlxcbWF0aGxsYXB7XFx0ZXh0cm17IzF9fSIpLFByKCJcXHJsYXAiLCJcXG1hdGhybGFwe1xcdGV4dHJteyMxfX0iKSxQcigiXFxjbGFwIiwiXFxtYXRoY2xhcHtcXHRleHRybXsjMX19IiksUHIoIlxcbWF0aHN0cnV0IiwiXFx2cGhhbnRvbXsofSIpLFByKCJcXHVuZGVyYmFyIiwiXFx1bmRlcmxpbmV7XFx0ZXh0eyMxfX0iKSxQcigiXFxub3QiLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXG1hdGhybGFwXFxAbm90fX17XFxjaGFyIjMzOH0nKSxQcigiXFxuZXEiLCJcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXG5vdD19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjI2MH19IiksUHIoIlxcbmUiLCJcXG5lcSIpLFByKCJcdTIyNjAiLCJcXG5lcSIpLFByKCJcXG5vdGluIiwiXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7e1xcaW59XFxtYXRobGxhcHsvXFxtc2tpcDFtdX19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjIwOX19IiksUHIoIlx1MjIwOSIsIlxcbm90aW4iKSxQcigiXHUyMjU4IiwiXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7PVxca2VybnstMWVtfVxccmFpc2Vib3h7MC40ZW19eyRcXHNjcmlwdHNpemVcXGZyb3duJH19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjI1OH19IiksUHIoIlx1MjI1OSIsIlxcaHRtbEBtYXRobWx7XFxzdGFja3JlbHtcXHRpbnlcXHdlZGdlfXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNTh9fSIpLFByKCJcdTIyNWEiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFx0aW55XFx2ZWV9ez19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjI1YX19IiksUHIoIlx1MjI1YiIsIlxcaHRtbEBtYXRobWx7XFxzdGFja3JlbHtcXHNjcmlwdHNpemVcXHN0YXJ9ez19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjI1Yn19IiksUHIoIlx1MjI1ZCIsIlxcaHRtbEBtYXRobWx7XFxzdGFja3JlbHtcXHRpbnlcXG1hdGhybXtkZWZ9fXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNWR9fSIpLFByKCJcdTIyNWUiLCJcXGh0bWxAbWF0aG1se1xcc3RhY2tyZWx7XFx0aW55XFxtYXRocm17bX19ez19fXtcXG1hdGhyZWx7XFxjaGFyYFx1MjI1ZX19IiksUHIoIlx1MjI1ZiIsIlxcaHRtbEBtYXRobWx7XFxzdGFja3JlbHtcXHRpbnk/fXs9fX17XFxtYXRocmVse1xcY2hhcmBcdTIyNWZ9fSIpLFByKCJcdTI3YzIiLCJcXHBlcnAiKSxQcigiXHUyMDNjIiwiXFxtYXRoY2xvc2V7IVxcbWtlcm4tMC44bXUhfSIpLFByKCJcdTIyMGMiLCJcXG5vdG5pIiksUHIoIlx1MjMxYyIsIlxcdWxjb3JuZXIiKSxQcigiXHUyMzFkIiwiXFx1cmNvcm5lciIpLFByKCJcdTIzMWUiLCJcXGxsY29ybmVyIiksUHIoIlx1MjMxZiIsIlxcbHJjb3JuZXIiKSxQcigiXHhhOSIsIlxcY29weXJpZ2h0IiksUHIoIlx4YWUiLCJcXHRleHRyZWdpc3RlcmVkIiksUHIoIlx1ZmUwZiIsIlxcdGV4dHJlZ2lzdGVyZWQiKSxQcigiXFx1bGNvcm5lciIsJ1xcaHRtbEBtYXRobWx7XFxAdWxjb3JuZXJ9e1xcbWF0aG9we1xcY2hhciIyMzFjfX0nKSxQcigiXFx1cmNvcm5lciIsJ1xcaHRtbEBtYXRobWx7XFxAdXJjb3JuZXJ9e1xcbWF0aG9we1xcY2hhciIyMzFkfX0nKSxQcigiXFxsbGNvcm5lciIsJ1xcaHRtbEBtYXRobWx7XFxAbGxjb3JuZXJ9e1xcbWF0aG9we1xcY2hhciIyMzFlfX0nKSxQcigiXFxscmNvcm5lciIsJ1xcaHRtbEBtYXRobWx7XFxAbHJjb3JuZXJ9e1xcbWF0aG9we1xcY2hhciIyMzFmfX0nKSxQcigiXFx2ZG90cyIsIlxcbWF0aG9yZHtcXHZhcnZkb3RzXFxydWxlezBwdH17MTVwdH19IiksUHIoIlx1MjJlZSIsIlxcdmRvdHMiKSxQcigiXFx2YXJHYW1tYSIsIlxcbWF0aGl0e1xcR2FtbWF9IiksUHIoIlxcdmFyRGVsdGEiLCJcXG1hdGhpdHtcXERlbHRhfSIpLFByKCJcXHZhclRoZXRhIiwiXFxtYXRoaXR7XFxUaGV0YX0iKSxQcigiXFx2YXJMYW1iZGEiLCJcXG1hdGhpdHtcXExhbWJkYX0iKSxQcigiXFx2YXJYaSIsIlxcbWF0aGl0e1xcWGl9IiksUHIoIlxcdmFyUGkiLCJcXG1hdGhpdHtcXFBpfSIpLFByKCJcXHZhclNpZ21hIiwiXFxtYXRoaXR7XFxTaWdtYX0iKSxQcigiXFx2YXJVcHNpbG9uIiwiXFxtYXRoaXR7XFxVcHNpbG9ufSIpLFByKCJcXHZhclBoaSIsIlxcbWF0aGl0e1xcUGhpfSIpLFByKCJcXHZhclBzaSIsIlxcbWF0aGl0e1xcUHNpfSIpLFByKCJcXHZhck9tZWdhIiwiXFxtYXRoaXR7XFxPbWVnYX0iKSxQcigiXFxzdWJzdGFjayIsIlxcYmVnaW57c3ViYXJyYXl9e2N9IzFcXGVuZHtzdWJhcnJheX0iKSxQcigiXFxjb2xvbiIsIlxcbm9icmVha1xcbXNraXAybXVcXG1hdGhwdW5jdHt9XFxtYXRoY2hvaWNle1xcbWtlcm4tM211fXtcXG1rZXJuLTNtdX17fXt9ezp9XFxtc2tpcDZtdVxccmVsYXgiKSxQcigiXFxib3hlZCIsIlxcZmJveHskXFxkaXNwbGF5c3R5bGV7IzF9JH0iKSxQcigiXFxpZmYiLCJcXERPVFNCXFw7XFxMb25nbGVmdHJpZ2h0YXJyb3dcXDsiKSxQcigiXFxpbXBsaWVzIiwiXFxET1RTQlxcO1xcTG9uZ3JpZ2h0YXJyb3dcXDsiKSxQcigiXFxpbXBsaWVkYnkiLCJcXERPVFNCXFw7XFxMb25nbGVmdGFycm93XFw7Iik7dmFyIEduPXsiLCI6IlxcZG90c2MiLCJcXG5vdCI6IlxcZG90c2IiLCIrIjoiXFxkb3RzYiIsIj0iOiJcXGRvdHNiIiwiPCI6IlxcZG90c2IiLCI+IjoiXFxkb3RzYiIsIi0iOiJcXGRvdHNiIiwiKiI6IlxcZG90c2IiLCI6IjoiXFxkb3RzYiIsIlxcRE9UU0IiOiJcXGRvdHNiIiwiXFxjb3Byb2QiOiJcXGRvdHNiIiwiXFxiaWd2ZWUiOiJcXGRvdHNiIiwiXFxiaWd3ZWRnZSI6IlxcZG90c2IiLCJcXGJpZ3VwbHVzIjoiXFxkb3RzYiIsIlxcYmlnY2FwIjoiXFxkb3RzYiIsIlxcYmlnY3VwIjoiXFxkb3RzYiIsIlxccHJvZCI6IlxcZG90c2IiLCJcXHN1bSI6IlxcZG90c2IiLCJcXGJpZ290aW1lcyI6IlxcZG90c2IiLCJcXGJpZ29wbHVzIjoiXFxkb3RzYiIsIlxcYmlnb2RvdCI6IlxcZG90c2IiLCJcXGJpZ3NxY3VwIjoiXFxkb3RzYiIsIlxcQW5kIjoiXFxkb3RzYiIsIlxcbG9uZ3JpZ2h0YXJyb3ciOiJcXGRvdHNiIiwiXFxMb25ncmlnaHRhcnJvdyI6IlxcZG90c2IiLCJcXGxvbmdsZWZ0YXJyb3ciOiJcXGRvdHNiIiwiXFxMb25nbGVmdGFycm93IjoiXFxkb3RzYiIsIlxcbG9uZ2xlZnRyaWdodGFycm93IjoiXFxkb3RzYiIsIlxcTG9uZ2xlZnRyaWdodGFycm93IjoiXFxkb3RzYiIsIlxcbWFwc3RvIjoiXFxkb3RzYiIsIlxcbG9uZ21hcHN0byI6IlxcZG90c2IiLCJcXGhvb2tyaWdodGFycm93IjoiXFxkb3RzYiIsIlxcZG90ZXEiOiJcXGRvdHNiIiwiXFxtYXRoYmluIjoiXFxkb3RzYiIsIlxcbWF0aHJlbCI6IlxcZG90c2IiLCJcXHJlbGJhciI6IlxcZG90c2IiLCJcXFJlbGJhciI6IlxcZG90c2IiLCJcXHhyaWdodGFycm93IjoiXFxkb3RzYiIsIlxceGxlZnRhcnJvdyI6IlxcZG90c2IiLCJcXERPVFNJIjoiXFxkb3RzaSIsIlxcaW50IjoiXFxkb3RzaSIsIlxcb2ludCI6IlxcZG90c2kiLCJcXGlpbnQiOiJcXGRvdHNpIiwiXFxpaWludCI6IlxcZG90c2kiLCJcXGlpaWludCI6IlxcZG90c2kiLCJcXGlkb3RzaW50IjoiXFxkb3RzaSIsIlxcRE9UU1giOiJcXGRvdHN4In07UHIoIlxcZG90cyIsKGZ1bmN0aW9uKGUpe3ZhciB0PSJcXGRvdHNvIixyPWUuZXhwYW5kQWZ0ZXJGdXR1cmUoKS50ZXh0O3JldHVybiByIGluIEduP3Q9R25bcl06KCJcXG5vdCI9PT1yLnNsaWNlKDAsNCl8fHIgaW4gYWUubWF0aCYmbC5jb250YWlucyhbImJpbiIsInJlbCJdLGFlLm1hdGhbcl0uZ3JvdXApKSYmKHQ9IlxcZG90c2IiKSx0fSkpO3ZhciBVbj17IikiOiEwLCJdIjohMCwiXFxyYnJhY2siOiEwLCJcXH0iOiEwLCJcXHJicmFjZSI6ITAsIlxccmFuZ2xlIjohMCwiXFxyY2VpbCI6ITAsIlxccmZsb29yIjohMCwiXFxyZ3JvdXAiOiEwLCJcXHJtb3VzdGFjaGUiOiEwLCJcXHJpZ2h0IjohMCwiXFxiaWdyIjohMCwiXFxiaWdnciI6ITAsIlxcQmlnciI6ITAsIlxcQmlnZ3IiOiEwLCQ6ITAsIjsiOiEwLCIuIjohMCwiLCI6ITB9O1ByKCJcXGRvdHNvIiwoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZnV0dXJlKCkudGV4dCBpbiBVbj8iXFxsZG90c1xcLCI6IlxcbGRvdHMifSkpLFByKCJcXGRvdHNjIiwoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5mdXR1cmUoKS50ZXh0O3JldHVybiB0IGluIFVuJiYiLCIhPT10PyJcXGxkb3RzXFwsIjoiXFxsZG90cyJ9KSksUHIoIlxcY2RvdHMiLChmdW5jdGlvbihlKXtyZXR1cm4gZS5mdXR1cmUoKS50ZXh0IGluIFVuPyJcXEBjZG90c1xcLCI6IlxcQGNkb3RzIn0pKSxQcigiXFxkb3RzYiIsIlxcY2RvdHMiKSxQcigiXFxkb3RzbSIsIlxcY2RvdHMiKSxQcigiXFxkb3RzaSIsIlxcIVxcY2RvdHMiKSxQcigiXFxkb3RzeCIsIlxcbGRvdHNcXCwiKSxQcigiXFxET1RTSSIsIlxccmVsYXgiKSxQcigiXFxET1RTQiIsIlxccmVsYXgiKSxQcigiXFxET1RTWCIsIlxccmVsYXgiKSxQcigiXFx0bXNwYWNlIiwiXFxUZXh0T3JNYXRoe1xca2VybiMxIzN9e1xcbXNraXAjMSMyfVxccmVsYXgiKSxQcigiXFwsIiwiXFx0bXNwYWNlK3szbXV9ey4xNjY3ZW19IiksUHIoIlxcdGhpbnNwYWNlIiwiXFwsIiksUHIoIlxcPiIsIlxcbXNraXB7NG11fSIpLFByKCJcXDoiLCJcXHRtc3BhY2UrezRtdX17LjIyMjJlbX0iKSxQcigiXFxtZWRzcGFjZSIsIlxcOiIpLFByKCJcXDsiLCJcXHRtc3BhY2UrezVtdX17LjI3NzdlbX0iKSxQcigiXFx0aGlja3NwYWNlIiwiXFw7IiksUHIoIlxcISIsIlxcdG1zcGFjZS17M211fXsuMTY2N2VtfSIpLFByKCJcXG5lZ3RoaW5zcGFjZSIsIlxcISIpLFByKCJcXG5lZ21lZHNwYWNlIiwiXFx0bXNwYWNlLXs0bXV9ey4yMjIyZW19IiksUHIoIlxcbmVndGhpY2tzcGFjZSIsIlxcdG1zcGFjZS17NW11fXsuMjc3ZW19IiksUHIoIlxcZW5zcGFjZSIsIlxca2Vybi41ZW0gIiksUHIoIlxcZW5za2lwIiwiXFxoc2tpcC41ZW1cXHJlbGF4IiksUHIoIlxccXVhZCIsIlxcaHNraXAxZW1cXHJlbGF4IiksUHIoIlxccXF1YWQiLCJcXGhza2lwMmVtXFxyZWxheCIpLFByKCJcXHRhZyIsIlxcQGlmc3RhclxcdGFnQGxpdGVyYWxcXHRhZ0BwYXJlbiIpLFByKCJcXHRhZ0BwYXJlbiIsIlxcdGFnQGxpdGVyYWx7KHsjMX0pfSIpLFByKCJcXHRhZ0BsaXRlcmFsIiwoZnVuY3Rpb24oZSl7aWYoZS5tYWNyb3MuZ2V0KCJcXGRmQHRhZyIpKXRocm93IG5ldyBuKCJNdWx0aXBsZSBcXHRhZyIpO3JldHVybiJcXGdkZWZcXGRmQHRhZ3tcXHRleHR7IzF9fSJ9KSksUHIoIlxcYm1vZCIsIlxcbWF0aGNob2ljZXtcXG1za2lwMW11fXtcXG1za2lwMW11fXtcXG1za2lwNW11fXtcXG1za2lwNW11fVxcbWF0aGJpbntcXHJtIG1vZH1cXG1hdGhjaG9pY2V7XFxtc2tpcDFtdX17XFxtc2tpcDFtdX17XFxtc2tpcDVtdX17XFxtc2tpcDVtdX0iKSxQcigiXFxwb2QiLCJcXGFsbG93YnJlYWtcXG1hdGhjaG9pY2V7XFxta2VybjE4bXV9e1xcbWtlcm44bXV9e1xcbWtlcm44bXV9e1xcbWtlcm44bXV9KCMxKSIpLFByKCJcXHBtb2QiLCJcXHBvZHt7XFxybSBtb2R9XFxta2VybjZtdSMxfSIpLFByKCJcXG1vZCIsIlxcYWxsb3dicmVha1xcbWF0aGNob2ljZXtcXG1rZXJuMThtdX17XFxta2VybjEybXV9e1xcbWtlcm4xMm11fXtcXG1rZXJuMTJtdX17XFxybSBtb2R9XFwsXFwsIzEiKSxQcigiXFxuZXdsaW5lIiwiXFxcXFxccmVsYXgiKSxQcigiXFxUZVgiLCJcXHRleHRybXtcXGh0bWxAbWF0aG1se1RcXGtlcm4tLjE2NjdlbVxccmFpc2Vib3h7LS41ZXh9e0V9XFxrZXJuLS4xMjVlbVh9e1RlWH19Iik7dmFyIFluPUYoVFsiTWFpbi1SZWd1bGFyIl1bIlQiLmNoYXJDb2RlQXQoMCldWzFdLS43KlRbIk1haW4tUmVndWxhciJdWyJBIi5jaGFyQ29kZUF0KDApXVsxXSk7UHIoIlxcTGFUZVgiLCJcXHRleHRybXtcXGh0bWxAbWF0aG1se0xcXGtlcm4tLjM2ZW1cXHJhaXNlYm94eyIrWW4rIn17XFxzY3JpcHRzdHlsZSBBfVxca2Vybi0uMTVlbVxcVGVYfXtMYVRlWH19IiksUHIoIlxcS2FUZVgiLCJcXHRleHRybXtcXGh0bWxAbWF0aG1se0tcXGtlcm4tLjE3ZW1cXHJhaXNlYm94eyIrWW4rIn17XFxzY3JpcHRzdHlsZSBBfVxca2Vybi0uMTVlbVxcVGVYfXtLYVRlWH19IiksUHIoIlxcaHNwYWNlIiwiXFxAaWZzdGFyXFxAaHNwYWNlclxcQGhzcGFjZSIpLFByKCJcXEBoc3BhY2UiLCJcXGhza2lwICMxXFxyZWxheCIpLFByKCJcXEBoc3BhY2VyIiwiXFxydWxlezBwdH17MHB0fVxcaHNraXAgIzFcXHJlbGF4IiksUHIoIlxcb3JkaW5hcnljb2xvbiIsIjoiKSxQcigiXFx2Y2VudGNvbG9uIiwiXFxtYXRocmVse1xcbWF0aG9wXFxvcmRpbmFyeWNvbG9ufSIpLFByKCJcXGRibGNvbG9uIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFx2Y2VudGNvbG9uXFxtYXRocmVse1xcbWtlcm4tLjltdX1cXHZjZW50Y29sb259fXtcXG1hdGhvcHtcXGNoYXIiMjIzN319JyksUHIoIlxcY29sb25lcXEiLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXHZjZW50Y29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX09fX17XFxtYXRob3B7XFxjaGFyIjIyNTR9fScpLFByKCJcXENvbG9uZXFxIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxkYmxjb2xvblxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fT19fXtcXG1hdGhvcHtcXGNoYXIiMjIzN1xcY2hhciIzZH19JyksUHIoIlxcY29sb25lcSIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcdmNlbnRjb2xvblxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcbWF0aHJlbHstfX19e1xcbWF0aG9we1xcY2hhciIzYVxcY2hhciIyMjEyfX0nKSxQcigiXFxDb2xvbmVxIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxkYmxjb2xvblxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcbWF0aHJlbHstfX19e1xcbWF0aG9we1xcY2hhciIyMjM3XFxjaGFyIjIyMTJ9fScpLFByKCJcXGVxcWNvbG9uIiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7PVxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcdmNlbnRjb2xvbn19e1xcbWF0aG9we1xcY2hhciIyMjU1fX0nKSxQcigiXFxFcXFjb2xvbiIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVsez1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXGRibGNvbG9ufX17XFxtYXRob3B7XFxjaGFyIjNkXFxjaGFyIjIyMzd9fScpLFByKCJcXGVxY29sb24iLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXG1hdGhyZWx7LX1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHZjZW50Y29sb259fXtcXG1hdGhvcHtcXGNoYXIiMjIzOX19JyksUHIoIlxcRXFjb2xvbiIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcbWF0aHJlbHstfVxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcZGJsY29sb259fXtcXG1hdGhvcHtcXGNoYXIiMjIxMlxcY2hhciIyMjM3fX0nKSxQcigiXFxjb2xvbmFwcHJveCIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcdmNlbnRjb2xvblxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcYXBwcm94fX17XFxtYXRob3B7XFxjaGFyIjNhXFxjaGFyIjIyNDh9fScpLFByKCJcXENvbG9uYXBwcm94IiwnXFxodG1sQG1hdGhtbHtcXG1hdGhyZWx7XFxkYmxjb2xvblxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcYXBwcm94fX17XFxtYXRob3B7XFxjaGFyIjIyMzdcXGNoYXIiMjI0OH19JyksUHIoIlxcY29sb25zaW0iLCdcXGh0bWxAbWF0aG1se1xcbWF0aHJlbHtcXHZjZW50Y29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHNpbX19e1xcbWF0aG9we1xcY2hhciIzYVxcY2hhciIyMjNjfX0nKSxQcigiXFxDb2xvbnNpbSIsJ1xcaHRtbEBtYXRobWx7XFxtYXRocmVse1xcZGJsY29sb25cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHNpbX19e1xcbWF0aG9we1xcY2hhciIyMjM3XFxjaGFyIjIyM2N9fScpLFByKCJcdTIyMzciLCJcXGRibGNvbG9uIiksUHIoIlx1MjIzOSIsIlxcZXFjb2xvbiIpLFByKCJcdTIyNTQiLCJcXGNvbG9uZXFxIiksUHIoIlx1MjI1NSIsIlxcZXFxY29sb24iKSxQcigiXHUyYTc0IiwiXFxDb2xvbmVxcSIpLFByKCJcXHJhdGlvIiwiXFx2Y2VudGNvbG9uIiksUHIoIlxcY29sb25jb2xvbiIsIlxcZGJsY29sb24iKSxQcigiXFxjb2xvbmVxdWFscyIsIlxcY29sb25lcXEiKSxQcigiXFxjb2xvbmNvbG9uZXF1YWxzIiwiXFxDb2xvbmVxcSIpLFByKCJcXGVxdWFsc2NvbG9uIiwiXFxlcXFjb2xvbiIpLFByKCJcXGVxdWFsc2NvbG9uY29sb24iLCJcXEVxcWNvbG9uIiksUHIoIlxcY29sb25taW51cyIsIlxcY29sb25lcSIpLFByKCJcXGNvbG9uY29sb25taW51cyIsIlxcQ29sb25lcSIpLFByKCJcXG1pbnVzY29sb24iLCJcXGVxY29sb24iKSxQcigiXFxtaW51c2NvbG9uY29sb24iLCJcXEVxY29sb24iKSxQcigiXFxjb2xvbmNvbG9uYXBwcm94IiwiXFxDb2xvbmFwcHJveCIpLFByKCJcXGNvbG9uY29sb25zaW0iLCJcXENvbG9uc2ltIiksUHIoIlxcc2ltY29sb24iLCJcXG1hdGhyZWx7XFxzaW1cXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHZjZW50Y29sb259IiksUHIoIlxcc2ltY29sb25jb2xvbiIsIlxcbWF0aHJlbHtcXHNpbVxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcZGJsY29sb259IiksUHIoIlxcYXBwcm94Y29sb24iLCJcXG1hdGhyZWx7XFxhcHByb3hcXG1hdGhyZWx7XFxta2Vybi0xLjJtdX1cXHZjZW50Y29sb259IiksUHIoIlxcYXBwcm94Y29sb25jb2xvbiIsIlxcbWF0aHJlbHtcXGFwcHJveFxcbWF0aHJlbHtcXG1rZXJuLTEuMm11fVxcZGJsY29sb259IiksUHIoIlxcbm90bmkiLCJcXGh0bWxAbWF0aG1se1xcbm90XFxuaX17XFxtYXRocmVse1xcY2hhcmBcdTIyMGN9fSIpLFByKCJcXGxpbXN1cCIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7bGltXFwsc3VwfSIpLFByKCJcXGxpbWluZiIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7bGltXFwsaW5mfSIpLFByKCJcXGluamxpbSIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7aW5qXFwsbGltfSIpLFByKCJcXHByb2psaW0iLCJcXERPVFNCXFxvcGVyYXRvcm5hbWUqe3Byb2pcXCxsaW19IiksUHIoIlxcdmFybGltc3VwIiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKntcXG92ZXJsaW5le2xpbX19IiksUHIoIlxcdmFybGltaW5mIiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKntcXHVuZGVybGluZXtsaW19fSIpLFByKCJcXHZhcmluamxpbSIsIlxcRE9UU0JcXG9wZXJhdG9ybmFtZSp7XFx1bmRlcnJpZ2h0YXJyb3d7bGltfX0iKSxQcigiXFx2YXJwcm9qbGltIiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKntcXHVuZGVybGVmdGFycm93e2xpbX19IiksUHIoIlxcZ3ZlcnRuZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBndmVydG5lcXF9e1x1MjI2OX0iKSxQcigiXFxsdmVydG5lcXEiLCJcXGh0bWxAbWF0aG1se1xcQGx2ZXJ0bmVxcX17XHUyMjY4fSIpLFByKCJcXG5nZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBuZ2VxcX17XHUyMjcxfSIpLFByKCJcXG5nZXFzbGFudCIsIlxcaHRtbEBtYXRobWx7XFxAbmdlcXNsYW50fXtcdTIyNzF9IiksUHIoIlxcbmxlcXEiLCJcXGh0bWxAbWF0aG1se1xcQG5sZXFxfXtcdTIyNzB9IiksUHIoIlxcbmxlcXNsYW50IiwiXFxodG1sQG1hdGhtbHtcXEBubGVxc2xhbnR9e1x1MjI3MH0iKSxQcigiXFxuc2hvcnRtaWQiLCJcXGh0bWxAbWF0aG1se1xcQG5zaG9ydG1pZH17XHUyMjI0fSIpLFByKCJcXG5zaG9ydHBhcmFsbGVsIiwiXFxodG1sQG1hdGhtbHtcXEBuc2hvcnRwYXJhbGxlbH17XHUyMjI2fSIpLFByKCJcXG5zdWJzZXRlcXEiLCJcXGh0bWxAbWF0aG1se1xcQG5zdWJzZXRlcXF9e1x1MjI4OH0iKSxQcigiXFxuc3Vwc2V0ZXFxIiwiXFxodG1sQG1hdGhtbHtcXEBuc3Vwc2V0ZXFxfXtcdTIyODl9IiksUHIoIlxcdmFyc3Vic2V0bmVxIiwiXFxodG1sQG1hdGhtbHtcXEB2YXJzdWJzZXRuZXF9e1x1MjI4YX0iKSxQcigiXFx2YXJzdWJzZXRuZXFxIiwiXFxodG1sQG1hdGhtbHtcXEB2YXJzdWJzZXRuZXFxfXtcdTJhY2J9IiksUHIoIlxcdmFyc3Vwc2V0bmVxIiwiXFxodG1sQG1hdGhtbHtcXEB2YXJzdXBzZXRuZXF9e1x1MjI4Yn0iKSxQcigiXFx2YXJzdXBzZXRuZXFxIiwiXFxodG1sQG1hdGhtbHtcXEB2YXJzdXBzZXRuZXFxfXtcdTJhY2N9IiksUHIoIlxcaW1hdGgiLCJcXGh0bWxAbWF0aG1se1xcQGltYXRofXtcdTAxMzF9IiksUHIoIlxcam1hdGgiLCJcXGh0bWxAbWF0aG1se1xcQGptYXRofXtcdTAyMzd9IiksUHIoIlxcbGxicmFja2V0IiwiXFxodG1sQG1hdGhtbHtcXG1hdGhvcGVue1tcXG1rZXJuLTMuMm11W319e1xcbWF0aG9wZW57XFxjaGFyYFx1MjdlNn19IiksUHIoIlxccnJicmFja2V0IiwiXFxodG1sQG1hdGhtbHtcXG1hdGhjbG9zZXtdXFxta2Vybi0zLjJtdV19fXtcXG1hdGhjbG9zZXtcXGNoYXJgXHUyN2U3fX0iKSxQcigiXHUyN2U2IiwiXFxsbGJyYWNrZXQiKSxQcigiXHUyN2U3IiwiXFxycmJyYWNrZXQiKSxQcigiXFxsQnJhY2UiLCJcXGh0bWxAbWF0aG1se1xcbWF0aG9wZW57XFx7XFxta2Vybi0zLjJtdVt9fXtcXG1hdGhvcGVue1xcY2hhcmBcdTI5ODN9fSIpLFByKCJcXHJCcmFjZSIsIlxcaHRtbEBtYXRobWx7XFxtYXRoY2xvc2V7XVxcbWtlcm4tMy4ybXVcXH19fXtcXG1hdGhjbG9zZXtcXGNoYXJgXHUyOTg0fX0iKSxQcigiXHUyOTgzIiwiXFxsQnJhY2UiKSxQcigiXHUyOTg0IiwiXFxyQnJhY2UiKSxQcigiXFxtaW51c28iLCJcXG1hdGhiaW57XFxodG1sQG1hdGhtbHt7XFxtYXRocmxhcHtcXG1hdGhjaG9pY2V7XFxrZXJuezAuMTQ1ZW19fXtcXGtlcm57MC4xNDVlbX19e1xca2VybnswLjEwMTVlbX19e1xca2VybnswLjA3MjVlbX19XFxjaXJjfXstfX19e1xcY2hhcmBcdTI5YjV9fSIpLFByKCJcdTI5YjUiLCJcXG1pbnVzbyIpLFByKCJcXGRhcnIiLCJcXGRvd25hcnJvdyIpLFByKCJcXGRBcnIiLCJcXERvd25hcnJvdyIpLFByKCJcXERhcnIiLCJcXERvd25hcnJvdyIpLFByKCJcXGxhbmciLCJcXGxhbmdsZSIpLFByKCJcXHJhbmciLCJcXHJhbmdsZSIpLFByKCJcXHVhcnIiLCJcXHVwYXJyb3ciKSxQcigiXFx1QXJyIiwiXFxVcGFycm93IiksUHIoIlxcVWFyciIsIlxcVXBhcnJvdyIpLFByKCJcXE4iLCJcXG1hdGhiYntOfSIpLFByKCJcXFIiLCJcXG1hdGhiYntSfSIpLFByKCJcXFoiLCJcXG1hdGhiYntafSIpLFByKCJcXGFsZWYiLCJcXGFsZXBoIiksUHIoIlxcYWxlZnN5bSIsIlxcYWxlcGgiKSxQcigiXFxBbHBoYSIsIlxcbWF0aHJte0F9IiksUHIoIlxcQmV0YSIsIlxcbWF0aHJte0J9IiksUHIoIlxcYnVsbCIsIlxcYnVsbGV0IiksUHIoIlxcQ2hpIiwiXFxtYXRocm17WH0iKSxQcigiXFxjbHVicyIsIlxcY2x1YnN1aXQiKSxQcigiXFxjbnVtcyIsIlxcbWF0aGJie0N9IiksUHIoIlxcQ29tcGxleCIsIlxcbWF0aGJie0N9IiksUHIoIlxcRGFnZ2VyIiwiXFxkZGFnZ2VyIiksUHIoIlxcZGlhbW9uZHMiLCJcXGRpYW1vbmRzdWl0IiksUHIoIlxcZW1wdHkiLCJcXGVtcHR5c2V0IiksUHIoIlxcRXBzaWxvbiIsIlxcbWF0aHJte0V9IiksUHIoIlxcRXRhIiwiXFxtYXRocm17SH0iKSxQcigiXFxleGlzdCIsIlxcZXhpc3RzIiksUHIoIlxcaGFyciIsIlxcbGVmdHJpZ2h0YXJyb3ciKSxQcigiXFxoQXJyIiwiXFxMZWZ0cmlnaHRhcnJvdyIpLFByKCJcXEhhcnIiLCJcXExlZnRyaWdodGFycm93IiksUHIoIlxcaGVhcnRzIiwiXFxoZWFydHN1aXQiKSxQcigiXFxpbWFnZSIsIlxcSW0iKSxQcigiXFxpbmZpbiIsIlxcaW5mdHkiKSxQcigiXFxJb3RhIiwiXFxtYXRocm17SX0iKSxQcigiXFxpc2luIiwiXFxpbiIpLFByKCJcXEthcHBhIiwiXFxtYXRocm17S30iKSxQcigiXFxsYXJyIiwiXFxsZWZ0YXJyb3ciKSxQcigiXFxsQXJyIiwiXFxMZWZ0YXJyb3ciKSxQcigiXFxMYXJyIiwiXFxMZWZ0YXJyb3ciKSxQcigiXFxscmFyciIsIlxcbGVmdHJpZ2h0YXJyb3ciKSxQcigiXFxsckFyciIsIlxcTGVmdHJpZ2h0YXJyb3ciKSxQcigiXFxMcmFyciIsIlxcTGVmdHJpZ2h0YXJyb3ciKSxQcigiXFxNdSIsIlxcbWF0aHJte019IiksUHIoIlxcbmF0bnVtcyIsIlxcbWF0aGJie059IiksUHIoIlxcTnUiLCJcXG1hdGhybXtOfSIpLFByKCJcXE9taWNyb24iLCJcXG1hdGhybXtPfSIpLFByKCJcXHBsdXNtbiIsIlxccG0iKSxQcigiXFxyYXJyIiwiXFxyaWdodGFycm93IiksUHIoIlxcckFyciIsIlxcUmlnaHRhcnJvdyIpLFByKCJcXFJhcnIiLCJcXFJpZ2h0YXJyb3ciKSxQcigiXFxyZWFsIiwiXFxSZSIpLFByKCJcXHJlYWxzIiwiXFxtYXRoYmJ7Un0iKSxQcigiXFxSZWFscyIsIlxcbWF0aGJie1J9IiksUHIoIlxcUmhvIiwiXFxtYXRocm17UH0iKSxQcigiXFxzZG90IiwiXFxjZG90IiksUHIoIlxcc2VjdCIsIlxcUyIpLFByKCJcXHNwYWRlcyIsIlxcc3BhZGVzdWl0IiksUHIoIlxcc3ViIiwiXFxzdWJzZXQiKSxQcigiXFxzdWJlIiwiXFxzdWJzZXRlcSIpLFByKCJcXHN1cGUiLCJcXHN1cHNldGVxIiksUHIoIlxcVGF1IiwiXFxtYXRocm17VH0iKSxQcigiXFx0aGV0YXN5bSIsIlxcdmFydGhldGEiKSxQcigiXFx3ZWllcnAiLCJcXHdwIiksUHIoIlxcWmV0YSIsIlxcbWF0aHJte1p9IiksUHIoIlxcYXJnbWluIiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKnthcmdcXCxtaW59IiksUHIoIlxcYXJnbWF4IiwiXFxET1RTQlxcb3BlcmF0b3JuYW1lKnthcmdcXCxtYXh9IiksUHIoIlxccGxpbSIsIlxcRE9UU0JcXG1hdGhvcHtcXG9wZXJhdG9ybmFtZXtwbGltfX1cXGxpbWl0cyIpLFByKCJcXGJyYSIsIlxcbWF0aGlubmVye1xcbGFuZ2xleyMxfXx9IiksUHIoIlxca2V0IiwiXFxtYXRoaW5uZXJ7fHsjMX1cXHJhbmdsZX0iKSxQcigiXFxicmFrZXQiLCJcXG1hdGhpbm5lcntcXGxhbmdsZXsjMX1cXHJhbmdsZX0iKSxQcigiXFxCcmEiLCJcXGxlZnRcXGxhbmdsZSMxXFxyaWdodHwiKSxQcigiXFxLZXQiLCJcXGxlZnR8IzFcXHJpZ2h0XFxyYW5nbGUiKTt2YXIgWG49ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3ZhciByPXQuY29uc3VtZUFyZygpLnRva2VucyxuPXQuY29uc3VtZUFyZygpLnRva2VucyxhPXQuY29uc3VtZUFyZygpLnRva2VucyxpPXQuY29uc3VtZUFyZygpLnRva2VucyxvPXQubWFjcm9zLmdldCgifCIpLHM9dC5tYWNyb3MuZ2V0KCJcXHwiKTt0Lm1hY3Jvcy5iZWdpbkdyb3VwKCk7dmFyIGw9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHIpe2UmJihyLm1hY3Jvcy5zZXQoInwiLG8pLGEubGVuZ3RoJiZyLm1hY3Jvcy5zZXQoIlxcfCIscykpO3ZhciBpPXQ7IXQmJmEubGVuZ3RoJiYoInwiPT09ci5mdXR1cmUoKS50ZXh0JiYoci5wb3BUb2tlbigpLGk9ITApKTtyZXR1cm57dG9rZW5zOmk/YTpuLG51bUFyZ3M6MH19fTt0Lm1hY3Jvcy5zZXQoInwiLGwoITEpKSxhLmxlbmd0aCYmdC5tYWNyb3Muc2V0KCJcXHwiLGwoITApKTt2YXIgaD10LmNvbnN1bWVBcmcoKS50b2tlbnMsYz10LmV4cGFuZFRva2VucyhbXS5jb25jYXQoaSxoLHIpKTtyZXR1cm4gdC5tYWNyb3MuZW5kR3JvdXAoKSx7dG9rZW5zOmMucmV2ZXJzZSgpLG51bUFyZ3M6MH19fTtQcigiXFxicmFAa2V0IixYbighMSkpLFByKCJcXGJyYUBzZXQiLFhuKCEwKSksUHIoIlxcQnJha2V0IiwiXFxicmFAa2V0e1xcbGVmdFxcbGFuZ2xlfXtcXCxcXG1pZGRsZVxcdmVydFxcLH17XFwsXFxtaWRkbGVcXHZlcnRcXCx9e1xccmlnaHRcXHJhbmdsZX0iKSxQcigiXFxTZXQiLCJcXGJyYUBzZXR7XFxsZWZ0XFx7XFw6fXtcXDtcXG1pZGRsZVxcdmVydFxcO317XFw7XFxtaWRkbGVcXFZlcnRcXDt9e1xcOlxccmlnaHRcXH19IiksUHIoIlxcc2V0IiwiXFxicmFAc2V0e1xce1xcLH17XFxtaWR9e317XFwsXFx9fSIpLFByKCJcXGFuZ2xuIiwie1xcYW5nbCBufSIpLFByKCJcXGJsdWUiLCJcXHRleHRjb2xvcnsjIzY0OTVlZH17IzF9IiksUHIoIlxcb3JhbmdlIiwiXFx0ZXh0Y29sb3J7IyNmZmE1MDB9eyMxfSIpLFByKCJcXHBpbmsiLCJcXHRleHRjb2xvcnsjI2ZmMDBhZn17IzF9IiksUHIoIlxccmVkIiwiXFx0ZXh0Y29sb3J7IyNkZjAwMzB9eyMxfSIpLFByKCJcXGdyZWVuIiwiXFx0ZXh0Y29sb3J7IyMyOGFlN2J9eyMxfSIpLFByKCJcXGdyYXkiLCJcXHRleHRjb2xvcntncmF5fXsjMX0iKSxQcigiXFxwdXJwbGUiLCJcXHRleHRjb2xvcnsjIzlkMzhiZH17IzF9IiksUHIoIlxcYmx1ZUEiLCJcXHRleHRjb2xvcnsjI2NjZmFmZn17IzF9IiksUHIoIlxcYmx1ZUIiLCJcXHRleHRjb2xvcnsjIzgwZjZmZn17IzF9IiksUHIoIlxcYmx1ZUMiLCJcXHRleHRjb2xvcnsjIzYzZDllYX17IzF9IiksUHIoIlxcYmx1ZUQiLCJcXHRleHRjb2xvcnsjIzExYWNjZH17IzF9IiksUHIoIlxcYmx1ZUUiLCJcXHRleHRjb2xvcnsjIzBjN2Y5OX17IzF9IiksUHIoIlxcdGVhbEEiLCJcXHRleHRjb2xvcnsjIzk0ZmZmNX17IzF9IiksUHIoIlxcdGVhbEIiLCJcXHRleHRjb2xvcnsjIzI2ZWRkNX17IzF9IiksUHIoIlxcdGVhbEMiLCJcXHRleHRjb2xvcnsjIzAxZDFjMX17IzF9IiksUHIoIlxcdGVhbEQiLCJcXHRleHRjb2xvcnsjIzAxYTk5NX17IzF9IiksUHIoIlxcdGVhbEUiLCJcXHRleHRjb2xvcnsjIzIwODE3MH17IzF9IiksUHIoIlxcZ3JlZW5BIiwiXFx0ZXh0Y29sb3J7IyNiNmZmYjB9eyMxfSIpLFByKCJcXGdyZWVuQiIsIlxcdGV4dGNvbG9yeyMjOGFmMjgxfXsjMX0iKSxQcigiXFxncmVlbkMiLCJcXHRleHRjb2xvcnsjIzc0Y2Y3MH17IzF9IiksUHIoIlxcZ3JlZW5EIiwiXFx0ZXh0Y29sb3J7IyMxZmFiNTR9eyMxfSIpLFByKCJcXGdyZWVuRSIsIlxcdGV4dGNvbG9yeyMjMGQ5MjNmfXsjMX0iKSxQcigiXFxnb2xkQSIsIlxcdGV4dGNvbG9yeyMjZmZkMGE5fXsjMX0iKSxQcigiXFxnb2xkQiIsIlxcdGV4dGNvbG9yeyMjZmZiYjcxfXsjMX0iKSxQcigiXFxnb2xkQyIsIlxcdGV4dGNvbG9yeyMjZmY5YzM5fXsjMX0iKSxQcigiXFxnb2xkRCIsIlxcdGV4dGNvbG9yeyMjZTA3ZDEwfXsjMX0iKSxQcigiXFxnb2xkRSIsIlxcdGV4dGNvbG9yeyMjYTc1YTA1fXsjMX0iKSxQcigiXFxyZWRBIiwiXFx0ZXh0Y29sb3J7IyNmY2E5YTl9eyMxfSIpLFByKCJcXHJlZEIiLCJcXHRleHRjb2xvcnsjI2ZmODQ4Mn17IzF9IiksUHIoIlxccmVkQyIsIlxcdGV4dGNvbG9yeyMjZjk2ODVkfXsjMX0iKSxQcigiXFxyZWREIiwiXFx0ZXh0Y29sb3J7IyNlODRkMzl9eyMxfSIpLFByKCJcXHJlZEUiLCJcXHRleHRjb2xvcnsjI2JjMjYxMn17IzF9IiksUHIoIlxcbWFyb29uQSIsIlxcdGV4dGNvbG9yeyMjZmZiZGUwfXsjMX0iKSxQcigiXFxtYXJvb25CIiwiXFx0ZXh0Y29sb3J7IyNmZjkyYzZ9eyMxfSIpLFByKCJcXG1hcm9vbkMiLCJcXHRleHRjb2xvcnsjI2VkNWZhNn17IzF9IiksUHIoIlxcbWFyb29uRCIsIlxcdGV4dGNvbG9yeyMjY2EzMzdjfXsjMX0iKSxQcigiXFxtYXJvb25FIiwiXFx0ZXh0Y29sb3J7IyM5ZTAzNGV9eyMxfSIpLFByKCJcXHB1cnBsZUEiLCJcXHRleHRjb2xvcnsjI2RkZDdmZn17IzF9IiksUHIoIlxccHVycGxlQiIsIlxcdGV4dGNvbG9yeyMjYzZiOWZjfXsjMX0iKSxQcigiXFxwdXJwbGVDIiwiXFx0ZXh0Y29sb3J7IyNhYTg3ZmZ9eyMxfSIpLFByKCJcXHB1cnBsZUQiLCJcXHRleHRjb2xvcnsjIzc4NTRhYn17IzF9IiksUHIoIlxccHVycGxlRSIsIlxcdGV4dGNvbG9yeyMjNTQzYjc4fXsjMX0iKSxQcigiXFxtaW50QSIsIlxcdGV4dGNvbG9yeyMjZjVmOWU4fXsjMX0iKSxQcigiXFxtaW50QiIsIlxcdGV4dGNvbG9yeyMjZWRmMmRmfXsjMX0iKSxQcigiXFxtaW50QyIsIlxcdGV4dGNvbG9yeyMjZTBlNWNjfXsjMX0iKSxQcigiXFxncmF5QSIsIlxcdGV4dGNvbG9yeyMjZjZmN2Y3fXsjMX0iKSxQcigiXFxncmF5QiIsIlxcdGV4dGNvbG9yeyMjZjBmMWYyfXsjMX0iKSxQcigiXFxncmF5QyIsIlxcdGV4dGNvbG9yeyMjZTNlNWU2fXsjMX0iKSxQcigiXFxncmF5RCIsIlxcdGV4dGNvbG9yeyMjZDZkOGRhfXsjMX0iKSxQcigiXFxncmF5RSIsIlxcdGV4dGNvbG9yeyMjYmFiZWMyfXsjMX0iKSxQcigiXFxncmF5RiIsIlxcdGV4dGNvbG9yeyMjODg4ZDkzfXsjMX0iKSxQcigiXFxncmF5RyIsIlxcdGV4dGNvbG9yeyMjNjI2NTY5fXsjMX0iKSxQcigiXFxncmF5SCIsIlxcdGV4dGNvbG9yeyMjM2IzZTQwfXsjMX0iKSxQcigiXFxncmF5SSIsIlxcdGV4dGNvbG9yeyMjMjEyNDJjfXsjMX0iKSxQcigiXFxrYUJsdWUiLCJcXHRleHRjb2xvcnsjIzMxNDQ1M317IzF9IiksUHIoIlxca2FHcmVlbiIsIlxcdGV4dGNvbG9yeyMjNzFCMzA3fXsjMX0iKTt2YXIgV249eyJeIjohMCxfOiEwLCJcXGxpbWl0cyI6ITAsIlxcbm9saW1pdHMiOiEwfSxfbj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LHIpe3RoaXMuc2V0dGluZ3M9dm9pZCAwLHRoaXMuZXhwYW5zaW9uQ291bnQ9dm9pZCAwLHRoaXMubGV4ZXI9dm9pZCAwLHRoaXMubWFjcm9zPXZvaWQgMCx0aGlzLnN0YWNrPXZvaWQgMCx0aGlzLm1vZGU9dm9pZCAwLHRoaXMuc2V0dGluZ3M9dCx0aGlzLmV4cGFuc2lvbkNvdW50PTAsdGhpcy5mZWVkKGUpLHRoaXMubWFjcm9zPW5ldyBEbihWbix0Lm1hY3JvcyksdGhpcy5tb2RlPXIsdGhpcy5zdGFjaz1bXX12YXIgdD1lLnByb3RvdHlwZTtyZXR1cm4gdC5mZWVkPWZ1bmN0aW9uKGUpe3RoaXMubGV4ZXI9bmV3IExuKGUsdGhpcy5zZXR0aW5ncyl9LHQuc3dpdGNoTW9kZT1mdW5jdGlvbihlKXt0aGlzLm1vZGU9ZX0sdC5iZWdpbkdyb3VwPWZ1bmN0aW9uKCl7dGhpcy5tYWNyb3MuYmVnaW5Hcm91cCgpfSx0LmVuZEdyb3VwPWZ1bmN0aW9uKCl7dGhpcy5tYWNyb3MuZW5kR3JvdXAoKX0sdC5lbmRHcm91cHM9ZnVuY3Rpb24oKXt0aGlzLm1hY3Jvcy5lbmRHcm91cHMoKX0sdC5mdXR1cmU9ZnVuY3Rpb24oKXtyZXR1cm4gMD09PXRoaXMuc3RhY2subGVuZ3RoJiZ0aGlzLnB1c2hUb2tlbih0aGlzLmxleGVyLmxleCgpKSx0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdfSx0LnBvcFRva2VuPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnV0dXJlKCksdGhpcy5zdGFjay5wb3AoKX0sdC5wdXNoVG9rZW49ZnVuY3Rpb24oZSl7dGhpcy5zdGFjay5wdXNoKGUpfSx0LnB1c2hUb2tlbnM9ZnVuY3Rpb24oZSl7dmFyIHQ7KHQ9dGhpcy5zdGFjaykucHVzaC5hcHBseSh0LGUpfSx0LnNjYW5Bcmd1bWVudD1mdW5jdGlvbihlKXt2YXIgdCxyLG47aWYoZSl7aWYodGhpcy5jb25zdW1lU3BhY2VzKCksIlsiIT09dGhpcy5mdXR1cmUoKS50ZXh0KXJldHVybiBudWxsO3Q9dGhpcy5wb3BUb2tlbigpO3ZhciBhPXRoaXMuY29uc3VtZUFyZyhbIl0iXSk7bj1hLnRva2VucyxyPWEuZW5kfWVsc2V7dmFyIGk9dGhpcy5jb25zdW1lQXJnKCk7bj1pLnRva2Vucyx0PWkuc3RhcnQscj1pLmVuZH1yZXR1cm4gdGhpcy5wdXNoVG9rZW4obmV3IEdyKCJFT0YiLHIubG9jKSksdGhpcy5wdXNoVG9rZW5zKG4pLHQucmFuZ2UociwiIil9LHQuY29uc3VtZVNwYWNlcz1mdW5jdGlvbigpe2Zvcig7Oyl7aWYoIiAiIT09dGhpcy5mdXR1cmUoKS50ZXh0KWJyZWFrO3RoaXMuc3RhY2sucG9wKCl9fSx0LmNvbnN1bWVBcmc9ZnVuY3Rpb24oZSl7dmFyIHQ9W10scj1lJiZlLmxlbmd0aD4wO3J8fHRoaXMuY29uc3VtZVNwYWNlcygpO3ZhciBhLGk9dGhpcy5mdXR1cmUoKSxvPTAscz0wO2Rve2lmKGE9dGhpcy5wb3BUb2tlbigpLHQucHVzaChhKSwieyI9PT1hLnRleHQpKytvO2Vsc2UgaWYoIn0iPT09YS50ZXh0KXtpZigtMT09PS0tbyl0aHJvdyBuZXcgbigiRXh0cmEgfSIsYSl9ZWxzZSBpZigiRU9GIj09PWEudGV4dCl0aHJvdyBuZXcgbigiVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQgaW4gYSBtYWNybyBhcmd1bWVudCwgZXhwZWN0ZWQgJyIrKGUmJnI/ZVtzXToifSIpKyInIixhKTtpZihlJiZyKWlmKCgwPT09b3x8MT09PW8mJiJ7Ij09PWVbc10pJiZhLnRleHQ9PT1lW3NdKXtpZigrK3M9PT1lLmxlbmd0aCl7dC5zcGxpY2UoLXMscyk7YnJlYWt9fWVsc2Ugcz0wfXdoaWxlKDAhPT1vfHxyKTtyZXR1cm4ieyI9PT1pLnRleHQmJiJ9Ij09PXRbdC5sZW5ndGgtMV0udGV4dCYmKHQucG9wKCksdC5zaGlmdCgpKSx0LnJldmVyc2UoKSx7dG9rZW5zOnQsc3RhcnQ6aSxlbmQ6YX19LHQuY29uc3VtZUFyZ3M9ZnVuY3Rpb24oZSx0KXtpZih0KXtpZih0Lmxlbmd0aCE9PWUrMSl0aHJvdyBuZXcgbigiVGhlIGxlbmd0aCBvZiBkZWxpbWl0ZXJzIGRvZXNuJ3QgbWF0Y2ggdGhlIG51bWJlciBvZiBhcmdzISIpO2Zvcih2YXIgcj10WzBdLGE9MDthPHIubGVuZ3RoO2ErKyl7dmFyIGk9dGhpcy5wb3BUb2tlbigpO2lmKHJbYV0hPT1pLnRleHQpdGhyb3cgbmV3IG4oIlVzZSBvZiB0aGUgbWFjcm8gZG9lc24ndCBtYXRjaCBpdHMgZGVmaW5pdGlvbiIsaSl9fWZvcih2YXIgbz1bXSxzPTA7czxlO3MrKylvLnB1c2godGhpcy5jb25zdW1lQXJnKHQmJnRbcysxXSkudG9rZW5zKTtyZXR1cm4gb30sdC5leHBhbmRPbmNlPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucG9wVG9rZW4oKSxyPXQudGV4dCxhPXQubm9leHBhbmQ/bnVsbDp0aGlzLl9nZXRFeHBhbnNpb24ocik7aWYobnVsbD09YXx8ZSYmYS51bmV4cGFuZGFibGUpe2lmKGUmJm51bGw9PWEmJiJcXCI9PT1yWzBdJiYhdGhpcy5pc0RlZmluZWQocikpdGhyb3cgbmV3IG4oIlVuZGVmaW5lZCBjb250cm9sIHNlcXVlbmNlOiAiK3IpO3JldHVybiB0aGlzLnB1c2hUb2tlbih0KSwhMX1pZih0aGlzLmV4cGFuc2lvbkNvdW50KyssdGhpcy5leHBhbnNpb25Db3VudD50aGlzLnNldHRpbmdzLm1heEV4cGFuZCl0aHJvdyBuZXcgbigiVG9vIG1hbnkgZXhwYW5zaW9uczogaW5maW5pdGUgbG9vcCBvciBuZWVkIHRvIGluY3JlYXNlIG1heEV4cGFuZCBzZXR0aW5nIik7dmFyIGk9YS50b2tlbnMsbz10aGlzLmNvbnN1bWVBcmdzKGEubnVtQXJncyxhLmRlbGltaXRlcnMpO2lmKGEubnVtQXJncylmb3IodmFyIHM9KGk9aS5zbGljZSgpKS5sZW5ndGgtMTtzPj0wOy0tcyl7dmFyIGw9aVtzXTtpZigiIyI9PT1sLnRleHQpe2lmKDA9PT1zKXRocm93IG5ldyBuKCJJbmNvbXBsZXRlIHBsYWNlaG9sZGVyIGF0IGVuZCBvZiBtYWNybyBib2R5IixsKTtpZigiIyI9PT0obD1pWy0tc10pLnRleHQpaS5zcGxpY2UocysxLDEpO2Vsc2V7aWYoIS9eWzEtOV0kLy50ZXN0KGwudGV4dCkpdGhyb3cgbmV3IG4oIk5vdCBhIHZhbGlkIGFyZ3VtZW50IG51bWJlciIsbCk7dmFyIGg7KGg9aSkuc3BsaWNlLmFwcGx5KGgsW3MsMl0uY29uY2F0KG9bK2wudGV4dC0xXSkpfX19cmV0dXJuIHRoaXMucHVzaFRva2VucyhpKSxpLmxlbmd0aH0sdC5leHBhbmRBZnRlckZ1dHVyZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmV4cGFuZE9uY2UoKSx0aGlzLmZ1dHVyZSgpfSx0LmV4cGFuZE5leHRUb2tlbj1mdW5jdGlvbigpe2Zvcig7OylpZighMT09PXRoaXMuZXhwYW5kT25jZSgpKXt2YXIgZT10aGlzLnN0YWNrLnBvcCgpO3JldHVybiBlLnRyZWF0QXNSZWxheCYmKGUudGV4dD0iXFxyZWxheCIpLGV9dGhyb3cgbmV3IEVycm9yfSx0LmV4cGFuZE1hY3JvPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm1hY3Jvcy5oYXMoZSk/dGhpcy5leHBhbmRUb2tlbnMoW25ldyBHcihlKV0pOnZvaWQgMH0sdC5leHBhbmRUb2tlbnM9ZnVuY3Rpb24oZSl7dmFyIHQ9W10scj10aGlzLnN0YWNrLmxlbmd0aDtmb3IodGhpcy5wdXNoVG9rZW5zKGUpO3RoaXMuc3RhY2subGVuZ3RoPnI7KWlmKCExPT09dGhpcy5leHBhbmRPbmNlKCEwKSl7dmFyIG49dGhpcy5zdGFjay5wb3AoKTtuLnRyZWF0QXNSZWxheCYmKG4ubm9leHBhbmQ9ITEsbi50cmVhdEFzUmVsYXg9ITEpLHQucHVzaChuKX1yZXR1cm4gdH0sdC5leHBhbmRNYWNyb0FzVGV4dD1mdW5jdGlvbihlKXt2YXIgdD10aGlzLmV4cGFuZE1hY3JvKGUpO3JldHVybiB0P3QubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS50ZXh0fSkpLmpvaW4oIiIpOnR9LHQuX2dldEV4cGFuc2lvbj1mdW5jdGlvbihlKXt2YXIgdD10aGlzLm1hY3Jvcy5nZXQoZSk7aWYobnVsbD09dClyZXR1cm4gdDtpZigxPT09ZS5sZW5ndGgpe3ZhciByPXRoaXMubGV4ZXIuY2F0Y29kZXNbZV07aWYobnVsbCE9ciYmMTMhPT1yKXJldHVybn12YXIgbj0iZnVuY3Rpb24iPT10eXBlb2YgdD90KHRoaXMpOnQ7aWYoInN0cmluZyI9PXR5cGVvZiBuKXt2YXIgYT0wO2lmKC0xIT09bi5pbmRleE9mKCIjIikpZm9yKHZhciBpPW4ucmVwbGFjZSgvIyMvZywiIik7LTEhPT1pLmluZGV4T2YoIiMiKyhhKzEpKTspKythO2Zvcih2YXIgbz1uZXcgTG4obix0aGlzLnNldHRpbmdzKSxzPVtdLGw9by5sZXgoKTsiRU9GIiE9PWwudGV4dDspcy5wdXNoKGwpLGw9by5sZXgoKTtyZXR1cm4gcy5yZXZlcnNlKCkse3Rva2VuczpzLG51bUFyZ3M6YX19cmV0dXJuIG59LHQuaXNEZWZpbmVkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm1hY3Jvcy5oYXMoZSl8fHFuLmhhc093blByb3BlcnR5KGUpfHxhZS5tYXRoLmhhc093blByb3BlcnR5KGUpfHxhZS50ZXh0Lmhhc093blByb3BlcnR5KGUpfHxXbi5oYXNPd25Qcm9wZXJ0eShlKX0sdC5pc0V4cGFuZGFibGU9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5tYWNyb3MuZ2V0KGUpO3JldHVybiBudWxsIT10PyJzdHJpbmciPT10eXBlb2YgdHx8ImZ1bmN0aW9uIj09dHlwZW9mIHR8fCF0LnVuZXhwYW5kYWJsZTpxbi5oYXNPd25Qcm9wZXJ0eShlKSYmIXFuW2VdLnByaW1pdGl2ZX0sZX0oKSxqbj0vXltcdTIwOGFcdTIwOGJcdTIwOGNcdTIwOGRcdTIwOGVcdTIwODBcdTIwODFcdTIwODJcdTIwODNcdTIwODRcdTIwODVcdTIwODZcdTIwODdcdTIwODhcdTIwODlcdTIwOTBcdTIwOTFcdTIwOTVcdTFkNjJcdTJjN2NcdTIwOTZcdTIwOTdcdTIwOThcdTIwOTlcdTIwOTJcdTIwOWFcdTFkNjNcdTIwOWJcdTIwOWNcdTFkNjRcdTFkNjVcdTIwOTNcdTFkNjZcdTFkNjdcdTFkNjhcdTFkNjlcdTFkNmFdLywkbj1PYmplY3QuZnJlZXplKHsiXHUyMDhhIjoiKyIsIlx1MjA4YiI6Ii0iLCJcdTIwOGMiOiI9IiwiXHUyMDhkIjoiKCIsIlx1MjA4ZSI6IikiLCJcdTIwODAiOiIwIiwiXHUyMDgxIjoiMSIsIlx1MjA4MiI6IjIiLCJcdTIwODMiOiIzIiwiXHUyMDg0IjoiNCIsIlx1MjA4NSI6IjUiLCJcdTIwODYiOiI2IiwiXHUyMDg3IjoiNyIsIlx1MjA4OCI6IjgiLCJcdTIwODkiOiI5IiwiXHUyMDkwIjoiYSIsIlx1MjA5MSI6ImUiLCJcdTIwOTUiOiJoIiwiXHUxZDYyIjoiaSIsIlx1MmM3YyI6ImoiLCJcdTIwOTYiOiJrIiwiXHUyMDk3IjoibCIsIlx1MjA5OCI6Im0iLCJcdTIwOTkiOiJuIiwiXHUyMDkyIjoibyIsIlx1MjA5YSI6InAiLCJcdTFkNjMiOiJyIiwiXHUyMDliIjoicyIsIlx1MjA5YyI6InQiLCJcdTFkNjQiOiJ1IiwiXHUxZDY1IjoidiIsIlx1MjA5MyI6IngiLCJcdTFkNjYiOiJcdTAzYjIiLCJcdTFkNjciOiJcdTAzYjMiLCJcdTFkNjgiOiJcdTAzYzEiLCJcdTFkNjkiOiJcdTAzZDUiLCJcdTFkNmEiOiJcdTAzYzciLCJcdTIwN2EiOiIrIiwiXHUyMDdiIjoiLSIsIlx1MjA3YyI6Ij0iLCJcdTIwN2QiOiIoIiwiXHUyMDdlIjoiKSIsIlx1MjA3MCI6IjAiLCJceGI5IjoiMSIsIlx4YjIiOiIyIiwiXHhiMyI6IjMiLCJcdTIwNzQiOiI0IiwiXHUyMDc1IjoiNSIsIlx1MjA3NiI6IjYiLCJcdTIwNzciOiI3IiwiXHUyMDc4IjoiOCIsIlx1MjA3OSI6IjkiLCJcdTFkMmMiOiJBIiwiXHUxZDJlIjoiQiIsIlx1MWQzMCI6IkQiLCJcdTFkMzEiOiJFIiwiXHUxZDMzIjoiRyIsIlx1MWQzNCI6IkgiLCJcdTFkMzUiOiJJIiwiXHUxZDM2IjoiSiIsIlx1MWQzNyI6IksiLCJcdTFkMzgiOiJMIiwiXHUxZDM5IjoiTSIsIlx1MWQzYSI6Ik4iLCJcdTFkM2MiOiJPIiwiXHUxZDNlIjoiUCIsIlx1MWQzZiI6IlIiLCJcdTFkNDAiOiJUIiwiXHUxZDQxIjoiVSIsIlx1MmM3ZCI6IlYiLCJcdTFkNDIiOiJXIiwiXHUxZDQzIjoiYSIsIlx1MWQ0NyI6ImIiLCJcdTFkOWMiOiJjIiwiXHUxZDQ4IjoiZCIsIlx1MWQ0OSI6ImUiLCJcdTFkYTAiOiJmIiwiXHUxZDRkIjoiZyIsIlx1MDJiMCI6ImgiLCJcdTIwNzEiOiJpIiwiXHUwMmIyIjoiaiIsIlx1MWQ0ZiI6ImsiLCJcdTAyZTEiOiJsIiwiXHUxZDUwIjoibSIsIlx1MjA3ZiI6Im4iLCJcdTFkNTIiOiJvIiwiXHUxZDU2IjoicCIsIlx1MDJiMyI6InIiLCJcdTAyZTIiOiJzIiwiXHUxZDU3IjoidCIsIlx1MWQ1OCI6InUiLCJcdTFkNWIiOiJ2IiwiXHUwMmI3IjoidyIsIlx1MDJlMyI6IngiLCJcdTAyYjgiOiJ5IiwiXHUxZGJiIjoieiIsIlx1MWQ1ZCI6Ilx1MDNiMiIsIlx1MWQ1ZSI6Ilx1MDNiMyIsIlx1MWQ1ZiI6Ilx1MDNiNCIsIlx1MWQ2MCI6Ilx1MDNkNSIsIlx1MWQ2MSI6Ilx1MDNjNyIsIlx1MWRiZiI6Ilx1MDNiOCJ9KSxabj17Ilx1MDMwMSI6e3RleHQ6IlxcJyIsbWF0aDoiXFxhY3V0ZSJ9LCJcdTAzMDAiOnt0ZXh0OiJcXGAiLG1hdGg6IlxcZ3JhdmUifSwiXHUwMzA4Ijp7dGV4dDonXFwiJyxtYXRoOiJcXGRkb3QifSwiXHUwMzAzIjp7dGV4dDoiXFx+IixtYXRoOiJcXHRpbGRlIn0sIlx1MDMwNCI6e3RleHQ6IlxcPSIsbWF0aDoiXFxiYXIifSwiXHUwMzA2Ijp7dGV4dDoiXFx1IixtYXRoOiJcXGJyZXZlIn0sIlx1MDMwYyI6e3RleHQ6IlxcdiIsbWF0aDoiXFxjaGVjayJ9LCJcdTAzMDIiOnt0ZXh0OiJcXF4iLG1hdGg6IlxcaGF0In0sIlx1MDMwNyI6e3RleHQ6IlxcLiIsbWF0aDoiXFxkb3QifSwiXHUwMzBhIjp7dGV4dDoiXFxyIixtYXRoOiJcXG1hdGhyaW5nIn0sIlx1MDMwYiI6e3RleHQ6IlxcSCJ9LCJcdTAzMjciOnt0ZXh0OiJcXGMifX0sS249eyJceGUxIjoiYVx1MDMwMSIsIlx4ZTAiOiJhXHUwMzAwIiwiXHhlNCI6ImFcdTAzMDgiLCJcdTAxZGYiOiJhXHUwMzA4XHUwMzA0IiwiXHhlMyI6ImFcdTAzMDMiLCJcdTAxMDEiOiJhXHUwMzA0IiwiXHUwMTAzIjoiYVx1MDMwNiIsIlx1MWVhZiI6ImFcdTAzMDZcdTAzMDEiLCJcdTFlYjEiOiJhXHUwMzA2XHUwMzAwIiwiXHUxZWI1IjoiYVx1MDMwNlx1MDMwMyIsIlx1MDFjZSI6ImFcdTAzMGMiLCJceGUyIjoiYVx1MDMwMiIsIlx1MWVhNSI6ImFcdTAzMDJcdTAzMDEiLCJcdTFlYTciOiJhXHUwMzAyXHUwMzAwIiwiXHUxZWFiIjoiYVx1MDMwMlx1MDMwMyIsIlx1MDIyNyI6ImFcdTAzMDciLCJcdTAxZTEiOiJhXHUwMzA3XHUwMzA0IiwiXHhlNSI6ImFcdTAzMGEiLCJcdTAxZmIiOiJhXHUwMzBhXHUwMzAxIiwiXHUxZTAzIjoiYlx1MDMwNyIsIlx1MDEwNyI6ImNcdTAzMDEiLCJcdTFlMDkiOiJjXHUwMzI3XHUwMzAxIiwiXHUwMTBkIjoiY1x1MDMwYyIsIlx1MDEwOSI6ImNcdTAzMDIiLCJcdTAxMGIiOiJjXHUwMzA3IiwiXHhlNyI6ImNcdTAzMjciLCJcdTAxMGYiOiJkXHUwMzBjIiwiXHUxZTBiIjoiZFx1MDMwNyIsIlx1MWUxMSI6ImRcdTAzMjciLCJceGU5IjoiZVx1MDMwMSIsIlx4ZTgiOiJlXHUwMzAwIiwiXHhlYiI6ImVcdTAzMDgiLCJcdTFlYmQiOiJlXHUwMzAzIiwiXHUwMTEzIjoiZVx1MDMwNCIsIlx1MWUxNyI6ImVcdTAzMDRcdTAzMDEiLCJcdTFlMTUiOiJlXHUwMzA0XHUwMzAwIiwiXHUwMTE1IjoiZVx1MDMwNiIsIlx1MWUxZCI6ImVcdTAzMjdcdTAzMDYiLCJcdTAxMWIiOiJlXHUwMzBjIiwiXHhlYSI6ImVcdTAzMDIiLCJcdTFlYmYiOiJlXHUwMzAyXHUwMzAxIiwiXHUxZWMxIjoiZVx1MDMwMlx1MDMwMCIsIlx1MWVjNSI6ImVcdTAzMDJcdTAzMDMiLCJcdTAxMTciOiJlXHUwMzA3IiwiXHUwMjI5IjoiZVx1MDMyNyIsIlx1MWUxZiI6ImZcdTAzMDciLCJcdTAxZjUiOiJnXHUwMzAxIiwiXHUxZTIxIjoiZ1x1MDMwNCIsIlx1MDExZiI6ImdcdTAzMDYiLCJcdTAxZTciOiJnXHUwMzBjIiwiXHUwMTFkIjoiZ1x1MDMwMiIsIlx1MDEyMSI6ImdcdTAzMDciLCJcdTAxMjMiOiJnXHUwMzI3IiwiXHUxZTI3IjoiaFx1MDMwOCIsIlx1MDIxZiI6ImhcdTAzMGMiLCJcdTAxMjUiOiJoXHUwMzAyIiwiXHUxZTIzIjoiaFx1MDMwNyIsIlx1MWUyOSI6ImhcdTAzMjciLCJceGVkIjoiaVx1MDMwMSIsIlx4ZWMiOiJpXHUwMzAwIiwiXHhlZiI6ImlcdTAzMDgiLCJcdTFlMmYiOiJpXHUwMzA4XHUwMzAxIiwiXHUwMTI5IjoiaVx1MDMwMyIsIlx1MDEyYiI6ImlcdTAzMDQiLCJcdTAxMmQiOiJpXHUwMzA2IiwiXHUwMWQwIjoiaVx1MDMwYyIsIlx4ZWUiOiJpXHUwMzAyIiwiXHUwMWYwIjoialx1MDMwYyIsIlx1MDEzNSI6ImpcdTAzMDIiLCJcdTFlMzEiOiJrXHUwMzAxIiwiXHUwMWU5Ijoia1x1MDMwYyIsIlx1MDEzNyI6ImtcdTAzMjciLCJcdTAxM2EiOiJsXHUwMzAxIiwiXHUwMTNlIjoibFx1MDMwYyIsIlx1MDEzYyI6ImxcdTAzMjciLCJcdTFlM2YiOiJtXHUwMzAxIiwiXHUxZTQxIjoibVx1MDMwNyIsIlx1MDE0NCI6Im5cdTAzMDEiLCJcdTAxZjkiOiJuXHUwMzAwIiwiXHhmMSI6Im5cdTAzMDMiLCJcdTAxNDgiOiJuXHUwMzBjIiwiXHUxZTQ1Ijoiblx1MDMwNyIsIlx1MDE0NiI6Im5cdTAzMjciLCJceGYzIjoib1x1MDMwMSIsIlx4ZjIiOiJvXHUwMzAwIiwiXHhmNiI6Im9cdTAzMDgiLCJcdTAyMmIiOiJvXHUwMzA4XHUwMzA0IiwiXHhmNSI6Im9cdTAzMDMiLCJcdTFlNGQiOiJvXHUwMzAzXHUwMzAxIiwiXHUxZTRmIjoib1x1MDMwM1x1MDMwOCIsIlx1MDIyZCI6Im9cdTAzMDNcdTAzMDQiLCJcdTAxNGQiOiJvXHUwMzA0IiwiXHUxZTUzIjoib1x1MDMwNFx1MDMwMSIsIlx1MWU1MSI6Im9cdTAzMDRcdTAzMDAiLCJcdTAxNGYiOiJvXHUwMzA2IiwiXHUwMWQyIjoib1x1MDMwYyIsIlx4ZjQiOiJvXHUwMzAyIiwiXHUxZWQxIjoib1x1MDMwMlx1MDMwMSIsIlx1MWVkMyI6Im9cdTAzMDJcdTAzMDAiLCJcdTFlZDciOiJvXHUwMzAyXHUwMzAzIiwiXHUwMjJmIjoib1x1MDMwNyIsIlx1MDIzMSI6Im9cdTAzMDdcdTAzMDQiLCJcdTAxNTEiOiJvXHUwMzBiIiwiXHUxZTU1IjoicFx1MDMwMSIsIlx1MWU1NyI6InBcdTAzMDciLCJcdTAxNTUiOiJyXHUwMzAxIiwiXHUwMTU5Ijoiclx1MDMwYyIsIlx1MWU1OSI6InJcdTAzMDciLCJcdTAxNTciOiJyXHUwMzI3IiwiXHUwMTViIjoic1x1MDMwMSIsIlx1MWU2NSI6InNcdTAzMDFcdTAzMDciLCJcdTAxNjEiOiJzXHUwMzBjIiwiXHUxZTY3Ijoic1x1MDMwY1x1MDMwNyIsIlx1MDE1ZCI6InNcdTAzMDIiLCJcdTFlNjEiOiJzXHUwMzA3IiwiXHUwMTVmIjoic1x1MDMyNyIsIlx1MWU5NyI6InRcdTAzMDgiLCJcdTAxNjUiOiJ0XHUwMzBjIiwiXHUxZTZiIjoidFx1MDMwNyIsIlx1MDE2MyI6InRcdTAzMjciLCJceGZhIjoidVx1MDMwMSIsIlx4ZjkiOiJ1XHUwMzAwIiwiXHhmYyI6InVcdTAzMDgiLCJcdTAxZDgiOiJ1XHUwMzA4XHUwMzAxIiwiXHUwMWRjIjoidVx1MDMwOFx1MDMwMCIsIlx1MDFkNiI6InVcdTAzMDhcdTAzMDQiLCJcdTAxZGEiOiJ1XHUwMzA4XHUwMzBjIiwiXHUwMTY5IjoidVx1MDMwMyIsIlx1MWU3OSI6InVcdTAzMDNcdTAzMDEiLCJcdTAxNmIiOiJ1XHUwMzA0IiwiXHUxZTdiIjoidVx1MDMwNFx1MDMwOCIsIlx1MDE2ZCI6InVcdTAzMDYiLCJcdTAxZDQiOiJ1XHUwMzBjIiwiXHhmYiI6InVcdTAzMDIiLCJcdTAxNmYiOiJ1XHUwMzBhIiwiXHUwMTcxIjoidVx1MDMwYiIsIlx1MWU3ZCI6InZcdTAzMDMiLCJcdTFlODMiOiJ3XHUwMzAxIiwiXHUxZTgxIjoid1x1MDMwMCIsIlx1MWU4NSI6IndcdTAzMDgiLCJcdTAxNzUiOiJ3XHUwMzAyIiwiXHUxZTg3Ijoid1x1MDMwNyIsIlx1MWU5OCI6IndcdTAzMGEiLCJcdTFlOGQiOiJ4XHUwMzA4IiwiXHUxZThiIjoieFx1MDMwNyIsIlx4ZmQiOiJ5XHUwMzAxIiwiXHUxZWYzIjoieVx1MDMwMCIsIlx4ZmYiOiJ5XHUwMzA4IiwiXHUxZWY5IjoieVx1MDMwMyIsIlx1MDIzMyI6InlcdTAzMDQiLCJcdTAxNzciOiJ5XHUwMzAyIiwiXHUxZThmIjoieVx1MDMwNyIsIlx1MWU5OSI6InlcdTAzMGEiLCJcdTAxN2EiOiJ6XHUwMzAxIiwiXHUwMTdlIjoielx1MDMwYyIsIlx1MWU5MSI6InpcdTAzMDIiLCJcdTAxN2MiOiJ6XHUwMzA3IiwiXHhjMSI6IkFcdTAzMDEiLCJceGMwIjoiQVx1MDMwMCIsIlx4YzQiOiJBXHUwMzA4IiwiXHUwMWRlIjoiQVx1MDMwOFx1MDMwNCIsIlx4YzMiOiJBXHUwMzAzIiwiXHUwMTAwIjoiQVx1MDMwNCIsIlx1MDEwMiI6IkFcdTAzMDYiLCJcdTFlYWUiOiJBXHUwMzA2XHUwMzAxIiwiXHUxZWIwIjoiQVx1MDMwNlx1MDMwMCIsIlx1MWViNCI6IkFcdTAzMDZcdTAzMDMiLCJcdTAxY2QiOiJBXHUwMzBjIiwiXHhjMiI6IkFcdTAzMDIiLCJcdTFlYTQiOiJBXHUwMzAyXHUwMzAxIiwiXHUxZWE2IjoiQVx1MDMwMlx1MDMwMCIsIlx1MWVhYSI6IkFcdTAzMDJcdTAzMDMiLCJcdTAyMjYiOiJBXHUwMzA3IiwiXHUwMWUwIjoiQVx1MDMwN1x1MDMwNCIsIlx4YzUiOiJBXHUwMzBhIiwiXHUwMWZhIjoiQVx1MDMwYVx1MDMwMSIsIlx1MWUwMiI6IkJcdTAzMDciLCJcdTAxMDYiOiJDXHUwMzAxIiwiXHUxZTA4IjoiQ1x1MDMyN1x1MDMwMSIsIlx1MDEwYyI6IkNcdTAzMGMiLCJcdTAxMDgiOiJDXHUwMzAyIiwiXHUwMTBhIjoiQ1x1MDMwNyIsIlx4YzciOiJDXHUwMzI3IiwiXHUwMTBlIjoiRFx1MDMwYyIsIlx1MWUwYSI6IkRcdTAzMDciLCJcdTFlMTAiOiJEXHUwMzI3IiwiXHhjOSI6IkVcdTAzMDEiLCJceGM4IjoiRVx1MDMwMCIsIlx4Y2IiOiJFXHUwMzA4IiwiXHUxZWJjIjoiRVx1MDMwMyIsIlx1MDExMiI6IkVcdTAzMDQiLCJcdTFlMTYiOiJFXHUwMzA0XHUwMzAxIiwiXHUxZTE0IjoiRVx1MDMwNFx1MDMwMCIsIlx1MDExNCI6IkVcdTAzMDYiLCJcdTFlMWMiOiJFXHUwMzI3XHUwMzA2IiwiXHUwMTFhIjoiRVx1MDMwYyIsIlx4Y2EiOiJFXHUwMzAyIiwiXHUxZWJlIjoiRVx1MDMwMlx1MDMwMSIsIlx1MWVjMCI6IkVcdTAzMDJcdTAzMDAiLCJcdTFlYzQiOiJFXHUwMzAyXHUwMzAzIiwiXHUwMTE2IjoiRVx1MDMwNyIsIlx1MDIyOCI6IkVcdTAzMjciLCJcdTFlMWUiOiJGXHUwMzA3IiwiXHUwMWY0IjoiR1x1MDMwMSIsIlx1MWUyMCI6IkdcdTAzMDQiLCJcdTAxMWUiOiJHXHUwMzA2IiwiXHUwMWU2IjoiR1x1MDMwYyIsIlx1MDExYyI6IkdcdTAzMDIiLCJcdTAxMjAiOiJHXHUwMzA3IiwiXHUwMTIyIjoiR1x1MDMyNyIsIlx1MWUyNiI6IkhcdTAzMDgiLCJcdTAyMWUiOiJIXHUwMzBjIiwiXHUwMTI0IjoiSFx1MDMwMiIsIlx1MWUyMiI6IkhcdTAzMDciLCJcdTFlMjgiOiJIXHUwMzI3IiwiXHhjZCI6IklcdTAzMDEiLCJceGNjIjoiSVx1MDMwMCIsIlx4Y2YiOiJJXHUwMzA4IiwiXHUxZTJlIjoiSVx1MDMwOFx1MDMwMSIsIlx1MDEyOCI6IklcdTAzMDMiLCJcdTAxMmEiOiJJXHUwMzA0IiwiXHUwMTJjIjoiSVx1MDMwNiIsIlx1MDFjZiI6IklcdTAzMGMiLCJceGNlIjoiSVx1MDMwMiIsIlx1MDEzMCI6IklcdTAzMDciLCJcdTAxMzQiOiJKXHUwMzAyIiwiXHUxZTMwIjoiS1x1MDMwMSIsIlx1MDFlOCI6IktcdTAzMGMiLCJcdTAxMzYiOiJLXHUwMzI3IiwiXHUwMTM5IjoiTFx1MDMwMSIsIlx1MDEzZCI6IkxcdTAzMGMiLCJcdTAxM2IiOiJMXHUwMzI3IiwiXHUxZTNlIjoiTVx1MDMwMSIsIlx1MWU0MCI6Ik1cdTAzMDciLCJcdTAxNDMiOiJOXHUwMzAxIiwiXHUwMWY4IjoiTlx1MDMwMCIsIlx4ZDEiOiJOXHUwMzAzIiwiXHUwMTQ3IjoiTlx1MDMwYyIsIlx1MWU0NCI6Ik5cdTAzMDciLCJcdTAxNDUiOiJOXHUwMzI3IiwiXHhkMyI6Ik9cdTAzMDEiLCJceGQyIjoiT1x1MDMwMCIsIlx4ZDYiOiJPXHUwMzA4IiwiXHUwMjJhIjoiT1x1MDMwOFx1MDMwNCIsIlx4ZDUiOiJPXHUwMzAzIiwiXHUxZTRjIjoiT1x1MDMwM1x1MDMwMSIsIlx1MWU0ZSI6Ik9cdTAzMDNcdTAzMDgiLCJcdTAyMmMiOiJPXHUwMzAzXHUwMzA0IiwiXHUwMTRjIjoiT1x1MDMwNCIsIlx1MWU1MiI6Ik9cdTAzMDRcdTAzMDEiLCJcdTFlNTAiOiJPXHUwMzA0XHUwMzAwIiwiXHUwMTRlIjoiT1x1MDMwNiIsIlx1MDFkMSI6Ik9cdTAzMGMiLCJceGQ0IjoiT1x1MDMwMiIsIlx1MWVkMCI6Ik9cdTAzMDJcdTAzMDEiLCJcdTFlZDIiOiJPXHUwMzAyXHUwMzAwIiwiXHUxZWQ2IjoiT1x1MDMwMlx1MDMwMyIsIlx1MDIyZSI6Ik9cdTAzMDciLCJcdTAyMzAiOiJPXHUwMzA3XHUwMzA0IiwiXHUwMTUwIjoiT1x1MDMwYiIsIlx1MWU1NCI6IlBcdTAzMDEiLCJcdTFlNTYiOiJQXHUwMzA3IiwiXHUwMTU0IjoiUlx1MDMwMSIsIlx1MDE1OCI6IlJcdTAzMGMiLCJcdTFlNTgiOiJSXHUwMzA3IiwiXHUwMTU2IjoiUlx1MDMyNyIsIlx1MDE1YSI6IlNcdTAzMDEiLCJcdTFlNjQiOiJTXHUwMzAxXHUwMzA3IiwiXHUwMTYwIjoiU1x1MDMwYyIsIlx1MWU2NiI6IlNcdTAzMGNcdTAzMDciLCJcdTAxNWMiOiJTXHUwMzAyIiwiXHUxZTYwIjoiU1x1MDMwNyIsIlx1MDE1ZSI6IlNcdTAzMjciLCJcdTAxNjQiOiJUXHUwMzBjIiwiXHUxZTZhIjoiVFx1MDMwNyIsIlx1MDE2MiI6IlRcdTAzMjciLCJceGRhIjoiVVx1MDMwMSIsIlx4ZDkiOiJVXHUwMzAwIiwiXHhkYyI6IlVcdTAzMDgiLCJcdTAxZDciOiJVXHUwMzA4XHUwMzAxIiwiXHUwMWRiIjoiVVx1MDMwOFx1MDMwMCIsIlx1MDFkNSI6IlVcdTAzMDhcdTAzMDQiLCJcdTAxZDkiOiJVXHUwMzA4XHUwMzBjIiwiXHUwMTY4IjoiVVx1MDMwMyIsIlx1MWU3OCI6IlVcdTAzMDNcdTAzMDEiLCJcdTAxNmEiOiJVXHUwMzA0IiwiXHUxZTdhIjoiVVx1MDMwNFx1MDMwOCIsIlx1MDE2YyI6IlVcdTAzMDYiLCJcdTAxZDMiOiJVXHUwMzBjIiwiXHhkYiI6IlVcdTAzMDIiLCJcdTAxNmUiOiJVXHUwMzBhIiwiXHUwMTcwIjoiVVx1MDMwYiIsIlx1MWU3YyI6IlZcdTAzMDMiLCJcdTFlODIiOiJXXHUwMzAxIiwiXHUxZTgwIjoiV1x1MDMwMCIsIlx1MWU4NCI6IldcdTAzMDgiLCJcdTAxNzQiOiJXXHUwMzAyIiwiXHUxZTg2IjoiV1x1MDMwNyIsIlx1MWU4YyI6IlhcdTAzMDgiLCJcdTFlOGEiOiJYXHUwMzA3IiwiXHhkZCI6IllcdTAzMDEiLCJcdTFlZjIiOiJZXHUwMzAwIiwiXHUwMTc4IjoiWVx1MDMwOCIsIlx1MWVmOCI6IllcdTAzMDMiLCJcdTAyMzIiOiJZXHUwMzA0IiwiXHUwMTc2IjoiWVx1MDMwMiIsIlx1MWU4ZSI6IllcdTAzMDciLCJcdTAxNzkiOiJaXHUwMzAxIiwiXHUwMTdkIjoiWlx1MDMwYyIsIlx1MWU5MCI6IlpcdTAzMDIiLCJcdTAxN2IiOiJaXHUwMzA3IiwiXHUwM2FjIjoiXHUwM2IxXHUwMzAxIiwiXHUxZjcwIjoiXHUwM2IxXHUwMzAwIiwiXHUxZmIxIjoiXHUwM2IxXHUwMzA0IiwiXHUxZmIwIjoiXHUwM2IxXHUwMzA2IiwiXHUwM2FkIjoiXHUwM2I1XHUwMzAxIiwiXHUxZjcyIjoiXHUwM2I1XHUwMzAwIiwiXHUwM2FlIjoiXHUwM2I3XHUwMzAxIiwiXHUxZjc0IjoiXHUwM2I3XHUwMzAwIiwiXHUwM2FmIjoiXHUwM2I5XHUwMzAxIiwiXHUxZjc2IjoiXHUwM2I5XHUwMzAwIiwiXHUwM2NhIjoiXHUwM2I5XHUwMzA4IiwiXHUwMzkwIjoiXHUwM2I5XHUwMzA4XHUwMzAxIiwiXHUxZmQyIjoiXHUwM2I5XHUwMzA4XHUwMzAwIiwiXHUxZmQxIjoiXHUwM2I5XHUwMzA0IiwiXHUxZmQwIjoiXHUwM2I5XHUwMzA2IiwiXHUwM2NjIjoiXHUwM2JmXHUwMzAxIiwiXHUxZjc4IjoiXHUwM2JmXHUwMzAwIiwiXHUwM2NkIjoiXHUwM2M1XHUwMzAxIiwiXHUxZjdhIjoiXHUwM2M1XHUwMzAwIiwiXHUwM2NiIjoiXHUwM2M1XHUwMzA4IiwiXHUwM2IwIjoiXHUwM2M1XHUwMzA4XHUwMzAxIiwiXHUxZmUyIjoiXHUwM2M1XHUwMzA4XHUwMzAwIiwiXHUxZmUxIjoiXHUwM2M1XHUwMzA0IiwiXHUxZmUwIjoiXHUwM2M1XHUwMzA2IiwiXHUwM2NlIjoiXHUwM2M5XHUwMzAxIiwiXHUxZjdjIjoiXHUwM2M5XHUwMzAwIiwiXHUwMzhlIjoiXHUwM2E1XHUwMzAxIiwiXHUxZmVhIjoiXHUwM2E1XHUwMzAwIiwiXHUwM2FiIjoiXHUwM2E1XHUwMzA4IiwiXHUxZmU5IjoiXHUwM2E1XHUwMzA0IiwiXHUxZmU4IjoiXHUwM2E1XHUwMzA2IiwiXHUwMzhmIjoiXHUwM2E5XHUwMzAxIiwiXHUxZmZhIjoiXHUwM2E5XHUwMzAwIn0sSm49ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dGhpcy5tb2RlPXZvaWQgMCx0aGlzLmd1bGxldD12b2lkIDAsdGhpcy5zZXR0aW5ncz12b2lkIDAsdGhpcy5sZWZ0cmlnaHREZXB0aD12b2lkIDAsdGhpcy5uZXh0VG9rZW49dm9pZCAwLHRoaXMubW9kZT0ibWF0aCIsdGhpcy5ndWxsZXQ9bmV3IF9uKGUsdCx0aGlzLm1vZGUpLHRoaXMuc2V0dGluZ3M9dCx0aGlzLmxlZnRyaWdodERlcHRoPTB9dmFyIHQ9ZS5wcm90b3R5cGU7cmV0dXJuIHQuZXhwZWN0PWZ1bmN0aW9uKGUsdCl7aWYodm9pZCAwPT09dCYmKHQ9ITApLHRoaXMuZmV0Y2goKS50ZXh0IT09ZSl0aHJvdyBuZXcgbigiRXhwZWN0ZWQgJyIrZSsiJywgZ290ICciK3RoaXMuZmV0Y2goKS50ZXh0KyInIix0aGlzLmZldGNoKCkpO3QmJnRoaXMuY29uc3VtZSgpfSx0LmNvbnN1bWU9ZnVuY3Rpb24oKXt0aGlzLm5leHRUb2tlbj1udWxsfSx0LmZldGNoPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGw9PXRoaXMubmV4dFRva2VuJiYodGhpcy5uZXh0VG9rZW49dGhpcy5ndWxsZXQuZXhwYW5kTmV4dFRva2VuKCkpLHRoaXMubmV4dFRva2VufSx0LnN3aXRjaE1vZGU9ZnVuY3Rpb24oZSl7dGhpcy5tb2RlPWUsdGhpcy5ndWxsZXQuc3dpdGNoTW9kZShlKX0sdC5wYXJzZT1mdW5jdGlvbigpe3RoaXMuc2V0dGluZ3MuZ2xvYmFsR3JvdXB8fHRoaXMuZ3VsbGV0LmJlZ2luR3JvdXAoKSx0aGlzLnNldHRpbmdzLmNvbG9ySXNUZXh0Q29sb3ImJnRoaXMuZ3VsbGV0Lm1hY3Jvcy5zZXQoIlxcY29sb3IiLCJcXHRleHRjb2xvciIpO3RyeXt2YXIgZT10aGlzLnBhcnNlRXhwcmVzc2lvbighMSk7cmV0dXJuIHRoaXMuZXhwZWN0KCJFT0YiKSx0aGlzLnNldHRpbmdzLmdsb2JhbEdyb3VwfHx0aGlzLmd1bGxldC5lbmRHcm91cCgpLGV9ZmluYWxseXt0aGlzLmd1bGxldC5lbmRHcm91cHMoKX19LHQuc3VicGFyc2U9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5uZXh0VG9rZW47dGhpcy5jb25zdW1lKCksdGhpcy5ndWxsZXQucHVzaFRva2VuKG5ldyBHcigifSIpKSx0aGlzLmd1bGxldC5wdXNoVG9rZW5zKGUpO3ZhciByPXRoaXMucGFyc2VFeHByZXNzaW9uKCExKTtyZXR1cm4gdGhpcy5leHBlY3QoIn0iKSx0aGlzLm5leHRUb2tlbj10LHJ9LHQucGFyc2VFeHByZXNzaW9uPWZ1bmN0aW9uKHQscil7Zm9yKHZhciBuPVtdOzspeyJtYXRoIj09PXRoaXMubW9kZSYmdGhpcy5jb25zdW1lU3BhY2VzKCk7dmFyIGE9dGhpcy5mZXRjaCgpO2lmKC0xIT09ZS5lbmRPZkV4cHJlc3Npb24uaW5kZXhPZihhLnRleHQpKWJyZWFrO2lmKHImJmEudGV4dD09PXIpYnJlYWs7aWYodCYmcW5bYS50ZXh0XSYmcW5bYS50ZXh0XS5pbmZpeClicmVhazt2YXIgaT10aGlzLnBhcnNlQXRvbShyKTtpZighaSlicmVhazsiaW50ZXJuYWwiIT09aS50eXBlJiZuLnB1c2goaSl9cmV0dXJuInRleHQiPT09dGhpcy5tb2RlJiZ0aGlzLmZvcm1MaWdhdHVyZXMobiksdGhpcy5oYW5kbGVJbmZpeE5vZGVzKG4pfSx0LmhhbmRsZUluZml4Tm9kZXM9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHI9LTEsYT0wO2E8ZS5sZW5ndGg7YSsrKWlmKCJpbmZpeCI9PT1lW2FdLnR5cGUpe2lmKC0xIT09cil0aHJvdyBuZXcgbigib25seSBvbmUgaW5maXggb3BlcmF0b3IgcGVyIGdyb3VwIixlW2FdLnRva2VuKTtyPWEsdD1lW2FdLnJlcGxhY2VXaXRofWlmKC0xIT09ciYmdCl7dmFyIGksbyxzPWUuc2xpY2UoMCxyKSxsPWUuc2xpY2UocisxKTtyZXR1cm4gaT0xPT09cy5sZW5ndGgmJiJvcmRncm91cCI9PT1zWzBdLnR5cGU/c1swXTp7dHlwZToib3JkZ3JvdXAiLG1vZGU6dGhpcy5tb2RlLGJvZHk6c30sbz0xPT09bC5sZW5ndGgmJiJvcmRncm91cCI9PT1sWzBdLnR5cGU/bFswXTp7dHlwZToib3JkZ3JvdXAiLG1vZGU6dGhpcy5tb2RlLGJvZHk6bH0sWyJcXFxcYWJvdmVmcmFjIj09PXQ/dGhpcy5jYWxsRnVuY3Rpb24odCxbaSxlW3JdLG9dLFtdKTp0aGlzLmNhbGxGdW5jdGlvbih0LFtpLG9dLFtdKV19cmV0dXJuIGV9LHQuaGFuZGxlU3VwU3Vic2NyaXB0PWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuZmV0Y2goKSxyPXQudGV4dDt0aGlzLmNvbnN1bWUoKSx0aGlzLmNvbnN1bWVTcGFjZXMoKTt2YXIgYT10aGlzLnBhcnNlR3JvdXAoZSk7aWYoIWEpdGhyb3cgbmV3IG4oIkV4cGVjdGVkIGdyb3VwIGFmdGVyICciK3IrIiciLHQpO3JldHVybiBhfSx0LmZvcm1hdFVuc3VwcG9ydGVkQ21kPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxyPTA7cjxlLmxlbmd0aDtyKyspdC5wdXNoKHt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iix0ZXh0OmVbcl19KTt2YXIgbj17dHlwZToidGV4dCIsbW9kZTp0aGlzLm1vZGUsYm9keTp0fTtyZXR1cm57dHlwZToiY29sb3IiLG1vZGU6dGhpcy5tb2RlLGNvbG9yOnRoaXMuc2V0dGluZ3MuZXJyb3JDb2xvcixib2R5OltuXX19LHQucGFyc2VBdG9tPWZ1bmN0aW9uKHQpe3ZhciByLGEsaT10aGlzLnBhcnNlR3JvdXAoImF0b20iLHQpO2lmKCJ0ZXh0Ij09PXRoaXMubW9kZSlyZXR1cm4gaTtmb3IoOzspe3RoaXMuY29uc3VtZVNwYWNlcygpO3ZhciBvPXRoaXMuZmV0Y2goKTtpZigiXFxsaW1pdHMiPT09by50ZXh0fHwiXFxub2xpbWl0cyI9PT1vLnRleHQpe2lmKGkmJiJvcCI9PT1pLnR5cGUpe3ZhciBzPSJcXGxpbWl0cyI9PT1vLnRleHQ7aS5saW1pdHM9cyxpLmFsd2F5c0hhbmRsZVN1cFN1Yj0hMH1lbHNle2lmKCFpfHwib3BlcmF0b3JuYW1lIiE9PWkudHlwZSl0aHJvdyBuZXcgbigiTGltaXQgY29udHJvbHMgbXVzdCBmb2xsb3cgYSBtYXRoIG9wZXJhdG9yIixvKTtpLmFsd2F5c0hhbmRsZVN1cFN1YiYmKGkubGltaXRzPSJcXGxpbWl0cyI9PT1vLnRleHQpfXRoaXMuY29uc3VtZSgpfWVsc2UgaWYoIl4iPT09by50ZXh0KXtpZihyKXRocm93IG5ldyBuKCJEb3VibGUgc3VwZXJzY3JpcHQiLG8pO3I9dGhpcy5oYW5kbGVTdXBTdWJzY3JpcHQoInN1cGVyc2NyaXB0Iil9ZWxzZSBpZigiXyI9PT1vLnRleHQpe2lmKGEpdGhyb3cgbmV3IG4oIkRvdWJsZSBzdWJzY3JpcHQiLG8pO2E9dGhpcy5oYW5kbGVTdXBTdWJzY3JpcHQoInN1YnNjcmlwdCIpfWVsc2UgaWYoIiciPT09by50ZXh0KXtpZihyKXRocm93IG5ldyBuKCJEb3VibGUgc3VwZXJzY3JpcHQiLG8pO3ZhciBsPXt0eXBlOiJ0ZXh0b3JkIixtb2RlOnRoaXMubW9kZSx0ZXh0OiJcXHByaW1lIn0saD1bbF07Zm9yKHRoaXMuY29uc3VtZSgpOyInIj09PXRoaXMuZmV0Y2goKS50ZXh0OyloLnB1c2gobCksdGhpcy5jb25zdW1lKCk7Il4iPT09dGhpcy5mZXRjaCgpLnRleHQmJmgucHVzaCh0aGlzLmhhbmRsZVN1cFN1YnNjcmlwdCgic3VwZXJzY3JpcHQiKSkscj17dHlwZToib3JkZ3JvdXAiLG1vZGU6dGhpcy5tb2RlLGJvZHk6aH19ZWxzZXtpZighJG5bby50ZXh0XSlicmVhazt2YXIgYz0kbltvLnRleHRdLG09am4udGVzdChvLnRleHQpO2Zvcih0aGlzLmNvbnN1bWUoKTs7KXt2YXIgdT10aGlzLmZldGNoKCkudGV4dDtpZighJG5bdV0pYnJlYWs7aWYoam4udGVzdCh1KSE9PW0pYnJlYWs7dGhpcy5jb25zdW1lKCksYys9JG5bdV19dmFyIHA9bmV3IGUoYyx0aGlzLnNldHRpbmdzKS5wYXJzZSgpO20/YT17dHlwZToib3JkZ3JvdXAiLG1vZGU6Im1hdGgiLGJvZHk6cH06cj17dHlwZToib3JkZ3JvdXAiLG1vZGU6Im1hdGgiLGJvZHk6cH19fXJldHVybiByfHxhP3t0eXBlOiJzdXBzdWIiLG1vZGU6dGhpcy5tb2RlLGJhc2U6aSxzdXA6cixzdWI6YX06aX0sdC5wYXJzZUZ1bmN0aW9uPWZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcy5mZXRjaCgpLGE9ci50ZXh0LGk9cW5bYV07aWYoIWkpcmV0dXJuIG51bGw7aWYodGhpcy5jb25zdW1lKCksdCYmImF0b20iIT09dCYmIWkuYWxsb3dlZEluQXJndW1lbnQpdGhyb3cgbmV3IG4oIkdvdCBmdW5jdGlvbiAnIithKyInIHdpdGggbm8gYXJndW1lbnRzIisodD8iIGFzICIrdDoiIikscik7aWYoInRleHQiPT09dGhpcy5tb2RlJiYhaS5hbGxvd2VkSW5UZXh0KXRocm93IG5ldyBuKCJDYW4ndCB1c2UgZnVuY3Rpb24gJyIrYSsiJyBpbiB0ZXh0IG1vZGUiLHIpO2lmKCJtYXRoIj09PXRoaXMubW9kZSYmITE9PT1pLmFsbG93ZWRJbk1hdGgpdGhyb3cgbmV3IG4oIkNhbid0IHVzZSBmdW5jdGlvbiAnIithKyInIGluIG1hdGggbW9kZSIscik7dmFyIG89dGhpcy5wYXJzZUFyZ3VtZW50cyhhLGkpLHM9by5hcmdzLGw9by5vcHRBcmdzO3JldHVybiB0aGlzLmNhbGxGdW5jdGlvbihhLHMsbCxyLGUpfSx0LmNhbGxGdW5jdGlvbj1mdW5jdGlvbihlLHQscixhLGkpe3ZhciBvPXtmdW5jTmFtZTplLHBhcnNlcjp0aGlzLHRva2VuOmEsYnJlYWtPblRva2VuVGV4dDppfSxzPXFuW2VdO2lmKHMmJnMuaGFuZGxlcilyZXR1cm4gcy5oYW5kbGVyKG8sdCxyKTt0aHJvdyBuZXcgbigiTm8gZnVuY3Rpb24gaGFuZGxlciBmb3IgIitlKX0sdC5wYXJzZUFyZ3VtZW50cz1mdW5jdGlvbihlLHQpe3ZhciByPXQubnVtQXJncyt0Lm51bU9wdGlvbmFsQXJncztpZigwPT09cilyZXR1cm57YXJnczpbXSxvcHRBcmdzOltdfTtmb3IodmFyIGE9W10saT1bXSxvPTA7bzxyO28rKyl7dmFyIHM9dC5hcmdUeXBlcyYmdC5hcmdUeXBlc1tvXSxsPW88dC5udW1PcHRpb25hbEFyZ3M7KHQucHJpbWl0aXZlJiZudWxsPT1zfHwic3FydCI9PT10LnR5cGUmJjE9PT1vJiZudWxsPT1pWzBdKSYmKHM9InByaW1pdGl2ZSIpO3ZhciBoPXRoaXMucGFyc2VHcm91cE9mVHlwZSgiYXJndW1lbnQgdG8gJyIrZSsiJyIscyxsKTtpZihsKWkucHVzaChoKTtlbHNle2lmKG51bGw9PWgpdGhyb3cgbmV3IG4oIk51bGwgYXJndW1lbnQsIHBsZWFzZSByZXBvcnQgdGhpcyBhcyBhIGJ1ZyIpO2EucHVzaChoKX19cmV0dXJue2FyZ3M6YSxvcHRBcmdzOml9fSx0LnBhcnNlR3JvdXBPZlR5cGU9ZnVuY3Rpb24oZSx0LHIpe3N3aXRjaCh0KXtjYXNlImNvbG9yIjpyZXR1cm4gdGhpcy5wYXJzZUNvbG9yR3JvdXAocik7Y2FzZSJzaXplIjpyZXR1cm4gdGhpcy5wYXJzZVNpemVHcm91cChyKTtjYXNlInVybCI6cmV0dXJuIHRoaXMucGFyc2VVcmxHcm91cChyKTtjYXNlIm1hdGgiOmNhc2UidGV4dCI6cmV0dXJuIHRoaXMucGFyc2VBcmd1bWVudEdyb3VwKHIsdCk7Y2FzZSJoYm94Ijp2YXIgYT10aGlzLnBhcnNlQXJndW1lbnRHcm91cChyLCJ0ZXh0Iik7cmV0dXJuIG51bGwhPWE/e3R5cGU6InN0eWxpbmciLG1vZGU6YS5tb2RlLGJvZHk6W2FdLHN0eWxlOiJ0ZXh0In06bnVsbDtjYXNlInJhdyI6dmFyIGk9dGhpcy5wYXJzZVN0cmluZ0dyb3VwKCJyYXciLHIpO3JldHVybiBudWxsIT1pP3t0eXBlOiJyYXciLG1vZGU6InRleHQiLHN0cmluZzppLnRleHR9Om51bGw7Y2FzZSJwcmltaXRpdmUiOmlmKHIpdGhyb3cgbmV3IG4oIkEgcHJpbWl0aXZlIGFyZ3VtZW50IGNhbm5vdCBiZSBvcHRpb25hbCIpO3ZhciBvPXRoaXMucGFyc2VHcm91cChlKTtpZihudWxsPT1vKXRocm93IG5ldyBuKCJFeHBlY3RlZCBncm91cCBhcyAiK2UsdGhpcy5mZXRjaCgpKTtyZXR1cm4gbztjYXNlIm9yaWdpbmFsIjpjYXNlIG51bGw6Y2FzZSB2b2lkIDA6cmV0dXJuIHRoaXMucGFyc2VBcmd1bWVudEdyb3VwKHIpO2RlZmF1bHQ6dGhyb3cgbmV3IG4oIlVua25vd24gZ3JvdXAgdHlwZSBhcyAiK2UsdGhpcy5mZXRjaCgpKX19LHQuY29uc3VtZVNwYWNlcz1mdW5jdGlvbigpe2Zvcig7IiAiPT09dGhpcy5mZXRjaCgpLnRleHQ7KXRoaXMuY29uc3VtZSgpfSx0LnBhcnNlU3RyaW5nR3JvdXA9ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLmd1bGxldC5zY2FuQXJndW1lbnQodCk7aWYobnVsbD09cilyZXR1cm4gbnVsbDtmb3IodmFyIG4sYT0iIjsiRU9GIiE9PShuPXRoaXMuZmV0Y2goKSkudGV4dDspYSs9bi50ZXh0LHRoaXMuY29uc3VtZSgpO3JldHVybiB0aGlzLmNvbnN1bWUoKSxyLnRleHQ9YSxyfSx0LnBhcnNlUmVnZXhHcm91cD1mdW5jdGlvbihlLHQpe2Zvcih2YXIgcixhPXRoaXMuZmV0Y2goKSxpPWEsbz0iIjsiRU9GIiE9PShyPXRoaXMuZmV0Y2goKSkudGV4dCYmZS50ZXN0KG8rci50ZXh0KTspbys9KGk9cikudGV4dCx0aGlzLmNvbnN1bWUoKTtpZigiIj09PW8pdGhyb3cgbmV3IG4oIkludmFsaWQgIit0KyI6ICciK2EudGV4dCsiJyIsYSk7cmV0dXJuIGEucmFuZ2UoaSxvKX0sdC5wYXJzZUNvbG9yR3JvdXA9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wYXJzZVN0cmluZ0dyb3VwKCJjb2xvciIsZSk7aWYobnVsbD09dClyZXR1cm4gbnVsbDt2YXIgcj0vXigjW2EtZjAtOV17M318Iz9bYS1mMC05XXs2fXxbYS16XSspJC9pLmV4ZWModC50ZXh0KTtpZighcil0aHJvdyBuZXcgbigiSW52YWxpZCBjb2xvcjogJyIrdC50ZXh0KyInIix0KTt2YXIgYT1yWzBdO3JldHVybi9eWzAtOWEtZl17Nn0kL2kudGVzdChhKSYmKGE9IiMiK2EpLHt0eXBlOiJjb2xvci10b2tlbiIsbW9kZTp0aGlzLm1vZGUsY29sb3I6YX19LHQucGFyc2VTaXplR3JvdXA9ZnVuY3Rpb24oZSl7dmFyIHQscj0hMTtpZih0aGlzLmd1bGxldC5jb25zdW1lU3BhY2VzKCksISh0PWV8fCJ7Ij09PXRoaXMuZ3VsbGV0LmZ1dHVyZSgpLnRleHQ/dGhpcy5wYXJzZVN0cmluZ0dyb3VwKCJzaXplIixlKTp0aGlzLnBhcnNlUmVnZXhHcm91cCgvXlstK10/ICooPzokfFxkK3xcZCtcLlxkKnxcLlxkKikgKlthLXpdezAsMn0gKiQvLCJzaXplIikpKXJldHVybiBudWxsO2V8fDAhPT10LnRleHQubGVuZ3RofHwodC50ZXh0PSIwcHQiLHI9ITApO3ZhciBhPS8oWy0rXT8pICooXGQrKD86XC5cZCopP3xcLlxkKykgKihbYS16XXsyfSkvLmV4ZWModC50ZXh0KTtpZighYSl0aHJvdyBuZXcgbigiSW52YWxpZCBzaXplOiAnIit0LnRleHQrIiciLHQpO3ZhciBpPXtudW1iZXI6KyhhWzFdK2FbMl0pLHVuaXQ6YVszXX07aWYoIVYoaSkpdGhyb3cgbmV3IG4oIkludmFsaWQgdW5pdDogJyIraS51bml0KyInIix0KTtyZXR1cm57dHlwZToic2l6ZSIsbW9kZTp0aGlzLm1vZGUsdmFsdWU6aSxpc0JsYW5rOnJ9fSx0LnBhcnNlVXJsR3JvdXA9ZnVuY3Rpb24oZSl7dGhpcy5ndWxsZXQubGV4ZXIuc2V0Q2F0Y29kZSgiJSIsMTMpLHRoaXMuZ3VsbGV0LmxleGVyLnNldENhdGNvZGUoIn4iLDEyKTt2YXIgdD10aGlzLnBhcnNlU3RyaW5nR3JvdXAoInVybCIsZSk7aWYodGhpcy5ndWxsZXQubGV4ZXIuc2V0Q2F0Y29kZSgiJSIsMTQpLHRoaXMuZ3VsbGV0LmxleGVyLnNldENhdGNvZGUoIn4iLDEzKSxudWxsPT10KXJldHVybiBudWxsO3ZhciByPXQudGV4dC5yZXBsYWNlKC9cXChbIyQlJn5fXnt9XSkvZywiJDEiKTtyZXR1cm57dHlwZToidXJsIixtb2RlOnRoaXMubW9kZSx1cmw6cn19LHQucGFyc2VBcmd1bWVudEdyb3VwPWZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcy5ndWxsZXQuc2NhbkFyZ3VtZW50KGUpO2lmKG51bGw9PXIpcmV0dXJuIG51bGw7dmFyIG49dGhpcy5tb2RlO3QmJnRoaXMuc3dpdGNoTW9kZSh0KSx0aGlzLmd1bGxldC5iZWdpbkdyb3VwKCk7dmFyIGE9dGhpcy5wYXJzZUV4cHJlc3Npb24oITEsIkVPRiIpO3RoaXMuZXhwZWN0KCJFT0YiKSx0aGlzLmd1bGxldC5lbmRHcm91cCgpO3ZhciBpPXt0eXBlOiJvcmRncm91cCIsbW9kZTp0aGlzLm1vZGUsbG9jOnIubG9jLGJvZHk6YX07cmV0dXJuIHQmJnRoaXMuc3dpdGNoTW9kZShuKSxpfSx0LnBhcnNlR3JvdXA9ZnVuY3Rpb24oZSx0KXt2YXIgcixhPXRoaXMuZmV0Y2goKSxpPWEudGV4dDtpZigieyI9PT1pfHwiXFxiZWdpbmdyb3VwIj09PWkpe3RoaXMuY29uc3VtZSgpO3ZhciBvPSJ7Ij09PWk/In0iOiJcXGVuZGdyb3VwIjt0aGlzLmd1bGxldC5iZWdpbkdyb3VwKCk7dmFyIHM9dGhpcy5wYXJzZUV4cHJlc3Npb24oITEsbyksbD10aGlzLmZldGNoKCk7dGhpcy5leHBlY3QobyksdGhpcy5ndWxsZXQuZW5kR3JvdXAoKSxyPXt0eXBlOiJvcmRncm91cCIsbW9kZTp0aGlzLm1vZGUsbG9jOkZyLnJhbmdlKGEsbCksYm9keTpzLHNlbWlzaW1wbGU6IlxcYmVnaW5ncm91cCI9PT1pfHx2b2lkIDB9fWVsc2UgaWYobnVsbD09KHI9dGhpcy5wYXJzZUZ1bmN0aW9uKHQsZSl8fHRoaXMucGFyc2VTeW1ib2woKSkmJiJcXCI9PT1pWzBdJiYhV24uaGFzT3duUHJvcGVydHkoaSkpe2lmKHRoaXMuc2V0dGluZ3MudGhyb3dPbkVycm9yKXRocm93IG5ldyBuKCJVbmRlZmluZWQgY29udHJvbCBzZXF1ZW5jZTogIitpLGEpO3I9dGhpcy5mb3JtYXRVbnN1cHBvcnRlZENtZChpKSx0aGlzLmNvbnN1bWUoKX1yZXR1cm4gcn0sdC5mb3JtTGlnYXR1cmVzPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmxlbmd0aC0xLHI9MDtyPHQ7KytyKXt2YXIgbj1lW3JdLGE9bi50ZXh0OyItIj09PWEmJiItIj09PWVbcisxXS50ZXh0JiYocisxPHQmJiItIj09PWVbcisyXS50ZXh0PyhlLnNwbGljZShyLDMse3R5cGU6InRleHRvcmQiLG1vZGU6InRleHQiLGxvYzpGci5yYW5nZShuLGVbcisyXSksdGV4dDoiLS0tIn0pLHQtPTIpOihlLnNwbGljZShyLDIse3R5cGU6InRleHRvcmQiLG1vZGU6InRleHQiLGxvYzpGci5yYW5nZShuLGVbcisxXSksdGV4dDoiLS0ifSksdC09MSkpLCInIiE9PWEmJiJgIiE9PWF8fGVbcisxXS50ZXh0IT09YXx8KGUuc3BsaWNlKHIsMix7dHlwZToidGV4dG9yZCIsbW9kZToidGV4dCIsbG9jOkZyLnJhbmdlKG4sZVtyKzFdKSx0ZXh0OmErYX0pLHQtPTEpfX0sdC5wYXJzZVN5bWJvbD1mdW5jdGlvbigpe3ZhciBlPXRoaXMuZmV0Y2goKSx0PWUudGV4dDtpZigvXlxcdmVyYlteYS16QS1aXS8udGVzdCh0KSl7dGhpcy5jb25zdW1lKCk7dmFyIHI9dC5zbGljZSg1KSxhPSIqIj09PXIuY2hhckF0KDApO2lmKGEmJihyPXIuc2xpY2UoMSkpLHIubGVuZ3RoPDJ8fHIuY2hhckF0KDApIT09ci5zbGljZSgtMSkpdGhyb3cgbmV3IG4oIlxcdmVyYiBhc3NlcnRpb24gZmFpbGVkIC0tXG4gICAgICAgICAgICAgICAgICAgIHBsZWFzZSByZXBvcnQgd2hhdCBpbnB1dCBjYXVzZWQgdGhpcyBidWciKTtyZXR1cm57dHlwZToidmVyYiIsbW9kZToidGV4dCIsYm9keTpyPXIuc2xpY2UoMSwtMSksc3RhcjphfX1Lbi5oYXNPd25Qcm9wZXJ0eSh0WzBdKSYmIWFlW3RoaXMubW9kZV1bdFswXV0mJih0aGlzLnNldHRpbmdzLnN0cmljdCYmIm1hdGgiPT09dGhpcy5tb2RlJiZ0aGlzLnNldHRpbmdzLnJlcG9ydE5vbnN0cmljdCgidW5pY29kZVRleHRJbk1hdGhNb2RlIiwnQWNjZW50ZWQgVW5pY29kZSB0ZXh0IGNoYXJhY3RlciAiJyt0WzBdKyciIHVzZWQgaW4gbWF0aCBtb2RlJyxlKSx0PUtuW3RbMF1dK3Quc2xpY2UoMSkpO3ZhciBpLG89T24uZXhlYyh0KTtpZihvJiYoImkiPT09KHQ9dC5zdWJzdHJpbmcoMCxvLmluZGV4KSk/dD0iXHUwMTMxIjoiaiI9PT10JiYodD0iXHUwMjM3IikpLGFlW3RoaXMubW9kZV1bdF0pe3RoaXMuc2V0dGluZ3Muc3RyaWN0JiYibWF0aCI9PT10aGlzLm1vZGUmJkVlLmluZGV4T2YodCk+PTAmJnRoaXMuc2V0dGluZ3MucmVwb3J0Tm9uc3RyaWN0KCJ1bmljb2RlVGV4dEluTWF0aE1vZGUiLCdMYXRpbi0xL1VuaWNvZGUgdGV4dCBjaGFyYWN0ZXIgIicrdFswXSsnIiB1c2VkIGluIG1hdGggbW9kZScsZSk7dmFyIHMsbD1hZVt0aGlzLm1vZGVdW3RdLmdyb3VwLGg9RnIucmFuZ2UoZSk7aWYodGUuaGFzT3duUHJvcGVydHkobCkpe3ZhciBjPWw7cz17dHlwZToiYXRvbSIsbW9kZTp0aGlzLm1vZGUsZmFtaWx5OmMsbG9jOmgsdGV4dDp0fX1lbHNlIHM9e3R5cGU6bCxtb2RlOnRoaXMubW9kZSxsb2M6aCx0ZXh0OnR9O2k9c31lbHNle2lmKCEodC5jaGFyQ29kZUF0KDApPj0xMjgpKXJldHVybiBudWxsO3RoaXMuc2V0dGluZ3Muc3RyaWN0JiYoUyh0LmNoYXJDb2RlQXQoMCkpPyJtYXRoIj09PXRoaXMubW9kZSYmdGhpcy5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoInVuaWNvZGVUZXh0SW5NYXRoTW9kZSIsJ1VuaWNvZGUgdGV4dCBjaGFyYWN0ZXIgIicrdFswXSsnIiB1c2VkIGluIG1hdGggbW9kZScsZSk6dGhpcy5zZXR0aW5ncy5yZXBvcnROb25zdHJpY3QoInVua25vd25TeW1ib2wiLCdVbnJlY29nbml6ZWQgVW5pY29kZSBjaGFyYWN0ZXIgIicrdFswXSsnIiAoJyt0LmNoYXJDb2RlQXQoMCkrIikiLGUpKSxpPXt0eXBlOiJ0ZXh0b3JkIixtb2RlOiJ0ZXh0Iixsb2M6RnIucmFuZ2UoZSksdGV4dDp0fX1pZih0aGlzLmNvbnN1bWUoKSxvKWZvcih2YXIgbT0wO208b1swXS5sZW5ndGg7bSsrKXt2YXIgdT1vWzBdW21dO2lmKCFablt1XSl0aHJvdyBuZXcgbigiVW5rbm93biBhY2NlbnQgJyAiK3UrIiciLGUpO3ZhciBwPVpuW3VdW3RoaXMubW9kZV18fFpuW3VdLnRleHQ7aWYoIXApdGhyb3cgbmV3IG4oIkFjY2VudCAiK3UrIiB1bnN1cHBvcnRlZCBpbiAiK3RoaXMubW9kZSsiIG1vZGUiLGUpO2k9e3R5cGU6ImFjY2VudCIsbW9kZTp0aGlzLm1vZGUsbG9jOkZyLnJhbmdlKGUpLGxhYmVsOnAsaXNTdHJldGNoeTohMSxpc1NoaWZ0eTohMCxiYXNlOml9fXJldHVybiBpfSxlfSgpO0puLmVuZE9mRXhwcmVzc2lvbj1bIn0iLCJcXGVuZGdyb3VwIiwiXFxlbmQiLCJcXHJpZ2h0IiwiJiJdO3ZhciBRbj1mdW5jdGlvbihlLHQpe2lmKCEoInN0cmluZyI9PXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgU3RyaW5nKSl0aHJvdyBuZXcgVHlwZUVycm9yKCJLYVRlWCBjYW4gb25seSBwYXJzZSBzdHJpbmcgdHlwZWQgZXhwcmVzc2lvbiIpO3ZhciByPW5ldyBKbihlLHQpO2RlbGV0ZSByLmd1bGxldC5tYWNyb3MuY3VycmVudFsiXFxkZkB0YWciXTt2YXIgYT1yLnBhcnNlKCk7aWYoZGVsZXRlIHIuZ3VsbGV0Lm1hY3Jvcy5jdXJyZW50WyJcXGN1cnJlbnRAY29sb3IiXSxkZWxldGUgci5ndWxsZXQubWFjcm9zLmN1cnJlbnRbIlxcY29sb3IiXSxyLmd1bGxldC5tYWNyb3MuZ2V0KCJcXGRmQHRhZyIpKXtpZighdC5kaXNwbGF5TW9kZSl0aHJvdyBuZXcgbigiXFx0YWcgd29ya3Mgb25seSBpbiBkaXNwbGF5IGVxdWF0aW9ucyIpO2E9W3t0eXBlOiJ0YWciLG1vZGU6InRleHQiLGJvZHk6YSx0YWc6ci5zdWJwYXJzZShbbmV3IEdyKCJcXGRmQHRhZyIpXSl9XX1yZXR1cm4gYX0sZWE9ZnVuY3Rpb24oZSx0LHIpe3QudGV4dENvbnRlbnQ9IiI7dmFyIG49cmEoZSxyKS50b05vZGUoKTt0LmFwcGVuZENoaWxkKG4pfTsidW5kZWZpbmVkIiE9dHlwZW9mIGRvY3VtZW50JiYiQ1NTMUNvbXBhdCIhPT1kb2N1bWVudC5jb21wYXRNb2RlJiYoInVuZGVmaW5lZCIhPXR5cGVvZiBjb25zb2xlJiZjb25zb2xlLndhcm4oIldhcm5pbmc6IEthVGVYIGRvZXNuJ3Qgd29yayBpbiBxdWlya3MgbW9kZS4gTWFrZSBzdXJlIHlvdXIgd2Vic2l0ZSBoYXMgYSBzdWl0YWJsZSBkb2N0eXBlLiIpLGVhPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IG4oIkthVGVYIGRvZXNuJ3Qgd29yayBpbiBxdWlya3MgbW9kZS4iKX0pO3ZhciB0YT1mdW5jdGlvbihlLHQscil7aWYoci50aHJvd09uRXJyb3J8fCEoZSBpbnN0YW5jZW9mIG4pKXRocm93IGU7dmFyIGE9S2UubWFrZVNwYW4oWyJrYXRleC1lcnJvciJdLFtuZXcgWih0KV0pO3JldHVybiBhLnNldEF0dHJpYnV0ZSgidGl0bGUiLGUudG9TdHJpbmcoKSksYS5zZXRBdHRyaWJ1dGUoInN0eWxlIiwiY29sb3I6IityLmVycm9yQ29sb3IpLGF9LHJhPWZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IG0odCk7dHJ5e3ZhciBuPVFuKGUscik7cmV0dXJuIEx0KG4sZSxyKX1jYXRjaCh0KXtyZXR1cm4gdGEodCxlLHIpfX0sbmE9e3ZlcnNpb246IjAuMTYuOSIscmVuZGVyOmVhLHJlbmRlclRvU3RyaW5nOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHJhKGUsdCkudG9NYXJrdXAoKX0sUGFyc2VFcnJvcjpuLFNFVFRJTkdTX1NDSEVNQTpoLF9fcGFyc2U6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgbSh0KTtyZXR1cm4gUW4oZSxyKX0sX19yZW5kZXJUb0RvbVRyZWU6cmEsX19yZW5kZXJUb0hUTUxUcmVlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IG0odCk7dHJ5e3JldHVybiBmdW5jdGlvbihlLHQscil7dmFyIG49U3QoZSxPdChyKSksYT1LZS5tYWtlU3BhbihbImthdGV4Il0sW25dKTtyZXR1cm4gRXQoYSxyKX0oUW4oZSxyKSwwLHIpfWNhdGNoKHQpe3JldHVybiB0YSh0LGUscil9fSxfX3NldEZvbnRNZXRyaWNzOmZ1bmN0aW9uKGUsdCl7VFtlXT10fSxfX2RlZmluZVN5bWJvbDppZSxfX2RlZmluZUZ1bmN0aW9uOm90LF9fZGVmaW5lTWFjcm86UHIsX19kb21UcmVlOntTcGFuOlcsQW5jaG9yOl8sU3ltYm9sTm9kZTpaLFN2Z05vZGU6SyxQYXRoTm9kZTpKLExpbmVOb2RlOlF9fTtyZXR1cm4gdD10LmRlZmF1bHR9KCl9KSk7";
var KATEX_CSS_BASE64 = "LmthdGV4e3RleHQtcmVuZGVyaW5nOmF1dG87Zm9udDpub3JtYWwgMS4yMWVtIEthVGVYX01haW4sVGltZXMgTmV3IFJvbWFuLHNlcmlmO2xpbmUtaGVpZ2h0OjEuMjt0ZXh0LWluZGVudDowfS5rYXRleCAqey1tcy1oaWdoLWNvbnRyYXN0LWFkanVzdDpub25lIWltcG9ydGFudDtib3JkZXItY29sb3I6Y3VycmVudENvbG9yfS5rYXRleCAua2F0ZXgtdmVyc2lvbjphZnRlcntjb250ZW50OiIwLjE2LjkifS5rYXRleCAua2F0ZXgtbWF0aG1se2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpO2JvcmRlcjowO2hlaWdodDoxcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9LmthdGV4IC5rYXRleC1odG1sPi5uZXdsaW5le2Rpc3BsYXk6YmxvY2t9LmthdGV4IC5iYXNle3Bvc2l0aW9uOnJlbGF0aXZlO3doaXRlLXNwYWNlOm5vd3JhcDt3aWR0aDotd2Via2l0LW1pbi1jb250ZW50O3dpZHRoOi1tb3otbWluLWNvbnRlbnQ7d2lkdGg6bWluLWNvbnRlbnR9LmthdGV4IC5iYXNlLC5rYXRleCAuc3RydXR7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmthdGV4IC50ZXh0YmZ7Zm9udC13ZWlnaHQ6NzAwfS5rYXRleCAudGV4dGl0e2ZvbnQtc3R5bGU6aXRhbGljfS5rYXRleCAudGV4dHJte2ZvbnQtZmFtaWx5OkthVGVYX01haW59LmthdGV4IC50ZXh0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmfS5rYXRleCAudGV4dHR0e2ZvbnQtZmFtaWx5OkthVGVYX1R5cGV3cml0ZXJ9LmthdGV4IC5tYXRobm9ybWFse2ZvbnQtZmFtaWx5OkthVGVYX01hdGg7Zm9udC1zdHlsZTppdGFsaWN9LmthdGV4IC5tYXRoaXR7Zm9udC1mYW1pbHk6S2FUZVhfTWFpbjtmb250LXN0eWxlOml0YWxpY30ua2F0ZXggLm1hdGhybXtmb250LXN0eWxlOm5vcm1hbH0ua2F0ZXggLm1hdGhiZntmb250LWZhbWlseTpLYVRlWF9NYWluO2ZvbnQtd2VpZ2h0OjcwMH0ua2F0ZXggLmJvbGRzeW1ib2x7Zm9udC1mYW1pbHk6S2FUZVhfTWF0aDtmb250LXN0eWxlOml0YWxpYztmb250LXdlaWdodDo3MDB9LmthdGV4IC5hbXNybSwua2F0ZXggLm1hdGhiYiwua2F0ZXggLnRleHRiYntmb250LWZhbWlseTpLYVRlWF9BTVN9LmthdGV4IC5tYXRoY2Fse2ZvbnQtZmFtaWx5OkthVGVYX0NhbGlncmFwaGljfS5rYXRleCAubWF0aGZyYWssLmthdGV4IC50ZXh0ZnJha3tmb250LWZhbWlseTpLYVRlWF9GcmFrdHVyfS5rYXRleCAubWF0aGJvbGRmcmFrLC5rYXRleCAudGV4dGJvbGRmcmFre2ZvbnQtZmFtaWx5OkthVGVYX0ZyYWt0dXI7Zm9udC13ZWlnaHQ6NzAwfS5rYXRleCAubWF0aHR0e2ZvbnQtZmFtaWx5OkthVGVYX1R5cGV3cml0ZXJ9LmthdGV4IC5tYXRoc2NyLC5rYXRleCAudGV4dHNjcntmb250LWZhbWlseTpLYVRlWF9TY3JpcHR9LmthdGV4IC5tYXRoc2YsLmthdGV4IC50ZXh0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmfS5rYXRleCAubWF0aGJvbGRzZiwua2F0ZXggLnRleHRib2xkc2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmO2ZvbnQtd2VpZ2h0OjcwMH0ua2F0ZXggLm1hdGhpdHNmLC5rYXRleCAudGV4dGl0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmO2ZvbnQtc3R5bGU6aXRhbGljfS5rYXRleCAubWFpbnJte2ZvbnQtZmFtaWx5OkthVGVYX01haW47Zm9udC1zdHlsZTpub3JtYWx9LmthdGV4IC52bGlzdC10e2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtkaXNwbGF5OmlubGluZS10YWJsZTt0YWJsZS1sYXlvdXQ6Zml4ZWR9LmthdGV4IC52bGlzdC1ye2Rpc3BsYXk6dGFibGUtcm93fS5rYXRleCAudmxpc3R7ZGlzcGxheTp0YWJsZS1jZWxsO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ua2F0ZXggLnZsaXN0PnNwYW57ZGlzcGxheTpibG9jaztoZWlnaHQ6MDtwb3NpdGlvbjpyZWxhdGl2ZX0ua2F0ZXggLnZsaXN0PnNwYW4+c3BhbntkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLnZsaXN0PnNwYW4+LnBzdHJ1dHtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MH0ua2F0ZXggLnZsaXN0LXQye21hcmdpbi1yaWdodDotMnB4fS5rYXRleCAudmxpc3Qtc3tkaXNwbGF5OnRhYmxlLWNlbGw7Zm9udC1zaXplOjFweDttaW4td2lkdGg6MnB4O3ZlcnRpY2FsLWFsaWduOmJvdHRvbTt3aWR0aDoycHh9LmthdGV4IC52Ym94e2FsaWduLWl0ZW1zOmJhc2VsaW5lO2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5rYXRleCAuaGJveHt3aWR0aDoxMDAlfS5rYXRleCAuaGJveCwua2F0ZXggLnRoaW5ib3h7ZGlzcGxheTppbmxpbmUtZmxleDtmbGV4LWRpcmVjdGlvbjpyb3d9LmthdGV4IC50aGluYm94e21heC13aWR0aDowO3dpZHRoOjB9LmthdGV4IC5tc3Vwc3Vie3RleHQtYWxpZ246bGVmdH0ua2F0ZXggLm1mcmFjPnNwYW4+c3Bhbnt0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXggLm1mcmFjIC5mcmFjLWxpbmV7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlfS5rYXRleCAuaGRhc2hsaW5lLC5rYXRleCAuaGxpbmUsLmthdGV4IC5tZnJhYyAuZnJhYy1saW5lLC5rYXRleCAub3ZlcmxpbmUgLm92ZXJsaW5lLWxpbmUsLmthdGV4IC5ydWxlLC5rYXRleCAudW5kZXJsaW5lIC51bmRlcmxpbmUtbGluZXttaW4taGVpZ2h0OjFweH0ua2F0ZXggLm1zcGFjZXtkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLmNsYXAsLmthdGV4IC5sbGFwLC5rYXRleCAucmxhcHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDowfS5rYXRleCAuY2xhcD4uaW5uZXIsLmthdGV4IC5sbGFwPi5pbm5lciwua2F0ZXggLnJsYXA+LmlubmVye3Bvc2l0aW9uOmFic29sdXRlfS5rYXRleCAuY2xhcD4uZml4LC5rYXRleCAubGxhcD4uZml4LC5rYXRleCAucmxhcD4uZml4e2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5rYXRleCAubGxhcD4uaW5uZXJ7cmlnaHQ6MH0ua2F0ZXggLmNsYXA+LmlubmVyLC5rYXRleCAucmxhcD4uaW5uZXJ7bGVmdDowfS5rYXRleCAuY2xhcD4uaW5uZXI+c3BhbnttYXJnaW4tbGVmdDotNTAlO21hcmdpbi1yaWdodDo1MCV9LmthdGV4IC5ydWxle2JvcmRlcjowIHNvbGlkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5rYXRleCAuaGxpbmUsLmthdGV4IC5vdmVybGluZSAub3ZlcmxpbmUtbGluZSwua2F0ZXggLnVuZGVybGluZSAudW5kZXJsaW5lLWxpbmV7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlfS5rYXRleCAuaGRhc2hsaW5le2JvcmRlci1ib3R0b20tc3R5bGU6ZGFzaGVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCV9LmthdGV4IC5zcXJ0Pi5yb290e21hcmdpbi1sZWZ0Oi4yNzc3Nzc3OGVtO21hcmdpbi1yaWdodDotLjU1NTU1NTU2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxe2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUye2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTMsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTN7Zm9udC1zaXplOjEuNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplNHtmb250LXNpemU6MS42ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemU1e2ZvbnQtc2l6ZToxLjhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTZ7Zm9udC1zaXplOjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTd7Zm9udC1zaXplOjIuNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplOHtmb250LXNpemU6Mi44OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplOXtmb250LXNpemU6My40NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxMHtmb250LXNpemU6NC4xNDhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTExLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxMXtmb250LXNpemU6NC45NzZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTF7Zm9udC1zaXplOi44MzMzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplMntmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplM3tmb250LXNpemU6MS4xNjY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplNHtmb250LXNpemU6MS4zMzMzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplNXtmb250LXNpemU6MS41ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU2LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU2e2ZvbnQtc2l6ZToxLjY2NjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU3LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU3e2ZvbnQtc2l6ZToyZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU4e2ZvbnQtc2l6ZToyLjRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTksLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTl7Zm9udC1zaXplOjIuODhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemUxMHtmb250LXNpemU6My40NTY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTExe2ZvbnQtc2l6ZTo0LjE0NjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUzLnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUzLnNpemUxe2ZvbnQtc2l6ZTouNzE0Mjg1NzFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTMuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTMuc2l6ZTJ7Zm9udC1zaXplOi44NTcxNDI4NmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplM3tmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNHtmb250LXNpemU6MS4xNDI4NTcxNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNXtmb250LXNpemU6MS4yODU3MTQyOWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNntmb250LXNpemU6MS40Mjg1NzE0M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplN3tmb250LXNpemU6MS43MTQyODU3MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplOHtmb250LXNpemU6Mi4wNTcxNDI4NmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplOXtmb250LXNpemU6Mi40Njg1NzE0M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTMuc2l6ZTEwe2ZvbnQtc2l6ZToyLjk2Mjg1NzE0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUzLnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplMTF7Zm9udC1zaXplOjMuNTU0Mjg1NzFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTF7Zm9udC1zaXplOi42MjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTJ7Zm9udC1zaXplOi43NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplM3tmb250LXNpemU6Ljg3NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplNHtmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplNXtmb250LXNpemU6MS4xMjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTZ7Zm9udC1zaXplOjEuMjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTd7Zm9udC1zaXplOjEuNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplOHtmb250LXNpemU6MS44ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU0LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU0LnNpemU5e2ZvbnQtc2l6ZToyLjE2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU0LnNpemUxMCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplMTB7Zm9udC1zaXplOjIuNTkyNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTExe2ZvbnQtc2l6ZTozLjExZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU1LnNpemUxe2ZvbnQtc2l6ZTouNTU1NTU1NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTJ7Zm9udC1zaXplOi42NjY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplM3tmb250LXNpemU6Ljc3Nzc3Nzc4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU1LnNpemU0e2ZvbnQtc2l6ZTouODg4ODg4ODllbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTV7Zm9udC1zaXplOjFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTZ7Zm9udC1zaXplOjEuMTExMTExMTFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTd7Zm9udC1zaXplOjEuMzMzMzMzMzNlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTgsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTh7Zm9udC1zaXplOjEuNmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplOXtmb250LXNpemU6MS45MmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTEwe2ZvbnQtc2l6ZToyLjMwNDQ0NDQ0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplMTF7Zm9udC1zaXplOjIuNzY0NDQ0NDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTYuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTF7Zm9udC1zaXplOi41ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemUye2ZvbnQtc2l6ZTouNmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplM3tmb250LXNpemU6LjdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTYuc2l6ZTQsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTR7Zm9udC1zaXplOi44ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU1e2ZvbnQtc2l6ZTouOWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplNntmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplN3tmb250LXNpemU6MS4yZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU4e2ZvbnQtc2l6ZToxLjQ0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU5e2ZvbnQtc2l6ZToxLjcyOGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTEwe2ZvbnQtc2l6ZToyLjA3NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTExe2ZvbnQtc2l6ZToyLjQ4OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplMXtmb250LXNpemU6LjQxNjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemUye2ZvbnQtc2l6ZTouNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplM3tmb250LXNpemU6LjU4MzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU0e2ZvbnQtc2l6ZTouNjY2NjY2NjdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTV7Zm9udC1zaXplOi43NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplNntmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU3LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU3e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU4e2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTksLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTl7Zm9udC1zaXplOjEuNDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemUxMHtmb250LXNpemU6MS43MjgzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTExe2ZvbnQtc2l6ZToyLjA3MzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemUxe2ZvbnQtc2l6ZTouMzQ3MjIyMjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTJ7Zm9udC1zaXplOi40MTY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOC5zaXplM3tmb250LXNpemU6LjQ4NjExMTExZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU0e2ZvbnQtc2l6ZTouNTU1NTU1NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTV7Zm9udC1zaXplOi42MjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTZ7Zm9udC1zaXplOi42OTQ0NDQ0NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOC5zaXplN3tmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU4e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU5e2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemUxMHtmb250LXNpemU6MS40NDAyNzc3OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTExe2ZvbnQtc2l6ZToxLjcyNzc3Nzc4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemUxe2ZvbnQtc2l6ZTouMjg5MzUxODVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTJ7Zm9udC1zaXplOi4zNDcyMjIyMmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplM3tmb250LXNpemU6LjQwNTA5MjU5ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemU0e2ZvbnQtc2l6ZTouNDYyOTYyOTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTV7Zm9udC1zaXplOi41MjA4MzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplNntmb250LXNpemU6LjU3ODcwMzdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTd7Zm9udC1zaXplOi42OTQ0NDQ0NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplOHtmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemU5e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemUxMCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplMTB7Zm9udC1zaXplOjEuMjAwMjMxNDhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTExLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemUxMXtmb250LXNpemU6MS40Mzk4MTQ4MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemUxe2ZvbnQtc2l6ZTouMjQxMDgwMDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplMntmb250LXNpemU6LjI4OTI5NjA1ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTN7Zm9udC1zaXplOi4zMzc1MTIwNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTQsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemU0e2ZvbnQtc2l6ZTouMzg1NzI4MDZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplNXtmb250LXNpemU6LjQzMzk0NDA3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTZ7Zm9udC1zaXplOi40ODIxNjAwOGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemU3e2ZvbnQtc2l6ZTouNTc4NTkyMDllbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplOHtmb250LXNpemU6LjY5NDMxMDUxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTl7Zm9udC1zaXplOi44MzMxNzI2MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplMTB7Zm9udC1zaXplOjFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTExe2ZvbnQtc2l6ZToxLjE5OTYxNDI3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTF7Zm9udC1zaXplOi4yMDA5NjQ2M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUye2ZvbnQtc2l6ZTouMjQxMTU3NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemUzLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplM3tmb250LXNpemU6LjI4MTM1MDQ4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTR7Zm9udC1zaXplOi4zMjE1NDM0MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemU1e2ZvbnQtc2l6ZTouMzYxNzM2MzNlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemU2LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplNntmb250LXNpemU6LjQwMTkyOTI2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTd7Zm9udC1zaXplOi40ODIzMTUxMWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTgsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemU4e2ZvbnQtc2l6ZTouNTc4Nzc4MTRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplOXtmb250LXNpemU6LjY5NDUzMzc2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUxMHtmb250LXNpemU6LjgzMzYwMTI5ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUxMXtmb250LXNpemU6MWVtfS5rYXRleCAuZGVsaW1zaXppbmcuc2l6ZTF7Zm9udC1mYW1pbHk6S2FUZVhfU2l6ZTF9LmthdGV4IC5kZWxpbXNpemluZy5zaXplMntmb250LWZhbWlseTpLYVRlWF9TaXplMn0ua2F0ZXggLmRlbGltc2l6aW5nLnNpemUze2ZvbnQtZmFtaWx5OkthVGVYX1NpemUzfS5rYXRleCAuZGVsaW1zaXppbmcuc2l6ZTR7Zm9udC1mYW1pbHk6S2FUZVhfU2l6ZTR9LmthdGV4IC5kZWxpbXNpemluZy5tdWx0IC5kZWxpbS1zaXplMT5zcGFue2ZvbnQtZmFtaWx5OkthVGVYX1NpemUxfS5rYXRleCAuZGVsaW1zaXppbmcubXVsdCAuZGVsaW0tc2l6ZTQ+c3Bhbntmb250LWZhbWlseTpLYVRlWF9TaXplNH0ua2F0ZXggLm51bGxkZWxpbWl0ZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6LjEyZW19LmthdGV4IC5kZWxpbWNlbnRlciwua2F0ZXggLm9wLXN5bWJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0ua2F0ZXggLm9wLXN5bWJvbC5zbWFsbC1vcHtmb250LWZhbWlseTpLYVRlWF9TaXplMX0ua2F0ZXggLm9wLXN5bWJvbC5sYXJnZS1vcHtmb250LWZhbWlseTpLYVRlWF9TaXplMn0ua2F0ZXggLmFjY2VudD4udmxpc3QtdCwua2F0ZXggLm9wLWxpbWl0cz4udmxpc3QtdHt0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXggLmFjY2VudCAuYWNjZW50LWJvZHl7cG9zaXRpb246cmVsYXRpdmV9LmthdGV4IC5hY2NlbnQgLmFjY2VudC1ib2R5Om5vdCguYWNjZW50LWZ1bGwpe3dpZHRoOjB9LmthdGV4IC5vdmVybGF5e2Rpc3BsYXk6YmxvY2t9LmthdGV4IC5tdGFibGUgLnZlcnRpY2FsLXNlcGFyYXRvcntkaXNwbGF5OmlubGluZS1ibG9jazttaW4td2lkdGg6MXB4fS5rYXRleCAubXRhYmxlIC5hcnJheWNvbHNlcHtkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLm10YWJsZSAuY29sLWFsaWduLWM+LnZsaXN0LXR7dGV4dC1hbGlnbjpjZW50ZXJ9LmthdGV4IC5tdGFibGUgLmNvbC1hbGlnbi1sPi52bGlzdC10e3RleHQtYWxpZ246bGVmdH0ua2F0ZXggLm10YWJsZSAuY29sLWFsaWduLXI+LnZsaXN0LXR7dGV4dC1hbGlnbjpyaWdodH0ua2F0ZXggLnN2Zy1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmthdGV4IHN2Z3tmaWxsOmN1cnJlbnRDb2xvcjtzdHJva2U6Y3VycmVudENvbG9yO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtkaXNwbGF5OmJsb2NrO2hlaWdodDppbmhlcml0O3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCV9LmthdGV4IHN2ZyBwYXRoe3N0cm9rZTpub25lfS5rYXRleCBpbWd7Ym9yZGVyLXN0eWxlOm5vbmU7bWF4LWhlaWdodDpub25lO21heC13aWR0aDpub25lO21pbi1oZWlnaHQ6MDttaW4td2lkdGg6MH0ua2F0ZXggLnN0cmV0Y2h5e2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmthdGV4IC5zdHJldGNoeTphZnRlciwua2F0ZXggLnN0cmV0Y2h5OmJlZm9yZXtjb250ZW50OiIifS5rYXRleCAuaGlkZS10YWlse292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5rYXRleCAuaGFsZmFycm93LWxlZnR7bGVmdDowO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDo1MC4yJX0ua2F0ZXggLmhhbGZhcnJvdy1yaWdodHtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt3aWR0aDo1MC4yJX0ua2F0ZXggLmJyYWNlLWxlZnR7bGVmdDowO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoyNS4xJX0ua2F0ZXggLmJyYWNlLWNlbnRlcntsZWZ0OjI1JTtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NTAlfS5rYXRleCAuYnJhY2UtcmlnaHR7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7d2lkdGg6MjUuMSV9LmthdGV4IC54LWFycm93LXBhZHtwYWRkaW5nOjAgLjVlbX0ua2F0ZXggLmNkLWFycm93LXBhZHtwYWRkaW5nOjAgLjU1NTU2ZW0gMCAuMjc3NzhlbX0ua2F0ZXggLm1vdmVyLC5rYXRleCAubXVuZGVyLC5rYXRleCAueC1hcnJvd3t0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXggLmJveHBhZHtwYWRkaW5nOjAgLjNlbX0ua2F0ZXggLmZib3gsLmthdGV4IC5mY29sb3Jib3h7Ym9yZGVyOi4wNGVtIHNvbGlkO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ua2F0ZXggLmNhbmNlbC1wYWR7cGFkZGluZzowIC4yZW19LmthdGV4IC5jYW5jZWwtbGFwe21hcmdpbi1sZWZ0Oi0uMmVtO21hcmdpbi1yaWdodDotLjJlbX0ua2F0ZXggLnNvdXR7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtib3JkZXItYm90dG9tLXdpZHRoOi4wOGVtfS5rYXRleCAuYW5nbHtib3JkZXItcmlnaHQ6LjA0OWVtIHNvbGlkO2JvcmRlci10b3A6LjA0OWVtIHNvbGlkO2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW4tcmlnaHQ6LjAzODg5ZW19LmthdGV4IC5hbmdscGFke3BhZGRpbmc6MCAuMDM4ODllbX0ua2F0ZXggLmVxbi1udW06YmVmb3Jle2NvbnRlbnQ6IigiIGNvdW50ZXIoa2F0ZXhFcW5ObykgIikiO2NvdW50ZXItaW5jcmVtZW50OmthdGV4RXFuTm99LmthdGV4IC5tbWwtZXFuLW51bTpiZWZvcmV7Y29udGVudDoiKCIgY291bnRlcihtbWxFcW5ObykgIikiO2NvdW50ZXItaW5jcmVtZW50Om1tbEVxbk5vfS5rYXRleCAubXRyLWdsdWV7d2lkdGg6NTAlfS5rYXRleCAuY2QtdmVydC1hcnJvd3tkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ua2F0ZXggLmNkLWxhYmVsLWxlZnR7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6Y2FsYyg1MCUgKyAuM2VtKTt0ZXh0LWFsaWduOmxlZnR9LmthdGV4IC5jZC1sYWJlbC1yaWdodHtkaXNwbGF5OmlubGluZS1ibG9jaztsZWZ0OmNhbGMoNTAlICsgLjNlbSk7cG9zaXRpb246YWJzb2x1dGU7dGV4dC1hbGlnbjpyaWdodH0ua2F0ZXgtZGlzcGxheXtkaXNwbGF5OmJsb2NrO21hcmdpbjoxZW0gMDt0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXgtZGlzcGxheT4ua2F0ZXh7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXB9LmthdGV4LWRpc3BsYXk+LmthdGV4Pi5rYXRleC1odG1se2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LmthdGV4LWRpc3BsYXk+LmthdGV4Pi5rYXRleC1odG1sPi50YWd7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0ua2F0ZXgtZGlzcGxheS5sZXFubz4ua2F0ZXg+LmthdGV4LWh0bWw+LnRhZ3tsZWZ0OjA7cmlnaHQ6YXV0b30ua2F0ZXgtZGlzcGxheS5mbGVxbj4ua2F0ZXh7cGFkZGluZy1sZWZ0OjJlbTt0ZXh0LWFsaWduOmxlZnR9Ym9keXtjb3VudGVyLXJlc2V0OmthdGV4RXFuTm8gbW1sRXFuTm99Cg==";

// katex-render.ts
function buildKatexCss() {
  return `<style>${atob(KATEX_CSS_BASE64)}</style>`;
}
function buildKatexScript() {
  return `
<script>${atob(KATEX_JS_BASE64)}<\/script>
<script>
window.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.math-display').forEach(function(el) {
		try {
			const latex = el.textContent.trim();
			el.innerHTML = '';
			katex.render(latex, el, {
				displayMode: true,
				throwOnError: false,
				output: 'html'
			});
		} catch (e) {
			// \u5FFD\u7565\u9519\u8BEF
		}
	});

	document.querySelectorAll('.math-inline').forEach(function(el) {
		try {
			const latex = el.textContent.trim();
			el.innerHTML = '';
			katex.render(latex, el, {
				displayMode: false,
				throwOnError: false,
				output: 'html'
			});
		} catch (e) {
			// \u5FFD\u7565\u9519\u8BEF
		}
	});
});
<\/script>`;
}

// markdown-utils.ts
var CODE_PATTERN = /^[ \t]*(`{3,}|~{3,})[^\r\n]*\r?\n[\s\S]*?(?:^[ \t]*\1[ \t]*\r?$)|(`+)(?![ \r\n])[^\r\n]*?\2/gm;
function splitByCode(markdown) {
  const segments = [];
  const pattern = new RegExp(CODE_PATTERN.source, CODE_PATTERN.flags);
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    if (match.index === pattern.lastIndex) {
      pattern.lastIndex++;
      continue;
    }
    if (match.index > lastIndex) {
      segments.push({ code: false, text: markdown.slice(lastIndex, match.index) });
    }
    segments.push({ code: true, text: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markdown.length) {
    segments.push({ code: false, text: markdown.slice(lastIndex) });
  }
  return segments;
}
function stripCode(markdown) {
  return splitByCode(markdown).filter((segment) => !segment.code).map((segment) => segment.text).join("");
}
function applyMathPlaceholders(text, placeholders) {
  let result = text;
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
    const placeholder = `MATH_BLOCK_PLACEHOLDER_${placeholders.length}_END`;
    placeholders.push(`$$${latex}$$`);
    return placeholder;
  });
  result = result.replace(/\$([^$\n]+?)\$/g, (match, latex) => {
    const placeholder = `MATH_INLINE_PLACEHOLDER_${placeholders.length}_END`;
    placeholders.push(`$${latex}$`);
    return placeholder;
  });
  result = result.replace(/\\\(([^)]+?)\\\)/g, (match, latex) => {
    const placeholder = `MATH_INLINE_PLACEHOLDER_${placeholders.length}_END`;
    placeholders.push(`\\(${latex}\\)`);
    return placeholder;
  });
  result = result.replace(/\\\[([\s\S]+?)\\\]/g, (match, latex) => {
    const placeholder = `MATH_BLOCK_PLACEHOLDER_${placeholders.length}_END`;
    placeholders.push(`\\[${latex}\\]`);
    return placeholder;
  });
  return result;
}

// main.ts
var GITHUB_CSS = `
:root {
	--text-primary: #1a1a2e;
	--text-secondary: #4a4a6a;
	--text-muted: #8888a8;
	--bg-primary: #ffffff;
	--bg-secondary: #f8f9fc;
	--bg-tertiary: #f0f2f8;
	--border-light: #e8eaf0;
	--border-medium: #d0d3dc;
	--accent: #2563eb;
	--accent-light: #3b82f6;
	--accent-subtle: #eff6ff;
	--success: #10b981;
	--code-bg: #f6f8fa;
	--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
	--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
	font-size: 15px;
	line-height: 1.75;
	color: var(--text-primary);
	background: var(--bg-primary);
	display: flex;
	min-height: 100vh;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
	font-weight: 600;
	line-height: 1.4;
	margin-top: 2em;
	margin-bottom: 0.75em;
	color: var(--text-primary);
	letter-spacing: -0.01em;
}

h1 {
	font-size: 1.875em;
	font-weight: 700;
	margin-top: 0;
	padding-bottom: 0.5em;
	border-bottom: 2px solid var(--border-light);
}

h2 {
	font-size: 1.5em;
	padding-bottom: 0.4em;
	border-bottom: 1px solid var(--border-light);
}

h3 {
	font-size: 1.25em;
}

h4 {
	font-size: 1.125em;
}

h5 {
	font-size: 1em;
	color: var(--text-secondary);
}

h6 {
	font-size: 0.875em;
	color: var(--text-muted);
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

p {
	margin-bottom: 1.25em;
}

ul, ol {
	margin-bottom: 1.25em;
	padding-left: 1.75em;
}

li {
	margin-bottom: 0.5em;
}

li > ul,
li > ol {
	margin-top: 0.5em;
	margin-bottom: 0;
}

ul li::marker {
	color: var(--accent);
}

ol li::marker {
	color: var(--accent);
	font-weight: 500;
}

code {
	background: var(--code-bg);
	border-radius: 4px;
	font-size: 0.875em;
	padding: 0.15em 0.4em;
	font-family: "SF Mono", "Fira Code", "JetBrains Mono", Consolas, monospace;
	color: var(--text-primary);
	border: 1px solid var(--border-light);
}

pre {
	background: var(--bg-secondary);
	border-radius: 8px;
	font-size: 13.5px;
	line-height: 1.7;
	overflow: auto;
	padding: 1.25em;
	margin-bottom: 1.5em;
	position: relative;
	max-width: 100%;
	border: 1px solid var(--border-light);
}

.code-block-wrapper {
	position: relative;
	margin-bottom: 1.5em;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid var(--border-light);
	background: var(--bg-secondary);
}

.code-block-wrapper pre {
	position: relative;
	overflow-x: auto;
	overflow-y: auto;
	margin: 0;
	border-radius: 0;
	border: none;
	padding: 1.25em 1.25em 1.25em 4em;
	background: transparent;
	min-height: 60px;
}

pre code {
	background: transparent;
	color: var(--text-primary);
	padding: 0;
	border: none;
	font-size: inherit;
	display: block;
	white-space: pre;
	word-wrap: normal;
	overflow-x: auto;
	font-family: "SF Mono", "Fira Code", "JetBrains Mono", Consolas, monospace;
	line-height: 1.7;
}

.code-block-wrapper .line-numbers {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 3.25em;
	background: var(--bg-tertiary);
	border-right: 1px solid var(--border-light);
	padding: 1.25em 0;
	text-align: right;
	color: var(--text-muted);
	font-family: "SF Mono", "Fira Code", "JetBrains Mono", Consolas, monospace;
	font-size: 13.5px;
	line-height: 1.7;
	overflow: hidden;
	user-select: none;
	pointer-events: none;
}

.code-block-wrapper .line-numbers span {
	display: block;
	padding-right: 0.75em;
}

.code-block-wrapper pre::-webkit-scrollbar {
	width: 0;
	height: 6px;
}

.code-block-wrapper pre::-webkit-scrollbar-track {
	background: transparent;
}

.code-block-wrapper pre::-webkit-scrollbar-thumb {
	background: var(--border-medium);
	border-radius: 3px;
}

.code-block-wrapper pre::-webkit-scrollbar-thumb:hover {
	background: var(--text-muted);
}

.code-block-wrapper pre::-webkit-scrollbar-corner {
	background: transparent;
}

.code-block-wrapper:hover pre::-webkit-scrollbar {
	width: 6px;
}

.copy-button, .copy-code-button {
	position: absolute !important;
	top: 0.5em !important;
	right: 0.5em !important;
	padding: 0.35em 0.65em;
	background: var(--bg-primary);
	border: 1px solid var(--border-light);
	border-radius: 6px;
	color: var(--text-muted);
	font-size: 0.75em;
	cursor: pointer;
	transition: all 0.15s ease;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 0.35em;
	opacity: 0;
}

.code-block-wrapper:hover .copy-button,
.code-block-wrapper:hover .copy-code-button {
	opacity: 1;
}

.copy-button:hover, .copy-code-button:hover {
	background: var(--bg-secondary);
	border-color: var(--border-medium);
	color: var(--text-secondary);
}

.copy-button.copied, .copy-code-button.copied {
	background: var(--success);
	border-color: var(--success);
	color: white;
}

.copy-button svg, .copy-code-button svg {
	width: 14px;
	height: 14px;
}

.copy-button span, .copy-code-button span {
	font-size: 0.75em;
}

blockquote {
	border-left: 3px solid var(--accent);
	background: var(--accent-subtle);
	color: var(--text-secondary);
	padding: 1em 1.25em;
	margin: 0 0 1.5em 0;
	border-radius: 0 6px 6px 0;
}

blockquote p {
	margin-bottom: 0.75em;
}

blockquote p:last-child {
	margin-bottom: 0;
}

blockquote > :first-child {
	margin-top: 0;
}

blockquote > :last-child {
	margin-bottom: 0;
}

blockquote ul,
blockquote ol {
	padding-left: 1.25em;
	margin-bottom: 0.75em;
}

blockquote code {
	background: rgba(37, 99, 235, 0.08);
	border: none;
	padding: 0.15em 0.4em;
	font-size: 0.875em;
}

blockquote pre {
	background: var(--bg-primary);
	border: 1px solid var(--border-light);
}

blockquote pre code {
	background: transparent;
	color: var(--text-primary);
}

img {
	max-width: 100%;
	height: auto;
	box-sizing: content-box;
	border-radius: 8px;
	margin: 0.5em 0;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

a {
	color: var(--accent);
	text-decoration: none;
	transition: color 0.15s ease;
	border-bottom: 1px solid transparent;
}

a:hover {
	color: var(--accent-light);
	border-bottom-color: var(--accent-light);
}

.table-of-contents {
	background: var(--bg-secondary);
	padding: 1.5em;
	width: 280px;
	min-width: 200px;
	max-width: 480px;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	overflow-y: auto;
	overflow-x: hidden;
	border-right: 1px solid var(--border-light);
	scroll-behavior: smooth;
	z-index: 100;
}

.table-of-contents::-webkit-scrollbar {
	width: 4px;
}

.table-of-contents::-webkit-scrollbar-track {
	background: transparent;
}

.table-of-contents::-webkit-scrollbar-thumb {
	background: var(--border-medium);
	border-radius: 2px;
}

.table-of-contents::-webkit-scrollbar-thumb:hover {
	background: var(--text-muted);
}

.table-of-contents h2 {
	margin-top: 0;
	font-size: 1em;
	font-weight: 600;
	color: var(--text-muted);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	border-bottom: none;
	padding-bottom: 0.75em;
	margin-bottom: 1em;
}

.table-of-contents ul {
	list-style: none;
	padding-left: 0;
	margin: 0;
}

.table-of-contents li {
	margin-bottom: 0.25em;
	line-height: 1.5;
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: normal;
}

.table-of-contents ul ul {
	margin-top: 0.25em;
	padding-left: 1em;
	border-left: 1px solid var(--border-light);
	margin-left: 0.5em;
}

.table-of-contents a {
	color: var(--text-secondary);
	text-decoration: none;
	display: block;
	padding: 0.35em 0.65em;
	border-radius: 4px;
	font-size: 0.875em;
	transition: all 0.15s ease;
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: normal;
	border-bottom: none;
}

.table-of-contents a:hover {
	color: var(--accent);
	background: var(--bg-primary);
	border-bottom: none;
}

.resize-handle {
	position: fixed;
	top: 0;
	left: 280px;
	width: 6px;
	height: 100vh;
	cursor: col-resize;
	z-index: 101;
	transition: background-color 0.15s ease;
	opacity: 0;
}

.resize-handle:hover,
.resize-handle.resizing {
	opacity: 1;
	background-color: var(--accent-subtle);
}

.resize-handle::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 2px;
	height: 32px;
	background-color: var(--border-medium);
	border-radius: 1px;
	transition: background-color 0.15s ease;
}

.resize-handle:hover::after,
.resize-handle.resizing::after {
	background-color: var(--accent);
}

.content-wrapper {
	margin-left: 280px;
	padding: 2.5em 3em;
	flex: 1;
	background: var(--bg-primary);
	transition: margin-left 0.1s ease;
	max-width: 100%;
	overflow-x: hidden;
}

.content-wrapper > *:first-child {
	margin-top: 0;
}

.content-wrapper > *:last-child {
	margin-bottom: 0;
}

hr {
	border: none;
	height: 1px;
	background: var(--border-light);
	margin: 2em 0;
}

table {
	border-collapse: collapse;
	width: 100%;
	margin: 0 0 1.5em 0;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid var(--border-light);
}

table th {
	background: var(--bg-secondary);
	color: var(--text-primary);
	padding: 0.75em 1em;
	text-align: left;
	font-weight: 600;
	font-size: 0.875em;
	border-bottom: 2px solid var(--border-light);
}

table td {
	padding: 0.75em 1em;
	border-bottom: 1px solid var(--border-light);
	font-size: 0.9375em;
}

table tr:last-child td {
	border-bottom: none;
}

table tr:hover {
	background: var(--bg-secondary);
}

@media (max-width: 768px) {
	.table-of-contents {
		width: 100%;
		position: relative;
		min-height: auto;
		border-right: none;
		border-bottom: 1px solid var(--border-light);
		height: auto;
	}

	.resize-handle {
		display: none;
	}

	.content-wrapper {
		margin-left: 0;
		padding: 1.5em;
	}

	body {
		flex-direction: column;
	}
}

@page {
	margin: 2cm;
}

@media print {
	.table-of-contents {
		position: static;
		width: 100%;
		padding: 1em;
		border-right: none;
		border-bottom: 1px solid var(--border-light);
	}

	.resize-handle {
		display: none;
	}

	.content-wrapper {
		margin-left: 0;
		padding: 1em;
		max-width: none;
	}

	body {
		background: white;
	}

	.copy-button,
	.copy-code-button {
		display: none !important;
	}

	.code-block-wrapper {
		break-inside: avoid;
	}
}
`;
var DEFAULT_SETTINGS = {
  autoOpenFolder: true,
  exportPath: "",
  templateVersion: "v3"
};
var TRANSLATIONS = {
  "Export to HTML...": {
    "zh-CN": "\u5BFC\u51FA\u4E3A HTML...",
    "zh": "\u5BFC\u51FA\u4E3A HTML...",
    en: "Export to HTML..."
  },
  "Exporting": {
    "zh-CN": "\u6B63\u5728\u5BFC\u51FA",
    "zh": "\u6B63\u5728\u5BFC\u51FA",
    en: "Exporting"
  },
  "Failed to export HTML": {
    "zh-CN": "\u5BFC\u51FA HTML \u5931\u8D25",
    "zh": "\u5BFC\u51FA HTML \u5931\u8D25",
    en: "Failed to export HTML"
  },
  "HTML exported successfully": {
    "zh-CN": "HTML \u5BFC\u51FA\u6210\u529F",
    "zh": "HTML \u5BFC\u51FA\u6210\u529F",
    en: "HTML exported successfully"
  },
  "Table of Contents": {
    "zh-CN": "\u76EE\u5F55",
    "zh": "\u76EE\u5F55",
    en: "Table of Contents"
  },
  "Auto-open folder after export": {
    "zh-CN": "\u5BFC\u51FA\u540E\u81EA\u52A8\u6253\u5F00\u6587\u4EF6\u5939",
    "zh": "\u5BFC\u51FA\u540E\u81EA\u52A8\u6253\u5F00\u6587\u4EF6\u5939",
    en: "Auto-open folder after export"
  },
  "Automatically open the folder containing the exported HTML file after successful export": {
    "zh-CN": "\u5BFC\u51FA\u6210\u529F\u540E\u81EA\u52A8\u6253\u5F00\u5305\u542B\u5BFC\u51FA HTML \u6587\u4EF6\u7684\u6587\u4EF6\u5939",
    "zh": "\u5BFC\u51FA\u6210\u529F\u540E\u81EA\u52A8\u6253\u5F00\u5305\u542B\u5BFC\u51FA HTML \u6587\u4EF6\u7684\u6587\u4EF6\u5939",
    en: "Automatically open the folder containing the exported HTML file after successful export"
  },
  "HTML template": {
    "zh-CN": "HTML \u6A21\u677F",
    "zh": "HTML \u6A21\u677F",
    en: "HTML template"
  },
  "HTML template used for export.": {
    "zh-CN": "\u5BFC\u51FA\u4F7F\u7528\u7684HTML\u6A21\u677F\u3002",
    "zh": "\u5BFC\u51FA\u4F7F\u7528\u7684HTML\u6A21\u677F\u3002",
    en: "HTML template used for export."
  }
};
var ExportHTMLPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new ExportHTMLSettingTab(this.app, this));
    this.addCommand({
      id: "export-to-html",
      name: this.translate("Export to HTML..."),
      icon: "download",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (file && file.extension === "md") {
          if (!checking) {
            void this.exportToHTML(file);
          }
          return true;
        }
        return false;
      }
    });
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      if (file.extension === "md") {
        menu.addItem((item) => {
          item.setTitle(this.translate("Export to HTML...")).setIcon("download").onClick(async () => {
            await this.exportToHTML(file);
          });
        });
      }
    }));
  }
  onunload() {
  }
  translate(key) {
    const locale = navigator.language || "en";
    const translation = TRANSLATIONS[key];
    return (translation == null ? void 0 : translation[locale]) || (translation == null ? void 0 : translation.en) || key;
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async exportToHTML(file) {
    try {
      const content = await this.app.vault.read(file);
      const htmlContent = await this.convertMarkdownToHTML(content, file);
      const electron = window.require("electron");
      const path = window.require("path");
      const adapter = this.app.vault.adapter;
      const basePath = adapter.getBasePath();
      let defaultPath;
      if (file.parent && file.parent.path) {
        defaultPath = path.join(basePath, file.parent.path, file.basename + ".html");
      } else {
        defaultPath = path.join(basePath, file.basename + ".html");
      }
      const { canceled, filePath } = await electron.remote.dialog.showSaveDialog({
        defaultPath,
        filters: [
          { name: "HTML Files", extensions: ["html"] },
          { name: "All Files", extensions: ["*"] }
        ]
      });
      if (!canceled && filePath) {
        const fs = window.require("fs/promises");
        await fs.writeFile(filePath, htmlContent, "utf-8");
        new import_obsidian.Notice(`${this.translate("HTML exported successfully")}: ${filePath}`);
        if (this.settings.autoOpenFolder) {
          const folderPath = path.dirname(filePath);
          const { shell } = electron;
          await shell.openPath(folderPath);
        }
      }
    } catch (e) {
      new import_obsidian.Notice(this.translate("Failed to export HTML"));
    }
  }
  async convertMarkdownToHTML(markdown, file) {
    if (this.settings.templateVersion === "v3") {
      markdown = this.stripFrontmatter(markdown);
    }
    const imageLinks = this.extractImageLinks(markdown);
    const hasMath = this.detectMathFormulas(markdown);
    let protectedMarkdown = markdown;
    const mathPlaceholders = [];
    if (hasMath) {
      protectedMarkdown = splitByCode(markdown).map((segment) => segment.code ? segment.text : applyMathPlaceholders(segment.text, mathPlaceholders)).join("");
    }
    const tempDiv = document.createElement("div");
    await import_obsidian.MarkdownRenderer.render(this.app, protectedMarkdown, tempDiv, file.path, null);
    if (this.settings.templateVersion === "v3") {
      tempDiv.querySelectorAll(".metadata-container").forEach((el) => el.remove());
    }
    if (hasMath) {
      const processMathPlaceholders = (element) => {
        if (element.nodeType === Node.TEXT_NODE) {
          const text = element.textContent || "";
          let hasPlaceholder = false;
          for (let i = 0; i < mathPlaceholders.length; i++) {
            if (text.includes(`MATH_BLOCK_PLACEHOLDER_${i}_END`) || text.includes(`MATH_INLINE_PLACEHOLDER_${i}_END`)) {
              hasPlaceholder = true;
              break;
            }
          }
          if (!hasPlaceholder) {
            return;
          }
          const fragment = document.createDocumentFragment();
          let remainingText = text;
          let lastIndex = 0;
          const replacements = [];
          mathPlaceholders.forEach((latex, index) => {
            const blockPlaceholder = `MATH_BLOCK_PLACEHOLDER_${index}_END`;
            const inlinePlaceholder = `MATH_INLINE_PLACEHOLDER_${index}_END`;
            let pos = remainingText.indexOf(blockPlaceholder);
            while (pos !== -1) {
              replacements.push({
                start: pos,
                end: pos + blockPlaceholder.length,
                latex,
                isBlock: true
              });
              pos = remainingText.indexOf(blockPlaceholder, pos + 1);
            }
            pos = remainingText.indexOf(inlinePlaceholder);
            while (pos !== -1) {
              replacements.push({
                start: pos,
                end: pos + inlinePlaceholder.length,
                latex,
                isBlock: false
              });
              pos = remainingText.indexOf(inlinePlaceholder, pos + 1);
            }
          });
          replacements.sort((a, b) => a.start - b.start);
          let currentPos = 0;
          replacements.forEach((repl) => {
            if (repl.start > currentPos) {
              const textNode = document.createTextNode(remainingText.substring(currentPos, repl.start));
              fragment.appendChild(textNode);
            }
            let pureLatex = repl.latex;
            if (repl.isBlock) {
              if (repl.latex.startsWith("$$")) {
                pureLatex = repl.latex.slice(2, -2);
              } else if (repl.latex.startsWith("\\[")) {
                pureLatex = repl.latex.slice(2, -2);
              }
              const mathDiv = document.createElement("div");
              mathDiv.className = "math-display";
              mathDiv.textContent = pureLatex;
              fragment.appendChild(mathDiv);
            } else {
              if (repl.latex.startsWith("$")) {
                pureLatex = repl.latex.slice(1, -1);
              } else if (repl.latex.startsWith("\\(")) {
                pureLatex = repl.latex.slice(2, -2);
              }
              const mathSpan = document.createElement("span");
              mathSpan.className = "math-inline";
              mathSpan.textContent = pureLatex;
              fragment.appendChild(mathSpan);
            }
            currentPos = repl.end;
          });
          if (currentPos < remainingText.length) {
            const textNode = document.createTextNode(remainingText.substring(currentPos));
            fragment.appendChild(textNode);
          }
          const parent = element.parentNode;
          if (parent) {
            parent.replaceChild(fragment, element);
          }
        } else if (element.nodeType === Node.ELEMENT_NODE) {
          Array.from(element.childNodes).forEach((child) => processMathPlaceholders(child));
        }
      };
      processMathPlaceholders(tempDiv);
    }
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingsData = [];
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
        heading.setAttribute("id", heading.id);
      }
      headingsData.push({
        level: parseInt(heading.tagName.charAt(1)),
        id: heading.id,
        text: heading.textContent || ""
      });
    });
    let html = await this.convertImagesToBase64(tempDiv.innerHTML, file, imageLinks);
    html = this.wrapCodeBlocks(html);
    const documentTitle = file.basename;
    let toc = '<div class="table-of-contents">';
    toc += `<h2>${documentTitle}</h2>`;
    toc += this.generateNestedTOC(headingsData);
    toc += "</div>";
    const mathJaxCSS = hasMath ? buildKatexCss() : "";
    const mathJaxScript = hasMath ? buildKatexScript() : "";
    if (this.settings.templateVersion === "v2") {
      return buildV2Template({
        title: documentTitle,
        tocHtml: this.generateNestedTOC(headingsData),
        contentHtml: html,
        mathCss: mathJaxCSS,
        mathScript: mathJaxScript
      });
    }
    if (this.settings.templateVersion === "v3") {
      return buildV3Template({
        title: documentTitle,
        mtime: file.stat.mtime,
        headings: headingsData,
        contentHtml: html,
        mathCss: mathJaxCSS,
        mathScript: mathJaxScript
      });
    }
    const copyScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	const copyButtons = document.querySelectorAll('.copy-code-button');
	copyButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			// \u67E5\u627E\u4EE3\u7801\u5757
			const pre = this.closest('pre');
			if (!pre) return;
			
			// \u83B7\u53D6 code \u5143\u7D20\uFF08\u6392\u9664 copy-code-button\uFF09
			const code = pre.querySelector('code');
			if (!code) return;
			
			const textToCopy = code.textContent;
			
			// \u5C1D\u8BD5\u4F7F\u7528\u73B0\u4EE3 Clipboard API
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(textToCopy).then(() => {
					showCopiedState(this);
				}).catch(() => {
					fallbackCopy(textToCopy, this);
				});
			} else {
				fallbackCopy(textToCopy, this);
			}
		});
	});
	
	// \u663E\u793A\u590D\u5236\u6210\u529F\u72B6\u6001
	function showCopiedState(button) {
		const originalHTML = button.innerHTML;
		button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>';
		button.classList.add('copied');
		
		setTimeout(() => {
			button.innerHTML = originalHTML;
			button.classList.remove('copied');
		}, 2000);
	}
	
	// \u964D\u7EA7\u590D\u5236\u65B9\u6848
	function fallbackCopy(text, button) {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '0';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				showCopiedState(button);
			}
		} catch (err) {
			// \u5FFD\u7565\u9519\u8BEF
		}
		document.body.removeChild(textArea);
	}
	
	const codeBlocks = document.querySelectorAll('.code-block-wrapper');
	codeBlocks.forEach(block => {
		const pre = block.querySelector('pre');
		const lineNumbers = block.querySelector('.line-numbers');
		
		if (pre && lineNumbers) {
			pre.addEventListener('scroll', function() {
				lineNumbers.scrollTop = pre.scrollTop;
			});
		}
	});
});
<\/script>
`;
    const resizeScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	const resizeHandle = document.querySelector('.resize-handle');
	const toc = document.querySelector('.table-of-contents');
	const content = document.querySelector('.content-wrapper');
	
	if (resizeHandle && toc && content) {
		let isResizing = false;
		
		resizeHandle.addEventListener('mousedown', function(e) {
			isResizing = true;
			resizeHandle.classList.add('resizing');
			document.body.style.cursor = 'col-resize';
			document.body.style.userSelect = 'none';
		});
		
		document.addEventListener('mousemove', function(e) {
			if (!isResizing) return;
			
			let newWidth = e.clientX;
			if (newWidth < 200) newWidth = 200;
			if (newWidth > 600) newWidth = 600;
			
			toc.style.width = newWidth + 'px';
			resizeHandle.style.left = newWidth + 'px';
			content.style.marginLeft = (newWidth) + 'px';
		});
		
		document.addEventListener('mouseup', function() {
			if (isResizing) {
				isResizing = false;
				resizeHandle.classList.remove('resizing');
				document.body.style.cursor = '';
				document.body.style.userSelect = '';
			}
		});
	}
});
<\/script>
`;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${file.basename}</title>
	<style>${GITHUB_CSS}</style>
	${mathJaxCSS}
</head>
<body>
	${toc}
	<div class="resize-handle"></div>
	<div class="content-wrapper">
		${html}
	</div>
	${copyScript}
	${resizeScript}
	${mathJaxScript}
</body>
</html>
`;
    return fullHTML;
  }
  generateNestedTOC(headings) {
    if (headings.length === 0) {
      return "<ul></ul>";
    }
    let toc = "<ul>";
    const stack = [0];
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const level = heading.level;
      while (stack.length > 1 && stack[stack.length - 1] >= level) {
        toc += "</li></ul>";
        stack.pop();
      }
      if (level > stack[stack.length - 1]) {
        toc += "<ul>";
        stack.push(level);
      } else if (i > 0) {
        toc += "</li>";
      }
      toc += `<li><a href="#${heading.id}">${heading.text}</a>`;
    }
    while (stack.length > 1) {
      toc += "</li></ul>";
      stack.pop();
    }
    toc += "</li></ul>";
    return toc;
  }
  wrapCodeBlocks(html) {
    const wrapped = html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (match, attributes, content) => {
      if (/display\s*:\s*none/i.test(attributes)) {
        return match;
      }
      const textContent = content.replace(/<[^>]*>/g, "");
      const decoded = textContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      const trimmed = decoded.replace(/\n+$/, "");
      if (trimmed === "") {
        return `<div class="code-block-wrapper"><div class="line-numbers"></div><pre${attributes}>${content}</pre></div>`;
      }
      const lineCount = trimmed.split("\n").length;
      let lineNumbers = "";
      for (let i = 1; i <= lineCount; i++) {
        lineNumbers += `<span>${i}</span>`;
      }
      return `<div class="code-block-wrapper"><div class="line-numbers">${lineNumbers}</div><pre${attributes}>${content}</pre></div>`;
    });
    return wrapped;
  }
  stripFrontmatter(markdown) {
    const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match || !/^[A-Za-z0-9_-]+\s*:/m.test(match[1])) {
      return markdown;
    }
    return markdown.slice(match[0].length);
  }
  detectMathFormulas(markdown) {
    const text = stripCode(markdown);
    const inlineMathRegex = /\$\s*[^$]+?\s*\$/g;
    const blockMathRegex = /\$\$[\s\S]+?\$\$/g;
    const latexInlineRegex = /\\\(\s*[^\\]+?\s*\\\)/g;
    const latexBlockRegex = /\\\[([\s\S]+?)\\\]/g;
    return inlineMathRegex.test(text) || blockMathRegex.test(text) || latexInlineRegex.test(text) || latexBlockRegex.test(text);
  }
  extractImageLinks(markdown) {
    const imageLinks = [];
    const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)|!\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = markdownImgRegex.exec(markdown)) !== null) {
      if (match[2]) {
        const src = match[2].split("|")[0].split("?")[0];
        imageLinks.push(src);
      }
      if (match[3]) {
        const src = match[3].split("|")[0].split("?")[0];
        imageLinks.push(src);
      }
    }
    return imageLinks;
  }
  async convertImagesToBase64(html, file, imageLinks = []) {
    var _a;
    let processedHtml = html;
    const processedImages = new Map();
    const processingImages = new Set();
    for (const imgSrc of imageLinks) {
      const cleanSrc = imgSrc.split("?")[0].split("#")[0];
      const extension = ((_a = cleanSrc.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
      const imageExtensions = ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "ico", "avif", "heic"];
      if (!imageExtensions.includes(extension)) {
        continue;
      }
      if (cleanSrc.startsWith("data:")) {
        continue;
      }
      try {
        if (processedImages.has(cleanSrc) || processingImages.has(cleanSrc)) {
          continue;
        }
        processingImages.add(cleanSrc);
        const base64Data = await this.getImageBase64(cleanSrc, file);
        processingImages.delete(cleanSrc);
        if (base64Data) {
          const mimeType = this.getMimeType(base64Data.extension);
          const dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
          processedImages.set(cleanSrc, dataUrl);
        }
      } catch (e) {
      }
    }
    const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
    const imgMatches = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      imgMatches.push({
        full: match[0],
        src: match[1],
        alt: match[2] || "",
        index: match.index
      });
    }
    const replacements = [];
    for (const img of imgMatches) {
      if (img.src.startsWith("data:")) {
        continue;
      }
      try {
        let dataUrl = null;
        if (processedImages.has(img.src)) {
          const storedDataUrl = processedImages.get(img.src);
          if (storedDataUrl) {
            dataUrl = storedDataUrl;
          }
        } else if (processingImages.has(img.src)) {
          continue;
        } else {
          processingImages.add(img.src);
          const base64Data = await this.getImageBase64(img.src, file);
          processingImages.delete(img.src);
          if (base64Data) {
            const mimeType = this.getMimeType(base64Data.extension);
            dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
            processedImages.set(img.src, dataUrl);
          }
        }
        if (dataUrl) {
          const newImgTag = `<img src="${dataUrl}" alt="${img.alt}" />`;
          replacements.push({
            start: img.index,
            end: img.index + img.full.length,
            replacement: newImgTag
          });
        }
      } catch (e) {
      }
    }
    if (replacements.length > 0) {
      replacements.sort((a, b) => b.start - a.start);
      for (const rep of replacements) {
        processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
      }
    }
    const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>[\s\S]*?<\/span>/g;
    const embedMatches = [];
    const matches = Array.from(processedHtml.matchAll(embedRegex));
    for (const match2 of matches) {
      const fullMatch = match2[0];
      const srcMatch = fullMatch.match(/src="([^"]+)"/);
      const altMatch = fullMatch.match(/alt="([^"]+)"/);
      if (srcMatch) {
        embedMatches.push({
          full: fullMatch,
          src: srcMatch[1],
          alt: altMatch ? altMatch[1] : "",
          index: match2.index
        });
      }
    }
    const embedReplacements = [];
    for (const embed of embedMatches) {
      if (embed.src && !embed.src.startsWith("data:")) {
        try {
          let dataUrl = null;
          if (processedImages.has(embed.src)) {
            const storedDataUrl = processedImages.get(embed.src);
            if (storedDataUrl) {
              dataUrl = storedDataUrl;
            }
          } else if (processingImages.has(embed.src)) {
            continue;
          } else {
            processingImages.add(embed.src);
            const base64Data = await this.getImageBase64(embed.src, file);
            processingImages.delete(embed.src);
            if (base64Data) {
              const mimeType = this.getMimeType(base64Data.extension);
              dataUrl = `data:${mimeType};base64,${base64Data.base64}`;
              processedImages.set(embed.src, dataUrl);
            }
          }
          if (dataUrl) {
            const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ""}" />`;
            embedReplacements.push({
              start: embed.index,
              end: embed.index + embed.full.length,
              replacement: newImgTag
            });
          }
        } catch (e) {
        }
      }
    }
    if (embedReplacements.length > 0) {
      embedReplacements.sort((a, b) => b.start - a.start);
      for (const rep of embedReplacements) {
        processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
      }
    }
    return processedHtml;
  }
  async getImageBase64(src, file) {
    if (src.startsWith("data:")) {
      return null;
    }
    const decodedSrc = decodeURIComponent(src);
    const cleanSrc = decodedSrc.split("?")[0].split("#")[0];
    let imageFile = null;
    imageFile = this.app.metadataCache.getFirstLinkpathDest(cleanSrc, file.path);
    if (!imageFile) {
      imageFile = this.app.metadataCache.getFirstLinkpathDest(src, file.path);
    }
    if (!imageFile) {
      const path = window.require("path");
      const fileDir = path.dirname(file.path);
      const resolvedPath = path.normalize(path.join(fileDir, cleanSrc));
      const abstractFile = this.app.vault.getAbstractFileByPath(resolvedPath);
      if (abstractFile instanceof import_obsidian.TFile) {
        imageFile = abstractFile;
      }
    }
    if (!imageFile) {
      const abstractFile = this.app.vault.getAbstractFileByPath(cleanSrc);
      if (abstractFile instanceof import_obsidian.TFile) {
        imageFile = abstractFile;
      }
    }
    if (!imageFile) {
      return null;
    }
    if (imageFile instanceof import_obsidian.TFile && ["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp"].includes(imageFile.extension.toLowerCase())) {
      try {
        const buffer = await this.app.vault.readBinary(imageFile);
        const base64 = this.arrayBufferToBase64(buffer);
        return { base64, extension: imageFile.extension };
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let base64 = "";
    const chunkSize = 32768;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      base64 += String.fromCharCode.apply(null, chunk);
    }
    return btoa(base64);
  }
  getMimeType(extension) {
    const mimeTypes = {
      "png": "image/png",
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "gif": "image/gif",
      "svg": "image/svg+xml",
      "webp": "image/webp"
    };
    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }
};
var ExportHTMLSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName(this.plugin.translate("HTML template")).setDesc(this.plugin.translate("HTML template used for export.")).addDropdown((dropdown) => dropdown.addOption("v1", "v1").addOption("v2", "v2").addOption("v3", "v3").setValue(this.plugin.settings.templateVersion).onChange(async (value) => {
      if (value === "v1" || value === "v2" || value === "v3") {
        this.plugin.settings.templateVersion = value;
        await this.plugin.saveSettings();
      }
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.translate("Auto-open folder after export")).setDesc(this.plugin.translate("Automatically open the folder containing the exported HTML file after successful export")).addToggle((toggle) => toggle.setValue(this.plugin.settings.autoOpenFolder).onChange(async (value) => {
      this.plugin.settings.autoOpenFolder = value;
      await this.plugin.saveSettings();
    }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
