const App = require('../models/ios_app');

exports.appCreate = function (req, res) {
  res.send('function for creating an app');
};

exports.appDetail = function (req, res) {
  res.send('function for getting individual app detail');
};

exports.appUpdate = function (req, res) {
  res.send('function for updating an individual app');
};

exports.appDelete = function (req, res) {
  res.send('function for deleteing an individual app');
};

exports.appList = function (req, res) {
  res.send('function for getting a list of apps');
};
