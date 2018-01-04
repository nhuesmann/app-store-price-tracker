const { ObjectId } = require('mongodb');
const apiError = require('../helpers/error');

const Tracker = require('../models/tracker');

// GET: /users/:id/trackers
// Retrieves a user's wishlist.
exports.ListTrackers = async function ListTrackers(req, res, next) {
  const wishlist = await Tracker.find({ creator: req.params.id }).populate('app', ['id', 'name']);

  if (!wishlist) {
    return res.status(400).json(apiError.zeroResults('wishlist'));
  }
  res.json(wishlist);
};

// GET: /users/:id/trackers/:id
// Retrieves tracker detail from db for a single tracker. Receives object id and queries db.
exports.GetTracker = async function GetTracker(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(apiError.nonObjectID());
  }

  const tracker = await Tracker.findOne({ _id: id }).populate('app', ['id', 'name']);

  if (!tracker) {
    return res.status(400).json(apiError.zeroResults('tracker'));
  }

  res.json(tracker);
};

// POST: /users/:id/trackers
// Creates a single tracker. Receives a JSON body of the tracker and calls appCreate.
exports.CreateTracker = async function CreateTracker(req, res, next) {
  const tracker = new Tracker({
    creator: req.body.creator,
    app: req.body.app,
    is_tracking_updates: req.body.is_tracking_updates,
    is_tracking_price: req.body.is_tracking_price,
    desired_price: req.body.desired_price,
  });

  const trackerSaved = await tracker.save();

  res.status(201).json(trackerSaved);
};
