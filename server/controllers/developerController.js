const { ObjectId } = require('mongodb');
const apiError = require('../helpers/error');

const Developer = require('../models/developer');

exports.GetDeveloper = async function GetDeveloper(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(apiError.nonObjectID());
  }

  const developer = await Developer.findOne({ _id: id }).populate('apps', ['id', 'name']);
  // .populate('endpoint');

  if (!developer) {
    return res.status(400).json(apiError.zeroResults('developer'));
  }

  res.send(developer);
};

exports.UpdateDeveloper = async function UpdateDeveloper(req, res, next) {
  res.send('function for updating an individual developer');
};
