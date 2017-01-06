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
