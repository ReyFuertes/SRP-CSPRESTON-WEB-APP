import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
   selector: 'app-change',
   templateUrl: './change.component.html',
   styleUrls: [ './change.component.scss' ]
 })

export class ChangeComponent implements OnInit {
  
  public form: FormGroup;

  public token = null;

  public email = null;

  public message = '';

  public changed = false;

  public errors = false;

  public valid = false;

  public error_messages = [];
  
  constructor (private fb: FormBuilder, 
               private router: Router, 
               private activatedRoute: ActivatedRoute,
               private authenticationService: AuthenticationService,
               private notificationService: NotificationsService) {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.token = params.token;
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.email = params.email;
    });
  }
  
  ngOnInit () {
    this.form = this.fb.group(
      {
        token: [ this.token, Validators.compose([ Validators.required ]) ],
        email: [ this.email, Validators.compose([ Validators.required ]) ],
        password: [ null, Validators.compose([ Validators.required ]) ],
        confirm_password: [ null, Validators.compose([ Validators.required ]) ]
      });

    if (this.token != null && this.email != null) {

      this
        .authenticationService
        .validate(this.token, this.email)
        .subscribe(
          (res) => {
            this.valid = true;
          },
          (error) => {
            this.router.navigate(['/login']);
          }
        );
      } else {
         this.router.navigate(['/login']);
      }
  }
  
  public onSubmit (loginData) {
    this
      .authenticationService
      .change(loginData)
      .subscribe(
        (res) => {
          
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('name', JSON.stringify(res.name));
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('ng2-ui-auth_token', res.token);

          if (res.user.role_name == 'ROLE_CREW') {
            this.router.navigate(['/timecard']);
          } else if (res.user.role_name == 'ROLE_SUPERINTENDENT' || res.user.role_name == 'ROLE_AP_MANAGER') {
            this.router.navigate(['/employee-timecards']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          this.error_messages = [];

          if (error.errors) {
            var errors = error.errors;

            for (var err in errors) {
              this.notificationService.error(errors[err]);
            }
          }
        }
      );
  }
}
