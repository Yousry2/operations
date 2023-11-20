import { Route } from '@angular/router';

export const appRoutes: Route[] = [
     {
          path: '',
          pathMatch: 'full',
          redirectTo: 'auth',
     },

     {
          path: 'auth',
          loadChildren: () => import('@operations/fedex-auth').then((m) => m.fedexAuthRoutes),
     },
];
