# Playwright Automation Framework (UI + API)

This is a lightweight test automation framework using [Playwright](https://playwright.dev/) for both UI and API testing. It is integrated with CI/CD for automatic test execution.

## Features

- UI testing with Playwright (Chromium, Firefox, WebKit)
- API testing using Playwright's request API
- Simple Page Object Model (POM)
- Environment-based configuration
- Test tags (e.g., @smoke, @regression)
- HTML reports and trace generation
- CI/CD integration (e.g., GitHub Actions, GitLab CI, Jenkins)


## Getting Started

Install dependencies:
npm install

Run all tests:
npx playwright test

Run only UI or API tests:
npx playwright test tests/ui
npx playwright test tests/api

Run tests by tag:
npx playwright test --grep @smoke

Open HTML report:
npx playwright show-report



## CI/CD
Tests are automatically executed on push  request via CI (e.g., GitHub Actions). Test results, traces, and reports are uploaded as artifacts.
