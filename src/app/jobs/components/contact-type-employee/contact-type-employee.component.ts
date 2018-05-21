import { JobService } from './../../job.service';
import { JobContact } from './../../../models/job.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Job } from './../../../models/job.model';

@Component({
  selector: 'srp-contact-type-employee',
  templateUrl: './contact-type-employee.component.html',
  styleUrls: ['./contact-type-employee.component.scss']
})
export class ContactTypeEmployeeComponent implements OnInit {
  public jobContact = new JobContact();
  public jobContacts: JobContact[] = [];

  @Input()
  public jobInfo: Job;

  @Input()
  public role: any;

  @Input()
  public contacts: any[];

  @Output()
  public onDeleteChange = new EventEmitter<number>();

  @Output()
  public dropdownChange = new EventEmitter<any>();


  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    console.log('role', this.role.name);
  }

  public mapToEmailToString(obj: any) {
    return obj.length > 0 ? obj.map(prop => prop.email).join(',') : '';
  }

  public handleChange(contact: any) {
    this.jobContact = contact
    console.log('handleChange', contact);

    // this.jobContacts.push({
    //   job_id: 2,
    //   contact_id: i.id,
    //   role_id: 1,
    //   role_type: "EmployeeRole",
    //   name: i.name,
    //   role_value: "Estimator",
    //   emails: i.emails,
    //   phones: i.phones
    // }));

    const jobContact = contact.map(i => ({
      job_id: this.jobInfo.id,
      id: 504,
      contact_id: 55,
      role_id: 1,
      role_type: "EmployeeRole",
      name: "Abraham Arreloa",
      role_value: "Estimator",
      emails: [],
      phones: []
    }))

    contact.job_id = this.jobInfo.id;

    console.log('contact', contact);

    this.jobService.updateJobContact(contact, contact.id).subscribe((() => {
      console.log('%c jobContact Updated', 'color: green; font-weight: bold;');
    }))


    // if (newItem.name !== this.jobContact.name) {
    //   this.dropdownChange.emit({
    //     new: newItem,
    //     old: this.jobContact
    //   });
    // }
  }

  public mapToPhoneToString(obj: any) {
    return obj.length > 0 ? obj.map(prop => prop.number).join(',') : '';
  }

  public removeJobContact(id: number) {
    this.onDeleteChange.next(id);
  }

}

