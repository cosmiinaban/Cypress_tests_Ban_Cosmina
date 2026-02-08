# Cypress Project — Ban_Cosmina
A small Cypress test suite for eMAG and AirportLabs flows.

## Cypress version
- Uses Cypress: 15.7.1 (see `devDependencies` in `package.json`).

## Prerequisites
- Node.js (recommended v18 LTS)
- npm (bundled with Node.js)

## Install
From the repository root, run:

```bash
npm ci
```

## Run tests
- Open interactive Cypress Test Runner:

```bash
npx cypress open
```

- Run the full suite headlessly:

```bash
npx cypress run
```

- Run a single spec (example):

```bash
npx cypress run --spec "cypress/e2e/emag.cy.js"
```

## Project structure
- `cypress/e2e/` — Test specs (E2E flows). Example specs:
  - `emag.cy.js` — eMAG shopping flow (add to cartv TV + accessory)
  - `airport.cy.js` — AirportLabs frontpage checks

- `cypress/pages/` — Page objects encapsulating selectors and helpers
  - `EmagPage.js`
  - `AirportPage.js`

- `cypress/support/` — Shared commands and setup
  - `commands.js` — custom Cypress commands

- `cypress/fixtures/` — Test data (JSON fixtures)

