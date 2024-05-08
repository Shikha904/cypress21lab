/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";
import { wait } from "../../../../../support/utilities/common-utilities";

Cypress.on("uncaught:exception", () => {
  return false;
});

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;
const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";

describe("Real device: Tap action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: Add Tap with text analysis on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performTap("Text Analysis");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Text Analysis");
    editorPage.saveTest("Tapactiontest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapactiontest");
  });

  it("Real device: Add Tap with text analysis from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Text Analysis");
    editorPage.saveEditorTest("tapwithtextanalysisfromeditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("tapwithtextanalysisfromeditor");
  });

  it("Real device: Tap action with Text analysis is edited and deleted on recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editTapAction("Text Analysis", "Autonomous");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.saveTest("Tapeditanddeletetest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapeditanddeletetest");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });

  it("Real device: Add Tap with visual analysis on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performTap("Visual Analysis");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Visual Analysis");
    editorPage.saveTest("Tap-visualanalysis");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tap-visualanalysis");
  });

  it("Real device: Add Tap with visual analysis on editor and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Visual Analysis");
    editorPage.saveEditorTest("Tap-visualanalysis-editor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tap-visualanalysis-editor");
  });

  it("Real device: Tap action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performTap("Autonomous");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.editTapAction("Autonomous", "Visual Analysis");
    editorPage.saveTest("Tapeditanddeletetest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapeditanddeletetest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Real device: Tap action with autonomous is added from Recorder and executed on test run results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performTap("Autonomous");
    const editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.saveTest("Tap-autonomous");
    const testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tap-autonomous");
  });

  it("Real device: Add Tap with Autonomous from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Autonomous");
    editorPage.saveEditorTest("Tap-autonomous-editor");
    const testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tap-autonomous-editor");
  });
});
