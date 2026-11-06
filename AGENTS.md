# 项目说明

Obsidian 插件：将 Markdown 笔记导出为单文件离线 HTML（main.ts + template-v2.ts + template-v3.ts，esbuild 打包）。

## 分发文件夹同步（每次修改后必须执行）

`my-export-html\` 是实际的插件分发文件夹（Obsidian 从这里加载插件），根目录的 `main.js` 只是构建产物且已被 gitignore。

**每次修改代码并重新构建后，必须把新产物同步过去：**

```powershell
# 1. 构建（先重新生成 KaTeX base64 常量与 v3 样式常量，再打包）
node scripts/generate-katex-constants.js
node scripts/generate-v3-css.js
npx esbuild main.ts --bundle --external:obsidian --format=cjs --outfile=main.js

# 2. 同步到分发文件夹
Copy-Item main.js my-export-html\main.js -Force
```

漏同步的后果：Obsidian 里跑的仍是旧版插件，用户会以为修改没生效。

## 发布 tag 规范

Obsidian 社区插件要求版本 tag 是**纯数字不带 `v` 前缀**，如 `1.1.1`（不是 `v1.1.1`）。发布新版本时对当前 master 直接 `git tag <版本号>` 并推送到 GitHub 远端。

注意：
- `generate-katex-constants.js` 与 `generate-v3-css.js` 失败都会 `exit(1)` 直接中断 `npm run build`，不会自动跳过。缺 `node_modules\katex` 或 `styles\v3\` 时需手动分步执行：先跑 esbuild（跳过生成脚本），构建仍会成功
- 跳过的后果：导出内嵌的是已提交的 `katex-constants.ts` / `template-v3-css.ts` 里的旧版常量。只有当 package.json 升级过 katex、或 `styles/v3/` 更新过而未重新生成常量时才是真问题（新语法/新样式渲染不出来）；只是本地缺依赖则完全无影响
- `styles/v3/*.css` 是 v3 模板离线内联的样式来源，改了它必须重新跑 `generate-v3-css.js` 并重新构建同步
