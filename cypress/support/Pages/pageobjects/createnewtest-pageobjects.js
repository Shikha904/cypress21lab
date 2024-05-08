import { findIFrameElement } from "../BasePage";

export const getNextButton = () =>
  findIFrameElement('[data-testid="next-button"]');

export const getEditDeviceBtn = () =>
  findIFrameElement(".pm-icon.pm-icon-edit.pm-icon-x3");
