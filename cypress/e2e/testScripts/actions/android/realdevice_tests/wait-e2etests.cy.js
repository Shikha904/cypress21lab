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

describe("Real device: Wait action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: wait action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performWaitAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testWaitAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testWaitAction");
  });

  it("Real device: wait action is added and executed on Emulator from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addActionFromEditor("Wait");
    editorPage.saveEditorTest("testWaitActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testWaitActionfromEditor");
  });

  it("Real device: wait action is edited and deleted", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editWaitAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedWaitAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditedWaitAction");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.performWaitAction();
    basePage.deleteAction(1);
  });
});
