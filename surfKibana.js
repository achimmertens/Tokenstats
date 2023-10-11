// ********************************************************
// Bitte ausführen um die Screenshots aus Kibana zu holen.
//
//                Written by Achim Mertens
// ********************************************************

const { Builder, By, key, until } = require('selenium-webdriver');
const fs = require('fs');
const rimraf = require('rimraf');
const getDateFrame = require('./getDateFrame.js');
let {dateFrame, currentDateString, oneWeekAgoString, timeFrame} = getDateFrame();
// let currentDate = new Date();
// let currentDateString = currentDate.toISOString().slice(0, 10)
const screenshotsFolder = './screenshots_'+currentDateString.slice(0, 10)+'/'
console.log("currenDateString =", currentDateString.slice(0, 10));
const token = ['Alive', 'BEER', 'BEERBot', 'LEO', 'POB', 'SPT', 'Token'];  //Namen der Ordner
const queries =
    [
        ["BEER/01_BoughtBeerByTime", 80, `http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-${timeFrame}d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&embed=true`],
        ["BEER/01_BoughtBeerByTime", 80, `http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-${timeFrame}d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&embed=true`],
        ["BEER/02_TopTenBeerBuyers", 50, `http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87`],
        ["BEER/03_CommulatedAmountOfBoughtBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_beer?embed=true&embed=true&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'2',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,valueAxis:''),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'2',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Bought%20$BEER%20And%20sold%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Bought%20$BEER%20Per%20Person',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))`],
        ["BEER/04_CommulatedAmountOfSoldBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_beer?embed=true&embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-${timeFrame}d,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'4',params:(customLabel:Seller,field:seller.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'3',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!f,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,orderBucketsBySum:!f,row:!f,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'3',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(defaultYExtents:!f,mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Sold%20$BEER%20And%20Earned%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Sold%20$BEER%20Per%20Person',type:histogram))`],
        ["BEER/05_PriceOfBeer", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_beer?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
      
        ["BEERBot/01_StakedBeerByHistory", 50, `http://raspi:5601/app/kibana#/visualize/edit/d494cb60-06f8-11ec-9586-edd1781b885c?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["BEERBot/02_Top20BeerRecievers", 50, `http://raspi:5601/app/kibana#/visualize/edit/57242fb0-06fb-11ec-9586-edd1781b885c?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],

        ["Alive/01_BoughtAliveByTime", 50, `http://raspi:5601/app/kibana#/visualize/edit/bought_alive_by_time?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/02_TopTenAliveBuyers", 50, `http://raspi:5601/app/kibana#/visualize/edit/top_ten_alive_buyers?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/03_CommulatedAmountOfBoughtAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/04_CommulatedAmountOfSoldAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Alive/05_PriceOfAlive", 50, `http://raspi:5601/app/kibana#/visualize/edit/price_of_alive?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
             
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
     
        ["Token/01_HivePerToken", 50, `http://raspi:5601/app/kibana#/visualize/edit/618c5150-1b67-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Token/02_USDPerToken", 50, `http://raspi:5601/app/kibana#/visualize/edit/9c1c8920-1b67-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`],
        ["Token/03_TableOfTokenPrices", 50, `http://raspi:5601/app/kibana#/visualize/edit/8bf79f60-1b69-11ec-8610-27c40f2d50c0?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-${timeFrame}d%2Cto%3Anow))`]

    ]
let driver;

async function runallFunctions() {
    await deleteDirs();
    try {
        driver = await new Builder().forBrowser('chrome').build();
        for (const query of queries) {
            const filename = query[0];
            const duration = query[1];
            const url = query[2];
            await driver.get(url);
            try {
                await driver.wait(until.elementLocated(By.className("euiIcon euiIcon--large euiIcon-isLoaded")), duration * 1000);
                console.log("The Website " + url + " has been loaded");
            }
            catch (err) {
                console.error(`Fehler beim Laden der Webseite`, err);
            }
            await new Promise(resolve => setTimeout(resolve, 1500));  // be sure, that everything is loaded
            await driver.manage().window().setRect({ width: 1024, height: 768 });
            const image = await driver.takeScreenshot();
            await fs.promises.writeFile(screenshotsFolder + filename + '.png', image, 'base64');
            console.log("The image " + screenshotsFolder + filename + ".png has been saved.");
        }
        await driver.quit();
    } catch (err) {
        console.error(`Fehler `, err);
    }
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
        console.log("Alle Funktionen wurden ausgeführt");
        driver.quit();
    }).catch((err) => {
        console.log("Ein Fehler ist aufgetreten: ", err);
        driver.quit();
    });
    }

main();   