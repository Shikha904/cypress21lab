import "../commands.js";
import {
  elementClick,
  setText,
  wait,
  swipe,
} from "../utilities/common-utilities.js";
import EditorPage from "./EditorPage.js";
import RecorderPage from "./RecorderPage.js";
import TestsPage from "./TestsPage.js";
import * as commonPageObjects from "./pageobjects/common-pageobjects.js";

export const findIFrameElement = (locatorPath) =>
  commonPageObjects.getScriptlessMobileIframeBody().find(locatorPath);

export const containsIFrameElement = (stringElementValue) =>
  commonPageObjects
    .getScriptlessMobileIframeBody()
    .contains(stringElementValue);

export const fileUpload = (filePath) => {
  cy.fixture(filePath, "binary")
    .then(Cypress.Blob.binaryStringToBlob)
    .then((fileContent) => {
      commonPageObjects
        .getAddFile(commonPageObjects.getScriptlessMobileIframeBody())
        .attachFile(
          {
            fileContent,
            filePath: filePath,
            encoding: "utf-8",
            lastModified: new Date().getTime(),
          },
          { subjectType: "drag-n-drop" }
        );
    });
  elementClick(
    commonPageObjects.getSelectApp(
      commonPageObjects.getScriptlessMobileIframeBody()
    )
  );
};

export const goToAllProjectPage = () => {
  elementClick(commonPageObjects.getProjectMenu());
  elementClick(commonPageObjects.getAllProjects());
};

export const getNewProjectPage = () => {
  elementClick(commonPageObjects.getProjectMenu());
  elementClick(commonPageObjects.getNewProjects());
};

export const navigateToEditorPage = () => {
  elementClick(commonPageObjects.getEditorButton());
  const editorPage = new EditorPage();
  editorPage.validateEditorPage();
  return editorPage;
};

export const navigateToRecorderPage = () => {
  elementClick(commonPageObjects.getRecorderButton());
  const recorderPage = new RecorderPage();
  recorderPage.validateRecorderPage();
  return recorderPage;
};

export const navigateToTestsPage = () => {
  elementClick(commonPageObjects.getSelectTests());
  return new TestsPage();
};

/**
 * Add the action from Action Panel
 */

export const addAction = (addedActionName) => {
  elementClick(commonPageObjects.getAddActionButton()).then(() => {
    commonPageObjects.getStepList().should("contain.text", addedActionName);
  });
};

export const selectScreenByIndex = (screenIndex) => {
  if (typeof screenIndex == "undefined") {
    commonPageObjects.getScreenByIndex(0).should("be.visible");
    return elementClick(commonPageObjects.getScreenByIndex(0));
  } else {
    commonPageObjects.getScreenByIndex(screenIndex).should("be.visible");
    return elementClick(commonPageObjects.getScreenByIndex(screenIndex));
  }
};

/**
 * This method is used for deleting the action from any screen
 * screenIndex is not mandatory
 * @param {0,1,2,3,...} screenIndex - if notspecified the by default
 * this will consider the first screen
 */

export const deleteAction = (screenIndex) => {
  wait(500);
  selectScreenByIndex(screenIndex);
  elementClick(commonPageObjects.deleteActionFromTestStep());
  validateRemovedAction();
};

/**
 *
 * @param {actionName - Tap, Back, Home, .. etc}
 * Validation for action removed from test
 * @returns
 */
export const validateRemovedAction = () =>
  commonPageObjects.actionOnTestStep().should("not.exist");

export const selectAction = (actionName) => {
  elementClick(containsIFrameElement("Show more"));
  elementClick(containsIFrameElement(actionName));
};

/**
 *
 * @param {Autonomous,Text Analysis, Visual Analysis} ObjectDetector
 * @param {1,2,3...} screenIndex
 */

export const editTap = (ObjectDetector, targetObjectDetector, screenIndex) => {
  selectScreenByIndex(screenIndex);
  elementClick(commonPageObjects.getEditAction(0));
  commonPageObjects.getTargetInput().should("have.text", "SIGNUP");
  elementClick(commonPageObjects.getTapObjectDetector(ObjectDetector));
  elementClick(commonPageObjects.getTapObjectDetector(targetObjectDetector));
};

/**
 *
 * @param {*} ObjectDetector
 * @param {*} element
 * @param {*} screenIndex
 */

export const addTapAction = (element, ObjectDetector) => {
  elementClick(commonPageObjects.getTapAction());
  elementClick(commonPageObjects.getTargetInObjectTree(element));
  elementClick(commonPageObjects.getTapObjectDetector(ObjectDetector));
  addAction("Tap");
};
/**
 * Only integer values are allowed
 * @param {150, 100} xPosition
 * @param {300, 300} yPosition
 */

