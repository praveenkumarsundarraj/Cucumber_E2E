Feature: Order Creation and Validation

Scenario: Create a order and validate 
    Given User is logged into the system with "praveenkum261@gmail.com" and "Testing@1"
    When Add "ZARA COAT 3" into the Cart
    When Fill the order details and place the order
    Then Verify order placed successfuly with order id generated
