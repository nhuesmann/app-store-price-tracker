const { ObjectId } = require('mongodb');
const apiError = require('../helpers/error');

const User = require('../models/user');

// GET: /users/:id
// Retrieves user detail from db for a single user. Receives object id and queries db.
exports.GetUser = async function GetUser(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(apiError.nonObjectID());
  }

  const user = await User.findOne({ _id: id }).populate('wishlist');
  // .populate('endpoint');

  if (!user) {
    return res.status(400).json(apiError.zeroResults('user'));
  }

  res.json(user);
};

// POST: /users
// Creates a single user. Receives a JSON body of the user and calls appCreate.
exports.CreateUser = async function CreateUser(req, res, next) {
  const { email, password } = req.body;
  const user = new User({ email, password });

  const userSaved = await user.save();

  res.status(201).json(userSaved);
};
