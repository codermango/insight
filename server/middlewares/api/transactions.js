/**
 * Created by mark on 7/12/16.
 */
const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/time')
  .get((req, res) => {
    const index = 'test_plejmo_transaction_with_currency_data';
    const query = {
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
    };

    esHelper.timeTransactions(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
