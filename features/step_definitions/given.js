import { slugify } from '../helpers/pathnames';

export default function () {
  this.Given(/^I am on the "([^"]*)" page$/, function (pageName) {
    let url = process.env.ROOT_URL;
    switch (pageName) {
      case 'buy ads':
      case 'login':
      case 'manage':
        url += `/${slugify(pageName)}`;
        break;
      case 'home':
      default:
        url += '/';
    }
    browser.url(url);;
  });
};
