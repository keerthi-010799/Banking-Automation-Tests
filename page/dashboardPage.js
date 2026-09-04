class DashboardPage {
    constructor(page) {
        this.page = page;

        // Dashboard heading
        this.dashboardHeading = page.getByRole('heading', { name: /Welcome back, Alex/ });
        this.financialOverview = page.getByText("Here's your financial overview.");

        // Financial summary cards
        this.totalNetWorth = page.getByText('Total Net Worth');
        this.netChange = page.getByText('Net Change');
        this.income = page.getByLabel('Monthly income amount')
        this.expenses = page.getByText('Expenses');

        // Quick Actions
        this.quickActionsHeading = page.getByText('Quick Actions');
        this.transferMoney = page.getByText('Transfer Money', { exact: true });
        this.sendMoney = page.locator("//span[normalize-space()='Send Money']");
        this.payABill = page.getByText('Pay a Bill', { exact: true });
        this.applyForLoan = page.getByText('Apply for Loan', { exact: true });
        this.transactionsQuickAction = page.getByTestId('quick-action-transactions');

        // Recent Transactions
        this.recentTransactionsHeading = page.getByText('Recent Transactions');
        this.viewAllTransactions = page.getByText('View all', { exact: true });

        // Sidebar navigation
        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
        this.accountsLink = page.getByText('Accounts', { exact: true });
        this.transferLink = page.getByTestId('sidebar-link-transfer');
        this.sendMoneyLink = page.getByTestId('sidebar-link-send-money');
        this.billPayLink = page.getByTestId('sidebar-link-bill-pay');
        this.transactionsLink = page.getByTestId('sidebar-link-transactions');
        this.applyLoanLink = page.getByText('Apply Loan', { exact: true });

        // Logout
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }
    async clickDashboard() {
        await this.dashboardLink.click();
    }


    async clickAccounts() {
        await this.accountsLink.click();
    }

    async clickTransfer() {
        await this.transferLink.click();
    }

    async clickTransactions() {
        await this.transactionsLink.click();
    }
    async clickSendMoney() {
        await this.sendMoneyLink.click();
    }
    async clickApplyLoan() {
        await this.applyLoanLink.click();
    }
    async clickPaybill() {
        await this.billPayLink.click();
    }
    async clickLogout() {
        await this.logoutButton.click();
    }
}

module.exports = DashboardPage;