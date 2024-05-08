// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

var recorderPage = new RecorderPage();
var testRunPage;
var editorPage;
const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";
var assertLogic = ["Equals", "Contains", "Does Not Contain", "Starts With"];

describe("Real device: Assert variable action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real device: Assert Variable action with target as Whole Page for +ve scenario on recorder", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
    basePage.addUseVariableAction("login_login_btn", "login");
    recorderPage.performAssertVariableAction(
      assertLogic,
      "login",
      "Whole page"
    );
    basePage.addCustomCode('function() {return "test"}');
    recorderPage.performAssertVariableAction(
      assertLogic,
      "customCodeVariable",
      "Whole page"
    ); //Assert Variable action for -ve scenario
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertVariable(assertLogic, "Whole page");
    editorPage.saveTest("AssertVariableAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableAction");
    testRunPage.validateFailedCount(4);
  });

  it("Real device: Assert Variable action with target as Element on recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    basePage.addUseVariableAction("login_login_btn", "login");
    recorderPage.performAssertVariableAction(
      assertLogic,
      "login",
      "login_login_btn"
    );
    basePage.addCustomCode('function() {return "test"}');
    recorderPage.performAssertVariableAction(
      assertLogic,
      "customCodeVariable",
      "login_login_btn"
    ); //Assert Variable action for -ve scenario
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertVariable(assertLogic, "LOGIN");
    editorPage.saveTest("AssertVariableAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableAction");
    testRunPage.validateFailedCount(4);
  });

  it("Real device: Assert Variable action with target as Whole Page from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addAssertVariableOnEditor(assertLogic, "Whole page");
    editorPage.saveEditorTest("AssertVariableActionOnEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableActionOnEditor");
    testRunPage.validateFailedCount(4);
  });

  it("Real device: Assert Variable action with target as Element from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addAssertVariableOnEditor(assertLogic, "login_login_btn");
    editorPage.saveEditorTest("AssertVariableActionOnEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableActionOnEditor");
    testRunPage.validateFailedCount(4);
  });

  it("Real device: Assert variable action is edited and deleted from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    basePage.addUseVariableAction("login_login_btn", "login");
    recorderPage.performAssertVariableAction(
      assertLogic,
      "login",
      "login_login_btn"
    );
    recorderPage.editAssertVariableAction(assertLogic);
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("AssertVariableEditAndDelete");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableEditAndDelete");
    testRunPage.validateFailedCount(1);
    cy.wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.addAssertVariableAction(1, "Use variable", "login", "Whole page");
    basePage.deleteAction(1);
  });

  it("Real device: Assert variable action is edited and deleted from editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.editAssertVariableAction(assertLogic, "login", "Whole page");
    editorPage.saveEditorTest("AssertVariableEditAndDelete");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertVariableEditAndDelete");
    testRunPage.validateFailedCount(1);
    editorPage = basePage.navigateToEditorPage();
    editorPage.deleteAssertVariableAction();
  });
});
