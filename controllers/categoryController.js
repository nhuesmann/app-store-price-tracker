// const App = require('../models/ios_app');
// const AppNew = require('../models/appNew');
// const Developer = require('../models/developer');
const Category = require('../models/category');

exports.categoryCreate = async function (req, res, next) {
  var category = new Category({
    id: req.body.id,
    name: req.body.name,
  });

  var saved = await category.save();
  res.send(saved.name);

};
