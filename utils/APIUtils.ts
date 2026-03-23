import { APIRequestContext, expect, Page } from '@playwright/test';

interface LoginPayload {
    userEmail: string;
    userPassword: string;
}
interface orderItem {
    country: string;
    productOrderedId: string;
}
interface CreateOrderPayload {
    orders: orderItem[];
}

export class APIUtils {
    apicontext: APIRequestContext;
    loginPayload: LoginPayload;
    constructor(apicontext: APIRequestContext, loginPayload: LoginPayload) {
        //this constructor is used to initialize the apiContext and payload when the object is created, since they both should be initialized at the start of the execution.
        this.apicontext = apicontext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        //stores the login response by making post API call using the header URL with payload loaded in second parameter
        const loginResponse = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            });
        // expect(loginResponse.ok()).toBeTruthy();//validate the response is success
        const extractLoginResponse = await loginResponse.json();
        //extract store the token value from the login response json simply by calling the key using . operator
        const token: string = extractLoginResponse.token;
        return token;
    }

    async createOrder(createOrderPayload: CreateOrderPayload) {
        //create Order
        let response: any = {};//initialized a javascript object response which has all the object needed and return this object to get token, orderID and message
        response.token = await this.getToken();
        const createOrder = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: createOrderPayload,
                headers: {
                    'authorization': response.token,
                    'content-type': 'application/json',
                }
            });
        expect(createOrder.ok()).toBeTruthy();
        const createOrderResponse = await createOrder.json();
        response.orderMessage = createOrderResponse.message;
        response.orderID = createOrderResponse.orders[0];
        return response;
    }

    async addLocalStorage(page: Page, token: string) {

        //add java script to initialize page setup and insert the login token into local storage
        await page.addInitScript(value => {//this value is the function name we have which grabs the token passed as second argument
            window.localStorage.setItem('token', value);//token we placed in this line is the Key we want to insert inside local storage. we can give any name which we want to insert into local storage
        }, token);//token specified in this line is the token we created in beforeall which stores the token value
    }

    async initSessionStorage(page: Page) {
        const token = await this.getToken();
        await page.addInitScript(value  => {
            window.sessionStorage.setItem('sessionToken', value)
        }, token);//setting session storage for testing purpose to check whether we can add token as session token as key
    }

}
