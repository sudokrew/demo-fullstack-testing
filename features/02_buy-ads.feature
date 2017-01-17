Feature: Buy Ads

  Users should be able to purchase ad space on the site.

  Background:
    Given I am on the "buy ads" page

  Scenario: A user tries to create an empty ad
    When I click the "Buy" button
    Then A "`description` must be at least 25 characters" error should be visible
  
  @happy 
  Scenario: A user creates an ad
    Then A "Success" modal should not be visible
    When I enter into the "description" textarea
      """
      This is an ad
      Please respond
      It is most urgent
      """
    When I click the "Buy" button
    Then A "Success" modal should be visible
