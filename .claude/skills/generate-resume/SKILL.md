---
name: generate-resume
description: Inject a resume JSON into the running ResGen 2.0 app and save the rendered PDF to disk (Desktop by default). Use whenever asked to generate/render/export a resume from data, or to download a resume as a PDF file rather than just viewing it in the app.
---

# Generating a resume PDF

This skill drives the real app end-to-end: it uploads a resume JSON
through the app's actual "Upload JSON" feature, opens its PDF
preview, and grabs the rendered PDF straight out of the page — no
manual clicking required.

It builds on [run-app](../run-app/SKILL.md): both skills share one
Chrome launcher (`../run-app/browser.mjs`) and one `puppeteer-core`
install, so **run `npm install` in `.claude/skills/run-app/` first**
if you haven't already (this skill has no `node_modules` of its own).

## 1. Prerequisites

```bash
cd .claude/skills/run-app && npm install   # once
npm run dev > /tmp/res-gen-2-dev.log &     # from repo root
until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done
```

## 2. Generate

```bash
node .claude/skills/generate-resume/generate.mjs
```

With no args this uses the bundled `sample-resume.json` and saves to
`~/Desktop/<YY-MM-DD>-<slugified-name>.pdf` — the same filename
format the app itself computes (`src/context/app-context.tsx`'s
`title` memo).

To use your own data:

```bash
node .claude/skills/generate-resume/generate.mjs --json /path/to/resume.json
node .claude/skills/generate-resume/generate.mjs --json /path/to/resume.json --out ~/Desktop/custom-name.pdf
```

## Resume JSON schema

The app's real state shape (`items` + `layouts`), the same format its
own "Upload JSON" / "Download JSON" buttons read and write
(`src/utils/localstorage-util.ts`'s `LocalStorageData`). All items in
a one-page resume share one `layoutId` pointing at a `SINGLE` entry in
`layouts`. See `sample-resume.json` for a full worked example.
`contentType` is one of `CONTACT | HEADER | PARAGRAPH | EXPERIENCE |
ANY_LIST` (`src/constants.ts`); each has a different `content` shape:

- `CONTACT`: `{ name, title, phone, location, email, github, linkedin, website }`
- `HEADER`: `{ header }`
- `PARAGRAPH`: `{ paragraph }`
- `EXPERIENCE`: `{ company, location, title, dates, tags: string[], descriptions: string[] }`
- `ANY_LIST`: `{ [groupLabel: string]: string[] }` — an arbitrary set of labeled bullet lists

## How the PDF is actually captured

There is **no working "Download PDF" button** in the app — the File
menu's entry is a `(Coming Soon)` placeholder
(`src/components/control-panel/control-panel-file-menu.tsx`). The
"Open PDF View" action (View menu) renders the resume with
`@react-pdf/renderer`'s `<PDFViewer>`, which produces a `Blob` and
points an `<iframe>` at `URL.createObjectURL(blob)` — the PDF only
ever exists as an in-page blob, rendered by the browser's native PDF
viewer inside that iframe (not app-controlled DOM, so not reliably
clickable via automation).

Instead of clicking anything PDF-viewer-chrome-related, `generate.mjs`
reads the iframe's `src` (the blob URL) and does an in-page
`fetch(blobUrl)` to pull the raw bytes back into Node, then writes
them to disk. This is more reliable than driving the native viewer
and doesn't depend on browser download-prompt handling at all.

## Gotchas

- **The File/View dropdowns only mount their children when open.**
  `BaseMenu` (`src/components/control-panel/control-panel-base-menu.tsx`)
  conditionally renders its contents — including the hidden
  `#res-gen-file-input` — only while `isMenuOpen`. You must click
  "File" open before the upload input exists in the DOM.
- **Wait for content, not a fixed delay, before opening the PDF
  view.** `generate.mjs` waits for the injected contact name to
  appear in the page text rather than sleeping a fixed amount.
- **The PDF render is async and queued.** `<PDFViewer>` renders via a
  queue and only sets the iframe `src` once the blob is ready — poll
  for `iframe.src` starting with `blob:` rather than assuming it's
  set immediately after clicking "Open PDF View".
