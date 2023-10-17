const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.manage().window().setRect({ width: 1024 * 1.2, height: 768 });
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');
    

    //await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await new Promise(resolve => setTimeout(resolve, 3000));  // be sure, that everything is loaded
     let button2 = await driver.findElement(By.id('react-tabs-34'));
    //let button2 = await driver.findElement(By.className("react-tabs__tab react-tabs__tab--selected"));

    await button2.click();
    await new Promise(resolve => setTimeout(resolve, 3000));  // be sure, that everything is loaded
    let button = await driver.findElement(By.id('onetrust-accept-btn-handler'));
    await button.click();
    let section = await driver.findElement(By.id('section-coin-chart'));
    let screenshot = await section.takeScreenshot();
    require('fs').writeFileSync('screenshot.png', screenshot, 'base64');
  } finally {
    await driver.quit();
  }
})();
