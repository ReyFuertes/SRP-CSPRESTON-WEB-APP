import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobService } from '../job.service';
import { ContactService } from '../../contacts/contact.service';
import { ContactCategory } from '../../models/contact.model';

@Component({
  selector: 'srp-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})

export class JobEditComponent implements OnInit {
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
      text: "Edit Job",
      path: ''
    }
  ];

  public job: Job;
  public contacts: ContactCategory[];
  public title: string = 'Edit Job';
  
  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute, private jobService: JobService) {
    const ID = this.activatedRoute.snapshot.params["id"];
    this.jobService.getJob(+ID).subscribe(res => {
      this.job = res.data;
    });
  }

  ngOnInit(): void {

  }
}
