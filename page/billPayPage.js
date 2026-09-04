export default class BillPayPage {

    constructor(page) {
        this.page = page;
        this.billPayLink = page.getByTestId('sidebar-link-bill-pay');
        this.billPayFromSelect = page.getByTestId('bill-pay-from-select');
        this.billPayFromOption = page.getByText('Everyday Checking — $');
        this.billerSearchInput = page.getByTestId('biller-search-input');
        this.billerOption = page.getByRole('option', { name: 'City Electric Co. Ref: ACC-' });
        this.billAmountInput = page.getByTestId('bill-amount-input');
        this.billMemoInput = page.getByTestId('bill-memo-input');
        this.reviewBillButton = page.getByTestId('review-bill-btn');
        this.cancelConfirmBillButton = page.getByTestId('cancel-confirm-bill-btn');
        this.confirmBillButton = page.getByTestId('confirm-bill-btn');
        this.payAnotherBillButton = page.getByTestId('pay-another-bill-btn');
        this.cancelBillButton = page.getByTestId('cancel-bill-btn');
        this.addBillerButton = page.getByTestId('add-biller-btn');
        this.addBillerNameInput = page.getByTestId('add-biller-name-input');
        this.addBillerAccountInput = page.getByRole('textbox', { name: 'e.g. ACC-' });
        this.saveAddBillerButton = page.getByTestId('save-add-biller-btn');
        this.cancelAddBillerButton = page.getByTestId('cancel-add-biller-btn');
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.dateInput = page.getByTestId('bill-payment-date-input');
        this.billPayErrorMessage = page.getByTestId('bill-pay-error');
    }

    async gotoBillPay() {
        await this.billPayLink.click();
    }

    async selectFromAccount() {
        await this.billPayFromSelect.click();
        await this.billPayFromOption.click();
    }

    async selectBiller() {
        await this.billerSearchInput.click();
        await this.billerOption.click();
    }

    async enterBillAmount(amount) {
        await this.billAmountInput.fill(amount.toString());
    }

    async enterBillMemo(memo) {
        await this.billMemoInput.fill(memo);
    }

    async fillBillPaymentDetails(amount, memo) {
        await this.selectFromAccount();
        await this.selectBiller();
        await this.enterBillAmount(amount);
        await this.enterBillMemo(memo);
    }

    async reviewBill() {
        await this.reviewBillButton.click();
    }

    async cancelBillConfirmation() {
        await this.cancelConfirmBillButton.click();
    }

    async confirmBill() {
        await this.confirmBillButton.click();
    }

    async payAnotherBill() {
        await this.payAnotherBillButton.click();
    }

    async cancelBill() {
        await this.cancelBillButton.click();
    }

    async openAddBiller() {
        await this.addBillerButton.click();
    }

    async enterBillerName(name) {
        await this.addBillerNameInput.fill(name);
    }

    async enterBillerAccount(account) {
        await this.addBillerAccountInput.fill(account);
    }

    async fillBillerDetails(name, account) {
        await this.enterBillerName(name);
        await this.enterBillerAccount(account);
    }

    async saveBiller() {
        await this.saveAddBillerButton.click();
    }

    async cancelAddBiller() {
        await this.cancelAddBillerButton.click();
    }

    async closeAddBiller() {
        await this.closeButton.click();
    }

    async clearDateInput() {
        await this.dateInput.fill('');
    }
}