import "../../commands.js";
import {
  findElement,
  containsText,
  elementClick,
} from "../common-utilities.js";

/**
 *
 * @param {Google,Samsung,iOS} manufacturer
 * @param {Pixel 4, iPhone 11..} deviceName
 * @param {10,11,12,12.4,13.5 ...} version
 */
export const selectVirtualDevice = (manufacturer, deviceName, version) => {
  elementClick(containsText(manufacturer));
  elementClick(containsText(deviceName));
  elementClick(containsText(version));
  selectDevice();
};

/**
 * @param {Google pixel 4, iPhone x} deviceName
 * @param {For iOS version like 14.4 and for android 10, 11..} version
 *  * This method is used to select the real device(Android and iOS both)
 */

export const selectRealDevice = (deviceName, version) => {
  elementClick(containsText(deviceName));
  elementClick(containsText("AVAILABLE"));
  elementClick(containsText(version));
  selectDevice();
};

export const selectDevice = () =>
  elementClick(
    findElement('button[data-aid="select-btn-select-device-dialog"]')
  );
