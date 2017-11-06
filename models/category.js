const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: Number, // primaryGenreId
  name: String, // primaryGenreName
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
