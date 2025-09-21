import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  private firstNameInput = () => this.page.locator("#first-name");
  private lastNameInput = () => this.page.locator("#last-name");
  private postalCodeInput = () => this.page.locator("#postal-code");
  private continueButton = () => this.page.locator("#continue");
  private cancelButton = () => this.page.locator("#cancel");
  private errorMessage = () => this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton().click();
    await this.waitForLoadState();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton().click();
    await this.waitForLoadState();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage().textContent()) || "";
  }
}
