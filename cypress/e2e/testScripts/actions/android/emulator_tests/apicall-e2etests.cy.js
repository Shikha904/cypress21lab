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
const httpMethods = new Array("GET", "POST", "DELETE", "PUT", "PATCH");

describe("Emulator: API Call action with end to end test 'GET','POST','PUT','PATCH','DELETE'", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: Add API call on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performAPICall(httpMethods);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAPICall(httpMethods);
    editorPage.saveTest("APICallActionTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("APICallActionTest");
    testRunPage.validateFailedCount(0);
  });

  it("Emulator: Add API call on editor and run on test run", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addAPICallOnEditor(httpMethods);
    editorPage.saveEditorTest("APICallFromEditorTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("APICallFromEditorTest");
  });

  it("Emulator: API Call action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performAPICall(new Array("POST"));
    editorPage = basePage.navigateToEditorPage();
    editorPage.editAPICall(new Array("POST"), new Array("GET"));
    editorPage.saveTest("APICallEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("APICallEditAndDeleteTest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Emulator: API Call action with edited and deleted on recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.selectAPICall();
    basePage.addAPICall("GET");
    recorderPage.editAPICall("POST");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAPICall(new Array("POST"));
    editorPage.saveEditorTest("APICallEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("APICallEditAndDeleteTest");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
