import { test, expect } from '@playwright/test';

import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import TransactionsPage from '../page/transactionsPage.js';
import { userdata } from '../page/dataset.json';

test.describe('Transactions Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickTransactions();
    });

    test('Verify Transactions page elements', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);
        await expect(transactionsPage.transactionHeading).toBeVisible();
        await expect(transactionsPage.transactionMessage).toBeVisible();
        await expect(transactionsPage.searchInput).toBeVisible();
        await expect(transactionsPage.accountFilterSelect).toBeVisible();
        await expect(transactionsPage.creditsButton).toBeVisible();
        await expect(transactionsPage.debitsButton).toBeVisible();
        await expect(transactionsPage.allButton).toBeVisible();
        await expect(transactionsPage.transactionTable).toBeVisible();
    });

    test('Verify user can search transactions', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);
        await transactionsPage.fillSearchInput('Transfer');
        await expect(transactionsPage.searchInput).toHaveValue('Transfer');
        await expect(transactionsPage.clearAllFiltersBtn).toBeVisible();

        const texts = await transactionsPage.tableRows.allTextContents();
        expect(texts.length).toBeGreaterThan(0);

        for (const text of texts) {
            expect(text).toContain('Transfer');
        }

    });

    test('Verify user can filter transactions by account', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);
        await transactionsPage.selectEverydayChecking();
        await expect(transactionsPage.clearAllFiltersBtn).toBeVisible();
        const count = await transactionsPage.accountColumnCells.count();
        //check if all the account column cells contain 'Everyday Checking'
        for (let i = 0; i < count; i++) {
            await expect(transactionsPage.accountColumnCells.nth(i)).toHaveText('Everyday Checking');
        }
        await transactionsPage.selectHighYieldSavings();
        const countSavings = await transactionsPage.accountColumnCells.count();
        //check if all the account column cells contain 'High-Yield Savings'
        for (let i = 0; i < countSavings; i++) {
            await expect(transactionsPage.accountColumnCells.nth(i)).toHaveText('High-Yield Savings');
        }
    });

    test('Verify user can filter transactions by type', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);
        await transactionsPage.clickCreditsButton();
        await expect(transactionsPage.clearAllFiltersBtn).toBeVisible();
        const count = await transactionsPage.amountCells.count();
        //check if all the credit amount cells start with '+'
        for (let i = 0; i < count; i++) {
            const text = await transactionsPage.amountCells.nth(i).innerText();
            expect(text.trim().startsWith('+')).toBeTruthy();
        }

        await transactionsPage.clickDebitsButton();
        const countDebits = await transactionsPage.amountCells.count();
        //check if all the debit amount cells start with '-'
        for (let i = 0; i < countDebits; i++) {
            const text = await transactionsPage.amountCells.nth(i).innerText();
            expect(text.trim().startsWith('-')).toBeTruthy();
        }

        await transactionsPage.clickAllButton();
        await expect(transactionsPage.allButton).toBeVisible();
    });

    test('Verify clear all filters function', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);
        await transactionsPage.selectEverydayChecking();
        await transactionsPage.clickCreditsButton();
        await transactionsPage.fillSearchInput('Transfer');
        await transactionsPage.clickClearAllFiltersBtn();
        await expect(transactionsPage.searchInput).toHaveValue('');
        await expect(transactionsPage.clearAllFiltersBtn).toBeHidden();
        await expect(transactionsPage.accountFilterSelect).toHaveText('all▼');
        await expect(transactionsPage.allButton).toHaveAttribute('aria-pressed', 'true');

    });

});