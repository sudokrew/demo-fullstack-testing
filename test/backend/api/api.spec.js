import { expect } from 'chai';
import request from 'supertest';

import app from '../../../server/app';

describe('api endpoint', function () {
  const API_ENDPOINT = '/api';

  describe('GET', function () {
    it('should return json', function (done) {
      request(app)
        .get(API_ENDPOINT)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(done);
    });
  });
})
