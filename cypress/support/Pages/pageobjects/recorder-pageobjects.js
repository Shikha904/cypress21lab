import { findIFrameElement, containsIFrameElement } from "../BasePage.js";

export const getRecorderButton = () => findIFrameElement('a[href$="debug"]');

export const getSignupElementFromObjectTree = () =>
  findIFrameElement(".FSNode_node-content-text__zw1mF");

export const getDOMElement = () =>
  findIFrameElement('[data-testid="element-chooser-tree"]');

export const getActionPanel = () =>
  findIFrameElement('[data-testid="status-and-action-panel"]');

export const getEditorButton = () =>
  findIFrameElement('[data-testid="editor-icon"]');

export const getSearchInObjectTree = () =>
  findIFrameElement('input[placeholder="Search keyword"]');

export const getAddActionButton = () =>
  findIFrameElement('[data-testid="submit-button"]');

export const getRecorderPlayButton = () =>
  findIFrameElement('[data-testid="recorder-play-button"]');

export const getSomeMoreButton = () =>
  findIFrameElement('[data-testid="show-more-button"]');

export const getbackAction = () =>
  findIFrameElement('[data-testid="tap-action-list-item"]');

export const getEditAction = (index) =>
  findIFrameElement('[data-testid="edit-action-button"]').eq(index);

export const deleteActionFromTestStep = () =>
  findIFrameElement('[data-testid="delete-action-button"]');

export const getbackOnActionPanel = () =>
  findIFrameElement(".ActionPanelHeader_back-arrow__CQdJW");

export const actionOnTestStep = () =>
  findIFrameElement(".ActionDetailsHeader_action-type-contents__37l45");

export const getSetTextInputField = () =>
  findIFrameElement('[data-testid="set-text-text-input-field"]');

export const getSetTextPlaceHolderField = () =>
  findIFrameElement('[data-testid="set-text-placeholder-text-input-field"]');

export const getExpenseAppRegisterBtn = () =>
  containsIFrameElement("io.perfecto.expense.tracker:id/signup_save_btn");

export const getDefaultObjectDetectOption = () =>
  containsIFrameElement("Autonomous");

export const getTextAnalysisOption = () =>
  findIFrameElement('[data-value="OCR"]');

export const getVisualAnalysisOption = () =>
  findIFrameElement('[data-value="Object detection"]');

export const getIElementText = () =>
  findIFrameElement('input[placeholder="Add Text to IElement"]');

export const getStepList = () => findIFrameElement('[data-testid="step-list"]');

export const getTargetInput = () =>
  findIFrameElement('[data-testid="target-input"]');

export const getTargetListOnAssertText = () =>
  findIFrameElement('[data-testid="logic-dropdown"]');

export const getScreenByIndex = (screenIndex) =>
  findIFrameElement("[data-stepindex" + "=" + screenIndex + "]");

export const getAssertVariableAction = () =>
  findIFrameElement('[data-testid="assert-variable-action-list-item"]');

export const getTestDataOptionSetText = () =>
  findIFrameElement('[data-value="test-data"]');
