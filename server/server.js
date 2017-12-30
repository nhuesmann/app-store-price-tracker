require('./config/config');

const logger = require('morgan');
const bodyParser = require('body-parser');

const app = require('express')();
const routes = require('./routes');
const mongoose = require('./config/mongoose');

// Do not need logger when running test suite
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/', routes);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// TODO: what should the endpoint response be? Need a unified format. I.E. figure
// out what to reply with when resource is created vs when retrieved. Also need to
// figure out how to send specific codes back (201 created vs 200);

/*
const { AssertionError } = require('assert');
const { MongoError } = require('mongodb');

app.use(function handleAssertionError(error, req, res, next) {
  if (error instanceof AssertionError) {
    return res.status(400).json({
      type: 'AssertionError',
      message: error.message
    });
  }
  next(error);
});

app.use(function handleDatabaseError(error, req, res, next) {
  if (error instanceof MongoError) {
    return res.status(503).json({
      type: 'MongoError',
      message: error.message
    });
  }
  next(error);
});
*/


app.use((err, req, res, next) => {

  // TODO: edit the error to include the error object in development, but not in prod
  // find out what "locals" is, and what "req.app.get('env')" is

  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  //
  console.error(err.stack);
  // res.status(err.status || 422).send({ error: err.message });
  res.status(err.status || 500).send({ error: err.message });

  // .send(err);
  // TODO: decide which format to use! just message? full error is prob better
});

module.exports = app;
