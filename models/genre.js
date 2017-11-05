const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: [true, 'name is required.'] },
  apps: [{
    type: Schema.Types.ObjectId,
    ref: 'app'
  }]
});

const Genre = mongoose.model('genre', GenreSchema);

module.exports = Genre;

// TODO: figure out how to distinguish primary genres vs subgenres...
// still think it may be a good idea to have this genre model
