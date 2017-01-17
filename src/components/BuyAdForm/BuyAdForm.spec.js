import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import enzyme, { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiEnzyme());

import BuyAdForm from './BuyAdForm';

const CREATE_AD_ENDPOINT = '/api/ads';

describe('BuyAdForm', function () {
  let buyAdForm;

  before(function () {
    buyAdForm = shallow(<BuyAdForm />);
  });

  describe('constructor', function () {
    describe('state', function () {
      it('should have errors', function () {
        expect(buyAdForm).to.have.state('errors').deep.equal([]);
      });
    })
  });

  describe('event handlers', function () {
    let buyAdFormWithStubbedMethods;
    let handleSubmitStub;
    let componentDidMountStub;

    before(function () {
      handleSubmitStub = sinon.stub(BuyAdForm.prototype, 'handleSubmit');

      buyAdFormWithStubbedMethods = mount(<BuyAdForm />);
    });

    after(function () {
      handleSubmitStub.restore();
    });

    describe('submit', function () {
      it('should invoke the handleSubmit method', function () {

        buyAdFormWithStubbedMethods.find('form').simulate('submit');

        expect(handleSubmitStub).to.have.been.called;
      });
    });
  });

  describe('validation', function () {
    describe('description', function () {
      let validateDescription;

      const shortValue = 'Hi';
      const longValue = 'Hello World!';

      const MIN_LENGTH = shortValue.length + 1;
      const MAX_LENGTH = longValue.length - 1;

      const mediumValue = longValue.slice(longValue, Math.floor(MAX_LENGTH / 2));

      before(function () {
        validateDescription = BuyAdForm.prototype.validateDescriptionLength
      });

      it('should not have a min value by default', function () {
        const defaultValidator = validateDescription();
        expect(defaultValidator({ target: { value: shortValue } })).to.equal(true, `expected ${shortValue} to be longer than 0`);
      });

      it('should allow you to set a min length', function () {
        const minValidator = validateDescription({ min: MIN_LENGTH });
        expect(minValidator({ target: { value: shortValue } })).to.equal(false, `expected ${shortValue} to be less than ${MIN_LENGTH}`);
        expect(minValidator({ target: { value: longValue } })).to.equal(true, `expected ${longValue} to be at least ${MIN_LENGTH}`);
      });

      it('should allow you to set a max length', function () {
        const maxValidator = validateDescription ({ max: MAX_LENGTH });
        expect(maxValidator({ target: { value: longValue } })).to.be.equal(false, `expected ${longValue} to be greater than ${MAX_LENGTH}`);
        expect(maxValidator({ target: { value: mediumValue } })).to.be.equal(true, `expected ${mediumValue} to not be greater than ${MAX_LENGTH}`);
      });

      it('should allow you to set a min and max length', function () {
        const MIN_LENGTH_2 = shortValue.length;
        const MAX_LENGTH_2 = longValue.length;
        const invalidShortValue = shortValue.slice(0, MIN_LENGTH_2 - 1);
        const invalidLongValue = longValue + "!";

        const betweenValidator = validateDescription ({ min: MIN_LENGTH_2, max: MAX_LENGTH_2 });

        expect(betweenValidator({ target: { value: invalidShortValue } })).to.be.equal(false, `expected ${invalidShortValue} to be less than ${MIN_LENGTH_2}`);
        expect(betweenValidator({ target: { value: invalidLongValue } })).to.be.equal(false, `expected ${invalidLongValue} to be greater than ${MAX_LENGTH_2}`);
        expect(betweenValidator({ target: { value: shortValue } })).to.be.equal(true, `expected ${shortValue} to be at least ${MIN_LENGTH_2}`);
        expect(betweenValidator({ target: { value: longValue } })).to.be.equal(true, `expected ${longValue} to be no more than ${MAX_LENGTH_2}`);
      });
    });
  });
});
