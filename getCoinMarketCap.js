const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

(async function example() {
  let currentDate = new Date();
  let folderDate = currentDate.toISOString().slice(0, 10)
  var fileFolder = path.join(__dirname, 'screenshots_' + folderDate, 'Token');
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
    console.log('Setting window size and loading page...');
    await driver.manage().window().setRect({ width: 1200, height: 900 });
    await driver.get('https://coinmarketcap.com/currencies/hive-blockchain/');

    // helper sleep
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    // Wait for the chart container to appear
    console.log('Waiting for chart container...');
    const chartLocator = By.id('section-coin-chart');
    await driver.wait(until.elementLocated(chartLocator), 10000);

    // Try to accept or hide cookie banner if present (non-blocking)
    async function dismissCookieBanner() {
      const clickSelectors = [
        By.id('onetrust-accept-btn-handler'),
        By.xpath("//button[contains(.,'Accept') or contains(.,'Accept Cookies') or contains(.,'Accept & Continue')]"),
        By.xpath("//button[contains(.,'Accept') or contains(.,'Continue')]") ,
        By.css("button[aria-label*='accept']"),
        By.css('.onetrust-close-btn-handler')
      ];

      for (const sel of clickSelectors) {
        try {
          const els = await driver.findElements(sel);
          if (els && els.length) {
            for (const el of els) {
              try {
                if (!await el.isDisplayed()) continue;
                console.log('Clicking cookie button via selector', sel);
                await el.click();
                await driver.sleep(300);
                return true;
              } catch (e) {
                try { await driver.executeScript('arguments[0].click();', el); await driver.sleep(300); return true;} catch(_){}
              }
            }
          }
        } catch (e) {}
      }

      // fallback: hide known cookie containers via CSS
      try {
        await driver.executeScript(`
          var els = document.querySelectorAll('.onetrust-banner, .onetrust-overlay, .cookie-consent, .cookie-banner, #onetrust-banner-sdk');
          els.forEach(e=>{ e.style.display='none'; e.style.visibility='hidden'; });
        `);
        await driver.sleep(200);
        return true;
      } catch (e) {
        return false;
      }
    }

    // attempt dismiss before interacting with page
    try { await dismissCookieBanner(); } catch(e) { console.log('Cookie dismiss failed', e.message); }

    // Robust finder-and-click helper for the 7D button
    async function findAndClick7D(attempts = 3) {
      const selectors = [
        By.xpath("//h5[text()='7D']"),
        By.xpath("//li//h5[contains(text(),'7D')]") ,
        By.xpath("//div[@id='section-coin-chart']//h5[contains(.,'7D')]") ,
        By.css("button[aria-label*='7D']"),
        By.xpath("//*[text()='7D' or normalize-space(.)='7D']")
      ];

      for (let i = 0; i < attempts; i++) {
        for (const sel of selectors) {
          try {
            const elems = await driver.findElements(sel);
            if (elems && elems.length) {
              // pick first visible/enabled
              for (const e of elems) {
                try {
                  const displayed = await e.isDisplayed();
                  if (!displayed) continue;
                  console.log('Clicking 7D button using selector', sel);
                  await e.click();
                  return true;
                } catch (clickErr) {
                  // try JS click as fallback
                  try {
                    await driver.executeScript('arguments[0].click();', e);
                    return true;
                  } catch (_) {}
                }
              }
            }
          } catch (err) {
            // ignore and try next selector
          }
        }
        console.log('7D button not found yet, retrying...', i+1);
        await sleep(700);
      }
      return false;
    }

    // Robust finder-and-click helper for the 1W button
    async function findAndClick1W(attempts = 3) {
      const selectors = [
        By.xpath("//b[contains(text(),'1W')]"),
        By.xpath("//span[contains(@title, '1W')]"),
        By.xpath("//div[contains(@class, 'c-bUyOMB')]//span[contains(text(),'1W')]"),
        By.xpath("//li//b[contains(text(),'1W')]"),
        By.xpath("//div[@id='section-coin-chart']//b[contains(.,'1W')]") 
      ];

      for (let i = 0; i < attempts; i++) {
        for (const sel of selectors) {
          try {
            const elems = await driver.findElements(sel);
            if (elems && elems.length) {
              // pick first visible/enabled
              for (const e of elems) {
                try {
                  const displayed = await e.isDisplayed();
                  if (!displayed) continue;
                  console.log('Clicking 1W button using selector', sel);
                  await e.click();
                  return true;
                } catch (clickErr) {
                  // try JS click as fallback
                  try {
                    await driver.executeScript('arguments[0].click();', e);
                    return true;
                  } catch (_) {}
                }
              }
            }
          } catch (err) {
            // ignore and try next selector
          }
        }
        console.log('1W button not found yet, retrying...', i+1);
        await sleep(700);
      }
      return false;
    }

    const clicked7D = await findAndClick7D(4);
    if (!clicked7D) {
      console.log('WARNUNG: 7D button konnte nicht gefunden werden, versuche 1W...');
      const clicked1W = await findAndClick1W(4);
      if (!clicked1W) console.log('WARNUNG: 1W button konnte ebenfalls nicht gefunden werden - weiter mit vorhandenem Zoom');
    }

    // Wait shortly for chart to update
    await sleep(800);

    // Ensure screenshot folder exists
    if (!fs.existsSync(fileFolder)) fs.mkdirSync(fileFolder, { recursive: true });

    // Prefer chart element screenshot, fallback to main-content
    let targetElement;
    try {
      targetElement = await driver.findElement(By.css('#section-coin-chart'));
    } catch (e) {
      try {
        targetElement = await driver.findElement(By.className('main-content'));
      } catch (e2) {
        console.log('Kein Screenshot-Target gefunden, nehme ganze Seite');
      }
    }

    let screenshot;
    // ensure cookie banner removed right before screenshot
    try { await dismissCookieBanner(); } catch(e) { console.log('Final cookie dismiss failed', e.message); }

    if (targetElement) {
      console.log('Taking element screenshot of chart...');
      screenshot = await targetElement.takeScreenshot();
    } else {
      console.log('Taking full page screenshot...');
      screenshot = await driver.takeScreenshot();
    }

    fs.writeFileSync(path.join(fileFolder, fileName), screenshot, 'base64');
    console.log('Die Datei ' + path.join(fileFolder, fileName) + ' wurde erstellt');
  } finally {
    await driver.quit();
  }
})();
