export default class TransferPage {

    constructor(page) {

        this.page = page;
        this.transferLink = page.getByTestId('sidebar-link-transfer');
        this.transferFromSelect = page.getByTestId('transfer-from-select');
        this.transferFromOption = page.getByText('Everyday Checking — $');
        this.transferToSelect = page.getByTestId('transfer-to-select');
        this.transferToOption = page.getByTestId('transfer-to-option');
        this.transferAmountInput = page.getByTestId('transfer-amount-input');
        this.transferDescriptionInput = page.getByRole('textbox', { name: 'e.g. Rent, vacation fund…' });
        this.reviewTransferButton = page.getByTestId('review-transfer-btn');
        this.cancelConfirmTransferButton = page.getByTestId('cancel-confirm-transfer-btn');
        this.confirmTransferButton = page.getByTestId('confirm-transfer-btn');
        this.TransferDateRadiobutton = page.getByRole('radio', { name: 'Schedule for later' });
        this.errorMessage = page.getByTestId('transfer-error-message');
    }

    async selectFromAccount() {
        await this.transferFromSelect.click();
        await this.transferFromOption.click();
    }

    async selectToAccount() {
        await this.transferToSelect.click();
        await this.transferToOption.getByText('High-Yield Savings — $').click();
    }


    async enterAmount(amount) {
        await this.transferAmountInput.fill(amount.toString());
    }

    async enterDescription(description) {
        await this.transferDescriptionInput.fill(description);
    }

    async reviewTransfer() {
        await this.reviewTransferButton.click();
    }

    async cancelTransfer() {
        await this.cancelConfirmTransferButton.click();
    }

    async confirmTransfer() {
        await this.confirmTransferButton.click();
    }
    async selectDate() {
        await this.TransferDateRadiobutton.check();
    }
    async fillTransferDetails(amount, description) {
        await this.selectFromAccount();
        await this.selectToAccount();
        await this.enterAmount(amount);
        await this.enterDescription(description);
    }
}