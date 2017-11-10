const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new Schema({
  id: {
    type: Number,
    index: { unique: true },
  },
  name: String,
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

// CategorySchema.virtual('endpoint').get(() => `/category/${this._id}`);
CategorySchema.virtual('apps', {
  ref: 'app',
  localField: '_id',
  foreignField: 'categories',
});
CategorySchema.plugin(uniqueValidator);

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
