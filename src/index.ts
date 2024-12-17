import { getDriver } from "./getDriver";
import { startScreenShare } from "./startScreenShare";
import { joinMeet } from "./joinMeet";

async function main() {
  let driver = null;
  
  try {
    driver = await getDriver();
    console.log("Driver initialized successfully");

    await joinMeet(driver);
    console.log("Joined meeting, waiting for approval...");
    await driver.sleep(15000); // Wait 15 seconds for meeting join approval
    
    await startScreenShare(driver);
    console.log("Screen share completed");
    
    // Keep the session alive for a while to maintain the screen share
    await driver.sleep(30000);
    
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    if (driver) {
      try {
        await driver.quit();
        console.log("Driver session closed successfully");
      } catch (quitError) {
        console.error("Error closing driver session:", quitError);
      }
    }
  }
}

main().catch(error => {
  console.error("Unhandled error in main:", error);
  process.exit(1);
});
