const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER EXCEPTION:', error.message));
  page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  await browser.close();
  console.log("Done");
})();
