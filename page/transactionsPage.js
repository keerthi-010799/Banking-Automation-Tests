export default class TransactionsPage {
    constructor(page) {
        this.page = page;
        this.transactionHeading = page.getByRole('heading', { name: 'Transactions' });
        this.transactionMessage = page.getByText('All activity across your accounts');
        this.searchInput = page.getByTestId('all-txn-search-input');
        this.accountFilterSelect = page.getByTestId('all-txn-account-select');
        this.everdayCheckingOption = page.locator('div').filter({ hasText: /^Everyday Checking$/ }).nth(1);
        this.highYieldSavingsOption = page.getByText('High-Yield Savings');
        this.allAccountsOption = page.getByText('All Accounts');
        this.creditsButton = page.getByRole('button', { name: 'Credits' });
        this.debitsButton = page.getByRole('button', { name: 'Debits' });
        this.allButton = page.getByRole('button', { name: 'All' });
        this.clearAllFiltersBtn = page.getByTestId('clear-all-txn-filters-btn');
        this.transactionTable = page.getByTestId('all-transactions-table');
        this.tableRows = page.locator('table tbody tr');
        this.accountColumnCells = page.locator('table tbody tr td:nth-child(2)');
        this.amountCells = page.locator('table tbody tr td:last-child');
    }

    async fillSearchInput(searchTerm) {
        await this.searchInput.fill(searchTerm);
    }

    async selectEverydayChecking() {
        await this.accountFilterSelect.click();
        await this.everdayCheckingOption.click();
    }

    async selectHighYieldSavings() {
        await this.accountFilterSelect.click();
        await this.highYieldSavingsOption.click();
    }

    async clickCreditsButton() {
        await this.creditsButton.click();
    }

    async clickDebitsButton() {
        await this.debitsButton.click();
    }

    async clickAllButton() {
        await this.allButton.click();
    }

    async clickClearAllFiltersBtn() {
        await this.clearAllFiltersBtn.click();
    }

}