const { By } = require('selenium-webdriver');

// const {buyersTable, sellersTable} = await gettables("LEO",'2023-05-03T05:38:08.988Z','2023-05-10T05:38:08.988Z');
// console.log(buyersTable); // Output: 'foo'
// console.log(sellersTable); // Output: 'bar'


module.exports = async function getTables(token, oneWeekAgoString, currentDateString) {

  // Table of Top 20 Buyers

  const buyersTableResult = await
    (async () => {
      const oneWeekAgoString = '2023-05-05T08:38:08.988Z'
      const currentDateString = '2023-05-12T08:38:08.988Z'
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
                gte: oneWeekAgoString, // '2023-05-03T05:38:08.988Z',
                lte: currentDateString, //'2023-05-10T05:38:08.988Z',
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

      // for (let i = 0; i < amount; i++) {
      //   console.log("Index:", data.hits.hits[i]._index);
      //   console.log("ID:", data.hits.hits[i]._id);
      //   console.log("Symbol:", data.hits.hits[i]._source.symbol);
      //   console.log("Price:", data.hits.hits[i]._source.price);
      //   console.log("Timestamp:", data.hits.hits[i]._source.timestamp);
      // }
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
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const buyer = bucket.key;
          const totalQuantity = bucket['3'].value;
          const totalVolume = bucket['1'].value;
          const avgPrice = bucket['4'].value;
          const numberOfTrades = bucket.doc_count;
          //  console.log(`@${buyer}| ${totalVolume}|${totalQuantity}|${avgPrice}`);
          buyersTable = buyersTable + `@${buyer}| ${totalVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          totalVol = totalVol + bucket['1'].value;
          totalQuan = totalQuan + bucket['3'].value;
          avgPr = avgPr + bucket['4'].value;
        }
        number = index;
      });
      //console.log(`__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}`);
      buyersTable = buyersTable + `__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}\n`
      //    console.log('Die buyersTable sieht so aus:');
      //     console.log(buyersTable);
      return buyersTable;
    })();

  // Table of Top 20 Sellers
  const sellersTableResult = await
    (async () => {
      const oneWeekAgoString = '2023-05-05T08:38:08.988Z'
      const currentDateString = '2023-05-12T08:38:08.988Z'
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
      buckets.forEach((bucket, index) => {
        if (index < 20) {
          const seller = bucket.key;
          const totalQuantity = bucket['3'].value;
          const totalVolume = bucket['1'].value;
          const avgPrice = bucket['4'].value;
          const numberOfTrades = bucket.doc_count;
          //       console.log(`@${seller}| ${totalVolume}|${totalQuantity}|${avgPrice}`);
          sellersTable = sellersTable + `@${seller}| ${totalVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`
        }
        else {
          totalVol = totalVol + bucket['1'].value;
          totalQuan = totalQuan + bucket['3'].value;
          avgPr = avgPr + bucket['4'].value;
        }
        number = index;
        console.log(`\n \nData (JSON): \n`, bucket);
      });
      // console.log(`__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}`); // | ${bucket.total_quantity.value} | ${bucket.avg_price.value} 
      sellersTable = sellersTable + `__others__|${totalVol}|${totalQuan}|${avgPr / (number - 20)}\n`
      //  console.log('Die SellersTable sieht so aus: \n', sellersTable)
      return sellersTable;
    })();

  return { buyersTableResult, sellersTableResult }

}