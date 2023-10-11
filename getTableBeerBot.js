const { By } = require('selenium-webdriver');
const fs = require('fs');
const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

module.exports = async function getTablesBeerBot(token, oneWeekAgoString, currentDateString) {

  // Table of Top 20 Receivers of staked Beer
  const stakedBeerTableResult = await
    (async () => {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(`http://raspi:9200/${token}/_search?size=1000`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'kbn-xsrf': 'true',
        },
        body: JSON.stringify({
          query: {
            range: {
              timestamp: {
                gte: oneWeekAgoString,
                lte: currentDateString,
                format: 'strict_date_optional_time||epoch_millis',
              },
            },
          },
          "aggs": {
            "buyers": {
              "terms": {
                "field": "to.keyword",
                "order": {
                  "1": "desc"
                },
                "missing": "__missing__",  
                "size": 4000 
              },
              "aggs": {
                "1": {
                  "sum": {
                    "field": "quantity"
                  }
                }
              }
            }
          }
        }),
      });






      
      const data = await response.json();
      const amount = data.hits.hits.length
      if (amount > 4000) {
        setTimeout(() => {
        console.log('\x1b[31m **************************\n   WARNUNG !!!!\nEs sind mehr Datensätze vorhanden, als abgerufen werden !!!\n************************** \x1b[0m');
        console.log("Menge der Datensätze: ", amount)
      }, 5000);
      }
      console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1])
      const buckets = data.aggregations.buyers.buckets;
      console.log(`Found ${buckets.length} buyers. Here is the number of trades for each buyer:`);
      buckets.forEach(bucket => {
        console.log(`@${bucket.key}: ${bucket.doc_count}`);
      });

      let buyersTable = '';
      console.log(`Here is the sorted list: Buyers of ${token}|Sold $HIVE|Bought ${token}|Avg. Price:`)
      let otherVol = 0;
      let otherQuan = 0;
      let avgPr = 0;
      let OtherAvgPr=0;
      let number = 0;
      let otherTrades = 0;
      let volumeSum=0;
      let quantitySum=0;
      let otherVolPerc=0;
      let totalAvgPr=0;
      let avgPrTop20=0;
      let numberOfTradesTop20=0;
      buckets.forEach((bucket,index) => {
        volumeSum=(parseFloat(volumeSum)+parseFloat(bucket['1'].value)).toFixed(5);
      });
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const buyer = bucket.key;
        //  const totalQuantity = bucket['3'].value.toFixed(5);
          const totalVolume = bucket['1'].value.toFixed(5);
          
          const percVolume=(totalVolume*100/parseFloat(volumeSum)).toFixed(2)+" %";
      //    const avgPrice = bucket['4'].value.toFixed(5);
      //    avgPrTop20=avgPrTop20+parseFloat(avgPrice);
          const numberOfTrades = bucket.doc_count;
          console.log("numberOfTrade = ", numberOfTrades, ", buyer = ", buyer, ", volume = ", totalVolume);
          numberOfTradesTop20=numberOfTradesTop20+parseInt(numberOfTrades);
          buyersTable = buyersTable + `@${buyer}| ${totalVolume}|${percVolume}|${numberOfTrades}\n`
        }
        else {
          otherVol = (parseFloat(otherVol) + parseFloat(bucket['1'].value)).toFixed(5);
         // otherQuan = (parseFloat(otherQuan) + parseFloat(bucket['3'].value)).toFixed(5);
         // avgPr = avgPr + bucket['4'].value;
          otherTrades = (parseInt(otherTrades) + parseInt(bucket.doc_count));
        }
        number = index;
      });

      OtherAvgPr=(avgPr / (number - 20)).toFixed(5)
      otherVolPerc=(otherVol*100/parseFloat(volumeSum)).toFixed(2);
      totalAvgPr= ((avgPrTop20+avgPr)/number).toFixed(5);
      buyersTable = buyersTable + `__others__|${otherVol}|${otherVolPerc} %|${otherTrades}\n`
      buyersTable = buyersTable + `__Sum:__|${volumeSum}|100 %|${otherTrades+numberOfTradesTop20}\n` //ToDo Othertrades
      console.log("buyersTable = ", buyersTable);
      return buyersTable;
    })();
return { stakedBeerTableResult}
}