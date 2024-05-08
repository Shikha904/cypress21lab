import "../commands.js";
import {
  elementClick,
  setText,
  wait,
  multipleClick,
} from "../utilities/common-utilities.js";
import * as basePage from "./BasePage.js";
import TestRunPage from "./TestRunPage.js";
import * as editorPageObject from "./pageobjects/editor-pageobjects";
import * as recorderPageObject from "./pageobjects/recorder-pageobjects.js";
import * as commonPageObjects from "./pageobjects/common-pageobjects.js";
import { dateTime } from "../commands.js";
import { should } from "chai";

class EditorPage {
  validateEditorPage = (actionName, screenIndex) => {
    editorPageObject.getEditIcon().should("have.class", "test-page-active");
    if (typeof actionName != "undefined") {
      this.editAction(actionName, screenIndex);
    }
  };

  editAction = (actionName, screenIndex) => {
    wait(1000);
    basePage.selectScreenByIndex(screenIndex);
    elementClick(editorPageObject.editActionBtn());
    commonPageObjects.getActionPanelTitle().should("have.text", actionName);
  };

  /**
   * This method is to add screen on editor using index or screenname
   * @param {index or screenname} screenVal
   * @returns
   */
  addScreen = (screenVal) => {
    elementClick(editorPageObject.getAddScreenBtn());
    if (Number.isInteger(screenVal)) {
      elementClick(editorPageObject.getScreenToSelect().eq(screenVal));
    } else if (screenVal == "BlankScreen") {
      elementClick(editorPageObject.getBlankScreenComponent());
    } else {
      elementClick(screenVal);
    }
    return elementClick(editorPageObject.getAddSelectedBtn());
  };

  editTest = (testName) => {
    editorPageObject
      .getDefaultTestName()
      .should("be.visible")
      .then(() => {
        wait(1000);
        setText(editorPageObject.getDefaultTestName(), testName);
      });
    elementClick(editorPageObject.getMainEditorArea());
  };

  saveTest = (testName) => {
    this.editTest(testName + dateTime());
    elementClick(editorPageObject.getSaveButton()).then(() => {
      elementClick(editorPageObject.getSaveAsIsButton());
      commonPageObjects.getSavingText().should("not.exist");
      commonPageObjects.getLoadingText().should("not.exist");
    });
  };

  saveEditorTest = (testName) => {
    this.editTest(testName + dateTime());
    elementClick(editorPageObject.getSaveButton());
  };

  navigateToTestRunResults = () => {
    editorPageObject
      .getRunButton()
      .should("have.css", "background-color", "rgb(0, 134, 191)")
      .then(() => {
        elementClick(editorPageObject.getRunButton());
      });
    basePage
      .containsIFrameElement("Running...")
      .should("be.visible")
      .then(() => {
        wait(1000);
        elementClick(editorPageObject.getTestRunsResultsButton());
      });
    return new TestRunPage();
  };

