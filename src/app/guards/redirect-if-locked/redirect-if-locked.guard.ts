import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { $lockScreen } from '../../shared/config/urls';

@Injectable()
export class RedirectIfLockedGuard implements CanActivate {
  
  constructor (private router: Router,private localStorage:LocalStorageService) {}
  
  canActivate (_next: ActivatedRouteSnapshot,
               _state: RouterStateSnapshot) {
    if(this.localStorage.get('locked')){
      let params: NavigationExtras = { queryParams: { err: 'auth', msg: 'locked', t: +new Date(), ref: this.router.url} };
      this.router.navigate([ $lockScreen ], params);
      return false
    }
    return true;
  }
}
