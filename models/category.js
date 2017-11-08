const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new Schema({
  id: { type: Number, index: { unique: true }, },
  name: String,
  url: String,
});

CategorySchema.plugin(uniqueValidator);
const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
