const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: '192.168.1.122:9200',
});

const dataToD3Json = (data) => ({ x: data.key, y: data.doc_count, label: data.doc_count });

const aggsFixer = (data) => data.map(d => dataToD3Json(d));

const movieFixer = (movies) => movies.map(movie => movie._source);

const createOrUpdate = (parentObj, key, colorRange) => {
  const newObj = parentObj;
  if (!newObj.hasOwnProperty(key)) {
    newObj[key] = {
      name: key,
      data: [],
      count: 0,
      color: `hsl(${colorRange}, 100%, 50%)`,
    };
  }
  return newObj;
};

const cummulativeFixer = (buckets) => {
  var itemData = {}; // eslint-disable-line
  const colorRange = 360 / buckets.length;

  buckets.map(bucket =>
    bucket.genres.buckets.map((b, i) => {
      itemData = createOrUpdate(itemData, b.key, colorRange * i);
      const sum = bucket.genres.buckets.reduce((s, json) => s + json.doc_count, 0);
      const y = Math.ceil((b.doc_count / (sum + bucket.genres.sum_other_doc_count)) * 100);
      const d = { x: bucket.key, y, label: y };
      itemData[b.key].count += b.doc_count;
      itemData[b.key].data.push(d);
      return itemData;
    })
  );

  return Object.keys(itemData).map(item => itemData[item]);
};

const contentViews = (cb) => {
  client.search({
    index: 'test_cmore_content_over_time_3',
    body: {
      size: 0,
      query: {
        query_string: {
          query: '*',
          analyze_wildcard: true,
        },
      },
      aggs: {
        content: {
          date_histogram: {
            field: 'dateTime',
            interval: '1M',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
        },
      },
    },
  }).then((resp) => {
    cb(aggsFixer(resp.aggregations.content.buckets));
  }, (err) => {
    cb(err.message);
  });
};

const topMovies = (cb) => {
  client.search({
    index: 'test_cmore_content_view_3',
    body: {
      query: {
        match_all: {},
      },
      sort: [
        {
          numUsers: {
            order: 'desc',
          },
        },
      ],
    },
  }).then((resp) => {
    cb(movieFixer(resp.hits.hits));
  }, (err) => {
    cb(err.message);
  });
};

const timeGenres = (cb) => {
  client.search({
    index: 'test_cmore_content_over_time_3',
    body: {
      size: 0,
      query: {
        query_string: {
          query: '*',
          analyze_wildcard: true,
        },
      },
      aggs: {
        content: {
          date_histogram: {
            field: 'dateTime',
            interval: '1M',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
          aggs: {
            genres: {
              terms: {
                field: 'genres.name',
                size: 10,
                order: {
                  _count: 'desc',
                },
              },
            },
          },
        },
      },
    },
  }).then((resp) => {
    cb(cummulativeFixer(resp.aggregations.content.buckets));
  }, (err) => {
    cb(err.message);
  });
};

const topPurchasedMovies = (cb) => {
  client.search({
    index: 'test_plejmo_transaction_data',
    body: {
      query: {
        query_string: {
          query: '*',
          analyze_wildcard: true,
        },
      },
      size: 0,
      aggs: {
        content: {
          terms: {
            field: 'imdb_id',
            size: 10,
            order: {
              total_purchase_amount: 'desc',
            },
          },
          aggs: {
            total_purchase_amount: {
              sum: {
                field: 'purchase_amount_sek',
              },
            },
          },
        },
      },
    },
  }).then((resp) => {
    cb(resp.aggregations.content.buckets.map(movie => ({
      vionelID: movie.key,
      name: movie.key,
      purchase_amount: Number(Number(movie.total_purchase_amount.value).toFixed(2)),
      thumbnailUrl: 'http://image.tmdb.org/t/p/w185/niYdnzkrtBduR5lKtfeLXKXNaTT.jpg',
    })));
  }, (err) => {
    cb(err.message);
  });
};

const timeTransactions = (cb) => {
  client.search({
    index: 'test_plejmo_transaction_with_currency_data',
    body: {
      query: {
        query_string: {
          query: '*',
          analyze_wildcard: true,
        },
      },
      size: 0,
      aggs: {
        content: {
          terms: {
            field: 'purchase_date_year_month',
            size: 50,
            order: {
              _term: 'asc',
            },
          },
          aggs: {
            currency: {
              terms: {
                field: 'currency_code',
                size: 5,
                order: {
                  _count: 'desc',
                },
              },
            },
          },
        },
      },
    },
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.filter(item => item.key > '201412' && item.key < '201601');

    const timeList = buckets.map(item => item.key);
    const sekList = buckets.map(item => item.currency.buckets[0].doc_count);
    const nokList = buckets.map(item => item.currency.buckets[1].doc_count);
    const eurList = buckets.map(item => item.currency.buckets[2].doc_count);
    const dkkList = buckets.map(item => item.currency.buckets[3].doc_count);

    const sekTime = timeList.map((item, i) => ({ x: new Date(`${item.slice(0, 4)}-${item.slice(4)}`).getTime(), y: sekList[i], label: sekList[i] }));
    const nokTime = timeList.map((item, i) => ({ x: new Date(`${item.slice(0, 4)}-${item.slice(4)}`).getTime(), y: nokList[i], label: nokList[i] }));
    const eurTime = timeList.map((item, i) => ({ x: new Date(`${item.slice(0, 4)}-${item.slice(4)}`).getTime(), y: eurList[i], label: eurList[i] }));
    const dkkTime = timeList.map((item, i) => ({ x: new Date(`${item.slice(0, 4)}-${item.slice(4)}`).getTime(), y: dkkList[i], label: dkkList[i] }));
    const itemDataList = [
      { name: 'SEK', data: sekTime, color: 'hsl(0, 100%, 50%)' },
      { name: 'NOK', data: nokTime, color: 'hsl(32.72727272727273, 100%, 50%)' },
      { name: 'EUR', data: eurTime, color: 'hsl(65.45454545454545, 100%, 50%)' },
      { name: 'DKK', data: dkkTime, color: 'hsl(98.18181818181819, 100%, 50%)' },
    ];
    cb(itemDataList);
  }, (err) => {
    cb(err.message);
  });
};

module.exports = {
  contentViews,
  topMovies,
  timeGenres,
  topPurchasedMovies,
  timeTransactions,
};
