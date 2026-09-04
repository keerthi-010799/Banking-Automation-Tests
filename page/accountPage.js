class AccountsPage {
    constructor(page) {

        this.page = page;
        this.accountHeading = page.getByRole('heading', { name: 'My Accounts' });
        this.accountMessage = page.locator("p[class='mt-0.5 text-sm text-slate-500']");
        this.addAccountBtn = page.getByRole('button', { name: 'Add Account' });
        this.accountsTbl = page.getByRole('table', { name: 'Accounts' });
        this.firstRow = page.locator('table tbody tr').first();

        //add account btn modal
        this.accountName = page.getByPlaceholder('e.g. Everyday Checking');
        this.accountComboBtn = page.getByTestId('account-form-type-select');
        this.creditOption = page.getByText('Credit')
        this.staringBalance = page.getByPlaceholder('0.00');
        this.terms = page.getByTestId('account-form-accept-terms-checkbox');
        this.addAccountModalBtn = page.getByTestId('save-account-form-btn');
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.modalClose = page.getByRole('button', { name: 'Close' });
        this.errorMsg = page.getByTestId('account-form-error-message');
        // individual account when click view btn
        this.allAccountsBtn = page.getByText('All Accounts');
        this.individualAccHeading = page.getByRole('heading', { name: 'Everyday Checking' });
        //edit btn modal
        this.editAccountName = page.getByRole('textbox', { name: 'Account Name' });
        this.editAccountComboBtn = page.getByRole('combobox', { name: /Account Type/i });
        this.CreditOption = page.getByTestId('account-form-type-options').getByText('Credit');
        this.editBalance = page.getByPlaceholder('0.00');
        this.saveChangeBtn = page.getByTestId('save-account-form-btn');
        this.editCancelBtn = page.getByText('Cancel', { exact: true });
        this.editCloseBtn = page.getByRole('button', { name: 'Close' });
        this.changeCheck = page.getByTestId('account-row-type-badge').getByText('Credit');
        this.editErrorMsg = page.getByTestId('account-form-error-message');
        //delete btn modal
        this.deletAccountBtn = page.getByRole('button', { name: 'Delete Account' });
        this.calcelDelete = page.getByTestId('cancel-delete-account-btn');
        this.closeDelete = page.getByText('Close');

    }

    async clickAddAccountBtn() {
        await this.addAccountBtn.click();
    }

    async clickViewBtn() {
        await this.firstRow.getByRole('button', { name: 'View' }).click();
    }

    async clickEditBtn() {
        await this.firstRow.getByRole('button', { name: 'Edit' }).click();
    }

    async clickDeleteBtn() {
        await this.firstRow.getByRole('button', { name: 'Delete' }).click();
    }

    async backToAllAccounts() {
        await this.allAccountsBtn.click();
    }

    async fillAccountName() {
        await this.accountName.fill("New Account");
    }
    async fillAccountNameEmpty() {
        await this.accountName.fill("");
    }
    async fillAccountType() {
        await this.accountComboBtn.click();
        await this.creditOption.click();
    }
    async fillAccountBalance() {
        await this.staringBalance.fill("5000");
    }
    async fillAccountBalanceEmpty() {
        await this.staringBalance.fill("");
    }
    async checkTerms() {
        await this.terms.check();
    }
    async clickSaveAccountBtn() {
        await this.addAccountModalBtn.click();
    }
    async clickCancelBtn() {
        await this.cancelBtn.click();
    }
    async clickCloceBtn() {
        await this.modalClose.click();
    }

    async fillEditAccountName() {
        await this.editAccountName.fill("Credit Account");
    }
    async fillEditAccountNameEmpty() {
        await this.editAccountName.fill("");
    }

    async fillEditAccountType() {
        await this.editAccountComboBtn.click();
        await this.CreditOption.click();
    }
    async fillEditAccountBalance() {
        await this.editBalance.fill("3000");
    }
    async fillEditAccountBalanceEmpty() {
        await this.editBalance.fill("");
    }
    async clickEditAddAccountBtn() {
        await this.saveChangeBtn.click();
    }
    async clickEditCancelBtn() {
        await this.editCancelBtn.click();
    }
    async clickEditCloceBtn() {
        await this.editCloseBtn.click();
    }
    async clickAccountDeleteBtn() {
        await this.deletAccountBtn.click();
    }
    async clickDeleteCloceBtn() {
        await this.calcelDelete.click();
    }
    async clickDeleteCancelBtn() {
        await this.closeDelete.click();
    }


}
module.exports = AccountsPage;