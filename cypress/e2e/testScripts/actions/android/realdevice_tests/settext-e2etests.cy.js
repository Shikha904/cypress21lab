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

describe("Real device: Set text action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: set text action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    recorderPage.performSetText("login_email", "Insert text", "Testing", 0);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor();
    editorPage.saveTest("SetTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetTextAction");
  });

  it("Real device: set text action is added with use variable from recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    basePage.addUseVariableAction();
    recorderPage.performSetText("login_email", "Use Variable", 1);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor();
    editorPage.saveTest("SetText using UseVariable");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using UseVariable");
  });

  it("Real device: set text action with test data on recorder and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performSetText(0, "Test Data");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateSetTextOnEditor();
    editorPage.saveTest("SetText using Test Data");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using Test Data");
  });

  it("Real device: set Text action is added and executed from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(0);
    editorPage.saveEditorTest("testSetTextActionfromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testSetTextActionfromEditor");
  });

  it("Real device: set text action is added with use variable from editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(1, "Use Variable");
    editorPage.saveEditorTest("SetTextFromEditorUseVariable");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetTextFromEditorUseVariable");
  });

  it("Real device: set text action test data on editor and run on test run", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetTextActionOnEditor(0, "Test Data");
    editorPage.saveEditorTest("SetText using Test Data From Editor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetText using Test Data From Editor");
  });

  it("Real device: set text action is edited and deleted", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.editSetTextAction(0);
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testEditedSetTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditedSetTextAction");
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.deleteSetTextAction();
  });

  it("Real device: set text action is added and executed using placeholder text", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performSetTextWithPlaceHolderAction();
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testSetTextWithPlaceHolder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testSetTextWithPlaceHolder");
  });
});
