/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";
import { wait } from "../../../../../support/utilities/common-utilities";


Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;

const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";

describe("Real Device: longpress action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real Device: longpress action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performLongPressAction("Email*");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateLongPressAction("Email*", "5");
    editorPage.saveTest("TestLongpressRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestLongpressRecorder");
  });

  it("Real Device: longpress action is added and executed from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addLongpressOnEditor("Email*");
    editorPage.saveEditorTest("TestLongpressEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestLongpressEditor");
  });

  it("Real Device: longpress action is added from recorder edited and deleted from editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performLongPressAction("Email*");
    editorPage = basePage.navigateToEditorPage();
    basePage.editLongPress("Password*", 5);
    editorPage.saveTest("TestEditedLongpress");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestEditedLongpress");
    recorderPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Real Device: longpress action is edited and deleted from Recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performLongPressAction("Email*");
    basePage.editLongPress("Password*", 5);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateLongPressAction("Password*", "11");
    editorPage.saveTest("TestEditedLongpress");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestEditedLongpress");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
