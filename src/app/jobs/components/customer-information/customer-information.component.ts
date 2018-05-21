import { ContactCategoryEnum } from './../../../models/contact.enum';
import { EmailJobOption, PhoneJobOption } from './../../../models/customer-information.model';
import { ContactTypeData } from './../../../shared/data/contactType.data';
import { Job } from './../../../models/job.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from './../../job.service';
import { States } from 'app/shared/data/AmericanStatesList';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../contacts/contact.service';
import { CustomerInfoType } from '../../../models/customer-information.model';
import { CustomerOfficeEnum, CustomerTypeEnum, CustomerPhoneTypesEnum, CustomerEmailTypesEnum } from '../../../models/customer-information.enum';
import { State } from '../../../models/states.model';
import { Contact } from '../../../models/contact.model';
import { NotificationsService } from '../../../notifications/notifications.service';
import { ErrorState } from '../../../models/error';

@Component({
  selector: 'srp-job-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']

})

export class CustomerInformationComponent implements OnInit {
  @ViewChild('customerInfoForm') customerInfoForm: NgForm;

  public contact = new Contact();
  public states: State[];
  public prevTabIndex = 1;
  public nextTabIndex = 2;
  public ID: number;
  public phoneOptions: any[];
  public emailOptions: any[];
  public customerTypes: any[];
  public custOffices: any[];
  public toggleSameCustomerInfo: boolean = true;
  public toggleBillingCustomerInfo: boolean = true;
  public validateSelector: boolean = false;

  @Input()
  public isNew: boolean = false;

  @Input()
  public jobContacts: any[];

  @Input()
  public isVisible: boolean = false;

  @Input()
  public contactTypes: IDropdownSimpleListItem[];

  @Input()
  public contactRoles: any[];

  @Input()
  public jobInfo = new Job();

  @Output()
  public tabChange = new EventEmitter<number>();

  @Output()
  public customerJobChange = new EventEmitter<Job>()

  @Output()
  public onChangeErrors = new EventEmitter<any>();

  constructor(private notificationService: NotificationsService, private jobService: JobService, private contactService: ContactService, private modalService: NgbModal) {
    this.customerTypes = Object.keys(CustomerTypeEnum).map((key, val) => ({
      name: key
    }));

    this.custOffices = this.enumToArray(CustomerOfficeEnum);
    this.contactTypes = ContactTypeData;

    this.phoneOptions = Object.keys(CustomerPhoneTypesEnum).map(key => ({
      value: key, name: key
    }));

    this.emailOptions = Object.keys(CustomerEmailTypesEnum).map(key => ({
      value: key, name: key
    }));

    this.states = States.map(i => ({
      id: 0,
      name: i.name,
      value: i.value
    }));
  }

  ngOnInit(): void {
    this.jobInfo.customer_type = this.customerTypes[0].name;
    this.jobInfo.office = this.custOffices[0].name;

    this.jobContacts.filter(i => i.category === ContactCategoryEnum.CONTACT);
  }

  public getSelectorErrorState = (event: boolean) => {
    //todo: needs invalidControls implementation
  }


  public invalidControls: any[] = [];
  public getInvalidControls = () => {
    const controls = this.customerInfoForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsDirty();
        controls[name].markAsTouched();

        if (this.invalidControls.indexOf(name) === -1) {
          this.invalidControls.push(name);
        }
      } else {
        //remove valid controls
        const index: number = this.invalidControls.indexOf(name);
        if (index !== -1) {
          this.invalidControls.splice(index, 1);
        }
      }
    }
    const customerInfoHasErrors = this.invalidControls.length > 0 ? true : false;
    this.onChangeErrors.emit({ comp: 'customerInfoHasErrors', status: customerInfoHasErrors });
  }

  public inputValueChange(event: any) {
    if (event) {
      this.jobInfo.customer_id = event.id;

      if (this.isNew === true) {
        let customerInfoType: CustomerInfoType = {
          contact_id: event.id,
          contact_type: this.jobInfo.customer_type,
          office: this.jobInfo.office
        }
        this.generateJobNameAndId(customerInfoType);

        this.contactService.show(event.id).subscribe(res => {
          if (res.data) {
            this.jobInfo.address = res.data.addresses[0] ? res.data.addresses[0].address : '';
            this.jobInfo.city = res.data.addresses[0] ? res.data.addresses[0].city : '';
            this.jobInfo.zip = res.data.addresses[0] ? res.data.addresses[0].zip : '';
            this.jobInfo.fax = res.data.fax;
            this.jobInfo.state = res.data.addresses[0] ? res.data.addresses[0].state : '';
            this.jobInfo.phone = res.data.phones[0] ? res.data.phones[0].number : '';
            this.jobInfo.email = res.data.emails[0] ? res.data.emails[0].email : '';
          }
        })
      }
    }
  }

  public setPhoneValues(event: any): void {
    let cPhone: PhoneJobOption = {
      type: event.type,
      number: event.value
    }
    if (event.value)
      this.contact.phones = [cPhone];
  }

  public setEmailValues(event: any): void {
    let cEmail: EmailJobOption = {
      type: event.type,
      email: event.value
    }
    if (event.value)
      this.contact.emails = [cEmail];
  }

  private enumToArray(enums: any): any[] {
    return Object.keys(enums).map(key => ({ name: key }));
  }

  @ViewChild('addCustomerModal') addCustomerModal: NgbModal;
  public onAddingCustomerOnModal() { this.modalRef = this.modalService.open(this.addCustomerModal); }

  public onTabChange(tabIndex: number): void {
    this.validateSelector = true;
    this.getInvalidControls();

    this.isVisible = false;
    this.tabChange.emit(tabIndex);
    this.customerJobChange.emit(this.jobInfo);
  }

  public generateJobNameAndId(customerInfoType: CustomerInfoType): void {
    this.jobService.generateJobIdName(customerInfoType).subscribe((res) => {
      this.jobInfo.job_number = res.data.id;
      this.jobInfo.name = res.data.name;
    }, (err) => {
      console.log(err)
    });
  }

  //todo: move this to a generic parent page
  private doAfterSave = (success: boolean, err: string = '') => {
    if (success) {
      this.notificationService.notify('success', 'Customer Added!', null);
    } else {
      this.notificationService.notify('error', 'Saving Failed!', err);
    }
  }

  public modalRef: any;
  public customer = new Contact();
  public onCustomerSave = (contact: Contact) => {
    this.contactService.create(contact).subscribe(res => {
      if (res.data) {

        this.customer = <Contact>res.data;
        this.jobInfo.customer_id = res.data.id;
        this.jobInfo.customer = this.customer;

        let customerInfoType: CustomerInfoType = {
          contact_id: this.customer.id,
          contact_type: this.jobInfo.customer_type,
          office: this.jobInfo.office
        }
        this.generateJobNameAndId(customerInfoType);
        this.modalRef.close();

        this.doAfterSave(true);
      }
    }, (err) => {
      this.doAfterSave(true, err);
    });
  }
}
