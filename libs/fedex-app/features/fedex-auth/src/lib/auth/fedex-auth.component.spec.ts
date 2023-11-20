import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexAuthComponent } from './fedex-auth.component';

describe('FedexAuthComponent', () => {
     let component: FedexAuthComponent;
     let fixture: ComponentFixture<FedexAuthComponent>;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [FedexAuthComponent],
          }).compileComponents();

          fixture = TestBed.createComponent(FedexAuthComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
     });

     it('should create', () => {
          expect(component).toBeTruthy();
     });
});
