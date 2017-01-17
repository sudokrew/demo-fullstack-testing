import { expect } from 'chai';

import { slugify } from '../helpers/pathnames';

export default function () {
  this.Then(/^I should( not)? see the "([^"]*)"$/, function (shouldNot, descriptor) {
    let selector;

    switch (descriptor) {
      case 'latest notifications list':
      case 'latest notifications table':
        selector = 'ul.ads,table.ads';
        break;
      default:
        selector = '';
    }

    shouldBeHidden(shouldNot, selector);
  });

  this.Then(/^A "([^"]*)" error should be visible$/, function (errorMessage) {
    shouldBeHidden(false, `.error=${errorMessage}`);
  });

  this.Then(/^A "([^"]*)" modal should( not)? be visible$/, function (header, isHidden) {
    shouldBeHidden(isHidden, `[class~=modal]`);
  });

  this.Then(/^The "([^"]*)" ad should( not)? be visibile$/, function (isHidden, text) {
    shouldBeHidden(isHidden, `.ad=${text}`);
  });

  this.Then(/^I should( not)? be on the "([^"]*)" page$/, function (shouldNot, pageName) {
    let url = process.env.ROOT_URL;
    switch (pageName) {
      case 'buy ads':
      case 'login':
      case 'manage':
      url += `/${slugify(pageName)}`;
      break;
      case '/home':
      default:
      url += '/';
    }
    expect(browser.getUrl() == url).to.equal(!shouldNot);
  });

  this.Then(/^The "([^"]*)" ad visibility checkbox should( not)? be checked$/, function (text, shouldNot) {
    const selector = `tr.ad*=${text}`;
    browser.waitForVisible(selector);
    const checkbox = browser.element(selector).element('input[type="checkbox"]');
    expect(checkbox.isSelected()).to.equal(!shouldNot);
  });
};

/**
* Helper function to check if a selector should be visible or not.
* @param  {Boolean} shouldNot  whether the selector should be hidden
* @param  {String} selector    the CSS selector for the hidden element
* @throws {Error}              test assertion failure
*/
function shouldBeHidden (shouldNot, selector) {
  const isVisible = browser.isVisible(selector);
  expect(isVisible).to.equal(!shouldNot);
}
