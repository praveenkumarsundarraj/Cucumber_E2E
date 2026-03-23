import { Given, When, Then } from '@cucumber/cucumber';
// data can be initialized from JSON directly by giving "resolveJsonModule": true in tsconfig.json
import { data } from '../../utils/clientDataTestData';


Given('User is logged into the system with {string} and {string}',async function ( userName, password) {
        //Login methods
        const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginUser(userName, password);
});

When('Add {string} into the Cart',async function (productName) {
        const productPage = this.poManager.getProductPage();
        await productPage.searchProductAndAddCart(productName);
});

When('Fill the order details and place the order',async function () {
    const cartPage = this.poManager.getCartPage();
    let orderNumber: string | null = await cartPage.placeOrder(data.cardDetails, data.countrySearchText, data.orderPlacedText);
    //here the orderID is taken from custom manager which is set as global initialized
    //- for the cucumber world. this is the power of cucumber world
    this.orderID =  orderNumber;
});

Then('Verify order placed successfully with order id generated',async function () {
    const orderPage = this.poManager.getOrdersPage();
    await orderPage.validateOrder(this.orderID ?? "its empty");
});