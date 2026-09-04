import { test, expect } from '@playwright/test';
import LoginPage from '../page/loginPage.js';
import DashboardPage from '../page/dashboardPage.js';
import SendmoneyPage from '../page/sendmoneyPage.js';
import { userdata } from '../page/dataset.json';

test.describe('Send Money Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goToUrl();
        await loginPage.login(userdata.username, userdata.password);
        await dashboardPage.clickSendMoney();
    });

    test('verify user can enter send money details', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.fillSendMoneyDetails(2022, 'Monthly');
        await expect(sendmoneyPage.sendAmountInput).toHaveValue('2022');
        await expect(sendmoneyPage.sendNoteInput).toHaveValue('Monthly');
    }
    );

    test('verify Review Send Money functionality', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.fillSendMoneyDetails(2022, 'Monthly');
        await sendmoneyPage.reviewSendMoney();
        await expect(sendmoneyPage.confirmSendButton).toBeVisible();
    }
    );

    test('verify user can cancel send money confirmation', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.fillSendMoneyDetails(2022, 'Monthly');
        await sendmoneyPage.reviewSendMoney();
        await sendmoneyPage.cancelSendMoney();
        await expect(sendmoneyPage.confirmSendButton).not.toBeVisible();
    }
    );


    test('verify user can confirm send money', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.fillSendMoneyDetails(2022, 'Monthly');
        await sendmoneyPage.reviewSendMoney();
        await sendmoneyPage.confirmSendMoney();
        await expect(page.getByText(/sent successfully|transfer successful|success/i)).toBeVisible();
    }
    );

    //add payee functionality

    test('verify Add Payee form can be opened', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await expect(sendmoneyPage.newPayeeNameInput).toBeVisible();
    });

    test('verify user can enter Payee details', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '987456123',
            '123456789'
        );
        await expect(sendmoneyPage.newPayeeNameInput).toHaveValue('adani');
        await expect(sendmoneyPage.payeeBankInput).toHaveValue('indian bank');
        await expect(sendmoneyPage.payeeRoutingInput).toHaveValue('987456123');
        await expect(sendmoneyPage.newPayeeAccountInput).toHaveValue('123456789');
    });

    test('verify user can save Payee', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '987456123',
            '123456789'
        );
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.newPayeeNameInput).not.toBeVisible();
    });

    test(
        'verify user can cancel Add Payee',
        async ({ page }) => {
            const sendmoneyPage = new SendmoneyPage(page);
            await sendmoneyPage.openAddPayee();
            await expect(sendmoneyPage.newPayeeNameInput).toBeVisible();
            await sendmoneyPage.cancelAddPayee();
            await expect(sendmoneyPage.newPayeeNameInput).not.toBeVisible();
        });

    //negative tests
    test('send money without any details', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.reviewSendMoney();
        await expect(sendmoneyPage.sendMoneyErrorMessage).toHaveText("Please select an account.")
    }
    );
    test('send money without payee', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.selectFromAccount();
        await sendmoneyPage.reviewSendMoney();
        await expect(sendmoneyPage.sendMoneyErrorMessage).toHaveText("Please select a payee.")
    }
    );
    test('send money without amount', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.selectFromAccount();
        await sendmoneyPage.selectPayee();
        await sendmoneyPage.reviewSendMoney();
        await expect(sendmoneyPage.sendMoneyErrorMessage).toHaveText("Please enter a valid amount.")
    }
    );
    //for add payee functionality
    test('add payee without any details', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Please enter the payee name.")
    }
    );

    test('add payee without bank name', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.enterPayeeName('adani');
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Please enter the bank name.")
    }
    );

    test('add payee without routing number', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '',
            ''
        );
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Routing number must be exactly 9 digits.")
    }
    );

    test('add payee without exactly 9 digit routing number', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '98745',
            ''
        );
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Routing number must be exactly 9 digits.")
    }
    );

    test('add payee without account number', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '987456123',
            ''
        );
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Account number must be 8–17 digits.")
    }
    );

    test('add payee without 8-17 digit account number', async ({ page }) => {
        const sendmoneyPage = new SendmoneyPage(page);
        await sendmoneyPage.openAddPayee();
        await sendmoneyPage.fillPayeeDetails(
            'adani',
            'indian bank',
            '987456123',
            '1234'
        );
        await sendmoneyPage.savePayee();
        await expect(sendmoneyPage.payeeErrorMessage).toHaveText("Account number must be 8–17 digits.")
    }
    );
});