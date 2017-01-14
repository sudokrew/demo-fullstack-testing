import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiEnzyme());

import Modal from './Modal';

describe('Modal', function () {
  it('should be true', function () {
    expect(Modal).to.exist;
  })
});
