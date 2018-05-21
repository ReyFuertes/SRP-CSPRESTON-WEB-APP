import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
             template: '',
             styles: []
           })
export class SignoutComponent implements OnInit {
  
  constructor (
    private auth: AuthService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  
  ngOnInit () {
    this.authenticationService
    .logout()
    .subscribe((res) => { }, (err) => { console.log(err) });
    
    this.auth.logout();
    localStorage.clear();
    this.router.navigateByUrl('login');
  }  
}
