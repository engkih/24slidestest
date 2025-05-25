import { test, expect } from '@playwright/test'
const fs = require("fs/promises")

// TODO: ADD LOGIC FOR COOKIE FUNCTION

//Funtion to save cookies, run this before starting the download tests
// test('save cookies', async ({ page }) => {
//     await page.goto('https://24slides.com/templates/featured')
//     await page.getByRole('link', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Email' }).click();
//     await page.getByRole('textbox', { name: 'Email' }).fill('engkih.gaming@gmail.com');
//     await page.getByRole('textbox', { name: 'Email' }).press('Tab');
//     await page.getByRole('textbox', { name: 'Password' }).fill('126html5');
//     await page.getByRole('button', { name: 'Login' }).click();
//     const cooks = await page.context().cookies('https://24slides.com/');
//     console.log(cooks); // confirm cookies content
//     await fs.writeFile("cookie.json", JSON.stringify(cooks));
// })
test.describe('Positive test download', () => {
    test('1-DL-P_User able to download template', async ({ page, context }) => {
        const cookies = await fs.readFile("cookie.json", "utf-8")
        console.log(cookies); //console check cookie
        if (cookies) {
            // THIS FUNCTION WILL RUN ONLY IF THE COOKIE HAS BEEN SAVED USING FUNCTION ABOVE
            console.log('Local cookie found')
            await context.addCookies(JSON.parse(cookies));
            await page.goto('https://24slides.com/templates/featured')
            await page.locator('.card').nth(0).click();
            await page.locator('.btn-download').click();
            await page.locator('.thanks-page-main-title').isVisible(); // check redirect
        } else if (!cookies) {
            console.log('No local cookie found')
            await page.goto('https://24slides.com/templates/featured')
            await page.locator('.card').nth(0).click();
            await page.locator('.openSignUpCardJ').click();
            await page.locator('.link', { has: page.getByText('Login here') }).click();
            await page.getByPlaceholder('Email').isVisible();
            await page.getByPlaceholder('Email').click();
            await page.getByPlaceholder('Email').fill('engkih.gaming@gmail.com');
            await page.getByPlaceholder('Password').click();
            await page.getByPlaceholder('Password').fill('126html5');
            await page.getByRole('button', { name: 'Login' }).click();
            await page.getByRole('button', { name: 'My Profile' }).isVisible(); // login check
            await page.locator('.btn-download').click();
            await page.locator('.thanks-page-main-title').isVisible(); // check redirect
        }
    })
})

test.describe('Negative Test Download', () => {
    test('1-DL-N_User unable to download template if user was not logged in', async ({ page }) => {
        await page.goto('https://24slides.com/templates/featured')
        await page.locator('.card').nth(0).click();
        await page.locator('.openSignUpCardJ').isVisible(); //Check user is not logged in
        await page.locator('.openSignUpCardJ').click();
        await page.getByText('Create an account').isVisible(); //Check the sign up pop up is appeared
    })
})