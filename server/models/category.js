const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const cleanUrl = function cleanUrl(url) {
  return url ? url.replace(/\?(.*)/g, '') : '';
};

const CategorySchema = new Schema(
  {
    id: {
      type: Number,
      index: { unique: true },
    },
    name: String,
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

CategorySchema.virtual('endpoint').get(function endpoint() {
  return `/categories/${this._id}`;
});
CategorySchema.virtual('apps', {
  ref: 'app',
  localField: '_id',
  foreignField: 'categories',
});
CategorySchema.plugin(uniqueValidator);

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
