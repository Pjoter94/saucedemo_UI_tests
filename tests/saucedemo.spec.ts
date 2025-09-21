import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { OverviewPage } from "../pages/overviewPage";
import { StandardUser } from "../models/user";
import { TestData } from "../utils/testData";

test.describe("SauceDemo E2E Tests", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: OverviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new OverviewPage(page);

    // Navigate to application and login
    await loginPage.navigate();
    await loginPage.login(StandardUser);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Successful product order placement", async ({ page }) => {
    // Arrange
    const productName = TestData.PRODUCTS.BACKPACK;
    const { FIRST_NAME, LAST_NAME, POSTAL_CODE } = TestData.CHECKOUT_INFO;

    // Act - Add product to cart
    await productsPage.addProductToCart(productName);

    // Assert - Verify product was added to cart
    await expect(await productsPage.getCartItemCount()).toBe(1);
    await expect(productsPage.isRemoveButtonVisible(productName)).toBeTruthy();

    // Act - Go to cart
    await productsPage.goToCart();

    // Assert - Verify cart page and product presence
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(await cartPage.isProductInCart(productName)).toBeTruthy();

    // Act - Proceed to checkout
    await cartPage.proceedToCheckout();

    // Assert - Verify checkout page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    // Act - Fill checkout information
    await checkoutPage.fillCheckoutInformation(
      FIRST_NAME,
      LAST_NAME,
      POSTAL_CODE
    );
    await checkoutPage.continueToOverview();

    // Assert - Verify overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // Act - Finish order
    await overviewPage.finishOrder();

    // Assert - Verify order completion
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(overviewPage.isOrderComplete()).toBeTruthy();

    const completeHeader = await overviewPage.getCompleteHeader();
    expect(completeHeader).toContain("Thank you for your order!");
  });

  test("Remove product from cart", async ({ page }) => {
    // Arrange
    const productToRemove = TestData.PRODUCTS.BIKE_LIGHT;
    const productToKeep = TestData.PRODUCTS.BOLT_TSHIRT;

    // Act - Add products to cart
    await productsPage.addProductToCart(productToRemove);
    await productsPage.addProductToCart(productToKeep);

    // Assert - Verify both products were added
    await expect(await productsPage.getCartItemCount()).toBe(2);

    // Act - Go to cart
    await productsPage.goToCart();

    // Assert - Verify cart page and products presence
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(await cartPage.isProductInCart(productToRemove)).toBeTruthy();
    await expect(await cartPage.isProductInCart(productToKeep)).toBeTruthy();
    await expect(await cartPage.getCartItemsCount()).toBe(2);

    // Act - Remove one product
    await cartPage.removeProduct(productToRemove);

    // Assert - Verify product was removed and other remains
    await expect(await cartPage.isProductInCart(productToRemove)).toBeFalsy();
    await expect(await cartPage.isProductInCart(productToKeep)).toBeTruthy();
    await expect(await cartPage.getCartItemsCount()).toBe(1);

    // Act - Continue shopping
    await cartPage.continueShopping();

    // Assert - Verify return to products page and cart badge updated
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(await productsPage.getCartItemCount()).toBe(1);
  });

  test.afterEach(async ({ page }) => {
    // Clear browser context after each test
    await page.context().clearCookies();
  });
});
