/// <reference types="Cypress" />

export const launchApplication = (environment) => {
  // cy.clearCookies({ log: true });
  // cy.clearLocalStorage("your item", { log: true });
  cy.visit(Cypress.env(environment), { failOnStatusCode: false });
};

export const findElement = (element) => {
  return cy.get(element);
};

export const elementClick = (element, xPosition, yPosition) => {
  if (typeof xPosition == "undefined" && typeof yPosition == "undefined") {
    return element.click({ force: true });
  } else {
    return element.click(xPosition, yPosition, { force: true });
  }
};

export const multipleClick = (element) => {
  return element.click({ multiple: true, force: true });
};

export const clickElementWithText = (element, text) => {
  return element.should("contains.text", text).click();
};

export const containsElementText = (text, element) => {
  return cy.contains(text, element);
};

export const containsText = (text) => {
  return cy.contains(text);
};

/*
 ***** setText function is to set the text in text field
 *** @element and @text need to be passed as param
 */
export const setText = (element, text) => {
  elementClick(element);
  element.clear({ force: true });
  return element.type(text, { parseSpecialCharSequences: false, force: true });
};

const getIframeDocument = (iframeElement) => {
  return cy
    .get(iframeElement)
    .its("0.contentDocument")
    .should("exist")
    .should("not.be.empty");
};

export const getIframeBody = (iframeElement) => {
  cy.frameLoaded(iframeElement).its("0.contentDocument").should("exist");
  return getIframeDocument(iframeElement)
    .its("body")
    .should("not.be.undefined")
    .then(cy.wrap);
};

export const elementExists = (element) => {
  return element.should("be.visible");
};

/**
 * This function will check the element with specific class attribute
 * present on page or not.
 * @param {*} element
 * @param {*} childClassAttribute
 * @param {*} textToInclude
 * @returns
 */

export const checkElementPresence = (
  element,
  childAttribute,
  textToInclude
) => {
  return element.children(childAttribute).text().includes(textToInclude);
};
export const wait = (timeout) => {
  return cy.wait(timeout);
};

export const swipe = (element, position, clientX, clientY) => {
  element
    .trigger("mousedown", {
      position,
      eventConstructor: "MouseEvent",
      force: true,
    })
    .trigger("mousemove", {
      clientX,
      clientY,
      eventConstructor: "MouseEvent",
      force: true,
    })
    .trigger("mouseup", {
      eventConstructor: "MouseEvent",
      force: true,
    });
};

import "cypress-file-upload";
import "cypress-iframe";
