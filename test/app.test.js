const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../app');

const App = require('../models/iosapp');
const Developer = require('../models/developer');
const Category = require('../models/category');

const { category, dropCategories, populateCategory } = require('./seed/seed');

describe('THE SERVER', () => {
  it('should handle a GET request to /', async () => {
    const response = (
      await request(app)
      .get('/v1')
      .expect(200)
    ).body;

    expect(response.message).to.equal('Connected successfully');
  });
});

/////////////////////////////// CATEGORIES ///////////////////////////////

describe('CATEGORIES', () => {
  describe('GET /categories/:id', () => {
    before(populateCategory);

    it('should return a category with the given id', async () => {
      const response = (
        await request(app)
        .get(`/v1/categories/${category._id.toHexString()}`)
        .expect(200)
      ).body;

      expect(response.name).to.equal(category.name);
    });

    // it should return error for invalid object id (SPECIFY THE ERROR)
    // it should return error for id not found (SPECIFY THE ERROR)
  });

  describe('GET /categories:sync', () => {
    beforeEach(dropCategories);

    it('should create categories when the collection is empty', async () => {
      let categories = await Category.find({});

      expect(categories).to.be.empty;

      const response = (
        await request(app)
        .get('/v1/categories:sync')
        .expect(200)
      ).body;

      categories = await Category.find({});

      expect(categories).to.be.an('array');
      expect(categories).to.not.be.empty;
      // TODO: expect it to have keys (all the required keys)?...
    });

    it('should update and not replace existing categories', async () => {
      const initialCategory = new Category(category);
      await initialCategory.save();

      const response = (
        await request(app)
          .get('/v1/categories:sync')
          .expect(200)
      ).body;


      // Expecting the original category to still exist (not overwritten by sync)
      const updatedCategory = await Category.findOne({ _id: initialCategory._id });

      const initialCategoryCreatedAt = initialCategory.createdAt.getTime();
      const updatedCategoryCreatedAt = updatedCategory.createdAt.getTime();
      const updatedCategoryUpdatedAt = updatedCategory.updatedAt.getTime();

      expect(initialCategoryCreatedAt).to.equal(updatedCategoryCreatedAt);
      expect(updatedCategoryUpdatedAt).to.not.equal(updatedCategoryCreatedAt);
    });
  });
});
