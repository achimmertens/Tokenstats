(async () => {
    const fetch = (await import('node-fetch')).default;
  
    const response = await fetch('http://raspi:9200/leo/_search?size=10000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'kbn-xsrf': 'true',
      },
      body: JSON.stringify({
        query: {
          range: {
            timestamp: {
              gte: '2023-04-14T05:38:08.988Z',
              lte: '2023-04-21T05:38:08.988Z',
              format: 'strict_date_optional_time||epoch_millis',
            },
          },
        },
        aggs: {
          buyers: {
            terms: {
              field: 'buyer.keyword',
              size: 10
            },
            aggs: {
              total_quantity: {
                sum: {
                  field: 'quantity'
                }
              }
            }
          }
        }
      }),
    });
  
    const data = await response.json();
    const amount = data.hits.hits.length
    console.log("Die Menge der Datensätze = ", amount)

    const buckets = data.aggregations.buyers.buckets;


console.log(`Found ${buckets.length} buyers.`);



    for (let i = 0; i < amount; i++) {
      console.log("Index:", data.hits.hits[i]._index);
      console.log("ID:", data.hits.hits[i]._id);
      console.log("Symbol:", data.hits.hits[i]._source.symbol);
      console.log("Price:", data.hits.hits[i]._source.price);
      console.log("Timestamp:", data.hits.hits[i]._source.timestamp);
    }
    console.log(data.hits.hits[amount-1])

    buckets.forEach(bucket => {
      console.log(`${bucket.key}: ${bucket.doc_count}`);
    });

    buckets.forEach(bucket => {
      const buyer = bucket.key;
      const totalQuantity = bucket.total_quantity.value;
      console.log(`Buyer: ${buyer}, Total quantity: ${totalQuantity}`);
    });

  })();
  