import { findIFrameElement, containsIFrameElement } from "../BasePage.js";

export const getCreateTestButton = () =>
  containsIFrameElement("Create new test");

export const getManageTestDataButton = () =>
  findIFrameElement('[data-testid="test-data-button"]');

export const getSelectTestDatafile = () =>
  findIFrameElement('[data-testid="add-file-button"]');

export const getAddButton = () =>
  findIFrameElement('[data-testid="select-button"]');

export const getCloseButton = () =>
  findIFrameElement('[data-testid="close-button"]');

export const getViewerDialog = (element) =>
  element.find('[data-testid="test-data-viewer-dialog"]');

export const geFileSelectionDialog = (element) =>
  element.find('[data-testid="file-selection-dialog"]');
