import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
  }

  async goto() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async expectCartPageVisible() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  async expectProductInCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });

    await expect(item).toBeVisible();
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeProduct(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });

    await item.getByRole('button', { name: /remove/i }).click();
  }

  async expectProductNotInCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });

    await expect(item).not.toBeVisible();
  }
}
