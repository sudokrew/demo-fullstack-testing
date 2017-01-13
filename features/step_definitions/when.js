export default function () {
  this.When(/^I enter into the "([^"]*)" (input|textarea) "([^"]*)"$/, function (name, elementType, value) {
    browser.click(`${elementType}[name="${name}"]`);
    browser.keys(value);
  });

  /**
   Step definition that allows for a doc string argument (required)
   */
  this.When(/^I enter into the "([^"]*)" textarea$/, function (name, value) {
    browser.click(`textarea[name="${name}"]`);
    browser.keys(value);
  });

  this.When(/^I click the "([^"]*)" (button|link)$/, function (text, _elementType) {
    const elementType = _elementType === 'link' ? 'a' : _elementType;
    browser.click(`${elementType}=${text}`);
  });

  this.When(/^I toggle the "([^"]*)" ad visibility checkbox$/, function (text) {
    const selector = `tr.ad*=${text}`;
    browser.waitForVisible(selector);
    const checkbox = browser.element(selector).element('input[type="checkbox"]');
    checkbox.click();
  });
}
