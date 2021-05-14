// raspagem no site querobolsa para futuramente utilizar -> teste e2e
const playwright = require("playwright");

async function scrapingQueroBolsa() {
  const browser = await playwright.chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://querobolsa.com.br/");

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

  // Dados do curso: URL, nome do curso, nome da faculdade e Logo da faculdade
  const links = await page.$$eval(
    "div.z-card.offer-search-card.z-card--small",
    (cards) => {
      return cards.map((card) => {
        const url = card.querySelector("div.grouped-item-card-cta a");
        const name = card.querySelector(
          "h3.z-title.offer-search-card-course-info__title.z-title--small.z-title--major a"
        );

        const universityName = card.querySelector(
          "h2.z-title.offer-search-card-course-info__university-title.z-title--minor"
        );

        const universityLogo = card.querySelector(
          "img.offer-search-card-course-info__university-logo-img"
        );

        return {
          url: url && url.getAttribute("href"),
          name: name && name.textContent,
          universityName: universityName && universityName.textContent,
          universityLogo: universityLogo && universityLogo.getAttribute("src"),
        };
      });
    }
  );

  console.log("Links", links);

  // Direcionamento para outras páginas
  //  para uma futura evolução do projeto: pode-se pegar os dados de cada link da lista
  await page.goto(
    `https://querobolsa.com.br${links && links[0] && links[0].url}`
  );

  await page.waitForLoadState("networkidle");

  // Dados do curso: Modalidade do curso e endereço
  const [courseDetail] = await page.$$eval(
    "div.pdp-spotlight.pdp__spotlight section.ui-spotlight__main-content-wrapper",
    (headersElement) => {
      return headersElement.map((headerSection) => {
        const typeCourse = headerSection.querySelector("header span.z-text");
        const address = headerSection.querySelector(
          "p.z-text.pdp-campus-selector__campus-full-address.show-md.z-text--small.z-text--left span"
        );

        return {
          typeCourse: typeCourse && typeCourse.textContent,
          address: address && address.textContent,
        };
      });
    }
  );

  console.log("courseDetail::", courseDetail);

  await browser.close();
}

module.exports = scrapingQueroBolsa;

// Observações:
// 1 - Pegar o link de um curso e ver quantos dados você consegue extrair
// 2 - Pegar os dados dos N primeiros cursos que aparecem quando a gente coloca uma busca

// page.click(), para emular cliques do mouse
// page.waitForFunction(), esperar que as coisas aconteçam
// page.$$eval(), extrair dados de uma página do navegador
