const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const DeveloperSchema = new Schema({
//   id: { type: String, required: [true, 'id is required.'] },
//   name: String,
//   url: String,
//   apps: [{
//     type: Schema.Types.ObjectId,
//     ref: 'app'
//   }]
// });

const DeveloperSchema = new Schema({
  // id: Number, // artistId
  id: { type: Number, index: { unique: true }, },
  name: String, // artistName
  nameFull: String, // sellerName
  urlApple: String, // artistViewUrl
  urlDeveloper: String, // sellerUrl
});

const Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;
