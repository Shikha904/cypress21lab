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

const assertFor = [
  "Visible",
  "Not visible",
  "Checked",
  "Not checked",
  "Enable",
  "Not enable",
];

describe("assert Element action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: assert Element added from Recorder and executed on Test run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performAssertElement(assertFor, "login_signup_btn");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertElement(assertFor, "SIGNUP");
    editorPage.saveTest("AssertElementRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertElementRecorder");
    testRunPage.validateFailedCount(3);
  });

  it("Emulator: assert Element added from Editor and executed on Test run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addAssertElement(assertFor, "login_signup_btn");
    editorPage.saveEditorTest("AssertElementEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("AssertElementEditor");
    testRunPage.validateFailedCount(3);
  });

  it("Emulator: assert Element is edited/Deleted from Recorder and executed on Test run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performEditAssertElement(
      assertFor,
      "login_signup_btn",
      "login_login_btn"
    );
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("EditAssertElementRecorder");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditAssertElementRecorder");
    testRunPage.validateFailedCount(4);
    recorderPage = basePage.navigateToRecorderPage();
    basePage.addAssertElementAction(1, "login_signup_btn");
    basePage.deleteAction(1);
  });

  it("Emulator: assert Element is edited/Deleted from Editor and executed on Test run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addEditAssertElement(
      assertFor,
      "login_signup_btn",
      "login_login_btn"
    );
    editorPage.saveEditorTest("EditAssertElementEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("EditAssertElementEditor");
    testRunPage.validateFailedCount(4);
    editorPage = basePage.navigateToEditorPage();
    editorPage.deleteAssertElement();
  });
});