export const addTapXY = (xPosition, yPosition) => {
  elementClick(commonPageObjects.getTapXY());
  elementClick(commonPageObjects.getDeviceSkin().eq(0), xPosition, yPosition);
  addAction("Tap");
};

export const editTapXY = (screenIndex, inputText) => {
  selectScreenByIndex(screenIndex);
  elementClick(commonPageObjects.getEditAction());
  commonPageObjects.getTargetInput().should("have.text", inputText);
};

/**
 *
 * @param {logic - Equals, contains, Does not contains, Starts With .. etc}
 * @param {text - Text used for assertion }
 * @param {targetText - Whole page, element text}
 * Method for adding assert text action : can be used on both editor and recorder
 * for adding assert text action.
 * @returns
 */

export const addAssertTextAction = (logic, text, target) => {
  elementClick(commonPageObjects.getAssertTextAction());
  if (target !== "Whole page") {
    elementClick(commonPageObjects.getSelectTargetBtn());
    elementClick(commonPageObjects.getTargetInObjectTree(target));
  }
  elementClick(commonPageObjects.getEquals());
  elementClick(commonPageObjects.getLogicInAssert(logic));
  setText(commonPageObjects.getAssertTypeTextField(), text);
  addAction("Assert");
};

/**
 * This method is for editing the Logic in assert can be used for all assert actions.
 * @param {*} existingLogic : Logic which needs to be edited.
 * @param {*} editedLogic : Logic which is required after editing
 * @param {*} editBtnIndex : action added on which index in test steps.
 */

export const editLogicInAssert = (existingLogic, editedLogic, editBtnIndex) => {
  cy.wait(1000); // required for clicking on edit
  elementClick(commonPageObjects.getEditButton().eq(editBtnIndex));
  elementClick(commonPageObjects.getLogicInAssert(existingLogic));
  elementClick(commonPageObjects.getLogicInAssert(editedLogic));
  addAction("Assert");
};

/**
 * This method is used for editing the target in any action
 * @param {*} newTarget : the target which is required to be changed.
 * @param {*} editBtnIndex : the index of the edit button on which action is added.
 */

export const editTargetInAssertText = (newTarget, editBtnIndex) => {
  cy.wait(1000); // required for clicking on edit
  elementClick(commonPageObjects.getEditButton().eq(editBtnIndex)).then(() => {
    if (newTarget == "Whole page") {
      elementClick(commonPageObjects.getCancelSelectedTarget());
    } else {
      elementClick(commonPageObjects.getCancelSelectedTarget());
      elementClick(commonPageObjects.getSelectTargetBtn()).then(() =>
        elementClick(commonPageObjects.getTargetInObjectTree(newTarget))
      );
    }
  });
  addAction("Assert");
};

/**
 * This method is used for editing the Type text in any action
 * @param {*} editedText : the text required after editing.
 * @param {*} editBtnIndex : the index of the edit button on which action is added.
 */

export const editTypeTextFieldAssertText = (editedText, editBtnIndex) => {
  cy.wait(2000); // required for clicking on edit

  elementClick(commonPageObjects.getEditButton().eq(editBtnIndex));
  setText(commonPageObjects.getAssertTypeTextField(), editedText);
  addAction("Assert");
};

/**
 * This method is used for editing the assert text action and can be used for both
 * editor and recorder.
 * @param {} newTarget
 */

export const editAssertText = (newTarget) => {
  cy.wait(2000); // required for clicking on edit
  editLogicInAssert("Equals", "Contains", 0);
  editLogicInAssert("Contains", "Starts With", 1);
  editLogicInAssert("Starts With", "Does Not Contain", 2);
  editLogicInAssert("Does Not Contain", "Equals", 3);
  editTargetInAssertText(newTarget, 4);
  editTargetInAssertText("Whole page", 5);
  editTypeTextFieldAssertText("SIGNUP", 6);
};

/**
 * This method is used for validating assert text after editing with combinations
 * can be used in both editor and recorder.
 * @param {*} targetText
 * @param {*} newTargetText
 */

export const validateAssertAfterEdit = (targetText, newTargetText) => {
  validateAssertAction("Contains", "SIGNUP", targetText, 0);
  validateAssertAction("Starts With", "UP", targetText, 1);
  validateAssertAction("Does Not Contain", "SIGN", targetText, 2);
  validateAssertAction("Equals", "ABC", targetText, 3);
  validateAssertAction("Equals", "ABC", newTargetText, 4);
  validateAssertAction("Contains", "XYZ", "Whole page", 5);
  validateAssertAction("Starts With", "SIGNUP", targetText, 6);
};

