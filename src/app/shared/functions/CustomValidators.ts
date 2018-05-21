'use strict';
import { AbstractControl } from '@angular/forms';

export const CustomValidators = {
  passwordsMatch: (control: AbstractControl) => {
    return control.get('password').value === control.get('passwordConfirmation').value ? null : { passwordsMatch: true };
  },
  emailsMatch: (control: AbstractControl) => {
    return control.get('email').value === control.get('emailConfirmation').value ? null : { emailsMatch: true };
  },
  phoneNumber: (control: AbstractControl) => {
    return /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g.test(control.value) ? null : {phoneNumber:true};
  }
};
