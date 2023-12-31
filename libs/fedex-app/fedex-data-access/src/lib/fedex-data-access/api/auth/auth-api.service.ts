import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignupDTO } from '../../models';
import { environment } from '@operations/util-environments';

export const SIGNUP_URL = environment.server + '/users';

@Injectable({ providedIn: 'root' })
export class FedexAuthApiService {
     http = inject(HttpClient);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     signup(user: UserSignupDTO): Observable<any> {
          return this.http.post<UserSignupDTO>(SIGNUP_URL, { user });
     }
}
