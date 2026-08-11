import { test, expect } from '../fixtures/test.fixture';
import { products } from '../data/products';

test.describe('Catalogue produits SauceDemo', () => {

  test('PROD-001 - Affichage du catalogue', async ({ inventoryPage }) => {

    await inventoryPage.expectInventoryPageVisible();

    await inventoryPage.expectProductsCount(6);

    await inventoryPage.expectProductVisible(products.backpack.name);
    await inventoryPage.expectProductVisible(products.bikeLight.name);
    await inventoryPage.expectProductVisible(products.boltTShirt.name);
    await inventoryPage.expectProductVisible(products.fleeceJacket.name);
    await inventoryPage.expectProductVisible(products.onesie.name);
    await inventoryPage.expectProductVisible(products.redTShirt.name);
  });


  test('PROD-002 - Vérification des informations d’un produit', async ({ inventoryPage }) => {

    await inventoryPage.expectProductInformation(
      products.backpack.name,
      products.backpack.price
    );
  });


  test('PROD-003 - Accès au détail d’un produit', async ({ inventoryPage }) => {

    await inventoryPage.clickProduct(products.backpack.name);

    await inventoryPage.expectProductDetailPage(
      products.backpack.name
    );
  });


  test('PROD-004 - Tri des produits par prix croissant', async ({ inventoryPage }) => {

    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });


  test('PROD-005 - Tri des produits par prix décroissant', async ({ inventoryPage }) => {

    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test('PROD-006 - Tri des produits par nom A-Z', async ({ inventoryPage }) => {

    await inventoryPage.sortBy('az');

    const names = await inventoryPage.getProductNames();

    const sortedNames = [...names].sort((a, b) =>
        a.localeCompare(b)
    );

    expect(names).toEqual(sortedNames);
});

  test('PROD-007 - Tri des produits par nom Z-A', async ({ inventoryPage }) => {

    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getProductNames();

    const sortedNames = [...names].sort((a, b) =>
        b.localeCompare(a)
    );

    expect(names).toEqual(sortedNames);
});


});

