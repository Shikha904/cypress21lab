import { findIFrameElement } from "../BasePage.js";

export const getPageHeader = () =>
  findIFrameElement("[@class*='PageHeader_title']");

export const getApplicationName = () =>
  findIFrameElement("input#applicationName");

export const getSelectfile = () =>
  findIFrameElement('[data-testid="select-file-button"]');

export const getStartBuildingTests = () =>
  findIFrameElement('[data-testid="start-building-button"]');

export const getIOSAppType = () => findIFrameElement("#IOS");

export const getEditDevice = () =>
  findIFrameElement('[class*="DeviceSelector_container"] button');

export const getRealDeviceType = () => findIFrameElement("#Real");

export const getVirtualDeviceType = () => findIFrameElement("#Virtual");

export const getProjectContainer = () =>
  findIFrameElement(".AddProject_form__1aTp0");
