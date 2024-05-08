/// <reference types="Cypress" />

import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";
import { wait } from "../../../../../support/utilities/common-utilities";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;
const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";

describe("Real device: Assert Text action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  /*  Verify that the user is able to add and run Assert Text action on the element
   by adding Target: Whole Page and all Logics for+ve and -ve  assertion from Recorder
   and action is successfully executed on Test Run Results. */

  it("Real device: Assert text action is added with target Whole Page and executed on Recorder", () => {
    recorderPage = commonSteps.createAndroidProject(filePath);
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

  it("Real device: Assert text action is added with target Element and executed on Recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.performAssertTextAction("login_signup_btn");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateAssertText("SIGNUP");
    editorPage.saveTest("testAssertTextAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextAction");
    testRunPage.validateFailedCount(4);
  });

  /*Verify that the user is able to add Assert Text action on the element by adding Target: Whole Page
   and all Logics for +ve and -ve assertion from Editor and action is successfully
    executed on Test Run Results. */

  it("Real device: Assert Text action is added with target Element and executed from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
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

  it("Real device : Assert Text action is added with target Element and executed from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performAssertTextAction("login_signup_btn");
    editorPage.saveEditorTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextFromEditor");
    testRunPage.validateFailedCount(4);
  });

  /*Verify that the user is able to Edit/Delete the Assert action from Test Steps
   from Recorder and is successfully executed on Test Run Results. */

  it("Real device : Edit/Delete assert text action from Recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
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
    wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    recorderPage.deleteAssertText("login_signup_btn", 1);
    recorderPage.deleteAssertText("whole page", 1);
  });

  /*Verify that the user is able to Edit/Delete the Assert action from Test Steps
  from Editor and is successfully executed on Test Run Results. */

  it("Real device : Edit/Delete assert text action from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.performAssertTextAction("login_signup_btn");
    editorPage.editAssertText("login_login_btn");
    editorPage.saveEditorTest("testAssertTextFromEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("testAssertTextFromEditor");
    testRunPage.validateFailedCount(6);
    editorPage = basePage.navigateToEditorPage();
    editorPage.deleteAssertText("login_signup_btn", 1);
    editorPage.deleteAssertText("whole page", 1);
  });
});
