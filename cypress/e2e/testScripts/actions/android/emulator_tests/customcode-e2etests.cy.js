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

describe("Custom Code action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator : Add Custom Code Action on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performCustomCodeAction('function() {return "test"}');
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateCustomCode("test");
    editorPage.saveTest("CustomCodeTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeTest");
  });

  it("Emulator : Add Custom Code Action from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performCustomCodeActionOnEditor('function() {return "test"}');
    editorPage.saveEditorTest("CustomCodeOnEditorTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeOnEditorTest");
  });

  it("Emulator : Custom Code Action is edited and deleted on recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editCustomCodeAction(0, 'function() {return "Hello world"}');
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("CustomCodeEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("CustomCodeEditAndDeleteTest");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });

  it("Emulator : Custom Code Action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
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
    basePage.deleteAction();
  });
});
