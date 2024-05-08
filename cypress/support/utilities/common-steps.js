/// <reference types="Cypress" />

import ProjectPage from "../Pages/ProjectPage";
import RecorderPage from "../Pages/RecorderPage";
import LoginPage from "../Pages/LoginPage";
import { launchApplication } from "../utilities/common-utilities.js";
import * as commonPageObjects from "../Pages/pageobjects/common-pageobjects.js";
import { elementClick } from "../utilities/common-utilities.js";

let projectPage = new ProjectPage();
let recorderPage = new RecorderPage();
let addNewProject;
let testPage;
let createNewTestPage;

/* method is used for Launching and logging in the application with valid URL and credentials*/
export const login = () => {
  cy.fixture("logindata-local").then(function (data) {
    cy.session([data.username, data.password], () => {
      cy.visit(Cypress.env("staging"), { failOnStatusCode: false });
      projectPage = new LoginPage().login(data.username, data.password);
    });
  });
  cy.visit(Cypress.env("staging"), { failOnStatusCode: false });
};

/*method is used for navigating to the All Projects page */
export const goToAllProjectPage = () => {
  elementClick(commonPageObjects.getProjectMenu());
  elementClick(commonPageObjects.getAllProjects());
};

/*  method is used for creating a new Emulator project 
with the appropiate android app and the device under test. */
export const createEmulatorProject = (filePath) => {
  addNewProject = projectPage.navigateToAddNewProject();
  addNewProject.addProjectConfig("EmulatorProject", filePath);
  recorderPage = addNewProject.addNewEmulatorProject("Google", "pixel", "11");
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/*  method is used for selecting the existing Emulator project and creating a new test
by selecting the device under test.*/
export let createEmulatorTest = (filePath, source) => {
  testPage = projectPage.selectEmulatorProject(
    "Google",
    "pixel",
    "11",
    filePath
  );
  createNewTestPage;
  if (source == "TestData") {
    createNewTestPage = testPage.addTestData();
  }
  createNewTestPage = testPage.addNewTest();
  recorderPage = createNewTestPage.createTestWithVirtualDevice(
    "Google",
    "pixel",
    "11"
  );
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/* method is used for creating a new Android project 
with the appropiate android app and the device under test. */
export const createAndroidProject = (filePath) => {
  addNewProject = projectPage.navigateToAddNewProject();
  addNewProject.addProjectConfig("AndroidProject", filePath);
  recorderPage = addNewProject.addNewAndroidProject("Google Pixel 4", "10");
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/* method is used for selecting the existing 
Android project and creating a new test
by selecting the device under test.*/
export const createAndroidTest = (filePath) => {
  testPage = projectPage.selectAndroidProject("Google Pixel 4", "10", filePath);
  createNewTestPage = testPage.addNewTest();
  recorderPage = createNewTestPage.createTestWithRealDevice(
    "Google Pixel 4",
    "10"
  );
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/*  method is used for creating a new simulator project 
with the appropiate iOS app (.app) and the device under test. */
export const createSimulatorProject = (filePath) => {
  addNewProject = projectPage.navigateToAddNewProject();
  addNewProject.addProjectConfig("SimulatorProject", filePath);
  addNewProject.addNewSimulatorProject("Apple", "iPhone 12", "15.2");
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/*  method is used for selecting the existing 
*   Simulator project and creating a new test
    by selecting the device under test.
*/
export const createSimulatorTest = (filePath, src) => {
  testPage = projectPage.selectSimulatorProject(
    "Apple",
    "iPhone 12",
    "15.2",
    filePath
  );
  createNewTestPage = testPage.addNewTest();
  recorderPage = createNewTestPage.createTestWithVirtualDevice(
    "Apple",
    "iPhone 12",
    "15.2"
  );
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/* method is used for creating a new iOS project 
with the appropiate iOS app (.ipa) and the device under test. */
export const createIOSProject = (filePath) => {
  addNewProject = projectPage.navigateToAddNewProject();
  addNewProject.addProjectConfig("iOSProject", filePath);
  addNewProject.addNewAndroidProject("Apple iPhone-12", "14.6");
  recorderPage.validateRecorderPage();
  return recorderPage;
};

/* method is used for selecting the existing iOS project 
and creating a new test
by selecting the device under test.*/
export const createIOSTest = (filePath) => {
  testPage = projectPage.selectIOSProject("Apple iPhone-12", "14.6", filePath);
  createNewTestPage = testPage.addNewTest();
  recorderPage = createNewTestPage.createTestWithRealDevice(
    "Apple iPhone-12",
    "14.6"
  );
  recorderPage.validateRecorderPage();
  return recorderPage;
};
