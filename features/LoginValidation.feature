Feature: Validate Error Messages

//this tag is used to segregate the scenario execution as per the type
@validation
Scenario Outline: Validate Login error Messages
    Given User is logged in with invalid credentials "<username>" and "<password>"
    Then Verify the error message validated
    Examples:
    |username           |password   |
    |praveen1@gmail.com |1234       |
    |asdadsaf           |asdadsaf   |
    