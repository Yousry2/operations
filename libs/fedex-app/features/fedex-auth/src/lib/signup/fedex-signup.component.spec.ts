import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FedexSignupComponent } from './fedex-signup.component';
import { APP_BASE_HREF } from '@angular/common';

const getElement = (fixture: ComponentFixture<FedexSignupComponent>, elementTestId: string) => {
     return fixture.debugElement.query(By.css(`[test-id="fedex-auth-signup-${elementTestId}"]`));
};

const firstName_input_required = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'firstName-input-required');
};
const firstName_input = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'firstName-input');
};
const lastName_input = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'lastName-input');
};
const email_input = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'email-input');
};
const password_input = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'password-input');
};
const termsAndConditions_input = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'termsAndConditions-input');
};

const lastName_input_required = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'lastName-input-required');
};

const password_input_invalid = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'password-input-invalid');
};
const email_input_invalid = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'email-input-invalid');
};

const submit_button = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'submit-button');
};

describe('FedexSignupComponent', () => {
     let component: FedexSignupComponent;
     let fixture: ComponentFixture<FedexSignupComponent>;
     let httpTestingController: HttpTestingController;

     let password: DebugElement;
     let email: DebugElement;
     let firstName: DebugElement;
     let lastName: DebugElement;
     let submitButton: DebugElement;
     let termsAndConditions: DebugElement;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               providers: [{ provide: APP_BASE_HREF, useValue: '', multi: true }],
               imports: [FedexSignupComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(FedexSignupComponent);
          component = fixture.componentInstance;
          httpTestingController = TestBed.inject(HttpTestingController);

          password = password_input(fixture);
          firstName = firstName_input(fixture);
          lastName = lastName_input(fixture);
          email = email_input(fixture);
          termsAndConditions = termsAndConditions_input(fixture);
          submitButton = submit_button(fixture);

          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });

     it('should initialize signup component with all sign-up form fields', () => {
          expect(firstName).toBeTruthy();
          expect(lastName).toBeTruthy();
          expect(password).toBeTruthy();
          expect(email).toBeTruthy();
          expect(termsAndConditions).toBeTruthy();
          expect(firstName_input_required(fixture)).toBeFalsy();
          expect(lastName_input_required(fixture)).toBeFalsy();
          expect(password_input_invalid(fixture)).toBeFalsy();
          expect(email_input_invalid(fixture)).toBeFalsy();
     });

     it('should all signup form fields marked as required if submitted without filling ', () => {
          submit_button(fixture).nativeElement.click();
          fixture.detectChanges();
          expect(firstName_input_required(fixture)).toBeTruthy();
          expect(lastName_input_required(fixture)).toBeTruthy();
          expect(password_input_invalid(fixture)).toBeTruthy();
          expect(email_input_invalid(fixture)).toBeTruthy();
     });
     it('should make sure email entered is correct ', () => {
          expect(email_input_invalid(fixture)).toBeFalsy();

          email.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          email.nativeElement.value = 'test';

          expect(email_input_invalid(fixture)).toBeTruthy();

          email.nativeElement.value = '123';
          email.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(email_input_invalid(fixture)).toBeTruthy();

          email.nativeElement.value = 'test@';
          email.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(email_input_invalid(fixture)).toBeTruthy();

          email.nativeElement.value = 'mohamed@fedex.com';

          email.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(email_input_invalid(fixture)).toBeFalsy();
     });

     it('should make sure password entered is correct ', () => {
          expect(password_input_invalid(fixture)).toBeFalsy();

          password.nativeElement.value = 'test';

          password.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(password_input_invalid(fixture)).toBeTruthy();

          password.nativeElement.value = 'test123456';

          password.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(password_input_invalid(fixture)).toBeTruthy();

          password.nativeElement.value = 'testT12345';

          password.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(password_input_invalid(fixture)).toBeFalsy();

          password.nativeElement.value = 'Test12345';

          password.nativeElement.dispatchEvent(new Event('input'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          expect(password_input_invalid(fixture)).toBeFalsy();
     });

     it('should submit signup form correctly', (): void => {
          password.nativeElement.value = 'Password123';
          password.nativeElement.dispatchEvent(new Event('input'));
          email.nativeElement.value = 'test@test.com';
          email.nativeElement.dispatchEvent(new Event('input'));
          firstName.nativeElement.value = 'test';
          firstName.nativeElement.dispatchEvent(new Event('input'));
          lastName.nativeElement.value = 'test';
          lastName.nativeElement.dispatchEvent(new Event('input'));
          termsAndConditions.nativeElement.checked = true;
          termsAndConditions.nativeElement.dispatchEvent(new Event('change'));
          submitButton.nativeElement.click();
          fixture.detectChanges();
          const req = httpTestingController.expectOne('https://demo-api.vercel.app/users');
          expect(req.request.method).toEqual('POST');
          expect(req.request.body).toEqual({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } });
          req.flush({});
     });

     afterEach(() => {
          httpTestingController.verify();
     });
});
