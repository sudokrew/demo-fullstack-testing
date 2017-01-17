# Testing Process

Demo repository for illustrating the process for test-driven development from start to finish.

# Discovery

The client would like to buy and sell space on their website. The price of the ads will vary
depending on the length. Admin users should be able to hide ads (e.g. – spambots, offensive).

# Business Requirements

Business requirements begin to describe _how_ the application should function, with regards to the
client wants/needs uncovered during the `Discovery` phase.

## Home page

- Lists all ads that have been submitted to the application.
- Provides a call to action to place an ad on the site.

## Buy ads

- A form that pre-calculates the price of an ad before it's submitted.
- Validates that the ad is `at least 25` characters and `no more than 140` characters in length.
- Charges the user the `10 cents per character`.
- Offers a confirmation modal on a `successful` purchase.
- Ad is visible the homepage after `successful` purchase.

## Log in

- An admin user should log in with valid credentials

## Manage ads

- Admin should see all ads in the system.
- Admin users should be able to `hide/show` any ad in the system.

## Log out

- The admin user should be able to log out.

## Running Tests

### Acceptance Tests

Acceptance (end user) tests are responsible for testing the business requirements from the end
user's perspective. These are mainly covered via automated tests using a webdriver (e.g. Selenium),
as well as manual testing.

This project uses cucumber tests located in the `features` folder to direct webdriver automation via
`chimp`.

In order to run acceptance tests for for both frontend and backend projects run:

```bash
npm run test:acceptance
```

#### Coverage reports

The acceptance tests will generate coverage reports for both the frontend and backend code located respectively at:

- `coverage/frontend/lib-cov/index.html`
- `coverage/backend/lib-cov/index.html`


### Integration Tests

Integration (end to end) tests check that method calls between systems are working correctly.
For frontend code, this usually tests requests made to the server, and backend code tests database
integrations.

In this project integration tests are located in the `test` folder.

In order to run integration tests, run:

```bash
npm run test:integration
```

### Unit Tests

Unit tests will check that individual functions are working correctly, these files are usually next
to the files they test in the `src` and `server` folders. You these are files that end in
`*.spec.js`.

```bash
npm run test:unit
```
