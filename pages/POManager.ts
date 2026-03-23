import {Page,Expect, Locator} from '@playwright/test';
import {LoginPage} from './LoginPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { OrdersPage} from './OrdersPage';
export class POManager
{
    page: Page;
    expect: Expect;
    loginPage: LoginPage;
    ProductPage: ProductPage;
    CartPage: CartPage;
    ordersPage: OrdersPage;
    constructor(page: Page,expect: Expect)
    {
        this.page = page;
        this.expect = expect;
        this.loginPage = new LoginPage(this.page);
        this.ProductPage = new ProductPage(this.page);
        this.CartPage = new CartPage(this.page,this.expect);
        this.ordersPage = new OrdersPage(this.page, this.expect);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getProductPage()
    {
        return this.ProductPage;
    }

    getCartPage()
    {
        return this.CartPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}