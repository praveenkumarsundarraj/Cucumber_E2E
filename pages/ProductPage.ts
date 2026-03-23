import {Page, Locator} from '@playwright/test';
export class ProductPage {
    page: Page;
    products: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.card-body');
    }

    async searchProductAndAddCart(productsName: String) {
        const productCount = await this.products.count();
        for (let i = 0; i < productCount; i++) {
            const productName = await this.products.nth(i).locator('b').textContent();
            if (productName == productsName) {
                //locator chaining to find the button inside the specific product card
                await this.products.nth(i).locator('text=  Add To Cart').click();
                break;
            }
        }
    }
}