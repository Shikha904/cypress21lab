/// <reference types="Cypress" />

import "cypress-iframe";
import * as basePage from "../../../../../support/Pages/BasePage.js";
import * as commonSteps from "../../../../../support/utilities/common-steps.js";
import RecorderPage from "../../../../../support/Pages/RecorderPage.js";

let recorderPage = new RecorderPage();
let testRunPage;
let editorPage;

const filePath = "/Applications/Android/ExpenseAppVer1.0.apk";
const apkInfoAppPath = "/Applications/Android/apkInfo.apk";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Real Device: setlocation action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Real Device: Set Location action is added and executed from Recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.openMapApplication();
    recorderPage.performLocationAction("Coordinates","27.2046° N", "77.4977° E");
    recorderPage.performLocationAction("Address","United States");
    editorPage = basePage.navigateToEditorPage();
    basePage.validateLocationAction("Coordinates",3);
    basePage.validateLocationAction("Address",4);
    editorPage.saveTest("SetLocationAction");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetLocationAction");
  });

  it("Real Device: Set Location action is added and executed from Editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addSetLocationOnEditor();
    editorPage.saveEditorTest("SetLocationActionEditor");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetLocationActionEditor");
  });

  it.only("Real Device: Set Location action is added from recorder edited and deleted from editor", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.openMapApplication();
    recorderPage.performLocationAction("Coordinates","27.2046° N", "77.4977° E");
    recorderPage.performLocationAction("Address","United States");
    editorPage = basePage.navigateToEditorPage();
    editorPage.editSetLocationActionOnEditor();
    editorPage.saveTest("SetLocationEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetLocationEditAndDeleteTest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction(3);
  });

  it("Real Device: Set Location action is edited and deleted from  recorder", () => {
    recorderPage = commonSteps.createAndroidTest(filePath);
    recorderPage.openMapApplication();
    recorderPage.performLocationAction("Coordinates","27.2046° N", "77.4977° E");
    recorderPage.performLocationAction("Address","United States");
    recorderPage.editSetLocationAction();
    editorPage = basePage.navigateToEditorPage();
    basePage.validateLocationAction("Address",3);
    basePage.validateLocationAction("Coordinates",4);
    editorPage.saveTest("SetLocationEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("SetLocationEditAndDeleteTest");
    cy.wait(5000); // explicit wait applied for releasing the device
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction(3);
  });
});