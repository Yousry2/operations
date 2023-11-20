import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexSignupComponent } from './fedex-signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('FedexSignupComponent', () => {
     let component: FedexSignupComponent;
     let fixture: ComponentFixture<FedexSignupComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [FedexSignupComponent, HttpClientTestingModule],
          }).compileComponents();

          fixture = TestBed.createComponent(FedexSignupComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
     it('should show all sign-up form fields', () => {
          fixture.debugElement.query(By.css('firstName'));
     });
});
