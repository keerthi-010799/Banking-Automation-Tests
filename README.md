# 🏦 Banking Automation Test


A **Playwright-based end-to-end test automation framework** for a banking web application. The project follows the **Page Object Model (POM)** design pattern and covers critical banking workflows including authentication, account management, money transfers, bill payments, transactions, and loan applications.

The framework also includes **positive and negative test scenarios, assertions, failure debugging artifacts, HTML reporting, and GitHub Actions CI/CD integration**.

---

## 🎯 Project Objective

The objective of this project is to demonstrate how a real-world banking application can be tested using a maintainable and scalable automation framework.

The framework focuses on:

* Functional UI automation
* Positive and negative testing
* Page Object Model
* Reusable page methods
* Reliable Playwright locators
* Form validation testing
* Navigation testing
* Business workflow testing
* Assertions and test verification
* CI/CD integration
* Test failure debugging

---

## 🏦 Application Under Test

**Application:** QA Playground Bank Demo

**URL:** https://qaplayground.com/bank/login

The application provides realistic banking workflows suitable for practicing and demonstrating web automation testing.

---

## 🛠️ Tech Stack

| Technology        | Usage                      |
| ----------------- | -------------------------- |
| Playwright        | End-to-end test automation |
| JavaScript        | Test scripting             |
| Node.js           | Runtime environment        |
| Page Object Model | Framework design pattern   |
| JSON              | Test data management       |
| Git               | Version control            |
| GitHub            | Source code repository     |
| GitHub Actions    | CI/CD automation           |
| HTML Reporter     | Test reporting             |

---

## 🏗️ Framework Architecture

The framework follows the **Page Object Model (POM)** design pattern.

```text
Banking-Automation-Tests/
│
├── page/
│   ├── loginPage.js
│   ├── dashboardPage.js
│   ├── accountPage.js
│   ├── transactionsPage.js
│   ├── transferPage.js
│   ├── sendmoneyPage.js
│   ├── billPayPage.js
│   ├── applyLoanPage.js
│   └── dataset.json
│
├── tests/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   ├── account.spec.js
│   ├── transactions.spec.js
│   ├── transfer.spec.js
│   ├── sendmoney.spec.js
│   ├── billpay.spec.js
│   ├── applyloan.spec.js
│   └── example.spec.js
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧪 Test Coverage

### 🔐 Login

Positive scenarios:

* Login with valid credentials
* Verify successful navigation to Dashboard

Negative scenarios:

* Invalid username and password
* Empty username
* Empty password
* Empty username and password
* Verify appropriate validation messages

---

### 📊 Dashboard

The Dashboard test suite verifies:

* Dashboard page visibility
* Net worth information
* Income information
* Expense information
* Quick Actions section
* Recent Transactions section
* Navigation to Accounts
* Navigation to Transfer
* Navigation to Transactions
* Navigation to Bill Pay
* Navigation to Loan Application
* Navigation to Send Money
* Dashboard refresh behavior
* Logout functionality
* Dashboard access protection without authentication
* Dashboard protection after logout
* Browser back behavior after logout

---

### 💳 Accounts

The Accounts test suite covers:

* Accounts page elements
* Account table
* Add Account functionality
* Add Account form
* Account type selection
* Account balance entry
* Terms and conditions
* View Account functionality
* Edit Account functionality
* Edit Account cancellation
* Edit Account modal closing
* Delete Account functionality
* Delete confirmation
* Negative validation scenarios

Negative scenarios include:

* Add account without account name
* Add account without account type
* Add account without balance
* Add account without accepting terms
* Edit account without account name
* Edit account without account balance

---

### 💸 Money Transfer

The Transfer test suite covers:

* Entering transfer details
* Selecting source account
* Selecting destination account
* Entering transfer amount
* Entering transfer description
* Reviewing transfer
* Cancelling transfer confirmation
* Confirming transfer
* Successful transfer verification

Negative scenarios include:

* Transfer without source account
* Transfer without destination account
* Transfer without amount
* Transfer without transfer date

---

### 💰 Send Money

The Send Money test suite covers:

* Entering send money details
* Reviewing send money
* Cancelling confirmation
* Confirming send money
* Successful transaction verification

Payee management includes:

* Opening Add Payee form
* Entering payee details
* Saving a new payee
* Cancelling Add Payee
* Negative validation scenarios

---

### 🧾 Bill Payment

The Bill Pay test suite covers:

* Entering bill payment details
* Reviewing bill payment
* Cancelling confirmation
* Confirming bill payment
* Pay Another Bill workflow
* Opening Add Biller form
* Entering biller details
* Saving a new biller
* Cancelling Add Biller
* Closing Add Biller form

Negative scenarios include:

* Bill payment without account
* Bill payment without biller
* Bill payment without amount
* Invalid payment date

---

### 🏦 Loan Application

The Loan Application test suite covers:

* Loan page elements
* Opening loan application form
* Selecting loan type
* Entering loan amount
* Selecting disbursement account
* Selecting loan duration
* Entering interest rate
* Entering loan purpose
* Reviewing loan application
* Cancelling loan confirmation
* Closing loan application

Negative scenarios include:

* Loan application without loan type
* Loan application without loan amount
* Loan application without interest rate
* Loan application without disbursement account

---

### 📋 Transactions

The Transactions test suite covers:

* Transactions page elements
* Transaction table
* Searching transactions
* Filtering transactions by account
* Filtering credit transactions
* Filtering debit transactions
* Viewing all transactions
* Clearing filters
* Verifying filtered transaction results

---

## 🔄 Test Design

The framework separates **test logic** from **page interaction logic**.

### Page Objects

Page classes contain:

* Locators
* Navigation methods
* Form interaction methods
* Reusable actions

Example:

```javascript
class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByTestId('login-username-input');
        this.password = page.getByTestId('login-password-input');
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