/**
 * This method is used for validating assert action
 * @param {Equals, Contains, Starts With, Does not contains} logic : logic used in the action
 * @param {"SIGNUP", ..} text : Text in the text field added for assertion.
 * @param {*} targetText : Text of the element used for assert action
 * @param {0,1,2,...} editIndex : Index on which the action is added in test steps.
 */

export const validateAssertAction = (logic, text, targetText, editIndex) => {
  cy.wait(500); // this is required for clicking on first edit
  elementClick(commonPageObjects.getEditButton().eq(editIndex));
  if (targetText == "WholePage") {
    commonPageObjects.getWholePageOnAssertPanel().should("be.visible");
  } else {
    commonPageObjects.getTargetInput().should("have.text", targetText);
  }
  commonPageObjects.getLogicDropDown().should("have.text", logic);
  if (text != "") {
    commonPageObjects
      .getAssertTypeTextField()
      .invoke("attr", "value")
      .should("eq", text);
  }
};

export const addSetTextAction = (element) => {
  elementClick(commonPageObjects.getSetTextAction());
  elementClick(commonPageObjects.getTargetInObjectTree(element));
};

export const addUseVariableAction = (element, text) => {
  elementClick(commonPageObjects.getUseVariable());
  elementClick(commonPageObjects.getTargetInObjectTree(element));
  setText(commonPageObjects.getVariableInputField(), text);
  addAction("SetVariable");
};

export const selectUseVariableSource = () => {
  elementClick(commonPageObjects.getDefaultSourceOptionSetText());
  elementClick(commonPageObjects.getUseVariableOptionSetText());
};

export const selectTestDataSource = () => {
  elementClick(commonPageObjects.getDefaultSourceOptionSetText());
  elementClick(commonPageObjects.getTestDataOptionSetText());
};

export const validateSetText = (editIndex, InputText, source) => {
  cy.wait(2000);
  elementClick(commonPageObjects.getEditAction().eq(editIndex));
  commonPageObjects.getTargetInput().should("have.text", "Email*");
  switch (source) {
    case "Use Variable":
      commonPageObjects.getSourceSetText().should("have.text", "Use variable");
      commonPageObjects
        .getVariableSetText()
        .should("have.text", "testvariable");
      break;
    case "Test Data":
      commonPageObjects.getSourceSetText().should("have.text", "Test Data");
      commonPageObjects.getVariableSetText().should("have.text", "Test Data");
      break;
    default:
      commonPageObjects
        .getSetTextInputField()
        .invoke("attr", "value")
        .should("eq", InputText);
  }
};

export const addAssertVariableAction = (
  index,
  source,
  chooseVariable,
  target
) => {
  elementClick(commonPageObjects.getAssertVariableAction());
  if (target !== "Whole page") {
    elementClick(commonPageObjects.getSelectTargetBtn());
    elementClick(commonPageObjects.getTargetInObjectTree(target));
  }
  elementClick(commonPageObjects.getLogicDropDown().contains("Equals"));
  elementClick(commonPageObjects.getAssertForDropdownOptions().eq(index));
  elementClick(commonPageObjects.getSourceVariable().contains(source));
  elementClick(commonPageObjects.geChooseVariableDropDown().contains("login"));
  elementClick(commonPageObjects.getChooseVariable(chooseVariable));
  addAction("Assert");
};

export const editAssertVariable = (assertLogic) => {
  for (var i = 0; i < assertLogic.length - 1; i++) {
    editLogicInAssert(assertLogic[i], assertLogic[i + 1], i + 1);
  }
};

export const validateAssertVariableAfterEdit = (assertLogic, targetText) => {
  selectScreenByIndex(0);
  for (var i = 1; i < assertLogic.length - 1; i++) {
    validateAssertAction(assertLogic[i + 1], "", targetText, i + 1);
  }
};

export const addAssertElementAction = (optionIndex, targetObjectTree) => {
  elementClick(commonPageObjects.getShowMoreBtnActionPanel());
  elementClick(commonPageObjects.getAssertElement());
  elementClick(commonPageObjects.getTargetInObjectTree(targetObjectTree));
  elementClick(commonPageObjects.getLogicDropDown().contains("Visible"));
  elementClick(commonPageObjects.getAssertForDropdownOptions().eq(optionIndex));
  addAction("Assert");
};

