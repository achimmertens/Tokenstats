const {Builder, By, key, until} = require('selenium-webdriver');
const fs = require('fs');
let driver;

Promise.all([
runallFunctions()
]).then(() => {
  console.log("Beide Funktionen wurden ausgeführt");
  driver.quit();
}).catch((err) => {
  console.log("Ein Fehler ist aufgetreten: ", err);
  driver.quit();
});



async function runallFunctions() {
//  await openKibana();
  await topTenBeerBuyers02();
  await takeSshot("Beer/03_CommulatedAmountOfBoughtBeer", 50000, "http://raspi:5601/app/kibana#/visualize/edit/commulated_amount_of_bought_beer?embed=true&embed=true&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:'$HIVE',field:volume),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'2',otherBucket:!f,otherBucketLabel:Other,size:10),schema:segment,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,rotate:75,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,valueAxis:''),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'2',label:'$HIVE'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Commulated%20Amount%20Of%20Bought%20$BEER%20And%20sold%20$HIVE'),type:value))),title:'Commulated%20Amount%20Of%20Bought%20$BEER%20Per%20Person',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))" )
}




async function openKibana() {
    driver=await new Builder().forBrowser('chrome').build();
    //await driver.get("http://raspi:5601/app/kibana#/visualize/edit/bought_beer_by_time?_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:'Traded%20$BEER',field:quantity),schema:metric,type:sum),(enabled:!t,id:'2',params:(drop_partials:!f,extended_bounds:(),field:timestamp,interval:auto,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-7d,to:now),useNormalizedEsInterval:!t),schema:segment,type:date_histogram),(enabled:!t,id:'3',params:(customLabel:Buyer,field:buyer.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:'Traded%20$BEER'),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Traded%20$BEER'),type:value))),title:'Bought%20$BEER%20By%20Time',type:histogram))&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&embed=true");
        await driver.get("http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87");
    await driver.wait(until.elementLocated(By.className('visualization')), 50000);
    await driver.takeScreenshot().then(
        function(image) {
            fs.writeFile('./screenshots/beer/01_bought_beer_by_time.png', image, 'base64', function(err) {
                if (err) console.log(err);
            });
        }
    );
          await driver.quit();
}

async function topTenBeerBuyers02() {
    driver=await new Builder().forBrowser('chrome').build();
    await driver.get("http://raspi:5601/goto/acbf5274af8dd0f0cb245476b3470f87");
    const element3 = await driver.wait(until.elementLocated(By.className("euiIcon euiIcon--large euiIcon-isLoaded")), 50000);
    await driver.manage().window().setRect({ width: 1024, height: 768 });
    await new Promise(resolve => setTimeout(resolve, 1000));
          await driver.takeScreenshot().then(
                  function(image) {
                      fs.writeFile('./screenshots/beer/02_TopTenBeerBuyers.png', image, 'base64', function(err) {
                          if (err) console.log(err);
                      });
                  }
              );
    await driver.quit();
}


async function takeSshot(filename,duration, url ) {
    driver=await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    const element3 = await driver.wait(until.elementLocated(By.className("euiIcon euiIcon--large euiIcon-isLoaded")), duration);
    await driver.manage().window().setRect({ width: 1024, height: 768 });
    await new Promise(resolve => setTimeout(resolve, 5000));
          await driver.takeScreenshot().then(
                  function(image) {
                      fs.writeFile('./screenshots/'+filename+'.png', image, 'base64', function(err) {
                          if (err) console.log(err);
                      });
                  }
              );
    await driver.quit();
}

