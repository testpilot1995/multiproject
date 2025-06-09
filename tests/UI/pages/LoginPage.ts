import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";

export class LoginPage extends BasePage {
  private readonly loginContainer: Locator = this.page.locator(".login_container");
  private readonly userNameInput: Locator = this.loginContainer.locator('#user-name');
  private readonly passwordInput: Locator = this.loginContainer.locator('#password');
  private readonly loginButton: Locator = this.loginContainer.locator('#login-button');

  async login(username: string, password: string): Promise<HomePage> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new HomePage(this.page);
  }
}
