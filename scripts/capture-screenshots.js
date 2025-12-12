
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function captureScreenshots() {
    console.log('Starting dev server and capturing screenshots...');
    
    // Ensure docs/screenshots exists
    const screenshotDir = path.join(__dirname, '..', 'docs', 'screenshots');
    if (!fs.existsSync(screenshotDir)){
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Start server
    const server = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
    });

    const serverUrl = 'http://localhost:5173';
    console.log(`Assuming server at ${serverUrl}`);

    // Wait a bit for server to start
    await delay(5000);

    let browser;
    try {
        console.log('Launching browser...');
        // Use 'new' headless mode or just true. 
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: { width: 1920, height: 1080 }
        });
        
        const page = await browser.newPage();
        
        // 1. Home Page
        console.log('Capturing Home Page...');
        try {
            await page.goto(serverUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        } catch (e) {
            console.log('Initial navigation failed, trying again...');
            await page.goto(serverUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        }
        await delay(3000); 
        await page.screenshot({ path: path.join(screenshotDir, 'home.png') });
        console.log('Home Page captured.');

        // 2. Verify Page
        console.log('Capturing Verify Page...');
        await page.goto(`${serverUrl}/verify`, { waitUntil: 'networkidle2' });
        await delay(2000);
        await page.screenshot({ path: path.join(screenshotDir, 'verify.png') });
        console.log('Verify Page captured.');

        // 3. Voting Page
        console.log('Capturing Voting Page...');
        // Enter NID
        await page.type('input[placeholder*="NID"]', '1234567890');
        await page.type('input[placeholder*="mm/dd/yyyy"]', '01/01/1990');
        
        const submitBtn = await page.$('button[type="submit"]');
        if (submitBtn) {
             await submitBtn.click();
             await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => delay(3000));
             await delay(3000); 
             await page.screenshot({ path: path.join(screenshotDir, 'vote.png') });
             console.log('Voting Page captured.');
        } else {
            console.log('Submit button not found');
        }

        // 4. Result Page
        console.log('Capturing Result Page...');
        await delay(2000); // ensure elements loaded
        // Select candidate
        // The class name might be dynamic, let's try selector by text or partial
        const candidates = await page.$$('.group.relative');
        if (candidates.length > 0) {
            await candidates[0].click();
            await delay(1000);
            
            // Click Confirm
            const buttons = await page.$$('button');
            let confirmBtn = null;
            for (const b of buttons) {
                const text = await page.evaluate(el => el.textContent, b);
                if (text && text.includes('Confirm Vote')) {
                    confirmBtn = b;
                    break;
                }
            }

            if (confirmBtn) {
                await confirmBtn.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => delay(3000));
                await delay(3000);
                await page.screenshot({ path: path.join(screenshotDir, 'result.png') });
                console.log('Result Page captured.');
            } else {
                console.log('Confirm button not found');
            }
        } else {
            console.log('No candidates found');
        }

    } catch (error) {
        console.error('Error during capture:', error);
    } finally {
        if (browser) await browser.close();
        if (process.platform === "win32") {
             spawn("taskkill", ["/pid", server.pid, '/f', '/t']);
        } else {
            server.kill();
        }
        console.log('Done.');
        process.exit(0);
    }
}

captureScreenshots();
