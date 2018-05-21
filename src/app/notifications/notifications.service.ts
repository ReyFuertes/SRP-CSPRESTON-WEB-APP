import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable()
export class NotificationsService {
  notificationChange: Subject<Object> = new Subject<Object>();

  public notify(severity: Severities, summary: string, detail: string) {
    this.notificationChange.next({ severity, summary, detail });
  }

  public success(message: string) {
  	return this.notify('success', 'Success Message', message);
  }

  public error (message: string) {
  	return this.notify('error', 'Error Message', message);
  }

  public warning(message: string) {
  	return this.notify('warn', 'Warning Message', message);
  }

  public info(message: string) {
  	return this.notify('info', 'Message', message);
  }
}
