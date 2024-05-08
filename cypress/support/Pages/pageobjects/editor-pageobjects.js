import { findIFrameElement, containsIFrameElement } from "../BasePage.js";

export const getEditIcon = () => findIFrameElement("a[href='editor']");

export const getSaveButton = () =>
  findIFrameElement('[data-testid="save-button"]');

export const getMainEditorArea = () =>
  findIFrameElement("[class*=StepList_input-filter]");

export const getRunButton = () => containsIFrameElement("Run test");

export const getTestRunsResultsButton = () =>
  findIFrameElement('[data-testid="results-icon"]');

export const getAddActionButtonOnTestSteps = () =>
  findIFrameElement('[data-testid="add-action-button"]');

export const getAddActionButton = () =>
  findIFrameElement('[data-testid="submit-button"]');

export const getDefaultTestName = () =>
  findIFrameElement(".ConnectedTestName_test-name__2-tv1");

export const getSaveAsIsButton = () => containsIFrameElement("Save as is");

export const editActionBtn = () =>
  findIFrameElement('[data-testid="edit-action-button"]');

export const getstepList = () => findIFrameElement('[data-testid="step-list"]');

export const actionPanelTitle = () =>
  findIFrameElement('[data-testid="step-description"]');

export const detectObjectUsing = () =>
  findIFrameElement("#select-wrapper-custom");

export const target = () => findIFrameElement('[data-testid="target-input"]');

export const getTapAction = () =>
  findIFrameElement('[data-testid="tap-action-list-item"]');

export const getExpenseAppSignupButton = () =>
  containsIFrameElement("io.perfecto.expense.tracker:id/login_signup_btn");

export const getDefaultObjectDetectOption = () =>
  containsIFrameElement("Autonomous");

export const getTextAnalysisOption = () =>
  containsIFrameElement("Text Analysis");

export const getIElementText = () =>
  findIFrameElement('input[placeholder="Add Text to IElement"]');

export const getDefaultSourceOptionSetText = () =>
  containsIFrameElement("Insert Text");

export const getUseVariableOptionSetText = () =>
  findIFrameElement('[data-value="use-variable"]');

export const getActionDetailHeaderOnTestSteps = () =>
  findIFrameElement('[class^="ActionDetailsHeader_action-details-header"]');

export const getVisualAnalysisOption = () =>
  findIFrameElement('[data-value="Object detection"]');

export const getTargetCancelBtn = () =>
  findIFrameElement('[data-value="cancel-selected-target-button"]');

export const getTestDataOptionSetText = () =>
  findIFrameElement('[data-value="test-data"]');

export const getAddScreenBtn = () =>
  findIFrameElement('[data-testid="add-screen-button"]');

export const getScreenToSelect = () =>
  findIFrameElement(".ScreenSelect_image-div__2QCAR");

export const getAddSelectedBtn = () =>
  findIFrameElement('[data-testid="add-selected-button"]');

export const getBlankScreenComponent = () =>
  findIFrameElement('[data-testid="blank-screen-component"]');

export const getStepDescription = () =>
  findIFrameElement('[data-testid="step-description"]');
