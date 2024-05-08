import "../commands.js";
import { elementClick, setText } from "../utilities/common-utilities.js";
import * as basePage from "./BasePage.js";
import * as recorderPageObject from "./pageobjects/recorder-pageobjects.js";
import * as commonPageObjects from "./pageobjects/common-pageobjects.js";

class RecorderPage {
  validateRecorderPage = () => {
    recorderPageObject
      .getRecorderButton()
      .should("have.class", "test-page-active");
    return recorderPageObject
      .getActionPanel()
      .should("contains.text", "Execution complete");
  };

  /*** Play test on recorder and validate action is executed
   * @param {0,1,2,3,...} screenIndex - is not mandatory
   * if specified then only generated screen will be validated.
   **/
  play = () => {
    elementClick(recorderPageObject.getRecorderPlayButton());
    basePage.findIFrameElement('[class*="StepListItem"]').each(($e1, index) => {
      if ($e1.attr("data-stepindex")) {
        this.validateActionIsExecuted(index);
      }
    });
  };

  addAndPlayAction = (addedActionName) => {
    basePage.addAction(addedActionName);
    this.play();
  };

  validateActionCompletedStatus = () => {
    recorderPageObject
      .getActionPanel()
      .should("contains.text", "All actions: completed");
  };

  validateActionIsExecuted = (screenIndex) => {
    recorderPageObject
      .getActionPanel()
      .should("contains.text", "All actions: completed")
      .then(() => {
        recorderPageObject.getStepList().should("contain.text", "NewScreen");
      });
    if (typeof screenIndex != "undefined") {
      screenIndex = screenIndex + 1;
      commonPageObjects.getScreenByIndex(screenIndex).should("be.visible");
    }
  };

  performBackAction = () => {
    elementClick(commonPageObjects.getShowMoreBtnActionPanel());
    elementClick(commonPageObjects.getbackAction());
    this.addAndPlayAction("Back");
    basePage.validateElementOnDevice("clock", "top");
  };

  performHomeAction = (objectText, position) => {
    elementClick(commonPageObjects.getShowMoreBtnActionPanel());
    elementClick(commonPageObjects.getHomeAction());
    this.addAndPlayAction("Home");
    basePage.validateElementOnDevice(objectText, position);
  };

  performWaitAction = (screenIndex) => {
    elementClick(commonPageObjects.getShowMoreBtnActionPanel());
    elementClick(commonPageObjects.getWaitAction());
    if (typeof screenIndex == "undefined") {
      this.addAndPlayAction("Wait");
    } else {
      this.addAndPlayAction("Wait", screenIndex);
    }
  };

  editBackAction = () => {
    this.editandAddOtherAction("Back", "Home");
    this.addAndPlayAction("Home");
  };

  editHomeAction = () => {
    this.editandAddOtherAction("Home", "Back");
    this.addAndPlayAction("Back");
  };

  editWaitAction = () => {
    this.editandAddOtherAction("Wait", "Home");
    this.addAndPlayAction("Home");
  };

  /**
   * this method is used for editing an existing action
   * by clicking on back on action panel and selecting target action
   **/

  editandAddOtherAction(sourceAction, targetAction) {
    basePage.selectAction(sourceAction);
    basePage.addAction(sourceAction);
    cy.wait(5000);
    elementClick(recorderPageObject.getEditAction(0));
    elementClick(recorderPageObject.getbackOnActionPanel());
    basePage.selectAction(targetAction);
  }

