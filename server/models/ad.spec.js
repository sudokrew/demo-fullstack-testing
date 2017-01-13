import { expect } from 'chai';

import {
  Ad
} from './index';

describe('Ad model', function () {
  describe('validations', function () {
    it('description should be required', function (done) {
      Ad.create({})
        .catch((err) => {
          expect(err.message).to.match(/description cannot be null/);
        })
        .finally(done);
    });
  });

  describe('properties', function () {
    it('should have a description', function () {
      const AD_DESCRIPTION = 'This is an ad description';
      const ad = Ad.build({ description: AD_DESCRIPTION });

      expect(ad).to.have.property('description', AD_DESCRIPTION);
    });
  });
});
