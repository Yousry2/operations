import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexSignupComponent } from './fedex-signup.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

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

const password_input_notValid = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'password-input-notValid');
};
const email_input_notValid = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'email-input-notValid');
};

const submit_button = (fixture: ComponentFixture<FedexSignupComponent>) => {
     return getElement(fixture, 'submit-button');
};

describe('FedexSignupComponent', () => {
     let component: FedexSignupComponent;
     let fixture: ComponentFixture<FedexSignupComponent>;
     let httpTestingController: HttpTestingController;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [FedexSignupComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(FedexSignupComponent);
          component = fixture.componentInstance;
          httpTestingController = TestBed.inject(HttpTestingController);
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });

     it('should initialize signup component with all sign-up form fields', () => {
          expect(firstName_input(fixture)).toBeTruthy();
          expect(lastName_input(fixture)).toBeTruthy();
          expect(password_input(fixture)).toBeTruthy();
          expect(email_input(fixture)).toBeTruthy();
          expect(termsAndConditions_input(fixture)).toBeTruthy();
          expect(firstName_input_required(fixture)).toBeFalsy();
          expect(lastName_input_required(fixture)).toBeFalsy();
          expect(password_input_notValid(fixture)).toBeFalsy();
          expect(email_input_notValid(fixture)).toBeFalsy();
     });

     it('should all signup form fields marked as required if submitted without filling ', () => {
          submit_button(fixture).nativeElement.click();
          fixture.detectChanges();
          expect(firstName_input_required(fixture)).toBeTruthy();
          expect(lastName_input_required(fixture)).toBeTruthy();
          expect(password_input_notValid(fixture)).toBeTruthy();
          expect(email_input_notValid(fixture)).toBeTruthy();
     });
     it('should make sure email entered is correct ', () => {
          expect(email_input_notValid(fixture)).toBeFalsy();
          submit_button(fixture).nativeElement.click();

          email_input(fixture).nativeElement.value = 'test';
          fixture.whenStable().then(() => {
               expect(email_input_notValid(fixture)).toBeTruthy();
          });

          email_input(fixture).nativeElement.value = '123';
          fixture.whenStable().then(() => {
               expect(email_input_notValid(fixture)).toBeTruthy();
          });

          email_input(fixture).nativeElement.value = 'test@';
          fixture.whenStable().then(() => {
               expect(email_input_notValid(fixture)).toBeTruthy();
          });

          email_input(fixture).nativeElement.value = 'mohamed@fedex.com';

          fixture.whenStable().then(() => {
               expect(email_input_notValid(fixture)).toBeFalsy();
          });
     });
     it('should make sure password entered is correct ', () => {
          expect(password_input_notValid(fixture)).toBeFalsy();
          password_input(fixture).nativeElement.value = 'test';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeTruthy();
          });
          password_input(fixture).nativeElement.value = 'test123456';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeTruthy();
          });
          password_input(fixture).nativeElement.value = 'testT12345';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeFalsy();
          });
          password_input(fixture).nativeElement.value = 'Test12345';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeFalsy();
          });
     });

     it('should make sure password entered is correct ', () => {
          expect(password_input_notValid(fixture)).toBeFalsy();
          password_input(fixture).nativeElement.value = 'test';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeTruthy();
          });
          password_input(fixture).nativeElement.value = 'test123456';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeTruthy();
          });
          password_input(fixture).nativeElement.value = 'testT12345';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeFalsy();
          });
          password_input(fixture).nativeElement.value = 'Test12345';
          fixture.whenStable().then(() => {
               expect(password_input_notValid(fixture)).toBeFalsy();
          });
     });

     it('should submit signup form correctly', () => {
          password_input(fixture).nativeElement.value = 'Password123';
          email_input(fixture).nativeElement.value = 'test@test.com';
          firstName_input(fixture).nativeElement.value = 'test';
          lastName_input(fixture).nativeElement.value = 'test';
          termsAndConditions_input(fixture).nativeElement.value = true;
          submit_button(fixture).nativeElement.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
               const req = httpTestingController.expectOne('/users');
               const req2 = httpTestingController.expectOne('/user111111111');
               expect(req.request.method).toEqual('POST');
               expect(req.request.body).toEqual({ firstName: 'test', lastName: 'test', email: 'test@test.com' });
               req.flush({});
               httpTestingController.verify();
          });
     });
});
