import { AddressTypes } from '../../data/addressTypes';
import { States } from '../../data/AmericanStatesList';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input()
    public addresses = [];

    public addressTypes = AddressTypes;
    public addressFormGroup: FormGroup;
    public addressType = 'HOME';
    public addr = '';
    public city = '';
    public state = '';
    public zipCode = '';
    public addressFormSubmitted = false;
    public states = States

    constructor() { }

    ngOnInit() {
        this.addressFormGroupInit();
    }

    protected addressFormGroupInit() {
        this.addressFormGroup = new FormGroup({
            'addr': new FormControl(this.addr, [Validators.required]),
            'city': new FormControl(this.city, [Validators.required]),
            'state': new FormControl(this.state, [Validators.required]),
            'zipCode': new FormControl(this.zipCode, [Validators.required])
        });
    }

    /**
     * Remove address
     *
     * @param number index
     */
    public removeAddress(index) {
        this.addresses.splice(index, 1);
    }

    public isAddressValid() {
        return this.addressFormGroup.dirty && this.addressFormGroup.valid;
    }

    public addNewAddress() {
        this.addressFormSubmitted = true;

        if (!this.isAddressValid()) {
            return;
        }

        this.addresses.push({
            type: this.addressType,
            address: this.addr,
            city: this.city,
            state: this.state,
            zip: this.zipCode
        });

        this.addressFormGroup.reset();
        this.addressFormSubmitted = false;
    }

}
