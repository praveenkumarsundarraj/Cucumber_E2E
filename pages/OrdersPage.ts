import {Page, Expect, Locator} from '@playwright/test';

export class OrdersPage {
    page: Page;
    expect: Expect;
    ordersTab: Locator;
    orderList: Locator;
    orderedId: Locator;
    constructor(page: Page, expect: Expect) {
        this.page = page;
        this.expect = expect;
        this.ordersTab = page.locator('button:has-text(\'  ORDERS\')');
        this.orderList = page.locator('tr:has(th[scope=\'row\'])');
        this.orderedId = page.locator('div small + div');
    }

    async validateOrder(orderNumber: string) {
        await this.ordersTab.click();
        await this.orderList.first().waitFor();
        const orderCount = await this.orderList.count();
        for (let i = 0; i < orderCount; i++) {
            const chkOrderId: string | null= await this.orderList.locator('th').nth(i).textContent();
            if (orderNumber.includes(chkOrderId ?? "empty")) {
                await this.orderList.first().locator('td').nth(4).locator('button').click();
                break;
            }
        }
        this.expect(await this.orderedId.textContent()).toEqual(orderNumber.replaceAll('|', '').trim());
    }
}