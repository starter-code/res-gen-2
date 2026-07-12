// CDP driver for res-gen-2: drives the local dev server in a real
// (headless) Chrome to prove it's running. Run `npm install` in this
// folder once, then `npm run dev` at the repo root before running this
// script. See browser.mjs for the shared Chrome launcher other skills
// (e.g. generate-resume) also import.
import { launchBrowser } from './browser.mjs';

async function main() {
  const { browser, page, consoleErrors } = await launchBrowser();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot-home.png' });

  // Representative interaction: expand the "Contact" section in the
  // sidebar control panel and confirm its JSON editor renders.
  const contactHeader = await page.waitForSelector(
    'xpath/.//*[contains(text(),"Contact")]',
  );
  await contactHeader.click();
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot-contact-expanded.png' });

  console.log('Title:', await page.title());
  console.log('URL:', page.url());
  console.log('Console errors:', consoleErrors.length ? consoleErrors : 'none');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
