import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { $notLoggedIn } from '../../shared/config/urls';

@Injectable()
export class RedirectIfNotLoggedInGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) {}
  
  canActivate (_next: ActivatedRouteSnapshot,
               _state: RouterStateSnapshot) {
    if ( this.auth.isAuthenticated() ) { return true; }
    let params: NavigationExtras = { queryParams: { err: 'auth', msg: 'not_logged_in', t: +new Date() } };
    this.router.navigate([ $notLoggedIn ], params);
    return false;
  }
}
