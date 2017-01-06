Feature: Admin Login
  Admin user should be able to log in to manage ads

  Background:
    Given I am on the "login" page

  Scenario Outline: Invalid logins should not let the user log in
    When I enter into the "username" input "<username>"
     And I enter into the "password" input "<password>"
    Then I should not be on the "dashboard" page

    Examples:
      | username | password |
      |          |          |
      | baduser  |          |
      |          | badpass  |
      | editor   | badpass  |
      | baduser  | password |

  @happy
  Scenario: Admin user successfuly logs in
    When I enter into the "username" input "editor"
     And I enter into the "password" input "password"
    Then I should be on the "dashboard" page
