/// <reference types="Cypress" />

import "cypress-iframe";
import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;
const filePath = "/Applications/Android/WattpadStories.apk";

describe("swipe action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: Swipe action left/Right from Recorder", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performLeftRightSwipeAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateLeftRightSwipeAction();
    editorPage.saveTest("LeftRightSwipeRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("LeftRightSwipeRecorder");
  });

  it("Emulator: Swipe action Up/Down from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performHomeAction();
    recorderPage.performSwipeUpDownAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateUpDownSwipeAction();
    editorPage.saveTest("UpDownSwipeRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("UpDownSwipeRecorder");
  });

  it("Emulator: Swipe action Edited/Deleted from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editSwipe();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("EditSwipeRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditSwipeRecorder");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });

  it("Emulator: Swipe action left/Right from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addLeftRightSwipeAction();
    editorPage.saveEditorTest("LeftRightSwipeEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("LeftRightSwipeEditor");
  });

  it("Emulator: Swipe action Up/Down from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSwipeUpDownAction();
    editorPage.saveEditorTest("UpDownSwipeEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("UpDownSwipeEditor");
  });

  it("Emulator: Swipe action Edited/Deleted from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.editSwipe();
    editorPage.saveEditorTest("EditSwipeEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditSwipeEditor");
    editorPage = basePage.navigateToEditorPage();
    editorPage.deleteSwipe();
  });
});
