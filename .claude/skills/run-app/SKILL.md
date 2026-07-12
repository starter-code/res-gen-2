---
name: run-app
description: Launch this Next.js app's dev server locally and drive it in a real (headless) Chrome via CDP to click through the UI and take screenshots. Use whenever asked to run, start, or screenshot ResGen 2.0, or to confirm a change works in the actual app rather than just via tests/typecheck.
---

# Running ResGen 2.0 locally

This is a Next.js 13 (pages dir) app — a resume builder. "Running" it
means starting the dev server and driving it in a real browser, not
just running `tsc` or the test suite.

## 1. Start the dev server

```bash
npm run dev > /tmp/res-gen-2-dev.log &
```

Poll for readiness instead of sleeping (macOS has no `timeout`
builtin — use a bash `until` loop):

```bash
until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done
```

Stop it with `pkill -f "next dev"` before relaunching, or the next
run hits `EADDRINUSE`.

No auth/login is required to reach the app.

## 2. Drive it via CDP

There's no `chromium-cli` or Playwright in this environment, and the
project's Node version (18.0.0) is older than what Playwright/current
Puppeteer expect. The working setup: **`puppeteer-core` pointed at
the system-installed Google Chrome** (`/Applications/Google
Chrome.app/...`) — no browser binary download needed.

One-time setup (installs into this skill folder only, not the app's
own `node_modules`):

```bash
cd .claude/skills/run-app
npm install
```

Then drive the app:

```bash
node .claude/skills/run-app/drive.mjs
```

This launches headless Chrome, navigates to `localhost:3000`,
screenshots the home page, clicks the "Contact" section in the
sidebar control panel (which expands into a JSON editor driving the
live resume preview), screenshots again, and prints console errors.
Screenshots land in `.claude/skills/run-app/` as
`screenshot-*.png` — **look at them**, don't just check exit code.

Adapt `drive.mjs`'s script body for other interactions — same
`page.goto` / `page.waitForSelector` / `.click()` / `page.screenshot()`
pattern.

`browser.mjs` exports the Chrome-launching logic on its own
(`launchBrowser() -> { browser, page, consoleErrors }`) so other
skills can reuse this same install instead of duplicating it — see
[generate-resume](../generate-resume/SKILL.md), which imports it to
drive PDF export.

## Gotchas

- **`require('puppeteer-core')` throws `ERR_REQUIRE_ESM`.** The
  package ships ESM-only. Use `import` in a `.mjs` file (or a
  `"type": "module"` package.json), not `require()`.
- **`npx playwright` / `npm i playwright` will try to download a
  Chromium binary** and may fail given this project's Node version —
  prefer `puppeteer-core` + the existing system Chrome as above.
- The control panel sections (Contact, Header, Paragraph, Experience,
  AnyList) expand on click into raw JSON editors that live-update the
  resume preview pane on the right — that's the primary interaction
  surface for this app.
