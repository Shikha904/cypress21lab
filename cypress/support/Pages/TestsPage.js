import "../commands.js";
import * as commonUtils from "../utilities/common-utilities.js";
import * as basePage from "./BasePage.js";
import * as testsPageObjects from "./pageobjects/tests-pageobjects";
import CreateNewTestPage from "./CreateNewTestPage.js";

class TestsPage {
  addNewTest = () => {
    commonUtils.elementClick(testsPageObjects.getCreateTestButton());
    return new CreateNewTestPage();
  };

  /*  addTestData = () => {
      commonUtils.elementClick(testsPageObjects.getManageTestDataButton());
      commonUtils.findElement("body").then(($ele) => {
        if (testsPageObjects.getViewerDialog($ele).length) {
          commonUtils.elementClick(testsPageObjects.getCloseButton());
        } else if (testsPageObjects.geFileSelectionDialog($ele).length) {
          commonUtils.elementClick(testsPageObjects.getSelectTestDatafile());
          const filePath = "/Test Data/Test Data.csv";
          basePage.fileUpload(filePath.toString());
          commonUtils.elementClick(testsPageObjects.getAddButton());
        }
      }); */

  addTestData = () => {
    commonUtils.elementClick(testsPageObjects.getManageTestDataButton());
    basePage
      .findElement('[data-testid="test-data-viewer-dialog"]')
      .then(($ele) => {
        if (
          $ele.find('[data-testid="test-data-viewer-dialog-content"]').length
        ) {
          commonUtils.elementClick(testsPageObjects.getCloseButton());
        } else {
          commonUtils.elementClick(testsPageObjects.getSelectTestDatafile());
          const filePath = "/Test Data/Test Data.csv";
          basePage.fileUpload(filePath.toString());
          commonUtils.elementClick(testsPageObjects.getAddButton());
        }
      });
  };
}

export default TestsPage;
