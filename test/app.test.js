const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /', async () => {
    request(app)
      .get('/v1')
      .expect(200)
      .end((err, res) => {
        expect(res).to.be({
          message: 'Connected!',
        });
      });
  });
});
