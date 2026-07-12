// Injects a resume JSON (items + layouts, see ../generate-resume/SKILL.md
// for the schema) into the running res-gen-2 app via its real "Upload
// JSON" file input, opens the app's PDF preview, and saves the rendered
// PDF to disk (Desktop by default).
//
// Requires: `npm run dev` running at the repo root (localhost:3000), and
// `npm install` run once in ../run-app (this script borrows its Chrome
// launcher + puppeteer-core install rather than duplicating them).
//
// Usage:
//   node generate.mjs [--json <path>] [--out <path>]
//   node generate.mjs                          # uses sample-resume.json -> ~/Desktop/<date>-<name>.pdf
//   node generate.mjs --json my-resume.json
//   node generate.mjs --json my-resume.json --out ~/Desktop/custom-name.pdf
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { launchBrowser } from '../run-app/browser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function arg(name) {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

// Mirrors src/utils/string-transform-util.ts so generated filenames match
// what the app itself would name a manual download.
function toYearMonthDayFormat(date = new Date()) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toSlugCase(value) {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function main() {
  const jsonPath = path.resolve(arg('--json') || path.join(__dirname, 'sample-resume.json'));
  const resumeData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const contact = resumeData.items?.find((item) => item.contentType === 'CONTACT');
  const defaultName = `${toYearMonthDayFormat()}-${contact ? toSlugCase(contact.content.name) : 'your-name'}.pdf`;
  const outPath = path.resolve(arg('--out') || path.join(os.homedir(), 'Desktop', defaultName));

  const { browser, page, consoleErrors } = await launchBrowser();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Open the "File" menu (BaseMenu only mounts its children, including the
  // hidden file input, once open) and upload the resume JSON.
  const fileMenu = await page.waitForSelector('xpath/.//div[contains(@class,"base-menu") and text()="File"]');
  await fileMenu.click();
  const fileInput = await page.waitForSelector('#res-gen-file-input');
  await fileInput.uploadFile(jsonPath);

  // Wait for the injected data to actually render, not just a fixed delay.
  if (contact?.content?.name) {
    await page.waitForFunction(
      (name) => document.body.innerText.includes(name),
      { timeout: 10000 },
      contact.content.name,
    );
  } else {
    await new Promise((r) => setTimeout(r, 500));
  }

  // Close the File menu, then open View -> "Open PDF View".
  await page.keyboard.press('Escape');
  const viewMenu = await page.waitForSelector('xpath/.//div[contains(@class,"base-menu") and text()="View"]');
  await viewMenu.click();
  const openPdfButton = await page.waitForSelector('xpath/.//button[contains(text(),"Open PDF View")]');
  await openPdfButton.click();

  // react-pdf renders the document into a Blob and points an <iframe> at
  // URL.createObjectURL(blob) — there is no working "Download PDF" button
  // in the UI (it's a "(Coming Soon)" placeholder), so fetch the blob
  // directly from the page's JS context instead of driving the browser's
  // native PDF viewer chrome.
  await page.waitForFunction(
    () => {
      const el = document.querySelector('iframe');
      return Boolean(el?.src?.startsWith('blob:'));
    },
    { timeout: 20000 },
  );

  const blobUrl = await page.evaluate(() => document.querySelector('iframe').src.split('#')[0]);
  const base64 = await page.evaluate(async (url) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    let binary = '';
    for (const byte of new Uint8Array(buf)) binary += String.fromCharCode(byte);
    return btoa(binary);
  }, blobUrl);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));

  console.log('Saved PDF to:', outPath);
  console.log('Console errors:', consoleErrors.length ? consoleErrors : 'none');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
