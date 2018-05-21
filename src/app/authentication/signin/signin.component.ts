import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ILoginData } from '../../shared/interfaces/Login';
import { AuthenticationService } from '../authentication.service'
import { AuthService } from 'ng2-ui-auth';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [ './signin.component.scss' ],
  providers: [
    AuthService
  ]
 })

export class SigninComponent implements OnInit {
  
  public form: FormGroup;
  
  public error = false;
  
  constructor (
    private fb: FormBuilder, 
    private router: Router,
    private auth: AuthService,
    private authService: AuthenticationService,
    private notificationService: NotificationsService
  ) {}
  
  ngOnInit () {
    this.loadForm();
  }

  protected loadForm() {
    this.form = this.fb.group(
      {
        email: [ null, Validators.compose([ Validators.required, Validators.email ]) ],
        password: [ null, Validators.compose([ Validators.required ]) ]
      });
  }
  
  public onSubmit (loginData: ILoginData) {

    this.auth.login(loginData)
    .subscribe(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('name', JSON.stringify(res.name));
        localStorage.setItem('auth_token', res.token);

        if (res.user.role_name == 'ROLE_CREW') {
          this.router.navigate(['/timecard']);
        } else if (res.user.role_name == 'ROLE_SUPERINTENDENT' || res.user.role_name == 'ROLE_AP_MANAGER' || res.user.role_name == 'ROLE_ESTIMATOR') {
          this.router.navigate(['/employee-timecards']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, 
      (error) => {
        let json = error.error;
        
        if (json.error) {
          this.notificationService.error(json.error);
        }
      }
  );
  }
  
}
