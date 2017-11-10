const { ObjectId } = require('mongodb');

const Developer = require('../models/developer');

exports.developerDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  let developer = await Developer.findOne({ _id: id })
    .populate('apps', ['id', 'name']);
    // .populate('endpoint');

  res.send(developer);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};
