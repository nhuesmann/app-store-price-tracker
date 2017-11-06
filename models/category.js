const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: { type: String, required: [true, 'id is required.'] },
  name: { type: String, required: [true, 'name is required.'] },
  url: String,
  apps: [{
    type: Schema.Types.ObjectId,
    ref: 'app'
  }]
});

const Category = mongoose.model('genre', CategorySchema);

module.exports = Category;

// TODO: figure out how to distinguish primary genres vs subgenres...
// still think it may be a good idea to have this genre model
