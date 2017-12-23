const express = require('express');
// const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://localhost/apptracker';
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongoDB, { useMongoClient: true });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/', routes);

// routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);
  res.status(err.status || 422).send({ error: err.message });

  // .send(err);
  // TODO: decide which format to use! just message? full error is prob better
});

module.exports = app;
