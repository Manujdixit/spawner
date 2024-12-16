import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function main() {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://meet.google.com/hgk-ossr-yjo");
    await driver.sleep(3000);
    const gotit = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')), 10000000);

    await gotit.click();

    const element = await driver.wait(
      until.elementLocated(By.className("qdOxv-fmcmS-wGMbrd")),
      1000
    );
   

    await element.clear();
    await element.click();
    await element.sendKeys("Manuj Bot");
    const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Ask to join") or contains(text(),"Join")]')), 1000);

    await buttonInput.click();

    await driver.sleep(1000000)
   } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
}

main();
