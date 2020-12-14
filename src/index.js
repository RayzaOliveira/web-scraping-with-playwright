// Import the playwright library into our scraper.
const playwright = require("playwright");

async function main() {
  // Open a Chromium browser. We use headless: false
  // to be able to watch what's going on.
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  // Open a new page / tab in the browser.
  const page = await browser.newPage();
  // Tell the tab to navigate to the JavaScript topic page.
  await page.goto("https://github.com/topics/javascript");
  // Pause for 10 seconds, to see what's going on.
  await page.waitForTimeout(10000);
  // Turn off the browser to clean up after ourselves.
  await browser.close();
}

main();