  addSetText = (source, element, text) => {
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

  performSetText = (source, element, text, editIndex) => {
    this.addSetText(source, element, text);
    this.play();
    basePage.selectScreenByIndex();
    basePage.validateSetText(editIndex, text, source);
  };

  editSetTextAction = (editIndex, source) => {
    this.addSetText(source);
    cy.wait(2000);
    elementClick(commonPageObjects.getEditAction(editIndex));
    setText(recorderPageObject.getSetTextInputField(), "EditTesting");
    basePage.addAction("SetText");
    this.play();
    basePage.selectScreenByIndex(0);
    basePage.validateSetText(editIndex, "EditTesting", source);
  };

  performSetTextWithPlaceHolderAction = () => {
    basePage.addSetTextAction(commonPageObjects.getExpenseAppEmailTextField());
    setText(recorderPageObject.getSetTextInputField(), "Testing");
    setText(recorderPageObject.getSetTextPlaceHolderField(), "Email*");
    this.addAndPlayAction("SetText");
    this.validateActionIsExecuted();
  };

  /****
   * This function will add tap action and execute the action on recorder.
   * Three type of object detection type are supported by
   * @param {ObjectDetector}"Text Analysis", "Visual analysis" and "Autonomous"(By default)
   * */

  addTapAction = (ObjectDetector, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    elementClick(commonPageObjects.getTapAction());
    elementClick(commonPageObjects.getExpenseAppSignupButton());
    elementClick(commonPageObjects.getDefaultObjectDetectOption());
    elementClick(commonPageObjects.getTapObjectDetector(ObjectDetector));
    if (ObjectDetector == "Visual Analysis") {
      commonPageObjects.getActionPanel().should("have.descendants", "canvas");
    } else {
      recorderPageObject
        .getIElementText()
        .invoke("attr", "value")
        .should("eq", "SIGNUP");
    }
    basePage.addAction("Tap");
  };

  performTap = (ObjectDetector) => {
    this.addTapAction(ObjectDetector);
    this.play();
  };

  editTapAction = (ObjectDetector, targetObjectDetector, screenIndex) => {
    this.addTapAction(ObjectDetector);
    basePage.editTap(ObjectDetector, targetObjectDetector, screenIndex);
    this.addAndPlayAction("Tap");
  };

  /**
   * This method is used for adding Assert action for all combinations.
   * @param {*} target is the locator of the element.
   */
  addAssertText = (target) => {
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
        basePage.addAssertTextAction(logic[i], targetText[j], target);
      }
    } while (j < targetText.length);
  };

  /**
   * This method is used for adding assert action from the recorder
   * @param {*} target
   */
  performAssertTextAction = (target) => {
    this.addAssertText(target);
    this.play();
  };

  /*** This method is used for adding Assert action for all combinations from recorder
   * then editing the action with various combination and executing on recorder
   * validating that the actions are edited.
   **/
  performEditAssertText = (target, newTarget, screenIndex) => {
    this.addAssertAction(target);
    basePage.selectScreenByIndex(screenIndex);
    basePage.editAssertText(newTarget);
    this.play();
    basePage.selectScreenByIndex(screenIndex);
    basePage.validateAssertAfterEdit("SIGNUP", "LOGIN");
  };

  performTapXY = (xPosition, yPosition, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    basePage.addTapXY(xPosition, yPosition);
    this.play();
  };

  /**
   * This function is called edit the tapxy action on recorder page and
   * this will update the target by selecting element from DOM
   * @param {,SIGNUP, LOGIN} getTargetInputText
   * @param {'',0,1,2} screenIndex
   */
  editTapXY = (xPosition, yPosition, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    elementClick(commonPageObjects.getEditAction(0));
    elementClick(commonPageObjects.getTargetCancelBtn());
    elementClick(commonPageObjects.getDeviceSkin(0), xPosition, yPosition);
    basePage.addAction("Tap");
    this.play();
  };

  /**
   * This method is used for deleting assert action from the recorder
   * and validating that the action is removed.
   */
  deleteAssertText = (target, screenIndex) => {
    basePage.addAssertTextAction("Equals", "SIGNUP", target);
    basePage.deleteAction(screenIndex);
  };

  validateApplication = (text) => {
    cy.wait(500); //explicit wait applied for opening the object tree
    elementClick(commonPageObjects.getTapAction());
    elementClick(commonPageObjects.getApplicationText(text));
    elementClick(commonPageObjects.getActionPanelTitle());
  };

  performApplicationAction = (
    actionName,
    validateText,
    screenIndex,
    bundleId
  ) => {
    basePage.addApplicationAction(actionName, bundleId);
    this.play(screenIndex);
    this.validateApplication(validateText);
  };

  expenseAppSignUp = () => {
    this.addSetText("Insert Text", "signup_name", "Testing");
    this.addSetText("Insert Text", "signup_email", "testing@gmail.com");
    this.addSetText("Insert Text", "signup_password", "Testing");
    this.addSetText("Insert Text", "signup_confirm_password", "Testing");
    basePage.addTapAction("signup_save_btn", "Autonomous");
  };

  expenseAppLogin = (screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    this.addSetText("Insert Text", "login_email", "testing@gmail.com");
    this.addSetText("Insert Text", "login_password", "Testing");
    basePage.addTapAction("login_login_btn", "Autonomous");
  };

  performResetAppAction = () => {
    this.performTap("Text Analysis");
    this.expenseAppSignUp();
    this.play(1);
    this.expenseAppLogin(2);
    this.play(2);
    this.validateApplication("Expenses");
    basePage.addApplicationAction("Reset App");
    this.performWaitAction(3);
    this.expenseAppLogin(4);
    this.play(4);
  };

  editApplicationAction = () => {
    basePage.selectScreenByIndex();
    basePage.editApplication(
      "Close App",
      "Terminate App",
      "io.perfecto.expense.tracker"
    );
    basePage.selectScreenByIndex(1);
    this.validateApplication("clock");
    basePage.selectScreenByIndex(2);
    basePage.editApplication("Terminate App", "Close App");
    basePage.selectScreenByIndex(3);
    this.validateApplication("clock");
  };

  performAPICall = (httpMethods) => {
    let httpMethodKeys = httpMethods.keys();
    for (let methodKey of httpMethodKeys) {
      elementClick(commonPageObjects.getAPICallAction());
      basePage.addAPICall(httpMethods[methodKey]);
    }
    this.addSetText("Use Variable", "login_email");
    this.play();
  };

  selectAPICall = () => {
    elementClick(commonPageObjects.getAPICallAction());
  };

  editAPICall = (httpMethod, screenIndex) => {
    basePage.selectScreenByIndex(screenIndex);
    elementClick(commonPageObjects.getEditAction(0));
    basePage.addAPICall(httpMethod);
  };

  performLeftRightSwipeAction = () => {
    basePage.addSwipe("right", 80, 150);
    this.play(1);
    basePage.validateSwipe("center", "Be part of a global community");
    elementClick(
      commonPageObjects.getSwipeText("Be part of a global community")
    );
    elementClick(commonPageObjects.getActionPanelTitle());
    basePage.addSwipe("left", 80, 150);
    this.play(2);
    basePage.validateSwipe("center", "Diverse stories you'll love");
  };

  performSwipeUpDownAction = () => {
    basePage.addSwipe("bottom", 300, 100);
    this.play(2);
    basePage.validateSwipe("center", "Settings");
    elementClick(commonPageObjects.getSwipeText("Settings"));
    elementClick(commonPageObjects.getActionPanelTitle());
    basePage.addSwipe("top", 300, 100);
    this.play(3);
    basePage.validateSwipe("top", "com.android.systemui:id/clock");
    elementClick(
      commonPageObjects.getSwipeText("com.android.systemui:id/clock")
    );
  };

  editSwipe = () => {
    basePage.editAndValidateLeftToRightSwipe(0);
    this.play(1);
    basePage.validateSwipe("center", "Diverse stories you'll love");
    elementClick(commonPageObjects.getSwipeText("Diverse stories you'll love"));
    elementClick(commonPageObjects.getActionPanelTitle());
    basePage.editAndValidateUpToDownSwipe(0);
    this.play(2);
    basePage.validateSwipe("top", "com.android.systemui:id/clock");
  };

  performCustomCodeAction = (customCodeInput) => {
    basePage.addCustomCode(customCodeInput);
    this.play();
    this.addSetText("login_email", "Use Variable");
    this.play(1);
  };

  editCustomCodeAction = (screenIndex, editedCustomCodeInput) => {
    this.performCustomCodeAction('function() {return "test"}');
    basePage.editCustomCode(screenIndex, editedCustomCodeInput);
    basePage.addAction("Code");
    this.play();
  };

  performAssertVariableAction = (assertLogic, chooseVariable, target) => {
    let logicOptions = assertLogic.keys();
    for (let option of logicOptions) {
      basePage.addAssertVariableAction(
        option,
        "Use variable",
        chooseVariable,
        target
      );
    }
    this.play();
  };

  editAssertVariableAction = (assertLogic) => {
    basePage.selectScreenByIndex();
    basePage.editAssertVariable(assertLogic);
    basePage.validateAssertVariableAfterEdit(assertLogic, "LOGIN");
  };

  performLongPressAction = (element) => {
    basePage.addLongPress(element);
    this.play();
  };

  performAssertElement = (assertFor, targetObjectTree) => {
    let logicOptions = assertFor.keys();
    for (let option of logicOptions) {
      basePage.addAssertElementAction(option, targetObjectTree);
    }
    this.play();
  };

  performEditAssertElement = (assertFor, targetObjectTree, newTarget) => {
    let logicOptions = assertFor.keys();
    for (let option of logicOptions) {
      basePage.addAssertElementAction(option, targetObjectTree);
    }
    basePage.editAssertElement(assertFor, newTarget);
    this.play();
    basePage.validateAssertElementAfterEdit(assertFor);
  };

  deleteAssertElement = (targetObjectTree) => {
    basePage.addAssertElementAction(1, targetObjectTree);
    basePage.deleteAction(1);
  };

  /**
   * this method is used to open map application for location action
   **/
  openMapApplication = () => {
    this.performHomeAction("Messages", "bottom");
    basePage.addSwipe("bottom", 300, 100);
    this.play();
    basePage.addTapAction("Maps", "Autonomous");
    this.play();
  }

  performLocationAction = (source, param1, param2) => {
    basePage.addSetLocation(source, param1, param2);
    this.play();
  };

  editSetLocationAction = () => {
    basePage.selectScreenByIndex(3);
    basePage.editSetLocation("Coordinates", "Address", "Gurugram, Haryana, India");
    basePage.selectScreenByIndex(4);
    basePage.editSetLocation("Address", "Coordinates", "77.0266° E", "28.4595° N");
  };
}
export default RecorderPage;
