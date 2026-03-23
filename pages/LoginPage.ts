import {Page, Locator} from '@playwright/test';

export class LoginPage {
    page : Page;
    userName : Locator;
    password : Locator;
    signIn : Locator;
    cardTitles : Locator;
    constructor(page : Page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signIn = page.locator('#login');
        this.cardTitles = page.locator('.card-body h5 b');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async loginUser(userEmail : string, userPassword : string) {
        await this.userName.fill(userEmail);
        await this.password.fill(userPassword);
        await this.signIn.click();
        await this.cardTitles.first().waitFor();
    }

}