import {
  findElement,
  elementClick,
  setText,
} from "../utilities/common-utilities.js";
import ProjectPage from "./ProjectPage.js";

class LoginPage {
  getUserName = () => findElement("#username");
  getPassword = () => findElement("#password");
  getSignIn = () => findElement("#kc-login");
  getHeaderDropDown = () => findElement("#appDropdown");
  getClickToLogin = () => findElement('[data-aid="login-link"]');
  getClicktologin = () => findElement('data-aid="login-link"');
  tapOnClickToLogin = () => elementClick(this.getClickToLogin());

  login = (userName, password) => {
    setText(this.getUserName(), userName);
    setText(this.getPassword(), password);
    elementClick(this.getSignIn());
    this.getHeaderDropDown()
      .find('[data-aid="scriptless-mobile-app-title"]')
      .should("be.visible")
      .then(() => {});
    return new ProjectPage();
  };
}
export default LoginPage;
