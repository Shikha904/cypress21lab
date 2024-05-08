import { findIFrameElement, containsIFrameElement } from "../BasePage.js";
import { getIframeBody } from "../../utilities/common-utilities";

export const getAddActionButton = () =>
  findIFrameElement('[data-testid="submit-button"]');

export const getStepList = () => findIFrameElement('[data-testid="step-list"]');

export const getScriptlessMobileIframeBody = () =>
  getIframeBody('iframe[data-aid="scriptless-mobile-iframe"]');

export const getAddFile = (element) =>
  element.find('[data-testid="add-file-button"]');

export const getSelectApp = (element) =>
  element.find('[data-testid="select-button"]');

export const getEditorButton = () =>
  findIFrameElement('[data-testid="editor-icon"]');

export const getRecorderButton = () => findIFrameElement('a[href$="debug"]');

export const getSelectTests = () =>
  findIFrameElement('[data-testid="breadcrumb-link"]');

export const getProjectMenu = () =>
  findIFrameElement("[data-testid=projects-menu-button]");

export const getAllProjects = () =>
  findIFrameElement("[data-testid=all-projects-item]");

export const getNewProjects = () => containsIFrameElement("New project");

export const actionOnTestStep = () =>
  findIFrameElement("*.ActionDetailsHeader_action-type-contents");

export const getScreenByIndex = (screenIndex) =>
  findIFrameElement("[data-stepindex" + "=" + screenIndex + "]");

export const getTestsLink = () =>
  findIFrameElement('[data-testid="breadcrumb-link"]');

export const getAssertTypeTextField = () =>
  findIFrameElement('[data-testid="assert-text-type-text-input-field"]');

export const getSelectTargetBtn = () =>
  findIFrameElement('[data-testid="select-new-target-button"]');

export const getEquals = () =>
  findIFrameElement('[class*="ActionPanelLayout"]').contains("Equals");

export const getLogicDropDown = () =>
  findIFrameElement('[data-testid="logic-dropdown"]');

export const getTapObjectDetector = (objectDetector) =>
  containsIFrameElement(objectDetector);

export const getDefaultObjectDetectOption = () =>
  containsIFrameElement("Autonomous");

export const getEditAction = () =>
  findIFrameElement('[data-testid="edit-action-button"]');

export const getTargetInput = () =>
  findIFrameElement('[data-testid="target-input"]');

export const getActionPanel = () =>
  findIFrameElement('[data-testid="status-and-action-panel"]');

export const deleteActionFromTestStep = () =>
  findIFrameElement('[data-testid="delete-action-button"]');

export const getTapAction = () =>
  findIFrameElement('[data-testid="tap-action-list-item"]');

export const getTapXY = () =>
  findIFrameElement('[data-testid="tap-xy-action-list-item"]');

export const getDeviceSkin = () => findIFrameElement(".konvajs-content");

export const getTargetCancelBtn = () =>
  findIFrameElement('[data-testid="cancel-selected-target-button"]');

export const getAssertTextAction = () =>
  findIFrameElement('[data-testid="assert-text-action-list-item"]');

export const getLogicInAssert = (logic) => containsIFrameElement(logic);

export const getEditButton = () =>
  findIFrameElement('[data-testid="edit-action-button"]');

export const getCancelSelectedTarget = () =>
  findIFrameElement('[data-testid="cancel-selected-target-button"]');

export const getWholePageOnAssertPanel = () =>
  findIFrameElement('[data-testid^="assert-"]').contains("Whole page");

export const getTargetInObjectTree = (targetText) =>
  containsIFrameElement(targetText);

export const getVariableInputField = () =>
  findIFrameElement('input[value="testvariable"]');

export const getExpenseAppEmailTextField = () =>
  containsIFrameElement("login_email");

export const getSetTextAction = () =>
  findIFrameElement('[data-testid="set-text-action-list-item"]');

export const getExpenseAppSignupButton = () =>
  containsIFrameElement("login_signup_btn");

export const getShowMoreBtnActionPanel = () =>
  findIFrameElement('[data-testid="show-more-button"]');

export const getbackAction = () =>
  findIFrameElement('[data-testid="back-action-list-item"]');

export const getHomeAction = () =>
  findIFrameElement('[data-testid="home-action-list-item"]');

export const getWaitAction = () =>
  findIFrameElement('[data-testid="wait-panel"]');

