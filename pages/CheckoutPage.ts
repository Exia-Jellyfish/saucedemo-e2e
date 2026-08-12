import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  readonly errorMessage: Locator;

  readonly checkoutItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish',
    });

    this.cancelButton = page.getByRole('button', {
      name: 'Cancel',
    });

    this.errorMessage = page.locator('[data-test="error"]');

    this.checkoutItems = page.locator('.cart_item');

    this.subtotal = page.locator('[data-test="subtotal-label"]');
    
    this.tax = page.locator('[data-test="tax-label"]');
    
    this.total = page.locator('[data-test="total-label"]');
    
    this.confirmationMessage = page.getByText(
      'Thank you for your order!'
    );
  }

  async expectCheckoutPageVisible() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);

    await expect(
      this.page.getByText('Checkout: Your Information')
    ).toBeVisible();

    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectOverviewPageVisible() {
    await expect(this.page).toHaveURL(
      /checkout-step-two\.html/
    );

    await expect(
      this.page.getByText('Checkout: Overview')
    ).toBeVisible();
  }

  async expectProductInOverview(productName: string) {
    const item = this.checkoutItems.filter({
      hasText: productName,
    });

    await expect(item).toBeVisible();
  }

  async expectProductPrice(
    productName: string,
    expectedPrice: number
  ) {
    const item = this.checkoutItems.filter({
      hasText: productName,
    });

    await expect(item).toBeVisible();

    await expect(
      item.locator('.inventory_item_price')
    ).toHaveText(`$${expectedPrice.toFixed(2)}`);
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotal.textContent();

    if (!text) {
      throw new Error('Subtotal introuvable');
    }

    return parseFloat(
      text.replace('Item total: $', '')
    );
  }

  async getTax(): Promise<number> {
    const text = await this.tax.textContent();

    if (!text) {
      throw new Error('Tax introuvable');
    }

    return parseFloat(
      text.replace('Tax: $', '')
    );
  }

  async getTotal(): Promise<number> {
    const text = await this.total.textContent();

    if (!text) {
      throw new Error('Total introuvable');
    }

    return parseFloat(
      text.replace('Total: $', '')
    );
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderConfirmation() {
    await expect(this.page).toHaveURL(
      /checkout-complete\.html/
    );

    await expect(
      this.confirmationMessage
    ).toBeVisible();

    await expect(
      this.page.getByText('Your order has been dispatched')
    ).toBeVisible();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async backHome() {
    await this.page.getByRole('button', {
        name: 'Back Home'
    }).click();
  }
}
