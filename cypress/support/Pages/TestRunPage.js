import "../commands.js";
import { elementClick } from "../utilities/common-utilities.js";
import { containsIFrameElement } from "./BasePage";
import * as testRunPageObject from "./pageobjects/testrun-pageobjects";

class TestRunPage {
  validateResult = (testName) => {
    testRunPageObject
      .getTestResultBar()
      .should("contains.text", "Completed")
      .and("contains.text", testName);
  };

  validateFailedCount = (failedCount) => {
    testRunPageObject.getFailedCount().should("contain.text", failedCount);
  };
}

export default TestRunPage;
