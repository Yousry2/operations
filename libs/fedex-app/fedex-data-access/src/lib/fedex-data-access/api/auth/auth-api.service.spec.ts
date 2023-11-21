import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FedexAuthApiService } from './auth-api.service';

describe('KkkkkkService', () => {
     let service: FedexAuthApiService;

     beforeEach(async () => {
          await TestBed.configureTestingModule({
               imports: [HttpClientTestingModule],
          }).compileComponents();
          TestBed.configureTestingModule({});
          service = TestBed.inject(FedexAuthApiService);
     });

     it('should be created', () => {
          expect(service).toBeTruthy();
     });
});
