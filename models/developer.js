const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const cleanUrl = function cleanUrl(url) {
  return url ? url.replace(/\?(.*)/g, '') : null;
};

const DeveloperSchema = new Schema(
  {
    id: {
      type: Number,
      index: { unique: true },
    },
    name: String,
    sellerName: String,
    url: {
      type: String,
      set: cleanUrl,
    },
  },
  {
    timestamps: true,
    runSettersOnQuery: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// DeveloperSchema.virtual('endpoint').get(() => `/developer/${this._id}`);
DeveloperSchema.virtual('apps', {
  ref: 'app',
  localField: '_id',
  foreignField: 'developer',
});
DeveloperSchema.plugin(uniqueValidator);

const Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;
