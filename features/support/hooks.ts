import { After, Before } from "@cucumber/cucumber";
import { chromium} from "playwright";
import { CustomManager } from "./customManager";
import { POManager } from "../../pages/POManager";
import { expect } from "playwright/test";
//here i have declared two different before execution corresponding to the tagged scenarios to be executed.
//Note: Same tag name should be added to the test cases
Before(async function(this: CustomManager)
{
    // here i initialize which i created in custom Manager
    const browser =await chromium.launch({headless: false, timeout: 5000});
    this.context =await browser.newContext();
    this.page = await this.context.newPage();
    this.expect = expect;
    this.poManager = new POManager(this.page, this.expect);
});

// Before({tags:"@regression"}, async function(this: CustomManager)
// {
//     // here i initialize which i created in custom Manager
//     const browser =await chromium.launch({headless: true, timeout: 5000});
//     this.context =await browser.newContext();
//     this.page = await this.context.newPage();
//     this.expect = expect;
//     this.poManager = new POManager(this.page, this.expect);
// });

After( async function(this: CustomManager)
{
    await this.page.close();
    await this.context.close();
});