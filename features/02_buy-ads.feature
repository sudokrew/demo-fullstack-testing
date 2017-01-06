Feature: Buy Ads

  Users should be able to purchase ad space on the site.

  Background:
    Given I am on the "buy ads" page

  Scenario: A user tries to create an empty ad
    When I click the "Buy" button
    Then A "Ad must be at least 25 characters long" error should be visible

  @happy
  Scenario: A user creates an ad
    When I enter into the "ad" textarea "This is an ad\nPlease respond\nIt is most urgent"
    When I click the "Buy" button
    Then A "Success" modal should be visible
