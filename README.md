# Automation QA using Cypress Testing Tools

This project is testing the following items:

1.  JSONPlaceholder.com Post API resource
2.  Google Flights, which presently is encountering consent error.


## Auto execution
   
This project is executed every hour [here](https://github.com/clypic/aqa_cypress/actions): [![Execute Tests](https://github.com/clypic/aqa_cypress/actions/workflows/run.yml/badge.svg)](https://github.com/clypic/aqa_cypress/actions/workflows/run.yml)


## Getting Started

1. Clone project locally

  ```bash
  git clone git@github.com:clypic/aqa_cypress.git
  ```

2.  Install NPM packages

  ```bash
  cd aqa_cypress
  npm install
  ```

3.  Run Eslint

  ```bash
  npm run test:lint
  ```

4.  Run API tests

  ```bash
  npm run prd:test:jsonplaceholder
  ```

5.  Run Browser tests

  ```bash
  npm run prd:test:test:googleflights
  ```


## Architecture

Key points:

1.  Using Cypress and TypeScript
2.  Environment definition files
3.  Using Fixtures and Support libraries for maintainability and reference
3.  Application Static testing using ESLint
4.  API testing using JSON schema validation for body testing
5.  Browser application testing
6.  Separation of concerns: Google Flights and JSONPlaceholder are treated separately.

### JSONPlaceholder

1.  Test isolation
2.  JSON body validated by JSON schema.
3.  Call duration is automatically tested by Cypress request function.


### Google Flights

Selector choice:

1.  Using selectors that find the element rather then strict nesting;
2.  Prefer ARIA (accessibility) compliant selectors;
3.  All selectors are listed in `selectors.json` fixture, for fast maintenance;
4.  Mock backend API for consistent presentation;
5.  Test isolation. A test does not require other tests to be successful.


## Project structure

Directory         | Description
---               | ---
`/cypress/config`   | Environment configuration files
`/cypress/e2e`      | Test files
`/cypress/fixtures`  | Data used in tests
`/cypress/support`   | Test functions
`/cypress.config.ts` | Main configuration file for all tests.
`/cypress.env.json`   | List of all environment variable for default values and reference.
`/eslint.config.ts`   | Main configuration file for static tests.
`/package.json`       | Node package configuration file.
`/package-lock.json`   | Node package version dependency map file.
`/tsconfig.json`      | Main configuration file for TypeScript transpiling.


##  ToDo list

1.  Get passed Google Flights consent form;
2.  Screenshot validation, of whole page, or more commonly, component;
3.  video recording of the entire test for troubleshooting and evidence;
4.  HTML report for a consolidate test execution with all the evidence.
