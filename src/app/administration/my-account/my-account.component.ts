import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/functions/CustomValidators';

@Component({
             selector: 'app-my-account',
             templateUrl: './my-account.component.html',
             styleUrls: [ './my-account.component.scss' ]
           })
export class MyAccountComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "My Account",
      path: ''
    }
  ];

  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;
  @ViewChild('changePasswordModal') changePasswordModal;
  @ViewChild('changeEmailAddressModal') changeEmailAddressModal;
  
  constructor (private modalService: NgbModal, private notification: NotificationsService,
               private formBuilder: FormBuilder) {
    this.changeEmailForm = formBuilder.group(
      {
        emails: formBuilder.group(
          {
            'email': [ null, Validators.compose([ Validators.required, Validators.email ]) ],
            'emailConfirmation': [ null, Validators.compose([ Validators.required, Validators.email ]) ]
          }, { validator: CustomValidators.emailsMatch })
      });
    
    this.changePasswordForm = formBuilder.group(
      {
        passwords: formBuilder.group(
          {
            'password': [ null, Validators.compose(
              [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
                Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}/g)
              ])
            ],
            'passwordConfirmation': [ null, Validators.compose(
              [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
                Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}/g)
              ])
            ]
          }, { validator: CustomValidators.passwordsMatch })
      });
  }
  
  ngOnInit () {
  }
  
  openChangePasswordModal () {
    this.modalService.open(this.changePasswordModal);
  }
  
  openChangeEmailAddressModal () {
    this.modalService.open(this.changeEmailAddressModal);
  }
  
  submitPasswordChange (closeFn, values) {
    closeFn();
    this.changePasswordForm.reset();
    this.notification.success('Password Change', 'Password was changed successfully');
  }
  
  submitEmailAddressChange (closeFn, values) {
    closeFn();
    this.changeEmailForm.reset();
    this.notification.success('Email Address Change', 'Email Address was changed successfully');
  }
  
  emailHasSuccess () {
    let controls: any = this.changeEmailForm.controls;
    let email = controls.emails.controls.email;
    return email.valid && !this.emailHasWarning();
  }
  
  emailHasWarning () {
    let controls: any = this.changeEmailForm.controls;
    let emailConfirmation = controls.emails.controls.emailConfirmation;
    let email = controls.emails.controls.email;
    let emails = controls.emails;
    return email.dirty && emailConfirmation.dirty && emails.hasError('emailsMatch') && !this.emailHasDanger();
  }
  
  emailHasDanger () {
    let controls: any = this.changeEmailForm.controls;
    let email = controls.emails.controls.email;
    return !email.valid && email.touched;
  }
  
  emailHasError (error: string, el: string) {
    let controls: any = this.changeEmailForm.controls;
    controls = {
      emailConfirmation: controls.emails.controls.emailConfirmation,
      email: controls.emails.controls.email,
      emails: controls.emails
    };
    if ( error === 'required' ) {
      return controls[ el ].hasError('required') && controls[ el ].touched;
    }
    if ( error === 'email' ) {
      return controls[ el ].hasError('email') && controls[ el ].touched;
    }
    if ( error === 'emailsMatch' ) {
      return controls.emails.hasError('emailsMatch') && controls.email.dirty && controls.emailConfirmation.dirty;
    }
  }
  
  emailConfirmationHasSuccess () {
    let controls: any = this.changeEmailForm.controls;
    let emailConfirmation = controls.emails.controls.emailConfirmation;
    return emailConfirmation.valid && !this.emailConfirmationHasWarning();
  }
  
  emailConfirmationHasWarning () {
    let controls: any = this.changeEmailForm.controls;
    let emailConfirmation = controls.emails.controls.emailConfirmation;
    let email = controls.emails.controls.email;
    let emails = controls.emails;
    return email.dirty && emailConfirmation.dirty && emails.hasError(
        'emailsMatch') && !this.emailConfirmationHasDanger();
  }
  
  emailConfirmationHasDanger () {
    let controls: any = this.changeEmailForm.controls;
    let emailConfirmation = controls.emails.controls.emailConfirmation;
    return !emailConfirmation.valid && emailConfirmation.touched;
  }
  
  
  passwordHasSuccess () {
    let controls: any = this.changePasswordForm.controls;
    let password = controls.passwords.controls.password;
    return password.valid && !this.passwordHasWarning();
  }
  
  passwordHasWarning () {
    let controls: any = this.changePasswordForm.controls;
    let passwordConfirmation = controls.passwords.controls.passwordConfirmation;
    let password = controls.passwords.controls.password;
    let passwords = controls.passwords;
    return password.dirty && passwordConfirmation.dirty && passwords.hasError(
        'passwordsMatch') && !this.passwordHasDanger();
  }
  
  passwordHasDanger () {
    let controls: any = this.changePasswordForm.controls;
    let password = controls.passwords.controls.password;
    return !password.valid && password.touched;
  }
  
  passwordHasError (error: string, el: string) {
    let controls: any = this.changePasswordForm.controls;
    controls = {
      passwordConfirmation: controls.passwords.controls.passwordConfirmation,
      password: controls.passwords.controls.password,
      passwords: controls.passwords
    };
    if ( error === 'required' ) {
      return controls[ el ].hasError('required') && controls[ el ].touched;
    }
    if ( error === 'minLength' ) {
      return controls[ el ].hasError('minLength') && controls[ el ].touched;
    }
    if ( error === 'maxLength' ) {
      return controls[ el ].hasError('maxLength') && controls[ el ].touched;
    }
    if ( error === 'pattern' ) {
      return controls[ el ].hasError('pattern') && controls[ el ].touched;
    }
    if ( error === 'passwordsMatch' ) {
      return controls.passwords.hasError(
          'passwordsMatch') && controls.password.dirty && controls.passwordConfirmation.dirty;
    }
  }
  
  passwordConfirmationHasSuccess () {
    let controls: any = this.changePasswordForm.controls;
    let passwordConfirmation = controls.passwords.controls.passwordConfirmation;
    return passwordConfirmation.valid && !this.passwordConfirmationHasWarning();
  }
  
  passwordConfirmationHasWarning () {
    let controls: any = this.changePasswordForm.controls;
    let passwordConfirmation = controls.passwords.controls.passwordConfirmation;
    let password = controls.passwords.controls.password;
    let passwords = controls.passwords;
    return password.dirty && passwordConfirmation.dirty && passwords.hasError(
        'passwordsMatch') && !this.passwordConfirmationHasDanger();
  }
  
  passwordConfirmationHasDanger () {
    let controls: any = this.changePasswordForm.controls;
    const passwordConfirmation = controls.passwords.controls.passwordConfirmation;
    return !passwordConfirmation.valid && passwordConfirmation.touched;
  }
  
  
}
