import { test, expect } from '@playwright/test';

import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import AccountsPage from '../page/accountPage.js';

import { userdata } from '../page/dataset.json';


test.describe('Accounts Page Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickAccounts();

    });

    test('Checking Elements in Accounts page', async ({ page }) => {
        const accountPage = new AccountsPage(page);
        await expect(page).toHaveURL(/accounts/);
        await expect(accountPage.accountHeading).toBeVisible();
        await expect(accountPage.accountMessage).toBeVisible();
        await expect(accountPage.addAccountBtn).toBeVisible();
        await expect(accountPage.accountsTbl).toBeVisible();
    })
    test('Checking view accounts options', async ({ page }) => {
        const accountPage = new AccountsPage(page);
        await accountPage.clickViewBtn();
        await expect(accountPage.allAccountsBtn).toBeVisible();
        await expect(accountPage.individualAccHeading).toBeVisible();
        await accountPage.backToAllAccounts();
        await expect(page).toHaveURL(/accounts/);
        await expect(accountPage.accountHeading).toBeVisible();
    })
    test('edit account modal checking', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickEditBtn();
        await accountpage.clickEditCancelBtn();
        await expect(accountpage.accountHeading).toBeVisible();

        await accountpage.clickEditBtn();
        await accountpage.clickEditCloceBtn();
        await expect(accountpage.accountHeading).toBeVisible();

        await accountpage.clickEditBtn();
        await accountpage.fillEditAccountName();
        await accountpage.fillEditAccountType();
        await accountpage.fillEditAccountBalance();
        await accountpage.clickEditAddAccountBtn();
        await expect(accountpage.accountHeading).toBeVisible();
        await expect(accountpage.changeCheck).toBeVisible()
    })
    test('add account modal checking', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.clickCancelBtn();
        await expect(accountpage.accountHeading).toBeVisible();
        await page.waitForTimeout(500);
        await accountpage.clickAddAccountBtn();
        await accountpage.clickCloceBtn();
        await expect(accountpage.accountHeading).toBeVisible();
        await page.waitForTimeout(500);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountName();
        await accountpage.fillAccountType();
        await accountpage.fillAccountBalance();
        await accountpage.checkTerms();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.accountHeading).toBeVisible();
    })

    test('delete element modal checking', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await page.waitForTimeout(3000);
        const counts = await page.getByTestId('accounts-table').locator('tbody tr').count();
        const beforeDeletecount = counts;
        await accountpage.clickDeleteBtn();
        await accountpage.clickDeleteCancelBtn();
        await accountpage.clickDeleteBtn();
        await accountpage.clickDeleteCloceBtn();
        await accountpage.clickDeleteBtn();
        await accountpage.clickAccountDeleteBtn();
        await page.waitForTimeout(3000);
        const afterCounts = await page.getByTestId('accounts-table').locator('tbody tr').count();
        await expect(afterCounts).toEqual(beforeDeletecount - 1);
    })

    //negative tests
    test('edit account without account name and balance', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickEditBtn();
        await accountpage.fillEditAccountNameEmpty();
        await accountpage.fillEditAccountBalanceEmpty();
        await accountpage.clickEditAddAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter an account name.")

    })

    test('edit account without account name', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickEditBtn();
        await accountpage.fillEditAccountNameEmpty();
        await accountpage.clickEditAddAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter an account name.")

    })

    test('edit account without account balance', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickEditBtn();
        await accountpage.fillEditAccountBalanceEmpty();
        await accountpage.clickEditAddAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter a valid starting balance.")

    })

    test('add account without acount details', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountNameEmpty();
        await accountpage.fillAccountBalanceEmpty();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter an account name.")

    })

    test('add account without account name', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountNameEmpty();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter an account name.")

    })

    test('add account without account type', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountName();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please select an account type.")

    })

    test('add account without account balance', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountName();
        await accountpage.fillAccountType();
        await accountpage.fillAccountBalanceEmpty();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please enter a valid starting balance.")

    })

    test('add account without terms ', async ({ page }) => {
        const accountpage = new AccountsPage(page);
        await accountpage.clickAddAccountBtn();
        await accountpage.fillAccountName();
        await accountpage.fillAccountType();
        await accountpage.fillAccountBalance();
        await accountpage.clickSaveAccountBtn();
        await expect(accountpage.editErrorMsg).toHaveText("Please accept the terms and conditions to continue.")
    })

    //
});