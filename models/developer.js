const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const DeveloperSchema = new Schema({
  id: {
    type: Number,
    index: { unique: true },
  },
  name: String,
  nameFull: String,
  url: {
    type: String,
    set: cleanUrl,
  },
}, {
  timestamps: true,
  runSettersOnQuery: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

function cleanUrl(url) {
  return url ? url.replace(/\?(.*)/g, '') : '';
}

// DeveloperSchema.virtual('endpoint').get(() => `/developer/${this._id}`);
DeveloperSchema.virtual('apps', {
  ref: 'app',
  localField: '_id',
  foreignField: 'developer',
});
DeveloperSchema.plugin(uniqueValidator);

const Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;
