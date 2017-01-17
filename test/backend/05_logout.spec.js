import { expect } from 'chai';
import request from 'supertest';

import cheerio from 'cheerio';

import app from '../../server/app';

import users from '../../data/mock/users';

describe('logout endpoint', function () {
  const LOGOUT_ENDPOINT = '/logout';

  describe('GET', function () {
    it('should return an html view', function (done) {
      request(app)
        .get(LOGOUT_ENDPOINT)
        .expect(302)
        .expect(res => expect(res.headers.location).to.equal('/'))
        .end(done);
    });
  });
});
