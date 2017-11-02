const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/ios_app_webscraper');
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(422)
    .send({ error: err.message });
});

module.exports = app;
