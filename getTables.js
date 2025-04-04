const { By } = require('selenium-webdriver');
const fs = require('fs');
const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

module.exports = async function getTables(token, oneWeekAgoString, currentDateString) {

  // Table of Top 20 Buyers
  const buyersTableResult = await
    (async () => {
      try {
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
                  "field": "buyer.keyword",
                  "order": {
                    "1": "desc"
                  },
                  "missing": "__missing__",  
                  "size": 4000 
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
        
        // Check if data and hits exist
        if (!data || !data.hits || !data.hits.hits || !data.hits.hits.length) {
          console.log("No data found for buyers");
          return "No data available for buyers";
        }
        
        const amount = data.hits.hits.length;
        if (amount > 4000) {
          setTimeout(() => {
            console.log('\x1b[31m **************************\n   WARNUNG !!!!\nEs sind mehr Datensätze vorhanden, als abgerufen werden !!!\n************************** \x1b[0m');
            console.log("Menge der Datensätze: ", amount);
          }, 5000);
        }
        
        // Safely log the last record
        if (amount > 0) {
          console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1]);
        }
        
        // Check if aggregations exist
        if (!data.aggregations || !data.aggregations.buyers || !data.aggregations.buyers.buckets) {
          console.log("No aggregation data found for buyers");
          return "No aggregation data available for buyers";
        }
        
        const buckets = data.aggregations.buyers.buckets;
        console.log(`Found ${buckets.length} buyers. Here is the number of trades for each buyer:`);
        buckets.forEach(bucket => {
          console.log(`@${bucket.key}: ${bucket.doc_count}`);
        });

        let buyersTable = '';
        console.log(`Here is the sorted list: Buyers of ${token}|Sold $HIVE|Bought ${token}|Avg. Price:`);
        let otherVol = 0;
        let otherQuan = 0;
        let avgPr = 0;
        let OtherAvgPr = 0;
        let number = 0;
        let otherTrades = 0;
        let volumeSum = 0;
        let quantitySum = 0;
        let otherVolPerc = 0;
        let totalAvgPr = 0;
        let avgPrTop20 = 0;
        let numberOfTradesTop20 = 0;
        
        // Safely calculate sums
        buckets.forEach((bucket, index) => {
          if (bucket['1'] && bucket['1'].value !== undefined) {
            volumeSum = (parseFloat(volumeSum) + parseFloat(bucket['1'].value)).toFixed(5);
          }
          if (bucket['3'] && bucket['3'].value !== undefined) {
            quantitySum = (parseFloat(quantitySum) + parseFloat(bucket['3'].value)).toFixed(5);
          }
        });
        
        buckets.forEach((bucket, index) => {
          if (index < 20) {
            const buyer = bucket.key || "unknown";
            const totalQuantity = bucket['3'] && bucket['3'].value !== undefined ? bucket['3'].value.toFixed(5) : "0.00000";
            const totalVolume = bucket['1'] && bucket['1'].value !== undefined ? bucket['1'].value.toFixed(5) : "0.00000";
            const percVolume = parseFloat(volumeSum) > 0 ? (totalVolume * 100 / parseFloat(volumeSum)).toFixed(2) + " %" : "0.00 %";
            const avgPrice = bucket['4'] && bucket['4'].value !== undefined ? bucket['4'].value.toFixed(5) : "0.00000";
            avgPrTop20 = avgPrTop20 + parseFloat(avgPrice);
            const numberOfTrades = bucket.doc_count || 0;
            numberOfTradesTop20 = numberOfTradesTop20 + parseInt(numberOfTrades);
            buyersTable = buyersTable + `@${buyer}| ${totalVolume}|${percVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`;
          }
          else {
            if (bucket['1'] && bucket['1'].value !== undefined) {
              otherVol = (parseFloat(otherVol) + parseFloat(bucket['1'].value)).toFixed(5);
            }
            if (bucket['3'] && bucket['3'].value !== undefined) {
              otherQuan = (parseFloat(otherQuan) + parseFloat(bucket['3'].value)).toFixed(5);
            }
            if (bucket['4'] && bucket['4'].value !== undefined) {
              avgPr = avgPr + bucket['4'].value;
            }
            otherTrades = (parseInt(otherTrades) + parseInt(bucket.doc_count || 0));
          }
          number = index;
        });
        
        // Safely calculate averages and percentages
        OtherAvgPr = number > 20 ? (avgPr / (number - 20 + 1)).toFixed(5) : "0.00000";
        otherVolPerc = parseFloat(volumeSum) > 0 ? (otherVol * 100 / parseFloat(volumeSum)).toFixed(2) : "0.00";
        totalAvgPr = number > 0 ? ((avgPrTop20 + avgPr) / (number + 1)).toFixed(5) : "0.00000";
        
        buyersTable = buyersTable + `__others__|${otherVol}|${otherVolPerc} %|${otherQuan}|${OtherAvgPr}|${otherTrades}\n`;
        buyersTable = buyersTable + `__Sum:__|${volumeSum}|100 %|${quantitySum}|${totalAvgPr}|${otherTrades + numberOfTradesTop20}\n`;
        
        return buyersTable;
      } catch (error) {
        console.error("Error in buyersTableResult:", error);
        return "Error processing buyers data: " + error.message;
      }
    })();

  // Table of Top 20 Sellers
  const sellersTableResult = await
    (async () => {
      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://raspi:9200/${token}/_search?size=10000`, {  
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
                  "missing": "__missing__",  
                  "size": 4000 
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
        
        // Check if data and hits exist
        if (!data || !data.hits || !data.hits.hits || !data.hits.hits.length) {
          console.log("No data found for sellers");
          return "No data available for sellers";
        }
        
        const amount = data.hits.hits.length;
        if (amount > 4000) {
          setTimeout(() => {
            console.log(`**************************\n   WARNUNG !!!!\nEs sind mehr Datensätze vorhanden, als abgerufen werden !!!\n**************************`);
            console.log("Menge der Datensätze: ", amount);
          }, 5000);
        }
        
        // Safely log the last record
        if (amount > 0) {
          console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1]);
        }
        
        // Check if aggregations exist
        if (!data.aggregations || !data.aggregations.sellers || !data.aggregations.sellers.buckets) {
          console.log("No aggregation data found for sellers");
          return "No aggregation data available for sellers";
        }
        
        const buckets = data.aggregations.sellers.buckets;
        console.log(`Found ${buckets.length} sellers. Here is the number of trades for each seller:`);
        buckets.forEach(bucket => {
          console.log(`@${bucket.key}: ${bucket.doc_count}`);
        });

        console.log(`Here is the sorted list: Sellers of ${token}|Earned $HIVE|Sold ${token}|Avg. Price`);
        let sellersTable = '';
        let otherVol = 0;
        let otherQuan = 0;
        let avgPr = 0;
        let OtherAvgPr = 0;
        let number = 0;
        let otherTrades = 0;
        let volumeSum = 0;
        let quantitySum = 0;
        let otherVolPerc = 0;
        let totalAvgPr = 0;
        let avgPrTop20 = 0;
        let numberOfTradesTop20 = 0;
        
        // Safely calculate sums
        buckets.forEach((bucket, index) => {
          if (bucket['1'] && bucket['1'].value !== undefined) {
            volumeSum = (parseFloat(volumeSum) + parseFloat(bucket['1'].value)).toFixed(5);
          }
          if (bucket['3'] && bucket['3'].value !== undefined) {
            quantitySum = (parseFloat(quantitySum) + parseFloat(bucket['3'].value)).toFixed(5);
          }
        });
        
        buckets.forEach((bucket, index) => {
          if (index < 20) {
            const seller = bucket.key || "unknown";
            const totalQuantity = bucket['3'] && bucket['3'].value !== undefined ? bucket['3'].value.toFixed(5) : "0.00000";
            const totalVolume = bucket['1'] && bucket['1'].value !== undefined ? bucket['1'].value.toFixed(5) : "0.00000";
            const avgPrice = bucket['4'] && bucket['4'].value !== undefined ? bucket['4'].value.toFixed(5) : "0.00000";
            const percVolume = parseFloat(volumeSum) > 0 ? (totalVolume * 100 / parseFloat(volumeSum)).toFixed(2) + " %" : "0.00 %";
            const numberOfTrades = bucket.doc_count || 0;
            numberOfTradesTop20 = numberOfTradesTop20 + parseInt(numberOfTrades);
            avgPrTop20 = avgPrTop20 + parseFloat(avgPrice);
            sellersTable = sellersTable + `@${seller}| ${totalVolume}|${percVolume}|${totalQuantity}|${avgPrice}|${numberOfTrades}\n`;
          }
          else {
            if (bucket['1'] && bucket['1'].value !== undefined) {
              otherVol = (parseFloat(otherVol) + parseFloat(bucket['1'].value)).toFixed(5);
            }
            if (bucket['3'] && bucket['3'].value !== undefined) {
              otherQuan = (parseFloat(otherQuan) + parseFloat(bucket['3'].value)).toFixed(5);
            }
            if (bucket['4'] && bucket['4'].value !== undefined) {
              avgPr = avgPr + bucket['4'].value;
            }
            otherTrades = otherTrades + (bucket.doc_count || 0);
          }
          number = index;
        });
        
        // Safely calculate averages and percentages
        OtherAvgPr = number > 20 ? (avgPr / (number - 20 + 1)).toFixed(5) : "0.00000";
        otherVolPerc = parseFloat(volumeSum) > 0 ? (otherVol * 100 / parseFloat(volumeSum)).toFixed(2) : "0.00";
        totalAvgPr = number > 0 ? ((avgPrTop20 + avgPr) / (number + 1)).toFixed(5) : "0.00000";
        
        sellersTable = sellersTable + `__others__|${otherVol}|${otherVolPerc} %|${otherQuan}|${OtherAvgPr}|${otherTrades}\n`;
        sellersTable = sellersTable + `__Sum:__|${volumeSum}|100 %|${quantitySum}|${totalAvgPr}|${otherTrades + numberOfTradesTop20}\n`;
        
        return sellersTable;
      } catch (error) {
        console.error("Error in sellersTableResult:", error);
        return "Error processing sellers data: " + error.message;
      }
    })();

  // Table of $TOKEN Buy vs. Sell Request
  const buyVsSellResult = await
    (async () => {
      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://raspi:9200/${token}/_search?size=10000`, {  
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
        
        // Check if data and hits exist
        if (!data || !data.hits || !data.hits.hits || !data.hits.hits.length) {
          console.log("No data found for buy vs sell");
          return "No data available for buy vs sell";
        }
        
        const amount = data.hits.hits.length;
        console.log("Menge der buyVsSell-Datensätze: ", amount);
        
        // Safely log the last record
        if (amount > 0) {
          console.log("Inhalt des letzten Datensatzes: ", data.hits.hits[amount - 1]);
        }
        
        // Check if aggregations exist
        if (!data.aggregations || !data.aggregations["5"] || !data.aggregations["5"].buckets) {
          console.log("No aggregation data found for buy vs sell");
          return "No aggregation data available for buy vs sell";
        }
        
        const buckets = data.aggregations["5"].buckets;
        
        // Handle different bucket counts
        if (buckets.length === 0) {
          console.log("WARNUNG: Keine Buckets gefunden! Verarbeitung wird übersprungen.");
          return "No buckets found for buy vs sell";
        }
        
        let buyVsSellerTable = "";
        
        if (buckets.length === 1) {
          // Handle case with only one bucket
          console.log("WARNUNG: Nur ein Bucket gefunden! Verarbeitung wird angepasst.");
          
          let request0 = buckets[0]?.key || "N/A";
          let req0ReceivedHive = buckets[0]?.['1']?.value?.toFixed(5) || "0.00000";
          let req0SoldToken = buckets[0]?.['3']?.value?.toFixed(5) || "0.00000";
          let req0AvgPrice = buckets[0]?.['4']?.value?.toFixed(5) || "0.00000";
          
          buyVsSellerTable = `${request0}|${req0ReceivedHive}|100%|${req0SoldToken}|${req0AvgPrice}\n|sum: |${req0ReceivedHive}|100%|${req0SoldToken}|${req0AvgPrice}|\n`;
        } else {
          // Handle case with two or more buckets
          let request0 = buckets[0]?.key || "N/A";
          let request1 = buckets[1]?.key || "N/A";
          
          let req0ReceivedHive = buckets[0]?.['1']?.value?.toFixed(5) || "0.00000";
          let req0SoldToken = buckets[0]?.['3']?.value?.toFixed(5) || "0.00000";
          let req0AvgPrice = buckets[0]?.['4']?.value?.toFixed(5) || "0.00000";
          
          let req1ReceivedHive = buckets[1]?.['1']?.value?.toFixed(5) || "0.00000";
          let req1SoldToken = buckets[1]?.['3']?.value?.toFixed(5) || "0.00000";
          let req1AvgPrice = buckets[1]?.['4']?.value?.toFixed(5) || "0.00000";
          
          let receivedHiveSum = parseFloat(req0ReceivedHive) + parseFloat(req1ReceivedHive);
          let soldBeerSum = parseFloat(req0SoldToken) + parseFloat(req1SoldToken);
          
          // Avoid division by zero
          let req1ReceivedHivePercentages = receivedHiveSum > 0 ? 
            (parseFloat(req1ReceivedHive) / receivedHiveSum * 100).toFixed(2) : "0.00";
          let req0ReceivedHivePercentages = receivedHiveSum > 0 ? 
            (parseFloat(req0ReceivedHive) / receivedHiveSum * 100).toFixed(2) : "0.00";
          
          let totalAvgPrice = ((parseFloat(req0AvgPrice) + parseFloat(req1AvgPrice)) / 2).toFixed(5);
          
          buyVsSellerTable = `${request0}|${req0ReceivedHive}|${req0ReceivedHivePercentages}%|${req0SoldToken}|${req0AvgPrice}\n${request1}|${req1ReceivedHive}|${req1ReceivedHivePercentages}%|${req1SoldToken}|${req1AvgPrice}\n|sum: |${receivedHiveSum}|100%|${soldBeerSum}|${totalAvgPrice}|\n`;
        }
        
        console.log("buyVsSellerTable = ", buyVsSellerTable);
        logStream.write(`buyVsSellerTable für ${token} = \n${buyVsSellerTable}\n`);
        
        return buyVsSellerTable;
      } catch (error) {
        console.error("Error in buyVsSellResult:", error);
        return "Error processing buy vs sell data: " + error.message;
      }
    })();

  return { buyersTableResult, sellersTableResult, buyVsSellResult };
}

// Test function to demonstrate error handling
async function testFunction() {
  try {
    const result = await getTables('beer', '2025-03-26', '2025-04-02');
    console.log("Successfully processed all tables");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Uncomment to test
// testFunction();