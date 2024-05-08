import "../commands.js";
import * as createTestPageObject from "./pageobjects/createnewtest-pageobjects";
import { elementClick } from "../utilities/common-utilities.js";
import RecorderPage from "./RecorderPage.js";
import {
  selectVirtualDevice,
  selectRealDevice,
} from "../utilities/Pop-up-Handling/select-device.js";

class CreateNewTestPage {
  createTestWithVirtualDevice = (param1, param2, param3) => {
    elementClick(createTestPageObject.getEditDeviceBtn());
    selectVirtualDevice(param1, param2, param3);
    elementClick(createTestPageObject.getNextButton());
    return new RecorderPage();
  };

  createTestWithRealDevice = (param1, param2) => {
    elementClick(createTestPageObject.getEditDeviceBtn());
    selectRealDevice(param1, param2);
    elementClick(createTestPageObject.getNextButton());
    return new RecorderPage();
  };
}

export default CreateNewTestPage;
