import { By, until, WebDriver } from "selenium-webdriver";

export async function joinMeet(driver: WebDriver) {
  try {
    await driver.get("https://meet.google.com/civ-rrbx-zjf");

    const gotIt = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),
      10000
    );
    await gotIt.click();

    const nameInput = await driver.wait(
      until.elementLocated(By.className("qdOxv-fmcmS-wGMbrd")),
      10000
    );
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("Manuj Bot");

    const askToJoinButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//span[contains(text(),"Ask to join") or contains(text(),"Join")]'
        )
      ),
      10000
    );
    await askToJoinButton.click();
  } catch (error) {
    console.error("An error occurred while joining meet:", error);
    throw error; // Propagate the error to the main function
  }
}
