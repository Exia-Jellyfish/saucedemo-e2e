import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });

    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async goto() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async expectCartPageVisible() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectProductInCart(productName: string) {
    const item = this.cartItems.filter({
      hasText: productName,
    });

    await expect(item).toBeVisible();
  }

  async expectProductNotInCart(productName: string) {
    const item = this.cartItems.filter({
      hasText: productName,
    });

    await expect(item).not.toBeVisible();
  }

  async expectProductPrice(
    productName: string,
    expectedPrice: number
  ) {
    const item = this.cartItems.filter({
      hasText: productName,
    });

    await expect(item).toBeVisible();

    await expect(
      item.locator('.inventory_item_price')
    ).toHaveText(`$${expectedPrice.toFixed(2)}`);
  }

  async removeProduct(productName: string) {
    const item = this.cartItems.filter({
      hasText: productName,
    });

    await item.getByRole('button', {
      name: /Remove/i,
    }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async expectCheckoutPageVisible() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);

    await expect(
      this.page.getByText('Checkout: Your Information')
    ).toBeVisible();
  }
}