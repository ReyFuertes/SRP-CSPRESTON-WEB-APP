import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private notificationService: NotificationsService) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.auth.isAuthenticated()) { return true; }
        
        this.notificationService.error('Unauthenticated User / Token Expired');

        setTimeout(() => {
            this.router.navigateByUrl('login');
            return false;
        }, 3000);
    }
}
