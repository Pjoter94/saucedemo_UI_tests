# SauceDemo Automation Tests

## Overview
This project contains automated UI tests for the [SauceDemo](https://www.saucedemo.com/) web application. The tests are written in TypeScript and Playwright.

## Features
- Automated end-to-end UI tests
- Page Object Model structure
- Easy configuration and extensibility
- Detailed test reports

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation
```bash
git clone https://github.com/Pjoter94/saucedemo_UI_tests.git
cd saucedemo_UI_tests
npm install
```

## Running Tests
```bash
npm test
```
Or, to run a specific test file:
```bash
npx playwright path/to/testfile.ts
```

## Project Structure
```
.
├── src/
│   ├── pages/        # Page Object Models
│   ├── models/       # Data models and type definitions
│   └── utils/        # Utilities and helpers
├── tests/        # Test cases
├── package.json
├── tsconfig.json
└── README.md
```