export const editAssertElement = (assertFor, newTarget) => {
  for (var i = 0; i < assertFor.length - 1; i++) {
    editLogicInAssert(assertFor[i], assertFor[i + 1], i);
  }
  editTargetInAssertText(newTarget, 0);
};

export const validateAssertElementAfterEdit = (assertFor) => {
  selectScreenByIndex(0);
  validateAssertAction("Not visible", "", "LOGIN", 0);
  for (var i = 1; i < assertFor.length - 1; i++) {
    validateAssertAction(assertFor[i + 1], "", "SIGNUP", i);
  }
};

export const addAPICall = (httpMethod) => {
  cy.readFile("cypress/fixtures/api-test-data.json").then((data) => {
    switch (httpMethod) {
      case "GET":
        data = data.GET;
        break;
      case "POST":
        data = data.POST;
        break;
      case "PUT":
        data = data.PUT;
        break;
      case "DELETE":
        data = data.DELETE;
        break;
      case "PATCH":
        data = data.PATCH;
        break;
      default:
    }
    setText(commonPageObjects.getAPICallEndPointField(), JSON.stringify(data));
    setText(commonPageObjects.getAPICallVariableField(), "var_" + httpMethod);
  });
  addAction("Call");
};

/**
 * This method can be used anywhere for adding Swipe on the focussed screen
 * of the device.
 * @param {left, right, up, down}  swipeType
 * @param  {} xCoordinates for left/Right : 80 and for Up/Down :
 * @param {} yCoordinates
 */

export const addSwipe = (swipeType, xCoordinates, yCoordinates) => {
  elementClick(commonPageObjects.getSwipeAction());
  swipe(
    commonPageObjects.getDeviceSkin(0),
    swipeType,
    xCoordinates,
    yCoordinates
  );
  switch (swipeType) {
    case "right":
      commonPageObjects.getStepList().should("contain.text", "LEFT");
      break;
    case "left":
      commonPageObjects.getStepList().should("contain.text", "RIGHT");
      break;
    case "bottom":
      commonPageObjects.getStepList().should("contain.text", "UP");
      break;
    case "top":
      commonPageObjects.getStepList().should("contain.text", "DOWN");
      break;
  }
};

/** This method can be used on both Editor and Recorder for validating Left Swipe is
 * working on the device.
 * @param {top,center} position used for scrolling inside the object Tree
 * @param {} swipeText text to be validated after swiping.
 */

export const validateSwipe = (position, swipeText) => {
  elementClick(commonPageObjects.getTapAction());
  commonPageObjects.getElementChooserTree().scrollTo(position);
  getTapAction;
  commonPageObjects.getSwipeText(swipeText).should("be.visible");
};

/**This method can be used on Both Editor and Recorder for editing and Validating Swipe action */

export const editAndValidateLeftToRightSwipe = (screenIndex) => {
  addSwipe("right", 80, 150);
  cy.wait(5000); //this wait is required to tap on edit
  elementClick(commonPageObjects.getEditAction().eq(screenIndex));
  swipe(commonPageObjects.getDeviceSkin(0), "left", 80, 150);
  commonPageObjects.getStepList().should("not.contain.text", "LEFT");
};

/**This method can be used on Both Editor and Recorder for editing and Validating Swipe action */

export const editAndValidateUpToDownSwipe = (screenIndex) => {
  addSwipe("bottom", 300, 150);
  cy.wait(5000); //this wait is required to tap on edit
  elementClick(commonPageObjects.getEditAction().eq(screenIndex));
  swipe(commonPageObjects.getDeviceSkin(0), "top", 300, 150);
  commonPageObjects.getStepList().should("not.contain.text", "UP");
};

export const validateElementOnDevice = (objectText, position) => {
  elementClick(commonPageObjects.getTapAction());
  if (typeof position == "undefined") {
    position = "center";
  }
  commonPageObjects.getElementChooserTree().scrollTo(position);
  commonPageObjects.getTargetInObjectTree(objectText).should("be.visible");
  elementClick(commonPageObjects.getTargetInObjectTree(objectText));
  elementClick(commonPageObjects.getbackOnActionPanel());
};

export const addCustomCode = (customCodeInput) => {
  elementClick(commonPageObjects.getShowMoreBtnActionPanel());
  elementClick(commonPageObjects.getCustomCodeAction());
  setText(commonPageObjects.getCustomCodeInputField(), customCodeInput);
  setText(commonPageObjects.getCustomCodeVariableField(), "customCodeVariable");
  addAction("Code");
};

