const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/contentviews')
  .get((req, res) => {
    esHelper.contentViews((resp) => {
      res.send({ response: { data: resp } });
    });
  });

router.route('/topmovies')
  .get((req, res) => {
    esHelper.topMovies((resp) => {
      res.send({ response: { data: resp } });
    });
  });

router.route('/toppurchasedmovies')
  .get((req, res) => {
    esHelper.topPurchasedMovies((resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
