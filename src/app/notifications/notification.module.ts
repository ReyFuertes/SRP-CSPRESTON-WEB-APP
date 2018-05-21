import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './notifications.service';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ]
})

export class NotificationModule {
  static forRoot() {
    return {
      ngModule: NotificationModule,
      providers: [ NotificationsService ]
    }
  }
}
