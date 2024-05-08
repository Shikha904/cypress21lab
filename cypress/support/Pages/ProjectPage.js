/// <reference types="Cypress" />

import "../utilities/common-utilities.js";
import "cypress-iframe";
import AddNewProjectPage from "./AddNewProjectPage.js";
import TestsPage from "./TestsPage";
import { getTestsLink } from "./pageobjects/common-pageobjects.js";
import * as projectPageObject from "./pageobjects/project-pageobjects.js";
import { elementClick, setText } from "../utilities/common-utilities.js";

const addNewProjectPage = new AddNewProjectPage();

class ProjectPage {
  navigateToAddNewProject = () => {
    elementClick(projectPageObject.getAddProjectCard()).then(() => {
      projectPageObject.getPageHeader().should("have.text", "Add new project");
    });
    return addNewProjectPage;
  };

  getProject = (projectName) => {
    cy.fixture("project-name").then(function (data) {
      switch (projectName) {
        case "Android":
          data = data.AndroidProject;
          break;
        case "Emulator":
          data = data.EmulatorProject;
          break;
        case "Simulator":
          data = data.SimulatorProject;
          break;
        case "iOS":
          data = data.iOSProject;
          break;
        default:
          break;
      }
      setText(projectPageObject.getSearchByProjectName(), data);
    });
  };

  selectAndroidProject = (deviceName, androidVersion, filePath) => {
    this.getProject("Android");
    projectPageObject.getProjectList().then(($class) => {
      if (
        $class
          .children(".InfoPage_container__3X06G")
          .text()
          .includes("No search results")
      ) {
        elementClick(projectPageObject.getAddNewProjectLink());
        addNewProjectPage.addProjectConfig("AndroidProject", filePath);
        addNewProjectPage.addNewAndroidProject(deviceName, androidVersion);
        elementClick(getTestsLink());
      } else {
        elementClick(projectPageObject.getProjectCard());
      }
    });
    return new TestsPage();
  };

  selectEmulatorProject = (manufacturer, deviceName, version, filePath) => {
    this.getProject("Emulator");
    projectPageObject.getProjectList().then(($class) => {
      if (
        $class
          .children(".InfoPage_container__3X06G")
          .text()
          .includes("No search results")
      ) {
        elementClick(projectPageObject.getAddNewProjectLink()).then(() => {
          addNewProjectPage.addProjectConfig("EmulatorProject", filePath);
          addNewProjectPage.addNewEmulatorProject(
            manufacturer,
            deviceName,
            version
          );
        });
        elementClick(getTestsLink());
      } else {
        elementClick(projectPageObject.getProjectCard());
      }
    });
    return new TestsPage();
  };

  selectIOSProject = (deviceName, androidVersion, filePath) => {
    this.getProject("iOS");
    projectPageObject.getProjectList().then(($class) => {
      if (
        $class
          .children(".InfoPage_container__3X06G")
          .text()
          .includes("No search results")
      ) {
        elementClick(projectPageObject.getAddNewProjectLink());
        addNewProjectPage.addProjectConfig("iOSProject", filePath);
        addNewProjectPage.addNewIOSProject(deviceName, androidVersion);
        elementClick(getTestsLink());
      } else {
        elementClick(projectPageObject.getProjectCard());
      }
    });
    return new TestsPage();
  };

  selectSimulatorProject = (manufacturer, deviceName, version, filePath) => {
    this.getProject("Simulator");
    projectPageObject.getProjectList().then(($class) => {
      if (
        $class
          .children(".InfoPage_container__3X06G")
          .text()
          .includes("No search results")
      ) {
        elementClick(projectPageObject.getAddNewProjectLink());
        addNewProjectPage.addProjectConfig("SimulatorProject", filePath);
        addNewProjectPage.addNewSimulatorProject(
          manufacturer,
          deviceName,
          version
        );
        elementClick(getTestsLink());
      } else {
        elementClick(projectPageObject.getProjectCard());
      }
    });
    return new TestsPage();
  };
}
export default ProjectPage;
