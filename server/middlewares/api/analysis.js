/**
 * Created by mark on 7/25/16.
 */

const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/dashboarddata')
  .get((req, res) => {
    const index = 'test_cmore_main_page';
    const query = {
      query: {
        match_all: {},
      },
    };

    esHelper.dashboardData(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
