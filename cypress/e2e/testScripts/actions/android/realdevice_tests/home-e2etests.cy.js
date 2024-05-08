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

describe("Real device: Home action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: Add Home action on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performHomeAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("Homeactiontest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Homeactiontest");
  });

  it("Real device: Add Home action from Editor and executed on Test Run Results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Home");
    editorPage.saveEditorTest("testhomeActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testhomeActionfromEditor");
  });

  it("Real device: Home action is edited and deleted", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editHomeAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedHomeAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditedHomeAction");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.deleteAction();
  });
});
