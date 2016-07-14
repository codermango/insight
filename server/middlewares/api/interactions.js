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

module.exports = router;
