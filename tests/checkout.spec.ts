import { test, expect } from '../fixtures/test.fixture';
import { products } from '../data/products';
import { checkoutData } from '../data/checkout';

test.describe('Checkout SauceDemo', () => {

  test('CHECKOUT-001 - Ouverture du checkout', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.checkout();

    await checkoutPage.expectCheckoutPageVisible();
  });


  test('CHECKOUT-002 - Saisie des informations client valides', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.expectCheckoutPageVisible();

    await checkoutPage.fillCustomerInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectOverviewPageVisible();
  });


  test('CHECKOUT-003 - Prénom vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyFirstName.firstName,
      checkoutData.emptyFirstName.lastName,
      checkoutData.emptyFirstName.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'First Name is required'
    );

    await expect(checkoutPage.page).toHaveURL(
      /checkout-step-one\.html/
    );
  });


  test('CHECKOUT-004 - Nom vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyLastName.firstName,
      checkoutData.emptyLastName.lastName,
      checkoutData.emptyLastName.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'Last Name is required'
    );

    await expect(checkoutPage.page).toHaveURL(
      /checkout-step-one\.html/
    );
  });


  test('CHECKOUT-005 - Code postal vide', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.emptyPostalCode.firstName,
      checkoutData.emptyPostalCode.lastName,
      checkoutData.emptyPostalCode.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      'Postal Code is required'
    );

    await expect(checkoutPage.page).toHaveURL(
      /checkout-step-one\.html/
    );
  });


  test('CHECKOUT-006 - Vérification du récapitulatif de commande', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutPage.continue();

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


  test('CHECKOUT-007 - Finalisation de la commande', async ({
    inventoryPage,
    cartPage,
    checkoutPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectOverviewPageVisible();

    await checkoutPage.finish();

    await checkoutPage.expectOrderConfirmation();
  });

});
