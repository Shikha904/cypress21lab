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

describe("Emulator: Assert Text action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: Back action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testbackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testbackAction");
  });

  it("Emulator: Back action is added and executed from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Home");
    editorPage.saveTest("testbackActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testbackActionfromEditor");
  });

  it("Emulator: Back action is edited and deleted", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedbackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testEditedbackAction");
    basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
