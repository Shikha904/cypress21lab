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

describe("Emulator: Home action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  /**Verify that the user is able to add and run Home action
   * on Recorder and is successfully executed on Test Run Results. */
  it("Emulator: Add Home action on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performHomeAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("Home action test");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Home action test");
  });

  /**Verify that the user is able to add Home action from Editor
   * and action is successfully executed on Test Run Results. */
  it("Emulator: Add Home action from Editor and executed on Test Run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Home");
    editorPage.saveEditorTest("testhomeActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testhomeActionfromEditor");
  });

  /**Verify that the user is able to Edit/delete the Home action from Recorder
   *  and is successfully executed on Test Run Results. */
  it("Emulator: Home action is edited and deleted", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editHomeAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedHomeAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testEditedHomeAction");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
