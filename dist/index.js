"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = new chrome_1.Options({});
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--use-fake-ui-for-media-stream");
        let driver = yield new selenium_webdriver_1.Builder()
            .forBrowser(selenium_webdriver_1.Browser.CHROME)
            .setChromeOptions(options)
            .build();
        try {
            yield driver.get("https://meet.google.com/hgk-ossr-yjo");
            yield driver.sleep(3000);
            const gotit = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//span[contains(text(),"Got it")]')), 10000000);
            yield gotit.click();
            const element = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("qdOxv-fmcmS-wGMbrd")), 1000);
            yield element.clear();
            yield element.click();
            yield element.sendKeys("Manuj Bot");
            const buttonInput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//span[contains(text(),"Ask to join") or contains(text(),"Join")]')), 1000);
            yield buttonInput.click();
            yield driver.sleep(1000000);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
        finally {
            yield driver.quit();
        }
    });
}
main();
