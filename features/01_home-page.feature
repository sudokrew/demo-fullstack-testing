Feature: Home Page

  The home page should have information about the application.

  Background:
    Given I am on the "home" page

  Scenario: A user wants to see what the latest notifications
     Then I should see the "latest notifications list"

  Scenario: A user wants to purchase an ad.
     When I click the "Buy Ads" link
     Then I should be on the "buy ads" page
