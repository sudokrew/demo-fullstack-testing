import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  User
} from './index';

const sanitization = require('../sanitization').default;

chai.use(sinonChai);

function getPropertyDescriptor(object, property) {
    var proto = object;
    var descriptor;

    while (proto && !(descriptor = Object.getOwnPropertyDescriptor(proto, property))) {
        proto = Object.getPrototypeOf(proto);
    }
    return descriptor;
}

describe('User model', function () {
  describe('properties', function () {
    it('should have a username', function () {
      const username = 'foo';
      const user = User.build({ username });

      expect(user).to.have.property('username', username);
    });

    it('should have a password', function () {
      const password = 'bar';
      const user = User.build({ password });

      expect(user).to.have.property('password', password);
    });
  });

  describe('sanitize', function () {
    let spySanitizeToLowerCase;

    before(function () {
      spySanitizeToLowerCase = sinon.spy(sanitization, 'sanitizeToLowerCase');
    });

    after(function () {
      spySanitizeToLowerCase.reset();
    });

    describe('username', function () {
      const userData = {
        username: 'Foo'
      };

      it ('should lowercase the username before saving', function () {
        return User.create(userData)
        .catch(err => {
          // Not a valid user, but sanitization should have been applied
          expect(spySanitizeToLowerCase).to.have.been.calledWith(sinon.match(userData.username));
        });
      });
    });
  });

  describe('validations', function () {
    describe('username', function () {
      it('should be required', function () {
        return User.create({})
        .catch(err => {
          expect(err.message).to.match(/username cannot be null/i);
        });
      });

      it('should be alphanumeric', function () {
        return User.create({
          username: 'spaces and *stuff*',
        })
        .catch(err => {
          expect(err.message).to.match(/alphanumeric/i);
        });
      })
    });

    describe('password', function () {
      it('password should be required', function () {
        return User.create({})
        .catch(err => {
          expect(err.message).to.match(/password cannot be null/i);
        });
      });
    });
  });
});
