/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import { wait } from "../../../../../support/utilities/common-utilities";

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;
const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Custom Code action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real Device : Add Custom Code Action on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performCustomCodeAction('function() {return "test"}');
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateCustomCode("test");
    editorPage.saveTest("CustomCodeTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeTest");
  });

  it("Real Device : Add Custom Code Action from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performCustomCodeActionOnEditor('function() {return "test"}');
    editorPage.saveEditorTest("CustomCodeOnEditorTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeOnEditorTest");
  });

  it("Real Device : Custom Code Action is edited and deleted on recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editCustomCodeAction(0, 'function() {return "Hello world"}');
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("CustomCodeEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeEditAndDeleteTest");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction(0);
  });

  it("Real Device : Custom Code Action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performCustomCodeAction('function() {return "test"}');
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateCustomCode("test");
    editorPage.editCustomCodeActionOnEditor(
      0,
      'function() {return "Hello world"}'
    );
    editorPage.saveTest("CustomCodeEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeEditAndDeleteTest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction(0);
  });
});
