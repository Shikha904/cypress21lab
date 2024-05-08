import "../commands.js";
import {
  elementClick,
  setText,
  checkElementPresence,
} from "../utilities/common-utilities.js";
import { dateTime } from "../../support/commands.js";
import RecorderPage from "./RecorderPage";
import { containsIFrameElement, fileUpload } from "./BasePage.js";
import {
  selectVirtualDevice,
  selectRealDevice,
} from "../utilities/Pop-up-Handling/select-device.js";
import { assert } from "chai";
import * as addNewProjectPageObjects from "./pageobjects/addnewproject-pageobjects.js";

class AddNewProjectPage {
  setProjectName = (stringProjectType) => {
    let projectName = stringProjectType + dateTime();
    cy.readFile("cypress/fixtures/project-name.json").then((data) => {
      if (stringProjectType == "AndroidProject") {
        data.AndroidProject = projectName;
      } else if (stringProjectType == "EmulatorProject") {
        data.EmulatorProject = projectName;
      } else if (stringProjectType == "iOSProject") {
        data.iOSProject = projectName;
      } else if (stringProjectType == "SimulatorProject") {
        data.SimulatorProject = projectName;
      }
      cy.writeFile("cypress/fixtures/project-name.json", JSON.stringify(data));
    });
    return projectName;
  };

  addProjectConfig = (projectName, filePath) => {
    projectName = this.setProjectName(projectName);
    setText(addNewProjectPageObjects.getApplicationName(), projectName);
    if (projectName.includes("Simulator") || projectName.includes("iOS")) {
      elementClick(addNewProjectPageObjects.getIOSAppType());
    }
    elementClick(addNewProjectPageObjects.getSelectfile());
    fileUpload(filePath.toString());
  };

  addNewAndroidProject = (deviceName, version) => {
    containsIFrameElement("Testing your build, please wait...").should(
      "be.visible"
    );
    addNewProjectPageObjects.getStartBuildingTests().should("not.be.disabled");
    addNewProjectPageObjects.getProjectContainer().then(($class) => {
      if (
        checkElementPresence(
          $class,
          ".AddProject_form-section__2Sxjk",
          "Device type:"
        )
      ) {
        elementClick(addNewProjectPageObjects.getRealDeviceType());
        elementClick(addNewProjectPageObjects.getEditDevice());
      } else if (
        checkElementPresence($class, ".AddProject_form-section__2Sxjk", "REAL")
      ) {
        elementClick(addNewProjectPageObjects.getEditDevice());
      } else {
        assert.isNotOk(true, "Unable to select Real Device");
      }
    });
    selectRealDevice(deviceName, version);
    elementClick(addNewProjectPageObjects.getStartBuildingTests());
    return new RecorderPage();
  };

  addNewEmulatorProject = (manufacturer, deviceName, version) => {
    containsIFrameElement("Testing your build, please wait...")
      .should("be.visible")
      .then(() => {
        try {
          containsIFrameElement("EMULATOR");
          elementClick(addNewProjectPageObjects.getEditDevice());
        } catch (err) {
          console.log("No Emulator Found");
        }
      });
    selectVirtualDevice(manufacturer, deviceName, version);
    elementClick(addNewProjectPageObjects.getStartBuildingTests());
    return new RecorderPage();
  };

  addNewSimulatorProject = (manufacturer, deviceName, version) => {
    containsIFrameElement("Testing your build, please wait...").should(
      "be.visible"
    );
    containsIFrameElement("SIMULATOR");
    elementClick(addNewProjectPageObjects.getEditDevice());
    selectVirtualDevice(manufacturer, deviceName, version);
    elementClick(addNewProjectPageObjects.getStartBuildingTests());
    return new RecorderPage();
  };

  addNewIOSProject = (deviceName, version) => {
    containsIFrameElement("Testing your build, please wait...").should(
      "be.visible"
    );
    addNewProjectPageObjects.getStartBuildingTests().should("not.be.disabled");
    elementClick(addNewProjectPageObjects.getEditDevice());
    selectRealDevice(deviceName, version);
    elementClick(addNewProjectPageObjects.getStartBuildingTests());
    return new RecorderPage();
  };
}
export default AddNewProjectPage;
