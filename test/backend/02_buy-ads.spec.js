import { expect } from 'chai';
import request from 'supertest';

import cheerio from 'cheerio';

import app from '../server/app';

describe('buy ads page', function () {
  const BUY_ADS_ENDPOINT = '/buy-ads';

  describe('GET', function () {
    it('should return an html view', function (done) {
      request(app)
        .get(BUY_ADS_ENDPOINT)
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .end(done);
    });

    it('should contain a form to purchase ads', function (done) {
      request(app)
        .get(BUY_ADS_ENDPOINT)
        .expect(({ text }) => {
          const $ = cheerio.load(text);
          const form = $('form[method="POST"]');
          const description = $('[name="description"]');
          const submit = form.children('input[type="submit"],button[type="submit"]');
          expect(form).to.have.length(1, 'form to POST data to the server is missing');
          expect(form.attr('action')).to.equal('/api/ads', 'form should post to the ads api endpoint');
          expect(description).to.have.length(1, 'field to submit the ad content is missing');
          expect(submit).to.have.length(1, 'expected a submit button to exist is missing');
        })
        .end(done);
    });
  });
});
