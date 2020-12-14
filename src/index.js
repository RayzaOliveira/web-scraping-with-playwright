// O arquivo /index.js etá sendo usado como modelo para o arquivo /queroBolsa.js

// Importe a biblioteca do dramaturgo para o nosso raspador.
const playwright = require("playwright");

async function main() {
  // Abra um navegador Chromium. Usamos headless: false
  // para poder observar o que está acontecendo.
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  // Abra uma nova página / guia no navegador.
  const page = await browser.newPage();
  // Diga à guia para navegar até a página do tópico JavaScript.
  await page.goto("https://github.com/topics/javascript");
  // Faça uma pausa de 10 segundos para ver o que está acontecendo.
  await page.waitForTimeout(10000);
  // Desligue o navegador para limpar depois de nós mesmos.
  await browser.close();
}

main();

// Observações:
// link: https://blog.apify.com/how-to-scrape-the-web-with-playwright-ece1ced75f73
