const BASE_URL = 'https://yousry2.github.io/operations/';

export class SignUpPage {
     pageId = 'fedex-auth-signup';
     constructor(private page) {
          this.page = page;
     }

     async navigateToSignUpPage() {
          await this.page.goto(BASE_URL);
          await this.page.waitForURL('**/auth/signup');
     }

     emailInput() {
          return this.page.locator(`[test-id="${this.pageId}-email-input"]`);
     }

     emailInputInvalid() {
          return this.page.locator(`[test-id="${this.pageId}-email-input-invalid"]`);
     }

     passwordInput() {
          return this.page.locator(`[test-id="${this.pageId}-password-input"]`);
     }

     passwordInputinvalid() {
          return this.page.locator(`[test-id="${this.pageId}-password-input-invalid"]`);
     }

     firstNameInput() {
          return this.page.locator(`[test-id="${this.pageId}-firstName-input"]`);
     }
     firstNameInputRequired() {
          return this.page.locator(`[test-id="${this.pageId}-firstName-input-required"]`);
     }

     lastNameInput() {
          return this.page.locator(`[test-id="${this.pageId}-lastName-input"]`);
     }

     lastNameInputRequired() {
          return this.page.locator(`[test-id="${this.pageId}-lastName-input-required"]`);
     }

     termsAndConditionsInput() {
          return this.page.locator(`[test-id="${this.pageId}-termsAndConditions-input"]`);
     }

     submitButton() {
          return this.page.locator(`[test-id="${this.pageId}-submit-button"]`);
     }

     async enterEmail(email) {
          await this.emailInput().fill(email);
     }

     async enterPassword(password) {
          await this.passwordInput().fill(password);
     }

     async enterFirstName(firstName) {
          await this.firstNameInput().fill(firstName);
     }

     async enterLastName(lastName) {
          await this.lastNameInput().fill(lastName);
     }

     async clickTermsAndConditions() {
          await this.termsAndConditionsInput().click();
     }

     async clickSubmitButton() {
          await this.submitButton().click();
     }
}
