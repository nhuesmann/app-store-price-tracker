const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const DeveloperSchema = new Schema({
  id: { type: Number, index: { unique: true }, },
  name: String,
  nameFull: String,
  urlApple: String,
  urlDeveloper: String,
});

DeveloperSchema.plugin(uniqueValidator);
const Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;
