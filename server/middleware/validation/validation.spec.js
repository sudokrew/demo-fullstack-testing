import { expect } from 'chai';

import {
  validateLength
} from './index';

describe('Validation middleware', function () {
  describe('validate max length', function () {
    it('should must accept a property name', function () {
      expect(validateLength, 'property is required').to.throw('Property required');
    });

    it('should return a middleware function', function () {
      expect(validateLength('prop')).to.be.a('function', 'validateMaxLength should return a function');
    });

    describe('validate max length middleware', function () {
      it('should throw an error if the length is too long', function () {
        const middleware = validateLength('prop', { max: 5 });
        const body = { prop: 'abcdef' };
        expect(middleware.bind(null, { body }, {})).to.throw('`prop` cannot be longer than 5 characters');
      });

      it('should throw an error if the length is too short', function () {
        const middleware = validateLength('prop', { min: 5 });
        const body = { prop: 'abcd' };
        expect(middleware.bind(null, { body }, {})).to.throw('`prop` must be at least 5 characters');
      });

      it('should invoke the callback with no error if validations pass', function (done) {
        const middleware = validateLength('prop', { min: 4, max:6 });
        const body = { prop: 'abcde' };
        middleware({ body }, {}, function () {
          done.apply(null, arguments);
        });
      });
    })
  });
})
