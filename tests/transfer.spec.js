import { test, expect } from '@playwright/test';

import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import TransferPage from '../page/transferPage.js';
import { userdata } from '../page/dataset.json';

test.describe('Transfer Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickTransfer();
    });

    test('verify user can enter transfer details', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.fillTransferDetails(200, 'Vacation Fund');
        await expect(transferPage.transferAmountInput).toHaveValue('200');
        await expect(transferPage.transferDescriptionInput).toHaveValue('Vacation Fund');
    }
    );

    test('verify Review Transfer functionality', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.fillTransferDetails(200, 'Vacation Fund');
        await transferPage.reviewTransfer();
        await expect(transferPage.confirmTransferButton).toBeVisible();
    }
    );

    test('verify user can cancel transfer confirmation', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.fillTransferDetails(200, 'Vacation Fund');
        await transferPage.reviewTransfer();
        await transferPage.cancelTransfer();
        await expect(transferPage.confirmTransferButton).not.toBeVisible();
    }
    );

    test('verify user can confirm transfer', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.fillTransferDetails(200, 'Vacation Fund');
        await transferPage.reviewTransfer();
        await transferPage.confirmTransfer();
        await expect(page.getByText(/transfer successful|transfer completed|success/i)).toBeVisible();
    }
    );

    //negative tests

    test('transfer without giving details', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.reviewTransfer();
        await expect(transferPage.errorMessage).toHaveText("Please select a From account.")
    }
    );

    test('transfer without giving "To" account', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.selectFromAccount();
        await transferPage.reviewTransfer();
        await expect(transferPage.errorMessage).toHaveText("Please select a To account.")
    }
    );

    test('transfer without giving amount', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.selectFromAccount();
        await transferPage.selectToAccount();
        await transferPage.reviewTransfer();
        await expect(transferPage.errorMessage).toHaveText("Please enter a valid amount.")
    }
    );

    test('transfer without giving transfer date', async ({ page }) => {
        const transferPage = new TransferPage(page);
        await transferPage.fillTransferDetails(200, 'Vacation Fund');
        await transferPage.selectDate();
        await transferPage.reviewTransfer();
        await expect(transferPage.errorMessage).toHaveText("Please select a transfer date.")
    }
    );

});