import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
             selector: 'app-lockscreen',
             templateUrl: './lockscreen.component.html',
             styleUrls: [ './lockscreen.component.scss' ]
           })
export class LockscreenComponent {
  constructor (private router: Router, private auth: AuthService, private activatedRoute: ActivatedRoute,private localStorage:LocalStorageService) {}
  
  onSubmit () {
  
  }
}
