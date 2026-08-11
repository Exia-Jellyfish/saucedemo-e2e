import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Conteneur principal de la liste des produits
    this.inventoryContainer = page.locator('.inventory_container');

    // Cartes produits
    this.products = page.locator('[data-test="inventory-item"]');
    
    // Noms et prix
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');

    // Menu de tri
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectInventoryPageVisible() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async expectProductsCount(count: number) {
    await expect(this.products).toHaveCount(count);
  }

  async expectProductVisible(productName: string) {
    await expect(
      this.products.filter({ hasText: productName })
    ).toBeVisible();
  }

  async expectProductInformation(productName: string, price: number) {
    const product = this.products.filter({ hasText: productName });

    await expect(product).toBeVisible();

    await expect(
      product.locator('.inventory_item_name')
    ).toHaveText(productName);

    await expect(
      product.locator('.inventory_item_price')
    ).toHaveText(`$${price.toFixed(2)}`);

    await expect(
      product.locator('img')
    ).toBeVisible();
  }

  async clickProduct(productName: string) {
    await this.productNames
      .filter({ hasText: productName })
      .click();
  }

  async expectProductDetailPage(productName: string) {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      parseFloat(price.replace('$', ''))
    );
  }

  async addProductToCart(productName: string) {
    const product = this.products.filter({ hasText: productName });

    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async expectCartItemCount(count: number) {
    const cartBadge = this.page.locator('.shopping_cart_badge');

    if (count === 0) {
        await expect(cartBadge).not.toBeVisible();
    } else {
        await expect(cartBadge).toHaveText(count.toString());
    }
  }

}
