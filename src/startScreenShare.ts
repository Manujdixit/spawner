import { WebDriver } from "selenium-webdriver";

const script = `
function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}
 
function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(() => {
    if (recorder.state === "recording") {
      recorder.stop();
    }
  });

  return Promise.all([stopped, recorded]).then(() => data);
}


console.log("before mediadevices");
window.navigator.mediaDevices.getDisplayMedia({
  video: {
      displaySurface: "browser",
  },
  audio: true,
}).then(async stream => {
console.log("before start recording");
  const recordedChunks=await startRecording(stream,10000);
  console.log("after start recording");
  let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  const recording= document.createElement("video");
  recording.src = URL.createObjectURL(recordedBlob);
  const downloadButton = document.createElement("a");
  downloadButton.href = recording.src;
  downloadButton.download = "RecordedVideo.webm";
  downloadButton.click();
  console.log("after download button click");
});
`;

export async function startScreenShare(driver: WebDriver) {
  try {
    console.log("Starting screen share with audio...");

    const response = await driver.executeScript(script);

    console.log("Screen share with audio started successfully");
    return response;
  } catch (error) {
    console.error("Failed to start screen share:", error);
    throw error;
  }
}
