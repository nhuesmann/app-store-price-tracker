const { ObjectId } = require('mongodb');

const Developer = require('../models/developer');

exports.developerDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  let app = await Developer.find({ _id: id });;

  res.send(app);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};
