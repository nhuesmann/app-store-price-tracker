const { ObjectID } = require('mongodb');

const App = require('../../models/iosapp');
const Developer = require('../../models/developer');
const Category = require('../../models/category');

// const appOneId = new ObjectID();
// const appTwoId = new ObjectID();

const category = {
  _id: new ObjectID(),
  id: 6001,
  name: 'Weather',
  url: 'https://itunes.apple.com/us/genre/ios-weather/id6001'
};

const dropCategories = async () => {
  return await Category.remove({});
};

const populateCategory = async () => {
  await Category.remove({});

  return await new Category(category).save();
};

module.exports = {
  category,
  dropCategories,
  populateCategory
};
