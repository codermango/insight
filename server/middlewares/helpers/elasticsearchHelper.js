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

const timeGenres = (query, index, cb) => {
  client.search({
    index,
    body: query,
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
  });
};

const aggsQuery = (query, index, cb) => {
  client.search({
    index,
    body: query,
  })
  .then((resp) => {
    cb(aggsFixer(resp.aggregations.content.buckets));
  }, (err) => {
    cb(err.message);
  });
};

const aggsChildQuery = (query, index, cb) => {
  client.search({
    index,
    body: query,
  })
  .then((resp) => {
    const dataFix = resp.aggregations.content.buckets.map(b => ({ x: b.key, y: b.child.value, label: b.child.value }));
    cb(dataFix);
  }, (err) => {
    cb(err.message);
  });
};

const timeTransactions = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.filter(item => item.key > '201412' && item.key < '201601');
    const dataObj = {};
    for (const timeItem of buckets) {
      const time = new Date(`${timeItem.key.slice(0, 4)}-${timeItem.key.slice(4)}`).getTime();
      for (const currencyItem of timeItem.currency.buckets) {
        if (currencyItem.key in dataObj) {
          dataObj[currencyItem.key].push({ x: time, y: currencyItem.doc_count, label: currencyItem.doc_count });
        } else {
          dataObj[currencyItem.key] = [{ x: time, y: currencyItem.doc_count, label: currencyItem.doc_count }];
        }
      }
    }

    const dataList = Object.keys(dataObj).map((key, i) => (
    { name: key, data: dataObj[key], color: `hsl(${360 / buckets.length * i}, 100%, 50%)` }
    ));

    cb(dataList);
  });
};

const genreTransactions = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const dataFix = resp.aggregations.content.buckets.map(b => ({
      x: b.key,
      y: Number(b.amount.value.toFixed(2)),
      label: Number(b.amount.value.toFixed(2)),
    }));
    cb(dataFix);
  });
};

const activeviewersAnalysis = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.slice(-3, -1);
    const previousValue = buckets[0].num_of_active_users.value;
    const currentValue = buckets[1].num_of_active_users.value;
    const change = (currentValue - previousValue) / previousValue * 100;
    const dataFix = {
      pre_value: previousValue,
      cur_value: currentValue,
      change_rate: Number(change.toFixed(2)),
    };
    cb(dataFix);
  });
};


const churnAnalysis = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.slice(-3, -1);
    const previousValue = buckets[0].num_of_current_lose_user.value / buckets[0].num_of_current_active_user.value * 100;
    const currentValue = buckets[1].num_of_current_lose_user.value / buckets[1].num_of_current_active_user.value * 100;
    const change = (currentValue - previousValue) / previousValue * 100;
    const dataFix = {
      pre_value: previousValue,
      cur_value: currentValue,
      change_rate: Number(change.toFixed(2)),
    };
    cb(dataFix);
  });
};


const averageAmountAnalysis = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.slice(-3, -1);
    const previousValue = buckets[0].num_of_interactions.value;
    const currentValue = buckets[1].num_of_interactions.value;
    const change = (currentValue - previousValue) / previousValue * 100;
    const dataFix = {
      pre_value: previousValue,
      cur_value: currentValue,
      change_rate: Number(change.toFixed(2)),
    };
    cb(dataFix);
  });
};


const averageViewTimeAnalysis = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.slice(-3, -1);
    const previousValue = buckets[0].current_value.value / 60;
    const currentValue = buckets[1].current_value.value / 60;
    const change = (currentValue - previousValue) / previousValue * 100;
    const dataFix = {
      pre_value: previousValue,
      cur_value: currentValue,
      change_rate: Number(change.toFixed(2)),
    };
    cb(dataFix);
  });
};


const personasActiveViewersAnalysis = (query, index, cb) => {
  client.search({
    index,
    body: query,
  }).then((resp) => {
    const buckets = resp.aggregations.content.buckets.slice(-2, -1);
    const personasBuckets = buckets[0].content.buckets;
    const sum = personasBuckets.map(item => item.data.value).reduce((x, y) => x + y, 0);
    const dataFix = {};
    for (const item of personasBuckets) {
      dataFix[`persona${item.key}`] = Number((item.data.value / sum * 100).toFixed(2));
    }
    cb(dataFix);
  });
};


module.exports = {
  contentViews,
  topMovies,
  timeGenres,
  topPurchasedMovies,
  timeTransactions,
  aggsQuery,
  aggsChildQuery,
  genreTransactions,
  activeviewersAnalysis,
  churnAnalysis,
  averageAmountAnalysis,
  averageViewTimeAnalysis,
  personasActiveViewersAnalysis,
};
