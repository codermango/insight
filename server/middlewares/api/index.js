const movies = require('./movies');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/movies', movies);

app.on('mount', () => {
  // console.log('Api is available at %s', app.mountpath);
});

module.exports = app;
