const { ObjectId } = require('mongodb');

const Developer = require('../models/developer');

exports.GetDeveloper = async function GetDeveloper(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  const developer = await Developer.findOne({ _id: id }).populate('apps', ['id', 'name']);
  // .populate('endpoint');

  res.send(developer);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.UpdateDeveloper = async function UpdateDeveloper(req, res, next) {
  res.send('function for updating an individual developer');
};
