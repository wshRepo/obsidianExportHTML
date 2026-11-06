# 项目说明

Obsidian 插件：将 Markdown 笔记导出为单文件离线 HTML（main.ts + template-v2.ts，esbuild 打包）。

## 分发文件夹同步（每次修改后必须执行）

`my-export-html\` 是实际的插件分发文件夹（Obsidian 从这里加载插件），根目录的 `main.js` 只是构建产物且已被 gitignore。

**每次修改代码并重新构建后，必须把新产物同步过去：**

```powershell
# 1. 构建（先重新生成 KaTeX base64 常量，再打包）
node scripts/generate-katex-constants.js
npx esbuild main.ts --bundle --external:obsidian --format=cjs --outfile=main.js

# 2. 同步到分发文件夹
Copy-Item main.js my-export-html\main.js -Force
```

漏同步的后果：Obsidian 里跑的仍是旧版插件，用户会以为修改没生效。

注意：`generated-katex-constants.js` 需要 `node_modules\katex` 存在，缺依赖时跳过它也能构建（`katex-constants.ts` 已提交入库）。
