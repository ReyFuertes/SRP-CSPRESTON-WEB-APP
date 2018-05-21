import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../../models/contact.model';
import { FormType } from '../../shared/data/FormType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneTypes } from '../../shared/data/phoneTypes';
import { EmailTypes } from '../../shared/data/emailTypes';
import { AddressTypes } from '../../shared/data/addressTypes';
import { States } from '../../shared/data/AmericanStatesList';
import { ContactTypes } from '../../shared/data/contactTypes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './../../notifications/notifications.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

enum ContactType {
  PERSON = 'person',
  COMPANY = 'company'
};

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    providers: [
        ContactService
    ]
})

export class ContactFormComponent implements OnInit, AfterViewInit {

    @Input()
    public formType = FormType.New;

    @Input()
    public breadcrumbs: any = [];

    public formTitle = 'Contact';

    @Input()
    public contact: Contact;

    @Output()
    public backButtonClick = new EventEmitter();

    @Output()
    public messageUpdater = new EventEmitter();

    @ViewChild('deleteContactModal')
    public deleteContactModal;

    public contactTypes = ContactTypes;

    public contactRoles: any = [];

    public contactRole = 3;

    public phoneTypes = PhoneTypes;

    public emailTypes = EmailTypes;

    public addressTypes = AddressTypes;

    public phoneFieldValue: string;

    public emailFieldValue: string;

    public states = States;

    public phoneNumbersForm: FormGroup;

    public emailFormGroup: FormGroup;

    public basicInfoFormGroup: FormGroup;

    public addressFormGroup: FormGroup;

    public firstName = '';

    public lastName = '';

    public displayName = '';

    public companyLists = [];

    public companyType = 0;

    public addressType = 'HOME';

    public addr = '';

    public city = '';

    public state = '';

    public zipCode = '';

    public addressFormSubmitted = false;

    protected _companyId = 0;

    public loading = false;

    public modalRef;

    /**
     * @param ContactService contactService
     */
    constructor(
        private contactService: ContactService,
        private notificationService: NotificationsService,
        private modalService: NgbModal,
        private router: Router
    ) { }

    ngOnInit() {
        this.populateCompanies();
        this.populateContactRoles();
        this.phoneNumbersFormGroupInit();
        this.emailFormGroupInit();
        this.basicInfoFormGroupInit();
        this.addressFormGroupInit();

        window.scrollTo(0, 0);
    }

    ngAfterViewInit() {
        if (this.formType === 'Edit') {
            this.onCompanyTypeChange();
        }
    }

    set companyId(value: number) {
        this._companyId = value;

        this.contact.company = this.findCompanyById(value);
    }

    protected findCompanyById(id: any) {
        for (let key in this.companyLists) {
            let c = this.companyLists[key];

            if (c.id === id) {
                return c.text;
            }
        }

        return '';
    }

    protected findCompanyByName(name: any) {
        for (let key in this.companyLists) {
            let c = this.companyLists[key];

            if (c.text === name) {
                return c.id;
            }
        }

        return 0;
    }

    get companyId() {
        return this._companyId;
    }

    protected populateCompanies(typeId?: number, callback?)
    {
        this.companyLists = [];

        this.contactService
            .getCompanies(typeId)
            .subscribe(
                (res) => {
                    for (const key in res.data) {
                        this.companyLists.push({
                            id: key,
                            text: res.data[key]
                        });
                    }

                    this.companyLists = this.companyLists.slice(0, this.companyLists.length);

                    if (callback === undefined) {
                        this.companyId = this.findCompanyByName(this.contact.company);
                    }

                    if (callback !== undefined) {
                        callback(this);
                    }
                }
            );
    }

    protected basicInfoFormGroupInit() {
        this.basicInfoFormGroup = new FormGroup({
            'displayName': new FormControl(this.displayName, [Validators.required]),
            'contactTitle': new FormControl(this.contact.title, []),
            'firstName': new FormControl(this.contact.first_name, []),
            'lastName': new FormControl(this.contact.last_name, []),
            'companyName': new FormControl(this.contact.company, []),
            'website': new FormControl(this.contact.website, []),
            'notes': new FormControl(this.contact.notes, [])
        });
    }

