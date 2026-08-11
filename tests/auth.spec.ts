import { expect } from '@playwright/test';
import { test } from '../fixtures/test.fixture';
import { users } from '../data/users';

test.describe('Authentification SauceDemo', () => {

  test('AUTH-001 - Connexion avec identifiants valides', async ({ loginPage }) => {

    await loginPage.expectLoginPageVisible();

    await loginPage.login(
      users.valid.username,
      users.valid.password
    );

    await expect(loginPage.page).toHaveURL(/inventory\.html/);
    await expect(loginPage.page.getByText('Products')).toBeVisible();
  });


  test('AUTH-002 - Connexion avec un mauvais mot de passe', async ({ loginPage }) => {

    await loginPage.expectLoginPageVisible();

    await loginPage.login(
      users.invalidPassword.username,
      users.invalidPassword.password
    );

    await loginPage.expectErrorMessage(
      'Username and password do not match any user in this service'
    );

    await loginPage.expectLoginPageUrl();
  });


  test('AUTH-003 - Connexion avec un utilisateur inexistant', async ({ loginPage }) => {

    await loginPage.expectLoginPageVisible();

    await loginPage.login(
      users.unknownUser.username,
      users.unknownUser.password
    );

    await loginPage.expectErrorMessage(
      'Username and password do not match any user in this service'
    );

    await loginPage.expectLoginPageUrl();
  });


  test('AUTH-004 - Connexion avec un username vide', async ({ loginPage }) => {

    await loginPage.expectLoginPageVisible();

    await loginPage.login(
      users.emptyUsername.username,
      users.emptyUsername.password
    );

    await loginPage.expectErrorMessage(
      'Username is required'
    );

    await loginPage.expectLoginPageUrl();
  });


  test('AUTH-005 - Connexion avec un password vide', async ({ loginPage }) => {

    await loginPage.expectLoginPageVisible();

    await loginPage.login(
      users.emptyPassword.username,
      users.emptyPassword.password
    );

    await loginPage.expectErrorMessage(
      'Password is required'
    );

    await loginPage.expectLoginPageUrl();
  });

});