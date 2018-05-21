import { ContactCategory } from './../../models/contact.model';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'srp-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class JobAddComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Job",
      path: '/view-jobs'
    },
    {
      text: "Create Job",
      path: ''
    }
  ];
  
  public isNew: boolean = true;
  public title: string = 'Add Job';
  public contacts: ContactCategory[];

  constructor() {}

  ngOnInit(): void {
  }

}
