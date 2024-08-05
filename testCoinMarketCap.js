const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1040, height: 768 });
  await page.goto('https://coinmarketcap.com/currencies/hive-blockchain/');
  
   // Warten, bis das Element geladen ist
  const buttonSelector = '//div[@id="section-coin-chart"]/div/div/div/div/div/div[2]/div[2]/div/div/ul/li[2]/div/div/h5';
  await page.waitForSelector(`xpath=${buttonSelector}`);

  // Auf den Knopf klicken
  await page.click(`xpath=${buttonSelector}`);

  // Warten Sie einen Moment, damit die Seite auf den Klick reagieren kann
  await page.waitForTimeout(2000);

 // Warten auf den Cookie-Button und klicken
 try {
  await page.waitForSelector('text="Accept Cookies & Continue"', { timeout: 5000 });
  await page.click('text="Accept Cookies & Continue"');
  console.log('Cookie-Banner akzeptiert');
} catch (error) {
  console.log('Cookie-Banner nicht gefunden oder konnte nicht geklickt werden');
}
  // Warten Sie einen Moment, damit die Seite auf den Klick reagieren kann
  await page.waitForTimeout(1000);
  
  // Screenshot des Bereichs mit Beschneidung auf 768 Pixel Höhe
  const section = await page.locator('.main-content');
  const boundingBox = await section.boundingBox();
  
  await page.screenshot({ 
    path: `screenshots_${new Date().toISOString().slice(0, 10)}/Token/coinMarketCapChart.png`,
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: Math.min(768, boundingBox.height)
    }
  });

  await browser.close();
  console.log('Screenshot erstellt und auf 768 Pixel Höhe beschnitten');
})();
