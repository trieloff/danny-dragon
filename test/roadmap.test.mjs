import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

// Detect Chrome/Chromium path
function findChrome() {
  const paths = [
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];

  for (const p of paths) {
    try {
      execSync(`test -f "${p}"`, { stdio: 'ignore' });
      return p;
    } catch {
      // not found, try next
    }
  }
  throw new Error('Chrome/Chromium not found. Set CHROME_PATH env variable.');
}

const CHROME_PATH = process.env.CHROME_PATH || findChrome();
const FILE_URL = `file://${resolve('implementation/index.html')}`;

describe('Roadmap Roulette', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.goto(FILE_URL, { waitUntil: 'networkidle0' });
  });

  after(async () => {
    await browser?.close();
  });

  it('should display five quarter columns', async () => {
    const columns = await page.$$('.quarter-column');
    assert.equal(columns.length, 5);
  });

  it('should display correct quarter headers', async () => {
    const headers = await page.$$eval('.quarter-header', els =>
      els.map(el => el.textContent.trim())
    );
    assert.deepEqual(headers, ['Q1', 'Q2', 'Q3', 'Q4', '🏠 House Reserve']);
  });

  it('should render 8 initiative cards', async () => {
    const cards = await page.$$('.initiative-card');
    assert.equal(cards.length, 8);
  });

  it('should show theme badge and size on each card', async () => {
    const cardBadges = await page.$$eval('.initiative-card', cards =>
      cards.map(card => {
        const badges = card.querySelectorAll('.badge');
        return badges.length;
      })
    );
    // Each card should have exactly 2 badges (theme + size)
    for (const count of cardBadges) {
      assert.equal(count, 2);
    }
  });

  it('should render the balance chart canvas', async () => {
    const canvas = await page.$('#balanceChart');
    assert.ok(canvas, 'Balance chart canvas should exist');
  });

  it('should add a new initiative via the form', async () => {
    await page.type('#initiativeName', 'Test Initiative');
    await page.type('#initiativeDescription', 'A test initiative');
    await page.select('#initiativeTheme', 'growth');
    await page.select('#initiativeSize', 'M');
    await page.select('#initiativeQuarter', 'Q1');
    await page.click('button[type="submit"]');

    const cards = await page.$$('.initiative-card');
    assert.equal(cards.length, 9, 'Should have 9 cards after adding one');
  });

  it('should move initiative between quarters via drag-drop simulation', async () => {
    // Count Q1 cards before
    const q1Before = await page.$$eval(
      '.quarter-column[data-quarter="Q1"] .initiative-card',
      els => els.length
    );

    // Use the moveInitiative JS function directly to simulate a move
    await page.evaluate(() => {
      const q1Cards = document.querySelectorAll(
        '.quarter-column[data-quarter="Q1"] .initiative-card'
      );
      if (q1Cards.length > 0) {
        const id = q1Cards[0].dataset.id;
        moveInitiative(id, 'Q3');
      }
    });

    const q1After = await page.$$eval(
      '.quarter-column[data-quarter="Q1"] .initiative-card',
      els => els.length
    );

    assert.equal(q1After, q1Before - 1, 'Q1 should have one fewer card');
  });
});
