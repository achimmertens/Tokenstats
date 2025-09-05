const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async function example() {
  let currentDate = new Date();
  let folderDate = currentDate.toISOString().slice(0, 10)
  var fileFolder = 'screenshots_'+folderDate+'\/Token';
  var fileName = 'coinMarketCapChart.png';

  // Set the ChromeDriver path explicitly
  process.env.webdriver_chrome_driver = 'C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe';

  // Configure Chrome service with explicit driver path
  const options = new chrome.Options();
  const service = new chrome.ServiceBuilder('C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(options)
    .build();

  try {
    await driver.manage().window().setRect({ width: 1040, height: 768 });
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');
    await new Promise(resolve => setTimeout(resolve, 12000));  // be sure, that everything is loaded
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');
    await new Promise(resolve => setTimeout(resolve, 3000));  // be sure, that everything is loaded
    let button2 = await driver.wait(until.elementLocated(By.xpath("//div[@id='section-coin-chart']/div/div/div/div/div/div[2]/div[2]/div/div/ul/li[2]/div/div/h5")), 10000);
    // let button2 = await driver.findElement(By.xpath("//div[@class='sc-65e7f566-0 kCokPO base-text']/h5[text()='7D']"));
    //let button2 = await driver.findElement(By.xpath("//div[@class='Tab_label__7eec_']/h5[text()='7D']"));
    // let button2 = await driver.findElement(By.xpath("//li[text()='7D']"));
    //let button2 = await driver.findElement(By.id('react-tabs-8'));
    //let button2 = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-tabs-8"]')), 5000);

    
    await button2.click();

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
