// COMMENTING OUT UNTIL I REDO THE MOCHA TEST STRUCTURE

/*
const { expect } = require('chai');
const request = require('supertest');

const app = require('../../app');

const Category = require('../../models/category');

before

describe.only('test', () => {
  it('test', (done) => {
    // expect(2).to.equal(3);
    done();
  });
});

describe('GET /categories:sync', function () {
  it('should create categories (fix this)', async function createCategories() {
    // try {
      const response = (
        await request(app)
          .get('/v1/categories:sync')
          .expect(200)
      ).body;

      console.log(response[0]);

      const responseCategory = response[0];

      expect(response).to.be.an('array');
      expect(responseCategory).to.be.an('object');

      const queryCategory = await Category.findOne({ id: responseCategory.id });
      console.log(queryCategory);

      // expect(queryCategory).to.deep.equal(responseCategory);

    // } catch(e) {
    //   console.log(e);
    // }

    // request(app)
    //   .get('/v1/categories:sync')
    //   .expect(200)
    //   .expect((res) => {
    //     expect(res.body).to.be.an('object');
    //   })
    //   .end(async function(err, res) {
    //     if (err) {
    //       return err;
    //     }
    //
    //     const categories = await Category.find({});
    //
    //     console.log(categories);
    //
    //     expect(2).to.equal(3);

        // Category.find({})
        //   .then((categories) => {
        //     console.log(categories[0]);
        //     // expect(categories).to.be.a('string');
        //     expect(2).to.equal(3);
        //     done();
        //   })
        //   .catch(e => done(e));
      // });
  });
});
*/
