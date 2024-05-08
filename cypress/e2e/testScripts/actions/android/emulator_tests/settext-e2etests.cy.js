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

describe("Emulator: Set Text action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator : Set text action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performSetText("Insert text", "login_email", "Testing", 0);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor(0);
    editorPage.saveTest("SetTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetTextAction");
  });

  it.only("Emulator : Set text action is added with use variable from recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    basePage.addUseVariableAction();
    recorderPage.performSetText("Use Variable", "login_email", "Testing", 1);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor();
    editorPage.saveTest("SetText using UseVariable");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using UseVariable");
  });

  it("Emulator : Set text action with test data on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath, "TestData");
    recorderPage.performSetText(0, "Test Data");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor(0, "Test Data");
    editorPage.saveTest("SetText using Test Data");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using Test Data");
  });

  it("Emulator : Set Text action is added and executed from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(0);
    editorPage.saveEditorTest("testSetTextActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult();
  });

  it("Emulator : Set text action is added with use variable from editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(1, "Use Variable");
    editorPage.saveEditorTest("SetTextFromEditorUseVariable");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetTextFromEditorUseVariable");
  });

  it("Emulator : Set text action test data on editor and run on test run", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(0, "Test Data");
    editorPage.saveEditorTest("SetText using Test Data From Editor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using Test Data From Editor");
  });

  it("Emulator : Set text action is edited and deleted on Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editSetTextAction(0);
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedSetTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testSetTextWithPlaceHolder");
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.deleteSetTextAction();
  });

  it("Emulator : Set text action is added and executed using placeholder text using recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performSetTextWithPlaceHolderAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testSetTextWithPlaceHolder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testSetTextWithPlaceHolder");
  });
});
