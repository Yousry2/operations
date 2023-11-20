import { Route } from '@angular/router';
import { FedexAuthComponent } from './auth/fedex-auth.component';
import { FedexSignupComponent } from './signup/fedex-signup.component';
export const fedexAuthRoutes: Route[] = [
     {
          path: '',
          pathMatch: 'full',
          component: FedexAuthComponent,
          children: [
               { path: '', pathMatch: 'full', redirectTo: 'signup' },
               { path: 'signup', component: FedexSignupComponent },
          ],
     },
];
