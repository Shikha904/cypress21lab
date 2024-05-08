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

describe("Emulator: Assert Text action end to end tests", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  /*  Verify that the user is able to add and run Assert Text action on the element
   by adding Target: Whole Page and all Logics for+ve and -ve  assertion from Recorder
   and action is successfully executed on Test Run Results. */

  it("Emulator: Assert text action with target : Whole Page from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performAssertTextAction("Whole page");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertText("Whole page");
    editorPage.saveTest("testAssertTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextAction");
    testRunPage.validateFailedCount(4);
  });

  /* Verify that the user is able to add and run Assert Text action on the element
   by adding Target:  element and all Logics  for +ve and -ve assertion from Recorder
    and action is successfully executed on Test Run Results.*/

  it.skip("Emulator: Assert text action with target : Element from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performAssertTextAction("login_signup_btn");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertText("SIGNUP");
    editorPage.saveTest("testAssertTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextAction");
    testRunPage.validateFailedCount(4);
  });

  /*Verify that the user is able to add Assert Text action by adding Target: Whole Page
     and all Logics for +ve and -ve assertion from Editor and action is successfully
      executed on Test Run Results.*/

  it.skip("Emulator: Assert Text action with target : Whole Page from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performAssertTextAction("Whole page");
    editorPage.saveEditorTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextFromEditor");
    testRunPage.validateFailedCount(4);
  });

  /*Verify that the user is able to add Assert Text action on the element by adding Target: element
     and all Logics for +ve and -ve assertion from Editor and action is successfully
      executed on Test Run Results.*/

  it.skip("Emulator: Assert Text action with target : Element from Editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performAssertTextAction("login_signup_btn");
    editorPage.saveEditorTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextFromEditor");
    testRunPage.validateFailedCount(4);
  });

  /*Verify that the user is able to Edit/Delete the Assert action from Test Steps
   from Recorder and is successfully executed on Test Run Results. */

  it("Emulator: Edit/Delete assert text action from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performEditAssertText(
      "login_signup_btn",
      "login_login_btn",
      0
    );
    editorPage = basePage.navigateToEditorPage();
    editorPage.saveTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextFromEditor");
    testRunPage.validateFailedCount(6);
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.deleteAssertText("login_signup_btn", 1);
    recorderPage.deleteAssertText("whole page", 1);
  });

  /*Verify that the user is able to Edit/Delete the Assert action from Test Steps
   from Editor and is successfully executed on Test Run Results. */

  it("Emulator: Edit/Delete assert text action from Recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performAssertTextAction("login_signup_btn");
    editorPage.editAssertText("login_login_btn");
    editorPage.saveEditorTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult();
    testRunPage.validateFailedCount(6);
    recorderPage = basePage.navigateToRecorderPage();
    editorPage = basePage.navigateToEditorPage();
    editorPage.deleteAssertText("login_signup_btn", 1);
    editorPage.deleteAssertText("whole page", 1);
  });
});
