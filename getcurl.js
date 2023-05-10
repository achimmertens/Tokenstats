(async () => {
    const fetch = (await import('node-fetch')).default;
  
    const response = await fetch('http://raspi:9200/leo/_search?size=10000', {  //Todo: wenn mehr als 10000, dann darstellen
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'kbn-xsrf': 'true',
      },
      body: JSON.stringify({
        query: {
          range: {
            timestamp: {
              gte: '2023-05-03T05:38:08.988Z',
              lte: '2023-05-10T05:38:08.988Z',
              format: 'strict_date_optional_time||epoch_millis',
            },
          },
        },
        // aggs: {
        //   buyers: {
        //     terms: {
        //       field: 'buyer.keyword',
        //       size: 1000  //Todo: Wenn mehr als 1000, soll dies dargestellt werden
        //     },
        //     aggs: {
        //       total_quantity: {
        //         sum: {
        //           field: 'quantity'
        //         }
        //       }
        //     }
        //   }
        // }

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
   
    for (let i = 0; i < amount; i++) {
      console.log("Index:", data.hits.hits[i]._index);
      console.log("ID:", data.hits.hits[i]._id);
      console.log("Symbol:", data.hits.hits[i]._source.symbol);
      console.log("Price:", data.hits.hits[i]._source.price);
      console.log("Timestamp:", data.hits.hits[i]._source.timestamp);
    }
    console.log("Menge der Datensätze: ", amount)
    console.log("Inhalt des letzten Datensatzes: ",data.hits.hits[amount-1])
    const buckets = data.aggregations.buyers.buckets;


    console.log(`Found ${buckets.length} buyers. Here is the number of trdase for each buyer:`);

    buckets.forEach(bucket => {
      console.log(`${bucket.key}: ${bucket.doc_count}`);
    });

    console.log ("Here is the sorted by volume list of Leo Buyers and the amount of the sold HIVE and bought LEO:")
    let totalVol=0;
    let totalQuan=0;
    let avgPr =0;
    let number=0;
    buckets.forEach((bucket,index) => {
      if (index<20){
      const buyer = bucket.key;
      const totalQuantity = bucket['3'].value;
      const totalVolume = bucket['1'].value;
      const avgPrice = bucket['4'].value;
      console.log(`@${buyer}| ${totalVolume}|${totalQuantity}|${avgPrice}`);
    }
    else{
      totalVol = totalVol+bucket['1'].value;
      totalQuan = totalQuan+bucket['3'].value;
      avgPr = avgPr+bucket['4'].value;
    }
    number=index;
    });

    console.log(`other|${totalVol}|${totalQuan}|${avgPr/(number-20)}`); // | ${bucket.total_quantity.value} | ${bucket.avg_price.value}     

  })();
  