const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/')
  .get((req, res) => {
    esHelper.contentViews((resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
