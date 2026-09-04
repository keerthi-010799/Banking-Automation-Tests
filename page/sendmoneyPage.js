export default class sendMoneyPage {
    constructor(page) {
        this.page = page;
        this.sendFromAccountSelect = page.getByTestId('send-from-account-select');
        this.sendFromAccountOption = page.getByText('Everyday Checking — $');
        this.payeeSelect = page.getByTestId('payee-select');
        this.payeeOption = page.getByText('Priya Mehta — Bank of America');
        this.sendAmountInput = page.getByTestId('send-amount-input');
        this.sendNoteInput = page.getByTestId('send-note-input');
        this.reviewSendButton = page.getByTestId('review-send-btn');
        this.cancelConfirmSendButton = page.getByTestId('cancel-confirm-send-btn');
        this.confirmSendButton = page.getByTestId('confirm-send-btn');
        this.sendMoneyErrorMessage = page.getByTestId("send-money-error");
        //for add payee functionality
        this.addPayeeButton = page.getByTestId('add-payee-btn');
        this.newPayeeNameInput = page.getByTestId('add-payee-name-input');
        this.payeeBankInput = page.getByTestId('add-payee-bank-input');
        this.payeeRoutingInput = page.getByTestId('add-payee-routing-input');
        this.newPayeeAccountInput = page.getByTestId('add-payee-account-input');
        this.savePayeeButton = page.getByTestId('save-add-payee-btn');
        this.cancelPayeeButton = page.getByTestId('cancel-add-payee-btn');
        this.payeeErrorMessage = page.getByTestId('add-payee-error-message');
    }
    async selectFromAccount() {
        await this.sendFromAccountSelect.click();
        await this.sendFromAccountOption.click();
    }

    async selectPayee() {
        await this.payeeSelect.click();
        await this.payeeOption.click();
    }

    async enterAmount(amount) {
        await this.sendAmountInput.fill(
            amount.toString()
        );
    }

    async enterNote(note) {
        await this.sendNoteInput.fill(note);
    }

    async fillSendMoneyDetails(amount, note) {
        await this.selectFromAccount();
        await this.selectPayee();
        await this.enterAmount(amount);
        await this.enterNote(note);
    }

    async reviewSendMoney() {
        await this.reviewSendButton.click();
    }

    async cancelSendMoney() {
        await this.cancelConfirmSendButton.click();
    }

    async confirmSendMoney() {
        await this.confirmSendButton.click();
    }
    //add payee functionality
    async openAddPayee() {
        await this.addPayeeButton.click();
    }

    async enterPayeeName(name) {
        await this.newPayeeNameInput.fill(name);
    }

    async enterBankName(bankName) {
        await this.payeeBankInput.fill(bankName);
    }

    async enterRoutingNumber(routingNumber) {
        await this.payeeRoutingInput.fill(routingNumber.toString());
    }

    async enterAccountNumber(accountNumber) {
        await this.newPayeeAccountInput.fill(accountNumber.toString());
    }

    async savePayee() {
        await this.savePayeeButton.click();
    }

    async cancelAddPayee() {
        await this.cancelPayeeButton.click();
    }

    async fillPayeeDetails(name, bankName, routingNumber, accountNumber) {
        await this.enterPayeeName(name);
        await this.enterBankName(bankName);
        await this.enterRoutingNumber(routingNumber);
        await this.enterAccountNumber(accountNumber);
    }
}