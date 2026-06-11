import { App, Notice, Plugin, PluginSettingTab, Setting, TFile, Menu, FileSystemAdapter, MarkdownRenderer } from 'obsidian';
import { KATEX_JS_BASE64, KATEX_CSS_BASE64 } from './katex-constants';

/**
 * 专业简洁的文档样式
 * 采用现代排版设计，优化阅读体验
 */
const GITHUB_CSS = `
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

/**
 * 插件设置接口
 */
interface ExportHTMLPluginSettings {
	autoOpenFolder: boolean;
	exportPath: string;
}

/**
 * 默认设置
 */
const DEFAULT_SETTINGS: ExportHTMLPluginSettings = {
	autoOpenFolder: true,
	exportPath: ''
};

/**
 * 标题信息接口
 */
interface HeadingInfo {
	level: number;
	id: string;
	text: string;
}

/**
 * 翻译词典
 * 支持中文和英文
 */
const TRANSLATIONS: { [key: string]: { [lang: string]: string } } = {
	'Export to HTML...': {
		'zh-CN': '导出为 HTML...',
		'zh': '导出为 HTML...',
		en: 'Export to HTML...'
	},
	'Exporting': {
		'zh-CN': '正在导出',
		'zh': '正在导出',
		en: 'Exporting'
	},
	'Failed to export HTML': {
		'zh-CN': '导出 HTML 失败',
		'zh': '导出 HTML 失败',
		en: 'Failed to export HTML'
	},
	'HTML exported successfully': {
		'zh-CN': 'HTML 导出成功',
		'zh': 'HTML 导出成功',
		en: 'HTML exported successfully'
	},
	'Table of Contents': {
		'zh-CN': '目录',
		'zh': '目录',
		en: 'Table of Contents'
	},
	'Auto-open folder after export': {
		'zh-CN': '导出后自动打开文件夹',
		'zh': '导出后自动打开文件夹',
		en: 'Auto-open folder after export'
	},
	'Automatically open the folder containing the exported HTML file after successful export': {
		'zh-CN': '导出成功后自动打开包含导出 HTML 文件的文件夹',
		'zh': '导出成功后自动打开包含导出 HTML 文件的文件夹',
		en: 'Automatically open the folder containing the exported HTML file after successful export'
	}
};

/**
 * 主插件类
 */
export default class ExportHTMLPlugin extends Plugin {
	settings: ExportHTMLPluginSettings;

	/**
	 * 插件加载时执行
	 */
	async onload() {
		await this.loadSettings();
		
		this.addSettingTab(new ExportHTMLSettingTab(this.app, this));

		// 添加命令
		this.addCommand({
			id: 'export-to-html',
			name: this.translate('Export to HTML...'),
			icon: 'download',
			checkCallback: (checking: boolean) => {
				const file = this.app.workspace.getActiveFile();
				if (file && file.extension === 'md') {
					if (!checking) {
						void this.exportToHTML(file);
					}
					return true;
				}
				return false;
			}
		});

		// 添加文件浏览器右键菜单
		this.registerEvent(
			this.app.workspace.on('file-menu', (menu: Menu, file: TFile) => {
				if (file.extension === 'md') {
					menu.addItem((item) => {
						item
							.setTitle(this.translate('Export to HTML...'))
							.setIcon('download')
							.onClick(async () => {
								await this.exportToHTML(file);
							});
					});
				}
			})
		);
	}

	/**
	 * 插件卸载时执行
	 */
	onunload() {
	}

	/**
	 * 翻译函数
	 * @param key 翻译键
	 * @returns 翻译后的文本
	 */
	translate(key: string): string {
		const locale = navigator.language || 'en';
		const translation = TRANSLATIONS[key];
		return translation?.[locale] || translation?.en || key;
	}

	/**
	 * 加载插件设置
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * 保存插件设置
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * 导出 Markdown 文件为 HTML
	 * @param file 要导出的文件
	 */
	async exportToHTML(file: TFile) {
		try {
			const content = await this.app.vault.read(file);
			const htmlContent = await this.convertMarkdownToHTML(content, file);
			
			// 使用 Electron API 保存文件
		const electron = (window as unknown as { require: (module: string) => unknown }).require('electron') as { 
			remote: { dialog: { showSaveDialog: (options: unknown) => Promise<{ canceled: boolean; filePath: string }> } };
			shell: { openPath: (path: string) => Promise<string> };
		};
		const path = (window as unknown as { require: (module: string) => unknown }).require('path') as { join: (...args: string[]) => string; dirname: (path: string) => string };
			const adapter = this.app.vault.adapter as FileSystemAdapter;
			const basePath = adapter.getBasePath();
			
			let defaultPath: string;
			if (file.parent && file.parent.path) {
				defaultPath = path.join(basePath, file.parent.path, file.basename + '.html');
			} else {
				defaultPath = path.join(basePath, file.basename + '.html');
			}
			
			const { canceled, filePath } = await electron.remote.dialog.showSaveDialog({
				defaultPath: defaultPath,
				filters: [
					{ name: 'HTML Files', extensions: ['html'] },
					{ name: 'All Files', extensions: ['*'] }
				]
			});

			if (!canceled && filePath) {
				const fs = (window as unknown as { require: (module: string) => unknown }).require('fs/promises') as { writeFile: (path: string, data: string, encoding: string) => Promise<void> };
				await fs.writeFile(filePath, htmlContent, 'utf-8');
				new Notice(`${this.translate('HTML exported successfully')}: ${filePath}`);
				
				if (this.settings.autoOpenFolder) {
					const folderPath = path.dirname(filePath);
					const { shell } = electron;
					await shell.openPath(folderPath);
				}
			}
		} catch {
			new Notice(this.translate('Failed to export HTML'));
		}
	}

	/**
	 * 将 Markdown 内容转换为 HTML
	 * @param markdown Markdown 内容
	 * @param file 源文件
	 * @returns 生成的 HTML 字符串
	 */
	async convertMarkdownToHTML(markdown: string, file: TFile): Promise<string> {
		const imageLinks = this.extractImageLinks(markdown);
		const hasMath = this.detectMathFormulas(markdown);
		
		let protectedMarkdown = markdown;
		const mathPlaceholders: string[] = [];
		
		if (hasMath) {
			protectedMarkdown = protectedMarkdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
				const placeholder = `MATH_BLOCK_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`$$${latex}$$`);
				return placeholder;
			});
			
			protectedMarkdown = protectedMarkdown.replace(/\$([^$\n]+?)\$/g, (match, latex) => {
				const placeholder = `MATH_INLINE_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`$${latex}$`);
				return placeholder;
			});
			
			protectedMarkdown = protectedMarkdown.replace(/\\\(([^)]+?)\\\)/g, (match, latex) => {
				const placeholder = `MATH_INLINE_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`\\(${latex}\\)`);
				return placeholder;
			});
			
			protectedMarkdown = protectedMarkdown.replace(/\\\[([\s\S]+?)\\\]/g, (match, latex) => {
				const placeholder = `MATH_BLOCK_PLACEHOLDER_${mathPlaceholders.length}_END`;
				mathPlaceholders.push(`\\[${latex}\\]`);
				return placeholder;
			});
		}
		
		const tempDiv = document.createElement('div');
		await MarkdownRenderer.render(this.app, protectedMarkdown, tempDiv, file.path, this);
		
		if (hasMath) {
			let html = tempDiv.innerHTML;
			
			mathPlaceholders.forEach((latex, index) => {
				const blockPlaceholder = `MATH_BLOCK_PLACEHOLDER_${index}_END`;
				const inlinePlaceholder = `MATH_INLINE_PLACEHOLDER_${index}_END`;
				
				if (latex.startsWith('$$') || latex.startsWith('\\[')) {
					let pureLatex = latex;
					if (latex.startsWith('$$')) {
						pureLatex = latex.slice(2, -2);
					} else if (latex.startsWith('\\[')) {
						pureLatex = latex.slice(2, -2);
					}
					const escapedBlock = blockPlaceholder.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
					const regex = new RegExp(escapedBlock, 'g');
					html = html.replace(regex, `<div class="math-display">${pureLatex}</div>`);
				} else {
					let pureLatex = latex;
					if (latex.startsWith('$')) {
						pureLatex = latex.slice(1, -1);
					} else if (latex.startsWith('\\(')) {
						pureLatex = latex.slice(2, -2);
					}
					const escapedInline = inlinePlaceholder.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
					const regex = new RegExp(escapedInline, 'g');
					html = html.replace(regex, `<span class="math-inline">${pureLatex}</span>`);
				}
			});
			
			// eslint-disable-next-line @microsoft/sdl/no-inner-html
			tempDiv.innerHTML = html;
		}
		
		const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const headingsData: HeadingInfo[] = [];
		
		headings.forEach((heading, index) => {
			if (!heading.id) {
				heading.id = `heading-${index}`;
				heading.setAttribute('id', heading.id);
			}
			
			headingsData.push({
				level: parseInt(heading.tagName.charAt(1)),
				id: heading.id,
				text: heading.textContent || ''
			});
		});

		let html = await this.convertImagesToBase64(tempDiv.innerHTML, file, imageLinks);
		html = this.wrapCodeBlocks(html);

		const documentTitle = file.basename;

		let toc = '<div class="table-of-contents">';
		toc += `<h2>${documentTitle}</h2>`;
		toc += this.generateNestedTOC(headingsData);
		toc += '</div>';

		const mathJaxCSS = hasMath ? `<style>${atob(KATEX_CSS_BASE64)}</style>` : '';

		const mathJaxScript = hasMath ? `
<script>${atob(KATEX_JS_BASE64)}</script>
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
			// 忽略错误
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
			// 忽略错误
		}
	});
});
</script>` : '';

		const copyScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
	const copyButtons = document.querySelectorAll('.copy-code-button');
	
	copyButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			// 查找代码块
			const pre = this.closest('pre');
			if (!pre) return;
			
			// 获取 code 元素（排除 copy-code-button）
			const code = pre.querySelector('code');
			if (!code) return;
			
			const textToCopy = code.textContent;
			
			// 尝试使用现代 Clipboard API
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
	
	// 显示复制成功状态
	function showCopiedState(button) {
		const originalHTML = button.innerHTML;
		button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>';
		button.classList.add('copied');
		
		setTimeout(() => {
			button.innerHTML = originalHTML;
			button.classList.remove('copied');
		}, 2000);
	}
	
	// 降级复制方案
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
			// 忽略错误
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
</script>
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
</script>
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

	/**
	 * 生成嵌套目录
	 * @param headings 标题数组
	 * @returns 嵌套的目录 HTML
	 */
	generateNestedTOC(headings: HeadingInfo[]): string {
		if (headings.length === 0) {
			return '<ul></ul>';
		}

		let toc = '<ul>';
		const stack: number[] = [0];

		for (let i = 0; i < headings.length; i++) {
			const heading = headings[i];
			const level = heading.level;
			
			while (stack.length > 1 && stack[stack.length - 1] >= level) {
				toc += '</li></ul>';
				stack.pop();
			}
			
			if (level > stack[stack.length - 1]) {
				toc += '<ul>';
				stack.push(level);
			} else if (i > 0) {
				toc += '</li>';
			}
			
			toc += `<li><a href="#${heading.id}">${heading.text}</a>`;
		}

		while (stack.length > 1) {
			toc += '</li></ul>';
			stack.pop();
		}
		toc += '</li></ul>';

		return toc;
	}

	/**
	 * 包装代码块，添加行号
	 * @param html HTML 字符串
	 * @returns 包装后的 HTML
	 */
	wrapCodeBlocks(html: string): string {
		const wrapped = html.replace(
			/<pre([^>]*)>([\s\S]*?)<\/pre>/g,
			(match, attributes, content) => {
				if (/display\s*:\s*none/i.test(attributes)) {
					return match;
				}

				const textContent = content.replace(/<[^>]*>/g, '');
				const decoded = textContent
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&amp;/g, '&')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, "'");
				
				const trimmed = decoded.replace(/\n+$/, '');
				
				if (trimmed === '') {
					return `<div class="code-block-wrapper"><div class="line-numbers"></div><pre${attributes}>${content}</pre></div>`;
				}
				
				const lineCount = trimmed.split('\n').length;
				
				let lineNumbers = '';
				for (let i = 1; i <= lineCount; i++) {
					lineNumbers += `<span>${i}</span>`;
				}
				
				return `<div class="code-block-wrapper"><div class="line-numbers">${lineNumbers}</div><pre${attributes}>${content}</pre></div>`;
			}
		);
		return wrapped;
	}

	/**
	 * 检测 Markdown 中是否包含数学公式
	 * @param markdown Markdown 内容
	 * @returns 是否包含数学公式
	 */
	detectMathFormulas(markdown: string): boolean {
		const inlineMathRegex = /\$\s*[^$]+?\s*\$/g;
		const blockMathRegex = /\$\$[\s\S]+?\$\$/g;
		const latexInlineRegex = /\\\(\s*[^\\]+?\s*\\\)/g;
		const latexBlockRegex = /\\\[([\s\S]+?)\\\]/g;
		
		return inlineMathRegex.test(markdown) || 
			blockMathRegex.test(markdown) || 
			latexInlineRegex.test(markdown) || 
			latexBlockRegex.test(markdown);
	}

	/**
	 * 从 Markdown 源码中提取所有图片链接
	 * @param markdown Markdown 内容
	 * @returns 图片链接数组
	 */
	extractImageLinks(markdown: string): string[] {
		const imageLinks: string[] = [];
		
		const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)|!\[\[([^\]]+)\]\]/g;
		let match;
		
		while ((match = markdownImgRegex.exec(markdown)) !== null) {
			if (match[2]) {
				const src = match[2].split('|')[0].split('?')[0];
				imageLinks.push(src);
			}
			if (match[3]) {
				const src = match[3].split('|')[0].split('?')[0];
				imageLinks.push(src);
			}
		}
		
		return imageLinks;
	}

	/**
	 * 将 HTML 中的图片转换为 base64 编码
	 * @param html HTML 字符串
	 * @param file 源文件
	 * @param imageLinks 图片链接数组
	 * @returns 处理后的 HTML
	 */
	async convertImagesToBase64(html: string, file: TFile, imageLinks: string[] = []): Promise<string> {
		let processedHtml = html;
		const processedImages = new Map<string, string>();
		const processingImages = new Set<string>();

		for (const imgSrc of imageLinks) {
			const cleanSrc = imgSrc.split('?')[0].split('#')[0];
			
			const extension = cleanSrc.split('.').pop()?.toLowerCase() || '';
			const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico', 'avif', 'heic'];
			
			if (!imageExtensions.includes(extension)) {
				continue;
			}

			if (cleanSrc.startsWith('data:')) {
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
			} catch {
				// 忽略错误
			}
		}

		const imgRegex = /<img src="([^"]+)"(?: alt="([^"]*)")?(?: title="([^"]*)")?\s*\/?>/g;
		
		const imgMatches: { full: string; src: string; alt: string; index: number }[] = [];
		let match;
		
		while ((match = imgRegex.exec(html)) !== null) {
			imgMatches.push({
				full: match[0],
				src: match[1],
				alt: match[2] || '',
				index: match.index
			});
		}

		const replacements: { start: number; end: number; replacement: string }[] = [];

		for (const img of imgMatches) {
			if (img.src.startsWith('data:')) {
				continue;
			}

			try {
				let dataUrl: string | null = null;

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
			} catch {
				// 忽略错误
			}
		}

		if (replacements.length > 0) {
			replacements.sort((a, b) => b.start - a.start);
			for (const rep of replacements) {
				processedHtml = processedHtml.substring(0, rep.start) + rep.replacement + processedHtml.substring(rep.end);
			}
		}

		const embedRegex = /<span[^>]*class="[^"]*internal-embed[^"]*"[^>]*>[\s\S]*?<\/span>/g;
		const embedMatches: { full: string; src?: string; alt?: string; index: number }[] = [];
		
		const matches = Array.from(processedHtml.matchAll(embedRegex));
		for (const match of matches) {
			const fullMatch = match[0];
			const srcMatch = fullMatch.match(/src="([^"]+)"/);
			const altMatch = fullMatch.match(/alt="([^"]+)"/);
			
			if (srcMatch) {
				embedMatches.push({
					full: fullMatch,
					src: srcMatch[1],
					alt: altMatch ? altMatch[1] : '',
					index: match.index
				});
			}
		}

		const embedReplacements: { start: number; end: number; replacement: string }[] = [];

		for (const embed of embedMatches) {
			if (embed.src && !embed.src.startsWith('data:')) {
				try {
					let dataUrl: string | null = null;

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
						const newImgTag = `<img src="${dataUrl}" alt="${embed.alt || ''}" />`;
						embedReplacements.push({
							start: embed.index,
							end: embed.index + embed.full.length,
							replacement: newImgTag
						});
					}
				} catch {
					// 忽略错误
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

	/**
	 * 获取图片的 base64 编码
	 * @param src 图片源
	 * @param file 源文件
	 * @returns base64 编码和图片扩展名，失败返回 null
	 */
	async getImageBase64(src: string, file: TFile): Promise<{ base64: string; extension: string } | null> {
		if (src.startsWith('data:')) {
			return null;
		}

		const decodedSrc = decodeURIComponent(src);
		const cleanSrc = decodedSrc.split('?')[0].split('#')[0];
		
		let imageFile: TFile | null = null;
		
		imageFile = this.app.metadataCache.getFirstLinkpathDest(cleanSrc, file.path);
		
		if (!imageFile) {
			imageFile = this.app.metadataCache.getFirstLinkpathDest(src, file.path);
		}

		if (!imageFile) {
			const path = (window as unknown as { require: (module: string) => unknown }).require('path') as { join: (...args: string[]) => string; dirname: (path: string) => string; normalize: (path: string) => string };
			const fileDir = path.dirname(file.path);
			const resolvedPath = path.normalize(path.join(fileDir, cleanSrc));
			
			const abstractFile = this.app.vault.getAbstractFileByPath(resolvedPath);
			if (abstractFile instanceof TFile) {
				imageFile = abstractFile;
			}
		}

		if (!imageFile) {
			const abstractFile = this.app.vault.getAbstractFileByPath(cleanSrc);
			if (abstractFile instanceof TFile) {
				imageFile = abstractFile;
			}
		}

		if (!imageFile) {
			return null;
		}

		if (imageFile instanceof TFile && 
			['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp'].includes(imageFile.extension.toLowerCase())) {
			try {
				const buffer = await this.app.vault.readBinary(imageFile);
				const base64 = this.arrayBufferToBase64(buffer);
				return { base64, extension: imageFile.extension };
			} catch {
				return null;
			}
		}

		return null;
	}

	/**
	 * 将 ArrayBuffer 转换为 base64 编码
	 * @param buffer ArrayBuffer 数据
	 * @returns base64 编码字符串
	 */
	arrayBufferToBase64(buffer: ArrayBuffer): string {
		const bytes = new Uint8Array(buffer);
		let base64 = '';
		const chunkSize = 0x8000;
		
		for (let i = 0; i < bytes.length; i += chunkSize) {
			const chunk = bytes.subarray(i, i + chunkSize);
			base64 += String.fromCharCode.apply(null, chunk as unknown as number[]);
		}
		
		return btoa(base64);
	}

	/**
	 * 获取 MIME 类型
	 * @param extension 文件扩展名
	 * @returns MIME 类型
	 */
	getMimeType(extension: string): string {
		const mimeTypes: { [key: string]: string } = {
			'png': 'image/png',
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'gif': 'image/gif',
			'svg': 'image/svg+xml',
			'webp': 'image/webp'
		};
		return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
	}
}

/**
 * 插件设置面板类
 */
class ExportHTMLSettingTab extends PluginSettingTab {
	plugin: ExportHTMLPlugin;

	constructor(app: App, plugin: ExportHTMLPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName(this.plugin.translate('Auto-open folder after export'))
			.setDesc(this.plugin.translate('Automatically open the folder containing the exported HTML file after successful export'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoOpenFolder)
				.onChange(async (value) => {
					this.plugin.settings.autoOpenFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
