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

describe("Emulator: Wait action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator : Wait action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performWaitAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testWaitAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testWaitAction");
  });

  it("Emulator : Wait action is added and executed on Emulator from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Wait");
    editorPage.saveEditorTest("testWaitActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testWaitActionfromEditor");
  });

  it("Emulator : Wait action is edited and deleted", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editWaitAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedWaitAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testEditedWaitAction");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
