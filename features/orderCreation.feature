Feature: Order Creation and Validation
@regression
Scenario: Create a order and validate 
    Given User is logged into the system with "praveenkum261@gmail.com" and "Testing@1"
    When Add "ZARA COAT 3" into the Cart
    When Fill the order details and place the order
    Then Verify order placed successfully with order id generated

@validation
Scenario Outline: Validate Login error Messages
    Given User is logged in with invalid credentials "<username>" and "<password>"
    Then Verify the error message validated
    Examples:
    |username           |password   |
    |praveen1@gmail.com |1234       |
    |asdadsaf           |asdadsaf   |
