import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { User } from "../models/user";

export class LoginPage extends BasePage {
  private usernameInput = () => this.page.locator("#user-name");
  private passwordInput = () => this.page.locator("#password");
  private loginButton = () => this.page.locator("#login-button");
  private errorMessage = () => this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto("/");
    await this.waitForLoadState();
  }

  async login(user: User): Promise<void> {
    await this.usernameInput().fill(user.username);
    await this.passwordInput().fill(user.password);
    await this.loginButton().click();
    await this.waitForLoadState();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage().textContent()) || "";
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.loginButton().isVisible();
  }
}
