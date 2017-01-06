export default function () {
  this.When(/^I enter into the "([^"]*)" (input|textarea) "([^"]*)"$/, function (value, name, elementType) {
   browser.setValue(`${elementType}[name="${name}"]`, value);
  });

  this.When(/^I click the "([^"]*)" (button|link)$/, function (text, elementType) {
    browser.click(`${elementType}=${text}`)
  });

  this.When(/^I toggle the "([^"]*)" ad visibility checkbox$/, function (text) {
    const selector = `li.ad*=${text}`;
    browser.waitForVisible(selector);
    const checkbox = browser.element(selector).element('input[type="checkbox"]');
    checkbox.click();
  });
}
