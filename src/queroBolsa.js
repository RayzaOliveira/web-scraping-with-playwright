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
  await page.goto("https://querobolsa.com.br/");
  // Pause for 10 seconds, to see what's going on.
  await page.waitForTimeout(3000);

  await page.fill(
    "css=input[placeholder='Digite o curso']",
    "Engenharia de Software"
  );

  await page.waitForTimeout(2000);

  await page.click("css=ul >> text=Engenharia de Software");

  await page.waitForTimeout(2000);

  await page.click("css=button >> text=Buscar");

  await page.waitForTimeout(5000);

  const links = await page.$$eval(
    "div.z-card.offer-search-card.z-card--small",
    (cards) => {
      return cards.map((card) => {
        const url = card
          .querySelector("div.grouped-item-card-cta a")
          .getAttribute("href");

        const name = card.querySelector(
          "h3.z-title.offer-search-card-course-info__title.z-title--small.z-title--major a"
        ).textContent;

        return {
          url,
          name,
        };
      });
    }
  );

  await page.goto(`https://querobolsa.com.br${links[0].url}`);

  await page.waitForTimeout(10000);

  const [courseDetail] = await page.$$eval(
    "div.pdp-spotlight.pdp__spotlight section.ui-spotlight__main-content-wrapper",
    (headersElement) => {
      return headersElement.map((headerSection) => {
        const nameCourse = headerSection.querySelector("header h1.z-title")
          .textContent;
        const typeCourse = headerSection.querySelector("header span.z-text")
          .textContent;
        const address = headerSection.querySelector(
          "p.z-text.pdp-campus-selector__campus-full-address.show-md.z-text--small.z-text--left span"
        ).textContent;

        return {
          nameCourse,
          typeCourse,
          address,
        };
      });
    }
  );

  const checkoutDetail = await page.$$eval(
    "aside div.offer-card-sidebar-header__normal-offer-price-details",
    (items) => {
      return items.map((cardCheckout) => {
        const priceElement = cardCheckout.querySelector(
          "div.offer-card-sidebar-header__prices"
        );

        const oldPrice = priceElement.querySelector("span.z-text");
        const currentPrice = priceElement.querySelector("strong.z-title");

        return {
          oldPrice,
          currentPrice,
        };
      });
    }
  );

  console.log("courseDetail::", courseDetail);
  console.log("checkoutDetail::", checkoutDetail);

  await page.waitForTimeout(5000);
  // Turn off the browser to clean up after ourselves.
  await browser.close();
}

main();