### Test Specifications

Spec files contain:

* Test scenarios
* Test setup
* Assertions
* Expected behavior

This separation improves:

* Maintainability
* Reusability
* Readability
* Scalability

---

## 📊 Test Scenarios

The project includes both:

### ✅ Positive Testing

Tests verify that valid user actions successfully complete the expected banking workflows.

Examples:

* Successful login
* Successful account creation
* Successful transfer
* Successful bill payment
* Successful send money transaction
* Successful loan application workflow

### ❌ Negative Testing

Tests verify application validation and error handling.

Examples:

* Missing required fields
* Invalid credentials
* Missing account selections
* Invalid amounts
* Missing dates
* Missing loan information
* Invalid form submissions

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/keerthi-010799/Banking-Automation-Tests.git
```

### 2. Navigate to the project

```bash
cd Banking-Automation-Tests
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

Run tests using Chromium:

```bash
npx playwright test --project=chromium
```

Run a specific test by name:

```bash
npx playwright test -g "Login with valid credentials"
```

---

## 📊 Test Reports

The project uses Playwright's HTML reporter.

After execution:

```bash
npx playwright show-report
```

This opens the HTML report containing:

* Test results
* Passed tests
* Failed tests
* Test duration
* Error details
* Execution information

---

## 🐞 Failure Debugging

The Playwright configuration is set up to collect debugging artifacts.

### Screenshot

Screenshots are captured when a test fails.

### Video

Videos are retained for failed tests.

### Trace

A Playwright trace is collected when a test is retried.

These artifacts help investigate failures in both local execution and CI environments.

---

## 🔄 CI/CD with GitHub Actions

The project includes a GitHub Actions workflow:

```text
.github/
└── workflows/
    └── playwright.yml
```

The workflow runs automatically when changes are pushed to the `master` branch or when a pull request targets `master`.

### CI Pipeline

```text
Developer Push
      ↓
    GitHub
      ↓
GitHub Actions
      ↓
Checkout Repository
      ↓
Setup Node.js
      ↓
npm ci
      ↓
Install Playwright
      ↓
Run Playwright Tests
      ↓
Generate HTML Report
      ↓
Upload Report Artifact
```

The CI workflow automatically:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Installs Playwright browsers and Linux dependencies
5. Executes the test suite
6. Uploads the Playwright HTML report

---

## ⚙️ Playwright Configuration

The framework is configured with:

* Chromium browser
* Parallel execution locally
* Single worker in CI
* CI retries
* HTML reporting
* Screenshots on failure
* Video on failure
* Trace on first retry
* `forbidOnly` enabled in CI

This configuration provides faster local execution while keeping CI execution more stable and reproducible.

---

## 🔐 Test Data

Test data is maintained separately in:

```text
page/dataset.json
```

Example:

```json
{
    "userdata": {
        "username": "standard_user",
        "password": "bank_sauce"
    },
    "wrongdata": {
        "username": "wrong_user",
        "password": "wrong_password"
    }
}
```

For real-world applications, sensitive credentials should be stored using environment variables or CI/CD secrets rather than committed to source control.

---

## 🎯 Key Automation Practices Demonstrated

This project demonstrates practical SDET automation skills including:

* End-to-end testing
* Page Object Model
* Locator strategy
* Reusable page methods
* Test isolation
* Positive testing
* Negative testing
* Functional testing
* Form validation
* Navigation validation
* Data-driven test data
* Assertions
* CI/CD
* Test reporting
* Failure debugging
* Git/GitHub workflow

---

## 📈 Future Improvements

Potential improvements for further scalability include:

* Environment-based configuration
* Secure credentials using environment variables
* API testing integration
* Database validation
* Data-driven testing using external datasets
* Cross-browser testing
* Parallel CI execution
* Allure reporting
* Test tagging
* Smoke and regression test suites
* Automatic test result notifications

---

## 💼 Skills Demonstrated

This project demonstrates hands-on experience with:

**Automation**

* Playwright
* JavaScript
* End-to-end testing
* Page Object Model

**Testing**

* Functional testing
* Positive testing
* Negative testing
* Validation testing
* Regression-oriented scenarios

**DevOps**

* Git
* GitHub
* GitHub Actions
* CI/CD

**Debugging**

* Screenshots
* Video recordings
* Playwright Trace Viewer
* HTML reports

---

## 👨‍💻 Author

**Keerthivasan Lakshmanan**

SDET / QA Automation Engineer

GitHub:
https://github.com/keerthi-010799

---

## ⭐ Project Highlights

> A maintainable Playwright automation framework designed around real-world banking workflows, covering authentication, account management, transactions, money movement, bill payments, and loan applications with both positive and negative scenarios.

**Built with Playwright + JavaScript + Page Object Model + GitHub Actions CI/CD.**
