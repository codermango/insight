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

module.exports = {
  contentViews,
  topMovies,
  timeGenres,
  aggsQuery,
  aggsChildQuery,
};
