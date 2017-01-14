import { expect } from 'chai';
import request from 'supertest';

import cheerio from 'cheerio';

import app from '../server/app';

import users from '../data/mock/users';

describe('manage page', function () {
  const MANAGE_ENDPOINT = '/manage';
  const LOGIN_ENDPOINT = '/login';

  describe('unauthenticated', function () {
    it('should return an html view', function (done) {
      request(app)
      .get(MANAGE_ENDPOINT)
      .expect(302)
      .expect(res => expect(res.headers.location).to.equal(LOGIN_ENDPOINT))
      .end(done);
    });
  });

  describe('authenticated', function () {
    let cookies;

    before(function (done) {
      const { username, password } = users[0]; // editor : password
      // Capture login cookies
      request(app)
      .post(LOGIN_ENDPOINT)
      .send({ username, password })
      .end((err, res) => {
        cookies = res.headers['set-cookie'];
        done(err);
      });
    });

    it('should return an html view', function (done) {
      request(app)
      .get(MANAGE_ENDPOINT)
      .set('Cookie', cookies)
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
    });

    it('should contain a table of ads', function (done) {
      request(app)
      .get(MANAGE_ENDPOINT)
      .set('Cookie', cookies)
      .expect(({ text }) => {
        const $ = cheerio.load(text);
        expect($('table.ads')).to.have.length(1, 'expected a list of ads to exist');
      })
      .end(done);
    });

    it('should contain ads', function (done) {
      request(app)
      .get(MANAGE_ENDPOINT)
      .set('Cookie', cookies)
      .expect(({ text }) => {
        const $ = cheerio.load(text);
        expect($('table.ads tr.ad').length).to.be.at.least(2, 'expected ads to exist');
      })
      .end(done);
    });

    describe('edit forms', function () {
      it('every row should have an edit form', function (done) {
        request(app)
        .get(MANAGE_ENDPOINT)
        .set('Cookie', cookies)
        .expect(({ text }) => {
          const $ = cheerio.load(text);
          const forms = $('tr.ad td:last-child form[method="POST"]');
          expect(forms.length).to.be.at.least(2, 'expected POST forms to exist');
          Array.prototype.map.call(forms, form => $(form))
          .forEach($form => {
            const hiddenOverrideInput = $form.children('input[type="hidden"][name="_method"][value="PUT"]');
            expect(hiddenOverrideInput, 'expected method override hidden input to exist').to.exist;
          });
        })
        .end(done);
      });

      it('each row should have an checkbox to edit visibility', function (done) {
        request(app)
        .get(MANAGE_ENDPOINT)
        .set('Cookie', cookies)
        .expect(({ text }) => {
          const $ = cheerio.load(text);
          const forms = $('tr.ad td:last-child form[method="POST"]');
          expect(forms.length).to.be.at.least(2, 'expected POST forms to exist');
          Array.prototype.map.call(forms, form => $(form))
          .forEach($form => {
            const visibilityCheckbox = $form.children('input[type="checkbox"][name="isVisible"][value="true"]');
            expect(visibilityCheckbox, 'expected visibility checkbox to exist').to.exist;
          });
        })
        .end(done);
      });
    });
  });
});
