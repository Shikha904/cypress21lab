/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";


Cypress.on("uncaught:exception", () => {
  return false;
});

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;

const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";

describe("Emulator: longpress action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: longpress action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performLongPressAction("Email*");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateLongPressAction("Email*", "5");
    editorPage.saveTest("TestLongpressRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestLongpressRecorder");
  });

  it("Emulator: longpress action is added and executed from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addLongPressOnEditor("Email*");
    editorPage.saveEditorTest("TestLongpressEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestLongpressEditor");
  });

  it("Emulator: longpress action is added from recorder edited and deleted from editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performLongPressAction("Email*");
    editorPage = basePage.navigateToEditorPage();
    basePage.editLongPress("Password*", 5);
    editorPage.saveTest("TestEditedLongpress");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestEditedLongpress");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Emulator: longpress action is edited and deleted from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performLongPressAction("Email*");
    basePage.editLongPress("Password*", 5);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateLongPressAction("Password*", "11");
    editorPage.saveTest("TestEditedLongpress");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestEditedLongpress");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
