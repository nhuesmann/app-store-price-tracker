const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const server = require('../server');

const App = require('../models/app');
const Developer = require('../models/developer');
const Category = require('../models/category');
const User = require('../models/user');

const {
  category,
  developer,
  app,
  user,
  dropCategories,
  populateCategory,
  populateDeveloper,
  populateApp,
  populateUser,
} = require('./seed/seed');

// TODO: figure out how to split the tests up...

// TODO: Temporarily disabling this until I revisit routing...
// will there be a home route?
// SEE THIS: https://www.caffeinecoding.com/better-express-routing-for-nodejs/

// describe('THE SERVER', () => {
//   it('should handle a GET request to /', async () => {
//     const response = (
//       await request(server)
//       .get('/v1')
//       .expect(200)
//     ).body;
//
//     expect(response.message).to.equal('Connected successfully');
//   });
// });

// ///////////////////////////// CATEGORIES ///////////////////////////////

describe('CATEGORIES', () => {
  describe('GET /categories/:id', () => {
    before(populateCategory);

    it('should return a category with the given id', async () => {
      const response = (await request(server)
        .get(`/v1/categories/${category._id.toHexString()}`)
        .expect(200)
      ).body;

      expect(response.name).to.equal(category.name);
    });

    it('should return 400 error if an invalid ObjectID is passed', async () => {
      const nonObjectID = '12345';
      const response = (await request(server)
        .get(`/v1/categories/${nonObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Non ObjectID');
    });

    it('should return 400 error if the category was not found', async () => {
      const nonExistentObjectID = new ObjectID();
      const response = (await request(server)
        .get(`/v1/categories/${nonExistentObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Zero Results');
    });
  });

  describe('GET /services/categories-sync', () => {
    beforeEach(dropCategories);

    it('should create categories when the collection is empty', async () => {
      let categories = await Category.find({});

      expect(categories).to.be.empty;

      const response = (await request(server)
        .get('/v1/services/categories-sync')
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

      const response = (await request(server)
        .get('/v1/services/categories-sync')
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

describe('DEVELOPERS', () => {
  describe('GET /developers/:id', () => {
    before(populateDeveloper);

    it('should return a developer with the given id', async () => {
      const response = (await request(server)
        .get(`/v1/developers/${developer._id.toHexString()}`)
        .expect(200)
      ).body;

      expect(response.name).to.equal(developer.name);
    });

    it('should return 400 error if an invalid ObjectID is passed', async () => {
      const nonObjectID = '12345';
      const response = (await request(server)
        .get(`/v1/developers/${nonObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Non ObjectID');
    });

    it('should return 400 error if the developer was not found', async () => {
      const nonExistentObjectID = new ObjectID();
      const response = (await request(server)
        .get(`/v1/developers/${nonExistentObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Zero Results');
    });
  });
});

describe('APPS', () => {
  describe('GET /apps/:id', () => {
    before(populateApp);

    it('should return an app with the given id and contain developer and category information', async () => {
      const response = (await request(server)
        .get(`/v1/apps/${app._id.toHexString()}`)
        .expect(200)
      ).body;

      const appDeveloperObjectID = response.developer._id;
      const appCategoryObjectID = response.categories[0]._id;

      expect(response.name).to.equal(app.name);
      expect(appDeveloperObjectID).to.equal(developer._id.toHexString());
      expect(appCategoryObjectID).to.equal(category._id.toHexString());
    });

    it('should return 400 error if an invalid ObjectID is passed', async () => {
      const nonObjectID = '12345';
      const response = (await request(server)
        .get(`/v1/apps/${nonObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Non ObjectID');
    });

    it('should return 400 error if the app was not found', async () => {
      const nonExistentObjectID = new ObjectID();
      const response = (await request(server)
        .get(`/v1/apps/${nonExistentObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Zero Results');
    });
  });

  describe('POST /apps', () => {
    // TODO: make sure to expect 201 created!
    // TODO: need to make sure to do a test with multiple apps with same
    // developer to test the endpoint's ability to avoid collisions
  });
});

describe('USERS', () => {
  describe('GET /users/:id', () => {
    before(populateUser);

    it('should return a user with the given id', async () => {
      const response = (await request(server)
        .get(`/v1/users/${user._id.toHexString()}`)
        .expect(200)
      ).body;

      expect(response.email).to.equal(user.email);
    });

    it('should return 400 error if an invalid ObjectID is passed', async () => {
      const nonObjectID = '12345';
      const response = (await request(server)
        .get(`/v1/users/${nonObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Non ObjectID');
    });

    it('should return 400 error if the user was not found', async () => {
      const nonExistentObjectID = new ObjectID();
      const response = (await request(server)
        .get(`/v1/users/${nonExistentObjectID}`)
        .expect(400)
      ).body;

      expect(response).to.have.property('error', 'Zero Results');
    });
  });

  describe('POST /users', () => {
    // TODO: make sure to expect 201 created!
  });
});
