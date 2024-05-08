/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

var recorderPage = new RecorderPage();
var testRunPage;
var editorPage;
const filePath = "/Applications/iOS/TheApp-v1.10.0.app.zip";

describe("Simulator: back action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Simulator: Back action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createSimulatorProject(filePath);
    recorderPage.performBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("TestBackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestBackAction");
  });

  it("Emulator: Back action is added and executed from Editor", () => {
    recorderPage = commonSteps.createSimulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Back");
    editorPage.saveEditorTest("TestBackActionEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestBackActionEditor");
  });

  it.skip("Emulator: Back action is edited and deleted", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("TestEditedBackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TestEditedBackAction");
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.performBackAction();
    basePage.deleteAction(1);
  });
});
