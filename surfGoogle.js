const {Builder, By, key, until} = require('selenium-webdriver');
let driver;

openGoogle();

async function openGoogle() {
    driver=await new Builder().forBrowser('chrome').build();
    await driver.get('http://www.google.com');
    await click('Alle akzeptieren');
}

async function click(text) {
    await driver.findElement(By.xpath("//*[text()='"+text+"']")).click();
}