export const getUseVariable = () =>
  findIFrameElement('[data-testid="use-variable-action-list-item"]');

export const getTestDataOptionSetText = () =>
  findIFrameElement('[data-value="test-data"]');

export const getSourceSetText = () =>
  findIFrameElement("#select-wrapper-custom div div div").eq(0);

export const getVariableSetText = () =>
  findIFrameElement("#select-wrapper-custom div div div").eq(1);

export const getSetTextInputField = () =>
  findIFrameElement('[data-testid="set-text-text-input-field"]');

export const getDefaultSourceOptionSetText = () =>
  containsIFrameElement("Insert Text");

export const getUseVariableOptionSetText = () =>
  findIFrameElement('[data-value="use-variable"]');

export const getAssertVariableAction = () =>
  findIFrameElement('[data-testid="assert-variable-action-list-item"]');

export const getSourceVariable = () =>
  findIFrameElement("[data-testid=source-dropdown]");

export const geChooseVariableDropDown = () =>
  findIFrameElement('[data-testid="use-variable-dropdown"]');

export const getChooseVariable = (choosevariable) =>
  findIFrameElement("[data-value" + "=" + choosevariable + "]");

export const getApplicationAction = () =>
  findIFrameElement('[data-testid="application-action-list-item"]');

export const getActionDropDownOption = (Action) =>
  containsIFrameElement(Action);

export const getBundleId = () =>
  findIFrameElement('input[placeholder="Bundle id OR Package Name"]');

export const getbackOnActionPanel = () =>
  findIFrameElement('[class^="ActionPanelHeader_back-arrow"]');

export const getApplicationText = (text) => containsIFrameElement(text);

export const getAPICallAction = () =>
  findIFrameElement('[data-testid="api-call-action-list-item"]');

export const getAPICallEndPointField = () =>
  findIFrameElement('[data-testid="api-call-end-point-input-field"]');

export const getAPICallVariableField = () =>
  findIFrameElement('[data-testid="api-call-type-input-variable"]');

export const getEditActionBtn = () =>
  findIFrameElement('[data-testid="edit-action-button"]');

export const getSavingText = () => containsIFrameElement("Saving...");

export const getLoadingText = () => containsIFrameElement("Loading...");

export const getSwipeAction = () =>
  findIFrameElement('[data-testid="swipe-action-list-item"]');

export const getSwipeText = (text) => containsIFrameElement(text);

export const getElementChooserTree = () =>
  findIFrameElement('[data-testid="element-chooser-tree"]');

export const getAssertElement = () =>
  findIFrameElement('[data-testid="assert-element-action-list-item"]');

export const getAssertForDropdownOptions = () =>
  findIFrameElement('[data-testid="logic-dropdown-option"]');

export const getActionPanelTitle = () =>
  findIFrameElement('[data-testid="action-panel-title"]');

export const getObjectTreeText = (text) => containsIFrameElement(text);

export const getCustomCodeInputField = () =>
  findIFrameElement('[data-testid="custom-code-input-field"]');

export const getCustomCodeVariableField = () =>
  findIFrameElement('[data-testid="custom-code-type-input-variable"]');

export const getCustomCodeAction = () =>
  findIFrameElement('[data-testid="custom-code-action-list-item"]');

export const getLongpressAction = () =>
  findIFrameElement('[data-testid="long-press-action-list-item"]');

export const getNumOfSeconds = () =>
  findIFrameElement("[class*=MuiInputBaseinputAdorned]");

export const getIncrementWaitLongPress = () =>
  findIFrameElement('[data-testid="increment-wait-value"]');

  export const getSetLocationAction = () =>
  findIFrameElement('[data-testid="set-location-action-list-item"]');

export const getLocationModeDropdown = () =>
  findIFrameElement('[data-testid="location-mode-dropdown"]');

  export const getSourceDropDownOption = (source) => 
  containsIFrameElement(source);

export const getLocationModeDropDownOption = ()=>
  findIFrameElement('[data-testid="location-mode-dropdown-option"]');

export const getLatitudeInputTextField = () =>
  findIFrameElement('[data-testid="latitude-input"]');

export const getLongituteInputTextField  = () =>
  findIFrameElement('[data-testid="longitude-input"]');
 
export const getAddressInputTextField = () =>
  findIFrameElement('[data-testid="address-input"]');

  export const getAddressLocation = () =>
  findIFrameElement(".pac-container .pac-item .pac-item-query").first();