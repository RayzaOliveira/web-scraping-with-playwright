// raspagem no site buscaPe
const playwright = require("playwright");

async function scrapingBuscaPe() {
  const browser = await playwright.chromium.launch({
    headless: true,
  });

  // Abre uma página
  const page = await browser.newPage();

  // Aborta o acesso a rotas com base na extensao para melhorar a performance
  // await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

  // Parametro de busca
  const query = `q=smartphone`;

  // Url page
  await page.goto(`https://www.buscape.com.br/search?${query}`);

  // Aguarda a finalização de todas as requests para continuar
  await page.waitForLoadState("networkidle");

  // Lista todos os cards de produtos
  const cardProducts = await page.$$eval("div.card.card--prod", (cards) => {
    return cards.map((card) => {
      const id = card.getAttribute("data-id").replace("product", "");
      const urlImg = card.querySelector("img.image").getAttribute("src");
      const urlProductDetail = card
        .querySelector("a.cardImage")
        .getAttribute("href");
      const name = card.querySelector("a.name").textContent;

      const info = card.querySelector("div.cardInfo");

      const available = !info.querySelector("strong.unavailableWarning");

      let price = undefined;

      if (available) {
        price = info.querySelector("a.price").textContent;
      }

      return {
        id,
        urlImg,
        urlProductDetail,
        name,
        available,
        price,
      };
    });
  });

  console.log("cardProducts:::", cardProducts);

  await browser.close();
}

module.exports = scrapingBuscaPe;

// Observações:
// 1 - Pegar o link de um curso e ver quantos dados você consegue extrair
// 2 - Pegar os dados dos N primeiros cursos que aparecem quando a gente coloca uma busca

// page.waitForLoadState('networkidle'), aguarda que nao tenha mais requisicoes sendo feitas para continuar
// page.$$eval(), extrair dados de uma página do navegador
// card.querySelector('img.image').getAttribute('src') pega o atributo src da tag img com a class image
