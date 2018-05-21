import { Job } from './../../../models/job.model';
import { JobService } from './../../job.service';
import { JobRoleTypes } from './../../../models/roles.enum';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { JobContact } from '../../../models/job.model';
import { NotificationsService } from '../../../notifications/notifications.service';

@Component({
  selector: 'srp-contact-type-list',
  templateUrl: './contact-type-list.component.html',
  styleUrls: ['./contact-type-list.component.scss']
})

export class ContactTypeListComponent implements OnInit {
  private _jobContacts: JobContact[] = [];

  @Input()
  public jobInfo: Job;

  @Input()
  public employeeRoles: any[];

  @Input()
  public contacts: any[];

  @Input()
  public set jobContacts(values: JobContact[]) {
    this._jobContacts = values;
  }

  public get employeeContacts(): any[] {
    return this._jobContacts ? this._jobContacts.filter(i => i.role_type === JobRoleTypes.EmployeeRole) : [];
  }

  public get customerContacts(): any[] {
    return this._jobContacts ? this._jobContacts.filter(i => i.role_type === JobRoleTypes.ContactRole) : [];
  }

  public get subcontractorContacts(): any[] {
    return this._jobContacts ? this._jobContacts.filter(i => i.role_type === JobRoleTypes.SubcontractorRole) : [];
  }

  @Output()
  public dropdownChange = new EventEmitter<any>();

  constructor(private jobService: JobService, private notificationService: NotificationsService) { }

  ngOnInit(): void { 
  }

  public removeJobContact(item: any): void {
    let index = this._jobContacts.indexOf(item);
    const isDeleted = this._jobContacts.splice(index, 1);
    
    console.log('Id match..', item);
    if (isDeleted.length > 0) {
      this.jobService.removeJobContact(item.id).subscribe(() => {
        this.notificationService.notify('success', 'Contact Removed', null);
      });
    } else {
      this.notificationService.notify('error', 'Failed removing contact.', null);
    }
  }
}