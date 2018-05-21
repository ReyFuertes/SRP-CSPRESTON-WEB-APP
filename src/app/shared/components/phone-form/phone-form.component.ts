import { PhoneTypes } from '../../data/phoneTypes';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'phone-form',
    templateUrl: './phone-form.component.html',
    styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {

    @Input()
    public phones;

    public phoneNumbersForm: FormGroup;
    public phoneFieldValue: string;
    public phoneTypes = PhoneTypes

    constructor() { }

    ngOnInit() {
        this.phoneNumbersFormGroupInit();
    }

    protected phoneNumbersFormGroupInit() {
        this.phoneNumbersForm = new FormGroup({
            'phoneNumber': new FormControl(this.phoneFieldValue, [
                Validators.required
            ])
        });
    }

    /**
     * Add new phone
     *
     * @param string type
     * @param string phone
     * @return void
     */
    public addNewPhone(type, phone) {

        if (!this.isValidPhone()) {
            return;
        }

        this.phones.push({
            type: type.value,
            number: phone.value
        });

        this.phoneNumbersForm.get('phoneNumber').reset();
    }

    /**
     * Remove phone
     *
     * @param number index
     */
    public removePhone(index) {
        this.phones.splice(index, 1);
    }

    /**
     * Determine if phone field is valid
     *
     * @return boolean
     */
    public isValidPhone() {
        return this.phoneNumbersForm.get('phoneNumber').valid;
    }

    /**
     * Determine if phone field as been change
     *
     * @return boolean
     */
    public isPhoneFieldDirty() {
        return this.phoneNumbersForm.get('phoneNumber').dirty;
    }

    /**
     * Only allow phone numbers to be inputted and auto-format number
     *
     * @param $event event
     * @return void
     */
    public phoneNumberOnly(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        const inputChar = String.fromCharCode(event.charCode);

        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            return false;
        }

        if (event.target.value.length === 3 || event.target.value.length === 7) {
            event.target.value += '-';
        }
    }

}
