const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    console.log('\n--- Loading curriculum.html ---');
    await page.goto(`file://${__dirname.replace(/\\/g, '/')}/curriculum.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'curriculum_shot.png' });
    
    console.log('\n--- Loading training.html ---');
    await page.goto(`file://${__dirname.replace(/\\/g, '/')}/training.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'training_shot.png' });
    
    await browser.close();
})();
