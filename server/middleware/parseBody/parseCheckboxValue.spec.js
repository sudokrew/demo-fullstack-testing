import { expect } from 'chai';

import {
  parseCheckboxValue
} from './index';

describe('Parse body middleware', function () {
  describe('parse checkbox value', function () {
    it('should must accept a property name', function () {
      expect(parseCheckboxValue, 'property is required').to.throw('Property required');
    });

    it('should return a middleware function', function () {
      expect(parseCheckboxValue('prop')).to.be.a('function', 'parseCheckboxValue should return a middleware function');
    });

    describe('parse checkbox value middleware', function () {
      const middleware = parseCheckboxValue('prop');

      it('should set the property to false if it does not exist', function (done) {
        const body = {};
        middleware({ body }, {}, function (err) {
          expect(body).to.have.property('prop', false);
          done(err);
        });
      });

      it('should set the property value to false if exists and is falsey', function (done) {
        const middleware = parseCheckboxValue('prop');
        const body = { prop: '' };
        middleware({ body }, {}, function (err) {
          expect(body).to.have.property('prop', false, 'expected empty string to be converted to false');
          done(err);
        });
      });

      it('should set the property value to true if exists and is truthy', function (done) {
        const middleware = parseCheckboxValue('prop');
        const body = { prop: 'true' };
        middleware({ body }, {}, function (err) {
          expect(body).to.have.property('prop', true, 'expected "true" to be converted to true');
          done(err);
        });
      });
    });
  });
})
