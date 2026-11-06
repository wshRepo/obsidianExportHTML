/**
 * Markdown 文本处理的纯函数
 *
 * 单独成模块的原因：这些逻辑与 Obsidian 运行时无关，
 * 抽出来既能让 main.ts 保持精简，也能脱离 Obsidian 直接单测（见 scripts 下的验证方式）。
 */

/** Markdown 被切成的片段 */
export interface MarkdownSegment {
	/** 是否为代码区域（围栏代码块或行内代码） */
	code: boolean;
	/** 原文片段，按顺序拼接可无损还原输入 */
	text: string;
}

/**
 * 围栏代码块：``` 或 ~~~ 开头，到同种、同长（或更长）的围栏结束
 * 行内代码：成对反引号，内容不允许跨行、不允许再出现反引号
 *
 * 为什么不用更完整的 CommonMark 解析：这里只需要「哪些字符是字面量」，
 * 围栏 + 行内两种已经覆盖 Obsidian 笔记里几乎全部写法；
 * 四空格缩进代码块与段落的边界在列表/引用里无法只靠行首缩进判定，硬猜反而会误伤正文。
 */
const CODE_PATTERN = /^[ \t]*(`{3,}|~{3,})[^\r\n]*\r?\n[\s\S]*?(?:^[ \t]*\1[ \t]*\r?$)|(`+)(?![ \r\n])[^\r\n]*?\2/gm;

/**
 * 按「代码 / 非代码」切分 Markdown
 *
 * 用途：公式占位符这类「把符号当语法」的正则，绝不能作用在代码字面量上，
 * 否则 JS 模板字符串里的 `${name}` 会被成对的 `$` 吃掉，渲染成乱码。
 * @param markdown 原始 Markdown
 * @returns 片段列表，依次拼接即可还原原文
 */
export function splitByCode(markdown: string): MarkdownSegment[] {
	const segments: MarkdownSegment[] = [];
	const pattern = new RegExp(CODE_PATTERN.source, CODE_PATTERN.flags);
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(markdown)) !== null) {
		// 零宽匹配会让 exec 原地打转，这里强制前进
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

/**
 * 只取非代码部分拼接而成的文本
 * @param markdown 原始 Markdown
 * @returns 不含任何代码字面量的文本
 */
export function stripCode(markdown: string): string {
	return splitByCode(markdown)
		.filter((segment) => !segment.code)
		.map((segment) => segment.text)
		.join('');
}

/**
 * 在单个非代码片段上做公式占位符替换
 *
 * 占位符本身不含 `$`，因此后续规则不会误伤已产生的占位符；
 * 收集进 placeholders 的原文供渲染阶段还原。
 * @param text 非代码 Markdown 片段
 * @param placeholders 按出现顺序收集占位符原文
 * @returns 替换后的片段
 */
export function applyMathPlaceholders(text: string, placeholders: string[]): string {
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
