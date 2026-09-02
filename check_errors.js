const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    const pages = ['curriculum.html', 'training.html', 'exam.html'];
    
    for (const p of pages) {
        console.log(`\n--- Loading ${p} ---`);
        await page.goto(`file://${__dirname.replace(/\\/g, '/')}/${p}`, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 1000));
    }
    
    await browser.close();
})();
