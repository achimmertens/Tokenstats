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
      let totalVol = 0;
      let totalQuan = 0;
      let avgPr = 0;
      let number = 0;
      let otherTrades = 0;
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const buyer = bucket.key;
          const totalQuantity = bucket['3'].value;
          const totalVolume = bucket['1'].value;
          const avgPrice = bucket['4'].value;
          const numberOfTrades = bucket.doc_count;
          buyersTable = buyersTable + `@${buyer}| ${totalVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          totalVol = totalVol + bucket['1'].value;
          totalQuan = totalQuan + bucket['3'].value;
          avgPr = avgPr + bucket['4'].value;
          otherTrades = otherTrades + bucket.doc_count
        }
        number = index;
      });
      buyersTable = buyersTable + `__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}|${otherTrades}\n`
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
      let totalVol = 0;
      let totalQuan = 0;
      let avgPr = 0;
      let number = 0;
      let otherTrades = 0;
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const seller = bucket.key;
          const totalQuantity = bucket['3'].value;
          const totalVolume = bucket['1'].value;
          const avgPrice = bucket['4'].value;
          const numberOfTrades = bucket.doc_count;
          sellersTable = sellersTable + `@${seller}| ${totalVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          totalVol = totalVol + bucket['1'].value;
          totalQuan = totalQuan + bucket['3'].value;
          avgPr = avgPr + bucket['4'].value;
          otherTrades = otherTrades + bucket.doc_count
        }
        number = index;
        console.log(`\n \nData (JSON): \n`, bucket);
      });
      sellersTable = sellersTable + `__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}|${otherTrades}\n`
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
      let sellReceivedHive = buckets[0]['1'].value.toFixed(4)
      let sellSoldToken = buckets[0]['3'].value.toFixed(4)
      let sellAvgPrice = buckets[0]['4'].value.toFixed(4)
      let buyReceivedHive = buckets[1]['1'].value.toFixed(4)
      let buySoldToken = buckets[1]['3'].value.toFixed(4)
      let buyAvgPrice = buckets[1]['4'].value.toFixed(4)
      let totalAvgPrice = ((parseFloat(sellAvgPrice)+parseFloat(buyAvgPrice))/2).toFixed(5);
      //ToDo: sell und Buy gegen echte Daten eintauschen
      let buyVsSellerTable = `sell|${sellReceivedHive}|${sellSoldToken}|${sellAvgPrice}\nbuy|${buyReceivedHive}|${buySoldToken}|${buyAvgPrice}\n||||${totalAvgPrice}|\n`
      console.log("buyVsSellerTable = ", buyVsSellerTable);
      logStream.write(`buyVsSellerTable für ${token} = \n${buyVsSellerTable}\n`)
      return buyVsSellerTable;      
    })();

  return { buyersTableResult, sellersTableResult, buyVsSellResult }
}