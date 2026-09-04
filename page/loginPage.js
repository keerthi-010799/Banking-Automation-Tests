import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByTestId('login-username-input');
        this.password = page.getByTestId('login-password-input');
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
        this.loginError = page.getByTestId('login-error-message');
    }

    async goToUrl() {
        await this.page.goto('https://qaplayground.com/bank/login');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginError(message) {
        await expect(this.loginError).toBeVisible();
        await expect(this.loginError).toHaveText(message);
    }
}

export default LoginPage;