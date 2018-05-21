import { IDropdownSimpleListItem } from './../../models/dropdown-list-items.model';
import { Job, JobContact } from './../../models/job.model';
import { Employee, IEmployeeRole } from './../../models/employees.model';
import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { JobService } from '../job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'srp-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  public currentStep = 1;
  public contactTypes: IDropdownSimpleListItem[] = [];
  public employeeRoles: IDropdownSimpleListItem[] = [];
  public contactRoles: any[] = [];
  public subcontratorRoles: IDropdownSimpleListItem[] = [];

  public paymentTerms: IDropdownSimpleListItem[] = [];
  public modalRef;
  public employeeRole: number = 1;
  public contactRole: number = 1;
  public jobInfo = new Job();
  public tabItems: MenuItem[];
  public activeTabItem: MenuItem;

  @Input()
  public breadcrumbs: any[];

  @Input()
  public title: string = '';

  @Input()
  public isNew: boolean = false;

  private _data = new BehaviorSubject(<Job>{});
  @Input()
  public set job(value) {
    this._data.next(value);
  };
  public get job() {
    return this._data.getValue();
  }

  @ViewChild('addJobCustomerModal') addJobCustomerModal;
  @ViewChild('addCustomerModal') addCustomerModal: NgbModal;

  constructor(private contactService: ContactService, private jobService: JobService) {
  }

  ngOnInit(): void {
    this.listPaymentTerms();
    this.listEmployeeRoles();
    this.listContactRoles();
    this.getSubcontratorRoles();
    this.getAllJobContacts();

    this._data.subscribe(() => {
      if (this.job) {
        console.log('%c job loaded with data', 'color: green; font-weight: bold;');
        this.jobInfo = this.job;
      }
    });

    this.tabItems = [
      {
        label: 'Customer Information', icon: 'fa-user', disabled: true
      },
      {
        label: 'Job Information', icon: 'fa-briefcase', disabled: true
      },
      {
        label: 'Contacts', icon: 'fa-book', disabled: true
      }
    ];

    this.activeTabItem = this.tabItems[0];
  }

  public hasErrors: boolean = false;
  public compErrors: any[] = [];
  public onChangeErrors = (event: any) => {
    this.compErrors.push(event);
    
    console.log('this.hasErrors', this.compErrors);
  }

  public changeTab(event) {
    this.currentStep = event;
    this.activeTabItem = this.tabItems[<number>event - 1];
  }

  public contacts: JobContact[];
  private getAllJobContacts = () => {
    this.contactService.getAllJobContacts().subscribe((res) => {
      if (res.data)
        this.contacts = res.data;
      else
        this.contacts = [];
    });
  }

  public listContactRoles(): void {
    this.contactService.listContactRoles().subscribe((res) => {
      res.data.forEach((i: any) => {
        this.contactRoles.push({ id: i.id, text: i.role, name: i.role })
      });
    }, (err) => {
      console.log(err); //TODO: Create an alert service
    });
  }

  public getSubcontratorRoles(): void {
    this.contactService.getSubcontratorRoles().subscribe((res) => {
      res.data.forEach((i: any) => {
        this.subcontratorRoles.push({ id: i.id, name: i.role, value: i.id.toString() })
      });
    }, (err) => {
      console.log(err); //TODO: Create an alert service
    });
  }

  public listEmployeeRoles(): void {
    this.contactService.listEmployeeRoles().subscribe((res) => {
      res.data.forEach((i: any) => {
        this.employeeRoles.push({ id: i.id, name: i.role, value: i.id.toString() })
      });
    });
  }

  public listPaymentTerms() {
    this.jobService.paymentTerms().subscribe((res) => {
      res.data.forEach((term) => {
        this.paymentTerms.push({ name: term.name, id: +term.id, value: term.toString() });
      });
    }, (err) => {
      console.log(err); //TODO: Create an alert service
    });
  }

  public onClosingModal(): void {
    this.modalRef.close();
  }

  public isActiveStep(step: number): boolean {
    return step === this.currentStep;
  }

  public goToStep(step: number): void {
    this.currentStep = step;
  }
}
