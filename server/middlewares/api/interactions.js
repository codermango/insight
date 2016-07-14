const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/completeness')
  .get((req, res) => {
    const index = 'test_cmore_content_view_3';
    const query = {
      size: 0,
      query: {
        filtered: {
          query: {
            query_string: {
              query: '*',
              analyze_wildcard: true,
            },
          },
          filter: {
            bool: {
              must: [
                {
                  range: {
                    numUsers: {
                      gt: 30,
                    },
                  },
                },
              ],
            },
          },
        },
      },
      aggs: {
        content: {
          histogram: {
            field: 'averagePercentFinished',
            interval: 5,
          },
        },
      },
    };
    esHelper.aggsQuery(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });

router.route('/average')
  .get((req, res) => {
    const index = 'test_cmore_user_interactions_over_time_views_3';
    const query = {
      size: 0,
      query: {
        query_string: {
          analyze_wildcard: true,
          query: '*',
        },
      },
      aggs: {
        content: {
          date_histogram: {
            field: 'dateTime',
            interval: '1W',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
          aggs: {
            child: {
              avg: {
                field: 'averageNumInteractionsPerWeek',
              },
            },
          },
        },
      },
    };
    esHelper.aggsChildQuery(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
