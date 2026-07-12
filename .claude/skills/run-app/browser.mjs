// Shared CDP launcher for res-gen-2 skills: launches the system-installed
// Chrome via puppeteer-core (no bundled browser download) and returns a
// ready page pointed at the local dev server. Other skills (e.g.
// generate-resume) import this instead of re-installing puppeteer-core.
import puppeteer from 'puppeteer-core';

const CHROME_PATH =
  process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : process.env.CHROME_PATH || '/usr/bin/google-chrome';

export async function launchBrowser() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1280,800'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  return { browser, page, consoleErrors };
}
