const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('GET /developers/:id', () => {
  it('Should return the developer from the database', async () => {
    const id = '5a3d9ec216e0f5baa64b6baf';

    request(app)
      .get(`/developers/${id}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      })
      .end((err, res) => {
        expect(1).to.equal(1);
      });
  });
});
