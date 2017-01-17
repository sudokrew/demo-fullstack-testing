import { expect } from 'chai';
import request from 'supertest';

import app from '../../../server/app';

import ads from '../../../data/mock/ads';

describe('ads resource endpoint', function () {
  const ADS_RESOURCE_ENDPOINT = '/api/ads';

  describe('POST', function () {
    it('should return json', function (done) {
      request(app)
        .post(ADS_RESOURCE_ENDPOINT)
        .expect('Content-Type', /application\/json/)
        .end(done);
    });

    it('should return an error if data is too short (less than 25 characters)', function (done) {
      const description = 'This is too short'

      request(app)
        .post(ADS_RESOURCE_ENDPOINT)
        .send({ description })
        .expect(400)
        .end(done);
    });

    it('should return an error if data is too long (greater than 140 characters)', function (done) {
      let description = 'This is too long';
      while (description.length < 140) {
        description += ` ${description}`;
      }

      request(app)
        .post(ADS_RESOURCE_ENDPOINT)
        .send({ description })
        .expect(400)
        .end(done);
    });

    it('should create a new ad given a valid description', function (done) {
      const description = 'This is just about right!';

      request(app)
        .post(ADS_RESOURCE_ENDPOINT)
        .send({ description })
        .expect(200)
        .end(done);
    });
  });

  describe('PUT', function () {
    const ad = ads[0];

    it('should return json', function (done) {
      request(app)
        .put(`${ADS_RESOURCE_ENDPOINT}/${ad.id}`)
        .expect('Content-Type', /application\/json/)
        .end(done);
    });

    it('should set the visibility of an ad', function (done) {
      const toggledVisibility = !ad.isVisible;

      request(app)
        .put(`${ADS_RESOURCE_ENDPOINT}/${ad.id}`)
        .send({ isVisible: toggledVisibility })
        .expect(200)
        .expect(({ body }) => expect(body).to.have.property('isVisible', toggledVisibility))
        .end(done);
    });
  });
});
