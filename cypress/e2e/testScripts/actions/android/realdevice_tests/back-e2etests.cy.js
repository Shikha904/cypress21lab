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

describe("Real device: Back action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: Back action is added from Recorder and executed on test run results", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testbackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testbackAction");
  });

  it("Real device: Back action is added from Editor and executed on test run results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Back");
    editorPage.saveEditorTest("testbackActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testbackActionfromEditor");
  });

  it("Real device: Back action is edited and deleted", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editBackAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedbackAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testEditedbackAction");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.performBackAction();
    basePage.deleteAction(1);
  });
});
