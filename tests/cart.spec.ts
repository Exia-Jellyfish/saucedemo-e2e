import { test, expect } from '../fixtures/test.fixture';
import { products } from '../data/products';

test.describe('Panier SauceDemo', () => {

  test('CART-001 - Ajouter un produit au panier @smoke', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await inventoryPage.expectCartItemCount(1);

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemCount(1);
    await cartPage.expectProductInCart(
      products.backpack.name
    );
  });


  test('CART-002 - Ajouter plusieurs produits au panier', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await inventoryPage.addProductToCart(
      products.bikeLight.name
    );

    await inventoryPage.addProductToCart(
      products.fleeceJacket.name
    );

    await inventoryPage.expectCartItemCount(3);

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemCount(3);

    await cartPage.expectProductInCart(
      products.backpack.name
    );

    await cartPage.expectProductInCart(
      products.bikeLight.name
    );

    await cartPage.expectProductInCart(
      products.fleeceJacket.name
    );
  });

    test('CART-003 - Suppression d’un produit', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.expectProductInCart(
      products.backpack.name
    );

    await cartPage.removeProduct(
      products.backpack.name
    );

    await cartPage.expectCartItemCount(0);

    await cartPage.expectProductNotInCart(
      products.backpack.name
    );
  });


  test('CART-004 - Ouverture du panier', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();
  });


  test('CART-005 - Vérification du produit ajouté', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.expectProductInCart(
      products.backpack.name
    );
  });


  test('CART-006 - Vérification du prix du produit', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.expectProductPrice(
      products.backpack.name,
      products.backpack.price
    );
  });


  test('CART-007 - Retour au catalogue', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.continueShopping();

    await expect(cartPage.page).toHaveURL(
      /inventory\.html/
    );

    await inventoryPage.expectInventoryPageVisible();
  });


  test('CART-008 - Accès au checkout @smoke', async ({
    inventoryPage,
    cartPage
  }) => {

    await inventoryPage.addProductToCart(
      products.backpack.name
    );

    await cartPage.goto();

    await cartPage.expectCartPageVisible();

    await cartPage.checkout();

    await cartPage.expectCheckoutPageVisible();
  });

});
