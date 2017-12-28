const { ObjectID } = require('mongodb');

const App = require('../../models/app');
const Developer = require('../../models/developer');
const Category = require('../../models/category');

// const appOneId = new ObjectID();
// const appTwoId = new ObjectID();

const category = {
  _id: new ObjectID(),
  id: 6001,
  name: 'Weather',
  url: 'https://itunes.apple.com/us/genre/ios-weather/id6001',
};

const developer = {
  _id: new ObjectID(),
  id: 300186801,
  name: 'SQUARE ENIX INC',
  sellerName: 'SQUARE ENIX INC',
  url: 'https://itunes.apple.com/us/developer/square-enix-inc/id300186801',
};

const dropCategories = async () => await Category.remove({});

const populateCategory = async () => {
  await Category.remove({});

  return await new Category(category).save();
};

const populateDeveloper = async () => {
  await Developer.remove({});

  return await new Developer(developer).save();
};

module.exports = {
  category,
  developer,
  dropCategories,
  populateCategory,
  populateDeveloper,
};
