import { slugify } from '../helpers/pathnames';

export default function () {
  this.Then(/^I should( not)? see the "([^"]*)"$/, shouldBeHidden);

  this.Then(/^A "([^"]*)" error should be visible$/, function (errorMessage) {
    shouldBeHidden(false, `.error=${errorMessage}`);
  });

  this.Then(/^A "([^"]*)" modal should be visible$/, function (header) {
    shouldBeHidden(false, `.modal=${header}`);
  });

  this.Then(/^The "([^"]*)" ad should( not)? be visibile$/, function (shouldNot, text) {
    shouldBeHidden(shouldNot, `.ad=${text}`);
  });

  this.Then(/^I should( not)? be on the "([^"]*)" page$/, function (shouldNot, pageName) {
    let url = process.env.HOST_ORIGIN;
    switch (pageName) {
      case 'buy ads':
      case 'manage':
      url += `/${slugify(pageName)}`;
      break;
      case '/home':
      default:
      url += '/';
    }
    expect (browser.getUrl()).to.equal(!shouldNot);
  });

  this.Then(/^The "([^"]*)" ad visibility checkbox should( not)? be checked$/, function (text, shouldNot) {
    const selector = `li.ad*=${text}`;
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
