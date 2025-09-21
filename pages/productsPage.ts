import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  private productItem = (productName: string) =>
    this.page.locator(`.inventory_item:has-text("${productName}")`);
  private addToCartButton = (productName: string) =>
    this.productItem(productName).locator('button:has-text("Add to cart")');
  private removeFromCartButton = (productName: string) =>
    this.productItem(productName).locator('button:has-text("Remove")');
  private shoppingCartBadge = () => this.page.locator(".shopping_cart_badge");
  private shoppingCartLink = () => this.page.locator(".shopping_cart_link");

  constructor(page: Page) {
    super(page);
  }

  // Action methods
  async addProductToCart(productName: string): Promise<void> {
    await this.addToCartButton(productName).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.removeFromCartButton(productName).click();
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink().click();
    await this.waitForLoadState();
  }

  // Assertion methods
  async getCartItemCount(): Promise<number> {
    const countText = await this.shoppingCartBadge().textContent();
    return countText ? parseInt(countText) : 0;
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.productItem(productName).isVisible();
  }

  async isAddToCartButtonVisible(productName: string): Promise<boolean> {
    return await this.addToCartButton(productName).isVisible();
  }

  async isRemoveButtonVisible(productName: string): Promise<boolean> {
    return await this.removeFromCartButton(productName).isVisible();
  }
}
