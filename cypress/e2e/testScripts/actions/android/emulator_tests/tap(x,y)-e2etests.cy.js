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

describe("Emulator: Tap(x,y) action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: Add Tap(x,y) on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performTapXY(150, 300);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapXY("Tap on position");
    editorPage.saveTest("Tapxyactiontest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapxyactiontest");
  });

  it("Emulator: Add Tap (x,y) from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapXYOnEditor(150, 300);
    editorPage.saveTest("Tapxyactioneditortest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapxyactioneditortest");
  });

  it("Emulator: Tap(x,y) action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performTapXY(100, 300);
    editorPage = basePage.navigateToEditorPage();
    editorPage.editTapXY(150, 300);
    editorPage.saveTest("Tapxyeditanddeletetest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapxyeditanddeletetest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Emulator: Tap(x,y) action with edited and deleted on recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    basePage.addTapXY(100, 300);
    recorderPage.editTapXY(150, 300);
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapXY("Tap on position");
    editorPage.saveTest("Tapxyeditanddeletetest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("Tapxyeditanddeletetest");
    cy.wait(10000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });
});
