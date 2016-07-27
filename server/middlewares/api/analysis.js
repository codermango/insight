/**
 * Created by mark on 7/25/16.
 */

const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/activeviewers')
  .get((req, res) => {
    const index = 'test_cmore_user_interactions_over_time_views_2';
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
            interval: '1w',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
          aggs: {
            num_of_active_users: {
              sum: {
                field: 'numInteractionsCurrentWeek',
              },
            },
          },
        },
      },
    };

    esHelper.activeviewersAnalysis(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });


router.route('/churn')
  .get((req, res) => {
    const index = 'test_cmore_user_interaction_views_over_time_1_chang';
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
            interval: '1w',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
          aggs: {
            num_of_current_active_user: {
              sum: {
                field: 'isActiveCurrentWeek',
              },
            },
            num_of_current_lose_user: {
              sum: {
                field: 'lostUserCurrentWeek',
              },
            },
          },
        },
      },
    };

    esHelper.churnAnalysis(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });


router.route('/averageamount')
  .get((req, res) => {
    const index = 'test_cmore_user_interaction_views_over_time_1_chang';
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
            interval: '1w',
            time_zone: 'Europe/Berlin',
            min_doc_count: 1,
          },
          aggs: {
            num_of_interactions: {
              avg: {
                field: 'numInteractionsFinishedCurrentWeek',
              },
            },
          },
        },
      },
    };

    esHelper.averageAmountAnalysis(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });


module.exports = router;
