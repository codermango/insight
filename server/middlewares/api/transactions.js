/**
 * Created by mark on 7/12/16.
 */
const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/time')
  .get((req, res) => {
    esHelper.timeTransactions((resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
