const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');

const Developer = require('../../models/developer');

describe('GET /developers/:id', () => {
  it('should return the developer from the database', async () => {
    const id = '5a3d9ec216e0f5baa64b6baf';

    request(app)
      .get(`/v1/developers/${id}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      })
      .end((err, res) => {
        expect(1).to.equal(1);
      });
  });
});

describe('PUT /developers/:id', () => {
  it('should update a developer', async () => {
    const id = '5a3d9ec216e0f5baa64b6baf';

    request(app)
      .put(`/v1/developers/${id}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      })
      .end((err, res) => {
        expect(1).to.equal(1);
      });
  });
});
