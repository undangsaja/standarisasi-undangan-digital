import { chromium } from 'playwright';

const executablePath =
  'C:/Users/salma/AppData/Local/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-win64/chrome-headless-shell.exe';

const base = 'http://127.0.0.1:5173';

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Templates page — red should be first
  await page.goto(`${base}/#templates`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'output/templates-red.png', fullPage: true });
  console.log('templates ok');

  // Select red and open invitation
  await page.goto(`${base}/#invitation`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'output/red-veil.png' });
  console.log('veil ok');

  const openBtn = page.getByRole('button', { name: /Buka Undangan/i });
  await openBtn.click();
  await page.waitForTimeout(2800);
  await page.screenshot({ path: 'output/red-open.png' });
  console.log('open ok');

  // night mode
  const nightBtn = page.getByRole('button', { name: /Mode Malam/i });
  if (await nightBtn.count()) {
    await nightBtn.first().click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'output/red-night.png' });
    console.log('night ok');
  }

  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output/red-countdown.png' });
  console.log('countdown ok');

  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output/red-couple.png' });
  console.log('couple ok');

  await browser.close();
  console.log('all done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
