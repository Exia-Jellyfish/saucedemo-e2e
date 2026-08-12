import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../data/checkout';

export async function goToCheckout(
  inventoryPage: InventoryPage,
  cartPage: CartPage,
  checkoutPage: CheckoutPage,
  productNames: string[]
) {
  await inventoryPage.addProductsToCart(productNames);

  await cartPage.goto();

  await cartPage.checkout();
}

export async function fillValidCheckoutInformation(
  checkoutPage: CheckoutPage
) {
  await checkoutPage.fillCustomerInformation(
    checkoutData.validCustomer.firstName,
    checkoutData.validCustomer.lastName,
    checkoutData.validCustomer.postalCode
  );

  await checkoutPage.continue();
}