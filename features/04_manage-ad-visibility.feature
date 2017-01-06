Feature: Manage Ads
  Authenticated users should be able to manage what ads show up on the home page

  Background:
    Given I am on the "manage" page

  @happy
  Scenario: User wants to see a list of all the ads in the system
    Then I should see the "latest notifications list"

  @happy
  Scenario Outline:  User wants to hide a visibile ad
    When I toggle the "<text>" ad visibility checkbox
    Then The "<text>" ad visibility checkbox should be checked
    When I am on the "home" page
    Then The "<text>" ad should not be visibile
    
    Examples:
      | text                             |
      | The greatest advertisement ever! |
    
  @happy
  Scenario Outline:  User wants to show a hidden an ad
    When I toggle the "<text>" ad visibility checkbox
    Then The "<text>" ad visibility checkbox should be checked
    When I am on the "home" page
    Then The "<text>" ad should be visibile
  
    Examples:
      | text                          |
      | The worst advertisement ever! |
