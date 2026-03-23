import {test as base} from '@playwright/test';

interface testDataforOrder{
        userEmail: string;
        userPassword: string;
        productsName: string;
        cardDetails: any;
        countrySearchText: string;
        orderPlacedText: string;
}

export const customTest = base.extend<{testDataforOrder: testDataforOrder}>({
        testDataforOrder:{
            userEmail: "rahulshettyacademy@mailinator.com",
            userPassword: "Testing@1",
            productsName: "ZARA COAT 3",
            cardDetails: 
            {
                number: "4542 9931 9292 2293",
                month: "05",
                year: "29",
                cvv: "722",
                name: "Praveen Kumar Sundarraj"
            },
            countrySearchText: "ind",
            orderPlacedText: " Thankyou for the order. "
           }
    });