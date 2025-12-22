// ********************************************************
// Bitte ausführen um die Screenshots aus Kibana zu holen.
//
//                Written by Achim Mertens
// ********************************************************

const { Builder, By, key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const chromeDriverPath = 'C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe';

// Set Chrome Driver Path
process.env.PATH = `${process.env.PATH};C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps`;
const options = new chrome.Options();
const service = new chrome.ServiceBuilder(chromeDriverPath);
const path = require('path');
const rimraf = require('rimraf');
const getDateFrame = require('./getDateFrame.js');
let {dateFrame, currentDateString, oneWeekAgoString, timeFrame} = getDateFrame();
// let currentDate = new Date();
// let currentDateString = currentDate.toISOString().slice(0, 10)
const screenshotsFolder = './screenshots_'+currentDateString.slice(0, 10)+'/'
console.log("currenDateString =", currentDateString.slice(0, 10));
//const token = ['Alive', 'BEER', 'BEERBot', 'LEO', 'POB', 'SPT', 'Token'];  //Namen der Ordner
const token = ['Alive','BEER','BEERBot','Token'];  //Namen der Ordner
const queries =
    [
        ["BEER/01_BoughtBeerByTime", 80, `http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-${timeFrame}d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&embed=true`],
        ["BEER/01_BoughtBeerByTime", 80, `http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-${timeFrame}d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&embed=true`],
 /*
        ["BEER/02_TopTenBeerBuyers", 50, `http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87`],
        ["BEER/03_CommulatedAmountOfBoughtBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_beer?embed=true&embed=true&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'2',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,valueAxis:''),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'2',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Bought%20$BEER%20And%20sold%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Bought%20$BEER%20Per%20Person',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))`],
        ["BEER/04_CommulatedAmountOfSoldBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_beer?embed=true&embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'4',params:(customLabel:Seller,field:seller.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'3',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!f,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,orderBucketsBySum:!f,row:!f,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'3',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(defaultYExtents:!f,mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Sold%20$BEER%20And%20Earned%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Sold%20$BEER%20Per%20Person',type:histogram))`],
        ["BEER/05_PriceOfBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_beer?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
 */    
        ["BEERBot/01_StakedBeerByHistory", 50, `http://raspi:5601/app/kibana#/visualize/edit/d494cb60-06f8-11ec-9586-edd1781b885c?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["BEERBot/02_Top20BeerRecievers", 50, `http://raspi:5601/app/kibana#/visualize/edit/57242fb0-06fb-11ec-9586-edd1781b885c?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],

        ["Alive/01_BoughtAliveByTime", 80, `http://raspi:5601/app/kibana#/visualize/edit/bought_alive_by_time?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/02_TopTenAliveBuyers", 50, `http://raspi:5601/app/kibana#/visualize/edit/top_ten_alive_buyers?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/03_CommulatedAmountOfBoughtAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/04_CommulatedAmountOfSoldAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/05_PriceOfAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
  /*           
        ["LEO/01_BoughtLeoByTime", 50, `http://raspi:5601/app/kibana#/visualize/edit/bought_leo_by_time?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["LEO/02_TopTenLeoBuyers", 50, `http://raspi:5601/app/kibana#/visualize/edit/top_ten_leo_buyers?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["LEO/03_CommulatedAmountOfBoughtLeo", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_leo?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["LEO/04_CommulatedAmountOfSoldLeo", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_leo?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["LEO/05_PriceOfLeo", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_leo?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
     
        ["POB/01_BoughtPobByTime", 50, `http://raspi:5601/app/kibana#/visualize/edit/bought_pob_by_time?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["POB/02_TopTenPobBuyers", 50, `http://raspi:5601/app/kibana#/visualize/edit/top_ten_pob_buyers?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["POB/03_CommulatedAmountOfBoughtPob", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_pob?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["POB/04_CommulatedAmountOfSoldPob", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_pob?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["POB/05_PriceOfPob", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_pob?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
     
        ["SPT/01_BoughtSptByTime", 50, `http://raspi:5601/app/kibana#/visualize/edit/bought_spt_by_time?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["SPT/02_TopTenSptBuyers", 50, `http://raspi:5601/app/kibana#/visualize/edit/top_ten_spt_buyers?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["SPT/03_CommulatedAmountOfBoughtSpt", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_spt?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["SPT/04_CommulatedAmountOfSoldSpt", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_spt?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["SPT/05_PriceOfSpt", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_spt?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
     */
        ["Token/01_HivePerToken", 50, `http://raspi:5601/app/kibana#/visualize/edit/618c5150-1b67-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Token/02_USDPerToken", 50, `http://raspi:5601/app/kibana#/visualize/edit/9c1c8920-1b67-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Token/03_TableOfTokenPrices", 50, `http://raspi:5601/app/kibana#/visualize/edit/8bf79f60-1b69-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`]

    ]
let driver;

async function runallFunctions() {
    await deleteDirs();
    let driver;
    try {
        // Set the ChromeDriver path explicitly
        process.env.webdriver_chrome_driver = 'C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe';
        
        const options = new chrome.Options();
        const service = new chrome.ServiceBuilder('C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe');
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(service)
            .setChromeOptions(options)
            .build();
        // set window size once
        try { await driver.manage().window().setRect({ width: 1200, height: 900 }); } catch (e) {}

        // helper: small sleep
        const sleep = ms => new Promise(res => setTimeout(res, ms));

        // helper: wait for page ready - document ready and no visible loaders
        async function waitForPageReady(timeoutMs = 10000) {
            const start = Date.now();
            while (Date.now() - start < timeoutMs) {
                try {
                    const ready = await driver.executeScript('return document.readyState');
                    if (ready !== 'complete') { await sleep(200); continue; }
                    // check for common loader indicators
                    const loaders = await driver.findElements(By.css('.euiLoadingSpinner, .kbnLoader, .loading, .globalLoader'));
                    let anyVisible = false;
                    for (const l of loaders) {
                        try { if (await l.isDisplayed()) { anyVisible = true; break; } } catch(e){}
                    }
                    if (anyVisible) { await sleep(200); continue; }
                    return true;
                } catch (e) {
                    await sleep(200);
                }
            }
            return false;
        }

        // helper: wait until Kibana visualization has rendered data
        async function waitForKibanaRendered(timeoutMs = 10000) {
            const start = Date.now();
            const sleep = ms => new Promise(res => setTimeout(res, ms));

            // selectors that indicate a rendered visualization
            const dataSelectors = [
                '#visualization canvas',
                '#visualization svg',
                '.euiDataGrid',
                '.visTable__table',
                '.euiTable',
                '.visualization',
                'canvas',
                'svg'
            ];

            while (Date.now() - start < timeoutMs) {
                try {
                    // if page still shows Kibana loading text, wait
                    const loadingEls = await driver.findElements(By.xpath("//*[contains(text(),'Loading Elastic Kibana') or contains(text(),'Loading')]" ));
                    let loadingVisible = false;
                    for (const el of loadingEls) {
                        try { if (await el.isDisplayed()) { loadingVisible = true; break; } } catch(e){}
                    }
                    if (loadingVisible) { await sleep(300); continue; }

                    // check for at least one data indicator element that is visible and has size
                    for (const sel of dataSelectors) {
                        const elems = await driver.findElements(By.css(sel));
                        if (elems && elems.length) {
                            for (const e of elems) {
                                try {
                                    if (!(await e.isDisplayed())) continue;
                                    // for canvas/svg check size
                                    const size = await driver.executeScript('return (function(el){ if(!el) return null; const r = el.getBoundingClientRect(); return {w: Math.round(r.width), h: Math.round(r.height), tag: el.tagName.toLowerCase()}; })(arguments[0]);', e);
                                    if (size && size.w > 10 && size.h > 10) {
                                        // element has reasonable size; assume rendered (avoid expensive pixel checks)
                                        return true;
                                    }
                                    // tables/grid: assume visible is enough
                                    if (!size) return true;
                                } catch (innerErr) {
                                    // ignore and continue
                                }
                            }
                        }
                    }
                    // no secondary text checks; rely on visual element presence and size
                } catch (err) {
                    // ignore and retry
                }
                await sleep(300);
            }
            return false;
        }

        for (const query of queries) {
            const filename = query[0];
            const duration = query[1];
            const url = query[2];
            console.log(`Loading ${url}`);
            await driver.get(url);

            const ready = await waitForPageReady(duration * 1000);
            if (ready) {
                console.log(`Page reported ready for ${url}`);
            } else {
                console.log(`WARN: Page not fully ready after ${duration} seconds for ${url}, attempting fallback waits`);
                // try to wait for a visual element as a fallback
                try {
                    await driver.wait(until.elementLocated(By.css('canvas, svg, .visualization, .kbnCanvas')) , 5000);
                } catch (e) {}
            }

            // ensure token folder exists
            const outPath = path.join(screenshotsFolder, filename + '.png');
            const outDir = path.dirname(outPath);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

            // wait specifically for Kibana visualization to render actual data
            const kibanaReady = await waitForKibanaRendered(duration * 1000);
            if (!kibanaReady) console.log(`WARN: Kibana visualization may not be fully rendered for ${url}`);

            // fixed short pause to allow Kibana to finish rendering complex visuals
            await sleep(1000);

            // take screenshot with retry
            let image;
            let attempts = 0;
            while (attempts < 3) {
                try {
                    image = await driver.takeScreenshot();
                    break;
                } catch (err) {
                    attempts++;
                    console.log(`Screenshot attempt ${attempts} failed for ${url}:`, err.message);
                    await sleep(400);
                }
            }
            if (!image) {
                console.error(`Failed to capture screenshot for ${url}`);
            } else {
                await fs.promises.writeFile(outPath, image, 'base64');
                console.log(`The image ${outPath} has been saved.`);
            }
        }
    } catch (err) {
        console.error(`Fehler `, err);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
    console.log("Alle Funktionen der runAllFunctions Methode wurden ausgeführt");
}



async function deleteDirs() {
    if (!fs.existsSync(screenshotsFolder)) {
        fs.mkdirSync(screenshotsFolder);
    }
    for (const dirPath of token) {
        try {
            await deleteDirRecursive(dirPath);
            console.log(`Ordner erfolgreich gelöscht: ${dirPath}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Ich habe eine Sekunde gewartet.');
            createDirs(dirPath);
        } catch (err) {
            console.error(`Fehler beim Löschen des Ordners ${dirPath}:`, err);
        }
    }
}



async function deleteDirRecursive(dirPath) {
    return new Promise((resolve, reject) => {
        rimraf(screenshotsFolder + dirPath, (err) => {
            if (err) {
                reject(err);
                console.log("Es gab einen Fehler beim Löschen des Ordners.")
            } else {
                resolve();
            }
        });
    });
}

function createDirs(token) {
    fs.access(screenshotsFolder + token, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.mkdir(screenshotsFolder + token, (err) => {
                    if (err) throw err;
                    console.log(`${token} Ordner erstellt!`);
                });
            } else {
                throw err;
            }
        } else {
            console.log('Ordner existiert bereits.');
        }
    });
}

// main
async function main() {
    Promise.all([
        runallFunctions()
    ]).then(() => {
        console.log("Alle Funktionen der Main Methode wurden ausgeführt");
    }).catch((err) => {
        console.log("Ein Fehler ist aufgetreten: ", err);
    });
    }

main();