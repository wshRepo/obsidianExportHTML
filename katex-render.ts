/**
 * KaTeX 注入片段
 *
 * 从 main.ts 中抽出：插件导出与 demo 生成脚本都需要同一份公式注入逻辑，
 * 两处各写一遍必然漂移，所以收敛到这一个模块。
 * 依赖的 base64 常量由 scripts/generate-katex-constants.js 生成。
 */
import { KATEX_JS_BASE64, KATEX_CSS_BASE64 } from './katex-constants';

/**
 * 生成 KaTeX 样式 <style> 片段
 * @returns 可直接放进 <head> 的样式串
 */
export function buildKatexCss(): string {
	// 常量里的 @font-face 已被生成脚本剔除，公式字体走系统等宽字体
	return `<style>${atob(KATEX_CSS_BASE64)}</style>`;
}

/**
 * 生成 KaTeX 脚本片段：先内联 katex.js，再把占位元素渲染成公式
 * @returns 可直接放在 </body> 前的脚本串
 */
export function buildKatexScript(): string {
	return `
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
</script>`;
}
