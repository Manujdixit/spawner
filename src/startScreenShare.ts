import { WebDriver } from "selenium-webdriver";

export async function startScreenShare(driver: WebDriver) {
  try {
    console.log("Starting screen share with audio...");

    // Start screen share with audio
    const response = await driver.executeScript(`
      window.navigator.mediaDevices.getDisplayMedia({
          video: {
              displaySurface: "browser",
          },
          audio: true,
          preferCurrentTab: true
      }).then(stream => {
          const video = document.createElement("video");
          video.srcObject = stream;
          video.play();

          // Select the first element with class 'dHFSie'
          const targetElement = document.getElementsByClassName("dHFSie")[0];
          if (targetElement) {
              targetElement.appendChild(video);
          } else {
              console.error("Element with class 'dHFSie' not found.");
          }
      }).catch(error => {
          console.error("Error starting screen share:", error);
      });
    `);

    console.log("Screen share with audio started successfully");
    return response;
  } catch (error) {
    console.error("Failed to start screen share:", error);
    throw error;
  }
}
