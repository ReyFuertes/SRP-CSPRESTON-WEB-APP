import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangeComponent } from './change/change.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RedirectIfLoggedInGuard } from '../guards/redirect-if-logged-in/redirect-if-logged-in.guard';
import { RedirectIfLockedGuard } from '../guards/redirect-if-locked/redirect-if-locked.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [ RedirectIfLoggedInGuard ]
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        canActivate: [ RedirectIfLoggedInGuard ]
      },
      {
        path: 'password/:token',
        component: ChangeComponent,
        canActivate: [ RedirectIfLoggedInGuard ]
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent
      }
    ]
  }
];
