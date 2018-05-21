import { EmailTypes } from '../../data/emailTypes';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

    @Input()
    public emails = [];

    public emailTypes = EmailTypes;
    public emailFormGroup: FormGroup;
    public emailFieldValue: string;

    constructor() { }

    ngOnInit() {
        this.emailFormGroupInit();
    }

    protected emailFormGroupInit() {
        this.emailFormGroup = new FormGroup({
            'emailAddr': new FormControl(this.emailFieldValue, [
                Validators.email
            ])
        });
    }

    /**
     * Add new email
     *
     * @param string type
     * @param string email
     * @return void
     */
    public addNewEmail(type, email) {

        if (!this.isEmailValid()) {
            return;
        }

        this.emails.push({
            type: type.value,
            email: email.value
        });

        this.emailFormGroup.get('emailAddr').reset();
    }

    /**
     * Remove email
     *
     * @param number index
     */
    public removeEmail(index) {
        this.emails.splice(index, 1);
    }

    /**
     * Determine if email field has a valid email address
     *
     * @return boolean
     */
    public isEmailValid() {
        return this.emailFormGroup.get('emailAddr').valid;
    }

    /**
     * Determine if email field has been change
     *
     * @return boolean
     */
    public isEmailFieldDirty() {
        return this.emailFormGroup.get('emailAddr').dirty;
    }
}
