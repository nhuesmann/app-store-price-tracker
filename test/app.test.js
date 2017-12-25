const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../app');

const App = require('../models/iosapp');
const Developer = require('../models/developer');
const Category = require('../models/category');

const { category, dropCategories, populateCategory } = require('./seed/seed');

// describe('The express app', () => {
//   it('handles a GET request to /', async () => {
//     request(app)
//       .get('/v1')
//       .expect(200)
//       .end((err, res) => {
//         expect(res).to.be({
//           message: 'Connected!',
//         });
//       });
//   });
// });

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
      // to have keys (all the required keys)...
    });

    // it('should update categories when the collection is not empty', async () => {
    //   const response = (
    //     await request(app)
    //       .get('/v1/categories:sync')
    //       .expect(200)
    //   ).body;
    // })
  });
});




// WITH EMPTYING BEFORE
// count the length of response, expect the db categories to be that many

// do one and call populate categories first
// expect that the categories were updated, not replaced
