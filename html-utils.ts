/**
 * 导出 HTML 的通用后处理工具
 *
 * 与 markdown-utils.ts 分开的原因：那边处理 Markdown 文本，这里处理已渲染的 HTML，
 * 两类逻辑互不依赖，放在一起会让模块职责变模糊。
 */

/**
 * 清理正文里残留的复制按钮
 *
 * Obsidian 的阅读视图会给每个代码块注入 `<button class="copy-code-button">`，
 * 它依赖 Obsidian 自身的运行时逻辑。导出成离线 HTML 后这个按钮还在，
 * 但点击处理器已经失效，表现为「按钮能看见却复制不了」。
 *
 * 各模板现在都由自己的脚本在运行时注入复制按钮，因此渲染前先统一删掉这些残留。
 * @param html 已渲染的正文 HTML
 * @returns 清理后的正文 HTML
 */
export function stripLegacyCopyButtons(html: string): string {
	return html.replace(/<button[^>]*class="[^"]*copy-code-button[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '');
}
