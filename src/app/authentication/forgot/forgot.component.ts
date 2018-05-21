import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: [ './forgot.component.scss' ]
 })

export class ForgotComponent implements OnInit {
  
  public error = null;

  public message = null;

  public form: FormGroup;
  
  constructor (private fb: FormBuilder,
               private router: Router,
               private authService: AuthenticationService,
               private notificationService: NotificationsService) {}
  
  ngOnInit () {
    this.loadForm();
  }

  protected loadForm() {
    this.form = this.fb.group(
      {
        email: [ null, Validators.compose([ Validators.required, Validators.email ]) ]
      });
  }
  
  public onSubmit (form) {
    
    this
    .authService
    .forgot(form.email)
    .subscribe((res) => {
      this.notificationService.success('Recovery email has been sent.');
    }, 
    (err) => {
      if (err.message) {
        this.notificationService.error(err.message);
      }
    })
  }
}
