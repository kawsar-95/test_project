# Conduit Playwright Testing Framework

<div align="center">

A comprehensive, production-ready end-to-end testing framework built with **Playwright** and **TypeScript** for testing the [Conduit application](https://conduit.bondaracademy.com/).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.56-green.svg)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Test Scenarios](#test-scenarios)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This framework provides a robust testing solution for the Conduit application, implementing industry best practices including:

- **Page Object Model (POM)** for maintainable and scalable test code
- **Session Management** for optimized test execution
- **Dynamic Test Data** generation to prevent test conflicts
- **API Integration** for efficient pre-condition setup
- **Cross-Browser Testing** across Chromium, Firefox, and WebKit
- **Comprehensive Reporting** with Allure and HTML reports

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧪 **Comprehensive Test Coverage** | Positive and negative test cases for all major scenarios |
| 🔐 **Session Management** | Reusable authenticated sessions to optimize test execution |
| 📄 **Page Object Model** | Clean separation of page objects, utilities, and test data |
| 🎲 **Dynamic Test Data** | Randomized test data generation using Faker.js |
| 🔌 **API Integration** | Pre-condition setup via API for efficient test execution |
| 🌐 **Cross-Browser Testing** | Support for Chromium, Firefox, and WebKit |
| ⚡ **Parallel Execution** | Optimized for parallel test runs |
| 📊 **Detailed Reporting** | Allure and HTML reports with screenshots and traces |
| 🔄 **CI/CD Integration** | GitHub Actions workflow for automated testing |
| 🛡️ **Resilient Tests** | Flexible locators and retry mechanisms |

---

## 📝 Test Scenarios

### Positive Test Cases

1. **Create New Article** - Create and publish a new article with validation
2. **Edit Article** - Edit an existing article (created via API pre-condition)
3. **Delete Article** - Delete an existing article (created via API pre-condition)
4. **Filter Articles by Tag** - Filter articles using tag filters
5. **Update User Settings** - Update user profile settings

### Negative Test Cases

Each scenario includes comprehensive negative test cases covering:

- Empty/invalid inputs
- Validation errors
- Edge cases
- Error handling
- Boundary conditions

---

## 📁 Project Structure

```
.
├── src/
│   ├── pages/                    # Page Object Models
│   │   ├── BasePage.ts           # Base page with common methods
│   │   ├── LoginPage.ts          # Login page interactions
│   │   ├── SignupPage.ts         # Signup page interactions
│   │   ├── HomePage.ts           # Home page interactions
│   │   ├── ArticlePage.ts        # Article page interactions
│   │   └── SettingsPage.ts       # Settings page interactions
│   ├── utils/                    # Utility functions
│   │   ├── apiHelper.ts          # API interaction helpers
│   │   ├── testDataGenerator.ts  # Dynamic test data generation
│   │   ├── sessionManager.ts     # Session management utilities
│   │   ├── constants.ts          # Application constants
│   │   ├── safepageoperation.ts  # Safe page operations
│   │   └── uiAssertions.ts       # UI assertion helpers
│   └── fixtures/                 # Playwright fixtures
│       └── authFixture.ts        # Authentication fixture
├── tests/                        # Test specifications
│   ├── create-article.spec.ts
│   ├── edit-article.spec.ts
│   ├── delete-article.spec.ts
│   ├── filter-articles-by-tag.spec.ts
│   └── update-user-settings.spec.ts
├── scripts/                      # Utility scripts
│   ├── bootstrapUser.ts          # User bootstrap script
│   └── generate-allure-report.js # Allure report generation
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD pipeline configuration
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd test-main
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

This will install Chromium, Firefox, and WebKit browsers required for testing.

### Step 4: Bootstrap Test User (Recommended)

Bootstrap a reusable test user to optimize test execution:

```bash
npm run bootstrap:user
```

This command:
- Registers a dedicated Conduit account
- Saves the storage state in `.auth/user.json`
- Stores credentials in `.auth/credentials.json`
- Allows subsequent test runs to reuse the session

**To regenerate the account:**
```bash
FORCE_BOOTSTRAP=true npm run bootstrap:user
```

### Step 5: Configure Environment Variables

You need valid test account credentials for the Conduit application.

**Option 1: Create a `.env` file** (recommended, not tracked in git):

```bash
# Create .env file in the root directory
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password
```

**Option 2: Set environment variables in your shell:**

**Windows (PowerShell):**
```powershell
$env:TEST_EMAIL="your-test-email@example.com"
$env:TEST_PASSWORD="your-test-password"
```

**Windows (CMD):**
```cmd
set TEST_EMAIL=your-test-email@example.com
set TEST_PASSWORD=your-test-password
```

**Linux/macOS:**
```bash
export TEST_EMAIL=your-test-email@example.com
export TEST_PASSWORD=your-test-password
```

> **Note:** Ensure you have valid credentials for the Conduit application at https://conduit.bondaracademy.com/

---

## ⚙️ Configuration

### Playwright Configuration

The `playwright.config.ts` file includes:

- **Base URL**: `https://conduit.bondaracademy.com`
- **Timeout Settings**: 60 seconds for tests and actions
- **Retry Configuration**: 2 retries on CI, 0 locally
- **Reporter Configuration**: HTML, List, Allure, and JSON reporters
- **Cross-Browser Setup**: Chromium, Firefox, and WebKit projects
- **Failure Artifacts**: Screenshots, videos, and traces captured on failure

### Test Data Generation

The framework uses `@faker-js/faker` for generating:

- Article titles, descriptions, and bodies
- User credentials and profile data
- Tags and other dynamic content
- Invalid data for negative testing

---

## 🏃 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

View tests running in the browser:

```bash
npm run test:headed
```

### Run Tests with UI Mode

Interactive test runner with time-travel debugging:

```bash
npm run test:ui
```

### Run Tests for Specific Browser

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### Run Specific Test File

```bash
npx playwright test tests/create-article.spec.ts
```

### Run Tests in Debug Mode

Step through tests with Playwright Inspector:

```bash
npm run test:debug
```

### Run Tests with Specific Tags

```bash
# Run only smoke tests
npx playwright test --grep @smoke

# Run only critical tests
npx playwright test --grep @critical
```

---

## 📊 Test Reports

### HTML Report

View the interactive HTML report after running tests:

```bash
npm run test:report
```

The report includes:
- Test execution timeline
- Screenshots on failure
- Video recordings
- Trace files for debugging

### Allure Report

Generate and view comprehensive Allure reports:

```bash
# Generate report
npm run test:allure:generate

# Serve report (opens in browser)
npm run test:allure:serve
```

The Allure report provides:
- Detailed test execution history
- Test case categorization
- Duration trends
- Failure analysis
- Screenshots and attachments

---

## 🔄 CI/CD Integration

The framework includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- ✅ Runs tests on push and pull requests to `main`, `master`, and `develop` branches
- ✅ Tests across all browsers (Chromium, Firefox, WebKit)
- ✅ Generates and uploads test reports as artifacts
- ✅ Captures screenshots, videos, and traces on failure
- ✅ Generates Allure reports in a separate job

### Setting up GitHub Secrets

For CI/CD to work properly, add the following secrets to your GitHub repository:

1. Navigate to your repository on GitHub
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   | Secret Name | Description | Example |
   |------------|-------------|---------|
   | `TEST_EMAIL` | Test account email | `test@example.com` |
   | `TEST_PASSWORD` | Test account password | `SecurePassword123!` |

### Viewing CI/CD Results

After a workflow runs:

1. Go to the **Actions** tab in your GitHub repository
2. Click on the workflow run
3. Download artifacts:
   - `playwright-report` - HTML test report
   - `allure-report` - Allure test report
   - `test-results` - Screenshots, videos, and traces
   - `allure-results` - Raw Allure results

---

## 🎯 Best Practices

This framework implements the following best practices:

### 1. Page Object Model (POM)
- All page interactions are abstracted into page objects
- Reduces code duplication and improves maintainability
- Makes tests more readable and easier to update

### 2. Separation of Concerns
- Utilities, fixtures, and test data are separated
- Clear boundaries between test logic and implementation details

### 3. Session Reuse
- Authenticated sessions are saved and reused
- Significantly reduces test execution time
- Prevents unnecessary API calls

### 4. Dynamic Test Data
- Test data is generated dynamically using Faker.js
- Prevents test conflicts and data pollution
- Enables parallel test execution

### 5. Resilient Locators
- Multiple selector strategies for reliability
- Prioritizes stable selectors (data-testid, role, etc.)
- Fallback mechanisms for dynamic content

### 6. Comprehensive Assertions
- Both UI and functional validations
- Multiple assertion points per test
- Clear error messages

### 7. Error Handling
- Proper error handling and cleanup in tests
- Graceful failure handling
- Detailed error reporting

### 8. Test Isolation
- Each test is independent with proper setup/teardown
- No test dependencies
- Can run tests in any order

---

## 🔍 Troubleshooting

### Tests are Flaky

If tests are intermittently failing:

1. **Increase timeout values** in `playwright.config.ts`:
   ```typescript
   timeout: 60000, // Increase if needed
   actionTimeout: 60000,
   navigationTimeout: 60000,
   ```

2. **Check network conditions** - Slow networks can cause timeouts

3. **Verify selectors are stable** - Use `data-testid` attributes when possible

4. **Enable retries** for CI environments (already configured)

### Authentication Issues

If you're experiencing authentication problems:

1. **Verify test credentials** are correct:
   ```bash
   echo $TEST_EMAIL
   echo $TEST_PASSWORD
   ```

2. **Check if session storage** is being saved correctly:
   - Verify `.auth/user.json` exists
   - Check file permissions

3. **Ensure API endpoints** are accessible:
   - Test the Conduit API directly
   - Check network connectivity

4. **Regenerate session** if needed:
   ```bash
   FORCE_BOOTSTRAP=true npm run bootstrap:user
   ```

### Browser Installation Issues

If browsers fail to install:

```bash
# Force reinstall all browsers
npx playwright install --force

# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### TypeScript Compilation Errors

If you encounter TypeScript errors:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Allure Report Not Generating

If Allure reports fail to generate:

1. **Verify Allure CLI is installed**:
   ```bash
   npm install -g allure-commandline
   ```

2. **Check for allure-results directory**:
   ```bash
   ls -la allure-results/
   ```

3. **Generate report manually**:
   ```bash
   allure generate allure-results --clean -o allure-report
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Structure

1. **Follow the existing code structure**:
   - Use Page Object Model pattern
   - Place utilities in `src/utils/`
   - Add new page objects in `src/pages/`

2. **Add appropriate assertions**:
   - Include both positive and negative test cases
   - Validate UI and functional behavior
   - Add meaningful error messages

3. **Include both positive and negative test cases**:
   - Test happy paths
   - Test error scenarios
   - Test edge cases

4. **Update documentation**:
   - Update README.md if adding new features
   - Add comments for complex logic
   - Document new utilities or helpers

### Development Workflow

1. Create a feature branch from `main`
2. Write tests following existing patterns
3. Ensure all tests pass locally
4. Update documentation as needed
5. Submit a pull request with a clear description

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (run `npm run lint`)
- Format code with Prettier (run `npm run format`)
- Use meaningful variable and function names

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Powerful browser automation
- [Faker.js](https://fakerjs.dev/) - Dynamic test data generation
- [Allure](https://allure.qatools.ru/) - Comprehensive test reporting

---

<div align="center">

**Built with ❤️ using Playwright and TypeScript**


</div>
