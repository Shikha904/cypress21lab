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

describe("Real device: Application action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real Device : Application action with Close Launch and terminate App on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performApplicationAction("Close App", "clock");
    recorderPage.performApplicationAction(
      "Launch App",
      "io.perfecto.expense.tracker:id/action_bar_root",
      1
    );
    recorderPage.performApplicationAction(
      "Terminate App",
      "clock",
      2,
      "io.perfecto.expense.tracker"
    );
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateApplicationActionOnEditor();
    editorPage.saveTest("ApplicationActionRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("ApplicationActionRecorder");
  });

  it("Real Device : Application action with Reset App on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performResetAppAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateApplicationActionOnEditor("Reset App");
    editorPage.saveTest("ApplicationActionRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("ApplicationActionRecorder");
  });

  it("Real Device : Application action on editor and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addApplicationActionOnEditor("Close App");
    editorPage.addApplicationActionOnEditor("Launch App");
    editorPage.addApplicationActionOnEditor(
      "Terminate App",
      "io.perfecto.expense.tracker"
    );
    editorPage.addApplicationActionOnEditor("Reset App");
    editorPage.saveEditorTest("ApplicationActionEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("ApplicationActionEditor");
  });

  it("Real Device : Application action added on recorder and edited and deleted on recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performApplicationAction("Close App", "clock");
    recorderPage.performApplicationAction(
      "Launch App",
      "io.perfecto.expense.tracker:id/action_bar_root",
      1
    );
    recorderPage.performApplicationAction(
      "Terminate App",
      "clock",
      2,
      "io.perfecto.expense.tracker"
    );
    recorderPage.editApplicationAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("EditDeleteApplicationActionRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditDeleteApplicationActionRecorder");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });

  it("Real Device: Application action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performApplicationAction("Close App", "clock");
    recorderPage.performApplicationAction(
      "Launch App",
      "io.perfecto.expense.tracker:id/action_bar_root",
      1
    );
    recorderPage.performApplicationAction(
      "Terminate App",
      "clock",
      2,
      "io.perfecto.expense.tracker"
    );
    editorPage = basePage.navigateToEditorPage();
    editorPage.editApplicationActionOnEditor();
    editorPage.saveTest("EditDeleteApplicationActionEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditDeleteApplicationActionEditor");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });
});
