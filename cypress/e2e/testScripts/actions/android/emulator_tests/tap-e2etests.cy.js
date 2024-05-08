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

describe("Emulator: Tap action end to end test", () => {
  beforeEach(() => {
    commonSteps.login();
    commonSteps.goToAllProjectPage();
  });

  it("Emulator: Add Tap with text analysis on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorProject(filePath);
    recorderPage.performTap("Text Analysis");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Text Analysis");
    editorPage.saveTest("Tapactiontest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapActionTest");
  });

  it("Emulator: Add Tap with text analysis from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Text Analysis");
    editorPage.saveEditorTest("TapTextAnalysisTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapTextAnalysisTest");
  });

  it("Emulator: Tap action with Text analysis is edited and deleted on recorder", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.editTapAction("Text Analysis", "Autonomous");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.saveTest("TapEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapEditAndDeleteRecorder");
    recorderPage = basePage.navigateToRecorderPage();
    basePage.deleteAction();
  });

  it("Emulator: Add Tap with visual analysis on recorder and run on test run", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performTap("Visual Analysis");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Visual Analysis");
    editorPage.saveTest("TapVisualAnalysisTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapVisualAnalysisTest");
  });

  it("Emulator: Add Tap with visual analysis on editor and run on test run", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Visual Analysis");
    editorPage.saveEditorTest("TapVisualAnalysisTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapVisualAnalysisTest");
  });

  it("Emulator: Tap action added on recorder and edited and deleted on editor", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performTap("Autonomous");
    editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.editTapAction("Autonomous", "Visual Analysis");
    editorPage.saveTest("TapEditAndDeleteTest");
    testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapEditAndDeleteTest");
    editorPage = basePage.navigateToEditorPage();
    basePage.deleteAction();
  });

  it("Emulator: Tap action with autonomous is added from Recorder and executed on test run results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    recorderPage.performTap("Autonomous");
    const editorPage = basePage.navigateToEditorPage();
    editorPage.validateTapAction("SIGNUP", "Autonomous");
    editorPage.saveTest("TapAutonomousTest");
    const testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapAutonomousTest");
  });

  it("Emulator: Add Tap with Autonomous from Editor and execute on Test Run Results", () => {
    recorderPage = commonSteps.createEmulatorTest(filePath);
    editorPage = basePage.navigateToEditorPage();
    editorPage.addTapFromEditor("Autonomous");
    editorPage.saveEditorTest("TapAutonomousTest");
    const testRunPage = editorPage.navigateToTestRunResults();
    testRunPage.validateResult("TapAutonomousTest");
  });
});
