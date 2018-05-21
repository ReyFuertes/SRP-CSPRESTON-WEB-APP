import { JobService } from './../../job.service';
import { Contact } from './../../../contacts/contact.model';
import { CustomerTypeEnum } from './../../../models/customer-information.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job, JobContact } from './../../../models/job.model';
import { Employee } from './../../../employees/employee.model';
import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { Component, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../contacts/contact.service';
import { ContactCategoryEnum, ContactTypeEnum } from '../../../models/contact.enum';
import { RoleTypes } from '../../../shared/data/roleTypes';
import { JobRoleTypes } from '../../../models/roles.enum';
import { ContactTypeComponent } from '../contact-type/contact-type.component';
import { ContactCategory } from '../../../models/contact.model';
import { NotificationsService } from '../../../notifications/notifications.service';
import { ContactTypeData } from '../../../shared/data/contactType.data';

@Component({
  selector: 'srp-job-contacts-information',
  templateUrl: './contacts-information.component.html',
  styleUrls: ['./contacts-information.component.scss']
})

export class JobContactInformationComponent {
  public prevTabIndex = 2;
  public empCustSubRole: any = [];
  public customerTypes: any[];
  public contactTypes: any[];
  public jobContacts: any[] = [];
  public display: boolean = false;
  public contactTypeData = ContactTypeData;
  public isDefaultFirstItem: boolean = false;

  @Input()
  public contacts: any[];

  @Input()
  public jobInfo: Job;

  @Input()
  public isNew: boolean = false;

  @Input()
  public employeeRoles: IDropdownSimpleListItem[];

  @Input()
  public contactRoles: IDropdownSimpleListItem[];

  @Input()
  public subcontratorRoles: IDropdownSimpleListItem[];

  @Input()
  public isVisible: boolean = false;

  private _hasInvalidFields: boolean = false;
  @Input()
  public set hasInvalidFields(value: boolean) {
    console.log('hasInvalidFields1', value);
    this._hasInvalidFields = value;
  }
  public get hasInvalidFields(): boolean {
    return this._hasInvalidFields;
  }

  @Output()
  public tabChange = new EventEmitter<number>();

  @Output()
  public customerJobChange = new EventEmitter<Job>()

  public filteredContacts: any[] = [];
  public formattedContacts: any[] = [];

  constructor(private notificationService: NotificationsService, private router: Router, private activatedRoute: ActivatedRoute, private jobService: JobService, private contactService: ContactService, private modalService: NgbModal) {
    this.customerTypes = Object.keys(CustomerTypeEnum).map(key => ({
      value: key.toLowerCase().replace('-', '').concat('s'),
      name: key
    }));
  }

  ngOnInit(): void {
    //when in editing mode
    if (!this.isNew) {
      this.jobInfo.jobContacts.forEach(i => {
        const contacts: any = {
          contact_id: i.contact_id || '',
          emails: i.emails || [],
          id: i.id || '',
          name: i.name || '',
          phones: i.phones || [],
          role_id: i.role_id || '',
          role_type: i.role_type || '',
          role_value: i.role_value || '',
          contacts: this.getContactByCategory(i.role_type)
        }
        this.jobContacts.push(contacts);
      })
    } else {
      //this.isDefaultFirstItem = true;
    }

    this.formattedContacts = this.contacts.map(i => ({
      id: i.id,
      name: i.name,
      category: i.category,
      phones: i.phones,
      emails: i.emails
    }));
  }

  public getContactByCategory(type: string): any[] {
    switch (type) {
      case JobRoleTypes.EmployeeRole:
        return this.contacts.filter(i => i.category == ContactCategoryEnum.EMPLOYEE);
      case JobRoleTypes.ContactRole:
        return this.contacts.filter(i => i.category == ContactCategoryEnum.CONTACT);
      case JobRoleTypes.SubcontractorRole:
        return this.contacts.filter(i => i.category == ContactCategoryEnum.CONTACT);
      default:
        return []
    }
  }

  public roleType: string;
  public subRoleDrpItems: IDropdownSimpleListItem[] = [];
  public onSelectCustType(type: number): void {
    if (type == ContactTypeEnum.Employee) {
      this.subRoleDrpItems = this.employeeRoles;
      this.roleType = JobRoleTypes.EmployeeRole;
      this.filteredContacts = this.formattedContacts.filter(i => i.category == ContactCategoryEnum.EMPLOYEE);
    } else if (type == ContactTypeEnum.Customer) {
      this.subRoleDrpItems = this.contactRoles;
      this.roleType = JobRoleTypes.ContactRole;
      this.filteredContacts = this.formattedContacts.filter(i => i.category == ContactCategoryEnum.CONTACT);
    }
    else if (type == ContactTypeEnum.Subcontractor) {
      this.subRoleDrpItems = this.subcontratorRoles;
      this.roleType = JobRoleTypes.SubcontractorRole;
      this.filteredContacts = this.formattedContacts.filter(i => i.category == ContactCategoryEnum.CONTACT);
    }
  }

  public handleItemChange(item: any) {
    if (item.old.id !== item.new.id) {
      let index = this.jobContacts.indexOf(item.old);

      item.old.contact_id = item.new.id;
      if (item.old.id) { //if no id then do not update
        this.jobService.updateJobContact(item.old, item.old.id).subscribe((() => {
          console.log('%c jobContact Updated', 'color: green; font-weight: bold;');
        }))
      }
    } else {
      
    }
  }

  public contactId: any;
  public addContact(): void {
    if (!this.contactId || !this.subRoleDrpItems)
      this.notificationService.notify('error', 'You have an invalid field!', null);

    const role: any = this.subRoleDrpItems.find(x => x.id === +this.empCustSubRole.id);
    const selContact: any = this.filteredContacts.find(x => x.id === +this.contactId);

    const contact = {
      name: selContact.name || '',
      contact_id: this.contactId || '',
      phones: selContact.phones || [],
      emails: selContact.emails || [],
      role_id: role.id || '',
      role_type: this.roleType || '',
      role_value: role.name || '',
      contacts: this.filteredContacts || []
    }

    this.jobContacts.push(contact);
    this.display = false;
  }

  public onTabChange(tabIndex: number): void {
    this.isVisible = false;
    this.tabChange.emit(tabIndex);
    this.customerJobChange.emit(this.jobInfo);
  }

  private doAfterSave = (success: boolean, err: any = null) => {
    if (success) {
      this.notificationService.notify('success', 'Successfull saved!', null);
      setTimeout(() => {
        this.router.navigate(['/view-jobs']);
      }, 3000);
    } else {
      this.notificationService.notify('error', 'Saving Failed!', err.error.message);
    }
  }

  public onFinish(): void {
    console.log('this.hasInvalidFields', this.hasInvalidFields);
    if(this.hasInvalidFields === true) {
      this.notificationService.notify('error', 'You have invalid field/s', null);
      return;
    }

    const jobContacts: any = this.jobContacts.map(i => {
      return { role_id: i.role_id, role_type: i.role_type, contact_id: i.contact_id }
    });

    this.jobInfo.jobContacts = jobContacts;
    this.customerJobChange.emit(this.jobInfo);

    if (this.isNew === true) {
      this.jobService.create(this.jobInfo).subscribe((res) => {
        if (res.data) {
          this.doAfterSave(true);
        }
      }, (err) => {
        this.doAfterSave(false, err);
      });
    } else {
      const ID = +this.activatedRoute.snapshot.params["id"];
      this.jobService.update(this.jobInfo, ID).subscribe((res) => {
        if (res.data) {
          this.doAfterSave(true);
        }
      }, (err) => {
        this.doAfterSave(false);
      });
    }
  }
}
