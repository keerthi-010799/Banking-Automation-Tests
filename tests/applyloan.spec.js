import { test, expect } from '@playwright/test';

import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import ApplyLoanPage from '../page/applyLoanPage.js';
import { userdata } from '../page/dataset.json';

test.describe('Apply Loan Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickApplyLoan();
    });

    test('verify elements on apply loan page', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await expect(applyLoanPage.applyLoanHeading).toBeVisible();
        await expect(applyLoanPage.ApplyLoanMessage).toBeVisible();
        await expect(applyLoanPage.resetButton).toBeVisible();
        await expect(applyLoanPage.openApplyLoanButton).toBeVisible();
        await expect(applyLoanPage.applLoanFilters).toBeVisible();
        await expect(applyLoanPage.loanTable).toBeVisible();
    });

    test('Verify user can open loan application form', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await expect(applyLoanPage.loanTypeSelect).toBeVisible();
    });

    test('Verify user can enter loan application details', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.fillLoanDetails(
            'Auto',
            2022,
            'Everyday Checking — $',
            '24 months',
            4.6,
            'Build a Farm'
        );
        await expect(applyLoanPage.loanAmountInput).toHaveValue('2022');
        await expect(applyLoanPage.loanInterestRateInput).toHaveValue('4.6');
        await expect(applyLoanPage.loanPurposeInput).toHaveValue('Build a Farm');
    });

    test('Verify user can review loan application', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.fillLoanDetails(
            'Auto',
            2022,
            'Everyday Checking — $',
            '24 months',
            4.6,
            'Build a Farm'
        );
        await applyLoanPage.reviewLoan();
        await expect(applyLoanPage.cancelLoanButton).toBeVisible();
    });

    test('Verify user can cancel loan confirmation', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);

        await applyLoanPage.openLoanForm();
        await applyLoanPage.fillLoanDetails(
            'Auto',
            2022,
            'Everyday Checking — $',
            '24 months',
            4.6,
            'Build a Farm'
        );
        await applyLoanPage.reviewLoan();
        await applyLoanPage.cancelLoanConfirmation();
        await expect(applyLoanPage.cancelLoanButton).not.toBeVisible();
    });

    test('Verify user can close loan application', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.closeLoan();
        await expect(applyLoanPage.loanTypeSelect).not.toBeVisible();
    });

    //negative tests

    test('Verify user cannot review loan application without selecting a loan type', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.reviewLoan();
        await expect(applyLoanPage.loanErrorMessage).toHaveText('Please select a loan type.');
    });

    test('Verify user cannot review loan application without entering a loan amount', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.selectLoanType('Auto');
        await applyLoanPage.reviewLoan();
        await expect(applyLoanPage.loanErrorMessage).toHaveText('Please enter a valid loan amount.');
    });

    test('Verify user cannot review loan application without selecting a interest rate', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.selectLoanType('Auto');
        await applyLoanPage.enterLoanAmount(2022);
        await applyLoanPage.enterInterestRateEmpty();
        await applyLoanPage.reviewLoan();
        await expect(applyLoanPage.loanErrorMessage).toHaveText('Please enter a valid interest rate.');
    });

    test('Verify user cannot review loan application without selecting a disbursement account', async ({ page }) => {
        const applyLoanPage = new ApplyLoanPage(page);
        await applyLoanPage.openLoanForm();
        await applyLoanPage.selectLoanType('Auto');
        await applyLoanPage.enterLoanAmount(2022);
        await applyLoanPage.reviewLoan();
        await expect(applyLoanPage.loanErrorMessage).toHaveText('Please select a disbursement account.');
    });
});