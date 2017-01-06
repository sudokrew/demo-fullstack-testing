Feature: Admin Logout
  Admin user should be able to log out

  Background:
    Given I am on the "manage" page

  @happy
  Scenario: User logs out and is taken to the home page
    When I click the "Logout" link
    Then I should be on the "home" page

  @happy
  Scenario: User logs out and tries to go back to the "manage" page
    Then I should not be on the "manage" page
