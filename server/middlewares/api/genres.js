const express = require('express');
const esHelper = require('../helpers/elasticsearchHelper');

const router = express.Router(); // eslint-disable-line

router.route('/time')
  .get((req, res) => {
    const index = 'test_cmore_content_over_time_3';
    const query = {
      size: 0,
      query: {
        bool: {
          must: [
            {
              range: {
                dateTime: {
                  gte: req.query.startDate,
                  lt: req.query.endDate,
                },
              },
            },
          ],
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
          aggs: {
            genres: {
              terms: {
                field: 'genres.name',
                size: 10,
                order: {
                  _count: 'desc',
                },
              },
            },
          },
        },
      },
    };
    esHelper.timeGenres(query, index, (resp) => {
      res.send({ response: { data: resp } });
    });
  });

module.exports = router;
