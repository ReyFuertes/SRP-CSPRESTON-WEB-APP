import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutes } from './authentication.routing';
import { SigninComponent } from './signin/signin.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SignoutComponent } from './signin/signout.component';
import { AuthenticationService } from './authentication.service';
import { NotificationsService } from '../notifications/notifications.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LockscreenComponent],
  providers: [ AuthenticationService, NotificationsService ]
})

export class AuthenticationModule {}
