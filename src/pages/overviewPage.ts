import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class OverviewPage extends BasePage {
  private finishButton = () => this.page.locator("#finish");
  private cancelButton = () => this.page.locator("#cancel");
  private completeHeader = () => this.page.locator(".complete-header");
  private completeText = () => this.page.locator(".complete-text");
  private backHomeButton = () => this.page.locator("#back-to-products");

  constructor(page: Page) {
    super(page);
  }

  async finishOrder(): Promise<void> {
    await this.finishButton().click();
    await this.waitForLoadState();
  }

  async cancelOrder(): Promise<void> {
    await this.cancelButton().click();
    await this.waitForLoadState();
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton().click();
    await this.waitForLoadState();
  }

  async getCompleteHeader(): Promise<string> {
    return (await this.completeHeader().textContent()) || "";
  }

  async getCompleteText(): Promise<string> {
    return (await this.completeText().textContent()) || "";
  }

  async isOrderComplete(): Promise<boolean> {
    return await this.completeHeader().isVisible();
  }
}
