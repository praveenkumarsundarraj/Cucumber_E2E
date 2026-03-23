import { BrowserContext, Page } from "playwright";
import { Expect } from "playwright/test";
import {World, setWorldConstructor, IWorldOptions} from '@cucumber/cucumber';
import { POManager } from "../../pages/POManager";
export class CustomManager extends World
{
    //here im creating all the data to be initialized throughout the framework and share it accross
    //these data will be initialized in hooks from where the test starts
    context?: BrowserContext;
    page?: Page;
    expect?: Expect;
    poManager?: POManager;

    //this order ID i create here can be declared and used across the steps of different features
    orderID?: any;

    constructor(options: IWorldOptions){
        super(options);
    }
}

setWorldConstructor(CustomManager);