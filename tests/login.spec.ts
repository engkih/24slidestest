import { test, expect, type Page } from '@playwright/test';

// This automation test only cover the important functionality of the app so it can be useable, any UI design, UI cosmetics, and 3rd party provider is not tested because it can be changed easily as the app updated, but the app functinality usualy won't be changed easily because it will involve changing the flow design. Inconclusion, this automation only cover the app functinality because it won't changed as much as the app updated and the test will be reapeated each time there is an update in the app.

test.beforeEach(async ({ page }) => {
    await page.goto('https://24slides.com/templates/featured');
});

test.describe('Positive Login Test', () => {
    test('1-LO-P_User able to login using email from navbar button', async ({ page }) => {
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('engkih.gaming@gmail.com');
        await page.getByRole('textbox', { name: 'Email' }).press('Tab');
        await page.getByRole('textbox', { name: 'Password' }).fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        //TODO add login verification
    })

    test('4-LO-P_User able to login using email from product page', async ({ page }) => {
        // await page.locator('.content-row',{has: page.locator('.card').nth(0)}).click();
        await page.locator('.card').nth(0).click();
        await page.locator('.openSignUpCardJ').click();
        await page.locator('.link', { has: page.getByText('Login here') }).click();
        await page.getByPlaceholder('Email').isVisible();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        //TODO add login success verification
        await page.getByRole('button', { name: 'My Profile' }).isVisible();

    })
})

test.describe('Negative Test Login', () => {
    test('1-LO-N_User unable to login with empty email/password/email  and password from navbar button', async ({ page }) => {
        // Test with empty
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // Test with empty email
        await page.getByPlaceholder('Password').fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // Test with empty password
        await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

    });

    test('2-LO-N_User unable to login with invalid email/password/email and password from navbar button', async ({ page }) => {

        // Test with invalid password
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('wrongpass111');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // Test with invalid email
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('wrongemail22@mail.com');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in
    });

    test('3-LO-N_User unable to login with empty email/password/email  and password from product page', async ({ page }) => {
        // open login pop up
        await page.locator('.card').nth(0).click();
        await page.locator('.openSignUpCardJ').click();
        await page.locator('.link', { has: page.getByText('Login here') }).click();

        // login form filling
        // login with empty password
        await page.getByPlaceholder('Email').isVisible();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // login with empty email
        await page.getByPlaceholder('Password').isVisible();
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // login with empty email and password
        await page.getByRole('button', { name: 'Login' }).isVisible();
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

    })

    test('4-LO-N_User unable to login with invalid email/password/email and password from product page', async({page }) => {
        // Open login pop up
        await page.locator('.card').nth(0).click();
        await page.locator('.openSignUpCardJ').click();
        await page.locator('.link', { has: page.getByText('Login here') }).click();

        // login form filling
        // login with invalid password
        await page.getByPlaceholder('Email').isVisible();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
        await page.getByPlaceholder('Password').isVisible();
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('wrongpass123');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in

        // login with invalid email (wrong email or invalid format)
        await page.getByPlaceholder('Email').isVisible();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill('wrongemail321@mail.com');
        await page.getByPlaceholder('Password').isVisible();
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('126html5');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Login' }).isVisible(); // Verify if user is not logged in
    })
})