# SauceDemo - Tests E2E

Suite de tests End-to-End automatisés de SauceDemo développée avec Playwright et TypeScript.

## Technologies

- Playwright
- TypeScript
- Node.js
- Git

## Structure du projet

saucedemo-e2e/
├── data/  
├── docs/
│   └── test-plan.md 
├── fixtures/
├── helpers/               
├── pages/
├── tests/
├── playwright.config.ts
├── package.json
└── README.md

## Exécution des tests

Tous les tests : 
```
npx playwright test 
```
Tests critiques : 
```
npx playwright test --grep @smoke
```
Rapport d'exécution :
```
npx playwright show-report
```