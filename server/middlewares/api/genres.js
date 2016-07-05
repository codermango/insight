const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/time')
  .get((req, res) => {
    esHelper.timeGenres((resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
