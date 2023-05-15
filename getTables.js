const { By } = require('selenium-webdriver');
const fs = require('fs');
const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

module.exports = async function getTables(token, oneWeekAgoString, currentDateString) {

  // Table of Top 20 Buyers

  const buyersTableResult = await
    (async () => {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(`http://raspi:9200/${token}/_search?size=10000`, {  //Todo: wenn mehr als 10000, dann darstellen
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
                "field": "buyer.keyword",
                "order": {
                  "1": "desc"
                },
                "missing": "__missing__",  //kann das weg?
                "size": 1000 //Todo: Wenn mehr als 1000, soll dies dargestellt werden
              },
              "aggs": {
                "1": {
                  "sum": {
                    "field": "volume"
                  }
                },
                "3": {
                  "sum": {
                    "field": "quantity"
                  }
                },
                "4": {
                  "avg": {
                    "field": "price"
                  }
                }
              }
            }
          }
        }),
      });

      const data = await response.json();
      const amount = data.hits.hits.length

      console.log("Menge der Datensätze: ", amount)
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
        quantitySum=(parseFloat(quantitySum)+parseFloat(bucket['3'].value)).toFixed(5);
      });
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const buyer = bucket.key;
          const totalQuantity = bucket['3'].value.toFixed(5);
          const totalVolume = bucket['1'].value.toFixed(5);
          const percVolume=(totalVolume*100/parseFloat(volumeSum)).toFixed(2);
          const avgPrice = bucket['4'].value.toFixed(5);
          avgPrTop20=avgPrTop20+parseFloat(avgPrice);
          const numberOfTrades = bucket.doc_count;
          numberOfTradesTop20=numberOfTradesTop20+parseInt(numberOfTrades);
          buyersTable = buyersTable + `@${buyer}| ${totalVolume}|${percVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          otherVol = (parseFloat(otherVol) + parseFloat(bucket['1'].value)).toFixed(5);
          otherQuan = (parseFloat(otherQuan) + parseFloat(bucket['3'].value)).toFixed(5);
          avgPr = avgPr + bucket['4'].value;
          otherTrades = (parseInt(otherTrades) + parseInt(bucket.doc_count));
        }
        number = index;
      });
      OtherAvgPr=(avgPr / (number - 20)).toFixed(5)
      otherVolPerc=(otherVol*100/parseFloat(volumeSum)).toFixed(2);
      totalAvgPr= ((avgPrTop20+avgPr)/number).toFixed(5);
      buyersTable = buyersTable + `__others__|${otherVol}|${otherVolPerc}|${otherQuan}|${OtherAvgPr}|${otherTrades}\n`
      buyersTable = buyersTable + `__Sum:__|${volumeSum}|100%|${quantitySum}|${totalAvgPr}|${otherTrades+numberOfTradesTop20}\n` //ToDo Othertrades
     
      return buyersTable;
    })();

  // Table of Top 20 Sellers
  const sellersTableResult = await
    (async () => {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(`http://raspi:9200/${token}/_search?size=10000`, {  //Todo: wenn mehr als 10000, dann darstellen
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'kbn-xsrf': 'true',
        },
        body: JSON.stringify({
          "aggs": {
            "sellers": {
              "terms": {
                "field": "seller.keyword",
                "order": {
                  "1": "desc"
                },
                "missing": "__missing__",  //kann das weg?
                "size": 1000 //Todo: Wenn mehr als 1000, soll dies dargestellt werden
              },
              "aggs": {
                "1": {
                  "sum": {
                    "field": "volume"
                  }
                },
                "3": {
                  "sum": {
                    "field": "quantity"
                  }
                },
                "4": {
                  "avg": {
                    "field": "price"
                  }
                }
              }
            }
          },
          "size": 0,
          "stored_fields": [
            "*"
          ],
          //  "script_fields": [],
          "docvalue_fields": [
            {
              "field": "timestamp",
              "format": "date_time"
            }
          ],
          "_source": {
            "excludes": []
          },
          query: {
            range: {
              timestamp: {
                gte: oneWeekAgoString,
                lte: currentDateString,
                format: 'strict_date_optional_time||epoch_millis',
              },
            },
          }
        }),
      });

      const data = await response.json();
      const amount = data.hits.hits.length

      console.log("Menge der Datensätze: ", amount)
      console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1])
      const buckets = data.aggregations.sellers.buckets;
      console.log(`Found ${buckets.length} sellers. Here is the number of trades for each seller:`);
      buckets.forEach(bucket => {
        console.log(`@${bucket.key}: ${bucket.doc_count}`);
      });

      console.log(`Here is the sorted list: Sellers of ${token}|Earned $HIVE|Sold ${token}|Avg. Price`)
      let sellersTable = '';
      let otherVol = 0;
      let otherQuan = 0;
      let avgPr = 0;
      let number = 0;
      let otherTrades = 0;
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const seller = bucket.key;
          const totalQuantity = bucket['3'].value.toFixed(5);
          const totalVolume = bucket['1'].value.toFixed(5);
          const avgPrice = bucket['4'].value.toFixed(5);
          const numberOfTrades = bucket.doc_count;
          sellersTable = sellersTable + `@${seller}| ${totalVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          otherVol = otherVol + bucket['1'].value;
          otherQuan = otherQuan + bucket['3'].value;
          avgPr = avgPr + bucket['4'].value;
          otherTrades = otherTrades + bucket.doc_count
        }
        number = index;
        console.log(`\n \nData (JSON): \n`, bucket);
      });
      sellersTable = sellersTable + `__others__|${otherVol}|${otherQuan}|${avgPr / (number - 20)}|${otherTrades}\n`
      return sellersTable;
    })();


  // Table of $TOKEN Buy vs. Sell Request
  const buyVsSellResult = await
    (async () => {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(`http://raspi:9200/${token}/_search?size=10000`, {  //Todo: wenn mehr als 10000, dann darstellen
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'kbn-xsrf': 'true',
        },
        body: JSON.stringify({
          "aggs": {
            "5": {
              "terms": {
                "field": "type.keyword",
                "order": {
                  "1": "desc"
                },
                "size": 5
              },
              "aggs": {
                "1": {
                  "sum": {
                    "field": "volume"
                  }
                },
                "3": {
                  "sum": {
                    "field": "quantity"
                  }
                },
                "4": {
                  "avg": {
                    "field": "price"
                  }
                }
              }
            }
          },
          "size": 0,
          "stored_fields": [
            "*"
          ],
          //  "script_fields": [],
          "docvalue_fields": [
            {
              "field": "timestamp",
              "format": "date_time"
            }
          ],
          "_source": {
            "excludes": []
          },
          query: {
            range: {
              timestamp: {
                gte: oneWeekAgoString,
                lte: currentDateString,
                format: 'strict_date_optional_time||epoch_millis',
              },
            },
          }
        }),
      });

      const data = await response.json();
      const amount = data.hits.hits.length

      console.log("Menge der buyVsSell-Datensätze: ", amount)
      console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1])
      const buckets = data.aggregations[5].buckets;
      //console.log ("buckets = ", buckets);
      let request0=buckets[0].key
      let request1=buckets[1].key
      let req0ReceivedHive = buckets[0]['1'].value.toFixed(5)
      let req0SoldToken = buckets[0]['3'].value.toFixed(5)
      let req0AvgPrice = buckets[0]['4'].value.toFixed(5)
      let req1ReceivedHive = buckets[1]['1'].value.toFixed(5)
      let req1SoldToken = buckets[1]['3'].value.toFixed(5)
      let req1AvgPrice = buckets[1]['4'].value.toFixed(5)
      let receivedHiveSum = parseFloat(req0ReceivedHive)+parseFloat(req1ReceivedHive);
      let soldBeerSum = parseFloat(req0SoldToken)+parseFloat(req1SoldToken);
      let req1ReceivedHivePercentages = (parseFloat(req1ReceivedHive)/parseFloat(receivedHiveSum)*100).toFixed(2)
      let req0ReceivedHivePercentages = (parseFloat(req0ReceivedHive)/parseFloat(receivedHiveSum)*100).toFixed(2)
      let totalAvgPrice = ((parseFloat(req0AvgPrice)+parseFloat(req1AvgPrice))/2).toFixed(5);
      //ToDo: sell und Buy gegen echte Daten eintauschen
      let buyVsSellerTable = `${request0}|${req0ReceivedHive}|${req0ReceivedHivePercentages}%|${req0SoldToken}|${req0AvgPrice}\n${request1}|${req1ReceivedHive}|${req1ReceivedHivePercentages}%|${req1SoldToken}|${req1AvgPrice}\n|sum: |${receivedHiveSum}|100%|${soldBeerSum}|${totalAvgPrice}|\n`
      console.log("buyVsSellerTable = ", buyVsSellerTable);
      logStream.write(`buyVsSellerTable für ${token} = \n${buyVsSellerTable}\n`)
      return buyVsSellerTable;      
    })();

  return { buyersTableResult, sellersTableResult, buyVsSellResult }
}