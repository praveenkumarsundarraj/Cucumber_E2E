import { After, Before } from "@cucumber/cucumber";
import { chromium} from "playwright";
import { CustomManager } from "./customManager";
import { POManager } from "../../pages/POManager";
import { expect } from "playwright/test";

Before( async function(this: CustomManager)
{
    // here i initialize which i created in custom Manager
    const browser =await chromium.launch({headless: true, timeout: 5000});
    this.context =await browser.newContext();
    this.page = await this.context.newPage();
    this.expect = expect;
    this.poManager = new POManager(this.page, this.expect);
});

After( async function(this: CustomManager)
{
    await this.page.close();
    await this.context.close();
});