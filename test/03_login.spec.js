import { expect } from 'chai';
import request from 'supertest';

import cheerio from 'cheerio';

import app from '../server/app';

import users from '../data/mock/users';

describe('login page', function () {
  const LOGIN_ENDPOINT = '/login';

  describe('GET', function () {
    it('should return an html view', function (done) {
      request(app)
      .get(LOGIN_ENDPOINT)
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
    });

    it('should contain a form to purchase ads', function (done) {
      request(app)
      .get(LOGIN_ENDPOINT)
      .expect(({ text }) => {
        const $ = cheerio.load(text);
        const form = $('form[method="POST"]');
        const username = $('[name="username"][type="text"]');
        const password = $('[name="password"][type="password"]');
        const submit = form.children('input[type="submit"],button[type="submit"]');
        expect(form).to.have.length(1, 'form to login to the server is missing');
        expect(form.attr('action')).to.equal('/login', 'form should post to the login endpoint');
        expect(username).to.have.length(1, 'field to submit username is missing');
        expect(password).to.have.length(1, 'field to submit password is missing');
        expect(submit).to.have.length(1, 'expected a submit button to exist is missing');
      })
      .end(done);
    });
  });

  describe('POST', function () {
    describe('unsuccessful login', function () {
      it('should redirect to the login page with no credentials', function (done) {
        request(app)
        .post(LOGIN_ENDPOINT)
        .expect(302)
        .expect(res => expect(res.headers.location).to.equal(LOGIN_ENDPOINT))
        .end(done);
      });

      it('should redirect to the login page on invalid login', function (done) {
        request(app)
        .post(LOGIN_ENDPOINT)
        .send({ username: 'baduser', password: 'password'})
        .expect(302)
        .expect(res => expect(res.headers.location).to.equal(LOGIN_ENDPOINT))
        .end(done);
      });
    })

    describe('successful login', function () {
      const { username, password } = users[0]; // editor : password

      it('should redirect to the manage page on valid login', function (done) {
        request(app)
        .post(LOGIN_ENDPOINT)
        .send({ username, password })
        .expect(302)
        .expect(res => expect(res.headers.location).to.equal('/manage'))
        .end(done);
      });

      it('should set the a session cookie', function (done) {
        request(app)
        .post(LOGIN_ENDPOINT)
        .send({ username, password })
        .expect('Set-Cookie', /connect\.sid/)
        .end(done);
      });
    });
  });
});
