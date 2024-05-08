import { findIFrameElement, containsIFrameElement } from "../BasePage.js";

export const getAddProjectCard = () =>
  findIFrameElement("span.AddProjectCard_title__3yB6_");

export const getPageHeader = () =>
  findIFrameElement("div.PageHeader_title__2B303");

export let getSearchByProjectName = () =>
  findIFrameElement('[data-testid="search-bar"]');

export const getProjectCard = () =>
  findIFrameElement(".Card_container__2b1so.ProjectCard_container__3J2yY");

export const getProjectList = () =>
  findIFrameElement(".ProjectList_container__iK1cP");

export const getAddNewProjectLink = () =>
  containsIFrameElement("Add new project");
