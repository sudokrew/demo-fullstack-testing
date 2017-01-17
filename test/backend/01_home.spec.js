import { expect } from 'chai';
import request from 'supertest';

import cheerio from 'cheerio';

import app from '../../server/app';

describe('home page', function () {
  it('should return an html view', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
  });

  it('should contain a list of ads', function (done) {
    request(app)
      .get('/')
      .expect(({ text }) => {
        const $ = cheerio.load(text);
        expect($('ul.ads')).to.have.length(1, 'expected a list of ads to exist');
      })
      .end(done);
  });

  it('should show visible ads', function (done) {
    request(app)
      .get('/')
      .expect(({ text }) => {
        const $ = cheerio.load(text);
        expect($('ul.ads li.ad').length).to.equal(1, 'expected ads to exist');
      })
      .end(done);
  });
});
