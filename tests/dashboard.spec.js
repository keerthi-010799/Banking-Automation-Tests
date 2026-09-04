import { test, expect } from '@playwright/test';
import { userdata } from '../page/dataset.json';

import LoginPage from '../page/loginPage';
import DashboardPage from '../page/dashboardPage';


test.describe('Bank Dashboard Tests', () => {
    // Login before every authenticated dashboard test
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
    });

    test('Verify user can access Dashboard after login', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.financialOverview).toBeVisible();
    });

    test('Verify financial summary cards are displayed', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.totalNetWorth).toBeVisible();
        await expect(dashboardPage.netChange).toBeVisible();
        await expect(dashboardPage.income).toBeVisible();
        await expect(dashboardPage.expenses).toBeVisible();
    });

    test('Verify Quick Actions section is displayed', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.quickActionsHeading).toBeVisible();
        await expect(dashboardPage.transferMoney).toBeVisible();
        await expect(dashboardPage.sendMoney).toBeVisible();
        await expect(dashboardPage.payABill).toBeVisible();
        await expect(dashboardPage.applyForLoan).toBeVisible();
        await expect(dashboardPage.transactionsQuickAction).toBeVisible();
    });

    test('Verify Recent Transactions section is displayed', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.recentTransactionsHeading).toBeVisible();
        await expect(dashboardPage.viewAllTransactions).toBeVisible();
    });

    test('Verify Accounts navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickAccounts();
        await expect(page).toHaveURL(/accounts/);
    });

    test('Verify Transfer navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickTransfer();
        await expect(page).toHaveURL(/transfer/);
    });

    test('Verify Transactions navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickTransactions();
        await expect(page).toHaveURL(/transactions/);
    });

    test('Verify pay bill navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickPaybill();
        await expect(page).toHaveURL(/bill-pay/);
    });

    test('Verify apply loan navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickApplyLoan();
        await expect(page).toHaveURL(/apply-loan/);
    });

    test('Verify send money navigation from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickSendMoney();
        await expect(page).toHaveURL(/send-money/);
    });


    test('Verify Dashboard after page refresh', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickDashboard();
        await page.reload();
        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.totalNetWorth).toBeVisible();
    });

    test('Verify user can logout from Dashboard', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickLogout();
        await expect(page).toHaveURL(/login/);
    });

    //negative tests
    test('Verify user cannot access Dashboard without login', async ({ page }) => {
        await page.goto('https://qaplayground.com/bank/dashboard');
        await page.waitForURL('https://qaplayground.com/bank/login');
        await expect(page).toHaveURL('https://qaplayground.com/bank/login');
    });

    test('Verify Dashboard cannot be accessed after logout', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickLogout();
        await page.goto('https://qaplayground.com/bank/dashboard');
        await expect(page).toHaveURL(/login/);
    });
    test('Verify Dashboard is not accessible using browser back after logout', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await expect(page).toHaveURL(/dashboard/);
        await dashboardPage.clickLogout();
        await page.goBack();
        await expect(page).toHaveURL(/login/);
    });

    test('Verify Dashboard is not accessible after logout and refresh', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickLogout();
        await page.reload();
        await expect(page).toHaveURL(/login/);
    });
});