import { test, expect } from '@playwright/test';

import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import BillPayPage from '../page/billPayPage.js';
import { userdata } from '../page/dataset.json';

test.describe('Bill Pay Functionality', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickPaybill();
    });

    test('Verify user can enter bill payment details', async ({ page }) => {

        const billPayPage = new BillPayPage(page);
        await billPayPage.fillBillPaymentDetails(200, 'monthly invoice');
        await expect(billPayPage.billAmountInput).toHaveValue('200');
        await expect(billPayPage.billMemoInput).toHaveValue('monthly invoice');
    });

    test('Verify user can review bill payment', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.fillBillPaymentDetails(200, 'monthly invoice');
        await billPayPage.reviewBill();
        await expect(billPayPage.confirmBillButton).toBeVisible();

    });

    test('Verify user can cancel bill payment confirmation', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.fillBillPaymentDetails(200, 'monthly invoice');
        await billPayPage.reviewBill();
        await billPayPage.cancelBillConfirmation();
        await expect(billPayPage.confirmBillButton).not.toBeVisible();
    });

    test('Verify user can confirm bill payment', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.fillBillPaymentDetails(200, 'monthly invoice');
        await billPayPage.reviewBill();
        await billPayPage.confirmBill();
        await expect(billPayPage.payAnotherBillButton).toBeVisible();
    });


    test('Verify user can cancel Pay Another Bill', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        const dashboardPage = new DashboardPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.fillBillPaymentDetails(200, 'monthly invoice');
        await billPayPage.reviewBill();
        await billPayPage.confirmBill();
        await billPayPage.payAnotherBill();
        await billPayPage.cancelBill();
        await page.waitForTimeout(1000);
        await expect(dashboardPage.dashboardHeading).toBeVisible();
    });


    test('Verify user can open Add Biller form', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.openAddBiller();
        await expect(billPayPage.addBillerNameInput).toBeVisible();
    });

    test('Verify user can enter new biller details', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.openAddBiller();
        await billPayPage.fillBillerDetails('tim drake', 'Acc-004');
        await expect(billPayPage.addBillerNameInput).toHaveValue('tim drake');
        await expect(billPayPage.addBillerAccountInput).toHaveValue('Acc-004');
    });


    test('Verify user can save a new biller', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.openAddBiller();
        await billPayPage.fillBillerDetails('tim drake', 'Acc-004');
        await billPayPage.saveBiller();
        await expect(billPayPage.addBillerNameInput).not.toBeVisible();
    });

    test('Verify user can cancel Add Biller', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.openAddBiller();
        await expect(billPayPage.addBillerNameInput).toBeVisible();
        await billPayPage.cancelAddBiller();
        await expect(billPayPage.addBillerNameInput).not.toBeVisible();
    });


    test('Verify user can close Add Biller form', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.gotoBillPay();
        await billPayPage.openAddBiller();
        await billPayPage.closeAddBiller();
        await expect(billPayPage.addBillerNameInput).not.toBeVisible();
    });

    //negative tests
    test('Verify user cannot review bill payment without details', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.reviewBill();
        await expect(billPayPage.billPayErrorMessage).toHaveText("Please select an account.")
    });
    test('Verify user cannot review bill payment without selecting a biller', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.selectFromAccount();
        await billPayPage.reviewBill();
        await expect(billPayPage.billPayErrorMessage).toHaveText("Please select a biller.")
    }
    );
    test('Verify user cannot review bill payment without entering an amount', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.selectFromAccount();
        await billPayPage.selectBiller();
        await billPayPage.reviewBill();
        await expect(billPayPage.billPayErrorMessage).toHaveText("Please enter a valid amount.")
    }
    );
    test('verify user cannot review bill payment without entering a date', async ({ page }) => {
        const billPayPage = new BillPayPage(page);
        await billPayPage.selectFromAccount();
        await billPayPage.selectBiller();
        await billPayPage.enterBillAmount(200);
        await billPayPage.clearDateInput();
        await billPayPage.reviewBill();
        await expect(billPayPage.billPayErrorMessage).toHaveText("Payment date cannot be in the past.")
    }
    );
});