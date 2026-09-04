import { test, expect } from '@playwright/test';
import LoginPage from '../page/loginPage.js';
import { userdata, wrongdata } from '../page/dataset.json';

const LOGIN_URL = 'https://qaplayground.com/bank/login';
const DASHBOARD_URL = 'https://qaplayground.com/bank/dashboard';

test.describe('Bank Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToUrl();
    });

    test('Login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.login(userdata.username, userdata.password);
        await expect(page).toHaveURL(DASHBOARD_URL);
        await expect(page.getByRole('heading', { name: /Welcome back, Alex/ })).toBeVisible();
    });

    test('Login with invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.login(wrongdata.username, wrongdata.password);
        await expect(page).toHaveURL(LOGIN_URL);
        await loginPage.verifyLoginError('The username or password you entered is incorrect.');
    });


    test('Login with empty username', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.login('', userdata.password);
        await expect(page).toHaveURL(LOGIN_URL);
        await loginPage.verifyLoginError('Please enter your username.');
    });


    test('Login with empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(userdata.username, '');
        await expect(page).toHaveURL(LOGIN_URL);
        await loginPage.verifyLoginError('Please enter your password.');
    });


    test('Login with empty username and password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.login('', '');
        await expect(page).toHaveURL(LOGIN_URL);
        await loginPage.verifyLoginError('Please enter your username.');
    });

});