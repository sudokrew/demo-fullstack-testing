import { expect } from 'chai';

import toLowerCase from './index';

describe('toLowerCase', function () {
  const TEST_STRING = 'FOO';
  expect(toLowerCase(TEST_STRING)).to.equal('foo');
});