  addActionFromEditor = (actionName) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.selectAction(actionName);
    basePage.addAction(actionName);
  };

  addActionDetails = (actionName) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.selectAction(actionName);
  };

  addActionAndValidate = (actionOnTestStep) => {
    elementClick(editorPageObject.getAddActionButton()).then(() => {
      editorPageObject.getActionDetailHeaderOnTestSteps(),
        should("have.text", actionOnTestStep);
    });
  };

  addUseVariableEditor = () => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addUseVariableAction("login_email");
  };

  /**
   *
   * @param {0,1} editIndex for Use Variable 1 and
   * for others will be 0(as set text is added after
   * use variable so added on the second step)
   * @param {*} Source
   */

  addSetTextActionOnEditor = (element, source, text) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSetTextAction(element);
    switch (source) {
      case "Use Variable":
        basePage.selectUseVariableSource();
        break;
      case "Test Data":
        basePage.selectTestDataSource();
        break;
      default:
        setText(recorderPageObject.getSetTextInputField(), text);
    }
    basePage.addAction("SetText");
  };

  validateTapAction = (targetValue, objectDetectSource) => {
    this.validateEditorPage("Tap");
    commonPageObjects.getTargetInput().should("have.text", targetValue);
    editorPageObject.detectObjectUsing().contains(objectDetectSource);
  };

  validateSetTextOnEditor = (editIndex, source) => {
    basePage.selectScreenByIndex();
    basePage.validateSetText(editIndex, "Testing", source);
  };

  /**
   * @param {Autonoumous, Visual Analysis, Text Analysis} ObjectDetector
   * @param {Autonoumous, Visual Analysis, Text Analysis} targetObjecrDetector
   * @param {0,1,2,,..3} screenIndex
   */

  editTapAction = (ObjectDetector, targetObjectDetector) => {
    basePage.editTap(ObjectDetector, targetObjectDetector);
    if (targetObjectDetector == "Visual Analysis") {
      commonPageObjects.getActionPanel().should("have.descendants", "canvas");
    } else {
      recorderPageObject
        .getIElementText()
        .invoke("attr", "value")
        .should("eq", "SIGNUP");
    }
    basePage.addAction("Tap");
  };

  addTapFromEditor = (objectDetector) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    elementClick(commonPageObjects.getTapAction());
    elementClick(commonPageObjects.getExpenseAppSignupButton());
    switch (objectDetector) {
      case "Text Analysis":
        elementClick(editorPageObject.getDefaultObjectDetectOption());
        elementClick(editorPageObject.getTextAnalysisOption());
        break;
      case "Visual Analysis":
        elementClick(editorPageObject.getDefaultObjectDetectOption());
        elementClick(editorPageObject.getVisualAnalysisOption());
        // Code for selecting visual analysis
        break;
      default:
      // Nothing required as default is autonomous
    }
    if (objectDetector == "Visual Analysis") {
      commonPageObjects.getActionPanel().should("have.descendants", "canvas");
    } else {
      recorderPageObject
        .getIElementText()
        .invoke("attr", "value")
        .should("eq", "SIGNUP");
    }
    basePage.addAction("Tap");
  };

  /**
   * This function will be used to validated the added Tap(x,y) action on editor
   * which was added on recorder
   * @param {'Tap on position'} actionPanelHeader
   * @param {'SIGNUP','LOGIN'} getTargetInputText
   * @param {'',0, 1, 2} screenIndex
   */

  validateTapXY = (actionPanelHeader, screenIndex) => {
    this.validateEditorPage(actionPanelHeader, screenIndex);
  };

  addTapXYOnEditor = (xPosition, yPosition, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    cy.wait(2000);
    basePage.addTapXY(xPosition, yPosition);
  };

  editTapXY = (xPosition, yPosition, screenIndex) => {
    this.validateTapXY("Tap on position", screenIndex);
    elementClick(commonPageObjects.getTargetCancelBtn());
    elementClick(commonPageObjects.getDeviceSkin().eq(0), xPosition, yPosition);
    basePage.addAction("Tap");
  };

  /**
   * This method is used for adding assert text with only one combination
   * can be reused in delete assert and if it is needed to apply assert with any other action.
   * @param {*} target
   */
  addAssertText = (target) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addAssertTextAction("Equals", "SIGNUP", target);
  };

  /**
   * This method is used for adding assert action from Editor
   * @param {*} target
   */

  performAssertTextAction = (target) => {
    var logic = ["Equals", "Contains", "Starts With", "Does Not Contain"];
    var targetText = [
      "SIGNUP",
      "UP",
      "SIGN",
      "ABC",
      "ABC",
      "XYZ",
      "UP",
      "SIGN",
    ];
    var j = 0;
    do {
      for (var i = 0; i < logic.length; i++, j++) {
        elementClick(editorPageObject.getAddActionButtonOnTestSteps());
        basePage.addAssertTextAction(logic[i], targetText[j], target);
      }
    } while (j < targetText.length);
  };

  /**
   * This method is used for validating assert text action from Editor
   * @param {*} targetText is text of the target element for validation.
   */

  validateAssertText = (target) => {
    basePage.selectScreenByIndex(0);
    cy.wait(2000); // required for the screen to load.(before clicking on first edit)
    var logic = ["Equals", "Contains", "Starts With", "Does Not Contain"];
    var targetText = [
      "SIGNUP",
      "UP",
      "SIGN",
      "ABC",
      "ABC",
      "XYZ",
      "UP",
      "SIGN",
    ];
    var j = 0;
    do {
      for (var i = 0; i < logic.length; i++, j++) {
        basePage.validateAssertAction(logic[i], targetText[j], target, j);
      }
    } while (j < targetText.length);
  };

  /** This method is for adding action from editor,
   *  editing the action and then validating that action
   * is edited from editor
   */

  editAssertText = (newTarget) => {
    basePage.editAssertText(newTarget);
    basePage.selectScreenByIndex(0);
    basePage.validateAssertAfterEdit("SIGNUP", "LOGIN");
  };

  /**
   * This method is for deleting assert text action from editor
   * @param {*} target : target text of the element
   * @param {*} screenIndex : index of the screen on which the action is added.
   */

  deleteAssertText = (target, screenIndex) => {
    this.addAssertText(target);
    basePage.deleteAction(screenIndex);
  };

  /*This method is used for validating the action on editor*/
  validateApplicationActionOnEditor = (applicationAction) => {
    if (applicationAction == "Reset App") {
      basePage.selectScreenByIndex(3);
      basePage.validateApplicationAction(applicationAction);
    } else {
      basePage.selectScreenByIndex();
      basePage.validateApplicationAction("Close App");
      basePage.selectScreenByIndex(1);
      basePage.validateApplicationAction("Launch App");
      basePage.selectScreenByIndex(2);
      basePage.validateApplicationAction("Terminate App");
    }
  };

  addApplicationActionOnEditor = (applicationAction, bundleId) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addApplicationAction(applicationAction, bundleId);
  };

  editApplicationActionOnEditor = () => {
    basePage.selectScreenByIndex();
    basePage.editApplication(
      "Close App",
      "Terminate App",
      "io.perfecto.expense.tracker"
    );
    basePage.selectScreenByIndex(1);
    basePage.editApplication("Launch App", "Reset App");
    basePage.selectScreenByIndex(2);
    basePage.editApplication("Terminate App", "Close App");
  };

  validateAssertElement = (assertFor, targetText) => {
    basePage.selectScreenByIndex();
    let logicOptions = assertFor.keys();
    for (let option of logicOptions) {
      basePage.validateAssertAction(assertFor[option], "", targetText, option);
    }
  };

  addAssertElement = (assertFor, targetObjectTree) => {
    let logicOptions = assertFor.keys();
    for (let option of logicOptions) {
      elementClick(editorPageObject.getAddActionButtonOnTestSteps());
      basePage.addAssertElementAction(option, targetObjectTree);
    }
  };

  addEditAssertElement = (assertFor, targetObjectTree, newTarget) => {
    this.addAssertElement(assertFor, targetObjectTree);
    basePage.editAssertElement(assertFor, newTarget);
    basePage.validateAssertElementAfterEdit(assertFor);
  };

  deleteAssertElement = () => {
    elementClick(commonPageObjects.deleteActionFromTestStep().eq(0));
    editorPageObject.getStepDescription().should("not.have.text", "SIGNUP");
  };

  validateAPICall = (httpMethods) => {
    basePage.selectScreenByIndex();
    let httpMethodKeys = httpMethods.keys();
    for (let methodKey of httpMethodKeys) {
      wait(1000);
      elementClick(commonPageObjects.getEditActionBtn().eq(methodKey));
      commonPageObjects
        .getAPICallVariableField()
        .invoke("attr", "value")
        .should("eq", "var_" + httpMethods[methodKey]);
    }
  };

  addAPICallOnEditor = (httpMethods) => {
    let httpMethodKeys = httpMethods.keys();
    for (let methodKey of httpMethodKeys) {
      if (methodKey != 0) {
        this.addScreen("BlankScreen");
      }
      basePage.selectScreenByIndex(methodKey);
      wait(500);
      elementClick(editorPageObject.getAddActionButtonOnTestSteps());
      elementClick(commonPageObjects.getAPICallAction());
      basePage.addAPICall(httpMethods[methodKey]);
    }
  };

  editAPICall = (existingHttpMethods, newHttpMethods) => {
    let httpMethodKeys = existingHttpMethods.keys();
    for (let methodKey of httpMethodKeys) {
      basePage.selectScreenByIndex(methodKey);
      wait(1000);
      elementClick(commonPageObjects.getEditActionBtn());
      basePage.addAPICall(newHttpMethods[methodKey]);
    }
  };

  addLeftRightSwipeAction = () => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSwipe("right", 80, 150);
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSwipe("left", 80, 150);
  };

  addSwipeUpDownAction = () => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSwipe("bottom", 300, 100);
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSwipe("top", 300, 100);
  };

  validateLeftRightSwipeAction = () => {
    basePage.selectScreenByIndex(1);
    cy.wait(2000); // required for clicking on addAction button
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.validateSwipe("center", "Be part of a global community");
    basePage.selectScreenByIndex(2);
    cy.wait(2000); // required for clicking on addAction button
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.validateSwipe("center", "Diverse stories you'll love");
  };

  validateUpDownSwipeAction = () => {
    basePage.selectScreenByIndex(2);
    cy.wait(2000); // required for clicking on addAction button
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.validateSwipe("center", "Settings");
    basePage.selectScreenByIndex(3);
    cy.wait(2000); // required for clicking on addAction button
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.validateSwipe("top", "com.android.systemui:id/clock");
  };

  editSwipe = () => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.editAndValidateLeftToRightSwipe(0);
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.editAndValidateUpToDownSwipe(1);
  };

  deleteSwipe = () => {
    cy.wait(5000);
    multipleClick(commonPageObjects.deleteActionFromTestStep());
    commonPageObjects.getStepList().should("not.contain.text", "RIGHT");
  };

  performCustomCodeActionOnEditor = (customCodeInput) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addCustomCode(customCodeInput);
    this.addSetTextActionOnEditor("login_email", "Use Variable");
  };

  validateCustomCode = (text) => {
    basePage.selectScreenByIndex(0);
    cy.wait(2000); // required for the screen to load.(before clicking on first edit)
    elementClick(commonPageObjects.getEditAction(0));
    commonPageObjects.getCustomCodeInputField().should("contain", text);
  };

  editCustomCodeActionOnEditor = (screenIndex, editedCustomCodeInput) => {
    basePage.editCustomCode(screenIndex, editedCustomCodeInput);
    basePage.addAction("Code");
  };

  validateAssertVariable = (assertLogic, targetText) => {
    basePage.selectScreenByIndex(0);
    let logicOptions = assertLogic.keys();
    for (let option of logicOptions) {
      basePage.validateAssertAction(
        assertLogic[option],
        "",
        targetText,
        option + 1
      );
    }
  };

  assertVariableAction = (assertLogic, chooseVariable, target) => {
    let logicOptions = assertLogic.keys();
    for (let option of logicOptions) {
      elementClick(editorPageObject.getAddActionButtonOnTestSteps());
      basePage.addAssertVariableAction(
        option,
        "Use variable",
        chooseVariable,
        target
      );
    }
  };

  addAssertVariableOnEditor = (assertLogic, target) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addUseVariableAction("login_login_btn", "login");
    this.assertVariableAction(assertLogic, "login", target);
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addCustomCode('function() {return "test"}');
    this.assertVariableAction(assertLogic, "customCodeVariable", target);
  };

  editAssertVariableAction = (assertLogic, chooseVariable, target) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addUseVariableAction("login_login_btn", "login");
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    this.assertVariableAction(assertLogic, chooseVariable, target);
    basePage.editAssertVariable(assertLogic);
    basePage.validateAssertVariableAfterEdit(assertLogic, "Whole page");
  };

  deleteAssertVariableAction = () => {
    basePage.selectScreenByIndex();
    elementClick(commonPageObjects.deleteActionFromTestStep().eq(1));
  };

  validateLongPressAction = (element, seconds, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    wait(500); // required for the screen to load.(before clicking on first edit)
    elementClick(commonPageObjects.getEditAction());
    commonPageObjects.getTargetInput().should("contain", element);
    commonPageObjects
      .getNumOfSeconds()
      .invoke("attr", "value")
      .should("eq", seconds);
  };

  addLongPressOnEditor = (element) => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addLongPress(element);
  };

  addSetLocationOnEditor = () => {
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSetLocation("Coordinates", "27.2046° N", "77.4977° E");
    elementClick(editorPageObject.getAddActionButtonOnTestSteps());
    basePage.addSetLocation("Address", "United States");
  };

  editSetLocationActionOnEditor = () => {
    basePage.selectScreenByIndex(3);
    basePage.editSetLocation("Coordinates", "Address","Gurugram, Haryana, India");
    basePage.selectScreenByIndex(4);
    basePage.editSetLocation("Address", "Coordinates","77.0266° E","28.4595° N");
  };
}
export default EditorPage;
