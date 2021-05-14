const scrapingBuscaPe = require("./buscaPe");
const scrapingQueroBolsa = require("./queroBolsa");

async function main() {
  console.log(
    "---------------------STARTING SCRAP OF THE BUSCAPE------------------------"
  );

  await scrapingBuscaPe();

  console.log(
    "---------------------FINISH SCRAP OF THE BUSCAPE--------------------------"
  );
  console.log("\n\n");
  console.log(
    "---------------------STARTING SCRAP OF THE QUERO BOLSA--------------------"
  );

  await scrapingQueroBolsa();

  console.log(
    "---------------------FINISH SCRAP OF THE QUERO BOLSA----------------------"
  );
}

main();
