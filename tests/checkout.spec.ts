import { test, expect } from '../fixtures/test.fixture';
import { products } from '../data/products';
import { checkoutData } from '../data/checkout';
import {
  goToCheckout,
  fillValidCheckoutInformation,
} from '../helpers/checkout.helper';

test.describe('Checkout SauceDemo', () => {

  test('CHECKOUT-001 - Ouverture du checkout', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await checkoutPage.expectCheckoutPageVisible();
  });

  test('CHECKOUT-002 - Informations client valides', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();
  });


  test('CHECKOUT-003 - Prénom vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyFirstName.firstName,
      checkoutData.emptyFirstName.lastName,
      checkoutData.emptyFirstName.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'First Name is required'
    );
  });


  test('CHECKOUT-004 - Nom vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyLastName.firstName,
      checkoutData.emptyLastName.lastName,
      checkoutData.emptyLastName.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'Last Name is required'
    );
  });

  test('CHECKOUT-005 - Code postal vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyPostalCode.firstName,
      checkoutData.emptyPostalCode.lastName,
      checkoutData.emptyPostalCode.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'Postal Code is required'
    );
  });

  test('CHECKOUT-006 - Vérification du récapitulatif et des prix', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();

    await checkoutPage.expectProductInOverview(
      products.backpack.name
    );

    await checkoutPage.expectProductPrice(
      products.backpack.name,
      products.backpack.price
    );

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeCloseTo(
      products.backpack.price,
      2
    );

    expect(total).toBeCloseTo(
      subtotal + tax,
      2
    );
  });


  test('CHECKOUT-007 - Finalisation de la commande @smoke', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();

    await checkoutPage.finish();

    await checkoutPage.expectOrderConfirmation();
  });

  test('CHECKOUT-008 - Checkout avec plusieurs produits', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    const selectedProducts = [
      products.backpack,
      products.bikeLight,
      products.fleeceJacket,
    ];

    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      selectedProducts.map(product => product.name)
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();

    for (const product of selectedProducts) {
      await checkoutPage.expectProductInOverview(
        product.name
      );
    }
  });

  test('CHECKOUT-009 - Calcul du total avec plusieurs produits', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    const selectedProducts = [
      products.backpack,
      products.bikeLight,
      products.fleeceJacket,
    ];

    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      selectedProducts.map(product => product.name)
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();

    const expectedSubtotal = selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeCloseTo(
      expectedSubtotal,
      2
    );

    expect(total).toBeCloseTo(
      subtotal + tax,
      2
    );
  });

  test('CHECKOUT-010 - Annulation du checkout', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await checkoutPage.expectCheckoutPageVisible();

    await checkoutPage.cancel();

    await cartPage.expectCartPageVisible();

    await cartPage.expectProductInCart(
      products.backpack.name
    );
  });

  test('CHECKOUT-011 - Checkout avec panier vide', async ({
    inventoryPage,
    cartPage
  }) => {
    await inventoryPage.expectInventoryPageVisible();

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.checkout();

    await expect(cartPage.page).toHaveURL(
      /checkout-step-one\.html/
    );
  });

  test('CHECKOUT-012 - Panier vidé après finalisation', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {
    await goToCheckout(
      inventoryPage,
      cartPage,
      checkoutPage,
      [products.backpack.name]
    );

    await fillValidCheckoutInformation(checkoutPage);

    await checkoutPage.expectOverviewPageVisible();

    await checkoutPage.finish();

    await checkoutPage.expectOrderConfirmation();

    await checkoutPage.backHome();

    await expect(cartPage.page).toHaveURL(
      /inventory\.html/
    );

    await cartPage.goto();

    await cartPage.expectCartItemCount(0);
  });

});