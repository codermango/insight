const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: '192.168.1.122:9200',
});

const dataToD3Json = (data) => ({ x: data.key, y: data.doc_count, label: data.doc_count });

const aggsFixer = (data) => data.map(d => dataToD3Json(d));

const movieFixer = (movies) => movies.map(movie => movie._source);

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

module.exports = {
  contentViews,
  topMovies,
};
