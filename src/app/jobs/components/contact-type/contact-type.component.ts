import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { JobRoleTypes } from '../../../models/roles.enum';
import { JobContact } from '../../../models/job.model';

@Component({
  selector: 'srp-contact-type',
  templateUrl: './contact-type.component.html',
  styleUrls: ['./contact-type.component.scss']
})
export class ContactTypeComponent implements OnInit {

  private _jobContacts: JobContact;
  @Input()
  public set jobContact(value: JobContact) {
    this._jobContacts = value;
  }
  public get jobContact(): JobContact {
    return this._jobContacts;
  }

  @Output()
  public onDeleteChange = new EventEmitter<any>();

  @Output()
  public dropdownChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public mapToEmailToString(obj: any) {
    return obj.length > 0 ? obj.map(prop => prop.email).join(',') : '';
  }

  public mapToPhoneToString(obj: any) {
    return obj.length > 0 ? obj.map(prop => prop.number).join(',') : '';
  }

  public handleChange(newItem: any) {
    if (newItem.name !== this.jobContact.name) {
      this.dropdownChange.emit({
        new: newItem,
        old: this.jobContact
      });
    }
  }

  public removeJobContact(item: any) {
    this.onDeleteChange.next(item);
  }
}
