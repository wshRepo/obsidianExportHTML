# My Export To HTML

English | [中文](README.md)

Export Obsidian notes to a single HTML file. Images, KaTeX formulas and styles are all embedded, so the result works offline and can be shared or archived as-is.

![version](https://img.shields.io/badge/version-1.1.1-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![obsidian](https://img.shields.io/badge/obsidian-0.15.0+-purple)

## Features

- Two export templates, switchable in settings:
  - v1 Classic: identical to the previous look
  - v2 Refreshed: light/dark theme (follows the system by default, toggle button in the top-right corner persists your choice), mobile-friendly layout (table of contents becomes a drawer on narrow screens), full-width content, wide tables scroll horizontally instead of squeezing columns
- Auto-generated nested table of contents, highlights the current section while scrolling, width adjustable by dragging (200–600px)
- Code blocks with line numbers and a copy button
- Images and formulas embedded as Base64 — the export is a fully self-contained single file
- Optional: open the containing folder after export
- UI language follows English or Chinese automatically

## Installation

In Obsidian: Settings → Community plugins → Browse, search for **My Export To HTML**, then install and enable it.

For a manual install, clone and build this repo, then copy `my-export-html/` into your vault's `.obsidian/plugins/` directory.

## Usage

- Right-click a Markdown file in the file explorer → "Export to HTML..."
- Or open the command palette with `Ctrl/Cmd + P` and search for `Export to HTML`

The default save location is the note's own folder; you can change it in the save dialog.

## Preview

- [v2 template demo](demo/demo-v2.html) (use your browser's device toolbar to see the mobile layout)
- [v1 template demo](demo/demo.html)
- Demo source: [demo/demo.md](demo/demo.md)

## Development

Requires Node.js ≥ 16.

```bash
npm install
npm run build    # generate KaTeX constants and bundle to main.js
npm run dev      # watch mode
npm run lint
```

After building, copy `main.js` from the repo root into `my-export-html/`. That directory is the actual installable plugin, and there is no automatic sync — if you forget, your changes won't take effect (see [AGENTS.md](AGENTS.md)).

The first step of `npm run build` needs `node_modules/katex`; if it's missing the build stops. In that case you can run esbuild on its own — `katex-constants.ts` is committed, so formula rendering still works, just with the already-generated KaTeX version.

Source layout:

```
main.ts                # plugin logic: export pipeline, shared utilities, settings
template-v2.ts         # v2 template styles and shell
katex-constants.ts     # generated, do not edit by hand
my-export-html/        # installable plugin directory
AGENTS.md              # collaboration rules (build sync, release conventions)
```

The main conversion chain lives in `convertMarkdownToHTML()` in `main.ts`: math placeholder protection → Markdown rendering → TOC generation → images to Base64 → code block wrapping → pick the v1 or v2 shell based on `templateVersion`. Everything except the shell is shared between the two templates.

## License

[MIT](LICENSE) © wshRepo