export const editCustomCode = (screenIndex, editedCustomCodeInput) => {
  selectScreenByIndex(screenIndex);
  cy.wait(500); //explicit wait applied for clicking on edit
  elementClick(commonPageObjects.getEditAction(screenIndex));
  commonPageObjects.getCustomCodeInputField().should("contain", "test");
  setText(commonPageObjects.getCustomCodeInputField(), editedCustomCodeInput);
};

export const addLongPress = (element) => {
  elementClick(commonPageObjects.getShowMoreBtnActionPanel());
  elementClick(commonPageObjects.getLongpressAction());
  elementClick(commonPageObjects.getTargetInObjectTree(element));
  addAction("Press");
};

export const editLongPress = (element, addSeconds, screenIndex) => {
  selectScreenByIndex(screenIndex);
  wait(1000); //explicit wait applied for clicking on edit
  elementClick(commonPageObjects.getEditAction());
  elementClick(commonPageObjects.getCancelSelectedTarget());
  elementClick(commonPageObjects.getTargetInObjectTree(element));
  while (addSeconds >= 0) {
    elementClick(commonPageObjects.getIncrementWaitLongPress());
    addSeconds--;
  }
  addAction("Press");
};
export const addApplicationAction = (applicationAction, bundleId) => {
  elementClick(commonPageObjects.getShowMoreBtnActionPanel());
  elementClick(commonPageObjects.getApplicationAction());
  elementClick(commonPageObjects.getLogicDropDown().contains("Close App"));
  elementClick(commonPageObjects.getActionDropDownOption(applicationAction));
  if (applicationAction == "Terminate App") {
    setText(commonPageObjects.getBundleId(), bundleId);
  }
  addAction("Application");
};

export const validateApplicationAction = (applicationAction) => {
  wait(500); //explicit wait applied for clicking on edit
  elementClick(commonPageObjects.getEditAction().eq(0));
  commonPageObjects.getLogicDropDown().should("have.text", applicationAction);
};

export const editApplication = (existingAction, editedAction, bundleId) => {
  wait(500); // required for clicking on edit
  elementClick(commonPageObjects.getEditAction());
  elementClick(commonPageObjects.getActionDropDownOption(existingAction));
  elementClick(commonPageObjects.getActionDropDownOption(editedAction));
  if (editedAction == "Terminate App") {
    setText(commonPageObjects.getBundleId(), bundleId);
  }
  addAction("Application");
};

/**
   * param1,param2 will be used in case of source as Coordinates and
   * param1 will only be used in case of source as Address
   */
export const addSetLocation = (source,param1,param2) => {
  elementClick(commonPageObjects.getShowMoreBtnActionPanel());
  elementClick(commonPageObjects.getSetLocationAction());
  elementClick(commonPageObjects.getLocationModeDropdown().contains("Address"));
  elementClick(commonPageObjects.getLocationModeDropDownOption().contains(source));
  if (source == "Coordinates") {
      setText(commonPageObjects.getLatitudeInputTextField(), param1);
      setText(commonPageObjects.getLongituteInputTextField(), param2);
  }
  else if (source == "Address") {
    setText(commonPageObjects.getAddressInputTextField(), param1);
    elementClick(commonPageObjects.getAddressLocation());
    wait(500); //required for clicking on add action button
  } 
  addAction("Location");
};

/**
   * param1,param2 will be used in case of source as Coordinates and
   * param1 will only be used in case of source as Address
   */
export const editSetLocation = (existingAction, newAction,param1,param2) => {
  cy.wait(500); // required for clicking on edit
  elementClick(commonPageObjects.getEditAction());
  elementClick(commonPageObjects.getSourceDropDownOption(existingAction));
  elementClick(commonPageObjects.getSourceDropDownOption(newAction));
  if (newAction == "Coordinates") {
    setText(commonPageObjects.getLatitudeInputTextField(),param1);
    setText(commonPageObjects.getLongituteInputTextField(),param2);
  }
  else if(newAction == "Address") {
    setText(commonPageObjects.getAddressInputTextField(), param1);
    elementClick(commonPageObjects.getAddressLocation());
    cy.wait(500); //required for clicking on add action button
  }
  addAction("Location");
};

export const validateLocationAction = (source,screenIndex) => {
  selectScreenByIndex(screenIndex);
  wait(500); elementClick(commonPageObjects.getEditActionBtn());
  commonPageObjects.getActionPanelTitle().should("have.text", "Set location");
  commonPageObjects.getLocationModeDropdown().contains(source);
};