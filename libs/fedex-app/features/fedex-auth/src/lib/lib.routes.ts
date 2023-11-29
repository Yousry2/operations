import { Route } from '@angular/router';
import { FedexAuthComponent } from './auth/fedex-auth.component';
import { FedexSignupComponent } from './signup/fedex-signup.component';
import { AuthSuccessComponent } from './success/fedex-auth-success.component';
export const fedexAuthRoutes: Route[] = [
     {
          path: '',
          component: FedexAuthComponent,
          children: [
               { path: '', pathMatch: 'full', redirectTo: 'signup' },
               { path: 'signup', component: FedexSignupComponent },
          ],
     },
     { path: 'success', component: AuthSuccessComponent },
];
