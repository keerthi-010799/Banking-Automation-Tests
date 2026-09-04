export default class ApplyLoanPage {

    constructor(page) {
        this.page = page;
        this.applyLoanHeading = page.getByRole('heading', { name: /Apply for a Loan/i });
        this.ApplyLoanMessage = page.getByText('Personal, auto, home, and student loans');
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.applLoanFilters = page.getByTestId('loan-history-filter-bar');
        this.openApplyLoanButton = page.getByTestId('open-apply-loan-btn');
        this.loanTable = page.getByRole('table', { name: 'Applied loans history' });
        this.loanTypeSelect = page.getByTestId('loan-type-select');
        this.loanTypeOptions = page.getByTestId('loan-type-options');
        this.loanAmountInput = page.getByTestId('loan-amount-input');
        this.loanAccountSelect = page.getByTestId('loan-account-select');
        this.loanTermSelect = page.getByTestId('loan-term-select');
        this.loanForm = page.getByTestId('apply-loan-form');
        this.loanInterestRateInput = page.getByTestId('loan-interest-rate-input');
        this.loanPurposeInput = page.getByRole('textbox', { name: 'What will this loan be used for?' });
        this.reviewLoanButton = page.getByTestId('review-loan-btn');
        this.cancelLoanButton = page.getByRole('button', { name: 'Back' });
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.loanErrorMessage = page.getByTestId('apply-loan-error-message');
    }

    async openLoanForm() {
        await this.openApplyLoanButton.click();
    }

    async selectLoanType(loanType) {
        await this.loanTypeSelect.click();
        await this.loanTypeOptions.getByText(loanType, { exact: true }).click();
    }

    async enterLoanAmount(amount) {
        await this.loanAmountInput.fill(amount.toString());
    }

    async selectLoanAccount(account = 'Everyday Checking — $') {
        await this.loanAccountSelect.click();
        await this.page.getByRole('option').filter({ hasText: account }).first().click();
    }

    async selectLoanTerm(term) {
        await this.loanTermSelect.click();
        await this.page.getByRole('option').filter({ hasText: term }).first().click();
    }

    async enterInterestRate(rate) {
        await this.loanInterestRateInput.fill(rate.toString());
    }
    async enterInterestRateEmpty() {
        await this.loanInterestRateInput.fill("");
    }

    async enterLoanPurpose(purpose) {
        await this.loanPurposeInput.fill(purpose);
    }

    async fillLoanDetails(loanType, amount, account, term, interestRate, purpose) {
        await this.selectLoanType(loanType);
        await this.enterLoanAmount(amount);
        await this.selectLoanAccount(account);
        await this.selectLoanTerm(term);
        await this.enterInterestRate(interestRate);
        await this.enterLoanPurpose(purpose);
    }

    async reviewLoan() {
        await this.reviewLoanButton.click();
    }

    async cancelLoanConfirmation() {
        await this.cancelLoanButton.click();
    }

    async closeLoan() {
        await this.closeButton.click();
    }
}