const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const TrackerSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    app: {
      type: Schema.Types.ObjectId,
      ref: 'app',
      required: true,
    },
    is_tracking_updates: {
      type: Boolean,
    },
    is_tracking_price: {
      type: Boolean,
    },
    desired_price: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    // toJSON: {
    //   virtuals: true,
    // },
    // toObject: {
    //   virtuals: true,
    // },
  },
);

// TrackerSchema.virtual('endpoint').get(function endpoint() {
//   return `/trackers/${this._id}`;
// });

// TrackerSchema.virtual('apps', {
//   ref: 'app',
//   localField: '_id',
//   foreignField: 'categories',
// });

TrackerSchema.plugin(uniqueValidator);

const Tracker = mongoose.model('tracker', TrackerSchema);

module.exports = Tracker;
