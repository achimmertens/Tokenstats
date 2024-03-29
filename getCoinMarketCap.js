const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function example() {
  let currentDate = new Date();
  let folderDate = currentDate.toISOString().slice(0, 10)
  var fileFolder = 'screenshots_'+folderDate+'\/Token';
  var fileName = 'coinMarketCapChart.png';
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.manage().window().setRect({ width: 1040, height: 768 });
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');
    //await new Promise(resolve => setTimeout(resolve, 1500));  // be sure, that everything is loaded
    //let button2 = await driver.findElement(By.xpath("//li[text()='7D']"));
    let button2 = await driver.findElement(By.id('react-tabs-34'));
    await button2.click();

    //let section = await driver.findElement(By.id('__next'));
    let section = await driver.findElement(By.className('main-content'));

    try {
      let button = await driver.findElement(By.id('onetrust-accept-btn-handler'));
      await button.click();
    } catch (error) {
      console.log('Button not found');
    }

    await new Promise(resolve => setTimeout(resolve, 1500));  // be sure, that everything is loaded
    let screenshot = await section.takeScreenshot();
    fs.writeFileSync(fileFolder+'\/'+fileName, screenshot, 'base64');
    console.log('Die Datei '+fileFolder+'\/'+fileName+' wurde erstellt');
  } finally {
    await driver.quit();
  }
})();
