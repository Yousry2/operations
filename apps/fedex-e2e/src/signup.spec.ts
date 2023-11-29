import { test, expect, devices } from '@playwright/test';
import { SignUpPage } from './signup.page';

test.describe('SignUp Page', () => {
     let signUpPage: SignUpPage;
     test.beforeEach(async ({ page }) => {
          signUpPage = new SignUpPage(page);
          await signUpPage.navigateToSignUpPage();
     });

     test('Sign-up Success', async ({ page }) => {
          await signUpPage.enterEmail('test@test.com');
          await signUpPage.enterPassword('Password1');
          await signUpPage.enterFirstName('test1');
          await signUpPage.enterLastName('test2');
          await signUpPage.clickTermsAndConditions();
          await signUpPage.clickSubmitButton();
          await page.waitForURL('**/auth/success');
          await page.waitForSelector('text=success');
          const element = page.getByText('Success');
          await expect(element).toBeVisible();
     });

     test('Signup test @accessiblity', async ({ page }) => {
          await page.keyboard.press('Tab');
          await page.keyboard.type('test@test.com');
          await page.keyboard.press('Tab');
          await page.keyboard.type('Password1');
          await page.keyboard.press('Tab');
          await page.keyboard.type('test1');
          await page.keyboard.press('Tab');
          await page.keyboard.type('test2');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Space');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
          await page.waitForURL('**/auth/success');
          await page.waitForSelector('text=success');
          const element = page.getByText('Success');
          await expect(element).toBeVisible();
     });

     test('signup all fields are required  @validation', async ({ page }) => {
          await signUpPage.clickSubmitButton();
          await page.waitForSelector('text=Required');
          await expect(await signUpPage.emailInputInvalid()).toContainText('Required');
          await expect(await signUpPage.passwordInputinvalid()).toContainText('Required');
          await expect(await signUpPage.firstNameInputRequired()).toContainText('Required');
          await expect(await signUpPage.lastNameInputRequired()).toContainText('Required');
     });

     test('signup email must be valid  @validation', async ({ page }) => {
          await signUpPage.enterEmail('test');
          await page.keyboard.press('Tab');
          await expect(await signUpPage.emailInputInvalid()).toBeVisible();
     });

     test('all fields are shown in small screens @responsiveness', async ({ page }) => {
          await page.setViewportSize({ width: 600, height: 800 });
          await expect(await signUpPage.emailInput()).toBeInViewport();
          await expect(await signUpPage.passwordInput()).toBeInViewport();
          await expect(await signUpPage.firstNameInput()).toBeInViewport();
          await expect(await signUpPage.lastNameInput()).toBeInViewport();
          await expect(await signUpPage.termsAndConditionsInput()).toBeInViewport();
          await expect(await signUpPage.submitButton()).toBeInViewport();
     });
     test('all Fields are shown on iphone x device @responsiveness', async ({ page }) => {
          await page.setViewportSize(devices['iPhone X'].viewport);
          await expect(await signUpPage.emailInput()).toBeInViewport();
          await expect(await signUpPage.passwordInput()).toBeInViewport();
          await expect(await signUpPage.firstNameInput()).toBeInViewport();
          await expect(await signUpPage.lastNameInput()).toBeInViewport();
          await expect(await signUpPage.termsAndConditionsInput()).toBeInViewport();
          await expect(await signUpPage.submitButton()).toBeInViewport();
     });
});
