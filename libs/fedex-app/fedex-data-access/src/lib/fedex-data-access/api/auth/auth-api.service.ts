import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignup } from '../../models';

export const SIGNUP_URL = 'https://demo-api.vercel.app/users';

@Injectable({ providedIn: 'root' })
export class FedexAuthApiService {
     http = inject(HttpClient);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     signup(user: UserSignup): Observable<any> {
          return this.http.post(SIGNUP_URL, user);
     }
}
