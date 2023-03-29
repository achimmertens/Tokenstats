console.log("Hallo Welt");
let os = require('os');
let gigabytes = os.freemem()/1000000000;
let totalmem = os.totalmem()/1000000000;

console.log("Freemem = "+gigabytes+" GigaBytes von "+totalmem);

/*
const {Builder, By, key, until} = require('selenium-webdriver');
let driver;

openGoogle();

async function openGoogle() {
    driver=await new Builder().forBrowser('chrome').build();
    await driver.get('http://www.google.com');
    
}
*/