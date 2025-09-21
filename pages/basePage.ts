import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  protected async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }
}