    protected addressFormGroupInit() {
        this.addressFormGroup = new FormGroup({
            'addr': new FormControl(this.addr, [ Validators.required]),
            'city': new FormControl(this.city, [Validators.required]),
            'state': new FormControl(this.state, [Validators.required]),
            'zipCode': new FormControl(this.zipCode, [Validators.required])
        });
    }

    protected emailFormGroupInit() {
        this.emailFormGroup = new FormGroup({
            'emailAddr': new FormControl(this.emailFieldValue, [
                Validators.email
            ])
        });
    }

    protected phoneNumbersFormGroupInit()
    {
        this.phoneNumbersForm = new FormGroup({
            'phoneNumber': new FormControl(this.phoneFieldValue, [
                Validators.required
            ])
        });
    }

    protected populateContactRoles() {
        this.contactService
        .listContactRoles()
        .subscribe(
            (res) => {
                this.contactRoles = [];

                for (let key in res.data) {
                    this.contactRoles.push({
                        id: res.data[key].id,
                        text: res.data[key].role
                    });
                }

                this.contactRoles = this.contactRoles.slice(0, this.contactRoles.length);
            
            }
        );
    }

    /**
     *  Set contact type
     *
     * @param string contactType
     * @return void
     */
    public setContactType(contactType: string) {
        this.contact.contact_type = contactType;
    }

    /**
     * Check if contact is of type PERSON
     *
     * @return boolean
     */
    public isPerson() {
        return this.contact.contact_type.toLowerCase() === ContactType.PERSON;
    }

    /**
     * Check if contact is of type COMPANY
     *
     * @return boolean
     */
    public isCompany() {
        return this.contact.contact_type.toLowerCase() === ContactType.COMPANY;
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

        this.contact.phones.push({
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
        this.contact.phones.splice(index, 1);
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

        this.contact.emails.push({
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
        this.contact.emails.splice(index, 1);
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

    /**
     * Populate company lists of company type field change
     *
     * @return void
     */
    public onCompanyTypeChange() {
        this.populateCompanies(
            this.companyType,
            function(obj) {
                // const cId = obj.companyLists.shift();

                // if (cId === undefined) {
                //     return;
                // }

                // obj.companyLists.unshift(cId);
                // obj.companyId = cId.id;
            }
        );
    }

    /**
     * Remove address
     *
     * @param number index
     */
    public removeAddress(index) {
        this.contact.addresses.splice(index, 1);
    }

    public isAddressValid() {
        return this.addressFormGroup.dirty && this.addressFormGroup.valid;
    }

    public addNewAddress() {
        this.addressFormSubmitted = true;

        if (!this.isAddressValid()) {
            return;
        }

        this.contact.addresses.push({
            type: this.addressType,
            address: this.addr,
            city: this.city,
            state: this.state,
            zip: this.zipCode
        });

        this.addressFormGroup.reset();
        this.addressFormSubmitted = false;
    }

    public resetForm() {
        this.basicInfoFormGroup.reset();
        this.addressFormGroup.reset();
        this.phoneNumbersForm.reset();
        this.emailFormGroup.reset();
        this.contact.phones = [];
        this.contact.emails = [];
        this.contact.addresses = [];
    }

    protected createNewContact() {
        this.loading = true;

        this.contactService
            .createContact(this.contact)
            .subscribe(
                (res) => {
                    this.loading = false;
                    this.notificationService.notify('success', this.formTitle + ' sucessfully saved.', '');
                    this.resetForm();
                }
            );
    }

    protected updateContact() {
        this.loading = true;

        this.contactService
            .updateContact(this.contact, this.contact.id)
            .subscribe(
                (res) => {
                    this.loading = false;
                    this.notificationService.notify('success', this.formTitle + ' sucessfully saved.', '');
                }
            );
    }

    public save() {
        if (this.formType === FormType.New) {
            this.createNewContact();
        }

        if (this.formType === FormType.Edit) {
            this.updateContact();
        }
    }

    public back() {
        this.backButtonClick.emit();
    }

    public newSuccessEvent(msg) {
        this.messageUpdater.emit({
            message: msg
        });
    }

    public deleteContact() {
        this.contactService
            .delete(this.contact.id)
            .subscribe(
                (res) => {
                    this.modalRef.close();
                    this.newSuccessEvent('Contact successfully deleted.');
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public onDeleteContact() {
        this.modalRef = this.modalService.open(this.deleteContactModal);
    }
}
