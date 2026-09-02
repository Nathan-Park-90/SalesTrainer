const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Catch console errors and page errors
    page.on('console', msg => {
        if (msg.type() === 'error') console.error('BROWSER CONSOLE ERROR:', msg.text());
    });
    page.on('pageerror', err => {
        console.error('BROWSER EXCEPTION:', err.toString());
    });

    try {
        await page.goto('file://C:/Users/Nate/Desktop/Code/SalesTrainer/index.html', { waitUntil: 'networkidle0' });
        
        console.log("Page loaded. Testing routing...");
        
        // 1. Test Navigation Routing
        const navLinks = ['#lessons', '#core-knowledge', '#architecture', '#scenarios', '#exam', '#threats'];
        for (const link of navLinks) {
            await page.evaluate(l => document.querySelector(`a[href="${l}"]`).click(), link);
            // verify that the corresponding section is active
            const sectionId = link.substring(1);
            const isActive = await page.$eval(`#${sectionId}`, el => el.classList.contains('view-active'));
            if (!isActive) throw new Error(`Routing to ${link} failed. Section is not active.`);
        }
        console.log("Routing tests passed.");

        // 2. Test Curriculum (Course Engine) Navigation
        await page.evaluate(() => document.querySelector('a[href="#lessons"]').click());
        console.log("Testing Course Engine Next/Prev buttons...");
        
        for (let i = 0; i < 3; i++) {
            const clicked = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button.nav-btn'));
                const next = btns.find(b => b.innerText.includes('Next'));
                if(next) { next.click(); return true; }
                return false;
            });
            if (!clicked) throw new Error("Could not find/click Next button in Curriculum.");
        }
        console.log("Course Engine tests passed.");

        // 3. Test Flashcards Engine
        console.log("Testing Flashcards...");
        await page.evaluate(() => document.querySelector('a[href="#core-knowledge"]').click());
        const clickedReveal = await page.evaluate(() => {
            const btn = document.querySelector('.flashcard');
            if(btn) { btn.click(); return true; }
            return false;
        });
        if (!clickedReveal) throw new Error("Could not find/click Reveal button on Flashcard.");
        
        const clickedGood = await page.evaluate(() => {
            const btn = document.querySelector('.btn-good');
            if(btn) { btn.click(); return true; }
            return false;
        });
        if (!clickedGood) throw new Error("Could not find/click 'Good' button on Flashcard after revealing.");
        console.log("Flashcards Engine tests passed.");

        // 4. Test Exam Simulator
        console.log("Testing Exam Simulator...");
        await page.evaluate(() => document.querySelector('a[href="#exam"]').click());
        const examStarted = await page.evaluate(() => {
            const btn = document.querySelector('#exam-container button');
            if (btn && btn.innerText.includes('Start Exam')) {
                btn.click();
                return true;
            }
            return false;
        });
        if (!examStarted) throw new Error("Could not start exam.");
        console.log("Exam Simulator tests passed.");
        
        console.log("All UI Interactions Passed Successfully.");

    } catch (err) {
        console.error("TEST FAILED:", err);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
