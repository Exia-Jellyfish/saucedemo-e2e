import { test } from '../fixtures/test.fixture';
import { products } from '../data/products';

test.describe('Panier SauceDemo', () => {

  test('CART-001 - Ajouter un produit au panier', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(products.backpack.name);

    await inventoryPage.expectCartItemCount(1);

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemCount(1);
    await cartPage.expectProductInCart(products.backpack.name);
  });


  test('CART-002 - Ajouter plusieurs produits au panier', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await inventoryPage.addProductToCart(products.fleeceJacket.name);

    await inventoryPage.expectCartItemCount(3);

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemCount(3);

    await cartPage.expectProductInCart(products.backpack.name);
    await cartPage.expectProductInCart(products.bikeLight.name);
    await cartPage.expectProductInCart(products.fleeceJacket.name);
  });


  test('CART-003 - Supprimer un produit du panier', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(products.backpack.name);
    await inventoryPage.addProductToCart(products.bikeLight.name);
    await inventoryPage.addProductToCart(products.fleeceJacket.name);

    await inventoryPage.expectCartItemCount(3);

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemCount(3);

    await cartPage.removeProduct(products.backpack.name);

    await cartPage.expectCartItemCount(2);
    await cartPage.expectProductNotInCart(products.backpack.name);

    await cartPage.expectProductInCart(products.bikeLight.name);
    await cartPage.expectProductInCart(products.fleeceJacket.name);
  });

});