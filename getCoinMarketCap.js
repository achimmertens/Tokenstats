const { Builder, By, Key, until } = require('selenium-webdriver');
const { Image } = require('image-js');
const fs = require('fs');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.manage().window().setRect({ width: 1040, height: 768 });
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');
    await new Promise(resolve => setTimeout(resolve, 1500));  // be sure, that everything is loaded
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
   
    try {
      let button = await driver.findElement(By.xpath("//button[contains(text(), 'Log in')]"));
      await button.click();
    } catch (error) {
      console.log('Button not found');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));  // be sure, that everything is loaded
    let screenshot = await section.takeScreenshot();
    //let image = await Image.load(screenshot);
    //let cropped = await image.crop({ x: 0, y: 0, width: image.width, height: image.height - 100 });
    //let buffer = await cropped.saveAsBuffer('image/png');
    //fs.writeFileSync('cropped.png', buffer.slice(0,10));
    fs.writeFileSync('chart.png', screenshot, 'base64');
  } finally {
    await driver.quit();
  }
})();

//<button id="onetrust-accept-btn-handler">Accept All Cookies</button>
//<li font-weight="var(--c-font-weight-500)" class="react-tabs__tab" role="tab" id="react-tabs-2" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-3">7D</li>
