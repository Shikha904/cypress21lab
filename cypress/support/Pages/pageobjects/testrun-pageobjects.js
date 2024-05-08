import { findIFrameElement, containsIFrameElement } from "../BasePage.js";

export const getRecorderButton = () => findIFrameElement('a[href$="debug"]');

export const getSelectTests = () => containsIFrameElement("Tests");

export const getTestResultBar = () =>
  findIFrameElement('[data-testid="results-top-bar"]');

export const getFailedCount = () =>
  findIFrameElement('[data-testid="step-list"] div').eq(3);
