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
const getDriver_1 = require("./getDriver");
const startScreenShare_1 = require("./startScreenShare");
const joinMeet_1 = require("./joinMeet");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let driver = null;
        try {
            driver = yield (0, getDriver_1.getDriver)();
            console.log("Driver initialized successfully");
            yield (0, joinMeet_1.joinMeet)(driver);
            console.log("Joined meeting, waiting for approval...");
            yield driver.sleep(15000); // Wait 15 seconds for meeting join approval
            yield (0, startScreenShare_1.startScreenShare)(driver);
            console.log("Screen share completed");
            // Keep the session alive for a while to maintain the screen share
            yield driver.sleep(30000);
        }
        catch (error) {
            console.error("Error occurred:", error);
        }
        finally {
            if (driver) {
                try {
                    yield driver.quit();
                    console.log("Driver session closed successfully");
                }
                catch (quitError) {
                    console.error("Error closing driver session:", quitError);
                }
            }
        }
    });
}
main().catch(error => {
    console.error("Unhandled error in main:", error);
    process.exit(1);
});
