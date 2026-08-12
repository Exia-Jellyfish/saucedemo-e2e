# Plan de tests E2E - SauceDemo

## 1. Objectif

Réalisation de tests automatisés sur une plateforme de e-commerce en ligne (Saucedemo).
L'objectif est de réaliser des tests automatisés de bout en bout.

## 2. Périmètre

- Authentification
- Catalogue produits
- Tri des produits
- Ajout au panier
- Suppression du panier
- Checkout
- Validation des informations client
- Finalisation d'une commande

## 3. Stratégie

Les tests sont réalisés avec Playwright et TypeScript.

Les tests suivent les principaux parcours utilisateur de la plateforme.

## 4. Environnements

Environnement cible :
https://www.saucedemo.com/

Navigateur principal :
Chromium

## 5. Données de test

Les utilisateurs, produits et données de checkout sont
centralisés dans le répertoire `data/`.

## 6. Cas de test

| ID           | Domaine          | Scénario                                  | Résultat attendu                                                  |
| ------------ | ---------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| AUTH-001     | Authentification | Connexion avec identifiants valides       | L'utilisateur accède au catalogue                                 |
| AUTH-002     | Authentification | Connexion avec mauvais mot de passe       | Un message d'erreur est affiché                                   |
| AUTH-003     | Authentification | Connexion avec utilisateur inexistant     | Un message d'erreur est affiché                                   |
| AUTH-004     | Authentification | Connexion avec username vide              | Un message d'erreur est affiché                                   |
| AUTH-005     | Authentification | Connexion avec un password vide           | Un message d'erreur est affiché                                   |
| PROD-001     | Catalogue        | Affichage du catalogue                    | Les produits sont affichés dans le catalogue                      |
| PROD-002     | Catalogue        | Vérification des informations d'un produit| Le nom et le prix du produit correspondent aux informations       |
| PROD-003     | Catalogue        | Accès au détail d'un produit              | La page du produit sélectionné est affichée avec le bon produit   |
| PROD-004     | Catalogue        | Tri des produits par prix croissant       | Les produits sont affichés dans l'ordre de prix croissant         |
| PROD-005     | Catalogue        | Tri des produits par prix décroissant     | Les produits sont affichés dans l'ordre de prix décroissant       |
| PROD-006     | Catalogue        | Tri des produits par nom A-Z              | Les produits sont affichés par ordre alphabétique                 |
| PROD-007     | Catalogue        | Tri des produits par nom Z-A              | Les produits sont affichés par ordre alphabétique inverse         |
| CART-001     | Panier           | Ajouter un produit au panier              | Le produit est ajouté au panier et est présent dans le panier     |
| CART-002     | Panier           | Ajouter plusieurs produits au panier      | Les 3 produits sont ajoutés au panier et correctement affichés    |
| CART-003     | Panier           | Suppression d'un produit                  | Le produit est supprimé du panier et le panier devient vide       |
| CART-004     | Panier           | Ouverture du panier                       | La page du panier est correctement affichée                       |
| CART-005     | Panier           | Vérification du produit ajouté            | Le produit ajouté est présent dans le panier                      |
| CART-006     | Panier           | Vérification du prix du produit           | Le prix affiché dans le panier correspond au prix attendu         |
| CART-007     | Panier           | Retour au catalogue                       | L'utilisateur revient sur la page du catalogue                    |
| CART-008     | Panier           | Accès au checkout                         | L'utilisateur accède à la page de checkout                        |
| CHECKOUT-001 | Checkout         | Ouverture du checkout                     | Le formulaire d'informations client est affiché                   |
| CHECKOUT-002 | Checkout         | Informations client valides               | L'utilisateur accède à l'étape de récapitulatif                   |
| CHECKOUT-003 | Checkout         | Prénom vide                               | Un message d'erreur indique que le prénom est requis              |
| CHECKOUT-004 | Checkout         | Nom vide                                  | Un message d'erreur indique que le nom est requis                 |
| CHECKOUT-005 | Checkout         | Code postal vide                          | Un message d'erreur indique que le code postal est requis         |
| CHECKOUT-006 | Checkout         | Vérification du récapitulatif et des prix | Les produits, le sous-total, la taxe et le total sont corrects    |
| CHECKOUT-007 | Checkout         | Finalisation de la commande               | La confirmation de commande est affichée                          |
| CHECKOUT-008 | Checkout         | Checkout avec plusieurs produits          | Tous les produits sélectionnés sont présents dans le récapitulatif|
| CHECKOUT-009 | Checkout         | Calcul du total avec plusieurs produits   | Le sous-total et le total sont correctement calculés              |
| CHECKOUT-010 | Checkout         | Annulation du checkout                    | L'utilisateur revient au panier et les produits sont conservés    |
| CHECKOUT-011 | Checkout         | Checkout avec panier vide                 | L'utilisateur peut accéder au checkout avec un panier vide        |
| CHECKOUT-012 | Checkout         | Panier vidé après finalisation d'une commande  | Le panier est vide après la finalisation de la commande      |


## 7. Critères d'entrée

- Application accessible
- Données de test disponibles
- Environnement fonctionnel

## 8. Critères de sortie

- Tests critiques passants
- Aucun défaut bloquant connu
- Rapport d'exécution disponible

## 9. Maintenance

Les interactions avec l'interface sont centralisées dans les Page Objects afin de limiter l'impact des évolutions du DOM.