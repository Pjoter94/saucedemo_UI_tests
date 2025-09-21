import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  private cartItem = (productName: string) =>
    this.page.locator(`.cart_item:has-text("${productName}")`);
  private removeButton = (productName: string) =>
    this.cartItem(productName).locator('button:has-text("Remove")');
  private checkoutButton = () => this.page.locator("#checkout");
  private continueShoppingButton = () =>
    this.page.locator("#continue-shopping");
  private cartItems = () => this.page.locator(".cart_item");

  constructor(page: Page) {
    super(page);
  }

  // Action methods
  async removeProduct(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton().click();
    await this.waitForLoadState();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton().click();
    await this.waitForLoadState();
  }

  // Assertion methods
  async isProductInCart(productName: string): Promise<boolean> {
    return await this.cartItem(productName).isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems().count();
  }
}
