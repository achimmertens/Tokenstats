const { Builder, By, key, until } = require('selenium-webdriver');
const fs = require('fs');
const rimraf = require('rimraf');
//const token = tbd
const dirPaths = ['Beer', 'Alive', 'LEO'];
const queries = [["Beer/01_bought_beer_by_time", 50, "http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-7d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&embed=true"],
["Beer/02_TopTenBeerBuyers", 50, "http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87"]];
let driver;


Promise.all([
    runallFunctions()
]).then(() => {
    console.log("Alle Funktionen wurden ausgeführt");
    driver.quit();
}).catch((err) => {
    console.log("Ein Fehler ist aufgetreten: ", err);
    driver.quit();
});


async function runallFunctions() {
    //await deleteDirs();
    for (const query of queries) {
        const filename = query[0];
        const duration = query[1];
        const url = query[2];
        console.log("filename = ", filename," url = ", url);
        await takeSshot(filename, duration, url);
        //await takeSshot("Beer/02_TopTenBeerBuyers", 50, "http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87" )
        //await takeSshot("Beer/03_CommulatedAmountOfBoughtBeer", 50, "http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_beer?embed=true&embed=true&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'2',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,valueAxis:''),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'2',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Bought%20$BEER%20And%20sold%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Bought%20$BEER%20Per%20Person',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))" )
        //await takeSshot("Beer/04_CommulatedAmountOfSoldBeer", 50, "http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_sold_beer?embed=true&embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'4',params:(customLabel:Seller,field:seller.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'3',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!f,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,orderBucketsBySum:!f,row:!f,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'3',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(defaultYExtents:!f,mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Sold%20$BEER%20And%20Earned%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Sold%20$BEER%20Per%20Person',type:histogram))");
    }
}

async function takeSshot(filename, duration, url) {

        try {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get(url);
            await driver.wait(until.elementLocated(By.className("euiIcon euiIcon--large euiIcon-isLoaded")), duration * 1000);
            await driver.manage().window().setRect({ width: 1024, height: 768 });
            await new Promise(resolve => setTimeout(resolve, 1000));  // be sure, that the folders are deleted before creating new ones
            await driver.takeScreenshot().then(
                function (image) {
                    fs.writeFile('./screenshots/' + filename + '.png', image, 'base64', function (err) {
                        if (err) console.log(err);
                    });
                }
            );
            await driver.quit();
        } catch (err) {
            console.error(`Fehler `, err);
        }
}

//      await driver.get("http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87");
//          await driver.wait(until.elementLocated(By.className("euiIcon euiIcon--large euiIcon-isLoaded")), duration*1000);
//          await driver.manage().window().setRect({ width: 1024, height: 768 });
//          await new Promise(resolve => setTimeout(resolve, 3000));
//                await driver.takeScreenshot().then(
//                        function(image) {
//                            fs.writeFile('./screenshots/'+"Beer/02_TopTenBeerBuyers"+'.png', image, 'base64', function(err) {
//                                if (err) console.log(err);
//                            });
//                        }
//                    );
//    await driver.quit();


async function deleteDirs() {
    for (const dirPath of dirPaths) {
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
        rimraf('./screenshots/' + dirPath, (err) => {
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
    fs.access('./screenshots/' + token, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.mkdir('./screenshots/' + token, (err) => {
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