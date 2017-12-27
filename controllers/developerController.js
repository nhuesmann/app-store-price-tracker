const { ObjectId } = require('mongodb');

const Developer = require('../models/developer');

exports.GetDeveloper = async function GetDeveloper(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  const developer = await Developer.findOne({ _id: id }).populate('apps', ['id', 'name']);
  // .populate('endpoint');

  // TODO: Need to work this out with the async wrapper to be able to specify status codes
  // Is the async wrapper ideal or should I just use try/catch?? I like this version
  // without try/catch, it is cleaner
  if (!developer) throw new Error('developer not found');

  res.send(developer);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.UpdateDeveloper = async function UpdateDeveloper(req, res, next) {
  res.send('function for updating an individual developer');
};
