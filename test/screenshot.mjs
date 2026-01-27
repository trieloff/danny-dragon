import puppeteer from 'puppeteer-core';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

function findChrome() {
  const paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  for (const p of paths) {
    try {
      execSync(`test -f "${p}"`, { stdio: 'ignore' });
      return p;
    } catch { /* next */ }
  }
  throw new Error('Chrome/Chromium not found. Set CHROME_PATH env variable.');
}

const CHROME_PATH = process.env.CHROME_PATH || findChrome();
const FILE_URL = `file://${resolve('implementation/index.html')}`;
const OUTPUT = process.argv[2] || 'screenshot.png';

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(FILE_URL, { waitUntil: 'networkidle0' });

// Wait a moment for animations to settle
await new Promise(r => setTimeout(r, 1000));

await page.screenshot({ path: OUTPUT, fullPage: true });
console.log(`Screenshot saved to ${OUTPUT}`);

await browser.close();
